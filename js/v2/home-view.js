/* ============================================================
   HOME VIEW — landing dashboard, missions, programs, roadmap
   ============================================================ */

'use strict';

window.createHomeView = (ctx) => {
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
      return `
        <section class="home-dashboard welcome-card">
          <div class="dashboard-main">
            <div class="dashboard-kicker">오늘의 다음 행동</div>
            <h1>${escHtml(title)}</h1>
            <p>${escHtml(stage.name)} · ${escHtml(visual.focus)} · ${pct}% 진행</p>
            <button class="dashboard-primary" onclick="App.openModule('${next.mod.id}', ${next.roleplay ? 'true' : 'false'})">
              ${next.roleplay ? '롤플레이 시작' : '계속 학습하기'}
            </button>
          </div>
          <div class="dashboard-side">
            <div class="dashboard-metric"><span>${formatNum(prog.xp)}</span><b>누적 XP</b></div>
            <div class="dashboard-metric"><span>${prog.streak}</span><b>연속 학습</b></div>
            <div class="dashboard-metric"><span>${Math.min(todayXP, 100)}%</span><b>오늘 목표</b></div>
          </div>
        </section>
      `;
    }
    return `
      <section class="home-dashboard welcome-card">
        <div class="dashboard-main">
          <div class="dashboard-kicker">오늘의 학습</div>
          <h1>오늘의 레슨 완료</h1>
          <p>복습, 묶음 학습, 롤플레이로 유지 학습을 이어가세요.</p>
          <button class="dashboard-primary" onclick="App.switchTab('practice')">연습으로 이동</button>
        </div>
      </section>
    `;
  }

  function _renderWelcome() {
    const welcomeBg = cssUrlValue('images/lecture-scenes/slevel1-first-phrases-classroom-greeting.png');
    return `
      <div class="welcome-card welcome-card-cinematic" style="--welcome-bg:url('${welcomeBg}')">
        <div class="welcome-bg" aria-hidden="true"></div>
        <div class="welcome-content">
          <div class="welcome-eyebrow">처음 시작하는 학습자용 루트</div>
          <div class="welcome-title">오늘은 문자부터 시작하세요</div>
          <div class="welcome-copy">
            히라가나를 먼저 끝내면 여행 표현, 롤플레이, 업무 일본어가 순서대로 열립니다.
          </div>
          <div class="welcome-plan-row">
            <span><b>15분</b>오늘 분량</span>
            <span><b>7일</b>문자 완성</span>
            <span><b>무료</b>첫 단계</span>
          </div>
          <button class="dashboard-primary" onclick="App.openModule('kana_hira')">히라가나 시작하기</button>
        </div>
      </div>
    `;
  }

  function _renderPrograms(prog) {
    const cards = LearningPrograms.list.map(program => {
      const progress = LearningPrograms.getProgress(program, prog);
      return `
        <button class="program-card ${program.tone}"
                onclick="App.openProgram('${program.id}')">
          <span class="program-card-head">
            <span class="program-topline">${escHtml(program.label)}</span>
            <span class="program-day-count">하루 ${program.dailyMinutes}분</span>
          </span>
          <span class="program-title">${escHtml(program.title)}</span>
          <span class="program-desc">${escHtml(program.desc)}</span>
          <span class="program-outcome">${escHtml(program.outcome)}</span>
          <span class="program-foot">
            <span>${progress.completed}/${progress.total} 모듈</span>
            <span>${progress.pct}%</span>
          </span>
          <span class="program-bar"><span style="width:${progress.pct}%"></span></span>
        </button>
      `;
    }).join('');

    return `
      <div class="program-section">
        <div class="section-title">완성 프로그램 · 목표별 플랜</div>
        <div class="program-strip">${cards}</div>
      </div>
    `;
  }

  function _renderMissions(prog) {
    const missions = _getDailyMissions(prog);
    const completedMissions = missions.filter(m => m.done).length;
    return `
      <div style="margin:0 16px 4px">
        <div class="section-title" style="padding:0 0 10px">오늘의 미션 · ${completedMissions}/${missions.length}</div>
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
          <div class="stat-name stat-name-row">${uiIconWrap('streak', 'mini-stat-icon')}연속 일수</div>
        </div>
        <div class="stat-card xp">
          <div class="stat-num">${formatNum(prog.xp)}</div>
          <div class="stat-name stat-name-row">${uiIconWrap('xp', 'mini-stat-icon')}XP</div>
        </div>
        <div class="stat-card done">
          <div class="stat-num">${doneMods}</div>
          <div class="stat-name stat-name-row">${uiIconWrap('check', 'mini-stat-icon')}완료 모듈</div>
        </div>
      </div>
    `;
  }

  function _renderRoadmap(prog) {
    let html = `<div class="section-title">학습 로드맵</div><div class="stage-map">`;
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
              <div class="stage-sub">${stage.jlpt ? `JLPT ${stage.jlpt} · ` : ''}${modCount}개 모듈</div>
            </div>
            <span class="stage-tag">${locked ? `${uiIconWrap('lock', 'stage-tag-icon')}${formatNum(stage.unlockXP)} XP` : (pct === 100 ? uiIconWrap('check', 'stage-tag-icon') : `${pct}%`)}</span>
          </div>
          <div class="stage-progress-wrap">
            <div class="stage-progress-bar-bg">
              <div class="stage-progress-bar-fill" style="width:${pct}%"></div>
            </div>
            <div class="stage-progress-text">
              <span>${locked ? `${formatNum(stage.unlockXP - prog.xp)} XP 더 필요` : stage.desc.slice(0, 30) + '…'}</span>
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
