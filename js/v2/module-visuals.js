/* ============================================================
   일본어 마스터 v2 — Module visual metadata
   ============================================================ */

'use strict';

window.ModuleVisuals = (() => {
  const VISUALS = {
    kana_hira:         { image: 'assets/visuals/kana-grid.svg',       focus: '행 단위 문자 자동화', tone: 'violet', iconKey: 'module-kana' },
    kana_kata:         { image: 'assets/visuals/kana-grid.svg',       focus: '외래어 읽기 기반', tone: 'violet', iconKey: 'module-kana' },
    first_phrases:     { image: 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.png', focus: '첫 인사 패턴', tone: 'violet', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.png' },
    survival_greet:    { image: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.png', focus: '자기소개', tone: 'blue', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.png', roleplayImage: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.png' },
    survival_pointing: { image: 'images/lecture-scenes/wlevel4-kosoado-city-directions.png', focus: '지시어 감각', tone: 'blue', iconKey: 'module-map', coverImage: 'images/lecture-scenes/wlevel4-kosoado-city-directions.png', roleplayImage: 'images/lecture-scenes/wlevel4-kosoado-city-directions.png' },
    survival_numbers:  { image: 'images/lecture-scenes/wlevel2-elevator-number-culture.png', focus: '숫자·시간', tone: 'blue', iconKey: 'module-time', coverImage: 'images/lecture-scenes/wlevel2-elevator-number-culture.png', roleplayImage: 'images/lecture-scenes/wlevel2-elevator-number-culture.png' },
    survival_location: { image: 'images/lecture-scenes/wlevel4b-station-location-help.png', focus: '위치·존재', tone: 'blue', iconKey: 'module-map', coverImage: 'images/lecture-scenes/wlevel4b-station-location-help.png', roleplayImage: 'images/lecture-scenes/wlevel4b-station-location-help.png' },
    survival_transport:{ image: 'images/lecture-scenes/slevel4-train-station-transfer.png', focus: '길 묻기', tone: 'blue', iconKey: 'module-map', coverImage: 'images/lecture-scenes/slevel4-train-station-transfer.png', roleplayImage: 'images/lecture-scenes/slevel4-train-station-transfer.png' },
    survival_food:     { image: 'images/lecture-scenes/wlevel7b-cafe-order-counter.png', focus: '주문·부탁', tone: 'blue', iconKey: 'module-order', coverImage: 'images/lecture-scenes/wlevel7b-cafe-order-counter.png', roleplayImage: 'images/lecture-scenes/wlevel7b-cafe-order-counter.png' },
    survival_shopping: { image: 'images/lecture-scenes/slevel3-convenience-store-checkout.png', focus: '가격·비교', tone: 'blue', iconKey: 'module-map', coverImage: 'images/lecture-scenes/slevel3-convenience-store-checkout.png', roleplayImage: 'images/lecture-scenes/slevel3-convenience-store-checkout.png' },
    survival_hotel:    { image: 'images/lecture-scenes/slevel5-ryokan-checkin-lobby.png', focus: '숙박 요청', tone: 'blue', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/slevel5-ryokan-checkin-lobby.png', roleplayImage: 'images/lecture-scenes/slevel5-ryokan-checkin-lobby.png' },
    daily_adjectives:  { image: 'images/lecture-scenes/wlevel5-verb-dining-action.png', focus: '동사 활용', tone: 'emerald', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/wlevel5-verb-dining-action.png' },
    daily_feelings:    { image: 'images/lecture-scenes/wlevel6-adjective-cafe-comparison.png', focus: '형용사 표현', tone: 'emerald', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/wlevel6-adjective-cafe-comparison.png' },
    daily_places:      { image: 'images/lecture-scenes/slevel6-koban-lost-item-help.png', focus: '장소 설명', tone: 'emerald', iconKey: 'module-map', coverImage: 'images/lecture-scenes/slevel6-koban-lost-item-help.png', roleplayImage: 'images/lecture-scenes/slevel6-koban-lost-item-help.png' },
    daily_health:      { image: 'images/lecture-scenes/wlevel8-clinic-health-help.png', focus: '증상 설명', tone: 'emerald', iconKey: 'module-health', coverImage: 'images/lecture-scenes/wlevel8-clinic-health-help.png', roleplayImage: 'images/lecture-scenes/wlevel8-clinic-health-help.png' },
    it_tech_vocab:     { image: 'images/lecture-scenes/blevel1-it-team-communication.png', focus: 'IT 기초 어휘', tone: 'slate', iconKey: 'module-work', coverImage: 'images/lecture-scenes/blevel1-it-team-communication.png' },
    it_workplace_vocab:{ image: 'images/lecture-scenes/blevel2-horenso-standup-update.png', focus: '조직·직장', tone: 'slate', iconKey: 'module-work', coverImage: 'images/lecture-scenes/blevel2-horenso-standup-update.png', roleplayImage: 'images/lecture-scenes/blevel2-horenso-standup-update.png' },
    biz_basic:         { image: 'images/lecture-scenes/blevel3-business-email-review.png', focus: '비즈니스 표현', tone: 'slate', iconKey: 'module-work', coverImage: 'images/lecture-scenes/blevel3-business-email-review.png', roleplayImage: 'images/lecture-scenes/blevel3-business-email-review.png' },
    biz_meeting:       { image: 'images/lecture-scenes/blevel4-meeting-consensus-room.png', focus: '회의·의견', tone: 'slate', iconKey: 'module-work', coverImage: 'images/lecture-scenes/blevel4-meeting-consensus-room.png', roleplayImage: 'images/lecture-scenes/blevel4-meeting-consensus-room.png' },
    biz_1on1:          { image: 'images/lecture-scenes/blevel5-manager-one-on-one.png', focus: '1on1 대화', tone: 'slate', iconKey: 'module-work', coverImage: 'images/lecture-scenes/blevel5-manager-one-on-one.png', roleplayImage: 'images/lecture-scenes/blevel5-manager-one-on-one.png' },
    biz_intro:         { image: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.png', focus: '입사 소개', tone: 'slate', iconKey: 'module-work', coverImage: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.png', roleplayImage: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.png' },
    biz_spec:          { image: 'images/lecture-scenes/blevel6-requirements-planning-board.png', focus: '사양 확인', tone: 'slate', iconKey: 'module-work', coverImage: 'images/lecture-scenes/blevel6-requirements-planning-board.png', roleplayImage: 'images/lecture-scenes/blevel6-requirements-planning-board.png' },
    adv_keigo:         { image: 'images/lecture-scenes/klevel1-keigo-service-counter.png', focus: '경어 마스터', tone: 'slate', iconKey: 'module-advanced', coverImage: 'images/lecture-scenes/klevel1-keigo-service-counter.png' }
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
