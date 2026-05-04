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
    tone: 'violet',
    moduleIds: ['kana_hira', 'kana_kata', 'first_phrases'],
  },
  {
    id: 'survival_14_days',
    title: '14일 여행 생존',
    label: '14 DAYS',
    desc: '인사, 숫자, 위치, 쇼핑, 식당까지 여행 필수 표현',
    tone: 'blue',
    moduleIds: ['first_phrases', 'survival_greet', 'survival_pointing', 'survival_numbers', 'survival_where', 'survival_shop', 'survival_food'],
  },
  {
    id: 'business_21_days',
    title: '21일 IT 업무',
    label: '21 DAYS',
    desc: '회의, 일정, 요청, 장애 보고까지 업무 일본어 루트',
    tone: 'amber',
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

  return { list: LEARNING_PROGRAMS, getProgress };
})();
