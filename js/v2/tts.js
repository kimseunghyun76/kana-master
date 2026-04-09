/* ============================================================
   TTS — 3-Stage Text-to-Speech
   1단계: VOICEVOX  (localhost:50021) — 최고 품질
   2단계: Edge TTS  (localhost:5050)  — Microsoft 신경망 TTS
   3단계: Web Speech API             — 브라우저 폴백
   + speakQueue(): 롤플레이 다중 화자 순차 재생
   ============================================================ */

'use strict';

const TTS = (() => {
  // ── Config ──────────────────────────────────────────────
  const VOICEVOX_URL  = 'http://localhost:50021';
  const EDGE_TTS_URL  = 'http://localhost:5050';
  const TIMEOUT_MS    = 3000;
  const VV_SPEAKER_DEFAULT_A = 3;   // ずんだもん ノーマル
  const VV_SPEAKER_DEFAULT_B = 8;   // 春日部つむぎ ノーマル
  const VV_SPEAKER_DEFAULT_C = 2;   // 四国めたん ノーマル
  const EDGE_VOICE_DEFAULT   = 'ja-JP-NanamiNeural';

  // ── State ────────────────────────────────────────────────
  let _enabled       = true;
  let _rate          = 1.0;
  let _vvAvailable   = false;
  let _edgeAvailable = false;
  let _wsVoice       = null;
  let _currentAudio  = null;
  let _queueRunning  = false;   // speakQueue 실행 중 플래그
  let _queueStop     = false;   // 큐 중단 신호

  let _vvSpeakers  = [];
  let _vvSpeakerA  = parseInt(localStorage.getItem('tts_vv_speaker')   ?? String(VV_SPEAKER_DEFAULT_A));
  let _vvSpeakerB  = parseInt(localStorage.getItem('tts_vv_speaker_b') ?? String(VV_SPEAKER_DEFAULT_B));
  let _vvSpeakerC  = parseInt(localStorage.getItem('tts_vv_speaker_c') ?? String(VV_SPEAKER_DEFAULT_C));
  let _edgeVoice   = localStorage.getItem('tts_edge_voice') ?? EDGE_VOICE_DEFAULT;

  // ── Init ─────────────────────────────────────────────────
  async function init() {
    if (window.speechSynthesis) {
      _loadWsVoice();
      window.speechSynthesis.onvoiceschanged = _loadWsVoice;
    } else {
      _enabled = false;
    }
    await Promise.all([_checkVoicevox(), _checkEdgeTts()]);
  }

  function _loadWsVoice() {
    const voices = window.speechSynthesis.getVoices();
    _wsVoice = voices.find(v => v.lang === 'ja-JP' && /nanami|haruka|kyoko/i.test(v.name))
            || voices.find(v => v.lang === 'ja-JP' && /google/i.test(v.name))
            || voices.find(v => v.lang === 'ja-JP')
            || null;
  }

  async function _checkVoicevox() {
    try {
      const ctrl = new AbortController();
      setTimeout(() => ctrl.abort(), TIMEOUT_MS);
      const r = await fetch(`${VOICEVOX_URL}/speakers`, { signal: ctrl.signal });
      if (r.ok) {
        _vvAvailable = true;
        const data = await r.json();
        _vvSpeakers = [];
        data.forEach(sp => {
          (sp.styles || []).forEach(style => {
            _vvSpeakers.push({ id: style.id, name: `${sp.name} (${style.name})` });
          });
        });
        // 저장된 화자가 없으면 기본값
        if (!_vvSpeakers.find(s => s.id === _vvSpeakerA) && _vvSpeakers.length)
          _vvSpeakerA = _vvSpeakers[0].id;
        if (!_vvSpeakers.find(s => s.id === _vvSpeakerB) && _vvSpeakers.length > 1)
          _vvSpeakerB = _vvSpeakers[1].id;
        if (!_vvSpeakers.find(s => s.id === _vvSpeakerC) && _vvSpeakers.length > 2)
          _vvSpeakerC = _vvSpeakers[2].id;
      }
    } catch { _vvAvailable = false; }
    console.log(`[TTS] VOICEVOX: ${_vvAvailable ? '✅ ' + _vvSpeakers.length + '명' : '❌'}`);
  }

  async function _checkEdgeTts() {
    try {
      const ctrl = new AbortController();
      setTimeout(() => ctrl.abort(), TIMEOUT_MS);
      const r = await fetch(`${EDGE_TTS_URL}/health`, { signal: ctrl.signal });
      _edgeAvailable = r.ok;
    } catch { _edgeAvailable = false; }
    console.log(`[TTS] Edge TTS: ${_edgeAvailable ? '✅' : '❌'}`);
  }

  // ── 단일 발화 (Promise 반환 — 완료 시 resolve) ────────────
  async function _speakOne(text, speakerId) {
    if (!_enabled || !text) return;
    if (_vvAvailable) {
      const ok = await _vvSynth(text, speakerId ?? _vvSpeakerA);
      if (ok) return;
    }
    if (_edgeAvailable) {
      const ok = await _edgeSynth(text);
      if (ok) return;
    }
    await _wsSynth(text);
  }

  async function _vvSynth(text, speakerId) {
    return new Promise(async resolve => {
      try {
        const c1 = new AbortController();
        setTimeout(() => c1.abort(), TIMEOUT_MS);
        const qRes = await fetch(
          `${VOICEVOX_URL}/audio_query?text=${encodeURIComponent(text)}&speaker=${speakerId}`,
          { method: 'POST', signal: c1.signal }
        );
        if (!qRes.ok) { resolve(false); return; }
        const query = await qRes.json();
        query.speedScale = _rate;

        const c2 = new AbortController();
        setTimeout(() => c2.abort(), TIMEOUT_MS * 4);
        const sRes = await fetch(
          `${VOICEVOX_URL}/synthesis?speaker=${speakerId}`,
          { method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(query), signal: c2.signal }
        );
        if (!sRes.ok) { resolve(false); return; }

        const blob = await sRes.blob();
        const url  = URL.createObjectURL(blob);
        _currentAudio = new Audio(url);
        _currentAudio.onended  = () => { URL.revokeObjectURL(url); resolve(true); };
        _currentAudio.onerror  = () => { URL.revokeObjectURL(url); resolve(false); };
        await _currentAudio.play();
      } catch(e) {
        console.warn('[TTS] VV 실패:', e.message);
        resolve(false);
      }
    });
  }

  async function _edgeSynth(text) {
    return new Promise(async resolve => {
      try {
        const rate = Math.round((_rate - 1) * 100);
        const url  = `${EDGE_TTS_URL}/synthesize?text=${encodeURIComponent(text)}&voice=${_edgeVoice}&rate=${rate}`;
        const c = new AbortController();
        setTimeout(() => c.abort(), TIMEOUT_MS * 4);
        const res = await fetch(url, { signal: c.signal });
        if (!res.ok) { resolve(false); return; }
        const blob = await res.blob();
        const au   = URL.createObjectURL(blob);
        _currentAudio = new Audio(au);
        _currentAudio.onended = () => { URL.revokeObjectURL(au); resolve(true); };
        _currentAudio.onerror = () => { URL.revokeObjectURL(au); resolve(false); };
        await _currentAudio.play();
      } catch { resolve(false); }
    });
  }

  async function _wsSynth(text) {
    return new Promise(resolve => {
      if (!window.speechSynthesis) { resolve(); return; }
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang  = 'ja-JP';
      utter.rate  = _rate;
      if (_wsVoice) utter.voice = _wsVoice;
      utter.onend   = resolve;
      utter.onerror = resolve;
      window.speechSynthesis.speak(utter);
    });
  }

  // ── 공개 speak() ─────────────────────────────────────────
  async function speak(text, options = {}) {
    if (!_enabled || !text) return;
    stopQueue();
    stop();
    const sid = options.speakerId ?? _vvSpeakerA;
    await _speakOne(text, sid);
  }

  // ── 순차 큐 재생 (롤플레이용) ─────────────────────────────
  // lines: [{ text, speaker:'A'|'B'|'N', elementId }]
  // callbacks: { onLineStart(idx, line), onLineEnd(idx, line), onDone() }
  async function speakQueue(lines, callbacks = {}) {
    stopQueue();
    _queueRunning = true;
    _queueStop    = false;

    for (let i = 0; i < lines.length; i++) {
      if (_queueStop) break;
      const line = lines[i];
      if (!line.text) continue;

      // 화자 ID 결정 (A=학습자, B=상대방, C=제3자/점원 등, N=나레이터→A목소리)
      const sid = line.speaker === 'B' ? _vvSpeakerB
                : line.speaker === 'C' ? _vvSpeakerC
                : _vvSpeakerA;

      if (callbacks.onLineStart) callbacks.onLineStart(i, line);
      await _speakOne(line.text, sid);
      if (callbacks.onLineEnd) callbacks.onLineEnd(i, line);

      if (!_queueStop) await _delay(250); // 라인 사이 짧은 쉬어가기
    }

    _queueRunning = false;
    if (!_queueStop && callbacks.onDone) callbacks.onDone();
  }

  function stopQueue() {
    _queueStop    = true;
    _queueRunning = false;
    stop();
  }

  function isQueueRunning() { return _queueRunning; }

  // ── Controls ──────────────────────────────────────────────
  function stop() {
    if (_currentAudio) {
      _currentAudio.pause();
      _currentAudio.currentTime = 0;
      _currentAudio = null;
    }
    window.speechSynthesis?.cancel();
  }

  function setRate(r) { _rate = Math.max(0.5, Math.min(2.0, r)); }

  // ── Speaker Settings ──────────────────────────────────────
  function getVoicevoxSpeakers()   { return _vvSpeakers; }
  function getVoicevoxSpeakerId()  { return _vvSpeakerA; }
  function getVoicevoxSpeakerBId() { return _vvSpeakerB; }
  function getVoicevoxSpeakerCId() { return _vvSpeakerC; }

  function setVoicevoxSpeaker(id) {
    _vvSpeakerA = parseInt(id);
    localStorage.setItem('tts_vv_speaker', String(_vvSpeakerA));
  }
  function setVoicevoxSpeakerB(id) {
    _vvSpeakerB = parseInt(id);
    localStorage.setItem('tts_vv_speaker_b', String(_vvSpeakerB));
  }
  function setVoicevoxSpeakerC(id) {
    _vvSpeakerC = parseInt(id);
    localStorage.setItem('tts_vv_speaker_c', String(_vvSpeakerC));
  }

  const EDGE_VOICES = [
    { id: 'ja-JP-NanamiNeural', name: 'Nanami (여성, 권장)' },
    { id: 'ja-JP-KeitaNeural',  name: 'Keita (남성)' },
    { id: 'ja-JP-AoiNeural',    name: 'Aoi (여성)' },
    { id: 'ja-JP-MayuNeural',   name: 'Mayu (여성)' },
    { id: 'ja-JP-NaokiNeural',  name: 'Naoki (남성)' },
  ];
  function getEdgeVoices() { return EDGE_VOICES; }
  function getEdgeVoice()  { return _edgeVoice; }
  function setEdgeVoice(v) {
    _edgeVoice = v;
    localStorage.setItem('tts_edge_voice', v);
  }
  function getWebSpeechVoiceName() { return _wsVoice?.name ?? '브라우저 기본'; }

  function isEnabled()    { return _enabled; }
  function isVoicevox()   { return _vvAvailable; }
  function isEdgeTts()    { return _edgeAvailable; }
  function getEngineName() {
    if (_vvAvailable)   return 'VOICEVOX 🎙️';
    if (_edgeAvailable) return 'Edge TTS 🌐';
    return 'Web Speech 🔊';
  }

  // ── Util ─────────────────────────────────────────────────
  function _delay(ms) { return new Promise(r => setTimeout(r, ms)); }

  return {
    init, speak, stop, setRate,
    speakQueue, stopQueue, isQueueRunning,
    isEnabled, isVoicevox, isEdgeTts, getEngineName,
    getVoicevoxSpeakers,
    getVoicevoxSpeakerId, getVoicevoxSpeakerBId, getVoicevoxSpeakerCId,
    setVoicevoxSpeaker, setVoicevoxSpeakerB, setVoicevoxSpeakerC,
    getEdgeVoices, getEdgeVoice, setEdgeVoice, getWebSpeechVoiceName
  };
})();
