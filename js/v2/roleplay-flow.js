/* ============================================================
   Roleplay Flow - dialogue preview, playback, detail popup
   ============================================================ */

'use strict';

window.createRoleplayFlow = (ctx) => {
  const CINEMATIC_FIRST_MEETING = {
    bg: 'images/roleplay-comics/vn-first-meeting-bg.png',
    male: 'images/roleplay-comics/vn-first-meeting-male.png',
    female: 'images/roleplay-comics/vn-first-meeting-female.png',
  };
  const ROLEPLAY_ART = {
    survival_greet: {
      bg: CINEMATIC_FIRST_MEETING.bg,
      characters: {
        A: CINEMATIC_FIRST_MEETING.male,
        B: CINEMATIC_FIRST_MEETING.female,
      }
    },
    survival_pointing: {
      bg: 'images/roleplay-comics/generated/shopping-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/casual-male.png', B: 'images/roleplay-comics/generated/characters/service-female.png' }
    },
    survival_numbers: {
      bg: 'images/roleplay-comics/generated/schedule-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/traveler-female.png', B: 'images/roleplay-comics/generated/characters/staff-male.png' }
    },
    survival_location: {
      bg: 'images/roleplay-comics/generated/facility-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/traveler-female.png', B: 'images/roleplay-comics/generated/characters/staff-male.png' }
    },
    survival_transport: {
      bg: 'images/roleplay-comics/generated/transport-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/casual-male.png', B: 'images/roleplay-comics/generated/characters/staff-male.png' }
    },
    survival_food: {
      bg: 'images/roleplay-comics/generated/food-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/casual-male.png', B: 'images/roleplay-comics/generated/characters/service-female.png' }
    },
    survival_shopping: {
      bg: 'images/roleplay-comics/generated/retail-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/casual-male.png', B: 'images/roleplay-comics/generated/characters/service-female.png' }
    },
    survival_hotel: {
      bg: 'images/roleplay-comics/generated/hotel-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/traveler-female.png', B: 'images/roleplay-comics/generated/characters/staff-male.png' }
    },
    daily_places: {
      bg: 'images/roleplay-comics/generated/sightseeing-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/traveler-female.png', B: 'images/roleplay-comics/generated/characters/staff-male.png' }
    },
    daily_health: {
      bg: 'images/roleplay-comics/generated/health-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/traveler-female.png', B: 'images/roleplay-comics/generated/characters/doctor-female.png' }
    },
    it_workplace_vocab: {
      bg: 'images/roleplay-comics/generated/it-standup-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/engineer-male.png', B: 'images/roleplay-comics/generated/characters/pm-female.png' }
    },
    biz_basic: {
      bg: 'images/roleplay-comics/generated/code-review-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/engineer-male.png', B: 'images/roleplay-comics/generated/characters/pm-female.png' }
    },
    biz_meeting: {
      bg: 'images/roleplay-comics/generated/kickoff-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/engineer-male.png', B: 'images/roleplay-comics/generated/characters/pm-female.png' }
    },
    biz_1on1: {
      bg: 'images/roleplay-comics/generated/one-on-one-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/engineer-male.png', B: 'images/roleplay-comics/generated/characters/pm-female.png' }
    },
    biz_intro: {
      bg: 'images/roleplay-comics/generated/onboarding-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/casual-male.png', B: 'images/roleplay-comics/generated/characters/pm-female.png' }
    },
    biz_spec: {
      bg: 'images/roleplay-comics/generated/spec-bg.png',
      characters: { A: 'images/roleplay-comics/generated/characters/engineer-male.png', B: 'images/roleplay-comics/generated/characters/pm-female.png' }
    },
  };

  const _detailFlow = createRoleplayDetailFlow({
    ...ctx,
    getPlaybackState: () => _getRoleplayPlaybackState(),
    setRoleplayPlaying: value => _setRoleplayPlaying(value),
    replayAll: (moduleId, startIndex) => _replayAll(moduleId, startIndex),
  });

  // ── Roleplay ──────────────────────────────────────────────
  function _getRoleplayPracticeLines(dialogues, speaker = 'A') {
    return (dialogues || [])
      .map((line, sourceIndex) => ({ ...line, sourceIndex }))
      .filter(line => line.speaker === speaker && (line.japanese || '').trim());
  }

  function _getRoleplayState(mod) {
    const dialogues = ctx.getDialogue(mod?.roleplay?.dialogueKey);
    const practiceSpeaker = ctx.getFlow()?.roleplayState?.practiceSpeaker || 'A';
    const practiceLines = _getRoleplayPracticeLines(dialogues, practiceSpeaker);
    if (!ctx.getFlow()?.roleplayState) {
      ctx.getFlow().roleplayState = {
        phase: 'preview',
        practiceSpeaker,
        practiceLines,
        practiceSourceSpeaker: practiceSpeaker,
        revealed: [],
        shadowDone: [],
        outputDone: []
      };
    } else if (ctx.getFlow().roleplayState.practiceSourceSpeaker !== practiceSpeaker) {
      Object.assign(ctx.getFlow().roleplayState, {
        practiceLines,
        practiceSourceSpeaker: practiceSpeaker,
        revealed: [],
        shadowDone: [],
        outputDone: []
      });
    }
    return ctx.getFlow().roleplayState;
  }

  function _isComicPrototype(mod) {
    return !!mod?.roleplay;
  }

  function _comicSceneAsset(mod, fallbackAsset = '') {
    return ROLEPLAY_ART[mod?.id]?.bg || fallbackAsset || CINEMATIC_FIRST_MEETING.bg;
  }

  function _comicIntroTitle(mod, rp, dialogues) {
    if (mod?.id === 'survival_greet') return '오피스 로비에서 명함을 건네며 인사';
    const narrator = (dialogues || []).find(line => line.speaker === 'N' && (line.korean || line.japanese));
    const sceneText = (narrator?.korean || narrator?.japanese || '')
      .replace(/^[^\w가-힣ぁ-んァ-ン一-龥]+/u, '')
      .replace(/\s*[—-]\s*/g, ' ')
      .trim();
    return sceneText || rp?.name || '롤플레이 장면';
  }

  function _comicIntroDesc(rp, dialogues) {
    const lineCount = (dialogues || []).filter(line => line.speaker !== 'N').length;
    return `${escHtml(rp?.desc || '실전 대화를 영상처럼 듣고 따라 말합니다.')} · ${lineCount}개 대사`;
  }

  function _comicGroups(dialogues = []) {
    const groups = [];
    let current = [];
    dialogues.forEach((line, index) => {
      if (line?.speaker === 'N') {
        if (current.length) groups.push(current);
        groups.push([index]);
        current = [];
        return;
      }
      current.push(index);
      if (current.length >= 2) {
        groups.push(current);
        current = [];
      }
    });
    if (current.length) groups.push(current);
    return groups.length ? groups : [[]];
  }

  function _comicPanelForLine(sourceIndex, dialogues = []) {
    const foundIndex = _comicGroups(dialogues).findIndex(group => group.includes(sourceIndex));
    return foundIndex >= 0 ? foundIndex : 0;
  }

  function _comicPanelLines(dialogues, panelIndex) {
    const group = _comicGroups(dialogues)[panelIndex] || [];
    return group.map(i => ({ ...dialogues[i], sourceIndex: i })).filter(line => line?.id);
  }

  function _comicRoleLabel(role) {
    const practiceSpeaker = ctx.getFlow()?.roleplayState?.practiceSpeaker || 'A';
    if (role === practiceSpeaker) return '나';
    if (role === 'N') return '';
    return '너';
  }

  function _comicRoleImage(role, mod = null) {
    const roleAsset = ROLEPLAY_ART[mod?.id]?.characters?.[role];
    if (roleAsset) return roleAsset;
    const key = _voiceForSpeaker(role);
    return key === 'keita' ? CINEMATIC_FIRST_MEETING.male : CINEMATIC_FIRST_MEETING.female;
  }

  function _comicSpeakerRoles(dialogues = []) {
    const roles = [...new Set(dialogues.map(line => line.speaker).filter(s => s && s !== 'N'))];
    roles.sort((a, b) => ({ A: 1, B: 2, C: 3 }[a] || 9) - ({ A: 1, B: 2, C: 3 }[b] || 9));
    return roles.length ? roles : ['A', 'B'];
  }

  function _renderComicCharacters(dialogues, classPrefix = 'vn-character', mod = null) {
    return _comicSpeakerRoles(dialogues).map(role => `
      <img class="${classPrefix} ${classPrefix}-${role}" src="${_comicRoleImage(role, mod)}" alt="" aria-hidden="true">
    `).join('');
  }

  function _renderComicScriptLine(line, isActive = false, mod = null) {
    if (line.speaker === 'N') {
      return `
        <button class="comic-script-line narrator ${isActive ? 'active' : ''}" id="dl-line-${line.sourceIndex}" type="button">
          <span class="comic-script-ko">${escHtml(line.korean || line.japanese || '')}</span>
        </button>
      `;
    }
    const roleLabel = _comicRoleLabel(line.speaker);
    return `
      <button class="comic-script-line speaker-${line.speaker} ${isActive ? 'active' : ''}"
              id="dl-line-${line.sourceIndex}" type="button"
              onclick="App.showDialogueDetail('${line.id}')">
        <span class="comic-script-speaker">
          <span class="comic-script-avatar" style="background-image:url('${ctx.cssUrlValue(_comicRoleImage(line.speaker, mod))}')"></span>
          <span class="comic-script-role">${escHtml(roleLabel || line.speaker)}</span>
        </span>
        <span class="comic-script-copy">
          <span class="comic-script-jp">${ruby(line.japanese || '')}</span>
          <span class="comic-script-ko">${escHtml(line.korean || '')}</span>
        </span>
        <span class="comic-script-audio" onclick="event.stopPropagation(); App._speakDialogueLine('${line.id}')">${ctx.uiIconSvg('audio', 'audio-inline-icon')}</span>
      </button>
    `;
  }

  function _renderComicScriptDock(dialogues, panelIndex, activeSourceIndex = null, mod = null) {
    const lines = _comicPanelLines(dialogues, panelIndex);
    const selectedLine = activeSourceIndex === null
      ? (lines.find(line => line.speaker !== 'N') || lines[0])
      : lines.find(line => line.sourceIndex === activeSourceIndex);
    const selectedSourceIndex = selectedLine?.sourceIndex ?? null;
    return `
      <div class="comic-subtitle-overlay comic-script-dock-external" id="comicScriptDock">
        ${lines.map(line => _renderComicScriptLine(line, line.sourceIndex === selectedSourceIndex, mod)).join('')}
      </div>
    `;
  }

  function _renderComicFrameHtml(dialogues, panelIndex, activeSourceIndex = null, mod = null) {
    const lines = _comicPanelLines(dialogues, panelIndex);
    const selectedLine = activeSourceIndex === null
      ? (lines.find(line => line.speaker !== 'N') || lines[0])
      : lines.find(line => line.sourceIndex === activeSourceIndex);
    const activeLine = selectedLine;
    const activeSpeaker = activeLine?.speaker && activeLine.speaker !== 'N' ? activeLine.speaker : '';
    const focusClass = activeSpeaker ? `is-speaking speaker-focus-${activeSpeaker}` : '';
    const speakerName = _comicRoleLabel(activeSpeaker);
    const cinematicClass = `cinematic-panel-${(panelIndex % 6) + 1}`;
    const lineMood = activeLine?.id || '';
    const moodClass = /3|4|7|8/.test(lineMood) ? 'mood-warm' : /9|10|11/.test(lineMood) ? 'mood-close' : 'mood-formal';
    return `
      <div class="comic-player-visual comic-video-scene comic-cinematic-frame comic-panel-${panelIndex + 1} ${cinematicClass} ${moodClass} ${focusClass}" id="comicVisualFrame" data-panel="${panelIndex + 1}" data-speaker="${escHtml(activeSpeaker)}">
        <div class="comic-video-bars" aria-hidden="true"></div>
        <div class="comic-cinematic-depth depth-back" aria-hidden="true"></div>
        <div class="comic-cinematic-depth depth-front" aria-hidden="true"></div>
        <div class="comic-light-sweep" aria-hidden="true"></div>
        ${_renderComicCharacters(dialogues, 'vn-character', mod)}
        <div class="comic-cinematic-grain" aria-hidden="true"></div>
        <div class="comic-play-indicator">
          <span></span><span></span><span></span>
          <b>${speakerName ? `${escHtml(speakerName)} 말하는 중` : '장면 재생'}</b>
        </div>
      </div>
    `;
  }

  function _renderComicIntro(mod, rp, dialogues, roleplayCover, speakerOptions, speakerLabels, practiceSpeaker) {
    const voices = typeof TTS.getAvailableVoices === 'function' ? TTS.getAvailableVoices() : [];
    const voiceOptionHtml = role => voices.map(v => `
      <option value="${v.key}" ${_voiceForSpeaker(role) === v.key ? 'selected' : ''}>
        ${escHtml(v.label || v.key)} · ${escHtml(VoiceCharacters.meta(v.key).age || (v.gender === 'M' ? '남성' : '여성'))}
      </option>
    `).join('');
    const voiceSelect = role => {
      const key = _voiceForSpeaker(role);
      const voice = voices.find(v => v.key === key) || voices[0] || { key, label: key, gender: 'F' };
      const roleLabel = _comicRoleLabel(role);
      return `
        <div class="comic-voice-select-card">
          <span class="comic-role-avatar" style="background-image:url('${ctx.cssUrlValue(_comicRoleImage(role, mod))}')"></span>
          <label class="comic-voice-select-main">
            <span>${escHtml(roleLabel)} · ${escHtml(voice.label || voice.key)}</span>
            <select class="comic-voice-select" onchange="App._setRoleplayVoice('${role}', this.value)">
              ${voiceOptionHtml(role)}
            </select>
          </label>
        </div>
      `;
    };
    const roleSelectorHtml = speakerOptions.length > 1 ? `
      <div class="comic-practice-role-row">
        <span class="roleplay-role-label">내가 연습할 역할</span>
        ${speakerOptions.map(s => `
          <button class="roleplay-role-chip ${practiceSpeaker === s ? 'active' : ''}" type="button"
                  onclick="App._setRoleplayPracticeSpeaker('${s}')">${escHtml(_comicRoleLabel(s))}</button>
        `).join('')}
      </div>
      <div class="comic-voice-select-grid">
        ${speakerOptions.map(voiceSelect).join('')}
      </div>
    ` : '';
    document.getElementById('flowStep').textContent = '1 / 2 · 씬과 화자 선택';
    document.getElementById('flowProgressFill').style.width = '20%';
    document.getElementById('flowBody').innerHTML = `
      <div class="comic-intro-shell">
        <div class="roleplay-hero comic-intro-hero" style="--roleplay-hero-bg:url('${ctx.cssUrlValue(roleplayCover)}')">
          <div class="roleplay-hero-bg" aria-hidden="true"></div>
          <div class="comic-intro-characters" aria-hidden="true">
            ${_renderComicCharacters(dialogues, 'comic-intro-character', mod)}
          </div>
          <div class="roleplay-hero-content">
            <div class="roleplay-hero-title">${escHtml(_comicIntroTitle(mod, rp, dialogues))}</div>
            <div class="roleplay-hero-desc">${_comicIntroDesc(rp, dialogues)}<br>화자를 선택하면 장면이 자동으로 움직이고, 영화 자막처럼 대사가 이어집니다.</div>
          </div>
        </div>
        <div class="comic-intro-panel">
          <div class="comic-intro-label">역할과 화자 선택</div>
          ${roleSelectorHtml}
        </div>
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = `
      <div class="roleplay-actions comic-intro-actions">
        <button class="btn btn-outline" onclick="App.closeFlow()">나중에</button>
        <button class="btn btn-primary" onclick="App._startRoleplayComicPlayer()">영상 재생 시작 →</button>
      </div>
    `;
  }

  function _renderComicPlayer(mod, rp, dialogues, comicSceneAsset) {
    const state = _getRoleplayState(mod);
    const groups = _comicGroups(dialogues);
    const panelIndex = Math.max(0, Math.min(state.comicPanelIndex || 0, groups.length - 1));
    state.phase = 'comic_player';
    state.comicPanelIndex = panelIndex;
    document.getElementById('flowStep').textContent = '2 / 2 · 영상 재생';
    document.getElementById('flowProgressFill').style.width = `${32 + Math.round(((panelIndex + 1) / groups.length) * 60)}%`;
    document.getElementById('flowBody').innerHTML = `
      <div class="comic-player-shell" style="--comic-bg:url('${ctx.cssUrlValue(comicSceneAsset)}')">
        ${_renderComicFrameHtml(dialogues, panelIndex, null, mod)}
        ${_renderComicScriptDock(dialogues, panelIndex, null, mod)}
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = `
      <div class="comic-player-actions">
        <button class="btn btn-outline" onclick="App._roleplayComicPrev()">← ${panelIndex === 0 ? '처음' : '이전'}</button>
        <button class="btn btn-outline" id="btnReplayAll" onclick="App._roleplayComicSpeakPanel()">${ctx.uiLabeledIcon('audio')} 다시 듣기</button>
        <button class="btn btn-outline" id="btnStopPlay" style="display:none" onclick="App._stopRoleplay()">정지</button>
        <button class="btn btn-primary" onclick="App._roleplayComicNext()">${panelIndex >= groups.length - 1 ? '역할 연습 →' : '다음 →'}</button>
      </div>
    `;
  }

  function _renderComicPractice(mod, rp, dialogues, comicSceneAsset) {
    const state = _getRoleplayState(mod);
    const practiceLines = state.practiceLines || [];
    const outputDone = state.outputDone || [];
    const activeIndex = practiceLines.findIndex((_, idx) => !outputDone[idx]);
    if (activeIndex < 0) {
      _completeRoleplay(mod.id);
      return;
    }
    const activeLine = practiceLines[activeIndex];
    const panelIndex = _comicPanelForLine(activeLine.sourceIndex || 0, dialogues);
    const speakerLabel = _comicRoleLabel(activeLine.speaker) || activeLine.speaker || '';
    state.phase = 'comic_practice';
    state.comicPanelIndex = panelIndex;
    document.getElementById('flowStep').textContent = `말하기 · ${activeIndex + 1}/${practiceLines.length}`;
    document.getElementById('flowProgressFill').style.width = `${55 + Math.round(((activeIndex + 1) / practiceLines.length) * 40)}%`;
    document.getElementById('flowBody').innerHTML = `
      <div class="comic-player-shell comic-practice-shell" style="--comic-bg:url('${ctx.cssUrlValue(comicSceneAsset)}')">
        ${_renderComicFrameHtml(dialogues, panelIndex, activeLine.sourceIndex, mod)}
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
          <b>${escHtml(activeLine.korean || '')}</b>
          <em>${ruby(activeLine.japanese || '')}</em>
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

  function _renderRoleplay(mod) {
    const rp = mod.roleplay;
    const dialogues = ctx.getDialogue(rp.dialogueKey);
    const state = _getRoleplayState(mod);
    const phase = state.phase || 'preview';
    const roleplayCover = ctx.getRoleplayCoverAsset(mod);
    const isComicDemo = _isComicPrototype(mod);
    const comicSceneAsset = isComicDemo ? _comicSceneAsset(mod, roleplayCover) : roleplayCover;
    const conversationClass = isComicDemo ? 'roleplay-comic-page' : '';
    document.getElementById('flowScreen')?.classList.toggle('roleplay-comic-mode', isComicDemo);
    document.getElementById('flowScreen')?.classList.toggle('roleplay-comic-player-mode', isComicDemo && (phase === 'comic_player' || phase === 'comic_practice'));
    const practiceSpeaker = state.practiceSpeaker || 'A';
    const practiceLines = state.practiceLines || [];
    const shadowDone = state.shadowDone || [];
    const outputDone = state.outputDone || [];
    const revealed = state.revealed || [];
    const readyCount = practiceLines.filter((_, idx) => outputDone[idx]).length;
    const allReady = practiceLines.length === 0 || readyCount === practiceLines.length;
    const activeIndex = practiceLines.findIndex((_, idx) => !outputDone[idx]);
    const activeLine = activeIndex >= 0 ? practiceLines[activeIndex] : null;
    const speakerOptions = _comicSpeakerRoles(dialogues);
    const speakerLabels = { A: 'A · 나', B: 'B · 상대', C: 'C · 제3자' };
    const roleSelectorHtml = speakerOptions.length > 1 ? `
      <div class="roleplay-role-selector">
        <span class="roleplay-role-label">연습 역할</span>
        ${speakerOptions.map(s => `
          <button class="roleplay-role-chip ${practiceSpeaker === s ? 'active' : ''}"
                  onclick="App._setRoleplayPracticeSpeaker('${s}')">
            ${escHtml(speakerLabels[s] || s)}
          </button>
        `).join('')}
      </div>
    ` : '';

    document.getElementById('flowTitle').textContent = rp.name;
    if (isComicDemo && phase === 'comic_intro') {
      _renderComicIntro(mod, rp, dialogues, comicSceneAsset, speakerOptions, speakerLabels, practiceSpeaker);
      return;
    }
    if (isComicDemo && phase === 'comic_player') {
      _renderComicPlayer(mod, rp, dialogues, comicSceneAsset);
      return;
    }
    if (isComicDemo && phase === 'comic_practice') {
      _renderComicPractice(mod, rp, dialogues, comicSceneAsset);
      return;
    }
    if (phase === 'preview') {
      document.getElementById('flowStep').textContent = '1 / 2 · 먼저 듣고 흐름 익히기';
      document.getElementById('flowProgressFill').style.width = '35%';
    } else {
      const practicePct = practiceLines.length
        ? 50 + Math.round((readyCount / practiceLines.length) * 50)
        : 100;
      document.getElementById('flowStep').textContent = practiceLines.length
        ? `2 / 2 · 내 대사 ${readyCount}/${practiceLines.length}개 연습 완료`
        : '2 / 2 · 말하기 마무리';
      document.getElementById('flowProgressFill').style.width = `${practicePct}%`;
    }

    const renderDialogueLine = (line, i) => {
      if (line.speaker === 'N') {
        const narratorText = line.japanese || line.korean || '';
        return `<div class="dialogue-line speaker-N" id="dl-line-${i}" data-panel="${i + 1}">
          <div class="dialogue-narrator">${ruby(narratorText)}</div>
        </div>`;
      }
      const sideMap = { A: 'speaker-A', B: 'speaker-B', C: 'speaker-C' };
      const labelMap = { A: '나', B: 'B', C: 'C' };
      const side  = sideMap[line.speaker] || 'speaker-B';
      const label = labelMap[line.speaker] || line.speaker;
      return `
        <div class="dialogue-line ${side}" id="dl-line-${i}" data-panel="${i + 1}">
          <div class="dialogue-avatar">${label}</div>
          <div class="dialogue-bubble" style="cursor:pointer" onclick="App.showDialogueDetail('${line.id}')">
            <div class="db-jp">${ruby(line.japanese || '')}</div>
            <div class="db-ko">${escHtml(line.korean || '')}</div>
            ${line.tip ? `<div class="db-tip">${ruby(line.tip)}</div>` : ''}
            <div class="db-tools">
              <span class="dialogue-tap-hint">탭해서 분석</span>
              <span class="db-audio" onclick="event.stopPropagation(); App._speakDialogueLine('${line.id}')">${ctx.uiIconSvg('audio', 'audio-inline-icon')}</span>
            </div>
          </div>
        </div>
      `;
    };

    const dialogueHtml = isComicDemo
      ? (() => {
          const groups = [
            [0],
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8],
            [9, 10, 11],
          ];
          return groups.map((indexes, panelIdx) => `
            <div class="comic-page-panel comic-panel-${panelIdx + 1}" data-panel="${panelIdx + 1}">
              <div class="comic-page-panel-lines">
                ${indexes.map(i => dialogues[i] ? renderDialogueLine(dialogues[i], i) : '').join('')}
              </div>
            </div>
          `).join('');
        })()
      : dialogues.map(renderDialogueLine).join('');

    const practiceHtml = practiceLines.length ? practiceLines.map((line, idx) => {
      const answerVisible = !!revealed[idx];
      const outputOk = !!outputDone[idx];
      return `
        <div class="roleplay-panel">
          <div class="roleplay-panel-head">
            <div>
              <div class="roleplay-panel-title">내 대사 ${idx + 1}</div>
              <div class="roleplay-panel-subtitle">${escHtml(line.korean || '')}</div>
            </div>
            <div class="roleplay-panel-status">${outputOk ? '완료' : '연습 중'}</div>
          </div>
          <div class="roleplay-answer-box">
            ${answerVisible ? ruby(line.japanese || '') : '먼저 한국어 힌트를 보고 일본어로 말해보세요.'}
          </div>
          <div class="roleplay-actions">
            <button class="btn btn-outline" onclick="App._toggleRoleplayReveal(${idx})">${answerVisible ? '정답 가리기' : '정답 보기'}</button>
            <button class="btn btn-outline" onclick="App._speakDialogueLine('${line.id}')">${ctx.uiLabeledIcon('audio')} 정답 듣기</button>
            <button class="btn btn-outline" onclick="App._speakDialogueLineSlow('${line.id}')">${ctx.uiLabeledIcon('audio')} 느리게</button>
            <button class="btn ${outputOk ? 'btn-success' : 'btn-outline'}" onclick="App._markRoleplayOutput(${idx})">${outputOk ? '말하기 완료' : '힌트 보고 말했어요'}</button>
          </div>
        </div>
      `;
    }).join('') : `
      <div class="roleplay-panel">
        <div class="roleplay-panel-title" style="margin-bottom:6px">자동 완료형 롤플레이</div>
        <div class="roleplay-helper-text">이 대화에는 학습자 A 대사가 없어서 전체 흐름을 듣고 마무리할 수 있습니다.</div>
      </div>
    `;

    const currentTurnHtml = activeLine ? `
        <div class="roleplay-panel roleplay-panel-highlight">
        <div class="roleplay-section-heading">지금 내 차례</div>
        <div class="roleplay-progress-text">대사 ${activeIndex + 1} / ${practiceLines.length}</div>
        <div class="roleplay-prompt">${escHtml(activeLine.korean || '')}</div>
        <div class="roleplay-answer-box">
          ${revealed[activeIndex] ? ruby(activeLine.japanese || '') : '먼저 스스로 말해 보고, 막히면 정답을 확인해 보세요.'}
        </div>
        <div class="roleplay-actions">
          <button class="btn btn-outline" onclick="App._replayRoleplayCurrentTurn()">${ctx.uiLabeledIcon('audio')} 현재부터 듣기</button>
          <button class="btn btn-outline" onclick="App._speakDialogueLineSlow('${activeLine.id}')">${ctx.uiLabeledIcon('audio')} 느리게 듣기</button>
          <button class="btn btn-outline" onclick="App._speakDialogueLine('${activeLine.id}')">${ctx.uiLabeledIcon('audio')} 정답 듣기</button>
          <button class="btn btn-outline" onclick="App._toggleRoleplayReveal(${activeIndex})">${revealed[activeIndex] ? '정답 가리기' : '정답 보기'}</button>
          <button class="btn ${outputDone[activeIndex] ? 'btn-success' : 'btn-outline'}" onclick="App._markRoleplayOutput(${activeIndex})">${outputDone[activeIndex] ? '말하기 완료' : '힌트 보고 말했어요'}</button>
        </div>
      </div>
    ` : `
      <div class="roleplay-panel roleplay-panel-success">
        <div class="roleplay-section-heading">모든 내 대사 연습 완료</div>
        <div class="roleplay-helper-text">전체 대화를 한 번 더 재생한 뒤 완료하면 마무리됩니다.</div>
      </div>
    `;
    if (phase === 'preview') {
      document.getElementById('flowBody').innerHTML = `
        ${roleplayCover ? `
        <div class="roleplay-hero" style="--roleplay-hero-bg:url('${ctx.cssUrlValue(roleplayCover)}')">
          <div class="roleplay-hero-bg" aria-hidden="true"></div>
          <div class="roleplay-hero-content">
            <div class="roleplay-hero-kicker">${ctx.uiIconSvg('roleplay', 'scene-title-icon')} 롤플레이 장면</div>
            <div class="roleplay-hero-title">${escHtml(rp.name)}</div>
            <div class="roleplay-hero-desc">${escHtml(rp.desc)}</div>
            <div class="roleplay-hero-chips">
              <span>${dialogues.length}개 대화</span>
              <span>${practiceLines.length || '자동'} 미션</span>
              <span>${escHtml(speakerLabels[practiceSpeaker] || practiceSpeaker)} 역할</span>
              <span>말풍선 분석</span>
            </div>
          </div>
        </div>` : ''}
        <div class="dialogue-scene ${roleplayCover ? 'compact' : ''}">
          <div class="scene-title">${ctx.uiIconSvg('roleplay', 'scene-title-icon')} ${escHtml(rp.name)}</div>
          ${escHtml(rp.desc)}
        </div>
        <div class="roleplay-panel roleplay-mission-card">
          <div class="roleplay-panel-title" style="margin-bottom:8px">이렇게 사용합니다</div>
          ${roleSelectorHtml}
          <div class="roleplay-guide-grid">
            <span><b>1</b>전체 흐름 듣기</span>
            <span><b>2</b>말풍선 눌러 분석</span>
            <span><b>3</b>내 역할로 말하기</span>
          </div>
        </div>
        <div class="roleplay-conversation">
          <div class="roleplay-conversation-head">
            <span>대화 장면</span>
            <b>말풍선을 누르면 단어·문장 소리를 확인할 수 있습니다</b>
          </div>
          <div class="dialogue-list ${conversationClass}" id="dialogueList" ${isComicDemo && comicSceneAsset ? `style="--comic-bg:url('${ctx.cssUrlValue(comicSceneAsset)}')"` : ''}>${dialogueHtml}</div>
        </div>
      `;
      document.getElementById('flowFooter').innerHTML = `
        <div class="roleplay-actions">
          <button class="btn btn-outline" id="btnReplayAll" onclick="App._replayAll('${mod.id}')">${ctx.uiLabeledIcon('audio')} 전체 재생</button>
          <button class="btn btn-outline" id="btnStopPlay" style="display:none" onclick="App._stopRoleplay()">정지</button>
          <button class="btn btn-primary" onclick="App._beginRoleplayPractice()">역할 연습 시작 →</button>
        </div>
      `;
      return;
    }

    document.getElementById('flowBody').innerHTML = `
      <div class="dialogue-scene">
        <div class="scene-title">${ctx.uiIconSvg('roleplay', 'scene-title-icon')} ${escHtml(rp.name)}</div>
        방금 들은 흐름을 바탕으로, 이제 내 대사를 직접 말해 보세요.
      </div>
      <div class="roleplay-panel roleplay-mission-card">
        <div class="roleplay-panel-title" style="margin-bottom:8px">말하기 미션</div>
        ${roleSelectorHtml}
        <div class="roleplay-helper-text">
          정답을 바로 보기 전에 먼저 입으로 말하고, 필요할 때만 듣거나 확인해 주세요.<br>
          한 대사씩 끝낼수록 아래 진행 상태가 채워집니다.
        </div>
      </div>
      ${currentTurnHtml}
      <div class="roleplay-conversation">
        <div class="roleplay-conversation-head">
          <span>대화 장면</span>
          <b>현재 차례부터 듣거나 한 줄씩 분석할 수 있습니다</b>
        </div>
        <div class="dialogue-list ${conversationClass}" id="dialogueList" ${isComicDemo && comicSceneAsset ? `style="--comic-bg:url('${ctx.cssUrlValue(comicSceneAsset)}')"` : ''}>${dialogueHtml}</div>
      </div>
      <div style="height:12px"></div>
      <div class="scene-title">${ctx.uiIconSvg('voice', 'scene-title-icon')} 내 말하기 연습</div>
      <div class="roleplay-helper-text" style="margin:6px 0 12px">힌트를 보고 먼저 말한 뒤, 필요하면 정답을 열어 확인하세요.</div>
      <div>${practiceHtml}</div>
    `;

    document.getElementById('flowFooter').innerHTML = `
      <div class="roleplay-actions">
        <button class="btn btn-outline" id="btnReplayAll" onclick="App._replayAll('${mod.id}')">${ctx.uiLabeledIcon('audio')} 전체 재생</button>
        ${activeLine ? `<button class="btn btn-outline" onclick="App._replayRoleplayCurrentTurn()">${ctx.uiLabeledIcon('audio')} 현재부터</button>` : ''}
        <button class="btn btn-outline" id="btnStopPlay" style="display:none" onclick="App._stopRoleplay()">정지</button>
        <button class="btn ${allReady ? 'btn-success' : 'btn-outline'}" onclick="App._completeRoleplay('${mod.id}')">${allReady ? '완료 ✓' : `말하기 ${readyCount}/${practiceLines.length}`}</button>
      </div>
    `;
  }

  function _beginRoleplayPractice() {
    if (!ctx.getFlow()?.roleplayState) return;
    _stopRoleplay();
    const mod = ctx.getMod(ctx.getFlow().moduleId);
    if (_isComicPrototype(mod)) {
      const dialogues = ctx.getDialogue(mod.roleplay.dialogueKey);
      ctx.getFlow().roleplayState.phase = 'comic_practice';
      ctx.getFlow().roleplayState.comicPanelIndex = _comicPanelForLine(ctx.getFlow().roleplayState.practiceLines?.[0]?.sourceIndex || 0, dialogues);
      _renderRoleplay(mod);
      return;
    }
    ctx.getFlow().roleplayState.phase = 'practice';
    _renderRoleplay(ctx.getMod(ctx.getFlow().moduleId));
  }

  function _setRoleplayPracticeSpeaker(speaker) {
    const state = ctx.getFlow()?.roleplayState;
    if (!state) return;
    _stopRoleplay();
    state.practiceSpeaker = speaker;
    if (state.phase !== 'comic_intro') state.phase = 'practice';
    state.practiceSourceSpeaker = null;
    _renderRoleplay(ctx.getMod(ctx.getFlow().moduleId));
  }

  function _startRoleplayComicPlayer() {
    const state = ctx.getFlow()?.roleplayState;
    if (!state) return;
    _stopRoleplay();
    state.phase = 'comic_player';
    state.comicPanelIndex = 0;
    document.getElementById('flowScreen')?.classList.add('roleplay-comic-player-mode');
    _renderRoleplay(ctx.getMod(ctx.getFlow().moduleId));
    setTimeout(() => _replayAll(ctx.getFlow().moduleId, 0), 250);
  }

  function _roleplayComicGo(delta) {
    const state = ctx.getFlow()?.roleplayState;
    const mod = ctx.getMod(ctx.getFlow()?.moduleId);
    if (!state || !_isComicPrototype(mod)) return;
    const dialogues = ctx.getDialogue(mod.roleplay.dialogueKey);
    const groups = _comicGroups(dialogues);
    if ((state.comicPanelIndex || 0) === 0 && delta < 0) {
      _stopRoleplay();
      state.phase = 'comic_intro';
      document.getElementById('flowScreen')?.classList.remove('roleplay-comic-player-mode');
      _renderRoleplay(mod);
      return;
    }
    if ((state.comicPanelIndex || 0) >= groups.length - 1 && delta > 0) {
      _beginRoleplayPractice();
      return;
    }
    _stopRoleplay();
    state.phase = 'comic_player';
    state.comicPanelIndex = Math.max(0, Math.min((state.comicPanelIndex || 0) + delta, groups.length - 1));
    _renderRoleplay(mod);
    setTimeout(() => _roleplayComicSpeakPanel(), 220);
  }

  function _roleplayComicPracticeNext() {
    const state = ctx.getFlow()?.roleplayState;
    const mod = ctx.getMod(ctx.getFlow()?.moduleId);
    if (!state || !_isComicPrototype(mod)) return;
    const activeIndex = state.practiceLines?.findIndex((_, idx) => !state.outputDone?.[idx]) ?? -1;
    if (activeIndex < 0) return;
    state.outputDone[activeIndex] = true;
    _renderRoleplay(mod);
  }

  function _roleplayComicPracticePrev() {
    const state = ctx.getFlow()?.roleplayState;
    const mod = ctx.getMod(ctx.getFlow()?.moduleId);
    if (!state || !_isComicPrototype(mod)) return;
    const activeIndex = state.practiceLines?.findIndex((_, idx) => !state.outputDone?.[idx]) ?? -1;
    if (activeIndex > 0) state.outputDone[activeIndex - 1] = false;
    _renderRoleplay(mod);
  }

  function _roleplayComicSetPanel(panelIndex, activeSourceIndex = null) {
    const mod = ctx.getMod(ctx.getFlow()?.moduleId);
    const state = ctx.getFlow()?.roleplayState;
    if (!state || !_isComicPrototype(mod)) return;
    if (state.phase !== 'comic_player') return;
    const dialogues = ctx.getDialogue(mod.roleplay.dialogueKey);
    const groups = _comicGroups(dialogues);
    const safeIndex = Math.max(0, Math.min(panelIndex, groups.length - 1));
    state.comicPanelIndex = safeIndex;
    const shell = document.querySelector('.comic-player-shell');
    if (shell) {
      shell.innerHTML = `
        ${_renderComicFrameHtml(dialogues, safeIndex, activeSourceIndex, mod)}
        ${_renderComicScriptDock(dialogues, safeIndex, activeSourceIndex, mod)}
      `;
    }
    document.getElementById('flowStep').textContent = '2 / 2 · 영상 재생';
    document.getElementById('flowProgressFill').style.width = `${32 + Math.round(((safeIndex + 1) / groups.length) * 60)}%`;
  }

  function _roleplayComicSpeakPanel() {
    const mod = ctx.getMod(ctx.getFlow()?.moduleId);
    const state = ctx.getFlow()?.roleplayState;
    if (!state || !_isComicPrototype(mod)) return;
    if (state.phase !== 'comic_player') return;
    const dialogues = ctx.getDialogue(mod.roleplay.dialogueKey);
    const panelIndex = state.comicPanelIndex || 0;
    const panelLines = _comicPanelLines(dialogues, panelIndex).filter(line => line.speaker !== 'N');
    if (!panelLines.length) return;
    _setRoleplayPlaying(true);
    TTS.speakQueue(panelLines.map(line => ({
      text: stripFuri(line.japanese || ''),
      speaker: line.speaker,
      voice: _voiceForSpeaker(line.speaker),
      elementId: `dl-line-${line.sourceIndex}`,
      sourceIndex: line.sourceIndex,
    })), {
      rate: 1.0,
      gapMs: 220,
      onLineStart: (_idx, line) => {
        _roleplayComicSetPanel(panelIndex, line.sourceIndex);
      },
      onLineEnd: () => {},
      onDone: () => {
        _setRoleplayPlaying(false);
      }
    });
  }

  function _toggleRoleplayReveal(index) {
    if (!ctx.getFlow()?.roleplayState) return;
    _stopRoleplay();
    ctx.getFlow().roleplayState.revealed[index] = !ctx.getFlow().roleplayState.revealed[index];
    _renderRoleplay(ctx.getMod(ctx.getFlow().moduleId));
  }

  function _markRoleplayShadow(index) {
    if (!ctx.getFlow()?.roleplayState) return;
    ctx.getFlow().roleplayState.shadowDone[index] = true;
    _renderRoleplay(ctx.getMod(ctx.getFlow().moduleId));
  }

  function _markRoleplayOutput(index) {
    if (!ctx.getFlow()?.roleplayState) return;
    ctx.getFlow().roleplayState.outputDone[index] = true;
    _renderRoleplay(ctx.getMod(ctx.getFlow().moduleId));
  }

  function _voiceForSpeaker(speaker) {
    if (!speaker || typeof TTS.getRoleVoice !== 'function') return undefined;
    return TTS.getRoleVoice(speaker);
  }

  function _speakDialogueLine(lineId) {
    const all = typeof VOCAB_ITEMS_DIALOGUE !== 'undefined' ? VOCAB_ITEMS_DIALOGUE : [];
    const line = all.find(x => x.id === lineId);
    if (!line?.japanese) return;
    TTS.speak(stripFuri(line.japanese), { voice: _voiceForSpeaker(line.speaker) });
  }

  async function _speakDialogueLineSlow(lineId) {
    const all = typeof VOCAB_ITEMS_DIALOGUE !== 'undefined' ? VOCAB_ITEMS_DIALOGUE : [];
    const line = all.find(x => x.id === lineId);
    if (!line?.japanese) return;
    const prevRate = TTS.getRate?.() || 1;
    TTS.setRate(0.72);
    await TTS.speak(stripFuri(line.japanese), { voice: _voiceForSpeaker(line.speaker) });
    TTS.setRate(prevRate);
  }

  function _replayRoleplayCurrentTurn() {
    const state = ctx.getFlow()?.roleplayState;
    const activeLine = state?.practiceLines?.find((_, idx) => !state.outputDone?.[idx]);
    if (!activeLine) return;
    _replayAll(ctx.getFlow().moduleId, activeLine.sourceIndex || 0);
  }

  function _getRoleplayPlaybackState() {
    if (!ctx.getFlow()?.roleplayState) return null;
    if (!ctx.getFlow().roleplayState.playback) {
      ctx.getFlow().roleplayState.playback = {
        isPlaying: false,
        currentLineIndex: 0,
        moduleId: ctx.getFlow().moduleId
      };
    }
    return ctx.getFlow().roleplayState.playback;
  }

  function _setRoleplayPlaying(isPlaying) {
    const playback = _getRoleplayPlaybackState();
    if (playback) {
      playback.isPlaying = !!isPlaying;
      playback.moduleId = ctx.getFlow()?.moduleId || playback.moduleId;
    }
    const btnReplay = document.getElementById('btnReplayAll');
    const btnStop   = document.getElementById('btnStopPlay');
    if (btnReplay) btnReplay.style.display = isPlaying ? 'none' : '';
    if (btnStop)   btnStop.style.display   = isPlaying ? '' : 'none';
  }

  function _startRoleplay(mod) {
    const rp = mod.roleplay;
    const dialogues = ctx.getDialogue(rp.dialogueKey);
    if (!dialogues?.length) { ctx.showToast('대화 데이터를 찾을 수 없습니다'); return; }
    ctx.openFlowScreen();
    ctx.setFlow({
      moduleId: mod.id,
      step: -1,
      roleplay: true,
      roleplayState: {
        phase: _isComicPrototype(mod) ? 'comic_intro' : 'preview',
        practiceSpeaker: 'A',
        practiceLines: _getRoleplayPracticeLines(dialogues, 'A'),
        practiceSourceSpeaker: 'A',
        comicPanelIndex: 0,
        revealed: [],
        shadowDone: [],
        outputDone: []
      }
    });
    _renderRoleplay(mod);

    if (!_isComicPrototype(mod)) {
      setTimeout(() => _replayAll(mod.id), 450);
    }
  }

  function _replayAll(moduleId, startIndex = 0) {
    const mod = MODULES.find(m => m.id === moduleId);
    if (!mod?.roleplay) return;
    const dialogues = ctx.getDialogue(mod.roleplay.dialogueKey);
    if (!dialogues?.length) return;

    const playback = _getRoleplayPlaybackState();
    const safeStartIndex = Math.max(0, Math.min(Number(startIndex) || 0, dialogues.length - 1));
    if (playback) {
      playback.currentLineIndex = safeStartIndex;
      playback.moduleId = moduleId;
    }

    _setRoleplayPlaying(true);

    // 나레이터(N) 포함 모든 라인을 큐에 넣되,
    // N은 텍스트가 한국어 설명뿐이므로 TTS 스킵 (text 비워 _speakOne가 no-op)
    const lines = dialogues.slice(safeStartIndex).map((d, offset) => {
      const i = safeStartIndex + offset;
      return {
        text:      d.speaker === 'N' ? '' : stripFuri(d.japanese || ''),
        speaker:   d.speaker,
        voice:     _voiceForSpeaker(d.speaker),
        elementId: `dl-line-${i}`,
        sourceIndex: i
      };
    });

    TTS.speakQueue(lines, {
      rate: 1.0,
      gapMs: 220,
      onLineStart: (idx, line) => {
        const livePlayback = _getRoleplayPlaybackState();
        if (livePlayback) {
          livePlayback.isPlaying = true;
          livePlayback.currentLineIndex = line.sourceIndex ?? idx;
          livePlayback.moduleId = moduleId;
        }
        // 이전 하이라이트 제거 후 현재 라인 하이라이트 + 스크롤
        document.querySelectorAll('.dialogue-line.playing')
                .forEach(el => el.classList.remove('playing'));
        document.querySelectorAll('.comic-script-line.active')
                .forEach(el => el.classList.remove('active'));
        if (_isComicPrototype(mod) && ctx.getFlow()?.roleplayState?.phase === 'comic_player') {
          const panelIndex = _comicPanelForLine(line.sourceIndex ?? idx, dialogues);
          if (panelIndex >= 0) _roleplayComicSetPanel(panelIndex, line.sourceIndex ?? idx);
        }
        if (line.elementId) {
          const el = document.getElementById(line.elementId);
          if (el) {
            el.classList.add('playing');
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      },
      onLineEnd: (idx, line) => {
        if (line.elementId) {
          document.getElementById(line.elementId)?.classList.remove('playing');
        }
      },
      onDone: () => {
        _setRoleplayPlaying(false);
      }
    });
  }

  function _stopRoleplay() {
    TTS.stopQueue();
    document.querySelectorAll('.dialogue-line.playing')
            .forEach(el => el.classList.remove('playing'));
    _setRoleplayPlaying(false);
  }

  function _completeRoleplay(moduleId) {
    _stopRoleplay();
    Store.completeRoleplay(moduleId);
    const mod = MODULES.find(m => m.id === moduleId);
    const xp = mod?.xp || 200;
    Store.addXP(xp);
    confetti(60);
    const next = getNextModule(Store.get());
    const nextAction = next
      ? `<button class="btn btn-primary" onclick="App.openModule('${next.mod.id}', ${next.roleplay ? 'true' : 'false'})">
           ${next.roleplay ? '다음 롤플레이로 →' : `다음 레슨: ${escHtml(next.mod.name)} →`}
         </button>`
      : `<button class="btn btn-primary" onclick="App.closeFlow()">홈으로 →</button>`;

    document.getElementById('flowBody').innerHTML = `
      <div class="completion-screen">
        <div class="completion-emoji">${ctx.uiIconSvg('roleplay', 'completion-main-icon')}</div>
        <div class="completion-title">롤플레이 완료!</div>
        <div class="completion-sub">${escHtml(mod?.roleplay?.name || '')} 마스터 완료!<br>이제 흐름을 이해하는 단계에서 직접 말하는 단계까지 잘 마쳤어요.</div>
        <div class="completion-unlocks">
          <div class="cu-title">획득</div>
          <div class="completion-unlock-item"><span class="cui-icon">${ctx.uiIconSvg('xp', 'completion-inline-icon')}</span> +${xp} XP</div>
          <div class="completion-unlock-item"><span class="cui-icon">${ctx.uiIconSvg('roleplay', 'completion-inline-icon')}</span> 롤플레이 뱃지</div>
        </div>
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = `
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${nextAction}
        <button class="btn btn-outline" onclick="App.closeFlow()">홈으로</button>
      </div>
    `;
  }

  return {
    renderRoleplay: _renderRoleplay,
    beginPractice: _beginRoleplayPractice,
    startComicPlayer: _startRoleplayComicPlayer,
    comicPrev: () => _roleplayComicGo(-1),
    comicNext: () => _roleplayComicGo(1),
    comicSpeakPanel: _roleplayComicSpeakPanel,
    comicPracticeNext: _roleplayComicPracticeNext,
    comicPracticePrev: _roleplayComicPracticePrev,
    toggleReveal: _toggleRoleplayReveal,
    setPracticeSpeaker: _setRoleplayPracticeSpeaker,
    markShadow: _markRoleplayShadow,
    markOutput: _markRoleplayOutput,
    speakLine: _speakDialogueLine,
    speakLineSlow: _speakDialogueLineSlow,
    startRoleplay: _startRoleplay,
    replayAll: _replayAll,
    replayCurrentTurn: _replayRoleplayCurrentTurn,
    stopRoleplay: _stopRoleplay,
    showDialogueDetail: _detailFlow.showDialogueDetail,
    closeDialogueDetail: _detailFlow.closeDialogueDetail,
    completeRoleplay: _completeRoleplay,
  };
};
