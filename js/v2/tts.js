/* ============================================================
   TTS v2 — 사전생성 mp3 우선, Web Speech 폴백
   ─────────────────────────────────────────────────────────────
   1순위: /public/audio/{voice}/{id}.mp3 (Azure Neural TTS 프리렌더)
   2순위: Web Speech API (가나/임의 텍스트용)
   ─────────────────────────────────────────────────────────────
   화자 7종: 여 nanami/aoi/mayu/shiori, 남 keita/daichi/naoki
   롤플레이 라인 speaker: 'A' 학습자 / 'B' 상대방 / 'C' 제3자 / 'N' 나레이터→A
   ============================================================ */

'use strict';

window.TTS = (() => {
  // ── 설정 ─────────────────────────────────────────────────
  const MANIFEST_URL = 'public/audio/manifest.json';
  const AUDIO_BASE   = 'public/audio';

  const FALLBACK_VOICES = {
    nanami: { name: 'ja-JP-NanamiNeural', label: '나나미', gender: 'F' },
    aoi:    { name: 'ja-JP-AoiNeural',    label: '아오이', gender: 'F' },
    mayu:   { name: 'ja-JP-MayuNeural',   label: '마유',   gender: 'F' },
    keita:  { name: 'ja-JP-KeitaNeural',  label: '케이타', gender: 'M' },
  };

  // 기본값
  const DEFAULT_VOICE = 'nanami';
  const DEFAULT_A     = 'nanami';   // 학습자 (여)
  const DEFAULT_B     = 'keita';    // 상대방 (남)
  const DEFAULT_C     = 'aoi';      // 제3자/점원 (여)

  // ── 상태 ─────────────────────────────────────────────────
  let _enabled        = true;
  let _rate           = 1.0;
  let _manifest       = { voices: FALLBACK_VOICES, items: {}, textIndex: {}, lectures: {} };
  let _manifestLoaded = false;
  let _normIndex      = null; // 구두점 제거 인덱스 (lazy)
  let _wsVoice        = null;
  let _currentAudio   = null;
  let _queueRunning   = false;
  let _queueStop      = false;

  let _voiceDefault = localStorage.getItem('tts_voice_default') || DEFAULT_VOICE;
  let _voiceA       = localStorage.getItem('tts_voice_a')       || DEFAULT_A;
  let _voiceB       = localStorage.getItem('tts_voice_b')       || DEFAULT_B;
  let _voiceC       = localStorage.getItem('tts_voice_c')       || DEFAULT_C;

  // ── 초기화 ────────────────────────────────────────────────
  async function init() {
    if (window.speechSynthesis) {
      _loadWsVoice();
      window.speechSynthesis.onvoiceschanged = _loadWsVoice;
    } else {
      console.warn('[TTS] speechSynthesis 없음 — 폴백 불가');
    }
    await _loadManifest();
  }

  function _loadWsVoice() {
    const voices = window.speechSynthesis.getVoices();
    _wsVoice = voices.find(v => v.lang === 'ja-JP' && /nanami|haruka|kyoko/i.test(v.name))
            || voices.find(v => v.lang === 'ja-JP' && /google/i.test(v.name))
            || voices.find(v => v.lang === 'ja-JP')
            || null;
  }

  async function _loadManifest() {
    try {
      // 캐시 우회 — 매니페스트는 콘텐츠/화자 변경 시 즉시 반영되어야 함 (~50KB gz, 1회/세션)
      const bust = `?v=${Date.now()}`;
      const r = await fetch(MANIFEST_URL + bust, { cache: 'no-store' });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      _manifest = {
        voices:    data.voices    || FALLBACK_VOICES,
        items:     data.items     || {},
        textIndex: data.textIndex || {},
        lectures:  data.lectures  || {},
      };
      _normIndex = null; // lazy 재빌드
      _manifestLoaded = true;
      const itemCount = Object.keys(_manifest.items).length;
      const voiceCount = Object.keys(_manifest.voices).length;
      console.log(`[TTS] 매니페스트 로드: ${itemCount}개 아이템 × ${voiceCount}화자`);
    } catch (e) {
      console.warn('[TTS] 매니페스트 로드 실패, Web Speech 폴백 사용:', e.message);
    }
  }

  // ── 텍스트 정제 (서버 cleanForTTS와 동일 로직) ─────────────
  // ・는 짧은 어휘(し・よん)에서만 분리 — 긴 문장의 나열(こ・そ・あ・ど)은 보존
  function _cleanText(text) {
    if (!text) return '';
    let t = String(text);
    if (t.includes('・') && t.length < 12 && !/[「」。！？]/.test(t)) {
      t = t.split('・')[0];
    }
    t = t.replace(/[〜~]/g, '');
    t = t.replace(/\([^)]*\)/g, '');
    t = t.replace(/\s+/g, ' ').trim();
    return t;
  }

  // 일본어 문장끝/구두점 제거 (매니페스트 매칭 폴백용)
  function _stripPunct(s) {
    return String(s || '').replace(/[。、！？!?,.…〜~・「」『』（）()【】\s]+/g, '').trim();
  }

  function _findId(text) {
    if (!_manifestLoaded) return null;
    // 1) 원본 그대로
    if (_manifest.textIndex[text]) return _manifest.textIndex[text];
    // 2) 후리가나 제거 후
    if (typeof window.stripFuri === 'function') {
      const stripped = window.stripFuri(text);
      if (stripped && _manifest.textIndex[stripped]) return _manifest.textIndex[stripped];
    }
    // 3) 서버와 동일한 정제 후
    const cleaned = _cleanText(text);
    if (cleaned && _manifest.textIndex[cleaned]) return _manifest.textIndex[cleaned];
    // 4) 구두점·공백 모두 제거하여 textIndex의 어떤 키와 매치하는지 검사 (느슨한 매칭)
    const noPunct = _stripPunct(cleaned || text);
    if (noPunct) {
      // 캐시된 정규화 인덱스 사용
      if (!_normIndex) {
        _normIndex = {};
        for (const [k, v] of Object.entries(_manifest.textIndex)) {
          const nk = _stripPunct(k);
          if (nk && !_normIndex[nk]) _normIndex[nk] = v;
        }
      }
      if (_normIndex[noPunct]) return _normIndex[noPunct];
    }
    return null;
  }

  // ── 단일 발화 (Promise 반환) ─────────────────────────────
  async function _speakOne(text, voiceKey) {
    if (!_enabled || !text) return;
    const id = _findId(text);
    // voiceKey가 매니페스트에 없어도 일단 mp3 URL 시도 (옛 매니페스트 캐시 대비)
    if (id && voiceKey) {
      const ok = await _playMp3(id, voiceKey);
      if (ok) return;
    }
    // 폴백: Web Speech (사전 mp3 미존재 또는 재생 실패)
    await _wsSynth(text);
  }

  function _playMp3(id, voiceKey) {
    return new Promise(resolve => {
      try {
        const url = `${AUDIO_BASE}/${voiceKey}/${encodeURIComponent(id)}.mp3`;
        const audio = new Audio(url);
        audio.playbackRate = _rate;
        _currentAudio = audio;
        audio.onended = () => resolve(true);
        audio.onerror = () => {
          console.warn(`[TTS] mp3 재생 실패: ${url}`);
          resolve(false);
        };
        audio.play().catch(e => {
          console.warn('[TTS] play() 거부:', e.message);
          resolve(false);
        });
      } catch (e) {
        resolve(false);
      }
    });
  }

  function _wsSynth(text) {
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
  // options.voice = 'nanami'|'keita'|...  (없으면 기본 화자)
  // options.speakerId = (legacy, 무시)
  async function speak(text, options = {}) {
    if (!_enabled || !text) return;
    stopQueue();
    stop();
    const cleanText = typeof window.stripFuri === 'function' ? window.stripFuri(text) : text;
    const voiceKey = options.voice || _voiceDefault;
    await _speakOne(cleanText, voiceKey);
  }

  // ── 순차 큐 (롤플레이/렉처) ─────────────────────────────
  // lines: [{ text, speaker:'A'|'B'|'C'|'N', elementId? }]
  async function speakQueue(lines, callbacks = {}) {
    stopQueue();
    _queueRunning = true;
    _queueStop    = false;
    const prevRate = _rate;
    if (typeof callbacks.rate === 'number') setRate(callbacks.rate);
    const gapMs = Number.isFinite(callbacks.gapMs) ? callbacks.gapMs : 80;

    try {
      for (let i = 0; i < lines.length; i++) {
        if (_queueStop) break;
        const line = lines[i];
        if (!line.text) continue;

        // line.voice가 있으면 우선, 없으면 speaker 역할로 매핑
        const voiceKey = line.voice || _resolveRoleVoice(line.speaker);

        if (callbacks.onLineStart) callbacks.onLineStart(i, line);
        const cleanLineText = typeof window.stripFuri === 'function'
          ? window.stripFuri(line.text) : line.text;
        await _speakOne(cleanLineText, voiceKey);
        if (callbacks.onLineEnd) callbacks.onLineEnd(i, line);

        if (!_queueStop) await _delay(gapMs);
      }
    } finally {
      if (typeof callbacks.rate === 'number') setRate(prevRate);
    }

    _queueRunning = false;
    if (!_queueStop && callbacks.onDone) callbacks.onDone();
  }

  function _resolveRoleVoice(speaker) {
    switch (speaker) {
      case 'B': return _voiceB;
      case 'C': return _voiceC;
      case 'A':
      case 'N':
      default:  return _voiceA;
    }
  }

  function stopQueue() {
    _queueStop    = true;
    _queueRunning = false;
    stop();
  }

  function isQueueRunning() { return _queueRunning; }

  // ── 컨트롤 ──────────────────────────────────────────────
  function stop() {
    if (_currentAudio) {
      try { _currentAudio.pause(); _currentAudio.currentTime = 0; } catch(_) {}
      _currentAudio = null;
    }
    window.speechSynthesis?.cancel();
  }

  function setRate(r) { _rate = Math.max(0.5, Math.min(2.0, r)); }
  function getRate()  { return _rate; }

  // ── 화자 설정 API ───────────────────────────────────────
  function getAvailableVoices() {
    // [{ key, name, label, gender }]
    return Object.entries(_manifest.voices).map(([key, v]) => ({
      key, name: v.name, label: v.label, gender: v.gender || 'F',
    }));
  }

  function getDefaultVoice() { return _voiceDefault; }
  function setDefaultVoice(key) {
    if (!_manifest.voices[key]) return;
    _voiceDefault = key;
    localStorage.setItem('tts_voice_default', key);
  }

  function getRoleVoice(role) {
    return role === 'B' ? _voiceB
         : role === 'C' ? _voiceC
         : _voiceA;
  }
  function setRoleVoice(role, key) {
    if (!_manifest.voices[key]) return;
    if (role === 'A') { _voiceA = key; localStorage.setItem('tts_voice_a', key); }
    else if (role === 'B') { _voiceB = key; localStorage.setItem('tts_voice_b', key); }
    else if (role === 'C') { _voiceC = key; localStorage.setItem('tts_voice_c', key); }
  }

  // ── 상태 조회 ───────────────────────────────────────────
  function isEnabled()         { return _enabled; }
  function isManifestLoaded()  { return _manifestLoaded; }
  function getEngineName() {
    return _manifestLoaded ? 'Azure Neural (프리렌더) 🎙️' : 'Web Speech 🔊';
  }
  function getWebSpeechVoiceName() { return _wsVoice?.name ?? '브라우저 기본'; }

  // ── 강의 단일 mp3 재생 (가갭리스) ────────────────────────
  function hasLectureAudio(lectureKey, slideIdx) {
    if (!_manifestLoaded || !_manifest.lectures) return false;
    return !!_manifest.lectures[`${lectureKey}_${slideIdx}`];
  }

  function playLectureAudio(lectureKey, slideIdx, voiceKey, callbacks = {}) {
    stopQueue();
    stop();
    const id = _manifest.lectures?.[`${lectureKey}_${slideIdx}`];
    if (!id) { callbacks.onDone?.(); return; }
    const url = `${AUDIO_BASE}/${voiceKey}/${encodeURIComponent(id)}.mp3`;
    const audio = new Audio(url);
    audio.playbackRate = _rate;
    _currentAudio = audio;
    let raf = 0;
    const tick = () => {
      if (audio.duration && !audio.paused && !audio.ended) {
        callbacks.onProgress?.(audio.currentTime / audio.duration);
        raf = requestAnimationFrame(tick);
      }
    };
    audio.onplay  = () => { raf = requestAnimationFrame(tick); };
    audio.onended = () => { cancelAnimationFrame(raf); callbacks.onDone?.(); };
    audio.onerror = () => { cancelAnimationFrame(raf); console.warn('[TTS] 강의 mp3 실패:', url); callbacks.onDone?.(); };
    audio.play().catch(e => {
      console.warn('[TTS] 강의 play() 거부:', e.message);
      callbacks.onDone?.();
    });
  }

  // ── 매니페스트 통계 (디버깅) ─────────────────────────────
  function getStats() {
    return {
      manifestLoaded: _manifestLoaded,
      itemCount: Object.keys(_manifest.items).length,
      voiceCount: Object.keys(_manifest.voices).length,
    };
  }

  // ── Util ────────────────────────────────────────────────
  function _delay(ms) { return new Promise(r => setTimeout(r, ms)); }

  return {
    // 핵심
    init, speak, stop, setRate, getRate,
    speakQueue, stopQueue, isQueueRunning,
    // 상태
    isEnabled, isManifestLoaded, getEngineName, getWebSpeechVoiceName, getStats,
    // 화자 설정
    getAvailableVoices,
    getDefaultVoice, setDefaultVoice,
    getRoleVoice, setRoleVoice,
    // 강의 단일 mp3
    hasLectureAudio, playLectureAudio,
  };
})();
