/* ============================================================
   V3 MODULE VISUALS — bright beginner travel imagery
   ============================================================ */

'use strict';

window.ModuleVisuals = (() => {
  window.V3GameAssets = {
    home: 'images/v3-cute/home-sakura-street.webp',
    airport: 'images/v3-cute/bg-airport-pastel.webp',
    transit: 'images/v3-cute/bg-station-pastel.webp',
    shop: 'images/v3-cute/bg-shop-cafe-pastel.webp',
    food: 'images/v3-cute/bg-shop-cafe-pastel.webp',
    hotel: 'images/v3-cute/bg-hotel-ryokan-pastel.webp',
    trouble: 'images/v3-cute/bg-pharmacy-clinic-pastel.webp',
    local: 'images/v3-cute/home-sakura-street.webp',
  };
  const G = window.V3GameAssets;
  const VISUALS = {
    v3_kana_map:          { image: G.home, focus: '오십음도 구조', tone: 'cute', iconKey: 'module-kana', coverImage: G.home },
    kana_hira:            { image: G.home, focus: '히라가나 읽기', tone: 'cute', iconKey: 'module-kana', coverImage: G.home },
    kana_kata:            { image: G.shop, focus: '가타가나 간판 읽기', tone: 'cute', iconKey: 'module-kana', coverImage: G.shop },
    v3_kana_sound_rules:  { image: G.transit, focus: '발음 규칙', tone: 'cute', iconKey: 'module-kana', coverImage: G.transit },
    v3_first_greetings:   { image: G.local, focus: '첫 말문', tone: 'cute', iconKey: 'module-talk', coverImage: G.local, roleplayImage: G.local },
    v3_survival_objects:  { image: G.shop, focus: '기본 물건·장소', tone: 'cute', iconKey: 'module-map', coverImage: G.shop },
    v3_pronouns_places:   { image: G.transit, focus: '대명사 감각', tone: 'cute', iconKey: 'module-map', coverImage: G.transit },
    v3_numbers_time:      { image: G.transit, focus: '숫자·요일', tone: 'cute', iconKey: 'module-time', coverImage: G.transit },
    v3_money_counting:    { image: G.shop, focus: '돈·수량·날짜', tone: 'cute', iconKey: 'module-time', coverImage: G.shop },
    v3_directions_body:   { image: G.trouble, focus: '방향·몸', tone: 'cute', iconKey: 'module-health', coverImage: G.trouble },
    v3_particle_basics:   { image: G.local, focus: '조사 감각', tone: 'cute', iconKey: 'module-talk', coverImage: G.local },
    v3_question_engine:   { image: G.transit, focus: '질문 만들기', tone: 'cute', iconKey: 'module-talk', coverImage: G.transit, roleplayImage: G.transit },
    v3_answer_engine:     { image: G.local, focus: '짧게 대답', tone: 'cute', iconKey: 'module-talk', coverImage: G.local, roleplayImage: G.local },
    v3_reaction_shadowing:{ image: G.local, focus: '리액션 쉐도잉', tone: 'cute', iconKey: 'module-talk', coverImage: G.local },
    v3_airport:           { image: G.airport, focus: '공항 체크인', tone: 'cute', iconKey: 'module-map', coverImage: G.airport, roleplayImage: G.airport },
    v3_immigration:       { image: G.airport, focus: '입국 심사', tone: 'cute', iconKey: 'module-talk', coverImage: G.airport, roleplayImage: G.airport },
    v3_airplane_request:  { image: G.airport, focus: '기내 요청', tone: 'cute', iconKey: 'module-talk', coverImage: G.airport, roleplayImage: G.airport },
    v3_transport:         { image: G.transit, focus: '전철·길 찾기', tone: 'cute', iconKey: 'module-map', coverImage: G.transit, roleplayImage: G.transit },
    v3_bus_ride:          { image: G.transit, focus: '버스 목적지', tone: 'cute', iconKey: 'module-map', coverImage: G.transit, roleplayImage: G.transit },
    v3_taxi_ride:         { image: G.transit, focus: '택시 이동', tone: 'cute', iconKey: 'module-map', coverImage: G.transit, roleplayImage: G.transit },
    v3_konbini:           { image: G.shop, focus: '편의점 결제', tone: 'cute', iconKey: 'module-order', coverImage: G.shop, roleplayImage: G.shop },
    v3_cafe_breakfast:    { image: G.food, focus: '카페·조식', tone: 'cute', iconKey: 'module-order', coverImage: G.food, roleplayImage: G.food },
    v3_restaurant:        { image: G.food, focus: '혼자 주문', tone: 'cute', iconKey: 'module-order', coverImage: G.food, roleplayImage: G.food },
    v3_izakaya:           { image: G.food, focus: '술집 주문', tone: 'cute', iconKey: 'module-order', coverImage: G.food, roleplayImage: G.food },
    v3_shopping:          { image: G.shop, focus: '사이즈·가격', tone: 'cute', iconKey: 'module-map', coverImage: G.shop, roleplayImage: G.shop },
    v3_store_payment:     { image: G.shop, focus: '상점 결제', tone: 'cute', iconKey: 'module-order', coverImage: G.shop, roleplayImage: G.shop },
    v3_duty_free:         { image: G.airport, focus: '면세점', tone: 'cute', iconKey: 'module-order', coverImage: G.airport, roleplayImage: G.airport },
    v3_hotel:             { image: G.hotel, focus: '체크인', tone: 'cute', iconKey: 'module-talk', coverImage: G.hotel, roleplayImage: G.hotel },
    v3_hotel_request:     { image: G.hotel, focus: '객실 요청', tone: 'cute', iconKey: 'module-talk', coverImage: G.hotel, roleplayImage: G.hotel },
    v3_onsen:             { image: G.hotel, focus: '온천 규칙', tone: 'cute', iconKey: 'module-talk', coverImage: G.hotel, roleplayImage: G.hotel },
    v3_health:            { image: G.trouble, focus: '약국 증상', tone: 'cute', iconKey: 'module-health', coverImage: G.trouble, roleplayImage: G.trouble },
    v3_hospital:          { image: G.trouble, focus: '병원 접수', tone: 'cute', iconKey: 'module-health', coverImage: G.trouble, roleplayImage: G.trouble },
    v3_lost_and_help:     { image: G.trouble, focus: '분실·도움 요청', tone: 'cute', iconKey: 'module-map', coverImage: G.trouble, roleplayImage: G.trouble },
    v3_rentacar:          { image: G.local, focus: '렌트카', tone: 'cute', iconKey: 'module-map', coverImage: G.local, roleplayImage: G.local },
    v3_tourist_spot:      { image: G.local, focus: '관광지·사진', tone: 'cute', iconKey: 'module-map', coverImage: G.local, roleplayImage: G.local },
    v3_reservation_call:  { image: G.local, focus: '예약 확인', tone: 'cute', iconKey: 'module-talk', coverImage: G.local, roleplayImage: G.local },
    v3_weather_plan:      { image: G.local, focus: '일정 변경', tone: 'cute', iconKey: 'module-time', coverImage: G.local, roleplayImage: G.local },
    v3_polite_wrapup:     { image: G.local, focus: '감사 마무리', tone: 'cute', iconKey: 'module-talk', coverImage: G.local, roleplayImage: G.local },
    v3_drama_reactions:   { image: G.local, focus: '짧은 반응어', tone: 'cute', iconKey: 'module-talk', coverImage: G.local },
    v3_drama_daily:       { image: G.local, focus: '일상 대사', tone: 'cute', iconKey: 'module-talk', coverImage: G.local, roleplayImage: G.local },
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
