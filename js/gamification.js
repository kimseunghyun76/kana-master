// ════════════════════════════════════════════════════════
//  GAMIFICATION SYSTEM - 계급 · 아이템 · 배지 · 미션
// ════════════════════════════════════════════════════════

// ─── 계급 (Ranks) ───
var RANKS = [
  { id: 1,  name: '見習い',    nameKo: '견습생',     icon: '🌱', minXP: 0,     color: '#9ca3af', tier: 'bronze' },
  { id: 2,  name: '入門生',    nameKo: '입문생',     icon: '🌿', minXP: 100,   color: '#78c850', tier: 'bronze' },
  { id: 3,  name: '初心者',    nameKo: '초심자',     icon: '📗', minXP: 300,   color: '#4ade80', tier: 'bronze' },
  { id: 4,  name: '学習者',    nameKo: '학습자',     icon: '📘', minXP: 600,   color: '#4361ee', tier: 'silver' },
  { id: 5,  name: '努力家',    nameKo: '노력가',     icon: '💪', minXP: 1200,  color: '#7c3aed', tier: 'silver' },
  { id: 6,  name: '中級者',    nameKo: '중급자',     icon: '⭐', minXP: 2000,  color: '#f59e0b', tier: 'gold' },
  { id: 7,  name: '実力者',    nameKo: '실력자',     icon: '🌟', minXP: 3500,  color: '#ef4444', tier: 'gold' },
  { id: 8,  name: '上級者',    nameKo: '상급자',     icon: '💫', minXP: 5500,  color: '#ec4899', tier: 'platinum' },
  { id: 9,  name: '達人',      nameKo: '달인',       icon: '🏆', minXP: 8000,  color: '#f97316', tier: 'platinum' },
  { id: 10, name: '免許皆伝',  nameKo: '면허개전',   icon: '👑', minXP: 12000, color: '#fbbf24', tier: 'diamond' },
  { id: 11, name: '師範',      nameKo: '사범',       icon: '🎓', minXP: 18000, color: '#06b6d4', tier: 'diamond' },
  { id: 12, name: 'マスター',  nameKo: '마스터',     icon: '🐉', minXP: 25000, color: '#8b5cf6', tier: 'master' },
];

