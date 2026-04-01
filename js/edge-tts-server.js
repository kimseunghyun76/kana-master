// ════════════════════════════════════════════════════════
//  Edge TTS 로컬 서버 모듈
//  Python edge-tts 라이브러리를 로컬 HTTP 서버로 실행 시 사용
//  설치: pip install edge-tts flask flask-cors
//  서버: python edge_tts_server.py
//  기본 URL: http://localhost:5050
// ════════════════════════════════════════════════════════

const EdgeTTSModule = (() => {
  const DEFAULT_URL = 'http://localhost:5050';

  // 사용 가능한 Edge TTS 일본어 음성 목록
  const EDGE_VOICES = [
    { id: 'ja-JP-NanamiNeural',  name: 'Nanami (여성)',  gender: 'F', quality: '🏆 신경망' },
    { id: 'ja-JP-KeitaNeural',   name: 'Keita (남성)',   gender: 'M', quality: '🏆 신경망' },
    { id: 'ja-JP-AoiNeural',     name: 'Aoi (여성)',     gender: 'F', quality: '🏆 신경망' },
    { id: 'ja-JP-DaichiNeural',  name: 'Daichi (남성)',  gender: 'M', quality: '🏆 신경망' },
    { id: 'ja-JP-MayuNeural',    name: 'Mayu (여성)',    gender: 'F', quality: '🏆 신경망' },
    { id: 'ja-JP-NaokiNeural',   name: 'Naoki (남성)',   gender: 'M', quality: '🏆 신경망' },
    { id: 'ja-JP-ShioriNeural',  name: 'Shiori (여성)',  gender: 'F', quality: '🏆 신경망' },
  ];

  let _serverUrl   = DEFAULT_URL;
  let _available   = false;
  let _voice1      = 'ja-JP-NanamiNeural';
  let _voice2      = 'ja-JP-KeitaNeural';
  let _callCount   = 0;

  function getVoices() { return EDGE_VOICES; }
  function isAvailable() { return _available; }
  function getUrl() { return _serverUrl; }

  function configure({ url, voice1, voice2 }) {
    if (url)    _serverUrl = url;
    if (voice1) _voice1    = voice1;
    if (voice2) _voice2    = voice2;
  }

  async function checkServer(url) {
    try {
      const resp = await fetch((url || _serverUrl) + '/health', { signal: AbortSignal.timeout(2000) });
      _available = resp.ok;
      return _available;
    } catch {
      _available = false;
      return false;
    }
  }

  /** text → Audio Blob (GET /synthesize?text=...&voice=...) */
  async function synthesize(text, slot) {
    if (!_available || !text) return null;
    const voice = slot === 2 ? _voice2 : _voice1;
    if (!voice || voice === 'none') return null;
    try {
      const url = `${_serverUrl}/synthesize?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(voice)}`;
      const resp = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (!resp.ok) return null;
      return await resp.blob();
    } catch {
      return null;
    }
  }

  /** text → 재생 (Promise: 완료 시 resolve) */
  async function speak(text, slot, volume) {
    const blob = await synthesize(text, slot);
    if (!blob) return false;
    const objUrl = URL.createObjectURL(blob);
    const audio  = new Audio(objUrl);
    audio.volume = volume ?? 1.0;
    return new Promise(resolve => {
      audio.onended = () => { URL.revokeObjectURL(objUrl); resolve(true); };
      audio.onerror = () => { URL.revokeObjectURL(objUrl); resolve(false); };
      audio.play().catch(() => { URL.revokeObjectURL(objUrl); resolve(false); });
    });
  }

  return { getVoices, isAvailable, getUrl, configure, checkServer, synthesize, speak };
})();
