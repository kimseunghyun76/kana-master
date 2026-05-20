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
      body: 'images/v3/characters/speakers/nanami/body/base-legacy.webp',
      face: [
        'images/v3/characters/speakers/nanami/face/mic-01.webp',
        'images/v3/characters/speakers/nanami/face/mic-02.webp',
        'images/v3/characters/speakers/nanami/face/mic-03.webp',
      ],
    },
    aoi: {
      key: 'aoi',
      body: 'images/v3/characters/speakers/aoi/body/base-legacy.webp',
      face: [
        'images/v3/characters/speakers/aoi/face/mic-01.webp',
        'images/v3/characters/speakers/aoi/face/mic-02.webp',
        'images/v3/characters/speakers/aoi/face/mic-03.webp',
      ],
    },
    mayu: {
      key: 'mayu',
      body: 'images/v3/characters/speakers/mayu/body/base-realistic.webp',
      face: [
        'images/v3/characters/speakers/mayu/face/mic-01.webp',
        'images/v3/characters/speakers/mayu/face/mic-02.webp',
        'images/v3/characters/speakers/mayu/face/mic-03.webp',
      ],
    },
    keita: {
      key: 'keita',
      body: 'images/v3/characters/speakers/keita/body/base-legacy.webp',
      face: [
        'images/v3/characters/speakers/keita/face/mic-01.webp',
        'images/v3/characters/speakers/keita/face/mic-02.webp',
        'images/v3/characters/speakers/keita/face/mic-03.webp',
      ],
    },
    takumi: {
      key: 'takumi',
      body: 'images/v3/characters/speakers/takumi/body/base-legacy.webp',
      face: [
        'images/v3/characters/speakers/takumi/face/mic-01.webp',
        'images/v3/characters/speakers/takumi/face/mic-02.webp',
        'images/v3/characters/speakers/takumi/face/mic-03.webp',
      ],
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
      local: {
        default: [
          'images/v3/roleplay/roles/local/nanami-fashion-01.webp',
          'images/v3/roleplay/roles/local/nanami-fashion-02.webp',
        ],
      },
      tourist: {
        spring: 'images/v3/roleplay/roles/tourist/nanami-spring.webp',
        summer: 'images/v3/roleplay/roles/tourist/nanami-summer.webp',
        autumn: 'images/v3/roleplay/roles/tourist/nanami-autumn.webp',
        winter: 'images/v3/roleplay/roles/tourist/nanami-winter.webp',
      },
    },
    aoi: {
      local: {
        default: [
          'images/v3/roleplay/roles/local/aoi-fashion-01.webp',
          'images/v3/roleplay/roles/local/aoi-fashion-02.webp',
        ],
      },
      tourist: {
        spring: 'images/v3/roleplay/roles/tourist/aoi-spring.webp',
        summer: 'images/v3/roleplay/roles/tourist/aoi-summer.webp',
        autumn: 'images/v3/roleplay/roles/tourist/aoi-autumn.webp',
        winter: 'images/v3/roleplay/roles/tourist/aoi-winter.webp',
      },
    },
    mayu: {
      cafe_staff: { default: 'images/v3/roleplay/roles/cafe_staff/mayu-default.webp' },
      cashier: { default: 'images/v3/roleplay/roles/konbini_staff/mayu-default.webp' },
      clinic_staff: { default: 'images/v3/roleplay/roles/pharmacist/mayu-default.webp' },
      duty_free_staff: { default: 'images/v3/roleplay/roles/duty_free_staff/mayu-default.webp' },
      konbini_staff: { default: 'images/v3/roleplay/roles/konbini_staff/mayu-default.webp' },
      onsen_staff: { default: 'images/v3/roleplay/roles/cafe_staff/mayu-default.webp' },
      pharmacist: { default: 'images/v3/roleplay/roles/pharmacist/mayu-default.webp' },
      reservation_staff: { default: 'images/v3/roleplay/roles/cafe_staff/mayu-default.webp' },
      restaurant_staff: { default: 'images/v3/roleplay/roles/cafe_staff/mayu-default.webp' },
      shop_staff: { default: 'images/v3/roleplay/roles/cafe_staff/mayu-default.webp' },
      local: {
        default: [
          'images/v3/roleplay/roles/local/mayu-fashion-01.webp',
          'images/v3/roleplay/roles/local/mayu-fashion-02.webp',
        ],
      },
      tourist: {
        spring: 'images/v3/roleplay/roles/tourist/mayu-spring-real.webp',
        summer: 'images/v3/roleplay/roles/tourist/mayu-summer-real.webp',
      },
    },
    keita: {
      airport_staff: { default: 'images/v3/roleplay/roles/local/keita-fashion-default.webp' },
      bus_driver: { default: 'images/v3/roleplay/roles/taxi_driver/keita-default.webp' },
      doctor: { default: 'images/v3/roleplay/roles/doctor/keita-default.webp' },
      izakaya_staff: { default: 'images/v3/roleplay/roles/izakaya_staff/keita-default.webp' },
      local: {
        default: [
          'images/v3/roleplay/roles/local/keita-fashion-default.webp',
          'images/v3/roleplay/roles/local/keita-fashion-01.webp',
          'images/v3/roleplay/roles/local/keita-fashion-02.webp',
        ],
      },
      restaurant_staff: { default: 'images/v3/roleplay/roles/restaurant_staff/keita-default.webp' },
      shop_staff: { default: 'images/v3/roleplay/roles/local/keita-fashion-default.webp' },
      taxi_driver: { default: 'images/v3/roleplay/roles/taxi_driver/keita-default.webp' },
      tourist: {
        autumn: 'images/v3/roleplay/roles/tourist/keita-autumn-trend.webp',
      },
    },
    takumi: {
      hotel_staff: { default: 'images/v3/roleplay/roles/hotel_staff/takumi-default.webp' },
      immigration_officer: { default: 'images/v3/roleplay/roles/police_staff/takumi-default.webp' },
      local: {
        default: [
          'images/v3/roleplay/roles/local/takumi-fashion-default.webp',
          'images/v3/roleplay/roles/local/takumi-fashion-01.webp',
          'images/v3/roleplay/roles/local/takumi-fashion-02.webp',
        ],
      },
      police_staff: { default: 'images/v3/roleplay/roles/police_staff/takumi-default.webp' },
      rental_staff: { default: 'images/v3/roleplay/roles/hotel_staff/takumi-default.webp' },
      station_staff: { default: 'images/v3/roleplay/roles/station_staff/takumi-default.webp' },
      tourist: {
        winter: 'images/v3/roleplay/roles/tourist/takumi-winter-trend.webp',
      },
    },
  };

  const selectVariant = (value, seed) => {
    if (!Array.isArray(value)) return value;
    if (!value.length) return '';
    return value[Math.abs(hashText(seed)) % value.length];
  };

  const randomVariant = value => {
    if (!Array.isArray(value)) return value;
    if (!value.length) return '';
    return value[Math.floor(Math.random() * value.length)];
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
    face: selectVariant(identity.face, `${identity.key}:${role}:${opts.season || CURRENT_SEASON}:face`),
    anchor: DEFAULT_ANCHOR,
  });

  const V = IDENTITIES;
  const BG = {
    airport: 'images/v3/backgrounds/landscape/wide-life/airport-checkin/default.webp',
    airplane: 'images/v3/backgrounds/landscape/wide-life/airplane-cabin/default.webp',
    bus: 'images/v3/backgrounds/landscape/wide-life/bus-stop/default.webp',
    dutyFree: 'images/v3/backgrounds/landscape/wide-life/duty-free-shop/default.webp',
    hospital: 'images/v3/backgrounds/landscape/wide-life/hospital-reception/default.webp',
    immigration: 'images/v3/backgrounds/landscape/wide-life/immigration-booth/default.webp',
    koban: 'images/v3/backgrounds/landscape/wide-life/koban-lost-found/default.webp',
    transit: randomVariant([
      'images/v3/backgrounds/landscape/wide-life/station-platform/default.webp',
      'images/v3/backgrounds/landscape/wide-life/station-plaza/station-bus-01.webp',
      'images/v3/backgrounds/landscape/wide-life/station-plaza/station-bus-02.webp',
    ]),
    taxi: 'images/v3/backgrounds/landscape/wide-life/rentacar-taxi/default.webp',
    konbini: 'images/v3/backgrounds/landscape/wide-life/konbini-checkout/default.webp',
    food: randomVariant([
      'images/v3/backgrounds/landscape/wide-life/cafe-restaurant/default.webp',
      'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-01.webp',
      'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-02.webp',
    ]),
    izakaya: 'images/v3/backgrounds/landscape/wide-life/izakaya/default.webp',
    shop: randomVariant([
      'images/v3/backgrounds/landscape/wide-life/clothing-store/default.webp',
      'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-01.webp',
      'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-02.webp',
    ]),
    hotel: 'images/v3/backgrounds/landscape/wide-life/hotel-lobby/default.webp',
    onsen: 'images/v3/backgrounds/landscape/wide-life/onsen-ryokan/default.webp',
    trouble: 'images/v3/backgrounds/landscape/wide-life/pharmacy-clinic/default.webp',
    local: randomVariant([
      'images/v3/backgrounds/landscape/wide-life/tourist-street/default.webp',
      'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-01.webp',
      'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-02.webp',
    ]),
    fallbackAirport: 'images/v3/backgrounds/landscape/wide-life/airport-checkin/default.webp',
    fallbackTransit: 'images/v3/backgrounds/landscape/wide-life/station-plaza/station-bus-01.webp',
    fallbackFood: 'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-01.webp',
    fallbackShop: 'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-01.webp',
    fallbackHotel: 'images/v3/backgrounds/landscape/wide-life/hotel-lobby/default.webp',
    fallbackTrouble: 'images/v3/backgrounds/landscape/wide-life/pharmacy-clinic/default.webp',
    fallbackLocal: 'images/v3/backgrounds/landscape/wide-life/tourist-street/street-cafe-01.webp',
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
