/* ============================================================
   HOME VIEW — landing dashboard, missions, programs, roadmap
   ============================================================ */

'use strict';

window.createHomeView = (ctx) => {
  const gameUi = !!ctx.gameUi;
  const {
    Store,
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
    const next = getNextModule(prog);
    const isFirstVisit = prog.xp === 0 && Object.keys(prog.modules).length === 0;
    let html = '';

    html += _renderDashboardHero(next, prog, isFirstVisit);
    html += _renderPrograms(prog);
    if (!isFirstVisit) html += _renderMissions(prog);
    if (!isFirstVisit) html += _renderStats(prog);
    html += _renderRoadmap(prog);

    document.getElementById('homeContent').innerHTML = html;
  }

  function _renderDashboardHero(next, prog, isFirstVisit) {
    if (isFirstVisit) return _renderWelcome();
    if (next) {
      const stage = STAGES.find(s => s.id === next.mod.stageId);
      const pct = getModuleProgressPct(next.mod.id, prog);
      const title = next.roleplay ? next.mod.roleplay.name : next.mod.name;
      const visual = getModuleVisual(next.mod);
      const todayXP = prog.todayXP || 0;
      const guideHtml = !next.roleplay ? _renderStepGuide(next.mod, prog) : '';
      return `
        <section class="home-dashboard welcome-card">
          <div class="dashboard-main">
            <div class="dashboard-kicker">${gameUi ? 'NEXT QUEST' : '오늘의 다음 행동'}</div>
            <h1>${escHtml(title)}</h1>
            <p>${escHtml(stage.name)} · ${escHtml(visual.focus)} · ${pct}% ${gameUi ? 'CLEAR' : '진행'}</p>
            ${guideHtml}
            <button class="dashboard-primary" onclick="App.openModule('${next.mod.id}', ${next.roleplay ? 'true' : 'false'})">
              ${next.roleplay ? (gameUi ? 'START ROLEPLAY' : '롤플레이 시작') : (gameUi ? 'CONTINUE QUEST' : '계속 학습하기')}
            </button>
          </div>
          <div class="dashboard-side">
            <div class="dashboard-metric"><span>${formatNum(prog.xp)}</span><b>${gameUi ? 'TOTAL XP' : '누적 XP'}</b></div>
            <div class="dashboard-metric"><span>${prog.streak}</span><b>${gameUi ? 'STREAK' : '연속 학습'}</b></div>
            <div class="dashboard-metric"><span>${Math.min(todayXP, 100)}%</span><b>${gameUi ? 'TODAY' : '오늘 목표'}</b></div>
          </div>
        </section>
      `;
    }
    return `
      <section class="home-dashboard welcome-card">
        <div class="dashboard-main">
          <div class="dashboard-kicker">${gameUi ? 'TODAY CLEAR' : '오늘의 학습'}</div>
          <h1>${gameUi ? 'QUEST COMPLETE' : '오늘의 레슨 완료'}</h1>
          <p>${gameUi ? 'TRAIN mode is ready for review, listening, and shadowing.' : '복습, 묶음 학습, 롤플레이로 유지 학습을 이어가세요.'}</p>
          <button class="dashboard-primary" onclick="App.switchTab('practice')">${gameUi ? 'OPEN TRAIN' : '연습으로 이동'}</button>
        </div>
      </section>
    `;
  }

  function _renderWelcome() {
    const welcomeBg = cssUrlValue(window.V3GameAssets?.home || 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.webp');
    const firstMod = MODULES.find(m => m.id === 'v3_kana_map') || MODULES.find(m => m.id === 'kana_hira');
    const isV3 = firstMod?.id === 'v3_kana_map';
    return `
      <div class="welcome-card welcome-card-cinematic" style="--welcome-bg:url('${welcomeBg}')">
        <div class="welcome-bg" aria-hidden="true"></div>
        <div class="welcome-content">
          <div class="welcome-eyebrow">${isV3 ? 'KANA QUEST · START' : '처음 시작하는 학습자용 루트'}</div>
          <div class="welcome-title">${isV3 ? '五十音 MAP' : '오늘은 문자부터 시작하세요'}</div>
          <div class="welcome-copy">
            ${isV3
              ? 'Open Hiragana, Katakana, travel questions, and short answers like a story quest.'
              : '히라가나를 먼저 끝내면 여행 표현, 롤플레이, 업무 일본어가 순서대로 열립니다.'}
          </div>
          <div class="welcome-plan-row">
            <span><b>15 min</b>${isV3 ? 'daily run' : '오늘 분량'}</span>
            <span><b>7 days</b>${isV3 ? 'kana clear' : '문자 완성'}</span>
            <span><b>FREE</b>${isV3 ? 'stage 1' : '첫 단계'}</span>
          </div>
          ${firstMod ? _renderStepGuide(firstMod, Store.get(), true) : ''}
          ${firstMod ? `<button class="dashboard-primary" onclick="App.openModule('${firstMod.id}')">${isV3 ? 'START 五十音 MAP' : '히라가나 시작하기'}</button>` : ''}
        </div>
      </div>
    `;
  }

  function _renderStepGuide(mod, prog, compact = false) {
    const stepMap = _getGuideSteps(mod);
    if (!stepMap.length) return '';
    const completed = prog.modules[mod.id]?.stepsCompleted || 0;
    const cards = stepMap.map(item => {
      const done = completed > item.index;
      return `
        <button class="home-step-guide-btn ${done ? 'done' : ''}" type="button"
                onclick="event.stopPropagation(); App.openModuleStep('${mod.id}', ${item.index})">
          <span class="home-step-guide-icon">${uiIconSvg(item.iconKey, 'home-step-guide-svg')}</span>
          <span class="home-step-guide-copy">
            <b>${escHtml(item.label)}</b>
            <em>${escHtml(item.desc)}</em>
          </span>
        </button>
      `;
    }).join('');
    return `
      <div class="home-step-guide ${compact ? 'compact' : ''}">
        <div class="home-step-guide-title">${gameUi ? 'QUICK START' : '원하는 방식으로 바로 시작'}</div>
        <div class="home-step-guide-grid">${cards}</div>
      </div>
    `;
  }

  function _getGuideSteps(mod) {
    const wanted = [
      { key: 'lecture', label: gameUi ? 'STORY' : '강의 보기', desc: gameUi ? 'coach scene' : '핵심 설명부터', iconKey: 'book' },
      { key: 'learn', label: gameUi ? 'CARD' : '카드 강의', desc: gameUi ? 'memorize set' : '표현만 바로 보기', iconKey: 'grid' },
      { key: 'quiz', label: gameUi ? 'QUIZ' : '퀴즈 풀기', desc: gameUi ? 'quick check' : '바로 점검하기', iconKey: 'quiz' },
    ];
    return wanted.map(w => {
      const index = mod.steps.findIndex(step => {
        if (w.key === 'lecture') return step.type === 'lecture';
        if (w.key === 'learn') return ['vocab_learn', 'kana_learn', 'dialogue_study'].includes(step.type);
        if (w.key === 'quiz') return ['vocab_quiz', 'kana_quiz', 'kana_listening'].includes(step.type);
        return false;
      });
      if (index < 0) return null;
      const step = mod.steps[index];
      return {
        index,
        label: w.key === 'learn' && step.type === 'kana_learn' ? (gameUi ? 'KANA CARD' : '문자 카드') : w.label,
        desc: w.key === 'quiz' && step.type === 'kana_listening' ? (gameUi ? 'sound pick' : '듣고 고르기') : w.desc,
        iconKey: w.iconKey,
      };
    }).filter(Boolean);
  }

  function _renderPrograms(prog) {
    const cards = LearningPrograms.list.map(program => {
      const progress = LearningPrograms.getProgress(program, prog);
      return `
        <button class="program-card ${program.tone}"
                onclick="App.openProgram('${program.id}')">
          <span class="program-card-head">
            <span class="program-topline">${escHtml(program.label)}</span>
            <span class="program-day-count">${gameUi ? `${program.dailyMinutes} min/day` : `하루 ${program.dailyMinutes}분`}</span>
          </span>
          <span class="program-title">${escHtml(program.title)}</span>
          <span class="program-desc">${escHtml(program.desc)}</span>
          <span class="program-outcome">${escHtml(program.outcome)}</span>
          <span class="program-foot">
            <span>${progress.completed}/${progress.total} ${gameUi ? 'QUESTS' : '모듈'}</span>
            <span>${progress.pct}%</span>
          </span>
          <span class="program-bar"><span style="width:${progress.pct}%"></span></span>
        </button>
      `;
    }).join('');

    return `
      <div class="program-section">
        <div class="section-title">${gameUi ? 'PROGRAM QUESTS' : '완성 프로그램 · 목표별 플랜'}</div>
        <div class="program-strip">${cards}</div>
      </div>
    `;
  }

  function _renderMissions(prog) {
    const missions = _getDailyMissions(prog);
    const completedMissions = missions.filter(m => m.done).length;
    return `
      <div style="margin:0 16px 4px">
        <div class="section-title" style="padding:0 0 10px">${gameUi ? 'DAILY MISSIONS' : '오늘의 미션'} · ${completedMissions}/${missions.length}</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${missions.map(m => `
            <div style="background:var(--card);border:1px solid ${m.done ? 'rgba(16,185,129,.3)' : 'var(--border)'};
                         border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:12px;
                         cursor:${m.action ? 'pointer' : 'default'}"
                 onclick="${m.action || ''}">
              <span class="mission-icon">${uiIconSvg(m.iconKey, 'mission-icon-svg')}</span>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:700;${m.done ? 'text-decoration:line-through;color:var(--text3)' : ''}">${escHtml(m.title)}</div>
                <div style="font-size:11px;color:var(--text3);margin-top:2px">${escHtml(m.desc)}</div>
              </div>
              <span class="mission-status">${uiIconSvg(m.done ? 'check' : 'progress', 'mission-status-icon')}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function _renderStats(prog) {
    const doneMods = Object.entries(prog.modules).filter(([k, mp]) => {
      const mod = MODULES.find(m => m.id === k);
      return mod && mp.stepsCompleted >= mod.steps.length;
    }).length;

    return `
      <div class="stats-row" style="margin-top:16px">
        <div class="stat-card streak">
          <div class="stat-num">${prog.streak}</div>
          <div class="stat-name stat-name-row">${uiIconWrap('streak', 'mini-stat-icon')}${gameUi ? 'STREAK' : '연속 일수'}</div>
        </div>
        <div class="stat-card xp">
          <div class="stat-num">${formatNum(prog.xp)}</div>
          <div class="stat-name stat-name-row">${uiIconWrap('xp', 'mini-stat-icon')}XP</div>
        </div>
        <div class="stat-card done">
          <div class="stat-num">${doneMods}</div>
          <div class="stat-name stat-name-row">${uiIconWrap('check', 'mini-stat-icon')}${gameUi ? 'CLEAR' : '완료 모듈'}</div>
        </div>
      </div>
    `;
  }

  function _renderRoadmap(prog) {
    let html = `<div class="section-title">${gameUi ? 'STAGE MAP' : '학습 로드맵'}</div><div class="stage-map">`;
    STAGES.forEach(stage => {
      const pct = getStageProgressPct(stage.id, prog);
      const locked = prog.xp < stage.unlockXP;
      const stageMods = getModulesByStage(stage.id);
      const modCount = stageMods.length;
      html += `
        <div class="stage-card ${locked ? 'locked' : ''}" data-stage="${stage.id}"
             onclick="${!locked ? `App.switchTab('lesson')` : ''}">
          <div class="stage-header">
            <div class="stage-index">STAGE<br><b>${stage.id}</b></div>
            <div class="stage-meta">
              <div class="stage-name">${escHtml(stage.name)}</div>
              <div class="stage-sub">${stage.jlpt ? `JLPT ${stage.jlpt} · ` : ''}${modCount}${gameUi ? ' QUESTS' : '개 모듈'}</div>
            </div>
            <span class="stage-tag">${locked ? `${uiIconWrap('lock', 'stage-tag-icon')}${formatNum(stage.unlockXP)} XP` : (pct === 100 ? uiIconWrap('check', 'stage-tag-icon') : `${pct}%`)}</span>
          </div>
          <div class="stage-progress-wrap">
            <div class="stage-progress-bar-bg">
              <div class="stage-progress-bar-fill" style="width:${pct}%"></div>
            </div>
            <div class="stage-progress-text">
              <span>${locked ? `${formatNum(stage.unlockXP - prog.xp)} XP ${gameUi ? 'TO OPEN' : '더 필요'}` : stage.desc.slice(0, 30) + '…'}</span>
              <span>${pct}%</span>
            </div>
          </div>
        </div>
      `;
    });
    return `${html}</div>`;
  }

  function _getDailyMissions(prog) {
    const today = new Date().toISOString().slice(0, 10);
    const studiedToday = prog.studyDays?.includes(today);
    const next = getNextModule(prog);
    const missions = [];

    if (next) {
      const mod = next.mod;
      const mp = prog.modules[mod.id] || {};
      const stepsDone = mp.stepsCompleted || 0;
      missions.push({
        iconKey: next.roleplay ? 'roleplay' : 'book',
        title: next.roleplay ? `롤플레이 · ${mod.roleplay.name}` : `${mod.name} 학습`,
        desc: next.roleplay ? '모든 단계 완료! 롤플레이를 시작하세요' : `${stepsDone}/${mod.steps.length} 단계 완료`,
        done: false,
        action: `App.openModule('${mod.id}', ${next.roleplay ? 'true' : 'false'})`
      });
    }

    const todayXP = prog.todayXP || 0;
    const xpGoal = 100;
    missions.push({
      iconKey: 'xp',
      title: `오늘 ${xpGoal} XP 달성`,
      desc: `현재 오늘 ${todayXP} XP 획득 · 목표까지 ${Math.max(0, xpGoal - todayXP)} XP`,
      done: todayXP >= xpGoal,
      action: null
    });

    missions.push({
      iconKey: 'streak',
      title: studiedToday ? `연속 ${prog.streak}일 달성!` : '오늘 첫 학습하기',
      desc: studiedToday ? '오늘 학습 완료! 내일도 이어가세요' : '오늘 하나라도 학습하면 스트릭이 이어져요',
      done: studiedToday,
      action: studiedToday ? null : (next ? `App.openModule('${next.mod.id}')` : null)
    });

    return missions;
  }

  function openProgram(programId) {
    const program = LearningPrograms.getById(programId);
    if (!program) return;

    const prog = Store.get();
    const progress = LearningPrograms.getProgress(program, prog);
    const plan = LearningPrograms.getDayPlan(program);
    const actionLabel = progress.pct > 0 ? '이어 하기' : '이 프로그램 시작';
    document.getElementById('programOverlay')?.remove();

    const overlay = document.createElement('div');
    overlay.id = 'programOverlay';
    overlay.className = `program-overlay ${program.tone}`;
    overlay.innerHTML = `
      <div class="program-backdrop" onclick="App.closeProgram()"></div>
      <section class="program-panel" role="dialog" aria-modal="true">
        <button class="program-close" onclick="App.closeProgram()">✕</button>
        <div class="program-panel-head">
          <span class="program-topline">${escHtml(program.label)}</span>
          <h2>${escHtml(program.title)}</h2>
          <p>${escHtml(program.desc)}</p>
          <div class="program-value-grid">
            <span><b>${program.days}일</b>완성 기간</span>
            <span><b>${program.dailyMinutes}분</b>하루 분량</span>
            <span><b>${escHtml(program.audience)}</b>추천 대상</span>
          </div>
          <div class="program-outcome-panel">${escHtml(program.outcome)}</div>
          <div class="program-panel-progress">
            <span>${progress.completed}/${progress.total} 모듈 완료</span>
            <span>${progress.pct}%</span>
          </div>
          <span class="program-bar"><span style="width:${progress.pct}%"></span></span>
          ${progress.currentModule ? `
            <button class="program-start-btn" onclick="App.closeProgram();App.openModule('${progress.currentModule.id}')">
              ${actionLabel}
            </button>
          ` : ''}
        </div>
        <div class="program-days">
          ${plan.map(item => {
            const isCurrent = progress.currentModule?.id === item.module?.id;
            const moduleProgress = prog.modules?.[item.module?.id] || {};
            const done = item.module && (moduleProgress.stepsCompleted || 0) >= item.module.steps.length;
            return `
              <button class="program-day ${done ? 'done' : ''} ${isCurrent ? 'current' : ''}"
                      onclick="${item.module ? `App.closeProgram();App.openModule('${item.module.id}')` : ''}">
                <span class="program-day-num">DAY ${item.day}</span>
                <span class="program-day-main">
                  <span class="program-day-title">${escHtml(item.title)}</span>
                  <span class="program-day-desc">${escHtml(item.desc)}</span>
                </span>
                <span class="program-day-phase">${done ? '완료' : item.phase}</span>
              </button>
            `;
          }).join('')}
        </div>
      </section>
    `;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('open'));
  }

  function closeProgram() {
    const overlay = document.getElementById('programOverlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    setTimeout(() => overlay.remove(), 220);
  }

  return { render, openProgram, closeProgram };
};
