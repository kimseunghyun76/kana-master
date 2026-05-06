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

    if (isFirstVisit) html += _renderWelcome();
    html += _renderContinue(next, prog, isFirstVisit);
    html += _renderPrograms(prog);
    if (!isFirstVisit) html += _renderMissions(prog);
    if (!isFirstVisit) html += _renderStats(prog);
    html += _renderRoadmap(prog);

    document.getElementById('homeContent').innerHTML = html;
  }

  function _renderWelcome() {
    const welcomeBg = cssUrlValue('images/lecture-scenes/slevel1-first-phrases-classroom-greeting.png');
    return `
      <div class="welcome-card welcome-card-cinematic" style="--welcome-bg:url('${welcomeBg}')">
        <div class="welcome-bg" aria-hidden="true"></div>
        <div class="welcome-content">
          <div class="welcome-title">일본어 마스터에 오신 걸 환영합니다</div>
          <div class="welcome-copy">
            히라가나부터 IT 비즈니스 일본어까지<br>
            단계별로 <b style="color:var(--accent2)">차근차근 쌓아 가는</b> 학습 시스템입니다.<br>
            가장 중요한 첫걸음인 히라가나부터 시작해 볼까요?
          </div>
          <div class="welcome-micro-track">
            <span>문자</span><span>여행</span><span>대화</span><span>업무</span>
          </div>
          <button class="btn btn-primary" onclick="App.openModule('kana_hira')"
                  style="border-radius:20px;padding:14px 32px;font-size:16px">
            히라가나 시작하기
          </button>
        </div>
      </div>
    `;
  }

  function _renderContinue(next, prog, isFirstVisit) {
    if (next && !isFirstVisit) {
      const stage = STAGES.find(s => s.id === next.mod.stageId);
      const pct = getModuleProgressPct(next.mod.id, prog);
      const title = next.roleplay ? next.mod.roleplay.name : next.mod.name;
      const sub = `STAGE ${stage.id}: ${stage.name}`;
      const visual = getModuleVisual(next.mod);
      return `
        <div class="continue-banner continue-banner-visual ${visual.tone}"
             style="${visual.image ? `--continue-bg:url('${cssUrlValue(visual.coverImage || visual.image)}')` : ''}"
             onclick="App.openModule('${next.mod.id}', ${next.roleplay ? 'true' : 'false'})">
          ${visual.image ? '<div class="continue-bg" aria-hidden="true"></div>' : ''}
          <div class="continue-content">
            <div class="continue-label">계속 학습하기</div>
            <div class="continue-module">${escHtml(title)}</div>
            <div class="continue-stage">${escHtml(sub)}</div>
            <div class="continue-focus">${uiIconSvg(visual.iconKey, 'continue-focus-icon')} ${escHtml(visual.focus)}</div>
            <div class="continue-progress">
              <div class="continue-progress-bar" style="width:${pct}%"></div>
            </div>
          </div>
          <div class="continue-arrow">›</div>
        </div>
      `;
    }
    if (!isFirstVisit) {
      return `
        <div class="continue-banner" style="cursor:default;">
          <div class="continue-label">오늘의 학습</div>
          <div class="continue-module">오늘의 레슨을 모두 마쳤습니다</div>
          <div class="continue-stage">계속 연습하거나 심화 학습을 이어가세요</div>
        </div>
      `;
    }
    return '';
  }

  function _renderPrograms(prog) {
    const cards = LearningPrograms.list.map(program => {
      const progress = LearningPrograms.getProgress(program, prog);
      return `
        <button class="program-card ${program.tone}"
                onclick="App.openProgram('${program.id}')">
          <span class="program-card-head">
            <span class="program-topline">${escHtml(program.label)}</span>
            <span class="program-day-count">${program.days}일</span>
          </span>
          <span class="program-title">${escHtml(program.title)}</span>
          <span class="program-desc">${escHtml(program.desc)}</span>
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
        <div class="section-title">완성 프로그램</div>
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
          <div class="program-panel-progress">
            <span>${progress.completed}/${progress.total} 모듈 완료</span>
            <span>${progress.pct}%</span>
          </div>
          <span class="program-bar"><span style="width:${progress.pct}%"></span></span>
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
