/* ============================================================
   Roleplay Comic View - cinematic roleplay rendering helpers
   ============================================================ */

'use strict';

window.createRoleplayComicView = (ctx, deps) => {
  const roleplayArt = deps.roleplayArt || {};
  const firstMeetingArt = deps.firstMeetingArt;

  function sceneAsset(mod, fallbackAsset = '') {
    return roleplayArt[mod?.id]?.bg || fallbackAsset || firstMeetingArt.bg;
  }

  function introTitle(mod, rp, dialogues) {
    if (mod?.id === 'survival_greet') return '오피스 로비에서 명함을 건네며 인사';
    const narrator = (dialogues || []).find(line => line.speaker === 'N' && (line.korean || line.japanese));
    const sceneText = (narrator?.korean || narrator?.japanese || '')
      .replace(/^[^\w가-힣ぁ-んァ-ン一-龥]+/u, '')
      .replace(/\s*[—-]\s*/g, ' ')
      .trim();
    return sceneText || rp?.name || '롤플레이 장면';
  }

  function introDesc(rp, dialogues) {
    const lineCount = (dialogues || []).filter(line => line.speaker !== 'N').length;
    return `${escHtml(rp?.desc || '실전 대화를 영상처럼 듣고 따라 말합니다.')} · ${lineCount}개 대사`;
  }

  function groups(dialogues = []) {
    // Narrator (📍 scene-setter) lines are intentionally skipped here so they
    // never become their own panel in player/practice. The intro screen
    // already conveys the scene; repeating it as panel 1 was redundant.
    const out = [];
    let current = [];
    dialogues.forEach((line, index) => {
      if (line?.speaker === 'N') return;
      current.push(index);
      if (current.length >= 2) {
        out.push(current);
        current = [];
      }
    });
    if (current.length) out.push(current);
    return out.length ? out : [[]];
  }

  function panelForLine(sourceIndex, dialogues = []) {
    const foundIndex = groups(dialogues).findIndex(group => group.includes(sourceIndex));
    return foundIndex >= 0 ? foundIndex : 0;
  }

  function panelLines(dialogues, panelIndex) {
    const group = groups(dialogues)[panelIndex] || [];
    return group.map(i => ({ ...dialogues[i], sourceIndex: i })).filter(line => line?.id);
  }

  function scriptLines(dialogues = []) {
    return dialogues.map((line, sourceIndex) => ({ ...line, sourceIndex })).filter(line => line?.id);
  }

  function roleLabel(role) {
    if (role === 'N') return '';
    return role || '';
  }

  function roleImage(role, mod = null, variant = 'body') {
    const roleAssets = roleplayArt[mod?.id]?.characters || {};
    const faceAssets = roleplayArt[mod?.id]?.faces || {};
    const roleAsset = variant === 'face'
      ? (faceAssets[role] || roleAssets[role])
      : (roleAssets[role] || faceAssets[role]);
    if (roleAsset) return roleAsset;
    const key = deps.voiceForSpeaker(role);
    return key === 'keita' ? firstMeetingArt.male : firstMeetingArt.female;
  }

  function speakerRoles(dialogues = []) {
    const roles = [...new Set(dialogues.map(line => line.speaker).filter(s => s && s !== 'N'))];
    roles.sort((a, b) => ({ A: 1, B: 2, C: 3 }[a] || 9) - ({ A: 1, B: 2, C: 3 }[b] || 9));
    return roles.length ? roles : ['A', 'B'];
  }

  function renderCharacters(dialogues, classPrefix = 'vn-character', mod = null) {
    return speakerRoles(dialogues).map(role => `
      <img class="${classPrefix} ${classPrefix}-${role}" data-role="${role}" src="${roleImage(role, mod, 'body')}" alt="" aria-hidden="true">
    `).join('');
  }

  function renderScriptLine(line, isActive = false, mod = null) {
    if (line.speaker === 'N') {
      return `
        <button class="comic-script-line narrator ${isActive ? 'active' : ''}" id="dl-line-${line.sourceIndex}" type="button">
          <span class="comic-script-ko">${escHtml(line.korean || line.japanese || '')}</span>
        </button>
      `;
    }
    return `
      <button class="comic-script-line speaker-${line.speaker} ${isActive ? 'active' : ''}"
              id="dl-line-${line.sourceIndex}" type="button"
              onclick="App.showDialogueDetail('${line.id}')">
        <span class="comic-script-speaker">
          <span class="comic-script-avatar" style="background-image:url('${ctx.cssUrlValue(roleImage(line.speaker, mod, 'face'))}')"></span>
        </span>
        <span class="comic-script-copy">
          <span class="comic-script-jp">${ruby(line.japanese || '')}</span>
          <span class="comic-script-ko">${escHtml(line.korean || '')}</span>
        </span>
        <span class="comic-script-audio" onclick="event.stopPropagation(); App._speakDialogueLine('${line.id}')">${ctx.uiIconSvg('audio', 'audio-inline-icon')}</span>
      </button>
    `;
  }

  function renderScriptDock(dialogues, panelIndex, activeSourceIndex = null, mod = null) {
    const lines = scriptLines(dialogues);
    const currentPanelLines = panelLines(dialogues, panelIndex);
    const selectedLine = activeSourceIndex === null
      ? (currentPanelLines.find(line => line.speaker !== 'N') || currentPanelLines[0] || lines[0])
      : lines.find(line => line.sourceIndex === activeSourceIndex);
    const selectedSourceIndex = selectedLine?.sourceIndex ?? null;
    const activePosition = Math.max(0, lines.findIndex(line => line.sourceIndex === selectedSourceIndex));
    return `
      <div class="comic-subtitle-overlay comic-script-dock-external" id="comicScriptDock">
        <div class="comic-script-context">
          <span>전체 스크립트</span>
          <b>${activePosition + 1} / ${lines.length}</b>
          <span>스크롤 복습</span>
        </div>
        ${lines.map(line => renderScriptLine(line, line.sourceIndex === selectedSourceIndex, mod)).join('')}
      </div>
    `;
  }

  function renderSceneSpeechBubble(line, activeSpeaker, mod = null, tone = 'current') {
    if (!line || !activeSpeaker || line.speaker === 'N') return '';
    // Avatar removed: the character body is already on stage so the bubble
    // does not need to repeat their face. Tone (current | previous | older)
    // controls vertical stack offset & opacity via CSS.
    return `
      <button class="comic-scene-speech-bubble ${tone} speaker-${activeSpeaker}" type="button"
              onclick="App.showDialogueDetail('${line.id}')">
        <span class="comic-scene-speech-copy">
          <b>${ruby(line.japanese || '')}</b>
          <em>${escHtml(line.korean || '')}</em>
        </span>
      </button>
    `;
  }

  function renderFrameHtml(dialogues, panelIndex, activeSourceIndex = null, mod = null) {
    const lines = panelLines(dialogues, panelIndex);
    const selectedLine = activeSourceIndex === null
      ? (lines.find(line => line.speaker !== 'N') || lines[0])
      : lines.find(line => line.sourceIndex === activeSourceIndex);
    const activeSpeaker = selectedLine?.speaker && selectedLine.speaker !== 'N' ? selectedLine.speaker : '';
    // Collect up to 2 previously-shown speaker lines (older first → newer)
    // so bubbles stack upward like a chat thread above the active speaker.
    const history = [];
    if (Number.isFinite(selectedLine?.sourceIndex)) {
      for (let i = selectedLine.sourceIndex - 1; i >= 0 && history.length < 2; i--) {
        const c = dialogues[i];
        if (c?.speaker && c.speaker !== 'N' && (c.japanese || '').trim()) {
          history.unshift({ ...c, sourceIndex: i });
        }
      }
    }
    const focusClass = activeSpeaker ? `is-speaking speaker-focus-${activeSpeaker}` : '';
    const cinematicClass = `cinematic-panel-${(panelIndex % 6) + 1}`;
    const lineMood = selectedLine?.id || '';
    const moodClass = /3|4|7|8/.test(lineMood) ? 'mood-warm' : /9|10|11/.test(lineMood) ? 'mood-close' : 'mood-formal';
    const historyTones = ['older', 'previous'];
    const historyBubbles = history
      .map((line, idx) => renderSceneSpeechBubble(line, line.speaker, mod, historyTones[historyTones.length - history.length + idx] || 'previous'))
      .join('');
    return `
      <div class="comic-player-visual comic-video-scene comic-cinematic-frame comic-panel-${panelIndex + 1} ${cinematicClass} ${moodClass} ${focusClass}" id="comicVisualFrame" data-panel="${panelIndex + 1}" data-speaker="${escHtml(activeSpeaker)}">
        <div class="comic-video-bars" aria-hidden="true"></div>
        <div class="comic-cinematic-depth depth-back" aria-hidden="true"></div>
        <div class="comic-cinematic-depth depth-front" aria-hidden="true"></div>
        <div class="comic-light-sweep" aria-hidden="true"></div>
        ${renderCharacters(dialogues, 'vn-character', mod)}
        <div class="comic-bubble-stack" aria-hidden="false">
          ${historyBubbles}
          ${renderSceneSpeechBubble(selectedLine, activeSpeaker, mod, 'current')}
        </div>
        <div class="comic-cinematic-grain" aria-hidden="true"></div>
      </div>
    `;
  }

  function renderIntro(mod, rp, dialogues, roleplayCover, speakerOptions, practiceSpeaker) {
    const locked = !!deps.lockVoiceSelection;
    const voices = typeof TTS.getAvailableVoices === 'function'
      ? TTS.getAvailableVoices().filter(v => v.lang === 'ja-JP' || ['nanami','aoi','mayu','keita'].includes(v.key))
      : [];
    const voiceOptionHtml = role => voices.map(v => `
      <option value="${v.key}" ${deps.voiceForSpeaker(role) === v.key ? 'selected' : ''}>
          ${escHtml(v.label || v.key)} · ${escHtml(VoiceCharacters.meta(v.key).age || (v.gender === 'M' ? '남성' : '여성'))}
      </option>
    `).join('');
    const voiceSelect = role => {
      const key = deps.voiceForSpeaker(role);
      const voice = voices.find(v => v.key === key) || voices[0] || { key, label: key, gender: 'F' };
      const label = roleLabel(role);
      return `
        <div class="comic-voice-select-card">
          <span class="comic-role-avatar" style="background-image:url('${ctx.cssUrlValue(roleImage(role, mod, 'face'))}')"></span>
          <label class="comic-voice-select-main">
            <span>${escHtml(label)} · ${escHtml(voice.label || voice.key)}</span>
            <select class="comic-voice-select" onchange="App._setRoleplayVoice('${role}', this.value)">
              ${voiceOptionHtml(role)}
            </select>
          </label>
        </div>
      `;
    };
    const roleSelectorHtml = !locked && speakerOptions.length > 1 ? `
      <div class="comic-practice-role-row">
        <span class="roleplay-role-label">내가 연습할 역할</span>
        ${speakerOptions.map(s => `
          <button class="roleplay-role-chip ${practiceSpeaker === s ? 'active' : ''}" type="button"
                  onclick="App._setRoleplayPracticeSpeaker('${s}')">${escHtml(roleLabel(s))}</button>
        `).join('')}
      </div>
      <div class="comic-voice-select-grid">
        ${speakerOptions.map(voiceSelect).join('')}
      </div>
    ` : '';
    document.getElementById('flowStep').textContent = locked ? '1 / 2 · 장면 소개' : '1 / 2 · 씬과 화자 선택';
    document.getElementById('flowProgressFill').style.width = '20%';
    // Full-bleed background fills the entire body; only the scene-intro
    // card floats at the bottom edge so the artwork carries the moment.
    // Cast row introduces each speaker with face + role chip in the card.
    const castHtml = speakerOptions.length
      ? `<div class="comic-intro-cast">
          ${speakerOptions.map(s => `
            <div class="comic-intro-cast-card speaker-${s}">
              <span class="comic-intro-cast-face" style="background-image:url('${ctx.cssUrlValue(roleImage(s, mod, 'face'))}')" aria-hidden="true"></span>
              <span class="comic-intro-cast-meta">
                <b>${escHtml(roleLabel(s) || s)}</b>
                <em>${s === practiceSpeaker ? '내 역할' : '상대'}</em>
              </span>
            </div>
          `).join('')}
        </div>`
      : '';
    document.getElementById('flowBody').innerHTML = `
      <div class="comic-intro-shell full-bleed" style="--roleplay-hero-bg:url('${ctx.cssUrlValue(roleplayCover)}')">
        <div class="comic-intro-bg" aria-hidden="true"></div>
        <div class="comic-intro-bottom-card">
          <div class="comic-intro-label">${locked ? '장면 소개' : '역할과 화자 선택'}</div>
          ${locked ? `
            <div class="comic-intro-brief">
              <b>${escHtml(introTitle(mod, rp, dialogues))}</b>
              <em>${introDesc(rp, dialogues)}</em>
            </div>
            ${castHtml}
          ` : roleSelectorHtml}
        </div>
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = `
      <div class="roleplay-actions comic-intro-actions">
        <button class="btn btn-outline" onclick="App.closeFlow()">나중에</button>
        <button class="btn btn-primary" onclick="App._startRoleplayComicPlayer()">대화 미리보기 →</button>
      </div>
    `;
  }

  function renderPreview(mod, rp, dialogues, comicSceneAsset) {
    const lines = (dialogues || []).filter(line => line.speaker !== 'N');
    document.getElementById('flowStep').textContent = '미리보기 · 오늘 외울 대화';
    document.getElementById('flowProgressFill').style.width = '28%';
    // KakaoTalk-style chat: speaker A (나) goes right with a yellow bubble,
    // B/C (others) go left with a white bubble and an avatar.
    const chatHtml = lines.map((line, idx) => {
      const side = line.speaker === 'A' ? 'me' : 'other';
      const avatar = `<span class="kt-avatar" style="background-image:url('${ctx.cssUrlValue(roleImage(line.speaker, mod, 'face'))}')" aria-hidden="true"></span>`;
      return `
        <li class="kt-row ${side} speaker-${line.speaker}">
          ${avatar}
          <button class="kt-bubble" type="button" onclick="App.showDialogueDetail('${line.id}')">
            <span class="kt-jp">${ruby(line.japanese || '')}</span>
            <span class="kt-ko">${escHtml(line.korean || '')}</span>
          </button>
        </li>
      `;
    }).join('');
    document.getElementById('flowBody').innerHTML = `
      <div class="comic-preview-shell kt-preview-shell">
        <header class="kt-preview-head" style="--comic-bg:url('${ctx.cssUrlValue(comicSceneAsset)}')">
          <span class="kt-preview-eyebrow">대화 미리보기</span>
          <b class="kt-preview-title">${escHtml(introTitle(mod, rp, dialogues))}</b>
        </header>
        <ul class="kt-chat" aria-label="대화 미리보기">
          ${chatHtml}
        </ul>
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = `
      <div class="comic-player-actions">
        <button class="btn btn-outline" onclick="App._returnRoleplayComicIntro()">← 장면 소개</button>
        <button class="btn btn-outline" onclick="App._replayAll('${mod.id}')">${ctx.uiLabeledIcon('audio')} 먼저 듣기</button>
        <button class="btn btn-primary" onclick="App._startRoleplayComicPlayback()">영상 시작 →</button>
      </div>
    `;
  }

  function renderPlayer(mod, dialogues, comicSceneAsset) {
    const state = deps.getState(mod);
    const panelGroups = groups(dialogues);
    const panelIndex = Math.max(0, Math.min(state.comicPanelIndex || 0, panelGroups.length - 1));
    state.phase = 'comic_player';
    state.comicPanelIndex = panelIndex;
    document.getElementById('flowStep').textContent = '2 / 2 · 영상 재생';
    document.getElementById('flowProgressFill').style.width = `${32 + Math.round(((panelIndex + 1) / panelGroups.length) * 60)}%`;
    document.getElementById('flowBody').innerHTML = `
      <div class="comic-player-shell no-script-dock" style="--comic-bg:url('${ctx.cssUrlValue(comicSceneAsset)}')">
        ${renderFrameHtml(dialogues, panelIndex, null, mod)}
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = `
      <div class="comic-player-actions">
        <button class="btn btn-outline" onclick="App._roleplayComicPrev()">← ${panelIndex === 0 ? '처음' : '이전'}</button>
        <button class="btn btn-outline" id="btnReplayAll" onclick="App._roleplayComicSpeakPanel()">${ctx.uiLabeledIcon('audio')} 다시 듣기</button>
        <button class="btn btn-outline" id="btnStopPlay" style="display:none" onclick="App._stopRoleplay()">정지</button>
        <button class="btn btn-primary" onclick="App._roleplayComicNext()">${panelIndex >= panelGroups.length - 1 ? '역할 연습 →' : '다음 →'}</button>
      </div>
    `;
  }

  function renderPractice(mod, dialogues, comicSceneAsset) {
    const state = deps.getState(mod);
    const practiceLines = state.practiceLines || [];
    const outputDone = state.outputDone || [];
    const activeIndex = practiceLines.findIndex((_, idx) => !outputDone[idx]);
    if (activeIndex < 0) {
      deps.completeRoleplay(mod.id);
      return;
    }
    const activeLine = practiceLines[activeIndex];
    const panelIndex = panelForLine(activeLine.sourceIndex || 0, dialogues);
    const speakerLabel = roleLabel(activeLine.speaker) || activeLine.speaker || '';
    state.phase = 'comic_practice';
    state.comicPanelIndex = panelIndex;
    document.getElementById('flowStep').textContent = `말하기 · ${activeIndex + 1}/${practiceLines.length} · ${escHtml(speakerLabel)}`;
    document.getElementById('flowProgressFill').style.width = `${55 + Math.round(((activeIndex + 1) / practiceLines.length) * 40)}%`;
    document.getElementById('flowBody').innerHTML = `
      <div class="comic-player-shell comic-practice-shell no-script-dock" style="--comic-bg:url('${ctx.cssUrlValue(comicSceneAsset)}')">
        ${renderFrameHtml(dialogues, panelIndex, activeLine.sourceIndex, mod)}
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = `
      <div class="comic-player-actions">
        <button class="btn btn-outline" onclick="App._roleplayComicPracticePrev()" ${activeIndex === 0 ? 'disabled' : ''}>← 이전</button>
        <button class="btn btn-outline" onclick="App._speakDialogueLine('${activeLine.id}')">${ctx.uiLabeledIcon('audio')} 모범 듣기</button>
        <button class="btn btn-primary" onclick="App._roleplayComicPracticeNext()">말했어요 →</button>
      </div>
    `;
  }

  function rerenderPlayerShell(dialogues, panelIndex, activeSourceIndex, mod) {
    const shell = document.querySelector('.comic-player-shell');
    if (!shell) return;
    const visual = shell.querySelector('#comicVisualFrame');
    if (visual) visual.outerHTML = renderFrameHtml(dialogues, panelIndex, activeSourceIndex, mod);
    const dock = shell.querySelector('#comicScriptDock');
    if (dock) dock.outerHTML = renderScriptDock(dialogues, panelIndex, activeSourceIndex, mod);
    if (activeSourceIndex !== null) {
      requestAnimationFrame(() => {
        const activeLine = document.getElementById(`dl-line-${activeSourceIndex}`);
        activeLine?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
    }
  }

  return {
    sceneAsset,
    groups,
    panelForLine,
    panelLines,
    roleLabel,
    speakerRoles,
    renderIntro,
    renderPreview,
    renderPlayer,
    renderPractice,
    rerenderPlayerShell,
  };
};
