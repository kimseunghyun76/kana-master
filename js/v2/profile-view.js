/* ============================================================
   PROFILE VIEW — profile, settings, quiz and developer tools
   ============================================================ */

'use strict';

window.createProfileView = (ctx) => {
  const gameUi = !!ctx.gameUi;
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
        <div class="profile-level">${totalXP} XP · ${gameUi ? `다음 레벨까지 ${formatNum(nextLevelXP - totalXP)} XP` : `다음 레벨까지 ${formatNum(nextLevelXP - totalXP)} XP`}</div>
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
          <div class="ps-name ps-name-row">${uiIconWrap('streak', 'mini-stat-icon')}${gameUi ? '연속일' : '연속일'}</div>
        </div>
        <div class="pstat">
          <div class="ps-num" style="color:var(--accent2)">${prog.totalDays || 0}</div>
          <div class="ps-name ps-name-row">${uiIconWrap('calendar', 'mini-stat-icon')}${gameUi ? '총 학습일' : '총 학습일'}</div>
        </div>
        <div class="pstat">
          <div class="ps-num" style="color:var(--success)">${learnedKana + learnedVocab}</div>
          <div class="ps-name ps-name-row">${uiIconWrap('grid', 'mini-stat-icon')}${gameUi ? '학습 아이템' : '학습 아이템'}</div>
        </div>
      </div>

      <div class="profile-section">
        <div class="profile-section-title">${gameUi ? '최근 4주 학습 기록' : '최근 4주 학습 기록'}</div>
        <div class="streak-calendar">${_buildCalDays(prog.studyDays)}</div>
      </div>

      ${_renderSettings(prog)}
      ${gameUi ? _renderVoiceSettings() : ''}
      ${_renderQuizSettings()}
      ${gameUi ? '' : `<div class="profile-section">
        <div class="profile-section-title">${uiIconWrap('voice', 'section-title-icon')}음성(TTS) 설정</div>
        ${buildTTSSettingsHtml()}
      </div>`}
      ${gameUi ? '' : _renderDevTools()}
    `;
  }

  function _renderVoiceSettings() {
    const voices = typeof TTS.getAvailableVoices === 'function' ? TTS.getAvailableVoices('jp') : [];
    const current = localStorage.getItem('lecture_voice_jp') || voices[0]?.key || '';
    return `
      <div class="profile-section">
        <div class="profile-section-title">${uiIconWrap('voice', 'section-title-icon')}화자와 강의 표시</div>
        <div class="profile-voice-grid">
          ${voices.slice(0, 4).map(v => {
            const active = v.key === current;
            const name = (v.label || v.key).split(' ')[0];
            const avatar = typeof VoiceCharacters !== 'undefined' ? VoiceCharacters.avatarStyle(v.key) : '';
            return `
              <button class="profile-voice-card ${active ? 'active' : ''}" type="button"
                      onclick="localStorage.setItem('lecture_voice_jp','${escHtml(v.key)}');App.switchTab('profile')">
                <span class="profile-voice-face" style="${avatar}"></span>
                <b>${escHtml(name)}</b>
                <em>${v.gender === 'M' ? '남성 화자' : '여성 화자'}</em>
              </button>
            `;
          }).join('')}
        </div>
        <div class="profile-mode-row">
          <button onclick="Store.setSetting('lectureBoardFont','chalk');App.switchTab('profile')">칠판 모드</button>
          <button onclick="Store.setSetting('lectureBoardFont','plain');App.switchTab('profile')">노트 모드</button>
          <button onclick="Store.setSetting('lectureCaptionShow','ko');App.switchTab('profile')">한글 자막</button>
          <button onclick="Store.setSetting('lectureCaptionShow','jp');App.switchTab('profile')">일본어 자막</button>
        </div>
      </div>
    `;
  }

  function _renderSettings(prog) {
    return `
      <div class="profile-section">
        <div class="profile-section-title">${uiIconWrap('settings', 'section-title-icon')}${gameUi ? '설정' : '설정'}</div>
        <div class="settings-list">
          <div class="settings-item" onclick="App.toggleFurigana()">
            <span class="si-icon">あ</span>
            <span class="si-label">${gameUi ? '후리가나 표시' : '후리가나 표시'}</span>
            <span class="si-arrow">${prog.settings.furigana ? uiIconSvg('check', 'settings-state-icon') : uiIconSvg('progress', 'settings-state-icon muted')}</span>
          </div>
          <div class="settings-item" onclick="App.exportProgress()">
            <span class="si-icon">${uiIconSvg('download', 'settings-row-icon')}</span>
            <span class="si-label">${gameUi ? '진도 내보내기' : '진도 내보내기'}</span>
            <span class="si-arrow">${uiIconSvg('progress', 'settings-state-icon')}</span>
          </div>
          <div class="settings-item" onclick="App.importProgress()">
            <span class="si-icon">${uiIconSvg('upload', 'settings-row-icon')}</span>
            <span class="si-label">${gameUi ? '진도 가져오기' : '진도 가져오기'}</span>
            <span class="si-arrow">${uiIconSvg('progress', 'settings-state-icon')}</span>
          </div>
          <div class="settings-item" onclick="App.resetProgress()">
            <span class="si-icon">${uiIconSvg('trash', 'settings-row-icon')}</span>
            <span class="si-label">${gameUi ? '진도 초기화' : '진도 초기화'}</span>
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
        <div class="profile-section-title">${uiIconWrap('quiz', 'section-title-icon')}${gameUi ? '퀴즈 통과 기준' : '퀴즈 설정'}</div>
        <div style="font-size:12px;color:var(--text3);margin-bottom:10px">${gameUi ? '통과 기준 점수' : '통과 기준 점수'}</div>
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
          ${gameUi ? '현재' : '현재'}: <strong style="color:var(--accent)">${currentRate}% ${gameUi ? '이상' : '이상'}</strong>${gameUi ? '이면 통과' : '이면 통과'}
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
