/* ============================================================
   일본어 마스터 v2 — Main App
   Stage-based prerequisite unlock learning system
   ============================================================ */

'use strict';

// ── App singleton ──────────────────────────────────────────
const App = (() => {

  // ── State ────────────────────────────────────────────────
  let _currentTab = 'home';       // home | lesson | practice | profile
  let _flow = null;               // current learning flow
  let _flowEl = null;             // flow screen DOM element

  // ── Init ─────────────────────────────────────────────────
  async function init() {
    await Store.load();
    TTS.init();
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
            <span class="emoji">⚡</span>
            <span id="headerXP">0</span> XP
          </div>
          <div class="stat-pill" id="streakPill">
            <span class="emoji">🔥</span>
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
          <span class="nav-icon">🏠</span>
          <span class="nav-label">홈</span>
        </button>
        <button class="nav-btn" data-tab="lesson">
          <span class="nav-icon">📘</span>
          <span class="nav-label">레슨</span>
        </button>
        <button class="nav-btn" data-tab="practice">
          <span class="nav-icon">🎯</span>
          <span class="nav-label">연습</span>
        </button>
        <button class="nav-btn" data-tab="profile">
          <span class="nav-icon">👤</span>
          <span class="nav-label">나</span>
        </button>
      </nav>

      <!-- Flow Screen (overlays everything) -->
      <div class="flow-screen" id="flowScreen">
        <div class="flow-header">
          <button class="btn-back" onclick="App.closeFlow()">←</button>
          <div class="flow-title" id="flowTitle">학습 중...</div>
          <div class="flow-step" id="flowStep"></div>
          <!-- 개발자 퀵 메뉴 -->
          <button id="btnDevMenu" onclick="App._devMenu()"
            title="개발자 테스트 도구"
            style="margin-left:auto;background:none;border:none;color:#475569;
                   font-size:16px;cursor:pointer;padding:4px 6px;border-radius:6px;
                   transition:color .2s" onmouseover="this.style.color='#f59e0b'"
                   onmouseout="this.style.color='#475569'">🛠</button>
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
        <div style="margin:16px;background:linear-gradient(135deg,#1e1b4b,#312e81);
                    border:1px solid rgba(139,92,246,.4);border-radius:20px;padding:24px;text-align:center">
          <div style="font-size:56px;margin-bottom:12px">🇯🇵</div>
          <div style="font-size:20px;font-weight:800;margin-bottom:8px">일본어 마스터에 오신걸 환영해요!</div>
          <div style="font-size:14px;color:var(--text2);line-height:1.6;margin-bottom:20px">
            히라가나부터 IT 비즈니스 일본어까지<br>
            단계별로 <b style="color:var(--accent2)">각개 격파</b>하는 학습 시스템이에요.<br>
            먼저 히라가나부터 시작해 볼까요? 😊
          </div>
          <button class="btn btn-primary" onclick="App.openModule('kana_hira')"
                  style="border-radius:20px;padding:14px 32px;font-size:16px">
            🔤 히라가나 시작하기
          </button>
        </div>
      `;
    }

    // ── Continue Banner ──────────────────────────────────
    if (next && !isFirstVisit) {
      const stage = STAGES.find(s => s.id === next.mod.stageId);
      const pct = getModuleProgressPct(next.mod.id, prog);
      const title = next.roleplay ? `🎭 ${next.mod.roleplay.name}` : next.mod.name;
      const sub = `STAGE ${stage.id}: ${stage.name}`;
      html += `
        <div class="continue-banner" onclick="App.openModule('${next.mod.id}', ${next.roleplay ? 'true' : 'false'})">
          <div class="continue-label">계속 학습하기</div>
          <div class="continue-module">${escHtml(title)}</div>
          <div class="continue-stage">${escHtml(sub)}</div>
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
          <div class="continue-module">🎉 모든 레슨 완료!</div>
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
          <div class="section-title" style="padding:0 0 10px">
            🎯 오늘의 미션 · ${completedMissions}/${missions.length}
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${missions.map(m => `
              <div style="background:var(--card);border:1px solid ${m.done ? 'rgba(16,185,129,.3)' : 'var(--border)'};
                           border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:12px;
                           cursor:${m.action ? 'pointer' : 'default'}"
                   onclick="${m.action || ''}">
                <span style="font-size:22px">${m.icon}</span>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:700;${m.done ? 'text-decoration:line-through;color:var(--text3)' : ''}">${escHtml(m.title)}</div>
                  <div style="font-size:11px;color:var(--text3);margin-top:2px">${escHtml(m.desc)}</div>
                </div>
                <span style="font-size:18px">${m.done ? '✅' : '→'}</span>
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
            <div class="stat-name">🔥 연속 일수</div>
          </div>
          <div class="stat-card xp">
            <div class="stat-num">${_formatNum(prog.xp)}</div>
            <div class="stat-name">⚡ XP</div>
          </div>
          <div class="stat-card done">
            <div class="stat-num">${doneMods}</div>
            <div class="stat-name">✅ 완료 모듈</div>
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
              <span style="font-size:26px">${stage.icon}</span>
            </div>
            <div class="stage-meta">
              <div class="stage-name">STAGE ${stage.id}: ${escHtml(stage.name)}</div>
              <div class="stage-sub">${stage.jlpt ? `JLPT ${stage.jlpt} · ` : ''}${modCount}개 모듈</div>
            </div>
            <span class="stage-tag">${locked ? `🔒 ${_formatNum(stage.unlockXP)} XP` : (pct === 100 ? '✅' : `${pct}%`)}</span>
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
            <span class="lesson-stage-title">${stage.icon} STAGE ${stage.id}: ${escHtml(stage.name)}</span>
            <span class="lesson-stage-badge" style="background:${badgeBg};color:${badgeColor};padding:3px 8px;border-radius:20px;font-size:10px;font-weight:700;">
              ${locked ? `🔒 ${_formatNum(stage.unlockXP)} XP` : (stage.jlpt || '학습 중')}
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

        let statusIcon = '▶';
        let statusClass = 'play';
        if (modLocked)  { statusIcon = '🔒'; statusClass = 'lock'; }
        else if (completed) { statusIcon = '✅'; statusClass = 'done'; }

        html += `
          <div class="module-card ${modLocked ? 'locked' : ''} ${completed ? 'completed' : ''}"
               onclick="${!modLocked ? `App.openModule('${mod.id}')` : ''}">
            <div class="module-icon" style="${mod.iconIsText ? 'font-size:24px;' : ''}">
              ${escHtml(mod.icon)}
            </div>
            <div class="module-info">
              <div class="module-name">${escHtml(mod.name)}</div>
              <div class="module-sub">${escHtml(mod.nameJp || '')} · ${totalSteps}단계</div>
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
              <span class="rp-icon">${mod.roleplay.icon}</span>
              <div class="rp-info">
                <div class="rp-name">🎭 ${escHtml(mod.roleplay.name)}</div>
                <div class="rp-hint">${rpUnlocked ? escHtml(mod.roleplay.desc) : `위 ${totalSteps}단계 완료 후 해금`}</div>
              </div>
              <span class="rp-lock">${rpDone ? '✅' : (rpUnlocked ? '▶' : '🔒')}</span>
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

    let html = `
      <div class="practice-section-title">빠른 복습</div>
      <div class="practice-grid">
        <div class="practice-item" onclick="App.startKanaReview()">
          <div class="pi-icon">あア</div>
          <div class="pi-name">가나 플래시카드</div>
          <div class="pi-stage">히라가나 · 가타가나</div>
        </div>
        <div class="practice-item ${!vocabUnlocked ? 'locked' : ''}"
             onclick="${vocabUnlocked ? "App.startVocabReview()" : ''}">
          <div class="pi-icon">📖</div>
          <div class="pi-name">어휘 복습</div>
          <div class="pi-stage">학습한 단어 전체</div>
          ${!vocabUnlocked ? '<div class="pi-lock">🔒</div>' : ''}
        </div>
        <div class="practice-item ${!quizUnlocked ? 'locked' : ''}"
             onclick="${quizUnlocked ? "App.startRandomQuiz('kana')" : ''}">
          <div class="pi-icon">❓</div>
          <div class="pi-name">가나 퀴즈</div>
          <div class="pi-stage">랜덤 20문제</div>
          ${!quizUnlocked ? '<div class="pi-lock">🔒</div>' : ''}
        </div>
        <div class="practice-item ${!quizUnlocked ? 'locked' : ''}"
             onclick="${quizUnlocked ? "App.startRandomQuiz('vocab')" : ''}">
          <div class="pi-icon">🎮</div>
          <div class="pi-name">어휘 퀴즈</div>
          <div class="pi-stage">랜덤 20문제</div>
          ${!quizUnlocked ? '<div class="pi-lock">🔒</div>' : ''}
        </div>
      </div>

      <div class="practice-section-title" style="margin-top:8px">청취 연습</div>
      <div class="practice-grid">
        <div class="practice-item ${!quizUnlocked ? 'locked' : ''}"
             onclick="${quizUnlocked ? "App.startListeningQuiz()" : ''}">
          <div class="pi-icon">🎧</div>
          <div class="pi-name">듣기 퀴즈</div>
          <div class="pi-stage">음성 → 글자 맞추기</div>
          ${!quizUnlocked ? '<div class="pi-lock">🔒</div>' : ''}
        </div>
        <div class="practice-item ${!quizUnlocked ? 'locked' : ''}"
             onclick="${quizUnlocked ? "App.startSpeakingPractice()" : ''}">
          <div class="pi-icon">🗣️</div>
          <div class="pi-name">따라 말하기</div>
          <div class="pi-stage">쉐도잉 연습</div>
          ${!quizUnlocked ? '<div class="pi-lock">🔒</div>' : ''}
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
        <div class="profile-avatar">🧑‍💻</div>
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
          <div class="ps-name">🔥 연속일</div>
        </div>
        <div class="pstat">
          <div class="ps-num" style="color:var(--accent2)">${prog.totalDays || 0}</div>
          <div class="ps-name">📅 총 학습일</div>
        </div>
        <div class="pstat">
          <div class="ps-num" style="color:var(--success)">${learnedKana + learnedVocab}</div>
          <div class="ps-name">📝 학습 아이템</div>
        </div>
      </div>

      <div class="profile-section">
        <div class="profile-section-title">최근 4주 학습 기록</div>
        <div class="streak-calendar">
          ${calDays}
        </div>
      </div>

      <div class="profile-section">
        <div class="profile-section-title">설정</div>
        <div class="settings-list">
          <div class="settings-item" onclick="App.toggleFurigana()">
            <span class="si-icon">あ</span>
            <span class="si-label">후리가나 표시</span>
            <span class="si-arrow">${prog.settings.furigana ? '✅' : '⬜'}</span>
          </div>
          <div class="settings-item" onclick="App.toggleTTS()">
            <span class="si-icon">🔊</span>
            <span class="si-label">음성 자동 재생</span>
            <span class="si-arrow">${TTS.isEnabled() ? '✅' : '⬜'}</span>
          </div>
          <div class="settings-item" onclick="App.resetProgress()">
            <span class="si-icon">🗑️</span>
            <span class="si-label">진도 초기화</span>
            <span class="si-arrow">›</span>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <div class="profile-section-title" style="color:var(--warning)">🛠️ 개발자 테스트 도구</div>
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
    `;

    const btnLabel = stepsDone > 0 ? `${stepsDone}단계부터 이어서 ▶` : '학습 시작 ▶';
    document.getElementById('flowFooter').innerHTML = `
      <button class="btn btn-primary" onclick="App._startFlowFromStep('${mod.id}', ${startStep})">
        ${escHtml(btnLabel)}
      </button>
    `;

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
      case 'kana_learn':      _renderKanaLearn(mod, s, step); break;
      case 'kana_quiz':       _renderKanaQuiz(mod, s, step); break;
      case 'kana_listening':  _renderKanaListening(mod, s, step); break;
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

  // ── Kana Learn ────────────────────────────────────────────
  function _renderKanaLearn(mod, step, stepIndex) {
    const level = LEVELS.find(l => l.id === step.levelId);
    if (!level) { _advanceStep(); return; }

    // State stored on _flow so all handlers share it
    _flow._kanaState = {
      chars: level.chars,
      level,
      cardIdx: 0,
      flipped: false,
      stepIndex
    };

    function render() {
      const st = _flow._kanaState;
      const c = st.chars[st.cardIdx];
      const info = KANA_MAP[c] || {};
      const examples = (info.examples || []).slice(0, 3)
        .map(ex => `<div class="kana-ex-pill">
          <span class="ex-word">${escHtml(ex.word)}</span>
          <span style="color:var(--text3)"> — </span>${escHtml(ex.meaning)}
        </div>`).join('');

      const typeLabel = st.level.type
        .replace('hiragana_dakuten','히라가나 탁음')
        .replace('hiragana_yoon','히라가나 요음')
        .replace('hiragana','히라가나')
        .replace('katakana_dakuten','가타가나 탁음')
        .replace('katakana_yoon','가타가나 요음')
        .replace('katakana','가타가나');

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
                <div class="kana-type-label">${escHtml(typeLabel)}</div>
                <div class="kana-char">${escHtml(c)}</div>
                <div class="kana-tap-hint">탭해서 읽는 법 보기 👆</div>
              </div>
              <div class="kana-back">
                <div class="kana-romaji">${escHtml(info.romaji || '')}</div>
                <div class="kana-korean">${escHtml(info.korean || '')}</div>
                ${info.tip ? `<div class="kana-tip">${escHtml(info.tip)}</div>` : ''}
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
      const safeC = c.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
      document.getElementById('flowFooter').innerHTML = `
        <div style="display:flex;gap:10px;margin-bottom:10px">
          <button class="btn btn-outline" onclick="App._kanaLearnPrev()"
                  style="flex:1" ${st.cardIdx === 0 ? 'disabled' : ''}>← 이전</button>
          <button class="btn btn-primary" onclick="App._kanaLearnNext()" style="flex:2">
            ${isLast ? '완료 ✓' : '다음 →'}
          </button>
        </div>
        <div style="text-align:center">
          <button onclick="TTS.speak('${safeC}')"
                  style="background:var(--bg3);border:1px solid var(--border);border-radius:20px;
                         padding:8px 20px;color:var(--text);cursor:pointer;font-size:13px;font-weight:600">
            🔊 듣기
          </button>
        </div>
      `;
    }

    _flow._kanaRender = render;
    render();
    TTS.speak(level.chars[0]);
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
      } else {
        card.classList.remove('flipped');
      }
    }
  }

  function _kanaLearnNext() {
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
    if (!level) { _advanceStep(); return; }

    const chars = shuffle(level.chars).slice(0, Math.min(20, level.chars.length));

    // renderQ는 반드시 _flow._kanaQuiz에서 읽어야 다음 문제로 넘어감 (클로저 버그 방지)
    function renderQ() {
      const fq = _flow._kanaQuiz;
      if (!fq) return;
      const { qIdx, correct, wrong } = fq;

      if (qIdx >= fq.chars.length) {
        _showQuizResult(correct, fq.chars.length, stepIndex, Math.round((correct / fq.chars.length) * 100));
        return;
      }
      const c = fq.chars[qIdx];
      const info = KANA_MAP[c] || {};
      // Build choices: 1 correct + 3 random distractors
      const allChars = Object.keys(KANA_MAP).filter(k => k !== c && KANA_MAP[k].type === info.type);
      const distractors = sample(allChars, 3).map(k => ({ kana: k, korean: KANA_MAP[k].korean, romaji: KANA_MAP[k].romaji }));
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
          <div class="quiz-q-text">${escHtml(c)}</div>
          <button class="quiz-audio-btn" onclick="TTS.speak('${c.replace(/'/g,"\\'")}')">🔊 듣기</button>
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

    _flow._kanaQuiz = { chars, qIdx: 0, correct: 0, wrong: 0, stepIndex, renderQ };
    renderQ();
  }

  function _kanaQuizAnswer(btn, isCorrect) {
    const fq = _flow._kanaQuiz;
    if (!fq) return;
    // Disable all buttons
    document.querySelectorAll('.quiz-choice').forEach(b => {
      b.classList.add('answered');
      b.onclick = null;
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) { fq.correct++; }
    else { fq.wrong++; TTS.speak(fq.chars[fq.qIdx]); }

    const fb = document.getElementById('quizFeedback');
    if (fb) {
      fb.className = `quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
      const c = fq.chars[fq.qIdx];
      const info = KANA_MAP[c] || {};
      fb.textContent = isCorrect
        ? `✅ 정답! ${c} = ${info.romaji} (${info.korean})`
        : `❌ 오답. 정답: ${c} = ${info.romaji} (${info.korean})`;
    }
    show(document.getElementById('btnNextQ'));
  }

  function _kanaQuizNext() {
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
        _showQuizResult(correct, fq.chars.length, stepIndex,
          Math.round((correct / fq.chars.length) * 100));
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
                  onclick="TTS.speak('${safeC}')">🔊 다시 듣기</button>
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

    _flow._listeningQuiz = { chars, qIdx: 0, correct: 0, wrong: 0, stepIndex, renderQ };
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
    if (isCorrect) { fq.correct++; }
    else { fq.wrong++; TTS.speak(correctChar); }

    const info = KANA_MAP[correctChar] || {};
    const fb = document.getElementById('quizFeedback');
    if (fb) {
      fb.className = `quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
      fb.textContent = isCorrect
        ? `✅ 정답! ${correctChar} = ${info.romaji} (${info.korean})`
        : `❌ 오답. 정답: ${correctChar} = ${info.romaji} (${info.korean})`;
    }
    show(document.getElementById('btnNextQ'));
  }

  function _listeningQuizNext() {
    const fq = _flow._listeningQuiz;
    if (!fq) return;
    fq.qIdx++;
    fq.renderQ();
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
    const jpHtml = showFuri ? formatJp(item) : escHtml(item.kanji || item.japanese);

    _updateFlowProgress(stepIndex, mod.steps.length, step.title);
    document.getElementById('flowBody').innerHTML = `
      <div style="font-size:12px;color:var(--text3);text-align:center;margin-bottom:16px">
        ${idx + 1} / ${items.length}
      </div>
      <div class="vocab-card" onclick="App._vocabFlip()">
        <button class="vc-audio-btn"
          onclick="event.stopPropagation();TTS.speak('${(item.japanese||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'")}')">🔊</button>
        <div class="vc-num">어휘 ${idx + 1}</div>
        <div class="vc-jp">${jpHtml}</div>
        ${item.kanji && item.kanji !== item.japanese
          ? `<div class="vc-kanji">${escHtml(item.kanji)}</div>` : ''}
        ${showMeaning ? `
          <div class="vc-divider"></div>
          <div class="vc-meaning">${escHtml(item.korean || '')}</div>
          <div class="vc-english">${escHtml(item.english || '')}</div>
          ${item.tip ? `<div class="vc-tip">${escHtml(item.tip)}</div>` : ''}
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
    st.showMeaning = false;
    if (rating === 'again') {
      const item = st.items.splice(st.idx, 1)[0];
      st.items.push(item);
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
        _showQuizResult(correct, fq.questions.length, stepIndex, Math.round((correct / fq.questions.length) * 100));
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
          <button class="quiz-audio-btn" onclick="TTS.speak('${(item.japanese||'').replace(/'/g,"\\'")}')">🔊 듣기</button>
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

    _flow._vocabQuiz = { questions, qIdx: 0, correct: 0, wrong: 0, stepIndex, renderQ };
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
    if (isCorrect) { fq.correct++; }
    else { fq.wrong++; TTS.speak(jp); }

    const fb = document.getElementById('quizFeedback');
    if (fb) {
      fb.className = `quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
      fb.textContent = isCorrect
        ? `✅ 정답! ${jp} = ${ko}`
        : `❌ 오답. 정답: ${jp} = ${ko}`;
    }
    show(document.getElementById('btnNextQ'));
  }

  function _vocabQuizNext() {
    const fq = _flow._vocabQuiz;
    if (!fq) return;
    fq.qIdx++;
    fq.renderQ();
  }

  // ── Quiz Result ───────────────────────────────────────────
  function _showQuizResult(correct, total, stepIndex, score) {
    const pct = score;
    const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '😊' : '💪';
    const title = pct >= 90 ? '완벽해요!' : pct >= 70 ? '잘 했어요!' : pct >= 50 ? '괜찮아요!' : '다시 도전!';
    const xpEarned = Math.round((pct / 100) * 100 + 20);

    Store.completeStep(_flow.moduleId, stepIndex, score);
    Store.addXP(xpEarned);
    if (pct >= 70) confetti(pct >= 90 ? 60 : 30);

    document.getElementById('flowBody').innerHTML = `
      <div class="score-screen">
        <div class="score-emoji">${emoji}</div>
        <div class="score-title">${title}</div>
        <div class="score-subtitle">${correct} / ${total} 정답</div>
        <div class="score-ring" id="scoreRing">
          <div class="score-pct">${pct}%</div>
        </div>
        <div class="xp-earned">+<span class="xp-num">${xpEarned}</span> XP 획득!</div>
      </div>
    `;
    updateScoreRing(document.getElementById('scoreRing'), pct);

    document.getElementById('flowFooter').innerHTML = `
      <button class="btn btn-primary" onclick="App._afterQuiz(${pct >= 60})">
        ${pct >= 60 ? '다음 단계 →' : '다시 도전 🔁'}
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

  // ── Dialogue Study ────────────────────────────────────────
  function _renderDialogueStudy(mod, step, stepIndex) {
    const dialogues = _getDialogue(step.dialogueKey || mod.roleplay?.dialogueKey);
    if (!dialogues?.length) { _advanceStep(); return; }

    const html = dialogues.map(line => {
      if (line.speaker === 'N') {
        return `<div class="dialogue-line speaker-N">
          <div class="dialogue-narrator">${escHtml(line.japanese || '')}</div>
        </div>`;
      }
      const side = line.speaker === 'A' ? 'speaker-A' : 'speaker-B';
      const label = line.speaker === 'A' ? '나' : 'B';
      return `
        <div class="dialogue-line ${side}">
          <div class="dialogue-avatar">${label}</div>
          <div class="dialogue-bubble">
            <div class="db-jp">${ruby(line.japanese || '')}</div>
            <div class="db-ko">${escHtml(line.korean || '')}</div>
            <span class="db-audio" onclick="TTS.speak('${(line.japanese||'').replace(/'/g,"\\'")}')">🔊 듣기</span>
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
  function _startRoleplay(mod) {
    const rp = mod.roleplay;
    const dialogues = _getDialogue(rp.dialogueKey);
    if (!dialogues?.length) { showToast('대화 데이터를 찾을 수 없습니다'); return; }

    document.getElementById('flowTitle').textContent = `🎭 ${rp.name}`;
    document.getElementById('flowStep').textContent = '';
    document.getElementById('flowProgressFill').style.width = '100%';

    const html = dialogues.map((line, i) => {
      if (line.speaker === 'N') {
        return `<div class="dialogue-line speaker-N">
          <div class="dialogue-narrator">${escHtml(line.japanese || '')}</div>
        </div>`;
      }
      const side = line.speaker === 'A' ? 'speaker-A' : 'speaker-B';
      const label = line.speaker === 'A' ? '나' : 'B';
      return `
        <div class="dialogue-line ${side}">
          <div class="dialogue-avatar">${label}</div>
          <div class="dialogue-bubble">
            <div class="db-jp">${ruby(line.japanese || '')}</div>
            <div class="db-ko">${escHtml(line.korean || '')}</div>
            <span class="db-audio" onclick="TTS.speak('${(line.japanese||'').replace(/'/g,"\\'")}')">🔊</span>
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('flowBody').innerHTML = `
      <div class="dialogue-scene">
        <div class="scene-title">${rp.icon} ${escHtml(rp.name)}</div>
        ${escHtml(rp.desc)}
      </div>
      <div class="dialogue-list">${html}</div>
    `;

    document.getElementById('flowFooter').innerHTML = `
      <div style="display:flex;gap:10px">
        <button class="btn btn-outline" onclick="App._replayAll('${mod.id}')">🔊 전체 재생</button>
        <button class="btn btn-success" onclick="App._completeRoleplay('${mod.id}')">완료 ✓</button>
      </div>
    `;

    _openFlowScreen();
    _flow = { moduleId: mod.id, step: -1, roleplay: true };
  }

  function _replayAll(moduleId) {
    const mod = MODULES.find(m => m.id === moduleId);
    if (!mod?.roleplay) return;
    const dialogues = _getDialogue(mod.roleplay.dialogueKey);
    if (!dialogues) return;
    let i = 0;
    const playNext = () => {
      while (i < dialogues.length && dialogues[i].speaker === 'N') i++;
      if (i >= dialogues.length) return;
      TTS.speak(dialogues[i].japanese || '');
      i++;
      setTimeout(playNext, 2500);
    };
    playNext();
  }

  function _completeRoleplay(moduleId) {
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
    document.getElementById('flowScreen').classList.remove('open');
    TTS.stop();
    _flow = null;
    _renderHome();
    _renderLesson();
  }

  function goBack() { closeFlow(); }

  // ── Random Practice ───────────────────────────────────────
  function startKanaReview() {
    // Use Level 1 (hiragana basics) as demo
    const mod = { id: '_review_kana', stageId: 1, name: '가나 복습', icon: 'あ', iconIsText: true, steps: [
      { type: 'kana_learn', title: '히라가나 기본 복습', kanaType: 'hiragana', levelId: 1 },
      { type: 'kana_quiz', title: '히라가나 퀴즈', kanaType: 'hiragana', levelId: 1 }
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
    const items = shuffle(_getAllVocabItems()).slice(0, 20);
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
    showToast('🗣️ 따라 말하기 — 곧 추가 예정!');
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
        icon: '📖',
        title: next.roleplay ? `🎭 롤플레이: ${mod.roleplay.name}` : `${mod.name} 학습`,
        desc: next.roleplay ? '모든 단계 완료! 롤플레이를 시작하세요' : `${stepsDone}/${mod.steps.length} 단계 완료`,
        done: false,
        action: `App.openModule('${mod.id}', ${next.roleplay ? 'true' : 'false'})`
      });
    }

    // Mission 2: Daily XP goal
    const todayXP = prog._todayXP || 0;
    const xpGoal = 100;
    missions.push({
      icon: '⚡',
      title: `오늘 ${xpGoal} XP 달성`,
      desc: `현재 오늘 ${todayXP} XP 획득 · 목표까지 ${Math.max(0, xpGoal - todayXP)} XP`,
      done: todayXP >= xpGoal,
      action: null
    });

    // Mission 3: Streak check
    missions.push({
      icon: '🔥',
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
    _vocabFlip,
    _vocabNext,
    _vocabPrev,
    _vocabEval,
    _vocabQuizAnswer,
    _vocabQuizNext,
    _dialogueStudyDone,
    _startFlowFromStep,
    _afterQuiz,
    _listeningQuizAnswer,
    _listeningQuizNext,
    _completeRoleplay,
    _replayAll,
    _startRoleplay,
    _getMod,
  };
})();

// ── Bootstrap ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => App.init());
