/* ============================================================
   V3 MODULE VISUALS — bright beginner travel imagery
   ============================================================ */

'use strict';

window.ModuleVisuals = (() => {
  window.V3GameAssets = {
    home: 'images/v3-generated/bg-home-street.webp',
    airport: 'images/v3-generated/bg-station.webp',
    transit: 'images/v3-generated/bg-station.webp',
    shop: 'images/v3-generated/bg-shop-cafe.webp',
    food: 'images/v3-generated/bg-shop-cafe.webp',
    hotel: 'images/v3-generated/bg-hotel-ryokan.webp',
    trouble: 'images/v3-cute/bg-pharmacy-clinic-pastel.webp',
    local: 'images/v3-generated/bg-home-street.webp',
    kanaDesk: 'images/v3-generated/bg-home-street.webp',
    katakanaCafe: 'images/v3-generated/bg-shop-cafe.webp',
    greetingClass: 'images/v3-generated/bg-home-street.webp',
    mapHelp: 'images/v3-generated/roleplay-map-help.webp',
    introLobby: 'images/v3-generated/bg-home-street.webp',
    konbini: 'images/v3-generated/bg-shop-cafe.webp',
    stationTransfer: 'images/v3-generated/bg-station.webp',
    ryokanLobby: 'images/v3-generated/bg-hotel-ryokan.webp',
    kobanHelp: 'images/v3-cute/bg-pharmacy-clinic-pastel.webp',
    sightseeing: 'images/v3-generated/bg-home-street.webp',
    counter: 'images/v3-generated/bg-shop-cafe.webp',
    calendar: 'images/v3-generated/bg-home-street.webp',
    cityDirections: 'images/v3-generated/bg-home-street.webp',
    stationHelp: 'images/v3-generated/bg-station.webp',
    dining: 'images/v3-generated/bg-shop-cafe.webp',
    cafeCompare: 'images/v3-generated/bg-home-street.webp',
    izakaya: 'images/v3-generated/bg-shop-cafe.webp',
    cafeOrder: 'images/v3-generated/bg-shop-cafe.webp',
    hotelFront: 'images/v3-generated/bg-hotel-ryokan.webp',
    clinic: 'images/v3-cute/bg-pharmacy-clinic-pastel.webp',
    foodScene: 'images/v3-generated/bg-shop-cafe.webp',
    localScene: 'images/v3-generated/bg-home-street.webp',
    transitScene: 'images/v3-generated/bg-station.webp',
    airportScene: 'images/v3-generated/bg-station.webp',
    shopScene: 'images/v3-generated/bg-shop-cafe.webp',
    hotelScene: 'images/v3-generated/bg-hotel-ryokan.webp',
    troubleScene: 'images/roleplay-comics/generated/v3-health-trouble-bg.png',
  };

  const G = window.V3GameAssets;
  const VISUALS = {
    v3_kana_map:          { image: G.home, focus: '오십음도 구조', tone: 'cute', iconKey: 'module-kana', coverImage: G.home, roleplayImage: G.home },
    kana_hira:            { image: G.kanaDesk, focus: '히라가나 읽기', tone: 'cute', iconKey: 'module-kana', coverImage: G.kanaDesk, roleplayImage: G.kanaDesk },
    kana_kata:            { image: G.katakanaCafe, focus: '가타카나 간판 읽기', tone: 'cute', iconKey: 'module-kana', coverImage: G.katakanaCafe, roleplayImage: G.katakanaCafe },
    v3_kana_sound_rules:  { image: G.stationTransfer, focus: '발음 규칙', tone: 'cute', iconKey: 'module-kana', coverImage: G.stationTransfer, roleplayImage: G.stationTransfer },
    v3_first_greetings:   { image: G.greetingClass, focus: '첫 말문', tone: 'cute', iconKey: 'module-talk', coverImage: G.greetingClass, roleplayImage: G.greetingClass },
    v3_survival_objects:  { image: G.konbini, focus: '기본 물건·장소', tone: 'cute', iconKey: 'module-map', coverImage: G.konbini, roleplayImage: G.konbini },
    v3_pronouns_places:   { image: G.cityDirections, focus: '대명사 감각', tone: 'cute', iconKey: 'module-map', coverImage: G.cityDirections, roleplayImage: G.cityDirections },
    v3_numbers_time:      { image: G.calendar, focus: '숫자·요일', tone: 'cute', iconKey: 'module-time', coverImage: G.calendar, roleplayImage: G.calendar },
    v3_money_counting:    { image: G.counter, focus: '돈·수량·날짜', tone: 'cute', iconKey: 'module-time', coverImage: G.counter, roleplayImage: G.counter },
    v3_directions_body:   { image: G.stationHelp, focus: '방향·몸', tone: 'cute', iconKey: 'module-health', coverImage: G.stationHelp, roleplayImage: G.stationHelp },
    v3_particle_basics:   { image: G.introLobby, focus: '조사 감각', tone: 'cute', iconKey: 'module-talk', coverImage: G.introLobby, roleplayImage: G.introLobby },
    v3_tense_matrix:      { image: G.cafeCompare, focus: '현재·부정·과거', tone: 'cute', iconKey: 'module-talk', coverImage: G.cafeCompare, roleplayImage: G.cafeCompare },
    v3_question_engine:   { image: G.transitScene, focus: '질문 만들기', tone: 'cute', iconKey: 'module-talk', coverImage: G.transitScene, roleplayImage: G.transitScene },
    v3_answer_engine:     { image: G.localScene, focus: '짧게 대답', tone: 'cute', iconKey: 'module-talk', coverImage: G.localScene, roleplayImage: G.localScene },
    v3_reaction_shadowing:{ image: G.sightseeing, focus: '리액션 쉐도잉', tone: 'cute', iconKey: 'module-talk', coverImage: G.sightseeing, roleplayImage: G.sightseeing },
    v3_airport:           { image: G.airport, focus: '공항 체크인', tone: 'cute', iconKey: 'module-map', coverImage: G.airport, roleplayImage: G.airportScene },
    v3_immigration:       { image: G.airportScene, focus: '입국 심사', tone: 'cute', iconKey: 'module-talk', coverImage: G.airportScene, roleplayImage: G.airportScene },
    v3_airplane_request:  { image: G.airport, focus: '기내 요청', tone: 'cute', iconKey: 'module-talk', coverImage: G.airport, roleplayImage: G.airport },
    v3_transport:         { image: G.transit, focus: '전철·길 찾기', tone: 'cute', iconKey: 'module-map', coverImage: G.transit, roleplayImage: G.transitScene },
    v3_bus_ride:          { image: G.transitScene, focus: '버스 목적지', tone: 'cute', iconKey: 'module-map', coverImage: G.transitScene, roleplayImage: G.transitScene },
    v3_taxi_ride:         { image: G.stationTransfer, focus: '택시 이동', tone: 'cute', iconKey: 'module-map', coverImage: G.stationTransfer, roleplayImage: G.transit },
    v3_konbini:           { image: G.shopScene, focus: '편의점 결제', tone: 'cute', iconKey: 'module-order', coverImage: G.shopScene, roleplayImage: G.shopScene },
    v3_cafe_breakfast:    { image: G.cafeOrder, focus: '카페·조식', tone: 'cute', iconKey: 'module-order', coverImage: G.cafeOrder, roleplayImage: G.cafeOrder },
    v3_restaurant:        { image: G.dining, focus: '혼자 주문', tone: 'cute', iconKey: 'module-order', coverImage: G.dining, roleplayImage: G.foodScene },
    v3_izakaya:           { image: G.izakaya, focus: '술집 주문', tone: 'cute', iconKey: 'module-order', coverImage: G.izakaya, roleplayImage: G.izakaya },
    v3_shopping:          { image: G.shop, focus: '사이즈·가격', tone: 'cute', iconKey: 'module-map', coverImage: G.shop, roleplayImage: G.shopScene },
    v3_store_payment:     { image: G.shopScene, focus: '상점 결제', tone: 'cute', iconKey: 'module-order', coverImage: G.shopScene, roleplayImage: G.shopScene },
    v3_duty_free:         { image: G.airportScene, focus: '면세점', tone: 'cute', iconKey: 'module-order', coverImage: G.airportScene, roleplayImage: G.airportScene },
    v3_hotel:             { image: G.hotel, focus: '체크인', tone: 'cute', iconKey: 'module-talk', coverImage: G.hotel, roleplayImage: G.hotelScene },
    v3_hotel_request:     { image: G.hotelFront, focus: '객실 요청', tone: 'cute', iconKey: 'module-talk', coverImage: G.hotelFront, roleplayImage: G.hotelFront },
    v3_onsen:             { image: G.ryokanLobby, focus: '온천 규칙', tone: 'cute', iconKey: 'module-talk', coverImage: G.ryokanLobby, roleplayImage: G.hotelScene },
    v3_health:            { image: G.trouble, focus: '약국 증상', tone: 'cute', iconKey: 'module-health', coverImage: G.trouble, roleplayImage: G.troubleScene },
    v3_hospital:          { image: G.clinic, focus: '병원 접수', tone: 'cute', iconKey: 'module-health', coverImage: G.clinic, roleplayImage: G.clinic },
    v3_lost_and_help:     { image: G.kobanHelp, focus: '분실·도움 요청', tone: 'cute', iconKey: 'module-map', coverImage: G.kobanHelp, roleplayImage: G.kobanHelp },
    v3_rentacar:          { image: G.localScene, focus: '렌트카', tone: 'cute', iconKey: 'module-map', coverImage: G.localScene, roleplayImage: G.localScene },
    v3_tourist_spot:      { image: G.sightseeing, focus: '관광지·사진', tone: 'cute', iconKey: 'module-map', coverImage: G.sightseeing, roleplayImage: G.sightseeing },
    v3_reservation_call:  { image: G.hotelFront, focus: '예약 확인', tone: 'cute', iconKey: 'module-talk', coverImage: G.hotelFront, roleplayImage: G.hotelFront },
    v3_weather_plan:      { image: G.local, focus: '일정 변경', tone: 'cute', iconKey: 'module-time', coverImage: G.local, roleplayImage: G.localScene },
    v3_polite_wrapup:     { image: G.introLobby, focus: '감사 마무리', tone: 'cute', iconKey: 'module-talk', coverImage: G.introLobby, roleplayImage: G.introLobby },
    v3_drama_reactions:   { image: G.cafeCompare, focus: '짧은 반응어', tone: 'cute', iconKey: 'module-talk', coverImage: G.cafeCompare, roleplayImage: G.cafeCompare },
    v3_drama_daily:       { image: G.greetingClass, focus: '일상 대사', tone: 'cute', iconKey: 'module-talk', coverImage: G.greetingClass, roleplayImage: G.greetingClass },
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
