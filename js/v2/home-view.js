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

    if (gameUi) html += '<div class="v3-home-shell">';
    html += _renderDashboardHero(next, prog, isFirstVisit);
    if (!isFirstVisit) html += _renderStats(prog);
    if (isFirstVisit) html += _renderPrograms(prog);
    html += _renderRoadmap(prog);
    if (!isFirstVisit) html += _renderPrograms(prog, true);
    if (gameUi) html += '</div>';

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
      const missionHtml = _renderMissionTabs(prog);
      return `
        <section class="home-dashboard welcome-card ${gameUi ? 'v3-home-next-card' : ''}">
          <div class="dashboard-main">
            <div class="dashboard-row-top">
              <div>
                <div class="dashboard-kicker">${gameUi ? '오늘 이어서 학습' : '오늘의 다음 행동'}</div>
                <h1>${escHtml(title)}</h1>
                <p>${escHtml(stage.name)} · ${escHtml(visual.focus)} · ${pct}% 진행</p>
              </div>
              <button class="dashboard-primary compact" onclick="App.openModule('${next.mod.id}', ${next.roleplay ? 'true' : 'false'})">
                ${next.roleplay ? '롤플레이' : '이어하기'}
              </button>
            </div>
            ${missionHtml}
            ${guideHtml}
          </div>
          <div class="dashboard-side">
            <div class="dashboard-metric"><span>${formatNum(prog.xp)}</span><b>${gameUi ? '누적 XP' : '누적 XP'}</b></div>
            <div class="dashboard-metric"><span>${prog.streak}</span><b>${gameUi ? '연속 학습' : '연속 학습'}</b></div>
            <div class="dashboard-metric"><span>${Math.min(todayXP, 100)}%</span><b>${gameUi ? '오늘 목표' : '오늘 목표'}</b></div>
          </div>
        </section>
      `;
    }
    return `
      <section class="home-dashboard welcome-card">
        <div class="dashboard-main">
          <div class="dashboard-kicker">${gameUi ? '오늘 학습 완료' : '오늘의 학습'}</div>
          <h1>${gameUi ? '오늘 레슨을 마쳤어요' : '오늘의 레슨 완료'}</h1>
          <p>${gameUi ? '복습, 듣기, 따라 말하기로 오늘 배운 내용을 다시 확인하세요.' : '복습, 묶음 학습, 롤플레이로 유지 학습을 이어가세요.'}</p>
          ${_renderMissionTabs(prog)}
          <button class="dashboard-primary" onclick="App.switchTab('practice')">${gameUi ? '연습으로 이동' : '연습으로 이동'}</button>
        </div>
      </section>
    `;
  }

  function _renderWelcome() {
    const welcomeBg = cssUrlValue(window.V3GameAssets?.home || 'images/lecture-scenes/slevel1-first-phrases-classroom-greeting.webp');
    const firstMod = MODULES.find(m => m.id === 'v3_kana_map') || MODULES.find(m => m.id === 'kana_hira');
    const isV3 = firstMod?.id === 'v3_kana_map';
    return `
      <div class="welcome-card welcome-card-cinematic ${gameUi ? 'v3-home-hero' : ''}" style="--welcome-bg:url('${welcomeBg}')">
        <div class="welcome-bg" aria-hidden="true"></div>
        <div class="welcome-content">
          <div class="welcome-eyebrow">${isV3 ? '첫날 학습 지도' : '처음 시작하는 학습자용 루트'}</div>
          <div class="welcome-title">${isV3 ? '五十音 MAP' : '오늘은 문자부터 시작하세요'}</div>
          <div class="welcome-copy">
            ${isV3
              ? '히라가나와 가타카나부터 여행 표현, N5 기초까지 순서대로 열립니다.'
              : '히라가나를 먼저 끝내면 여행 표현, 롤플레이, 업무 일본어가 순서대로 열립니다.'}
          </div>
          <div class="welcome-plan-row">
            <span><b>15분</b>${isV3 ? '하루 학습' : '오늘 분량'}</span>
            <span><b>7일</b>${isV3 ? '문자 완성' : '문자 완성'}</span>
            <span><b>N5</b>${isV3 ? '기초 준비' : '첫 단계'}</span>
          </div>
          ${firstMod ? _renderStepGuide(firstMod, Store.get(), true) : ''}
          ${firstMod ? `<button class="dashboard-primary" onclick="App.openModule('${firstMod.id}')">${isV3 ? '오십음도 시작하기' : '히라가나 시작하기'}</button>` : ''}
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
        <div class="home-step-guide-title">${gameUi ? '바로 학습하기' : '원하는 방식으로 바로 시작'}</div>
        <div class="home-step-guide-grid">${cards}</div>
      </div>
    `;
  }

  function _getGuideSteps(mod) {
    const wanted = [
      { key: 'lecture', label: gameUi ? '강의' : '강의 보기', desc: gameUi ? '핵심 설명부터' : '핵심 설명부터', iconKey: 'book' },
      { key: 'learn', label: gameUi ? '카드' : '카드 강의', desc: gameUi ? '글자와 표현 암기' : '표현만 바로 보기', iconKey: 'grid' },
      { key: 'quiz', label: gameUi ? '퀴즈' : '퀴즈 풀기', desc: gameUi ? '바로 점검하기' : '바로 점검하기', iconKey: 'quiz' },
      { key: 'listen', label: gameUi ? '듣기' : '듣기 연습', desc: gameUi ? '소리로 확인' : '소리로 확인', iconKey: 'voice' },
    ];
    return wanted.map(w => {
      const index = mod.steps.findIndex(step => {
        if (w.key === 'lecture') return step.type === 'lecture';
        if (w.key === 'learn') return ['vocab_learn', 'kana_learn', 'dialogue_study'].includes(step.type);
        if (w.key === 'quiz') return ['vocab_quiz', 'kana_quiz', 'kana_listening'].includes(step.type);
        if (w.key === 'listen') return ['kana_listening', 'shadowing'].includes(step.type);
        return false;
      });
      if (index < 0) return null;
      const step = mod.steps[index];
      return {
        index,
        label: w.key === 'learn' && step.type === 'kana_learn' ? (gameUi ? '문자' : '문자 카드') : w.label,
        desc: w.key === 'quiz' && step.type === 'kana_listening' ? (gameUi ? '듣고 고르기' : '듣고 고르기') : w.desc,
        iconKey: w.iconKey,
      };
    }).filter((item, pos, arr) => item && arr.findIndex(other => other && other.index === item.index) === pos);
  }

  function _renderPrograms(prog, tucked = false) {
    const cards = LearningPrograms.list.map(program => {
      const progress = LearningPrograms.getProgress(program, prog);
      return `
        <button class="program-card ${program.tone}"
                onclick="App.openProgram('${program.id}')">
            <span class="program-card-head">
              <span class="program-topline">${escHtml(program.label)}</span>
            <span class="program-day-count">${gameUi ? `하루 ${program.dailyMinutes}분` : `하루 ${program.dailyMinutes}분`}</span>
          </span>
          <span class="program-title">${escHtml(program.title)}</span>
          <span class="program-desc">${escHtml(program.desc)}</span>
          <span class="program-outcome">${escHtml(program.outcome)}</span>
          <span class="program-foot">
            <span>${progress.completed}/${progress.total} ${gameUi ? '모듈' : '모듈'}</span>
            <span>${progress.pct}%</span>
          </span>
          <span class="program-bar"><span style="width:${progress.pct}%"></span></span>
        </button>
      `;
    }).join('');

    return `
      <div class="program-section">
        <div class="section-title">${tucked ? '처음 설계했던 목표별 학습 루트' : (gameUi ? '목표별 학습 루트' : '완성 프로그램 · 목표별 플랜')}</div>
        <div class="program-strip">${cards}</div>
      </div>
    `;
  }

  function _renderMissionTabs(prog) {
    const missions = _getDailyMissions(prog);
    const completedMissions = missions.filter(m => m.done).length;
    return `
      <div class="home-daily-tabs">
        <div class="home-daily-tab-head">
          <span class="active">오늘 루트</span>
          <span>미션 ${completedMissions}/${missions.length}</span>
        </div>
        <div class="home-mission-inline">
          ${missions.map(m => `
            <button class="home-mission-pill ${m.done ? 'done' : ''}" type="button" onclick="${m.action || ''}">
              <span>${uiIconSvg(m.done ? 'check' : m.iconKey, 'mission-inline-icon')}</span>
              <b>${escHtml(m.title)}</b>
            </button>
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
          <div class="stat-name stat-name-row">${uiIconWrap('streak', 'mini-stat-icon')}${gameUi ? '연속 일수' : '연속 일수'}</div>
        </div>
        <div class="stat-card xp">
          <div class="stat-num">${formatNum(prog.xp)}</div>
          <div class="stat-name stat-name-row">${uiIconWrap('xp', 'mini-stat-icon')}XP</div>
        </div>
        <div class="stat-card done">
          <div class="stat-num">${doneMods}</div>
          <div class="stat-name stat-name-row">${uiIconWrap('check', 'mini-stat-icon')}${gameUi ? '완료 모듈' : '완료 모듈'}</div>
        </div>
      </div>
    `;
  }

  function _renderRoadmap(prog) {
    let html = `<div class="section-title">${gameUi ? '단계별 학습 지도' : '학습 로드맵'}</div><div class="stage-map">`;
    STAGES.forEach(stage => {
      const pct = getStageProgressPct(stage.id, prog);
      const locked = prog.xp < stage.unlockXP;
      const stageMods = getModulesByStage(stage.id);
      const modCount = stageMods.length;
      html += `
        <div class="stage-card ${locked ? 'locked' : ''}" data-stage="${stage.id}"
             onclick="${!locked ? `App.switchTab('lesson')` : ''}">
          <div class="stage-header">
            <div class="stage-index">${gameUi ? '단계' : 'STAGE'}<br><b>${stage.id}</b></div>
            <div class="stage-meta">
              <div class="stage-name">${escHtml(stage.name)}</div>
              <div class="stage-sub">${stage.jlpt ? `JLPT ${stage.jlpt} · ` : ''}${modCount}${gameUi ? '개 모듈' : '개 모듈'}</div>
            </div>
            <span class="stage-tag">${locked ? `${uiIconWrap('lock', 'stage-tag-icon')}${formatNum(stage.unlockXP)} XP` : (pct === 100 ? uiIconWrap('check', 'stage-tag-icon') : `${pct}%`)}</span>
          </div>
          <div class="stage-progress-wrap">
            <div class="stage-progress-bar-bg">
              <div class="stage-progress-bar-fill" style="width:${pct}%"></div>
            </div>
            <div class="stage-progress-text">
              <span>${locked ? `${formatNum(stage.unlockXP - prog.xp)} XP ${gameUi ? '더 필요' : '더 필요'}` : escHtml(stage.desc)}</span>
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
