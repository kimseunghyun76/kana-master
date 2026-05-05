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
  let _homeView = null;
  let _lessonView = null;
  let _practiceView = null;
  let _profileView = null;

  const _appSettings = createAppSettings({
    refreshHome: () => _renderHome(),
    refreshLesson: () => _renderLesson(),
    refreshPractice: () => _renderPractice(),
    refreshProfile: () => _renderProfile(),
    getFlow: () => _flow,
    setFlowStep: step => { if (_flow) _flow.step = step; },
    runCurrentStep: () => _runCurrentStep(),
  });

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
    _updateHeader();
    if (!_homeView) {
      _homeView = createHomeView({
        Store,
        escHtml,
        cssUrlValue: _cssUrlValue,
        formatNum: _formatNum,
        hexToRgb: _hexToRgb,
        getModuleVisual: _getModuleVisual,
        getStageIconKey: _getStageIconKey,
        uiIconSvg: _uiIconSvg,
        uiIconWrap: _uiIconWrap,
      });
    }
    _homeView.render();
  }

  // ════════════════════════════════════════════════════════
  //  LESSON VIEW
  // ════════════════════════════════════════════════════════
  function _renderLesson() {
    if (!_lessonView) {
      _lessonView = createLessonView({
        Store,
        Entitlements,
        escHtml,
        cssUrlValue: _cssUrlValue,
        formatNum: _formatNum,
        hexToRgb: _hexToRgb,
        getModuleVisual: _getModuleVisual,
        getStageIconKey: _getStageIconKey,
        uiIconSvg: _uiIconSvg,
        uiIconWrap: _uiIconWrap,
      });
    }
    _lessonView.render();
  }

  function openProgram(programId) {
    if (!_homeView) _renderHome();
    _homeView?.openProgram(programId);
  }

  function closeProgram() {
    _homeView?.closeProgram();
  }

  // ════════════════════════════════════════════════════════
  //  PRACTICE VIEW
  // ════════════════════════════════════════════════════════
  function _renderPractice() {
    if (!_practiceView) {
      _practiceView = createPracticeView({
        Store,
        getAllVocabItems: _getAllVocabItems,
        cssUrlValue: _cssUrlValue,
        uiIconSvg: _uiIconSvg,
      });
    }
    _practiceView.render();
  }

  // ════════════════════════════════════════════════════════
  //  PROFILE VIEW
  // ════════════════════════════════════════════════════════
  function _renderProfile() {
    if (!_profileView) {
      _profileView = createProfileView({
        Store,
        TTS,
        buildTTSSettingsHtml: _appSettings.buildTTSSettingsHtml,
        formatNum: _formatNum,
        uiIconSvg: _uiIconSvg,
        uiIconWrap: _uiIconWrap,
      });
    }
    _profileView.render();
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
    return StrokeRenderer.supports(kana);
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

  function _showStrokePanel(kana) { return StrokeRenderer.showPanel(kana); }
  function _strokePlay() { return StrokeRenderer.play(); }
  function _strokeStep(dir) { return StrokeRenderer.step(dir); }
  function _closeStrokePanel() { return StrokeRenderer.closePanel(); }
  function _startInlineStroke(kana) { return StrokeRenderer.startInline(kana); }
  function _replayInlineStroke() { return StrokeRenderer.replayInline(); }
  function _stopInlineStroke() { return StrokeRenderer.stopInline(); }

  function _getVocabItems(step) {
    return ContentIndex.getVocabItems(step);
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

  // ── Public API ────────────────────────────────────────────
  return {
    init,
    switchTab,
    goBack,
    closeFlow,
    openProgram,
    closeProgram,
    openModule,
    startKanaReview,
    startVocabReview,
    startRandomQuiz,
    startListeningQuiz,
    startSpeakingPractice,
    toggleFurigana: _appSettings.toggleFurigana,
    toggleTTS: _appSettings.toggleTTS,
    resetProgress: _appSettings.resetProgress,
    exportProgress: _appSettings.exportProgress,
    importProgress: _appSettings.importProgress,
    // TTS 설정
    setVoicevoxSpeaker: _appSettings.setVoicevoxSpeaker,
    setVoicevoxSpeakerA: _appSettings.setVoicevoxSpeakerA,
    setVoicevoxSpeakerB: _appSettings.setVoicevoxSpeakerB,
    setVoicevoxSpeakerC: _appSettings.setVoicevoxSpeakerC,
    setEdgeTTSVoice: _appSettings.setEdgeTTSVoice,
    // 쉐도잉
    _shadowingNext,
    // 개발자 테스트 도구
    _devMenu: _appSettings.devMenu,
    devAddXP: _appSettings.devAddXP,
    devSkipCurrentStep: _appSettings.devSkipCurrentStep,
    devCompleteCurrentModule: _appSettings.devCompleteCurrentModule,
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
