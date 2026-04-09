/* ============================================================
   TTS — 3-Stage Text-to-Speech
   1단계: VOICEVOX  (localhost:50021) — 최고 품질
   2단계: Edge TTS  (localhost:5050)  — Microsoft 신경망 TTS
   3단계: Web Speech API             — 브라우저 폴백
   ============================================================ */

'use strict';

const TTS = (() => {
  // ── Config ──────────────────────────────────────────────
  const VOICEVOX_URL  = 'http://localhost:50021';
  const EDGE_TTS_URL  = 'http://localhost:5050';
  const TIMEOUT_MS    = 3000;

  // VOICEVOX 화자 ID (0=사용안함, 3=Zundamon 기본, 8=春日部つむぎ 기본)
  const VV_SPEAKER_ID = 3;

  // Edge TTS 기본 음성
  const EDGE_VOICE = 'ja-JP-NanamiNeural';

  // ── State ────────────────────────────────────────────────
  let _enabled      = true;
  let _rate         = 1.0;
  let _vvAvailable  = false;  // VOICEVOX 사용 가능 여부
  let _edgeAvailable= false;  // Edge TTS 사용 가능 여부
  let _wsVoice      = null;   // Web Speech API 음성
  let _currentAudio = null;   // 현재 재생 중인 Audio 객체

  // ── Init ─────────────────────────────────────────────────
  function init() {
    // Web Speech API 음성 로드
    if (window.speechSynthesis) {
      _loadWsVoice();
      window.speechSynthesis.onvoiceschanged = _loadWsVoice;
    } else {
      _enabled = false;
    }
    // VOICEVOX · Edge TTS 가용성 비동기 체크
    _checkVoicevox();
    _checkEdgeTts();
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
      _vvAvailable = r.ok;
    } catch { _vvAvailable = false; }
    console.log(`[TTS] VOICEVOX: ${_vvAvailable ? '✅' : '❌'}`);
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

  // ── Speak ─────────────────────────────────────────────────
  async function speak(text, options = {}) {
    if (!_enabled || !text) return;
    stop(); // 이전 재생 중지

    if (_vvAvailable) {
      const ok = await _speakVoicevox(text, options);
      if (ok) return;
    }
    if (_edgeAvailable) {
      const ok = await _speakEdgeTts(text, options);
      if (ok) return;
    }
    _speakWebSpeech(text, options);
  }

  // ── VOICEVOX ─────────────────────────────────────────────
  async function _speakVoicevox(text, options) {
    try {
      const speakerId = options.speakerId ?? VV_SPEAKER_ID;
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

      // 1. audio_query
      const qRes = await fetch(
        `${VOICEVOX_URL}/audio_query?text=${encodeURIComponent(text)}&speaker=${speakerId}`,
        { method: 'POST', signal: ctrl.signal }
      );
      clearTimeout(tid);
      if (!qRes.ok) return false;
      const query = await qRes.json();

      // 속도 조정
      query.speedScale = _rate * (options.rate ?? 1.0);

      // 2. synthesis
      const ctrl2 = new AbortController();
      const tid2 = setTimeout(() => ctrl2.abort(), TIMEOUT_MS * 3);
      const sRes = await fetch(
        `${VOICEVOX_URL}/synthesis?speaker=${speakerId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(query),
          signal: ctrl2.signal
        }
      );
      clearTimeout(tid2);
      if (!sRes.ok) return false;

      const blob = await sRes.blob();
      const url  = URL.createObjectURL(blob);
      _currentAudio = new Audio(url);
      _currentAudio.onended = () => URL.revokeObjectURL(url);
      await _currentAudio.play();
      return true;
    } catch (e) {
      console.warn('[TTS] VOICEVOX 실패, Edge TTS로 전환:', e.message);
      _vvAvailable = false;  // 이번 세션은 비활성화
      return false;
    }
  }

  // ── Edge TTS ──────────────────────────────────────────────
  async function _speakEdgeTts(text, options) {
    try {
      const voice = options.voice ?? EDGE_VOICE;
      const rate  = Math.round((_rate * (options.rate ?? 1.0) - 1) * 100);  // %

      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), TIMEOUT_MS * 3);
      const url = `${EDGE_TTS_URL}/synthesize?text=${encodeURIComponent(text)}&voice=${voice}&rate=${rate}`;
      const res = await fetch(url, { signal: ctrl.signal });
      clearTimeout(tid);
      if (!res.ok) return false;

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      _currentAudio = new Audio(audioUrl);
      _currentAudio.onended = () => URL.revokeObjectURL(audioUrl);
      await _currentAudio.play();
      return true;
    } catch (e) {
      console.warn('[TTS] Edge TTS 실패, Web Speech로 전환:', e.message);
      _edgeAvailable = false;
      return false;
    }
  }

  // ── Web Speech API ────────────────────────────────────────
  function _speakWebSpeech(text, options) {
    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang  = 'ja-JP';
    utter.rate  = _rate * (options.rate ?? 1.0);
    utter.pitch = options.pitch ?? 1.0;
    if (_wsVoice) utter.voice = _wsVoice;
    window.speechSynthesis.speak(utter);
  }

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

  function isEnabled()    { return _enabled; }
  function isVoicevox()   { return _vvAvailable; }
  function isEdgeTts()    { return _edgeAvailable; }

  /** 현재 활성 TTS 엔진 이름 반환 */
  function getEngineName() {
    if (_vvAvailable)   return 'VOICEVOX 🎙️';
    if (_edgeAvailable) return 'Edge TTS 🌐';
    return 'Web Speech 🔊';
  }

  return { init, speak, stop, setRate, isEnabled, isVoicevox, isEdgeTts, getEngineName };
})();
