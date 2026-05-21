/* ============================================================
   V3 ROLEPLAY ART - portrait Japan-local scene and speaker map
   Extends the shared v2 roleplay renderer without touching v2 data.
   ============================================================ */

'use strict';

(() => {
  const base = window.RoleplayArt || { byModule: {} };
  const speakerRoot = key => `images/v3/characters/speakers/${key}`;
  const outfitRoot = 'images/v3/roleplay/outfits';
  const bgRoot = 'images/v3/backgrounds/portrait';

  const IDENTITIES = {
    nanami: {
      key: 'nanami',
      body: `${speakerRoot('nanami')}/body/tourist-2026-spring.webp`,
      face: [
        `${speakerRoot('nanami')}/face/mic-01.webp`,
        `${speakerRoot('nanami')}/face/mic-02.webp`,
        `${speakerRoot('nanami')}/face/mic-03.webp`,
      ],
    },
    aoi: {
      key: 'aoi',
      body: `${speakerRoot('aoi')}/body/tourist-2026-summer.webp`,
      face: [
        `${speakerRoot('aoi')}/face/mic-01.webp`,
        `${speakerRoot('aoi')}/face/mic-02.webp`,
        `${speakerRoot('aoi')}/face/mic-03.webp`,
      ],
    },
    mayu: {
      key: 'mayu',
      body: `${speakerRoot('mayu')}/body/base-realistic.webp`,
      face: [
        `${speakerRoot('mayu')}/face/mic-01.webp`,
        `${speakerRoot('mayu')}/face/mic-02.webp`,
        `${speakerRoot('mayu')}/face/mic-03.webp`,
      ],
    },
    keita: {
      key: 'keita',
      body: `${speakerRoot('keita')}/body/tourist-2026-spring.webp`,
      face: [
        `${speakerRoot('keita')}/face/mic-01.webp`,
        `${speakerRoot('keita')}/face/mic-02.webp`,
        `${speakerRoot('keita')}/face/mic-03.webp`,
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
  const ROLE_OUTFIT_ROLES = new Set([
    'airport_staff',
    'bus_driver',
    'cabin_crew',
    'cafe_staff',
    'cashier',
    'clinic_staff',
    'doctor',
    'duty_free_staff',
    'hotel_staff',
    'immigration_officer',
    'izakaya_staff',
    'konbini_staff',
    'onsen_staff',
    'pharmacist',
    'police_staff',
    'rental_staff',
    'reservation_staff',
    'restaurant_staff',
    'shop_staff',
    'station_staff',
    'taxi_driver',
  ]);
  const CHARACTER_VARIANTS = {
    nanami: {
      airport_staff: { default: [`${outfitRoot}/airport_staff/nanami-uniform-2026-summer-02.webp`, `${outfitRoot}/airport_staff/nanami-01.webp`] },
      local: {
        default: [
          `${outfitRoot}/local/nanami-fashion-01.webp`,
          `${outfitRoot}/local/nanami-fashion-02.webp`,
        ],
      },
      hotel_staff: { default: [`${outfitRoot}/hotel_staff/nanami-uniform-2026-autumn.webp`, `${outfitRoot}/hotel_staff/nanami-01.webp`] },
      onsen_staff: { default: [`${outfitRoot}/onsen_staff/nanami-uniform-2026-summer-02.webp`, `${outfitRoot}/onsen_staff/nanami-01.webp`] },
      rental_staff: { default: [`${outfitRoot}/rentacar_staff/nanami-uniform-2026-summer-02.webp`, `${outfitRoot}/rentacar_staff/nanami-01.webp`] },
      restaurant_staff: { default: [`${outfitRoot}/restaurant_staff/nanami-uniform-2026-winter-02.webp`, `${outfitRoot}/restaurant_staff/nanami-01.webp`] },
      shop_staff: { default: [`${outfitRoot}/shop_staff/nanami-uniform-2026-spring.webp`, `${outfitRoot}/shop_staff/nanami-01.webp`] },
      station_staff: { default: [`${outfitRoot}/station_staff/nanami-uniform-2026-winter-02.webp`, `${outfitRoot}/station_staff/nanami-01.webp`] },
      taxi_driver: { default: [`${outfitRoot}/taxi_driver/nanami-uniform-2026-spring-02.webp`, `${outfitRoot}/taxi_driver/nanami-01.webp`] },
      tourist: {
        spring: [`${outfitRoot}/tourist/nanami-spring.webp`, `${outfitRoot}/tourist/nanami-2026-spring.webp`],
        summer: `${outfitRoot}/tourist/nanami-summer.webp`,
        autumn: `${outfitRoot}/tourist/nanami-autumn.webp`,
        winter: `${outfitRoot}/tourist/nanami-winter.webp`,
        default: [
          `${outfitRoot}/tourist/nanami-2026-spring.webp`,
          `${outfitRoot}/tourist/nanami-spring.webp`,
          `${outfitRoot}/tourist/nanami-summer.webp`,
          `${outfitRoot}/tourist/nanami-autumn.webp`,
          `${outfitRoot}/tourist/nanami-winter.webp`,
        ],
      },
    },
    aoi: {
      bus_driver: { default: [`${outfitRoot}/bus_driver/aoi-uniform-2026-autumn-02.webp`, `${outfitRoot}/bus_driver/aoi-01.webp`] },
      cabin_crew: { default: [`${outfitRoot}/cabin_crew/aoi-uniform-2026-winter-02.webp`, `${outfitRoot}/cabin_crew/aoi-01.webp`] },
      local: {
        default: [
          `${outfitRoot}/local/aoi-fashion-01.webp`,
          `${outfitRoot}/local/aoi-fashion-02.webp`,
        ],
      },
      cafe_staff: { default: [`${outfitRoot}/cafe_staff/aoi-uniform-2026-summer.webp`, `${outfitRoot}/cafe_staff/aoi-uniform-2026-autumn-02.webp`, `${outfitRoot}/cafe_staff/aoi-01.webp`] },
      konbini_staff: { default: [`${outfitRoot}/konbini_staff/aoi-uniform-2026-winter-02.webp`, `${outfitRoot}/konbini_staff/aoi-01.webp`] },
      police_staff: { default: [`${outfitRoot}/police_staff/aoi-uniform-2026-autumn-02.webp`, `${outfitRoot}/police_staff/aoi-01.webp`] },
      shop_staff: { default: [`${outfitRoot}/shop_staff/aoi-uniform-2026-autumn-02.webp`, `${outfitRoot}/shop_staff/aoi-01.webp`] },
      tourist: {
        spring: `${outfitRoot}/tourist/aoi-spring.webp`,
        summer: [`${outfitRoot}/tourist/aoi-summer.webp`, `${outfitRoot}/tourist/aoi-2026-summer.webp`],
        autumn: `${outfitRoot}/tourist/aoi-autumn.webp`,
        winter: `${outfitRoot}/tourist/aoi-winter.webp`,
        default: [
          `${outfitRoot}/tourist/aoi-2026-summer.webp`,
          `${outfitRoot}/tourist/aoi-spring.webp`,
          `${outfitRoot}/tourist/aoi-summer.webp`,
          `${outfitRoot}/tourist/aoi-autumn.webp`,
          `${outfitRoot}/tourist/aoi-winter.webp`,
        ],
      },
    },
    mayu: {
      cafe_staff: { default: [`${outfitRoot}/cafe_staff/mayu-01.webp`, `${outfitRoot}/cafe_staff/mayu-uniform-01.webp`] },
      cabin_crew: { default: [`${outfitRoot}/cabin_crew/mayu-uniform-2026-summer.webp`, `${outfitRoot}/cabin_crew/mayu-01.webp`] },
      cashier: { default: [`${outfitRoot}/konbini_staff/mayu-uniform-2026-spring.webp`, `${outfitRoot}/konbini_staff/mayu-01.webp`, `${outfitRoot}/konbini_staff/mayu-uniform-01.webp`] },
      clinic_staff: { default: [`${outfitRoot}/pharmacist/mayu-01.webp`, `${outfitRoot}/pharmacist/mayu-uniform-01.webp`] },
      duty_free_staff: { default: [`${outfitRoot}/duty_free_staff/mayu-uniform-2026-winter.webp`, `${outfitRoot}/duty_free_staff/mayu-01.webp`, `${outfitRoot}/duty_free_staff/mayu-uniform-01.webp`] },
      hotel_staff: { default: [`${outfitRoot}/hotel_staff/mayu-uniform-2026-spring-02.webp`, `${outfitRoot}/hotel_staff/mayu-01.webp`] },
      immigration_officer: { default: [`${outfitRoot}/immigration_officer/mayu-uniform-2026-spring-02.webp`, `${outfitRoot}/immigration_officer/mayu-01.webp`] },
      izakaya_staff: { default: [`${outfitRoot}/izakaya_staff/mayu-uniform-2026-spring-02.webp`, `${outfitRoot}/izakaya_staff/mayu-01.webp`] },
      konbini_staff: { default: [`${outfitRoot}/konbini_staff/mayu-uniform-2026-spring.webp`, `${outfitRoot}/konbini_staff/mayu-01.webp`, `${outfitRoot}/konbini_staff/mayu-uniform-01.webp`] },
      local: {
        default: [
          `${outfitRoot}/local/mayu-fashion-01.webp`,
          `${outfitRoot}/local/mayu-fashion-02.webp`,
        ],
      },
      onsen_staff: { default: [`${outfitRoot}/onsen_staff/mayu-uniform-2026-winter.webp`, `${outfitRoot}/onsen_staff/mayu-01.webp`] },
      pharmacist: { default: [`${outfitRoot}/pharmacist/mayu-uniform-2026-spring-02.webp`, `${outfitRoot}/pharmacist/mayu-01.webp`, `${outfitRoot}/pharmacist/mayu-uniform-01.webp`] },
      reservation_staff: { default: `${outfitRoot}/hotel_staff/mayu-01.webp` },
      restaurant_staff: { default: `${outfitRoot}/restaurant_staff/mayu-01.webp` },
      shop_staff: { default: `${outfitRoot}/shop_staff/mayu-01.webp` },
      tourist: {
        spring: `${outfitRoot}/tourist/mayu-spring-real.webp`,
        summer: `${outfitRoot}/tourist/mayu-summer-real.webp`,
        autumn: `${outfitRoot}/tourist/mayu-2026-autumn.webp`,
        default: [
          `${outfitRoot}/tourist/mayu-2026-autumn.webp`,
          `${outfitRoot}/tourist/mayu-spring-real.webp`,
          `${outfitRoot}/tourist/mayu-summer-real.webp`,
        ],
      },
    },
    keita: {
      airport_staff: { default: [`${outfitRoot}/airport_staff/keita-uniform-2026-spring.webp`, `${outfitRoot}/airport_staff/keita-01.webp`] },
      bus_driver: { default: [`${outfitRoot}/bus_driver/keita-uniform-2026-spring.webp`, `${outfitRoot}/bus_driver/keita-01.webp`] },
      doctor: { default: [`${outfitRoot}/doctor/keita-uniform-2026-autumn-02.webp`, `${outfitRoot}/doctor/keita-01.webp`, `${outfitRoot}/doctor/keita-uniform-01.webp`] },
      hotel_staff: { default: `${outfitRoot}/hotel_staff/keita-01.webp` },
      immigration_officer: { default: [`${outfitRoot}/immigration_officer/keita-uniform-2026-autumn.webp`, `${outfitRoot}/immigration_officer/keita-01.webp`] },
      izakaya_staff: { default: [`${outfitRoot}/izakaya_staff/keita-01.webp`, `${outfitRoot}/izakaya_staff/keita-uniform-01.webp`] },
      local: {
        default: [
          `${outfitRoot}/local/keita-fashion-default.webp`,
          `${outfitRoot}/local/keita-fashion-01.webp`,
          `${outfitRoot}/local/keita-fashion-02.webp`,
        ],
      },
      police_staff: { default: [`${outfitRoot}/police_staff/keita-uniform-2026-summer.webp`, `${outfitRoot}/police_staff/keita-01.webp`] },
      rental_staff: { default: [`${outfitRoot}/rentacar_staff/keita-uniform-2026-autumn.webp`, `${outfitRoot}/rentacar_staff/keita-01.webp`] },
      restaurant_staff: { default: [`${outfitRoot}/restaurant_staff/keita-01.webp`, `${outfitRoot}/restaurant_staff/keita-uniform-01.webp`] },
      shop_staff: { default: `${outfitRoot}/shop_staff/keita-01.webp` },
      station_staff: { default: [`${outfitRoot}/station_staff/keita-uniform-2026-summer.webp`, `${outfitRoot}/station_staff/keita-01.webp`] },
      taxi_driver: { default: [`${outfitRoot}/taxi_driver/keita-uniform-2026-winter.webp`, `${outfitRoot}/taxi_driver/keita-01.webp`, `${outfitRoot}/taxi_driver/keita-uniform-01.webp`] },
      tourist: {
        spring: `${outfitRoot}/tourist/keita-2026-spring.webp`,
        autumn: `${outfitRoot}/tourist/keita-autumn-trend.webp`,
        default: [
          `${outfitRoot}/tourist/keita-2026-spring.webp`,
          `${outfitRoot}/tourist/keita-autumn-trend.webp`,
          `${outfitRoot}/local/keita-fashion-01.webp`,
          `${outfitRoot}/local/keita-fashion-02.webp`,
        ],
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
    const normalizedRole = role === 'cashier' ? 'konbini_staff'
      : role === 'clinic_staff' ? 'pharmacist'
      : role === 'rental_staff' ? 'rentacar_staff'
      : role === 'reservation_staff' ? 'hotel_staff'
      : role;
    const byRole = variants[role] || variants[normalizedRole] || {};
    if (!byRole.default && ROLE_OUTFIT_ROLES.has(role)) {
      return `${outfitRoot}/${normalizedRole}/${identity.key}-01.webp`;
    }
    if (!byRole.default && ROLE_OUTFIT_ROLES.has(normalizedRole)) {
      return `${outfitRoot}/${normalizedRole}/${identity.key}-01.webp`;
    }
    if (!byRole.default && variants.local) {
      return randomVariant(variants.local[season] || variants.local.default) || identity.body;
    }
    return randomVariant(byRole[season] || byRole.default) || identity.body;
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
  const bgPool = (...paths) => randomVariant(paths);
  const BG = {
    airport: bgPool(`${bgRoot}/airport/airport-checkin-01.webp`),
    airplane: bgPool(`${bgRoot}/airplane/airplane-cabin-01.webp`),
    bus: bgPool(`${bgRoot}/bus/bus-stop-01.webp`, `${bgRoot}/station/station-konbini-portrait-01.webp`, `${bgRoot}/station/station-konbini-portrait-02.webp`),
    dutyFree: bgPool(`${bgRoot}/duty-free/duty-free-shop-01.webp`),
    hospital: bgPool(`${bgRoot}/hospital/hospital-reception-01.webp`, `${bgRoot}/pharmacy/pharmacy-clinic-01.webp`),
    immigration: bgPool(`${bgRoot}/immigration/immigration-01.webp`),
    koban: bgPool(`${bgRoot}/koban/koban-lost-found-01.webp`),
    transit: bgPool(`${bgRoot}/station/station-konbini-portrait-01.webp`, `${bgRoot}/station/station-konbini-portrait-02.webp`, `${bgRoot}/bus/bus-stop-01.webp`),
    taxi: bgPool(`${bgRoot}/taxi/taxi-ride-01.webp`),
    konbini: bgPool(`${bgRoot}/konbini/konbini-checkout-01.webp`, `${bgRoot}/station/station-konbini-portrait-01.webp`),
    food: bgPool(`${bgRoot}/cafe/cafe-breakfast-01.webp`, `${bgRoot}/restaurant/restaurant-order-01.webp`, `${bgRoot}/tourist-street/street-cafe-portrait-01.webp`, `${bgRoot}/tourist-street/street-cafe-portrait-02.webp`),
    izakaya: bgPool(`${bgRoot}/izakaya/izakaya-01.webp`, `${bgRoot}/restaurant/restaurant-order-01.webp`),
    shop: bgPool(`${bgRoot}/shopping/clothing-store-01.webp`, `${bgRoot}/duty-free/duty-free-shop-01.webp`, `${bgRoot}/tourist-street/street-cafe-portrait-01.webp`),
    hotel: bgPool(`${bgRoot}/hotel/hotel-lobby-01.webp`),
    onsen: bgPool(`${bgRoot}/onsen/onsen-ryokan-rules-01.webp`, `${bgRoot}/hotel/hotel-lobby-01.webp`),
    trouble: bgPool(`${bgRoot}/pharmacy/pharmacy-clinic-01.webp`, `${bgRoot}/koban/koban-lost-found-01.webp`),
    local: bgPool(`${bgRoot}/tourist-street/street-cafe-portrait-01.webp`, `${bgRoot}/tourist-street/street-cafe-portrait-02.webp`, `${bgRoot}/daily-life/friends-casual-talk-01.webp`),
    rentacar: bgPool(`${bgRoot}/rentacar/rentacar-counter-01.webp`),
    drama: bgPool(`${bgRoot}/drama/drama-sofa-01.webp`, `${bgRoot}/drama/emotion-reactions-01.webp`, `${bgRoot}/daily-life/friends-casual-talk-01.webp`),
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
    v3_directions_body: pair(BG.transit, tourist(V.aoi), staff(V.keita, 'station_staff')),
    v3_numbers_time: pair(BG.local, tourist(V.nanami), local(V.keita)),
    v3_money_counting: pair(BG.konbini, tourist(V.aoi), staff(V.mayu, 'cashier')),
    v3_first_greetings: pair(BG.local, tourist(V.aoi), local(V.nanami)),
    v3_question_engine: pair(BG.shop, tourist(V.nanami), staff(V.mayu, 'shop_staff')),
    v3_answer_engine: pair(BG.local, tourist(V.nanami), local(V.keita)),
    v3_airport: pair(BG.airport, tourist(V.nanami), staff(V.keita, 'airport_staff')),
    v3_immigration: pair(BG.immigration, tourist(V.aoi), staff(V.keita, 'immigration_officer')),
    v3_airplane_request: pair(BG.airplane, tourist(V.nanami), staff(V.mayu, 'cabin_crew')),
    v3_transport: pair(BG.transit, tourist(V.aoi), staff(V.keita, 'station_staff')),
    v3_bus_ride: pair(BG.bus, tourist(V.nanami), staff(V.keita, 'bus_driver')),
    v3_taxi_ride: pair(BG.taxi, tourist(V.aoi), staff(V.keita, 'taxi_driver')),
    v3_konbini: pair(BG.konbini, tourist(V.nanami), staff(V.mayu, 'konbini_staff')),
    v3_cafe_breakfast: pair(BG.food, tourist(V.aoi), staff(V.mayu, 'cafe_staff')),
    v3_restaurant: pair(BG.food, tourist(V.keita), staff(V.mayu, 'restaurant_staff')),
    v3_izakaya: pair(BG.izakaya, tourist(V.nanami), staff(V.keita, 'izakaya_staff'), staff(V.mayu, 'izakaya_staff')),
    v3_shopping: pair(BG.shop, tourist(V.aoi), staff(V.mayu, 'shop_staff')),
    v3_store_payment: pair(BG.shop, tourist(V.nanami), staff(V.mayu, 'cashier')),
    v3_duty_free: pair(BG.dutyFree, tourist(V.aoi), staff(V.mayu, 'duty_free_staff')),
    v3_hotel: pair(BG.hotel, tourist(V.nanami), staff(V.keita, 'hotel_staff')),
    v3_hotel_request: pair(BG.hotel, tourist(V.aoi), staff(V.mayu, 'hotel_staff')),
    v3_onsen: pair(BG.onsen, tourist(V.nanami), staff(V.mayu, 'onsen_staff')),
    v3_health: pair(BG.trouble, tourist(V.aoi), staff(V.mayu, 'pharmacist')),
    v3_hospital: pair(BG.hospital, tourist(V.nanami), staff(V.mayu, 'clinic_staff'), staff(V.keita, 'doctor')),
    v3_lost_and_help: pair(BG.koban, tourist(V.aoi), staff(V.keita, 'police_staff')),
    v3_rentacar: pair(BG.rentacar, tourist(V.keita), staff(V.nanami, 'rental_staff')),
    v3_tourist_spot: pair(BG.local, tourist(V.nanami), local(V.keita)),
    v3_reservation_call: pair(BG.hotel, tourist(V.aoi), staff(V.mayu, 'reservation_staff')),
    v3_weather_plan: pair(BG.local, tourist(V.nanami), local(V.keita)),
    v3_polite_wrapup: pair(BG.local, tourist(V.aoi), local(V.nanami)),
    v3_reaction_shadowing: pair(BG.drama, tourist(V.nanami), local(V.keita)),
    v3_drama_reactions: pair(BG.drama, local(V.aoi), local(V.keita)),
    v3_drama_daily: pair(BG.drama, local(V.aoi), local(V.keita)),
  };

  window.RoleplayArt = {
    ...base,
    CHARACTER_VARIANTS,
    CURRENT_SEASON,
    IDENTITIES,
    byModule,
  };
})();
