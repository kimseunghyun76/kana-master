/* ============================================================
   V3 MODULE VISUALS - portrait-first beginner travel imagery
   ============================================================ */

'use strict';

window.ModuleVisuals = (() => {
  const pick = values => {
    const list = Array.isArray(values) ? values : [values];
    return list[Math.floor(Math.random() * list.length)];
  };

  const bgRoot = 'images/v3/backgrounds/portrait';
  const STREET = [
    `${bgRoot}/tourist-street/street-cafe-portrait-01.webp`,
    `${bgRoot}/tourist-street/street-cafe-portrait-02.webp`,
    `${bgRoot}/daily-life/friends-casual-talk-01.webp`,
  ];
  const STATION = [
    `${bgRoot}/station/station-konbini-portrait-01.webp`,
    `${bgRoot}/station/station-konbini-portrait-02.webp`,
    `${bgRoot}/bus/bus-stop-01.webp`,
  ];
  const FOOD = [
    `${bgRoot}/cafe/cafe-breakfast-01.webp`,
    `${bgRoot}/restaurant/restaurant-order-01.webp`,
    ...STREET,
  ];
  const SHOP = [
    `${bgRoot}/shopping/clothing-store-01.webp`,
    `${bgRoot}/duty-free/duty-free-shop-01.webp`,
    ...STREET,
  ];
  const DRAMA = [
    `${bgRoot}/drama/drama-sofa-01.webp`,
    `${bgRoot}/drama/emotion-reactions-01.webp`,
    `${bgRoot}/daily-life/friends-casual-talk-01.webp`,
  ];

  window.V3GameAssets = {
    home: pick(STREET),
    airport: `${bgRoot}/airport/airport-checkin-01.webp`,
    airplane: `${bgRoot}/airplane/airplane-cabin-01.webp`,
    bus: pick(STATION),
    dutyFree: `${bgRoot}/duty-free/duty-free-shop-01.webp`,
    hospital: `${bgRoot}/pharmacy/pharmacy-clinic-01.webp`,
    immigration: `${bgRoot}/immigration/immigration-01.webp`,
    koban: `${bgRoot}/koban/koban-lost-found-01.webp`,
    transit: pick(STATION),
    taxi: `${bgRoot}/taxi/taxi-ride-01.webp`,
    rentacar: `${bgRoot}/rentacar/rentacar-counter-01.webp`,
    shop: pick(SHOP),
    food: pick(FOOD),
    izakaya: `${bgRoot}/izakaya/izakaya-01.webp`,
    konbini: `${bgRoot}/konbini/konbini-checkout-01.webp`,
    hotel: `${bgRoot}/hotel/hotel-lobby-01.webp`,
    onsen: `${bgRoot}/onsen/onsen-ryokan-rules-01.webp`,
    trouble: `${bgRoot}/pharmacy/pharmacy-clinic-01.webp`,
    local: pick(STREET),
    drama: pick(DRAMA),
    kanaDesk: pick(STREET),
    katakanaCafe: pick(FOOD),
    greetingClass: pick(STREET),
    mapHelp: pick(STREET),
    introLobby: pick(STREET),
    stationTransfer: pick(STATION),
    ryokanLobby: `${bgRoot}/hotel/hotel-lobby-01.webp`,
    kobanHelp: `${bgRoot}/koban/koban-lost-found-01.webp`,
    sightseeing: pick(STREET),
    counter: `${bgRoot}/konbini/konbini-checkout-01.webp`,
    calendar: pick(STREET),
    cityDirections: pick(STREET),
    stationHelp: pick(STATION),
    dining: pick(FOOD),
    cafeCompare: pick(FOOD),
    cafeOrder: `${bgRoot}/cafe/cafe-breakfast-01.webp`,
    hotelFront: `${bgRoot}/hotel/hotel-lobby-01.webp`,
    clinic: `${bgRoot}/pharmacy/pharmacy-clinic-01.webp`,
    foodScene: pick(FOOD),
    localScene: pick(STREET),
    transitScene: pick(STATION),
    airportScene: `${bgRoot}/airport/airport-checkin-01.webp`,
    shopScene: pick(SHOP),
    hotelScene: `${bgRoot}/hotel/hotel-lobby-01.webp`,
    troubleScene: `${bgRoot}/pharmacy/pharmacy-clinic-01.webp`,
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
    v3_reaction_shadowing:{ image: G.drama, focus: '리액션 쉐도잉', tone: 'cute', iconKey: 'module-talk', coverImage: G.drama, roleplayImage: G.drama },
    v3_airport:           { image: G.airport, focus: '공항 체크인', tone: 'cute', iconKey: 'module-map', coverImage: G.airport, roleplayImage: G.airportScene },
    v3_immigration:       { image: G.immigration, focus: '입국 심사', tone: 'cute', iconKey: 'module-talk', coverImage: G.immigration, roleplayImage: G.immigration },
    v3_airplane_request:  { image: G.airplane, focus: '기내 요청', tone: 'cute', iconKey: 'module-talk', coverImage: G.airplane, roleplayImage: G.airplane },
    v3_transport:         { image: G.transit, focus: '전철·길 찾기', tone: 'cute', iconKey: 'module-map', coverImage: G.transit, roleplayImage: G.transitScene },
    v3_bus_ride:          { image: G.bus, focus: '버스 목적지', tone: 'cute', iconKey: 'module-map', coverImage: G.bus, roleplayImage: G.bus },
    v3_taxi_ride:         { image: G.taxi, focus: '택시 이동', tone: 'cute', iconKey: 'module-map', coverImage: G.taxi, roleplayImage: G.taxi },
    v3_konbini:           { image: G.konbini, focus: '편의점 결제', tone: 'cute', iconKey: 'module-order', coverImage: G.konbini, roleplayImage: G.konbini },
    v3_cafe_breakfast:    { image: G.cafeOrder, focus: '카페·조식', tone: 'cute', iconKey: 'module-order', coverImage: G.cafeOrder, roleplayImage: G.cafeOrder },
    v3_restaurant:        { image: G.dining, focus: '혼자 주문', tone: 'cute', iconKey: 'module-order', coverImage: G.dining, roleplayImage: G.foodScene },
    v3_izakaya:           { image: G.izakaya, focus: '술집 주문', tone: 'cute', iconKey: 'module-order', coverImage: G.izakaya, roleplayImage: G.izakaya },
    v3_shopping:          { image: G.shop, focus: '사이즈·가격', tone: 'cute', iconKey: 'module-map', coverImage: G.shop, roleplayImage: G.shopScene },
    v3_store_payment:     { image: G.shopScene, focus: '상점 결제', tone: 'cute', iconKey: 'module-order', coverImage: G.shopScene, roleplayImage: G.shopScene },
    v3_duty_free:         { image: G.dutyFree, focus: '면세점', tone: 'cute', iconKey: 'module-order', coverImage: G.dutyFree, roleplayImage: G.dutyFree },
    v3_hotel:             { image: G.hotel, focus: '체크인', tone: 'cute', iconKey: 'module-talk', coverImage: G.hotel, roleplayImage: G.hotelScene },
    v3_hotel_request:     { image: G.hotelFront, focus: '객실 요청', tone: 'cute', iconKey: 'module-talk', coverImage: G.hotelFront, roleplayImage: G.hotelFront },
    v3_onsen:             { image: G.onsen, focus: '온천 규칙', tone: 'cute', iconKey: 'module-talk', coverImage: G.onsen, roleplayImage: G.onsen },
    v3_health:            { image: G.trouble, focus: '약국 증상', tone: 'cute', iconKey: 'module-health', coverImage: G.trouble, roleplayImage: G.troubleScene },
    v3_hospital:          { image: G.hospital, focus: '병원 접수', tone: 'cute', iconKey: 'module-health', coverImage: G.hospital, roleplayImage: G.hospital },
    v3_lost_and_help:     { image: G.koban, focus: '분실·도움 요청', tone: 'cute', iconKey: 'module-map', coverImage: G.koban, roleplayImage: G.koban },
    v3_rentacar:          { image: G.rentacar, focus: '렌트카', tone: 'cute', iconKey: 'module-map', coverImage: G.rentacar, roleplayImage: G.rentacar },
    v3_tourist_spot:      { image: G.sightseeing, focus: '관광지·사진', tone: 'cute', iconKey: 'module-map', coverImage: G.sightseeing, roleplayImage: G.sightseeing },
    v3_reservation_call:  { image: G.hotelFront, focus: '예약 확인', tone: 'cute', iconKey: 'module-talk', coverImage: G.hotelFront, roleplayImage: G.hotelFront },
    v3_weather_plan:      { image: G.local, focus: '일정 변경', tone: 'cute', iconKey: 'module-time', coverImage: G.local, roleplayImage: G.localScene },
    v3_polite_wrapup:     { image: G.introLobby, focus: '감사 마무리', tone: 'cute', iconKey: 'module-talk', coverImage: G.introLobby, roleplayImage: G.introLobby },
    v3_drama_reactions:   { image: G.drama, focus: '짧은 반응어', tone: 'cute', iconKey: 'module-talk', coverImage: G.drama, roleplayImage: G.drama },
    v3_drama_daily:       { image: G.drama, focus: '일상 대사', tone: 'cute', iconKey: 'module-talk', coverImage: G.drama, roleplayImage: G.drama },
  };

  const FALLBACK = {
    image: G.local || 'assets/visuals/advanced-ribbon.svg',
    focus: 'v3 학습',
    tone: 'cute',
    iconKey: 'module-advanced'
  };

  function get(mod) {
    return VISUALS[mod?.id] || FALLBACK;
  }

  return { get };
})();
