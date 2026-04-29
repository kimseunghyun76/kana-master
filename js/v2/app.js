/* ============================================================
   일본어 마스터 v2 — Main App
   Stage-based prerequisite unlock learning system
   ============================================================ */

'use strict';

// ── App singleton ──────────────────────────────────────────
window.App = (() => {

  // ── State ────────────────────────────────────────────────
  let _currentTab = 'home';       // home | lesson | practice | profile
  let _flow = null;               // current learning flow
  let _flowEl = null;             // flow screen DOM element
  let _autoNextTimer = null;      // timer for automatic next question

  function _uiIconSvg(name, cls = '') {
    const icons = {
      home: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
      lesson: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M6 5.5A2.5 2.5 0 0 1 8.5 3H19v16H8.5A2.5 2.5 0 0 0 6 21V5.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.5 7.5H15.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M9.5 11.5H15.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      practice: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.7L12 16.2 6.7 19l1-5.7L3.5 9.2l5.9-.9L12 3Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
      profile: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 19c1.6-3.3 4.1-4.9 7-4.9S17.4 15.7 19 19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      xp: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M13 2 5 13h5l-1 9 8-11h-5l1-9Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
      streak: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M13.2 2.8c.6 2.6-.2 4.7-2.5 6.5-2 1.6-2.9 3.4-2.9 5.5 0 3 2 5.2 5 5.2s5.2-2.4 5.2-5.6c0-2.8-1.4-5-4.2-6.9.1 1.6-.5 2.8-1.8 3.8.3-2.6-.5-4.9-2.4-7.1.1-.4.2-.9.2-1.4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
      target: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 4v3M20 12h-3M12 20v-3M4 12h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
      check: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m8.5 12.2 2.4 2.4 4.7-5.1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
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
      tools: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="m14.5 6.5 3 3M5 19l5.5-5.5M13 4a4 4 0 0 0 5.2 5.2L13 14.4l-3.4-3.4 5.2-5.2A4 4 0 0 0 13 4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      roleplay: `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true"><path d="M5 7a2 2 0 0 1 2-2h6.5a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2H10l-3 2.2V13.5H7a2 2 0 0 1-2-2V7Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M15.5 10.5h1.5a2 2 0 0 1 2 2V17l-2.5-1.8H15a2 2 0 0 1-2-2v-.7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
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
    return icons[name] || icons.module-kana;
  }

  function _getStageIconKey(stageId) {
    return {
      1: 'stage-kana',
      2: 'stage-sprout',
      3: 'stage-chat',
      4: 'stage-briefcase',
      5: 'stage-ribbon'
    }[stageId] || 'stage-kana';
  }

  function _uiIconWrap(name, cls = 'ui-icon') {
    return `<span class="ui-icon-wrap">${_uiIconSvg(name, cls)}</span>`;
  }

  // ── Init ─────────────────────────────────────────────────
  async function init() {
    await Store.load();
    await TTS.init();  // VOICEVOX/Edge TTS 체크 완료 후 진행
    _buildUI();
    _bindNav();
    _renderHome();
    _renderLesson();
    _renderPractice();
    _renderProfile();
    // Subscribe to store changes
    Store.subscribe(_onStoreChange);
  }

  function _onStoreChange(type) {
    if (type === 'xp' || type === 'module' || type === 'roleplay') {
      _renderHome();
      _renderLesson();
      _renderProfile();
    }
  }

  function _getModuleVisual(mod) {
    const map = {
      kana_hira:         { image: 'assets/visuals/kana-grid.svg',       focus: '행 단위 문자 자동화', tone: 'violet', iconKey: 'module-kana' },
      kana_kata:         { image: 'assets/visuals/kana-grid.svg',       focus: '외래어 읽기 기반', tone: 'violet', iconKey: 'module-kana' },
      first_phrases:     { image: 'assets/visuals/greeting-bridge.svg', focus: '첫 인사 패턴', tone: 'violet', iconKey: 'module-talk' },
      survival_greet:    { image: 'assets/visuals/greeting-bridge.svg', focus: '자기소개', tone: 'blue', iconKey: 'module-talk' },
      survival_pointing: { image: 'assets/visuals/pointer-map.svg',     focus: '지시어 감각', tone: 'blue', iconKey: 'module-map' },
      survival_numbers:  { image: 'assets/visuals/time-route.svg',      focus: '숫자·시간', tone: 'blue', iconKey: 'module-time' },
      survival_location: { image: 'assets/visuals/pointer-map.svg',     focus: '위치·존재', tone: 'blue', iconKey: 'module-map' },
      survival_transport:{ image: 'assets/visuals/time-route.svg',      focus: '길 묻기', tone: 'blue', iconKey: 'module-map' },
      survival_food:     { image: 'assets/visuals/order-tray.svg',      focus: '주문·부탁', tone: 'blue', iconKey: 'module-order' },
      survival_shopping: { image: 'assets/visuals/pointer-map.svg',     focus: '가격·비교', tone: 'blue', iconKey: 'module-map' },
      survival_hotel:    { image: 'assets/visuals/order-tray.svg',      focus: '숙박 요청', tone: 'blue', iconKey: 'module-talk' },
      daily_adjectives:  { image: 'assets/visuals/business-board.svg',  focus: '동사 활용', tone: 'emerald', iconKey: 'module-talk' },
      daily_feelings:    { image: 'assets/visuals/greeting-bridge.svg', focus: '형용사 표현', tone: 'emerald', iconKey: 'module-talk' },
      daily_places:      { image: 'assets/visuals/pointer-map.svg',     focus: '장소 설명', tone: 'emerald', iconKey: 'module-map' },
      daily_health:      { image: 'assets/visuals/health-kit.svg',      focus: '증상 설명', tone: 'emerald', iconKey: 'module-health' },
      it_tech_vocab:     { image: 'assets/visuals/business-board.svg',  focus: 'IT 기초 어휘', tone: 'slate', iconKey: 'module-work' },
      it_workplace_vocab:{ image: 'assets/visuals/business-board.svg',  focus: '조직·직장', tone: 'slate', iconKey: 'module-work' },
      biz_basic:         { image: 'assets/visuals/business-board.svg',  focus: '비즈니스 표현', tone: 'slate', iconKey: 'module-work' },
      biz_meeting:       { image: 'assets/visuals/business-board.svg',  focus: '회의·의견', tone: 'slate', iconKey: 'module-work' },
      biz_1on1:          { image: 'assets/visuals/business-board.svg',  focus: '1on1 대화', tone: 'slate', iconKey: 'module-work' },
      biz_intro:         { image: 'assets/visuals/greeting-bridge.svg', focus: '입사 소개', tone: 'slate', iconKey: 'module-work' },
      biz_spec:          { image: 'assets/visuals/business-board.svg',  focus: '사양 확인', tone: 'slate', iconKey: 'module-work' },
      adv_keigo:         { image: 'assets/visuals/advanced-ribbon.svg', focus: '경어 마스터', tone: 'slate', iconKey: 'module-advanced' }
    };
    return map[mod?.id] || { image: 'assets/visuals/advanced-ribbon.svg', focus: '실전 학습', tone: 'slate', iconKey: 'module-advanced' };
  }

  // ── Build Shell UI ────────────────────────────────────────
  function _buildUI() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <!-- Header -->
      <header class="app-header" id="appHeader">
        <div class="header-left">
          <button class="btn-back hidden" id="btnBack" onclick="App.goBack()">←</button>
          <div>
            <span class="app-title">일본어 마스터</span>
          </div>
        </div>
        <div class="header-right">
          <div class="stat-pill" id="xpPill">
            ${_uiIconWrap('xp', 'stat-pill-icon')}
            <span id="headerXP">0</span> XP
          </div>
          <div class="stat-pill" id="streakPill">
            ${_uiIconWrap('streak', 'stat-pill-icon')}
            <span id="headerStreak">0</span>
          </div>
        </div>
      </header>

      <!-- Main content -->
      <main class="app-main" id="appMain">
        <!-- Home -->
        <div class="view active" id="viewHome">
          <div class="home-view" id="homeContent"></div>
        </div>
        <!-- Lesson -->
        <div class="view" id="viewLesson">
          <div class="lesson-view" id="lessonContent"></div>
        </div>
        <!-- Practice -->
        <div class="view" id="viewPractice">
          <div class="practice-view" id="practiceContent"></div>
        </div>
        <!-- Profile -->
        <div class="view" id="viewProfile">
          <div class="profile-view" id="profileContent"></div>
        </div>
      </main>

      <!-- Bottom Nav -->
      <nav class="bottom-nav" id="bottomNav">
        <button class="nav-btn active" data-tab="home">
          <span class="nav-icon">${_uiIconSvg('home', 'nav-icon-svg')}</span>
          <span class="nav-label">홈</span>
        </button>
        <button class="nav-btn" data-tab="lesson">
          <span class="nav-icon">${_uiIconSvg('lesson', 'nav-icon-svg')}</span>
          <span class="nav-label">레슨</span>
        </button>
        <button class="nav-btn" data-tab="practice">
          <span class="nav-icon">${_uiIconSvg('practice', 'nav-icon-svg')}</span>
          <span class="nav-label">연습</span>
        </button>
        <button class="nav-btn" data-tab="profile">
          <span class="nav-icon">${_uiIconSvg('profile', 'nav-icon-svg')}</span>
          <span class="nav-label">나</span>
        </button>
      </nav>

      <!-- Flow Screen (overlays everything) -->
      <div class="flow-screen" id="flowScreen">
        <div class="flow-header">
          <button class="btn-back" onclick="App.closeFlow()">←</button>
          <div class="flow-title" id="flowTitle">학습 중...</div>
          <div class="flow-step" id="flowStep"></div>
        </div>
        <div class="flow-progress">
          <div class="flow-progress-fill" id="flowProgressFill" style="width:0%"></div>
        </div>
        <div class="flow-body" id="flowBody"></div>
        <div class="flow-footer" id="flowFooter"></div>
      </div>

      <!-- Toast -->
      <div class="toast" id="toast"></div>
    `;
  }

  // ── Nav Binding ───────────────────────────────────────────
  function _bindNav() {
    document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
  }

  function switchTab(tab) {
    _currentTab = tab;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view' + _capitalize(tab)).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    _updateHeader();
  }

  function _updateHeader() {
    const prog = Store.get();
    document.getElementById('headerXP').textContent = _formatNum(prog.xp);
    document.getElementById('headerStreak').textContent = prog.streak;
  }

  // ════════════════════════════════════════════════════════
  //  HOME VIEW
  // ════════════════════════════════════════════════════════
  function _renderHome() {
    const prog = Store.get();
    _updateHeader();
    const next = getNextModule(prog);
    const isFirstVisit = prog.xp === 0 && Object.keys(prog.modules).length === 0;

    let html = '';

    // ── First Visit Welcome ────────────────────────────────
    if (isFirstVisit) {
      html += `
        <div class="welcome-card">
          <div class="welcome-visual">
            <img src="assets/visuals/kana-grid.svg" alt="히라가나 시작 안내">
            <div class="visual-badge">${_uiIconSvg('module-kana', 'visual-badge-svg')}</div>
          </div>
          <div class="welcome-title">일본어 마스터에 오신 걸 환영합니다</div>
          <div style="font-size:14px;color:var(--text2);line-height:1.6;margin-bottom:20px">
            히라가나부터 IT 비즈니스 일본어까지<br>
            단계별로 <b style="color:var(--accent2)">차근차근 쌓아 가는</b> 학습 시스템입니다.<br>
            가장 중요한 첫걸음인 히라가나부터 시작해 볼까요?
          </div>
          <button class="btn btn-primary" onclick="App.openModule('kana_hira')"
                  style="border-radius:20px;padding:14px 32px;font-size:16px">
            히라가나 시작하기
          </button>
        </div>
      `;
    }

    // ── Continue Banner ──────────────────────────────────
    if (next && !isFirstVisit) {
      const stage = STAGES.find(s => s.id === next.mod.stageId);
      const pct = getModuleProgressPct(next.mod.id, prog);
      const title = next.roleplay ? next.mod.roleplay.name : next.mod.name;
      const sub = `STAGE ${stage.id}: ${stage.name}`;
      const visual = _getModuleVisual(next.mod);
      html += `
        <div class="continue-banner" onclick="App.openModule('${next.mod.id}', ${next.roleplay ? 'true' : 'false'})">
          <div class="continue-visual ${visual.tone}">
            ${visual.image ? `<img src="${visual.image}" alt="${escHtml(next.mod.name)}">` : `<span>${escHtml(next.mod.icon)}</span>`}
            <div class="visual-badge">${_uiIconSvg(visual.iconKey, 'visual-badge-svg')}</div>
          </div>
          <div class="continue-label">계속 학습하기</div>
          <div class="continue-module">${escHtml(title)}</div>
          <div class="continue-stage">${escHtml(sub)}</div>
          <div class="continue-focus">${escHtml(visual.focus)}</div>
          <div class="continue-arrow">›</div>
          <div class="continue-progress">
            <div class="continue-progress-bar" style="width:${pct}%"></div>
          </div>
        </div>
      `;
    } else if (!isFirstVisit) {
      html += `
        <div class="continue-banner" style="cursor:default;">
          <div class="continue-label">오늘의 학습</div>
          <div class="continue-module">오늘의 레슨을 모두 마쳤습니다</div>
          <div class="continue-stage">계속 연습하거나 심화 학습을 이어가세요</div>
        </div>
      `;
    }

    // ── Daily Missions ─────────────────────────────────────
    if (!isFirstVisit) {
      const missions = _getDailyMissions(prog);
      const completedMissions = missions.filter(m => m.done).length;
      html += `
        <div style="margin:0 16px 4px">
          <div class="section-title section-title-row" style="padding:0 0 10px">
            ${_uiIconWrap('target', 'section-title-icon')}
            오늘의 미션 · ${completedMissions}/${missions.length}
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${missions.map(m => `
              <div style="background:var(--card);border:1px solid ${m.done ? 'rgba(16,185,129,.3)' : 'var(--border)'};
                           border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:12px;
                           cursor:${m.action ? 'pointer' : 'default'}"
                   onclick="${m.action || ''}">
                <span class="mission-icon">${_uiIconSvg(m.iconKey, 'mission-icon-svg')}</span>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:700;${m.done ? 'text-decoration:line-through;color:var(--text3)' : ''}">${escHtml(m.title)}</div>
                  <div style="font-size:11px;color:var(--text3);margin-top:2px">${escHtml(m.desc)}</div>
                </div>
                <span class="mission-status">${_uiIconSvg(m.done ? 'check' : 'progress', 'mission-status-icon')}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // ── Stats ─────────────────────────────────────────────
    const doneMods = Object.entries(prog.modules).filter(([k, mp]) => {
      const mod = MODULES.find(m => m.id === k);
      return mod && mp.stepsCompleted >= mod.steps.length;
    }).length;

    if (!isFirstVisit) {
      html += `
        <div class="stats-row" style="margin-top:16px">
          <div class="stat-card streak">
            <div class="stat-num">${prog.streak}</div>
            <div class="stat-name stat-name-row">${_uiIconWrap('streak', 'mini-stat-icon')}연속 일수</div>
          </div>
          <div class="stat-card xp">
            <div class="stat-num">${_formatNum(prog.xp)}</div>
            <div class="stat-name stat-name-row">${_uiIconWrap('xp', 'mini-stat-icon')}XP</div>
          </div>
          <div class="stat-card done">
            <div class="stat-num">${doneMods}</div>
            <div class="stat-name stat-name-row">${_uiIconWrap('check', 'mini-stat-icon')}완료 모듈</div>
          </div>
        </div>
      `;
    }

    // ── Stage Map ─────────────────────────────────────────
    html += `<div class="section-title">학습 로드맵</div>`;
    html += `<div class="stage-map">`;
    STAGES.forEach(stage => {
      const pct = getStageProgressPct(stage.id, prog);
      const locked = prog.xp < stage.unlockXP;
      const modCount = getModulesByStage(stage.id).length;
      html += `
        <div class="stage-card ${locked ? 'locked' : ''}" data-stage="${stage.id}"
             onclick="${!locked ? `App.switchTab('lesson')` : ''}">
          <div class="stage-header">
            <div class="stage-icon-wrap">
              ${_uiIconSvg(_getStageIconKey(stage.id), 'stage-icon-svg')}
            </div>
            <div class="stage-meta">
              <div class="stage-name">STAGE ${stage.id}: ${escHtml(stage.name)}</div>
              <div class="stage-sub">${stage.jlpt ? `JLPT ${stage.jlpt} · ` : ''}${modCount}개 모듈</div>
            </div>
            <span class="stage-tag">${locked ? `${_uiIconWrap('lock', 'stage-tag-icon')}${_formatNum(stage.unlockXP)} XP` : (pct === 100 ? _uiIconWrap('check', 'stage-tag-icon') : `${pct}%`)}</span>
          </div>
          <div class="stage-progress-wrap">
            <div class="stage-progress-bar-bg">
              <div class="stage-progress-bar-fill" style="width:${pct}%"></div>
            </div>
            <div class="stage-progress-text">
              <span>${locked ? `${_formatNum(stage.unlockXP - prog.xp)} XP 더 필요` : stage.desc.slice(0, 30) + '…'}</span>
              <span>${pct}%</span>
            </div>
          </div>
        </div>
      `;
    });
    html += `</div>`;

    document.getElementById('homeContent').innerHTML = html;
  }

  // ════════════════════════════════════════════════════════
  //  LESSON VIEW
  // ════════════════════════════════════════════════════════
  function _renderLesson() {
    const prog = Store.get();
    let html = '';

    STAGES.forEach(stage => {
      const locked = prog.xp < stage.unlockXP;
      const mods = getModulesByStage(stage.id);
      if (!mods.length) return;

      const dotColor = stage.color;
      const badgeBg = locked ? 'rgba(100,116,139,.2)' : `rgba(${_hexToRgb(stage.color)},.15)`;
      const badgeColor = locked ? 'var(--text3)' : stage.color;

      html += `
        <div class="lesson-stage-section">
          <div class="lesson-stage-header">
            <div class="lesson-stage-dot" style="background:${locked ? '#475569' : dotColor}"></div>
            <span class="lesson-stage-title">${_uiIconWrap(_getStageIconKey(stage.id), 'lesson-stage-icon')}STAGE ${stage.id}: ${escHtml(stage.name)}</span>
            <span class="lesson-stage-badge" style="background:${badgeBg};color:${badgeColor};padding:3px 8px;border-radius:20px;font-size:10px;font-weight:700;">
              ${locked ? `${_uiIconWrap('lock', 'badge-icon')}${_formatNum(stage.unlockXP)} XP` : (stage.jlpt || '심화 학습')}
            </span>
          </div>
          <div class="module-list">
      `;

      mods.forEach(mod => {
        const modLocked = locked || !isModuleUnlocked(mod.id, prog);
        const mp = prog.modules[mod.id] || {};
        const totalSteps = mod.steps.length;
        const done = mp.stepsCompleted || 0;
        const pct = Math.round((done / totalSteps) * 100);
        const completed = done >= totalSteps;
        const rpUnlocked = isRoleplayUnlocked(mod.id, prog);
        const visual = _getModuleVisual(mod);

        let statusIcon = _uiIconSvg('progress', 'module-status-icon-svg');
        let statusClass = 'play';
        if (modLocked)  { statusIcon = _uiIconSvg('lock', 'module-status-icon-svg'); statusClass = 'lock'; }
        else if (completed) { statusIcon = _uiIconSvg('check', 'module-status-icon-svg'); statusClass = 'done'; }

        html += `
          <div class="module-card ${modLocked ? 'locked' : ''} ${completed ? 'completed' : ''}"
               onclick="${!modLocked ? `App.openModule('${mod.id}')` : ''}">
            <div class="module-visual ${visual.tone}">
              ${visual.image ? `<img src="${visual.image}" alt="${escHtml(mod.name)}">` : `<span class="module-visual-emoji">${escHtml(mod.icon)}</span>`}
              <div class="visual-badge">${_uiIconSvg(visual.iconKey, 'visual-badge-svg')}</div>
            </div>
            <div class="module-info">
              <div class="module-name">${escHtml(mod.name)}</div>
              <div class="module-sub">${escHtml(mod.nameJp || '')} · ${totalSteps}단계</div>
              <div class="module-focus-tag">${escHtml(visual.focus)}</div>
              ${!modLocked ? `
              <div class="module-prog">
                <div class="module-prog-bar">
                  <div class="module-prog-fill" style="width:${pct}%;background:${stage.color}"></div>
                </div>
                <span class="module-prog-pct">${done}/${totalSteps}</span>
              </div>` : ''}
            </div>
            <div class="module-status ${statusClass}">${statusIcon}</div>
          </div>
        `;

        // Roleplay entry (shown below module when steps complete)
        if (mod.roleplay && !modLocked) {
          const rpDone = mp.roleplayDone;
          html += `
            <div class="roleplay-card ${!rpUnlocked ? 'locked' : ''}"
                 onclick="${rpUnlocked ? `App.openModule('${mod.id}', true)` : ''}">
              <span class="rp-icon">${_uiIconSvg('roleplay', 'rp-icon-svg')}</span>
              <div class="rp-info">
                <div class="rp-name">${escHtml(mod.roleplay.name)}</div>
                <div class="rp-hint">${rpUnlocked ? escHtml(mod.roleplay.desc) : `위 ${totalSteps}단계 완료 후 해금`}</div>
              </div>
              <span class="rp-lock">${rpDone ? _uiIconSvg('check', 'rp-lock-icon') : (rpUnlocked ? _uiIconSvg('progress', 'rp-lock-icon') : _uiIconSvg('lock', 'rp-lock-icon'))}</span>
            </div>
          `;
        }
      });

      html += `</div></div>`;
    });

    document.getElementById('lessonContent').innerHTML = html;
  }

  // ════════════════════════════════════════════════════════
  //  PRACTICE VIEW
  // ════════════════════════════════════════════════════════
  function _renderPractice() {
    const prog = Store.get();
    const kanaUnlocked = (prog.kanaProgress[1]?.learned) || true;
    const vocabUnlocked = prog.xp >= 400;
    const quizUnlocked  = prog.xp >= 800;
    const allKanaChars = Object.keys(KANA_MAP || {});
    const allVocabIds = _getAllVocabItems().map(item => item.id).filter(Boolean);
    const dueKanaCount = Store.countDueKana(allKanaChars);
    const dueVocabCount = Store.countDueVocab(allVocabIds);

    let html = `
      <div class="practice-section-title">빠른 복습</div>
      <div class="practice-grid">
        <div class="practice-item" onclick="App.startKanaReview()">
          <div class="pi-icon pi-icon-text">あア</div>
          <div class="pi-name">가나 플래시카드</div>
          <div class="pi-stage">${dueKanaCount > 0 ? `오늘 복습 ${dueKanaCount}개` : '히라가나 · 가타가나 전체'}</div>
        </div>
        <div class="practice-item ${!vocabUnlocked ? 'locked' : ''}"
             onclick="${vocabUnlocked ? "App.startVocabReview()" : ''}">
          <div class="pi-icon">${_uiIconSvg('book', 'pi-icon-svg')}</div>
          <div class="pi-name">어휘 복습</div>
          <div class="pi-stage">${dueVocabCount > 0 ? `오늘 복습 ${dueVocabCount}개` : '학습한 단어 전체'}</div>
          ${!vocabUnlocked ? `<div class="pi-lock">${_uiIconSvg('lock', 'pi-lock-icon')}</div>` : ''}
        </div>
        <div class="practice-item ${!quizUnlocked ? 'locked' : ''}"
             onclick="${quizUnlocked ? "App.startRandomQuiz('kana')" : ''}">
          <div class="pi-icon">${_uiIconSvg('quiz', 'pi-icon-svg')}</div>
          <div class="pi-name">가나 퀴즈</div>
          <div class="pi-stage">랜덤 20문제</div>
          ${!quizUnlocked ? `<div class="pi-lock">${_uiIconSvg('lock', 'pi-lock-icon')}</div>` : ''}
        </div>
        <div class="practice-item ${!quizUnlocked ? 'locked' : ''}"
             onclick="${quizUnlocked ? "App.startRandomQuiz('vocab')" : ''}">
          <div class="pi-icon">${_uiIconSvg('practice', 'pi-icon-svg')}</div>
          <div class="pi-name">어휘 퀴즈</div>
          <div class="pi-stage">랜덤 20문제</div>
          ${!quizUnlocked ? `<div class="pi-lock">${_uiIconSvg('lock', 'pi-lock-icon')}</div>` : ''}
        </div>
      </div>

      <div class="practice-section-title" style="margin-top:8px">청취 연습</div>
      <div class="practice-grid">
        <div class="practice-item ${!quizUnlocked ? 'locked' : ''}"
             onclick="${quizUnlocked ? "App.startListeningQuiz()" : ''}">
          <div class="pi-icon">${_uiIconSvg('headphones', 'pi-icon-svg')}</div>
          <div class="pi-name">듣기 퀴즈</div>
          <div class="pi-stage">음성 → 글자 맞추기</div>
          ${!quizUnlocked ? `<div class="pi-lock">${_uiIconSvg('lock', 'pi-lock-icon')}</div>` : ''}
        </div>
        <div class="practice-item ${!quizUnlocked ? 'locked' : ''}"
             onclick="${quizUnlocked ? "App.startSpeakingPractice()" : ''}">
          <div class="pi-icon">${_uiIconSvg('mic', 'pi-icon-svg')}</div>
          <div class="pi-name">따라 말하기</div>
          <div class="pi-stage">쉐도잉 연습</div>
          ${!quizUnlocked ? `<div class="pi-lock">${_uiIconSvg('lock', 'pi-lock-icon')}</div>` : ''}
        </div>
      </div>
    `;

    document.getElementById('practiceContent').innerHTML = html;
  }

  // ════════════════════════════════════════════════════════
  //  PROFILE VIEW
  // ════════════════════════════════════════════════════════
  function _renderProfile() {
    const prog = Store.get();
    const totalXP = prog.xp;
    const nextLevelXP = _nextLevelXP(totalXP);
    const curLevelXP  = _curLevelXP(totalXP);
    const levelName   = _levelName(totalXP);
    const xpInLevel   = totalXP - curLevelXP;
    const xpForLevel  = nextLevelXP - curLevelXP;
    const xpPct       = Math.round((xpInLevel / xpForLevel) * 100);

    // Completed items count
    const learnedKana = Object.keys(prog.kanaProgress).length * 10;
    const learnedVocab = Object.values(prog.modules)
      .reduce((s, mp) => s + (mp.stepsCompleted || 0) * 5, 0);

    // Streak calendar (last 4 weeks)
    const calDays = _buildCalDays(prog.studyDays);

    let html = `
      <div class="profile-hero">
        <div class="profile-avatar">${_uiIconSvg('profile', 'profile-avatar-svg')}</div>
        <div class="profile-name">${levelName}</div>
        <div class="profile-level">${totalXP} XP · 다음 레벨까지 ${_formatNum(nextLevelXP - totalXP)} XP</div>
        <div class="xp-bar-wrap">
          <div class="xp-bar-bg">
            <div class="xp-bar-fill" style="width:${xpPct}%"></div>
          </div>
          <div class="xp-bar-label">${xpInLevel} / ${xpForLevel} XP</div>
        </div>
      </div>

      <div class="profile-stats-grid">
        <div class="pstat">
          <div class="ps-num" style="color:var(--warning)">${prog.streak}</div>
          <div class="ps-name ps-name-row">${_uiIconWrap('streak', 'mini-stat-icon')}연속일</div>
        </div>
        <div class="pstat">
          <div class="ps-num" style="color:var(--accent2)">${prog.totalDays || 0}</div>
          <div class="ps-name ps-name-row">${_uiIconWrap('calendar', 'mini-stat-icon')}총 학습일</div>
        </div>
        <div class="pstat">
          <div class="ps-num" style="color:var(--success)">${learnedKana + learnedVocab}</div>
          <div class="ps-name ps-name-row">${_uiIconWrap('grid', 'mini-stat-icon')}학습 아이템</div>
        </div>
      </div>

      <div class="profile-section">
        <div class="profile-section-title">최근 4주 학습 기록</div>
        <div class="streak-calendar">
          ${calDays}
        </div>
      </div>

      <div class="profile-section">
        <div class="profile-section-title">${_uiIconWrap('settings', 'section-title-icon')}설정</div>
        <div class="settings-list">
          <div class="settings-item" onclick="App.toggleFurigana()">
            <span class="si-icon">あ</span>
            <span class="si-label">후리가나 표시</span>
            <span class="si-arrow">${prog.settings.furigana ? _uiIconSvg('check', 'settings-state-icon') : _uiIconSvg('progress', 'settings-state-icon muted')}</span>
          </div>
          <div class="settings-item" onclick="App.resetProgress()">
            <span class="si-icon">${_uiIconSvg('trash', 'settings-row-icon')}</span>
            <span class="si-label">진도 초기화</span>
            <span class="si-arrow">${_uiIconSvg('progress', 'settings-state-icon')}</span>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <div class="profile-section-title">${_uiIconWrap('quiz', 'section-title-icon')}퀴즈 설정</div>
        <div style="font-size:12px;color:var(--text3);margin-bottom:10px">통과 기준 점수</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${[50,60,70,80,90].map(r => {
            const cur = parseInt(Store.getSetting('quizPassRate')) || 60;
            const active = cur === r;
            return `<button onclick="App.setQuizPassRate(${r})"
              style="flex:1;padding:10px 6px;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;
                     background:${active ? 'var(--accent)' : 'var(--bg3)'};
                     border:1.5px solid ${active ? 'var(--accent)' : 'var(--border)'};
                     color:${active ? '#fff' : 'var(--text2)'}">
              ${r}%
            </button>`;
          }).join('')}
        </div>
        <div style="font-size:11px;color:var(--text3);margin-top:8px">
          현재: <strong style="color:var(--accent)">${parseInt(Store.getSetting('quizPassRate')) || 60}% 이상</strong>이면 통과
        </div>
      </div>

      <div class="profile-section">
        <div class="profile-section-title">${_uiIconWrap('voice', 'section-title-icon')}음성(TTS) 설정</div>
        ${_buildTTSSettingsHtml()}
      </div>

      <div class="profile-section">
        <div class="profile-section-title" style="color:var(--warning)">${_uiIconWrap('tools', 'section-title-icon')}개발자 테스트 도구</div>
        <div style="font-size:11px;color:var(--text3);padding:0 0 8px 2px">스테이지 해금·퀴즈 통과 테스트용</div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
          <button onclick="App.devAddXP(100)"
            style="flex:1;padding:10px 6px;background:#1e293b;border:1px solid #334155;
                   border-radius:10px;color:var(--accent);font-weight:700;font-size:13px;cursor:pointer">
            +100 XP
          </button>
          <button onclick="App.devAddXP(500)"
            style="flex:1;padding:10px 6px;background:#1e293b;border:1px solid #334155;
                   border-radius:10px;color:var(--accent);font-weight:700;font-size:13px;cursor:pointer">
            +500 XP
          </button>
          <button onclick="App.devAddXP(2000)"
            style="flex:1;padding:10px 6px;background:#1e293b;border:1px solid #334155;
                   border-radius:10px;color:var(--accent);font-weight:700;font-size:13px;cursor:pointer">
            +2000 XP
          </button>
        </div>

        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
          <button onclick="App.devSkipCurrentStep()"
            style="flex:1;min-width:120px;padding:10px 8px;background:#1e293b;border:1px dashed var(--warning);
                   border-radius:10px;color:var(--warning);font-weight:700;font-size:12px;cursor:pointer">
            ⏭ 현재 퀴즈 스킵 (100점)
          </button>
          <button onclick="App.devCompleteCurrentModule()"
            style="flex:1;min-width:120px;padding:10px 8px;background:#1e293b;border:1px dashed var(--success);
                   border-radius:10px;color:var(--success);font-weight:700;font-size:12px;cursor:pointer">
            ✅ 현재 모듈 완료
          </button>
        </div>

        <div style="font-size:11px;color:var(--text3);margin-top:4px">
          현재 TTS: <strong style="color:var(--text2)">${TTS.getEngineName()}</strong>
        </div>
      </div>
    `;
    document.getElementById('profileContent').innerHTML = html;
  }

  // ════════════════════════════════════════════════════════
  //  FLOW — Learning Flow Engine
  // ════════════════════════════════════════════════════════

  // Open a module (optionally start roleplay directly)
  function openModule(moduleId, goRoleplay = false) {
    const mod = MODULES.find(m => m.id === moduleId);
    if (!mod) return;
    const prog = Store.get();
    if (!isModuleUnlocked(moduleId, prog)) {
      showToast('🔒 이전 모듈을 먼저 완료하세요!');
      return;
    }
    if (goRoleplay) {
      if (!isRoleplayUnlocked(moduleId, prog)) {
        showToast('🔒 먼저 모든 학습 단계를 완료하세요!');
        return;
      }
      _startRoleplay(mod);
      return;
    }
    // Show module intro then start steps
    _showModuleIntro(mod);
  }

  function _showModuleIntro(mod) {
    const stage = STAGES.find(s => s.id === mod.stageId);
    const prog = Store.get();
    const stepsDone = prog.modules[mod.id]?.stepsCompleted || 0;
    const startStep = Math.min(stepsDone, mod.steps.length - 1);

    const items = [
      ...mod.steps.map(s => `<div class="intro-item"><span class="ii-check">📖</span> ${escHtml(s.title)}</div>`),
      mod.roleplay ? `<div class="intro-item"><span class="ii-check">🎭</span> 롤플레이: ${escHtml(mod.roleplay.name)}</div>` : ''
    ].join('');

    const flowEl = document.getElementById('flowScreen');
    document.getElementById('flowTitle').textContent = mod.name;
    document.getElementById('flowStep').textContent = '';
    document.getElementById('flowProgressFill').style.width = '0%';

    // 인앱 강의 슬라이드 프리뷰 (있는 모듈만)
    const lectureStep = mod.steps.find(s => s.type === 'lecture');
    const lecPreviewHtml = lectureStep ? (() => {
      const slides = (typeof LECTURE_DATA !== 'undefined') && LECTURE_DATA[lectureStep.lectureKey];
      const firstSlide = slides?.[0];
      if (!firstSlide) return '';
      const ts = { hook:'🎣', culture:'🗾', story:'📖', mnemonic:'💡', funfact:'🎯', practice:'✍️', summary:'✅' };
      const icon = ts[firstSlide.type] || '🎬';
      return `
        <div class="lec-preview-card">
          <div class="lec-preview-badge">${icon} 인앱 강의 포함</div>
          <div class="lec-preview-main">${ruby(firstSlide.main || '')}</div>
          <div class="lec-preview-sub">${escHtml(firstSlide.sub || '')}</div>
          <div class="lec-preview-slides">${slides.length}개 슬라이드 · 학습 시작 시 자동 재생</div>
        </div>
      `;
    })() : '';

    document.getElementById('flowBody').innerHTML = `
      <div class="module-intro">
        <div class="module-intro-icon">${escHtml(mod.icon)}</div>
        <div class="module-intro-title">${escHtml(mod.name)}</div>
        <div class="module-intro-sub">${escHtml(mod.desc)}<br>
          <span style="color:var(--text3);font-size:13px;margin-top:6px;display:block">
            STAGE ${stage.id}: ${escHtml(stage.name)}
          </span>
        </div>
        <div class="module-intro-items">${items}</div>
      </div>
      ${lecPreviewHtml}
    `;

    const allDone = stepsDone >= mod.steps.length;
    if (stepsDone > 0) {
      // 진행 중 또는 완료 — 처음부터 + 이어서 두 버튼 모두 표시
      const continueLabel = allDone ? '복습 모드 (처음부터) ▶' : `${stepsDone}단계부터 이어서 ▶`;
      document.getElementById('flowFooter').innerHTML = `
        <div style="display:flex;gap:8px">
          <button class="btn btn-outline" style="flex:1"
                  onclick="App._startFlowFromStep('${mod.id}', 0)">↩ 처음부터</button>
          <button class="btn btn-primary" style="flex:2"
                  onclick="App._startFlowFromStep('${mod.id}', ${startStep})">
            ${escHtml(continueLabel)}
          </button>
        </div>
      `;
    } else {
      document.getElementById('flowFooter').innerHTML = `
        <button class="btn btn-primary"
                onclick="App._startFlowFromStep('${mod.id}', 0)">학습 시작 ▶</button>
      `;
    }

    _openFlowScreen();
    _flow = { moduleId: mod.id, step: -1 };
  }

  function _startFlowFromStep(moduleId, stepIndex) {
    _flow = { moduleId, step: stepIndex };
    _runCurrentStep();
  }

  function _runCurrentStep() {
    const { moduleId, step } = _flow;
    // 실제 모듈 또는 연습용 가상 모듈
    const mod = MODULES.find(m => m.id === moduleId) || _flow._virtMod;
    if (!mod) return;

    if (step >= mod.steps.length) {
      if (_flow._virtMod) {
        _showPracticeComplete(mod);
      } else {
        _showModuleCompletion(mod);
      }
      return;
    }

    const s = mod.steps[step];
    const total = mod.steps.length;
    _updateFlowProgress(step, total, s.title);

    switch (s.type) {
      case 'lecture':         _renderLecture(mod, s, step); break;
      case 'kana_learn':      _renderKanaLearn(mod, s, step); break;
      case 'kana_quiz':       _renderKanaQuiz(mod, s, step); break;
      case 'kana_listening':  _renderKanaListening(mod, s, step); break;
      case 'shadowing':       _renderShadowing(mod, s, step); break;
      case 'vocab_learn':     _renderVocabLearn(mod, s, step); break;
      case 'vocab_quiz':      _renderVocabQuiz(mod, s, step); break;
      case 'dialogue_study':  _renderDialogueStudy(mod, s, step); break;
      default:                _advanceStep(); break;
    }
  }

  function _showPracticeComplete(mod) {
    document.getElementById('flowBody').innerHTML = `
      <div class="completion-screen">
        <div class="completion-emoji">🎉</div>
        <div class="completion-title">연습 완료!</div>
        <div class="completion-sub">${escHtml(mod.name)} 세션 완료!<br>꾸준한 연습이 실력을 만들어요.</div>
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = `
      <button class="btn btn-primary" onclick="App.closeFlow()">홈으로 →</button>
    `;
  }

  function _advanceStep() {
    _flow.step++;
    _runCurrentStep();
  }

  function _updateFlowProgress(step, total, title) {
    const pct = total > 0 ? Math.round(((step) / total) * 100) : 0;
    document.getElementById('flowTitle').textContent = title || '학습 중';
    document.getElementById('flowStep').textContent = `${step + 1} / ${total}`;
    document.getElementById('flowProgressFill').style.width = pct + '%';
  }

  function _isKanaBasicLevel(levelId) {
    return [1, 2, 3, 4, 8, 9, 10, 11].includes(levelId);
  }

  function _isKanaReviewLevel(levelId) {
    return [5, 15, 16].includes(levelId);
  }

  function _getKanaAllowedExampleChars(level) {
    if (!level) return null;
    if (level.type === 'hiragana' && level.id >= 1 && level.id <= 4) {
      return new Set(LEVELS.filter(l => l.type === 'hiragana' && l.id >= 1 && l.id <= level.id).flatMap(l => l.chars));
    }
    if (level.type === 'katakana' && level.id >= 8 && level.id <= 11) {
      return new Set(LEVELS.filter(l => l.type === 'katakana' && l.id >= 8 && l.id <= level.id).flatMap(l => l.chars));
    }
    return null;
  }

  function _isBeginnerSafeKanaWord(word, allowedChars) {
    const clean = stripFuri(word || '');
    if (!clean || clean.length > 3) return false;
    if (/[っッゃゅょぁぃぅぇぉャュョァィゥェォー]/.test(clean)) return false;
    return Array.from(clean).every(ch => allowedChars?.has(ch));
  }

  function _getKanaExamplesForCard(char, level) {
    const info = KANA_MAP[char] || {};
    const allExamples = info.examples || [];
    if (!_isKanaBasicLevel(level?.id)) return allExamples.slice(0, 3);
    const allowedChars = _getKanaAllowedExampleChars(level);
    const filtered = allExamples.filter(ex => _isBeginnerSafeKanaWord(ex.word, allowedChars));
    return (filtered.length ? filtered : allExamples.slice(0, 2)).slice(0, 3);
  }

  const _KANA_CONFUSION_GROUPS = [
    ['あ','お'], ['き','さ'], ['ぬ','め'], ['れ','ね'], ['わ','れ'], ['は','ほ'], ['る','ろ'],
    ['ア','マ'], ['シ','ツ'], ['ソ','ン'], ['ク','ケ'], ['コ','ユ'], ['フ','ワ'], ['ヌ','メ']
  ];

  function _getKanaDistractors(char, info, allChars, count = 3) {
    const confusionPool = _KANA_CONFUSION_GROUPS
      .filter(group => group.includes(char))
      .flatMap(group => group.filter(item => item !== char));
    const sameTypePool = allChars.filter(k => k !== char && KANA_MAP[k].type === info.type);
    const merged = [...new Set([...confusionPool, ...shuffle(sameTypePool)])];
    return merged.slice(0, count);
  }

  // ── Kana Learn ────────────────────────────────────────────
  function _renderKanaLearn(mod, step, stepIndex) {
    const level = LEVELS.find(l => l.id === step.levelId);
    const chars = step.chars?.length ? step.chars : level?.chars;
    if (!chars?.length) { _advanceStep(); return; }
    const levelType = step.kanaType || level?.type || 'hiragana';

    // State stored on _flow so all handlers share it
    _flow._kanaState = {
      chars,
      level: level || { type: levelType },
      customLabel: step.customLabel || '',
      cardIdx: 0,
      flipped: false,
      stepIndex
    };

    function render() {
      const st = _flow._kanaState;
      const c = st.chars[st.cardIdx];
      const safeC = c.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
      const info = KANA_MAP[c] || {};
      const examples = _getKanaExamplesForCard(c, st.level)
        .map(ex => `<div class="kana-ex-pill">
          <span class="ex-word">${escHtml(ex.word)}</span>
          <span style="color:var(--text3)"> — </span>${escHtml(ex.meaning)}
        </div>`).join('');

      const typeLabel = st.customLabel || st.level.type
        .replace('hiragana_dakuten','히라가나 탁음')
        .replace('hiragana_yoon','히라가나 요음')
        .replace('hiragana','히라가나')
        .replace('katakana_extended','확장 가타가나')
        .replace('katakana_dakuten','가타가나 탁음')
        .replace('katakana_yoon','가타가나 요음')
        .replace('katakana','가타가나')
        .replace('special','특수 박자')
        .replace('particle','조사 읽기')
        .replace('mixed_review','오늘의 복습');

      document.getElementById('flowBody').innerHTML = `
        <div class="kana-card-stack">
          <div style="font-size:12px;color:var(--text3);text-align:center;margin-bottom:12px">
            ${st.cardIdx + 1} / ${st.chars.length}
            <span style="margin:0 6px">·</span>
            <span style="color:var(--accent2)">${escHtml(typeLabel)}</span>
          </div>
          <div class="kana-card ${st.flipped ? 'flipped' : ''}" id="kanaCard" onclick="App._flipKana()">
            <div class="kana-card-inner">
              <div class="kana-face">
                <button class="kana-sound-btn" onclick="event.stopPropagation();TTS.speak('${safeC}')" title="발음 듣기">🔊</button>
                <div class="kana-type-label">${escHtml(typeLabel)}</div>
                <div class="kana-char ${isSmallKana(c) ? 'is-small' : ''}">${ruby(c)}</div>
                <div class="kana-tap-hint">탭해서 읽는 법 보기 👆</div>
              </div>
              <div class="kana-back">
                <!-- ① 읽기 정보 -->
                <div class="kana-reading-row">
                  <button class="kana-back-sound"
                          onclick="event.stopPropagation();TTS.speak('${safeC}')">🔊</button>
                  <span class="kana-romaji-sm">${escHtml(info.romaji || '')}</span>
                  <span class="kana-reading-dot">·</span>
                  <span class="kana-korean-sm">${escHtml(info.korean || '')}</span>
                </div>
                <!-- ② 기억법 (TIP) -->
                ${info.tip ? `
                <div class="kana-tip-main">
                  <div class="kana-tip-label">💡 기억법</div>
                  <div class="kana-tip-body">${ruby(info.tip)}</div>
                </div>` : ''}
                <!-- ③ 획순 인라인 (전체 너비, 🔄 우상단 오버레이) -->
                <div class="kana-stroke-row">
                  <div class="kana-stroke-mini" id="kanaStrokeInline">
                    <div class="kana-stroke-loading">…</div>
                  </div>
                  <button class="kana-stroke-replay-btn"
                          onclick="event.stopPropagation();App._replayInlineStroke()"
                          title="다시 그리기">🔄</button>
                </div>
                <!-- ④ 예문 -->
                <div class="kana-examples">${examples}</div>
              </div>
            </div>
          </div>
          <!-- Mini progress dots -->
          <div style="display:flex;gap:3px;justify-content:center;margin-top:10px;flex-wrap:wrap;max-width:340px;padding:0 8px">
            ${st.chars.slice(0, 46).map((ch, i) => `
              <div style="width:7px;height:7px;border-radius:50%;flex-shrink:0;
                background:${i < st.cardIdx ? 'var(--success)' : i === st.cardIdx ? 'var(--accent)' : 'var(--bg3)'}">
              </div>`).join('')}
          </div>
        </div>
      `;

      const isLast = st.cardIdx === st.chars.length - 1;
      document.getElementById('flowFooter').innerHTML = `
        <div style="display:flex;gap:10px">
          <button class="btn btn-outline" onclick="App._kanaLearnPrev()"
                  style="flex:1" ${st.cardIdx === 0 ? 'disabled' : ''}>← 이전</button>
          <button class="btn btn-primary" onclick="App._kanaLearnNext()" style="flex:2">
            ${isLast ? '완료 ✓' : '다음 →'}
          </button>
        </div>
      `;
    }

    _flow._kanaRender = render;
    render();
    TTS.speak(chars[0]);
  }

  function _flipKana() {
    if (!_flow._kanaState) return;
    const st = _flow._kanaState;
    st.flipped = !st.flipped;
    const card = document.getElementById('kanaCard');
    if (card) {
      if (st.flipped) {
        card.classList.add('flipped');
        TTS.speak(st.chars[st.cardIdx]);
        // 카드 플립 애니메이션(500ms) 완료 후 획순 자동 시작
        setTimeout(() => _startInlineStroke(st.chars[st.cardIdx]), 520);
      } else {
        card.classList.remove('flipped');
        _stopInlineStroke();
      }
    }
  }

  function _kanaLearnNext() {
    _stopInlineStroke();
    const st = _flow._kanaState;
    if (!st) return;
    st.flipped = false;
    if (st.cardIdx < st.chars.length - 1) {
      st.cardIdx++;
      _flow._kanaRender();
      TTS.speak(st.chars[st.cardIdx]);
    } else {
      // Done — mark step complete
      Store.completeStep(_flow.moduleId, st.stepIndex);
      Store.addXP(50);
      _flow.step = st.stepIndex + 1;
      _runCurrentStep();
    }
  }

  function _kanaLearnPrev() {
    _stopInlineStroke();
    const st = _flow._kanaState;
    if (!st || st.cardIdx === 0) return;
    st.cardIdx--;
    st.flipped = false;
    _flow._kanaRender();
  }

  function _kanaSpeak(char, romaji) {
    TTS.speak(char);
  }

  // ── Kana Quiz ─────────────────────────────────────────────
  function _renderKanaQuiz(mod, step, stepIndex) {
    const level = LEVELS.find(l => l.id === step.levelId);
    const sourceChars = step.chars?.length ? step.chars : level?.chars;
    if (!sourceChars?.length) { _advanceStep(); return; }
    const maxQuestions = _isKanaReviewLevel(level?.id) ? Math.min(20, sourceChars.length) : sourceChars.length;
    const chars = shuffle(sourceChars).slice(0, maxQuestions);

    // renderQ는 반드시 _flow._kanaQuiz에서 읽어야 다음 문제로 넘어감 (클로저 버그 방지)
    function renderQ() {
      const fq = _flow._kanaQuiz;
      if (!fq) return;
      const { qIdx, correct, wrong } = fq;

      if (qIdx >= fq.chars.length) {
        // [Retry Logic] 틀린 문제가 있으면 다시 풀기 페이즈로 전환 (단, 최종 점수는 첫 시도 기준)
        if (!fq.isReview && fq.missed.length > 0) {
          fq.isReview = true;
          fq.originalChars = fq.chars; // 원래 문제들 보관 (혹시 필요할까봐)
          fq.chars = shuffle([...fq.missed]);
          fq.qIdx = 0;
          _showRetryTransition(fq.missed.length, fq.renderQ);
          return;
        }
        _showQuizResult(correct, fq.totalCount, stepIndex, Math.round((correct / fq.totalCount) * 100));
        return;
      }
      const c = fq.chars[qIdx];
      const info = KANA_MAP[c] || {};
      // Build choices: 1 correct + 3 random distractors
      const allChars = Object.keys(KANA_MAP).filter(k => k !== c && KANA_MAP[k].type === info.type);
      const distractors = _getKanaDistractors(c, info, allChars, 3)
        .map(k => ({ kana: k, korean: KANA_MAP[k].korean, romaji: KANA_MAP[k].romaji }));
      const choices = shuffle([
        { kana: c, korean: info.korean, romaji: info.romaji, correct: true },
        ...distractors.map(d => ({ ...d, correct: false }))
      ]);

      const pct = Math.round((qIdx / fq.chars.length) * 100);
      _updateFlowProgress(stepIndex, mod.steps.length, step.title);
      document.getElementById('flowProgressFill').style.width = pct + '%';

      document.getElementById('flowBody').innerHTML = `
        <div style="font-size:12px;color:var(--text3);text-align:center;margin-bottom:16px">
          ${qIdx + 1} / ${fq.chars.length} · ✅ ${correct} · ❌ ${wrong}
        </div>
        <div class="quiz-question">
          <div class="quiz-q-type">이 글자의 발음은?</div>
          <div class="quiz-q-text ${isSmallKana(c) ? 'is-small' : ''}">${ruby(c)}</div>
          <button class="quiz-audio-btn" onclick="TTS.speak('${c.replace(/'/g,"\\'")}')">🔊</button>
        </div>
        <div class="quiz-choices" id="quizChoices">
          ${choices.map((ch, i) => `
            <button class="quiz-choice" data-correct="${ch.correct}"
                    onclick="App._kanaQuizAnswer(this, ${ch.correct})">
              <span class="qc-label">${['A','B','C','D'][i]}</span>
              <span>${escHtml(ch.romaji)} · ${escHtml(ch.korean)}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quizFeedback"></div>
      `;
      document.getElementById('flowFooter').innerHTML = `
        <button class="btn btn-primary hidden" id="btnNextQ" onclick="App._kanaQuizNext()">
          다음 →
        </button>
      `;
    }

    _flow._kanaQuiz = {
      chars,
      qIdx: 0,
      correct: 0,
      wrong: 0,
      missed: [],
      isReview: false,
      totalCount: chars.length,
      stepIndex,
      renderQ
    };
    renderQ();
  }

  function _kanaQuizAnswer(btn, isCorrect) {
    const fq = _flow._kanaQuiz;
    if (!fq) return;
    document.querySelectorAll('.quiz-choice').forEach(b => {
      b.classList.add('answered');
      b.onclick = null;
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      fq.correct++;
    } else {
      fq.wrong++;
      // 첫 풀이(not review)에서만 오답 목록에 추가
      if (!fq.isReview) fq.missed.push(fq.chars[fq.qIdx]);
    }
    Store.reviewKanaItem(fq.chars[fq.qIdx], isCorrect ? 'good' : 'again');
    // 정답·오답 모두 음성 재생
    TTS.speak(fq.chars[fq.qIdx]);
    _playQuizEffect(isCorrect);

    const fb = document.getElementById('quizFeedback');
    if (fb) {
      const c = fq.chars[fq.qIdx];
      const info = KANA_MAP[c] || {};
      fb.className = `quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
      fb.innerHTML = isCorrect
        ? `✅ 정답! <strong>${escHtml(c)}</strong> = ${escHtml(info.romaji)} (${escHtml(info.korean)})`
        : `❌ 오답. 정답: <strong>${escHtml(c)}</strong> = ${escHtml(info.romaji)} (${escHtml(info.korean)})`;
    }
    const btnNext = document.getElementById('btnNextQ');
    show(btnNext);
    // 5초 후 자동 다음 (정답일 때만)
    if (isCorrect) {
      if (btnNext) {
        btnNext.innerHTML = '다음 → <div class="auto-next-bar"></div>';
      }
      clearTimeout(_autoNextTimer);
      _autoNextTimer = setTimeout(() => {
        const btn = document.getElementById('btnNextQ');
        if (btn && !btn.classList.contains('hidden')) _kanaQuizNext();
      }, 5000);
    } else {
      if (btnNext) btnNext.innerHTML = '다음 →';
    }
  }

  function _kanaQuizNext() {
    clearTimeout(_autoNextTimer);
    const btn = document.getElementById('btnNextQ');
    if (btn) btn.innerHTML = '다음 →';
    const fq = _flow._kanaQuiz;
    if (!fq) return;
    fq.qIdx++;
    fq.renderQ();
  }

  // ── Kana Listening Quiz ───────────────────────────────────
  function _renderKanaListening(mod, step, stepIndex) {
    const chars = step.chars || shuffle(Object.keys(KANA_MAP)).slice(0, 15);

    function renderQ() {
      const fq = _flow._listeningQuiz;
      if (!fq) return;
      const { qIdx, correct, wrong } = fq;

      if (qIdx >= fq.chars.length) {
        if (!fq.isReview && fq.missed.length > 0) {
          fq.isReview = true;
          fq.originalChars = fq.chars;
          fq.chars = shuffle([...fq.missed]);
          fq.qIdx = 0;
          _showRetryTransition(fq.missed.length, fq.renderQ);
          return;
        }
        _showQuizResult(correct, fq.totalCount, stepIndex,
          Math.round((correct / fq.totalCount) * 100));
        return;
      }

      const c = fq.chars[qIdx];
      const info = KANA_MAP[c] || {};
      // 같은 타입의 글자 3개를 오답 선지로
      const pool = Object.keys(KANA_MAP).filter(k => k !== c && KANA_MAP[k]?.type === info.type);
      const choices = shuffle([c, ...sample(pool, 3)]);

      const pct = Math.round((qIdx / fq.chars.length) * 100);
      _updateFlowProgress(stepIndex, mod.steps.length, step.title);
      document.getElementById('flowProgressFill').style.width = pct + '%';

      const safeC = c.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      document.getElementById('flowBody').innerHTML = `
        <div style="font-size:12px;color:var(--text3);text-align:center;margin-bottom:16px">
          ${qIdx + 1} / ${fq.chars.length} · ✅ ${correct} · ❌ ${wrong}
        </div>
        <div class="quiz-question">
          <div class="quiz-q-type">이 음성의 글자는?</div>
          <div class="quiz-q-text" style="font-size:64px;line-height:1.1">🎧</div>
          <button class="quiz-audio-btn" id="btnPlayAudio"
                  onclick="TTS.speak('${safeC}')">🔊</button>
        </div>
        <div class="quiz-choices">
          ${choices.map((ch, i) => `
            <button class="quiz-choice" data-correct="${ch === c}"
                    onclick="App._listeningQuizAnswer(this, ${ch === c}, '${safeC}')">
              <span class="qc-label">${['A','B','C','D'][i]}</span>
              <span style="font-size:22px;font-weight:700">${escHtml(ch)}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quizFeedback"></div>
      `;
      document.getElementById('flowFooter').innerHTML = `
        <button class="btn btn-primary hidden" id="btnNextQ" onclick="App._listeningQuizNext()">
          다음 →
        </button>
      `;

      // 자동 재생 (300ms 딜레이)
      setTimeout(() => TTS.speak(c), 300);
    }

    _flow._listeningQuiz = {
      chars,
      qIdx: 0,
      correct: 0,
      wrong: 0,
      missed: [],
      isReview: false,
      totalCount: chars.length,
      stepIndex,
      renderQ
    };
    renderQ();
  }

  function _listeningQuizAnswer(btn, isCorrect, correctChar) {
    const fq = _flow._listeningQuiz;
    if (!fq) return;
    document.querySelectorAll('.quiz-choice').forEach(b => {
      b.classList.add('answered');
      b.onclick = null;
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      fq.correct++;
    } else {
      fq.wrong++;
      if (!fq.isReview) fq.missed.push(fq.chars[fq.qIdx]);
    }
    Store.reviewKanaItem(correctChar, isCorrect ? 'good' : 'again');
    TTS.speak(correctChar);
    _playQuizEffect(isCorrect);

    const info = KANA_MAP[correctChar] || {};
    const fb = document.getElementById('quizFeedback');
    if (fb) {
      fb.className = `quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
      fb.innerHTML = isCorrect
        ? `✅ 정답! <strong>${escHtml(correctChar)}</strong> = ${escHtml(info.romaji)} (${escHtml(info.korean)})`
        : `❌ 오답. 정답: <strong>${escHtml(correctChar)}</strong> = ${escHtml(info.romaji)} (${escHtml(info.korean)})`;
    }
    const btnNext = document.getElementById('btnNextQ');
    show(btnNext);
    if (isCorrect) {
      if (btnNext) {
        btnNext.innerHTML = '다음 → <div class="auto-next-bar"></div>';
      }
      clearTimeout(_autoNextTimer);
      _autoNextTimer = setTimeout(() => {
        const btn = document.getElementById('btnNextQ');
        if (btn && !btn.classList.contains('hidden')) _listeningQuizNext();
      }, 5000);
    } else {
      if (btnNext) btnNext.innerHTML = '다음 →';
    }
  }

  function _listeningQuizNext() {
    clearTimeout(_autoNextTimer);
    const btn = document.getElementById('btnNextQ');
    if (btn) btn.innerHTML = '다음 →';
    const fq = _flow._listeningQuiz;
    if (!fq) return;
    fq.qIdx++;
    fq.renderQ();
  }

  // ── Shadowing Practice ───────────────────────────────────
  function _renderShadowing(mod, step, stepIndex) {
    const items = step.items || [];
    if (!items.length) { _showPracticeComplete(mod); return; }

    function renderItem() {
      const sh = _flow._shadowing;
      if (!sh) return;
      const { items: its, idx } = sh;

      if (idx >= its.length) {
        _showPracticeComplete(mod);
        return;
      }

      const item = its[idx];
      const showFuri = Store.getSetting('furigana');
      const jpHtml = showFuri ? formatJp(item) : escHtml(stripFuri(item.kanji || item.japanese || ''));
      const jpText = item.japanese || item.kanji || '';
      const safeJp = jpText.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
      const pct = Math.round((idx / its.length) * 100);

      _updateFlowProgress(stepIndex, mod.steps.length, step.title);
      document.getElementById('flowProgressFill').style.width = pct + '%';

      document.getElementById('flowBody').innerHTML = `
        <div style="font-size:12px;color:var(--text3);text-align:center;margin-bottom:16px">
          ${idx + 1} / ${its.length}
        </div>
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:20px;
                    padding:32px 20px;text-align:center;margin-bottom:16px">
          <div style="font-size:36px;font-weight:800;margin-bottom:12px;line-height:1.3">
            ${jpHtml}
          </div>
          <div style="font-size:16px;color:var(--text2);margin-bottom:20px">
            ${escHtml(item.korean || '')}
          </div>
          <button onclick="TTS.speak('${safeJp}')"
            style="background:var(--bg3);border:1px solid var(--border);border-radius:20px;
                   padding:10px 24px;color:var(--text);cursor:pointer;font-size:14px;font-weight:600">
            🔊
          </button>
        </div>
        <div style="font-size:13px;color:var(--text3);text-align:center">
          소리를 듣고 따라 말해보세요!
        </div>
      `;

      document.getElementById('flowFooter').innerHTML = `
        <button class="btn btn-primary" onclick="App._shadowingNext()" style="font-size:15px">
          🗣️ 따라 말했어요 →
        </button>
      `;

      // 자동 재생
      setTimeout(() => TTS.speak(jpText), 300);
    }

    _flow._shadowing = { items, idx: 0, stepIndex, renderItem };
    renderItem();
  }

  function _shadowingNext() {
    const sh = _flow._shadowing;
    if (!sh) return;
    sh.idx++;
    sh.renderItem();
  }

  // ── Vocab Learn ───────────────────────────────────────────
  function _renderVocabLearn(mod, step, stepIndex) {
    const items = _getVocabItems(step);
    if (!items.length) { Store.completeStep(_flow.moduleId, stepIndex); _advanceStep(); return; }

    // Store ALL state on _flow._vocab so render() always reads fresh values
    _flow._vocab = { items, idx: 0, showMeaning: false, stepIndex, mod, step };

    _vocabRender();
  }

  function _vocabRender() {
    const st = _flow._vocab;
    if (!st) return;

    const { items, idx, showMeaning, stepIndex, mod, step } = st;

    if (idx >= items.length) {
      Store.completeStep(_flow.moduleId, stepIndex);
      Store.addXP(30 + items.length * 2);
      _flow.step = stepIndex + 1;
      _runCurrentStep();
      return;
    }

    const item = items[idx];
    const showFuri = Store.getSetting('furigana');
    const jpHtml = showFuri ? formatJp(item) : escHtml(stripFuri(item.kanji || item.japanese || ''));

    _updateFlowProgress(stepIndex, mod.steps.length, step.title);
    document.getElementById('flowBody').innerHTML = `
      <div style="font-size:12px;color:var(--text3);text-align:center;margin-bottom:16px">
        ${idx + 1} / ${items.length}
      </div>
      <div class="vocab-card" onclick="App._vocabFlip()">
        <button class="vc-audio-btn"
          onclick="event.stopPropagation();App._vocabSpeak()">🔊</button>
        <div class="vc-num">어휘 ${idx + 1}</div>
        <div class="vc-jp">${jpHtml}</div>
        ${item.kanji && item.kanji !== item.japanese
          ? `<div class="vc-kanji">${ruby(item.kanji)}</div>` : ''}
        ${showMeaning ? `
          <div class="vc-divider"></div>
          <div class="vc-meaning">${escHtml(item.korean || '')}</div>
          <div class="vc-english">${escHtml(item.english || '')}</div>
          ${item.tip ? `<div class="vc-tip">${ruby(item.tip)}</div>` : ''}
        ` : `<div class="vc-flip-hint">탭해서 의미 보기 👆</div>`}
      </div>
      <div class="vocab-nav">
        <button class="vocab-nav-btn" onclick="App._vocabPrev()" ${idx === 0 ? 'disabled' : ''}>←</button>
        <div class="vocab-nav-dots">
          ${items.slice(0, 20).map((_,i) =>
            `<div class="vocab-nav-dot ${i===idx?'active':i<idx?'done':''}"></div>`).join('')}
        </div>
        <button class="vocab-nav-btn" onclick="App._vocabNext()">→</button>
      </div>
    `;

    if (showMeaning) {
      document.getElementById('flowFooter').innerHTML = `
        <div class="self-eval">
          <button class="eval-btn again" onclick="App._vocabEval('again')">😵<br>모름</button>
          <button class="eval-btn hard" onclick="App._vocabEval('hard')">😅<br>어려움</button>
          <button class="eval-btn good" onclick="App._vocabEval('good')">😊<br>알겠음</button>
          <button class="eval-btn easy" onclick="App._vocabEval('easy')">😎<br>완벽</button>
        </div>
      `;
    } else {
      document.getElementById('flowFooter').innerHTML = `
        <button class="btn btn-outline" onclick="App._vocabFlip()">의미 확인하기</button>
      `;
    }

    TTS.speak(item.japanese || '');
  }

  function _vocabSpeak() {
    const st = _flow._vocab;
    if (!st || !st.items[st.idx]) return;
    TTS.speak(stripFuri(st.items[st.idx].japanese));
  }

  function _vocabFlip() {
    if (!_flow._vocab) return;
    _flow._vocab.showMeaning = true;
    _vocabRender();
  }

  function _vocabNext() {
    if (!_flow._vocab) return;
    _flow._vocab.showMeaning = false;
    const st = _flow._vocab;
    if (st.idx < st.items.length - 1) {
      st.idx++;
      _vocabRender();
    } else {
      Store.completeStep(_flow.moduleId, st.stepIndex);
      Store.addXP(30 + st.items.length * 2);
      _flow.step = st.stepIndex + 1;
      _runCurrentStep();
    }
  }

  function _vocabPrev() {
    if (!_flow._vocab || _flow._vocab.idx === 0) return;
    _flow._vocab.showMeaning = false;
    _flow._vocab.idx--;
    _vocabRender();
  }

  function _vocabEval(rating) {
    const st = _flow._vocab;
    if (!st) return;
    const item = st.items[st.idx];
    if (item?.id) {
      Store.reviewVocabItem(item.id, rating);
    }
    st.showMeaning = false;
    if (rating === 'again') {
      const currentItem = st.items.splice(st.idx, 1)[0];
      st.items.push(currentItem);
    } else {
      st.idx++;
    }
    if (st.idx >= st.items.length) {
      Store.completeStep(_flow.moduleId, st.stepIndex);
      Store.addXP(30 + st.items.length * 2);
      _flow.step = st.stepIndex + 1;
      _runCurrentStep();
    } else {
      _vocabRender();
    }
  }

  // ── Vocab Quiz ────────────────────────────────────────────
  function _renderVocabQuiz(mod, step, stepIndex) {
    const items = _getVocabItems(step);
    if (!items.length) { _advanceStep(); return; }

    const questions = shuffle(items).slice(0, Math.min(15, items.length));

    // Build all-items pool for distractors
    const allItems = _getAllVocabItems();

    // renderQ는 반드시 _flow._vocabQuiz에서 읽어야 다음 문제로 넘어감 (클로저 버그 방지)
    function renderQ() {
      const fq = _flow._vocabQuiz;
      if (!fq) return;
      const { qIdx, correct, wrong } = fq;

      if (qIdx >= fq.questions.length) {
        if (!fq.isReview && fq.missed.length > 0) {
          fq.isReview = true;
          fq.originalQuestions = fq.questions;
          fq.questions = shuffle([...fq.missed]);
          fq.qIdx = 0;
          _showRetryTransition(fq.missed.length, fq.renderQ);
          return;
        }
        _showQuizResult(correct, fq.totalCount, stepIndex, Math.round((correct / fq.totalCount) * 100));
        return;
      }
      const item = fq.questions[qIdx];
      const distractors = sample(allItems.filter(x => x.id !== item.id), 3);
      const choices = shuffle([
        { text: item.korean, correct: true },
        ...distractors.map(d => ({ text: d.korean, correct: false }))
      ]);

      _updateFlowProgress(stepIndex, mod.steps.length, step.title);
      document.getElementById('flowBody').innerHTML = `
        <div style="font-size:12px;color:var(--text3);text-align:center;margin-bottom:16px">
          ${qIdx + 1} / ${fq.questions.length} · ✅ ${correct} · ❌ ${wrong}
        </div>
        <div class="quiz-question">
          <div class="quiz-q-type">뜻은 무엇인가요?</div>
          <div class="quiz-q-text">${formatJp(item)}</div>
          <button class="quiz-audio-btn" onclick="TTS.speak('${(item.japanese||'').replace(/'/g,"\\'")}')">🔊</button>
        </div>
        <div class="quiz-choices">
          ${choices.map((ch, i) => `
            <button class="quiz-choice" data-correct="${ch.correct}"
                    onclick="App._vocabQuizAnswer(this, ${ch.correct}, '${(item.japanese||'').replace(/'/g,"\\'")}', '${(item.korean||'').replace(/'/g,"\\'")}')">
              <span class="qc-label">${['A','B','C','D'][i]}</span>
              <span>${escHtml(ch.text || '')}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quizFeedback"></div>
      `;
      document.getElementById('flowFooter').innerHTML = `
        <button class="btn btn-primary hidden" id="btnNextQ" onclick="App._vocabQuizNext()">
          다음 →
        </button>
      `;
    }

    _flow._vocabQuiz = {
      questions,
      qIdx: 0,
      correct: 0,
      wrong: 0,
      missed: [],
      isReview: false,
      totalCount: questions.length,
      stepIndex,
      renderQ
    };
    renderQ();
  }

  function _vocabQuizAnswer(btn, isCorrect, jp, ko) {
    const fq = _flow._vocabQuiz;
    if (!fq) return;
    document.querySelectorAll('.quiz-choice').forEach(b => {
      b.classList.add('answered');
      b.onclick = null;
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      fq.correct++;
    } else {
      fq.wrong++;
      if (!fq.isReview) fq.missed.push(fq.questions[fq.qIdx]);
    }
    if (fq.questions[fq.qIdx]?.id) {
      Store.reviewVocabItem(fq.questions[fq.qIdx].id, isCorrect ? 'good' : 'again');
    }
    TTS.speak(stripFuri(jp));
    _playQuizEffect(isCorrect);

    const fb = document.getElementById('quizFeedback');
    if (fb) {
      fb.className = `quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
      fb.innerHTML = isCorrect
        ? `✅ 정답! <strong>${ruby(jp)}</strong> = ${escHtml(ko)}`
        : `❌ 오답. 정답: <strong>${ruby(jp)}</strong> = ${escHtml(ko)}`;
    }
    const btnNext = document.getElementById('btnNextQ');
    show(btnNext);
    if (isCorrect) {
      if (btnNext) {
        btnNext.innerHTML = '다음 → <div class="auto-next-bar"></div>';
      }
      clearTimeout(_autoNextTimer);
      _autoNextTimer = setTimeout(() => {
        const btn = document.getElementById('btnNextQ');
        if (btn && !btn.classList.contains('hidden')) _vocabQuizNext();
      }, 5000);
    } else {
      if (btnNext) btnNext.innerHTML = '다음 →';
    }
  }

  function _vocabQuizNext() {
    clearTimeout(_autoNextTimer);
    const btn = document.getElementById('btnNextQ');
    if (btn) btn.innerHTML = '다음 →';
    const fq = _flow._vocabQuiz;
    if (!fq) return;
    fq.qIdx++;
    fq.renderQ();
  }

  // ── Retry Transition ─────────────────────────────────────
  function _showRetryTransition(count, onStart) {
    document.getElementById('flowBody').innerHTML = `
      <div class="completion-screen">
        <div class="completion-emoji">🔁</div>
        <div class="completion-title">오답 다시 풀기</div>
        <div class="completion-sub">
          잠깐만요! 방금 틀렸던 <strong>${count}문제</strong>를<br>
          제대로 익혔는지 다시 한번 확인해볼까요? 😊
          <div style="font-size:11px;color:var(--text3);margin-top:12px;opacity:0.8">
            * 진도는 통과할 때만 반영되고, 점수는 첫 시도 기준으로 계산됩니다.
          </div>
        </div>
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = `
      <button class="btn btn-primary" onclick="App._startRetryPhase()">시작하기 →</button>
    `;
    _flow._onRetryStart = onStart;
  }

  function _startRetryPhase() {
    if (_flow._onRetryStart) _flow._onRetryStart();
  }

  // ── Quiz Result ───────────────────────────────────────────
  function _showQuizResult(correct, total, stepIndex, score) {
    const pct = score;
    const passRate = parseInt(Store.getSetting('quizPassRate')) || 60;
    const passed = pct >= passRate;
    
    // 티어별 일본어 감탄사 및 메시지
    const tiers = [
      { min: 90, icon: '🏆', title: '완벽해요!', jp: '最高(さいこう)입니다!', ko: '최고예요!', msg: '완벽하게 마스터하셨군요! 당신은 이미 일본어 마스터! 👑' },
      { min: 70, icon: '🎉', title: '잘 했어요!', jp: '立派(りっぱ)입니다!', ko: '훌륭해요!', msg: '정말 대단해요! 실력이 쑥쑥 늘고 있는 게 느껴져요! ✨' },
      { min: 50, icon: '😊', title: '괜찮아요!', jp: 'いいですね！', ko: '좋아요!', msg: '안정적인 성적이에요. 조금만 더 연습하면 최고가 될 수 있어요! 👍' },
      { min: 0,  icon: '💪', title: '다시 도전!', jp: '頑張(がんば)りましょう！', ko: '힘내세요!', msg: '기초를 튼튼히 다지는 과정이에요. 한 번 더 도전해 볼까요? 🔥' }
    ];
    const res = tiers.find(t => pct >= t.min);

    const xpEarned = Math.round((pct / 100) * 100 + 20);
    const awardedXP = passed ? xpEarned : 0;
    const passBadge = passed
      ? `<div class="v2-pass-badge v2-pass-ok">✅ 통과! (기준 ${passRate}%)</div>`
      : `<div class="v2-pass-badge v2-pass-ng">❌ 재도전 필요 (기준 ${passRate}%, 현재 ${pct}%)<br><span style="font-size:12px;opacity:.8">통과 전에는 다음 단계로 넘어가지 않습니다.</span></div>`;

    Store.recordStepAttempt(_flow.moduleId, stepIndex, score, passed);
    if (passed) {
      Store.completeStep(_flow.moduleId, stepIndex, score);
      Store.addXP(awardedXP);
    }

    // 팡파레 효과 (Confetti + TTS)
    if (passed && pct >= 50) {
      confetti(pct >= 90 ? 100 : 50);
      setTimeout(() => TTS.speak(stripFuri(res.jp)), 600);
    }

    document.getElementById('flowBody').innerHTML = `
      <div class="score-screen fanfare-burst">
        <div class="score-emoji">${res.icon}</div>
        <div class="score-title">${res.title}</div>
        <div class="score-exclamation">${ruby(res.jp)}</div>
        <div class="score-msg">${res.msg}</div>
        
        <div class="score-ring" id="scoreRing">
          <div class="score-pct">${pct}%</div>
        </div>
        
        <div class="score-subtitle" style="margin-top:20px">${correct} / ${total} 정답</div>
        ${passBadge}
        <div class="xp-earned">${passed ? `+<span class="xp-num">${awardedXP}</span> XP 획득!` : '이번에는 XP 획득 없이 재도전합니다.'}</div>
      </div>
    `;
    updateScoreRing(document.getElementById('scoreRing'), pct);

    document.getElementById('flowFooter').innerHTML = `
      <button class="btn btn-primary" onclick="App._afterQuiz(${passed})">
        ${passed ? '다음 단계 →' : '다시 도전 🔁'}
      </button>
    `;
  }

  function _afterQuiz(passed) {
    if (passed) {
      _flow.step++;
      _runCurrentStep();
    } else {
      // 퀴즈만 다시 도전 (learn 단계로 돌아가지 않음)
      _runCurrentStep();
    }
  }

  // ── Lecture Player ────────────────────────────────────────
  const _LEC_TYPE = {
    hook:     { icon: '🎣', color: '#6366f1' },
    culture:  { icon: '🗾', color: '#10b981' },
    story:    { icon: '📖', color: '#8b5cf6' },
    mnemonic: { icon: '💡', color: '#f59e0b' },
    funfact:  { icon: '🎯', color: '#3b82f6' },
    practice: { icon: '✍️', color: '#ef4444' },
    summary:  { icon: '✅', color: '#10b981' },
    grammar:  { icon: '🧩', color: '#f43f5e' },
    table:    { icon: '📊', color: '#0ea5e9' },
    dialog:   { icon: '💬', color: '#14b8a6' },
  };

  function _renderLecture(mod, step, stepIndex) {
    const slides = (typeof LECTURE_DATA !== 'undefined') && LECTURE_DATA[step.lectureKey];
    if (!slides?.length) { _advanceStep(); return; }
    _flow._lecture = { slides, idx: 0, paused: false, stepIndex, mod, step, timerId: null };
    _lectureRenderSlide();
  }

  function _lectureRenderSlide() {
    const lc = _flow._lecture;
    if (!lc) return;
    const { slides, idx, stepIndex, mod, step } = lc;
    const slide = slides[idx];
    const ts = _LEC_TYPE[slide.type] || _LEC_TYPE.hook;
    const isLast = idx === slides.length - 1;

    _updateFlowProgress(stepIndex, mod.steps.length, step.title);
    const overallPct = Math.round((idx / slides.length) * 100);
    document.getElementById('flowProgressFill').style.width = overallPct + '%';

    document.getElementById('flowBody').innerHTML = `
      <div class="lecture-slide" id="lectureSlide">
        <div class="lec-header">
          <div class="lec-badge" style="--lc:${ts.color}">${ts.icon} ${escHtml(slide.label || '')}</div>
          <div class="lec-counter">${idx + 1} / ${slides.length}</div>
        </div>

        <!-- 칠판 영역 — 애니메이션 여기서 발생 -->
        <div class="lec-board" id="lecBoard">
          ${slide.image ? `<img src="${slide.image}" style="max-width:100%; max-height:140px; border-radius:12px; margin-bottom:10px; object-fit:contain;" />` : ''}
          <div class="lec-board-text" id="lecBoardText" style="font-weight:bold; font-size:28px;"></div>
          ${slide.sub ? `<div class="lec-board-sub" style="margin-top:8px;">${escHtml(slide.sub)}</div>` : ''}
        </div>

        <!-- 설명: 일본어 메인 + 한국어 번역 하단 -->
        ${(slide.captionJp || slide.captionKo) ? `
        <div class="lec-caption-box">
          ${slide.captionJp ? `<div class="lec-cap-jp" id="lecCapJp">${ruby(slide.captionJp)}</div>` : ''}
          ${slide.captionKo ? `<div class="lec-cap-ko">${escHtml(slide.captionKo)}</div>` : ''}
        </div>` : ''}

        <!-- 타이머 바 -->
        <div class="lec-timer-track">
          <div class="lec-timer-bar" id="lecTimerBar"
               style="animation-duration:2000ms;animation-play-state:paused"></div>
        </div>
      </div>
    `;

    document.getElementById('flowFooter').innerHTML = `
      <div style="display:flex;gap:8px">
        <button class="btn btn-outline" style="flex:1" id="btnLecPrev"
                onclick="App._lecPrev()" ${idx === 0 ? 'disabled' : ''}>← 이전</button>
        <button class="btn btn-outline" style="flex:1" id="btnLecPause"
                onclick="App._lecPauseToggle()">⏸</button>
        ${isLast ? `<button class="btn btn-outline" style="flex:1" onclick="App._lecRestart()" title="처음부터 다시 보기">↩</button>` : ''}
        <button class="btn btn-primary" style="flex:2" id="btnLecNext"
                onclick="App._lecNext()">
          ${isLast ? '완료 ✓' : '다음 →'}
        </button>
      </div>
    `;

    // 1. 칠판 한 글자씩 필기 애니메이션
    const animDur = _lecChalkboardAnim(slide.main);

    // 2. 칠판 애니메이션 완료 후 → captionJp 다화자 읽기
    setTimeout(() => {
      if (!_flow._lecture || _flow._lecture.idx !== idx) return;
      if (slide.captionJp) {
        _lecReadCaptionJp(slide.captionJp, slide.captionKo, idx, () => {
          // TTS 완료 → 2초 후 자동 진행
          if (!_flow._lecture || _flow._lecture.paused || _flow._lecture.idx !== idx) return;
          const bar = document.getElementById('lecTimerBar');
          if (bar) bar.style.animationPlayState = 'running';
          lc.timerId = setTimeout(() => {
            if (_flow._lecture && !_flow._lecture.paused && _flow._lecture.idx === idx) _lecNext();
          }, 2000);
        });
      } else {
        // captionJp 없으면 기존 타이머로 자동 진행
        _lecStartTimer();
      }
    }, animDur + 300);
  }

  // ── 칠판 한 글자씩 필기 애니메이션 ─────────────────────────
  function _lecChalkboardAnim(text) {
    const el = document.getElementById('lecBoardText');
    if (!el || !text) return 0;
    const plain = text.replace(/<[^>]*>/g, ''); // ruby 태그 제거 → 순수 텍스트
    const chars = [...plain]; // 유니코드 안전 분리 (이모지 포함)
    const PER_CHAR = 65; // ms per character
    el.innerHTML = chars.map((ch, i) =>
      `<span class="chalk-char" style="animation-delay:${i * PER_CHAR}ms">${escHtml(ch)}</span>`
    ).join('');
    const totalDur = chars.length * PER_CHAR + 200;
    // 애니메이션 완료 후 ruby 버전으로 교체
    setTimeout(() => {
      const el2 = document.getElementById('lecBoardText');
      if (el2) el2.innerHTML = ruby(text);
    }, totalDur + 100);
    return totalDur;
  }

  // ── 한국어 → 가타카나 근사 변환 (TTS용) ────────────────────
  // captionJp 안에 섞인 한글을 일본 TTS가 읽을 수 있도록 변환
  const _KO_KATA_MAP = {
    '안녕하세요': 'アンニョンハセヨ', '안녕': 'アンニョン',
    '감사합니다': 'カムサハムニダ', '고마워요': 'コマウォヨ',
    '죄송합니다': 'チェソンハムニダ', '미안해요': 'ミアネヨ',
    '괜찮아요': 'クェンチャナヨ', '괜찮아': 'クェンチャナ',
    '잠깐만요': 'チャムッカンマンニョ', '네': 'ネ', '아니요': 'アニヨ',
    '이': 'イ', '가': 'カ', '한국': 'ハングク', '한국어': 'ハングゴ',
    '일본어': 'イルボノ', '일본': 'イルボン',
  };
  function _koToKatakana(text) {
    let r = text;
    // 단어 단위 변환 (긴 것부터)
    for (const [ko, kata] of Object.entries(_KO_KATA_MAP)) {
      r = r.replaceAll(ko, kata);
    }
    // 나머지 한글 문자 제거 (TTS가 읽지 못함)
    r = r.replace(/[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]+/g, '');
    return r;
  }

  // ── captionJp 다화자 순차 읽기 ──────────────────────────────
  // captionKo를 함께 받아 한국어 번역도 병렬 하이라이트
  function _lecReadCaptionJp(captionJp, captionKo, slideIdx, onDone) {
    if (!captionJp) { if (onDone) onDone(); return; }

    // ① 표시용 문장 분리 (후리가나 제거 후 분리)
    const rawText = stripFuri(captionJp);
    const jpSentences = rawText
      .match(/[^。！？…]+[。！？…]*/g)?.map(s => s.trim()).filter(Boolean);
    if (!jpSentences?.length) { if (onDone) onDone(); return; }

    // ② TTS용 텍스트: 한글 근사 변환만 추가 진행
    const ttsSentences = jpSentences.map(s => _koToKatakana(s).trim());

    // ③ 한국어 문장 분리
    const koSentences = captionKo
      ? (captionKo.match(/[^.!?…！？]+[.!?…！？]*/g) || [captionKo])
          .map(s => s.trim()).filter(Boolean)
      : [];

    // ④ JP 문장 spans 재구성
    const capJpEl = document.getElementById('lecCapJp');
    if (capJpEl) {
      capJpEl.innerHTML = jpSentences.map((s, i) =>
        `<span class="lec-sentence" id="lecSent${i}">${ruby(s)}</span>`
      ).join('');
    }

    // ⑤ KO 문장 spans 재구성 (비례 하이라이트용)
    const capKoEl = document.querySelector('.lec-cap-ko');
    if (capKoEl && koSentences.length) {
      capKoEl.innerHTML = koSentences.map((s, i) =>
        `<span class="lec-sentence-ko" id="lecSentKo${i}">${escHtml(s)}</span>`
      ).join('');
    }

    const jpLen = jpSentences.length;
    const koLen = koSentences.length;

    // ⑥ 슬라이드 인덱스에 따라 A, B, C 화자 교대
    const speakerId = ['A', 'B', 'C'][slideIdx % 3];
    const lines = ttsSentences.map((text, i) => ({
      text,
      speaker: speakerId,
    }));

    TTS.speakQueue(lines, {
      onLineStart: (i) => {
        // JP 하이라이트
        document.querySelectorAll('.lec-sentence').forEach(el => el.classList.remove('reading'));
        document.getElementById(`lecSent${i}`)?.classList.add('reading');
        document.getElementById(`lecSent${i}`)?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
        // KO 비례 하이라이트
        if (koLen > 0) {
          document.querySelectorAll('.lec-sentence-ko').forEach(el => el.classList.remove('reading'));
          const ki = Math.min(Math.floor(i * koLen / jpLen), koLen - 1);
          document.getElementById(`lecSentKo${ki}`)?.classList.add('reading');
        }
      },
      onLineEnd: (i) => {
        document.getElementById(`lecSent${i}`)?.classList.remove('reading');
        if (koLen > 0) {
          const ki = Math.min(Math.floor(i * koLen / jpLen), koLen - 1);
          document.getElementById(`lecSentKo${ki}`)?.classList.remove('reading');
        }
      },
      onDone,
    });
  }

  function _lecStartTimer() {
    const lc = _flow._lecture;
    if (!lc || lc.paused) return;
    // 기존 타이머 제거
    if (lc.timerId) clearTimeout(lc.timerId);
    
    // 텍스트 길이에 기반한 동적 시간 계산 (음성이 없는 경우를 대비)
    const slide = lc.slides[lc.idx];
    const textLen = (slide.main || '').length + (slide.sub || '').length + (slide.captionJp || '').length;
    const dur = slide.duration || Math.max(5000, textLen * 100);
    
    // CSS 타이머 바 애니메이션 시간 동기화
    const bar = document.getElementById('lecTimerBar');
    if (bar) bar.style.animationDuration = `${dur}ms`;
    lc.timerId = setTimeout(() => {
      if (!_flow._lecture || _flow._lecture.paused) return;
      _lecNext();
    }, dur);
  }

  function _lecStopTimer() {
    const lc = _flow._lecture;
    if (!lc) return;
    if (lc.timerId) { clearTimeout(lc.timerId); lc.timerId = null; }
    // 타이머 바 정지
    const bar = document.getElementById('lecTimerBar');
    if (bar) bar.style.animationPlayState = 'paused';
  }

  function _lecNext() {
    const lc = _flow._lecture;
    if (!lc) return;
    _lecStopTimer();
    TTS.stopQueue();
    if (lc.idx >= lc.slides.length - 1) {
      // 강의 완료
      Store.completeStep(_flow.moduleId, lc.stepIndex);
      Store.addXP(50);
      _flow.step = lc.stepIndex + 1;
      _flow._lecture = null;
      _runCurrentStep();
    } else {
      lc.idx++;
      lc.paused = false;
      _lectureRenderSlide();
    }
  }

  function _lecRestart() {
    const lc = _flow._lecture;
    if (!lc) return;
    _lecStopTimer();
    TTS.stopQueue();
    lc.idx = 0;
    lc.paused = false;
    _lectureRenderSlide();
  }

  function _lecPrev() {
    const lc = _flow._lecture;
    if (!lc || lc.idx === 0) return;
    _lecStopTimer();
    TTS.stopQueue();
    lc.idx--;
    lc.paused = false;
    _lectureRenderSlide();
  }

  function _lecPauseToggle() {
    const lc = _flow._lecture;
    if (!lc) return;
    lc.paused = !lc.paused;
    const btn = document.getElementById('btnLecPause');
    if (lc.paused) {
      _lecStopTimer();
      TTS.stopQueue();
      if (btn) btn.textContent = '▶ 재생';
    } else {
      if (btn) btn.textContent = '⏸';
      const slide = lc.slides[lc.idx];
      if (slide.captionJp) {
        // 일시정지 후 재개 → captionJp 처음부터 다시 읽기
        _lecReadCaptionJp(slide.captionJp, slide.captionKo, () => {
          if (!_flow._lecture || _flow._lecture.paused || _flow._lecture.idx !== lc.idx) return;
          const bar = document.getElementById('lecTimerBar');
          if (bar) { bar.style.animationDuration = '2000ms'; bar.style.animationPlayState = 'running'; }
          lc.timerId = setTimeout(() => {
            if (_flow._lecture && !_flow._lecture.paused) _lecNext();
          }, 2000);
        });
      } else {
        const bar = document.getElementById('lecTimerBar');
        if (bar) bar.style.animationPlayState = 'running';
        _lecStartTimer();
      }
    }
  }

  function _lecCapTab(lang) {
    const ko = document.getElementById('lecCapKo');
    const jp = document.getElementById('lecCapJp');
    const tKo = document.getElementById('capTabKo');
    const tJp = document.getElementById('capTabJp');
    if (lang === 'ko') {
      ko?.classList.remove('hidden'); jp?.classList.add('hidden');
      tKo?.classList.add('active'); tJp?.classList.remove('active');
    } else {
      jp?.classList.remove('hidden'); ko?.classList.add('hidden');
      tJp?.classList.add('active'); tKo?.classList.remove('active');
    }
  }

  // ── Dialogue Study ────────────────────────────────────────
  function _renderDialogueStudy(mod, step, stepIndex) {
    const dialogues = _getDialogue(step.dialogueKey || mod.roleplay?.dialogueKey);
    if (!dialogues?.length) { _advanceStep(); return; }

    const html = dialogues.map(line => {
      if (line.speaker === 'N') {
        return `<div class="dialogue-line speaker-N">
          <div class="dialogue-narrator">${ruby(line.japanese || '')}</div>
        </div>`;
      }
      const sideMap = { A: 'speaker-A', B: 'speaker-B', C: 'speaker-C' };
      const labelMap = { A: '나', B: 'B', C: 'C' };
      const side  = sideMap[line.speaker] || 'speaker-B';
      const label = labelMap[line.speaker] || line.speaker;
      return `
        <div class="dialogue-line ${side}">
          <div class="dialogue-avatar">${label}</div>
          <div class="dialogue-bubble" style="cursor:pointer" onclick="App.showDialogueDetail('${line.id}')">
            <div class="db-jp">${ruby(line.japanese || '')}</div>
            <div class="db-ko">${escHtml(line.korean || '')}</div>
            ${line.tip ? `<div class="db-tip">${ruby(line.tip)}</div>` : ''}
            <span class="db-audio" onclick="event.stopPropagation(); TTS.speak('${(line.japanese||'').replace(/'/g,"\\'")}')">🔊</span>
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('flowBody').innerHTML = `
      <div class="dialogue-scene">
        <div class="scene-title">📖 대화 미리 보기</div>
        실전 롤플레이 전에 전체 대화를 먼저 읽어보세요.
      </div>
      <div class="dialogue-list">${html}</div>
    `;

    document.getElementById('flowFooter').innerHTML = `
      <button class="btn btn-primary" onclick="App._dialogueStudyDone(${stepIndex})">
        이해했어요 ✓
      </button>
    `;
  }

  function _dialogueStudyDone(stepIndex) {
    Store.completeStep(_flow.moduleId, stepIndex);
    Store.addXP(20);
    _flow.step = stepIndex + 1;
    _runCurrentStep();
  }

  // ── Roleplay ──────────────────────────────────────────────
  function _getRoleplayPracticeLines(dialogues) {
    return (dialogues || [])
      .map((line, sourceIndex) => ({ ...line, sourceIndex }))
      .filter(line => line.speaker === 'A' && (line.japanese || '').trim());
  }

  function _getRoleplayState(mod) {
    const dialogues = _getDialogue(mod?.roleplay?.dialogueKey);
    const practiceLines = _getRoleplayPracticeLines(dialogues);
    if (!_flow?.roleplayState) {
      _flow.roleplayState = {
        practiceLines,
        revealed: [],
        shadowDone: [],
        outputDone: []
      };
    }
    return _flow.roleplayState;
  }

  function _renderRoleplay(mod) {
    const rp = mod.roleplay;
    const dialogues = _getDialogue(rp.dialogueKey);
    const state = _getRoleplayState(mod);
    const practiceLines = state.practiceLines || [];
    const shadowDone = state.shadowDone || [];
    const outputDone = state.outputDone || [];
    const revealed = state.revealed || [];
    const readyCount = practiceLines.filter((_, idx) => shadowDone[idx] && outputDone[idx]).length;
    const allReady = practiceLines.length === 0 || readyCount === practiceLines.length;
    const activeIndex = practiceLines.findIndex((_, idx) => !(shadowDone[idx] && outputDone[idx]));
    const activeLine = activeIndex >= 0 ? practiceLines[activeIndex] : null;

    document.getElementById('flowTitle').textContent = `🎭 ${rp.name}`;
    document.getElementById('flowStep').textContent = practiceLines.length
      ? `내 대사 ${readyCount}/${practiceLines.length}개 연습 완료`
      : '';
    document.getElementById('flowProgressFill').style.width = '100%';

    const dialogueHtml = dialogues.map((line, i) => {
      if (line.speaker === 'N') {
        return `<div class="dialogue-line speaker-N" id="dl-line-${i}">
          <div class="dialogue-narrator">${ruby(line.japanese || '')}</div>
        </div>`;
      }
      const sideMap = { A: 'speaker-A', B: 'speaker-B', C: 'speaker-C' };
      const labelMap = { A: '나', B: 'B', C: 'C' };
      const side  = sideMap[line.speaker] || 'speaker-B';
      const label = labelMap[line.speaker] || line.speaker;
      return `
        <div class="dialogue-line ${side}" id="dl-line-${i}">
          <div class="dialogue-avatar">${label}</div>
          <div class="dialogue-bubble" style="cursor:pointer" onclick="App.showDialogueDetail('${line.id}')">
            <div class="db-jp">${ruby(line.japanese || '')}</div>
            <div class="db-ko">${escHtml(line.korean || '')}</div>
            ${line.tip ? `<div class="db-tip">${ruby(line.tip)}</div>` : ''}
            <span class="db-audio" onclick="event.stopPropagation(); App._speakDialogueLine('${line.id}')">🔊</span>
          </div>
        </div>
      `;
    }).join('');

    const practiceHtml = practiceLines.length ? practiceLines.map((line, idx) => {
      const answerVisible = !!revealed[idx];
      const shadowOk = !!shadowDone[idx];
      const outputOk = !!outputDone[idx];
      return `
        <div class="card" style="padding:16px;border:1px solid var(--line);background:var(--surface);margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start;margin-bottom:10px">
            <div>
              <div style="font-weight:800;font-size:14px;color:var(--text1)">내 대사 ${idx + 1}</div>
              <div style="font-size:13px;color:var(--text2);margin-top:4px">${escHtml(line.korean || '')}</div>
            </div>
            <div style="font-size:12px;color:var(--text3)">${shadowOk && outputOk ? '완료' : '연습 중'}</div>
          </div>
          <div style="padding:12px;border-radius:12px;background:var(--surface2);font-size:14px;color:var(--text1);margin-bottom:10px">
            ${answerVisible ? ruby(line.japanese || '') : '먼저 한국어 힌트를 보고 일본어로 말해보세요.'}
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px">
            <button class="btn btn-outline" onclick="App._toggleRoleplayReveal(${idx})">${answerVisible ? '정답 가리기' : '정답 보기'}</button>
            <button class="btn btn-outline" onclick="App._speakDialogueLine('${line.id}')">🔊 정답 듣기</button>
            <button class="btn ${shadowOk ? 'btn-success' : 'btn-outline'}" onclick="App._markRoleplayShadow(${idx})">${shadowOk ? '따라 말하기 완료' : '따라 말했어요'}</button>
            <button class="btn ${outputOk ? 'btn-success' : 'btn-outline'}" onclick="App._markRoleplayOutput(${idx})">${outputOk ? '힌트 말하기 완료' : '힌트 보고 말했어요'}</button>
          </div>
        </div>
      `;
    }).join('') : `
      <div class="card" style="padding:16px;border:1px solid var(--line);background:var(--surface)">
        <div style="font-weight:800;color:var(--text1);margin-bottom:6px">자동 완료형 롤플레이</div>
        <div style="font-size:13px;color:var(--text2)">이 대화에는 학습자 A 대사가 없어서 전체 흐름을 듣고 마무리할 수 있습니다.</div>
      </div>
    `;

    const currentTurnHtml = activeLine ? `
      <div class="card" style="padding:16px;border:1px solid var(--primary);background:linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,247,237,0.96));margin-bottom:14px">
        <div style="font-weight:800;font-size:14px;color:var(--text1);margin-bottom:8px">🎯 지금 내 차례</div>
        <div style="font-size:12px;color:var(--text3);margin-bottom:8px">대사 ${activeIndex + 1} / ${practiceLines.length}</div>
        <div style="font-size:14px;color:var(--text1);margin-bottom:10px">${escHtml(activeLine.korean || '')}</div>
        <div style="padding:12px;border-radius:12px;background:var(--surface2);font-size:14px;color:var(--text1);margin-bottom:10px">
          ${revealed[activeIndex] ? ruby(activeLine.japanese || '') : '먼저 스스로 말해 보고, 막히면 정답을 확인해 보세요.'}
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          <button class="btn btn-outline" onclick="App._speakDialogueLine('${activeLine.id}')">🔊 정답 듣기</button>
          <button class="btn btn-outline" onclick="App._toggleRoleplayReveal(${activeIndex})">${revealed[activeIndex] ? '정답 가리기' : '정답 보기'}</button>
          <button class="btn ${shadowDone[activeIndex] ? 'btn-success' : 'btn-outline'}" onclick="App._markRoleplayShadow(${activeIndex})">${shadowDone[activeIndex] ? '따라 말하기 완료' : '따라 말했어요'}</button>
          <button class="btn ${outputDone[activeIndex] ? 'btn-success' : 'btn-outline'}" onclick="App._markRoleplayOutput(${activeIndex})">${outputDone[activeIndex] ? '힌트 말하기 완료' : '힌트 보고 말했어요'}</button>
        </div>
      </div>
    ` : `
      <div class="card" style="padding:16px;border:1px solid var(--ok);background:rgba(34,197,94,0.08);margin-bottom:14px">
        <div style="font-weight:800;font-size:14px;color:var(--text1);margin-bottom:6px">✅ 모든 내 대사 연습 완료</div>
        <div style="font-size:13px;color:var(--text2)">전체 대화를 한 번 더 재생한 뒤 완료하면 마무리됩니다.</div>
      </div>
    `;

    document.getElementById('flowBody').innerHTML = `
      <div class="dialogue-scene">
        <div class="scene-title">${rp.icon} ${escHtml(rp.name)}</div>
        ${escHtml(rp.desc)}
      </div>
      <div class="card" style="padding:16px;border:1px solid var(--line);background:var(--surface);margin-bottom:14px">
        <div style="font-weight:800;font-size:14px;color:var(--text1);margin-bottom:8px">말하기 미션</div>
        <div style="font-size:13px;color:var(--text2);line-height:1.6">
          1. 전체 대화를 듣고 흐름을 익힙니다.<br>
          2. 내 대사를 따라 말합니다.<br>
          3. 한국어 힌트만 보고 다시 말해 봅니다.
        </div>
      </div>
      ${currentTurnHtml}
      <div class="dialogue-list" id="dialogueList">${dialogueHtml}</div>
      <div style="height:12px"></div>
      <div class="scene-title">🗣️ 내 말하기 연습</div>
      <div style="font-size:13px;color:var(--text2);margin:6px 0 12px">정답을 바로 보기 전에 먼저 입으로 말해 본 뒤 체크해 주세요.</div>
      <div>${practiceHtml}</div>
    `;

    document.getElementById('flowFooter').innerHTML = `
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button class="btn btn-outline" id="btnReplayAll" onclick="App._replayAll('${mod.id}')">🔊 전체 재생</button>
        <button class="btn btn-outline" id="btnStopPlay" style="display:none" onclick="App._stopRoleplay()">⏹ 정지</button>
        <button class="btn ${allReady ? 'btn-success' : 'btn-outline'}" onclick="App._completeRoleplay('${mod.id}')">${allReady ? '완료 ✓' : `말하기 ${readyCount}/${practiceLines.length}`}</button>
      </div>
    `;
  }

  function _toggleRoleplayReveal(index) {
    if (!_flow?.roleplayState) return;
    _stopRoleplay();
    _flow.roleplayState.revealed[index] = !_flow.roleplayState.revealed[index];
    _renderRoleplay(_getMod(_flow.moduleId));
  }

  function _markRoleplayShadow(index) {
    if (!_flow?.roleplayState) return;
    _flow.roleplayState.shadowDone[index] = true;
    _renderRoleplay(_getMod(_flow.moduleId));
  }

  function _markRoleplayOutput(index) {
    if (!_flow?.roleplayState) return;
    _flow.roleplayState.outputDone[index] = true;
    _renderRoleplay(_getMod(_flow.moduleId));
  }

  function _speakDialogueLine(lineId) {
    const all = typeof VOCAB_ITEMS_DIALOGUE !== 'undefined' ? VOCAB_ITEMS_DIALOGUE : [];
    const line = all.find(x => x.id === lineId);
    if (!line?.japanese) return;
    TTS.speak(stripFuri(line.japanese));
  }

  function _startRoleplay(mod) {
    const rp = mod.roleplay;
    const dialogues = _getDialogue(rp.dialogueKey);
    if (!dialogues?.length) { showToast('대화 데이터를 찾을 수 없습니다'); return; }
    _openFlowScreen();
    _flow = {
      moduleId: mod.id,
      step: -1,
      roleplay: true,
      roleplayState: {
        practiceLines: _getRoleplayPracticeLines(dialogues),
        revealed: [],
        shadowDone: [],
        outputDone: []
      }
    };
    _renderRoleplay(mod);

    // 자동 재생
    setTimeout(() => _replayAll(mod.id), 600);
  }

  function _replayAll(moduleId) {
    const mod = MODULES.find(m => m.id === moduleId);
    if (!mod?.roleplay) return;
    const dialogues = _getDialogue(mod.roleplay.dialogueKey);
    if (!dialogues) return;

    // 재생 버튼 ↔ 정지 버튼 전환
    const btnReplay = document.getElementById('btnReplayAll');
    const btnStop   = document.getElementById('btnStopPlay');
    if (btnReplay) btnReplay.style.display = 'none';
    if (btnStop)   btnStop.style.display   = '';

    // 나레이터(N) 포함 모든 라인을 큐에 넣되,
    // N은 텍스트가 한국어 설명뿐이므로 TTS 스킵 (text 비워 _speakOne가 no-op)
    const lines = dialogues.map((d, i) => ({
      text:      d.speaker === 'N' ? '' : stripFuri(d.japanese || ''),
      speaker:   d.speaker,
      elementId: `dl-line-${i}`
    }));

    TTS.speakQueue(lines, {
      onLineStart: (idx, line) => {
        // 이전 하이라이트 제거 후 현재 라인 하이라이트 + 스크롤
        document.querySelectorAll('.dialogue-line.playing')
                .forEach(el => el.classList.remove('playing'));
        if (line.elementId) {
          const el = document.getElementById(line.elementId);
          if (el) {
            el.classList.add('playing');
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      },
      onLineEnd: (idx, line) => {
        if (line.elementId) {
          document.getElementById(line.elementId)?.classList.remove('playing');
        }
      },
      onDone: () => {
        if (btnReplay) btnReplay.style.display = '';
        if (btnStop)   btnStop.style.display   = 'none';
      }
    });
  }

  function _stopRoleplay() {
    TTS.stopQueue();
    document.querySelectorAll('.dialogue-line.playing')
            .forEach(el => el.classList.remove('playing'));
    const btnReplay = document.getElementById('btnReplayAll');
    const btnStop   = document.getElementById('btnStopPlay');
    if (btnReplay) btnReplay.style.display = '';
    if (btnStop)   btnStop.style.display   = 'none';
  }

  function showDialogueDetail(lineId) {
    if (!lineId) return;
    const all = typeof VOCAB_ITEMS_DIALOGUE !== 'undefined' ? VOCAB_ITEMS_DIALOGUE : [];
    const line = all.find(x => x.id === lineId);
    if (!line) return;

    // TTS 중단
    TTS.stopQueue();
    const btnReplay = document.getElementById('btnReplayAll');
    const btnStop   = document.getElementById('btnStopPlay');
    if (btnReplay) btnReplay.style.display = '';
    if (btnStop)   btnStop.style.display   = 'none';

    // 상세 정보 파싱
    let breakdown = _parseBreakdown(line.japanese);
    const grammar   = _parseGrammar(line.japanese, line.korean);

    // [강력 조치] '문장 전체'라는 문구가 포함된 분석 결과는 무조건 제거
    breakdown = breakdown.filter(b => b.mean !== '문장 전체');

    closeDialogueDetail();
    const overlay = document.createElement('div');
    overlay.className = 'detail-overlay';
    overlay.id = 'detailOverlay';
    overlay.onclick = closeDialogueDetail;

    overlay.innerHTML = `
      <div class="detail-popup" onclick="event.stopPropagation()">
        <button class="detail-close-btn" onclick="App.closeDialogueDetail()">✕</button>
        <div class="detail-header">
          <div class="detail-jap">${ruby(line.japanese)}</div>
          <div class="detail-kor">${escHtml(line.korean)}</div>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">단어별 분석</div>
          <div class="detail-breakdown">
            ${breakdown.length > 0 ? breakdown.map(b => `
              <div class="breakdown-item">
                <div class="breakdown-word-group">
                  <span class="breakdown-pos-tag" data-pos="${b.pos}">${b.pos}</span>
                  <span class="breakdown-word">${ruby(b.word)}</span>
                </div>
                <span class="breakdown-meaning">${b.mean}</span>
              </div>
            `).join('') : '<div style="font-size:13px;color:var(--text3);padding:10px;text-align:center">매칭된 핵심 단어가 없습니다.</div>'}
          </div>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">핵심 포인트</div>
          <div class="detail-grammar-list">
            ${grammar.map(g => `
              <div class="grammar-item">
                <span class="grammar-tag">${g.tag}</span> ${g.desc}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="detail-actions">
          <button class="btn btn-replay-sent" onclick="TTS.speak('${line.japanese.replace(/'/g,"\\\\'")}')">
            🔊 다시 듣기
          </button>
          <button class="btn btn-primary" onclick="App.closeDialogueDetail()">
            확인했어요
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
  }

  function closeDialogueDetail() {
    const overlay = document.getElementById('detailOverlay');
    if (overlay) overlay.remove();
  }

  function _parseBreakdown(jp) {
    if (!jp) return [];
    const cleanJp = stripFuri(jp);
    const allVocab = [
      ...(typeof VOCAB_ITEMS_W1W4 !== "undefined" ? VOCAB_ITEMS_W1W4 : []),
      ...(typeof VOCAB_ITEMS_W5W8 !== "undefined" ? VOCAB_ITEMS_W5W8 : []),
      ...(typeof VOCAB_ITEMS_W9W10 !== "undefined" ? VOCAB_ITEMS_W9W10 : []),
      ...(typeof VOCAB_ITEMS_S1S5 !== "undefined" ? VOCAB_ITEMS_S1S5 : []),
      ...(typeof VOCAB_ITEMS_S6SIM !== "undefined" ? VOCAB_ITEMS_S6SIM : []),
      ...(typeof VOCAB_ITEMS_DIALOGUE !== "undefined" ? VOCAB_ITEMS_DIALOGUE : []),
    ];
    const found = [];
    const seen = new Set();
    const getPos = (item) => {
      const cat = item.category || "";
      if (cat.includes("noun") || cat.includes("time") || cat.includes("place") || cat.includes("food")) return "명사";
      if (cat.includes("verb") || cat.includes("motion") || cat.includes("action")) return "동사";
      if (cat.includes("adj") || cat.includes("condition")) return "형용사";
      if (cat.includes("adv") || cat.includes("filler")) return "부사";
      return "단어";
    };
    const sortedDb = allVocab.filter(v => v.japanese && v.japanese.length > 1).sort((a,b) => b.japanese.length - a.japanese.length);
    for (const item of sortedDb) {
      const word = stripFuri(item.japanese);
      if (word.length < 2) continue;
      if (cleanJp.includes(word) && !seen.has(word)) {
        let isSubset = false;
        for (const f of found) { if (stripFuri(f.word).includes(word)) { isSubset = true; break; } }
        if (!isSubset) { found.push({ word: item.japanese, mean: item.korean, pos: getPos(item) }); seen.add(word); }
        if (found.length >= 6) break;
      }
    }
    const common = [
      { jp: "ます", mean: "합니다", pos: "어미" },
      { jp: "です", mean: "입니다", pos: "어미" },
      { jp: "ください", mean: "주세요", pos: "동사" }
    ];
    common.forEach(p => {
      if (cleanJp.includes(p.jp) && !seen.has(p.jp)) { found.push({ word: p.jp, mean: p.mean, pos: p.pos }); seen.add(p.jp); }
    });
    return found;
  }

  function _parseGrammar(jp, ko) {
    const points = [];
    const cleanJp = stripFuri(jp);

    // 1. 핵심 문법 패턴 감지
    if (cleanJp.includes("てください")) points.push({ tag: "요청", desc: "「~해 주세요」 상대방에게 동작을 부탁할 때 씁니다." });
    if (cleanJp.includes("いただけますか")) points.push({ tag: "공손", desc: "「~해 주실 수 있나요?」 매우 정중하고 격식 있는 부탁입니다." });
    if (cleanJp.includes("たいです")) points.push({ tag: "희망", desc: "「~하고 싶습니다」 본인의 의지나 소망을 나타냅니다." });
    if (cleanJp.includes("ましょう")) points.push({ tag: "권유", desc: "「~합시다 / ~할까요?」 제안이나 권유를 할 때 사용하는 표현입니다." });
    if (cleanJp.includes("ですか")) points.push({ tag: "의문", desc: "문장 끝에 붙여 질문을 만드는 표준적인 표현입니다." });
    if (cleanJp.includes("ながら")) points.push({ tag: "동시", desc: "「~하면서」 두 가지 행동을 함께 할 때 씁니다." });
    if (cleanJp.includes("なければなりません")) points.push({ tag: "의무", desc: "「~해야만 합니다」 꼭 필요한 상황이나 책임을 나타냅니다." });
    if (cleanJp.includes("ことがある")) points.push({ tag: "경험", desc: "「~한 적이 있다」 과거의 경험을 이야기할 때 씁니다." });

    // 2. 상황별 포인트
    if (cleanJp.includes("ありがとう") || cleanJp.includes("すみません")) points.push({ tag: "매너", desc: "감사나 사과 시에는 고개를 살짝 숙이는 예의를 갖추면 좋습니다." });
    if (cleanJp.includes("にございます") || cleanJp.includes("でございます")) points.push({ tag: "경어", desc: "비즈니스나 공식 안내에서 쓰이는 최고 수준의 정중한 표현입니다." });

    // 3. 패턴이 없을 때 보여줄 랜덤 팁 리스트
    if (points.length === 0) {
      const fallbacks = [
        { tag: "팁", desc: "후리가나를 확인하며 큰 소리로 3번만 따라 읽어보세요." },
        { tag: "매너", desc: "일본어는 문장 끝을 흐리지 않고 끝까지 발음하는 것이 정중하게 들립니다." },
        { tag: "학습", desc: "이 문장에 쓰인 핵심 단어를 [나의 단어장]에 추가해 복습해 보세요." },
        { tag: "발음", desc: "일본어의 [つ]나 [ざ] 발음은 한국어와 미세하게 다르니 주의해서 들어보세요." },
        { tag: "팁", desc: "자연스러운 억양을 위해 TTS(음성) 버튼을 눌러 리듬을 익혀보세요." }
      ];
      // 랜덤하게 하나 선택 (Math.random 사용)
      const randomIdx = Math.floor(Math.random() * fallbacks.length);
      points.push(fallbacks[randomIdx]);
    }
    return points;
  }
  function _completeRoleplay(moduleId) {
    const state = _flow?.roleplayState;
    const practiceLines = state?.practiceLines || [];
    const readyCount = practiceLines.filter((_, idx) => state?.shadowDone?.[idx] && state?.outputDone?.[idx]).length;
    if (practiceLines.length && readyCount < practiceLines.length) {
      showToast('내 대사를 먼저 끝까지 연습해 주세요');
      return;
    }

    Store.completeRoleplay(moduleId);
    const mod = MODULES.find(m => m.id === moduleId);
    const xp = mod?.xp || 200;
    Store.addXP(xp);
    confetti(60);

    document.getElementById('flowBody').innerHTML = `
      <div class="completion-screen">
        <div class="completion-emoji">🎭</div>
        <div class="completion-title">롤플레이 완료!</div>
        <div class="completion-sub">${escHtml(mod?.roleplay?.name || '')} 마스터 완료!<br>다음 모듈로 진행하세요.</div>
        <div class="completion-unlocks">
          <div class="cu-title">✨ 획득</div>
          <div class="completion-unlock-item"><span class="cui-icon">⚡</span> +${xp} XP</div>
          <div class="completion-unlock-item"><span class="cui-icon">🎭</span> 롤플레이 뱃지</div>
        </div>
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = `
      <button class="btn btn-primary" onclick="App.closeFlow()">홈으로 →</button>
    `;
  }

  // ── Module Completion ─────────────────────────────────────
  function _showModuleCompletion(mod) {
    const xp = mod.xp || 100;
    Store.addXP(50); // bonus for full completion
    confetti(40);

    const nextItem = _getNextInModule(mod);

    document.getElementById('flowBody').innerHTML = `
      <div class="completion-screen">
        <div class="completion-emoji">✅</div>
        <div class="completion-title">모듈 완료!</div>
        <div class="completion-sub">${escHtml(mod.name)} 모든 학습 단계 완료!<br>
          ${mod.roleplay ? '🎭 롤플레이가 해금되었습니다!' : '다음 모듈로 진행하세요!'}
        </div>
        <div class="completion-unlocks">
          <div class="cu-title">✨ 획득</div>
          <div class="completion-unlock-item"><span class="cui-icon">⚡</span> +50 XP 보너스</div>
          ${mod.roleplay ? `<div class="completion-unlock-item"><span class="cui-icon">🔓</span> 🎭 ${escHtml(mod.roleplay.name)} 해금!</div>` : ''}
        </div>
      </div>
    `;

    document.getElementById('flowFooter').innerHTML = `
      <div style="display:flex;gap:10px">
        ${mod.roleplay ? `<button class="btn btn-outline" onclick="App._startRoleplay(App._getMod('${mod.id}'))">🎭 롤플레이 하기</button>` : ''}
        <button class="btn btn-primary" onclick="App.closeFlow()">
          ${mod.roleplay ? '나중에' : '홈으로 →'}
        </button>
      </div>
    `;
  }

  function _getMod(id) {
    return MODULES.find(m => m.id === id);
  }
  function _getNextInModule() { return null; }

  // ── Flow Screen Control ───────────────────────────────────
  function _openFlowScreen() {
    document.getElementById('flowScreen').classList.add('open');
  }

  function closeFlow() {
    clearTimeout(_autoNextTimer);
    document.getElementById('flowScreen').classList.remove('open');
    TTS.stop();
    _flow = null;
    _renderHome();
    _renderLesson();
  }

  function goBack() { closeFlow(); }

  // ── Random Practice ───────────────────────────────────────
  function startKanaReview() {
    const allChars = Object.keys(KANA_MAP || {});
    const queue = Store.getKanaReviewQueue(allChars);
    const chars = queue.slice(0, Math.min(20, queue.length));
    if (!chars.length) { showToast('가나 데이터를 불러올 수 없습니다'); return; }
    const mod = { id: '_review_kana', stageId: 1, name: '가나 복습', icon: 'あ', iconIsText: true, steps: [
      { type: 'kana_learn', title: '가나 복습 카드', kanaType: 'mixed_review', chars, customLabel: '오늘의 복습' },
      { type: 'kana_quiz', title: '가나 복습 퀴즈', kanaType: 'mixed_review', chars }
    ], roleplay: null };
    document.getElementById('flowTitle').textContent = '가나 복습';
    document.getElementById('flowStep').textContent = '';
    document.getElementById('flowProgressFill').style.width = '0%';
    _flow = { moduleId: '_review_kana', step: 0 };
    _openFlowScreen();
    _renderKanaLearn(mod, mod.steps[0], 0);
  }

  // ── 연습 플로우 공통 런처 ─────────────────────────────────
  function _startPracticeFlow(virtMod) {
    _flow = { moduleId: virtMod.id, step: 0, _virtMod: virtMod };
    document.getElementById('flowTitle').textContent = virtMod.name;
    document.getElementById('flowStep').textContent = '';
    document.getElementById('flowProgressFill').style.width = '0%';
    _openFlowScreen();
    _runCurrentStep();
  }

  function startVocabReview() {
    const allItems = _getAllVocabItems();
    const itemMap = new Map(allItems.map(item => [item.id, item]));
    const queueIds = Store.getVocabReviewQueue(allItems.map(item => item.id).filter(Boolean));
    const items = queueIds.map(id => itemMap.get(id)).filter(Boolean).slice(0, 20);
    if (!items.length) { showToast('어휘 데이터를 불러올 수 없습니다'); return; }
    _startPracticeFlow({
      id: '_practice_vocab_review',
      stageId: 1, name: '어휘 복습', icon: '📖',
      steps: [{ type: 'vocab_learn', title: `어휘 플래시카드 (${items.length}개)`, items }],
      roleplay: null
    });
  }

  function startRandomQuiz(type) {
    if (type === 'kana') {
      startKanaReview();
    } else if (type === 'vocab') {
      const items = shuffle(_getAllVocabItems()).slice(0, 20);
      if (!items.length) { showToast('어휘 데이터를 불러올 수 없습니다'); return; }
      _startPracticeFlow({
        id: '_practice_vocab_quiz',
        stageId: 1, name: '어휘 퀴즈', icon: '🎮',
        steps: [{ type: 'vocab_quiz', title: `랜덤 어휘 퀴즈 (${items.length}문제)`, items }],
        roleplay: null
      });
    }
  }

  function startListeningQuiz() {
    const allChars = Object.keys(KANA_MAP);
    if (!allChars.length) { showToast('가나 데이터를 불러올 수 없습니다'); return; }
    const chars = shuffle(allChars).slice(0, 15);
    _startPracticeFlow({
      id: '_practice_listening',
      stageId: 1, name: '듣기 퀴즈', icon: '🎧',
      steps: [{ type: 'kana_listening', title: `음성 듣고 글자 맞추기 (${chars.length}문제)`, chars }],
      roleplay: null
    });
  }

  function startSpeakingPractice() {
    const items = shuffle(_getAllVocabItems()).slice(0, 15);
    if (!items.length) { showToast('어휘 데이터를 불러올 수 없습니다'); return; }
    _startPracticeFlow({
      id: '_practice_shadowing',
      stageId: 1, name: '따라 말하기', icon: '🗣️',
      steps: [{ type: 'shadowing', title: `쉐도잉 연습 (${items.length}개)`, items }],
      roleplay: null
    });
  }

  // ── 퀴즈 정답/오답 이펙트 ────────────────────────────────
  function _playQuizEffect(isCorrect) {
    // 사운드 (Web Audio API — 짧은 비프음)
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isCorrect) {
        // 정답: C5 → E5 상승 2음
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, ctx.currentTime);
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } else {
        // 오답: 낮은 감소음
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(240, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(160, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch(e) { /* AudioContext 미지원 무시 */ }

    // 애니메이션
    const body = document.getElementById('flowBody');
    if (body) {
      if (isCorrect) {
        // 정답: 스파크 파티클 효과
        const correctBtn = document.querySelector('.quiz-choice.correct');
        if (correctBtn) _spawnV2Sparks(correctBtn);
      } else {
        // 오답: 흔들림 유지
        body.classList.remove('quiz-wrong-shake');
        void body.offsetWidth;
        body.classList.add('quiz-wrong-shake');
        setTimeout(() => body.classList.remove('quiz-wrong-shake'), 600);
      }
    }
  }

  function setQuizPassRate(rate) {
    Store.setSetting('quizPassRate', rate);
    _renderProfile(); // 설정 화면 새로고침
  }

  function _spawnV2Sparks(el) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ['#10b981','#34d399','#f59e0b','#3b82f6','#a78bfa','#fbbf24','#f97316'];
    for (let i = 0; i < 14; i++) {
      const sp = document.createElement('div');
      const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.4;
      const dist  = 45 + Math.random() * 55;
      sp.style.cssText = `
        position:fixed; z-index:9999; pointer-events:none;
        width:${5 + Math.random() * 6}px; height:${5 + Math.random() * 6}px;
        border-radius:${Math.random() > 0.5 ? '50%' : '3px'};
        background:${colors[Math.floor(Math.random() * colors.length)]};
        left:${cx}px; top:${cy}px;
        --tx:${Math.cos(angle) * dist}px; --ty:${Math.sin(angle) * dist}px;
        animation: v2SparkFly 0.55s ease-out forwards;
        animation-delay:${Math.random() * 0.07}s;
      `;
      document.body.appendChild(sp);
      setTimeout(() => sp.remove(), 700);
    }
  }

  // ── 획순 애니메이션 (KanjiVG 기반) ─────────────────────────
  // state: { kana, total, stepIdx, paths[], activeGroup, ns, animTimer }
  let _strokeState = null;

  async function _showStrokePanel(kana) {
    // 기존 모달 제거
    document.getElementById('strokeModal')?.remove();
    if (_strokeState?.animTimer) clearTimeout(_strokeState.animTimer);
    _strokeState = null;

    const info   = (typeof KANA_MAP !== 'undefined') ? (KANA_MAP[kana] || {}) : {};
    const romaji = info.romaji ?? '';
    const korean = info.korean ?? '';

    // ── 모달 생성 ──────────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.id    = 'strokeModal';
    overlay.className = 'hw-overlay';
    overlay.innerHTML = `
      <div class="hw-backdrop" onclick="App._closeStrokePanel()"></div>
      <div class="hw-card">
        <button class="hw-close-btn" onclick="App._closeStrokePanel()">✕</button>
        <div class="hw-title-row">
          <span class="hw-kana-label">${escHtml(kana)}</span>
          <div class="hw-kana-meta">
            <span class="hw-romaji">${escHtml(romaji)}</span>
            <span class="hw-korean">${escHtml(korean)}</span>
          </div>
        </div>
        <div class="hw-canvas-wrap"><div id="hwTarget"></div></div>
        <div class="hw-stroke-counter" id="hwCounter">로딩 중…</div>
        <div class="hw-controls">
          <button class="hw-btn" id="hwPlayBtn" onclick="App._strokePlay()">▶ 처음부터</button>
          <button class="hw-btn hw-btn-outline" onclick="App._strokeStep(-1)">◀ 이전</button>
          <button class="hw-btn hw-btn-outline" onclick="App._strokeStep(1)">다음 ▶</button>
        </div>
        <div class="hw-hint">순서대로 획을 확인하거나 자동 재생하세요</div>
      </div>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('open'));

    // ── KanjiVG SVG 로드 ──────────────────────────────────
    // KanjiVG GitHub raw: 5자리 유니코드 hex (예: あ→03042)
    const hex = kana.codePointAt(0).toString(16).padStart(5, '0');
    const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const svgText = await res.text();
      _renderKVGStrokes(svgText, kana);
    } catch {
      const el = document.getElementById('hwCounter');
      if (el) el.textContent = '획순 데이터 없음';
      const tgt = document.getElementById('hwTarget');
      if (tgt) tgt.innerHTML = `
        <div style="width:220px;height:220px;display:flex;align-items:center;
                    justify-content:center;font-size:130px;
                    font-family:'Noto Sans JP',serif;color:var(--text);opacity:.25">
          ${escHtml(kana)}</div>`;
    }
  }

  function _renderKVGStrokes(svgText, kana) {
    const parser = new DOMParser();
    const doc    = parser.parseFromString(svgText, 'image/svg+xml');

    // KanjiVG path id 형식: "kvg:{hex5}-s{n}"  (예: kvg:03042-s1)
    const strokePaths = [...doc.querySelectorAll('path[id]')]
      .filter(p => /-s\d+$/.test(p.id))
      .sort((a, b) => {
        const na = parseInt(a.id.match(/-s(\d+)$/)[1]);
        const nb = parseInt(b.id.match(/-s(\d+)$/)[1]);
        return na - nb;
      });

    if (!strokePaths.length) {
      const el = document.getElementById('hwCounter');
      if (el) el.textContent = '획순 데이터 없음';
      return;
    }

    const total = strokePaths.length;
    const ns    = 'http://www.w3.org/2000/svg';
    const tgt   = document.getElementById('hwTarget');
    if (!tgt) return;
    tgt.innerHTML = '';

    // SVG 캔버스 (KanjiVG viewBox = 0 0 109 109)
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 109 109');
    svg.setAttribute('width',  '220');
    svg.setAttribute('height', '220');

    // ── SVG defs: 붓 글로우 필터 ──────────────────────────
    const defs = document.createElementNS(ns, 'defs');
    defs.innerHTML = `
      <!-- 붓끝 글로우 -->
      <filter id="kvgTipGlow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <!-- 획 잉크 번짐 -->
      <filter id="kvgInk" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    `;
    svg.appendChild(defs);

    // ① 가이드라인 (십자)
    const guide = document.createElementNS(ns, 'g');
    [[54.5,0,54.5,109],[0,54.5,109,54.5]].forEach(([x1,y1,x2,y2]) => {
      const l = document.createElementNS(ns, 'line');
      l.setAttribute('x1',x1); l.setAttribute('y1',y1);
      l.setAttribute('x2',x2); l.setAttribute('y2',y2);
      l.setAttribute('stroke','rgba(99,102,241,.1)');
      l.setAttribute('stroke-width','1');
      l.setAttribute('stroke-dasharray','3 4');
      guide.appendChild(l);
    });
    svg.appendChild(guide);

    // ② 회색 아웃라인 (전체 획, 연하게)
    const outlineGroup = document.createElementNS(ns, 'g');
    strokePaths.forEach(p => {
      const o = document.createElementNS(ns, 'path');
      o.setAttribute('d', p.getAttribute('d'));
      o.setAttribute('stroke', 'rgba(148,163,184,.22)');
      o.setAttribute('stroke-width', '3.5');
      o.setAttribute('fill', 'none');
      o.setAttribute('stroke-linecap', 'round');
      o.setAttribute('stroke-linejoin', 'round');
      outlineGroup.appendChild(o);
    });
    svg.appendChild(outlineGroup);

    // ③ 활성 획 그룹 + 붓끝 그룹 (z-order: 획 아래, 붓끝 위)
    const activeGroup = document.createElementNS(ns, 'g');
    const tipGroup    = document.createElementNS(ns, 'g');
    svg.appendChild(activeGroup);
    svg.appendChild(tipGroup);

    tgt.appendChild(svg);

    _strokeState = { kana, total, stepIdx: -1, paths: strokePaths,
                     activeGroup, tipGroup, ns, svg,
                     animTimer: null, animFrame: null };
    _updateHwCounter();
    _strokeState.animTimer = setTimeout(() => _strokePlay(), 500);
  }

  // ── 이징 함수 (붓글씨 느낌) ──────────────────────────────
  // 시작 빠름 → 끝에서 자연스럽게 감속 (붓이 종이에 닿아 올리는 느낌)
  function _easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function _strokePlay() {
    if (!_strokeState?.paths) return;
    const st  = _strokeState;
    if (st.animTimer)  { clearTimeout(st.animTimer); st.animTimer = null; }
    if (st.animFrame)  { cancelAnimationFrame(st.animFrame); st.animFrame = null; }

    st.stepIdx = -1;
    st.activeGroup.innerHTML = '';
    st.tipGroup.innerHTML    = '';
    _updateHwCounter();

    const btn = document.getElementById('hwPlayBtn');
    if (btn) btn.textContent = '■ 재생 중';

    function drawStroke(i) {
      if (!_strokeState || _strokeState !== st) return;
      if (i >= st.total) {
        if (btn) btn.textContent = '▶ 처음부터';
        return;
      }
      st.stepIdx = i;
      _updateHwCounter();

      _kvgAddStroke(i, true, () => {
        // 획 완료 → 다음 획까지 짧은 숨고르기
        if (!_strokeState || _strokeState !== st) return;
        st.animTimer = setTimeout(() => drawStroke(i + 1), 260);
      });
    }
    drawStroke(0);
  }

  function _strokeStep(dir) {
    if (!_strokeState?.paths) return;
    const st = _strokeState;
    // 진행 중인 애니메이션 중단
    if (st.animTimer)  { clearTimeout(st.animTimer);      st.animTimer = null; }
    if (st.animFrame)  { cancelAnimationFrame(st.animFrame); st.animFrame = null; }

    const newIdx = Math.max(-1, Math.min(st.total - 1, st.stepIdx + dir));
    if (newIdx === st.stepIdx && newIdx !== -1) return;

    st.stepIdx = newIdx;
    st.activeGroup.innerHTML = '';
    st.tipGroup.innerHTML    = '';

    if (newIdx >= 0) {
      // 이전 획들은 즉시 표시 (애니 없음), 현재 획만 간단한 페이드인
      for (let i = 0; i < newIdx; i++)  _kvgAddStroke(i, false, null);
      _kvgAddStroke(newIdx, 'step', null); // 'step' = 짧은 애니
    }
    _updateHwCounter();

    const btn = document.getElementById('hwPlayBtn');
    if (btn) btn.textContent = '▶ 처음부터';
  }

  // ── 획 하나 렌더링 ────────────────────────────────────────
  // animate: false = 즉시 표시 / true = 붓글씨 풀 애니 / 'step' = 빠른 드로우
  function _kvgAddStroke(idx, animate, onComplete) {
    if (!_strokeState) return;
    const { paths, activeGroup, tipGroup, ns } = _strokeState;
    const srcPath = paths[idx];
    if (!srcPath) return;

    const isActive = animate !== false;
    const isFull   = animate === true;

    // ── 메인 획 path ──────────────────────────────────────
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', srcPath.getAttribute('d'));
    path.setAttribute('stroke', isActive ? '#a78bfa' : '#6366f1');
    path.setAttribute('stroke-width', isActive ? '5.5' : '3.8');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.style.opacity = isActive ? '1' : '0.55';
    if (isActive) path.setAttribute('filter', 'url(#kvgInk)');
    activeGroup.appendChild(path);

    // 애니메이션 없음 → 즉시 완료
    if (!animate) { if (onComplete) onComplete(); return; }

    try {
      const len = path.getTotalLength();
      if (len <= 0) { if (onComplete) onComplete(); return; }

      path.style.strokeDasharray  = len;
      path.style.strokeDashoffset = len;

      const DURATION = isFull ? Math.max(420, Math.min(len * 5.5, 780)) : 260;

      // ── 붓끝 (이동하는 글로우 원) ─────────────────────
      let tip = null;
      if (isFull) {
        tip = document.createElementNS(ns, 'circle');
        tip.setAttribute('r', '4.5');
        tip.setAttribute('fill', '#e9d5ff');
        tip.setAttribute('filter', 'url(#kvgTipGlow)');
        const sp = path.getPointAtLength(0);
        tip.setAttribute('cx', sp.x);
        tip.setAttribute('cy', sp.y);
        tipGroup.appendChild(tip);
      }

      const startTime = performance.now();
      const st = _strokeState;

      function frame(now) {
        if (!_strokeState || _strokeState !== st) return; // 패널 닫힘
        const raw    = Math.min((now - startTime) / DURATION, 1);
        const eased  = _easeOutCubic(raw);
        const drawn  = len * eased;

        path.style.strokeDashoffset = len - drawn;

        // 붓끝 이동
        if (tip) {
          try {
            const pt = path.getPointAtLength(Math.min(drawn, len - 0.1));
            tip.setAttribute('cx', pt.x);
            tip.setAttribute('cy', pt.y);
          } catch { /* ignore */ }
        }

        if (raw < 1) {
          st.animFrame = requestAnimationFrame(frame);
        } else {
          // 획 완료 처리
          path.style.strokeDashoffset = '0';
          st.animFrame = null;

          if (tip) {
            // 붓끝: 페이드 아웃 후 제거
            tip.style.transition = 'opacity 0.25s';
            tip.style.opacity    = '0';
            setTimeout(() => { try { tip.remove(); } catch {} }, 260);
          }
          if (onComplete) onComplete();
        }
      }

      st.animFrame = requestAnimationFrame(frame);

    } catch {
      // getTotalLength 미지원 fallback
      path.style.strokeDasharray  = '';
      path.style.strokeDashoffset = '';
      if (onComplete) onComplete();
    }
  }

  function _updateHwCounter() {
    const el = document.getElementById('hwCounter');
    if (!el || !_strokeState) return;
    const { total, stepIdx } = _strokeState;
    el.textContent = stepIdx < 0
      ? `총 ${total}획`
      : `${stepIdx + 1} / ${total}획`;
  }

  function _strokeUpdateSVG() { /* KanjiVG 렌더러가 처리 */ }
  function _strokeAutoPlay()  { /* KanjiVG 렌더러가 처리 */ }

  function _closeStrokePanel() {
    if (_strokeState?.animTimer) clearTimeout(_strokeState.animTimer);
    if (_strokeState?.animFrame) cancelAnimationFrame(_strokeState.animFrame);
    _strokeState = null;
    const m = document.getElementById('strokeModal');
    if (m) {
      m.classList.remove('open');
      setTimeout(() => m.remove(), 250);
    }
  }

  // ══════════════════════════════════════════════════════════
  //  인라인 획순 — 카드 뒷면에 직접 표시 (팝업 없음)
  // ══════════════════════════════════════════════════════════
  let _inlineStrokeState = null;

  async function _startInlineStroke(kana) {
    _stopInlineStroke(); // 이전 상태 완전 초기화

    const tgt = document.getElementById('kanaStrokeInline');
    if (!tgt) return;

    // AbortController: 카드 이동 시 진행 중인 fetch 취소
    const ctrl = new AbortController();
    _inlineStrokeState = { kana, ctrl, animTimer: null, animFrame: null };

    const hex = kana.codePointAt(0).toString(16).padStart(5, '0');
    const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${hex}.svg`;

    try {
      const res = await fetch(url, { signal: ctrl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const svgText = await res.text();
      // fetch 완료 시점에 여전히 같은 문자인지 확인
      if (_inlineStrokeState?.kana !== kana) return;
      _renderInlineKVG(svgText, kana);
    } catch (e) {
      if (e.name === 'AbortError') return; // 정상 취소 — 무시
      // 데이터 없음 → 문자만 희미하게 표시
      const el = document.getElementById('kanaStrokeInline');
      if (el && _inlineStrokeState?.kana === kana) {
        el.innerHTML = `<div style="font-size:52px;font-family:'Noto Sans JP',serif;
          color:rgba(99,102,241,.2);line-height:1">${escHtml(kana)}</div>`;
      }
    }
  }

  function _renderInlineKVG(svgText, kana) {
    const parser = new DOMParser();
    const doc    = parser.parseFromString(svgText, 'image/svg+xml');

    const strokePaths = [...doc.querySelectorAll('path[id]')]
      .filter(p => /-s\d+$/.test(p.id))
      .sort((a, b) =>
        parseInt(a.id.match(/-s(\d+)$/)[1]) - parseInt(b.id.match(/-s(\d+)$/)[1]));

    const tgt = document.getElementById('kanaStrokeInline');
    if (!tgt || !strokePaths.length) return;
    tgt.innerHTML = '';

    const total = strokePaths.length;
    const ns    = 'http://www.w3.org/2000/svg';

    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 109 109');
    svg.setAttribute('width',  '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // ── SVG 필터 정의 ─────────────────────────────────────
    const defs = document.createElementNS(ns, 'defs');
    defs.innerHTML = `
      <filter id="ilTipGlow" x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="ilInk" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>`;
    svg.appendChild(defs);

    // ── 가이드라인 (점선 십자) ─────────────────────────────
    const guide = document.createElementNS(ns, 'g');
    [[54.5,0,54.5,109],[0,54.5,109,54.5]].forEach(([x1,y1,x2,y2]) => {
      const l = document.createElementNS(ns, 'line');
      l.setAttribute('x1',x1); l.setAttribute('y1',y1);
      l.setAttribute('x2',x2); l.setAttribute('y2',y2);
      l.setAttribute('stroke','rgba(99,102,241,.12)');
      l.setAttribute('stroke-width','1');
      l.setAttribute('stroke-dasharray','3 4');
      guide.appendChild(l);
    });
    svg.appendChild(guide);

    // ── 회색 아웃라인 ────────────────────────────────────
    const outlineG = document.createElementNS(ns, 'g');
    strokePaths.forEach(p => {
      const o = document.createElementNS(ns, 'path');
      o.setAttribute('d', p.getAttribute('d'));
      o.setAttribute('stroke', 'rgba(148,163,184,.2)');
      o.setAttribute('stroke-width', '3.5');
      o.setAttribute('fill', 'none');
      o.setAttribute('stroke-linecap', 'round');
      o.setAttribute('stroke-linejoin', 'round');
      outlineG.appendChild(o);
    });
    svg.appendChild(outlineG);

    // ── 활성 획 그룹 / 붓끝 그룹 ────────────────────────
    const activeG = document.createElementNS(ns, 'g');
    const tipG    = document.createElementNS(ns, 'g');
    svg.appendChild(activeG);
    svg.appendChild(tipG);
    tgt.appendChild(svg);

    // _inlineStrokeState 업데이트 (ctrl 유지)
    Object.assign(_inlineStrokeState, {
      total, stepIdx: -1,
      paths: strokePaths, activeG, tipG, ns
    });

    // 자동 재생
    _inlineStrokeState.animTimer = setTimeout(() => _inlinePlay(), 150);
  }

  // ── 자동/수동 재생 ──────────────────────────────────────
  function _inlinePlay() {
    if (!_inlineStrokeState?.paths) return;
    const st = _inlineStrokeState;
    if (st.animTimer) { clearTimeout(st.animTimer);       st.animTimer = null; }
    if (st.animFrame) { cancelAnimationFrame(st.animFrame); st.animFrame = null; }

    st.stepIdx = -1;
    st.activeG.innerHTML = '';
    st.tipG.innerHTML    = '';

    function drawStroke(i) {
      if (!_inlineStrokeState || _inlineStrokeState !== st) return;
      if (i >= st.total) return; // 완료
      st.stepIdx = i;
      _inlineAddStroke(i, () => {
        if (!_inlineStrokeState || _inlineStrokeState !== st) return;
        st.animTimer = setTimeout(() => drawStroke(i + 1), 220);
      });
    }
    drawStroke(0);
  }

  // 공개 — 🔄 버튼에서 호출
  function _replayInlineStroke() { _inlinePlay(); }

  // 카드 이동 / 앞면 복귀 시 호출
  function _stopInlineStroke() {
    if (_inlineStrokeState?.ctrl)      { try { _inlineStrokeState.ctrl.abort(); } catch {} }
    if (_inlineStrokeState?.animTimer) clearTimeout(_inlineStrokeState.animTimer);
    if (_inlineStrokeState?.animFrame) cancelAnimationFrame(_inlineStrokeState.animFrame);
    _inlineStrokeState = null;
  }

  // ── 획 하나 그리기 (붓글씨 RAF 애니메이션) ──────────────
  function _inlineAddStroke(idx, onComplete) {
    if (!_inlineStrokeState) return;
    const { paths, activeG, tipG, ns } = _inlineStrokeState;
    const srcPath = paths[idx];
    if (!srcPath) { if (onComplete) onComplete(); return; }

    // 이전 획들 (완료된 것) — 연하게 남김
    // 현재 획 — 진하게 + 붓글씨 애니
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', srcPath.getAttribute('d'));
    path.setAttribute('stroke', '#a78bfa');
    path.setAttribute('stroke-width', '5.5');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('filter', 'url(#ilInk)');
    activeG.appendChild(path);

    // 이전 획들 색 낮추기
    [...activeG.children].slice(0, -1).forEach(el => {
      el.setAttribute('stroke', '#6366f1');
      el.setAttribute('stroke-width', '4');
      el.style.opacity = '0.55';
      el.removeAttribute('filter');
    });

    try {
      const len = path.getTotalLength();
      if (len <= 0) { if (onComplete) onComplete(); return; }

      path.style.strokeDasharray  = len;
      path.style.strokeDashoffset = len;

      // 획 길이에 비례한 재생 시간 (짧은 획은 빠르게, 긴 획은 느리게)
      const DURATION = Math.max(350, Math.min(len * 5.2, 700));

      // 붓끝 (이동하는 글로우 원)
      const tip = document.createElementNS(ns, 'circle');
      tip.setAttribute('r', '3.5');
      tip.setAttribute('fill', '#e9d5ff');
      tip.setAttribute('filter', 'url(#ilTipGlow)');
      const sp = path.getPointAtLength(0);
      tip.setAttribute('cx', sp.x);
      tip.setAttribute('cy', sp.y);
      tipG.appendChild(tip);

      const startTime = performance.now();
      const st = _inlineStrokeState;

      function frame(now) {
        if (!_inlineStrokeState || _inlineStrokeState !== st) return;
        const raw   = Math.min((now - startTime) / DURATION, 1);
        const eased = 1 - Math.pow(1 - raw, 3); // easeOutCubic
        const drawn = len * eased;

        path.style.strokeDashoffset = len - drawn;

        try {
          const pt = path.getPointAtLength(Math.min(drawn, len - 0.1));
          tip.setAttribute('cx', pt.x);
          tip.setAttribute('cy', pt.y);
        } catch { /* ignore */ }

        if (raw < 1) {
          st.animFrame = requestAnimationFrame(frame);
        } else {
          path.style.strokeDashoffset = '0';
          st.animFrame = null;
          // 붓끝 페이드 아웃
          tip.style.transition = 'opacity 0.2s';
          tip.style.opacity    = '0';
          setTimeout(() => { try { tip.remove(); } catch {} }, 220);
          if (onComplete) onComplete();
        }
      }
      st.animFrame = requestAnimationFrame(frame);

    } catch {
      path.style.strokeDasharray  = '';
      path.style.strokeDashoffset = '';
      if (onComplete) onComplete();
    }
  }

  // ── TTS 설정 UI 빌더 ─────────────────────────────────────
  function _buildTTSSettingsHtml() {
    const engine = TTS.getEngineName();
    let html = `
      <div style="font-size:12px;color:var(--text3);margin-bottom:10px">
        현재 엔진: <strong style="color:var(--accent2)">${escHtml(engine)}</strong>
      </div>
    `;

    if (TTS.isVoicevox()) {
      const speakers = TTS.getVoicevoxSpeakers();
      const curA     = TTS.getVoicevoxSpeakerId();
      const curB     = TTS.getVoicevoxSpeakerBId();
      const curC     = TTS.getVoicevoxSpeakerCId();
      const opts = speakers.map(s => ({ id: s.id, name: s.name }));
      const makeSelect = (id, onChange, cur) =>
        `<select id="${id}" onchange="${onChange}(this.value)"
           style="width:100%;padding:8px 10px;background:var(--bg3);border:1px solid var(--border);
                  border-radius:10px;color:var(--text);font-size:12px;cursor:pointer;margin-bottom:4px">
           ${opts.map(s => `<option value="${s.id}" ${s.id === cur ? 'selected' : ''}>${escHtml(s.name)}</option>`).join('')}
         </select>`;
      html += `
        <div style="margin-bottom:12px">
          <div style="font-size:12px;color:var(--text2);margin-bottom:8px;font-weight:600">
            🎙️ VOICEVOX 화자 (롤플레이 다화자)
          </div>
          <div style="display:grid;gap:8px">
            <div>
              <div style="font-size:11px;color:var(--accent2);margin-bottom:3px">🟣 화자 A — 나 (학습자)</div>
              ${makeSelect('vvSpeakerA', 'App.setVoicevoxSpeakerA', curA)}
              <button onclick="TTS.speak('よろしくお願いします', {speakerId:${curA}})"
                style="width:100%;padding:7px;background:var(--bg3);border:1px solid var(--border);
                       border-radius:8px;color:var(--text);font-size:12px;cursor:pointer">🔊 테스트</button>
            </div>
            <div>
              <div style="font-size:11px;color:#34d399;margin-bottom:3px">🟢 화자 B — 상대방</div>
              ${makeSelect('vvSpeakerB', 'App.setVoicevoxSpeakerB', curB)}
              <button onclick="TTS.speak('いらっしゃいませ。', {speakerId:${curB}})"
                style="width:100%;padding:7px;background:var(--bg3);border:1px solid var(--border);
                       border-radius:8px;color:var(--text);font-size:12px;cursor:pointer">🔊 테스트</button>
            </div>
            <div>
              <div style="font-size:11px;color:#fb923c;margin-bottom:3px">🟠 화자 C — 제3자/점원</div>
              ${makeSelect('vvSpeakerC', 'App.setVoicevoxSpeakerC', curC)}
              <button onclick="TTS.speak('かしこまりました。', {speakerId:${curC}})"
                style="width:100%;padding:7px;background:var(--bg3);border:1px solid var(--border);
                       border-radius:8px;color:var(--text);font-size:12px;cursor:pointer">🔊 테스트</button>
            </div>
          </div>
        </div>
      `;
    } else if (TTS.isEdgeTts()) {
      const voices = TTS.getEdgeVoices();
      const curV   = TTS.getEdgeVoice();
      html += `
        <div style="margin-bottom:12px">
          <div style="font-size:12px;color:var(--text2);margin-bottom:6px;font-weight:600">
            🌐 Edge TTS 음성
          </div>
          <select id="edgeVoiceSelect" onchange="App.setEdgeTTSVoice(this.value)"
            style="width:100%;padding:10px 12px;background:var(--bg3);border:1px solid var(--border);
                   border-radius:10px;color:var(--text);font-size:13px;cursor:pointer">
            ${voices.map(v =>
              `<option value="${v.id}" ${v.id === curV ? 'selected' : ''}>${escHtml(v.name)}</option>`
            ).join('')}
          </select>
          <button onclick="TTS.speak('おはようございます')"
            style="margin-top:8px;width:100%;padding:9px;background:var(--bg3);
                   border:1px solid var(--border);border-radius:10px;color:var(--text);
                   font-size:13px;cursor:pointer">
            🔊 테스트 재생
          </button>
        </div>
      `;
    } else {
      html += `
        <div style="font-size:13px;color:var(--text3);padding:10px 0">
          🔊 브라우저 기본 음성: <strong>${escHtml(TTS.getWebSpeechVoiceName())}</strong><br>
          <span style="font-size:11px;margin-top:6px;display:block">
            더 좋은 음질을 원하면 VOICEVOX를 설치하세요.<br>
            <a href="https://voicevox.hiroshiba.jp" target="_blank"
               style="color:var(--accent)">voicevox.hiroshiba.jp</a>
          </span>
        </div>
      `;
    }
    return html;
  }

  function setVoicevoxSpeaker(id) {   // legacy alias
    TTS.setVoicevoxSpeaker(id);
    showToast('🎙️ 화자 A 변경됨');
  }
  function setVoicevoxSpeakerA(id) {
    TTS.setVoicevoxSpeaker(id);
    showToast('🎙️ 화자 A 변경됨');
    TTS.speak('よろしくお願いします', { speakerId: parseInt(id) });
  }
  function setVoicevoxSpeakerB(id) {
    TTS.setVoicevoxSpeakerB(id);
    showToast('🎙️ 화자 B 변경됨');
    TTS.speak('いらっしゃいませ。', { speakerId: parseInt(id) });
  }
  function setVoicevoxSpeakerC(id) {
    TTS.setVoicevoxSpeakerC(id);
    showToast('🎙️ 화자 C 변경됨');
    TTS.speak('かしこまりました。', { speakerId: parseInt(id) });
  }

  function setEdgeTTSVoice(v) {
    TTS.setEdgeVoice(v);
    showToast('🌐 음성 변경됨');
    TTS.speak('はじめまして。よろしくお願いします。');
  }

  // ── 개발자 테스트 도구 ────────────────────────────────────
  function _devMenu() {
    const xp = Store.get().xp;
    const modName = _flow?.moduleId
      ? (MODULES.find(m => m.id === _flow.moduleId)?.name || _flow.moduleId)
      : '없음';
    const stepInfo = _flow?.step >= 0
      ? `단계 ${_flow.step + 1}`
      : '인트로';

    const choice = prompt(
      `🛠 개발자 테스트 도구\n` +
      `현재 XP: ${xp} | 모듈: ${modName} | ${stepInfo}\n\n` +
      `1 → 현재 단계 스킵 (100점 통과)\n` +
      `2 → 현재 모듈 전체 완료\n` +
      `3 → XP +100\n` +
      `4 → XP +500\n` +
      `5 → XP +2000\n` +
      `6 → 진도 초기화 후 새로고침`,
      ''
    );

    switch (choice?.trim()) {
      case '1': devSkipCurrentStep(); break;
      case '2': devCompleteCurrentModule(); break;
      case '3': devAddXP(100); break;
      case '4': devAddXP(500); break;
      case '5': devAddXP(2000); break;
      case '6': resetProgress(); break;
      default: break;
    }
  }

  function devAddXP(amount) {
    Store.addXP(amount);
    showToast(`⚡ +${amount} XP 추가! 현재: ${Store.get().xp} XP`);
    _renderHome();
    _renderLesson();
    _renderProfile();
  }

  function devSkipCurrentStep() {
    if (!_flow || !_flow.moduleId) {
      showToast('⚠️ 먼저 모듈을 열어주세요 (레슨 탭에서 모듈 선택)');
      return;
    }
    const mod = MODULES.find(m => m.id === _flow.moduleId);
    if (!mod) return;
    const stepIndex = _flow.step;
    if (stepIndex < 0 || stepIndex >= mod.steps.length) {
      showToast('⚠️ 스킵할 단계가 없습니다');
      return;
    }
    const step = mod.steps[stepIndex];
    Store.completeStep(_flow.moduleId, stepIndex, 100);
    Store.addXP(80);
    showToast(`⏭ "${step.title}" 완료 처리 (100점)`);
    _flow.step = stepIndex + 1;
    _runCurrentStep();
  }

  function devCompleteCurrentModule() {
    if (!_flow || !_flow.moduleId) {
      showToast('⚠️ 먼저 모듈을 열어주세요');
      return;
    }
    const mod = MODULES.find(m => m.id === _flow.moduleId);
    if (!mod) return;
    // 모든 단계 완료 처리
    mod.steps.forEach((_, i) => Store.completeStep(_flow.moduleId, i, 100));
    Store.addXP(mod.xp || 200);
    showToast(`✅ "${mod.name}" 모든 단계 완료 처리!`);
    _flow.step = mod.steps.length;
    _runCurrentStep();
  }

  // ── Settings ──────────────────────────────────────────────
  function toggleFurigana() {
    const cur = Store.getSetting('furigana');
    Store.setSetting('furigana', !cur);
    showToast((!cur) ? '후리가나 ON ✅' : '후리가나 OFF');
    _renderProfile();
  }

  function toggleTTS() {
    showToast('TTS 설정은 브라우저에서 관리됩니다');
  }

  function resetProgress() {
    if (!confirm('진도를 초기화할까요? 이 작업은 되돌릴 수 없습니다.')) return;
    localStorage.removeItem('jp_master_v2');
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.remove('jp_master_v2');
    }
    location.reload();
  }

  // ── Data Helpers ──────────────────────────────────────────
  function _getVocabItems(step) {
    // 연습 플로우처럼 items를 직접 주입한 경우
    if (step.items) return step.items;
    const all = _getAllVocabItems();
    if (step.categoryId) {
      return all.filter(item => item.categoryId === step.categoryId
                             || _itemMatchesCat(item, step.categoryId))
                .slice(0, step.limit || 999);
    }
    if (step.categoryIds) {
      return all.filter(item =>
        step.categoryIds.some(cid => item.categoryId === cid || _itemMatchesCat(item, cid))
      ).slice(0, step.limit || 999);
    }
    return [];
  }

  function _itemMatchesCat(item, catId) {
    // Map category IDs → item ID prefixes (based on actual data file patterns)
    const CAT_PATTERNS = {
      // W1W4 — vocab-items-w1w4.js
      'basic_words':            ['w1_'],
      'essential_phrases':      ['gr_'],
      'numbers_basic':          ['num_', 'nap_'],
      'dates_days':             ['dt_', 'dn_'],
      'time_expressions':       ['dt_'],      // same dt_ prefix (date/time)
      'pronouns':               ['prn_'],
      'pronouns_personal':      ['prn_1', 'prn_2', 'prn_3', 'prn_4', 'prn_5'],
      'pronouns_thing':         ['prn_6', 'prn_7', 'prn_8', 'prn_12', 'prn_13', 'prn_14'],
      'pronouns_place':         ['prn_9', 'prn_10', 'prn_11'],
      'place_transport':        ['tr_'],
      // W5W8 — vocab-items-w5w8.js
      'basic_verbs':            ['vb1_', 'vb2_', 'vb3_'],
      'adjectives':             ['adj1_', 'adj2_', 'adj_'],
      'places_food':            ['tr_', 'food_', 'pl_'],
      'body_health':            ['bh_'],
      'transport':              ['tr_'],
      'food_restaurant':        ['food_'],
      'youth_slang':            ['youth_'],
      // W9W10 — vocab-items-w9w10.js
      'it_tech_basic':          ['it_program','it_code','it_bug','it_error','it_server','it_client','it_api','it_db','it_frontend','it_backend','it_infra','it_docker','it_git','it_github','it_slack','it_log','it_test','it_build','it_deploy','it_release'],
      'it_dev_process':         ['it_sprint','it_task','it_ticket','it_issue','it_pr','it_review','it_merge','it_refactor','it_debug','it_spec','it_design','it_standup','it_retrospec','it_kpt','it_pipeline'],
      'it_workplace':           ['it_engineer','it_designer','it_pm','it_po','it_qa','it_tl','it_ops','it_sre','it_deadline','it_priority','it_impact','it_release2','it_production','it_staging','it_local'],
      'biz_greetings':          ['biz_otsu','biz_yoroshiku','biz_shochi','biz_ryokai','biz_kashiko','biz_osewa','biz_confirm','biz_taio','biz_kentou','biz_kyoyu','biz_kakunin','biz_renraku'],
      'biz_hourensou':          ['biz_houkoku','biz_soudan','biz_shinchou','biz_yotei','biz_okure','biz_mondai','biz_kaichou','biz_tsuika','biz_ima','biz_ato'],
      'biz_meeting':            ['biz_gidai','biz_gijiroku','biz_ikaga','biz_iken','biz_ossharu','biz_teian','biz_kansha','biz_imi','biz_jikan','biz_omakase','biz_wakarima','biz_matome'],
      // S1S5/S6SIM
      'hotel_accommodation':    ['hd_','cin_','cout_','rs_'],
      'shopping':               ['sd_','sel_','dnq_','dep_'],
    };
    const patterns = CAT_PATTERNS[catId] || [];
    return patterns.some(p => item.id && item.id.startsWith(p));
  }

  // ── Daily Missions ────────────────────────────────────────
  function _getDailyMissions(prog) {
    const today = new Date().toISOString().slice(0, 10);
    const studiedToday = prog.studyDays?.includes(today);
    const next = getNextModule(prog);
    const missions = [];

    // Mission 1: Study session
    if (next) {
      const mod = next.mod;
      const mp = prog.modules[mod.id] || {};
      const stepsDone = mp.stepsCompleted || 0;
      missions.push({
        iconKey: next.roleplay ? 'roleplay' : 'book',
        title: next.roleplay ? `롤플레이 · ${mod.roleplay.name}` : `${mod.name} 학습`,
        desc: next.roleplay ? '모든 단계 완료! 롤플레이를 시작하세요' : `${stepsDone}/${mod.steps.length} 단계 완료`,
        done: false,
        action: `App.openModule('${mod.id}', ${next.roleplay ? 'true' : 'false'})`
      });
    }

    // Mission 2: Daily XP goal
    const todayXP = prog.todayXP || 0;
    const xpGoal = 100;
    missions.push({
      iconKey: 'xp',
      title: `오늘 ${xpGoal} XP 달성`,
      desc: `현재 오늘 ${todayXP} XP 획득 · 목표까지 ${Math.max(0, xpGoal - todayXP)} XP`,
      done: todayXP >= xpGoal,
      action: null
    });

    // Mission 3: Streak check
    missions.push({
      iconKey: 'streak',
      title: studiedToday ? `연속 ${prog.streak}일 달성!` : '오늘 첫 학습하기',
      desc: studiedToday ? '오늘 학습 완료! 내일도 이어가세요' : '오늘 하나라도 학습하면 스트릭이 이어져요',
      done: studiedToday,
      action: studiedToday ? null : (next ? `App.openModule('${next.mod.id}')` : null)
    });

    return missions;
  }

  function _getAllVocabItems() {
    const sources = [
      typeof VOCAB_ITEMS_W1W4 !== 'undefined' ? VOCAB_ITEMS_W1W4 : [],
      typeof VOCAB_ITEMS_W5W8 !== 'undefined' ? VOCAB_ITEMS_W5W8 : [],
      typeof VOCAB_ITEMS_W9W10 !== 'undefined' ? VOCAB_ITEMS_W9W10 : [],
      typeof VOCAB_ITEMS_S1S5 !== 'undefined' ? VOCAB_ITEMS_S1S5 : [],
      typeof VOCAB_ITEMS_S6SIM !== 'undefined' ? VOCAB_ITEMS_S6SIM : [],
    ];
    return sources.flat();
  }

  function _getDialogue(key) {
    if (!key) return null;
    const D  = typeof VOCAB_ITEMS_DIALOGUE !== 'undefined' ? VOCAB_ITEMS_DIALOGUE : [];
    const IT = typeof VOCAB_ITEMS_IT_SIM   !== 'undefined' ? VOCAB_ITEMS_IT_SIM   : [];

    // Helper: filter by id prefix(es)
    const by = (...pres) => D.filter(x => pres.some(p => x.id?.startsWith(p)));

    const keyMap = {
      // ── Stage 2: 생존 일본어 ──
      'airport':       by('ap_'),           // 공항 체크인
      'schedule':      by('ph_'),           // 전화 예약 (날짜·시간)
      'transport':     [...by('sub_'), ...by('tx_'), ...by('bus_')],  // 지하철+택시+버스
      'facility_help': [...by('tlt_'), ...by('elv_')], // 화장실+엘리베이터
      'food':          [...by('rd_'), ...by('iz_'), ...by('cf_')],    // 식당+이자카야+카페
      'hotel':         [...by('hd_'), ...by('cin_'), ...by('cout_'), ...by('rs_')], // 호텔 전체
      'shopping':      [...by('sd_'), ...by('sel_'), ...by('dnq_'), ...by('dep_')], // 쇼핑 전체
      // ── Stage 3: 일상 대화 ──
      'first_meeting': by('dm_'),           // 처음 만남
      'daily_chat':    by('dd_'),           // 스몰토크
      'sightseeing':   [...by('ons_'), ...by('bsb_'), ...by('elv_')], // 관광지
      'couple_travel': [...by('hp_'), ...by('pk_'), ...by('dk_'), ...by('air_')],  // 건강+약국+치과+비행기
      // ── Stage 4: IT·비즈니스 ──
      'it_standup':    IT.filter(x => x.id?.startsWith('its_')  || x.id?.startsWith('its2_')),
      'it_codereview': IT.filter(x => x.id?.startsWith('itcr_') || x.id?.startsWith('itcr2_')),
      'it_1on1':       IT.filter(x => x.id?.startsWith('it1_')),
      'it_kickoff':    IT.filter(x => x.id?.startsWith('itk_')),
      'it_spec':       IT.filter(x => x.id?.startsWith('itsp_')),
      'it_intro':      IT.filter(x => x.id?.startsWith('iti_')),
    };

    const result = keyMap[key] || [];
    return result.length > 0 ? result : null;
  }

  // ── Misc Helpers ──────────────────────────────────────────
  function _capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function _formatNum(n) {
    if (n >= 1000) return (n/1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'k';
    return String(n);
  }
  function _hexToRgb(hex) {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '99,102,241';
  }

  function _nextLevelXP(xp) {
    const thresholds = [0,500,1500,3000,5000,8000,12000,18000,25000,35000,50000];
    return thresholds.find(t => t > xp) || 50000;
  }
  function _curLevelXP(xp) {
    const thresholds = [0,500,1500,3000,5000,8000,12000,18000,25000,35000,50000];
    return [...thresholds].reverse().find(t => t <= xp) || 0;
  }
  function _levelName(xp) {
    if (xp < 500)   return '🌱 일본어 씨앗';
    if (xp < 1500)  return '📖 입문자';
    if (xp < 3000)  return '🗣️ 초보 여행자';
    if (xp < 5000)  return '✈️ 여행 마스터';
    if (xp < 8000)  return '💬 일상 대화자';
    if (xp < 12000) return '👔 비즈니스 입문';
    if (xp < 18000) return '💻 IT 커뮤니케이터';
    if (xp < 25000) return '🏢 직장인 마스터';
    return '🏆 일본어 마스터';
  }

  function _buildCalDays(studyDays) {
    const today = new Date();
    const rows = [];
    let row = '';
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dStr = d.toISOString().slice(0, 10);
      const studied = studyDays.includes(dStr);
      const isToday = dStr === today.toISOString().slice(0, 10);
      const dom = d.getDate();
      row += `<div class="cal-day ${studied ? 'studied' : ''} ${isToday ? 'today' : ''}">${dom}</div>`;
      if ((i % 7 === 0) || i === 0) {
        rows.push(`<div class="cal-row">${row}</div>`);
        row = '';
      }
    }
    return rows.join('');
  }

  // ── Public API ────────────────────────────────────────────
  return {
    init,
    switchTab,
    goBack,
    closeFlow,
    openModule,
    startKanaReview,
    startVocabReview,
    startRandomQuiz,
    startListeningQuiz,
    startSpeakingPractice,
    toggleFurigana,
    toggleTTS,
    resetProgress,
    // TTS 설정
    setVoicevoxSpeaker,
    setVoicevoxSpeakerA,
    setVoicevoxSpeakerB,
    setVoicevoxSpeakerC,
    setEdgeTTSVoice,
    // 쉐도잉
    _shadowingNext,
    // 개발자 테스트 도구
    _devMenu,
    devAddXP,
    devSkipCurrentStep,
    devCompleteCurrentModule,
    // Internal but called from HTML
    _flipKana,
    _kanaLearnNext,
    _kanaLearnPrev,
    _kanaSpeak,
    _kanaQuizAnswer,
    _kanaQuizNext,
    _vocabSpeak,
    _vocabFlip,
    _vocabNext,
    _vocabPrev,
    _vocabEval,
    _vocabQuizAnswer,
    _vocabQuizNext,
    _dialogueStudyDone,
    _startFlowFromStep,
    _afterQuiz,
    _startRetryPhase,
    _listeningQuizAnswer,
    _listeningQuizNext,
    // 강의 플레이어
    _lecNext,
    _lecPrev,
    _lecRestart,
    _lecPauseToggle,
    _lecCapTab,
    setQuizPassRate,
    _completeRoleplay,
    _replayAll,
    _stopRoleplay,
    _startRoleplay,
    _toggleRoleplayReveal,
    _markRoleplayShadow,
    _markRoleplayOutput,
    _speakDialogueLine,
    showDialogueDetail,
    closeDialogueDetail,
    _getMod,
    // 획순 애니메이션
    _showStrokePanel,
    _closeStrokePanel,
    _strokeStep,
    _strokePlay,
    _replayInlineStroke,
  };
})();

// ── Bootstrap ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => App.init());
