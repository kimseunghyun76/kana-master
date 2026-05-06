/* ============================================================
   LEARNING PROGRAMS — time-boxed tracks over the main curriculum
   ============================================================ */

'use strict';

const LEARNING_PROGRAMS = [
  {
    id: 'kana_7_days',
    title: '7일 문자 완성',
    label: '7 DAYS',
    desc: '히라가나와 가타가나를 빠르게 끝내는 집중 루트',
    outcome: '간판·메뉴·기초 문장을 읽기 시작',
    dailyMinutes: 15,
    audience: '완전 입문',
    tone: 'violet',
    days: 7,
    moduleIds: ['kana_hira', 'kana_kata', 'first_phrases'],
  },
  {
    id: 'survival_14_days',
    title: '14일 여행 생존',
    label: '14 DAYS',
    desc: '인사, 숫자, 위치, 쇼핑, 식당까지 여행 필수 표현',
    outcome: '일본 여행에서 묻고 답하는 생존 회화',
    dailyMinutes: 20,
    audience: '여행 준비',
    tone: 'blue',
    days: 14,
    moduleIds: ['first_phrases', 'survival_greet', 'survival_pointing', 'survival_numbers', 'survival_where', 'survival_shop', 'survival_food'],
  },
  {
    id: 'business_21_days',
    title: '21일 IT 업무',
    label: '21 DAYS',
    desc: '회의, 일정, 요청, 장애 보고까지 업무 일본어 루트',
    outcome: '일본 팀과 회의·요청·보고를 주고받기',
    dailyMinutes: 25,
    audience: '업무 실전',
    tone: 'amber',
    days: 21,
    moduleIds: ['office_intro', 'office_schedule', 'it_meeting', 'it_requirement', 'it_status', 'it_issue', 'it_review'],
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
