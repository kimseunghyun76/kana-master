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
    // 필기
    writeType: 'hiragana',
    writeChars: [],
    writeIndex: 0,
    overlayOn: false,
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    // 설정
    prefs: { lang: 'korean', autoplay: false, autonext: false },
    // 진도
    progress: {},
    totalXP: 0,
    streak: 0,
    lastStudied: null,
    unlockedLevels: [1]
  };

  // ─── 초기화 ───
  function init() {
    loadFromStorage(() => {
      updateHeader();
      renderLevels();
      setupNavigation();
      setupSettings();
      checkContinue();
      handleURLParam();
    });
  }

  function handleURLParam() {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if (view) showView(view);
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
    state.prefs = data.prefs || { lang: 'korean', autoplay: false, autonext: false };

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
      prefs: state.prefs
    };
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ kanaProgress: data });
    } else {
      localStorage.setItem('kanaProgress', JSON.stringify(data));
    }
  }

  // ─── 헤더 ───
  function updateHeader() {
    document.getElementById('hdr-level').textContent = 'Lv.' + state.currentLevel;
    document.getElementById('hdr-xp').textContent = state.totalXP + ' XP';
    document.getElementById('hdr-streak').textContent = state.streak + '🔥';
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
    state.currentView = viewName;

    // nav 활성화
    document.querySelectorAll('.nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.view === viewName);
    });

    // view 전환
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById('view-' + viewName);
    if (target) target.classList.add('active');

    // 뷰별 초기화
    if (viewName === 'home') renderLevels();
    if (viewName === 'quiz') setupQuizView();
    if (viewName === 'write') setupWriteView();
    if (viewName === 'progress') renderProgress();
  }

  // ─── 홈 ───
  function renderLevels() {
    const grid = document.getElementById('levels-grid');
    if (!grid) return;
    grid.innerHTML = '';
    LEVELS.forEach(level => {
      const isUnlocked = state.unlockedLevels.includes(level.id);
      const isCurrent = level.id === state.currentLevel;
      const prog = getLevelProgress(level);
      const isCompleted = prog >= 100;

      const card = document.createElement('div');
      card.className = 'level-card' +
        (isCompleted ? ' completed' : '') +
        (isCurrent && !isCompleted ? ' active-level' : '') +
        (!isUnlocked ? ' locked' : '');

      let badgeClass = 'locked-badge', badgeText = '🔒 잠김';
      if (isUnlocked) {
        if (isCompleted) { badgeClass = 'done'; badgeText = '✓ 완료'; }
        else if (isCurrent) { badgeClass = 'current'; badgeText = '▶ 진행 중'; }
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
        <div class="lc-prog-text">${prog}% 완료 · ${level.chars.length}자</div>
        ${isUnlocked ? `
          <div class="lc-actions">
            <button class="lc-btn lc-btn-learn" data-lid="${level.id}">📚 학습</button>
            <button class="lc-btn lc-btn-quiz" data-lid="${level.id}">✏️ 퀴즈</button>
          </div>` : ''}
      `;

      if (isUnlocked) {
        card.querySelector('.lc-btn-learn').addEventListener('click', (e) => {
          e.stopPropagation();
          startLearn(level.id);
        });
        card.querySelector('.lc-btn-quiz').addEventListener('click', (e) => {
          e.stopPropagation();
          startQuizForLevel(level.id);
        });
      } else {
        card.addEventListener('click', () => {
          showToast(`${level.unlockXP} XP가 필요합니다! 현재 ${state.totalXP} XP`);
        });
      }
      grid.appendChild(card);
    });
  }

  function getLevelProgress(level) {
    if (!level.chars || !level.chars.length) return 0;
    const mastered = level.chars.filter(k => isCharMastered(k)).length;
    return Math.round((mastered / level.chars.length) * 100);
  }

  function isCharMastered(kana) {
    const p = state.progress[kana];
    if (!p || p.correct < 3) return false;
    const total = (p.correct || 0) + (p.incorrect || 0);
    return total > 0 && (p.correct / total) >= 0.75;
  }

  function checkContinue() {
    const cont = document.getElementById('home-continue');
    const btn = document.getElementById('continue-btn');
    if (state.lastStudied) {
      cont.style.display = 'flex';
      btn.addEventListener('click', () => startLearn(state.currentLevel));
    }
  }

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

  // ─── 학습 모드 ───
  function startLearn(levelId) {
    state.learnLevelId = levelId;
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return;
    state.learnChars = getLevelChars(levelId);
    state.learnIndex = 0;

    showView('learn');
    document.getElementById('learn-level-name').textContent = level.name;
    document.getElementById('learn-level-title').textContent = level.title;

    // 모드 선택 화면 표시
    document.getElementById('learn-mode-selector').style.display = 'block';
    document.getElementById('flashcard-area').style.display = 'none';
    document.getElementById('browse-area').style.display = 'none';

    document.getElementById('mode-flash').onclick = () => {
      document.getElementById('learn-mode-selector').style.display = 'none';
      document.getElementById('flashcard-area').style.display = 'block';
      state.learnMode = 'flash';
      state.learnFlipped = false;
      showFlashcard();
      setupFlashcardControls();
    };
    document.getElementById('mode-browse').onclick = () => {
      document.getElementById('learn-mode-selector').style.display = 'none';
      document.getElementById('browse-area').style.display = 'block';
      state.learnMode = 'browse';
      renderBrowse();
    };
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
    document.getElementById('fc-romaji').textContent = char.romaji;
    document.getElementById('fc-korean').textContent = char.korean;
    document.getElementById('fc-english').textContent = char.english;

    // 예시 단어 (각 단어마다 발음 버튼 포함)
    const exDiv = document.getElementById('fc-examples');
    exDiv.innerHTML = '';
    if (char.examples && char.examples.length) {
      char.examples.slice(0, 2).forEach(ex => {
        const el = document.createElement('div');
        el.className = 'fc-ex-item';
        el.innerHTML = `
          <button class="fc-ex-audio-btn" title="단어 발음 듣기">🔊</button>
          <span class="fc-ex-word">${ex.word}</span>
          <span class="fc-ex-reading"> [${ex.reading}]</span>
          <span class="fc-ex-meaning"> ${ex.meaning}</span>`;
        // 발음 버튼: 카드 뒤집기 전파 차단 후 단어 발음
        el.querySelector('.fc-ex-audio-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          playAudio(ex.word);
        });
        // 예시 줄 전체 클릭도 발음 (카드 뒤집기 차단)
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          playAudio(ex.word);
        });
        exDiv.appendChild(el);
      });
    }

    // 카드 뒤집기 리셋
    state.learnFlipped = false;
    const inner = document.getElementById('fc-inner');
    inner.classList.remove('flipped');

    // 카드 로드 시 항상 자동 발음
    setTimeout(() => playAudio(char.kana), 350);

    // 진도 기록
    markCharSeen(char.kana);
  }

  function flipCard() {
    state.learnFlipped = !state.learnFlipped;
    document.getElementById('fc-inner').classList.toggle('flipped', state.learnFlipped);
    // 뒤집힐 때(앞→뒤) 항상 발음 재생
    if (state.learnFlipped) {
      const char = state.learnChars[state.learnIndex];
      playAudio(char.kana);
    }
  }

  function setupFlashcardControls() {
    document.getElementById('fc-prev').onclick = () => {
      if (state.learnIndex > 0) { state.learnIndex--; showFlashcard(); }
    };
    document.getElementById('fc-next').onclick = () => {
      if (state.learnIndex < state.learnChars.length - 1) { state.learnIndex++; showFlashcard(); }
      else { showToast('레벨 학습 완료! 🎉 퀴즈로 확인해보세요.'); }
    };
    document.getElementById('fc-ok').onclick = () => {
      const char = state.learnChars[state.learnIndex];
      recordResult(char.kana, true);
      if (state.learnIndex < state.learnChars.length - 1) { state.learnIndex++; showFlashcard(); }
      else { showToast('레벨 완료! 🎉'); }
    };
    document.getElementById('fc-wrong').onclick = () => {
      const char = state.learnChars[state.learnIndex];
      recordResult(char.kana, false);
      if (state.learnIndex < state.learnChars.length - 1) { state.learnIndex++; showFlashcard(); }
    };
    document.getElementById('fc-audio-btn').onclick = () => {
      const char = state.learnChars[state.learnIndex];
      playAudio(char.kana);
    };
  }

  function renderBrowse() {
    const grid = document.getElementById('browse-grid');
    grid.innerHTML = '';
    state.learnChars.forEach((char, i) => {
      const el = document.createElement('div');
      el.className = 'browse-item';
      el.innerHTML = `
        <span class="bi-kana">${char.kana}</span>
        <div class="bi-romaji">${char.romaji}</div>
        <div class="bi-korean">${char.korean}</div>
        <div class="bi-audio">🔊 ${char.english}</div>
      `;
      el.addEventListener('click', () => {
        playAudio(char.kana);
        markCharSeen(char.kana);
      });
      el.querySelector('.bi-audio').addEventListener('click', (e) => {
        e.stopPropagation();
        playAudio(char.kana);
      });
      grid.appendChild(el);
    });
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
      const level = LEVELS.find(l => l.id === parseInt(levelSel));
      if (level) chars = [...level.chars];
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

    document.getElementById('quiz-setup').style.display = 'none';
    document.getElementById('quiz-game').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';

    document.getElementById('qsm-correct').textContent = '✓ 0';
    document.getElementById('qsm-wrong').textContent = '✗ 0';

    showQuizQuestion();
  }

  function buildQuestion(kana, qtype, qlang) {
    const info = KANA_MAP[kana];
    if (!info) return null;

    // 오답 3개 생성 (같은 타입에서)
    const sameType = Object.entries(KANA_MAP)
      .filter(([k, v]) => k !== kana && v.type === info.type)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(([k, v]) => ({ kana: k, ...v }));

    // 정답 포함 4개 셔플
    const correct = { kana, ...info };
    const choices = [correct, ...sameType].sort(() => Math.random() - 0.5);

    return { kana, info, qtype, qlang, choices, correctKana: kana };
  }

  function showQuizQuestion() {
    const q = state.quizQuestions[state.quizCurrentIdx];
    if (!q) return;
    const total = state.quizQuestions.length;
    const idx = state.quizCurrentIdx;

    document.getElementById('qpr-text').textContent = `${idx + 1} / ${total}`;
    document.getElementById('qpr-bar-fill').style.width = `${(idx / total) * 100}%`;

    state.quizAnswered = false;

    // 질문 박스
    const qbox = document.getElementById('quiz-question-box');
    qbox.innerHTML = '';

    if (q.qtype === 'kanaToReading') {
      qbox.innerHTML = `
        <div>
          <div class="qb-kana">${q.kana}</div>
          <div class="qb-label">이 글자의 발음은?</div>
          <button class="audio-btn" style="margin-top:10px" onclick="App.playAudio('${q.kana}')">🔊 발음 듣기</button>
        </div>`;
    } else if (q.qtype === 'readingToKana') {
      const readingText = getReadingText(q.info, q.qlang);
      qbox.innerHTML = `
        <div>
          <div class="qb-reading">${readingText}</div>
          <div class="qb-label">이 발음에 해당하는 글자는?</div>
        </div>`;
    } else if (q.qtype === 'listen') {
      qbox.innerHTML = `
        <div style="text-align:center">
          <button class="qb-listen-btn" onclick="App.playAudio('${q.kana}')">🔊 발음 듣기</button>
          <div class="qb-label" style="margin-top:12px">들은 발음에 해당하는 글자는?</div>
        </div>`;
      // 자동 재생
      setTimeout(() => playAudio(q.kana), 300);
    }

    // 선택지
    const choicesDiv = document.getElementById('quiz-choices');
    choicesDiv.innerHTML = '';

    q.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.dataset.kana = choice.kana;

      if (q.qtype === 'kanaToReading') {
        // 글자→발음: 선택지에 발음 표기 표시
        const reading = getReadingText(choice, q.qlang);
        btn.innerHTML = `<span class="choice-reading">${reading}</span>`;
      } else {
        // 발음→글자 / 듣기→글자: 선택지에 일본어 글자만 표시 (발음 표기 없음)
        btn.innerHTML = `<span class="choice-kana">${choice.kana}</span>`;
      }

      btn.addEventListener('click', () => handleQuizAnswer(choice.kana, q));
      choicesDiv.appendChild(btn);
    });

    // 피드백 숨김
    document.getElementById('quiz-feedback').style.display = 'none';
  }

  function getReadingText(info, lang) {
    if (!info) return '';
    if (lang === 'korean') return info.korean || info.romaji;
    if (lang === 'romaji') return info.romaji;
    if (lang === 'both') return `${info.korean} (${info.romaji})`;
    return info.korean || info.romaji;
  }

  function handleQuizAnswer(chosenKana, q) {
    if (state.quizAnswered) return;
    state.quizAnswered = true;

    const isCorrect = chosenKana === q.correctKana;

    // 버튼 시각화
    document.querySelectorAll('.choice-btn').forEach(btn => {
      btn.classList.add('disabled');
      if (btn.dataset.kana === q.correctKana) btn.classList.add('correct');
      if (btn.dataset.kana === chosenKana && !isCorrect) btn.classList.add('wrong');
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

    if (isCorrect) {
      qfResult.textContent = '✓ 정답!';
      qfResult.className = 'qf-result correct';
      playCorrectSound();
    } else {
      qfResult.textContent = '✗ 틀렸어요';
      qfResult.className = 'qf-result wrong';
      qfCorrect.textContent = `정답: ${q.kana} = ${getReadingText(q.info, q.qlang)}`;
      playWrongSound();
    }

    if (isCorrect) qfCorrect.textContent = '';

    // 예시 단어 표시 (클릭 시 발음 재생)
    const examples = q.info.examples || [];
    qfExamples.innerHTML = '';
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

    // 자동 다음 또는 버튼
    const nextBtn = document.getElementById('qf-next-btn');
    nextBtn.onclick = nextQuizQuestion;

    if (state.prefs.autonext) {
      setTimeout(nextQuizQuestion, isCorrect ? 1200 : 2000);
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
            return `<div class="qr-wrong-char" title="${info ? info.romaji : ''}">${k}</div>`;
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
          <span class="wci-list-romaji">${char.romaji}</span>
          <span class="wci-list-kor"> ${char.korean}</span>
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
    document.getElementById('wci-romaji').textContent = char.romaji;
    document.getElementById('wci-korean').textContent = char.korean;

    // 필기 힌트
    const hints = getStrokeHint(char.kana);
    document.getElementById('stroke-hint').textContent = hints;

    // 오버레이 업데이트
    updateCanvasOverlay(char.kana);
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
    ctx.lineWidth = 4;
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
              return `<div class="pll-char ${cls}" title="${k}: ${info ? info.romaji : ''}">${k}</div>`;
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
            <span class="wcc-romaji">${info ? info.romaji : ''}</span>
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
        saveToStorage();
        updateHeader();
        renderProgress();
        showToast('진도가 초기화되었습니다.');
      }
    };
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

  function loadPrefsUI() {
    document.getElementById('pref-lang').value = state.prefs.lang || 'korean';
    document.getElementById('pref-autoplay').checked = state.prefs.autoplay || false;
    document.getElementById('pref-autonext').checked = state.prefs.autonext || false;
  }

  function savePrefs() {
    state.prefs.lang = document.getElementById('pref-lang').value;
    state.prefs.autoplay = document.getElementById('pref-autoplay').checked;
    state.prefs.autonext = document.getElementById('pref-autonext').checked;
    saveToStorage();
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
  function playAudio(kana) {
    if (!window.speechSynthesis) {
      showToast('이 브라우저는 음성 합성을 지원하지 않습니다.');
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(kana);
    utter.lang = 'ja-JP';
    utter.rate = 0.8;
    utter.pitch = 1.0;

    // 일본어 음성 찾기
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang === 'ja-JP' || v.lang.startsWith('ja'));
    if (jaVoice) utter.voice = jaVoice;

    window.speechSynthesis.speak(utter);
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

  // ─── 토스트 알림 ───
  function showToast(msg, duration = 2500) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  }

  // ─── 공개 API ───
  return {
    init,
    showView,
    flipCard,
    playAudio,
    startReview,
    startLearn,
    startQuizForLevel
  };
})();

// 음성 목록 로드 (비동기)
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

document.addEventListener('DOMContentLoaded', () => App.init());
