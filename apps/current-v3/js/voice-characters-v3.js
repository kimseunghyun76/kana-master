/* ============================================================
   V3 Voice Characters — Japanese coach personas
   ============================================================ */

'use strict';

window.VoiceCharacters = (() => {
  const AVATARS = {
    nanami: '/images/voices/voice-avatar-nanami.png',
    aoi:    '/images/voices/voice-avatar-aoi.png',
    mayu:   '/images/voices/voice-avatar-mayu.png',
    keita:  '/images/voices/voice-avatar-keita.png',
  };

  const META = {
    nanami: { age: 'JP', role: '차분한 강사', pos: 'center' },
    aoi:    { age: 'JP', role: '밝은 강사', pos: 'center' },
    mayu:   { age: 'JP', role: '친근한 튜터', pos: 'center' },
    keita:  { age: 'JP', role: '또렷한 남성 강사', pos: 'center' },
  };

  function meta(key) {
    return META[key] || { age: 'JP', role: '', pos: 'center' };
  }

  function avatarStyle(key) {
    const avatar = AVATARS[key] || AVATARS.nanami;
    return `--voice-avatar:url('${avatar}');--voice-avatar-pos:center;--voice-avatar-size:cover`;
  }

  function card(voice, active, onclick, opts = {}) {
    const key = voice?.key || '';
    const m = meta(key);
    const gender = voice?.gender === 'M' ? 'M' : 'F';
    const label = voice?.label || key;
    const compact = opts.compact ? ' compact' : '';
    return `
      <button class="voice-character-card ${active ? 'active' : ''}${compact}" type="button"
              onclick="${onclick}" title="${escHtml(label)}">
        <span class="voice-character-avatar" style="${avatarStyle(key)}"></span>
        <span class="voice-character-main">
          <span class="voice-character-name">${escHtml(label.split(' ')[0])}</span>
          <span class="voice-character-meta">${escHtml([m.age, m.role].filter(Boolean).join(' · '))}</span>
        </span>
        <span class="voice-character-gender ${voice?.gender === 'M' ? 'male' : 'female'}">${gender}</span>
      </button>
    `;
  }

  function picker(voices, currentKey, setterCall, opts = {}) {
    const jaKeys = new Set(['nanami', 'aoi', 'mayu', 'keita']);
    const sorted = [...(voices || [])]
      .filter(v => jaKeys.has(v.key) || (v.lang || '').toLowerCase().startsWith('ja'))
      .sort((a, b) => {
        const known = key => jaKeys.has(key) ? 0 : 1;
        return known(a.key) - known(b.key) || (a.gender === 'F' ? -1 : 1) - (b.gender === 'F' ? -1 : 1);
      });
    const callFor = key => typeof setterCall === 'function' ? setterCall(key) : `${setterCall}('${key}')`;
    return `<div class="voice-character-grid ${opts.compact ? 'compact' : ''}">
      ${sorted.map(v => card(v, v.key === currentKey, callFor(v.key), opts)).join('')}
    </div>`;
  }

  return { meta, avatarStyle, card, picker };
})();
