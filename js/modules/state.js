// ─── 상태 ───
export let state = {
  currentView: 'home',
  currentLevel: 1,
  // 학습
  learnMode: null,
  learnLevelId: 1,
  learnChars: [],
  learnIndex: 0,
  learnFlipped: false,
  learnSpeakerTurn: 1,   // 플래시카드 번갈아 발음 (1 or 2)
  vocabSpeakerTurn: 1,   // vocab 플래시카드 번갈아 발음 (1 or 2)
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
  quizStreak: 0,
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
    femaleName: 'ジュヨン', maleName: 'スンヒョン',
    showWordEx: true, showSentEx: true, showReading: true,
    quizCountdown: 5,
    quizAutoAdvance: true,
    useVoicevox: false, voicevoxSpeaker1: 1, voicevoxSpeaker2: 'none',
    useEdgeTTS: false, edgeTTSUrl: 'http://localhost:5050',
    edgeTTSVoice1: 'ja-JP-NanamiNeural', edgeTTSVoice2: 'none'
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
  recentActivity: [],  // [{ type: 'kana'|'vocab', id, ts }]
  // 게이미피케이션
  totalXP: 0,
  streak: 0,
  lastStudied: null,       // 'YYYY-MM-DD'
  collectedItems: [],      // ['c01','u03',...]
  earnedBadges: [],        // ['b_first_step',...]
  dailyMissions: null,     // { date, missions: [...] }
  dailyMissionProgress: {} // { kana_learn: 3, quiz_play: 1, ... }
};

// ─── 스토리지 ───
export function loadFromStorage(cb) {
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

export function applyStoredData(data) {
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
    femaleName:       savedPrefs.femaleName  || 'ジュヨン',
    maleName:         savedPrefs.maleName    || 'スンヒョン',
    showWordEx:       savedPrefs.showWordEx  !== undefined ? savedPrefs.showWordEx  : true,
    showSentEx:       savedPrefs.showSentEx  !== undefined ? savedPrefs.showSentEx  : true,
    showReading:      savedPrefs.showReading !== undefined ? savedPrefs.showReading : true,
    quizCountdown:    savedPrefs.quizCountdown !== undefined ? parseInt(savedPrefs.quizCountdown) : 5,
    quizAutoAdvance:  savedPrefs.quizAutoAdvance !== undefined ? savedPrefs.quizAutoAdvance : true,
    quizCheer:        savedPrefs.quizCheer !== undefined ? savedPrefs.quizCheer : true,
    quizCheers:       savedPrefs.quizCheers || null,
    quizLevel:        savedPrefs.quizLevel || 'current',
    quizType:         savedPrefs.quizType  || 'kanaToReading',
    quizCount:        savedPrefs.quizCount || '10',
    quizLang:         savedPrefs.quizLang  || 'korean',
    useVoicevox:      savedPrefs.useVoicevox  || false,
    voicevoxSpeaker1: savedPrefs.voicevoxSpeaker1 !== undefined ? savedPrefs.voicevoxSpeaker1 : 1,
    voicevoxSpeaker2: savedPrefs.voicevoxSpeaker2 !== undefined ? savedPrefs.voicevoxSpeaker2 : 'none',
    ambientDialogue:  savedPrefs.ambientDialogue !== undefined ? savedPrefs.ambientDialogue : 'on',
    ambientQuiz:      savedPrefs.ambientQuiz !== undefined ? savedPrefs.ambientQuiz : 'on',
    ambientVolume:    savedPrefs.ambientVolume   !== undefined ? savedPrefs.ambientVolume : 0.18,
    useEdgeTTS:       savedPrefs.useEdgeTTS       || false,
    edgeTTSUrl:       savedPrefs.edgeTTSUrl       || 'http://localhost:5050',
    edgeTTSVoice1:    savedPrefs.edgeTTSVoice1    || 'ja-JP-NanamiNeural',
    edgeTTSVoice2:    savedPrefs.edgeTTSVoice2    || 'none',
  };
  state.vocabProgress = data.vocabProgress || {};
  state.recentActivity = data.recentActivity || [];
  // 게이미피케이션 데이터 로드
  state.collectedItems = data.collectedItems || [];
  state.earnedBadges = data.earnedBadges || [];
  state.dailyMissions = data.dailyMissions || null;
  state.dailyMissionProgress = data.dailyMissionProgress || {};
  state.totalQuizzes = data.totalQuizzes || 0;
  state.hadPerfectQuiz = data.hadPerfectQuiz || false;
  state.signsRead = data.signsRead || 0;
  state.diariesRead = data.diariesRead || 0;
  state.quizStreak = data.quizStreak || 0;
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

export function saveToStorage() {
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
    recentActivity: state.recentActivity,
    // 게이미피케이션
    collectedItems: state.collectedItems,
    earnedBadges: state.earnedBadges,
    dailyMissions: state.dailyMissions,
    dailyMissionProgress: state.dailyMissionProgress,
    totalQuizzes: state.totalQuizzes,
    hadPerfectQuiz: state.hadPerfectQuiz,
    signsRead: state.signsRead,
    diariesRead: state.diariesRead,
    quizStreak: state.quizStreak
  };
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.set({ kanaProgress: data });
  } else {
    localStorage.setItem('kanaProgress', JSON.stringify(data));
  }
}