// ─── 희귀 아이템 (Collectible Items) ───
var RARE_ITEMS = [
  // ── Common (커먼) · 드롭율 55% ──
  { id: 'c01', name: 'おにぎり',     nameKo: '오니기리',     icon: '🍙', rarity: 'common',    desc: '편의점 삼각김밥. 일본의 소울푸드.' },
  { id: 'c02', name: '緑茶',         nameKo: '녹차',         icon: '🍵', rarity: 'common',    desc: '마음을 가라앉히는 일본 녹차.' },
  { id: 'c03', name: '桜の花びら',   nameKo: '벚꽃잎',       icon: '🌸', rarity: 'common',    desc: '봄바람에 흩날리는 벚꽃잎 한 장.' },
  { id: 'c04', name: '折り鶴',       nameKo: '종이학',       icon: '🕊️', rarity: 'common',    desc: '1000마리 접으면 소원이 이루어진다.' },
  { id: 'c05', name: 'お守り',       nameKo: '부적',         icon: '🧧', rarity: 'common',    desc: '신사에서 산 행운의 부적.' },
  { id: 'c06', name: '箸',           nameKo: '젓가락',       icon: '🥢', rarity: 'common',    desc: '식사의 기본. いただきます!' },
  { id: 'c07', name: 'ラーメン',     nameKo: '라멘',         icon: '🍜', rarity: 'common',    desc: '김이 모락모락 나는 진한 라멘.' },
  { id: 'c08', name: 'たこ焼き',     nameKo: '타코야키',     icon: '🐙', rarity: 'common',    desc: '오사카 명물 문어볼!' },
  { id: 'c09', name: '寿司',         nameKo: '스시',         icon: '🍣', rarity: 'common',    desc: '신선한 네타의 한 점.' },
  { id: 'c10', name: '日本酒',       nameKo: '니혼슈',       icon: '🍶', rarity: 'common',    desc: '차갑게 혹은 따뜻하게, 쌀의 맛.' },

  // ── Uncommon (언커먼) · 드롭율 25% ──
  { id: 'u01', name: '招き猫',       nameKo: '마네키네코',   icon: '🐱', rarity: 'uncommon',  desc: '복을 부르는 고양이 인형.' },
  { id: 'u02', name: '風鈴',         nameKo: '풍경',         icon: '🎐', rarity: 'uncommon',  desc: '바람에 흔들리는 유리 풍경.' },
  { id: 'u03', name: '提灯',         nameKo: '제등',         icon: '🏮', rarity: 'uncommon',  desc: '축제 골목을 밝히는 붉은 등.' },
  { id: 'u04', name: '手裏剣',       nameKo: '수리검',       icon: '🌀', rarity: 'uncommon',  desc: '닌자의 비밀 무기.' },
  { id: 'u05', name: 'だんご',       nameKo: '당고',         icon: '🍡', rarity: 'uncommon',  desc: '꽃보다 당고! 달콤한 삼색 경단.' },
  { id: 'u06', name: '鉛筆',         nameKo: '연필',         icon: '✏️', rarity: 'uncommon',  desc: '학습의 기본 도구. 한 자 한 자 정성껏.' },
  { id: 'u07', name: '下駄',         nameKo: '게타',         icon: '🩴', rarity: 'uncommon',  desc: '카랑카랑 소리 나는 나무 신발.' },
  { id: 'u08', name: '番傘',         nameKo: '반가사',       icon: '🌂', rarity: 'uncommon',  desc: '비 오는 교토의 전통 우산.' },

  // ── Rare (레어) · 드롭율 12% ──
  { id: 'r01', name: 'だるま',       nameKo: '다루마',       icon: '🎯', rarity: 'rare',      desc: '한쪽 눈을 칠하고 소원을 빌자.' },
  { id: 'r02', name: '鯉のぼり',     nameKo: '잉어깃발',     icon: '🎏', rarity: 'rare',      desc: '어린이날을 축하하는 잉어 깃발.' },
  { id: 'r03', name: '日本刀',       nameKo: '일본도',       icon: '⚔️', rarity: 'rare',      desc: '사무라이의 혼이 깃든 명검.' },
  { id: 'r04', name: '着物',         nameKo: '기모노',       icon: '👘', rarity: 'rare',      desc: '전통 의상의 아름다움. 화려한 문양.' },
  { id: 'r05', name: '三味線',       nameKo: '샤미센',       icon: '🎸', rarity: 'rare',      desc: '일본 전통 현악기의 울림.' },

  // ── Epic (에픽) · 드롭율 5% ──
  { id: 'e01', name: '金閣寺',       nameKo: '킨카쿠지',     icon: '🏯', rarity: 'epic',      desc: '교토의 황금 사찰. 물에 비치는 금빛.' },
  { id: 'e02', name: '新幹線',       nameKo: '신칸센',       icon: '🚄', rarity: 'epic',      desc: '꿈의 초특급 열차. 시속 300km의 바람.' },
  { id: 'e03', name: '御朱印帳',     nameKo: '고슈인초',     icon: '📕', rarity: 'epic',      desc: '신사 순례의 증표. 먹과 주사의 예술.' },
  { id: 'e04', name: '花火',         nameKo: '하나비',       icon: '🎆', rarity: 'epic',      desc: '여름 밤하늘을 수놓는 대형 불꽃.' },

  // ── Legendary (레전더리) · 드롭율 2.5% ──
  { id: 'l01', name: '龍',           nameKo: '용',           icon: '🐉', rarity: 'legendary', desc: '하늘을 가르는 전설의 용. 지혜의 상징.' },
  { id: 'l02', name: '天照大神',     nameKo: '아마테라스',   icon: '☀️', rarity: 'legendary', desc: '태양의 여신. 일본 신화의 최고신.' },
  { id: 'l03', name: '鳳凰',         nameKo: '봉황',         icon: '🦅', rarity: 'legendary', desc: '불사조. 평화와 번영을 가져오는 신조.' },

  // ── Mythic (미식) · 드롭율 0.5% ──
  { id: 'm01', name: '富士山の魂',   nameKo: '후지산의 혼',  icon: '🗻', rarity: 'mythic',    desc: '일본의 영혼. 모든 학습의 정점에 도달한 자에게.' },
];

var RARITY_CONFIG = {
  common:    { label: '커먼',       labelJp: 'コモン',     color: '#9ca3af', bgColor: '#f3f4f6', chance: 0.55 },
  uncommon:  { label: '언커먼',     labelJp: 'アンコモン', color: '#22c55e', bgColor: '#f0fdf4', chance: 0.25 },
  rare:      { label: '레어',       labelJp: 'レア',       color: '#3b82f6', bgColor: '#eff6ff', chance: 0.12 },
  epic:      { label: '에픽',       labelJp: 'エピック',   color: '#a855f7', bgColor: '#faf5ff', chance: 0.05 },
  legendary: { label: '레전더리',   labelJp: 'レジェンド', color: '#f59e0b', bgColor: '#fffbeb', chance: 0.025 },
  mythic:    { label: '미식',       labelJp: 'ミシック',   color: '#ef4444', bgColor: '#fef2f2', chance: 0.005 },
};

