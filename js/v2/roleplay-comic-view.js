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
    const out = [];
    let current = [];
    dialogues.forEach((line, index) => {
      if (line?.speaker === 'N') {
        if (current.length) out.push(current);
        out.push([index]);
        current = [];
        return;
      }
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

  function roleSpec(role, mod = null) {
    return roleplayArt[mod?.id]?.characterSpecs?.[role] || {};
  }

  function speakerRoles(dialogues = []) {
    const roles = [...new Set(dialogues.map(line => line.speaker).filter(s => s && s !== 'N'))];
    roles.sort((a, b) => ({ A: 1, B: 2, C: 3 }[a] || 9) - ({ A: 1, B: 2, C: 3 }[b] || 9));
    return roles.length ? roles : ['A', 'B'];
  }

  function renderCharacters(dialogues, classPrefix = 'vn-character', mod = null) {
    return speakerRoles(dialogues).map(role => {
      const spec = roleSpec(role, mod);
      const anchor = spec.anchor || {};
      const style = anchor.scale ? ` style="--character-scale:${anchor.scale}"` : '';
      return `
      <img class="${classPrefix} ${classPrefix}-${role}"
           data-role="${role}"
           data-character="${escHtml(spec.identity || '')}"
           data-character-role="${escHtml(spec.role || '')}"
           data-character-season="${escHtml(spec.season || '')}"
           data-character-box="${escHtml(anchor.box || '')}"
           data-character-feet-y="${escHtml(anchor.feetY || '')}"
           data-character-eye-y="${escHtml(anchor.eyeY || '')}"
           src="${roleImage(role, mod, 'body')}" alt="" aria-hidden="true"${style}>
    `;
    }).join('');
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
    return `
      <button class="comic-scene-speech-bubble ${tone} speaker-${activeSpeaker}" type="button"
              onclick="App.showDialogueDetail('${line.id}')">
        <span class="comic-scene-speech-face" style="background-image:url('${ctx.cssUrlValue(roleImage(activeSpeaker, mod, 'face'))}')"></span>
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
    const previousLine = (() => {
      const selectedSource = selectedLine?.sourceIndex;
      if (!Number.isFinite(selectedSource)) return null;
      for (let i = selectedSource - 1; i >= 0; i--) {
        const candidate = dialogues[i];
        if (candidate?.speaker && candidate.speaker !== 'N' && (candidate.japanese || '').trim()) {
          return { ...candidate, sourceIndex: i };
        }
      }
      return null;
    })();
    const previousSpeaker = previousLine?.speaker && previousLine.speaker !== 'N' ? previousLine.speaker : '';
    const focusClass = activeSpeaker ? `is-speaking speaker-focus-${activeSpeaker}` : '';
    const cinematicClass = `cinematic-panel-${(panelIndex % 6) + 1}`;
    const lineMood = selectedLine?.id || '';
    const moodClass = /3|4|7|8/.test(lineMood) ? 'mood-warm' : /9|10|11/.test(lineMood) ? 'mood-close' : 'mood-formal';
    return `
      <div class="comic-player-visual comic-video-scene comic-cinematic-frame comic-panel-${panelIndex + 1} ${cinematicClass} ${moodClass} ${focusClass}" id="comicVisualFrame" data-panel="${panelIndex + 1}" data-speaker="${escHtml(activeSpeaker)}">
        <div class="comic-video-bars" aria-hidden="true"></div>
        <div class="comic-cinematic-depth depth-back" aria-hidden="true"></div>
        <div class="comic-cinematic-depth depth-front" aria-hidden="true"></div>
        <div class="comic-light-sweep" aria-hidden="true"></div>
        ${renderCharacters(dialogues, 'vn-character', mod)}
        ${renderSceneSpeechBubble(previousLine, previousSpeaker, mod, 'previous')}
        ${renderSceneSpeechBubble(selectedLine, activeSpeaker, mod, 'current')}
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
    document.getElementById('flowBody').innerHTML = `
      <div class="comic-intro-shell">
        <div class="roleplay-hero comic-intro-hero no-characters" style="--roleplay-hero-bg:url('${ctx.cssUrlValue(roleplayCover)}')">
          <div class="roleplay-hero-bg" aria-hidden="true"></div>
          <div class="roleplay-hero-content">
            <div class="roleplay-hero-title">${escHtml(introTitle(mod, rp, dialogues))}</div>
            <div class="roleplay-hero-desc">${introDesc(rp, dialogues)}</div>
          </div>
        </div>
        <div class="comic-intro-panel">
          <div class="comic-intro-label">${locked ? '장면 소개' : '역할과 화자 선택'}</div>
          ${locked ? `
            <div class="comic-intro-brief">
              <span>듣기</span>
              <b>${escHtml(rp?.name || 'Roleplay')}</b>
              <em>${introDesc(rp, dialogues)}</em>
            </div>
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
    document.getElementById('flowBody').innerHTML = `
      <div class="comic-preview-shell">
        <div class="comic-preview-scene" style="--comic-bg:url('${ctx.cssUrlValue(comicSceneAsset)}')">
          <div>
            <span>대화 미리보기</span>
            <b>${escHtml(introTitle(mod, rp, dialogues))}</b>
          </div>
        </div>
        <div class="comic-preview-list">
          ${lines.map((line, idx) => `
            <button class="comic-preview-line" type="button" onclick="App.showDialogueDetail('${line.id}')">
              <span class="comic-preview-face" style="background-image:url('${ctx.cssUrlValue(roleImage(line.speaker, mod, 'face'))}')"></span>
              <span class="comic-preview-copy">
                <b>${idx + 1}. ${ruby(line.japanese || '')}</b>
                <em>${escHtml(line.korean || '')}</em>
              </span>
            </button>
          `).join('')}
        </div>
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
      <div class="comic-player-shell" style="--comic-bg:url('${ctx.cssUrlValue(comicSceneAsset)}')">
        ${renderScriptDock(dialogues, panelIndex, null, mod)}
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
    document.getElementById('flowStep').textContent = `말하기 · ${activeIndex + 1}/${practiceLines.length}`;
    document.getElementById('flowProgressFill').style.width = `${55 + Math.round(((activeIndex + 1) / practiceLines.length) * 40)}%`;
    document.getElementById('flowBody').innerHTML = `
      <div class="comic-player-shell comic-practice-shell" style="--comic-bg:url('${ctx.cssUrlValue(comicSceneAsset)}')">
        ${renderScriptDock(dialogues, panelIndex, activeLine.sourceIndex, mod)}
        ${renderFrameHtml(dialogues, panelIndex, activeLine.sourceIndex, mod)}
        <div class="comic-practice-prompt">
          <div class="comic-practice-head">
            <span>말하기 모드 · ${escHtml(speakerLabel)}</span>
            <b>${activeIndex + 1} / ${practiceLines.length}</b>
          </div>
          <div class="comic-practice-steps">
            <i>1 듣기</i>
            <i class="active">2 소리내어 말하기</i>
            <i>3 다음 대사</i>
          </div>
          <div class="comic-practice-note">장면 말풍선을 보고 소리내어 말한 뒤 완료를 누르세요.</div>
        </div>
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
