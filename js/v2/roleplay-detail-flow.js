/* ============================================================
   Roleplay Detail Popup - sentence playback and analysis
   ============================================================ */

'use strict';

function createRoleplayDetailFlow(ctx) {
  let _dialogueDetailResume = null;

  function showDialogueDetail(lineId) {
    if (!lineId) return;
    const all = typeof VOCAB_ITEMS_DIALOGUE !== 'undefined' ? VOCAB_ITEMS_DIALOGUE : [];
    const line = all.find(x => x.id === lineId);
    if (!line) return;

    closeDialogueDetail(false);

    const mod = ctx.getFlow()?.moduleId ? ctx.getMod(ctx.getFlow().moduleId) : null;
    const dialogues = ctx.getDialogue(mod?.roleplay?.dialogueKey);
    const clickedIndex = dialogues?.findIndex(d => d.id === lineId) ?? -1;
    const playback = ctx.getPlaybackState();
    const wasPlaying = !!(playback?.isPlaying || TTS.isQueueRunning?.());
    _dialogueDetailResume = wasPlaying && ctx.getFlow()?.moduleId
      ? {
          moduleId: ctx.getFlow().moduleId,
          lineIndex: playback?.currentLineIndex ?? Math.max(0, clickedIndex)
        }
      : null;

    TTS.stopQueue();
    ctx.setRoleplayPlaying(false);
    document.querySelectorAll('.dialogue-line.playing')
            .forEach(el => el.classList.remove('playing'));

    let breakdown = _parseBreakdown(line.japanese);
    const grammar = _parseGrammar(line.japanese);
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
      setTimeout(() => ctx.replayAll(resume.moduleId, resume.lineIndex), 160);
    }
  }

  function _parseBreakdown(jp) {
    if (!jp) return [];
    const cleanJp = stripFuri(jp);
    const allVocab = [
      ...(typeof VOCAB_ITEMS_W1W4 !== 'undefined' ? VOCAB_ITEMS_W1W4 : []),
      ...(typeof VOCAB_ITEMS_W5W8 !== 'undefined' ? VOCAB_ITEMS_W5W8 : []),
      ...(typeof VOCAB_ITEMS_W9W10 !== 'undefined' ? VOCAB_ITEMS_W9W10 : []),
      ...(typeof VOCAB_ITEMS_S1S5 !== 'undefined' ? VOCAB_ITEMS_S1S5 : []),
      ...(typeof VOCAB_ITEMS_S6SIM !== 'undefined' ? VOCAB_ITEMS_S6SIM : []),
      ...(typeof VOCAB_ITEMS_DIALOGUE !== 'undefined' ? VOCAB_ITEMS_DIALOGUE : []),
    ];
    const found = [];
    const seen = new Set();
    const getPos = (item) => {
      const cat = item.category || '';
      if (cat.includes('noun') || cat.includes('time') || cat.includes('place') || cat.includes('food')) return '명사';
      if (cat.includes('verb') || cat.includes('motion') || cat.includes('action')) return '동사';
      if (cat.includes('adj') || cat.includes('condition')) return '형용사';
      if (cat.includes('adv') || cat.includes('filler')) return '부사';
      return '단어';
    };
    const sortedDb = allVocab
      .filter(v => v.japanese && v.japanese.length > 1)
      .sort((a, b) => b.japanese.length - a.japanese.length);
    for (const item of sortedDb) {
      const word = stripFuri(item.japanese);
      if (word.length < 2) continue;
      if (cleanJp.includes(word) && !seen.has(word)) {
        const isSubset = found.some(f => stripFuri(f.word).includes(word));
        if (!isSubset) {
          found.push({ word: item.japanese, mean: item.korean, pos: getPos(item) });
          seen.add(word);
        }
        if (found.length >= 6) break;
      }
    }
    [
      { jp: 'ます', mean: '합니다', pos: '어미' },
      { jp: 'です', mean: '입니다', pos: '어미' },
      { jp: 'ください', mean: '주세요', pos: '동사' }
    ].forEach(p => {
      if (cleanJp.includes(p.jp) && !seen.has(p.jp)) {
        found.push({ word: p.jp, mean: p.mean, pos: p.pos });
        seen.add(p.jp);
      }
    });
    return found;
  }

  function _parseGrammar(jp) {
    const points = [];
    const cleanJp = stripFuri(jp);

    if (cleanJp.includes('てください')) points.push({ tag: '요청', desc: '「~해 주세요」 상대방에게 동작을 부탁할 때 씁니다.' });
    if (cleanJp.includes('いただけますか')) points.push({ tag: '공손', desc: '「~해 주실 수 있나요?」 매우 정중하고 격식 있는 부탁입니다.' });
    if (cleanJp.includes('たいです')) points.push({ tag: '희망', desc: '「~하고 싶습니다」 본인의 의지나 소망을 나타냅니다.' });
    if (cleanJp.includes('ましょう')) points.push({ tag: '권유', desc: '「~합시다 / ~할까요?」 제안이나 권유를 할 때 사용하는 표현입니다.' });
    if (cleanJp.includes('ですか')) points.push({ tag: '의문', desc: '문장 끝에 붙여 질문을 만드는 표준적인 표현입니다.' });
    if (cleanJp.includes('ながら')) points.push({ tag: '동시', desc: '「~하면서」 두 가지 행동을 함께 할 때 씁니다.' });
    if (cleanJp.includes('なければなりません')) points.push({ tag: '의무', desc: '「~해야만 합니다」 꼭 필요한 상황이나 책임을 나타냅니다.' });
    if (cleanJp.includes('ことがある')) points.push({ tag: '경험', desc: '「~한 적이 있다」 과거의 경험을 이야기할 때 씁니다.' });
    if (cleanJp.includes('ありがとう') || cleanJp.includes('すみません')) points.push({ tag: '매너', desc: '감사나 사과 시에는 고개를 살짝 숙이는 예의를 갖추면 좋습니다.' });
    if (cleanJp.includes('にございます') || cleanJp.includes('でございます')) points.push({ tag: '경어', desc: '비즈니스나 공식 안내에서 쓰이는 최고 수준의 정중한 표현입니다.' });

    if (points.length === 0) {
      points.push({ tag: '발음', desc: 'TTS 버튼을 눌러 문장 끝까지의 리듬을 듣고, 같은 속도로 한 번 따라 읽어보세요.' });
    }
    return points;
  }

  return {
    showDialogueDetail,
    closeDialogueDetail,
  };
}
