/* ============================================================
   LESSON VIEW — stage list, modules, roleplay entries
   ============================================================ */

'use strict';

window.createLessonView = (ctx) => {
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

    STAGES.forEach(stage => {
      const locked = prog.xp < stage.unlockXP;
      const mods = getModulesByStage(stage.id);
      if (!mods.length) return;

      const dotColor = stage.color;
      const badgeBg = locked ? 'rgba(100,116,139,.2)' : `rgba(${hexToRgb(stage.color)},.15)`;
      const badgeColor = locked ? 'var(--text3)' : stage.color;

      html += `
        <div class="lesson-stage-section">
          <div class="lesson-stage-header">
            <div class="lesson-stage-dot" style="background:${locked ? '#475569' : dotColor}"></div>
            <span class="lesson-stage-title">${uiIconWrap(getStageIconKey(stage.id), 'lesson-stage-icon')}STAGE ${stage.id}: ${escHtml(stage.name)}</span>
            <span class="lesson-stage-badge" style="background:${badgeBg};color:${badgeColor};padding:3px 8px;border-radius:20px;font-size:10px;font-weight:700;">
              ${locked ? `${uiIconWrap('lock', 'badge-icon')}${formatNum(stage.unlockXP)} XP` : (stage.jlpt || '심화 학습')}
            </span>
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
    const moduleBg = visual.coverImage || visual.image || '';
    const status = _getStatus(modLocked, completed);

    let html = `
      <div class="module-card ${moduleBg ? 'has-image' : ''} ${modLocked ? 'locked' : ''} ${completed ? 'completed' : ''}"
           data-access-tier="${requiredTier}"
           ${moduleBg ? `style="--module-bg:url('${cssUrlValue(moduleBg)}')"` : ''}
           onclick="${!modLocked ? `App.openModule('${mod.id}')` : ''}">
        ${moduleBg ? '<div class="module-card-bg" aria-hidden="true"></div>' : ''}
        <div class="module-visual ${visual.tone}">
          <div class="module-visual-main">${uiIconSvg(visual.iconKey, 'module-visual-main-svg')}</div>
          <div class="visual-badge">${uiIconSvg(visual.iconKey, 'visual-badge-svg')}</div>
        </div>
        <div class="module-info">
          <div class="module-name-row">
            <div class="module-name">${escHtml(mod.name)}</div>
            <span class="access-tier-badge ${requiredTier}">${requiredTier.toUpperCase()}</span>
          </div>
          <div class="module-sub">${escHtml(mod.nameJp || '')} · ${totalSteps}단계</div>
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
    const roleplayBg = visual.roleplayImage || visual.coverImage || visual.image || '';
    return `
      <div class="roleplay-card ${roleplayBg ? 'has-image' : ''} ${!rpUnlocked ? 'locked' : ''}"
           ${roleplayBg ? `style="--roleplay-card-bg:url('${cssUrlValue(roleplayBg)}')"` : ''}
           onclick="${rpUnlocked ? `App.openModule('${mod.id}', true)` : ''}">
        ${roleplayBg ? '<div class="roleplay-card-bg" aria-hidden="true"></div>' : ''}
        <span class="rp-icon">${uiIconSvg('roleplay', 'rp-icon-svg')}</span>
        <div class="rp-info">
          <div class="rp-name">${escHtml(mod.roleplay.name)}</div>
          <div class="rp-hint">${rpUnlocked ? escHtml(mod.roleplay.desc) : `위 ${totalSteps}단계 완료 후 해금`}</div>
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
