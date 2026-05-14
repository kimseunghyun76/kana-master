/* ============================================================
   Roleplay Flow - dialogue preview, playback, detail popup
   ============================================================ */

'use strict';

window.createRoleplayFlow = (ctx) => {
  const ROLEPLAY_ART = window.RoleplayArt?.byModule || {};
  const FIRST_MEETING_ART = window.RoleplayArt?.FIRST_MEETING || {
    bg: 'images/roleplay-comics/vn-first-meeting-bg.webp',
    male: 'images/roleplay-comics/vn-first-meeting-male.png',
    female: 'images/roleplay-comics/vn-first-meeting-female.png',
  };

  const _detailFlow = createRoleplayDetailFlow({
    ...ctx,
    getPlaybackState: () => _getRoleplayPlaybackState(),
    setRoleplayPlaying: value => _setRoleplayPlaying(value),
    replayAll: (moduleId, startIndex) => _replayAll(moduleId, startIndex),
  });
  const _comicView = createRoleplayComicView(ctx, {
    roleplayArt: ROLEPLAY_ART,
    firstMeetingArt: FIRST_MEETING_ART,
    getState: mod => _getRoleplayState(mod),
    voiceForSpeaker: speaker => _voiceForSpeaker(speaker),
    completeRoleplay: moduleId => _completeRoleplay(moduleId),
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

  function _renderRoleplay(mod) {
    const rp = mod.roleplay;
    const dialogues = ctx.getDialogue(rp.dialogueKey);
    const state = _getRoleplayState(mod);
    const phase = state.phase || 'preview';
    const roleplayCover = ctx.getRoleplayCoverAsset(mod);
    const isComicDemo = _isComicPrototype(mod);
    const comicSceneAsset = isComicDemo ? _comicView.sceneAsset(mod, roleplayCover) : roleplayCover;
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
    const speakerOptions = _comicView.speakerRoles(dialogues);
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
      _comicView.renderIntro(mod, rp, dialogues, comicSceneAsset, speakerOptions, practiceSpeaker);
      return;
    }
    if (isComicDemo && phase === 'comic_preview') {
      _comicView.renderPreview(mod, rp, dialogues, comicSceneAsset);
      return;
    }
    if (isComicDemo && phase === 'comic_player') {
      _comicView.renderPlayer(mod, dialogues, comicSceneAsset);
      return;
    }
    if (isComicDemo && phase === 'comic_practice') {
      _comicView.renderPractice(mod, dialogues, comicSceneAsset);
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
      ctx.getFlow().roleplayState.comicPanelIndex = _comicView.panelForLine(ctx.getFlow().roleplayState.practiceLines?.[0]?.sourceIndex || 0, dialogues);
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
    if (state.phase !== 'comic_intro' && state.phase !== 'comic_preview') state.phase = 'practice';
    state.practiceSourceSpeaker = null;
    _renderRoleplay(ctx.getMod(ctx.getFlow().moduleId));
  }

  function _startRoleplayComicPlayer() {
    const state = ctx.getFlow()?.roleplayState;
    if (!state) return;
    _stopRoleplay();
    if (state.phase === 'comic_intro') {
      state.phase = 'comic_preview';
      document.getElementById('flowScreen')?.classList.remove('roleplay-comic-player-mode');
      _renderRoleplay(ctx.getMod(ctx.getFlow().moduleId));
      return;
    }
    _startRoleplayComicPlayback();
  }

  function _returnRoleplayComicIntro() {
    const state = ctx.getFlow()?.roleplayState;
    if (!state) return;
    _stopRoleplay();
    state.phase = 'comic_intro';
    document.getElementById('flowScreen')?.classList.remove('roleplay-comic-player-mode');
    _renderRoleplay(ctx.getMod(ctx.getFlow().moduleId));
  }

  function _startRoleplayComicPlayback() {
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
    const groups = _comicView.groups(dialogues);
    if ((state.comicPanelIndex || 0) === 0 && delta < 0) {
      _stopRoleplay();
      state.phase = 'comic_preview';
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
    const groups = _comicView.groups(dialogues);
    const safeIndex = Math.max(0, Math.min(panelIndex, groups.length - 1));
    state.comicPanelIndex = safeIndex;
    _comicView.rerenderPlayerShell(dialogues, safeIndex, activeSourceIndex, mod);
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
    const panelLines = _comicView.panelLines(dialogues, panelIndex).filter(line => line.speaker !== 'N');
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
          const panelIndex = _comicView.panelForLine(line.sourceIndex ?? idx, dialogues);
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
    startComicPlayback: _startRoleplayComicPlayback,
    returnComicIntro: _returnRoleplayComicIntro,
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
