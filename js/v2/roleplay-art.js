/* ============================================================
   Roleplay Art - background and character sprite map
   ============================================================ */

'use strict';

window.RoleplayArt = (() => {
  const FIRST_MEETING = {
    bg: 'images/roleplay-comics/vn-first-meeting-bg.png',
    male: 'images/roleplay-comics/vn-first-meeting-male.png',
    female: 'images/roleplay-comics/vn-first-meeting-female.png',
  };

  const CHARACTER = {
    casualMale: 'images/roleplay-comics/generated/characters/casual-male.png',
    serviceFemale: 'images/roleplay-comics/generated/characters/service-female.png',
    staffMale: 'images/roleplay-comics/generated/characters/staff-male.png',
    travelerFemale: 'images/roleplay-comics/generated/characters/traveler-female.png',
    doctorFemale: 'images/roleplay-comics/generated/characters/doctor-female.png',
    engineerMale: 'images/roleplay-comics/generated/characters/engineer-male.png',
    pmFemale: 'images/roleplay-comics/generated/characters/pm-female.png',
  };

  const byModule = {
    survival_greet: {
      bg: FIRST_MEETING.bg,
      characters: { A: FIRST_MEETING.male, B: FIRST_MEETING.female },
    },
    survival_pointing: {
      bg: 'images/roleplay-comics/generated/shopping-bg.png',
      characters: { A: CHARACTER.casualMale, B: CHARACTER.serviceFemale },
    },
    survival_numbers: {
      bg: 'images/roleplay-comics/generated/schedule-bg.png',
      characters: { A: CHARACTER.travelerFemale, B: CHARACTER.staffMale },
    },
    survival_location: {
      bg: 'images/roleplay-comics/generated/facility-bg.png',
      characters: { A: CHARACTER.travelerFemale, B: CHARACTER.staffMale },
    },
    survival_transport: {
      bg: 'images/roleplay-comics/generated/transport-bg.png',
      characters: { A: CHARACTER.casualMale, B: CHARACTER.staffMale },
    },
    survival_food: {
      bg: 'images/roleplay-comics/generated/food-bg.png',
      characters: { A: CHARACTER.casualMale, B: CHARACTER.serviceFemale },
    },
    survival_shopping: {
      bg: 'images/roleplay-comics/generated/retail-bg.png',
      characters: { A: CHARACTER.casualMale, B: CHARACTER.serviceFemale },
    },
    survival_hotel: {
      bg: 'images/roleplay-comics/generated/hotel-bg.png',
      characters: { A: CHARACTER.travelerFemale, B: CHARACTER.staffMale },
    },
    daily_places: {
      bg: 'images/roleplay-comics/generated/sightseeing-bg.png',
      characters: { A: CHARACTER.travelerFemale, B: CHARACTER.staffMale },
    },
    daily_health: {
      bg: 'images/roleplay-comics/generated/health-bg.png',
      characters: { A: CHARACTER.travelerFemale, B: CHARACTER.doctorFemale },
    },
    it_workplace_vocab: {
      bg: 'images/roleplay-comics/generated/it-standup-bg.png',
      characters: { A: CHARACTER.engineerMale, B: CHARACTER.pmFemale },
    },
    biz_basic: {
      bg: 'images/roleplay-comics/generated/code-review-bg.png',
      characters: { A: CHARACTER.engineerMale, B: CHARACTER.pmFemale },
    },
    biz_meeting: {
      bg: 'images/roleplay-comics/generated/kickoff-bg.png',
      characters: { A: CHARACTER.engineerMale, B: CHARACTER.pmFemale },
    },
    biz_1on1: {
      bg: 'images/roleplay-comics/generated/one-on-one-bg.png',
      characters: { A: CHARACTER.engineerMale, B: CHARACTER.pmFemale },
    },
    biz_intro: {
      bg: 'images/roleplay-comics/generated/onboarding-bg.png',
      characters: { A: CHARACTER.casualMale, B: CHARACTER.pmFemale },
    },
    biz_spec: {
      bg: 'images/roleplay-comics/generated/spec-bg.png',
      characters: { A: CHARACTER.engineerMale, B: CHARACTER.pmFemale },
    },
  };

  return { FIRST_MEETING, byModule };
})();
