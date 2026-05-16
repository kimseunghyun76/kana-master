/* ============================================================
   V3 ROLEPLAY ART — Japan-local scene and cute character map
   Extends the shared v2 roleplay renderer without touching v2 data.
   ============================================================ */

'use strict';

(() => {
  const base = window.RoleplayArt || { byModule: {} };
  const V = {
    nanami: {
      body: 'images/v3-game/characters/yuna-body.webp',
      face: 'images/v3-game/characters/yuna-face.webp',
    },
    aoi: {
      body: 'images/v3-game/characters/mika-body.webp',
      face: 'images/v3-game/characters/mika-face.webp',
    },
    mayu: {
      body: 'images/v3-game/characters/akari-body.webp',
      face: 'images/v3-game/characters/akari-face.webp',
    },
    keita: {
      body: 'images/v3-game/characters/ren-body.webp',
      face: 'images/v3-game/characters/ren-face.webp',
    },
    takumi: {
      body: 'images/v3-game/characters/takumi-body.webp',
      face: 'images/v3-game/characters/takumi-face.webp',
    },
  };
  const BG = {
    airport: 'images/v3-game/bg-airport-terminal.webp',
    transit: 'images/v3-game/bg-transit-station.webp',
    food: 'images/v3-game/bg-shop-cafe.webp',
    shop: 'images/v3-game/bg-shop-cafe.webp',
    hotel: 'images/v3-game/bg-hotel-onsen.webp',
    trouble: 'images/v3-game/bg-health-clinic.webp',
    local: 'images/v3-game/home-urban-night.webp',
    fallbackAirport: 'images/lecture-scenes/slevel4-train-station-transfer.webp',
    fallbackTransit: 'images/roleplay-comics/generated/transport-bg.webp',
    fallbackFood: 'images/roleplay-comics/generated/food-bg.webp',
    fallbackShop: 'images/roleplay-comics/generated/retail-bg.webp',
    fallbackHotel: 'images/roleplay-comics/generated/hotel-bg.webp',
    fallbackTrouble: 'images/roleplay-comics/generated/health-bg.webp',
    fallbackLocal: 'images/roleplay-comics/generated/sightseeing-bg.webp',
  };

  const pair = (bg, a = V.nanami, b = V.mayu, c = V.keita) => ({
    bg,
    characters: { A: a.body, B: b.body, C: c.body },
    faces: { A: a.face, B: b.face, C: c.face },
  });

  const byModule = {
    ...base.byModule,
    v3_first_greetings: pair(BG.local, V.aoi, V.nanami),
    v3_question_engine: pair(BG.shop, V.nanami, V.mayu),
    v3_answer_engine: pair(BG.local, V.nanami, V.keita),
    v3_airport: pair(BG.airport, V.nanami, V.keita),
    v3_immigration: pair(BG.airport, V.aoi, V.takumi),
    v3_airplane_request: pair(BG.airport, V.nanami, V.mayu),
    v3_transport: pair(BG.transit, V.aoi, V.takumi),
    v3_bus_ride: pair(BG.transit, V.nanami, V.keita),
    v3_taxi_ride: pair(BG.transit, V.aoi, V.keita),
    v3_konbini: pair(BG.shop, V.nanami, V.mayu),
    v3_cafe_breakfast: pair(BG.food, V.aoi, V.mayu),
    v3_restaurant: pair(BG.food, V.keita, V.mayu),
    v3_izakaya: pair(BG.food, V.nanami, V.keita, V.mayu),
    v3_shopping: pair(BG.shop, V.aoi, V.mayu),
    v3_store_payment: pair(BG.shop, V.nanami, V.mayu),
    v3_duty_free: pair(BG.airport, V.aoi, V.mayu),
    v3_hotel: pair(BG.hotel, V.nanami, V.takumi),
    v3_hotel_request: pair(BG.hotel, V.aoi, V.takumi),
    v3_onsen: pair(BG.hotel, V.nanami, V.mayu),
    v3_health: pair(BG.trouble, V.aoi, V.mayu),
    v3_hospital: pair(BG.trouble, V.nanami, V.mayu, V.keita),
    v3_lost_and_help: pair(BG.trouble, V.aoi, V.takumi),
    v3_rentacar: pair(BG.local, V.keita, V.nanami),
    v3_tourist_spot: pair(BG.local, V.nanami, V.keita),
    v3_reservation_call: pair(BG.local, V.aoi, V.mayu),
    v3_weather_plan: pair(BG.local, V.nanami, V.keita),
    v3_polite_wrapup: pair(BG.local, V.aoi, V.nanami),
    v3_drama_daily: pair(BG.local, V.aoi, V.keita),
  };

  window.RoleplayArt = {
    ...base,
    byModule,
  };
})();
