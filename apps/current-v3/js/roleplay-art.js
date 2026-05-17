/* ============================================================
   V3 ROLEPLAY ART — bright Japan-local scene and cute character map
   Extends the shared v2 roleplay renderer without touching v2 data.
   ============================================================ */

'use strict';

(() => {
  const base = window.RoleplayArt || { byModule: {} };
  const V = {
    nanami: {
      body: 'images/v3-cute/characters/akari-body.webp',
      face: 'images/v3-cute/characters/akari-face.webp',
    },
    aoi: {
      body: 'images/v3-cute/characters/yuna-body.webp',
      face: 'images/v3-cute/characters/yuna-face.webp',
    },
    mayu: {
      body: 'images/v3-cute/characters/mika-body.webp',
      face: 'images/v3-cute/characters/mika-face.webp',
    },
    keita: {
      body: 'images/v3-cute/characters/takumi-body.webp',
      face: 'images/v3-cute/characters/takumi-face.webp',
    },
    takumi: {
      body: 'images/v3-cute/characters/ren-body.webp',
      face: 'images/v3-cute/characters/ren-face.webp',
    },
  };
  const BG = {
    airport: 'images/v3-generated/bg-station.webp',
    transit: 'images/v3-generated/bg-station.webp',
    food: 'images/v3-generated/bg-shop-cafe.webp',
    shop: 'images/v3-generated/bg-shop-cafe.webp',
    hotel: 'images/v3-generated/bg-hotel-ryokan.webp',
    trouble: 'images/v3-cute/bg-pharmacy-clinic-pastel.webp',
    local: 'images/v3-generated/bg-home-street.webp',
    fallbackAirport: 'images/lecture-scenes/slevel4-train-station-transfer.webp',
    fallbackTransit: 'images/roleplay-comics/generated/transport-bg.webp',
    fallbackFood: 'images/roleplay-comics/generated/food-bg.webp',
    fallbackShop: 'images/roleplay-comics/generated/retail-bg.webp',
    fallbackHotel: 'images/roleplay-comics/generated/hotel-bg.webp',
    fallbackTrouble: 'images/roleplay-comics/generated/health-bg.webp',
    fallbackLocal: 'images/roleplay-comics/generated/sightseeing-bg.webp',
  };

  const distinctPair = (a, b) => (a.body === b.body ? V.keita : b);
  const pair = (bg, a = V.nanami, b = V.keita, c = V.mayu) => {
    const second = distinctPair(a, b);
    return {
      bg,
      characters: { A: a.body, B: second.body, C: c.body },
      faces: { A: a.face, B: second.face, C: c.face },
    };
  };

  const byModule = {
    ...base.byModule,
    v3_kana_map: pair(BG.local, V.nanami, V.mayu),
    kana_hira: pair(BG.local, V.aoi, V.nanami),
    kana_kata: pair(BG.shop, V.nanami, V.keita),
    v3_kana_sound_rules: pair(BG.transit, V.aoi, V.keita),
    v3_survival_objects: pair(BG.shop, V.nanami, V.mayu),
    v3_particle_basics: pair(BG.local, V.aoi, V.nanami),
    v3_tense_matrix: pair(BG.food, V.nanami, V.keita),
    v3_pronouns_places: pair(BG.shop, V.nanami, V.mayu),
    v3_directions_body: pair(BG.transit, V.aoi, V.takumi),
    v3_numbers_time: pair(BG.local, V.nanami, V.keita),
    v3_money_counting: pair(BG.shop, V.aoi, V.mayu),
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
    v3_reaction_shadowing: pair(BG.local, V.nanami, V.keita),
    v3_drama_reactions: pair(BG.local, V.aoi, V.keita),
    v3_drama_daily: pair(BG.local, V.aoi, V.keita),
  };

  window.RoleplayArt = {
    ...base,
    byModule,
  };
})();
