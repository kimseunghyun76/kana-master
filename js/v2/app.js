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

  function _uiIconSvg(name, cls = '') { return UIIcons.svg(name, cls); }
  function _getStageIconKey(stageId) { return UIIcons.stageIconKey(stageId); }
  function _uiIconWrap(name, cls = 'ui-icon') { return UIIcons.wrap(name, cls); }
  function _uiLabeledIcon(name, cls = 'btn-inline-icon') { return UIIcons.labeled(name, cls); }

  function _getModuleCoverAsset(mod) {
    const visual = _getModuleVisual(mod);
    return visual.coverImage || visual.image || '';
  }

  function _getRoleplayCoverAsset(mod) {
    const visual = _getModuleVisual(mod);
    return visual.roleplayImage || visual.coverImage || visual.image || '';
  }

  function _cssUrlValue(src) {
    const value = String(src || '');
    const rooted = /^(?:[a-z]+:|\/)/i.test(value) ? value : `/${value}`;
    return rooted.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  }

  function _jsString(value) {
    return String(value || '')
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\r/g, '\\r')
      .replace(/\n/g, '\\n');
  }

  function _setFlowBodyMode(mode) {
    const body = document.getElementById('flowBody');
    if (!body) return;
    body.classList.remove('quiz-mode', 'speaking-mode');
    if (mode) body.classList.add(mode);
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
    window.addEventListener('entitlements:change', _onEntitlementsChange);
  }

  function _onStoreChange(type) {
    if (type === 'xp' || type === 'module' || type === 'roleplay') {
      _renderHome();
      _renderLesson();
      _renderProfile();
    }
  }

  function _onEntitlementsChange() {
    _renderHome();
    _renderLesson();
    _renderProfile();
  }

  function _getModuleVisual(mod) {
    return ModuleVisuals.get(mod);
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
      const welcomeBg = _cssUrlValue('images/lecture-scenes/slevel1-first-phrases-classroom-greeting.png');
      html += `
        <div class="welcome-card welcome-card-cinematic" style="--welcome-bg:url('${welcomeBg}')">
          <div class="welcome-bg" aria-hidden="true"></div>
          <div class="welcome-content">
          <div class="welcome-title">일본어 마스터에 오신 걸 환영합니다</div>
          <div class="welcome-copy">
            히라가나부터 IT 비즈니스 일본어까지<br>
            단계별로 <b style="color:var(--accent2)">차근차근 쌓아 가는</b> 학습 시스템입니다.<br>
            가장 중요한 첫걸음인 히라가나부터 시작해 볼까요?
          </div>
          <div class="welcome-micro-track">
            <span>문자</span><span>여행</span><span>대화</span><span>업무</span>
          </div>
          <button class="btn btn-primary" onclick="App.openModule('kana_hira')"
                  style="border-radius:20px;padding:14px 32px;font-size:16px">
            히라가나 시작하기
          </button>
          </div>
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
        <div class="continue-banner continue-banner-visual ${visual.tone}"
             style="${visual.image ? `--continue-bg:url('${_cssUrlValue(visual.coverImage || visual.image)}')` : ''}"
             onclick="App.openModule('${next.mod.id}', ${next.roleplay ? 'true' : 'false'})">
          ${visual.image ? '<div class="continue-bg" aria-hidden="true"></div>' : ''}
          <div class="continue-content">
            <div class="continue-label">계속 학습하기</div>
            <div class="continue-module">${escHtml(title)}</div>
            <div class="continue-stage">${escHtml(sub)}</div>
            <div class="continue-focus">${_uiIconSvg(visual.iconKey, 'continue-focus-icon')} ${escHtml(visual.focus)}</div>
            <div class="continue-progress">
              <div class="continue-progress-bar" style="width:${pct}%"></div>
            </div>
          </div>
          <div class="continue-arrow">›</div>
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
      const stageMods = getModulesByStage(stage.id);
      const modCount = stageMods.length;
      const stageVisual = stageMods.map(mod => _getModuleVisual(mod)).find(visual => visual.coverImage || visual.image);
      const stageBg = stageVisual ? (stageVisual.coverImage || stageVisual.image) : '';
      html += `
        <div class="stage-card ${stageBg ? 'has-image' : ''} ${locked ? 'locked' : ''}" data-stage="${stage.id}"
             ${stageBg ? `style="--stage-bg:url('${_cssUrlValue(stageBg)}')"` : ''}
             onclick="${!locked ? `App.switchTab('lesson')` : ''}">
          ${stageBg ? '<div class="stage-card-bg" aria-hidden="true"></div>' : ''}
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
        const requiredTier = Entitlements.requiredTier(mod);
        const accessLocked = !Entitlements.canAccess(mod);
        const modLocked = locked || accessLocked || !isModuleUnlocked(mod.id, prog);
        const mp = prog.modules[mod.id] || {};
        const totalSteps = mod.steps.length;
        const done = mp.stepsCompleted || 0;
        const pct = Math.round((done / totalSteps) * 100);
        const completed = done >= totalSteps;
        const rpUnlocked = isRoleplayUnlocked(mod.id, prog);
        const visual = _getModuleVisual(mod);
        const moduleBg = visual.coverImage || visual.image || '';

        let statusIcon = _uiIconSvg('progress', 'module-status-icon-svg');
        let statusClass = 'play';
        if (modLocked)  { statusIcon = _uiIconSvg('lock', 'module-status-icon-svg'); statusClass = 'lock'; }
        else if (completed) { statusIcon = _uiIconSvg('check', 'module-status-icon-svg'); statusClass = 'done'; }

        html += `
          <div class="module-card ${moduleBg ? 'has-image' : ''} ${modLocked ? 'locked' : ''} ${completed ? 'completed' : ''}"
               data-access-tier="${requiredTier}"
               ${moduleBg ? `style="--module-bg:url('${_cssUrlValue(moduleBg)}')"` : ''}
               onclick="${!modLocked ? `App.openModule('${mod.id}')` : ''}">
            ${moduleBg ? '<div class="module-card-bg" aria-hidden="true"></div>' : ''}
            <div class="module-visual ${visual.tone}">
              <div class="module-visual-main">${_uiIconSvg(visual.iconKey, 'module-visual-main-svg')}</div>
              <div class="visual-badge">${_uiIconSvg(visual.iconKey, 'visual-badge-svg')}</div>
            </div>
            <div class="module-info">
              <div class="module-name-row">
                <div class="module-name">${escHtml(mod.name)}</div>
                <span class="access-tier-badge ${requiredTier}">${requiredTier.toUpperCase()}</span>
              </div>
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
          const roleplayBg = visual.roleplayImage || visual.coverImage || visual.image || '';
          html += `
            <div class="roleplay-card ${roleplayBg ? 'has-image' : ''} ${!rpUnlocked ? 'locked' : ''}"
                 ${roleplayBg ? `style="--roleplay-card-bg:url('${_cssUrlValue(roleplayBg)}')"` : ''}
                 onclick="${rpUnlocked ? `App.openModule('${mod.id}', true)` : ''}">
              ${roleplayBg ? '<div class="roleplay-card-bg" aria-hidden="true"></div>' : ''}
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
    const practiceBg = {
      kana: 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.png',
      vocab: 'images/lecture-scenes/wlevel3-calendar-time-study.png',
      kanaQuiz: 'images/lecture-scenes/wlevel2-elevator-number-culture.png',
      vocabQuiz: 'images/lecture-scenes/slevel3-convenience-store-checkout.png',
      listening: 'images/lecture-scenes/slevel4-train-station-transfer.png',
      speaking: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.png'
    };

    let html = `
      <div class="practice-section-title">빠른 복습</div>
      <div class="practice-grid">
        <div class="practice-item practice-visual-card" style="--practice-bg:url('${_cssUrlValue(practiceBg.kana)}')" onclick="App.startKanaReview()">
          <div class="practice-card-bg" aria-hidden="true"></div>
          <div class="practice-card-content">
            <div class="pi-icon pi-icon-text">あア</div>
            <div class="pi-name">가나 플래시카드</div>
            <div class="pi-stage">${dueKanaCount > 0 ? `오늘 복습 ${dueKanaCount}개` : '히라가나 · 가타가나 전체'}</div>
          </div>
        </div>
        <div class="practice-item practice-visual-card ${!vocabUnlocked ? 'locked' : ''}"
             style="--practice-bg:url('${_cssUrlValue(practiceBg.vocab)}')"
             onclick="${vocabUnlocked ? "App.startVocabReview()" : ''}">
          <div class="practice-card-bg" aria-hidden="true"></div>
          <div class="practice-card-content">
            <div class="pi-icon">${_uiIconSvg('book', 'pi-icon-svg')}</div>
            <div class="pi-name">어휘 복습</div>
            <div class="pi-stage">${dueVocabCount > 0 ? `오늘 복습 ${dueVocabCount}개` : '학습한 단어 전체'}</div>
          </div>
          ${!vocabUnlocked ? `<div class="pi-lock">${_uiIconSvg('lock', 'pi-lock-icon')}</div>` : ''}
        </div>
        <div class="practice-item practice-visual-card ${!quizUnlocked ? 'locked' : ''}"
             style="--practice-bg:url('${_cssUrlValue(practiceBg.kanaQuiz)}')"
             onclick="${quizUnlocked ? "App.startRandomQuiz('kana')" : ''}">
          <div class="practice-card-bg" aria-hidden="true"></div>
          <div class="practice-card-content">
            <div class="pi-icon">${_uiIconSvg('quiz', 'pi-icon-svg')}</div>
            <div class="pi-name">가나 퀴즈</div>
            <div class="pi-stage">랜덤 20문제</div>
          </div>
          ${!quizUnlocked ? `<div class="pi-lock">${_uiIconSvg('lock', 'pi-lock-icon')}</div>` : ''}
        </div>
        <div class="practice-item practice-visual-card ${!quizUnlocked ? 'locked' : ''}"
             style="--practice-bg:url('${_cssUrlValue(practiceBg.vocabQuiz)}')"
             onclick="${quizUnlocked ? "App.startRandomQuiz('vocab')" : ''}">
          <div class="practice-card-bg" aria-hidden="true"></div>
          <div class="practice-card-content">
            <div class="pi-icon">${_uiIconSvg('practice', 'pi-icon-svg')}</div>
            <div class="pi-name">어휘 퀴즈</div>
            <div class="pi-stage">랜덤 20문제</div>
          </div>
          ${!quizUnlocked ? `<div class="pi-lock">${_uiIconSvg('lock', 'pi-lock-icon')}</div>` : ''}
        </div>
      </div>

      <div class="practice-section-title" style="margin-top:8px">청취 연습</div>
      <div class="practice-grid">
        <div class="practice-item practice-visual-card ${!quizUnlocked ? 'locked' : ''}"
             style="--practice-bg:url('${_cssUrlValue(practiceBg.listening)}')"
             onclick="${quizUnlocked ? "App.startListeningQuiz()" : ''}">
          <div class="practice-card-bg" aria-hidden="true"></div>
          <div class="practice-card-content">
            <div class="pi-icon">${_uiIconSvg('headphones', 'pi-icon-svg')}</div>
            <div class="pi-name">듣기 퀴즈</div>
            <div class="pi-stage">음성 → 글자 맞추기</div>
          </div>
          ${!quizUnlocked ? `<div class="pi-lock">${_uiIconSvg('lock', 'pi-lock-icon')}</div>` : ''}
        </div>
        <div class="practice-item practice-visual-card ${!quizUnlocked ? 'locked' : ''}"
             style="--practice-bg:url('${_cssUrlValue(practiceBg.speaking)}')"
             onclick="${quizUnlocked ? "App.startSpeakingPractice()" : ''}">
          <div class="practice-card-bg" aria-hidden="true"></div>
          <div class="practice-card-content">
            <div class="pi-icon">${_uiIconSvg('mic', 'pi-icon-svg')}</div>
            <div class="pi-name">따라 말하기</div>
            <div class="pi-stage">쉐도잉 연습</div>
          </div>
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
          <div class="settings-item" onclick="App.exportProgress()">
            <span class="si-icon">${_uiIconSvg('download', 'settings-row-icon')}</span>
            <span class="si-label">진도 내보내기</span>
            <span class="si-arrow">${_uiIconSvg('progress', 'settings-state-icon')}</span>
          </div>
          <div class="settings-item" onclick="App.importProgress()">
            <span class="si-icon">${_uiIconSvg('upload', 'settings-row-icon')}</span>
            <span class="si-label">진도 가져오기</span>
            <span class="si-arrow">${_uiIconSvg('progress', 'settings-state-icon')}</span>
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
            현재 퀴즈 스킵 (100점)
          </button>
          <button onclick="App.devCompleteCurrentModule()"
            style="flex:1;min-width:120px;padding:10px 8px;background:#1e293b;border:1px dashed var(--success);
                   border-radius:10px;color:var(--success);font-weight:700;font-size:12px;cursor:pointer">
            현재 모듈 완료
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
    if (!Entitlements.canAccess(mod)) {
      showToast(`${Entitlements.requiredTier(mod).toUpperCase()} 콘텐츠입니다`);
      return;
    }
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
    document.getElementById('flowScreen')?.classList.remove('lecture-mode');
    document.getElementById('flowScreen')?.classList.add('module-intro-mode');
    const stage = STAGES.find(s => s.id === mod.stageId);
    const prog = Store.get();
    const stepsDone = prog.modules[mod.id]?.stepsCompleted || 0;
    const startStep = Math.min(stepsDone, mod.steps.length - 1);
    const visual = _getModuleVisual(mod);
    const coverImage = _getModuleCoverAsset(mod);

    const items = [
      ...mod.steps.map(s => `<div class="intro-item"><span class="ii-check">${_uiIconSvg('book', 'ii-icon')}</span> ${escHtml(s.title)}</div>`),
      mod.roleplay ? `<div class="intro-item"><span class="ii-check">${_uiIconSvg('roleplay', 'ii-icon')}</span> 롤플레이: ${escHtml(mod.roleplay.name)}</div>` : ''
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
      const ts = { hook:'target', culture:'grid', story:'book', mnemonic:'sparkle', funfact:'target', practice:'voice', summary:'check' };
      const icon = ts[firstSlide.type] || 'book';
      return `
        <div class="lec-preview-card">
          <div class="lec-preview-badge">${_uiIconSvg(icon, 'lec-preview-icon')} 인앱 강의 포함</div>
          <div class="lec-preview-main">${ruby(firstSlide.main || '')}</div>
          <div class="lec-preview-sub">${escHtml(firstSlide.sub || '')}</div>
          <div class="lec-preview-slides">${slides.length}개 슬라이드 · 학습 시작 시 자동 재생</div>
        </div>
      `;
    })() : '';

    document.getElementById('flowBody').innerHTML = `
      <div class="module-intro ${coverImage ? 'has-bg' : ''}" ${coverImage ? `style="--module-intro-bg:url('${_cssUrlValue(coverImage)}')"` : ''}>
        ${coverImage ? '<div class="module-intro-bg" aria-hidden="true"></div>' : ''}
        <div class="module-intro-content">
          <div class="module-intro-icon">${_uiIconSvg(visual.iconKey, 'module-intro-icon-svg')}</div>
          <div class="module-intro-title">${escHtml(mod.name)}</div>
          <div class="module-intro-sub">${escHtml(mod.desc)}<br>
            <span>
              STAGE ${stage.id}: ${escHtml(stage.name)}
            </span>
          </div>
          <div class="module-intro-items">${items}</div>
          ${lecPreviewHtml}
        </div>
      </div>
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
    _setFlowBodyMode('');
    document.getElementById('flowScreen')?.classList.remove('module-intro-mode');
    document.getElementById('flowScreen')?.classList.toggle('lecture-mode', s.type === 'lecture');
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
        <div class="completion-emoji">${_uiIconSvg('check', 'completion-main-icon')}</div>
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

  function _supportsKanaStrokePreview(kana) {
    const clean = stripFuri(kana || '');
    return Array.from(clean).length === 1;
  }

  function _getKanaPatternExamples(char, allowedChars, existingWords = []) {
    if (!allowedChars?.size) return [];
    const isKatakana = /[ァ-ヺ]/.test(char);
    const vowels = (isKatakana
      ? ['ア', 'イ', 'ウ', 'エ', 'オ']
      : ['あ', 'い', 'う', 'え', 'お']).filter(v => allowedChars.has(v));
    const partners = Array.from(allowedChars).filter(ch => !['ん', 'ン', 'を', 'ヲ'].includes(ch) && ch !== char);
    const candidates = [];

    if (char === 'を' || char === 'ヲ') {
      candidates.push(char);
    } else if (char === 'ん' || char === 'ン') {
      partners.slice(0, 4).forEach(p => candidates.push(`${p}${char}`));
    } else {
      vowels.filter(v => v !== char).forEach(v => {
        candidates.push(`${char}${v}`);
        candidates.push(`${v}${char}`);
      });
      partners.slice(0, 4).forEach(p => {
        candidates.push(`${char}${p}`);
        candidates.push(`${p}${char}`);
      });
    }

    const used = new Set(existingWords.map(word => stripFuri(word)));
    return [...new Set(candidates)]
      .filter(word => word && word.length <= 3 && !used.has(word))
      .slice(0, 3)
      .map(word => ({ word, meaning: '배운 글자 조합' }));
  }

  function _getKanaExamplesForCard(char, level) {
    const info = KANA_MAP[char] || {};
    const allExamples = info.examples || [];
    if (!_isKanaBasicLevel(level?.id)) return allExamples.slice(0, 3);
    const allowedChars = _getKanaAllowedExampleChars(level);
    const filtered = allExamples.filter(ex => _isBeginnerSafeKanaWord(ex.word, allowedChars));
    const generated = _getKanaPatternExamples(char, allowedChars, filtered.map(ex => ex.word));
    const merged = [...filtered, ...generated];
    return (merged.length ? merged : allExamples.slice(0, 2)).slice(0, 3);
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
      const canShowStroke = _supportsKanaStrokePreview(c);
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
                <button class="kana-sound-btn" onclick="event.stopPropagation();TTS.speak('${safeC}')" title="발음 듣기">${_uiIconSvg('audio', 'kana-sound-icon')}</button>
                <div class="kana-type-label">${escHtml(typeLabel)}</div>
                <div class="kana-char ${isSmallKana(c) ? 'is-small' : ''}">${ruby(c)}</div>
                <div class="kana-tap-hint">탭해서 읽는 법 보기 👆</div>
              </div>
              <div class="kana-back">
                <!-- ① 읽기 정보 -->
                <div class="kana-reading-row">
                  <button class="kana-back-sound"
                          onclick="event.stopPropagation();TTS.speak('${safeC}')">${_uiIconSvg('audio', 'kana-back-sound-icon')}</button>
                  <span class="kana-romaji-sm">${escHtml(info.romaji || '')}</span>
                  <span class="kana-reading-dot">·</span>
                  <span class="kana-korean-sm">${escHtml(info.korean || '')}</span>
                </div>
                <!-- ② 기억법 (TIP) -->
                ${info.tip ? `
                <div class="kana-tip-main">
                  <div class="kana-tip-label">${_uiIconSvg('sparkle', 'kana-tip-icon')} 기억법</div>
                  <div class="kana-tip-body">${ruby(info.tip)}</div>
                </div>` : ''}
                <!-- ③ 획순 인라인 (전체 너비, 🔄 우상단 오버레이) -->
                ${canShowStroke ? `
                <div class="kana-stroke-row">
                  <div class="kana-stroke-mini" id="kanaStrokeInline">
                    <div class="kana-stroke-loading">…</div>
                  </div>
                  <button class="kana-stroke-replay-btn"
                          onclick="event.stopPropagation();App._replayInlineStroke()"
                          title="다시 그리기">🔄</button>
                </div>` : ''}
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
        if (_supportsKanaStrokePreview(st.chars[st.cardIdx])) {
          setTimeout(() => _startInlineStroke(st.chars[st.cardIdx]), 520);
        }
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

  const _quizFlow = createQuizFlow({
    getFlow: () => _flow,
    setFlowBodyMode: _setFlowBodyMode,
    advanceStep: _advanceStep,
    isKanaReviewLevel: _isKanaReviewLevel,
    getKanaDistractors: _getKanaDistractors,
    updateFlowProgress: _updateFlowProgress,
    renderQuizHud: QuizEffects.renderHud,
    uiLabeledIcon: _uiLabeledIcon,
    uiIconSvg: _uiIconSvg,
    playQuizEffect: QuizEffects.playAnswer,
    playQuizFanfare: QuizEffects.playFanfare,
    getVocabItems: _getVocabItems,
    getAllVocabItems: _getAllVocabItems,
    runCurrentStep: _runCurrentStep,
    showPracticeComplete: _showPracticeComplete,
  });

  function _renderKanaQuiz(mod, step, stepIndex) {
    return _quizFlow.renderKanaQuiz(mod, step, stepIndex);
  }
  function _kanaQuizAnswer(btn, isCorrect) {
    return _quizFlow.kanaQuizAnswer(btn, isCorrect);
  }
  function _kanaQuizNext() {
    return _quizFlow.kanaQuizNext();
  }
  function _renderKanaListening(mod, step, stepIndex) {
    return _quizFlow.renderKanaListening(mod, step, stepIndex);
  }
  function _listeningQuizAnswer(btn, isCorrect, correctChar) {
    return _quizFlow.listeningQuizAnswer(btn, isCorrect, correctChar);
  }
  function _listeningQuizNext() {
    return _quizFlow.listeningQuizNext();
  }
  function _renderShadowing(mod, step, stepIndex) {
    return _quizFlow.renderShadowing(mod, step, stepIndex);
  }
  function _shadowingNext() {
    return _quizFlow.shadowingNext();
  }
  function _renderVocabLearn(mod, step, stepIndex) {
    return _quizFlow.renderVocabLearn(mod, step, stepIndex);
  }
  function _vocabSpeak() {
    return _quizFlow.vocabSpeak();
  }
  function _vocabFlip() {
    return _quizFlow.vocabFlip();
  }
  function _vocabNext() {
    return _quizFlow.vocabNext();
  }
  function _vocabPrev() {
    return _quizFlow.vocabPrev();
  }
  function _vocabEval(rating) {
    return _quizFlow.vocabEval(rating);
  }
  function _renderVocabQuiz(mod, step, stepIndex) {
    return _quizFlow.renderVocabQuiz(mod, step, stepIndex);
  }
  function _vocabQuizAnswer(btn, isCorrect, jp, ko) {
    return _quizFlow.vocabQuizAnswer(btn, isCorrect, jp, ko);
  }
  function _vocabQuizNext() {
    return _quizFlow.vocabQuizNext();
  }
  function _startRetryPhase() {
    return _quizFlow.startRetryPhase();
  }
  function _afterQuiz(passed) {
    return _quizFlow.afterQuiz(passed);
  }

  const _lectureFlow = createLectureFlow({
    getFlow: () => _flow,
    advanceStep: _advanceStep,
    updateFlowProgress: _updateFlowProgress,
    runCurrentStep: _runCurrentStep,
    uiIconSvg: _uiIconSvg,
    uiLabeledIcon: _uiLabeledIcon,
    getModuleVisual: _getModuleVisual,
  });

  function _renderLecture(mod, step, stepIndex) { return _lectureFlow.renderLecture(mod, step, stepIndex); }
  function _lecNext() { return _lectureFlow.next(); }
  function _lecPrev() { return _lectureFlow.prev(); }
  function _lecRestart() { return _lectureFlow.restart(); }
  function _lecPauseToggle() { return _lectureFlow.pauseToggle(); }
  function _lecToggleCaption(lang) { return _lectureFlow.toggleCaption(lang); }
  function _lecCapTab(lang) { return _lectureFlow.capTab(lang); }

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
            <span class="db-audio" onclick="event.stopPropagation(); TTS.speak('${(line.japanese||'').replace(/'/g,"\\'")}')">${_uiIconSvg('audio', 'audio-inline-icon')}</span>
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('flowBody').innerHTML = `
      <div class="dialogue-scene">
        <div class="scene-title">${_uiIconSvg('book', 'scene-title-icon')} 대화 미리 보기</div>
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
  const _roleplayFlow = createRoleplayFlow({
    getFlow: () => _flow,
    setFlow: (nextFlow) => { _flow = nextFlow; },
    getDialogue: _getDialogue,
    getRoleplayCoverAsset: _getRoleplayCoverAsset,
    uiLabeledIcon: _uiLabeledIcon,
    uiIconSvg: _uiIconSvg,
    jsString: _jsString,
    cssUrlValue: _cssUrlValue,
    getMod: _getMod,
    openFlowScreen: _openFlowScreen,
    showToast,
  });

  function _renderRoleplay(mod) { return _roleplayFlow.renderRoleplay(mod); }
  function _beginRoleplayPractice() { return _roleplayFlow.beginPractice(); }
  function _toggleRoleplayReveal(index) { return _roleplayFlow.toggleReveal(index); }
  function _markRoleplayShadow(index) { return _roleplayFlow.markShadow(index); }
  function _markRoleplayOutput(index) { return _roleplayFlow.markOutput(index); }
  function _speakDialogueLine(lineId) { return _roleplayFlow.speakLine(lineId); }
  function _startRoleplay(mod) { return _roleplayFlow.startRoleplay(mod); }
  function _replayAll(moduleId, startIndex = 0) { return _roleplayFlow.replayAll(moduleId, startIndex); }
  function _stopRoleplay() { return _roleplayFlow.stopRoleplay(); }
  function showDialogueDetail(lineId) { return _roleplayFlow.showDialogueDetail(lineId); }
  function closeDialogueDetail(shouldResume = true) { return _roleplayFlow.closeDialogueDetail(shouldResume); }
  function _completeRoleplay(moduleId) { return _roleplayFlow.completeRoleplay(moduleId); }

  // ── Module Completion ─────────────────────────────────────
  function _showModuleCompletion(mod) {
    const xp = mod.xp || 100;
    Store.addXP(50); // bonus for full completion
    confetti(40);

    const nextItem = _getNextInModule(mod);

    document.getElementById('flowBody').innerHTML = `
      <div class="completion-screen">
        <div class="completion-emoji">${_uiIconSvg('check', 'completion-main-icon')}</div>
        <div class="completion-title">모듈 완료!</div>
        <div class="completion-sub">${escHtml(mod.name)} 모든 학습 단계 완료!<br>
          ${mod.roleplay ? '롤플레이가 해금되었습니다.' : '다음 모듈로 진행하세요!'}
        </div>
        <div class="completion-unlocks">
          <div class="cu-title">획득</div>
          <div class="completion-unlock-item"><span class="cui-icon">${_uiIconSvg('xp', 'completion-inline-icon')}</span> +50 XP 보너스</div>
          ${mod.roleplay ? `<div class="completion-unlock-item"><span class="cui-icon">${_uiIconSvg('roleplay', 'completion-inline-icon')}</span> ${escHtml(mod.roleplay.name)} 해금</div>` : ''}
        </div>
      </div>
    `;

    document.getElementById('flowFooter').innerHTML = `
      <div style="display:flex;gap:10px">
        ${mod.roleplay ? `<button class="btn btn-primary" onclick="App._startRoleplay(App._getMod('${mod.id}'))">이제 롤플레이 시작 →</button>` : ''}
        <button class="btn ${mod.roleplay ? 'btn-outline' : 'btn-primary'}" onclick="App.closeFlow()">
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
    _quizFlow.clearTimers();
    _lectureFlow.stopLecture();
    _roleplayFlow.stopRoleplay();
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
      stageId: 1, name: '어휘 복습', icon: 'review',
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
        stageId: 1, name: '어휘 퀴즈', icon: 'quiz',
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
      stageId: 1, name: '듣기 퀴즈', icon: 'listen',
      steps: [{ type: 'kana_listening', title: `음성 듣고 글자 맞추기 (${chars.length}문제)`, chars }],
      roleplay: null
    });
  }

  function startSpeakingPractice() {
    const items = shuffle(_getAllVocabItems()).slice(0, 15);
    if (!items.length) { showToast('어휘 데이터를 불러올 수 없습니다'); return; }
    _startPracticeFlow({
      id: '_practice_shadowing',
      stageId: 1, name: '따라 말하기', icon: 'speak',
      steps: [{ type: 'shadowing', title: `쉐도잉 연습 (${items.length}개)`, items }],
      roleplay: null
    });
  }

  function setQuizPassRate(rate) {
    Store.setSetting('quizPassRate', rate);
    _renderProfile(); // 설정 화면 새로고침
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
    if (!_supportsKanaStrokePreview(kana)) return;

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
  function _replayInlineStroke() {
    if (!_supportsKanaStrokePreview(_inlineStrokeState?.kana)) return;
    _inlinePlay();
  }

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
            VOICEVOX 화자 (롤플레이 다화자)
          </div>
          <div style="display:grid;gap:8px">
            <div>
              <div style="font-size:11px;color:var(--accent2);margin-bottom:3px">화자 A — 나 (학습자)</div>
              ${makeSelect('vvSpeakerA', 'App.setVoicevoxSpeakerA', curA)}
              <button onclick="TTS.speak('よろしくお願いします', {speakerId:${curA}})"
                style="width:100%;padding:7px;background:var(--bg3);border:1px solid var(--border);
                       border-radius:8px;color:var(--text);font-size:12px;cursor:pointer">테스트 재생</button>
            </div>
            <div>
              <div style="font-size:11px;color:#34d399;margin-bottom:3px">화자 B — 상대방</div>
              ${makeSelect('vvSpeakerB', 'App.setVoicevoxSpeakerB', curB)}
              <button onclick="TTS.speak('いらっしゃいませ。', {speakerId:${curB}})"
                style="width:100%;padding:7px;background:var(--bg3);border:1px solid var(--border);
                       border-radius:8px;color:var(--text);font-size:12px;cursor:pointer">테스트 재생</button>
            </div>
            <div>
              <div style="font-size:11px;color:#fb923c;margin-bottom:3px">화자 C — 제3자/점원</div>
              ${makeSelect('vvSpeakerC', 'App.setVoicevoxSpeakerC', curC)}
              <button onclick="TTS.speak('かしこまりました。', {speakerId:${curC}})"
                style="width:100%;padding:7px;background:var(--bg3);border:1px solid var(--border);
                       border-radius:8px;color:var(--text);font-size:12px;cursor:pointer">테스트 재생</button>
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
            Edge TTS 음성
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
            테스트 재생
          </button>
        </div>
      `;
    } else {
      html += `
        <div style="font-size:13px;color:var(--text3);padding:10px 0">
          브라우저 기본 음성: <strong>${escHtml(TTS.getWebSpeechVoiceName())}</strong><br>
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
    showToast('화자 A 변경됨');
  }
  function setVoicevoxSpeakerA(id) {
    TTS.setVoicevoxSpeaker(id);
    showToast('화자 A 변경됨');
    TTS.speak('よろしくお願いします', { speakerId: parseInt(id) });
  }
  function setVoicevoxSpeakerB(id) {
    TTS.setVoicevoxSpeakerB(id);
    showToast('화자 B 변경됨');
    TTS.speak('いらっしゃいませ。', { speakerId: parseInt(id) });
  }
  function setVoicevoxSpeakerC(id) {
    TTS.setVoicevoxSpeakerC(id);
    showToast('화자 C 변경됨');
    TTS.speak('かしこまりました。', { speakerId: parseInt(id) });
  }

  function setEdgeTTSVoice(v) {
    TTS.setEdgeVoice(v);
    showToast('음성 변경됨');
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
    showToast(`+${amount} XP 추가! 현재: ${Store.get().xp} XP`);
    _renderHome();
    _renderLesson();
    _renderProfile();
  }

  function devSkipCurrentStep() {
    if (!_flow || !_flow.moduleId) {
      showToast('먼저 모듈을 열어주세요 (레슨 탭에서 모듈 선택)');
      return;
    }
    const mod = MODULES.find(m => m.id === _flow.moduleId);
    if (!mod) return;
    const stepIndex = _flow.step;
    if (stepIndex < 0 || stepIndex >= mod.steps.length) {
      showToast('스킵할 단계가 없습니다');
      return;
    }
    const step = mod.steps[stepIndex];
    Store.completeStep(_flow.moduleId, stepIndex, 100);
    Store.addXP(80);
    showToast(`"${step.title}" 완료 처리 (100점)`);
    _flow.step = stepIndex + 1;
    _runCurrentStep();
  }

  function devCompleteCurrentModule() {
    if (!_flow || !_flow.moduleId) {
      showToast('먼저 모듈을 열어주세요');
      return;
    }
    const mod = MODULES.find(m => m.id === _flow.moduleId);
    if (!mod) return;
    // 모든 단계 완료 처리
    mod.steps.forEach((_, i) => Store.completeStep(_flow.moduleId, i, 100));
    Store.addXP(mod.xp || 200);
    showToast(`"${mod.name}" 모든 단계 완료 처리!`);
    _flow.step = mod.steps.length;
    _runCurrentStep();
  }

  // ── Settings ──────────────────────────────────────────────
  function toggleFurigana() {
    const cur = Store.getSetting('furigana');
    Store.setSetting('furigana', !cur);
    showToast((!cur) ? '후리가나 ON' : '후리가나 OFF');
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

  function exportProgress() {
    const payload = Store.exportProgress();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kana-master-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('진도 파일을 내보냈습니다');
  }

  function importProgress() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const payload = JSON.parse(await file.text());
        if (!confirm('현재 진도를 가져온 파일로 바꿀까요?')) return;
        await Store.importProgress(payload);
        showToast('진도를 가져왔습니다');
        _renderHome();
        _renderLesson();
        _renderPractice();
        _renderProfile();
      } catch (err) {
        console.warn('importProgress error:', err);
        showToast('진도 파일을 읽지 못했습니다');
      }
    };
    input.click();
  }

  // ── Data Helpers ──────────────────────────────────────────
  function _getVocabItems(step) {
    return ContentIndex.getVocabItems(step);
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
    return ContentIndex.getAllVocabItems();
  }

  function _getDialogue(key) {
    return ContentIndex.getDialogue(key);
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
    if (xp < 500)   return '일본어 씨앗';
    if (xp < 1500)  return '입문자';
    if (xp < 3000)  return '초보 여행자';
    if (xp < 5000)  return '여행 마스터';
    if (xp < 8000)  return '일상 대화자';
    if (xp < 12000) return '비즈니스 입문';
    if (xp < 18000) return 'IT 커뮤니케이터';
    if (xp < 25000) return '직장인 마스터';
    return '일본어 마스터';
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
    exportProgress,
    importProgress,
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
    _lecToggleCaption,
    _lecCapTab,
    setQuizPassRate,
    _completeRoleplay,
    _beginRoleplayPractice,
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
