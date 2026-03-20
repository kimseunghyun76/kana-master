// ============================================================
//  KANA MASTER - Main App Logic
//  학습 / 퀴즈 / 필기 / 진도 전체 관리
// ============================================================

const App = (() => {
  // ─── 상태 ───
  let state = {
    currentView: 'home',
    currentLevel: 1,
    // 학습
    learnMode: null,
    learnLevelId: 1,
    learnChars: [],
    learnIndex: 0,
    learnFlipped: false,
    learnSpeakerTurn: 1,   // 플래시카드 번갈아 발음 (1 or 2)
    // 퀴즈
    quizLevelId: 1,
    quizType: 'kanaToReading',
    quizLang: 'korean',
    quizCount: 10,
    quizQuestions: [],
    quizCurrentIdx: 0,
    quizCorrect: 0,
    quizWrong: 0,
    quizWrongList: [],
    quizAnswered: false,
    quizCountdownTimer: null,
    // 필기
    writeType: 'hiragana',
    writeChars: [],
    writeIndex: 0,
    overlayOn: false,
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    writeExamMode: false,
    writeExamScore: { ok: 0, fail: 0 },
    // 설정
    prefs: {
      lang: 'korean', autoplay: true, autonext: true,
      voiceFemale: 'none', voiceMale: 'none',
      femaleName: '주영', maleName: '승현',
      showWordEx: true, showSentEx: true, showReading: true,
      quizCountdown: 5,
      useVoicevox: false, voicevoxSpeaker1: 1, voicevoxSpeaker2: 'none'
    },
    // 음성 교대 카운터
    voiceCallCount: 0,
    // 오디오 재생 상태
    isReadingAll: false,
    audioStopped: false,   // 사용자가 명시적으로 중지 요청했는지
    currentVvAudio: null,
    // 플래시카드 예시 자동 읽기
    fcExReadQueue: [],
    fcExReadTimer: null,
    fcReadSession: 0,
    vocabReadSession: 0,
    // vocab 네비 패널 페이지 상태
    vocabNavPage: 0,
    vocabNavMeta: null,  // { chars, clickCb, perPage, isSentence }
    // 필기 시험 타이머
    writeExamTimerInterval: null,
    // 진도
    progress: {},
    totalXP: 0,
    streak: 0,
    lastStudied: null,
    unlockedLevels: [1],
    // 단어 학습
    vocabCurrentCategoryId: null,
    vocabItems: [],
    vocabIndex: 0,
    vocabFlipped: false,
    vocabMode: null,
    vocabQuizQuestions: [],
    vocabQuizCurrentIdx: 0,
    vocabQuizCorrect: 0,
    vocabQuizAnswered: false,
    vocabProgress: {},
    // 북마크
    bookmarks: [],
    // 최근 활동 (홈 "이어서 학습하기")
    recentActivity: []  // [{ type: 'kana'|'vocab', id, ts }]
  };

  // ─── 초기화 ───
  function init() {
    loadAmbientTracks();   // sounds/index.json 비동기 로드 (앱 시작 시 1회)
    syncSidebarVisibility(); // 초기 로드 시 하단 바 숨김 (TTS·배경음 모두 꺼진 상태)
    loadFromStorage(() => {
      applyVisibilityPrefs();   // ← 저장된 표시 설정 즉시 적용
      updateHeader();
      renderLevels();
      setupNavigation();
      setupSettings();
      setupHqButtons();
      checkContinue();
      handleURLParam();
      setupKeyboardNav();
      renderBookmarkSection();
      setupBookmarkButtons();
      // VOICEVOX가 켜진 채 저장된 경우 앱 시작 시 자동 연결 + 화자 복원
      if (state.prefs.useVoicevox) {
        checkVoicevox().then(ok => {
          if (ok) {
            populateVoicevoxSelects();
            updateActiveSpeakerBadge();
          } else {
            // 연결 실패 시 설정만 유지 (UI에서 재연결 가능)
            state.prefs.useVoicevox = false;
            saveToStorage();
          }
        });
      }
    });
  }

  function handleURLParam() {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    const sub  = params.get('sub');
    if (!view) return;
    // kana 뷰에서 sub(flash/browse) 처리
    if (view === 'kana' && sub) {
      showView('kana');
      setTimeout(() => startLearn(state.currentLevel, sub), 200);
    } else {
      showView(view);
    }
  }

  // ─── 스토리지 ───
  function loadFromStorage(cb) {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['kanaProgress'], (result) => {
        if (result.kanaProgress) applyStoredData(result.kanaProgress);
        cb && cb();
      });
    } else {
      const raw = localStorage.getItem('kanaProgress');
      if (raw) applyStoredData(JSON.parse(raw));
      cb && cb();
    }
  }

  function applyStoredData(data) {
    state.progress = data.progress || {};
    state.totalXP = data.totalXP || 0;
    state.streak = data.streak || 0;
    state.lastStudied = data.lastStudied || null;
    state.unlockedLevels = data.unlockedLevels || [1];
    state.currentLevel = data.currentLevel || 1;
    const savedPrefs = data.prefs || {};
    state.prefs = {
      autoplay:         savedPrefs.autoplay    !== undefined ? savedPrefs.autoplay    : true,
      autonext:         savedPrefs.autonext    !== undefined ? savedPrefs.autonext    : true,
      voiceFemale:      savedPrefs.voiceFemale !== undefined ? savedPrefs.voiceFemale : 'none',
      voiceMale:        savedPrefs.voiceMale   !== undefined ? savedPrefs.voiceMale   : 'none',
      femaleName:       savedPrefs.femaleName  || '주영',
      maleName:         savedPrefs.maleName    || '승현',
      showWordEx:       savedPrefs.showWordEx  !== undefined ? savedPrefs.showWordEx  : true,
      showSentEx:       savedPrefs.showSentEx  !== undefined ? savedPrefs.showSentEx  : true,
      showReading:      savedPrefs.showReading !== undefined ? savedPrefs.showReading : true,
      quizCountdown:    savedPrefs.quizCountdown !== undefined ? parseInt(savedPrefs.quizCountdown) : 5,
      useVoicevox:      savedPrefs.useVoicevox  || false,
      voicevoxSpeaker1: savedPrefs.voicevoxSpeaker1 !== undefined ? savedPrefs.voicevoxSpeaker1 : 1,
      voicevoxSpeaker2: savedPrefs.voicevoxSpeaker2 !== undefined ? savedPrefs.voicevoxSpeaker2 : 'none',
      ambientDialogue:  savedPrefs.ambientDialogue || 'none',
      ambientQuiz:      savedPrefs.ambientQuiz     || 'none',
      ambientVolume:    savedPrefs.ambientVolume   !== undefined ? savedPrefs.ambientVolume : 0.18,
    };
    state.vocabProgress = data.vocabProgress || {};
    state.recentActivity = data.recentActivity || [];
    // 구버전 북마크 마이그레이션 (type 필드 없는 경우 자동 보정)
    state.bookmarks = (data.bookmarks || []).map(b => {
      if (!b.type) {
        if (b.kana) return { ...b, type: 'kana' };
        if (b.vocabId || b.japanese) return { ...b, type: 'vocab' };
      }
      return b;
    });

    // 연속 학습 체크
    const today = new Date().toDateString();
    if (state.lastStudied) {
      const last = new Date(state.lastStudied).toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (last !== today && last !== yesterday) state.streak = 0;
    }
  }

  function saveToStorage() {
    const data = {
      progress: state.progress,
      totalXP: state.totalXP,
      streak: state.streak,
      lastStudied: state.lastStudied,
      unlockedLevels: state.unlockedLevels,
      currentLevel: state.currentLevel,
      prefs: state.prefs,
      vocabProgress: state.vocabProgress,
      bookmarks: state.bookmarks,
      recentActivity: state.recentActivity
    };
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ kanaProgress: data });
    } else {
      localStorage.setItem('kanaProgress', JSON.stringify(data));
    }
  }

  // ─── 헤더 ───
  function updateHeader() {
    // settings 모달 스탯 업데이트
    const sl = document.getElementById('settings-level');
    const sx = document.getElementById('settings-xp');
    const ss = document.getElementById('settings-streak');
    if (sl) sl.textContent = 'Lv.' + state.currentLevel;
    if (sx) sx.textContent = state.totalXP + ' XP';
    if (ss) ss.textContent = state.streak + '🔥';
  }

  function updateHqSpeakerLabel() {
    const lbl = document.getElementById('hq-speaker-label');
    if (!lbl) return;
    const prefs = state.prefs;
    let name = '없음';
    if (prefs.useVoicevox && prefs.voicevoxSpeaker1 !== undefined) {
      const sel = document.getElementById('pref-voicevox-speaker1');
      if (sel && sel.selectedOptions[0]) {
        const t = sel.selectedOptions[0].text;
        name = t.length > 7 ? t.slice(0, 7) + '…' : t;
      } else { name = 'VV'; }
    } else if (prefs.voiceFemale && prefs.voiceFemale !== 'none') {
      const sel = document.getElementById('pref-voice-female');
      if (sel && sel.selectedOptions[0]) {
        const t = sel.selectedOptions[0].text;
        name = t.length > 7 ? t.slice(0, 7) + '…' : t;
      } else { name = '설정됨'; }
    }
    lbl.textContent = name;
  }

  function updateHqAmbientLabel() {
    const btn = document.getElementById('hq-ambient-btn');
    const lbl = document.getElementById('hq-ambient-label');
    if (!lbl || !btn) return;
    const ambBadge = document.getElementById('ambient-music-badge');
    const isPlaying = ambBadge && ambBadge.style.display !== 'none' && !ambBadge.classList.contains('stopping');
    lbl.textContent = isPlaying ? 'ON' : 'OFF';
    btn.classList.toggle('hq-on', isPlaying);
  }

  function setupHqButtons() {
    // 헤더 화자 버튼: 설정 모달 → 음성 섹션
    const speakerBtn = document.getElementById('hdr-speaker-btn');
    if (speakerBtn) {
      speakerBtn.addEventListener('click', () => {
        document.getElementById('settings-modal').style.display = 'flex';
        setTimeout(() => {
          const voiceSection = document.getElementById('webtts-settings') || document.getElementById('voicevox-speaker-rows');
          if (voiceSection) voiceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      });
    }
    // 헤더 배경음 버튼: 재생 중이면 정지, 아니면 시작 or 설정
    const ambientBtn = document.getElementById('hdr-ambient-btn');
    if (ambientBtn) {
      ambientBtn.addEventListener('click', () => {
        const ambBadge = document.getElementById('ambient-music-badge');
        const isPlaying = ambBadge && ambBadge.style.display !== 'none' && !ambBadge.classList.contains('stopping');
        if (isPlaying) {
          stopAmbient(0.8);
        } else if (state.prefs.ambientDialogue) {
          startAmbient('dialogue');
        } else {
          document.getElementById('settings-modal').style.display = 'flex';
          setTimeout(() => {
            const sec = document.querySelector('[data-section="ambient"]') ||
                        document.querySelector('.setting-section-title:last-of-type');
            if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      });
    }
  }

  // 배지 표시 상태에 따라 헤더 아이콘 버튼 토글
  function syncHdrIconButtons() {
    const vvBadge  = document.getElementById('vv-active-badge');
    const ambBadge = document.getElementById('ambient-music-badge');
    const speakerBtn = document.getElementById('hdr-speaker-btn');
    const ambientBtn = document.getElementById('hdr-ambient-btn');
    if (speakerBtn && vvBadge) {
      speakerBtn.style.display = vvBadge.style.display !== 'none' ? 'none' : '';
    }
    if (ambientBtn && ambBadge) {
      const ambVisible = ambBadge.style.display !== 'none' && !ambBadge.classList.contains('stopping');
      ambientBtn.style.display = ambVisible ? 'none' : '';
    }
  }

  // ─── 네비게이션 ───
  function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        showView(view);
      });
    });
  }

  function showView(viewName) {
    // 뷰 전환 시 배경음 항상 정지
    stopAmbient(1.2);

    // vocab/convo/roleplay 는 모두 view-vocab 을 공유하되 섹션만 다름
    const vocabSectionMap = { vocab: 'word', convo: 'sentence', roleplay: 'sim' };
    const isVocabSection = viewName in vocabSectionMap;
    const actualViewName = isVocabSection ? 'vocab' : viewName;   // DOM view id
    const navViewName    = viewName;                               // nav 하이라이트용

    state.currentView = navViewName;

    // nav 활성화 (vocab·convo·roleplay 는 각자 하이라이트)
    document.querySelectorAll('.nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.view === navViewName);
    });

    // view 전환
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById('view-' + actualViewName);
    if (target) target.classList.add('active');

    // 뷰별 초기화
    if (actualViewName === 'home')     renderLevels();
    if (actualViewName === 'kana')     { setupKanaSelectView(); }
    if (actualViewName === 'write')    setupWriteView();
    if (actualViewName === 'progress') renderProgress();
    if (isVocabSection) {
      state.vocabSection = vocabSectionMap[viewName];
      setupVocabView();
    }
  }

  // ─── 홈 ───
  function renderLevels() {
    renderDailySentence();
    renderHomeHeroButtons();
    renderRecentSection();
    renderHomeSections();
    renderBookmarkSection();
  }

  // ─── 히어로 버튼 바인딩 ───
  function renderHomeHeroButtons() {
    const audioBtn = document.getElementById('hero-audio-btn');
    if (audioBtn && !audioBtn._bound) {
      audioBtn._bound = true;
      audioBtn.onclick = () => {
        const s = document.getElementById('hero-sentence');
        if (s) playAudio(s.textContent);
      };
    }
  }

  // ─── 전체 가나 레벨 그리드 렌더 (かな뷰 선택 패널용) ───
  function buildLevelCard(level) {
    const isUnlocked = state.unlockedLevels.includes(level.id);
    const isCurrent  = level.id === state.currentLevel;
    const prog       = getLevelProgress(level);
    const isCompleted = prog >= 100;
    const isSpecial  = level.id === 12;

    const card = document.createElement('div');
    card.className = 'level-card' +
      (isCompleted ? ' completed' : '') +
      (isCurrent && !isCompleted ? ' active-level' : '') +
      (!isUnlocked ? ' locked' : '') +
      (isSpecial ? ' level-special' : '');

    let badgeClass = 'locked-badge', badgeText = '🔒 잠김';
    if (isUnlocked) {
      if (isSpecial)    { badgeClass = 'special-badge'; badgeText = '⭐ 최종 복습'; }
      else if (isCompleted) { badgeClass = 'done';    badgeText = '✓ 완료'; }
      else if (isCurrent)   { badgeClass = 'current'; badgeText = '▶ 진행 중'; }
      else { badgeClass = ''; badgeText = ''; }
    }
    const xpNeeded = isUnlocked ? '' : `<div style="font-size:11px;color:#718096;margin-top:4px">🔓 ${level.unlockXP} XP 필요</div>`;

    card.innerHTML = `
      ${badgeText ? `<div class="lc-badge ${badgeClass}">${badgeText}</div>` : ''}
      <div class="lc-name">${level.name}</div>
      <div class="lc-title">${level.title}</div>
      <div class="lc-sub">${level.subtitle}</div>
      ${xpNeeded}
      <div class="lc-prog-bar"><div class="lc-prog-fill" style="width:${prog}%"></div></div>
      <div class="lc-prog-text">${isSpecial ? '전체 가나 랜덤 복습' : `${prog}% 완료 · ${level.chars.length}자`}</div>
      ${isUnlocked ? `
        <div class="lc-actions">
          <button class="lc-btn lc-btn-learn">📚 학습</button>
          <button class="lc-btn lc-btn-browse">📖 일람</button>
          <button class="lc-btn lc-btn-quiz">✏️ 퀴즈</button>
        </div>` : ''}
    `;
    if (isUnlocked) {
      card.querySelector('.lc-btn-learn').addEventListener('click', (e) => { e.stopPropagation(); startLearn(level.id, 'flash'); });
      card.querySelector('.lc-btn-browse').addEventListener('click', (e) => { e.stopPropagation(); startLearn(level.id, 'browse'); });
      card.querySelector('.lc-btn-quiz').addEventListener('click', (e) => { e.stopPropagation(); startQuizForLevel(level.id); });
    } else {
      card.addEventListener('click', () => showToast(`${level.unlockXP} XP가 필요합니다! 현재 ${state.totalXP} XP`));
    }
    return card;
  }

  function renderFullLevelGrid(gridEl) {
    if (!gridEl || gridEl.children.length > 0) return;
    const groupLabels = {
      1: { icon: 'ひ', label: 'ひらがな', sub: '히라가나' },
      4: { icon: 'カ', label: 'カタカナ',  sub: '가타카나' },
      7: { icon: '📚', label: '종합 · 특수', sub: '통합 복습 & 심화' },
    };
    LEVELS.forEach(level => {
      if (groupLabels[level.id]) {
        const g = groupLabels[level.id];
        const sep = document.createElement('div');
        sep.className = 'levels-group-sep';
        sep.innerHTML = `<span class="lgs-icon">${g.icon}</span><span class="lgs-label">${g.label}</span><span class="lgs-sub">${g.sub}</span>`;
        gridEl.appendChild(sep);
      }
      gridEl.appendChild(buildLevelCard(level));
    });
  }

  // ─── 홈 최근 활동 섹션 ───
  function renderRecentSection() {
    const section = document.getElementById('home-recent');
    const list    = document.getElementById('home-recent-list');
    if (!section || !list) return;
    const recent = state.recentActivity.slice(0, 4);
    if (recent.length === 0) { section.style.display = 'none'; return; }
    section.style.display = 'block';
    list.innerHTML = '';

    recent.forEach(act => {
      if (act.type === 'kana') {
        const level = LEVELS.find(l => l.id === act.id);
        if (!level) return;
        list.appendChild(buildHomeCard({
          badge: '✍️ 가나', badgeType: 'kana',
          name: level.name, sub: level.title,
          prog: getLevelProgress(level), progText: `${level.chars.length}자`,
          btns: [
            { label: '▶ 학습', fn: () => startLearn(level.id, 'flash') },
            { label: '✏️ 퀴즈', fn: () => startQuizForLevel(level.id) },
          ]
        }));
      } else {
        const cat = typeof VOCAB_CATEGORIES !== 'undefined' && VOCAB_CATEGORIES.find(c => c.id === act.id);
        if (!cat) return;
        const viewName = cat.type === 'sim' ? 'roleplay' : cat.type === 'sentence' ? 'convo' : 'vocab';
        const trackLabel = cat.type === 'sim' ? '🎯 롤플레이' : cat.type === 'sentence' ? '💬 회화' : '📝 어휘';
        list.appendChild(buildHomeCard({
          badge: trackLabel, badgeType: cat.type,
          name: `${cat.icon || ''} ${cat.name}`, sub: cat.subtitle || '',
          prog: getVocabCategoryProgress(cat.id), progText: `${cat.items.length}개`,
          btns: cat.dialogue
            ? [{ label: '🎭 대화', fn: () => { showView(viewName); setTimeout(() => startVocabCategory(cat.id, 'dialogue'), 100); } }]
            : [
                { label: '▶ 학습', fn: () => { showView(viewName); setTimeout(() => startVocabCategory(cat.id, 'flash'), 100); } },
                { label: '✏️ 퀴즈', fn: () => { showView(viewName); setTimeout(() => startVocabCategory(cat.id, 'quiz'), 100); } },
              ]
        }));
      }
    });
  }

  // ─── 홈 섹션별 가로스크롤 카드 (그룹 카드 방식) ───
  function renderHomeSections() {
    // "전체보기" 버튼 → 해당 뷰로 이동
    document.querySelectorAll('.home-section-more[data-view]').forEach(btn => {
      if (!btn._bound) {
        btn._bound = true;
        btn.addEventListener('click', () => showView(btn.dataset.view));
      }
    });
    _renderKanaHomeSection();
    _renderVocabHomeSection('home-vocab-cards', 'word', 'vocab', 'wlevel', 'W', null);
    _renderVocabHomeSection('home-convo-cards', 'sentence', 'convo', 'slevel', 'S', null);
    _renderVocabHomeSection('home-sim-cards', 'sim', 'roleplay', 'simlevel', null, {
      1:'교통편', 2:'식사편', 3:'숙박편', 4:'쇼핑편', 5:'관광·문화', 6:'부부 여행편'
    });
  }

  function _renderKanaHomeSection() {
    const kanaEl = document.getElementById('home-kana-cards');
    if (!kanaEl || kanaEl.children.length > 0 || typeof LEVELS === 'undefined') return;
    const kanaGroups = [
      { icon: 'あ', name: 'ひらがな', ids: [1, 2, 3] },
      { icon: 'ア', name: 'カタカナ', ids: [4, 5, 6] },
      { icon: '🔄', name: '종합 복습', ids: [7, 8] },
      { icon: '✨', name: '특수·확장', ids: [9, 10, 11] },
    ];
    const recGroupIdx = Math.floor(Math.random() * kanaGroups.length);
    kanaGroups.forEach((group, gIdx) => {
      const levels = group.ids.map(id => LEVELS.find(l => l.id === id)).filter(Boolean);
      const firstUnlocked = levels.find(l => state.unlockedLevels.includes(l.id)) || levels[0];
      const isAnyUnlocked = levels.some(l => state.unlockedLevels.includes(l.id));
      const allChars = levels.flatMap(l => (l.chars || []).filter(c => !c.includes('_')));
      const totalChars = allChars.length;
      const masteredChars = allChars.filter(c => isCharMastered(c)).length;
      const totalProg = totalChars > 0 ? Math.round((masteredChars / totalChars) * 100) : 0;
      kanaEl.appendChild(buildGroupCard({
        icon: group.icon,
        name: group.name,
        items: levels.map(l => l.title),
        totalProg,
        totalItems: `${totalChars}자`,
        badgeType: 'kana',
        recommend: gIdx === recGroupIdx,
        startFn: () => startLearn(firstUnlocked.id, 'flash'),
        viewFn: () => showView('kana'),
        locked: !isAnyUnlocked,
        lockedMsg: `🔒 ${levels[0].unlockXP} XP 필요`,
      }));
    });
  }

  function _renderVocabHomeSection(elId, type, viewName, levelKey, levelPrefix, groupLabels) {
    const el = document.getElementById(elId);
    if (!el || el.children.length > 0) return;
    if (typeof VOCAB_CATEGORIES === 'undefined') return;
    const cats = VOCAB_CATEGORIES.filter(c => c.type === type);
    const levels = [...new Set(cats.map(c => c[levelKey]))].sort((a, b) => a - b);
    const recLvIdx = Math.floor(Math.random() * levels.length);
    levels.forEach((lv, lvIdx) => {
      const lvCats = cats.filter(c => c[levelKey] === lv);
      const groupName = groupLabels ? (groupLabels[lv] || `Sim ${lv}`) : `${levelPrefix}${lv}`;
      const totalItems = lvCats.reduce((sum, c) => sum + c.items.length, 0);
      const progSum = lvCats.reduce((sum, c) => sum + getVocabCategoryProgress(c.id), 0);
      const totalProg = Math.round(progSum / lvCats.length);
      const firstCat = lvCats[0];
      const isDialogue = firstCat && firstCat.dialogue;
      const startFn = isDialogue
        ? () => { showView(viewName); setTimeout(() => startVocabCategory(firstCat.id, 'dialogue'), 100); }
        : () => { showView(viewName); setTimeout(() => startVocabCategory(firstCat.id, 'flash'), 100); };
      el.appendChild(buildGroupCard({
        icon: lvCats[0].icon || (type === 'sim' ? '🎭' : type === 'sentence' ? '💬' : '📝'),
        name: groupName,
        items: lvCats.map(c => c.name),
        totalProg,
        totalItems: `${totalItems}개`,
        badgeType: type,
        recommend: lvIdx === recLvIdx,
        startFn,
        viewFn: () => showView(viewName),
      }));
    });
  }

  // ─── 홈 그룹 카드 빌더 ───
  function buildGroupCard({ icon, name, items, totalProg, totalItems, badgeType, recommend, startFn, viewFn, locked, lockedMsg }) {
    const card = document.createElement('div');
    card.className = 'hc hc-group' + (recommend ? ' hc-recommend' : '') + (locked ? ' hc-locked' : '');
    card.innerHTML = `
      ${recommend ? '<div class="hc-rec-badge">✨ 오늘의 추천</div>' : ''}
      <div class="hc-badge hc-${badgeType}">${icon}</div>
      <div class="hc-name">${name}</div>
      <div class="hc-group-items">${items.map(i => `<span class="hc-tag">${i}</span>`).join('')}</div>
      <div class="hc-prog-wrap">
        <div class="hc-prog-bar"><div class="hc-prog-fill" style="width:${totalProg}%"></div></div>
        <span class="hc-prog-text">${totalProg}% · ${totalItems}</span>
      </div>
      ${locked ? `<div class="hc-locked-msg">${lockedMsg}</div>` : `
      <div class="hc-actions">
        <button class="hc-btn hc-btn-0">▶ 시작</button>
        <button class="hc-btn hc-btn-1">🗂 모두보기</button>
      </div>`}
    `;
    if (!locked) {
      card.querySelector('.hc-btn-0').addEventListener('click', (e) => { e.stopPropagation(); startFn(); });
      card.querySelector('.hc-btn-1').addEventListener('click', (e) => { e.stopPropagation(); viewFn(); });
    } else {
      card.addEventListener('click', () => showToast(lockedMsg));
    }
    return card;
  }

  // ─── 홈 공통 카드 빌더 ───
  function buildHomeCard({ badge, badgeType, name, sub, prog, progText, btns = [], locked, lockedMsg }) {
    const card = document.createElement('div');
    card.className = 'hc' + (locked ? ' hc-locked' : '');
    card.innerHTML = `
      <div class="hc-badge hc-${badgeType}">${badge}</div>
      <div class="hc-name">${name}</div>
      <div class="hc-sub">${sub}</div>
      <div class="hc-prog-wrap">
        <div class="hc-prog-bar"><div class="hc-prog-fill" style="width:${prog}%"></div></div>
        <span class="hc-prog-text">${prog}% · ${progText}</span>
      </div>
      ${locked ? `<div class="hc-locked-msg">${lockedMsg}</div>` : `
      <div class="hc-actions">${btns.map((b, i) => `<button class="hc-btn hc-btn-${i}">${b.label}</button>`).join('')}</div>`}
    `;
    if (!locked) {
      btns.forEach((b, i) => {
        card.querySelector(`.hc-btn-${i}`).addEventListener('click', (e) => { e.stopPropagation(); b.fn(); });
      });
    } else {
      card.addEventListener('click', () => showToast(lockedMsg));
    }
    return card;
  }

  function getLevelProgress(level) {
    if (!level.chars || !level.chars.length) return 0;
    const mastered = level.chars.filter(k => isCharMastered(k)).length;
    return Math.round((mastered / level.chars.length) * 100);
  }

  function isCharMastered(kana) {
    // 플래시카드 뒷면을 한 번이라도 본 글자 = 마스터 (퀴즈 무관)
    const p = state.progress[kana];
    return !!(p && p.flipped >= 1);
  }

  function checkContinue() { /* 홈 리뉴얼로 renderRecentSection이 대체 */ }

  function startReview() {
    // 약점 글자만 퀴즈
    const weak = Object.entries(state.progress)
      .filter(([k, v]) => v && v.incorrect > v.correct)
      .map(([k]) => k);
    if (weak.length === 0) {
      showToast('복습할 틀린 문제가 없어요! 퀴즈를 먼저 풀어보세요.');
      return;
    }
    // 약점 퀴즈 시작
    showView('quiz');
    setTimeout(() => {
      state.quizType = 'kanaToReading';
      state.quizLang = state.prefs.lang || 'korean';
      startQuizWithChars(weak, 'kanaToReading', state.prefs.lang || 'korean');
    }, 100);
  }

  // ─── 최근 활동 추적 ───
  function trackActivity(type, id) {
    state.recentActivity = state.recentActivity.filter(a => !(a.type === type && a.id === id));
    state.recentActivity.unshift({ type, id, ts: Date.now() });
    if (state.recentActivity.length > 6) state.recentActivity.length = 6;
    saveToStorage();
  }

  // ─── 학습 모드 ───
  function startLearn(levelId, mode) {
    trackActivity('kana', levelId);
    state.learnLevelId = levelId;
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return;

    // Level 12: 전체 복습 — 모든 가나 랜덤 순서
    if (levelId === 12) {
      state.learnChars = Object.keys(KANA_MAP)
        .map(k => ({ kana: k, ...KANA_MAP[k] }))
        .sort(() => Math.random() - 0.5);
    } else {
      state.learnChars = getLevelChars(levelId);
    }
    state.learnIndex = 0;

    // view-kana 로 이동하면서 레벨 선택 패널 숨기고 플래시카드 활성화
    document.getElementById('kana-select-panel') && (document.getElementById('kana-select-panel').style.display = 'none');
    showView('kana');
    document.getElementById('learn-level-name').textContent = level.name;
    document.getElementById('learn-level-title').textContent = level.title;

    // 모드에 따라 직접 이동 (mode-selector 제거)
    document.getElementById('flashcard-area').style.display = 'none';
    document.getElementById('browse-area').style.display = 'none';

    const targetMode = mode || 'flash';
    if (targetMode === 'browse') {
      state.learnMode = 'browse';
      document.getElementById('browse-area').style.display = 'block';
      renderBrowse();
    } else {
      state.learnMode = 'flash';
      state.learnFlipped = false;
      document.getElementById('flashcard-area').style.display = 'block';
      renderNavStrip('fc-nav-strip', state.learnChars, state.learnIndex, (idx) => {
        state.learnIndex = idx;
        showFlashcard();
      });
      showFlashcard();
      setupFlashcardControls();
      // 모바일: 플래시카드 영역으로 스크롤
      setTimeout(() => {
        const fa = document.getElementById('flashcard-area');
        if (fa) fa.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }

  function showFlashcard() {
    const chars = state.learnChars;
    if (!chars.length) return;
    const idx = state.learnIndex;
    const total = chars.length;
    const char = chars[idx];

    document.getElementById('learn-card-num').textContent = `${idx + 1} / ${total}`;
    document.getElementById('fc-progress-fill').style.width = `${(idx / total) * 100}%`;

    document.getElementById('fc-kana').textContent = char.kana;
    document.getElementById('fc-kana-back').textContent = char.kana;
    document.getElementById('fc-korean').textContent = char.korean;
    document.getElementById('fc-english').textContent = char.english;

    // 예시 단어 — 셔플 후 전부 표시 (한 줄 가로 나열)
    const exDiv = document.getElementById('fc-examples');
    exDiv.innerHTML = '';
    const exReadQueue = []; // 자동 읽기 큐
    if (char.examples && char.examples.length) {
      const shuffledEx = [...char.examples].sort(() => Math.random() - 0.5);
      shuffledEx.forEach(ex => {
        const el = document.createElement('div');
        el.className = 'fc-ex-item';
        el.innerHTML = `<span class="fc-ex-word">${ex.word}</span><span class="fc-ex-meaning">${ex.meaning}</span>`;
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          // 순차 읽기 중단 후 이 단어만 재생
          state.fcReadSession = (state.fcReadSession || 0) + 1;
          stopFcExRead();
          playAudio(ex.word);
        });
        exDiv.appendChild(el);
        exReadQueue.push({ el, text: ex.word });
      });
    }

    // 문장 예시 — EXAMPLES_DB에서 랜덤 2개
    const sentDiv = document.getElementById('fc-sentences');
    sentDiv.innerHTML = '';
    const exDB = (typeof EXAMPLES_DB !== 'undefined') ? EXAMPLES_DB : {};
    const sentData = exDB[char.kana];
    if (sentData && sentData.sentences && sentData.sentences.length) {
      const shuffledSents = [...sentData.sentences].sort(() => Math.random() - 0.5);
      shuffledSents.slice(0, 2).forEach(s => {
        const el = document.createElement('div');
        el.className = 'fc-sent-item';
        el.innerHTML = `<span class="fc-sent-jp">${s.japanese}</span><span class="fc-sent-dot">·</span><span class="fc-sent-ko">${s.meaning}</span>`;
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          state.fcReadSession = (state.fcReadSession || 0) + 1;
          stopFcExRead();
          playAudio(s.japanese);
        });
        sentDiv.appendChild(el);
        exReadQueue.push({ el, text: s.japanese });
      });
    }
    // 자동 읽기 큐 저장 (카드 뒤집을 때 사용)
    state.fcExReadQueue = exReadQueue;

    // nav strip 북마크 상태 업데이트
    const isBookmarked = state.bookmarks.some(b => b.type === 'kana' && b.kana === char.kana);
    const nsBtn = document.querySelector(`#fc-nav-strip .fc-ns-btn[data-kana="${char.kana}"]`);
    if (nsBtn) nsBtn.classList.toggle('ns-bookmarked', isBookmarked);

    // 카드 뒤집기 리셋 + 이전 읽기 세션 무효화
    state.learnFlipped = false;
    state.fcReadSession = (state.fcReadSession || 0) + 1;
    stopFcExRead();
    const inner = document.getElementById('fc-inner');
    inner.classList.remove('flipped');

    // 앞장 로드 시 발음 — 화자 2 설정 시 번갈아 재생
    if (hasSpeakerConfigured(2)) {
      const slot = state.learnSpeakerTurn || 1;
      state.learnSpeakerTurn = slot === 1 ? 2 : 1;  // 다음 카드용 토글
      setTimeout(() => playAudioSlot(char.kana, slot), 350);
    } else {
      setTimeout(() => playAudio(char.kana), 350);
    }

    // 네비 스트립 활성 업데이트
    updateNavStripActive('fc-nav-strip', idx);


    // 진도 기록
    markCharSeen(char.kana);
  }

  function flipCard() {
    state.learnFlipped = !state.learnFlipped;
    document.getElementById('fc-inner').classList.toggle('flipped', state.learnFlipped);

    if (state.learnFlipped) {
      // 뒤집기: 뒷면을 봤으므로 "마스터" 기록 + 네비 스트립 즉시 갱신
      const char = state.learnChars[state.learnIndex];
      markCharFlipped(char.kana);
      updateNavStripActive('fc-nav-strip', state.learnIndex);

      // 순차 읽기 세션 번호 증가 (이전 세션 무효화)
      state.fcReadSession = (state.fcReadSession || 0) + 1;
      const session = state.fcReadSession;

      // 가나 발음 완전히 끝난 후 → 예시 순차 읽기 (또는 자동 넘김)
      (async () => {
        await playAudio(char.kana);
        if (session !== state.fcReadSession) return;
        if (state.prefs.showWordEx || state.prefs.showSentEx) {
          await new Promise(r => setTimeout(r, 400));
          if (session === state.fcReadSession) startFcExRead(session);
        } else if (state.prefs.autoAdvance) {
          // 예시 없어도 자동 넘김
          startFcAutoAdvance(session);
        }
      })();
    } else {
      // 앞면 복귀: 읽기 세션 무효화 + 하이라이트 제거
      state.fcReadSession = (state.fcReadSession || 0) + 1;
      stopFcExRead();
    }
  }

  // 플래시카드 예시 순차 읽기 (session 번호로 중복 방지)
  async function startFcExRead(session) {
    stopFcExRead();
    const queue = (state.fcExReadQueue || []).filter(item => {
      const isInEx  = item.el.closest('#fc-examples');
      const isInSnt = item.el.closest('#fc-sentences');
      if (isInEx  && !state.prefs.showWordEx) return false;
      if (isInSnt && !state.prefs.showSentEx) return false;
      return true;
    });
    if (!queue.length) return;

    for (let i = 0; i < queue.length; i++) {
      // 세션이 바뀌었으면 (카드 넘김/뒤집힘) 중단
      if (session !== state.fcReadSession) return;

      // 이전 하이라이트 제거 후 현재 항목 강조
      queue.forEach(q => q.el.classList.remove('fc-reading'));
      const item = queue[i];
      item.el.classList.add('fc-reading');
      item.el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // 발음 완전히 끝날 때까지 대기
      await playAudio(item.text);

      if (session !== state.fcReadSession) return;

      // 항목 간 짧은 간격
      await new Promise(r => setTimeout(r, 400));
    }
    // 읽기 완료 → 하이라이트 제거
    queue.forEach(q => q.el.classList.remove('fc-reading'));

    // 자동 넘기기 설정 시 카운트다운 후 다음 카드
    if (state.prefs.autoAdvance && session === state.fcReadSession) {
      startFcAutoAdvance(session);
    }
  }

  let _fcAutoTimer = null;
  let _fcAutoCountTimer = null;

  function startFcAutoAdvance(session) {
    clearFcAutoAdvance();
    const delay = (parseInt(state.prefs.autoAdvanceDelay) || 3);
    const bar = document.getElementById('fc-auto-bar');
    const countEl = document.getElementById('fc-auto-countdown');
    if (bar) bar.style.display = 'flex';
    let remaining = delay;
    if (countEl) countEl.textContent = remaining + 's';
    _fcAutoCountTimer = setInterval(() => {
      if (session !== state.fcReadSession) { clearFcAutoAdvance(); return; }
      remaining--;
      if (countEl) countEl.textContent = remaining + 's';
    }, 1000);
    _fcAutoTimer = setTimeout(() => {
      clearFcAutoAdvance();
      if (session !== state.fcReadSession) return;
      // 다음 카드로 이동
      const chars = state.learnChars;
      if (state.learnIndex < chars.length - 1) {
        state.learnIndex++;
        showFlashcard();
        // 자동 뒤집기 (약간 딜레이 후)
        setTimeout(() => {
          if (state.prefs.autoAdvance) flipCard();
        }, 600);
      }
    }, delay * 1000);
  }

  function clearFcAutoAdvance() {
    clearTimeout(_fcAutoTimer);
    clearInterval(_fcAutoCountTimer);
    _fcAutoTimer = null; _fcAutoCountTimer = null;
    const bar = document.getElementById('fc-auto-bar');
    if (bar) bar.style.display = 'none';
  }

  function stopFcExRead() {
    document.querySelectorAll('.fc-reading').forEach(el => el.classList.remove('fc-reading'));
    clearFcAutoAdvance();
  }

  // ─── 드래그/스와이프 공통 핸들러 ───
  function attachSwipe(el, onPrev, onNext, onTap) {
    let startX = 0, startY = 0, moved = false, dragging = false;
    let lastTouchTime = 0;
    const THRESHOLD = 50;

    const getX = e => e.touches ? e.touches[0].clientX : e.clientX;
    const getY = e => e.touches ? e.touches[0].clientY : e.clientY;

    const onStart = (e) => {
      // 터치 직후 브라우저가 생성하는 합성 마우스 이벤트 무시 (모바일 이중 실행 방지)
      if (e.type === 'touchstart') { lastTouchTime = Date.now(); }
      else if (Date.now() - lastTouchTime < 600) return;
      startX = getX(e); startY = getY(e);
      moved = false; dragging = true;
      el.style.transition = 'none';
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = getX(e) - startX;
      const dy = getY(e) - startY;
      // 수평 드래그가 수직보다 크면 스크롤 막기
      if (Math.abs(dx) > Math.abs(dy)) {
        if (e.cancelable) e.preventDefault();
        el.style.transform = `translateX(${dx * 0.4}px) rotate(${dx * 0.02}deg)`;
        moved = true;
      }
    };
    const onEnd = (e) => {
      if (!dragging) return;
      dragging = false;
      const dx = (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - startX;
      el.style.transition = 'transform 0.25s cubic-bezier(.4,0,.2,1)';
      if (!moved || Math.abs(dx) < THRESHOLD) {
        // 탭 or 드래그 너무 짧음 → 원위치 + 탭이면 뒤집기
        el.style.transform = '';
        if (!moved) onTap && onTap();
      } else if (dx < 0) {
        // 왼쪽 → 다음
        el.style.transform = 'translateX(-120%) rotate(-8deg)';
        setTimeout(() => { el.style.transition = 'none'; el.style.transform = ''; onNext(); }, 220);
      } else {
        // 오른쪽 → 이전
        el.style.transform = 'translateX(120%) rotate(8deg)';
        setTimeout(() => { el.style.transition = 'none'; el.style.transform = ''; onPrev(); }, 220);
      }
    };

    el.addEventListener('mousedown',  onStart);
    el.addEventListener('mousemove',  onMove);
    el.addEventListener('mouseup',    onEnd);
    el.addEventListener('mouseleave', (e) => { if (dragging) onEnd(e); });
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove',  onMove,  { passive: false });
    el.addEventListener('touchend',   onEnd);
  }

  function setupFlashcardControls() {
    const card = document.getElementById('flashcard');
    attachSwipe(
      card,
      () => { clearFcAutoAdvance(); if (state.learnIndex > 0) { state.learnIndex--; showFlashcard(); } },
      () => {
        clearFcAutoAdvance();
        const char = state.learnChars[state.learnIndex];
        recordResult(char.kana, true);
        if (state.learnIndex < state.learnChars.length - 1) {
          state.learnIndex++; showFlashcard();
        } else {
          showLearnCompletePrompt(state.learnLevelId);
        }
      },
      () => { clearFcAutoAdvance(); flipCard(); }
    );
    const cancelBtn = document.getElementById('fc-auto-cancel');
    if (cancelBtn) cancelBtn.addEventListener('click', () => {
      clearFcAutoAdvance();
      state.fcReadSession = (state.fcReadSession || 0) + 1;
    });
  }

  // ─── 네비게이션 스트립 / vocab 페이지형 패널 ───
  function renderNavStrip(stripId, chars, activeIdx, clickCb) {
    const strip = document.getElementById(stripId);
    if (!strip) return;
    strip.innerHTML = '';

    // vocab 여부: kana 없이 id/japanese 만 있는 경우
    const isVocab = chars.length > 0 && !chars[0].kana && chars[0].japanese;

    if (isVocab) {
      // 문장형 여부: 평균 일본어 텍스트 길이 > 8 이면 문장
      const avgLen = chars.reduce((s, c) => s + (c.japanese || '').length, 0) / (chars.length || 1);
      const isSentence = avgLen > 8 || isCurrentVocabSentenceType();
      const perPage = isSentence ? 4 : 6;
      // 상태 저장
      state.vocabNavMeta = { chars, clickCb, perPage, isSentence };
      // 활성 아이템이 속한 페이지로 이동
      state.vocabNavPage = Math.floor(activeIdx / perPage);
      _renderVocabNavPanel(strip, activeIdx);
      return;
    }

    // ── 가나용 가로 스트립 ──
    chars.forEach((char, i) => {
      const btn = document.createElement('button');
      const displayText = char.kana || '?';
      btn.className = 'fc-ns-btn';
      btn.dataset.kana = char.kana || '';   // 나중에 마스터 갱신용
      btn.textContent = displayText.length > 4 ? displayText.slice(0, 4) + '…' : displayText;
      btn.title = `${displayText} — ${char.korean || ''}`;
      if (i === activeIdx) btn.classList.add('ns-active');
      if (isCharMastered(char.kana)) btn.classList.add('ns-mastered');
      if (state.bookmarks.some(b => b.type === 'kana' && b.kana === char.kana)) btn.classList.add('ns-bookmarked');
      btn.addEventListener('click', () => clickCb(i));
      btn.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const char = chars[i];
        const isBookmarked = state.bookmarks.some(b => b.type === 'kana' && b.kana === char.kana);
        if (isBookmarked) {
          removeBookmark('kana', char.kana);
          btn.classList.remove('ns-bookmarked');
          showToast('📌 나중에 목록에서 제거했습니다.');
        } else {
          addKanaBookmark(char);
          btn.classList.add('ns-bookmarked');
        }
      });
      strip.appendChild(btn);
    });
    const activeBtn = strip.querySelector('.ns-active');
    if (activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  // vocab 전용 페이지형 네비 패널 렌더링
  function _renderVocabNavPanel(strip, activeIdx) {
    const meta = state.vocabNavMeta;
    if (!meta) return;
    const { chars, clickCb, perPage, isSentence } = meta;
    const page = state.vocabNavPage || 0;
    const totalPages = Math.ceil(chars.length / perPage);
    const start = page * perPage;
    const pageItems = chars.slice(start, start + perPage);

    strip.className = 'fc-nav-strip vocab-nav-panel' + (isSentence ? ' vnp-sentence' : '');

    // 헤더 (화살표 + 페이지 정보)
    const header = document.createElement('div');
    header.className = 'vnp-header';
    const prevBtn = document.createElement('button');
    prevBtn.className = 'vnp-arrow';
    prevBtn.textContent = '◀ 이전';
    prevBtn.disabled = (page === 0);
    const nextBtn = document.createElement('button');
    nextBtn.className = 'vnp-arrow';
    nextBtn.textContent = '다음 ▶';
    nextBtn.disabled = (page >= totalPages - 1);
    const pageInfo = document.createElement('span');
    pageInfo.className = 'vnp-page-info';
    pageInfo.textContent = `${start + 1}–${Math.min(start + perPage, chars.length)} / 전체 ${chars.length}개`;
    header.appendChild(prevBtn);
    header.appendChild(pageInfo);
    header.appendChild(nextBtn);

    // 타일 그리드
    const grid = document.createElement('div');
    grid.className = 'vnp-grid';
    pageItems.forEach((item, i) => {
      const globalIdx = start + i;
      const isActive = globalIdx === activeIdx;
      const isBookmarked = state.bookmarks.some(b =>
        (b.type === 'vocab' && b.vocabId === item.id) ||
        (b.type === 'kana' && b.kana === item.kana)
      );
      const jp = item.japanese || item.kana || '?';
      const kr = item.korean || '';

      const tile = document.createElement('div');
      tile.className = 'vnp-tile' +
        (isActive ? ' vnp-active' : '') +
        (isBookmarked ? ' vnp-bookmarked' : '');

      tile.innerHTML =
        `<span class="vnp-num">${globalIdx + 1}</span>` +
        `<span class="vnp-jp">${item.kanji ? formatWithFurigana(item.kanji, jp) : jp}</span>` +
        `<span class="vnp-kr">${kr}</span>`;

      tile.addEventListener('click', (e) => { e.stopPropagation(); clickCb(globalIdx); });
      tile.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const isBookmarked = state.bookmarks.some(b => b.type === 'vocab' && b.vocabId === item.id);
        if (isBookmarked) {
          removeBookmark('vocab', item.id);
          tile.classList.remove('vnp-bookmarked');
          showToast('📌 나중에 목록에서 제거했습니다.');
        } else {
          addVocabBookmark(item);
          tile.classList.add('vnp-bookmarked');
        }
      });
      grid.appendChild(tile);
    });

    strip.innerHTML = '';
    strip.appendChild(header);
    strip.appendChild(grid);

    // 이벤트: 페이지 전환
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.vocabNavPage > 0) {
        state.vocabNavPage--;
        _renderVocabNavPanel(strip, activeIdx);
      }
    });
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.vocabNavPage < totalPages - 1) {
        state.vocabNavPage++;
        _renderVocabNavPanel(strip, activeIdx);
      }
    });
  }

  function updateNavStripActive(stripId, activeIdx) {
    // vocab 패널이면 페이지 포함 전체 재렌더링
    if (state.vocabNavMeta && stripId === 'vfc-nav-strip') {
      const strip = document.getElementById(stripId);
      if (!strip) return;
      const perPage = state.vocabNavMeta.perPage || 6;
      // 활성 아이템이 다른 페이지면 해당 페이지로 이동
      const targetPage = Math.floor(activeIdx / perPage);
      if (targetPage !== state.vocabNavPage) state.vocabNavPage = targetPage;
      _renderVocabNavPanel(strip, activeIdx);
      return;
    }
    // 가나 스트립
    const strip = document.getElementById(stripId);
    if (!strip) return;
    const btns = strip.querySelectorAll('.fc-ns-btn');
    btns.forEach((btn, i) => {
      btn.classList.toggle('ns-active', i === activeIdx);
      // 마스터 상태도 즉시 반영 (뒤집기 직후 녹색 전환)
      if (btn.dataset.kana) {
        btn.classList.toggle('ns-mastered', isCharMastered(btn.dataset.kana));
      }
    });
    const activeBtn = strip.querySelector('.ns-active');
    if (activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  // ─── 키보드 네비게이션 ───
  function setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // 입력 필드에서는 무시
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      // 가나 플래시카드
      if (state.currentView === 'learn' && state.learnMode === 'flash') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (state.learnIndex > 0) { state.learnIndex--; showFlashcard(); }
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          const _c = state.learnChars[state.learnIndex];
          recordResult(_c.kana, true);
          if (state.learnIndex < state.learnChars.length - 1) { state.learnIndex++; showFlashcard(); }
          else { showLearnCompletePrompt(state.learnLevelId); }
        } else if (e.key === ' ') {
          e.preventDefault();
          flipCard();
        }
        return;
      }

      // 단어 플래시카드
      if (state.currentView === 'vocab' && state.vocabMode === 'flash') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (state.vocabIndex > 0) { state.vocabIndex--; showVocabFlashcard(); }
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          const _vi = state.vocabItems[state.vocabIndex];
          recordVocabResult(_vi.id, true);
          if (state.vocabIndex < state.vocabItems.length - 1) { state.vocabIndex++; showVocabFlashcard(); }
          else { showToast('완료! 🎉'); setTimeout(() => { state.vocabMode = 'quiz'; document.getElementById('vocab-flashcard-area').style.display = 'none'; document.getElementById('vocab-quiz-area').style.display = 'block'; startVocabQuiz(); }, 900); }
        } else if (e.key === ' ') {
          e.preventDefault();
          vocabFlipCard();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          // 뒤집어서 뜻 보기 + 발음 재생
          if (!state.vocabFlipped) vocabFlipCard();
          const item = state.vocabItems[state.vocabIndex];
          if (item) playAudio(item.japanese);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          // 앞면으로 복귀 (다시 외우기)
          if (state.vocabFlipped) vocabFlipCard();
        }
      }
    });
  }

  // ─── 북마크 시스템 ───
  function addKanaBookmark(char) {
    const already = state.bookmarks.some(b => b.type === 'kana' && b.kana === char.kana);
    if (already) {
      showToast('이미 북마크에 있습니다 📌');
      return;
    }
    state.bookmarks.push({
      type: 'kana',
      kana: char.kana,
      romaji: char.romaji,
      korean: char.korean,
      english: char.english,
      examples: char.examples || [],
      levelId: state.learnLevelId
    });
    saveToStorage();
    renderBookmarkSection();
    showToast('📌 나중에 볼 목록에 추가!');
  }

  function addVocabBookmark(item) {
    const already = state.bookmarks.some(b => b.type === 'vocab' && b.vocabId === item.id);
    if (already) {
      showToast('이미 북마크에 있습니다 📌');
      return;
    }
    state.bookmarks.push({
      type: 'vocab',
      vocabId: item.id,
      japanese: item.japanese,
      kanji: item.kanji || '',
      romaji: item.romaji,
      korean: item.korean,
      catId: state.vocabCurrentCategoryId
    });
    saveToStorage();
    renderBookmarkSection();
    showToast('📌 나중에 볼 목록에 추가!');
  }

  function removeBookmark(type, key) {
    state.bookmarks = state.bookmarks.filter(b => {
      if (type === 'kana') return !(b.type === 'kana' && b.kana === key);
      if (type === 'vocab') return !(b.type === 'vocab' && b.vocabId === key);
      return true;
    });
    saveToStorage();
    renderBookmarkSection();
  }

  function renderBookmarkSection() {
    const section = document.getElementById('bookmark-section');
    const list = document.getElementById('bookmark-list');
    if (!section || !list) return;

    if (state.bookmarks.length === 0) {
      section.style.display = 'none';
      return;
    }
    section.style.display = 'block';
    list.innerHTML = '';
    state.bookmarks.forEach(bm => {
      const item = document.createElement('div');
      item.className = 'bookmark-item';
      if (bm.type === 'kana') {
        item.innerHTML = `
          <span class="bm-kana">${bm.kana}</span>
          <span class="bm-korean">${bm.korean}</span>
          <button class="bm-remove" title="삭제">✕</button>`;
        item.addEventListener('click', () => playAudio(bm.kana));
        item.querySelector('.bm-remove').addEventListener('click', (e) => {
          e.stopPropagation(); removeBookmark('kana', bm.kana);
        });
      } else if (bm.type === 'vocab') {
        // 카테고리 타입으로 단어/문장 구분
        const cat = typeof VOCAB_CATEGORIES !== 'undefined'
          ? VOCAB_CATEGORIES.find(c => c.id === bm.catId) : null;
        const typeLabel = cat && cat.type === 'sentence' ? '문장'
          : cat && cat.type === 'sim' ? '실전' : '단어';
        const displayJp = bm.kanji ? formatWithFurigana(bm.kanji, bm.japanese) : bm.japanese;
        item.innerHTML = `
          <span class="bm-kana" style="font-size:13px">${displayJp}</span>
          <span class="bm-type">${typeLabel}</span>
          <span class="bm-korean">${bm.korean}</span>
          <button class="bm-remove" title="삭제">✕</button>`;
        item.addEventListener('click', () => playAudio(bm.japanese));
        item.querySelector('.bm-remove').addEventListener('click', (e) => {
          e.stopPropagation(); removeBookmark('vocab', bm.vocabId);
        });
      }
      list.appendChild(item);
    });
  }

  function setupBookmarkButtons() {
    const reviewBtn = document.getElementById('review-bookmark-btn');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => {
        const kanaItems  = state.bookmarks.filter(b => b.type === 'kana');
        const vocabItems = state.bookmarks.filter(b => b.type === 'vocab');

        if (kanaItems.length === 0 && vocabItems.length === 0) {
          showToast('북마크된 항목이 없습니다.');
          return;
        }

        // ── vocab 북마크가 있으면 vocab 플래시카드로 복습 ──
        if (vocabItems.length > 0) {
          state.vocabItems = vocabItems.map(b => ({
            id: b.vocabId, japanese: b.japanese, korean: b.korean,
            kanji: b.kanji || null, catId: b.catId || null, tip: null, example: null
          }));
          state.vocabIndex = 0;
          state.vocabFlipped = false;
          state.vocabMode = 'flash';
          state.vocabCurrentCategoryId = null;
          state.vocabNavMeta = null;
          state.vocabNavPage = 0;
          showView('vocab');
          document.getElementById('vocab-setup').style.display = 'none';
          document.getElementById('vocab-flash-panel').style.display = 'block';
          const browseArea = document.getElementById('vocab-browse-area');
          if (browseArea) browseArea.style.display = 'none';
          document.getElementById('vocab-cat-name').textContent = '📌 북마크 복습';
          document.getElementById('vocab-cat-subtitle').textContent =
            `단어/문장 ${vocabItems.length}개` +
            (kanaItems.length > 0 ? ` · 가나 ${kanaItems.length}개는 학습탭에서 복습` : '');
          document.getElementById('vocab-flashcard-area').style.display = 'block';
          document.getElementById('vocab-quiz-area').style.display = 'none';
          const vBrowse = document.getElementById('vocab-browse-area');
          if (vBrowse) vBrowse.style.display = 'none';
          renderNavStrip('vfc-nav-strip', state.vocabItems, 0, (idx) => {
            state.vocabIndex = idx; showVocabFlashcard();
          });
          showVocabFlashcard();
          setupVocabFlashcardControls();
          return;
        }

        // ── kana만 있으면 기존 가나 복습 ──
        state.learnLevelId = null;
        state.learnChars = kanaItems.map(b => ({
          kana: b.kana, romaji: b.romaji, korean: b.korean,
          english: b.english, examples: b.examples || [], type: 'kana'
        }));
        state.learnIndex = 0;
        state.learnFlipped = false;
        state.learnMode = 'flash';
        showView('learn');
        document.getElementById('learn-level-name').textContent = '📌 북마크 복습';
        document.getElementById('learn-level-title').textContent = `${state.learnChars.length}개 항목`;
        document.getElementById('flashcard-area').style.display = 'block';
        document.getElementById('browse-area').style.display = 'none';
        renderNavStrip('fc-nav-strip', state.learnChars, 0, (idx) => {
          state.learnIndex = idx; showFlashcard();
        });
        showFlashcard();
        setupFlashcardControls();
      });
    }
    const clearBtn = document.getElementById('clear-bookmark-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (!confirm('북마크를 모두 삭제하시겠습니까?')) return;
        state.bookmarks = [];
        saveToStorage();
        renderBookmarkSection();
        showToast('🗑 북마크가 삭제되었습니다.');
      });
    }
  }

  // ─── 슬라이드쇼 상태 ───
  const ss = {
    chars: [], index: 0, paused: false,
    timer: null, phase: 'reading', // 'reading' | 'revealed'
    readAllTimer: null
  };

  function renderBrowse() {
    setupBrowseControls();
    renderBrowseGrid(state.learnChars);
  }

  function setupBrowseControls() {
    const orderBtn    = document.getElementById('bc-order-btn');
    const randomBtn   = document.getElementById('bc-random-btn');
    const readAllBtn  = document.getElementById('bc-readall-btn');
    const slideshowBtn= document.getElementById('bc-slideshow-btn');

    // 순서/랜덤 토글
    orderBtn.onclick = () => {
      state.browseRandom = false;
      orderBtn.classList.add('bc-active');
      randomBtn.classList.remove('bc-active');
      renderBrowseGrid(state.learnChars);
    };
    randomBtn.onclick = () => {
      state.browseRandom = true;
      randomBtn.classList.add('bc-active');
      orderBtn.classList.remove('bc-active');
      const shuffled = [...state.learnChars].sort(() => Math.random() - 0.5);
      renderBrowseGrid(shuffled);
    };

    // 전체 듣기 (재생 중이면 중지)
    readAllBtn.onclick = () => {
      if (state.isReadingAll) {
        stopAllAudio();
      } else {
        const chars = state.browseRandom
          ? [...state.learnChars].sort(() => Math.random() - 0.5)
          : state.learnChars;
        startReadAll(chars);
      }
    };

    // 슬라이드쇼
    slideshowBtn.onclick = () => {
      const chars = state.browseRandom
        ? [...state.learnChars].sort(() => Math.random() - 0.5)
        : state.learnChars;
      startSlideshow(chars);
    };

    // 하나씩 맞추기 (플래시카드로 전환)
    const flashcardBtn = document.getElementById('bc-flashcard-btn');
    flashcardBtn.onclick = () => {
      const chars = state.browseRandom
        ? [...state.learnChars].sort(() => Math.random() - 0.5)
        : [...state.learnChars];
      state.learnChars = chars;
      state.learnIndex = 0;
      state.learnMode = 'flash';
      state.learnFlipped = false;
      document.getElementById('browse-area').style.display = 'none';
      document.getElementById('flashcard-area').style.display = 'block';
      renderNavStrip('fc-nav-strip', state.learnChars, 0, (idx) => {
        state.learnIndex = idx; showFlashcard();
      });
      showFlashcard();
      setupFlashcardControls();
    };
  }

  function renderBrowseGrid(chars) {
    // 슬라이드쇼 종료 시 그리드로 복귀
    document.getElementById('slideshow-panel').style.display = 'none';
    document.getElementById('browse-grid').style.display = 'grid';

    const grid = document.getElementById('browse-grid');
    grid.innerHTML = '';
    chars.forEach((char) => {
      const el = document.createElement('div');
      el.className = 'browse-item';
      el.innerHTML = `
        <span class="bi-kana">${char.kana}</span>
        <div class="bi-korean">${char.korean}</div>
        <div class="bi-audio">🔊</div>
      `;
      el.addEventListener('click', () => { playAudio(char.kana); markCharSeen(char.kana); });
      el.querySelector('.bi-audio').addEventListener('click', (e) => {
        e.stopPropagation(); playAudio(char.kana);
      });
      grid.appendChild(el);
    });
  }

  // ─── 전체 오디오 중지 ───
  function stopAllAudio() {
    // 사용자 중지 플래그 세팅 (playAudio 내 2번째 화자 차단용)
    state.audioStopped = true;
    setTimeout(() => { state.audioStopped = false; }, 200); // 짧은 시간 후 리셋

    // 전체 듣기 타이머 취소
    clearTimeout(ss.readAllTimer);
    ss.readAllTimer = null;
    state.isReadingAll = false;

    // Web TTS 중지
    if (window.speechSynthesis) window.speechSynthesis.cancel();

    // VOICEVOX 오디오 중지
    if (state.currentVvAudio) {
      try { state.currentVvAudio.pause(); state.currentVvAudio.src = ''; } catch(e) {}
      state.currentVvAudio = null;
    }

    // 발화 인디케이터 + 화자 배지 즉시 숨김 (일시정지 상태도 해제)
    hideVoiceBadgeNow();
    hideSpeakingIndicator();

    // 버튼 복원
    const btn = document.getElementById('bc-readall-btn');
    if (btn) { btn.textContent = '🔊 전체 듣기'; btn.classList.remove('bc-active'); }

    // 플로팅 중지 버튼 숨김
    const fab = document.getElementById('stop-audio-fab');
    if (fab) fab.style.display = 'none';
  }

  // ─── 전체 듣기 (순서대로 TTS 재생) ───
  function startReadAll(chars) {
    stopAllAudio();
    state.isReadingAll = true;

    // 버튼 상태 → 중지
    const btn = document.getElementById('bc-readall-btn');
    if (btn) { btn.textContent = '⏹ 중지'; btn.classList.add('bc-active'); }

    // 플로팅 중지 버튼 표시
    const fab = document.getElementById('stop-audio-fab');
    if (fab) fab.style.display = 'flex';

    let i = 0;
    function next() {
      if (!state.isReadingAll || i >= chars.length) {
        if (i >= chars.length) showToast('전체 듣기 완료! ✓');
        stopAllAudio();
        return;
      }
      playAudio(chars[i].kana);
      i++;
      ss.readAllTimer = setTimeout(next, 1400);
    }
    showToast(`🔊 전체 ${chars.length}자 듣기 시작 — 버튼을 다시 누르면 중지`);
    next();
  }

  // ─── 슬라이드쇼 ───
  function startSlideshow(chars) {
    ss.chars = chars;
    ss.index = 0;
    ss.paused = false;
    ss.phase = 'reading';
    clearTimeout(ss.timer);

    document.getElementById('browse-grid').style.display = 'none';
    document.getElementById('slideshow-panel').style.display = 'block';
    document.getElementById('ss-reveal').style.opacity = '0';

    document.getElementById('ss-play-pause-btn').onclick = toggleSlideshowPause;
    document.getElementById('ss-stop-btn').onclick = stopSlideshow;
    document.getElementById('ss-prev-btn').onclick = () => {
      clearTimeout(ss.timer);
      ss.index = Math.max(0, ss.index - 1);
      showSlideshowCard();
    };
    document.getElementById('ss-next-btn').onclick = () => {
      clearTimeout(ss.timer);
      ss.index = Math.min(ss.chars.length - 1, ss.index + 1);
      showSlideshowCard();
    };

    showSlideshowCard();
  }

  function showSlideshowCard() {
    clearTimeout(ss.timer);
    const char = ss.chars[ss.index];
    if (!char) { stopSlideshow(); showToast('슬라이드쇼 완료! 🎉'); return; }

    const interval = parseInt(document.getElementById('bc-interval-select').value) || 3;
    const total = ss.chars.length;
    document.getElementById('ss-count-text').textContent = `${ss.index + 1} / ${total}`;
    document.getElementById('ss-kana').textContent = char.kana;
    document.getElementById('ss-korean').textContent = char.korean;
    document.getElementById('ss-english').textContent = char.english;
    document.getElementById('ss-hint-text').textContent = '읽어보세요 ↑';
    document.getElementById('ss-reveal').style.opacity = '0';
    document.getElementById('ss-play-pause-btn').textContent = '⏸ 일시정지';
    ss.paused = false;
    ss.phase = 'reading';

    // 카운트다운 바 애니메이션
    const fill = document.getElementById('ss-countdown-fill');
    fill.style.transition = 'none';
    fill.style.width = '100%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fill.style.transition = `width ${interval}s linear`;
      fill.style.width = '0%';
    }));

    if (!ss.paused) {
      ss.timer = setTimeout(() => {
        // 발음 재생 + 읽기 표시
        ss.phase = 'revealed';
        document.getElementById('ss-hint-text').textContent = '';
        document.getElementById('ss-reveal').style.opacity = '1';
        playAudio(char.kana);
        markCharSeen(char.kana);
        // 1.5초 후 다음 카드
        ss.timer = setTimeout(() => {
          if (!ss.paused) {
            ss.index++;
            showSlideshowCard();
          }
        }, 1500);
      }, interval * 1000);
    }
  }

  function toggleSlideshowPause() {
    ss.paused = !ss.paused;
    const btn = document.getElementById('ss-play-pause-btn');
    if (ss.paused) {
      clearTimeout(ss.timer);
      btn.textContent = '▶ 재생';
      // 카운트다운 바 정지
      const fill = document.getElementById('ss-countdown-fill');
      const computed = getComputedStyle(fill).width;
      fill.style.transition = 'none';
      fill.style.width = computed;
    } else {
      btn.textContent = '⏸ 일시정지';
      // 일시정지된 위치에서 재개 (카드 처음부터)
      showSlideshowCard();
    }
  }

  function stopSlideshow() {
    clearTimeout(ss.timer);
    ss.paused = true;
    document.getElementById('slideshow-panel').style.display = 'none';
    document.getElementById('browse-grid').style.display = 'grid';
  }

  // ─── 퀴즈 ───
  function setupQuizView() {
    populateQuizLevelSelect();
    document.getElementById('start-quiz-btn').onclick = startQuiz;

    // 퀴즈 결과 재시도
    const retryBtn = document.getElementById('qr-retry');
    if (retryBtn) retryBtn.onclick = startQuiz;

    // 초기화: setup 표시
    document.getElementById('quiz-setup').style.display = 'block';
    document.getElementById('quiz-game').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';

    // 설정 화면에서는 back btn 숨김 (하단 네비로 이동)
    const qbb = document.getElementById('quiz-back-btn');
    if (qbb) qbb.style.display = 'none';
  }

  function backToQuizSetup() {
    stopAmbient(1.2); // 퀴즈 중 뒤로가기 시 배경음 정지
    document.getElementById('quiz-setup').style.display = 'block';
    document.getElementById('quiz-game').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';
    populateQuizLevelSelect();
    // 설정 화면에서는 back btn 숨김 (하단 네비로 이동)
    const qbb = document.getElementById('quiz-back-btn');
    if (qbb) qbb.style.display = 'none';
  }

  function populateQuizLevelSelect() {
    const sel = document.getElementById('quiz-level-select');
    if (!sel) return;
    sel.innerHTML = '';
    // 전체 옵션
    const allOpt = document.createElement('option');
    allOpt.value = 'all';
    allOpt.textContent = '전체 (해금된 레벨)';
    sel.appendChild(allOpt);
    // 현재 레벨 옵션
    const curOpt = document.createElement('option');
    curOpt.value = 'current';
    curOpt.textContent = '현재 레벨만';
    curOpt.selected = true;
    sel.appendChild(curOpt);
    // 개별 레벨
    LEVELS.forEach(level => {
      if (state.unlockedLevels.includes(level.id)) {
        const opt = document.createElement('option');
        opt.value = level.id;
        opt.textContent = `${level.name}: ${level.title}`;
        sel.appendChild(opt);
      }
    });
  }

  function startQuizForLevel(levelId) {
    showView('quiz');
    setTimeout(() => {
      const sel = document.getElementById('quiz-level-select');
      if (sel) sel.value = levelId;
      startQuiz();
    }, 100);
  }

  function startQuiz() {
    const levelSel = document.getElementById('quiz-level-select').value;
    const qtype = document.querySelector('input[name="qtype"]:checked').value;
    const qcount = document.querySelector('input[name="qcount"]:checked').value;
    const qlang = document.querySelector('input[name="qlang"]:checked').value;

    state.quizType = qtype;
    state.quizLang = qlang;

    // 글자 목록 결정
    let chars = [];
    if (levelSel === 'all') {
      state.unlockedLevels.forEach(id => {
        const level = LEVELS.find(l => l.id === id);
        if (level) chars.push(...level.chars);
      });
    } else if (levelSel === 'current') {
      const level = LEVELS.find(l => l.id === state.currentLevel);
      if (level) chars = [...level.chars];
    } else {
      const levelId = parseInt(levelSel);
      const level = LEVELS.find(l => l.id === levelId);
      if (level) {
        if (levelId === 12) {
          chars = Object.keys(KANA_MAP); // 전체 복습: 모든 가나
        } else {
          chars = [...level.chars];
        }
      }
    }

    // 유효한 글자만
    chars = chars.filter(k => KANA_MAP[k]);

    startQuizWithChars(chars, qtype, qlang, qcount);
  }

  function startQuizWithChars(chars, qtype, qlang, countSel) {
    if (chars.length === 0) { showToast('퀴즈할 글자가 없습니다.'); return; }

    // 셔플
    const shuffled = [...chars].sort(() => Math.random() - 0.5);
    const count = countSel === 'all' || !countSel ? shuffled.length : Math.min(parseInt(countSel) || 10, shuffled.length);

    state.quizQuestions = shuffled.slice(0, count).map(k => buildQuestion(k, qtype, qlang));
    state.quizCurrentIdx = 0;
    state.quizCorrect = 0;
    state.quizWrong = 0;
    state.quizWrongList = [];
    state.quizAnswered = false;
    if (state.quizCountdownTimer) { clearInterval(state.quizCountdownTimer); state.quizCountdownTimer = null; }

    // 퀴즈 배경음 시작
    startAmbient(state.prefs.ambientQuiz || 'none', 'quiz');

    document.getElementById('quiz-setup').style.display = 'none';
    document.getElementById('quiz-game').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';

    document.getElementById('qsm-correct').textContent = '✓ 0';
    document.getElementById('qsm-wrong').textContent = '✗ 0';

    // 게임 중에는 back 버튼이 퀴즈 설정으로
    const qbb2 = document.getElementById('quiz-back-btn');
    if (qbb2) { qbb2.textContent = '← 퀴즈 설정'; qbb2.style.display = ''; qbb2.onclick = backToQuizSetup; }

    showQuizQuestion();
  }

  function buildQuestion(kana, qtype, qlang) {
    const info = KANA_MAP[kana];
    if (!info) return null;

    // 실제 표시 가나 (는_p → は 같은 특수 키 대응)
    const displayKana = info.kana || kana;

    // 오답 3개 생성 (같은 타입에서)
    const sameType = Object.entries(KANA_MAP)
      .filter(([k, v]) => k !== kana && v.type === info.type)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(([k, v]) => ({ kana: v.kana || k, ...v }));

    // 정답 포함 4개 셔플
    const correct = { kana: displayKana, ...info };
    const choices = [correct, ...sameType].sort(() => Math.random() - 0.5);

    return { kana, displayKana, info, qtype, qlang, choices, correctKana: displayKana };
  }

  function showQuizQuestion() {
    const q = state.quizQuestions[state.quizCurrentIdx];
    if (!q) return;
    const total = state.quizQuestions.length;
    const idx = state.quizCurrentIdx;

    document.getElementById('qpr-text').textContent = `${idx + 1} / ${total}`;
    document.getElementById('qpr-bar-fill').style.width = `${(idx / total) * 100}%`;

    state.quizAnswered = false;

    // 진행 중인 카운트다운 타이머 클리어
    if (state.quizCountdownTimer) {
      clearInterval(state.quizCountdownTimer);
      state.quizCountdownTimer = null;
    }

    // 질문 박스
    const qbox = document.getElementById('quiz-question-box');
    qbox.innerHTML = '';

    let qInner = '';
    if (q.qtype === 'kanaToReading') {
      qInner = `
        <div style="width:100%">
          <div class="qb-kana">${q.displayKana || q.kana}</div>
          <div class="qb-label">이 글자의 발음은?</div>
          <button class="audio-btn" style="margin-top:10px" onclick="App.playAudio('${q.displayKana || q.kana}')">🔊 발음 듣기</button>
        </div>`;
    } else if (q.qtype === 'readingToKana') {
      const readingText = getReadingText(q.info);
      qInner = `
        <div style="width:100%">
          <div class="qb-reading">${readingText}</div>
          <div class="qb-label">이 발음에 해당하는 글자는?</div>
        </div>`;
    } else if (q.qtype === 'listen') {
      qInner = `
        <div style="text-align:center; width:100%">
          <button class="qb-listen-btn" onclick="App.playAudio('${q.displayKana || q.kana}')">🔊 발음 듣기</button>
          <div class="qb-label" style="margin-top:12px">들은 발음에 해당하는 글자는?</div>
        </div>`;
      setTimeout(() => playAudio(q.displayKana || q.kana), 300);
    }
    qbox.innerHTML = qInner;

    // ── 힌트: 예시 단어를 문제 하단에 표시 ──
    const hints = (q.info.examples || []).slice(0, 3);
    if (hints.length) {
      const hintDiv = document.createElement('div');
      hintDiv.className = 'quiz-question-hint';
      hintDiv.innerHTML = `<span class="quiz-hint-label">💡 힌트 — 예시 단어</span>` +
        hints.map(e =>
          `<span class="quiz-hint-ex" onclick="App.playAudio('${e.word}')">` +
          `<strong>${e.word}</strong> ${e.meaning}` +
          `</span>`
        ).join('');
      qbox.appendChild(hintDiv);
    }

    // 선택지
    const choicesDiv = document.getElementById('quiz-choices');
    choicesDiv.innerHTML = '';

    q.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.dataset.kana = choice.kana;

      if (q.qtype === 'kanaToReading') {
        const reading = getReadingText(choice);
        btn.innerHTML = `<span class="choice-reading">${reading}</span>`;
      } else {
        btn.innerHTML = `<span class="choice-kana">${choice.kana}</span>`;
      }

      btn.addEventListener('click', () => handleQuizAnswer(choice.kana, q));
      choicesDiv.appendChild(btn);
    });

    // 피드백 숨김
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('qf-countdown').style.display = 'none';
    document.getElementById('qf-countdown-label').style.display = 'none';

    // ── 문제 제한 시간 카운트다운 ──
    const quizSec = state.prefs.quizCountdown !== undefined ? state.prefs.quizCountdown : 5;
    const timerRow  = document.getElementById('quiz-timer-row');
    const timerFill = document.getElementById('quiz-timer-fill');
    const timerText = document.getElementById('quiz-timer-text');

    if (quizSec > 0 && timerRow) {
      timerRow.style.display = 'flex';
      timerText.textContent = quizSec;
      timerFill.style.transition = 'none';
      timerFill.style.width = '100%';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        timerFill.style.transition = `width ${quizSec}s linear`;
        timerFill.style.width = '0%';
      }));
      let timeLeft = quizSec;
      state.quizCountdownTimer = setInterval(() => {
        timeLeft--;
        if (timerText) timerText.textContent = Math.max(0, timeLeft);
        if (timeLeft <= 0) {
          clearInterval(state.quizCountdownTimer);
          state.quizCountdownTimer = null;
          if (!state.quizAnswered) {
            handleQuizAnswer('__timeout__', q);
          }
        }
      }, 1000);
    } else if (timerRow) {
      timerRow.style.display = 'none';
    }
  }

  function getReadingText(info) {
    if (!info) return '';
    return info.korean || '';
  }

  function handleQuizAnswer(chosenKana, q) {
    if (state.quizAnswered) return;
    state.quizAnswered = true;

    // 제한시간 타이머 중지
    if (state.quizCountdownTimer) {
      clearInterval(state.quizCountdownTimer);
      state.quizCountdownTimer = null;
    }
    const timerRow = document.getElementById('quiz-timer-row');
    if (timerRow) timerRow.style.display = 'none';

    const isTimeout = chosenKana === '__timeout__';
    const isCorrect = !isTimeout && chosenKana === q.correctKana;

    // 버튼 시각화
    document.querySelectorAll('.choice-btn').forEach(btn => {
      btn.classList.add('disabled');
      if (btn.dataset.kana === q.correctKana) btn.classList.add('correct');
      if (!isTimeout && btn.dataset.kana === chosenKana && !isCorrect) btn.classList.add('wrong');
    });

    // 결과 기록
    recordResult(q.kana, isCorrect);

    if (isCorrect) {
      state.quizCorrect++;
      document.getElementById('qsm-correct').textContent = '✓ ' + state.quizCorrect;
    } else {
      state.quizWrong++;
      state.quizWrongList.push(q.kana);
      document.getElementById('qsm-wrong').textContent = '✗ ' + state.quizWrong;
    }

    // 피드백 표시
    const fb = document.getElementById('quiz-feedback');
    fb.style.display = 'block';
    const qfResult = document.getElementById('qf-result');
    const qfCorrect = document.getElementById('qf-correct');
    const qfExamples = document.getElementById('qf-examples');
    const qfCountdown = document.getElementById('qf-countdown');
    const qfCountdownLabel = document.getElementById('qf-countdown-label');
    const nextBtn = document.getElementById('qf-next-btn');

    qfExamples.innerHTML = '';

    if (isCorrect) {
      qfResult.textContent = '✓ 정답!';
      qfResult.className = 'qf-result correct';
      qfCorrect.textContent = '';
      playCorrectSound();
      // 정답 단어 발음
      setTimeout(() => playAudio(q.displayKana || q.kana), 300);

      // ── 1초 후 자동으로 다음 문제 ──
      let count = 1;
      qfCountdown.textContent = count;
      qfCountdown.style.display = 'block';
      qfCountdownLabel.textContent = '초 후 자동으로 다음 문제';
      qfCountdownLabel.style.display = 'block';
      nextBtn.textContent = '지금 다음 문제 →';

      state.quizCountdownTimer = setInterval(() => {
        count--;
        if (count <= 0) {
          clearInterval(state.quizCountdownTimer);
          state.quizCountdownTimer = null;
          nextQuizQuestion();
        } else {
          qfCountdown.textContent = count;
        }
      }, 1000);

      // 버튼으로 즉시 이동 (타이머 취소)
      nextBtn.onclick = () => {
        if (state.quizCountdownTimer) {
          clearInterval(state.quizCountdownTimer);
          state.quizCountdownTimer = null;
        }
        nextQuizQuestion();
      };

    } else {
      qfResult.textContent = isTimeout ? '⏰ 시간 초과!' : '✗ 틀렸어요';
      qfResult.className = 'qf-result wrong';
      qfCorrect.textContent = `정답: ${q.kana} = ${getReadingText(q.info)}`;
      qfCountdown.style.display = 'none';
      qfCountdownLabel.style.display = 'none';
      nextBtn.textContent = '다음 문제 →';
      playWrongSound();

      // 오답일 때만 피드백에 예시 표시
      const examples = q.info.examples || [];
      if (examples.length) {
        examples.slice(0, 2).forEach(e => {
          const row = document.createElement('div');
          row.style.cssText = 'margin:4px 0; cursor:pointer; padding:3px 8px; border-radius:6px; display:inline-flex; align-items:center; gap:5px;';
          row.innerHTML = `<span style="font-size:13px">🔊</span><strong>${e.word}</strong><span style="color:var(--red)">[${e.reading}]</span><span style="color:var(--gray)">${e.meaning}</span>`;
          row.addEventListener('click', () => playAudio(e.word));
          row.addEventListener('mouseenter', () => row.style.background = 'var(--red-light)');
          row.addEventListener('mouseleave', () => row.style.background = '');
          qfExamples.appendChild(row);
        });
      }

      // 자동 다음 설정 시 오답도 5초 후 자동 이동
      if (state.prefs.autonext) {
        let count = 5;
        qfCountdown.textContent = count;
        qfCountdown.style.display = 'block';
        qfCountdownLabel.textContent = '초 후 자동으로 다음 문제';
        qfCountdownLabel.style.display = 'block';
        nextBtn.textContent = '지금 다음 문제 →';

        state.quizCountdownTimer = setInterval(() => {
          count--;
          if (count <= 0) {
            clearInterval(state.quizCountdownTimer);
            state.quizCountdownTimer = null;
            nextQuizQuestion();
          } else {
            qfCountdown.textContent = count;
          }
        }, 1000);

        nextBtn.onclick = () => {
          if (state.quizCountdownTimer) {
            clearInterval(state.quizCountdownTimer);
            state.quizCountdownTimer = null;
          }
          nextQuizQuestion();
        };
      } else {
        nextBtn.onclick = nextQuizQuestion;
      }
    }
  }

  function nextQuizQuestion() {
    state.quizCurrentIdx++;
    if (state.quizCurrentIdx >= state.quizQuestions.length) {
      showQuizResult();
    } else {
      showQuizQuestion();
    }
  }

  function showQuizResult() {
    stopAmbient(2.5); // 퀴즈 결과 시 배경음 페이드아웃
    const correct = state.quizCorrect;
    const total = state.quizQuestions.length;
    const pct = Math.round((correct / total) * 100);
    const xpGained = calculateXP(correct, total);

    state.totalXP += xpGained;
    updateStreak();
    checkLevelUnlock();
    saveToStorage();
    updateHeader();

    document.getElementById('quiz-game').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';

    let icon = '😢', title = '다시 도전해요!';
    if (pct >= 90) { icon = '🏆'; title = '완벽해요!'; }
    else if (pct >= 70) { icon = '🎉'; title = '잘했어요!'; }
    else if (pct >= 50) { icon = '👍'; title = '좋아요!'; }

    document.getElementById('qr-icon').textContent = icon;
    document.getElementById('qr-title').textContent = title;
    document.getElementById('qr-score').textContent = `${correct} / ${total}`;
    document.getElementById('qr-pct').textContent = pct + '%';
    document.getElementById('qr-xp').textContent = `+${xpGained} XP 획득!`;

    // 틀린 문제
    const wrongDiv = document.getElementById('qr-wrong-list');
    if (state.quizWrongList.length > 0) {
      const chars = [...new Set(state.quizWrongList)];
      wrongDiv.innerHTML = `
        <div class="qr-wrong-title">틀린 글자 (${chars.length}개)</div>
        <div class="qr-wrong-chars">
          ${chars.map(k => {
            const info = KANA_MAP[k];
            return `<div class="qr-wrong-char" title="${info ? info.korean : ''}">${k}</div>`;
          }).join('')}
        </div>`;
    } else {
      wrongDiv.innerHTML = '';
    }
  }

  function calculateXP(correct, total) {
    const pct = correct / total;
    let base = correct * 10;
    if (pct >= 1.0) base += 50;
    else if (pct >= 0.9) base += 30;
    else if (pct >= 0.7) base += 15;
    return base;
  }

  // ─── 필기 ───
  function setupWriteView() {
    const typeSelect = document.getElementById('write-type-select');
    state.writeType = typeSelect.value;
    loadWriteChars();

    typeSelect.onchange = () => {
      state.writeType = typeSelect.value;
      state.writeIndex = 0;
      loadWriteChars();
    };

    setupCanvas();
    setupWriteControls();
  }

  function loadWriteChars() {
    const type = state.writeType;
    // 가타가나 탁음+반탁음을 같이 표시
    let realType = type;
    if (type === 'katakana_dakuten') {
      state.writeChars = Object.entries(KANA_MAP)
        .filter(([k,v]) => v.type === 'katakana_dakuten' || v.type === 'katakana_handakuten')
        .map(([k,v]) => ({ kana: k, ...v }));
    } else {
      state.writeChars = Object.entries(KANA_MAP)
        .filter(([k,v]) => v.type === realType)
        .map(([k,v]) => ({ kana: k, ...v }));
    }

    renderWriteList();
    if (state.writeChars.length > 0) {
      state.writeIndex = Math.min(state.writeIndex, state.writeChars.length - 1);
      updateWriteChar();
    }
  }

  function renderWriteList() {
    const list = document.getElementById('write-char-list');
    list.innerHTML = '';
    state.writeChars.forEach((char, i) => {
      const el = document.createElement('div');
      el.className = 'write-char-item' + (i === state.writeIndex ? ' active' : '');
      el.innerHTML = `
        <span class="wci-list-kana">${char.kana}</span>
        <span class="wci-list-info">
          <span class="wci-list-kor">${char.korean}</span>
        </span>`;
      el.addEventListener('click', () => {
        state.writeIndex = i;
        document.querySelectorAll('.write-char-item').forEach((el, j) => {
          el.classList.toggle('active', j === i);
        });
        updateWriteChar();
        clearCanvas();
      });
      list.appendChild(el);
    });
  }

  function updateWriteChar() {
    const char = state.writeChars[state.writeIndex];
    if (!char) return;

    document.getElementById('wci-kana').textContent = char.kana;
    document.getElementById('wci-korean').textContent = char.korean;

    // 시험 모드: 글자 숨기기
    const kanaEl = document.getElementById('wci-kana');
    if (state.writeExamMode) {
      kanaEl.style.visibility = 'hidden';
      document.getElementById('exam-check-btn').style.display = 'inline-block';
      document.getElementById('exam-result').style.display = 'none';
      // 오버레이 강제 숨기기
      state.overlayOn = false;
      document.getElementById('overlay-btn').classList.remove('on');
      document.getElementById('overlay-btn').textContent = '👁 글자 표시';
      updateCanvasOverlay('');
    } else {
      kanaEl.style.visibility = 'visible';
      // 필기 힌트
      const hints = getStrokeHint(char.kana);
      document.getElementById('stroke-hint').textContent = hints;
      updateCanvasOverlay(char.kana);
    }
  }

  function getStrokeHint(kana) {
    const hints = {
      'あ': '가로획 → 세로획 → 삐침',
      'い': '왼쪽 짧은 획 → 오른쪽 긴 획',
      'う': '가로획 → 둥근 획',
      'か': '가로획 → 세로획 → 삐침',
      'き': '두 가로획 → 세로획 → 오른쪽 획',
      'く': '삐침 하나',
      'さ': '가로획 → 아래 두 획',
      'し': '아래로 내려가다 오른쪽으로 말기',
      'す': '위 가로획 → 아래 원형 획',
      'た': '가로획 → 세로획 → 오른쪽 2획',
      'な': '두 가로획 → 세로획 → 둥근 획',
      'に': '두 세로획 → 연결획',
      'は': '세 획으로 구성',
      'ま': '두 가로획 → 아래 원형 획',
      'や': '세 획으로 구성',
      'ら': '短い横画 → 둥근 획',
      'ア': '가로획 → 아래 두 획',
      'カ': '가로획 → 세로획 → 오른쪽 삐침',
    };
    return hints[kana] || '위→아래, 왼쪽→오른쪽 순서로 쓰세요';
  }

  function setupCanvas() {
    const canvas = document.getElementById('write-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#2d3748';

    drawGrid(ctx, canvas.width, canvas.height);

    // 마우스 이벤트
    canvas.addEventListener('mousedown', (e) => {
      state.isDrawing = true;
      const pos = getCanvasPos(canvas, e);
      state.lastX = pos.x;
      state.lastY = pos.y;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    });
    canvas.addEventListener('mousemove', (e) => {
      if (!state.isDrawing) return;
      const pos = getCanvasPos(canvas, e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      state.lastX = pos.x;
      state.lastY = pos.y;
    });
    canvas.addEventListener('mouseup', () => { state.isDrawing = false; });
    canvas.addEventListener('mouseleave', () => { state.isDrawing = false; });

    // 터치 이벤트
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      state.isDrawing = true;
      const pos = getCanvasPos(canvas, e.touches[0]);
      state.lastX = pos.x;
      state.lastY = pos.y;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!state.isDrawing) return;
      const pos = getCanvasPos(canvas, e.touches[0]);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      state.lastX = pos.x;
      state.lastY = pos.y;
    }, { passive: false });
    canvas.addEventListener('touchend', () => { state.isDrawing = false; });
  }

  function drawGrid(ctx, w, h) {
    ctx.save();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    // 가로 중앙선
    ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
    // 세로 중앙선
    ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.stroke();
    ctx.restore();
  }

  function updateCanvasOverlay(kana) {
    const wrapper = document.querySelector('.canvas-wrapper');
    let overlay = wrapper.querySelector('.canvas-overlay-char');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'canvas-overlay-char';
      wrapper.appendChild(overlay);
    }
    overlay.textContent = kana;
    overlay.style.opacity = state.overlayOn ? '1' : '0';
    // 요음(きゃ 등 2자 복합) 글자는 폰트 크기 축소
    if (kana && kana.length > 1) {
      overlay.classList.add('compound');
    } else {
      overlay.classList.remove('compound');
    }
  }

  function getCanvasPos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function clearCanvas() {
    const canvas = document.getElementById('write-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
  }

  // ─── 필기 시험 타이머 ───
  const WRITE_EXAM_SECS = 30; // 글자당 제한 시간
  function startWriteExamTimer() {
    clearInterval(state.writeExamTimerInterval);
    let remaining = WRITE_EXAM_SECS;
    const barEl  = document.getElementById('exam-timer-bar');
    const fillEl = document.getElementById('exam-timer-fill');
    const textEl = document.getElementById('exam-timer-text');
    if (!barEl) return;
    barEl.style.display = 'flex';
    fillEl.style.width  = '100%';
    fillEl.style.background = 'var(--green, #38a169)';
    textEl.textContent = remaining;

    state.writeExamTimerInterval = setInterval(() => {
      remaining--;
      const pct = Math.max(0, (remaining / WRITE_EXAM_SECS) * 100);
      fillEl.style.width = pct + '%';
      textEl.textContent = remaining;
      // 색 변화: 50% 노랑, 25% 빨강
      if (pct <= 25) fillEl.style.background = 'var(--red, #e53e3e)';
      else if (pct <= 50) fillEl.style.background = '#d69e2e';
      else fillEl.style.background = 'var(--green, #38a169)';

      if (remaining <= 0) {
        clearInterval(state.writeExamTimerInterval);
        // 시간 초과 → 자동 정답 확인
        showToast('⏰ 시간 초과!');
        writeExamCheck();
      }
    }, 1000);
  }

  function stopWriteExamTimer() {
    clearInterval(state.writeExamTimerInterval);
    const barEl = document.getElementById('exam-timer-bar');
    if (barEl) barEl.style.display = 'none';
  }

  function toggleWriteExam() {
    state.writeExamMode = !state.writeExamMode;
    state.writeExamScore = { ok: 0, fail: 0 };
    const btn = document.getElementById('exam-mode-btn');
    btn.classList.toggle('on', state.writeExamMode);
    btn.textContent = state.writeExamMode ? '🎯 시험 중' : '🎯 시험 모드';

    if (state.writeExamMode) {
      // 시험 시작: 글자 숨기고 정답확인 버튼 표시
      document.getElementById('wci-kana').style.visibility = 'hidden';
      document.getElementById('exam-check-btn').style.display = 'inline-block';
      document.getElementById('exam-result').style.display = 'none';
      // 오버레이 끄기
      state.overlayOn = false;
      document.getElementById('overlay-btn').classList.remove('on');
      document.getElementById('overlay-btn').textContent = '👁 글자 표시';
      updateCanvasOverlay('');
      // 타이머 시작
      startWriteExamTimer();
    } else {
      // 시험 종료: 원상복귀
      stopWriteExamTimer();
      document.getElementById('wci-kana').style.visibility = 'visible';
      document.getElementById('exam-check-btn').style.display = 'none';
      document.getElementById('exam-result').style.display = 'none';
      const char = state.writeChars[state.writeIndex];
      if (char) updateCanvasOverlay(char.kana);
    }
    clearCanvas();
  }

  function writeExamCheck() {
    const char = state.writeChars[state.writeIndex];
    if (!char) return;
    stopWriteExamTimer(); // 정답 확인 시 타이머 정지
    // 정답(글자) 드러내기
    document.getElementById('wci-kana').style.visibility = 'visible';
    // 오버레이 가이드 표시
    state.overlayOn = true;
    document.getElementById('overlay-btn').classList.add('on');
    document.getElementById('overlay-btn').textContent = '👁 글자 숨기기';
    updateCanvasOverlay(char.kana);
    // 정답 확인 버튼 숨기고 평가 버튼 표시
    document.getElementById('exam-check-btn').style.display = 'none';
    const total = state.writeExamScore.ok + state.writeExamScore.fail;
    const remaining = state.writeChars.length - total;
    document.getElementById('exam-score-text').textContent =
      `${state.writeExamScore.ok}✅  ${state.writeExamScore.fail}❌  남은 글자: ${remaining}`;
    document.getElementById('exam-result').style.display = 'flex';
  }

  function writeExamResult(ok) {
    if (ok) state.writeExamScore.ok++;
    else state.writeExamScore.fail++;

    if (state.writeIndex < state.writeChars.length - 1) {
      state.writeIndex++;
      document.querySelectorAll('.write-char-item').forEach((el, j) => {
        el.classList.toggle('active', j === state.writeIndex);
      });
      updateWriteChar();
      clearCanvas();
      // 다음 글자 타이머 재시작
      document.getElementById('wci-kana').style.visibility = 'hidden';
      document.getElementById('exam-check-btn').style.display = 'inline-block';
      document.getElementById('exam-result').style.display = 'none';
      startWriteExamTimer();
    } else {
      const total = state.writeExamScore.ok + state.writeExamScore.fail;
      const pct = total > 0 ? Math.round(state.writeExamScore.ok / total * 100) : 0;
      showToast(`시험 완료! 정답 ${state.writeExamScore.ok}/${total} (${pct}%) 🎉`);
      toggleWriteExam();
    }
  }

  function startAllBrowse() {
    const allChars = [];
    LEVELS.forEach(level => {
      if (state.unlockedLevels.includes(level.id)) {
        getLevelChars(level.id).forEach(ch => {
          if (!allChars.find(c => c.kana === ch.kana)) allChars.push(ch);
        });
      }
    });
    if (allChars.length === 0) {
      showToast('먼저 레벨을 해금하세요!');
      return;
    }
    state.learnChars = allChars;
    state.learnLevelId = 0;
    state.browseRandom = false;

    showView('learn');
    document.getElementById('learn-level-name').textContent = '전체 일람';
    document.getElementById('learn-level-title').textContent = `해금된 글자 ${allChars.length}자`;
    document.getElementById('learn-card-num').textContent = '';

    const modeSel = document.getElementById('learn-mode-selector');
    if (modeSel) modeSel.style.display = 'none';
    document.getElementById('flashcard-area').style.display = 'none';
    document.getElementById('browse-area').style.display = 'block';
    state.learnMode = 'browse';
    renderBrowse();
  }

  function setupWriteControls() {
    document.getElementById('overlay-btn').onclick = () => {
      state.overlayOn = !state.overlayOn;
      const btn = document.getElementById('overlay-btn');
      btn.classList.toggle('on', state.overlayOn);
      btn.textContent = state.overlayOn ? '👁 글자 숨기기' : '👁 글자 표시';
      const char = state.writeChars[state.writeIndex];
      if (char) updateCanvasOverlay(char.kana);
    };
    document.getElementById('clear-btn').onclick = clearCanvas;
    document.getElementById('write-prev').onclick = () => {
      if (state.writeIndex > 0) {
        state.writeIndex--;
        document.querySelectorAll('.write-char-item').forEach((el, j) => {
          el.classList.toggle('active', j === state.writeIndex);
        });
        updateWriteChar();
        clearCanvas();
      }
    };
    document.getElementById('write-next').onclick = () => {
      if (state.writeIndex < state.writeChars.length - 1) {
        state.writeIndex++;
        document.querySelectorAll('.write-char-item').forEach((el, j) => {
          el.classList.toggle('active', j === state.writeIndex);
        });
        updateWriteChar();
        clearCanvas();
      }
    };
    document.getElementById('wci-audio-btn').onclick = () => {
      const char = state.writeChars[state.writeIndex];
      if (char) playAudio(char.kana);
    };
    document.getElementById('exam-mode-btn').onclick = toggleWriteExam;
    document.getElementById('exam-check-btn').onclick = writeExamCheck;
  }

  // ─── 진도 ───
  function renderProgress() {
    // 개요
    const allChars = Object.keys(KANA_MAP);
    const seen = allChars.filter(k => state.progress[k] && state.progress[k].seen > 0);
    const mastered = allChars.filter(k => isCharMastered(k));
    const totalCorrect = Object.values(state.progress).reduce((s, v) => s + (v.correct || 0), 0);
    const totalAttempt = Object.values(state.progress).reduce((s, v) => s + (v.correct || 0) + (v.incorrect || 0), 0);
    const accuracy = totalAttempt > 0 ? Math.round((totalCorrect / totalAttempt) * 100) : 0;

    document.getElementById('po-total').textContent = seen.length;
    document.getElementById('po-mastered').textContent = mastered.length;
    document.getElementById('po-accuracy').textContent = accuracy + '%';
    document.getElementById('po-xp').textContent = state.totalXP;

    // 레벨별
    const levelsDiv = document.getElementById('progress-levels');
    levelsDiv.innerHTML = '<h3 style="margin-bottom:12px">📋 레벨별 진도</h3>';
    LEVELS.forEach(level => {
      const isUnlocked = state.unlockedLevels.includes(level.id);
      const prog = getLevelProgress(level);

      const el = document.createElement('div');
      el.className = 'pl-level';
      el.innerHTML = `
        <div class="pll-header">
          <div>
            <div class="pll-title">${level.name}: ${level.title}</div>
            <div class="pll-sub">${level.subtitle}</div>
          </div>
          <div class="pll-pct">${isUnlocked ? prog + '%' : '🔒'}</div>
        </div>
        ${isUnlocked ? `
          <div class="pll-bar-bg"><div class="pll-bar-fill" style="width:${prog}%"></div></div>
          <div class="pll-chars">
            ${level.chars.map(k => {
              const p = state.progress[k];
              let cls = 'unseen';
              if (p && p.seen > 0) cls = isCharMastered(k) ? 'mastered' : 'learning';
              const info = KANA_MAP[k];
              return `<div class="pll-char ${cls}" title="${k}: ${info ? info.korean : ''}">${k}</div>`;
            }).join('')}
          </div>` : '<div style="color:#718096;font-size:12px">아직 잠금 상태입니다</div>'
        }`;
      levelsDiv.appendChild(el);
    });

    // 약점 글자
    const weakChars = Object.entries(state.progress)
      .filter(([k, v]) => v && v.incorrect > 0)
      .sort((a, b) => (b[1].incorrect || 0) - (a[1].incorrect || 0))
      .slice(0, 20);

    const weakGrid = document.getElementById('weak-chars-grid');
    if (weakChars.length === 0) {
      weakGrid.innerHTML = '<p class="no-weak">약점 글자가 없어요! 퀴즈를 더 풀어보세요.</p>';
    } else {
      weakGrid.innerHTML = weakChars.map(([k, v]) => {
        const info = KANA_MAP[k];
        const total = (v.correct || 0) + (v.incorrect || 0);
        const acc = total > 0 ? Math.round((v.correct / total) * 100) : 0;
        return `
          <div class="weak-char-card" onclick="App.playAudio('${k}')">
            <span class="wcc-kana">${k}</span>
            <span class="wcc-acc">${acc}% (${v.incorrect}틀)</span>
          </div>`;
      }).join('');
    }

    // 초기화 버튼
    document.getElementById('reset-btn').onclick = () => {
      if (confirm('모든 진도를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        state.progress = {};
        state.totalXP = 0;
        state.streak = 0;
        state.unlockedLevels = [1];
        state.currentLevel = 1;
        state.vocabProgress = {};
        saveToStorage();
        updateHeader();
        renderProgress();
        showToast('진도가 초기화되었습니다.');
      }
    };

    // 단어 진도 표시
    renderVocabProgress();
  }

  // ─── 설정 ───
  function setupSettings() {
    const btn = document.getElementById('settings-btn');
    const modal = document.getElementById('settings-modal');
    const closeBtn = document.getElementById('settings-close');

    btn.onclick = () => {
      modal.style.display = 'flex';
      loadPrefsUI();
    };
    closeBtn.onclick = () => { modal.style.display = 'none'; savePrefs(); };
    modal.addEventListener('click', (e) => {
      if (e.target === modal) { modal.style.display = 'none'; savePrefs(); }
    });
  }

  function applyVisibilityPrefs() {
    document.body.classList.toggle('hide-word-ex', !state.prefs.showWordEx);
    document.body.classList.toggle('hide-sent-ex', !state.prefs.showSentEx);
  }

  function loadPrefsUI() {
    // autoplay/autonext는 항상 true로 고정 (설정 UI에서 제거)
    state.prefs.autoplay = true;
    state.prefs.autonext = true;

    // 롤플레이 이름 설정
    const fnEl = document.getElementById('pref-female-name');
    const mnEl = document.getElementById('pref-male-name');
    if (fnEl) fnEl.value = state.prefs.femaleName || '주영';
    if (mnEl) mnEl.value = state.prefs.maleName   || '승현';

    // 퀴즈 제한 시간
    const qcdEl = document.getElementById('pref-quiz-countdown');
    if (qcdEl) qcdEl.value = String(state.prefs.quizCountdown !== undefined ? state.prefs.quizCountdown : 5);

    // 배경음 설정 — 토글 + 볼륨 슬라이더
    const ambDlgEl  = document.getElementById('pref-ambient-dialogue');
    const ambQzEl   = document.getElementById('pref-ambient-quiz');
    const ambVolEl  = document.getElementById('pref-ambient-volume');
    const ambVolLbl = document.getElementById('pref-ambient-volume-label');

    // 초기값 반영
    if (ambDlgEl) ambDlgEl.checked = (state.prefs.ambientDialogue === 'on');
    if (ambQzEl)  ambQzEl.checked  = (state.prefs.ambientQuiz === 'on');
    const initVol = Math.round((state.prefs.ambientVolume ?? 0.18) * 100);
    if (ambVolEl)  ambVolEl.value  = Math.min(40, initVol);
    if (ambVolLbl) ambVolLbl.textContent = Math.min(40, initVol) + '%';

    // 대화 배경음 토글
    if (ambDlgEl) {
      ambDlgEl.onchange = () => {
        state.prefs.ambientDialogue = ambDlgEl.checked ? 'on' : 'none';
        saveToStorage();
        stopAmbient(0.3);
      };
    }
    // 퀴즈 배경음 토글
    if (ambQzEl) {
      ambQzEl.onchange = () => {
        state.prefs.ambientQuiz = ambQzEl.checked ? 'on' : 'none';
        saveToStorage();
        stopAmbient(0.3);
      };
    }
    // 볼륨 슬라이더
    if (ambVolEl) {
      ambVolEl.oninput = () => {
        const v = parseInt(ambVolEl.value) / 100;
        state.prefs.ambientVolume = v;
        if (ambVolLbl) ambVolLbl.textContent = ambVolEl.value + '%';
        // 현재 재생 중이면 즉시 반영
        if (_ambAudio && !_ambDucked) _ambAudio.volume = v;
        saveToStorage();
      };
    }

    // 표시 설정 토글
    document.getElementById('pref-show-word-ex').checked = state.prefs.showWordEx !== undefined ? state.prefs.showWordEx : true;
    document.getElementById('pref-show-sent-ex').checked = state.prefs.showSentEx !== undefined ? state.prefs.showSentEx : true;
    // 자동 읽고 넘기기 복원
    const aaEl2 = document.getElementById('pref-auto-advance');
    const aadEl2 = document.getElementById('pref-auto-advance-delay');
    const aadRow2 = document.getElementById('pref-auto-advance-delay-row');
    if (aaEl2) { aaEl2.checked = !!state.prefs.autoAdvance; }
    if (aadEl2) { aadEl2.value = state.prefs.autoAdvanceDelay || 3; }
    if (aadRow2) aadRow2.style.display = !!state.prefs.autoAdvance ? 'flex' : 'none';
    if (aaEl2) aaEl2.addEventListener('change', () => {
      if (aadRow2) aadRow2.style.display = aaEl2.checked ? 'flex' : 'none';
    }, { once: false });

    // 음성 목록이 로드된 후 select 값 설정
    if (voicesCached) populateVoiceSelects();
    restoreVoiceSelects();

    // VOICEVOX 설정 UI
    const useVvEl = document.getElementById('pref-use-voicevox');
    const vvRows  = document.getElementById('voicevox-speaker-rows');
    const wttsDivEl = document.getElementById('webtts-settings');
    const vvStatus  = document.getElementById('voicevox-status');

    if (useVvEl) {
      useVvEl.checked = state.prefs.useVoicevox || false;
      const updateVvUI = (enabled) => {
        if (vvRows) vvRows.style.display = enabled ? 'block' : 'none';
        if (wttsDivEl) wttsDivEl.style.display = enabled ? 'none' : 'block';
      };
      updateVvUI(useVvEl.checked);

      useVvEl.onchange = async () => {
        state.prefs.useVoicevox = useVvEl.checked;
        updateVvUI(useVvEl.checked);
        if (useVvEl.checked) {
          if (vvStatus) vvStatus.textContent = '연결 중...';
          const ok = await checkVoicevox();
          if (ok) {
            populateVoicevoxSelects();
            if (vvStatus) vvStatus.textContent = `✅ ${voicevoxSpeakers.length}개 화자`;
          } else {
            useVvEl.checked = false;
            state.prefs.useVoicevox = false;
            updateVvUI(false);
            if (vvStatus) vvStatus.textContent = '❌ 연결 실패';
            showToast('VOICEVOX를 찾을 수 없습니다. localhost:50021 실행 확인 후 다시 시도하세요.');
          }
        } else {
          if (vvStatus) vvStatus.textContent = '비활성';
        }
        saveToStorage();
      };

      // 이미 활성화 상태면 화자 목록 로드 시도
      if (useVvEl.checked) {
        checkVoicevox().then(ok => {
          if (ok) {
            populateVoicevoxSelects();
            if (vvStatus) vvStatus.textContent = `✅ ${voicevoxSpeakers.length}개 화자`;
          } else {
            if (vvStatus) vvStatus.textContent = '❌ 연결 실패 (VOICEVOX 미실행?)';
          }
        });
      }

      // VOICEVOX 화자 변경 시 즉시 저장
      const vvS1 = document.getElementById('pref-voicevox-speaker1');
      const vvS2 = document.getElementById('pref-voicevox-speaker2');
      const testVvBtn = document.getElementById('test-voicevox-btn');
      if (vvS1) vvS1.onchange = () => {
        state.prefs.voicevoxSpeaker1 = parseInt(vvS1.value);
        state.voiceCallCount = 0;
        saveToStorage();
        playVoicevox('こんにちは', parseInt(vvS1.value));
        refreshSplashActors();
        updateActiveSpeakerBadge();
      };
      if (vvS2) vvS2.onchange = () => {
        const id = vvS2.value === 'none' ? 'none' : parseInt(vvS2.value);
        state.prefs.voicevoxSpeaker2 = id;
        state.voiceCallCount = 0;
        saveToStorage();
        if (id !== 'none') playVoicevox('こんにちは', id);
        refreshSplashActors();
        updateActiveSpeakerBadge();
      };
      if (testVvBtn) testVvBtn.onclick = () => { playVoicevox('こんにちは', state.prefs.voicevoxSpeaker1); };
    }

    // 음성 변경 시 즉시 테스트 재생
    const femaleSelect = document.getElementById('pref-voice-female');
    const maleSelect   = document.getElementById('pref-voice-male');

    femaleSelect.onchange = () => {
      state.prefs.voiceFemale = femaleSelect.value;
      state.voiceCallCount = 0;
      saveToStorage();
      if (femaleSelect.value !== 'none') playTestVoice(femaleSelect.value);
      refreshSplashActors();
      updateActiveSpeakerBadge();
    };
    maleSelect.onchange = () => {
      state.prefs.voiceMale = maleSelect.value;
      state.voiceCallCount = 0;
      saveToStorage();
      if (maleSelect.value !== 'none') playTestVoice(maleSelect.value);
      refreshSplashActors();
      updateActiveSpeakerBadge();
    };

    // autoplay/autonext 즉시 반영
    document.getElementById('pref-autoplay').onchange = (e) => {
      state.prefs.autoplay = e.target.checked;
      saveToStorage();
    };
    document.getElementById('pref-autonext').onchange = (e) => {
      state.prefs.autonext = e.target.checked;
      saveToStorage();
    };

    // 퀴즈 제한 시간 즉시 저장
    if (qcdEl) qcdEl.onchange = () => {
      state.prefs.quizCountdown = parseInt(qcdEl.value) || 0;
      saveToStorage();
    };

    // 표시 설정 변경 시 실시간 반영
    ['pref-show-word-ex','pref-show-sent-ex'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.onchange = () => {
        state.prefs.showWordEx  = document.getElementById('pref-show-word-ex').checked;
        state.prefs.showSentEx  = document.getElementById('pref-show-sent-ex').checked;
        applyVisibilityPrefs();
        saveToStorage();
      };
    });
  }

  function savePrefs() {
    const langEl = document.getElementById('pref-lang');
    if (langEl) state.prefs.lang = langEl.value;
    state.prefs.voiceFemale     = document.getElementById('pref-voice-female').value;
    state.prefs.voiceMale       = document.getElementById('pref-voice-male').value;
    const fnEl = document.getElementById('pref-female-name');
    const mnEl = document.getElementById('pref-male-name');
    if (fnEl && fnEl.value.trim()) state.prefs.femaleName = fnEl.value.trim();
    if (mnEl && mnEl.value.trim()) state.prefs.maleName   = mnEl.value.trim();
    state.prefs.autoplay        = true;  // 항상 활성화
    state.prefs.autonext        = true;  // 항상 활성화
    state.prefs.showWordEx      = document.getElementById('pref-show-word-ex').checked;
    state.prefs.showSentEx      = document.getElementById('pref-show-sent-ex').checked;
    const qcdEl = document.getElementById('pref-quiz-countdown');
    if (qcdEl) state.prefs.quizCountdown = parseInt(qcdEl.value) || 0;
    const useVvEl = document.getElementById('pref-use-voicevox');
    if (useVvEl) state.prefs.useVoicevox = useVvEl.checked;
    const vvS1 = document.getElementById('pref-voicevox-speaker1');
    if (vvS1) state.prefs.voicevoxSpeaker1 = parseInt(vvS1.value) || 1;
    const vvS2 = document.getElementById('pref-voicevox-speaker2');
    if (vvS2) state.prefs.voicevoxSpeaker2 = vvS2.value === 'none' ? 'none' : parseInt(vvS2.value);
    // 배경음 설정 저장
    const ambDlg = document.getElementById('pref-ambient-dialogue');
    const ambQz  = document.getElementById('pref-ambient-quiz');
    const ambVol = document.getElementById('pref-ambient-volume');
    if (ambDlg) state.prefs.ambientDialogue = ambDlg.checked ? 'on' : 'none';
    if (ambQz)  state.prefs.ambientQuiz     = ambQz.checked  ? 'on' : 'none';
    if (ambVol) state.prefs.ambientVolume   = parseInt(ambVol.value) / 100;
    // 자동 읽고 넘기기
    const aaEl = document.getElementById('pref-auto-advance');
    const aadEl = document.getElementById('pref-auto-advance-delay');
    const aadRow = document.getElementById('pref-auto-advance-delay-row');
    if (aaEl) state.prefs.autoAdvance = aaEl.checked;
    if (aadEl) state.prefs.autoAdvanceDelay = parseInt(aadEl.value) || 3;
    if (aadRow) aadRow.style.display = (aaEl && aaEl.checked) ? 'flex' : 'none';
    state.voiceCallCount = 0;
    applyVisibilityPrefs();
    saveToStorage();
    updateHqSpeakerLabel();
    updateHqAmbientLabel();
  }

  // ─── XP / 레벨 업 ───
  function updateStreak() {
    const today = new Date().toDateString();
    if (state.lastStudied) {
      const last = new Date(state.lastStudied).toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (last === yesterday) state.streak++;
      else if (last !== today) state.streak = 1;
    } else {
      state.streak = 1;
    }
    state.lastStudied = new Date().toISOString();
  }

  function checkLevelUnlock() {
    LEVELS.forEach(level => {
      if (!state.unlockedLevels.includes(level.id) && state.totalXP >= level.unlockXP) {
        state.unlockedLevels.push(level.id);
        state.currentLevel = level.id;
        setTimeout(() => showToast(`🎉 Level ${level.id} 해금! ${level.title}`), 500);
      }
    });
  }

  // ─── 진도 기록 ───
  function markCharSeen(kana) {
    if (!state.progress[kana]) state.progress[kana] = { seen: 0, correct: 0, incorrect: 0 };
    state.progress[kana].seen = (state.progress[kana].seen || 0) + 1;
    saveToStorage();
  }

  // 플래시카드 뒷면 열람 = "마스터" 기록 (퀴즈와 무관)
  function markCharFlipped(kana) {
    if (!state.progress[kana]) state.progress[kana] = { seen: 0, correct: 0, incorrect: 0 };
    state.progress[kana].flipped = (state.progress[kana].flipped || 0) + 1;
    state.lastStudied = new Date().toISOString();
    saveToStorage();
  }

  function recordResult(kana, isCorrect) {
    if (!state.progress[kana]) state.progress[kana] = { seen: 0, correct: 0, incorrect: 0 };
    if (isCorrect) {
      state.progress[kana].correct = (state.progress[kana].correct || 0) + 1;
    } else {
      state.progress[kana].incorrect = (state.progress[kana].incorrect || 0) + 1;
    }
    state.progress[kana].seen = (state.progress[kana].seen || 0) + 1;
    state.lastStudied = new Date().toISOString();
    saveToStorage();
  }

  // ─── 오디오 ───

  // ─── VOICEVOX 통합 ───
  const VOICEVOX_URL = 'http://localhost:50021';

  // VOICEVOX 화자 이름 한글 번역 테이블
  const VV_NAME_KO = {
    // 캐릭터 이름
    '四国めたん':        '시코쿠 메탄',
    'ずんだもん':        '준다몬',
    '春日部つむぎ':      '카스카베 츠무기',
    '雨晴はう':          '아마하레 하우',
    '波音リツ':          '나나미 리츠',
    '玄野武宏':          '쿠로노 타케히로',
    '白上虎太郎':        '시라카미 코타로',
    '青山龍星':          '아오야마 류세이',
    '冥鳴ひまり':        '메이메이 히마리',
    '九州そら':          '큐슈 소라',
    'もち子さん':        '모치코상',
    '剣崎雌雄':          '켄자키 메스오',
    'ちび式じい':        '치비시키지이',
    '櫻歌ミコ':          '사쿠라카 미코',
    '小夜/SAYO':         '소요/SAYO',
    'ナースロボ＿タイプT':'너스로봇 타입T',
    '後鬼':              '고키',
    // 스타일 이름
    'ノーマル':  '기본',
    'あまあま':  '달콤',
    'ツンツン':  '쌀쌀',
    'セクシー':  '섹시',
    'ささやき':  '속삭임',
    'ヒソヒソ':  '귓속말',
    'クオリティ':'고품질',
    'ふつう':    '보통',
    'わーい':    '신남',
    'びくびく':  '긴장',
    'おこ':      '화남',
    'びえーん':  '울음',
    '喜び':      '기쁨',
    'ツンギレ':  '격노',
    '悲しみ':    '슬픔',
    'たのしい':  '즐거움',
    'かなしい':  '슬픔',
    'アナウンス':'아나운서',
    '読み聞かせ':'낭독',
    '人間ver.':  '인간형',
    'ロボットver.':'로봇형',
    '第1形態':   '1형태',
    '第2形態':   '2형태',
    'ロリ':      '로리',
    '楽しい':    '즐거움',
    '怒り':      '화남',
  };

  function translateVvName(jpName, jpStyle) {
    const koName  = VV_NAME_KO[jpName]  || jpName;
    const koStyle = VV_NAME_KO[jpStyle] || jpStyle;
    return `${koName} (${koStyle})`;
  }
  let voicevoxSpeakers = [];
  let voicevoxAvailable = false;
  // speakerId → { portrait: base64, icon: base64, charName, charNameJp }
  const vvCharPortraits = {};

  async function checkVoicevox() {
    try {
      const resp = await fetch(`${VOICEVOX_URL}/speakers`, {
        signal: AbortSignal.timeout ? AbortSignal.timeout(3000) : undefined
      });
      if (resp.ok) {
        const data = await resp.json();
        voicevoxAvailable = true;
        voicevoxSpeakers = [];

        // 화자 목록 구성 + portrait 비동기 로드
        const speakerUuids = [];
        data.forEach(speaker => {
          speakerUuids.push({ uuid: speaker.speaker_uuid, name: speaker.name });
          (speaker.styles || []).forEach(style => {
            voicevoxSpeakers.push({
              id: style.id,
              name: translateVvName(speaker.name, style.name),
              nameJp: `${speaker.name} (${style.name})`,
              charName: translateVvName(speaker.name, ''),
              charNameJp: speaker.name,
              speakerUuid: speaker.speaker_uuid
            });
          });
        });

        // 캐릭터 portrait를 백그라운드에서 로드 (실패해도 OK)
        speakerUuids.forEach(async ({ uuid, name }) => {
          try {
            const r = await fetch(`${VOICEVOX_URL}/speaker_info?speaker_uuid=${uuid}`);
            if (!r.ok) return;
            const info = await r.json();
            // portrait (308x308) base64 png
            const portrait = info.portrait ? `data:image/png;base64,${info.portrait}` : null;
            const icon     = info.style_infos?.[0]?.icon ? `data:image/png;base64,${info.style_infos[0].icon}` : null;
            // 해당 uuid의 모든 스타일 ID에 이미지 매핑
            voicevoxSpeakers
              .filter(sp => sp.speakerUuid === uuid)
              .forEach(sp => {
                vvCharPortraits[sp.id] = { portrait, icon, charName: name };
                // style별 아이콘도 매핑
                const styleInfo = info.style_infos?.find(si => si.id === sp.id);
                if (styleInfo?.icon) {
                  vvCharPortraits[sp.id].icon = `data:image/png;base64,${styleInfo.icon}`;
                }
              });
            // 화자 설정 UI 이미지 새로고침
            updateVvPortraitUI();
          } catch (e) { /* portrait 로드 실패 무시 */ }
        });

        return true;
      }
    } catch (e) { /* VOICEVOX 미실행 */ }
    voicevoxAvailable = false;
    return false;
  }

  function updateVvPortraitUI() {
    ['pref-voicevox-speaker1','pref-voicevox-speaker2'].forEach((selId, idx) => {
      const sel = document.getElementById(selId);
      const imgEl = document.getElementById(`vv-portrait-${idx + 1}`);
      if (!sel || !imgEl) return;
      const sid = parseInt(sel.value);
      const info = vvCharPortraits[sid];
      if (info?.icon) {
        imgEl.src = info.icon;
        imgEl.style.display = 'inline-block';
        imgEl.title = info.charName;
      } else {
        imgEl.style.display = 'none';
      }
    });
    // 현재 활성 화자 배지 갱신
    updateActiveSpeakerBadge();
  }

  // 음파 막대 HTML (3개)
  function barsHtml() {
    return `<div class="vvb-bars"><div class="vvb-bar b1"></div><div class="vvb-bar b2"></div><div class="vvb-bar b3"></div></div>`;
  }

  // Web TTS 제공자 정보 (로고 색상·레이블)
  function getVoiceProvider(voice) {
    if (!voice) return null;
    const n = voice.name.toLowerCase();
    if (n.includes('google'))    return { letter: 'G', bg: '#4285F4', label: 'Google' };
    if (n.includes('microsoft')) return { letter: 'M', bg: '#00A4EF', label: 'Microsoft' };
    if (n.includes('apple'))     return { letter: '',  bg: '#555555', label: 'Apple' };
    if (n.includes('samsung'))   return { letter: 'S', bg: '#1428A0', label: 'Samsung' };
    return { letter: '🔊', bg: '#718096', label: getVoiceDisplayName(voice) };
  }

  // 슬롯 아바타 HTML 생성
  function buildSlotAvatarHtml(slot) {
    const useVV = state.prefs.useVoicevox && voicevoxAvailable;

    if (useVV) {
      // VOICEVOX 모드: 캐릭터 초상화
      const sid  = slot === 1 ? state.prefs.voicevoxSpeaker1 : state.prefs.voicevoxSpeaker2;
      const info = vvCharPortraits[sid];
      const sp   = voicevoxSpeakers.find(s => s.id == sid);
      if (!sp) return null;  // 화자 미설정
      const name = sp.name;
      const avatarHtml = info?.icon
        ? `<img src="${info.icon}" class="vvb-avatar-img">`
        : `<div class="vvb-avatar-emoji">🎤</div>`;
      return { avatarHtml, name };
    } else {
      // Web TTS 모드: 음성 인덱스 + 캐릭터 프리셋
      const vIdx   = slot === 1 ? state.prefs.voiceFemale : state.prefs.voiceMale;
      const charId = slot === 1 ? (state.prefs.charVoice1 || 'none') : (state.prefs.charVoice2 || 'none');
      const cv     = CHARACTER_VOICES.find(c => c.id === charId) || CHARACTER_VOICES[0];
      const voice  = (vIdx !== 'none' && vIdx !== undefined && vIdx !== null)
                     ? allJaVoices[parseInt(vIdx)] : null;

      // 화자2 "사용 안함" 체크
      if (slot === 2 && (vIdx === 'none' || vIdx === undefined) && charId === 'none') return null;
      if (slot === 1 && !voice && charId === 'none') {
        // 기본값: 브라우저 TTS
        const avatarHtml = `<div class="vvb-avatar-emoji">🔊</div>`;
        return { avatarHtml, name: '브라우저 TTS' };
      }

      // 캐릭터 프리셋 있으면 이모지 우선
      if (charId !== 'none') {
        const emoji = cv.label.match(/\p{Emoji}/u)?.[0] || '🔊';
        const charName = cv.label.replace(/\p{Emoji}/gu, '').trim() || cv.label;
        const avatarHtml = `<div class="vvb-avatar-emoji">${emoji}</div>`;
        return { avatarHtml, name: charName };
      }

      // 음성 제공자 로고
      const prov = getVoiceProvider(voice);
      if (prov) {
        const avatarHtml = prov.letter.length === 1
          ? `<div class="vvb-avatar-letter" style="background:${prov.bg}">${prov.letter}</div>`
          : `<div class="vvb-avatar-emoji">${prov.letter}</div>`;
        const shortName = voice ? getVoiceDisplayName(voice) : prov.label;
        return { avatarHtml, name: shortName.length > 12 ? prov.label : shortName };
      }
      return null;
    }
  }

  // 배지 항목 HTML 생성
  function buildSlotItemHtml(slot) {
    const info = buildSlotAvatarHtml(slot);
    if (!info) return '';
    return `
      <div class="vvb-item" data-slot="${slot}">
        ${info.avatarHtml}
        <div class="vvb-info">
          <span class="vvb-num">화자 ${slot}</span>
          <span class="vvb-name">${info.name}</span>
        </div>
        ${barsHtml()}
      </div>`;
  }

  function updateActiveSpeakerBadge() {
    const badge = document.getElementById('vv-active-badge');
    if (!badge) return;

    const slot1Html = buildSlotItemHtml(1);
    const slot2Html = buildSlotItemHtml(2);

    // 표시할 슬롯이 하나도 없으면 숨김
    if (!slot1Html && !slot2Html) {
      badge.style.display = 'none';
      syncSidebarVisibility();
      return;
    }

    badge.innerHTML =
      `<div class="vvb-title">🎤 화자</div>` +
      slot1Html + slot2Html +
      `<div class="vvb-hint">${_ttsPaused ? '▶ 클릭하여 재개' : '⏸ 클릭하여 일시정지'}</div>`;
    // display 는 showVoiceBadge() / scheduleHideVoiceBadge() 가 제어 — 여기서는 강제 표시하지 않음

    // 클릭 → TTS 일시정지 / 재개
    // ※ Chrome은 speechSynthesis.pause()가 동작하지 않는 버그 존재
    //   → cancel()로 현재 발화 중단 후 플래그로 루프를 대기시킴
    badge.onclick = () => {
      if (_ttsPaused) {
        // ── 재개 ──
        if (state.prefs.useVoicevox && state.currentVvAudio) {
          state.currentVvAudio.play().catch(() => {});
        }
        _ttsPaused = false;
        const hint = badge.querySelector('.vvb-hint');
        if (hint) hint.textContent = '⏸ 클릭하여 일시정지';
      } else {
        // ── 일시정지 ──
        if (state.prefs.useVoicevox && state.currentVvAudio) {
          // VOICEVOX: HTML Audio pause()는 신뢰성 있음
          state.currentVvAudio.pause();
        } else if (window.speechSynthesis) {
          // Web TTS: pause() 버그 우회 → cancel()로 중단 후 루프 대기
          window.speechSynthesis.cancel();
        }
        _ttsPaused = true;
        const hint = badge.querySelector('.vvb-hint');
        if (hint) hint.textContent = '▶ 클릭하여 재개';
      }
    };
    // syncSidebarVisibility() 는 showVoiceBadge/scheduleHideVoiceBadge 에서 호출
  }

  // ─── 대화 스플래시 화자 카드 실시간 갱신 ───
  // 설정에서 음성이 변경될 때 스플래시 화면이 열려있으면 즉시 반영
  function refreshSplashActors() {
    const splash = document.getElementById('dlg-splash');
    if (!splash) return;  // 스플래시가 표시되지 않은 상태면 무시

    const hasSlot1  = hasSpeakerConfigured(1);
    const hasSlot2  = hasSpeakerConfigured(2);
    const slot1Info = buildSlotAvatarHtml(1);
    const slot2Info = buildSlotAvatarHtml(2);

    // 화자 A 카드 업데이트
    const actorA = splash.querySelector('.dlg-actor-A');
    if (actorA) {
      actorA.querySelector('.dlg-actor-avatar').innerHTML =
        slot1Info ? slot1Info.avatarHtml : '<div class="vvb-avatar-emoji">🔊</div>';
      actorA.querySelector('.dlg-actor-name').textContent =
        slot1Info ? slot1Info.name : '기본 TTS';
    }

    // 화자 B 카드 업데이트
    const actorB = splash.querySelector('.dlg-actor-B');
    if (actorB) {
      actorB.querySelector('.dlg-actor-avatar').innerHTML =
        slot2Info ? slot2Info.avatarHtml : '<div class="vvb-avatar-emoji">🎙️</div>';
      actorB.querySelector('.dlg-actor-name').textContent =
        slot2Info ? slot2Info.name : (hasSlot1 ? '(A와 동일)' : '기본 TTS');
    }

    // 경고/안내 메모 갱신 (있으면 제거하고 재생성)
    splash.querySelector('.dlg-splash-warn')?.remove();
    splash.querySelector('.dlg-splash-note')?.remove();

    // 시작 버튼 앞에 삽입
    const startBtn = splash.querySelector('.dlg-start-btn');
    if (!hasSlot1) {
      const warn = document.createElement('div');
      warn.className = 'dlg-splash-warn';
      warn.innerHTML = `⚠️ 음성이 설정되지 않았습니다.<br>설정에서 음성을 선택하면 각 화자에게 다른 목소리가 할당됩니다.
        <br><button class="dlg-settings-btn" id="dlg-open-settings">⚙️ 설정 열기</button>`;
      warn.querySelector('#dlg-open-settings').onclick = () => {
        document.getElementById('settings-modal').style.display = 'flex';
      };
      splash.insertBefore(warn, startBtn);
    } else if (!hasSlot2) {
      const note = document.createElement('div');
      note.className = 'dlg-splash-note';
      note.textContent = '💡 두 번째 음성이 없으면 A/B 모두 같은 목소리로 재생됩니다.';
      splash.insertBefore(note, startBtn);
    }
  }

  // VOICEVOX 재생 (wait=true 시 재생 완료까지 대기)
  async function playVoicevox(text, speakerId, wait = false) {
    if (speakerId === 'none' || speakerId === undefined || speakerId === null) return false;
    try {
      const qResp = await fetch(`${VOICEVOX_URL}/audio_query?text=${encodeURIComponent(text)}&speaker=${speakerId}`, { method: 'POST' });
      if (!qResp.ok) return false;
      const query = await qResp.json();
      const sResp = await fetch(`${VOICEVOX_URL}/synthesis?speaker=${speakerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
      });
      if (!sResp.ok) return false;
      const blob = await sResp.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      state.currentVvAudio = audio;
      if (wait) {
        return new Promise((resolve) => {
          audio.onended = () => { URL.revokeObjectURL(url); state.currentVvAudio = null; resolve(true); };
          audio.onerror = () => { URL.revokeObjectURL(url); state.currentVvAudio = null; resolve(false); };
          audio.play().catch(() => resolve(false));
        });
      } else {
        audio.onended = () => { URL.revokeObjectURL(url); state.currentVvAudio = null; };
        await audio.play();
        return true;
      }
    } catch (e) { return false; }
  }

  function populateVoicevoxSelects() {
    const s1 = document.getElementById('pref-voicevox-speaker1');
    const s2 = document.getElementById('pref-voicevox-speaker2');
    if (!s1 || !s2 || !voicevoxSpeakers.length) return;
    s1.innerHTML = '';
    s2.innerHTML = '<option value="none">사용 안함</option>';
    voicevoxSpeakers.forEach(sp => {
      const o1 = document.createElement('option');
      o1.value = sp.id; o1.textContent = sp.name;
      s1.appendChild(o1);
      const o2 = document.createElement('option');
      o2.value = sp.id; o2.textContent = sp.name;
      s2.appendChild(o2);
    });
    s1.value = String(state.prefs.voicevoxSpeaker1);
    if (state.prefs.voicevoxSpeaker2 !== 'none') {
      s2.value = String(state.prefs.voicevoxSpeaker2);
    }
    // portrait 이미지 초기 표시
    updateVvPortraitUI();
    // 화자 변경 시 portrait 갱신
    s1.addEventListener('change', updateVvPortraitUI);
    s2.addEventListener('change', updateVvPortraitUI);
  }

  const NATURAL_VOICES = ['kyoko', 'otoya', 'o-ren', 'haruka', 'ayumi', 'nanami', 'ichiro', 'google 日本語'];
  const TEST_PHRASE = 'こんにちは！私の声はこんな感じです。よろしくお願いします！';

  // 캐릭터 목소리 프리셋 (pitch + rate 조합으로 개성 표현)
  const CHARACTER_VOICES = [
    { id: 'none',       label: '없음',         pitch: 1.0,  rate: 0.8  },
    { id: 'anime_girl', label: '🎌 애니 소녀', pitch: 1.85, rate: 1.0  },
    { id: 'child',      label: '🧒 어린이',    pitch: 1.55, rate: 1.1  },
    { id: 'hero',       label: '🦸 용사',      pitch: 0.72, rate: 0.82 },
    { id: 'wizard',     label: '🧙 마법사',    pitch: 0.82, rate: 0.70 },
    { id: 'robot',      label: '🤖 로봇',      pitch: 1.0,  rate: 1.45 },
    { id: 'grandma',    label: '👵 할머니',    pitch: 1.30, rate: 0.62 },
    { id: 'villain',    label: '😈 악당',      pitch: 0.52, rate: 0.80 },
    { id: 'ghost',      label: '👻 유령',      pitch: 1.45, rate: 0.72 },
    { id: 'narrator',   label: '📺 내레이터',  pitch: 0.88, rate: 0.68 },
  ];

  let allJaVoices = [];
  let voicesCached = false;



  function isNaturalVoice(name) {
    return NATURAL_VOICES.some(n => name.toLowerCase().includes(n));
  }

  function getVoiceDisplayName(v) {
    const natural = isNaturalVoice(v.name) ? ' ⭐' : '';
    const displayName = v.name.replace(/\s*\(.*?\)\s*/g, '').trim();
    return `${displayName}${natural}`;
  }

  function loadJapaneseVoices() {
    const voices = window.speechSynthesis.getVoices();
    const jaVoices = voices.filter(v => v.lang === 'ja-JP' || v.lang.startsWith('ja'));
    if (jaVoices.length === 0) return;

    // 자연스러운 음성 우선, 그 다음 이름순
    allJaVoices = jaVoices.slice().sort((a, b) => {
      const aNat = isNaturalVoice(a.name) ? 0 : 1;
      const bNat = isNaturalVoice(b.name) ? 0 : 1;
      if (aNat !== bNat) return aNat - bNat;
      return a.name.localeCompare(b.name);
    });
    voicesCached = true;
    populateVoiceSelects();
    // 음성 로드 후 배지도 갱신 (Web TTS 화자명 표시)
    updateActiveSpeakerBadge();
  }

  function populateVoiceSelects() {
    const femaleSelect = document.getElementById('pref-voice-female');
    const maleSelect = document.getElementById('pref-voice-male');
    if (!femaleSelect || !maleSelect || allJaVoices.length === 0) return;

    // 기존 옵션 제거 ("사용 안함" 유지)
    while (femaleSelect.options.length > 1) femaleSelect.remove(1);
    while (maleSelect.options.length > 1) maleSelect.remove(1);

    allJaVoices.forEach((v, i) => {
      const opt1 = document.createElement('option');
      opt1.value = String(i);
      opt1.textContent = getVoiceDisplayName(v);
      femaleSelect.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = String(i);
      opt2.textContent = getVoiceDisplayName(v);
      maleSelect.appendChild(opt2);
    });

    // 저장된 설정 복원
    restoreVoiceSelects();
  }

  function restoreVoiceSelects() {
    const femaleSelect = document.getElementById('pref-voice-female');
    const maleSelect = document.getElementById('pref-voice-male');
    if (!femaleSelect || !maleSelect) return;

    const fv = state.prefs.voiceFemale;
    const mv = state.prefs.voiceMale;

    femaleSelect.value = (fv !== undefined && fv !== null && fv !== 'none') ? String(fv) : 'none';
    maleSelect.value = (mv !== undefined && mv !== null && mv !== 'none') ? String(mv) : 'none';

    // 선택값이 없으면 none으로 복원
    if (!femaleSelect.querySelector(`option[value="${fv}"]`)) femaleSelect.value = 'none';
    if (!maleSelect.querySelector(`option[value="${mv}"]`)) maleSelect.value = 'none';
  }

  // 음성 목록 로드 (비동기 대응 + 폴링 fallback)
  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = loadJapaneseVoices;
    loadJapaneseVoices();
    let voicePollCount = 0;
    const voicePoll = setInterval(() => {
      voicePollCount++;
      if (voicesCached || voicePollCount > 20) { clearInterval(voicePoll); return; }
      loadJapaneseVoices();
    }, 200);
  }

  // voiceIndex: 시스템 음성 인덱스
  function playTestVoice(voiceIndex) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(TEST_PHRASE);
    utter.lang = 'ja-JP';
    utter.rate  = 0.82;
    utter.pitch = 1.0;
    if (voiceIndex !== 'none' && allJaVoices[parseInt(voiceIndex)]) {
      utter.voice = allJaVoices[parseInt(voiceIndex)];
    }
    window.speechSynthesis.speak(utter);
  }

  // 반환값: { voice, pitch, rate }  — Web TTS 전용
  function getVoiceForPlayback() {
    if (!voicesCached) loadJapaneseVoices();

    const fIdx = state.prefs.voiceFemale;  // 첫번째 음성 (기존 필드명 유지)
    const mIdx = state.prefs.voiceMale;    // 두번째 음성

    const voice1 = (fIdx !== 'none' && fIdx !== undefined) ? allJaVoices[parseInt(fIdx)] : null;
    const voice2 = (mIdx !== 'none' && mIdx !== undefined) ? allJaVoices[parseInt(mIdx)] : null;

    // 두 음성 모두 설정된 경우 교대로 사용
    const slots = [];
    if (voice1) slots.push({ voice: voice1, pitch: 1.0, rate: 0.8 });
    if (voice2) slots.push({ voice: voice2, pitch: 1.0, rate: 0.8 });

    if (slots.length === 0) {
      return { voice: allJaVoices[0] || null, pitch: 1.0, rate: 0.8 };
    }
    const slot = slots[state.voiceCallCount % slots.length];
    state.voiceCallCount++;
    return slot;
  }

  // ═══════════════════════════════════════════════════════════
  //  배경음 — MP3 파일 기반 플레이어
  // ═══════════════════════════════════════════════════════════
  let _ambAudio      = null;   // 현재 재생 중인 Audio 객체
  let _ambFadeId     = null;   // 페이드 인터벌 ID
  let _ambTracks     = [];     // sounds/index.json 에서 로드한 파일 목록 (대화용)
  let _ambQuizTracks = [];     // sounds/quiz/index.json 에서 로드한 파일 목록 (퀴즈용)
  let _ambDucked     = false;  // TTS 발화 중 볼륨 낮춤 여부
  let _ambCurrentMode  = 'dialogue'; // 현재 재생 모드 추적
  let _ambDlgReduced   = false;      // 대화 진행 중 볼륨 축소 플래그
  let _ttsPaused           = false;  // 화자 배지 클릭으로 TTS 일시정지 중
  let _hideVoiceBadgeTimer = null;   // TTS 종료 후 배지 지연 숨김 타이머

  // 앱 시작 시 1회 — 트랙 목록 로드 (대화 + 퀴즈 동시)
  async function loadAmbientTracks() {
    const toUrl = path => (typeof chrome !== 'undefined' && chrome.runtime?.getURL)
                          ? chrome.runtime.getURL(path)
                          : path;
    try {
      const resp = await fetch(toUrl('sounds/index.json'));
      if (resp.ok) _ambTracks = await resp.json();
    } catch(e) { _ambTracks = []; }
    try {
      const resp = await fetch(toUrl('sounds/quiz/index.json'));
      if (resp.ok) _ambQuizTracks = await resp.json();
    } catch(e) { _ambQuizTracks = []; }
  }

  // 현재 재생 중인 트랙을 제외하고 랜덤 선택
  // mode: 'quiz' → _ambQuizTracks (비어있으면 _ambTracks 폴백)
  function _pickAmbTrack(mode) {
    const pool0 = (mode === 'quiz' && _ambQuizTracks.length) ? _ambQuizTracks : _ambTracks;
    if (!pool0.length) return null;
    const current = _ambAudio?._trackName;
    const pool    = pool0.length > 1 ? pool0.filter(t => t !== current) : pool0;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // 볼륨을 targetVol 까지 durationMs 동안 서서히 변경
  function _ambFadeTo(audio, targetVol, durationMs, onDone) {
    if (_ambFadeId) { clearInterval(_ambFadeId); _ambFadeId = null; }
    const startVol = audio.volume;
    const steps    = Math.max(1, Math.round(durationMs / 50));
    const delta    = (targetVol - startVol) / steps;
    let   n        = 0;
    _ambFadeId = setInterval(() => {
      if (!_ambAudio || _ambAudio !== audio) { clearInterval(_ambFadeId); _ambFadeId = null; return; }
      n++;
      audio.volume = Math.max(0, Math.min(1, startVol + delta * n));
      if (n >= steps) {
        clearInterval(_ambFadeId); _ambFadeId = null;
        audio.volume = targetVol;
        if (onDone) onDone();
      }
    }, 50);
  }

  // 현재 설정 볼륨 (0~1)
  function _ambTargetVol() {
    return Math.max(0, Math.min(1, (state.prefs.ambientVolume ?? 0.18)));
  }

  // ── startAmbient: type = 'on' | 'none',  mode = 'dialogue' | 'quiz' ──
  function startAmbient(type, mode = 'dialogue') {
    stopAmbient(0.4);
    const trackList = (mode === 'quiz' && _ambQuizTracks.length) ? _ambQuizTracks : _ambTracks;
    if (!type || type === 'none' || !trackList.length) return;

    const file = _pickAmbTrack(mode);
    if (!file) return;

    // 퀴즈 전용 폴더 사용 여부 결정
    const folder = (mode === 'quiz' && _ambQuizTracks.length) ? 'sounds/quiz/' : 'sounds/';
    const url    = (typeof chrome !== 'undefined' && chrome.runtime?.getURL)
                   ? chrome.runtime.getURL(folder + file)
                   : folder + file;

    const audio      = new Audio(url);
    audio._trackName = file;
    audio.loop       = true;
    audio.volume     = 0;
    _ambAudio        = audio;
    _ambDucked       = false;
    _ambCurrentMode  = mode;

    audio.play().catch(() => { if (_ambAudio === audio) _ambAudio = null; });
    // 인트로: 사용자 설정의 2.5배 볼륨으로 페이드인 (최대 0.65)
    const introVol = Math.min(0.65, _ambTargetVol() * 2.5);
    _ambFadeTo(audio, introVol, 2000);
    showAmbientBadge(mode, file);
  }

  // ── stopAmbient: fadeTime(초) 동안 페이드아웃 후 정지 ─────────
  function stopAmbient(fadeTime = 2.0) {
    if (!_ambAudio) return;
    const audio = _ambAudio;
    _ambAudio  = null;   // 즉시 null → 다음 startAmbient가 새 오디오 시작 가능
    _ambDucked = false;
    showAmbientBadgeStopped(_ambCurrentMode);

    // ★ _ambFadeTo는 _ambAudio가 null이면 즉시 멈추므로, 페이드아웃은 로컬 인터벌로 처리
    if (_ambFadeId) { clearInterval(_ambFadeId); _ambFadeId = null; }
    const startVol = audio.volume;
    if (startVol <= 0 || fadeTime <= 0) { audio.pause(); return; }
    const steps = Math.max(1, Math.round((fadeTime * 1000) / 50));
    const delta = startVol / steps;   // 매 스텝 줄일 양
    let n = 0;
    const tid = setInterval(() => {
      n++;
      audio.volume = Math.max(0, startVol - delta * n);
      if (n >= steps) {
        clearInterval(tid);
        audio.volume = 0;
        audio.pause();
      }
    }, 50);
  }

  // ── 하단 바 표시/숨김 동기화 ────────────────────────────────
  function syncSidebarVisibility() {
    // right-sidebar는 헤더로 이동됨 — 아이콘 버튼 토글만 수행
    syncHdrIconButtons();
  }

  // ── 화자 배지 표시 (TTS 발화 시작 시 호출) ───────────────────
  function showVoiceBadge() {
    clearTimeout(_hideVoiceBadgeTimer);
    _hideVoiceBadgeTimer = null;
    updateActiveSpeakerBadge();          // 최신 화자 정보로 콘텐츠 갱신
    const badge = document.getElementById('vv-active-badge');
    if (badge && badge.style.display === 'none') {
      badge.style.display = 'flex';
      syncSidebarVisibility();
    }
  }

  // ── 화자 배지 지연 숨김 (TTS 발화 종료 시 호출, 문장 간격 커버용 1.5s 디바운스) ─
  function scheduleHideVoiceBadge(delay = 1500) {
    clearTimeout(_hideVoiceBadgeTimer);
    _hideVoiceBadgeTimer = setTimeout(() => {
      _hideVoiceBadgeTimer = null;
      if (!_ttsPaused) {
        const badge = document.getElementById('vv-active-badge');
        if (badge) {
          badge.style.display = 'none';
          syncSidebarVisibility();
        }
      }
    }, delay);
  }

  // ── 화자 배지 즉시 숨김 (명시적 중지 시 호출) ────────────────
  function hideVoiceBadgeNow() {
    clearTimeout(_hideVoiceBadgeTimer);
    _hideVoiceBadgeTimer = null;
    _ttsPaused = false;
    const badge = document.getElementById('vv-active-badge');
    if (badge) {
      badge.style.display = 'none';
      syncSidebarVisibility();
    }
  }

  // ── 배경음악 재생 배지 표시/숨기기 ───────────────────────────
  function showAmbientBadge(mode, file) {
    const badge = document.getElementById('ambient-music-badge');
    if (!badge) return;
    const isQuiz = mode === 'quiz';
    const label  = isQuiz ? '퀴즈 배경음' : '대화 배경음';
    const color  = isQuiz ? '#6366f1' : '#10b981';
    const icon   = isQuiz ? '🎮' : '🎵';
    // 트랙 이름에서 간단한 표시 이름 추출 (확장자·숫자 제거)
    const trackDisplay = file
      ? file.replace(/\.[^.]+$/, '').replace(/-\d+$/, '').replace(/[-_]/g, ' ').slice(0, 18)
      : '음악 재생 중';
    badge.innerHTML = `
      <div class="amb-badge-title">🎶 배경음악</div>
      <div class="amb-badge-body">
        <div class="amb-badge-icon" style="background:linear-gradient(135deg,${isQuiz?'#ede9fe,#ddd6fe':'#d1fae5,#a7f3d0'});border-color:${color}">${icon}</div>
        <div class="amb-badge-info">
          <div class="amb-badge-label">${label}</div>
          <div class="amb-badge-sub" style="color:${color}">▶ 재생 중</div>
        </div>
        <div class="amb-badge-waves">
          <div class="amb-wave-bar w1" style="background:${color}"></div>
          <div class="amb-wave-bar w2" style="background:${color}"></div>
          <div class="amb-wave-bar w3" style="background:${color}"></div>
          <div class="amb-wave-bar w4" style="background:${color}"></div>
          <div class="amb-wave-bar w5" style="background:${color}"></div>
        </div>
      </div>
      <div class="amb-badge-stop">⏹ 클릭하여 정지</div>`;
    badge.classList.remove('stopping');
    badge.style.display = 'flex';
    // 클릭 → 정지
    badge.onclick = () => stopAmbient(1.2);
    syncSidebarVisibility();
    updateHqAmbientLabel();
  }

  function hideAmbientBadge() {
    const badge = document.getElementById('ambient-music-badge');
    if (!badge) return;
    badge.classList.add('stopping');
    setTimeout(() => {
      if (badge.classList.contains('stopping')) {
        badge.style.display = 'none';
        badge.classList.remove('stopping');
        syncSidebarVisibility();
        updateHqAmbientLabel();
      }
    }, 600);
  }

  // ── 배경음 정지 상태 배지 (클릭 시 재시작 가능) ────────────
  function showAmbientBadgeStopped(mode) {
    const badge = document.getElementById('ambient-music-badge');
    if (!badge) return;
    const isQuiz = mode === 'quiz';
    const label  = isQuiz ? '퀴즈 배경음' : '대화 배경음';
    const icon   = isQuiz ? '🎮' : '🎵';
    badge.classList.remove('stopping');
    badge.innerHTML = `
      <div class="amb-badge-title">🎶 배경음악</div>
      <div class="amb-badge-body">
        <div class="amb-badge-icon" style="background:linear-gradient(135deg,#f1f5f9,#e2e8f0);border-color:#cbd5e1">${icon}</div>
        <div class="amb-badge-info">
          <div class="amb-badge-label">${label}</div>
          <div class="amb-badge-sub" style="color:#94a3b8">⏹ 정지됨</div>
        </div>
        <div class="amb-badge-restart">▶ 재시작</div>
      </div>`;
    badge.style.display = 'flex';
    badge.onclick = () => startAmbient('on', mode || 'dialogue');
    syncSidebarVisibility();
  }

  // ── duckAmbient: TTS 발화 시 배경음 낮추기 ───────────────────
  function duckAmbient() {
    if (!_ambAudio || _ambDucked) return;
    _ambDucked = true;
    _ambFadeTo(_ambAudio, _ambTargetVol() * 0.20, 300);
  }

  // ── unduckAmbient: TTS 끝나면 원래 볼륨으로 복귀 ─────────────
  function unduckAmbient() {
    if (!_ambAudio || !_ambDucked) return;
    _ambDucked = false;
    // 대화 진행 중이면 40% 수준으로 복귀, 아니면 100%
    const restoreVol = _ambDlgReduced ? _ambTargetVol() * 0.40 : _ambTargetVol();
    _ambFadeTo(_ambAudio, restoreVol, 700);
  }

  // ── 대화 모드 진입: 인트로 후 배경음 40%로 축소 ─────────────
  function enterDialogueMode() {
    _ambDlgReduced = true;
    if (_ambAudio && !_ambDucked) {
      _ambFadeTo(_ambAudio, _ambTargetVol() * 0.40, 1500);
    }
  }

  // ── 대화 모드 종료: 볼륨 올렸다가 4초 페이드아웃 ───────────
  function exitDialogueMode() {
    _ambDlgReduced = false;
    stopAmbientLoud();
  }

  // ── stopAmbientLoud: 인트로 볼륨까지 올린 뒤 4초 페이드아웃 ─
  function stopAmbientLoud() {
    if (!_ambAudio) return;
    const audio = _ambAudio;
    _ambAudio  = null;  // 즉시 null → 새 startAmbient 허용
    _ambDucked = false;
    hideAmbientBadge();
    if (_ambFadeId) { clearInterval(_ambFadeId); _ambFadeId = null; }

    const introVol  = Math.min(0.65, (state.prefs.ambientVolume ?? 0.18) * 2.5);
    const startVol  = audio.volume;
    const rampSteps = Math.max(1, Math.round(1200 / 50));
    const deltaUp   = (introVol - startVol) / rampSteps;
    let n = 0;
    // Phase 1: 볼륨 올리기 (1.2초)
    const tid1 = setInterval(() => {
      n++;
      audio.volume = Math.max(0, Math.min(1, startVol + deltaUp * n));
      if (n >= rampSteps) {
        clearInterval(tid1);
        // Phase 2: 4초 페이드아웃
        const outSteps = Math.max(1, Math.round(4000 / 50));
        const deltaOut = audio.volume / outSteps;
        let m = 0;
        const tid2 = setInterval(() => {
          m++;
          audio.volume = Math.max(0, audio.volume - deltaOut);
          if (m >= outSteps) { clearInterval(tid2); audio.volume = 0; audio.pause(); }
        }, 50);
      }
    }, 50);
  }

  // playAudio: 모든 발음이 완전히 끝날 때까지 대기하는 Promise 반환
  async function playAudio(kana) {
    if (!kana) return;
    duckAmbient();

    // ── VOICEVOX: 화자1 완전히 끝난 후 → 800ms → 화자2 완전히 끝난 후 resolve ──
    if (state.prefs.useVoicevox && voicevoxAvailable) {
      const s1 = state.prefs.voicevoxSpeaker1;
      const s2 = state.prefs.voicevoxSpeaker2;
      const hasS1 = s1 !== 'none' && s1 !== undefined && s1 !== null;
      const hasS2 = s2 !== 'none' && s2 !== undefined && s2 !== null;

      if (hasS1) {
        showSpeakingIndicator(s1, 1);
        const ok = await playVoicevox(kana, s1, /* wait= */ true); // 항상 완료 대기
        hideSpeakingIndicator();

        if (ok && hasS2 && !state.audioStopped) {
          await new Promise(r => setTimeout(r, 800));
          if (!state.audioStopped) {
            showSpeakingIndicator(s2, 2);
            await playVoicevox(kana, s2, /* wait= */ true); // 화자2도 완료 대기
            hideSpeakingIndicator();
          }
        }
        if (ok) return;
        // VOICEVOX 실패 → Web TTS fallback
      }
    }

    // ── Web Speech API: Promise로 감싸 완전히 끝날 때까지 대기 ──
    if (!window.speechSynthesis) {
      showToast('이 브라우저는 음성 합성을 지원하지 않습니다.');
      return;
    }
    window.speechSynthesis.cancel();

    const fIdx = state.prefs.voiceFemale;
    const mIdx = state.prefs.voiceMale;
    const voice1 = (fIdx !== 'none' && fIdx !== undefined) ? allJaVoices[parseInt(fIdx)] : null;
    const voice2 = (mIdx !== 'none' && mIdx !== undefined) ? allJaVoices[parseInt(mIdx)] : null;
    const charPref1 = state.prefs.charVoice1 || 'none';
    const charPref2 = state.prefs.charVoice2 || 'none';
    const cv1 = CHARACTER_VOICES.find(c => c.id === charPref1) || CHARACTER_VOICES[0];
    const cv2 = CHARACTER_VOICES.find(c => c.id === charPref2) || CHARACTER_VOICES[0];
    const webName1 = voice1 ? getVoiceDisplayName(voice1) : (cv1.id !== 'none' ? cv1.label : '음성1');
    const webName2 = voice2 ? getVoiceDisplayName(voice2) : (cv2.id !== 'none' ? cv2.label : '음성2');
    const hasWebV2 = voice2 || (charPref2 && charPref2 !== 'none');

    // Promise로 발음 완료까지 대기
    function speakAndWait(voice, pitch, rate, label, slot) {
      return new Promise((resolve) => {
        const utter = new SpeechSynthesisUtterance(kana);
        utter.lang  = 'ja-JP';
        if (voice) utter.voice = voice;
        utter.pitch = pitch;
        utter.rate  = rate;
        utter.onstart = () => showSpeakingIndicatorWeb(label, slot);
        utter.onend   = () => { hideSpeakingIndicator(); resolve(); };
        utter.onerror = () => { hideSpeakingIndicator(); resolve(); };
        window.speechSynthesis.speak(utter);
      });
    }

    await speakAndWait(voice1 || allJaVoices[0] || null, cv1.pitch, cv1.rate, webName1, 1);

    if (hasWebV2 && !state.audioStopped) {
      await new Promise(r => setTimeout(r, 800));
      if (!state.audioStopped) {
        await speakAndWait(voice2 || allJaVoices[0] || null, cv2.pitch, cv2.rate, webName2, 2);
      }
    }
    unduckAmbient();
  }

  // ─── 단일 화자 슬롯으로만 재생 (대화 모드 전용) ───
  // slot 1 = A (학습자), slot 2 = B (상대방)
  async function playAudioSlot(text, slot) {
    if (!text || state.audioStopped) return;
    duckAmbient();

    // VOICEVOX 모드
    if (state.prefs.useVoicevox && voicevoxAvailable) {
      const sid = slot === 1 ? state.prefs.voicevoxSpeaker1 : state.prefs.voicevoxSpeaker2;
      // 슬롯2 미설정 시 슬롯1로 폴백
      const useSid = (sid === 'none' || sid === undefined || sid === null)
                     ? state.prefs.voicevoxSpeaker1 : sid;
      if (useSid !== 'none' && useSid !== undefined && useSid !== null) {
        showSpeakingIndicator(useSid, slot);
        await playVoicevox(text, useSid, true);
        hideSpeakingIndicator();
        unduckAmbient();
        return;
      }
    }

    // Web TTS 모드
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const vIdx   = slot === 1 ? state.prefs.voiceFemale : state.prefs.voiceMale;
    const charId = slot === 1 ? (state.prefs.charVoice1 || 'none') : (state.prefs.charVoice2 || 'none');
    const cv     = CHARACTER_VOICES.find(c => c.id === charId) || CHARACTER_VOICES[0];

    // 슬롯2 미설정이면 슬롯1 설정으로 폴백
    const useVIdx   = (slot === 2 && (vIdx === 'none' || vIdx === undefined) && charId === 'none')
                      ? state.prefs.voiceFemale : vIdx;
    const useCv     = (slot === 2 && charId === 'none')
                      ? (CHARACTER_VOICES.find(c => c.id === (state.prefs.charVoice1||'none')) || CHARACTER_VOICES[0])
                      : cv;

    const voice = (useVIdx !== 'none' && useVIdx !== undefined)
                  ? allJaVoices[parseInt(useVIdx)] : (allJaVoices[0] || null);

    const avatarInfo = buildSlotAvatarHtml(slot);
    const label = avatarInfo?.name || (slot === 1 ? 'A' : 'B');

    await new Promise((resolve) => {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang  = 'ja-JP';
      if (voice) utter.voice = voice;
      utter.pitch = useCv.pitch || 1.0;
      utter.rate  = useCv.rate  || 0.8;
      utter.onstart = () => showSpeakingIndicatorWeb(label, slot);
      utter.onend   = () => { hideSpeakingIndicator(); unduckAmbient(); resolve(); };
      utter.onerror = () => { hideSpeakingIndicator(); unduckAmbient(); resolve(); };
      window.speechSynthesis.speak(utter);
    });
  }

  // 화자 슬롯 설정 여부 확인
  function hasSpeakerConfigured(slot) {
    if (state.prefs.useVoicevox && voicevoxAvailable) {
      const sid = slot === 1 ? state.prefs.voicevoxSpeaker1 : state.prefs.voicevoxSpeaker2;
      return sid !== 'none' && sid !== undefined && sid !== null;
    }
    const vIdx   = slot === 1 ? state.prefs.voiceFemale : state.prefs.voiceMale;
    const charId = slot === 1 ? (state.prefs.charVoice1 || 'none') : (state.prefs.charVoice2 || 'none');
    if (slot === 1) return true; // 슬롯1은 항상 브라우저 기본 TTS라도 사용 가능
    return (vIdx !== 'none' && vIdx !== undefined) || charId !== 'none';
  }

  // ─── 발화 인디케이터 (어떤 캐릭터가 지금 말하는지) ───
  // 우측 배지 — 발음 중인 슬롯 애니메이션
  function highlightBadgeSlot(slot) {
    const badge = document.getElementById('vv-active-badge');
    if (!badge) return;
    // 모든 슬롯 초기화
    badge.querySelectorAll('.vvb-item').forEach(el => {
      el.classList.remove('speaking', 'speaking-2');
    });
    // 해당 슬롯만 강조
    const target = badge.querySelector(`[data-slot="${slot}"]`);
    if (target) target.classList.add(slot === 2 ? 'speaking-2' : 'speaking');
  }

  function clearBadgeSlot() {
    const badge = document.getElementById('vv-active-badge');
    if (!badge) return;
    badge.querySelectorAll('.vvb-item').forEach(el => {
      el.classList.remove('speaking', 'speaking-2');
    });
  }

  // 발음 시작 — 배지 표시 + 슬롯 애니메이션
  function showSpeakingIndicator(speakerId, slot) {
    showVoiceBadge();         // 배지 표시 (이미 표시 중이면 타이머 취소만)
    highlightBadgeSlot(slot);
  }

  function showSpeakingIndicatorWeb(label, slot) {
    showVoiceBadge();
    highlightBadgeSlot(slot);
  }

  // 발음 종료 — 슬롯 애니메이션 해제 + 배지 지연 숨김 (1.5s 디바운스)
  function hideSpeakingIndicator() {
    clearBadgeSlot();
    scheduleHideVoiceBadge(1500);  // 다음 문장이 오면 타이머가 취소됨
  }

  // ─── 효과음 (간단한 Web Audio) ───
  function playCorrectSound() {
    try {
      const ac = new AudioContext();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain); gain.connect(ac.destination);
      osc.frequency.setValueAtTime(523, ac.currentTime);
      osc.frequency.setValueAtTime(659, ac.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3);
      osc.start(); osc.stop(ac.currentTime + 0.3);
    } catch (e) {}
  }

  function playWrongSound() {
    try {
      const ac = new AudioContext();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain); gain.connect(ac.destination);
      osc.frequency.setValueAtTime(300, ac.currentTime);
      osc.frequency.setValueAtTime(200, ac.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3);
      osc.start(); osc.stop(ac.currentTime + 0.3);
    } catch (e) {}
  }

  // ─── 단어 학습 (4·5단계) ───

  // ─── かなマスター: 레벨 선택 패널 ───
  function setupKanaSelectView() {
    const panel = document.getElementById('kana-select-panel');
    if (!panel) return;
    const fa = document.getElementById('flashcard-area');
    const ba = document.getElementById('browse-area');
    if (fa) fa.style.display = 'none';
    if (ba) ba.style.display = 'none';
    panel.style.display = 'block';
    // 풀카드 그리드 렌더 (이미 렌더됐으면 스킵)
    const grid = document.getElementById('kana-select-grid');
    if (grid) renderFullLevelGrid(grid);
    const reviewBtn = document.getElementById('kana-review-btn');
    if (reviewBtn) reviewBtn.onclick = () => App.startReview();
  }

  function setupVocabView() {
    const section = state.vocabSection || 'word';

    // 패널 상태 초기화
    document.getElementById('vocab-setup').style.display = 'block';
    document.getElementById('vocab-flash-panel').style.display = 'none';
    const browseArea = document.getElementById('vocab-browse-area');
    if (browseArea) browseArea.style.display = 'none';
    const dialogueArea = document.getElementById('vocab-dialogue-area');
    if (dialogueArea) dialogueArea.style.display = 'none';
    const vfb = document.getElementById('vocab-flash-back');
    if (vfb) vfb.onclick = vocabBackToSetup;

    // 헤더 제목 + 섹션 표시 전환
    const titleMap = { word: '語彙マスター', sentence: '会話マスター', sim: '実戦ロールプレイ' };
    const titleEl = document.getElementById('vocab-section-title');
    if (titleEl) titleEl.textContent = titleMap[section] || '語彙マスター';

    ['word', 'sentence', 'sim'].forEach(sec => {
      const el = document.getElementById(`vocab-${sec === 'sentence' ? 'sent' : sec}-section`);
      if (el) el.style.display = sec === section ? 'block' : 'none';
    });

    // 해당 섹션 카테고리 렌더
    renderVocabSection(section);
  }

  function renderVocabSection(section) {
    if (section === 'word') {
      const container = document.getElementById('vocab-word-levels-main');
      if (!container || container.children.length > 0) return; // 이미 렌더됨
      container.innerHTML = '';
      const cats = VOCAB_CATEGORIES.filter(c => c.type === 'word');
      const levels = [...new Set(cats.map(c => c.wlevel))].sort((a, b) => a - b);
      levels.forEach(lv => {
        const lvCats = cats.filter(c => c.wlevel === lv);
        container.appendChild(buildLevelRow(lv, 'W', lvCats));
      });
    } else if (section === 'sentence') {
      const container = document.getElementById('vocab-sentence-levels-main');
      if (!container || container.children.length > 0) return;
      container.innerHTML = '';
      const cats = VOCAB_CATEGORIES.filter(c => c.type === 'sentence');
      const levels = [...new Set(cats.map(c => c.slevel).filter(Boolean))].sort((a, b) => a - b);
      levels.forEach(lv => {
        const lvCats = cats.filter(c => c.slevel === lv);
        container.appendChild(buildLevelRow(lv, 'S', lvCats));
      });
    } else if (section === 'sim') {
      const container = document.getElementById('vocab-sim-levels-main');
      if (!container || container.children.length > 0) return;
      container.innerHTML = '';
      const simGroupLabels = {
        1: '교통편', 2: '식사편', 3: '숙박편', 4: '쇼핑편', 5: '관광·문화', 6: '부부 여행편'
      };
      const cats = VOCAB_CATEGORIES.filter(c => c.type === 'sim');
      const levels = [...new Set(cats.map(c => c.simlevel))].sort((a, b) => a - b);
      levels.forEach(lv => {
        const lvCats = cats.filter(c => c.simlevel === lv);
        const label = simGroupLabels[lv] || `Sim ${lv}`;
        container.appendChild(buildLevelRow(lv, label, lvCats));
      });
    }
  }

  // 구 phase 기반 렌더 (하위 호환용 — vocab-cat-grid-N 컨테이너가 있으면 채움)
  function renderVocabCategories() {
    [3, 4, 5, 6, 7, 8, 9, 10].forEach(phase => {
      const grid = document.getElementById(`vocab-cat-grid-${phase}`);
      if (!grid) return;
      grid.innerHTML = '';
      VOCAB_CATEGORIES.filter(c => c.phase === phase).forEach(cat => {
        grid.appendChild(buildVocabCatCard(cat));
      });
    });
  }

  // 단어 카드 HTML 생성 (공통)
  function buildVocabCatCard(cat) {
    const prog = getVocabCategoryProgress(cat.id);
    const card = document.createElement('div');
    card.className = 'vocab-cat-card' + (cat.type === 'sim' ? ' sim-card' : '');

    // 롤플레이(dialogue:true) 카테고리는 별도 버튼
    if (cat.dialogue) {
      card.innerHTML = `
        <div class="vcc-icon">${cat.icon}</div>
        <div class="vcc-name">${cat.name}</div>
        <div class="vcc-sub">${cat.subtitle || ''}</div>
        <div class="vcc-desc">${cat.desc || ''}</div>
        <div class="vcc-prog-bar"><div class="vcc-prog-fill" style="width:${prog}%"></div></div>
        <div class="vcc-prog-text">${cat.items.length}개 대사</div>
        <div class="vcc-actions">
          <button class="vcc-btn vcc-btn-dialogue" data-cid="${cat.id}">🎭 대화 시작</button>
        </div>`;
      card.querySelector('.vcc-btn-dialogue').addEventListener('click', (e) => {
        e.stopPropagation(); showView('vocab');
        setTimeout(() => startVocabCategory(cat.id, 'dialogue'), 100);
      });
    } else {
      card.innerHTML = `
        <div class="vcc-icon">${cat.icon}</div>
        <div class="vcc-name">${cat.name}</div>
        <div class="vcc-sub">${cat.subtitle || ''}</div>
        <div class="vcc-prog-bar"><div class="vcc-prog-fill" style="width:${prog}%"></div></div>
        <div class="vcc-prog-text">${prog}% · ${cat.items.length}개</div>
        <div class="vcc-actions">
          <button class="vcc-btn vcc-btn-flash" data-cid="${cat.id}">📚 학습</button>
          <button class="vcc-btn vcc-btn-browse" data-cid="${cat.id}">📖 일람</button>
          <button class="vcc-btn vcc-btn-quiz" data-cid="${cat.id}">✏️ 퀴즈</button>
        </div>`;
      card.querySelector('.vcc-btn-flash').addEventListener('click', (e) => {
        e.stopPropagation(); showView('vocab');
        setTimeout(() => startVocabCategory(cat.id, 'flash'), 100);
      });
      card.querySelector('.vcc-btn-browse').addEventListener('click', (e) => {
        e.stopPropagation(); showView('vocab');
        setTimeout(() => startVocabCategory(cat.id, 'browse'), 100);
      });
      card.querySelector('.vcc-btn-quiz').addEventListener('click', (e) => {
        e.stopPropagation(); showView('vocab');
        setTimeout(() => startVocabCategory(cat.id, 'quiz'), 100);
      });
    }
    return card;
  }

  // 레벨 행 생성 (레벨 번호 배지 + 카드 그리드)
  // trackLabel: 'W'/'S' 등 단일 문자 prefix, 또는 '교통편' 같은 완성형 라벨
  function buildLevelRow(levelNum, trackLabel, cats) {
    const row = document.createElement('div');
    row.className = 'vocab-level-row';
    // 완성형 라벨(한국어 등)이면 번호를 붙이지 않음
    const isFull = /[^\x00-\x7F]/.test(trackLabel); // 비ASCII 포함 여부
    const badge = isFull ? trackLabel : `${trackLabel}${levelNum}`;
    const gridId = `vlg-${trackLabel.replace(/\s/g,'')}-${levelNum}`;
    row.innerHTML = `
      <div class="vocab-level-heading">
        <span class="vocab-level-badge">${badge}</span>
        <span class="vocab-level-title">${cats.map(c => c.name).join(' · ')}</span>
      </div>
      <div class="vocab-cat-grid" id="${gridId}"></div>`;
    const grid = row.querySelector('.vocab-cat-grid');
    cats.forEach(cat => grid.appendChild(buildVocabCatCard(cat)));
    return row;
  }

  function renderHomeVocabCards() {
    // ── 단어 학습 (W1~W8) ──
    const wordContainer = document.getElementById('vocab-word-levels');
    if (wordContainer) {
      wordContainer.innerHTML = '';
      const wordCats = VOCAB_CATEGORIES.filter(c => c.type === 'word');
      const wLevels = [...new Set(wordCats.map(c => c.wlevel))].sort((a,b)=>a-b);
      wLevels.forEach(lv => {
        const cats = wordCats.filter(c => c.wlevel === lv);
        wordContainer.appendChild(buildLevelRow(lv, 'W', cats));
      });
    }

    // ── 문장 학습 (S1~S6) ──
    const sentContainer = document.getElementById('vocab-sentence-levels');
    if (sentContainer) {
      sentContainer.innerHTML = '';
      const sentCats = VOCAB_CATEGORIES.filter(c => c.type === 'sentence' || (c.slevel && c.type !== 'sim'));
      const sLevels = [...new Set(sentCats.map(c => c.slevel).filter(Boolean))].sort((a,b)=>a-b);
      sLevels.forEach(lv => {
        const cats = sentCats.filter(c => c.slevel === lv);
        sentContainer.appendChild(buildLevelRow(lv, 'S', cats));
      });
    }

    // ── 실전 연습 (교통·식사·숙박·쇼핑·관광 5그룹) ──
    const simContainer = document.getElementById('vocab-sim-levels');
    if (simContainer) {
      simContainer.innerHTML = '';
      const simGroupLabels = {
        1: '교통편', 2: '식사편', 3: '숙박편', 4: '쇼핑편', 5: '관광·문화', 6: '부부 여행편'
      };
      const simCats = VOCAB_CATEGORIES.filter(c => c.type === 'sim');
      const simLevels = [...new Set(simCats.map(c => c.simlevel))].sort((a,b)=>a-b);
      simLevels.forEach(lv => {
        const cats = simCats.filter(c => c.simlevel === lv);
        const label = simGroupLabels[lv] || `Sim ${lv}`;
        simContainer.appendChild(buildLevelRow(lv, label, cats));
      });
    }
  }

  // ─── 오늘의 문장 ───
  const DAILY_SENTENCES = [
    { jp: '今日もいい天気ですね。',       kr: '오늘도 날씨가 좋네요.' },
    { jp: 'ありがとうございます。',        kr: '감사합니다.' },
    { jp: 'すみません、駅はどこですか？', kr: '저기요, 역이 어디인가요?' },
    { jp: 'これをひとつください。',        kr: '이것 하나 주세요.' },
    { jp: 'お会計をお願いします。',        kr: '계산해 주세요.' },
    { jp: '日本語を勉強しています。',      kr: '일본어를 공부하고 있어요.' },
    { jp: 'もう一度言ってください。',      kr: '다시 한 번 말해 주세요.' },
    { jp: '写真を撮ってもいいですか？',    kr: '사진 찍어도 되나요?' },
    { jp: 'おいしいですね！',              kr: '맛있네요!' },
    { jp: 'このあたりに観光地はありますか？', kr: '이 근처에 관광지가 있나요?' },
    { jp: 'トイレはどこですか？',          kr: '화장실이 어디예요?' },
    { jp: '少し待ってください。',          kr: '잠깐 기다려 주세요.' },
    { jp: 'いくらですか？',               kr: '얼마예요?' },
    { jp: 'カードで払えますか？',          kr: '카드로 결제할 수 있나요?' },
    { jp: '迷子になってしまいました。',    kr: '길을 잃어버렸어요.' },
    { jp: '〜まで行ってください。',        kr: '〜까지 가 주세요.' },
    { jp: '日本は初めてですか？',          kr: '일본은 처음이에요?' },
    { jp: 'よい旅を！',                   kr: '좋은 여행 되세요!' },
    { jp: '荷物を預かってもらえますか？',  kr: '짐을 맡아주실 수 있나요?' },
    { jp: 'チェックインをお願いします。',  kr: '체크인 부탁드립니다.' },
    { jp: '何がおすすめですか？',          kr: '뭐가 추천인가요?' },
    { jp: '英語は話せますか？',            kr: '영어를 할 수 있나요?' },
    { jp: '領収書をください。',            kr: '영수증 주세요.' },
    { jp: '電車は何時に来ますか？',        kr: '전철은 몇 시에 오나요?' },
    { jp: '近くにコンビニはありますか？',  kr: '근처에 편의점이 있나요?' },
    { jp: '予約をしたいです。',            kr: '예약을 하고 싶어요.' },
    { jp: '温めてください。',              kr: '데워 주세요.' },
    { jp: 'お土産を探しています。',        kr: '기념품을 찾고 있어요.' },
    { jp: 'バスは何番ですか？',            kr: '버스가 몇 번이에요?' },
    { jp: 'もっとゆっくり話してください。', kr: '좀 더 천천히 말해 주세요.' },
  ];

  let _lastSentenceIdx = -1;
  function renderDailySentence() {
    const el   = document.getElementById('hero-sentence');
    const krEl = document.getElementById('hero-translation');
    if (!el || !krEl) return;
    // 이전과 다른 랜덤 인덱스 선택
    let idx;
    do { idx = Math.floor(Math.random() * DAILY_SENTENCES.length); }
    while (idx === _lastSentenceIdx && DAILY_SENTENCES.length > 1);
    _lastSentenceIdx = idx;
    const s = DAILY_SENTENCES[idx];
    el.textContent = s.jp;
    el.onclick = () => playAudio(s.jp);
    krEl.textContent = s.kr;

    // 새로고침 버튼 연결 (초기 1회만)
    const refreshBtn = document.getElementById('hero-refresh-btn');
    if (refreshBtn && !refreshBtn._bound) {
      refreshBtn._bound = true;
      refreshBtn.onclick = (e) => {
        e.stopPropagation();
        refreshBtn.classList.add('spinning');
        setTimeout(() => refreshBtn.classList.remove('spinning'), 500);
        renderDailySentence();
      };
    }
  }

  function startVocabCategory(catId, mode) {
    trackActivity('vocab', catId);
    const cat = VOCAB_CATEGORIES.find(c => c.id === catId);
    if (!cat) return;
    state.vocabCurrentCategoryId = catId;
    state.vocabItems = getVocabCategoryItems(catId);
    state.vocabIndex = 0;
    state.vocabFlipped = false;
    state.vocabMode = null;
    // 카테고리 타입에 맞는 섹션 상태 저장 (뒤로가기 복귀용) + nav 하이라이트 동기화
    const typeNavMap = { word: 'vocab', sentence: 'convo', sim: 'roleplay' };
    if (cat.type === 'word')          state.vocabSection = 'word';
    else if (cat.type === 'sentence') state.vocabSection = 'sentence';
    else if (cat.type === 'sim')      state.vocabSection = 'sim';
    const navTarget = typeNavMap[cat.type] || 'vocab';
    state.currentView = navTarget;
    document.querySelectorAll('.nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.view === navTarget);
    });

    document.getElementById('vocab-cat-name').textContent = `${cat.icon} ${cat.name}`;
    document.getElementById('vocab-cat-subtitle').textContent = cat.subtitle;

    document.getElementById('vocab-setup').style.display = 'none';
    document.getElementById('vocab-flashcard-area').style.display = 'none';
    document.getElementById('vocab-quiz-area').style.display = 'none';
    const browseArea = document.getElementById('vocab-browse-area');
    if (browseArea) browseArea.style.display = 'none';
    const dialogueArea = document.getElementById('vocab-dialogue-area');
    if (dialogueArea) dialogueArea.style.display = 'none';

    const targetMode = mode || (cat.dialogue ? 'dialogue' : 'flash');
    // flash-panel은 항상 표시, 대화 모드에서만 learn-header(제목+카운터) 숨김
    document.getElementById('vocab-flash-panel').style.display = 'block';
    const learnHdr = document.querySelector('#vocab-flash-panel .learn-header');
    if (learnHdr) learnHdr.style.display = targetMode === 'dialogue' ? 'none' : '';

    if (targetMode === 'dialogue') {
      state.vocabMode = 'dialogue';
      if (dialogueArea) dialogueArea.style.display = 'block';
      renderSimDialogue(cat);
    } else if (targetMode === 'quiz') {
      state.vocabMode = 'quiz';
      document.getElementById('vocab-quiz-area').style.display = 'block';
      startVocabQuiz();
    } else if (targetMode === 'browse') {
      state.vocabMode = 'browse';
      if (browseArea) browseArea.style.display = 'block';
      renderVocabBrowse();
    } else {
      state.vocabMode = 'flash';
      state.vocabIndex = 0;
      state.vocabFlipped = false;
      document.getElementById('vocab-flashcard-area').style.display = 'block';
      renderNavStrip('vfc-nav-strip', state.vocabItems, 0, (idx) => {
        state.vocabIndex = idx; showVocabFlashcard();
      });
      showVocabFlashcard();
      setupVocabFlashcardControls();
    }
  }

  // ─── 롤플레이 인트로 화면 (음악 10초 + 장소 설명) ───
  async function playDialogueIntro(cat, items, container) {
    return new Promise(resolve => {
      if (state.audioStopped) { resolve(); return; }

      // 첫 번째 N 아이템에서 장소·장면 설명 추출
      const nItem     = items.find(it => it.speaker === 'N');
      const sceneText = nItem ? nItem.korean : (cat.desc || '');
      const subText   = cat.subtitle || '';

      const intro = document.createElement('div');
      intro.className = 'dlg-intro';
      intro.innerHTML = `
        <div class="dlg-intro-bg"></div>
        <div class="dlg-intro-inner">
          <div class="dlg-intro-icon">${cat.icon || '🎭'}</div>
          <div class="dlg-intro-scene">${sceneText}</div>
          <div class="dlg-intro-title">${cat.name}</div>
          ${subText ? `<div class="dlg-intro-sub">${subText}</div>` : ''}
          <div class="dlg-intro-bar-wrap">
            <div class="dlg-intro-bar"><div class="dlg-intro-progress"></div></div>
          </div>
          <div class="dlg-intro-skip">▶ 클릭하면 바로 시작</div>
        </div>`;
      container.appendChild(intro);

      // 진행바 10초 애니 (약간 딜레이 후 시작)
      const progressEl = intro.querySelector('.dlg-intro-progress');
      setTimeout(() => {
        progressEl.style.transition = 'width 10s linear';
        progressEl.style.width = '100%';
      }, 80);

      const doResolve = () => {
        if (intro._resolved) return;
        intro._resolved = true;
        // 인트로 화면 완전 제거 (컴팩트 헤더 불필요)
        intro.remove();
        resolve();
      };

      // 10초 후 자동 진행
      const tid = setTimeout(doResolve, 10000);

      // 클릭하면 즉시 진행
      intro.addEventListener('click', () => { clearTimeout(tid); doResolve(); });
    });
  }

  // ─── 롤플레이 대화 렌더링 ───
  function renderSimDialogue(cat) {
    const dialogueArea = document.getElementById('vocab-dialogue-area');
    const container    = document.getElementById('sim-dialogue-bubbles');
    const playBtn      = document.getElementById('dlg-play-btn');
    if (!container || !dialogueArea) return;

    // 변형이 있으면 랜덤으로 기본 선택, 없으면 기본 items 사용
    const NUM_ICONS = ['①','②','③','④','⑤'];
    let selectedIdx  = cat.variants && cat.variants.length
                       ? Math.floor(Math.random() * cat.variants.length) : -1;
    let items = selectedIdx >= 0
      ? cat.variants[selectedIdx].items.map(id => VOCAB_MAP[id]).filter(Boolean)
      : cat.items.map(id => VOCAB_MAP[id]).filter(Boolean);
    const variant = selectedIdx >= 0
      ? { scene: cat.variants[selectedIdx].scene, idx: selectedIdx + 1, total: cat.variants.length }
      : null;
    const hasSlot1 = hasSpeakerConfigured(1);
    const hasSlot2 = hasSpeakerConfigured(2);
    const slot1Info = buildSlotAvatarHtml(1);
    const slot2Info = buildSlotAvatarHtml(2);

    // ── 스플래시 화면 구성 ──
    container.innerHTML = '';
    if (playBtn) playBtn.style.display = 'none';

    const splash = document.createElement('div');
    splash.className = 'dlg-splash';
    splash.id = 'dlg-splash';

    // 카테고리 제목 + 총 대사 수
    splash.innerHTML = `
      <div class="dlg-splash-title">${cat.icon || '🎭'} ${cat.name}
        <span class="dlg-splash-count">총 ${items.length}개 대사</span>
      </div>
      <div class="dlg-splash-desc">${cat.desc || cat.subtitle || ''}</div>
      <div class="dlg-splash-actors">
        <div class="dlg-actor dlg-actor-A">
          <div class="dlg-actor-avatar">${slot1Info ? slot1Info.avatarHtml : '<div class="vvb-avatar-emoji">🔊</div>'}</div>
          <div class="dlg-actor-role">나 (A)</div>
          <div class="dlg-actor-name">${slot1Info ? slot1Info.name : '기본 TTS'}</div>
        </div>
        <div class="dlg-actor-vs">VS</div>
        <div class="dlg-actor dlg-actor-B">
          <div class="dlg-actor-avatar">${slot2Info ? slot2Info.avatarHtml : '<div class="vvb-avatar-emoji">🎙️</div>'}</div>
          <div class="dlg-actor-role">상대방 (B)</div>
          <div class="dlg-actor-name">${slot2Info ? slot2Info.name : (hasSlot1 ? '(A와 동일)' : '기본 TTS')}</div>
        </div>
      </div>`;

    // 배경음 토글 버튼 (MP3 파일 있을 때만 표시)
    if (_ambTracks.length) {
      const ambientBar = document.createElement('div');
      ambientBar.className = 'dlg-ambient-bar';
      const _isOn = state.prefs.ambientDialogue === 'on';
      ambientBar.innerHTML = `<span class="dlg-ambient-label">🎵 배경음</span>
        <button class="dlg-amb-chip${_isOn ? ' active' : ''}" id="dlg-amb-toggle">
          ${_isOn ? '🔊 켜짐' : '🔇 꺼짐'}
        </button>`;
      ambientBar.querySelector('#dlg-amb-toggle').onclick = (e) => {
        const btn = e.currentTarget;
        const nowOn = !btn.classList.contains('active');
        btn.classList.toggle('active', nowOn);
        btn.textContent = nowOn ? '🔊 켜짐' : '🔇 꺼짐';
        state.prefs.ambientDialogue = nowOn ? 'on' : 'none';
        saveToStorage();
      };
      splash.appendChild(ambientBar);
    }

    // ── 시나리오 선택 칩 (변형이 2개 이상인 경우) ──
    if (cat.variants && cat.variants.length > 1) {
      const selectorDiv = document.createElement('div');
      selectorDiv.className = 'dlg-variant-selector';
      const label = document.createElement('div');
      label.className = 'dlg-vs-label';
      label.textContent = '🎲 시나리오 선택';
      selectorDiv.appendChild(label);
      const chipsRow = document.createElement('div');
      chipsRow.className = 'dlg-vs-chips';
      cat.variants.forEach((v, i) => {
        const chip = document.createElement('button');
        chip.className = 'dlg-vs-chip' + (i === selectedIdx ? ' active' : '');
        chip.textContent = `${NUM_ICONS[i] || (i+1)} ${v.scene}`;
        chip.onclick = () => {
          chipsRow.querySelectorAll('.dlg-vs-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          selectedIdx = i;
          items = cat.variants[i].items.map(id => VOCAB_MAP[id]).filter(Boolean);
        };
        chipsRow.appendChild(chip);
      });
      selectorDiv.appendChild(chipsRow);
      splash.appendChild(selectorDiv);
    }

    // 음성 미설정 경고
    if (!hasSlot1) {
      const warn = document.createElement('div');
      warn.className = 'dlg-splash-warn';
      warn.innerHTML = `⚠️ 음성이 설정되지 않았습니다.<br>설정에서 음성을 선택하면 각 화자에게 다른 목소리가 할당됩니다.
        <br><button class="dlg-settings-btn" id="dlg-open-settings">⚙️ 설정 열기</button>`;
      splash.appendChild(warn);
    } else if (!hasSlot2) {
      const note = document.createElement('div');
      note.className = 'dlg-splash-note';
      note.textContent = '💡 두 번째 음성이 없으면 A/B 모두 같은 목소리로 재생됩니다.';
      splash.appendChild(note);
    }

    // ── 스크립트 미리보기 (접기/펼치기) ──
    const preview = document.createElement('details');
    preview.className = 'dlg-preview';
    const previewSummary = document.createElement('summary');
    previewSummary.className = 'dlg-preview-toggle';
    previewSummary.textContent = `📜 스크립트 미리보기`;
    preview.appendChild(previewSummary);
    const previewList = document.createElement('div');
    previewList.className = 'dlg-preview-list';
    const MAX_PREVIEW = 40;
    items.slice(0, MAX_PREVIEW).forEach(item => {
      if (!item) return;
      const row = document.createElement('div');
      row.className = `dlg-preview-row dlg-preview-${item.speaker || 'N'}`;
      const spkrIcon = item.speaker === 'N' ? '🎬' : item.speaker === 'B' ? '💭' : '💬';
      const jpText = resolveNames(item.japanese || item.jp || '');
      const krText = resolveNames(item.korean  || item.kr  || '');
      row.innerHTML = `<span class="dlg-preview-spkr">${spkrIcon}</span><span class="dlg-preview-jp">${jpText}</span>`;
      if (krText) {
        const kr = document.createElement('div');
        kr.className = 'dlg-preview-kr';
        kr.textContent = krText;
        row.appendChild(kr);
      }
      previewList.appendChild(row);
    });
    if (items.length > MAX_PREVIEW) {
      const more = document.createElement('div');
      more.className = 'dlg-preview-more';
      more.textContent = `… +${items.length - MAX_PREVIEW}개`;
      previewList.appendChild(more);
    }
    preview.appendChild(previewList);
    splash.appendChild(preview);

    // ── 버튼 행: 목록 + 시작 ──
    const btnRow = document.createElement('div');
    btnRow.className = 'dlg-splash-btn-row';
    const listBtn = document.createElement('button');
    listBtn.className = 'dlg-list-btn';
    listBtn.textContent = '☰ 목록';
    listBtn.addEventListener('click', () => {
      showView('roleplay');
    });
    const startBtn = document.createElement('button');
    startBtn.className = 'dlg-start-btn';
    startBtn.textContent = '▶ 시작';
    btnRow.appendChild(listBtn);
    btnRow.appendChild(startBtn);
    splash.appendChild(btnRow);

    container.appendChild(splash);

    const backBtn = null; // 스플래시 내 별도 뒤로 버튼 제거 — dlg-controls 내 #dlg-back-btn 사용

    // ── 화자 선택 드롭다운 (스플래시 화면 내 인라인 변경) ──
    function refreshActorDisplay(slotNum) {
      const sel = slotNum === 1 ? '.dlg-actor-A' : '.dlg-actor-B';
      const actorEl = splash.querySelector(sel);
      if (!actorEl) return;
      const newInfo = buildSlotAvatarHtml(slotNum);
      const avatarEl = actorEl.querySelector('.dlg-actor-avatar');
      const nameEl   = actorEl.querySelector('.dlg-actor-name');
      if (avatarEl) avatarEl.innerHTML = newInfo
        ? newInfo.avatarHtml
        : (slotNum === 1 ? '<div class="vvb-avatar-emoji">🔊</div>' : '<div class="vvb-avatar-emoji">🎙️</div>');
      if (nameEl) nameEl.textContent = newInfo ? newInfo.name : (slotNum === 1 ? '기본 TTS' : '(미설정)');
      updateActiveSpeakerBadge();
    }

    function buildSplashSpeakerPicker(slotNum) {
      const sel = slotNum === 1 ? '.dlg-actor-A' : '.dlg-actor-B';
      const actorEl = splash.querySelector(sel);
      if (!actorEl) return;
      const useVV = state.prefs.useVoicevox && voicevoxAvailable;
      const picker = document.createElement('select');
      picker.className = 'dlg-speaker-pick';

      if (useVV && voicevoxSpeakers.length) {
        const curId = slotNum === 1 ? state.prefs.voicevoxSpeaker1 : state.prefs.voicevoxSpeaker2;
        if (slotNum === 2) {
          const nOpt = document.createElement('option');
          nOpt.value = 'none'; nOpt.textContent = '— 사용 안함 —';
          if (curId === 'none') nOpt.selected = true;
          picker.appendChild(nOpt);
        }
        voicevoxSpeakers.forEach(sp => {
          const opt = document.createElement('option');
          opt.value = sp.id; opt.textContent = sp.name;
          if (String(sp.id) === String(curId)) opt.selected = true;
          picker.appendChild(opt);
        });
        picker.onchange = () => {
          const val = picker.value === 'none' ? 'none' : parseInt(picker.value);
          if (slotNum === 1) state.prefs.voicevoxSpeaker1 = val;
          else               state.prefs.voicevoxSpeaker2 = val;
          saveToStorage();
          refreshActorDisplay(slotNum);
        };
      } else if (allJaVoices.length) {
        const curV = slotNum === 1 ? state.prefs.voiceFemale : state.prefs.voiceMale;
        const nOpt = document.createElement('option');
        nOpt.value = 'none'; nOpt.textContent = '— 사용 안함 —';
        if (!curV || curV === 'none') nOpt.selected = true;
        picker.appendChild(nOpt);
        allJaVoices.forEach((v, i) => {
          const opt = document.createElement('option');
          opt.value = String(i); opt.textContent = getVoiceDisplayName(v);
          if (String(i) === String(curV)) opt.selected = true;
          picker.appendChild(opt);
        });
        picker.onchange = () => {
          if (slotNum === 1) state.prefs.voiceFemale = picker.value;
          else               state.prefs.voiceMale   = picker.value;
          saveToStorage();
          refreshActorDisplay(slotNum);
        };
      } else {
        return; // 선택할 화자 없음
      }
      actorEl.appendChild(picker);
    }
    buildSplashSpeakerPicker(1);
    buildSplashSpeakerPicker(2);

    // 설정 열기 버튼
    const settingsBtn = splash.querySelector('#dlg-open-settings');
    if (settingsBtn) {
      settingsBtn.onclick = () => {
        document.getElementById('settings-modal').style.display = 'flex';
      };
    }

    // 스플래시 중 대화 컨트롤 버튼 숨김 (스플래시 내 목록 버튼 사용)
    const ctrlListBtnInit = document.getElementById('dlg-back-btn');
    const nextBtn = document.getElementById('dlg-next-btn');
    if (ctrlListBtnInit) ctrlListBtnInit.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';

    // 시작 버튼 → 인트로 10초 → 인트로 컴팩트 헤더로 전환 → 대화 시작
    startBtn.onclick = async () => {
      splash.remove();
      container.innerHTML = '';
      state.audioStopped = false;

      // 목록 버튼: 롤플레이 목록으로 이동
      const ctrlListBtn = document.getElementById('dlg-back-btn');
      if (ctrlListBtn) {
        ctrlListBtn.style.display = '';
        ctrlListBtn.textContent = '☰ 목록';
        ctrlListBtn.onclick = () => {
          state.audioStopped = true;
          stopAmbient(1.5);
          if (nextBtn) { clearInterval(nextBtn._timer); nextBtn.style.display = 'none'; }
          ctrlListBtn.style.display = 'none';
          showView('roleplay');
        };
      }
      if (playBtn) playBtn.style.display = '';
      if (nextBtn) nextBtn.style.display = 'none';

      // 1) 배경음 시작
      startAmbient(state.prefs.ambientDialogue || 'none');

      // 2) 인트로 화면 (최대 10초, 클릭 시 스킵) → 끝나면 컴팩트 헤더로 잔류
      await playDialogueIntro(cat, items, container);
      if (state.audioStopped) return;

      // 3) 배경음 40%로 축소 + 인트로 헤더 아래 바로 대화 시작 (컨테이너 유지)
      enterDialogueMode();
      playDialogueSequence(items, container, cat);
    };
  }

  // ─── 대화 순차 애니메이션 재생 ───
  async function playDialogueSequence(items, container, cat) {
    if (!container) container = document.getElementById('sim-dialogue-bubbles');
    state.audioStopped = false;

    // 재생 버튼 → 중지 버튼으로 전환
    const playBtn = document.getElementById('dlg-play-btn');
    if (playBtn) {
      playBtn.textContent = '⏹ 중지';
      playBtn.onclick = () => {
        state.audioStopped = true;
        _ttsPaused = false;   // 일시정지 중이어도 완전 중지
        window.speechSynthesis?.cancel();
        if (state.currentVvAudio) { state.currentVvAudio.pause(); state.currentVvAudio = null; }
        const hint = document.querySelector('#vv-active-badge .vvb-hint');
        if (hint) hint.textContent = '⏸ 클릭하여 일시정지';
        if (playBtn) {
          playBtn.textContent = '▶ 다시 재생';
          playBtn.onclick = () => {
            const nb2 = document.getElementById('dlg-next-btn');
            if (nb2 && nb2._timer) { clearInterval(nb2._timer); nb2._timer = null; }
            if (nb2) nb2.style.display = 'none';
            container.innerHTML = '';
            state.audioStopped = false;
            startAmbient(state.prefs.ambientDialogue || 'none');
            setTimeout(() => enterDialogueMode(), 400);
            playDialogueSequence(items, container, cat);
          };
        }
        // 중지 후 다른 롤플레이 이동 버튼 (자동 이동 없음)
        const nextBtnStop = document.getElementById('dlg-next-btn');
        if (nextBtnStop && typeof VOCAB_CATEGORIES !== 'undefined') {
          const simCats2 = VOCAB_CATEGORIES.filter(c => c.type === 'sim' && c.dialogue && c.id !== (cat && cat.id));
          if (simCats2.length > 0) {
            const randCat2 = simCats2[Math.floor(Math.random() * simCats2.length)];
            nextBtnStop.textContent = `다른 롤플레이 이동 ▶`;
            nextBtnStop.style.display = '';
            nextBtnStop.onclick = () => {
              if (nextBtnStop._timer) { clearInterval(nextBtnStop._timer); nextBtnStop._timer = null; }
              nextBtnStop.style.display = 'none';
              App.startVocabCategory(randCat2.id, 'dialogue');
            };
          }
        }
      };
    }

    for (const item of items) {
      if (state.audioStopped) break;
      if (!item) continue;

      // ── 일시정지 대기 (재개될 때까지 100ms 폴링) ──
      while (_ttsPaused && !state.audioStopped) {
        await new Promise(r => setTimeout(r, 100));
      }
      if (state.audioStopped) break;

      const speaker = item.speaker || 'A';

      // 장면 설명 (N) — 즉시 표시, 짧은 대기
      if (speaker === 'N') {
        const el = document.createElement('div');
        el.className = 'dlg-scene dlg-appear-n';
        el.textContent = resolveNames(item.korean) || '';
        container.appendChild(el);
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await new Promise(r => setTimeout(r, 900));
        continue;
      }

      // A / B 말풍선 생성 (초기엔 숨김)
      const wrapper = document.createElement('div');
      wrapper.className = `dlg-row dlg-row-${speaker}`;
      wrapper.style.opacity = '0';

      const badge = document.createElement('div');
      badge.className = `dlg-badge dlg-badge-${speaker}`;

      // 배지에 아바타 이미지 포함
      const avatarInfo = buildSlotAvatarHtml(speaker === 'A' ? 1 : 2);
      if (avatarInfo) {
        badge.innerHTML = `${avatarInfo.avatarHtml}<span class="dlg-badge-name">${speaker === 'A' ? '나' : '상대방'}</span>`;
      } else {
        badge.textContent = speaker === 'A' ? '나 (A)' : '상대방 (B)';
      }

      const bubble = document.createElement('div');
      bubble.className = `dlg-bubble dlg-bubble-${speaker}`;

      const jpResolved = resolveNames(item.japanese);
      const krResolved = resolveNames(item.korean);
      if (jpResolved) {
        const slot = speaker === 'A' ? 1 : 2;
        const jpRow = document.createElement('div');
        jpRow.className = 'dlg-jp-row';
        const jpEl = document.createElement('div');
        jpEl.className = 'dlg-jp';
        jpEl.textContent = jpResolved;
        const replayBtn = document.createElement('button');
        replayBtn.className = 'dlg-replay-btn';
        replayBtn.innerHTML = '🔊';
        replayBtn.title = '다시 듣기';
        // TTS는 원본 japanese 텍스트 사용 (이름은 TTS에서 그대로 읽힘)
        replayBtn.addEventListener('click', (e) => { e.stopPropagation(); playAudioSlot(jpResolved, slot); });
        jpRow.appendChild(jpEl);
        jpRow.appendChild(replayBtn);
        bubble.appendChild(jpRow);
      }
      if (item.romaji) {
        const roEl = document.createElement('div');
        roEl.className = 'dlg-romaji';
        roEl.textContent = resolveNames(item.romaji);
        bubble.appendChild(roEl);
      }
      if (krResolved) {
        const krEl = document.createElement('div');
        krEl.className = 'dlg-kr';
        krEl.textContent = krResolved;
        bubble.appendChild(krEl);
      }
      if (item.tip) {
        const tipEl = document.createElement('div');
        tipEl.className = 'dlg-tip';
        tipEl.textContent = '💡 ' + resolveNames(item.tip);
        bubble.appendChild(tipEl);
      }

      wrapper.appendChild(badge);
      wrapper.appendChild(bubble);
      container.appendChild(wrapper);

      // 등장 애니메이션
      requestAnimationFrame(() => {
        wrapper.style.opacity = '';
        wrapper.classList.add(`dlg-appear-${speaker.toLowerCase()}`);
        // 새 말풍선이 보이도록 부드럽게 스크롤 (center: 다음 공간을 미리 보이게)
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });

      // 발화 중 하이라이트
      bubble.classList.add('dlg-speaking');
      if (item.japanese && !state.audioStopped) {
        const slot = speaker === 'A' ? 1 : 2;
        await playAudioSlot(resolveNames(item.japanese), slot);
      }
      bubble.classList.remove('dlg-speaking');
      bubble.classList.add('dlg-done');

      // 말풍선 간 간격
      await new Promise(r => setTimeout(r, 400));
    }

    // 재생 완료 → 다시 재생 버튼 전환 + 다른 롤플레이 이동 5초 카운트다운
    if (!state.audioStopped && playBtn) {
      playBtn.textContent = '🔄 다시 재생';
      playBtn.onclick = () => {
        // 카운트다운 타이머 정리
        const nb = document.getElementById('dlg-next-btn');
        if (nb && nb._timer) { clearInterval(nb._timer); nb._timer = null; }
        if (nb) nb.style.display = 'none';
        container.innerHTML = '';
        state.audioStopped = false;
        startAmbient(state.prefs.ambientDialogue || 'none');
        setTimeout(() => enterDialogueMode(), 400);
        playDialogueSequence(items, container, cat);
      };

      // ── 다른 롤플레이 이동 버튼 (자동 이동 없음) ──
      const nextBtn = document.getElementById('dlg-next-btn');
      if (nextBtn) {
        const simCats = (typeof VOCAB_CATEGORIES !== 'undefined')
          ? VOCAB_CATEGORIES.filter(c => c.type === 'sim' && c.dialogue && c.id !== cat.id)
          : [];
        if (simCats.length > 0) {
          const randCat = simCats[Math.floor(Math.random() * simCats.length)];
          nextBtn.textContent = `다른 롤플레이 이동 ▶`;
          nextBtn.style.display = '';
          nextBtn.onclick = () => {
            if (nextBtn._timer) { clearInterval(nextBtn._timer); nextBtn._timer = null; }
            nextBtn.style.display = 'none';
            if (playBtn) playBtn.style.display = 'none';
            App.startVocabCategory(randCat.id, 'dialogue');
          };
        }
      }

      // 대화 완료 후 — 시나리오 선택 패널 표시
      if (cat && cat.variants && cat.variants.length > 1) {
        const endPanel = document.createElement('div');
        endPanel.className = 'dlg-end-panel';
        endPanel.innerHTML = '<div class="dlg-end-title">📋 다른 시나리오 재생</div>';
        const NUM_ICONS = ['①','②','③','④','⑤'];
        cat.variants.forEach((v, i) => {
          const btn = document.createElement('button');
          btn.className = 'dlg-vs-chip';
          btn.textContent = `${NUM_ICONS[i] || (i+1)} ${v.scene}`;
          btn.onclick = () => {
            container.innerHTML = '';
            state.audioStopped = false;
            const newItems = v.items.map(id => VOCAB_MAP[id]).filter(Boolean);
            startAmbient(state.prefs.ambientDialogue || 'none');
            setTimeout(() => enterDialogueMode(), 400);
            playDialogueSequence(newItems, container, cat);
          };
          endPanel.appendChild(btn);
        });
        container.appendChild(endPanel);
        endPanel.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }

      // 대화 완료 후 3초 → 배경음 볼륨업 + 페이드아웃
      setTimeout(() => exitDialogueMode(), 3000);
    }
  }

  function renderVocabBrowse() {
    const browseGrid = document.getElementById('vocab-browse-grid');
    if (!browseGrid) return;
    browseGrid.innerHTML = '';
    const items = state.vocabItems;
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'vb-item';
      el.innerHTML = `
        <div class="vb-jp">${item.kanji ? formatWithFurigana(item.kanji, item.japanese) : (item.japanese || item)}</div>
        <div class="vb-korean">${item.korean || ''}</div>
        <div class="vb-audio">🔊 듣기</div>`;
      el.addEventListener('click', () => {
        playAudio(item.japanese || item);
        markVocabSeen(item.id);
      });
      browseGrid.appendChild(el);
    });

    // 버튼 연결
    const flashBtn = document.getElementById('vbc-flash-btn');
    if (flashBtn) flashBtn.onclick = () => {
      startVocabCategory(state.vocabCurrentCategoryId, 'flash');
    };
    const quizBtn = document.getElementById('vbc-quiz-btn');
    if (quizBtn) quizBtn.onclick = () => {
      startVocabCategory(state.vocabCurrentCategoryId, 'quiz');
    };
  }

  function getVocabCategoryProgress(catId) {
    const cat = VOCAB_CATEGORIES.find(c => c.id === catId);
    if (!cat || !cat.items.length) return 0;
    const mastered = cat.items.filter(id => isVocabItemMastered(id)).length;
    return Math.round((mastered / cat.items.length) * 100);
  }

  function isVocabItemMastered(id) {
    const p = state.vocabProgress[id];
    if (!p || p.correct < 3) return false;
    const total = (p.correct || 0) + (p.incorrect || 0);
    return total > 0 && (p.correct / total) >= 0.75;
  }

  // ─── 단어 플래시카드 ───

  // 텍스트가 카드 너비를 벗어나지 않도록 폰트 크기 자동 조정
  function fitVocabText(el, defaultSize) {
    // 측정 중 CSS transition 비활성화 (transition이 켜진 상태에서 scrollWidth를 읽으면 이전 값 반환)
    el.style.transition = 'none';
    el.style.whiteSpace = 'nowrap';
    el.style.fontSize = defaultSize + 'px';
    el.style.lineHeight = '1';
    el.style.textAlign = '';
    el.style.padding = '';
    el.style.wordBreak = '';
    const container = document.getElementById('vocab-flashcard');
    const maxW = (container ? container.offsetWidth : 620) - 64;
    let size = defaultSize;
    while (el.scrollWidth > maxW && size > 16) {
      size -= 4;
      el.style.fontSize = size + 'px';
    }
    // 매우 긴 문장은 줄바꿈 허용
    if (size <= 22) {
      el.style.whiteSpace = 'normal';
      el.style.lineHeight = '1.4';
      el.style.textAlign = 'center';
      el.style.padding = '0 16px';
      el.style.wordBreak = 'keep-all';
    }
    // 측정 완료 후 transition 복원
    requestAnimationFrame(() => { el.style.transition = ''; });
  }

  // 문장 내 사용된 단어 추출 (VOCAB_ITEMS 역탐색)
  function extractUsedWords(sentence) {
    if (!sentence || typeof VOCAB_ITEMS === 'undefined') return [];
    const results = [];
    const seen = new Set();
    VOCAB_ITEMS.forEach(item => {
      const jp = item.japanese.replace(/[〜～]/g, '');
      if (jp.length >= 2 && sentence.includes(jp) && !seen.has(item.id)) {
        seen.add(item.id);
        results.push(item);
      }
    });
    return results.slice(0, 6); // 최대 6개
  }

  // 같은 카테고리의 다른 항목 2개 가져오기 (유사 예문)
  function getSimilarItems(currentItem, count = 2) {
    return state.vocabItems
      .filter(it => it.id !== currentItem.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }

  // ─── 한자 인라인 후리가나: 漢字(よみ) 포맷 ───
  // kanji="喫煙所はどこですか", japanese="きつえんじょはどこですか"
  // → "喫煙所(きつえんじょ)はどこですか"
  function formatWithFurigana(kanji, japanese) {
    if (!kanji || !japanese) return kanji || japanese || '';
    if (kanji === japanese) return kanji; // 이미 가나뿐

    function isKanjiChar(ch) {
      const c = ch.charCodeAt(0);
      return (c >= 0x4E00 && c <= 0x9FFF) ||
             (c >= 0x3400 && c <= 0x4DBF) ||
             (c >= 0xF900 && c <= 0xFAFF);
    }

    let result = '';
    let ki = 0, ji = 0;

    while (ki < kanji.length) {
      if (isKanjiChar(kanji[ki])) {
        // 연속 한자 블록 수집
        let block = '';
        while (ki < kanji.length && isKanjiChar(kanji[ki])) block += kanji[ki++];

        // 다음 비한자 앵커 문자 찾기
        const anchor = ki < kanji.length ? kanji[ki] : null;
        let readingEnd;
        if (anchor !== null) {
          const pos = japanese.indexOf(anchor, ji);
          readingEnd = pos !== -1 ? pos : japanese.length;
        } else {
          readingEnd = japanese.length;
        }
        const reading = japanese.slice(ji, readingEnd);
        ji = readingEnd;
        result += reading ? `${block}(${reading})` : block;
      } else {
        result += kanji[ki++];
        if (ji < japanese.length) ji++;
      }
    }
    return result;
  }

  // 현재 카테고리가 문장형인지 확인
  function isCurrentVocabSentenceType() {
    const cat = VOCAB_CATEGORIES.find(c => c.id === state.vocabCurrentCategoryId);
    return cat && (cat.type === 'sentence' || cat.type === 'sim');
  }

  function showVocabFlashcard() {
    const items = state.vocabItems;
    if (!items.length) return;
    const idx = state.vocabIndex;
    const total = items.length;
    const item = items[idx];
    const isSentence = isCurrentVocabSentenceType() || item.japanese.length > 10;

    document.getElementById('vocab-card-num').textContent = `${idx + 1} / ${total}`;
    document.getElementById('vfc-progress-fill').style.width = `${(idx / total) * 100}%`;

    // 문장형 ↔ 단어형 CSS 전환
    const card = document.getElementById('vocab-flashcard');
    if (card) card.classList.toggle('vfc-sentence-mode', isSentence);

    // ── 앞면 ──
    const jpEl = document.getElementById('vfc-japanese');
    if (isSentence) {
      // 문장: 한자 부분에만 인라인 후리가나 → 喫煙所(きつえんじょ)はどこですか
      jpEl.textContent = item.kanji
        ? formatWithFurigana(item.kanji, item.japanese)
        : item.japanese;
      jpEl.dataset.audio = item.japanese;
      fitVocabText(jpEl, 24);
    } else {
      // 단어: 앞면에 한자, 뒤에 후리가나 표시
      jpEl.textContent = item.kanji
        ? formatWithFurigana(item.kanji, item.japanese)
        : item.japanese;
      jpEl.dataset.audio = item.japanese;
      fitVocabText(jpEl, 80);
    }

    // 단어형 별도 후리가나 줄 — 인라인 표기로 대체되므로 숨김
    const kanjiEl = document.getElementById('vfc-kanji');
    kanjiEl.textContent = ''; kanjiEl.style.display = 'none';

    // ── 뒷면 ──
    const jpBackEl = document.getElementById('vfc-japanese-back');
    jpBackEl.textContent = item.kanji
      ? formatWithFurigana(item.kanji, item.japanese)
      : item.japanese;
    jpBackEl.dataset.audio = item.japanese;
    fitVocabText(jpBackEl, isSentence ? 20 : 56);

    const kanjiBEl = document.getElementById('vfc-kanji-back');
    kanjiBEl.textContent = ''; kanjiBEl.style.display = 'none';
    document.getElementById('vfc-korean').textContent = item.korean;

    const tipEl = document.getElementById('vfc-tip');
    if (item.tip) { tipEl.textContent = '💡 ' + item.tip; tipEl.style.display = 'block'; }
    else tipEl.style.display = 'none';

    const exEl = document.getElementById('vfc-example');
    if (item.example) { exEl.textContent = '📝 ' + item.example; exEl.style.display = 'block'; }
    else exEl.style.display = 'none';

    // ── 관련 단어 / 예시 문장 (vocab-examples-data.js) ──
    const exData = typeof VOCAB_EXAMPLES_DB !== 'undefined' ? VOCAB_EXAMPLES_DB[item.id] : null;
    const compoundsEl = document.getElementById('vfc-compounds');
    const sentencesEl = document.getElementById('vfc-sentences');

    if (compoundsEl) {
      if (!isSentence && exData?.compounds?.length) {
        compoundsEl.style.display = '';
        compoundsEl.innerHTML = '<div class="vfc-ex-title">📚 관련 단어</div>' +
          exData.compounds.map(c =>
            `<div class="vfc-ex-item"><span class="vfc-ex-jp vfc-audio-word" onclick="event.stopPropagation();App.playWord(this.textContent)" title="🔊">${c.japanese}</span><span class="vfc-ex-kr">${c.meaning}</span></div>`
          ).join('');
      } else { compoundsEl.style.display = 'none'; compoundsEl.innerHTML = ''; }
    }

    if (sentencesEl) {
      if (isSentence) {
        // 문장형: 사용된 단어 + 유사 예문 2개
        const usedWords = extractUsedWords(item.japanese);
        const similar   = getSimilarItems(item, 2);
        let html = '';
        if (usedWords.length) {
          html += `<div class="vfc-used-words">
            <div class="vfc-used-words-title">📝 사용된 단어</div>
            ${usedWords.map(w =>
              `<span class="vfc-word-chip" onclick="App.playAudio('${w.japanese}')" title="${w.korean}">
                ${w.kanji ? formatWithFurigana(w.kanji, w.japanese) : w.japanese}
              </span>`
            ).join('')}
          </div>`;
        }
        if (similar.length) {
          html += `<div class="vfc-similar">
            <div class="vfc-similar-title">💬 유사 표현</div>
            ${similar.map(s =>
              `<div class="vfc-similar-item" onclick="App.playAudio('${s.japanese}')">
                <span class="vfc-similar-jp" data-audio="${s.japanese}">${s.kanji ? formatWithFurigana(s.kanji, s.japanese) : s.japanese}</span>
                <span class="vfc-similar-kr">${s.korean}</span>
              </div>`
            ).join('')}
          </div>`;
        }
        if (exData?.sentences?.length) {
          html += '<div class="vfc-similar"><div class="vfc-similar-title">📖 예시 문장</div>' +
            exData.sentences.slice(0,2).map(s =>
              `<div class="vfc-similar-item vfc-sent" onclick="App.playAudio('${s.japanese}')">
                <span class="vfc-similar-jp" data-audio="${s.japanese}">${s.kanji ? formatWithFurigana(s.kanji, s.japanese) : s.japanese}</span>
                <span class="vfc-similar-kr">${s.meaning}</span>
              </div>`
            ).join('') + '</div>';
        }
        sentencesEl.style.display = html ? '' : 'none';
        sentencesEl.innerHTML = html;
      } else if (exData?.sentences?.length) {
        sentencesEl.style.display = '';
        sentencesEl.innerHTML = '<div class="vfc-ex-title">💬 예시 문장</div>' +
          exData.sentences.map(s =>
            `<div class="vfc-ex-item vfc-sent"><span class="vfc-sent-jp vfc-audio-word" onclick="event.stopPropagation();App.playWord(this.textContent)" title="🔊">${s.japanese}</span><span class="vfc-ex-kr">${s.meaning}</span></div>`
          ).join('');
      } else { sentencesEl.style.display = 'none'; sentencesEl.innerHTML = ''; }
    }

    // 카드 리셋 + 읽기 세션 무효화
    state.vocabFlipped = false;
    state.vocabReadSession = (state.vocabReadSession || 0) + 1;
    stopVocabExRead();
    document.getElementById('vfc-inner').classList.remove('flipped');


    // 자동 발음 (앞면 로드 시)
    setTimeout(() => playAudio(item.japanese), 350);

    updateNavStripActive('vfc-nav-strip', idx);

    if (vNextArrow) vNextArrow.disabled = (idx >= items.length - 1);

    markVocabSeen(item.id);
  }

  // vocab 예시 순차 읽기 (세션 기반)
  async function startVocabExRead(session) {
    stopVocabExRead();
    // 읽기 대상: vfc-sent-jp, vfc-ex-jp, vfc-similar-jp 요소들
    const back = document.querySelector('#vfc-inner .flashcard-back');
    if (!back) return;
    const targets = [...back.querySelectorAll('.vfc-sent-jp, .vfc-ex-jp, .vfc-similar-jp')]
      .map(el => ({ el, text: el.dataset.audio || el.textContent.trim() }))
      .filter(t => t.text);

    for (const t of targets) {
      if (session !== state.vocabReadSession) return;
      back.querySelectorAll('.vfc-reading').forEach(e => e.classList.remove('vfc-reading'));
      t.el.closest('.vfc-ex-item, .vfc-similar-item, .vfc-sent')?.classList.add('vfc-reading');
      t.el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      await playAudio(t.text);
      if (session !== state.vocabReadSession) return;
      await new Promise(r => setTimeout(r, 350));
    }
    if (back) back.querySelectorAll('.vfc-reading').forEach(e => e.classList.remove('vfc-reading'));
  }

  function stopVocabExRead() {
    document.querySelectorAll('.vfc-reading').forEach(e => e.classList.remove('vfc-reading'));
  }

  function vocabFlipCard() {
    state.vocabFlipped = !state.vocabFlipped;
    document.getElementById('vfc-inner').classList.toggle('flipped', state.vocabFlipped);

    if (state.vocabFlipped) {
      // 읽기 세션 증가 → 카드 넘기면 이전 읽기 중단
      state.vocabReadSession = (state.vocabReadSession || 0) + 1;
      const session = state.vocabReadSession;
      const item = state.vocabItems[state.vocabIndex];

      // 메인 단어/문장 → 완료 후 예시 순차 읽기
      (async () => {
        await playAudio(item.japanese);
        if (session !== state.vocabReadSession) return;
        await new Promise(r => setTimeout(r, 350));
        if (session === state.vocabReadSession) startVocabExRead(session);
      })();
    } else {
      // 앞면 복귀 → 읽기 중단
      state.vocabReadSession = (state.vocabReadSession || 0) + 1;
      stopVocabExRead();
    }
  }

  function setupVocabFlashcardControls() {
    const vcard = document.getElementById('vocab-flashcard');
    attachSwipe(
      vcard,
      () => { if (state.vocabIndex > 0) { state.vocabIndex--; showVocabFlashcard(); } },
      () => {
        const item = state.vocabItems[state.vocabIndex];
        recordVocabResult(item.id, true);
        if (state.vocabIndex < state.vocabItems.length - 1) {
          state.vocabIndex++; showVocabFlashcard();
        } else {
          showToast('플래시카드 완료! 🎉 퀴즈로 넘어갑니다...');
          setTimeout(() => {
            state.vocabMode = 'quiz';
            document.getElementById('vocab-flashcard-area').style.display = 'none';
            document.getElementById('vocab-quiz-area').style.display = 'block';
            startVocabQuiz();
          }, 900);
        }
      },
      () => vocabFlipCard()
    );
  }

  // ─── 단어 퀴즈 ───

  function startVocabQuiz() {
    startAmbient(state.prefs.ambientQuiz || 'none', 'quiz'); // 단어 퀴즈도 배경음
    const items = [...state.vocabItems].sort(() => Math.random() - 0.5);
    state.vocabQuizQuestions = items.map(item => buildVocabQuestion(item));
    state.vocabQuizCurrentIdx = 0;
    state.vocabQuizCorrect = 0;
    state.vocabQuizAnswered = false;

    document.getElementById('vq-correct-count').textContent = '✓ 0';
    document.getElementById('vq-wrong-count').textContent = '✗ 0';
    document.getElementById('vocab-quiz-result').style.display = 'none';
    document.getElementById('vocab-quiz-feedback').style.display = 'none';

    document.getElementById('vqr-retry').onclick = startVocabQuiz;

    showVocabQuizQuestion();
  }

  function buildVocabQuestion(item) {
    const catId = state.vocabCurrentCategoryId;
    const wrongs = getVocabWrongOptions(item.id, catId, 3);
    const choices = [item, ...wrongs].sort(() => Math.random() - 0.5);
    return { item, choices, correctId: item.id };
  }

  function showVocabQuizQuestion() {
    const q = state.vocabQuizQuestions[state.vocabQuizCurrentIdx];
    if (!q) return;
    const total = state.vocabQuizQuestions.length;
    const idx = state.vocabQuizCurrentIdx;

    document.getElementById('vq-progress-text').textContent = `${idx + 1} / ${total}`;
    document.getElementById('vq-progress-fill').style.width = `${(idx / total) * 100}%`;
    state.vocabQuizAnswered = false;

    // 문제: 한국어 뜻 표시
    const qbox = document.getElementById('vocab-question-box');
    qbox.innerHTML = `
      <div class="qb-vocab-prompt">
        <div class="qb-vocab-korean">${q.item.korean}</div>
        <div class="qb-label">이 뜻에 해당하는 일본어는?</div>
      </div>`;

    // 선택지: 일본어(히라가나) 표시
    const choicesDiv = document.getElementById('vocab-quiz-choices');
    choicesDiv.innerHTML = '';
    q.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn vocab-choice-btn';
      btn.dataset.vid = choice.id;
      btn.innerHTML = `
        <span class="vc-japanese">${choice.japanese}</span>
        ${choice.kanji ? `<span class="vc-kanji">${choice.kanji}</span>` : ''}`;
      btn.addEventListener('click', () => handleVocabQuizAnswer(choice.id));
      choicesDiv.appendChild(btn);
    });

    document.getElementById('vocab-quiz-feedback').style.display = 'none';
  }

  function handleVocabQuizAnswer(chosenId) {
    if (state.vocabQuizAnswered) return;
    state.vocabQuizAnswered = true;

    const q = state.vocabQuizQuestions[state.vocabQuizCurrentIdx];
    const isCorrect = chosenId === q.correctId;

    // 버튼 시각화
    document.querySelectorAll('.vocab-choice-btn').forEach(btn => {
      btn.classList.add('disabled');
      if (btn.dataset.vid === q.correctId) btn.classList.add('correct');
      if (btn.dataset.vid === chosenId && !isCorrect) btn.classList.add('wrong');
    });

    // 결과 기록
    recordVocabResult(q.item.id, isCorrect);

    if (isCorrect) {
      state.vocabQuizCorrect++;
      document.getElementById('vq-correct-count').textContent = '✓ ' + state.vocabQuizCorrect;
      playCorrectSound();
    } else {
      const wrongCount = state.vocabQuizCurrentIdx + 1 - state.vocabQuizCorrect;
      document.getElementById('vq-wrong-count').textContent = '✗ ' + wrongCount;
      playWrongSound();
    }

    // 피드백
    const fb = document.getElementById('vocab-quiz-feedback');
    fb.style.display = 'block';
    const resultEl = document.getElementById('vq-result-text');
    const ansEl = document.getElementById('vq-correct-ans');
    const tipEl = document.getElementById('vq-tip-text');
    const exEl = document.getElementById('vq-example-text');

    if (isCorrect) {
      resultEl.textContent = '✓ 정답!';
      resultEl.className = 'qf-result correct';
      ansEl.textContent = '';
    } else {
      resultEl.textContent = '✗ 틀렸어요';
      resultEl.className = 'qf-result wrong';
      ansEl.textContent = `정답: ${q.item.kanji ? formatWithFurigana(q.item.kanji, q.item.japanese) : q.item.japanese} = ${q.item.korean}`;
    }

    if (q.item.tip) { tipEl.textContent = '💡 ' + q.item.tip; tipEl.style.display = 'block'; }
    else tipEl.style.display = 'none';

    if (q.item.example) { exEl.textContent = '📝 ' + q.item.example; exEl.style.display = 'block'; }
    else exEl.style.display = 'none';

    document.getElementById('vq-next-btn').onclick = nextVocabQuestion;
  }

  function nextVocabQuestion() {
    state.vocabQuizCurrentIdx++;
    if (state.vocabQuizCurrentIdx >= state.vocabQuizQuestions.length) {
      showVocabQuizResult();
    } else {
      showVocabQuizQuestion();
    }
  }

  function showVocabQuizResult() {
    stopAmbient(2.5);
    const correct = state.vocabQuizCorrect;
    const total = state.vocabQuizQuestions.length;
    const pct = Math.round((correct / total) * 100);

    document.getElementById('vocab-quiz-feedback').style.display = 'none';
    document.getElementById('vocab-quiz-result').style.display = 'block';
    document.getElementById('vqr-score').textContent = `${correct} / ${total}`;
    document.getElementById('vqr-pct').textContent = pct + '%';

    saveToStorage();
  }

  // ─── 단어 진도 기록 ───

  function markVocabSeen(id) {
    if (!state.vocabProgress[id]) state.vocabProgress[id] = { seen: 0, correct: 0, incorrect: 0 };
    state.vocabProgress[id].seen = (state.vocabProgress[id].seen || 0) + 1;
    saveToStorage();
  }

  function recordVocabResult(id, ok) {
    if (!state.vocabProgress[id]) state.vocabProgress[id] = { seen: 0, correct: 0, incorrect: 0 };
    if (ok) state.vocabProgress[id].correct = (state.vocabProgress[id].correct || 0) + 1;
    else state.vocabProgress[id].incorrect = (state.vocabProgress[id].incorrect || 0) + 1;
    state.vocabProgress[id].seen = (state.vocabProgress[id].seen || 0) + 1;
    saveToStorage();
  }

  function renderVocabProgress() {
    const container = document.getElementById('progress-levels');
    if (!container) return;

    const section = document.createElement('div');
    section.style.marginTop = '24px';
    section.innerHTML = '<h3 style="margin-bottom:12px">📖 단어 학습 진도 (4·5단계)</h3>';

    VOCAB_CATEGORIES.forEach(cat => {
      const prog = getVocabCategoryProgress(cat.id);
      const seenCount = cat.items.filter(id => state.vocabProgress[id] && state.vocabProgress[id].seen > 0).length;

      const el = document.createElement('div');
      el.className = 'pl-level';
      el.innerHTML = `
        <div class="pll-header">
          <div>
            <div class="pll-title">${cat.icon} ${cat.name}</div>
            <div class="pll-sub">${cat.subtitle} · ${cat.items.length}개 단어</div>
          </div>
          <div class="pll-pct">${prog}%</div>
        </div>
        <div class="pll-bar-bg"><div class="pll-bar-fill" style="width:${prog}%"></div></div>
        <div style="font-size:11px;color:#718096;margin-top:4px">${seenCount} / ${cat.items.length}개 학습</div>`;
      section.appendChild(el);
    });

    container.appendChild(section);
  }

  function vocabBackToSetup() {
    state.vocabMode = null;
    state.audioStopped = true;
    stopAmbient(1.5);
    // 카테고리 패널 리셋
    document.getElementById('vocab-setup').style.display = 'block';
    document.getElementById('vocab-flash-panel').style.display = 'none';
    const browseArea = document.getElementById('vocab-browse-area');
    if (browseArea) browseArea.style.display = 'none';
    const dialogueArea = document.getElementById('vocab-dialogue-area');
    if (dialogueArea) dialogueArea.style.display = 'none';
    // 현재 섹션에 맞는 마스터 뷰로 복귀
    const sectionViewMap = { word: 'vocab', sentence: 'convo', sim: 'roleplay' };
    const returnView = sectionViewMap[state.vocabSection] || 'vocab';
    showView(returnView);
  }

  // ─── 관리자 패널 ───
  (function setupAdminPanel() {
    let clickCount = 0;
    let clickTimer = null;

    // 로고를 5번 빠르게 클릭하면 관리자 패널 열림
    const logo = document.querySelector('.header-logo');
    if (logo) {
      logo.style.cursor = 'pointer';
      logo.addEventListener('click', () => {
        clickCount++;
        logo.classList.remove('admin-hint');
        void logo.offsetWidth; // reflow
        logo.classList.add('admin-hint');
        clearTimeout(clickTimer);
        if (clickCount >= 5) {
          clickCount = 0;
          openAdminPanel();
        } else {
          clickTimer = setTimeout(() => { clickCount = 0; }, 2000);
        }
      });
    }

    function openAdminPanel() {
      const overlay = document.getElementById('admin-overlay');
      if (!overlay) return;
      refreshAdminStatus();
      populateAdminLevelSelect();
      populateAdminVocabSelects();
      overlay.classList.add('open');
    }

    function closeAdminPanel() {
      document.getElementById('admin-overlay').classList.remove('open');
    }

    function refreshAdminStatus() {
      document.getElementById('adm-cur-xp').textContent = state.totalXP.toLocaleString();
      document.getElementById('adm-unlocked').textContent = state.unlockedLevels.length;
      const completed = LEVELS.filter(l => l.chars.length > 0 && getLevelProgress(l) >= 100).length;
      document.getElementById('adm-completed').textContent = completed;
    }

    function populateAdminLevelSelect() {
      const sel = document.getElementById('adm-level-select');
      sel.innerHTML = '<option value="">── 레벨 선택 ──</option>';
      LEVELS.filter(l => l.chars.length > 0).forEach(l => {
        const opt = document.createElement('option');
        opt.value = l.id;
        opt.textContent = `Level ${l.id}: ${l.title} (${l.chars.length}자)`;
        sel.appendChild(opt);
      });
    }

    function populateAdminVocabSelects() {
      if (typeof VOCAB_CATEGORIES === 'undefined') return;

      // 語彙マスター (word)
      const vocabSel = document.getElementById('adm-vocab-select');
      if (vocabSel) {
        vocabSel.innerHTML = '<option value="">── 카테고리 선택 ──</option>';
        const wGroups = {};
        VOCAB_CATEGORIES.filter(c => c.type === 'word').forEach(c => {
          const lv = c.wlevel || 1;
          if (!wGroups[lv]) wGroups[lv] = [];
          wGroups[lv].push(c);
        });
        Object.keys(wGroups).sort((a, b) => a - b).forEach(lv => {
          const grp = document.createElement('optgroup');
          grp.label = `Level ${lv}`;
          wGroups[lv].forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = `${c.name} (${(c.items || []).length}단어)`;
            grp.appendChild(opt);
          });
          vocabSel.appendChild(grp);
        });
      }

      // 会話マスター (sentence)
      const convSel = document.getElementById('adm-conv-select');
      if (convSel) {
        convSel.innerHTML = '<option value="">── 카테고리 선택 ──</option>';
        const sGroups = {};
        VOCAB_CATEGORIES.filter(c => c.type === 'sentence').forEach(c => {
          const lv = c.slevel || 1;
          if (!sGroups[lv]) sGroups[lv] = [];
          sGroups[lv].push(c);
        });
        Object.keys(sGroups).sort((a, b) => a - b).forEach(lv => {
          const grp = document.createElement('optgroup');
          grp.label = `Level ${lv}`;
          sGroups[lv].forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = `${c.name} (${(c.items || []).length}문장)`;
            grp.appendChild(opt);
          });
          convSel.appendChild(grp);
        });
      }
    }

    function completeVocabCategoryItems(catId) {
      if (!catId || typeof VOCAB_CATEGORIES === 'undefined') return 0;
      const cat = VOCAB_CATEGORIES.find(c => c.id === catId);
      if (!cat) return 0;
      (cat.items || []).forEach(id => {
        if (!state.vocabProgress[id]) state.vocabProgress[id] = { seen: 0, correct: 0, incorrect: 0 };
        state.vocabProgress[id].correct = 5;
        state.vocabProgress[id].seen = Math.max(state.vocabProgress[id].seen || 0, 5);
      });
      return (cat.items || []).length;
    }

    function applyAndRefresh() {
      checkLevelUnlock();
      saveToStorage();
      updateHeader();
      refreshAdminStatus();
      renderLevels();
    }

    // 닫기
    document.getElementById('admin-close-btn').addEventListener('click', closeAdminPanel);
    document.getElementById('admin-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'admin-overlay') closeAdminPanel();
    });

    // XP 직접 설정
    document.getElementById('adm-xp-set').addEventListener('click', () => {
      const val = parseInt(document.getElementById('adm-xp-input').value);
      if (isNaN(val) || val < 0) { showToast('올바른 XP 값을 입력하세요.'); return; }
      state.totalXP = val;
      applyAndRefresh();
      showToast(`✅ XP를 ${val.toLocaleString()}으로 설정했습니다.`);
    });

    // XP 추가
    document.getElementById('adm-xp-add').addEventListener('click', () => {
      const val = parseInt(document.getElementById('adm-xp-input').value);
      if (isNaN(val) || val <= 0) { showToast('추가할 XP 값을 입력하세요.'); return; }
      state.totalXP += val;
      applyAndRefresh();
      showToast(`✅ ${val.toLocaleString()} XP 추가 → 총 ${state.totalXP.toLocaleString()} XP`);
    });

    // 빠른 XP 버튼
    document.querySelectorAll('.adm-quick').forEach(btn => {
      btn.addEventListener('click', () => {
        const xp = parseInt(btn.dataset.xp);
        if (btn.classList.contains('adm-quick-max')) {
          state.totalXP = xp;
          showToast(`🚀 XP MAX (${xp.toLocaleString()}) 설정!`);
        } else {
          state.totalXP += xp;
          showToast(`⚡ +${xp.toLocaleString()} XP → 총 ${state.totalXP.toLocaleString()} XP`);
        }
        applyAndRefresh();
      });
    });

    // 모든 레벨 해금
    document.getElementById('adm-unlock-all').addEventListener('click', () => {
      state.unlockedLevels = LEVELS.map(l => l.id);
      state.currentLevel = LEVELS[LEVELS.length - 1].id;
      applyAndRefresh();
      showToast('🔓 모든 레벨이 해금되었습니다!');
    });

    // 선택 레벨 완료처리
    document.getElementById('adm-level-complete').addEventListener('click', () => {
      const levelId = parseInt(document.getElementById('adm-level-select').value);
      if (!levelId) { showToast('레벨을 선택하세요.'); return; }
      const level = LEVELS.find(l => l.id === levelId);
      if (!level) return;
      level.chars.forEach(k => {
        if (!state.progress[k]) state.progress[k] = { seen: 0, correct: 0, incorrect: 0 };
        state.progress[k].correct = 5;
        state.progress[k].incorrect = 0;
        state.progress[k].seen = (state.progress[k].seen || 0) + 5;
      });
      applyAndRefresh();
      showToast(`✅ Level ${levelId} (${level.chars.length}자) 완료처리 완료!`);
    });

    // 전체 레벨 완료처리
    document.getElementById('adm-complete-all').addEventListener('click', () => {
      LEVELS.filter(l => l.chars.length > 0).forEach(level => {
        level.chars.forEach(k => {
          if (!state.progress[k]) state.progress[k] = { seen: 0, correct: 0, incorrect: 0 };
          state.progress[k].correct = 5;
          state.progress[k].incorrect = 0;
          state.progress[k].seen = (state.progress[k].seen || 0) + 5;
        });
      });
      applyAndRefresh();
      showToast('✅ 모든 레벨 완료처리 완료!');
    });

    // 語彙マスター 전체 완료처리
    document.getElementById('adm-vocab-complete-all').addEventListener('click', () => {
      if (typeof VOCAB_CATEGORIES === 'undefined') return;
      if (!confirm('語彙マスター 전체 카테고리를 완료처리할까요?')) return;
      let total = 0;
      VOCAB_CATEGORIES.filter(c => c.type === 'word').forEach(c => { total += completeVocabCategoryItems(c.id); });
      saveToStorage();
      showToast(`✅ 語彙マスター ${total}단어 완료처리!`);
    });

    // 語彙マスター 선택 완료처리
    document.getElementById('adm-vocab-complete').addEventListener('click', () => {
      const catId = document.getElementById('adm-vocab-select').value;
      if (!catId) { showToast('카테고리를 선택하세요.'); return; }
      const n = completeVocabCategoryItems(catId);
      saveToStorage();
      showToast(`✅ ${n}단어 완료처리!`);
    });

    // 会話マスター 전체 완료처리
    document.getElementById('adm-conv-complete-all').addEventListener('click', () => {
      if (typeof VOCAB_CATEGORIES === 'undefined') return;
      if (!confirm('会話マスター 전체 카테고리를 완료처리할까요?')) return;
      let total = 0;
      VOCAB_CATEGORIES.filter(c => c.type === 'sentence').forEach(c => { total += completeVocabCategoryItems(c.id); });
      saveToStorage();
      showToast(`✅ 会話マスター ${total}문장 완료처리!`);
    });

    // 会話マスター 선택 완료처리
    document.getElementById('adm-conv-complete').addEventListener('click', () => {
      const catId = document.getElementById('adm-conv-select').value;
      if (!catId) { showToast('카테고리를 선택하세요.'); return; }
      const n = completeVocabCategoryItems(catId);
      saveToStorage();
      showToast(`✅ ${n}문장 완료처리!`);
    });

    // 진도만 초기화
    document.getElementById('adm-reset-progress').addEventListener('click', () => {
      if (!confirm('진도(정답/오답 기록)를 초기화할까요?\nXP와 해금 상태는 유지됩니다.')) return;
      state.progress = {};
      state.vocabProgress = {};
      applyAndRefresh();
      showToast('🗑️ 진도가 초기화되었습니다.');
    });

    // 전체 초기화
    document.getElementById('adm-reset-all').addEventListener('click', () => {
      if (!confirm('⚠️ 모든 진도·XP·해금 상태를 초기화합니다.\n정말 초기화하시겠습니까?')) return;
      state.progress = {};
      state.vocabProgress = {};
      state.totalXP = 0;
      state.streak = 0;
      state.lastStudied = null;
      state.unlockedLevels = [1];
      state.currentLevel = 1;
      state.bookmarks = [];
      renderBookmarkSection();
      applyAndRefresh();
      closeAdminPanel();
      showToast('🗑️ 전체 초기화 완료.');
    });
  })();

  // ─── 롤플레이 이름 치환 ───
  // 스크립트 내 {F}/{M} 플레이스홀더를 설정된 이름으로 교체
  function resolveNames(text) {
    if (!text) return text;
    const f = state.prefs.femaleName || '주영';
    const m = state.prefs.maleName   || '승현';
    return text.replace(/\{F\}/g, f).replace(/\{M\}/g, m);
  }

  // ─── 학습 완료 후 퀴즈 전환 확인 ───
  function showLearnCompletePrompt(levelId) {
    // 기존 프롬프트 제거
    const existing = document.getElementById('learn-complete-prompt');
    if (existing) existing.remove();

    const prompt = document.createElement('div');
    prompt.id = 'learn-complete-prompt';
    prompt.className = 'lc-prompt-overlay';
    prompt.innerHTML = `
      <div class="lc-prompt-box">
        <div class="lc-prompt-icon">🎉</div>
        <div class="lc-prompt-title">학습 완료!</div>
        <div class="lc-prompt-desc">퀴즈로 실력을 확인할까요?</div>
        <div class="lc-prompt-btns">
          <button class="lc-prompt-btn lc-prompt-yes">✏️ 퀴즈 시작</button>
          <button class="lc-prompt-btn lc-prompt-no">나중에</button>
        </div>
      </div>
    `;
    document.body.appendChild(prompt);

    prompt.querySelector('.lc-prompt-yes').addEventListener('click', () => {
      prompt.remove();
      if (levelId) startQuizForLevel(levelId);
    });
    prompt.querySelector('.lc-prompt-no').addEventListener('click', () => {
      prompt.remove();
    });
    // 배경 클릭으로도 닫기
    prompt.addEventListener('click', (e) => {
      if (e.target === prompt) prompt.remove();
    });
  }

  // ─── 토스트 알림 ───
  function showToast(msg, duration = 2500) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }

  // 순차 읽기를 중단하고 해당 텍스트만 발음 (뒤집힌 카드 단어 클릭용)
  function playWord(text) {
    state.fcReadSession = (state.fcReadSession || 0) + 1;
    state.vocabReadSession = (state.vocabReadSession || 0) + 1;
    stopFcExRead();
    stopVocabExRead();
    playAudio(text);
  }

  // ─── 공개 API ───
  return {
    init,
    showView,
    flipCard,
    playAudio,
    playWord,
    startReview,
    startLearn,
    startQuizForLevel,
    backToQuizSetup,
    startAllBrowse,
    toggleWriteExam,
    writeExamCheck,
    writeExamResult,
    vocabFlipCard,
    vocabBackToSetup,
    startVocabCategory,
    removeBookmark,
    stopAllAudio
  };
})();

// 음성 목록 로드 (비동기)
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

document.addEventListener('DOMContentLoaded', () => App.init());
