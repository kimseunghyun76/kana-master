/* ============================================================
   일본어 마스터 v2 — Module visual metadata
   ============================================================ */

'use strict';

window.ModuleVisuals = (() => {
  const VISUALS = {
    kana_hira:         { image: 'images/lecture-scenes/kana-hiragana-study-desk.webp', focus: '행 단위 문자 자동화', tone: 'violet', iconKey: 'module-kana', coverImage: 'images/lecture-scenes/kana-hiragana-study-desk.webp' },
    kana_kata:         { image: 'images/lecture-scenes/kana-katakana-loanword-cafe.webp', focus: '외래어 읽기 기반', tone: 'violet', iconKey: 'module-kana', coverImage: 'images/lecture-scenes/kana-katakana-loanword-cafe.webp' },
    first_phrases:     { image: 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.webp', focus: '첫 인사 패턴', tone: 'violet', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.webp' },
    survival_greet:    { image: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.webp', focus: '자기소개', tone: 'blue', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.webp', roleplayImage: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.webp' },
    survival_pointing: { image: 'images/lecture-scenes/wlevel4-kosoado-city-directions.webp', focus: '지시어 감각', tone: 'blue', iconKey: 'module-map', coverImage: 'images/lecture-scenes/wlevel4-kosoado-city-directions.webp', roleplayImage: 'images/lecture-scenes/wlevel4-kosoado-city-directions.webp' },
    survival_numbers:  { image: 'images/lecture-scenes/wlevel2-elevator-number-culture.webp', focus: '숫자·시간', tone: 'blue', iconKey: 'module-time', coverImage: 'images/lecture-scenes/wlevel2-elevator-number-culture.webp', roleplayImage: 'images/lecture-scenes/wlevel2-elevator-number-culture.webp' },
    survival_location: { image: 'images/lecture-scenes/wlevel4b-station-location-help.webp', focus: '위치·존재', tone: 'blue', iconKey: 'module-map', coverImage: 'images/lecture-scenes/wlevel4b-station-location-help.webp', roleplayImage: 'images/lecture-scenes/wlevel4b-station-location-help.webp' },
    survival_transport:{ image: 'images/lecture-scenes/slevel4-train-station-transfer.webp', focus: '길 묻기', tone: 'blue', iconKey: 'module-map', coverImage: 'images/lecture-scenes/slevel4-train-station-transfer.webp', roleplayImage: 'images/lecture-scenes/slevel4-train-station-transfer.webp' },
    survival_food:     { image: 'images/lecture-scenes/wlevel7b-cafe-order-counter.webp', focus: '주문·부탁', tone: 'blue', iconKey: 'module-order', coverImage: 'images/lecture-scenes/wlevel7b-cafe-order-counter.webp', roleplayImage: 'images/lecture-scenes/wlevel7b-cafe-order-counter.webp' },
    survival_shopping: { image: 'images/lecture-scenes/slevel3-convenience-store-checkout.webp', focus: '가격·비교', tone: 'blue', iconKey: 'module-map', coverImage: 'images/lecture-scenes/slevel3-convenience-store-checkout.webp', roleplayImage: 'images/lecture-scenes/slevel3-convenience-store-checkout.webp' },
    survival_hotel:    { image: 'images/lecture-scenes/slevel5-ryokan-checkin-lobby.webp', focus: '숙박 요청', tone: 'blue', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/slevel5-ryokan-checkin-lobby.webp', roleplayImage: 'images/lecture-scenes/slevel5-ryokan-checkin-lobby.webp' },
    daily_adjectives:  { image: 'images/lecture-scenes/wlevel5-verb-dining-action.webp', focus: '동사 활용', tone: 'emerald', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/wlevel5-verb-dining-action.webp' },
    daily_feelings:    { image: 'images/lecture-scenes/wlevel6-adjective-cafe-comparison.webp', focus: '형용사 표현', tone: 'emerald', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/wlevel6-adjective-cafe-comparison.webp' },
    daily_places:      { image: 'images/lecture-scenes/slevel7-sightseeing-cultural-directions.webp', focus: '장소 설명', tone: 'emerald', iconKey: 'module-map', coverImage: 'images/lecture-scenes/slevel7-sightseeing-cultural-directions.webp', roleplayImage: 'images/lecture-scenes/slevel7-sightseeing-cultural-directions.webp' },
    daily_health:      { image: 'images/lecture-scenes/wlevel8-clinic-health-help.webp', focus: '증상 설명', tone: 'emerald', iconKey: 'module-health', coverImage: 'images/lecture-scenes/wlevel8-clinic-health-help.webp', roleplayImage: 'images/lecture-scenes/wlevel8-clinic-health-help.webp' },
    it_tech_vocab:     { image: 'images/lecture-scenes/blevel1-it-team-communication.webp', focus: 'IT 기초 어휘', tone: 'slate', iconKey: 'module-work', coverImage: 'images/lecture-scenes/blevel1-it-team-communication.webp' },
    it_workplace_vocab:{ image: 'images/lecture-scenes/blevel2-horenso-standup-update.webp', focus: '조직·직장', tone: 'slate', iconKey: 'module-work', coverImage: 'images/lecture-scenes/blevel2-horenso-standup-update.webp', roleplayImage: 'images/lecture-scenes/blevel2-horenso-standup-update.webp' },
    biz_basic:         { image: 'images/lecture-scenes/blevel3-business-email-review.webp', focus: '비즈니스 표현', tone: 'slate', iconKey: 'module-work', coverImage: 'images/lecture-scenes/blevel3-business-email-review.webp', roleplayImage: 'images/lecture-scenes/blevel3-business-email-review.webp' },
    biz_meeting:       { image: 'images/lecture-scenes/blevel4-meeting-consensus-room.webp', focus: '회의·의견', tone: 'slate', iconKey: 'module-work', coverImage: 'images/lecture-scenes/blevel4-meeting-consensus-room.webp', roleplayImage: 'images/lecture-scenes/blevel4-meeting-consensus-room.webp' },
    biz_1on1:          { image: 'images/lecture-scenes/blevel5-manager-one-on-one.webp', focus: '1on1 대화', tone: 'slate', iconKey: 'module-work', coverImage: 'images/lecture-scenes/blevel5-manager-one-on-one.webp', roleplayImage: 'images/lecture-scenes/blevel5-manager-one-on-one.webp' },
    biz_intro:         { image: 'images/lecture-scenes/blevel7-onboarding-self-introduction.webp', focus: '입사 소개', tone: 'slate', iconKey: 'module-work', coverImage: 'images/lecture-scenes/blevel7-onboarding-self-introduction.webp', roleplayImage: 'images/lecture-scenes/blevel7-onboarding-self-introduction.webp' },
    biz_spec:          { image: 'images/lecture-scenes/blevel6-requirements-planning-board.webp', focus: '사양 확인', tone: 'slate', iconKey: 'module-work', coverImage: 'images/lecture-scenes/blevel6-requirements-planning-board.webp', roleplayImage: 'images/lecture-scenes/blevel6-requirements-planning-board.webp' },
    adv_keigo:         { image: 'images/lecture-scenes/klevel1-keigo-service-counter.webp', focus: '경어 마스터', tone: 'slate', iconKey: 'module-advanced', coverImage: 'images/lecture-scenes/klevel1-keigo-service-counter.webp' }
  };

  const FALLBACK = {
    image: 'assets/visuals/advanced-ribbon.svg',
    focus: '실전 학습',
    tone: 'slate',
    iconKey: 'module-advanced'
  };

  function get(mod) {
    return VISUALS[mod?.id] || FALLBACK;
  }

  return { get };
})();
