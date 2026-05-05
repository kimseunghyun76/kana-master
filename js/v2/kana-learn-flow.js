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

  function getKanaPatternExamples(char, allowedChars, existingWords = []) {
    if (!allowedChars?.size) return [];
    const isKatakana = /[ァ-ヺ]/.test(char);
    const vowels = (isKatakana
      ? ['ア', 'イ', 'ウ', 'エ', 'オ']
      : ['あ', 'い', 'う', 'え', 'お']).filter(v => allowedChars.has(v));
    const partners = Array.from(allowedChars).filter(ch => !['ん', 'ン', 'を', 'ヲ'].includes(ch) && ch !== char);
    const candidates = [];

    if (char === 'を' || char === 'ヲ') {
      candidates.push(char);
    } else if (char === 'ん' || char === 'ン') {
      partners.slice(0, 4).forEach(p => candidates.push(`${p}${char}`));
    } else {
      vowels.filter(v => v !== char).forEach(v => {
        candidates.push(`${char}${v}`);
        candidates.push(`${v}${char}`);
      });
      partners.slice(0, 4).forEach(p => {
        candidates.push(`${char}${p}`);
        candidates.push(`${p}${char}`);
      });
    }

    const used = new Set(existingWords.map(word => stripFuri(word)));
    return [...new Set(candidates)]
      .filter(word => word && word.length <= 3 && !used.has(word))
      .slice(0, 3)
      .map(word => ({ word, meaning: '배운 글자 조합' }));
  }

  function getKanaExamplesForCard(char, level) {
    const info = KANA_MAP[char] || {};
    const allExamples = info.examples || [];
    if (!isKanaBasicLevel(level?.id)) return allExamples.slice(0, 3);
    const allowedChars = getKanaAllowedExampleChars(level);
    const filtered = allExamples.filter(ex => isBeginnerSafeKanaWord(ex.word, allowedChars));
    const generated = getKanaPatternExamples(char, allowedChars, filtered.map(ex => ex.word));
    const merged = [...filtered, ...generated];
    return (merged.length ? merged : allExamples.slice(0, 2)).slice(0, 3);
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
      const examples = getKanaExamplesForCard(c, st.level)
        .map(ex => `<div class="kana-ex-pill">
          <span class="ex-word">${escHtml(ex.word)}</span>
          <span style="color:var(--text3)"> — </span>${escHtml(ex.meaning)}
        </div>`).join('');

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
          <div class="kana-card ${st.flipped ? 'flipped' : ''}" id="kanaCard" onclick="App._flipKana()">
            <div class="kana-card-inner">
              <div class="kana-face">
                <button class="kana-sound-btn" onclick="event.stopPropagation();TTS.speak('${safeC}')" title="발음 듣기">${uiIconSvg('audio', 'kana-sound-icon')}</button>
                <div class="kana-type-label">${escHtml(typeLabel)}</div>
                <div class="kana-char ${isSmallKana(c) ? 'is-small' : ''}">${ruby(c)}</div>
                <div class="kana-tap-hint">탭해서 읽는 법 보기 👆</div>
              </div>
              <div class="kana-back">
                <div class="kana-reading-row">
                  <button class="kana-back-sound"
                          onclick="event.stopPropagation();TTS.speak('${safeC}')">${uiIconSvg('audio', 'kana-back-sound-icon')}</button>
                  <span class="kana-romaji-sm">${escHtml(info.romaji || '')}</span>
                  <span class="kana-reading-dot">·</span>
                  <span class="kana-korean-sm">${escHtml(info.korean || '')}</span>
                </div>
                ${info.tip ? `
                <div class="kana-tip-main">
                  <div class="kana-tip-label">${uiIconSvg('sparkle', 'kana-tip-icon')} 기억법</div>
                  <div class="kana-tip-body">${ruby(info.tip)}</div>
                </div>` : ''}
                ${canShowStroke ? `
                <div class="kana-stroke-row">
                  <div class="kana-stroke-mini" id="kanaStrokeInline">
                    <div class="kana-stroke-loading">…</div>
                  </div>
                  <button class="kana-stroke-replay-btn"
                          onclick="event.stopPropagation();App._replayInlineStroke()"
                          title="다시 그리기">🔄</button>
                </div>` : ''}
                <div class="kana-examples">${examples}</div>
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
      document.getElementById('flowFooter').innerHTML = `
        <div style="display:flex;gap:10px">
          <button class="btn btn-outline" onclick="App._kanaLearnPrev()"
                  style="flex:1" ${st.cardIdx === 0 ? 'disabled' : ''}>← 이전</button>
          <button class="btn btn-primary" onclick="App._kanaLearnNext()" style="flex:2">
            ${isLast ? '완료 ✓' : '다음 →'}
          </button>
        </div>
      `;
    }

    flow._kanaRender = render;
    render();
    TTS.speak(chars[0]);
  }

  function flipKana() {
    const flow = getFlow();
    if (!flow?._kanaState) return;
    const st = flow._kanaState;
    st.flipped = !st.flipped;
    const card = document.getElementById('kanaCard');
    if (!card) return;
    if (st.flipped) {
      card.classList.add('flipped');
      TTS.speak(st.chars[st.cardIdx]);
      if (supportsKanaStrokePreview(st.chars[st.cardIdx])) {
        setTimeout(() => startInlineStroke(st.chars[st.cardIdx]), 520);
      }
    } else {
      card.classList.remove('flipped');
      stopInlineStroke();
    }
  }

  function kanaLearnNext() {
    stopInlineStroke();
    const flow = getFlow();
    const st = flow?._kanaState;
    if (!st) return;
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

  function kanaLearnPrev() {
    stopInlineStroke();
    const flow = getFlow();
    const st = flow?._kanaState;
    if (!st || st.cardIdx === 0) return;
    st.cardIdx--;
    st.flipped = false;
    flow._kanaRender();
  }

  function kanaSpeak(char) {
    TTS.speak(char);
  }

  return {
    renderKanaLearn,
    flipKana,
    kanaLearnNext,
    kanaLearnPrev,
    kanaSpeak,
    isKanaReviewLevel,
    getKanaDistractors,
  };
}