// ─── 성취 배지 (Achievement Badges) ───
var BADGES = [
  // 학습 마일스톤
  { id: 'b_first_step',    name: '첫 걸음',          nameJp: '最初の一歩',     icon: '👣', desc: '첫 가나를 학습했다!' },
  { id: 'b_hira_10',       name: '히라가나 탐험가',  nameJp: 'ひらがな探検家', icon: '🗺️', desc: '히라가나 10자 학습' },
  { id: 'b_hira_46',       name: '히라가나 마스터',  nameJp: 'ひらがなマスター', icon: '🏅', desc: '히라가나 46자 완전 정복!' },
  { id: 'b_kata_46',       name: '가타카나 마스터',  nameJp: 'カタカナマスター', icon: '🥇', desc: '가타카나 46자 완전 정복!' },
  { id: 'b_kana_all',      name: 'かな完全制覇',     nameJp: 'かな完全制覇',   icon: '🏆', desc: '모든 가나를 마스터했다!' },

  // 퀴즈 성과
  { id: 'b_quiz_first',    name: '도전자',            nameJp: '挑戦者',         icon: '🎯', desc: '첫 퀴즈 완료!' },
  { id: 'b_quiz_perfect',  name: '퍼펙트!',          nameJp: 'パーフェクト',   icon: '💯', desc: '퀴즈 만점 달성!' },
  { id: 'b_quiz_50',       name: '퀴즈 마니아',      nameJp: 'クイズマニア',   icon: '🧠', desc: '퀴즈 50회 완료!' },
  { id: 'b_quiz_streak5',  name: '5연속 정답',       nameJp: '5連続正解',      icon: '⚡', desc: '퀴즈 5문제 연속 정답!' },

  // 연속 학습 (스트릭)
  { id: 'b_streak_3',      name: '3일 연속',          nameJp: '3日連続',        icon: '🔥', desc: '3일 연속 학습 달성!' },
  { id: 'b_streak_7',      name: '일주일 전사',      nameJp: '一週間の戦士',   icon: '🔥', desc: '7일 연속 학습!' },
  { id: 'b_streak_30',     name: '한 달의 집념',      nameJp: '一ヶ月の執念',   icon: '🔥', desc: '30일 연속 학습!' },
  { id: 'b_streak_100',    name: '백일의 약속',      nameJp: '百日の誓い',     icon: '🔥', desc: '100일 연속 학습! 전설이다!' },

  // 수집 (아이템)
  { id: 'b_collect_5',     name: '수집 시작',         nameJp: '収集開始',       icon: '🎒', desc: '아이템 5개 수집!' },
  { id: 'b_collect_15',    name: '골동품 수집가',    nameJp: '骨董品コレクター', icon: '🏺', desc: '아이템 15개 수집!' },
  { id: 'b_collect_all',   name: '컴플리트!',        nameJp: 'コンプリート',   icon: '🌈', desc: '모든 아이템 수집 완료!' },
  { id: 'b_collect_mythic',name: '신화 발견',         nameJp: '神話発見',       icon: '✨', desc: '미식 등급 아이템을 획득했다!' },

  // 계급 달성
  { id: 'b_rank_silver',   name: '실버 진입',         nameJp: 'シルバー到達',   icon: '🥈', desc: '실버 티어 계급 달성!' },
  { id: 'b_rank_gold',     name: '골드 진입',         nameJp: 'ゴールド到達',   icon: '🥇', desc: '골드 티어 계급 달성!' },
  { id: 'b_rank_master',   name: '최종 계급',         nameJp: 'マスター到達',   icon: '🐉', desc: 'マスター 계급에 도달!' },

  // 어휘 & 읽기
  { id: 'b_vocab_50',      name: '단어 50개',         nameJp: '語彙50語',      icon: '📝', desc: '어휘 50개 학습 완료!' },
  { id: 'b_vocab_200',     name: '어휘의 달인',      nameJp: '語彙の達人',     icon: '📚', desc: '어휘 200개 학습!' },
  { id: 'b_read_sign',     name: '간판 리더',         nameJp: '看板リーダー',   icon: '🪧', desc: '간판 10개 읽기 완료!' },
  { id: 'b_read_diary',    name: '일기 독파',         nameJp: '日記読破',       icon: '📔', desc: '일기 5편 읽기 완료!' },
];

