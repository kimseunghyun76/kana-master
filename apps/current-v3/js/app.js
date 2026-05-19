/* ============================================================
   일본어 마스터 v3 — Main App
   Beginner-first travel/N5/drama curriculum
   ============================================================ */

'use strict';

// ── App singleton ──────────────────────────────────────────
window.App = (() => {

  // ── State ────────────────────────────────────────────────
  let _flow = null;               // current learning flow
  let _homeView = null;
  let _lessonView = null;
  let _practiceView = null;
  let _groupLearningView = null;
  let _profileView = null;
  const _shell = createAppShell({
    gameUi: true,
    Store,
    capitalize: _capitalize,
    formatNum: _formatNum,
    uiIconSvg: _uiIconSvg,
    uiIconWrap: _uiIconWrap,
  });
  const _moduleIntroView = createModuleIntroView({
    gameUi: true,
    Store,
    isRoleplayUnlocked,
    getModuleVisual: _getModuleVisual,
    getModuleCoverAsset: _getModuleCoverAsset,
    cssUrlValue: _cssUrlValue,
    uiIconSvg: _uiIconSvg,
  });

  const _appSettings = createAppSettings({
    storageKeys: ['jp_master_v3'],
    voiceLangFilter: 'ja',
    refreshHome: () => _renderHome(),
    refreshLesson: () => _renderLesson(),
    refreshPractice: () => _renderPractice(),
    refreshProfile: () => _renderProfile(),
    getFlow: () => _flow,
    setFlowStep: step => { if (_flow) _flow.step = step; },
    runCurrentStep: () => _runCurrentStep(),
  });
  const _kanaLearnFlow = createKanaLearnFlow({
    getFlow: () => _flow,
    setFlowStep: step => { if (_flow) _flow.step = step; },
    runCurrentStep: () => _runCurrentStep(),
    advanceStep: () => _advanceStep(),
    returnToModuleIntro: () => _returnToModuleIntro(),
    uiIconSvg: _uiIconSvg,
    replayInlineStroke: () => _replayInlineStroke(),
    startInlineStroke: kana => _startInlineStroke(kana),
    stopInlineStroke: () => _stopInlineStroke(),
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
    await TTS.init();  // 사전생성 매니페스트 로드
    _ensureJapaneseVoiceDefaults();
    _shell.build();
    _shell.bindNav();
    _renderHome();
    _renderLesson();
    _renderPractice();
    _renderProfile();
    // Subscribe to store changes
    Store.subscribe(_onStoreChange);
    window.addEventListener('entitlements:change', _onEntitlementsChange);
  }

  function _ensureJapaneseVoiceDefaults() {
    const voices = typeof TTS.getAvailableVoices === 'function' ? TTS.getAvailableVoices('ja') : [];
    const keys = new Set(voices.map(v => v.key));
    if (!keys.size) return;
    const firstFemale = voices.find(v => v.gender !== 'M')?.key || voices[0].key;
    const firstMale = voices.find(v => v.gender === 'M')?.key || voices[0].key;
    if (!keys.has(TTS.getDefaultVoice?.())) TTS.setDefaultVoice(firstFemale);
    if (!keys.has(TTS.getRoleVoice?.('A'))) TTS.setRoleVoice('A', firstFemale);
    if (!keys.has(TTS.getRoleVoice?.('B'))) TTS.setRoleVoice('B', firstMale);
    if (!keys.has(TTS.getRoleVoice?.('C'))) TTS.setRoleVoice('C', firstFemale);
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

  function switchTab(tab) {
    _shell.switchTab(tab);
  }

  function _updateHeader() {
    _shell.updateHeader();
  }

  // ════════════════════════════════════════════════════════
  //  HOME VIEW
  // ════════════════════════════════════════════════════════
  function _renderHome() {
    _updateHeader();
    if (!_homeView) {
      _homeView = createHomeView({
        gameUi: true,
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
        gameUi: true,
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
      if (!_groupLearningView) {
        _groupLearningView = createGroupLearningView({
          TTS,
          cssUrlValue: _cssUrlValue,
          jsString: _jsString,
          uiIconSvg: _uiIconSvg,
        });
      }
      _practiceView = createPracticeView({
        gameUi: true,
        Store,
        getAllVocabItems: _getAllVocabItems,
        cssUrlValue: _cssUrlValue,
        uiIconSvg: _uiIconSvg,
        renderGroupLearningSection: () => _groupLearningView.renderSection(),
      });
    }
    _practiceView.render();
  }

  function openGroupLearning(setId) {
    if (!_groupLearningView) _renderPractice();
    _groupLearningView?.open(setId);
  }

  function closeGroupLearning() {
    _groupLearningView?.close();
  }

  function speakGroupItem(setId, index) {
    _groupLearningView?.speakItem(setId, index);
  }

  function playGroupLearning(setId) {
    if (!_groupLearningView) _renderPractice();
    _groupLearningView?.playSet(setId);
  }

  // ════════════════════════════════════════════════════════
  //  PROFILE VIEW
  // ════════════════════════════════════════════════════════
  function _renderProfile() {
    if (!_profileView) {
      _profileView = createProfileView({
        gameUi: true,
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
    _moduleIntroView.render(mod);
    _openFlowScreen();
    _flow = { moduleId: mod.id, step: -1 };
  }

  function _returnToModuleIntro() {
    const mod = MODULES.find(m => m.id === _flow?.moduleId);
    if (!mod || _flow?._virtMod) return;
    TTS.stopQueue();
    _showModuleIntro(mod);
  }

  function _startFlowFromStep(moduleId, stepIndex) {
    _flow = { moduleId, step: stepIndex };
    _runCurrentStep();
  }

  function _openModuleStep(moduleId, stepIndex) {
    const mod = MODULES.find(m => m.id === moduleId);
    if (!mod) return;
    const prog = Store.get();
    if (!isModuleUnlocked(mod, prog)) {
      showToast('🔒 이전 모듈을 먼저 완료하세요!');
      return;
    }
    const safeStep = Math.max(0, Math.min(Number(stepIndex) || 0, mod.steps.length - 1));
    _openFlowScreen();
    _startFlowFromStep(moduleId, safeStep);
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
      case 'kana_chart':      _renderKanaChart(mod, s, step); break;
      case 'kana_learn':      _kanaLearnFlow.renderKanaLearn(mod, s, step); break;
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

  function _renderKanaChart(mod, step, stepIndex) {
    const rows = [
      { key: 'a', label: 'あ행', hira: ['あ','い','う','え','お'], kata: ['ア','イ','ウ','エ','オ'], hint: '입 모양 5개. 모든 행의 기준.' },
      { key: 'ka', label: 'か행', hira: ['か','き','く','け','こ'], kata: ['カ','キ','ク','ケ','コ'], hint: 'k 소리. 카키쿠케코 리듬.' },
      { key: 'sa', label: 'さ행', hira: ['さ','し','す','せ','そ'], kata: ['サ','シ','ス','セ','ソ'], hint: 'し는 si보다 shi에 가까워.' },
      { key: 'ta', label: 'た행', hira: ['た','ち','つ','て','と'], kata: ['タ','チ','ツ','テ','ト'], hint: 'ち=chi, つ=tsu 예외 소리.' },
      { key: 'na', label: 'な행', hira: ['な','に','ぬ','ね','の'], kata: ['ナ','ニ','ヌ','ネ','ノ'], hint: '단어 안에서 자주 보이는 부드러운 n 소리.' },
      { key: 'ha', label: 'は행', hira: ['は','ひ','ふ','へ','ほ'], kata: ['ハ','ヒ','フ','ヘ','ホ'], hint: 'ふ는 fu. は는 조사일 때 wa.' },
      { key: 'ma', label: 'ま행', hira: ['ま','み','む','め','も'], kata: ['マ','ミ','ム','メ','モ'], hint: '입술을 닫았다 여는 m 소리.' },
      { key: 'ya', label: 'や행', hira: ['や','','ゆ','','よ'], kata: ['ヤ','','ユ','','ヨ'], hint: '빈칸도 구조야. ya, yu, yo만 기본.' },
      { key: 'ra', label: 'ら행', hira: ['ら','り','る','れ','ろ'], kata: ['ラ','リ','ル','レ','ロ'], hint: '한국어 ㄹ보다 가볍게 튕기는 소리.' },
      { key: 'wa', label: 'わ행', hira: ['わ','','','','を'], kata: ['ワ','','','','ヲ'], hint: 'を는 보통 조사로 쓰고 o처럼 읽어.' },
      { key: 'n', label: 'ん', hira: ['ん','','','',''], kata: ['ン','','','',''], hint: '마지막 받침 같은 n. 뒤 소리에 따라 느낌이 변해.' },
    ];
    const columns = ['あ段', 'い段', 'う段', 'え段', 'お段'];
    const tableRows = rows.map(row => `
      <div class="v3-kana-row">
        <div class="v3-kana-row-head">
          <strong>${escHtml(row.label)}</strong>
          <span>${escHtml(row.hint)}</span>
        </div>
        ${row.hira.map((hira, idx) => {
          const kata = row.kata[idx] || '';
          const chars = [hira, kata].filter(Boolean);
          if (!chars.length) return `<div class="v3-kana-cell is-empty" aria-label="빈칸"></div>`;
          return `
            <button class="v3-kana-cell" type="button" onclick="App._kanaChartSpeak('${chars[0]}')">
              <span class="v3-kana-hira">${escHtml(hira)}</span>
              <span class="v3-kana-kata">${escHtml(kata)}</span>
            </button>
          `;
        }).join('')}
      </div>
    `).join('');

    document.getElementById('flowBody').innerHTML = `
      <section class="v3-kana-chart">
        <div class="v3-kana-chart-hero">
          <div>
            <div class="v3-kana-kicker">오십음도 한눈에</div>
            <h2>가로는 입 모양, 세로는 소리 가족</h2>
            <p>글자를 하나씩 외우기 전에 표의 위치를 먼저 잡아. 히라가나와 가타가나는 같은 소리를 다른 글자 모양으로 적는다고 보면 된다.</p>
          </div>
          <div class="v3-kana-axis" aria-hidden="true">
            <span>가로: あ·い·う·え·お</span>
            <span>세로: か·さ·た·な...</span>
          </div>
        </div>
        <div class="v3-kana-columns">
          <span>행</span>
          ${columns.map(col => `<span>${escHtml(col)}</span>`).join('')}
        </div>
        <div class="v3-kana-table">${tableRows}</div>
        <div class="v3-kana-memory">
          <div><b>1분 암기법</b><span>あいうえお를 먼저 소리내고, 다음엔 かさたなはまやらわ 순서만 외워.</span></div>
          <div><b>여행 기준</b><span>완벽한 필기보다 메뉴판에서 보고 읽는 속도가 먼저야.</span></div>
          <div><b>헷갈림 처리</b><span>ぬ/め, れ/ね, シ/ツ, ソ/ン은 따로 비교해서 잡으면 된다.</span></div>
        </div>
      </section>
    `;

    const isStandalone = stepIndex < 0;
    document.getElementById('flowFooter').innerHTML = `
      <div class="kana-chart-actions">
        ${isStandalone
          ? `<button class="btn btn-outline" type="button" onclick="App.closeFlow()">← 닫기</button>
             <button class="btn btn-primary" type="button" onclick="App.closeFlow()">확인</button>`
          : `<button class="btn btn-outline" type="button" onclick="App._startFlowFromStep('${mod.id}', ${Math.max(0, stepIndex - 1)})">← 강의</button>
             <button class="btn btn-primary" type="button" onclick="App._completeKanaChart(${stepIndex})">이해했어 →</button>`}
      </div>
    `;
  }

  function _openKanaChartStandalone() {
    // Anywhere-accessible quick reference. Uses a virtual module so the
    // existing flow renderer can host the chart without polluting curriculum.
    const dummy = { id: '_quick_kana_chart', name: '오십음도', steps: [{ type: 'kana_chart', title: '오십음도' }] };
    _flow = { moduleId: dummy.id, step: 0, _virtMod: dummy };
    document.getElementById('flowScreen')?.classList.add('open');
    document.getElementById('flowTitle').textContent = '오십음도';
    _renderKanaChart(dummy, dummy.steps[0], -1);
  }

  function _kanaChartSpeak(char) {
    TTS.speak(char);
  }

  function _completeKanaChart(stepIndex) {
    Store.completeStep(_flow.moduleId, stepIndex);
    Store.addXP(30);
    _flow.step = stepIndex + 1;
    _runCurrentStep();
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

  const _quizFlow = createQuizFlow({
    getFlow: () => _flow,
    setFlowBodyMode: _setFlowBodyMode,
    advanceStep: _advanceStep,
    isKanaReviewLevel: _kanaLearnFlow.isKanaReviewLevel,
    getKanaDistractors: _kanaLearnFlow.getKanaDistractors,
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
    returnToModuleIntro: () => _returnToModuleIntro(),
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
  function _startKanaQuizFromPrimer() {
    return _quizFlow.startKanaQuizFromPrimer();
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
    japaneseOnlyInstructor: true,
    preferModuleVisuals: true,
    getFlow: () => _flow,
    advanceStep: _advanceStep,
    updateFlowProgress: _updateFlowProgress,
    runCurrentStep: _runCurrentStep,
    uiIconSvg: _uiIconSvg,
    uiLabeledIcon: _uiLabeledIcon,
    getModuleVisual: _getModuleVisual,
    returnToModuleIntro: () => _returnToModuleIntro(),
  });

  function _renderLecture(mod, step, stepIndex) { return _lectureFlow.renderLecture(mod, step, stepIndex); }
  function _lecNext() { return _lectureFlow.next(); }
  function _lecPrev() { return _lectureFlow.prev(); }
  function _lecRestart() { return _lectureFlow.restart(); }
  function _lecPauseToggle() { return _lectureFlow.pauseToggle(); }
  function _lecSetInstructor(lang) { return _lectureFlow.setInstructor(lang); }
  function _lecToggleInstructor() { return _lectureFlow.toggleInstructor(); }
  function _lecPickInstructor(lang) { return _lectureFlow.pickInstructor(lang); }
  function _lecPickSet(field, value, langScope, sourceEl) { return _lectureFlow.pickSet(field, value, langScope, sourceEl); }
  function _lecPickStart() { return _lectureFlow.pickStart(); }
  function _lecToggleCaptionShow() { return _lectureFlow.toggleCaptionShow(); }
  function _lecToggleBoardFont() { return _lectureFlow.toggleBoardFont(); }
  function _lecSetVoice(key) { return _lectureFlow.setVoice(key); }
  function _lecCycleVoice() { return _lectureFlow.cycleVoice(); }

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
      const labelMap = { A: 'A', B: 'B', C: 'C' };
      const side  = sideMap[line.speaker] || 'speaker-B';
      const label = labelMap[line.speaker] || line.speaker;
      return `
        <div class="dialogue-line ${side}">
          <div class="dialogue-avatar">${label}</div>
          <div class="dialogue-bubble" style="cursor:pointer" onclick="App.showDialogueDetail('${line.id}')">
            <div class="db-jp">${ruby(line.japanese || '')}</div>
            <div class="db-ko">${escHtml(line.korean || '')}</div>
            ${line.tip ? `<div class="db-tip">${ruby(line.tip)}</div>` : ''}
            <span class="db-audio" onclick="event.stopPropagation(); TTS.speak('${(line.japanese||'').replace(/'/g,"\\'")}', {voice: TTS.getRoleVoice('${line.speaker || 'A'}')})">${_uiIconSvg('audio', 'audio-inline-icon')}</span>
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('flowBody').innerHTML = `
      <div class="dialogue-scene">
        <div class="scene-title">${_uiIconSvg('book', 'scene-title-icon')} SCRIPT PREVIEW</div>
        한국어 자막으로 뜻을 확인하고, 일본어 대사는 그대로 외워봅니다.
      </div>
      <div class="dialogue-list">${html}</div>
    `;

    document.getElementById('flowFooter').innerHTML = `
      <button class="btn btn-primary" onclick="App._dialogueStudyDone(${stepIndex})">
        READY ✓
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
    gameUi: true,
    lockPracticeSpeaker: true,
    lockVoiceSelection: true,
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
  function _startRoleplayComicPlayer() { return _roleplayFlow.startComicPlayer(); }
  function _startRoleplayComicPlayback() { return _roleplayFlow.startComicPlayback(); }
  function _returnRoleplayComicIntro() { return _roleplayFlow.returnComicIntro(); }
  function _roleplayComicPrev() { return _roleplayFlow.comicPrev(); }
  function _roleplayComicNext() { return _roleplayFlow.comicNext(); }
  function _roleplayComicSpeakPanel() { return _roleplayFlow.comicSpeakPanel(); }
  function _roleplayComicPracticeNext() { return _roleplayFlow.comicPracticeNext(); }
  function _roleplayComicPracticePrev() { return _roleplayFlow.comicPracticePrev(); }
  function _toggleRoleplayReveal(index) { return _roleplayFlow.toggleReveal(index); }
  function _setRoleplayPracticeSpeaker(speaker) { return _roleplayFlow.setPracticeSpeaker(speaker); }
  function _setRoleplayVoice(role, key) {
    TTS.setRoleVoice(role, key);
    const flowMod = _flow?.moduleId ? _getMod(_flow.moduleId) : null;
    if (flowMod?.roleplay) _renderRoleplay(flowMod);
  }
  function _markRoleplayShadow(index) { return _roleplayFlow.markShadow(index); }
  function _markRoleplayOutput(index) { return _roleplayFlow.markOutput(index); }
  function _speakDialogueLine(lineId) { return _roleplayFlow.speakLine(lineId); }
  function _speakDialogueLineSlow(lineId) { return _roleplayFlow.speakLineSlow(lineId); }
  function _startRoleplay(mod) { return _roleplayFlow.startRoleplay(mod); }
  function _showRoleplayPreviewModal() { return _roleplayFlow.showPreviewModal(); }
  function _hideRoleplayPreviewModal() { return _roleplayFlow.hidePreviewModal(); }
  function _replayAll(moduleId, startIndex = 0) { return _roleplayFlow.replayAll(moduleId, startIndex); }
  function _replayRoleplayCurrentTurn() { return _roleplayFlow.replayCurrentTurn(); }
  function _stopRoleplay() { return _roleplayFlow.stopRoleplay(); }
  function showDialogueDetail(lineId) { return _roleplayFlow.showDialogueDetail(lineId); }
  function closeDialogueDetail(shouldResume = true) { return _roleplayFlow.closeDialogueDetail(shouldResume); }
  function _completeRoleplay(moduleId) {
    // v3: show a Summary screen first; user confirms → original completion.
    const mod = _getMod(moduleId);
    if (!mod || !mod.roleplay) {
      return _roleplayFlow.completeRoleplay(moduleId);
    }
    _showRoleplaySummary(moduleId);
  }

  function _finalizeRoleplay(moduleId) {
    return _roleplayFlow.completeRoleplay(moduleId);
  }

  function _showRoleplaySummary(moduleId) {
    const mod = _getMod(moduleId);
    if (!mod) return;

    // Pull dialogue lines (key Japanese phrases user just practiced)
    let dialogues = [];
    try {
      const key = mod.roleplay?.dialogueKey;
      dialogues = (key && ContentIndex && ContentIndex.getDialogue)
        ? (ContentIndex.getDialogue(key) || [])
        : [];
    } catch { dialogues = []; }

    const keyLines = dialogues
      .filter(l => l.speaker !== 'N' && l.japanese)
      .slice(0, 6);

    const linesHtml = keyLines.map(line => {
      const jp = (line.japanese || '').replace(/'/g,"\\'");
      return `
        <li class="rp-summary-line">
          <div class="rp-summary-line-text">
            <div class="rp-summary-jp">${ruby(line.japanese || '')}</div>
            <div class="rp-summary-ko">${escHtml(line.korean || '')}</div>
          </div>
          <button class="rp-summary-audio" onclick="TTS.speak('${jp}', {voice: TTS.getRoleVoice('${line.speaker || 'A'}')})" aria-label="발음">
            ${_uiIconSvg('audio', 'rp-summary-audio-icon')}
          </button>
        </li>`;
    }).join('');

    const { total: vocabTotal } = _buildModuleVocab(mod);

    // Pull a tip from the module's lecture or roleplay tip
    let tipLine = '';
    try {
      const lec = (mod.steps || []).find(s => s.type === 'lecture' && /_tip$/.test(s.lectureKey || ''));
      const data = lec && window.LECTURE_DATA?.[lec.lectureKey];
      const slide = Array.isArray(data) ? data[0] : null;
      tipLine = slide?.captionKo || slide?.main || '';
    } catch { tipLine = ''; }
    if (!tipLine) tipLine = '오늘 외운 문장은 다음 장면에서 그대로 다시 쓰입니다. 짧은 표현부터 입에 붙이는 게 가장 빠른 길이에요.';

    document.getElementById('flowBody').innerHTML = `
      <div class="rp-summary-screen">
        <header class="rp-summary-head">
          <div class="rp-summary-eyebrow">${_uiIconSvg('roleplay', 'rp-summary-eyebrow-icon')} ROLEPLAY SUMMARY</div>
          <h2 class="rp-summary-title">${escHtml(mod.roleplay.name || mod.name)} 정리</h2>
          <p class="rp-summary-sub">방금 끝낸 장면에서 꼭 가져갈 핵심만 모았습니다.</p>
        </header>

        ${keyLines.length ? `
        <section class="rp-summary-card">
          <h3 class="rp-summary-card-title">핵심 표현 <span class="rp-summary-count">${keyLines.length}</span></h3>
          <ul class="rp-summary-lines">${linesHtml}</ul>
        </section>` : ''}

        <section class="rp-summary-card rp-summary-stats">
          <h3 class="rp-summary-card-title">학습 결과</h3>
          <div class="rp-summary-stat-grid">
            <div class="rp-summary-stat">
              <div class="rp-summary-stat-num">${vocabTotal}</div>
              <div class="rp-summary-stat-label">익힌 단어</div>
            </div>
            <div class="rp-summary-stat">
              <div class="rp-summary-stat-num">${dialogues.filter(l => l.speaker !== 'N').length}</div>
              <div class="rp-summary-stat-label">대화 라인</div>
            </div>
            <div class="rp-summary-stat">
              <div class="rp-summary-stat-num">+${mod.xp || 200}</div>
              <div class="rp-summary-stat-label">XP 예정</div>
            </div>
          </div>
        </section>

        <section class="rp-summary-card rp-summary-tip">
          <h3 class="rp-summary-card-title">기억할 한 줄</h3>
          <p class="rp-summary-tip-body">${escHtml(tipLine)}</p>
        </section>
      </div>
    `;

    document.getElementById('flowFooter').innerHTML = `
      <div style="display:flex;gap:10px">
        <button class="btn btn-primary" onclick="App._finalizeRoleplay('${mod.id}')">완료하고 보상 받기 →</button>
        <button class="btn btn-outline" onclick="App.closeFlow()">나중에</button>
      </div>
    `;
  }

  // ── Module Completion ─────────────────────────────────────
  function _showModuleCompletion(mod) {
    const xp = mod.xp || 100;
    Store.addXP(50); // bonus for full completion
    confetti(40);

    const nextItem = _getNextInModule(mod);
    // Modules without any vocab_learn step (pure kana modules) skip the
    // "단어 정리" detour — show the roleplay CTA directly.
    const hasVocabToReview = mod.roleplay && _buildModuleVocab(mod).total > 0;

    document.getElementById('flowBody').innerHTML = `
      <div class="completion-screen">
        <div class="completion-emoji">${_uiIconSvg('check', 'completion-main-icon')}</div>
        <div class="completion-title">학습 완료</div>
        <div class="completion-sub">${escHtml(mod.name)}의 핵심 학습을 마쳤습니다.<br>
          ${mod.roleplay ? (hasVocabToReview ? '배운 단어를 한 번 정리하고 롤플레이로 갑니다.' : '이제 배운 흐름으로 롤플레이를 이어갑니다.') : '다음 강좌로 이어서 학습할 수 있습니다.'}
        </div>
        <div class="completion-unlocks">
          <div class="cu-title">이번 복습</div>
          <div class="completion-unlock-item"><span class="cui-icon">${_uiIconSvg('xp', 'completion-inline-icon')}</span> +50 XP 보너스</div>
          ${mod.roleplay ? `<div class="completion-unlock-item"><span class="cui-icon">${_uiIconSvg('roleplay', 'completion-inline-icon')}</span> ${escHtml(mod.roleplay.name)} 열림</div>` : ''}
        </div>
      </div>
    `;

    const primaryBtn = !mod.roleplay
      ? ''
      : hasVocabToReview
        ? `<button class="btn btn-primary" onclick="App._showVocabSummary('${mod.id}')">단어 정리 보기 →</button>`
        : `<button class="btn btn-primary" onclick="App._startRoleplay(App._getMod('${mod.id}'))">롤플레이 시작 →</button>`;

    document.getElementById('flowFooter').innerHTML = `
      <div style="display:flex;gap:10px">
        ${primaryBtn}
        <button class="btn ${mod.roleplay ? 'btn-outline' : 'btn-primary'}" onclick="App.closeFlow()">
          ${mod.roleplay ? '나중에' : '홈으로 →'}
        </button>
      </div>
    `;
  }

  // ── Module Vocab Summary (pre-roleplay) ────────────────────
  function _buildModuleVocab(mod) {
    const seen = new Set();
    const groups = [];
    (mod.steps || []).forEach(step => {
      if (step.type !== 'vocab_learn') return;
      let items = [];
      try { items = _getVocabItems(step) || []; } catch { items = []; }
      const fresh = items.filter(it => it && it.japanese && !seen.has(it.japanese));
      fresh.forEach(it => seen.add(it.japanese));
      if (fresh.length) groups.push({ title: step.title || '단어', items: fresh });
    });
    return { groups, total: seen.size };
  }

  function _showVocabSummary(moduleId) {
    const mod = _getMod(moduleId);
    if (!mod) return;
    const { groups, total } = _buildModuleVocab(mod);

    if (!total) {
      // No vocab to summarize → go straight to roleplay
      if (mod.roleplay) _startRoleplay(mod);
      else _showModuleCompletion(mod);
      return;
    }

    const groupsHtml = groups.map(g => `
      <section class="vocab-summary-group">
        <h3 class="vocab-summary-group-title">${escHtml(g.title)} <span class="vocab-summary-count">${g.items.length}</span></h3>
        <ul class="vocab-summary-list">
          ${g.items.map(it => {
            const jp = (it.japanese || '').replace(/'/g,"\\'");
            return `
              <li class="vocab-summary-row">
                <button class="vocab-summary-audio" onclick="TTS.speak('${jp}')" aria-label="발음">
                  ${_uiIconSvg('audio', 'vocab-summary-audio-icon')}
                </button>
                <div class="vocab-summary-text">
                  <div class="vocab-summary-jp">${ruby(it.japanese || '')}</div>
                  <div class="vocab-summary-ko">${escHtml(it.korean || '')}</div>
                </div>
              </li>`;
          }).join('')}
        </ul>
      </section>
    `).join('');

    document.getElementById('flowBody').innerHTML = `
      <div class="vocab-summary-screen">
        <header class="vocab-summary-head">
          <div class="vocab-summary-eyebrow">${_uiIconSvg('book', 'vocab-summary-eyebrow-icon')} 단어 정리</div>
          <h2 class="vocab-summary-title">롤플레이 전에 한 번 더</h2>
          <p class="vocab-summary-sub">이번 강좌에서 다룬 ${total}개 단어예요. 발음을 듣고, 모르는 것만 한 번 더 본 뒤 롤플레이로 갑시다.</p>
        </header>
        ${groupsHtml}
      </div>
    `;

    document.getElementById('flowFooter').innerHTML = `
      <div style="display:flex;gap:10px">
        ${mod.roleplay ? `<button class="btn btn-primary" onclick="App._startRoleplay(App._getMod('${mod.id}'))">롤플레이 시작 →</button>` : ''}
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
    _shell.openFlowScreen();
  }

  function closeFlow() {
    _quizFlow.clearTimers();
    _lectureFlow.stopLecture();
    _roleplayFlow.stopRoleplay();
    _shell.closeFlowScreen();
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
    _kanaLearnFlow.renderKanaLearn(mod, mod.steps[0], 0);
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
    openModuleStep: _openModuleStep,
    startKanaReview,
    startVocabReview,
    startRandomQuiz,
    startListeningQuiz,
    startSpeakingPractice,
    openGroupLearning,
    closeGroupLearning,
    speakGroupItem,
    playGroupLearning,
    toggleFurigana: _appSettings.toggleFurigana,
    toggleTTS: _appSettings.toggleTTS,
    resetProgress: _appSettings.resetProgress,
    exportProgress: _appSettings.exportProgress,
    importProgress: _appSettings.importProgress,
    // TTS 설정
    setVoiceDefault: _appSettings.setVoiceDefault,
    setVoiceRoleA:   _appSettings.setVoiceRoleA,
    setVoiceRoleB:   _appSettings.setVoiceRoleB,
    setVoiceRoleC:   _appSettings.setVoiceRoleC,
    setVoiceRole:    _appSettings.setVoiceRole,
    // 쉐도잉
    _shadowingNext,
    // 개발자 테스트 도구
    _devMenu: _appSettings.devMenu,
    devAddXP: _appSettings.devAddXP,
    devSkipCurrentStep: _appSettings.devSkipCurrentStep,
    devCompleteCurrentModule: _appSettings.devCompleteCurrentModule,
    // Internal but called from HTML
    _flipKana: _kanaLearnFlow.flipKana,
    _kanaSpeakCurrent: _kanaLearnFlow.kanaSpeakCurrent,
    _kanaLearnNext: _kanaLearnFlow.kanaLearnNext,
    _kanaLearnPrev: _kanaLearnFlow.kanaLearnPrev,
    _kanaSpeak: _kanaLearnFlow.kanaSpeak,
    _kanaChartSpeak,
    _completeKanaChart,
    _kanaQuizAnswer,
    _kanaQuizNext,
    _startKanaQuizFromPrimer,
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
    _lecSetInstructor,
    _lecToggleInstructor,
    _lecPickInstructor,
    _lecPickSet,
    _lecPickStart,
    _lecToggleCaptionShow,
    _lecToggleBoardFont,
    _lecSetVoice,
    _lecCycleVoice,
    setQuizPassRate,
    _completeRoleplay,
    _beginRoleplayPractice,
    _startRoleplayComicPlayer,
    _startRoleplayComicPlayback,
    _returnRoleplayComicIntro,
    _roleplayComicPrev,
    _roleplayComicNext,
    _roleplayComicSpeakPanel,
    _roleplayComicPracticeNext,
    _roleplayComicPracticePrev,
    _replayAll,
    _stopRoleplay,
    _startRoleplay,
    _toggleRoleplayReveal,
    _setRoleplayPracticeSpeaker,
    _setRoleplayVoice,
    _markRoleplayShadow,
    _markRoleplayOutput,
    _speakDialogueLine,
    _speakDialogueLineSlow,
    _replayRoleplayCurrentTurn,
    showDialogueDetail,
    closeDialogueDetail,
    _getMod,
    _showVocabSummary,
    _showRoleplaySummary,
    _showRoleplayPreviewModal,
    _hideRoleplayPreviewModal,
    _openKanaChartStandalone,
    _finalizeRoleplay,
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
