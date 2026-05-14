/* ============================================================
   V3 LEARNING PROGRAMS — commercial beginner tracks
   ============================================================ */

'use strict';

const LEARNING_PROGRAMS = [
  {
    id: 'v3_letters_7_days',
    title: '7일 문자 완성',
    label: '7 DAYS',
    desc: '오십음도, 히라가나, 가타가나를 여행 전 읽기 수준까지',
    outcome: '메뉴판과 간판의 기본 글자를 읽기 시작',
    dailyMinutes: 15,
    audience: '완전 입문',
    tone: 'violet',
    days: 7,
    moduleIds: ['v3_kana_map', 'kana_hira', 'kana_kata', 'v3_kana_sound_rules'],
  },
  {
    id: 'v3_survival_21_days',
    title: '21일 생존 기초',
    label: '21 DAYS',
    desc: '인사, 기본 물건, 대명사, 숫자, 돈, 방향, 질문과 대답',
    outcome: '가리키고, 묻고, 짧게 답하는 초보 회화 엔진',
    dailyMinutes: 20,
    audience: '여행 준비',
    tone: 'blue',
    days: 21,
    moduleIds: ['v3_first_greetings', 'v3_survival_objects', 'v3_pronouns_places', 'v3_numbers_time', 'v3_money_counting', 'v3_directions_body', 'v3_particle_basics', 'v3_question_engine', 'v3_answer_engine', 'v3_reaction_shadowing'],
  },
  {
    id: 'v3_travel_30_days',
    title: '30일 첫 일본 여행',
    label: '30 DAYS',
    desc: '공항부터 분실물 대응까지 여행 장면을 하나씩 롤플레이',
    outcome: '일본 여행 첫날과 돌발상황에 필요한 대화 흐름 완성',
    dailyMinutes: 20,
    audience: '출국 예정',
    tone: 'emerald',
    days: 30,
    moduleIds: ['v3_airport', 'v3_immigration', 'v3_airplane_request', 'v3_transport', 'v3_bus_ride', 'v3_taxi_ride', 'v3_konbini', 'v3_cafe_breakfast', 'v3_restaurant', 'v3_izakaya', 'v3_shopping', 'v3_store_payment', 'v3_duty_free', 'v3_hotel', 'v3_hotel_request', 'v3_onsen', 'v3_health', 'v3_hospital', 'v3_lost_and_help'],
  },
  {
    id: 'v3_local_plus_14_days',
    title: '14일 현지 확장',
    label: '14 DAYS',
    desc: '렌트카, 관광지, 예약 확인, 일정 변경, 감사 마무리까지',
    outcome: '기본 여행 회화 뒤 실제 현지 돌발 질문에 답하기',
    dailyMinutes: 20,
    audience: '여행 심화',
    tone: 'amber',
    days: 14,
    moduleIds: ['v3_rentacar', 'v3_tourist_spot', 'v3_reservation_call', 'v3_weather_plan', 'v3_polite_wrapup'],
  },
  {
    id: 'v3_drama_starter',
    title: '드라마 첫 귀 트기',
    label: 'DRAMA',
    desc: '짧은 반응어와 일상 대사부터 자막 일본어에 익숙해지기',
    outcome: '드라마에서 자주 나오는 짧은 말 알아듣기',
    dailyMinutes: 15,
    audience: '콘텐츠 학습',
    tone: 'rose',
    days: 10,
    moduleIds: ['v3_drama_reactions', 'v3_drama_daily'],
  },
];

window.LearningPrograms = (() => {
  function getProgress(program, progress) {
    const moduleIds = program.moduleIds || [];
    const completed = moduleIds.filter(moduleId => {
      const mod = MODULES.find(m => m.id === moduleId);
      const moduleProgress = progress.modules?.[moduleId] || {};
      return mod && (moduleProgress.stepsCompleted || 0) >= mod.steps.length;
    }).length;
    const currentModuleId = moduleIds.find(moduleId => {
      const mod = MODULES.find(m => m.id === moduleId);
      const moduleProgress = progress.modules?.[moduleId] || {};
      return mod && (moduleProgress.stepsCompleted || 0) < mod.steps.length;
    }) || moduleIds[moduleIds.length - 1];

    return {
      completed,
      total: moduleIds.length,
      pct: moduleIds.length ? Math.round((completed / moduleIds.length) * 100) : 0,
      currentModule: MODULES.find(m => m.id === currentModuleId) || null,
    };
  }

  function getById(programId) {
    return LEARNING_PROGRAMS.find(program => program.id === programId) || null;
  }

  function getDayPlan(program) {
    const modules = (program.moduleIds || [])
      .map(moduleId => MODULES.find(mod => mod.id === moduleId))
      .filter(Boolean);
    const days = Math.max(program.days || modules.length || 1, 1);

    return Array.from({ length: days }, (_, idx) => {
      const moduleIndex = Math.min(Math.floor((idx / days) * modules.length), modules.length - 1);
      const mod = modules[moduleIndex];
      const phase = idx === 0 ? '시작'
        : idx === days - 1 ? '최종 점검'
        : idx % 3 === 2 ? '퀴즈 강화'
        : '학습';
      return {
        day: idx + 1,
        phase,
        module: mod,
        title: mod ? mod.name : '복습',
        desc: mod ? `${mod.steps.length}단계 · ${mod.desc || mod.nameJp || ''}` : '오늘 배운 내용을 다시 확인합니다',
      };
    });
  }

  return { list: LEARNING_PROGRAMS, getById, getProgress, getDayPlan };
})();