// ─── 데일리 미션 템플릿 ───
var MISSION_TEMPLATES = [
  { type: 'kana_learn',      text: '가나 {n}자 학습하기',      icon: 'あ',  targets: [5, 8, 10, 15], xpReward: [15, 25, 30, 50] },
  { type: 'vocab_learn',     text: '단어 {n}개 학습하기',      icon: '📝', targets: [3, 5, 10],     xpReward: [15, 25, 40] },
  { type: 'quiz_play',       text: '퀴즈 {n}회 풀기',          icon: '🎯', targets: [1, 2, 3],      xpReward: [10, 20, 30] },
  { type: 'quiz_correct',    text: '퀴즈 {n}문제 맞추기',      icon: '✅', targets: [5, 10, 15],    xpReward: [15, 30, 45] },
  { type: 'sign_read',       text: '간판 {n}개 읽기',          icon: '🪧', targets: [2, 3, 5],      xpReward: [10, 15, 25] },
  { type: 'diary_read',      text: '일기 {n}편 읽기',          icon: '📔', targets: [1, 2],          xpReward: [15, 25] },
  { type: 'write_practice',  text: '필기 {n}자 연습하기',      icon: '✍️', targets: [5, 10],        xpReward: [10, 20] },
  { type: 'flashcard_flip',  text: '플래시카드 {n}장 학습',     icon: '🃏', targets: [10, 20, 30],   xpReward: [15, 25, 40] },
  { type: 'any_xp',          text: 'XP {n} 이상 획득하기',      icon: '⚡', targets: [30, 50, 80],   xpReward: [20, 35, 50] },
];

// ─── 헬퍼 함수들 ───

/** 현재 XP에 해당하는 계급 객체 반환 */
function getRank(xp) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXP) rank = r;
  }
  return rank;
}

/** 다음 계급 객체 반환 (최고 계급이면 null) */
function getNextRank(xp) {
  const current = getRank(xp);
  return RANKS.find(r => r.minXP > current.minXP) || null;
}

/** 계급 레벨 번호 반환 (1-12) */
function getRankLevel(xp) {
  return getRank(xp).id;
}

/** 다음 계급까지 진행률 (0~1) */
function getRankProgress(xp) {
  const current = getRank(xp);
  const next = getNextRank(xp);
  if (!next) return 1;
  return (xp - current.minXP) / (next.minXP - current.minXP);
}

/** 랜덤 아이템 드롭 — rarity에 따른 가중 랜덤 */
function rollRandomItem() {
  const roll = Math.random();
  let cumulative = 0;
  let targetRarity = 'common';

  for (const [rarity, config] of Object.entries(RARITY_CONFIG)) {
    cumulative += config.chance;
    if (roll < cumulative) {
      targetRarity = rarity;
      break;
    }
  }

  const pool = RARE_ITEMS.filter(item => item.rarity === targetRarity);
  if (pool.length === 0) return RARE_ITEMS[0]; // fallback
  return pool[Math.floor(Math.random() * pool.length)];
}

/** 아이템 드롭 확률 체크 (학습 완료 시 호출) — 기본 30% 확률로 드롭 */
function shouldDropItem(action) {
  const chances = {
    flashcard_complete: 0.25,  // 플래시카드 레벨 완주
    quiz_complete: 0.35,       // 퀴즈 완료
    quiz_perfect: 0.80,        // 퀴즈 만점
    sign_read: 0.20,           // 간판 읽기
    diary_read: 0.20,          // 일기 읽기
    daily_mission: 0.40,       // 데일리 미션 완료
    streak_bonus: 0.50,        // 스트릭 보너스
    level_up: 1.00,            // 레벨업 시 확정
    rank_up: 1.00,             // 계급 승급 시 확정
  };
  return Math.random() < (chances[action] || 0.15);
}

