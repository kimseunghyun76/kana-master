/* ============================================================
   Roleplay Flow - dialogue preview, playback, detail popup
   ============================================================ */

'use strict';

window.createRoleplayFlow = (ctx) => {
  let _dialogueDetailResume = null;

  // ── Roleplay ──────────────────────────────────────────────
  function _getRoleplayPracticeLines(dialogues) {
    return (dialogues || [])
      .map((line, sourceIndex) => ({ ...line, sourceIndex }))
      .filter(line => line.speaker === 'A' && (line.japanese || '').trim());
  }

  function _getRoleplayState(mod) {
    const dialogues = ctx.getDialogue(mod?.roleplay?.dialogueKey);
    const practiceLines = _getRoleplayPracticeLines(dialogues);
    if (!ctx.getFlow()?.roleplayState) {
      ctx.getFlow().roleplayState = {
        phase: 'preview',
        practiceLines,
        revealed: [],
        shadowDone: [],
        outputDone: []
      };
    }
    return ctx.getFlow().roleplayState;
  }

  function _renderRoleplay(mod) {
    const rp = mod.roleplay;
    const dialogues = ctx.getDialogue(rp.dialogueKey);
    const state = _getRoleplayState(mod);
    const phase = state.phase || 'preview';
    const roleplayCover = ctx.getRoleplayCoverAsset(mod);
    const practiceLines = state.practiceLines || [];
    const shadowDone = state.shadowDone || [];
    const outputDone = state.outputDone || [];
    const revealed = state.revealed || [];
    const readyCount = practiceLines.filter((_, idx) => shadowDone[idx] && outputDone[idx]).length;
    const allReady = practiceLines.length === 0 || readyCount === practiceLines.length;
    const activeIndex = practiceLines.findIndex((_, idx) => !(shadowDone[idx] && outputDone[idx]));
    const activeLine = activeIndex >= 0 ? practiceLines[activeIndex] : null;

    document.getElementById('flowTitle').textContent = rp.name;
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

    const dialogueHtml = dialogues.map((line, i) => {
      if (line.speaker === 'N') {
        return `<div class="dialogue-line speaker-N" id="dl-line-${i}">
          <div class="dialogue-narrator">${ruby(line.japanese || '')}</div>
        </div>`;
      }
      const sideMap = { A: 'speaker-A', B: 'speaker-B', C: 'speaker-C' };
      const labelMap = { A: '나', B: 'B', C: 'C' };
      const side  = sideMap[line.speaker] || 'speaker-B';
      const label = labelMap[line.speaker] || line.speaker;
      return `
        <div class="dialogue-line ${side}" id="dl-line-${i}">
          <div class="dialogue-avatar">${label}</div>
          <div class="dialogue-bubble" style="cursor:pointer" onclick="App.showDialogueDetail('${line.id}')">
            <div class="db-jp">${ruby(line.japanese || '')}</div>
            <div class="db-ko">${escHtml(line.korean || '')}</div>
            ${line.tip ? `<div class="db-tip">${ruby(line.tip)}</div>` : ''}
            <span class="db-audio" onclick="event.stopPropagation(); App._speakDialogueLine('${line.id}')">${ctx.uiIconSvg('audio', 'audio-inline-icon')}</span>
          </div>
        </div>
      `;
    }).join('');

    const practiceHtml = practiceLines.length ? practiceLines.map((line, idx) => {
      const answerVisible = !!revealed[idx];
      const shadowOk = !!shadowDone[idx];
      const outputOk = !!outputDone[idx];
      return `
        <div class="roleplay-panel">
          <div class="roleplay-panel-head">
            <div>
              <div class="roleplay-panel-title">내 대사 ${idx + 1}</div>
              <div class="roleplay-panel-subtitle">${escHtml(line.korean || '')}</div>
            </div>
            <div class="roleplay-panel-status">${shadowOk && outputOk ? '완료' : '연습 중'}</div>
          </div>
          <div class="roleplay-answer-box">
            ${answerVisible ? ruby(line.japanese || '') : '먼저 한국어 힌트를 보고 일본어로 말해보세요.'}
          </div>
          <div class="roleplay-actions">
            <button class="btn btn-outline" onclick="App._toggleRoleplayReveal(${idx})">${answerVisible ? '정답 가리기' : '정답 보기'}</button>
            <button class="btn btn-outline" onclick="App._speakDialogueLine('${line.id}')">${ctx.uiLabeledIcon('audio')} 정답 듣기</button>
            <button class="btn ${shadowOk ? 'btn-success' : 'btn-outline'}" onclick="App._markRoleplayShadow(${idx})">${shadowOk ? '따라 말하기 완료' : '따라 말했어요'}</button>
            <button class="btn ${outputOk ? 'btn-success' : 'btn-outline'}" onclick="App._markRoleplayOutput(${idx})">${outputOk ? '힌트 말하기 완료' : '힌트 보고 말했어요'}</button>
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
          <button class="btn btn-outline" onclick="App._speakDialogueLine('${activeLine.id}')">${ctx.uiLabeledIcon('audio')} 정답 듣기</button>
          <button class="btn btn-outline" onclick="App._toggleRoleplayReveal(${activeIndex})">${revealed[activeIndex] ? '정답 가리기' : '정답 보기'}</button>
          <button class="btn ${shadowDone[activeIndex] ? 'btn-success' : 'btn-outline'}" onclick="App._markRoleplayShadow(${activeIndex})">${shadowDone[activeIndex] ? '따라 말하기 완료' : '따라 말했어요'}</button>
          <button class="btn ${outputDone[activeIndex] ? 'btn-success' : 'btn-outline'}" onclick="App._markRoleplayOutput(${activeIndex})">${outputDone[activeIndex] ? '힌트 말하기 완료' : '힌트 보고 말했어요'}</button>
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
        <div class="roleplay-cover">
          <img src="${roleplayCover}" alt="${escHtml(rp.name)}">
        </div>` : ''}
        <div class="dialogue-scene">
          <div class="scene-title">${ctx.uiIconSvg('roleplay', 'scene-title-icon')} ${escHtml(rp.name)}</div>
          ${escHtml(rp.desc)}
        </div>
        <div class="roleplay-panel roleplay-mission-card">
          <div class="roleplay-panel-title" style="margin-bottom:8px">이렇게 사용합니다</div>
          <div class="roleplay-helper-text">
            1. 전체 대화를 재생해 상황 흐름을 익힙니다.<br>
            2. 궁금한 대사를 눌러 단어와 문장 소리를 확인합니다.<br>
            3. 필요한 만큼 다시 듣고 완료하면 다음 학습으로 넘어갑니다.
          </div>
        </div>
        <div class="dialogue-list" id="dialogueList">${dialogueHtml}</div>
      `;
      document.getElementById('flowFooter').innerHTML = `
        <div class="roleplay-actions">
          <button class="btn btn-outline" id="btnReplayAll" onclick="App._replayAll('${mod.id}')">${ctx.uiLabeledIcon('audio')} 전체 재생</button>
          <button class="btn btn-outline" id="btnStopPlay" style="display:none" onclick="App._stopRoleplay()">정지</button>
          <button class="btn btn-primary" onclick="App._completeRoleplay('${mod.id}')">완료 ✓</button>
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
        <div class="roleplay-helper-text">
          정답을 바로 보기 전에 먼저 입으로 말하고, 그 다음 체크해 주세요.<br>
          한 대사씩 끝낼수록 아래 진행 상태가 채워집니다.
        </div>
      </div>
      ${currentTurnHtml}
      <div class="dialogue-list" id="dialogueList">${dialogueHtml}</div>
      <div style="height:12px"></div>
      <div class="scene-title">${ctx.uiIconSvg('voice', 'scene-title-icon')} 내 말하기 연습</div>
      <div class="roleplay-helper-text" style="margin:6px 0 12px">한 번 따라 말하고, 한 번은 힌트만 보고 다시 말해 보세요.</div>
      <div>${practiceHtml}</div>
    `;

    document.getElementById('flowFooter').innerHTML = `
      <div class="roleplay-actions">
        <button class="btn btn-outline" id="btnReplayAll" onclick="App._replayAll('${mod.id}')">${ctx.uiLabeledIcon('audio')} 전체 재생</button>
        <button class="btn btn-outline" id="btnStopPlay" style="display:none" onclick="App._stopRoleplay()">정지</button>
        <button class="btn ${allReady ? 'btn-success' : 'btn-outline'}" onclick="App._completeRoleplay('${mod.id}')">${allReady ? '완료 ✓' : `말하기 ${readyCount}/${practiceLines.length}`}</button>
      </div>
    `;
  }

  function _beginRoleplayPractice() {
    if (!ctx.getFlow()?.roleplayState) return;
    _stopRoleplay();
    ctx.getFlow().roleplayState.phase = 'practice';
    _renderRoleplay(ctx.getMod(ctx.getFlow().moduleId));
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

  function _speakDialogueLine(lineId) {
    const all = typeof VOCAB_ITEMS_DIALOGUE !== 'undefined' ? VOCAB_ITEMS_DIALOGUE : [];
    const line = all.find(x => x.id === lineId);
    if (!line?.japanese) return;
    TTS.speak(stripFuri(line.japanese));
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
        phase: 'preview',
        practiceLines: _getRoleplayPracticeLines(dialogues),
        revealed: [],
        shadowDone: [],
        outputDone: []
      }
    });
    _renderRoleplay(mod);

    // 자동 재생
    setTimeout(() => _replayAll(mod.id), 450);
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
        elementId: `dl-line-${i}`,
        sourceIndex: i
      };
    });

    TTS.speakQueue(lines, {
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

  function showDialogueDetail(lineId) {
    if (!lineId) return;
    const all = typeof VOCAB_ITEMS_DIALOGUE !== 'undefined' ? VOCAB_ITEMS_DIALOGUE : [];
    const line = all.find(x => x.id === lineId);
    if (!line) return;

    closeDialogueDetail(false);

    const mod = ctx.getFlow()?.moduleId ? ctx.getMod(ctx.getFlow().moduleId) : null;
    const dialogues = ctx.getDialogue(mod?.roleplay?.dialogueKey);
    const clickedIndex = dialogues?.findIndex(d => d.id === lineId) ?? -1;
    const playback = _getRoleplayPlaybackState();
    const wasPlaying = !!(playback?.isPlaying || TTS.isQueueRunning?.());
    _dialogueDetailResume = wasPlaying && ctx.getFlow()?.moduleId
      ? {
          moduleId: ctx.getFlow().moduleId,
          lineIndex: playback?.currentLineIndex ?? Math.max(0, clickedIndex)
        }
      : null;

    // 팝업을 읽는 동안 현재 전체 재생은 멈춘다.
    TTS.stopQueue();
    const btnReplay = document.getElementById('btnReplayAll');
    const btnStop   = document.getElementById('btnStopPlay');
    if (btnReplay) btnReplay.style.display = '';
    if (btnStop)   btnStop.style.display   = 'none';
    if (playback) playback.isPlaying = false;
    document.querySelectorAll('.dialogue-line.playing')
            .forEach(el => el.classList.remove('playing'));

    // 상세 정보 파싱
    let breakdown = _parseBreakdown(line.japanese);
    const grammar   = _parseGrammar(line.japanese, line.korean);

    // [강력 조치] '문장 전체'라는 문구가 포함된 분석 결과는 무조건 제거
    breakdown = breakdown.filter(b => b.mean !== '문장 전체');

    const overlay = document.createElement('div');
    overlay.className = 'detail-overlay';
    overlay.id = 'detailOverlay';
    overlay.onclick = () => closeDialogueDetail(true);
    const sentenceText = stripFuri(line.japanese || '');

    overlay.innerHTML = `
      <div class="detail-popup" onclick="event.stopPropagation()">
        <button class="detail-close-btn" onclick="App.closeDialogueDetail()">✕</button>
        <div class="detail-header">
          <button class="detail-speak-card" onclick="TTS.speak('${ctx.jsString(sentenceText)}')" type="button">
            <span class="detail-speak-icon">${ctx.uiIconSvg('audio', 'detail-audio-icon')}</span>
            <span>
              <span class="detail-jap">${ruby(line.japanese)}</span>
              <span class="detail-kor">${escHtml(line.korean)}</span>
            </span>
          </button>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">단어별 분석</div>
          <div class="detail-breakdown">
            ${breakdown.length > 0 ? breakdown.map(b => `
              <button class="breakdown-item" onclick="TTS.speak('${ctx.jsString(stripFuri(b.word))}')" type="button">
                <div class="breakdown-word-group">
                  <span class="breakdown-pos-tag" data-pos="${b.pos}">${b.pos}</span>
                  <span class="breakdown-word">${ruby(b.word)}</span>
                </div>
                <span class="breakdown-meaning">${escHtml(b.mean)}</span>
              </button>
            `).join('') : '<div style="font-size:13px;color:var(--text3);padding:10px;text-align:center">매칭된 핵심 단어가 없습니다.</div>'}
          </div>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">핵심 포인트</div>
          <div class="detail-grammar-list">
            ${grammar.map(g => `
              <div class="grammar-item">
                <span class="grammar-tag">${escHtml(g.tag)}</span> ${escHtml(g.desc)}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="detail-actions">
          <button class="btn btn-replay-sent" onclick="TTS.speak('${ctx.jsString(sentenceText)}')">
            ${ctx.uiIconSvg('audio', 'btn-audio-icon')} 다시 듣기
          </button>
          <button class="btn btn-primary" onclick="App.closeDialogueDetail()">
            확인했어요
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
  }

  function closeDialogueDetail(shouldResume = true) {
    const overlay = document.getElementById('detailOverlay');
    if (overlay) overlay.remove();
    const resume = _dialogueDetailResume;
    _dialogueDetailResume = null;
    if (shouldResume !== false && resume?.moduleId) {
      setTimeout(() => _replayAll(resume.moduleId, resume.lineIndex), 160);
    }
  }

  function _parseBreakdown(jp) {
    if (!jp) return [];
    const cleanJp = stripFuri(jp);
    const allVocab = [
      ...(typeof VOCAB_ITEMS_W1W4 !== "undefined" ? VOCAB_ITEMS_W1W4 : []),
      ...(typeof VOCAB_ITEMS_W5W8 !== "undefined" ? VOCAB_ITEMS_W5W8 : []),
      ...(typeof VOCAB_ITEMS_W9W10 !== "undefined" ? VOCAB_ITEMS_W9W10 : []),
      ...(typeof VOCAB_ITEMS_S1S5 !== "undefined" ? VOCAB_ITEMS_S1S5 : []),
      ...(typeof VOCAB_ITEMS_S6SIM !== "undefined" ? VOCAB_ITEMS_S6SIM : []),
      ...(typeof VOCAB_ITEMS_DIALOGUE !== "undefined" ? VOCAB_ITEMS_DIALOGUE : []),
    ];
    const found = [];
    const seen = new Set();
    const getPos = (item) => {
      const cat = item.category || "";
      if (cat.includes("noun") || cat.includes("time") || cat.includes("place") || cat.includes("food")) return "명사";
      if (cat.includes("verb") || cat.includes("motion") || cat.includes("action")) return "동사";
      if (cat.includes("adj") || cat.includes("condition")) return "형용사";
      if (cat.includes("adv") || cat.includes("filler")) return "부사";
      return "단어";
    };
    const sortedDb = allVocab.filter(v => v.japanese && v.japanese.length > 1).sort((a,b) => b.japanese.length - a.japanese.length);
    for (const item of sortedDb) {
      const word = stripFuri(item.japanese);
      if (word.length < 2) continue;
      if (cleanJp.includes(word) && !seen.has(word)) {
        let isSubset = false;
        for (const f of found) { if (stripFuri(f.word).includes(word)) { isSubset = true; break; } }
        if (!isSubset) { found.push({ word: item.japanese, mean: item.korean, pos: getPos(item) }); seen.add(word); }
        if (found.length >= 6) break;
      }
    }
    const common = [
      { jp: "ます", mean: "합니다", pos: "어미" },
      { jp: "です", mean: "입니다", pos: "어미" },
      { jp: "ください", mean: "주세요", pos: "동사" }
    ];
    common.forEach(p => {
      if (cleanJp.includes(p.jp) && !seen.has(p.jp)) { found.push({ word: p.jp, mean: p.mean, pos: p.pos }); seen.add(p.jp); }
    });
    return found;
  }

  function _parseGrammar(jp, ko) {
    const points = [];
    const cleanJp = stripFuri(jp);

    // 1. 핵심 문법 패턴 감지
    if (cleanJp.includes("てください")) points.push({ tag: "요청", desc: "「~해 주세요」 상대방에게 동작을 부탁할 때 씁니다." });
    if (cleanJp.includes("いただけますか")) points.push({ tag: "공손", desc: "「~해 주실 수 있나요?」 매우 정중하고 격식 있는 부탁입니다." });
    if (cleanJp.includes("たいです")) points.push({ tag: "희망", desc: "「~하고 싶습니다」 본인의 의지나 소망을 나타냅니다." });
    if (cleanJp.includes("ましょう")) points.push({ tag: "권유", desc: "「~합시다 / ~할까요?」 제안이나 권유를 할 때 사용하는 표현입니다." });
    if (cleanJp.includes("ですか")) points.push({ tag: "의문", desc: "문장 끝에 붙여 질문을 만드는 표준적인 표현입니다." });
    if (cleanJp.includes("ながら")) points.push({ tag: "동시", desc: "「~하면서」 두 가지 행동을 함께 할 때 씁니다." });
    if (cleanJp.includes("なければなりません")) points.push({ tag: "의무", desc: "「~해야만 합니다」 꼭 필요한 상황이나 책임을 나타냅니다." });
    if (cleanJp.includes("ことがある")) points.push({ tag: "경험", desc: "「~한 적이 있다」 과거의 경험을 이야기할 때 씁니다." });

    // 2. 상황별 포인트
    if (cleanJp.includes("ありがとう") || cleanJp.includes("すみません")) points.push({ tag: "매너", desc: "감사나 사과 시에는 고개를 살짝 숙이는 예의를 갖추면 좋습니다." });
    if (cleanJp.includes("にございます") || cleanJp.includes("でございます")) points.push({ tag: "경어", desc: "비즈니스나 공식 안내에서 쓰이는 최고 수준의 정중한 표현입니다." });

    // 3. 패턴이 없을 때 보여줄 랜덤 팁 리스트
    if (points.length === 0) {
      const fallbacks = [
        { tag: "팁", desc: "후리가나를 확인하며 큰 소리로 3번만 따라 읽어보세요." },
        { tag: "매너", desc: "일본어는 문장 끝을 흐리지 않고 끝까지 발음하는 것이 정중하게 들립니다." },
        { tag: "학습", desc: "이 문장에 쓰인 핵심 단어를 [나의 단어장]에 추가해 복습해 보세요." },
        { tag: "발음", desc: "일본어의 [つ]나 [ざ] 발음은 한국어와 미세하게 다르니 주의해서 들어보세요." },
        { tag: "팁", desc: "자연스러운 억양을 위해 TTS(음성) 버튼을 눌러 리듬을 익혀보세요." }
      ];
      // 랜덤하게 하나 선택 (Math.random 사용)
      const randomIdx = Math.floor(Math.random() * fallbacks.length);
      points.push(fallbacks[randomIdx]);
    }
    return points;
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
    toggleReveal: _toggleRoleplayReveal,
    markShadow: _markRoleplayShadow,
    markOutput: _markRoleplayOutput,
    speakLine: _speakDialogueLine,
    startRoleplay: _startRoleplay,
    replayAll: _replayAll,
    stopRoleplay: _stopRoleplay,
    showDialogueDetail,
    closeDialogueDetail,
    completeRoleplay: _completeRoleplay,
  };
};
