/* ============================================================
   V3 ROLEPLAY ART — bright Japan-local scene and cute character map
   Extends the shared v2 roleplay renderer without touching v2 data.
   ============================================================ */

'use strict';

(() => {
  const base = window.RoleplayArt || { byModule: {} };
  const IDENTITIES = {
    nanami: {
      key: 'nanami',
      body: 'images/v3-cute/characters/akari-body.webp',
      face: 'images/v3-cute/characters/faces-mask/nanami-mask-face.webp',
    },
    aoi: {
      key: 'aoi',
      body: 'images/v3-cute/characters/yuna-body.webp',
      face: 'images/v3-cute/characters/faces-mask/aoi-mask-face.webp',
    },
    mayu: {
      key: 'mayu',
      body: 'images/v3-cute/characters/seasonal/mayu-realistic-base.webp',
      face: 'images/v3-cute/characters/faces-mask/mayu-mask-face.webp',
    },
    keita: {
      key: 'keita',
      body: 'images/v3-cute/characters/takumi-body.webp',
      face: 'images/v3-cute/characters/faces-mask/keita-mask-face.webp',
    },
    takumi: {
      key: 'takumi',
      body: 'images/v3-cute/characters/ren-body.webp',
      face: 'images/v3-cute/characters/faces-mask/takumi-mask-face.webp',
    },
  };

  const CURRENT_SEASON = (() => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  })();
  const SEASONS = ['spring', 'summer', 'autumn', 'winter'];
  let touristSeedCounter = 0;

  const hashText = text => String(text || '').split('').reduce((hash, char) => {
    return ((hash << 5) - hash + char.charCodeAt(0)) | 0;
  }, 0);

  const rotatingSeason = seed => {
    const hash = Math.abs(hashText(`${seed}:${CURRENT_SEASON}:${touristSeedCounter += 1}`));
    return SEASONS[hash % SEASONS.length];
  };

  const DEFAULT_ANCHOR = { box: '1024x1536', feetY: 1480, eyeY: 430, scale: 1 };
  const CHARACTER_VARIANTS = {
    nanami: {
      tourist: {
        spring: 'images/v3-cute/characters/variants/nanami-tourist-spring.webp',
        summer: 'images/v3-cute/characters/variants/nanami-tourist-summer.webp',
        autumn: 'images/v3-cute/characters/variants/nanami-tourist-autumn.webp',
        winter: 'images/v3-cute/characters/variants/nanami-tourist-winter.webp',
      },
    },
    aoi: {
      tourist: {
        spring: 'images/v3-cute/characters/variants/aoi-tourist-spring.webp',
        summer: 'images/v3-cute/characters/variants/aoi-tourist-summer.webp',
        autumn: 'images/v3-cute/characters/variants/aoi-tourist-autumn.webp',
        winter: 'images/v3-cute/characters/variants/aoi-tourist-winter.webp',
      },
    },
    mayu: {
      cafe_staff: { default: 'images/v3-cute/characters/variants/mayu-cafe_staff-default.webp' },
      duty_free_staff: { default: 'images/v3-cute/characters/variants/mayu-duty_free_staff-default.webp' },
      konbini_staff: { default: 'images/v3-cute/characters/variants/mayu-konbini_staff-default.webp' },
      pharmacist: { default: 'images/v3-cute/characters/variants/mayu-pharmacist-default.webp' },
      tourist: {
        spring: 'images/v3-cute/characters/seasonal/mayu-tourist-spring-real.webp',
        summer: 'images/v3-cute/characters/seasonal/mayu-tourist-summer-real.webp',
      },
    },
    keita: {
      doctor: { default: 'images/v3-cute/characters/variants/keita-doctor-default.webp' },
      izakaya_staff: { default: 'images/v3-cute/characters/variants/keita-restaurant_staff-default.webp' },
      local: { default: ['images/v3-cute/characters/variants/keita-local-fashion-default.webp'] },
      restaurant_staff: { default: 'images/v3-cute/characters/variants/keita-restaurant_staff-default.webp' },
      taxi_driver: { default: 'images/v3-cute/characters/variants/keita-taxi_driver-default.webp' },
      tourist: {
        autumn: 'images/v3-cute/characters/seasonal/keita-tourist-autumn-trend.webp',
      },
    },
    takumi: {
      hotel_staff: { default: 'images/v3-cute/characters/variants/takumi-hotel_staff-default.webp' },
      local: { default: ['images/v3-cute/characters/variants/takumi-local-fashion-default.webp'] },
      police_staff: { default: 'images/v3-cute/characters/variants/takumi-police_staff-default.webp' },
      station_staff: { default: 'images/v3-cute/characters/variants/takumi-station_staff-default.webp' },
      tourist: {
        winter: 'images/v3-cute/characters/seasonal/takumi-tourist-winter-trend.webp',
      },
    },
  };

  const selectVariant = (value, seed) => {
    if (!Array.isArray(value)) return value;
    if (!value.length) return '';
    return value[Math.abs(hashText(seed)) % value.length];
  };

  const roleVariant = (identity, role, season = CURRENT_SEASON) => {
    const variants = CHARACTER_VARIANTS[identity.key] || {};
    const byRole = variants[role] || {};
    return selectVariant(byRole[season] || byRole.default, `${identity.key}:${role}:${season}`) || identity.body;
  };

  const character = (identity, role = 'tourist', opts = {}) => ({
    identity: identity.key,
    role,
    season: opts.season || CURRENT_SEASON,
    body: roleVariant(identity, role, opts.season || CURRENT_SEASON),
    face: identity.face,
    anchor: DEFAULT_ANCHOR,
  });

  const V = IDENTITIES;
  const BG = {
    airport: 'images/v3-cute/wide-life/bg-airport-checkin-wide-life.webp',
    airplane: 'images/v3-cute/wide-life/bg-airplane-cabin-wide-life.webp',
    bus: 'images/v3-cute/bg-bus-stop-cute.webp',
    dutyFree: 'images/v3-cute/bg-duty-free-shop-cute.webp',
    hospital: 'images/v3-cute/bg-hospital-reception-cute.webp',
    immigration: 'images/v3-cute/bg-immigration-booth-cute.webp',
    koban: 'images/v3-cute/bg-koban-lost-found-cute.webp',
    transit: 'images/v3-cute/wide-life/bg-station-platform-wide-life.webp',
    taxi: 'images/v3-cute/bg-rentacar-taxi-cute.webp',
    konbini: 'images/v3-cute/wide-life/bg-konbini-checkout-wide-life.webp',
    food: 'images/v3-cute/wide-life/bg-cafe-restaurant-wide-life.webp',
    izakaya: 'images/v3-cute/wide-life/bg-izakaya-wide-life.webp',
    shop: 'images/v3-cute/wide-life/bg-clothing-store-wide-life.webp',
    hotel: 'images/v3-cute/wide-life/bg-hotel-lobby-wide-life.webp',
    onsen: 'images/v3-cute/bg-onsen-ryokan-cute.webp',
    trouble: 'images/v3-cute/wide-life/bg-pharmacy-clinic-wide-life.webp',
    local: 'images/v3-cute/wide-life/bg-tourist-street-wide-life.webp',
    fallbackAirport: 'images/v3-cute/wide-life/bg-airport-checkin-wide-life.webp',
    fallbackTransit: 'images/v3-cute/wide-life/bg-station-platform-wide-life.webp',
    fallbackFood: 'images/v3-cute/wide-life/bg-cafe-restaurant-wide-life.webp',
    fallbackShop: 'images/v3-cute/wide-life/bg-clothing-store-wide-life.webp',
    fallbackHotel: 'images/v3-cute/wide-life/bg-hotel-lobby-wide-life.webp',
    fallbackTrouble: 'images/v3-cute/wide-life/bg-pharmacy-clinic-wide-life.webp',
    fallbackLocal: 'images/v3-cute/wide-life/bg-tourist-street-wide-life.webp',
  };

  const distinctPair = (a, b) => (a.identity === b.identity ? character(V.keita, b.role, b) : b);
  const pair = (bg, a = character(V.nanami), b = character(V.keita), c = character(V.mayu)) => {
    const second = distinctPair(a, b);
    return {
      bg,
      characters: { A: a.body, B: second.body, C: c.body },
      faces: { A: a.face, B: second.face, C: c.face },
      characterSpecs: { A: a, B: second, C: c },
    };
  };

  const tourist = identity => character(identity, 'tourist', { season: rotatingSeason(identity.key) });
  const local = identity => character(identity, 'local');
  const staff = (identity, role) => character(identity, role);

  const byModule = {
    ...base.byModule,
    v3_kana_map: pair(BG.local, tourist(V.nanami), local(V.mayu)),
    kana_hira: pair(BG.local, tourist(V.aoi), local(V.nanami)),
    kana_kata: pair(BG.shop, tourist(V.nanami), staff(V.keita, 'shop_staff')),
    v3_kana_sound_rules: pair(BG.transit, tourist(V.aoi), staff(V.keita, 'station_staff')),
    v3_survival_objects: pair(BG.shop, tourist(V.nanami), staff(V.mayu, 'shop_staff')),
    v3_particle_basics: pair(BG.local, tourist(V.aoi), local(V.nanami)),
    v3_tense_matrix: pair(BG.food, tourist(V.nanami), staff(V.keita, 'restaurant_staff')),
    v3_pronouns_places: pair(BG.shop, tourist(V.nanami), staff(V.mayu, 'shop_staff')),
    v3_directions_body: pair(BG.transit, tourist(V.aoi), staff(V.takumi, 'station_staff')),
    v3_numbers_time: pair(BG.local, tourist(V.nanami), local(V.keita)),
    v3_money_counting: pair(BG.shop, tourist(V.aoi), staff(V.mayu, 'cashier')),
    v3_first_greetings: pair(BG.local, tourist(V.aoi), local(V.nanami)),
    v3_question_engine: pair(BG.shop, tourist(V.nanami), staff(V.mayu, 'shop_staff')),
    v3_answer_engine: pair(BG.local, tourist(V.nanami), local(V.keita)),
    v3_airport: pair(BG.airport, tourist(V.nanami), staff(V.keita, 'airport_staff')),
    v3_immigration: pair(BG.immigration, tourist(V.aoi), staff(V.takumi, 'immigration_officer')),
    v3_airplane_request: pair(BG.airplane, tourist(V.nanami), staff(V.mayu, 'cabin_crew')),
    v3_transport: pair(BG.transit, tourist(V.aoi), staff(V.takumi, 'station_staff')),
    v3_bus_ride: pair(BG.bus, tourist(V.nanami), staff(V.keita, 'bus_driver')),
    v3_taxi_ride: pair(BG.taxi, tourist(V.aoi), staff(V.keita, 'taxi_driver')),
    v3_konbini: pair(BG.konbini, tourist(V.nanami), staff(V.mayu, 'konbini_staff')),
    v3_cafe_breakfast: pair(BG.food, tourist(V.aoi), staff(V.mayu, 'cafe_staff')),
    v3_restaurant: pair(BG.food, tourist(V.keita), staff(V.mayu, 'restaurant_staff')),
    v3_izakaya: pair(BG.izakaya, tourist(V.nanami), staff(V.keita, 'izakaya_staff'), staff(V.mayu, 'izakaya_staff')),
    v3_shopping: pair(BG.shop, tourist(V.aoi), staff(V.mayu, 'shop_staff')),
    v3_store_payment: pair(BG.shop, tourist(V.nanami), staff(V.mayu, 'cashier')),
    v3_duty_free: pair(BG.dutyFree, tourist(V.aoi), staff(V.mayu, 'duty_free_staff')),
    v3_hotel: pair(BG.hotel, tourist(V.nanami), staff(V.takumi, 'hotel_staff')),
    v3_hotel_request: pair(BG.hotel, tourist(V.aoi), staff(V.takumi, 'hotel_staff')),
    v3_onsen: pair(BG.onsen, tourist(V.nanami), staff(V.mayu, 'onsen_staff')),
    v3_health: pair(BG.trouble, tourist(V.aoi), staff(V.mayu, 'pharmacist')),
    v3_hospital: pair(BG.hospital, tourist(V.nanami), staff(V.mayu, 'clinic_staff'), staff(V.keita, 'doctor')),
    v3_lost_and_help: pair(BG.koban, tourist(V.aoi), staff(V.takumi, 'police_staff')),
    v3_rentacar: pair(BG.taxi, tourist(V.keita), staff(V.nanami, 'rental_staff')),
    v3_tourist_spot: pair(BG.local, tourist(V.nanami), local(V.keita)),
    v3_reservation_call: pair(BG.local, tourist(V.aoi), staff(V.mayu, 'reservation_staff')),
    v3_weather_plan: pair(BG.local, tourist(V.nanami), local(V.keita)),
    v3_polite_wrapup: pair(BG.local, tourist(V.aoi), local(V.nanami)),
    v3_reaction_shadowing: pair(BG.local, tourist(V.nanami), local(V.keita)),
    v3_drama_reactions: pair(BG.local, local(V.aoi), local(V.keita)),
    v3_drama_daily: pair(BG.local, local(V.aoi), local(V.keita)),
  };

  window.RoleplayArt = {
    ...base,
    CHARACTER_VARIANTS,
    CURRENT_SEASON,
    IDENTITIES,
    byModule,
  };
})();