/** 오늘의 데일리 미션 3개 생성 (날짜 기반 시드) */
function generateDailyMissions(dateStr) {
  // dateStr 기반 시드로 일관된 미션 생성
  const seed = dateStr.split('-').reduce((a, b) => a + parseInt(b), 0);
  const rng = (n) => {
    const x = Math.sin(seed * 9301 + n * 49297) * 49297;
    return x - Math.floor(x);
  };

  const missions = [];
  const usedTypes = new Set();

  for (let i = 0; i < 3; i++) {
    let template;
    let attempts = 0;
    do {
      const idx = Math.floor(rng(i * 100 + attempts) * MISSION_TEMPLATES.length);
      template = MISSION_TEMPLATES[idx];
      attempts++;
    } while (usedTypes.has(template.type) && attempts < 20);

    usedTypes.add(template.type);
    const tIdx = Math.floor(rng(i * 200) * template.targets.length);
    const target = template.targets[tIdx];
    const reward = template.xpReward[tIdx];

    missions.push({
      id: `mission_${dateStr}_${i}`,
      type: template.type,
      text: template.text.replace('{n}', target),
      icon: template.icon,
      target: target,
      current: 0,
      reward: reward,
      completed: false,
    });
  }

  return missions;
}

/** 스트릭 계산 (오늘 날짜와 마지막 학습 날짜 비교) */
function calculateStreak(lastStudied, currentStreak) {
  if (!lastStudied) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const last = new Date(lastStudied);
  last.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return currentStreak; // 오늘 이미 학습
  if (diffDays === 1) return currentStreak;  // 어제 학습 → 스트릭 유지 (오늘 학습하면 +1)
  return 0; // 2일 이상 비면 리셋
}

/** SRS 간격 계산 */
function calcSRSInterval(currentInterval, rating) {
  // rating: 'hard' | 'ok' | 'good'
  if (rating === 'hard') return 1;
  if (rating === 'ok')   return Math.max(1, Math.ceil(currentInterval * 1.5));
  return Math.max(1, Math.ceil(currentInterval * 2.5));
}

/** SRS 복습 대상 필터 — 오늘 복습이 필요한 항목 */
function getSRSReviewItems(progress) {
  return _getSRSReviewBase(progress, 'kana');
}

// ── SM-2 공통 핵심 ─────────────────────────────────────────
/** 진도 엔트리 객체를 직접 수정 — updateSRS / updateVocabSRS 공유 */
function _applySM2(p, rating) {
  const q = rating === 'good' ? 5 : rating === 'ok' ? 3 : 1;
  let ef       = p.srsFactor   || 2.5;
  let interval = p.srsInterval || 0;
  let reps     = p.srsReps     || 0;

  if (q < 3) {
    // 틀림: 처음부터 다시
    reps = 0; interval = 1;
  } else {
    if      (reps === 0) interval = 1;
    else if (reps === 1) interval = 6;
    else                 interval = Math.round(interval * ef);
    reps++;
    ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    ef = Math.max(1.3, ef);
  }

  p.srsFactor   = parseFloat(ef.toFixed(2));
  p.srsInterval = interval;
  p.srsReps     = reps;
  p.lastReview  = new Date().toISOString();
}

/** SRS 복습 대상 공통 필터 — getSRSReviewItems / getVocabSRSReviewItems 공유 */
function _getSRSReviewBase(store, keyName) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const todayMs = today.getTime();
  const items = [];
  for (const [key, data] of Object.entries(store)) {
    if (!data.lastReview) continue;
    const next = new Date(data.lastReview);
    next.setDate(next.getDate() + (data.srsInterval || 1));
    next.setHours(0, 0, 0, 0);
    if (next.getTime() <= todayMs) {
      items.push({ [keyName]: key, ...data, daysOverdue: Math.floor((todayMs - next.getTime()) / 86400000) });
    }
  }
  return items.sort((a, b) => b.daysOverdue - a.daysOverdue);
}
// ────────────────────────────────────────────────────────────

/**
 * 어휘 SRS 업데이트 (vocab id 기반) — SM-2 알고리즘
 * rating: 'hard' | 'ok' | 'good'
 */
function updateVocabSRS(id, rating, vocabProgress) {
  if (!vocabProgress[id]) vocabProgress[id] = { seen: 0, correct: 0, incorrect: 0 };
  _applySM2(vocabProgress[id], rating);
}

/** 어휘 SRS 복습 대상 필터 */
function getVocabSRSReviewItems(vocabProgress) {
  return _getSRSReviewBase(vocabProgress, 'id');
}

/**
 * SM-2 알고리즘으로 SRS 데이터 업데이트
 * rating: 'hard'(힘들어) | 'ok'(알겠어) | 'good'(쉬워)
 */
function updateSRS(kana, rating, progress) {
  if (!progress[kana]) progress[kana] = { seen: 0, correct: 0, incorrect: 0 };
  _applySM2(progress[kana], rating);
}
