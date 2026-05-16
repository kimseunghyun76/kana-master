/* ============================================================
   Module Intro View - course overview and direct step entry
   ============================================================ */

'use strict';

window.createModuleIntroView = (ctx) => {
  const gameUi = !!ctx.gameUi;
  const STEP_TYPE_META = {
    lecture:        { icon: 'book', label: gameUi ? 'STORY' : '강의' },
    kana_learn:     { icon: 'module-kana', label: gameUi ? 'CARD' : '카드' },
    kana_quiz:      { icon: 'target', label: gameUi ? 'QUIZ' : '퀴즈' },
    kana_listening: { icon: 'voice', label: gameUi ? 'LISTEN' : '듣기' },
    shadowing:      { icon: 'voice', label: gameUi ? 'SPEAK' : '말하기' },
    vocab_learn:    { icon: 'book', label: gameUi ? 'CARD' : '카드' },
    vocab_quiz:     { icon: 'target', label: gameUi ? 'QUIZ' : '퀴즈' },
  };

  function render(mod) {
    document.getElementById('flowScreen')?.classList.remove('lecture-mode');
    document.getElementById('flowScreen')?.classList.add('module-intro-mode');
    const stage = STAGES.find(s => s.id === mod.stageId);
    const prog = ctx.Store.get();
    const stepsDone = prog.modules[mod.id]?.stepsCompleted || 0;
    const startStep = Math.min(stepsDone, mod.steps.length - 1);
    const allDone = stepsDone >= mod.steps.length;
    const roleplayUnlocked = mod.roleplay && ctx.isRoleplayUnlocked(mod.id, prog);
    const visual = ctx.getModuleVisual(mod);
    const coverImage = ctx.getModuleCoverAsset(mod);
    const items = renderItems(mod, stepsDone, startStep, allDone, roleplayUnlocked);
    const lecturePreview = renderLecturePreview(mod);

    document.getElementById('flowTitle').textContent = mod.name;
    document.getElementById('flowStep').textContent = '';
    document.getElementById('flowProgressFill').style.width = '0%';
    document.getElementById('flowBody').innerHTML = `
      <div class="module-intro ${coverImage ? 'has-bg' : ''}" ${coverImage ? `style="--module-intro-bg:url('${ctx.cssUrlValue(coverImage)}')"` : ''}>
        ${coverImage ? '<div class="module-intro-bg" aria-hidden="true"></div>' : ''}
        <div class="module-intro-art">
          ${coverImage ? `<img class="module-intro-image" src="${escHtml(coverImage)}" alt="">` : `<div class="module-intro-icon large">${ctx.uiIconSvg(visual.iconKey, 'module-intro-icon-svg')}</div>`}
          <div class="module-intro-art-caption">
            <span>STAGE ${stage.id}</span>
            <strong>${escHtml(stage.name)}</strong>
          </div>
        </div>
        <div class="module-intro-content">
          <div class="module-intro-topline">
            <div class="module-intro-icon">${ctx.uiIconSvg(visual.iconKey, 'module-intro-icon-svg')}</div>
            <div class="module-intro-stage">
              <span>${gameUi ? 'QUEST' : '이번 강좌'}</span>
              <strong>${escHtml(visual.focus || mod.name)}</strong>
            </div>
          </div>
          <div class="module-intro-title">${escHtml(mod.name)}</div>
          <div class="module-intro-sub">${escHtml(mod.desc)}</div>
          <div class="module-intro-section-title">${gameUi ? 'ROUTE SELECT' : '학습 순서 · 바로 이동'}</div>
          <div class="module-intro-items">${items}</div>
          ${lecturePreview}
        </div>
      </div>
    `;

    document.getElementById('flowFooter').innerHTML = renderFooter(mod, stepsDone, startStep, allDone);
  }

  function renderItems(mod, stepsDone, startStep, allDone, roleplayUnlocked) {
    return [
      ...mod.steps.map((step, stepIndex) => {
        const meta = STEP_TYPE_META[step.type] || { icon: 'book', label: gameUi ? 'QUEST' : '학습' };
        const done = stepIndex < stepsDone;
        const current = !allDone && stepIndex === startStep;
        return `
          <button class="intro-item ${done ? 'done' : ''} ${current ? 'current' : ''}" type="button"
                  onclick="App._startFlowFromStep('${mod.id}', ${stepIndex})">
            <span class="ii-check">${ctx.uiIconSvg(done ? 'check' : meta.icon, 'ii-icon')}</span>
            <span class="intro-item-main">
              <span class="intro-item-title">${stepIndex + 1}. ${escHtml(step.title)}</span>
              <span class="intro-item-meta">${escHtml(meta.label)}${current ? (gameUi ? ' · NEXT' : ' · 이어서') : ''}</span>
            </span>
          </button>
        `;
      }),
      mod.roleplay ? `
        <button class="intro-item roleplay ${roleplayUnlocked ? '' : 'locked'}" type="button"
                ${roleplayUnlocked ? `onclick="App._startRoleplay(App._getMod('${mod.id}'))"` : 'disabled'}>
          <span class="ii-check">${ctx.uiIconSvg(roleplayUnlocked ? 'roleplay' : 'lock', 'ii-icon')}</span>
          <span class="intro-item-main">
            <span class="intro-item-title">${mod.steps.length + 1}. ROLEPLAY: ${escHtml(mod.roleplay.name)}</span>
            <span class="intro-item-meta">${roleplayUnlocked ? (gameUi ? 'LIVE SCENE' : '실전 대화') : (gameUi ? 'CLEAR ROUTE TO OPEN' : '학습 완료 후 열림')}</span>
          </span>
        </button>` : ''
    ].join('');
  }

  function renderLecturePreview(mod) {
    const lectureStep = mod.steps.find(s => s.type === 'lecture');
    const slides = lectureStep && (typeof LECTURE_DATA !== 'undefined') && LECTURE_DATA[lectureStep.lectureKey];
    const firstSlide = slides?.[0];
    if (!firstSlide) return '';
    const typeIcon = { hook:'target', culture:'grid', story:'book', mnemonic:'sparkle', funfact:'target', practice:'voice', summary:'check' };
    const icon = typeIcon[firstSlide.type] || 'book';
    return `
      <div class="lec-preview-card">
        <div class="lec-preview-badge">${ctx.uiIconSvg(icon, 'lec-preview-icon')} ${gameUi ? 'COACH SCENE' : '인앱 강의 포함'}</div>
        <div class="lec-preview-main">${ruby(firstSlide.main || '')}</div>
        <div class="lec-preview-sub">${escHtml(firstSlide.sub || '')}</div>
        <div class="lec-preview-slides">${slides.length}${gameUi ? ' CUTS · auto play' : '개 슬라이드 · 학습 시작 시 자동 재생'}</div>
      </div>
    `;
  }

  function renderFooter(mod, stepsDone, startStep, allDone) {
    if (stepsDone <= 0) {
      return `
        <button class="btn btn-primary"
                onclick="App._startFlowFromStep('${mod.id}', 0)">${gameUi ? 'START QUEST ▶' : '학습 시작 ▶'}</button>
      `;
    }
    const continueLabel = allDone
      ? (gameUi ? 'REPLAY QUEST ▶' : '복습 모드 (처음부터) ▶')
      : (gameUi ? `STEP ${stepsDone} ▶` : `${stepsDone}단계부터 이어서 ▶`);
    return `
      <div style="display:flex;gap:8px">
        <button class="btn btn-outline" style="flex:1"
                onclick="App._startFlowFromStep('${mod.id}', 0)">↩ ${gameUi ? 'START' : '처음부터'}</button>
        <button class="btn btn-primary" style="flex:2"
                onclick="App._startFlowFromStep('${mod.id}', ${startStep})">
          ${escHtml(continueLabel)}
        </button>
      </div>
    `;
  }

  return { render };
};
