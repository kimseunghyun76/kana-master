/* ============================================================
   CURRICULUM — 커리큘럼 로직 레이어
   ============================================================
   데이터는 js/data/curriculum-data.js 에 있습니다.
   이 파일은 해당 데이터를 읽어 헬퍼 함수만 제공합니다.
   커리큘럼 구조 변경은 curriculum-data.js 만 편집하세요.
   ============================================================ */

'use strict';

// curriculum-data.js 가 먼저 로드되어 window 전역에 등록되어 있어야 합니다.
const STAGES  = window.CURRICULUM_STAGES;
const MODULES = window.CURRICULUM_MODULES;

// ── Helper: 스테이지에 속한 모듈 목록 ────────────────────────
function getModulesByStage(stageId) {
  return MODULES.filter(m => m.stageId === stageId);
}

// ── Helper: 모듈 잠금 해제 여부 확인 ─────────────────────────
function isModuleUnlocked(moduleId, progress) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod) return false;
  if (!mod.unlockAfter || mod.unlockAfter.length === 0) return true;
  return mod.unlockAfter.every(depId => {
    const dep = progress.modules[depId];
    return dep && dep.stepsCompleted >= (MODULES.find(m => m.id === depId)?.steps.length || 0);
  });
}

// ── Helper: 롤플레이 잠금 해제 여부 확인 ─────────────────────
function isRoleplayUnlocked(moduleId, progress) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod || !mod.roleplay) return false;
  const modProgress = progress.modules[moduleId];
  if (!modProgress) return false;
  return modProgress.stepsCompleted >= mod.steps.length;
}

// ── Helper: 모듈 진행률(%) ─────────────────────────────────
function getModuleProgressPct(moduleId, progress) {
  const mod = MODULES.find(m => m.id === moduleId);
  if (!mod) return 0;
  const total = mod.steps.length + (mod.roleplay ? 1 : 0);
  const done  = (progress.modules[moduleId]?.stepsCompleted || 0)
              + (progress.modules[moduleId]?.roleplayDone   ? 1 : 0);
  return Math.round((done / total) * 100);
}

// ── Helper: 스테이지 진행률(%) ────────────────────────────
function getStageProgressPct(stageId, progress) {
  const mods = getModulesByStage(stageId);
  if (!mods.length) return 0;
  const total = mods.reduce((s, m) => s + m.steps.length + (m.roleplay ? 1 : 0), 0);
  const done  = mods.reduce((s, m) => {
    const mp = progress.modules[m.id] || {};
    return s + (mp.stepsCompleted || 0) + (mp.roleplayDone ? 1 : 0);
  }, 0);
  return Math.round((done / total) * 100);
}

// ── Helper: 다음 추천 모듈 ────────────────────────────────
function getNextModule(progress) {
  for (const stage of STAGES) {
    const mods = getModulesByStage(stage.id);
    for (const mod of mods) {
      if (!isModuleUnlocked(mod.id, progress)) continue;
      const mp = progress.modules[mod.id] || {};
      const totalSteps = mod.steps.length;
      if ((mp.stepsCompleted || 0) < totalSteps) return { mod, stage };
      if (mod.roleplay && !mp.roleplayDone) return { mod, stage, roleplay: true };
    }
  }
  return null;
}
