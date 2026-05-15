/* ============================================================
   V3 ROLEPLAY ART — Japan-local scene and cute character map
   Extends the shared v2 roleplay renderer without touching v2 data.
   ============================================================ */

'use strict';

(() => {
  const base = window.RoleplayArt || { byModule: {} };
  const V = {
    nanami: {
      body: 'images/roleplay-comics/generated/characters/v3-nanami-body.png',
      face: 'images/voices/voice-avatar-nanami.png',
    },
    aoi: {
      body: 'images/roleplay-comics/generated/characters/v3-aoi-body.png',
      face: 'images/voices/voice-avatar-aoi.png',
    },
    mayu: {
      body: 'images/roleplay-comics/generated/characters/v3-mayu-body.png',
      face: 'images/voices/voice-avatar-mayu.png',
    },
    keita: {
      body: 'images/roleplay-comics/generated/characters/v3-keita-body.png',
      face: 'images/voices/voice-avatar-keita.png',
    },
  };
  const BG = {
    airport: 'images/roleplay-comics/generated/v3-airport-bg.png',
    transit: 'images/roleplay-comics/generated/v3-transit-bg.png',
    food: 'images/roleplay-comics/generated/v3-food-bg.png',
    shop: 'images/roleplay-comics/generated/v3-shop-bg.png',
    hotel: 'images/roleplay-comics/generated/v3-hotel-onsen-bg.png',
    trouble: 'images/roleplay-comics/generated/v3-health-trouble-bg.png',
    local: 'images/roleplay-comics/generated/v3-local-travel-bg.png',
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
    v3_immigration: pair(BG.airport, V.aoi, V.keita),
    v3_airplane_request: pair(BG.airport, V.nanami, V.mayu),
    v3_transport: pair(BG.transit, V.aoi, V.keita),
    v3_bus_ride: pair(BG.transit, V.nanami, V.keita),
    v3_taxi_ride: pair(BG.transit, V.aoi, V.keita),
    v3_konbini: pair(BG.shop, V.nanami, V.mayu),
    v3_cafe_breakfast: pair(BG.food, V.aoi, V.mayu),
    v3_restaurant: pair(BG.food, V.keita, V.mayu),
    v3_izakaya: pair(BG.food, V.nanami, V.keita, V.mayu),
    v3_shopping: pair(BG.shop, V.aoi, V.mayu),
    v3_store_payment: pair(BG.shop, V.nanami, V.mayu),
    v3_duty_free: pair(BG.airport, V.aoi, V.mayu),
    v3_hotel: pair(BG.hotel, V.nanami, V.keita),
    v3_hotel_request: pair(BG.hotel, V.aoi, V.keita),
    v3_onsen: pair(BG.hotel, V.nanami, V.mayu),
    v3_health: pair(BG.trouble, V.aoi, V.mayu),
    v3_hospital: pair(BG.trouble, V.nanami, V.mayu, V.keita),
    v3_lost_and_help: pair(BG.trouble, V.aoi, V.keita),
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
