/* ============================================================
   V3 MODULE VISUALS — beginner travel product imagery
   ============================================================ */

'use strict';

window.ModuleVisuals = (() => {
  const VISUALS = {
    v3_kana_map:          { image: 'assets/visuals/kana-grid.svg', focus: '오십음도 구조', tone: 'violet', iconKey: 'module-kana', coverImage: 'assets/visuals/kana-grid.svg' },
    kana_hira:            { image: 'images/lecture-scenes/kana-hiragana-study-desk.webp', focus: '히라가나 읽기', tone: 'violet', iconKey: 'module-kana', coverImage: 'images/lecture-scenes/kana-hiragana-study-desk.webp' },
    kana_kata:            { image: 'images/lecture-scenes/kana-katakana-loanword-cafe.webp', focus: '가타가나 간판 읽기', tone: 'violet', iconKey: 'module-kana', coverImage: 'images/lecture-scenes/kana-katakana-loanword-cafe.webp' },
    v3_kana_sound_rules:  { image: 'images/lecture-scenes/kana-hiragana-study-desk.webp', focus: '발음 규칙', tone: 'violet', iconKey: 'module-kana', coverImage: 'images/lecture-scenes/kana-hiragana-study-desk.webp' },
    v3_first_greetings:   { image: 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.webp', focus: '첫 말문', tone: 'blue', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.webp', roleplayImage: 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.webp' },
    v3_survival_objects:  { image: 'images/lecture-scenes/wlevel4-kosoado-city-directions.webp', focus: '기본 물건·장소', tone: 'blue', iconKey: 'module-map', coverImage: 'images/lecture-scenes/wlevel4-kosoado-city-directions.webp' },
    v3_pronouns_places:   { image: 'images/lecture-scenes/wlevel4-kosoado-city-directions.webp', focus: '대명사 감각', tone: 'blue', iconKey: 'module-map', coverImage: 'images/lecture-scenes/wlevel4-kosoado-city-directions.webp' },
    v3_numbers_time:      { image: 'images/lecture-scenes/wlevel2-elevator-number-culture.webp', focus: '숫자·요일', tone: 'blue', iconKey: 'module-time', coverImage: 'images/lecture-scenes/wlevel2-elevator-number-culture.webp' },
    v3_money_counting:    { image: 'images/lecture-scenes/wlevel2-elevator-number-culture.webp', focus: '돈·수량·날짜', tone: 'blue', iconKey: 'module-time', coverImage: 'images/lecture-scenes/wlevel2-elevator-number-culture.webp' },
    v3_directions_body:   { image: 'images/lecture-scenes/wlevel8-clinic-health-help.webp', focus: '방향·몸', tone: 'blue', iconKey: 'module-health', coverImage: 'images/lecture-scenes/wlevel8-clinic-health-help.webp' },
    v3_particle_basics:   { image: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.webp', focus: '조사 감각', tone: 'emerald', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.webp' },
    v3_question_engine:   { image: 'images/lecture-scenes/wlevel4b-station-location-help.webp', focus: '질문 만들기', tone: 'blue', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/wlevel4b-station-location-help.webp', roleplayImage: 'images/lecture-scenes/wlevel4b-station-location-help.webp' },
    v3_answer_engine:     { image: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.webp', focus: '짧게 대답', tone: 'blue', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.webp', roleplayImage: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.webp' },
    v3_reaction_shadowing:{ image: 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.webp', focus: '리액션 쉐도잉', tone: 'emerald', iconKey: 'module-talk', coverImage: 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.webp' },
    v3_airport:           { image: 'images/roleplay-comics/generated/v3-airport-bg.png', focus: '공항 체크인', tone: 'emerald', iconKey: 'module-map', coverImage: 'images/roleplay-comics/generated/v3-airport-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-airport-bg.png' },
    v3_immigration:       { image: 'images/roleplay-comics/generated/v3-airport-bg.png', focus: '입국 심사', tone: 'emerald', iconKey: 'module-talk', coverImage: 'images/roleplay-comics/generated/v3-airport-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-airport-bg.png' },
    v3_airplane_request:  { image: 'images/roleplay-comics/generated/v3-airport-bg.png', focus: '기내 요청', tone: 'emerald', iconKey: 'module-talk', coverImage: 'images/roleplay-comics/generated/v3-airport-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-airport-bg.png' },
    v3_transport:         { image: 'images/roleplay-comics/generated/v3-transit-bg.png', focus: '전철·길 찾기', tone: 'amber', iconKey: 'module-map', coverImage: 'images/roleplay-comics/generated/v3-transit-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-transit-bg.png' },
    v3_bus_ride:          { image: 'images/roleplay-comics/generated/v3-transit-bg.png', focus: '버스 목적지', tone: 'amber', iconKey: 'module-map', coverImage: 'images/roleplay-comics/generated/v3-transit-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-transit-bg.png' },
    v3_taxi_ride:         { image: 'images/roleplay-comics/generated/v3-transit-bg.png', focus: '택시 이동', tone: 'amber', iconKey: 'module-map', coverImage: 'images/roleplay-comics/generated/v3-transit-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-transit-bg.png' },
    v3_konbini:           { image: 'images/roleplay-comics/generated/v3-shop-bg.png', focus: '편의점 결제', tone: 'rose', iconKey: 'module-order', coverImage: 'images/roleplay-comics/generated/v3-shop-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-shop-bg.png' },
    v3_cafe_breakfast:    { image: 'images/roleplay-comics/generated/v3-food-bg.png', focus: '카페·조식', tone: 'rose', iconKey: 'module-order', coverImage: 'images/roleplay-comics/generated/v3-food-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-food-bg.png' },
    v3_restaurant:        { image: 'images/roleplay-comics/generated/v3-food-bg.png', focus: '혼자 주문', tone: 'rose', iconKey: 'module-order', coverImage: 'images/roleplay-comics/generated/v3-food-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-food-bg.png' },
    v3_izakaya:           { image: 'images/roleplay-comics/generated/v3-food-bg.png', focus: '술집 주문', tone: 'rose', iconKey: 'module-order', coverImage: 'images/roleplay-comics/generated/v3-food-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-food-bg.png' },
    v3_shopping:          { image: 'images/roleplay-comics/generated/v3-shop-bg.png', focus: '사이즈·가격', tone: 'slate', iconKey: 'module-map', coverImage: 'images/roleplay-comics/generated/v3-shop-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-shop-bg.png' },
    v3_store_payment:     { image: 'images/roleplay-comics/generated/v3-shop-bg.png', focus: '상점 결제', tone: 'slate', iconKey: 'module-order', coverImage: 'images/roleplay-comics/generated/v3-shop-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-shop-bg.png' },
    v3_duty_free:         { image: 'images/roleplay-comics/generated/v3-airport-bg.png', focus: '면세점', tone: 'slate', iconKey: 'module-order', coverImage: 'images/roleplay-comics/generated/v3-airport-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-airport-bg.png' },
    v3_hotel:             { image: 'images/roleplay-comics/generated/v3-hotel-onsen-bg.png', focus: '체크인', tone: 'teal', iconKey: 'module-talk', coverImage: 'images/roleplay-comics/generated/v3-hotel-onsen-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-hotel-onsen-bg.png' },
    v3_hotel_request:     { image: 'images/roleplay-comics/generated/v3-hotel-onsen-bg.png', focus: '객실 요청', tone: 'teal', iconKey: 'module-talk', coverImage: 'images/roleplay-comics/generated/v3-hotel-onsen-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-hotel-onsen-bg.png' },
    v3_onsen:             { image: 'images/roleplay-comics/generated/v3-hotel-onsen-bg.png', focus: '온천 규칙', tone: 'teal', iconKey: 'module-talk', coverImage: 'images/roleplay-comics/generated/v3-hotel-onsen-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-hotel-onsen-bg.png' },
    v3_health:            { image: 'images/roleplay-comics/generated/v3-health-trouble-bg.png', focus: '약국 증상', tone: 'violet', iconKey: 'module-health', coverImage: 'images/roleplay-comics/generated/v3-health-trouble-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-health-trouble-bg.png' },
    v3_hospital:          { image: 'images/roleplay-comics/generated/v3-health-trouble-bg.png', focus: '병원 접수', tone: 'violet', iconKey: 'module-health', coverImage: 'images/roleplay-comics/generated/v3-health-trouble-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-health-trouble-bg.png' },
    v3_lost_and_help:     { image: 'images/roleplay-comics/generated/v3-health-trouble-bg.png', focus: '분실·도움 요청', tone: 'violet', iconKey: 'module-map', coverImage: 'images/roleplay-comics/generated/v3-health-trouble-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-health-trouble-bg.png' },
    v3_rentacar:          { image: 'images/roleplay-comics/generated/v3-local-travel-bg.png', focus: '렌트카', tone: 'amber', iconKey: 'module-map', coverImage: 'images/roleplay-comics/generated/v3-local-travel-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-local-travel-bg.png' },
    v3_tourist_spot:      { image: 'images/roleplay-comics/generated/v3-local-travel-bg.png', focus: '관광지·사진', tone: 'amber', iconKey: 'module-map', coverImage: 'images/roleplay-comics/generated/v3-local-travel-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-local-travel-bg.png' },
    v3_reservation_call:  { image: 'images/roleplay-comics/generated/v3-local-travel-bg.png', focus: '예약 확인', tone: 'amber', iconKey: 'module-talk', coverImage: 'images/roleplay-comics/generated/v3-local-travel-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-local-travel-bg.png' },
    v3_weather_plan:      { image: 'images/roleplay-comics/generated/v3-local-travel-bg.png', focus: '일정 변경', tone: 'amber', iconKey: 'module-time', coverImage: 'images/roleplay-comics/generated/v3-local-travel-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-local-travel-bg.png' },
    v3_polite_wrapup:     { image: 'images/roleplay-comics/generated/v3-local-travel-bg.png', focus: '감사 마무리', tone: 'amber', iconKey: 'module-talk', coverImage: 'images/roleplay-comics/generated/v3-local-travel-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-local-travel-bg.png' },
    v3_drama_reactions:   { image: 'images/roleplay-comics/generated/v3-local-travel-bg.png', focus: '짧은 반응어', tone: 'rose', iconKey: 'module-talk', coverImage: 'images/roleplay-comics/generated/v3-local-travel-bg.png' },
    v3_drama_daily:       { image: 'images/roleplay-comics/generated/v3-local-travel-bg.png', focus: '일상 대사', tone: 'rose', iconKey: 'module-talk', coverImage: 'images/roleplay-comics/generated/v3-local-travel-bg.png', roleplayImage: 'images/roleplay-comics/generated/v3-local-travel-bg.png' },
  };

  const FALLBACK = {
    image: 'assets/visuals/advanced-ribbon.svg',
    focus: 'v3 학습',
    tone: 'slate',
    iconKey: 'module-advanced'
  };

  function get(mod) {
    return VISUALS[mod?.id] || FALLBACK;
  }

  return { get };
})();
