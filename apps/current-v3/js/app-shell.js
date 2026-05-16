/* ============================================================
   V3 App Shell - header, tabs, and flow overlay shell
   ============================================================ */

'use strict';

window.createAppShell = (ctx) => {
  let currentTab = 'home';

  function build() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <header class="app-header" id="appHeader">
        <div class="header-left">
          <button class="btn-back hidden" id="btnBack" onclick="App.goBack()">←</button>
          <div>
            <span class="app-title">KANA QUEST <b>v3</b></span>
          </div>
        </div>
        <div class="header-right">
          <div class="stat-pill" id="xpPill">
            ${ctx.uiIconWrap('xp', 'stat-pill-icon')}
            <span id="headerXP">0</span> XP
          </div>
          <div class="stat-pill" id="streakPill">
            ${ctx.uiIconWrap('streak', 'stat-pill-icon')}
            <span id="headerStreak">0</span>
          </div>
        </div>
      </header>

      <main class="app-main" id="appMain">
        <div class="view active" id="viewHome">
          <div class="home-view" id="homeContent"></div>
        </div>
        <div class="view" id="viewLesson">
          <div class="lesson-view" id="lessonContent"></div>
        </div>
        <div class="view" id="viewPractice">
          <div class="practice-view" id="practiceContent"></div>
        </div>
        <div class="view" id="viewProfile">
          <div class="profile-view" id="profileContent"></div>
        </div>
      </main>

      <nav class="bottom-nav" id="bottomNav">
        <button class="nav-btn active" data-tab="home">
          <span class="nav-icon">${ctx.uiIconSvg('home', 'nav-icon-svg')}</span>
          <span class="nav-label">HOME</span>
        </button>
        <button class="nav-btn" data-tab="lesson">
          <span class="nav-icon">${ctx.uiIconSvg('lesson', 'nav-icon-svg')}</span>
          <span class="nav-label">LESSON</span>
        </button>
        <button class="nav-btn" data-tab="practice">
          <span class="nav-icon">${ctx.uiIconSvg('practice', 'nav-icon-svg')}</span>
          <span class="nav-label">TRAIN</span>
        </button>
        <button class="nav-btn" data-tab="profile">
          <span class="nav-icon">${ctx.uiIconSvg('profile', 'nav-icon-svg')}</span>
          <span class="nav-label">PROFILE</span>
        </button>
      </nav>

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

      <div class="toast" id="toast"></div>
    `;
  }

  function bindNav() {
    document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
  }

  function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view' + ctx.capitalize(tab))?.classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    updateHeader();
  }

  function updateHeader() {
    const prog = ctx.Store.get();
    const xp = document.getElementById('headerXP');
    const streak = document.getElementById('headerStreak');
    if (xp) xp.textContent = ctx.formatNum(prog.xp);
    if (streak) streak.textContent = prog.streak;
  }

  function openFlowScreen() {
    document.getElementById('flowScreen')?.classList.add('open');
  }

  function closeFlowScreen() {
    document.getElementById('flowScreen')?.classList.remove('open');
  }

  function getCurrentTab() {
    return currentTab;
  }

  return {
    build,
    bindNav,
    switchTab,
    updateHeader,
    openFlowScreen,
    closeFlowScreen,
    getCurrentTab,
  };
};
