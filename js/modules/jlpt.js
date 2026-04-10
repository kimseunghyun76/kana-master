// ═══════════════════════════════════════════════════════
//  JLPT 레벨 태깅 시스템
//  카테고리 ID → JLPT 레벨 매핑 + 표시 헬퍼
// ═══════════════════════════════════════════════════════

/**
 * 카테고리 ID별 JLPT 레벨 매핑
 * W1~W3 = N5 (초급 필수)
 * W4~W5 = N5~N4 (초중급)
 * W6    = N4 (중급)
 * W7~W8 = N4~N3 (중상급)
 * S1~S2 = N5 (문형 기초)
 * S3~S4 = N4 (문형 중급)
 * S5~S6 = N3 (문형 응용)
 * Sim   = N4~N3 (실전)
 */
const CATEGORY_JLPT = {
  // ── W1: 인사·표현 ──
  basic_words:           'N5',
  essential_phrases:     'N5',
  w1_reactions:          'N5',
  // ── W2: 숫자 ──
  numbers_basic:         'N5',
  numbers_applied:       'N5',
  num_dates:             'N5',
  // ── W3: 날짜·시간 ──
  date_basic:            'N5',
  time_clock:            'N5',
  days_of_week:          'N5',
  // ── W4: 대명사 ──
  pronouns_personal:     'N5',
  pronouns_thing:        'N5',
  pronouns_place:        'N5',
  // ── W5: 동사 ──
  verbs_daily:           'N5',
  verbs_activity:        'N4',
  verbs_ability:         'N4',
  // ── W6: 형용사 ──
  adj_physical:          'N5',
  adj_emotion:           'N4',
  adjectives_n5:         'N5',
  // ── W7: 장소·교통·음식 ──
  place_transport:       'N4',
  food_nouns:            'N4',
  place_sightseeing:     'N4',
  // ── W8: 신체·건강 ──
  body_parts:            'N4',
  health_symptoms:       'N3',
  medical_care:          'N3',
  // ── S1: 첫 회화 ──
  first_expressions:     'N5',
  s1_pardon:             'N5',
  s1_feelings:           'N5',
  // ── S2: 자기소개·질문 ──
  self_intro:            'N5',
  basic_questions:       'N5',
  s2_hobbies:            'N4',
  // ── S3: 식당·쇼핑 ──
  food_ordering:         'N4',
  shopping_phrases:      'N4',
  s3_cafe:               'N4',
  // ── S4: 교통·길안내 ──
  directions:            'N4',
  transport_phrases:     'N4',
  s4_time_asking:        'N4',
  // ── S5: 숙박·여행·날씨 ──
  hotel_phrases:         'N4',
  s5_sightseeing:        'N3',
  s5_weather:            'N3',
  // ── S6: 소통·긴급 ──
  small_talk:            'N3',
  emergency_sos:         'N3',
  s6_health:             'N3',
  // ── Sim: 롤플레이 ──
  sim_airport:           'N4',
  sim_airplane:          'N4',
  sim_hotel:             'N4',
  sim_convenience:       'N4',
  sim_restaurant:        'N3',
  sim_taxi:              'N4',
  sim_shopping:          'N3',
  sim_doctor:            'N3',
  sim_sightseeing:       'N3',
};

/** JLPT 레벨별 색상 */
const JLPT_COLORS = {
  N5: { bg: '#dbeafe', text: '#1d4ed8', border: '#93c5fd' },
  N4: { bg: '#dcfce7', text: '#15803d', border: '#86efac' },
  N3: { bg: '#fef3c7', text: '#b45309', border: '#fcd34d' },
  N2: { bg: '#fce7f3', text: '#be185d', border: '#f9a8d4' },
  N1: { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5' },
};

/**
 * 카테고리 ID의 JLPT 레벨 반환. 매핑 없으면 null
 */
export function getJLPT(categoryId) {
  return CATEGORY_JLPT[categoryId] || null;
}

/**
 * JLPT 레벨 뱃지 HTML 반환
 * @param {string} level  'N5'|'N4'|'N3'|'N2'|'N1'
 */
export function jlptBadgeHtml(level) {
  if (!level) return '';
  const c = JLPT_COLORS[level] || { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' };
  return `<span class="jlpt-badge jlpt-${level}" style="background:${c.bg};color:${c.text};border-color:${c.border}">${level}</span>`;
}

/**
 * 진도 데이터로 JLPT 레벨별 학습 현황 집계
 * @param {object[]} categories  VOCAB_CATEGORIES 배열
 * @param {object}   vocabProgress  state.vocabProgress
 */
export function getJLPTProgress(categories, vocabProgress) {
  const levels = ['N5', 'N4', 'N3'];
  const result = {};

  levels.forEach(lv => {
    const cats = categories.filter(c => CATEGORY_JLPT[c.id] === lv);
    const allItems = cats.flatMap(c => c.items || []);
    const total = allItems.length;
    const learned = allItems.filter(id => vocabProgress[id] && (vocabProgress[id].seen || 0) > 0).length;
    const mastered = allItems.filter(id => {
      const p = vocabProgress[id];
      if (!p) return false;
      return (p.srsInterval || 0) >= 21;
    }).length;
    result[lv] = { total, learned, mastered, cats: cats.length };
  });

  return result;
}

/**
 * 어휘 항목 ID의 JLPT 레벨 추론 (카테고리 검색)
 * @param {string}   itemId
 * @param {object[]} categories
 */
export function getItemJLPT(itemId, categories) {
  const cat = categories.find(c => (c.items || []).includes(itemId));
  return cat ? getJLPT(cat.id) : null;
}
