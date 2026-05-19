/* ============================================================
   Kana Learn Flow
   ============================================================ */

'use strict';

function createKanaLearnFlow(deps = {}) {
  const getFlow = deps.getFlow || (() => null);
  const setFlowStep = deps.setFlowStep || (() => {});
  const runCurrentStep = deps.runCurrentStep || (() => {});
  const advanceStep = deps.advanceStep || (() => {});
  const uiIconSvg = deps.uiIconSvg || (() => '');
  const replayInlineStroke = deps.replayInlineStroke || (() => {});
  const startInlineStroke = deps.startInlineStroke || (() => {});
  const stopInlineStroke = deps.stopInlineStroke || (() => {});

  function isKanaBasicLevel(levelId) {
    return [1, 2, 3, 4, 8, 9, 10, 11].includes(levelId);
  }

  function isKanaReviewLevel(levelId) {
    return [5, 15, 16].includes(levelId);
  }

  function getKanaAllowedExampleChars(level) {
    if (!level) return null;
    if (level.type === 'hiragana' && level.id >= 1 && level.id <= 4) {
      return new Set(LEVELS.filter(l => l.type === 'hiragana' && l.id >= 1 && l.id <= level.id).flatMap(l => l.chars));
    }
    if (level.type === 'katakana' && level.id >= 8 && level.id <= 11) {
      return new Set(LEVELS.filter(l => l.type === 'katakana' && l.id >= 8 && l.id <= level.id).flatMap(l => l.chars));
    }
    return null;
  }

  function isBeginnerSafeKanaWord(word, allowedChars) {
    const clean = stripFuri(word || '');
    if (!clean || clean.length > 3) return false;
    if (/[っッゃゅょぁぃぅぇぉャュョァィゥェォー]/.test(clean)) return false;
    return Array.from(clean).every(ch => allowedChars?.has(ch));
  }

  function supportsKanaStrokePreview(kana) {
    return StrokeRenderer.supports(kana);
  }

  // 실제 KANA_MAP 예시 단어만 사용 — 가짜 글자 조합은 보여주지 않음
  // 배운 글자만으로 만들 수 있는 단어를 우선, 부족하면 전체에서 채움
  function getKanaExamplesForCard(char, level) {
    const info = KANA_MAP[char] || {};
    const allExamples = info.examples || [];
    if (!isKanaBasicLevel(level?.id)) return allExamples.slice(0, 3);
    const allowedChars = getKanaAllowedExampleChars(level);
    const filtered = allExamples.filter(ex => isBeginnerSafeKanaWord(ex.word, allowedChars));
    if (filtered.length >= 3) return filtered.slice(0, 3);
    // 모자라면 전체 예시에서 채움 (배운 글자 우선 + 그 외)
    const seen = new Set(filtered.map(ex => ex.word));
    const extra = allExamples.filter(ex => !seen.has(ex.word));
    return [...filtered, ...extra].slice(0, 3);
  }

  const kanaConfusionGroups = [
    ['あ','お'], ['き','さ'], ['ぬ','め'], ['れ','ね'], ['わ','れ'], ['は','ほ'], ['る','ろ'],
    ['ア','マ'], ['シ','ツ'], ['ソ','ン'], ['ク','ケ'], ['コ','ユ'], ['フ','ワ'], ['ヌ','メ']
  ];

  function getKanaDistractors(char, info, allChars, count = 3) {
    const confusionPool = kanaConfusionGroups
      .filter(group => group.includes(char))
      .flatMap(group => group.filter(item => item !== char));
    const sameTypePool = allChars.filter(k => k !== char && KANA_MAP[k].type === info.type);
    const merged = [...new Set([...confusionPool, ...shuffle(sameTypePool)])];
    return merged.slice(0, count);
  }

  function renderKanaLearn(mod, step, stepIndex) {
    const level = LEVELS.find(l => l.id === step.levelId);
    const chars = step.chars?.length ? step.chars : level?.chars;
    if (!chars?.length) { advanceStep(); return; }
    const levelType = step.kanaType || level?.type || 'hiragana';
    const flow = getFlow();

    flow._kanaState = {
      chars,
      level: level || { type: levelType },
      customLabel: step.customLabel || '',
      cardIdx: 0,
      flipped: false,
      stepIndex
    };

    function render() {
      const st = flow._kanaState;
      const c = st.chars[st.cardIdx];
      const safeC = c.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
      const info = KANA_MAP[c] || {};
      const canShowStroke = supportsKanaStrokePreview(c);
      const exItems = getKanaExamplesForCard(c, st.level);
      const examples = exItems.length
        ? exItems.map(ex => `
            <button class="kana-ex-row" onclick="event.stopPropagation();TTS.speak('${ex.word.replace(/'/g,"\\'")}')" type="button">
              <span class="kana-ex-word">${escHtml(ex.word)}</span>
              <span class="kana-ex-meaning">${escHtml(ex.meaning)}</span>
              <span class="kana-ex-icon">${uiIconSvg('audio', 'kana-ex-audio')}</span>
            </button>`).join('')
        : `<div class="kana-ex-empty">예시 단어 없음</div>`;

      const typeLabel = st.customLabel || st.level.type
        .replace('hiragana_dakuten','히라가나 탁음')
        .replace('hiragana_yoon','히라가나 요음')
        .replace('hiragana','히라가나')
        .replace('katakana_extended','확장 가타가나')
        .replace('katakana_dakuten','가타가나 탁음')
        .replace('katakana_yoon','가타가나 요음')
        .replace('katakana','가타가나')
        .replace('special','특수 박자')
        .replace('particle','조사 읽기')
        .replace('mixed_review','오늘의 복습');

      document.getElementById('flowBody').innerHTML = `
        <div class="kana-card-stack">
          <div style="font-size:12px;color:var(--text3);text-align:center;margin-bottom:12px">
            ${st.cardIdx + 1} / ${st.chars.length}
            <span style="margin:0 6px">·</span>
            <span style="color:var(--accent2)">${escHtml(typeLabel)}</span>
          </div>
          <div class="kana-card ${st.flipped ? 'flipped' : ''}" id="kanaCard" onclick="App._kanaSpeakCurrent()">
            <div class="kana-card-inner">
              <div class="kana-face">
                <div class="kana-type-label">${escHtml(typeLabel)}</div>
                <div class="kana-char ${isSmallKana(c) ? 'is-small' : ''}">${ruby(c)}</div>
              </div>
              <div class="kana-back">
                <!-- 헤더: 좌측 강사 얼굴 + 우측 기억법 -->
                <div class="kana-back-head">
                  <div class="kana-back-coach">
                    <img class="kana-back-coach-face"
                         src="/images/v3-cute/characters/variants/mayu-cafe_staff-default.webp"
                         alt="" aria-hidden="true">
                  </div>
                  ${info.tip ? `
                  <div class="kana-tip-main">
                    <div class="kana-tip-label">${uiIconSvg('sparkle', 'kana-tip-icon')} 기억법</div>
                    <div class="kana-tip-body">${ruby(info.tip)}</div>
                  </div>` : `
                  <div class="kana-tip-main kana-tip-empty">
                    <div class="kana-tip-label">${uiIconSvg('sparkle', 'kana-tip-icon')} 기억법</div>
                    <div class="kana-tip-body">소리 ${escHtml(info.romaji || '')} · ${escHtml(info.korean || '')}<br>한 줄 한 줄 따라 써 보세요.</div>
                  </div>`}
                </div>
                ${canShowStroke ? `
                <div class="kana-stroke-block">
                  <div class="kana-stroke-head">
                    <span class="kana-stroke-title">${escHtml(c)} 쓰는 법 <span class="kana-stroke-meta" id="kanaStrokeMeta"></span></span>
                    <div class="kana-stroke-actions">
                      <button class="kana-icon-btn" type="button"
                              onclick="event.stopPropagation();TTS.speak('${safeC}')"
                              aria-label="발음 듣기" title="발음 듣기">${uiIconSvg('audio', 'kana-icon-btn-svg')}</button>
                      <button class="kana-icon-btn" type="button"
                              onclick="event.stopPropagation();App._replayInlineStroke()"
                              aria-label="${escHtml(c)} 다시 써보기" title="${escHtml(c)} 다시 써보기">${uiIconSvg('replay', 'kana-icon-btn-svg')}</button>
                    </div>
                  </div>
                  <div class="kana-stroke-mini" id="kanaStrokeInline">
                    <div class="kana-stroke-loading">…</div>
                  </div>
                </div>` : `
                <div class="kana-stroke-block kana-stroke-large">
                  <div class="kana-stroke-large-char">${escHtml(c)}</div>
                </div>`}
                <div class="kana-examples-block">
                  <div class="kana-examples-title">예시 단어</div>
                  <div class="kana-examples">${examples}</div>
                </div>
              </div>
            </div>
          </div>
          <div style="display:flex;gap:3px;justify-content:center;margin-top:10px;flex-wrap:wrap;max-width:340px;padding:0 8px">
            ${st.chars.slice(0, 46).map((ch, i) => `
              <div style="width:7px;height:7px;border-radius:50%;flex-shrink:0;
                background:${i < st.cardIdx ? 'var(--success)' : i === st.cardIdx ? 'var(--accent)' : 'var(--bg3)'}">
              </div>`).join('')}
          </div>
        </div>
      `;

      const isLast = st.cardIdx === st.chars.length - 1;
      const prevChar = st.cardIdx > 0 ? st.chars[st.cardIdx - 1] : '';
      const nextChar = st.cardIdx < st.chars.length - 1 ? st.chars[st.cardIdx + 1] : '';
      // 앞면: 다음 = 카드 뒤집기 / 뒷면: 다음 = 다음 가나
      const prevLabel = st.cardIdx > 0
        ? prevChar
        : (st.flipped ? '앞면 보기' : '소개');
      const nextLabel = st.flipped
        ? (isLast ? '완료 ✓' : nextChar)
        : c;
      document.getElementById('flowFooter').innerHTML = `
        <div class="kana-nav">
          <button class="btn btn-outline kana-nav-btn" onclick="App._kanaLearnPrev()">
            <span class="kana-nav-arrow">←</span>
            <span class="kana-nav-label">${escHtml(prevLabel)}</span>
          </button>
          <button class="btn btn-primary kana-nav-btn kana-nav-btn-next" onclick="App._kanaLearnNext()">
            <span class="kana-nav-label">${escHtml(nextLabel)}</span>
            <span class="kana-nav-arrow">→</span>
          </button>
        </div>
      `;
    }

    flow._kanaRender = render;
    render();
    TTS.speak(chars[0]);
  }

  function flipKana() {
    // 호환 유지 — 외부에서 호출 가능 (예: 카드 강제 뒤집기)
    const flow = getFlow();
    if (!flow?._kanaState) return;
    const st = flow._kanaState;
    st.flipped = !st.flipped;
    const card = document.getElementById('kanaCard');
    if (!card) return;
    if (st.flipped) {
      card.classList.add('flipped');
      if (supportsKanaStrokePreview(st.chars[st.cardIdx])) {
        setTimeout(() => startInlineStroke(st.chars[st.cardIdx]), 520);
      }
    } else {
      card.classList.remove('flipped');
      stopInlineStroke();
    }
    // 푸터 라벨도 갱신
    if (typeof flow._kanaRender === 'function') flow._kanaRender();
  }

  // 카드 탭 = 현재 가나 발음만 재생
  function kanaSpeakCurrent() {
    const flow = getFlow();
    const st = flow?._kanaState;
    if (!st) return;
    TTS.speak(st.chars[st.cardIdx]);
  }

  // 다음 버튼: 앞면이면 뒤집기, 뒷면이면 다음 카드로
  function kanaLearnNext() {
    const flow = getFlow();
    const st = flow?._kanaState;
    if (!st) return;
    if (!st.flipped) {
      flipKana();
      return;
    }
    // 뒷면 → 다음 카드
    stopInlineStroke();
    st.flipped = false;
    if (st.cardIdx < st.chars.length - 1) {
      st.cardIdx++;
      flow._kanaRender();
      TTS.speak(st.chars[st.cardIdx]);
    } else {
      Store.completeStep(flow.moduleId, st.stepIndex);
      Store.addXP(50);
      setFlowStep(st.stepIndex + 1);
      runCurrentStep();
    }
  }

  // 이전 버튼: 뒷면에서도 이전 글자의 쓰기 가이드로 바로 이동
  function kanaLearnPrev() {
    const flow = getFlow();
    const st = flow?._kanaState;
    if (!st) return;
    if (st.flipped && st.cardIdx === 0) {
      flipKana();
      return;
    }
    if (st.cardIdx === 0) {
      ctx.returnToModuleIntro?.();
      return;
    }
    stopInlineStroke();
    st.cardIdx--;
    const keepGuideOpen = st.flipped;
    st.flipped = keepGuideOpen;
    flow._kanaRender();
    if (keepGuideOpen && supportsKanaStrokePreview(st.chars[st.cardIdx])) {
      setTimeout(() => startInlineStroke(st.chars[st.cardIdx]), 80);
    }
    TTS.speak(st.chars[st.cardIdx]);
  }

  function kanaSpeak(char) {
    TTS.speak(char);
  }

  return {
    renderKanaLearn,
    flipKana,
    kanaSpeakCurrent,
    kanaLearnNext,
    kanaLearnPrev,
    kanaSpeak,
    isKanaReviewLevel,
    getKanaDistractors,
  };
}
