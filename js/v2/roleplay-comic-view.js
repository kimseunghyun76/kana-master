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
    // Accumulate every previously-spoken line (no cap). The bubble stack
    // is scrollable, so older bubbles simply stay above and the user can
    // scroll up to review them.
    const history = [];
    if (Number.isFinite(selectedLine?.sourceIndex)) {
      for (let i = 0; i < selectedLine.sourceIndex; i++) {
        const c = dialogues[i];
        if (c?.speaker && c.speaker !== 'N' && (c.japanese || '').trim()) {
          history.push({ ...c, sourceIndex: i });
        }
      }
    }
    const focusClass = activeSpeaker ? `is-speaking speaker-focus-${activeSpeaker}` : '';
    const cinematicClass = `cinematic-panel-${(panelIndex % 6) + 1}`;
    const lineMood = selectedLine?.id || '';
    const moodClass = /3|4|7|8/.test(lineMood) ? 'mood-warm' : /9|10|11/.test(lineMood) ? 'mood-close' : 'mood-formal';
    // The newest non-current historical bubble = "previous"; the rest = "older".
    const historyBubbles = history
      .map((line, idx) => {
        const tone = idx === history.length - 1 ? 'previous' : 'older';
        return renderSceneSpeechBubble(line, line.speaker, mod, tone);
      })
      .join('');
    return `
      <div class="comic-player-visual comic-video-scene comic-cinematic-frame comic-panel-${panelIndex + 1} ${cinematicClass} ${moodClass} ${focusClass}" id="comicVisualFrame" data-panel="${panelIndex + 1}" data-speaker="${escHtml(activeSpeaker)}">
        <div class="comic-video-bars" aria-hidden="true"></div>
        <div class="comic-cinematic-depth depth-back" aria-hidden="true"></div>
        <div class="comic-cinematic-depth depth-front" aria-hidden="true"></div>
        <div class="comic-light-sweep" aria-hidden="true"></div>
        ${renderCharacters(dialogues, 'vn-character', mod)}
        <div class="comic-bubble-stack" id="comicBubbleStack" aria-hidden="false">
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
    // Intro now stages the full-body characters in the bg (no speech
    // bubbles at this phase), with the scene-info card pinned at the
    // bottom. The primary CTA jumps straight into the playback; the
    // preview is moved into a modal accessible from a secondary button.
    document.getElementById('flowBody').innerHTML = `
      <div class="comic-intro-shell full-bleed has-stage" style="--roleplay-hero-bg:url('${ctx.cssUrlValue(roleplayCover)}')">
        <div class="comic-intro-bg" aria-hidden="true"></div>
        <div class="comic-intro-stage" aria-hidden="false">
          ${renderCharacters(dialogues, 'vn-character intro-character', mod)}
        </div>
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
        <button class="btn btn-outline" type="button" onclick="App._showRoleplayPreviewModal()">대화 미리보기</button>
        <button class="btn btn-primary" type="button" onclick="App._startRoleplayComicPlayback()">롤플레이 시작 →</button>
      </div>
    `;
  }

  function renderPreviewModal(mod, rp, dialogues, comicSceneAsset) {
    const lines = (dialogues || []).filter(line => line.speaker !== 'N');
    const chatHtml = lines.map(line => {
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
    return `
      <div class="rp-preview-modal-backdrop" id="rpPreviewModal" onclick="if(event.target===this) App._hideRoleplayPreviewModal()">
        <div class="rp-preview-modal" role="dialog" aria-modal="true" aria-label="대화 미리보기">
          <header class="rp-preview-modal-head">
            <span class="rp-preview-modal-eyebrow">대화 미리보기</span>
            <b class="rp-preview-modal-title">${escHtml(introTitle(mod, rp, dialogues))}</b>
            <button class="rp-preview-modal-close" type="button" onclick="App._hideRoleplayPreviewModal()" aria-label="닫기">×</button>
          </header>
          <ul class="kt-chat rp-preview-modal-chat" aria-label="대화 미리보기">
            ${chatHtml}
          </ul>
          <footer class="rp-preview-modal-footer">
            <button class="btn btn-primary" type="button" onclick="App._hideRoleplayPreviewModal(); App._startRoleplayComicPlayback();">롤플레이 시작 →</button>
          </footer>
        </div>
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
    // Hoist the bg to flow-screen so it never re-paints between panels
    // and fills the full overlay (behind header + footer too).
    document.getElementById('flowScreen')?.style.setProperty('--comic-bg', `url('${ctx.cssUrlValue(comicSceneAsset)}')`);
    // No-flicker: keep the shell and characters mounted; only swap the
    // bubble stack inside the frame when the panel changes.
    const existingShell = document.querySelector('.comic-player-shell.no-script-dock:not(.comic-practice-shell)');
    const existingStack = existingShell?.querySelector('#comicBubbleStack');
    if (existingShell && existingStack) {
      const tmp = document.createElement('div');
      tmp.innerHTML = renderFrameHtml(dialogues, panelIndex, null, mod);
      const freshStack = tmp.querySelector('#comicBubbleStack');
      if (freshStack) {
        existingStack.replaceWith(freshStack);
        // Auto-scroll the stack to its bottom so the newest current
        // bubble is in view (older bubbles scroll up out of frame).
        requestAnimationFrame(() => {
          const stack = document.getElementById('comicBubbleStack');
          if (stack) stack.scrollTop = stack.scrollHeight;
        });
      }
      // Update the speaker-focus class on the visual frame too
      const focusFrame = existingShell.querySelector('#comicVisualFrame');
      const freshFrame = tmp.querySelector('#comicVisualFrame');
      if (focusFrame && freshFrame) focusFrame.className = freshFrame.className;
    } else {
      document.getElementById('flowBody').innerHTML = `
        <div class="comic-player-shell no-script-dock" style="--comic-bg:url('${ctx.cssUrlValue(comicSceneAsset)}')">
          ${renderFrameHtml(dialogues, panelIndex, null, mod)}
        </div>
      `;
    }
    document.getElementById('flowFooter').innerHTML = `
      <div class="comic-player-actions">
        <button class="btn btn-outline" type="button" onclick="App._roleplayComicPrev()">← 이전 장면</button>
        <button class="btn btn-outline" id="btnReplayAll" type="button" onclick="App._roleplayComicSpeakPanel()">${ctx.uiLabeledIcon('audio')} 다시 듣기</button>
        <button class="btn btn-outline" id="btnStopPlay" type="button" style="display:none" onclick="App._stopRoleplay()">정지</button>
        <button class="btn btn-primary" type="button" onclick="App._roleplayComicNext()">${panelIndex >= panelGroups.length - 1 ? '말하기 연습 →' : '다음 →'}</button>
      </div>
    `;
  }

  function renderPractice(mod, dialogues, comicSceneAsset) {
    const state = deps.getState(mod);
    const practiceLines = state.practiceLines || [];
    const outputDone = state.outputDone || [];
    const activeIndex = practiceLines.findIndex((_, idx) => !outputDone[idx]);
    if (activeIndex < 0) {
      // Practice finished. Don't jump straight to completion — give the
      // user a chance to retry the whole thing or review one line again.
      renderPracticeWrap(mod, dialogues, comicSceneAsset);
      return;
    }
    const activeLine = practiceLines[activeIndex];
    const panelIndex = panelForLine(activeLine.sourceIndex || 0, dialogues);
    const speakerLabel = roleLabel(activeLine.speaker) || activeLine.speaker || '';
    state.phase = 'comic_practice';
    state.comicPanelIndex = panelIndex;
    document.getElementById('flowStep').textContent = `한 문장씩 따라 읽기 · ${activeIndex + 1}/${practiceLines.length} · ${escHtml(speakerLabel)}`;
    document.getElementById('flowProgressFill').style.width = `${55 + Math.round(((activeIndex + 1) / practiceLines.length) * 40)}%`;
    document.getElementById('flowScreen')?.style.setProperty('--comic-bg', `url('${ctx.cssUrlValue(comicSceneAsset)}')`);
    // No-flicker: keep the practice shell + characters mounted across
    // line transitions. Only replace the inner bubble-stack so prev /
    // next never blank the screen.
    const existingShell = document.querySelector('.comic-player-shell.comic-practice-shell.no-script-dock');
    const existingStack = existingShell?.querySelector('#comicBubbleStack');
    if (existingShell && existingStack) {
      const tmp = document.createElement('div');
      tmp.innerHTML = renderFrameHtml(dialogues, panelIndex, activeLine.sourceIndex, mod);
      const freshStack = tmp.querySelector('#comicBubbleStack');
      if (freshStack) {
        existingStack.replaceWith(freshStack);
        requestAnimationFrame(() => {
          const stack = document.getElementById('comicBubbleStack');
          if (stack) stack.scrollTop = stack.scrollHeight;
        });
      }
      const focusFrame = existingShell.querySelector('#comicVisualFrame');
      const freshFrame = tmp.querySelector('#comicVisualFrame');
      if (focusFrame && freshFrame) focusFrame.className = freshFrame.className;
    } else {
      document.getElementById('flowBody').innerHTML = `
        <div class="comic-player-shell comic-practice-shell no-script-dock" style="--comic-bg:url('${ctx.cssUrlValue(comicSceneAsset)}')">
          ${renderFrameHtml(dialogues, panelIndex, activeLine.sourceIndex, mod)}
        </div>
      `;
    }
    document.getElementById('flowFooter').innerHTML = `
      <div class="comic-player-actions">
        <button class="btn btn-outline" onclick="App._roleplayComicPracticePrev()" ${activeIndex === 0 ? 'disabled' : ''}>← 이전</button>
        <button class="btn btn-outline" onclick="App._speakDialogueLine('${activeLine.id}')">${ctx.uiLabeledIcon('audio')} 다시 듣기</button>
        <button class="btn btn-primary" onclick="App._roleplayComicPracticeNext()">말했어요 →</button>
      </div>
    `;
  }

  function renderPracticeWrap(mod, dialogues, comicSceneAsset) {
    const total = (deps.getState(mod).practiceLines || []).length;
    document.getElementById('flowStep').textContent = '한 문장씩 따라 읽기 · 완료';
    document.getElementById('flowProgressFill').style.width = '95%';
    document.getElementById('flowBody').innerHTML = `
      <div class="comic-player-shell comic-practice-shell comic-practice-wrap no-script-dock comic-popup-overlay"
           style="--comic-bg:url('${ctx.cssUrlValue(comicSceneAsset)}')">
        <div class="comic-practice-wrap-card comic-popup-card">
          <div class="comic-practice-wrap-emoji">${ctx.uiIconSvg('roleplay', 'completion-main-icon')}</div>
          <h2 class="comic-practice-wrap-title">${total}문장 모두 따라 읽었어요</h2>
          <p class="comic-practice-wrap-sub">
            완료하면 보상을 받습니다. 처음부터 다시 연습하거나, 마지막 라인부터 한 번 더 듣고 마무리할 수도 있어요.
          </p>
          <div class="comic-popup-actions">
            <button class="btn btn-primary" type="button" onclick="App._completeRoleplay('${mod.id}')">완료 ✓</button>
            <button class="btn btn-outline" type="button" onclick="App._restartRoleplayPractice()">↺ 처음부터 다시</button>
            <button class="btn btn-outline" type="button" onclick="App._reopenLastPracticeLine()">← 마지막 라인 한 번 더</button>
          </div>
        </div>
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = '';
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
    renderPreviewModal,
    renderPlayer,
    renderPractice,
    rerenderPlayerShell,
  };
};
