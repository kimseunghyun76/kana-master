/* ============================================================
   Module Intro View - course overview and direct step entry
   ============================================================ */

'use strict';

window.createModuleIntroView = (ctx) => {
  const gameUi = !!ctx.gameUi;
  const STEP_TYPE_META = {
    lecture:        { icon: 'book', label: '강의' },
    kana_learn:     { icon: 'module-kana', label: '카드' },
    kana_quiz:      { icon: 'target', label: '퀴즈' },
    kana_listening: { icon: 'voice', label: '듣기' },
    shadowing:      { icon: 'voice', label: '말하기' },
    vocab_learn:    { icon: 'book', label: '카드' },
    vocab_quiz:     { icon: 'target', label: '퀴즈' },
    dialogue_study: { icon: 'roleplay', label: '대화 미리보기' },
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
    const lecturePreview = gameUi ? '' : renderLecturePreview(mod);

    document.getElementById('flowTitle').textContent = visual.focus || mod.name;
    document.getElementById('flowStep').textContent = '';
    document.getElementById('flowProgressFill').style.width = '0%';
    document.getElementById('flowBody').innerHTML = `
      <div class="module-intro ${coverImage ? 'has-bg' : ''}" ${coverImage ? `style="--module-intro-bg:url('${ctx.cssUrlValue(coverImage)}')"` : ''}>
        ${coverImage ? '<div class="module-intro-bg" aria-hidden="true"></div>' : ''}
        ${!gameUi ? `<div class="module-intro-art">
          ${coverImage ? `<img class="module-intro-image" src="${escHtml(coverImage)}" alt="">` : `<div class="module-intro-icon large">${ctx.uiIconSvg(visual.iconKey, 'module-intro-icon-svg')}</div>`}
          <div class="module-intro-art-caption">
            <span>STAGE ${stage.id}</span>
            <strong>${escHtml(stage.name)}</strong>
          </div>
        </div>` : ''}
        <div class="module-intro-content">
          <div class="module-intro-topline">
            <div class="module-intro-icon">${ctx.uiIconSvg(visual.iconKey, 'module-intro-icon-svg')}</div>
            <div class="module-intro-stage">
              <span>${gameUi ? `STAGE ${stage.id} · ${escHtml(stage.name)}` : `STAGE ${stage.id} · ${escHtml(stage.name)}`}</span>
              <strong>${escHtml(mod.name)}</strong>
            </div>
          </div>
          ${!gameUi ? `<div class="module-intro-title">${escHtml(mod.name)}</div>` : ''}
          <div class="module-intro-sub">${escHtml(mod.desc)}</div>
          ${!gameUi ? `<div class="module-intro-section-title">학습 순서</div>
          <div class="module-intro-items">${items}</div>` : ''}
          ${lecturePreview}
        </div>
        ${gameUi ? `
          <div class="module-intro-sequence">
            <div class="module-intro-section-title">학습 순서</div>
            <div class="module-intro-items">${items}</div>
          </div>
        ` : ''}
      </div>
    `;

    document.getElementById('flowFooter').innerHTML = renderFooter(mod, stepsDone, startStep, allDone);
  }

  function renderItems(mod, stepsDone, startStep, allDone, roleplayUnlocked) {
    if (gameUi) return renderCompactItems(mod, stepsDone, startStep, allDone, roleplayUnlocked);
    return [
      ...mod.steps.map((step, stepIndex) => {
        const meta = STEP_TYPE_META[step.type] || { icon: 'book', label: '학습' };
        const done = stepIndex < stepsDone;
        const current = !allDone && stepIndex === startStep;
        const lecturePreview = gameUi && step.type === 'lecture' ? renderLecturePreview(mod, step) : '';
        return `
          <button class="intro-item ${done ? 'done' : ''} ${current ? 'current' : ''}" type="button"
                  onclick="App._startFlowFromStep('${mod.id}', ${stepIndex})">
            <span class="ii-check">${done ? ctx.uiIconSvg('check', 'ii-icon') : stepIndex + 1}</span>
            <span class="intro-item-main">
              <span class="intro-item-title">${stepIndex + 1}. ${escHtml(step.title)}</span>
              <span class="intro-item-meta">${escHtml(meta.label)}${current ? ' · 이어서' : ''}</span>
              ${lecturePreview}
            </span>
          </button>
        `;
      }),
      mod.roleplay ? `
        <button class="intro-item roleplay ${roleplayUnlocked ? '' : 'locked'}" type="button"
                ${roleplayUnlocked ? `onclick="App._startRoleplay(App._getMod('${mod.id}'))"` : 'disabled'}>
          <span class="ii-check">${ctx.uiIconSvg(roleplayUnlocked ? 'roleplay' : 'lock', 'ii-icon')}</span>
          <span class="intro-item-main">
            <span class="intro-item-title">${mod.steps.length + 1}. 실전 대화: ${escHtml(mod.roleplay.name)}</span>
            <span class="intro-item-meta">${roleplayUnlocked ? '롤플레이' : '학습 완료 후 열림'}</span>
          </span>
        </button>` : ''
    ].join('');
  }

  function renderCompactItems(mod, stepsDone, startStep, allDone, roleplayUnlocked) {
    const groups = [];
    let cardGroup = null;
    mod.steps.forEach((step, stepIndex) => {
      const isCard = ['kana_learn', 'vocab_learn'].includes(step.type);
      if (isCard) {
        if (!cardGroup) {
          cardGroup = {
            type: 'card',
            firstIndex: stepIndex,
            lastIndex: stepIndex,
            titles: [],
          };
          groups.push(cardGroup);
        }
        cardGroup.lastIndex = stepIndex;
        cardGroup.titles.push(step.title.replace(/^[\d\.\s]+/, ''));
        return;
      }
      cardGroup = null;
      groups.push({
        type: step.type,
        firstIndex: stepIndex,
        lastIndex: stepIndex,
        title: compactStepTitle(step),
      });
    });
    if (mod.roleplay) {
      groups.push({
        type: 'roleplay',
        firstIndex: mod.steps.length,
        lastIndex: mod.steps.length,
        title: mod.roleplay.name,
        locked: !roleplayUnlocked,
      });
    }

    return groups.map((group, groupIndex) => {
      const done = group.lastIndex < stepsDone || (group.type === 'roleplay' && roleplayUnlocked);
      const current = !allDone && startStep >= group.firstIndex && startStep <= group.lastIndex;
      const meta = compactMeta(group.type);
      const action = group.type === 'roleplay'
        ? (group.locked ? '' : `onclick="App._startRoleplay(App._getMod('${mod.id}'))"`)
        : `onclick="App._startFlowFromStep('${mod.id}', ${group.firstIndex})"`;
      const title = group.type === 'card'
        ? `카드 ${group.titles.length}묶음`
        : group.title;
      const desc = group.type === 'card'
        ? group.titles.slice(0, 2).map(t => t.replace(/[🎬💡]/g, '').trim()).join(' · ')
        : meta.desc;
      return `
        <button class="intro-item compact ${done ? 'done' : ''} ${current ? 'current' : ''} ${group.locked ? 'locked' : ''}" type="button"
                ${action} ${group.locked ? 'disabled' : ''}>
          <span class="ii-check">${ctx.uiIconSvg(meta.icon, 'ii-icon')}</span>
          <span class="intro-item-main">
            <span class="intro-item-title">${groupIndex + 1}. ${escHtml(title)}</span>
            <span class="intro-item-meta">${escHtml(meta.label)} · ${escHtml(desc)}</span>
          </span>
        </button>
      `;
    }).join('');
  }

  function compactStepTitle(step) {
    const title = (step.title || '').replace(/[🎬💡]/g, '').replace(/^\d+\.\s*/, '').trim();
    if (step.type === 'lecture') return title || '강의';
    if (step.type === 'dialogue_study') return '대화 미리보기';
    if (step.type === 'kana_quiz' || step.type === 'vocab_quiz' || step.type === 'kana_listening') return '퀴즈';
    if (step.type === 'shadowing') return '말하기';
    return title || '학습';
  }

  function compactMeta(type) {
    const map = {
      lecture: { icon: 'book', label: '강의', desc: '핵심 설명' },
      card: { icon: 'grid', label: '카드', desc: '표현 암기' },
      dialogue_study: { icon: 'roleplay', label: '대화', desc: '미리 보기' },
      kana_quiz: { icon: 'target', label: '퀴즈', desc: '바로 점검' },
      vocab_quiz: { icon: 'target', label: '퀴즈', desc: '바로 점검' },
      kana_listening: { icon: 'voice', label: '듣기', desc: '소리 점검' },
      shadowing: { icon: 'voice', label: '말하기', desc: '따라 말하기' },
      roleplay: { icon: 'roleplay', label: '롤플레이', desc: '실전 적용' },
    };
    return map[type] || { icon: 'book', label: '학습', desc: '다음 단계' };
  }

  function renderLecturePreview(mod, lectureStep = null) {
    lectureStep = lectureStep || mod.steps.find(s => s.type === 'lecture');
    const slides = lectureStep && (typeof LECTURE_DATA !== 'undefined') && LECTURE_DATA[lectureStep.lectureKey];
    const firstSlide = slides?.[0];
    if (!firstSlide) return '';
    const typeIcon = { hook:'target', culture:'grid', story:'book', mnemonic:'sparkle', funfact:'target', practice:'voice', summary:'check' };
    const icon = typeIcon[firstSlide.type] || 'book';
    return `
      <div class="lec-preview-card">
        <div class="lec-preview-badge">${ctx.uiIconSvg(icon, 'lec-preview-icon')} 강사 설명 포함</div>
        <div class="lec-preview-main">${ruby(firstSlide.main || '')}</div>
        <div class="lec-preview-sub">${escHtml(firstSlide.sub || '')}</div>
        <div class="lec-preview-slides">${slides.length}개 장면 · 학습 시작 시 자동 재생</div>
      </div>
    `;
  }

  function renderFooter(mod, stepsDone, startStep, allDone) {
    if (stepsDone <= 0) {
      return `
        <button class="btn btn-primary"
                onclick="App._startFlowFromStep('${mod.id}', 0)">학습 시작 · 강사 선택 ▶</button>
      `;
    }
    const continueLabel = allDone
      ? '복습 모드 (처음부터) ▶'
      : `${stepsDone}단계부터 이어서 ▶`;
    return `
      <div style="display:flex;gap:8px">
        <button class="btn btn-outline" style="flex:1"
                onclick="App._startFlowFromStep('${mod.id}', 0)">↩ 처음부터</button>
        <button class="btn btn-primary" style="flex:2"
                onclick="App._startFlowFromStep('${mod.id}', ${startStep})">
          ${escHtml(continueLabel)}
        </button>
      </div>
    `;
  }

  return { render };
};
