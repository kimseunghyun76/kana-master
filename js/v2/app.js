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
  let _autoNextTimer = null;      // timer for automatic next question
  let _quizVoiceIdx  = 0;         // TTS 3-voice round-robin index (0=A,1=B,2=C)
  let _bgmCtx        = null;      // BGM AudioContext
  let _bgmNodes      = [];        // BGM oscillator/gain nodes (for cleanup)

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
          <div style="margin-top:14px">
            <button onclick="App.openPlacementTest()"
                    style="background:none;border:1.5px solid rgba(139,92,246,.5);border-radius:14px;
                           color:var(--accent2);font-size:13px;font-weight:600;padding:10px 22px;
                           cursor:pointer;width:100%">
              📊 이미 일본어를 배웠다면? 레벨 진단하기 →
            </button>
          </div>
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
          <div class="settings-item" onclick="App.resetProgress()">
            <span class="si-icon">🗑️</span>
            <span class="si-label">진도 초기화</span>
            <span class="si-arrow">›</span>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <div class="profile-section-title">📝 퀴즈 설정</div>
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
        <div class="profile-section-title">🔊 음성(TTS) 설정</div>
        ${_buildTTSSettingsHtml()}
      </div>

      <div class="profile-section">
        <div class="profile-section-title">📊 레벨 진단</div>
        <div style="font-size:13px;color:var(--text2);margin-bottom:12px;line-height:1.6">
          5개 섹션, 약 25문제로 현재 일본어 실력을 진단하고<br>
          최적의 시작 단계를 추천해 드립니다.
        </div>
        <button onclick="App.openPlacementTest()"
                style="width:100%;padding:14px;background:linear-gradient(135deg,#1e1b4b,#312e81);
                       border:1.5px solid rgba(139,92,246,.5);border-radius:14px;
                       color:var(--accent2);font-size:14px;font-weight:700;cursor:pointer">
          📊 레벨 진단 테스트 시작 →
        </button>
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

    const stepIcons = { lecture:'🎬', vocab_learn:'📚', vocab_quiz:'✏️', kana_learn:'🔤', kana_quiz:'🎯', dialogue_study:'💬' };
    const items = [
      ...mod.steps.map((s, i) => {
        const done = i < stepsDone;
        const icon = done ? '✅' : (stepIcons[s.type] || '📖');
        if (done) {
          return `<div class="intro-item done" onclick="App._startFlowFromStep('${mod.id}',${i})">
            <span class="ii-check">${icon}</span> ${escHtml(s.title)}
            <span class="ii-revisit">다시보기 ▶</span>
          </div>`;
        }
        return `<div class="intro-item ${i > stepsDone ? 'locked' : ''}">
          <span class="ii-check">${icon}</span> ${escHtml(s.title)}
        </div>`;
      }),
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
      const safeC = c.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
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
                <!-- ② 기억법 (TIP) — 메인 콘텐츠 -->
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
    if (!level) { _advanceStep(); return; }

    const chars = shuffle(level.chars).slice(0, Math.min(20, level.chars.length));

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
    _quizVoiceIdx = 0;
    _startBgm('quiz');
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
    // 정답·오답 모두 음성 재생 (A→B→C 순환)
    const _vSpeakers = [TTS.getVoicevoxSpeakerId(), TTS.getVoicevoxSpeakerBId(), TTS.getVoicevoxSpeakerCId()];
    TTS.speak(fq.chars[fq.qIdx], { speakerId: _vSpeakers[_quizVoiceIdx % 3] });
    _quizVoiceIdx++;
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
      }, 3000);
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
    _quizVoiceIdx = 0;
    _startBgm('quiz');
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
    { const _vs = [TTS.getVoicevoxSpeakerId(), TTS.getVoicevoxSpeakerBId(), TTS.getVoicevoxSpeakerCId()];
      TTS.speak(correctChar, { speakerId: _vs[_quizVoiceIdx % 3] }); _quizVoiceIdx++; }
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
      }, 3000);
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
  function _buildDisplayItems(items) {
    // 같은 groupId를 가진 항목들을 하나의 그룹 카드로 묶음
    const result = [];
    const groupMap = new Map(); // groupId → result 배열 인덱스
    for (const item of items) {
      if (item.groupId) {
        if (groupMap.has(item.groupId)) {
          result[groupMap.get(item.groupId)].groupItems.push(item);
        } else {
          const grp = { _isGroup: true, groupId: item.groupId, groupLabel: item.groupLabel || item.groupId, groupItems: [item] };
          groupMap.set(item.groupId, result.length);
          result.push(grp);
        }
      } else {
        result.push(item);
      }
    }
    return result;
  }

  function _renderVocabLearn(mod, step, stepIndex) {
    const rawItems = _getVocabItems(step);
    if (!rawItems.length) { Store.completeStep(_flow.moduleId, stepIndex); _advanceStep(); return; }
    const items = _buildDisplayItems(rawItems);

    // Store ALL state on _flow._vocab so render() always reads fresh values
    _flow._vocab = { items, idx: 0, showMeaning: true, stepIndex, mod, step };

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

    _updateFlowProgress(stepIndex, mod.steps.length, step.title);

    const navHtml = `
      <div class="vocab-nav">
        <button class="vocab-nav-btn" onclick="App._vocabPrev()" ${idx === 0 ? 'disabled' : ''}>←</button>
        <div class="vocab-nav-dots">
          ${items.slice(0, 20).map((_,i) =>
            `<div class="vocab-nav-dot ${i===idx?'active':i<idx?'done':''}"></div>`).join('')}
        </div>
        <button class="vocab-nav-btn" onclick="App._vocabNext()">→</button>
      </div>`;

    const counterHtml = `<div style="font-size:12px;color:var(--text3);text-align:center;margin-bottom:16px">${idx + 1} / ${items.length}</div>`;

    if (item._isGroup) {
      // ── 그룹 카드 렌더링 ─────────────────────────────────
      const gridHtml = item.groupItems.map(gi => {
        const jpH = showFuri ? formatJp(gi) : escHtml(stripFuri(gi.kanji || gi.japanese || ''));
        return `<div class="vc-group-item">
          <div class="vc-group-jp">${jpH}</div>
          <div class="vc-group-ko">${escHtml(gi.korean || '')}</div>
        </div>`;
      }).join('');

      document.getElementById('flowBody').innerHTML = `
        ${counterHtml}
        <div class="vocab-card vocab-card-group">
          <button class="vc-audio-btn" onclick="App._vocabSpeak()">🔊</button>
          <div class="vc-num">${escHtml(item.groupLabel)}</div>
          <div class="vc-group-grid">${gridHtml}</div>
        </div>
        ${navHtml}`;

      // 그룹 항목 순서대로 순차 읽기
      const qLines = item.groupItems.map(gi => ({ text: gi.japanese || '', speaker: 'A' }));
      TTS.speakQueue(qLines, {});
    } else {
      // ── 일반 카드 렌더링 ─────────────────────────────────
      const jpHtml = showFuri ? formatJp(item) : escHtml(stripFuri(item.kanji || item.japanese || ''));

      document.getElementById('flowBody').innerHTML = `
        ${counterHtml}
        <div class="vocab-card">
          <button class="vc-audio-btn" onclick="App._vocabSpeak()">🔊</button>
          <div class="vc-num">어휘 ${idx + 1}</div>
          <div class="vc-jp">${jpHtml}</div>
          <div class="vc-divider"></div>
          <div class="vc-meaning">${escHtml(item.korean || '')}</div>
          <div class="vc-english">${escHtml(item.english || '')}</div>
          ${item.tip ? `<div class="vc-tip">${ruby(item.tip)}</div>` : ''}
        </div>
        ${navHtml}`;

      TTS.speak(item.japanese || '');
    }
  }

  function _vocabSpeak() {
    const st = _flow._vocab;
    if (!st) return;
    const item = st.items[st.idx];
    if (!item) return;
    if (item._isGroup) {
      // 그룹: 순서대로 순차 읽기
      const qLines = item.groupItems.map(gi => ({ text: stripFuri(gi.japanese || ''), speaker: 'A' }));
      TTS.speakQueue(qLines, {});
    } else {
      TTS.speak(stripFuri(item.japanese));
    }
  }

  function _vocabFlip() {
    if (!_flow._vocab) return;
    _flow._vocab.showMeaning = true;
    _vocabRender();
  }

  function _vocabNext() {
    if (!_flow._vocab) return;
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
    _flow._vocab.idx--;
    _vocabRender();
  }

  function _vocabEval(rating) {
    const st = _flow._vocab;
    if (!st) return;
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
    _quizVoiceIdx = 0;
    _startBgm('quiz');
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
    { const _vs = [TTS.getVoicevoxSpeakerId(), TTS.getVoicevoxSpeakerBId(), TTS.getVoicevoxSpeakerCId()];
      TTS.speak(stripFuri(jp), { speakerId: _vs[_quizVoiceIdx % 3] }); _quizVoiceIdx++; }
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
      }, 3000);
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
            * 최종 점수와 진도는 첫 시도 결과로 기록됩니다.
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
    
    // 티어별 일본어 감탄사 및 메시지 (랜덤 선택)
    const tierPool = [
      { min: 90, entries: [
        { icon: '🏆', title: '완벽해요!',     jp: '最高(さいこう)です！',              msg: '완벽한 점수예요! 당신은 이미 일본어 천재! 이 속도라면 금세 원어민급이 될 거예요! 👑' },
        { icon: '🌟', title: '대단해요!',     jp: 'すごい！パーフェクト！',             msg: '와, 이런 점수가 나오다니! 정말 열심히 공부하셨군요. 일본 여행 가도 완벽하게 통할 실력이에요! ✨' },
        { icon: '🎊', title: '만점이에요!',   jp: '素晴(すば)らしい！',               msg: '믿을 수 없는 점수예요! 매 문제 흔들리지 않는 집중력, 진짜 대단해요. 그 실력 계속 유지해요! 💫' },
        { icon: '🥇', title: '최고예요!',     jp: 'やったあ！完璧(かんぺき)！',         msg: '100점을 향한 완벽한 질주! 이 기세로 다음 레벨도 가볍게 정복해버리세요! 🚀' },
        { icon: '💎', title: '압도적이에요!', jp: '信(しん)じられない！',              msg: '거의 실수 없이 클리어! 오늘 학습은 완전히 뇌에 새겨졌어요. 내일도 이 감각 유지해요! 🔥' },
      ]},
      { min: 70, entries: [
        { icon: '🎉', title: '잘 했어요!',    jp: '立派(りっぱ)です！',               msg: '훌륭해요! 실력이 쑥쑥 자라고 있는 게 느껴져요. 이 페이스라면 금방 마스터할 거예요! ✨' },
        { icon: '😄', title: '굿이에요!',     jp: 'よくできました！',                  msg: '좋은 점수예요! 틀린 문제들은 오늘 복습하면 다음엔 만점도 가능해요. 화이팅! 💪' },
        { icon: '⭐', title: '훌륭해요!',     jp: 'いい調子(ちょうし)！',              msg: '착실하게 실력이 쌓이고 있어요! 꾸준함이 최고의 무기예요. 계속 이 페이스로 가요! 🌱' },
        { icon: '🙌', title: '잘하고 있어요!', jp: 'ナイス！もう少し(すこし)で完璧！',  msg: '완벽에 아주 가까워요! 조금만 더 집중하면 만점이 보여요. 오늘 정말 잘했어요! 🎯' },
        { icon: '🌈', title: '대견해요!',     jp: 'どんどん上手(うま)くなってます！',   msg: '점점 더 좋아지고 있어요! 포기하지 않고 계속 도전하는 당신이 자랑스러워요! 🏅' },
      ]},
      { min: 50, entries: [
        { icon: '😊', title: '괜찮아요!',     jp: 'いいですね！',                     msg: '합격선을 넘었어요! 이 결과에 만족하지 말고, 한 번 더 복습하면 훨씬 올라갈 거예요. 💡' },
        { icon: '👍', title: '잘했어요!',     jp: 'もう少し(すこし)で上(うえ)です！', msg: '절반 이상 맞췄어요! 틀린 문제만 집중 복습하면 다음엔 훨씬 더 잘 할 수 있어요! 📚' },
        { icon: '🌿', title: '성장 중이에요!', jp: '少しずつ上手(うま)くなってます！', msg: '서두르지 마세요. 조금씩 착실히 쌓아가는 게 진짜 실력이에요! 꾸준히 가요! 🐢' },
        { icon: '✌️', title: '화이팅!',      jp: 'ファイト！もう一回(いっかい)！',    msg: '포기하지 않는 당신이 이미 대단해요! 반복이 습관이 되면 자연스럽게 늘어요. 계속해봐요! 🔄' },
        { icon: '💬', title: '계속 해봐요!', jp: 'あと少しで合格(ごうかく)です！',    msg: '합격이 바로 코앞이에요! 틀린 문제들을 체크하고 다시 도전해보면 금방 넘을 수 있어요! 🎯' },
      ]},
      { min: 0, entries: [
        { icon: '💪', title: '다시 도전!',    jp: '頑張(がんば)りましょう！',          msg: '괜찮아요! 처음엔 누구나 어려워요. 오답 문제를 다시 보면서 차근차근 익혀봐요. 같이 해봐요! 🔥' },
        { icon: '🫂', title: '힘내요!',       jp: 'あきらめないで！',                  msg: '실수는 실력이 자라는 증거예요! 틀렸던 문제가 나중엔 가장 기억에 잘 남게 돼요. 다시 해봐요! 🌱' },
        { icon: '🎮', title: '레벨업 중!',    jp: 'まだまだこれから！',               msg: '이제 시작이에요! 일본어는 매일 조금씩 하는 게 비결이에요. 오늘 틀린 걸 내일은 다 맞혀봐요! 🗓️' },
        { icon: '🧩', title: '같이 해봐요!', jp: 'もう一度(いちど)チャレンジ！',      msg: '아직 배우는 과정이에요. 틀려도 괜찮아요! 중요한 건 포기하지 않는 거예요. 화이팅! ✨' },
        { icon: '🔑', title: '복습이 열쇠!', jp: '復習(ふくしゅう)が大切(たいせつ)！', msg: '복습이 실력의 70%예요! 오늘 틀린 문제가 내일은 확실히 맞을 거예요. 믿어요! 📖' },
      ]},
    ];
    const tier = tierPool.find(t => pct >= t.min);
    const res  = tier.entries[Math.floor(Math.random() * tier.entries.length)];

    const xpEarned = Math.round((pct / 100) * 100 + 20);
    const passBadge = passed
      ? `<div class="v2-pass-badge v2-pass-ok">✅ 통과! (기준 ${passRate}%)</div>`
      : `<div class="v2-pass-badge v2-pass-ng">❌ 재도전 필요 (기준 ${passRate}%, 현재 ${pct}%)</div>`;

    Store.completeStep(_flow.moduleId, stepIndex, score);
    Store.addXP(xpEarned);

    // 팡파레 효과 (Confetti + 팡파레 음악 + TTS)
    _stopBgm(); // 퀴즈 BGM 종료
    if (pct >= 70) {
      confetti(pct >= 90 ? 150 : 80);
      _playFanfare(pct >= 90 ? 'perfect' : 'good');
      setTimeout(() => TTS.speak(stripFuri(res.jp)), 700);
    } else if (pct >= 50) {
      confetti(40);
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
        <div class="xp-earned">+<span class="xp-num">${xpEarned}</span> XP 획득!</div>
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
    _startBgm('lecture');
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
      _stopBgm();
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
          <div class="dialogue-bubble">
            <div class="db-jp">${ruby(line.japanese || '')}</div>
            <div class="db-ko">${escHtml(line.korean || '')}</div>
            ${line.tip ? `<div class="db-tip">${ruby(line.tip)}</div>` : ''}
            <span class="db-audio" onclick="TTS.speak('${(line.japanese||'').replace(/'/g,"\\'")}')">🔊</span>
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
          <div class="dialogue-bubble">
            <div class="db-jp">${ruby(line.japanese || '')}</div>
            <div class="db-ko">${escHtml(line.korean || '')}</div>
            ${line.tip ? `<div class="db-tip">${ruby(line.tip)}</div>` : ''}
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
      <div class="dialogue-list" id="dialogueList">${html}</div>
    `;

    document.getElementById('flowFooter').innerHTML = `
      <div style="display:flex;gap:10px">
        <button class="btn btn-outline" id="btnReplayAll" onclick="App._replayAll('${mod.id}')">🔊 전체 재생</button>
        <button class="btn btn-outline" id="btnStopPlay" style="display:none" onclick="App._stopRoleplay()">⏹ 정지</button>
        <button class="btn btn-success" onclick="App._completeRoleplay('${mod.id}')">완료 ✓</button>
      </div>
    `;

    _openFlowScreen();
    _flow = { moduleId: mod.id, step: -1, roleplay: true };

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
      text:      d.speaker === 'N' ? '' : (d.japanese || ''),
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

  // ── Flow Screen Control ───────────────────────────────────
  function _openFlowScreen() {
    document.getElementById('flowScreen').classList.add('open');
  }

  function closeFlow() {
    clearTimeout(_autoNextTimer);
    _stopBgm();
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

  // ── 팡파레 (Web Audio — 다장조 상행 아르페지오) ──────────────
  function _playFanfare(quality = 'good') {
    try {
      const ctx  = new (window.AudioContext || window.webkitAudioContext)();
      const now  = ctx.currentTime;
      // perfect(90%+): C5-E5-G5-C6 화음 → 파란 마무리
      // good(70%+):    C5-E5-G5 상행
      const noteFreqs = quality === 'perfect'
        ? [523.25, 659.25, 783.99, 1046.5, 1318.5]  // C5 E5 G5 C6 E6
        : [523.25, 659.25, 783.99, 1046.5];           // C5 E5 G5 C6

      noteFreqs.forEach((freq, i) => {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const start = now + i * 0.11;
        const end   = start + (i === noteFreqs.length - 1 ? 0.55 : 0.18);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.22, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, end);
        osc.start(start);
        osc.stop(end + 0.05);
      });

      // 마지막 노트에 짧은 심벌즈(화이트 노이즈)
      const bufSize  = ctx.sampleRate * 0.25;
      const buf      = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data     = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1);
      const noise    = ctx.createBufferSource();
      const ngain    = ctx.createGain();
      const bpf      = ctx.createBiquadFilter();
      bpf.type       = 'highpass';
      bpf.frequency.value = 8000;
      noise.buffer   = buf;
      noise.connect(bpf);
      bpf.connect(ngain);
      ngain.connect(ctx.destination);
      const ns = now + (noteFreqs.length - 1) * 0.11;
      ngain.gain.setValueAtTime(0.08, ns);
      ngain.gain.exponentialRampToValueAtTime(0.001, ns + 0.25);
      noise.start(ns);
      noise.stop(ns + 0.25);
    } catch(e) { /* ignore */ }
  }

  // ── BGM (실제 오디오 파일 재생) ────────────────────────────
  // sounds/quiz/index.json  → 퀴즈 전용 트랙
  // sounds/index.json       → 강의·대화 트랙 (랜덤)
  const _BGM_QUIZ_LIST = [
    'sounds/quiz/2019-03-17_-_Too_Crazy_-_David_Fesliyan.mp3',
    'sounds/quiz/2019-05-01_-_Undercover_Spy_Agent_-_David_Fesliyan.mp3',
    'sounds/quiz/2019-06-18_-_Creepy_Vibes_-_David_Fesliyan.mp3',
  ];
  const _BGM_AMBIENT_LIST = [
    'sounds/penguinmusic-gardens-stylish-chill-303261.mp3',
    'sounds/mfcc-vlog-music-beat-advertising-promo-podcast-background-intro-274290.mp3',
    'sounds/soulprodmusic-movement-200697.mp3',
    'sounds/syouki_takahashi-midnight-forest-184304.mp3',
    'sounds/rockot-drive-breakbeat-173062.mp3',
    'sounds/mfcc-showreel-music-promo-advertising-opener-vlog-background-intro-theme-261601.mp3',
    'sounds/vasilyatsevich-in-slow-motion-inspiring-ambient-lounge-219592.mp3',
    'sounds/loksii-no-copyright-music-211881.mp3',
    'sounds/pumpupthemind-creative-technology-showreel-241274.mp3',
    'sounds/moodmode-no-copyright-music-201745.mp3',
  ];

  function _startBgm(mode = 'quiz') {
    _stopBgm();
    const list = mode === 'quiz' ? _BGM_QUIZ_LIST : _BGM_AMBIENT_LIST;
    const src  = list[Math.floor(Math.random() * list.length)];
    const audio = new Audio(src);
    audio.loop   = true;
    audio.volume = mode === 'quiz' ? 0.125 : 0.09;
    audio.play().catch(() => {});  // autoplay 정책 무시
    _bgmNodes = [audio];           // _bgmNodes[0]에 Audio 저장
  }

  function _stopBgm() {
    if (_bgmNodes.length) {
      const audio = _bgmNodes[0];
      if (audio instanceof Audio) {
        audio.pause();
        audio.src = '';
      }
      _bgmNodes = [];
    }
    _bgmCtx = null;
  }

  function setQuizPassRate(rate) {
    Store.setSetting('quizPassRate', rate);
    _renderProfile(); // 설정 화면 새로고침
  }

  function _spawnV2Sparks(el) {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ['#10b981','#34d399','#f59e0b','#3b82f6','#a78bfa','#fbbf24','#f97316','#ec4899','#38bdf8','#fb7185'];
    const shapes = ['50%', '3px', '0px', '50% 0 50% 0'];
    const TOTAL  = 36;
    // 1차 폭발 (즉시)
    for (let i = 0; i < TOTAL; i++) {
      const sp    = document.createElement('div');
      const angle = (Math.PI * 2 * i) / TOTAL + (Math.random() - 0.5) * 0.5;
      const dist  = 70 + Math.random() * 130;
      const size  = 7 + Math.random() * 14;
      const dur   = 0.85 + Math.random() * 0.4;
      sp.style.cssText = `
        position:fixed; z-index:9999; pointer-events:none;
        width:${size}px; height:${size * (Math.random() > 0.5 ? 1 : 0.5)}px;
        border-radius:${shapes[Math.floor(Math.random() * shapes.length)]};
        background:${colors[Math.floor(Math.random() * colors.length)]};
        left:${cx}px; top:${cy}px;
        --tx:${Math.cos(angle) * dist}px; --ty:${Math.sin(angle) * dist}px;
        animation: v2SparkFly ${dur}s ease-out forwards;
        animation-delay:${Math.random() * 0.1}s;
      `;
      document.body.appendChild(sp);
      setTimeout(() => sp.remove(), (dur + 0.15) * 1000);
    }
    // 2차 별 모양 폭발 (150ms 후)
    setTimeout(() => {
      for (let i = 0; i < 16; i++) {
        const sp    = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 16 + Math.random() * 0.3;
        const dist  = 50 + Math.random() * 90;
        const size  = 10 + Math.random() * 10;
        sp.style.cssText = `
          position:fixed; z-index:9999; pointer-events:none;
          width:${size}px; height:${size}px;
          border-radius:50%;
          background:radial-gradient(circle, ${colors[Math.floor(Math.random()*colors.length)]} 40%, transparent 70%);
          left:${cx}px; top:${cy}px;
          --tx:${Math.cos(angle) * dist}px; --ty:${Math.sin(angle) * dist}px;
          animation: v2SparkFly 0.7s ease-out forwards;
        `;
        document.body.appendChild(sp);
        setTimeout(() => sp.remove(), 900);
      }
    }, 150);
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
    const todayXP = prog.todayXP || 0;
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

  // ════════════════════════════════════════════════════════
  //  PLACEMENT TEST — 레벨 진단 테스트
  // ════════════════════════════════════════════════════════

  const _PT_SECTIONS = [
    {
      id: 'hiragana', title: '히라가나 읽기', icon: 'あ', color: '#6366f1',
      desc: '아래 글자의 로마자 발음을 고르세요', stage: 1,
      questions: [
        { q: 'あ', correct: 'a',  wrong: ['i',  'ka', 'na']  },
        { q: 'き', correct: 'ki', wrong: ['ka', 'ku', 'ke']  },
        { q: 'さ', correct: 'sa', wrong: ['za', 'su', 'shi'] },
        { q: 'て', correct: 'te', wrong: ['ta', 'to', 'tsu'] },
        { q: 'の', correct: 'no', wrong: ['ne', 'ni', 'nu']  },
        { q: 'ほ', correct: 'ho', wrong: ['hi', 'he', 'ha']  },
        { q: 'む', correct: 'mu', wrong: ['mi', 'mo', 'ma']  },
        { q: 'れ', correct: 're', wrong: ['ra', 'ro', 'ri']  },
        { q: 'を', correct: 'wo', wrong: ['wa', 'wi', 'we']  },
        { q: 'ん', correct: 'n',  wrong: ['nu', 'ne', 'ni']  },
      ]
    },
    {
      id: 'katakana', title: '가타카나 읽기', icon: 'ア', color: '#7c3aed',
      desc: '아래 글자의 로마자 발음을 고르세요', stage: 1,
      questions: [
        { q: 'ア', correct: 'a',  wrong: ['i',  'ka', 'na']  },
        { q: 'コ', correct: 'ko', wrong: ['ka', 'ki', 'ku']  },
        { q: 'ス', correct: 'su', wrong: ['sa', 'si', 'se']  },
        { q: 'テ', correct: 'te', wrong: ['ta', 'to', 'tsu'] },
        { q: 'ン', correct: 'n',  wrong: ['nu', 'ne', 'ni']  },
      ]
    },
    {
      id: 'vocab_n5', title: 'N5 기초 어휘', icon: '📖', color: '#0891b2',
      desc: '단어의 의미로 올바른 것을 고르세요', stage: 2,
      questions: [
        { q: 'ありがとう',   correct: '감사합니다',  wrong: ['죄송합니다', '안녕하세요',   '잘 부탁드립니다'] },
        { q: 'すみません',   correct: '실례합니다',  wrong: ['잘했어요',   '좋아요',       '알겠어요']        },
        { q: 'どこ',         correct: '어디',        wrong: ['언제',       '누구',         '무엇']            },
        { q: 'おいしい',     correct: '맛있다',      wrong: ['크다',       '빠르다',       '예쁘다']          },
        { q: 'でんしゃ',     correct: '전철',        wrong: ['버스',       '택시',         '비행기']          },
      ]
    },
    {
      id: 'expression_n4', title: 'N4 생활 표현', icon: '💬', color: '#059669',
      desc: '표현의 의미로 올바른 것을 고르세요', stage: 3,
      questions: [
        { q: '〜ていただけますか',   correct: '~해 주시겠어요?',  wrong: ['~합시다',       '~했어요',        '~하고 싶어요']  },
        { q: 'よろしければ',         correct: '괜찮으시다면',     wrong: ['왜냐하면',      '그런데',         '하지만']        },
        { q: 'お先に失礼します',     correct: '먼저 실례합니다',  wrong: ['잠깐 기다려요', '천만에요',       '수고하셨어요']  },
        { q: 'いかがですか',         correct: '어떠세요?',        wrong: ['왜 그래요?',    '어디에요?',      '어떻게 해요?']  },
        { q: '〜てもいいですか',     correct: '~해도 될까요?',    wrong: ['~해야 합니까?', '~할 수 없어요',  '~하지 마세요']  },
      ]
    },
    {
      id: 'it_biz', title: 'IT·비즈니스', icon: '💼', color: '#d97706',
      desc: '표현 또는 단어의 의미를 고르세요', stage: 4,
      questions: [
        { q: '報告・連絡・相談',             correct: '보고·연락·상담 (호렌소)',  wrong: ['회의·보고·결정',    '기획·설계·구현',    '요구·분석·테스트'] },
        { q: '仕様(しよう)',                 correct: '스펙·요구사항',            wrong: ['회의록',            '진행 보고',         '버전 관리']        },
        { q: '工数(こうすう)',               correct: '작업 공수',                wrong: ['회의 시간',         '배포 주기',         '코드 리뷰']        },
        { q: 'ご確認よろしくお願いします',   correct: '확인 부탁드립니다',        wrong: ['시작합시다',         '수고하셨습니다',    '잘 부탁드립니다']  },
        { q: '根回し(ねまわし)',             correct: '사전 조율',                wrong: ['야근',              '회식',              '프로젝트 킥오프']  },
      ]
    }
  ];

  const _PT_PASS = 0.6;
  let _pt = null;

  function openPlacementTest() {
    _pt = {
      sectionIdx: 0,
      qIdx: 0,
      answered: false,
      sections: _PT_SECTIONS.map(s => ({
        ...s,
        questions: shuffle([...s.questions]),
        correct: 0,
        done: false
      }))
    };
    _ptCreateOverlay();
    _ptRenderSection();
  }

  function _ptCreateOverlay() {
    let el = document.getElementById('ptOverlay');
    if (el) el.remove();
    el = document.createElement('div');
    el.id = 'ptOverlay';
    el.className = 'pt-overlay';
    el.innerHTML = `
      <div class="pt-header">
        <button class="pt-close-btn" onclick="App._ptClose()">✕</button>
        <div class="pt-header-title">📊 레벨 진단 테스트</div>
        <div class="pt-section-badge" id="ptSectionBadge"></div>
      </div>
      <div class="pt-body" id="ptBody"></div>
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('open'));
  }

  function _ptRenderSection() {
    const sec = _pt.sections[_pt.sectionIdx];
    const qData = sec.questions[_pt.qIdx];
    const badge = document.getElementById('ptSectionBadge');
    const body  = document.getElementById('ptBody');
    if (badge) badge.textContent = `${_pt.sectionIdx + 1} / ${_PT_SECTIONS.length}`;
    const isKanaSection = sec.id === 'hiragana' || sec.id === 'katakana';
    const choices = shuffle([qData.correct, ...qData.wrong]);

    body.innerHTML = `
      <div class="pt-section-header">
        <div class="pt-section-icon" style="background:${sec.color}22;border:2px solid ${sec.color}55">
          <span style="font-size:${isKanaSection ? '26px' : '20px'};font-family:${isKanaSection ? "'Noto Sans JP',serif" : 'inherit'}">${sec.icon}</span>
        </div>
        <div>
          <div class="pt-section-title">${escHtml(sec.title)}</div>
          <div class="pt-section-desc">${escHtml(sec.desc)}</div>
        </div>
      </div>

      <div class="pt-progress-row">
        <span class="pt-q-counter">${_pt.qIdx + 1} / ${sec.questions.length}</span>
        <div class="pt-q-bar-wrap">
          <div class="pt-q-bar" style="width:${(_pt.qIdx / sec.questions.length) * 100}%;background:${sec.color}"></div>
        </div>
        <span class="pt-q-score">${sec.correct}정답</span>
      </div>

      <div class="pt-question-card">
        <div class="pt-question-char"
             style="${isKanaSection ? "font-size:88px;font-family:'Noto Sans JP',serif" : 'font-size:20px;line-height:1.6;word-break:keep-all'}">
          ${escHtml(qData.q)}
        </div>
        ${isKanaSection ? `<button class="pt-speak-btn" onclick="TTS.speak('${qData.q}')">🔊 듣기</button>` : ''}
      </div>

      <div class="pt-choices" id="ptChoices">
        ${choices.map((c, i) => `
          <button class="pt-choice" data-correct="${c === qData.correct}"
                  onclick="App._ptAnswer(this, ${c === qData.correct})">
            <span class="pt-choice-label">${'ABCD'[i]}</span>
            <span class="pt-choice-text">${escHtml(c)}</span>
          </button>
        `).join('')}
      </div>

      <div class="pt-feedback" id="ptFeedback"></div>
      <div class="pt-next-wrap" id="ptNextWrap" style="display:none">
        <button class="btn btn-primary pt-next-btn" onclick="App._ptNext()">다음 →</button>
      </div>
    `;
    _pt.answered = false;
  }

  function _ptAnswer(btn, isCorrect) {
    if (_pt.answered) return;
    _pt.answered = true;
    const sec = _pt.sections[_pt.sectionIdx];
    if (isCorrect) sec.correct++;

    document.querySelectorAll('.pt-choice').forEach(b => {
      b.disabled = true;
      if (b.dataset.correct === 'true') b.classList.add('pt-correct');
    });
    btn.classList.add(isCorrect ? 'pt-correct' : 'pt-wrong');

    const fb = document.getElementById('ptFeedback');
    if (fb) {
      fb.className = `pt-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
      const qData = sec.questions[_pt.qIdx];
      const isKanaSection = sec.id === 'hiragana' || sec.id === 'katakana';
      fb.innerHTML = isCorrect
        ? `✅ 정답!${isKanaSection ? ` <strong>${escHtml(qData.q)}</strong> = ${escHtml(qData.correct)}` : ''}`
        : `❌ 정답: <strong>${escHtml(qData.correct)}</strong>`;
    }

    _playQuizEffect(isCorrect);
    const isKanaSection = sec.id === 'hiragana' || sec.id === 'katakana';
    if (isKanaSection) TTS.speak(sec.questions[_pt.qIdx].q);

    const nw = document.getElementById('ptNextWrap');
    if (nw) nw.style.display = 'block';
  }

  function _ptNext() {
    const sec = _pt.sections[_pt.sectionIdx];
    _pt.qIdx++;

    if (_pt.qIdx >= sec.questions.length) {
      sec.done = true;
      const pct = sec.correct / sec.questions.length;
      if (pct < _PT_PASS) {
        _ptShowResult(); // 이 섹션에서 탈락 → 즉시 결과
      } else {
        _pt.sectionIdx++;
        _pt.qIdx = 0;
        if (_pt.sectionIdx >= _pt.sections.length) {
          _ptShowResult();
        } else {
          _ptRenderSectionIntro();
        }
      }
    } else {
      _ptRenderSection();
    }
  }

  function _ptRenderSectionIntro() {
    const sec     = _pt.sections[_pt.sectionIdx];
    const prevSec = _pt.sections[_pt.sectionIdx - 1];
    const prevPct = Math.round((prevSec.correct / prevSec.questions.length) * 100);
    const emoji   = prevPct >= 80 ? '🎉' : prevPct >= 60 ? '👍' : '😊';

    document.getElementById('ptBody').innerHTML = `
      <div style="text-align:center;padding:36px 0">
        <div style="font-size:52px;margin-bottom:12px">${emoji}</div>
        <div style="font-size:20px;font-weight:800;margin-bottom:6px">${escHtml(prevSec.title)} 완료!</div>
        <div style="font-size:14px;color:var(--text2);margin-bottom:28px">
          ${prevSec.questions.length}문제 중 ${prevSec.correct}개 정답 (${prevPct}%)
        </div>
        <div style="font-size:12px;color:var(--text3);margin-bottom:6px">다음 섹션</div>
        <div style="font-size:17px;font-weight:700;margin-bottom:4px">${escHtml(sec.icon)} ${escHtml(sec.title)}</div>
        <div style="font-size:13px;color:var(--text2);margin-bottom:32px">${escHtml(sec.desc)}</div>
        <button class="btn btn-primary" style="border-radius:20px;padding:14px 40px"
                onclick="App._ptStartSection()">시작 →</button>
      </div>
    `;
  }

  function _ptStartSection() { _ptRenderSection(); }

  function _ptShowResult() {
    const secs    = _pt.sections;
    const hiraOk  = secs[0].done && (secs[0].correct / secs[0].questions.length) >= _PT_PASS;
    const kataOk  = secs[1].done && (secs[1].correct / secs[1].questions.length) >= _PT_PASS;
    const n5Ok    = secs[2].done && (secs[2].correct / secs[2].questions.length) >= _PT_PASS;
    const n4Ok    = secs[3].done && (secs[3].correct / secs[3].questions.length) >= _PT_PASS;
    const bizOk   = secs[4].done && (secs[4].correct / secs[4].questions.length) >= _PT_PASS;

    let icon, title, desc, stageLabel, firstModuleId, xpNeeded;
    if (!hiraOk) {
      icon = '🔤'; title = 'Stage 1 — 문자 마스터';
      desc = '히라가나부터 차근차근 시작해요! 일본어의 기초를 완벽히 다질 수 있습니다.';
      stageLabel = '히라가나부터 시작하기'; firstModuleId = 'kana_hira'; xpNeeded = 0;
    } else if (!kataOk) {
      icon = '🔤'; title = 'Stage 1 — 가타카나부터';
      desc = '히라가나는 이미 잘 아시네요! 가타카나 마스터로 바로 넘어갑시다.';
      stageLabel = '가타카나부터 시작하기'; firstModuleId = 'kana_kata'; xpNeeded = 0;
    } else if (!n5Ok) {
      icon = '🌱'; title = 'Stage 2 — 생존 일본어';
      desc = '가나 문자를 이미 알고 계시네요! 생존 일본어 표현부터 시작해요.';
      stageLabel = 'Stage 2에서 시작하기'; firstModuleId = 'survival_greet'; xpNeeded = 800;
    } else if (!n4Ok) {
      icon = '💬'; title = 'Stage 3 — 일상 대화';
      desc = 'N5 수준의 기초를 갖추셨네요! 일상 대화 단계로 진입하세요.';
      stageLabel = 'Stage 3에서 시작하기'; firstModuleId = 'daily_adjectives'; xpNeeded = 2800;
    } else if (!bizOk) {
      icon = '💼'; title = 'Stage 4 — IT·비즈니스';
      desc = '일상 회화가 탄탄하시네요! IT·비즈니스 일본어에 도전해보세요.';
      stageLabel = 'Stage 4에서 시작하기'; firstModuleId = 'it_tech_vocab'; xpNeeded = 6000;
    } else {
      icon = '🏆'; title = 'Stage 5 — 심화';
      desc = '훌륭합니다! 최고 난이도 심화 과정에 도전할 준비가 되어 있습니다.';
      stageLabel = 'Stage 5에서 시작하기'; firstModuleId = 'adv_keigo'; xpNeeded = 12000;
    }

    const scoreSummary = secs.map(s => {
      if (!s.done) return `
        <div class="pt-score-row skipped">
          <span class="pt-score-icon">${s.icon}</span>
          <span class="pt-score-name">${escHtml(s.title)}</span>
          <span class="pt-score-val">-</span>
        </div>`;
      const pct    = Math.round((s.correct / s.questions.length) * 100);
      const passed = pct >= 60;
      return `
        <div class="pt-score-row ${passed ? 'passed' : 'failed'}">
          <span class="pt-score-icon">${s.icon}</span>
          <span class="pt-score-name">${escHtml(s.title)}</span>
          <span class="pt-score-val">${pct}% ${passed ? '✅' : '❌'}</span>
        </div>`;
    }).join('');

    const badge = document.getElementById('ptSectionBadge');
    if (badge) badge.textContent = '완료 🎯';

    document.getElementById('ptBody').innerHTML = `
      <div style="text-align:center;padding:24px 0 16px">
        <div style="font-size:54px;margin-bottom:12px">${icon}</div>
        <div style="font-size:20px;font-weight:900;margin-bottom:6px">진단 완료!</div>
        <div style="font-size:15px;font-weight:700;color:var(--accent2);margin-bottom:8px">${title}</div>
        <div style="font-size:13px;color:var(--text2);line-height:1.7;padding:0 4px;margin-bottom:20px">${desc}</div>
      </div>

      <div class="pt-score-card">
        <div class="pt-score-card-title">섹션별 결과</div>
        ${scoreSummary}
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;padding-bottom:40px">
        <button class="btn btn-primary" style="border-radius:16px;padding:16px;font-size:15px;font-weight:800"
                onclick="App._ptSkipToStage('${firstModuleId}', ${xpNeeded})">
          ${stageLabel} →
        </button>
        <button class="btn btn-outline" style="border-radius:16px;padding:12px;font-size:13px"
                onclick="App._ptClose()">
          처음(히라가나)부터 시작하기
        </button>
      </div>
    `;
  }

  function _ptSkipToStage(firstModuleId, xpNeeded) {
    const prog = Store.get(); // direct reference to internal _data

    // XP 보장
    if (xpNeeded > prog.xp) prog.xp = xpNeeded;

    // 목표 모듈보다 앞선 모든 모듈 완료 처리
    const targetMod = MODULES.find(m => m.id === firstModuleId);
    if (targetMod) {
      MODULES.forEach(mod => {
        const isSameStageEarlier =
          mod.stageId === targetMod.stageId &&
          MODULES.indexOf(mod) < MODULES.indexOf(targetMod);
        const isEarlierStage = mod.stageId < targetMod.stageId;

        if (isEarlierStage || isSameStageEarlier) {
          if (!prog.modules[mod.id]) {
            prog.modules[mod.id] = { stepsCompleted: 0, stepResults: [], roleplayDone: false };
          }
          const mp = mod.steps.length;
          prog.modules[mod.id].stepsCompleted = mp;
          for (let i = 0; i < mp; i++) {
            if (!prog.modules[mod.id].stepResults[i]) {
              prog.modules[mod.id].stepResults[i] = { score: 100, ts: Date.now() };
            }
          }
        }
      });
    }

    Store.save();
    _ptClose();
    _renderHome();
    _renderLesson();
    setTimeout(() => showToast(`✅ ${title_of(firstModuleId)}에서 시작합니다!`), 400);
  }

  function title_of(moduleId) {
    return MODULES.find(m => m.id === moduleId)?.name ?? moduleId;
  }

  function _ptClose() {
    const el = document.getElementById('ptOverlay');
    if (el) {
      el.classList.remove('open');
      setTimeout(() => el.remove(), 300);
    }
    _pt = null;
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
    _getMod,
    // 진단 테스트
    openPlacementTest,
    _ptAnswer,
    _ptNext,
    _ptStartSection,
    _ptSkipToStage,
    _ptClose,
    // 팝업 획순 (향후 한자용)
    _showStrokePanel,
    _closeStrokePanel,
    _strokeStep,
    _strokePlay,
    // 인라인 획순 (카드 뒷면)
    _replayInlineStroke,
  };
})();

// ── Bootstrap ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => App.init());
