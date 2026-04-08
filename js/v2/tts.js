/* ============================================================
   TTS — Text-to-Speech wrapper (Web Speech API)
   ============================================================ */

'use strict';

const TTS = (() => {
  let _enabled = true;
  let _rate = 1.0;
  let _pitch = 1.0;
  let _lang = 'ja-JP';
  let _voice = null;

  function init() {
    if (!window.speechSynthesis) { _enabled = false; return; }
    _loadVoice();
    // voices may be async
    window.speechSynthesis.onvoiceschanged = _loadVoice;
  }

  function _loadVoice() {
    const voices = window.speechSynthesis.getVoices();
    // Prefer ja-JP female voice (Google, Microsoft, etc.)
    _voice = voices.find(v => v.lang === 'ja-JP' && /female|woman|kyoko|haruka/i.test(v.name))
          || voices.find(v => v.lang === 'ja-JP')
          || null;
  }

  function speak(text, options = {}) {
    if (!_enabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang  = options.lang  ?? _lang;
    utter.rate  = options.rate  ?? _rate;
    utter.pitch = options.pitch ?? _pitch;
    if (_voice) utter.voice = _voice;
    window.speechSynthesis.speak(utter);
  }

  function setRate(r)  { _rate = r; }
  function isEnabled() { return _enabled; }
  function stop()      { window.speechSynthesis?.cancel(); }

  return { init, speak, setRate, isEnabled, stop };
})();
