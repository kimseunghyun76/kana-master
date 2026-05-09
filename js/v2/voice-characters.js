/* ============================================================
   Voice Characters — speaker avatars and picker helpers
   ============================================================ */

'use strict';

window.VoiceCharacters = (() => {
  const SHEET = '/images/voices/voice-characters-transparent.png';
  const AVATARS = {
    nanami: '/images/voices/voice-avatar-nanami.png',
    aoi:    '/images/voices/voice-avatar-aoi.png',
    mayu:   '/images/voices/voice-avatar-mayu.png',
    keita:  '/images/voices/voice-avatar-keita.png',
  };
  const META = {
    nanami: { age: '30대', role: '차분한 선생님', pos: '0% 0%' },
    aoi:    { age: '10대', role: '밝은 학생',     pos: '100% 0%' },
    mayu:   { age: '20대', role: '상냥한 튜터',   pos: '0% 100%' },
    keita:  { age: '20대', role: '친근한 남성',   pos: '100% 100%' },
  };

  function meta(key) {
    return META[key] || { age: '', role: '', pos: '50% 50%' };
  }

  function avatarStyle(key) {
    const m = meta(key);
    const avatar = AVATARS[key] || SHEET;
    const pos = AVATARS[key] ? 'center' : m.pos;
    const size = AVATARS[key] ? 'cover' : '200% 200%';
    return `--voice-avatar:url('${avatar}');--voice-avatar-pos:${pos};--voice-avatar-size:${size}`;
  }

  function card(voice, active, onclick, opts = {}) {
    const key = voice?.key || '';
    const m = meta(key);
    const hasAvatar = !!META[key];
    const gender = voice?.gender === 'M' ? '남' : '여';
    const label = voice?.label || key;
    const compact = opts.compact ? ' compact' : '';
    return `
      <button class="voice-character-card ${active ? 'active' : ''}${compact}" type="button"
              onclick="${onclick}" title="${escHtml(label)}">
        <span class="voice-character-avatar ${hasAvatar ? '' : 'fallback'}" style="${avatarStyle(key)}">${hasAvatar ? '' : escHtml(label.slice(0, 1))}</span>
        <span class="voice-character-main">
          <span class="voice-character-name">${escHtml(label.split(' ')[0])}</span>
          <span class="voice-character-meta">${escHtml([m.age, m.role].filter(Boolean).join(' · ') || gender)}</span>
        </span>
        <span class="voice-character-gender ${voice?.gender === 'M' ? 'male' : 'female'}">${gender}</span>
      </button>
    `;
  }

  function picker(voices, currentKey, setterCall, opts = {}) {
    const sorted = [...(voices || [])].sort((a, b) => {
      const known = key => Object.prototype.hasOwnProperty.call(META, key) ? 0 : 1;
      return known(a.key) - known(b.key) || (a.gender === 'F' ? -1 : 1) - (b.gender === 'F' ? -1 : 1);
    });
    const callFor = key => typeof setterCall === 'function' ? setterCall(key) : `${setterCall}('${key}')`;
    return `<div class="voice-character-grid ${opts.compact ? 'compact' : ''}">
      ${sorted.map(v => card(v, v.key === currentKey, callFor(v.key), opts)).join('')}
    </div>`;
  }

  return { meta, avatarStyle, card, picker };
})();
