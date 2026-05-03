/* ============================================================
   UI Icons - shared inline SVG registry
   ============================================================ */

'use strict';

window.UIIcons = (() => {
  function svg(name, cls = '') {
    const icons = {
      home: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
      lesson: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M6 5.5A2.5 2.5 0 0 1 8.5 3H19v16H8.5A2.5 2.5 0 0 0 6 21V5.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.5 7.5H15.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9.5 11.5H15.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      practice: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.7L12 16.2 6.7 19l1-5.7L3.5 9.2l5.9-.9L12 3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
      profile: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 19c1.6-3.3 4.1-4.9 7-4.9S17.4 15.7 19 19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      xp: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M13 2 5 13h5l-1 9 8-11h-5l1-9Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
      streak: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M13.2 2.8c.6 2.6-.2 4.7-2.5 6.5-2 1.6-2.9 3.4-2.9 5.5 0 3 2 5.2 5 5.2s5.2-2.4 5.2-5.6c0-2.8-1.4-5-4.2-6.9.1 1.6-.5 2.8-1.8 3.8.3-2.6-.5-4.9-2.4-7.1.1-.4.2-.9.2-1.4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
      target: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 4v3M20 12h-3M12 20v-3M4 12h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      check: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m8.5 12.2 2.4 2.4 4.7-5.1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      close: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 9l6 6M15 9l-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      progress: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="m13 7 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      lock: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 10V7.8A4 4 0 0 1 12 4a4 4 0 0 1 4 3.8V10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      book: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M6 5.5A2.5 2.5 0 0 1 8.5 3H19v16H8.5A2.5 2.5 0 0 0 6 21V5.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8.8 7.5h6M8.8 11h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      quiz: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><circle cx="12" cy="18" r="1.2" fill="currentColor"/><path d="M9.2 9a2.8 2.8 0 1 1 4.5 2.2c-.9.7-1.5 1.3-1.5 2.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
      headphones: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M5 13a7 7 0 0 1 14 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><rect x="4.5" y="12" width="3.5" height="6.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="16" y="12" width="3.5" height="6.5" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
      mic: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><rect x="9" y="4" width="6" height="10" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6.5 10.5v.7A5.5 5.5 0 0 0 12 16.7a5.5 5.5 0 0 0 5.5-5.5v-.7M12 16.7V20M9.3 20h5.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      calendar: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><rect x="4" y="5.5" width="16" height="14.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 3.8v3.4M16 3.8v3.4M4 9.5h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      grid: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><rect x="4.5" y="4.5" width="6" height="6" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="13.5" y="4.5" width="6" height="6" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="4.5" y="13.5" width="6" height="6" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="13.5" y="13.5" width="6" height="6" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
      settings: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4.7a7.4 7.4 0 0 0-1.8-1L14.4 3h-4.8l-.3 2.8a7.4 7.4 0 0 0-1.8 1l-2.4-.7-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-.7a7.4 7.4 0 0 0 1.8 1l.3 2.8h4.8l.3-2.8a7.4 7.4 0 0 0 1.8-1l2.4.7 2-3.4-2-1.5c.1-.3.1-.7.1-1Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
      trash: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M5 7h14M9 7V5.5h6V7M7.5 7l.8 11a1.5 1.5 0 0 0 1.5 1.4h4.4a1.5 1.5 0 0 0 1.5-1.4l.8-11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      voice: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M12 5a3.5 3.5 0 0 1 3.5 3.5v2A3.5 3.5 0 0 1 12 14a3.5 3.5 0 0 1-3.5-3.5v-2A3.5 3.5 0 0 1 12 5Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M6.5 11.5a5.5 5.5 0 0 0 11 0M12 17v2.5M9.3 19.5h5.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      audio: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M5 14.5V9.5h3.7L13.5 6v12l-4.8-3.5H5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M16 9.5a4.2 4.2 0 0 1 0 5M18.5 7.5a7 7 0 0 1 0 9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      sparkle: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="m12 3 1.7 5 5.3 1.7-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
      tools: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="m14.5 6.5 3 3M5 19l5.5-5.5M13 4a4 4 0 0 0 5.2 5.2L13 14.4l-3.4-3.4 5.2-5.2A4 4 0 0 0 13 4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      roleplay: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M5 7a2 2 0 0 1 2-2h6.5a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2H10l-3 2.2V13.5H7a2 2 0 0 1-2-2V7Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M15.5 10.5h1.5a2 2 0 0 1 2 2V17l-2.5-1.8H15a2 2 0 0 1-2-2v-.7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
      play: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M8 6.5v11l8-5.5-8-5.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
      pause: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M8.5 6.5v11M15.5 6.5v11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      replay: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M6.5 8.5H11V4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.2 18a7 7 0 1 0-1.7-9.5L6.5 8.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      film: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 5v14M16 5v14M4 9h4M4 15h4M16 9h4M16 15h4" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
      'stage-kana': `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M6 5h12v14H6z" fill="none" stroke="currentColor" stroke-width="1.8" rx="2"/><path d="M9 9h6M9 13h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="9" cy="17" r="1.2" fill="currentColor"/><circle cx="15" cy="17" r="1.2" fill="currentColor"/></svg>`,
      'stage-sprout': `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M12 20V11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 11c0-3 2.4-5.5 5.4-5.5 0 3-2.4 5.5-5.4 5.5Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 14c0-3-2.4-5.5-5.4-5.5 0 3 2.4 5.5 5.4 5.5Z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
      'stage-chat': `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M5 6.5A2.5 2.5 0 0 1 7.5 4H18a2 2 0 0 1 2 2v7.2a2 2 0 0 1-2 2H11l-4 3v-3H7.5A2.5 2.5 0 0 1 5 12.7V6.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 9.5H16M9 12.5H14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      'stage-briefcase': `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 9.5A1.5 1.5 0 0 1 5.5 8h13A1.5 1.5 0 0 1 20 9.5v8A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-8Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 12h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      'stage-ribbon': `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><circle cx="12" cy="9" r="4.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 13.5 8 20l4-2 4 2-2-6.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
      'module-kana': `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><rect x="5" y="4.5" width="14" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8.5 9H15.5M8.5 13H12.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      'module-talk': `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M5 7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-5l-4 3v-3H7a2 2 0 0 1-2-2V7Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
      'module-map': `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M7 5.5 12 3l5 2.5v15L12 18l-5 2.5v-15Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="12" cy="10.5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>`,
      'module-time': `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 8v4l2.8 1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      'module-order': `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M5 15.5h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M7 15.5c.7-4 3-6 5-6s4.3 2 5 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9 9V6.5M15 9V6.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      'module-health': `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><rect x="5" y="7.5" width="14" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 7.5v-1a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 10v6M9 13h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      'module-work': `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="4.5" y="7" width="15" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 12h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      'module-advanced': `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M12 4l2 4 4.5.6-3.2 3.1.8 4.4L12 14l-4.1 2.1.8-4.4L5.5 8.6 10 8l2-4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`
    };
    return icons[name] || icons['module-kana'];
  }

  function stageIconKey(stageId) {
    return {
      1: 'stage-kana',
      2: 'stage-sprout',
      3: 'stage-chat',
      4: 'stage-briefcase',
      5: 'stage-ribbon'
    }[stageId] || 'stage-kana';
  }

  function wrap(name, cls = 'ui-icon') {
    return `<span class="ui-icon-wrap">${svg(name, cls)}</span>`;
  }

  function labeled(name, cls = 'btn-inline-icon') {
    return `<span class="inline-icon-wrap">${svg(name, cls)}</span>`;
  }


  return { svg, stageIconKey, wrap, labeled };
})();
