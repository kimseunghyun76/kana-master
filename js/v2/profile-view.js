/* ============================================================
   PROFILE VIEW — profile, settings, quiz and developer tools
   ============================================================ */

'use strict';

window.createProfileView = (ctx) => {
  const {
    Store,
    TTS,
    buildTTSSettingsHtml,
    formatNum,
    uiIconSvg,
    uiIconWrap,
  } = ctx;

  function render() {
    const prog = Store.get();
    const totalXP = prog.xp;
    const nextLevelXP = _nextLevelXP(totalXP);
    const curLevelXP = _curLevelXP(totalXP);
    const levelName = _levelName(totalXP);
    const xpInLevel = totalXP - curLevelXP;
    const xpForLevel = nextLevelXP - curLevelXP;
    const xpPct = Math.round((xpInLevel / xpForLevel) * 100);
    const learnedKana = Object.keys(prog.kanaProgress).length * 10;
    const learnedVocab = Object.values(prog.modules)
      .reduce((s, mp) => s + (mp.stepsCompleted || 0) * 5, 0);

    document.getElementById('profileContent').innerHTML = `
      <div class="profile-hero">
        <div class="profile-avatar">${uiIconSvg('profile', 'profile-avatar-svg')}</div>
        <div class="profile-name">${levelName}</div>
        <div class="profile-level">${totalXP} XP · 다음 레벨까지 ${formatNum(nextLevelXP - totalXP)} XP</div>
        <div class="xp-bar-wrap">
          <div class="xp-bar-bg">
            <div class="xp-bar-fill" style="width:${xpPct}%"></div>
          </div>
          <div class="xp-bar-label">${xpInLevel} / ${xpForLevel} XP</div>
        </div>
      </div>

      <div class="profile-stats-grid">
        <div class="pstat">
          <div class="ps-num" style="color:var(--warning)">${prog.streak}</div>
          <div class="ps-name ps-name-row">${uiIconWrap('streak', 'mini-stat-icon')}연속일</div>
        </div>
        <div class="pstat">
          <div class="ps-num" style="color:var(--accent2)">${prog.totalDays || 0}</div>
          <div class="ps-name ps-name-row">${uiIconWrap('calendar', 'mini-stat-icon')}총 학습일</div>
        </div>
        <div class="pstat">
          <div class="ps-num" style="color:var(--success)">${learnedKana + learnedVocab}</div>
          <div class="ps-name ps-name-row">${uiIconWrap('grid', 'mini-stat-icon')}학습 아이템</div>
        </div>
      </div>

      <div class="profile-section">
        <div class="profile-section-title">최근 4주 학습 기록</div>
        <div class="streak-calendar">${_buildCalDays(prog.studyDays)}</div>
      </div>

      ${_renderSettings(prog)}
      ${_renderQuizSettings()}
      <div class="profile-section">
        <div class="profile-section-title">${uiIconWrap('voice', 'section-title-icon')}음성(TTS) 설정</div>
        ${buildTTSSettingsHtml()}
      </div>
      ${_renderDevTools()}
    `;
  }

  function _renderSettings(prog) {
    return `
      <div class="profile-section">
        <div class="profile-section-title">${uiIconWrap('settings', 'section-title-icon')}설정</div>
        <div class="settings-list">
          <div class="settings-item" onclick="App.toggleFurigana()">
            <span class="si-icon">あ</span>
            <span class="si-label">후리가나 표시</span>
            <span class="si-arrow">${prog.settings.furigana ? uiIconSvg('check', 'settings-state-icon') : uiIconSvg('progress', 'settings-state-icon muted')}</span>
          </div>
          <div class="settings-item" onclick="App.exportProgress()">
            <span class="si-icon">${uiIconSvg('download', 'settings-row-icon')}</span>
            <span class="si-label">진도 내보내기</span>
            <span class="si-arrow">${uiIconSvg('progress', 'settings-state-icon')}</span>
          </div>
          <div class="settings-item" onclick="App.importProgress()">
            <span class="si-icon">${uiIconSvg('upload', 'settings-row-icon')}</span>
            <span class="si-label">진도 가져오기</span>
            <span class="si-arrow">${uiIconSvg('progress', 'settings-state-icon')}</span>
          </div>
          <div class="settings-item" onclick="App.resetProgress()">
            <span class="si-icon">${uiIconSvg('trash', 'settings-row-icon')}</span>
            <span class="si-label">진도 초기화</span>
            <span class="si-arrow">${uiIconSvg('progress', 'settings-state-icon')}</span>
          </div>
        </div>
      </div>
    `;
  }

  function _renderQuizSettings() {
    const currentRate = parseInt(Store.getSetting('quizPassRate')) || 60;
    return `
      <div class="profile-section">
        <div class="profile-section-title">${uiIconWrap('quiz', 'section-title-icon')}퀴즈 설정</div>
        <div style="font-size:12px;color:var(--text3);margin-bottom:10px">통과 기준 점수</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${[50,60,70,80,90].map(rate => {
            const active = currentRate === rate;
            return `<button onclick="App.setQuizPassRate(${rate})"
              style="flex:1;padding:10px 6px;border-radius:10px;font-weight:700;font-size:13px;cursor:pointer;
                     background:${active ? 'var(--accent)' : 'var(--bg3)'};
                     border:1.5px solid ${active ? 'var(--accent)' : 'var(--border)'};
                     color:${active ? '#fff' : 'var(--text2)'}">
              ${rate}%
            </button>`;
          }).join('')}
        </div>
        <div style="font-size:11px;color:var(--text3);margin-top:8px">
          현재: <strong style="color:var(--accent)">${currentRate}% 이상</strong>이면 통과
        </div>
      </div>
    `;
  }

  function _renderDevTools() {
    return `
      <div class="profile-section">
        <div class="profile-section-title" style="color:var(--warning)">${uiIconWrap('tools', 'section-title-icon')}개발자 테스트 도구</div>
        <div style="font-size:11px;color:var(--text3);padding:0 0 8px 2px">스테이지 해금·퀴즈 통과 테스트용</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px">
          <button onclick="App.devAddXP(100)" style="flex:1;padding:10px 6px;background:#1e293b;border:1px solid #334155;border-radius:10px;color:var(--accent);font-weight:700;font-size:13px;cursor:pointer">+100 XP</button>
          <button onclick="App.devAddXP(500)" style="flex:1;padding:10px 6px;background:#1e293b;border:1px solid #334155;border-radius:10px;color:var(--accent);font-weight:700;font-size:13px;cursor:pointer">+500 XP</button>
          <button onclick="App.devAddXP(2000)" style="flex:1;padding:10px 6px;background:#1e293b;border:1px solid #334155;border-radius:10px;color:var(--accent);font-weight:700;font-size:13px;cursor:pointer">+2000 XP</button>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
          <button onclick="App.devSkipCurrentStep()" style="flex:1;min-width:120px;padding:10px 8px;background:#1e293b;border:1px dashed var(--warning);border-radius:10px;color:var(--warning);font-weight:700;font-size:12px;cursor:pointer">현재 퀴즈 스킵 (100점)</button>
          <button onclick="App.devCompleteCurrentModule()" style="flex:1;min-width:120px;padding:10px 8px;background:#1e293b;border:1px dashed var(--success);border-radius:10px;color:var(--success);font-weight:700;font-size:12px;cursor:pointer">현재 모듈 완료</button>
        </div>
        <div style="font-size:11px;color:var(--text3);margin-top:4px">
          현재 TTS: <strong style="color:var(--text2)">${TTS.getEngineName()}</strong>
        </div>
      </div>
    `;
  }

  function _nextLevelXP(xp) {
    const thresholds = [0,500,1500,3000,5000,8000,12000,18000,25000,35000,50000];
    return thresholds.find(t => t > xp) || 50000;
  }

  function _curLevelXP(xp) {
    const thresholds = [0,500,1500,3000,5000,8000,12000,18000,25000,35000,50000];
    return [...thresholds].reverse().find(t => t <= xp) || 0;
  }

  function _levelName(xp) {
    if (xp < 500) return '일본어 씨앗';
    if (xp < 1500) return '입문자';
    if (xp < 3000) return '초보 여행자';
    if (xp < 5000) return '여행 마스터';
    if (xp < 8000) return '일상 대화자';
    if (xp < 12000) return '비즈니스 입문';
    if (xp < 18000) return 'IT 커뮤니케이터';
    if (xp < 25000) return '직장인 마스터';
    return '일본어 마스터';
  }

  function _buildCalDays(studyDays) {
    const today = new Date();
    const rows = [];
    let row = '';
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dStr = d.toISOString().slice(0, 10);
      const studied = studyDays.includes(dStr);
      const isToday = dStr === today.toISOString().slice(0, 10);
      row += `<div class="cal-day ${studied ? 'studied' : ''} ${isToday ? 'today' : ''}">${d.getDate()}</div>`;
      if ((i % 7 === 0) || i === 0) {
        rows.push(`<div class="cal-row">${row}</div>`);
        row = '';
      }
    }
    return rows.join('');
  }

  return { render };
};
