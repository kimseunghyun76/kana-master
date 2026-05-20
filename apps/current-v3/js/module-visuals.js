/* ============================================================
   V3 MODULE VISUALS — bright beginner travel imagery
   ============================================================ */

'use strict';

window.ModuleVisuals = (() => {
  const pick = (values, seed = '') => {
    const list = Array.isArray(values) ? values : [values];
    void seed;
    return list[Math.floor(Math.random() * list.length)];
  };

  const isPortraitViewport = () => Number(window.innerHeight || 0) > Number(window.innerWidth || 0);
  const orientedPick = ({ landscape, portrait }, seed) => pick(isPortraitViewport() ? (portrait || landscape) : landscape, seed);
  const STREET = {
    landscape: [
      'images/v3/backgrounds/landscape/wide-life/tourist-street/default.webp',
      'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-01.webp',
      'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-02.webp',
    ],
    portrait: [
      'images/v3/backgrounds/portrait/wide-life/tourist-street/street-cafe-portrait-01.webp',
      'images/v3/backgrounds/portrait/wide-life/tourist-street/street-cafe-portrait-02.webp',
    ],
  };
  const STATION = {
    landscape: [
      'images/v3/backgrounds/landscape/wide-life/station-platform/default.webp',
      'images/v3/backgrounds/landscape/wide-life/station-plaza/station-bus-01.webp',
      'images/v3/backgrounds/landscape/wide-life/station-plaza/station-bus-02.webp',
    ],
    portrait: [
      'images/v3/backgrounds/portrait/wide-life/station-plaza/station-konbini-portrait-01.webp',
      'images/v3/backgrounds/portrait/wide-life/station-plaza/station-konbini-portrait-02.webp',
    ],
  };
  const FOOD = {
    landscape: [
      'images/v3/backgrounds/landscape/wide-life/cafe-restaurant/default.webp',
      'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-01.webp',
      'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-02.webp',
    ],
    portrait: STREET.portrait,
  };
  const SHOP = {
    landscape: [
      'images/v3/backgrounds/landscape/wide-life/clothing-store/default.webp',
      'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-01.webp',
      'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-02.webp',
    ],
    portrait: STREET.portrait,
  };

  window.V3GameAssets = {
    home: orientedPick(STREET, 'home'),
    airport: 'images/v3/backgrounds/landscape/wide-life/airport-checkin/default.webp',
    airplane: 'images/v3/backgrounds/landscape/wide-life/airplane-cabin/default.webp',
    bus: orientedPick({ landscape: ['images/v3/backgrounds/landscape/wide-life/bus-stop/default.webp', ...STATION.landscape], portrait: STATION.portrait }, 'bus'),
    dutyFree: 'images/v3/backgrounds/landscape/wide-life/duty-free-shop/default.webp',
    hospital: 'images/v3/backgrounds/landscape/wide-life/hospital-reception/default.webp',
    immigration: 'images/v3/backgrounds/landscape/wide-life/immigration-booth/default.webp',
    koban: 'images/v3/backgrounds/landscape/wide-life/koban-lost-found/default.webp',
    transit: orientedPick(STATION, 'transit'),
    taxi: 'images/v3/backgrounds/landscape/wide-life/rentacar-taxi/default.webp',
    shop: orientedPick(SHOP, 'shop'),
    food: orientedPick(FOOD, 'food'),
    izakaya: 'images/v3/backgrounds/landscape/wide-life/izakaya/default.webp',
    konbini: 'images/v3/backgrounds/landscape/wide-life/konbini-checkout/default.webp',
    hotel: 'images/v3/backgrounds/landscape/wide-life/hotel-lobby/default.webp',
    onsen: 'images/v3/backgrounds/landscape/wide-life/onsen-ryokan/default.webp',
    trouble: 'images/v3/backgrounds/landscape/wide-life/pharmacy-clinic/default.webp',
    local: orientedPick(STREET, 'local'),
    kanaDesk: orientedPick(STREET, 'kanaDesk'),
    katakanaCafe: orientedPick(FOOD, 'katakanaCafe'),
    greetingClass: orientedPick(STREET, 'greetingClass'),
    mapHelp: orientedPick(STREET, 'mapHelp'),
    introLobby: orientedPick(STREET, 'introLobby'),
    stationTransfer: orientedPick(STATION, 'stationTransfer'),
    ryokanLobby: 'images/v3/backgrounds/landscape/wide-life/hotel-lobby/default.webp',
    kobanHelp: 'images/v3/backgrounds/landscape/wide-life/koban-lost-found/default.webp',
    sightseeing: orientedPick(STREET, 'sightseeing'),
    counter: 'images/v3/backgrounds/landscape/wide-life/konbini-checkout/default.webp',
    calendar: orientedPick(STREET, 'calendar'),
    cityDirections: orientedPick(STREET, 'cityDirections'),
    stationHelp: orientedPick(STATION, 'stationHelp'),
    dining: orientedPick(FOOD, 'dining'),
    cafeCompare: orientedPick(FOOD, 'cafeCompare'),
    cafeOrder: orientedPick(FOOD, 'cafeOrder'),
    hotelFront: 'images/v3/backgrounds/landscape/wide-life/hotel-lobby/default.webp',
    clinic: 'images/v3/backgrounds/landscape/wide-life/pharmacy-clinic/default.webp',
    foodScene: orientedPick(FOOD, 'foodScene'),
    localScene: orientedPick(STREET, 'localScene'),
    transitScene: orientedPick(STATION, 'transitScene'),
    airportScene: 'images/v3/backgrounds/landscape/wide-life/airport-checkin/default.webp',
    shopScene: orientedPick(SHOP, 'shopScene'),
    hotelScene: 'images/v3/backgrounds/landscape/wide-life/hotel-lobby/default.webp',
    troubleScene: 'images/v3/backgrounds/landscape/wide-life/pharmacy-clinic/default.webp',
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
    v3_rentacar:          { image: G.taxi, focus: '렌트카', tone: 'cute', iconKey: 'module-map', coverImage: G.taxi, roleplayImage: G.taxi },
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
