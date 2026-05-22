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

    if (gameUi) html += '<div class="v3-lesson-shell">';
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
        <div class="lesson-stage-section" id="lesson-stage-${stage.id}" data-stage="${stage.id}">
          <div class="lesson-stage-header">
            <div class="lesson-stage-dot" style="background:${locked ? '#475569' : dotColor}"></div>
            <span class="lesson-stage-title">${gameUi ? '' : `STAGE ${stage.id}: `}${escHtml(stage.name)}</span>
            <span class="lesson-stage-badge" style="background:${badgeBg};color:${badgeColor};padding:3px 8px;border-radius:20px;font-size:10px;font-weight:700;">
              ${locked ? `${uiIconWrap('lock', 'badge-icon')}${formatNum(stage.unlockXP)} XP` : (stage.jlpt || (gameUi ? '학습 가능' : '심화 학습'))}
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

    if (gameUi) html += '</div>';
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
      <section class="lesson-overview ${gameUi ? 'v3-lesson-overview' : ''}">
        <div>
          <div class="lesson-overview-kicker">${gameUi ? '전체 학습 지도' : '전체 커리큘럼'}</div>
          <h2>${nextTitle ? escHtml(nextTitle) : (gameUi ? '모든 레슨 완료' : '모든 레슨 완료')}</h2>
          <p>${nextTitle ? (gameUi ? '지금 이어서 학습할 레슨입니다.' : '현재 이어서 진행할 레슨입니다.') : (gameUi ? '복습과 롤플레이로 배운 내용을 유지하세요.' : '복습과 롤플레이로 유지 학습을 이어가세요.')}</p>
          ${next ? `<button class="lesson-overview-start" onclick="App.openModule('${next.mod.id}', ${next.roleplay ? 'true' : 'false'})">${next.roleplay ? '롤플레이 시작' : '이어서 학습하기'}</button>` : ''}
        </div>
        <div class="lesson-overview-stats">
          <span><b>${doneMods}</b>${gameUi ? '완료' : '완료'}</span>
          <span><b>${MODULES.length}</b>${gameUi ? '전체' : '전체'}</span>
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
    const statusLabel = modLocked ? _getLockedLabel(stageLocked, accessLocked, prog, mod, requiredTier) : (completed ? '완료' : (done > 0 ? '이어하기' : '시작하기'));
    const tierLabel = _getTierLabel(requiredTier);

    if (gameUi) return _renderModuleCardV3({ mod, stage, modLocked, mp, totalSteps, done, pct, completed, visual, moduleImage, statusLabel, requiredTier, tierLabel });

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
            <span class="access-tier-badge ${requiredTier}">${tierLabel}</span>
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
          <div class="module-action-label">${statusLabel}</div>
        </div>
        <div class="module-status ${status.className}">${status.icon}</div>
      </div>
    `;

    if (mod.roleplay && !modLocked) {
      html += _renderRoleplayCard(mod, mp, visual, totalSteps);
    }

    return html;
  }

  // V3 lesson card — single cover image + content summary chips (강의/카드/퀴즈/듣기/롤플레이)
  function _renderModuleCardV3(d) {
    const { mod, stage, modLocked, mp, totalSteps, done, pct, completed, visual, moduleImage, statusLabel, requiredTier, tierLabel } = d;
    const rpUnlocked = !modLocked && isRoleplayUnlocked(mod.id, Store.get());
    const rpDone = mp.roleplayDone;

    // 각 단계를 개별 메뉴 칩으로 — 단어 카드/문장 카드를 따로 노출.
    const chipDefs = [];
    const seen = {};
    (mod.steps || []).forEach((s, i) => {
      let key, label, iconKey;
      if (s.type === 'lecture') { key = 'lecture'; label = '강의'; iconKey = 'book'; }
      else if (s.type === 'vocab_learn') {
        const mode = ContentIndex.getStepMode(s);
        if (mode === 'sentence') { key = 'learn-sentence'; label = '문장 카드'; iconKey = 'book'; }
        else { key = 'learn-word'; label = '단어 카드'; iconKey = 'grid'; }
      }
      else if (s.type === 'kana_learn' || s.type === 'kana_chart') { key = 'learn-kana'; label = '문자 카드'; iconKey = 'grid'; }
      else if (s.type === 'vocab_quiz' || s.type === 'kana_quiz') { key = 'quiz'; label = '퀴즈'; iconKey = 'quiz'; }
      else if (s.type === 'kana_listening' || s.type === 'shadowing') { key = 'listen'; label = '듣기'; iconKey = 'voice'; }
      else return;
      if (seen[key]) return;
      seen[key] = true;
      chipDefs.push({ key, label, iconKey, index: i });
    });

    const contentChips = chipDefs.map(c => `
      <button class="v3-mod-chip ${c.key.replace('learn-', 'learn ')}" type="button"
              ${modLocked ? 'disabled' : `onclick="event.stopPropagation();App.openModuleStep('${mod.id}', ${c.index})"`}>
        <span class="v3-mod-chip-ico">${uiIconSvg(c.iconKey, 'v3-mod-chip-svg')}</span>${c.label}
      </button>
    `).join('');

    // 롤플레이가 여러 개면 각각 칩으로 (현재 데이터는 1개 → mod.roleplay)
    const roleplays = Array.isArray(mod.roleplays) ? mod.roleplays : (mod.roleplay ? [mod.roleplay] : []);
    const rpChip = roleplays.map((rp, ri) => `
      <button class="v3-mod-chip rp ${rpUnlocked ? '' : 'is-locked'} ${rpDone ? 'is-done' : ''}" type="button"
              ${rpUnlocked ? `onclick="event.stopPropagation();App.openModule('${mod.id}', true${roleplays.length > 1 ? `, ${ri}` : ''})"` : 'disabled'}
              title="${escHtml(rp.name || '롤플레이')}">
        <span class="v3-mod-chip-ico">${uiIconSvg(rpDone ? 'check' : (rpUnlocked ? 'roleplay' : 'lock'), 'v3-mod-chip-svg')}</span>${roleplays.length > 1 ? escHtml(rp.name || '롤플레이') : '롤플레이'}
      </button>`).join('');

    const coverState = modLocked
      ? `<span class="v3-mod-cover-badge lock">${uiIconSvg('lock', 'v3-mod-cover-icon')}</span>`
      : completed
        ? `<span class="v3-mod-cover-badge done">${uiIconSvg('check', 'v3-mod-cover-icon')}</span>`
        : '';

    return `
      <div class="v3-mod-card ${modLocked ? 'locked' : ''} ${completed ? 'completed' : ''}"
           data-access-tier="${requiredTier}"
           onclick="${!modLocked ? `App.openModule('${mod.id}')` : ''}">
        <span class="v3-mod-cover" style="${moduleImage ? `--cover:url('${cssUrlValue(moduleImage)}')` : ''}" aria-hidden="true">
          ${coverState}
        </span>
        <div class="v3-mod-body">
          <div class="v3-mod-head">
            <span class="v3-mod-name">${escHtml(mod.name)}</span>
            <span class="access-tier-badge ${requiredTier}">${tierLabel}</span>
          </div>
          <div class="v3-mod-sub">${escHtml(mod.nameJp || '')} · ${escHtml(visual.focus)}</div>
          <div class="v3-mod-chips">${contentChips}${rpChip}</div>
          ${!modLocked ? `
            <div class="v3-mod-foot">
              <div class="v3-mod-bar"><span style="width:${pct}%;background:${stage.color}"></span></div>
              <span class="v3-mod-foot-label">${done}/${totalSteps} · ${escHtml(statusLabel)}</span>
            </div>
          ` : `<div class="v3-mod-foot locked-label">${escHtml(statusLabel)}</div>`}
        </div>
      </div>
    `;
  }

  function _summarizeSteps(mod) {
    const cats = [
      { key: 'lecture', label: '강의', iconKey: 'book', types: ['lecture'] },
      { key: 'learn', label: '카드', iconKey: 'grid', types: ['vocab_learn', 'kana_learn', 'dialogue_study', 'kana_chart'] },
      { key: 'quiz', label: '퀴즈', iconKey: 'quiz', types: ['vocab_quiz', 'kana_quiz'] },
      { key: 'listen', label: '듣기', iconKey: 'voice', types: ['kana_listening', 'shadowing'] },
    ];
    const out = [];
    cats.forEach(c => {
      let count = 0, first = -1;
      (mod.steps || []).forEach((s, i) => {
        if (c.types.includes(s.type)) { count++; if (first < 0) first = i; }
      });
      if (count > 0) out.push({ key: c.key, label: c.label, iconKey: c.iconKey, count, firstIndex: first });
    });
    return out;
  }

  function _renderRoleplayInline(mod, moduleProgress, visual, modLocked, totalSteps) {
    const rpUnlocked = !!mod.roleplay && !modLocked && isRoleplayUnlocked(mod.id, Store.get());
    const rpDone = moduleProgress.roleplayDone;
    const roleplayImage = visual.roleplayImage || visual.coverImage || visual.image || '';
    const title = mod.roleplay?.name || '실전 대화';
    const hint = mod.roleplay
      ? (rpUnlocked ? mod.roleplay.desc : `${totalSteps}단계 완료 후 열림`)
      : '이 강좌 문장으로 대화 연습을 준비 중입니다';
    return `
      <button class="module-roleplay-inline ${roleplayImage ? 'has-cover' : ''} ${!rpUnlocked ? 'locked' : ''}"
              type="button"
              ${rpUnlocked ? `onclick="event.stopPropagation();App.openModule('${mod.id}', true)"` : 'onclick="event.stopPropagation()"'}
              ${rpUnlocked ? '' : 'disabled'}
              aria-label="${escHtml(title)}">
        ${roleplayImage ? `<span class="module-roleplay-thumb" style="--module-roleplay-thumb:url('${cssUrlValue(roleplayImage)}')" aria-hidden="true"></span>` : ''}
        <span class="module-roleplay-icon">${uiIconSvg(rpDone ? 'check' : (rpUnlocked ? 'roleplay' : 'lock'), 'module-roleplay-icon-svg')}</span>
        <div class="module-roleplay-copy">
          <span class="module-roleplay-kicker">롤플레이</span>
          <strong>${escHtml(title)}</strong>
          <em>${escHtml(hint)}</em>
        </div>
      </button>
    `;
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

  function _getTierLabel(tier) {
    if (!gameUi) return String(tier || '').toUpperCase();
    if (tier === 'free') return '무료';
    if (tier === 'plus') return '플러스';
    if (tier === 'pro') return '프로';
    return '기본';
  }

  function _getLockedLabel(stageLocked, accessLocked, prog, mod, requiredTier) {
    if (!gameUi) return '잠김';
    if (accessLocked) return `${_getTierLabel(requiredTier)} 필요`;
    if (stageLocked) return '이전 단계 필요';
    void prog;
    void mod;
    return '앞 강좌 완료 후 열림';
  }

  return { render };
};
