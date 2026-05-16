/* ============================================================
   LESSON VIEW — stage list, modules, roleplay entries
   ============================================================ */

'use strict';

window.createLessonView = (ctx) => {
  const gameUi = !!ctx.gameUi;
  const {
    Store,
    Entitlements,
    escHtml,
    cssUrlValue,
    formatNum,
    hexToRgb,
    getModuleVisual,
    getStageIconKey,
    uiIconSvg,
    uiIconWrap,
  } = ctx;

  function render() {
    const prog = Store.get();
    let html = '';

    html += _renderLessonOverview(prog);

    STAGES.forEach(stage => {
      const locked = prog.xp < stage.unlockXP;
      const mods = getModulesByStage(stage.id);
      if (!mods.length) return;

      const dotColor = stage.color;
      const badgeBg = locked ? 'rgba(100,116,139,.2)' : `rgba(${hexToRgb(stage.color)},.15)`;
      const badgeColor = locked ? 'var(--text3)' : stage.color;
      const stagePct = getStageProgressPct(stage.id, prog);

      html += `
        <div class="lesson-stage-section">
          <div class="lesson-stage-header">
            <div class="lesson-stage-dot" style="background:${locked ? '#475569' : dotColor}"></div>
            <span class="lesson-stage-title">STAGE ${stage.id}: ${escHtml(stage.name)}</span>
            <span class="lesson-stage-badge" style="background:${badgeBg};color:${badgeColor};padding:3px 8px;border-radius:20px;font-size:10px;font-weight:700;">
              ${locked ? `${uiIconWrap('lock', 'badge-icon')}${formatNum(stage.unlockXP)} XP` : (stage.jlpt || (gameUi ? 'OPEN' : '심화 학습'))}
            </span>
          </div>
          <div class="lesson-stage-progress">
            <span>${escHtml(stage.desc)}</span>
            <b>${stagePct}%</b>
          </div>
          <div class="module-list">
      `;

      mods.forEach(mod => {
        html += _renderModuleCard(mod, stage, locked, prog);
      });

      html += `</div></div>`;
    });

    document.getElementById('lessonContent').innerHTML = html;
  }

  function _renderLessonOverview(prog) {
    const doneMods = MODULES.filter(mod => {
      const mp = prog.modules[mod.id] || {};
      return (mp.stepsCompleted || 0) >= mod.steps.length;
    }).length;
    const next = getNextModule(prog);
    const nextTitle = next?.roleplay ? next.mod.roleplay.name : next?.mod?.name;
    return `
      <section class="lesson-overview">
        <div>
          <div class="lesson-overview-kicker">${gameUi ? 'QUEST MAP' : '전체 커리큘럼'}</div>
          <h2>${nextTitle ? escHtml(nextTitle) : (gameUi ? 'ALL QUESTS CLEAR' : '모든 레슨 완료')}</h2>
          <p>${nextTitle ? (gameUi ? 'Current route is ready.' : '현재 이어서 진행할 레슨입니다.') : (gameUi ? 'Use TRAIN mode for review and roleplay loops.' : '복습과 롤플레이로 유지 학습을 이어가세요.')}</p>
        </div>
        <div class="lesson-overview-stats">
          <span><b>${doneMods}</b>${gameUi ? 'CLEAR' : '완료'}</span>
          <span><b>${MODULES.length}</b>${gameUi ? 'TOTAL' : '전체'}</span>
          <span><b>${formatNum(prog.xp)}</b>XP</span>
        </div>
      </section>
    `;
  }

  function _renderModuleCard(mod, stage, stageLocked, prog) {
    const requiredTier = Entitlements.requiredTier(mod);
    const accessLocked = !Entitlements.canAccess(mod);
    const modLocked = stageLocked || accessLocked || !isModuleUnlocked(mod.id, prog);
    const mp = prog.modules[mod.id] || {};
    const totalSteps = mod.steps.length;
    const done = mp.stepsCompleted || 0;
    const pct = Math.round((done / totalSteps) * 100);
    const completed = done >= totalSteps;
    const visual = getModuleVisual(mod);
    const moduleImage = visual.coverImage || visual.image || '';
    const status = _getStatus(modLocked, completed);

    let html = `
      <div class="module-card ${moduleImage ? 'has-cover' : ''} ${modLocked ? 'locked' : ''} ${completed ? 'completed' : ''}"
           data-access-tier="${requiredTier}"
           onclick="${!modLocked ? `App.openModule('${mod.id}')` : ''}">
        ${moduleImage ? `
          <div class="module-cover-thumb" style="--module-cover:url('${cssUrlValue(moduleImage)}')" aria-hidden="true"></div>
        ` : `
          <div class="module-visual ${visual.tone}">
            <div class="module-visual-main">${uiIconSvg(visual.iconKey, 'module-visual-main-svg')}</div>
          </div>
        `}
        <div class="module-info">
          <div class="module-name-row">
            <div class="module-name">${escHtml(mod.name)}</div>
            <span class="access-tier-badge ${requiredTier}">${requiredTier.toUpperCase()}</span>
          </div>
          <div class="module-sub">${escHtml(mod.nameJp || '')} · ${totalSteps}${gameUi ? ' STEPS' : '단계'}</div>
          <div class="module-focus-tag">${escHtml(visual.focus)}</div>
          ${!modLocked ? `
          <div class="module-prog">
            <div class="module-prog-bar">
              <div class="module-prog-fill" style="width:${pct}%;background:${stage.color}"></div>
            </div>
            <span class="module-prog-pct">${done}/${totalSteps}</span>
          </div>` : ''}
        </div>
        <div class="module-status ${status.className}">${status.icon}</div>
      </div>
    `;

    if (mod.roleplay && !modLocked) {
      html += _renderRoleplayCard(mod, mp, visual, totalSteps);
    }

    return html;
  }

  function _renderRoleplayCard(mod, moduleProgress, visual, totalSteps) {
    const rpUnlocked = isRoleplayUnlocked(mod.id, Store.get());
    const rpDone = moduleProgress.roleplayDone;
    const roleplayImage = visual.roleplayImage || visual.coverImage || visual.image || '';
    return `
      <div class="roleplay-card ${roleplayImage ? 'has-cover' : ''} ${!rpUnlocked ? 'locked' : ''}"
           onclick="${rpUnlocked ? `App.openModule('${mod.id}', true)` : ''}">
        ${roleplayImage ? `<span class="roleplay-thumb" style="--roleplay-thumb:url('${cssUrlValue(roleplayImage)}')" aria-hidden="true"></span>` : ''}
        <span class="rp-icon">${uiIconSvg('roleplay', 'rp-icon-svg')}</span>
        <div class="rp-info">
          <div class="rp-name">${escHtml(mod.roleplay.name)}</div>
          <div class="rp-hint">${rpUnlocked ? escHtml(mod.roleplay.desc) : (gameUi ? `CLEAR ${totalSteps} STEPS TO OPEN` : `위 ${totalSteps}단계 완료 후 해금`)}</div>
        </div>
        <span class="rp-lock">${rpDone ? uiIconSvg('check', 'rp-lock-icon') : (rpUnlocked ? uiIconSvg('progress', 'rp-lock-icon') : uiIconSvg('lock', 'rp-lock-icon'))}</span>
      </div>
    `;
  }

  function _getStatus(locked, completed) {
    if (locked) {
      return { className: 'lock', icon: uiIconSvg('lock', 'module-status-icon-svg') };
    }
    if (completed) {
      return { className: 'done', icon: uiIconSvg('check', 'module-status-icon-svg') };
    }
    return { className: 'play', icon: uiIconSvg('progress', 'module-status-icon-svg') };
  }

  return { render };
};
