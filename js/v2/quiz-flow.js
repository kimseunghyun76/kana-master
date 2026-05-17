/* ============================================================
   Quiz Flow - kana, listening, vocab quiz screens
   ============================================================ */

'use strict';

window.createQuizFlow = (ctx) => {
  let _autoNextTimer = null;
  const _resultFlow = createQuizResultFlow(ctx);
  const VOCAB_QUIZ_MODES = ['jpToKo', 'koToJp', 'listen'];

  // ── Kana Quiz ─────────────────────────────────────────────
  function _renderKanaQuiz(mod, step, stepIndex) {
    ctx.setFlowBodyMode('');
    const level = LEVELS.find(l => l.id === step.levelId);
    const sourceChars = step.chars?.length ? step.chars : level?.chars;
    if (!sourceChars?.length) { ctx.advanceStep(); return; }
    const flow = ctx.getFlow();
    const introKey = `${flow.moduleId}:${stepIndex}:kana`;
    if (flow._kanaQuizIntroKey !== introKey) {
      flow._pendingKanaQuiz = { mod, step, stepIndex };
      _renderKanaQuizReviewIntro(mod, step, stepIndex, sourceChars, level);
      return;
    }
    ctx.setFlowBodyMode('quiz-mode');
    const maxQuestions = Math.min(5, sourceChars.length);
    const chars = shuffle(sourceChars).slice(0, maxQuestions);

    // renderQ는 반드시 ctx.getFlow()._kanaQuiz에서 읽어야 다음 문제로 넘어감 (클로저 버그 방지)
    function renderQ() {
      const fq = ctx.getFlow()._kanaQuiz;
      if (!fq) return;
      const { qIdx, correct, wrong } = fq;

      if (qIdx >= fq.chars.length) {
        // [Retry Logic] 틀린 문제가 있으면 다시 풀기 페이즈로 전환 (단, 최종 점수는 첫 시도 기준)
        if (!fq.isReview && fq.missed.length > 0) {
          fq.isReview = true;
          fq.originalChars = fq.chars; // 원래 문제들 보관 (혹시 필요할까봐)
          fq.chars = shuffle([...fq.missed]);
          fq.qIdx = 0;
          _resultFlow.showRetryTransition(fq.missed.length, fq.renderQ);
          return;
        }
        _resultFlow.showQuizResult(correct, fq.totalCount, stepIndex, Math.round((correct / fq.totalCount) * 100));
        return;
      }
      const c = fq.chars[qIdx];
      const info = KANA_MAP[c] || {};
      // Build choices: 1 correct + 3 random distractors
      const allChars = Object.keys(KANA_MAP).filter(k => k !== c && KANA_MAP[k].type === info.type);
      const distractors = ctx.getKanaDistractors(c, info, allChars, 3)
        .map(k => ({ kana: k, korean: KANA_MAP[k].korean, romaji: KANA_MAP[k].romaji }));
      const choices = shuffle([
        { kana: c, korean: info.korean, romaji: info.romaji, correct: true },
        ...distractors.map(d => ({ ...d, correct: false }))
      ]);

      const pct = Math.round((qIdx / fq.chars.length) * 100);
      ctx.updateFlowProgress(stepIndex, mod.steps.length, step.title);
      document.getElementById('flowProgressFill').style.width = pct + '%';

      document.getElementById('flowBody').innerHTML = `
        ${ctx.renderQuizHud(qIdx + 1, fq.chars.length, correct, wrong)}
        <div class="quiz-question">
          <div class="quiz-q-type">이 글자의 발음은?</div>
          <div class="quiz-q-text ${isSmallKana(c) ? 'is-small' : ''}">${ruby(c)}</div>
          <button class="quiz-audio-btn" onclick="TTS.speak('${c.replace(/'/g,"\\'")}')">${ctx.uiLabeledIcon('audio', 'quiz-audio-icon')} 발음 듣기</button>
        </div>
        <div class="quiz-choices" id="quizChoices">
          ${choices.map((ch, i) => `
            <button class="quiz-choice" data-correct="${ch.correct}"
                    onclick="App._kanaQuizAnswer(this, ${ch.correct})">
              <span class="qc-label">${['A','B','C','D'][i]}</span>
              <span>${escHtml(ch.romaji)} · ${escHtml(ch.korean)}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quizFeedback"></div>
      `;
      document.getElementById('flowFooter').innerHTML = `
        <button class="btn btn-primary hidden" id="btnNextQ" onclick="App._kanaQuizNext()">
          다음 →
        </button>
      `;
    }

    ctx.getFlow()._kanaQuiz = {
      chars,
      qIdx: 0,
      correct: 0,
      wrong: 0,
      missed: [],
      isReview: false,
      totalCount: chars.length,
      attempts: {},
      stepIndex,
      renderQ
    };
    renderQ();
  }

  function _renderKanaQuizReviewIntro(mod, step, stepIndex, chars, level) {
    const typeLabel = (step.title || level?.name || '가나 퀴즈').replace(/^[🎯📝\s]+/, '');
    ctx.updateFlowProgress(stepIndex, mod.steps.length, step.title);
    document.getElementById('flowBody').innerHTML = `
      <div class="kana-quiz-primer">
        <div class="kana-quiz-primer-head">
          <div>
            <div class="kana-quiz-primer-kicker">퀴즈 전 30초 복습</div>
            <div class="kana-quiz-primer-title">${escHtml(typeLabel)}</div>
          </div>
          <div class="kana-quiz-primer-count">${chars.length}자</div>
        </div>
        <div class="kana-quiz-primer-grid">
          ${chars.map(ch => {
            const info = KANA_MAP[ch] || {};
            const safe = ch.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
            return `
              <button class="kana-quiz-primer-card" type="button" onclick="TTS.speak('${safe}')">
                <span class="kana-quiz-primer-char ${isSmallKana(ch) ? 'is-small' : ''}">${ruby(ch)}</span>
                <span class="kana-quiz-primer-reading">${escHtml(info.romaji || '')}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = `
      <button class="btn btn-primary" onclick="App._startKanaQuizFromPrimer()">
        퀴즈 시작 →
      </button>
    `;
  }

  function _startKanaQuizFromPrimer() {
    const flow = ctx.getFlow();
    const pending = flow?._pendingKanaQuiz;
    if (!flow || !pending) return;
    flow._kanaQuizIntroKey = `${flow.moduleId}:${pending.stepIndex}:kana`;
    delete flow._pendingKanaQuiz;
    _renderKanaQuiz(pending.mod, pending.step, pending.stepIndex);
  }

  function _kanaQuizAnswer(btn, isCorrect) {
    const fq = ctx.getFlow()._kanaQuiz;
    if (!fq) return;
    const c = fq.chars[fq.qIdx];
    const info = KANA_MAP[c] || {};
    const key = String(fq.qIdx);
    const attempt = fq.attempts[key] || 0;
    if (isCorrect) {
      fq.correct++;
    } else {
      btn.classList.add('wrong');
      btn.disabled = true;
      fq.attempts[key] = attempt + 1;
      Store.reviewKanaItem(c, 'again');
      TTS.speak(c);
      ctx.playQuizEffect(false);
      const fb = document.getElementById('quizFeedback');
      if (fb && attempt === 0) {
        fb.className = 'quiz-feedback show wrong';
        fb.innerHTML = `${ctx.uiIconSvg('target', 'quiz-feedback-icon')} <span>한 번 더 볼게요. 힌트: <strong>${escHtml(info.romaji || '')}</strong> 소리와 가까운 선택지를 찾아보세요.</span>`;
      }
      if (attempt === 0) return;
      fq.wrong++;
      // 첫 풀이(not review)에서만 오답 목록에 추가
      if (!fq.isReview) fq.missed.push(c);
    }
    document.querySelectorAll('.quiz-choice').forEach(b => {
      b.classList.add('answered');
      b.onclick = null;
      b.disabled = true;
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    Store.reviewKanaItem(c, isCorrect ? 'good' : 'again');
    // 정답·오답 모두 음성 재생
    TTS.speak(c);
    ctx.playQuizEffect(isCorrect);

    const fb = document.getElementById('quizFeedback');
    if (fb) {
      fb.className = `quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
      fb.innerHTML = isCorrect
        ? `${ctx.uiIconSvg('check', 'quiz-feedback-icon')} <span>좋아요. <strong>${escHtml(c)}</strong> = ${escHtml(info.romaji)} (${escHtml(info.korean)})</span>`
        : `${ctx.uiIconSvg('close', 'quiz-feedback-icon')} <span>여기서 정답은 <strong>${escHtml(c)}</strong> = ${escHtml(info.romaji)} (${escHtml(info.korean)})예요.</span>`;
    }
    const btnNext = document.getElementById('btnNextQ');
    show(btnNext);
    if (isCorrect) {
      clearTimeout(_autoNextTimer);
      _autoNextTimer = setTimeout(() => {
        const btn = document.getElementById('btnNextQ');
        if (btn && !btn.classList.contains('hidden')) _kanaQuizNext();
      }, 250);
    } else {
      if (btnNext) btnNext.innerHTML = '다음 →';
    }
  }

  function _kanaQuizNext() {
    clearTimeout(_autoNextTimer);
    const btn = document.getElementById('btnNextQ');
    if (btn) btn.innerHTML = '다음 →';
    const fq = ctx.getFlow()._kanaQuiz;
    if (!fq) return;
    fq.qIdx++;
    fq.renderQ();
  }

  // ── Kana Listening Quiz ───────────────────────────────────
  function _renderKanaListening(mod, step, stepIndex) {
    ctx.setFlowBodyMode('quiz-mode');
    const chars = shuffle(step.chars || Object.keys(KANA_MAP)).slice(0, Math.min(5, step.limit || 5));

    function renderQ() {
      const fq = ctx.getFlow()._listeningQuiz;
      if (!fq) return;
      const { qIdx, correct, wrong } = fq;

      if (qIdx >= fq.chars.length) {
        if (!fq.isReview && fq.missed.length > 0) {
          fq.isReview = true;
          fq.originalChars = fq.chars;
          fq.chars = shuffle([...fq.missed]);
          fq.qIdx = 0;
          _resultFlow.showRetryTransition(fq.missed.length, fq.renderQ);
          return;
        }
        _resultFlow.showQuizResult(correct, fq.totalCount, stepIndex,
          Math.round((correct / fq.totalCount) * 100));
        return;
      }

      const c = fq.chars[qIdx];
      const info = KANA_MAP[c] || {};
      // 같은 타입의 글자 3개를 오답 선지로
      const pool = Object.keys(KANA_MAP).filter(k => k !== c && KANA_MAP[k]?.type === info.type);
      const choices = shuffle([c, ...sample(pool, 3)]);

      const pct = Math.round((qIdx / fq.chars.length) * 100);
      ctx.updateFlowProgress(stepIndex, mod.steps.length, step.title);
      document.getElementById('flowProgressFill').style.width = pct + '%';

      const safeC = c.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      document.getElementById('flowBody').innerHTML = `
        ${ctx.renderQuizHud(qIdx + 1, fq.chars.length, correct, wrong)}
        <div class="quiz-question">
          <div class="quiz-q-type">이 음성의 글자는?</div>
          <div class="quiz-q-text" style="font-size:64px;line-height:1.1">${ctx.uiIconSvg('headphones', 'quiz-listening-icon')}</div>
          <button class="quiz-audio-btn" id="btnPlayAudio"
                  onclick="TTS.speak('${safeC}')">${ctx.uiLabeledIcon('audio', 'quiz-audio-icon')} 다시 듣기</button>
        </div>
        <div class="quiz-choices">
          ${choices.map((ch, i) => `
            <button class="quiz-choice" data-correct="${ch === c}"
                    onclick="App._listeningQuizAnswer(this, ${ch === c}, '${safeC}')">
              <span class="qc-label">${['A','B','C','D'][i]}</span>
              <span style="font-size:22px;font-weight:700">${escHtml(ch)}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quizFeedback"></div>
      `;
      document.getElementById('flowFooter').innerHTML = `
        <button class="btn btn-primary hidden" id="btnNextQ" onclick="App._listeningQuizNext()">
          다음 →
        </button>
      `;

      // 자동 재생 (300ms 딜레이)
      setTimeout(() => TTS.speak(c), 300);
    }

    ctx.getFlow()._listeningQuiz = {
      chars,
      qIdx: 0,
      correct: 0,
      wrong: 0,
      missed: [],
      isReview: false,
      totalCount: chars.length,
      attempts: {},
      stepIndex,
      renderQ
    };
    renderQ();
  }

  function _listeningQuizAnswer(btn, isCorrect, correctChar) {
    const fq = ctx.getFlow()._listeningQuiz;
    if (!fq) return;
    const info = KANA_MAP[correctChar] || {};
    const key = String(fq.qIdx);
    const attempt = fq.attempts[key] || 0;
    if (isCorrect) {
      fq.correct++;
    } else {
      btn.classList.add('wrong');
      btn.disabled = true;
      fq.attempts[key] = attempt + 1;
      Store.reviewKanaItem(correctChar, 'again');
      TTS.speak(correctChar);
      ctx.playQuizEffect(false);
      const fb = document.getElementById('quizFeedback');
      if (fb && attempt === 0) {
        fb.className = 'quiz-feedback show wrong';
        fb.innerHTML = `${ctx.uiIconSvg('audio', 'quiz-feedback-icon')} <span>다시 들어보세요. 힌트: <strong>${escHtml(info.romaji || '')}</strong>에 가까운 글자입니다.</span>`;
      }
      if (attempt === 0) return;
      fq.wrong++;
      if (!fq.isReview) fq.missed.push(fq.chars[fq.qIdx]);
    }
    document.querySelectorAll('.quiz-choice').forEach(b => {
      b.classList.add('answered');
      b.onclick = null;
      b.disabled = true;
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    Store.reviewKanaItem(correctChar, isCorrect ? 'good' : 'again');
    TTS.speak(correctChar);
    ctx.playQuizEffect(isCorrect);

    const fb = document.getElementById('quizFeedback');
    if (fb) {
      fb.className = `quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
      fb.innerHTML = isCorrect
        ? `${ctx.uiIconSvg('check', 'quiz-feedback-icon')} <span>맞았어요. <strong>${escHtml(correctChar)}</strong> = ${escHtml(info.romaji)} (${escHtml(info.korean)})</span>`
        : `${ctx.uiIconSvg('close', 'quiz-feedback-icon')} <span>정답은 <strong>${escHtml(correctChar)}</strong> = ${escHtml(info.romaji)} (${escHtml(info.korean)})예요.</span>`;
    }
    const btnNext = document.getElementById('btnNextQ');
    show(btnNext);
    if (isCorrect) {
      clearTimeout(_autoNextTimer);
      _autoNextTimer = setTimeout(() => {
        const btn = document.getElementById('btnNextQ');
        if (btn && !btn.classList.contains('hidden')) _listeningQuizNext();
      }, 250);
    } else {
      if (btnNext) btnNext.innerHTML = '다음 →';
    }
  }

  function _listeningQuizNext() {
    clearTimeout(_autoNextTimer);
    const btn = document.getElementById('btnNextQ');
    if (btn) btn.innerHTML = '다음 →';
    const fq = ctx.getFlow()._listeningQuiz;
    if (!fq) return;
    fq.qIdx++;
    fq.renderQ();
  }

  // ── Shadowing Practice ───────────────────────────────────
  function _renderShadowing(mod, step, stepIndex) {
    ctx.setFlowBodyMode('speaking-mode');
    const items = step.items || [];
    if (!items.length) { ctx.showPracticeComplete(mod); return; }

    function renderItem() {
      const sh = ctx.getFlow()._shadowing;
      if (!sh) return;
      const { items: its, idx } = sh;

      if (idx >= its.length) {
        ctx.showPracticeComplete(mod);
        return;
      }

      const item = its[idx];
      const showFuri = Store.getSetting('furigana');
      const jpHtml = showFuri ? formatJp(item) : escHtml(stripFuri(item.kanji || item.japanese || ''));
      const jpText = item.japanese || item.kanji || '';
      const safeJp = jpText.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
      const pct = Math.round((idx / its.length) * 100);

      ctx.updateFlowProgress(stepIndex, mod.steps.length, step.title);
      document.getElementById('flowProgressFill').style.width = pct + '%';

      document.getElementById('flowBody').innerHTML = `
        <div class="shadowing-screen">
          <div class="shadowing-top">
            <div class="shadowing-count">${idx + 1}<span>/ ${its.length}</span></div>
            <div class="shadowing-progress">
              <div class="shadowing-progress-fill" style="width:${pct}%"></div>
            </div>
          </div>
          <div class="shadowing-card">
            <div class="shadowing-step-row">
              <span class="shadowing-step active">${ctx.uiIconSvg('audio', 'shadowing-step-icon')}듣기</span>
              <span class="shadowing-step">${ctx.uiIconSvg('mic', 'shadowing-step-icon')}따라 말하기</span>
            </div>
            <div class="shadowing-jp">${jpHtml}</div>
            <div class="shadowing-ko">${escHtml(item.korean || '')}</div>
            <button class="shadowing-audio-btn" onclick="TTS.speak('${safeJp}')">
              ${ctx.uiIconSvg('audio', 'shadowing-audio-icon')} 다시 듣기
            </button>
          </div>
          <div class="shadowing-note">
            음성을 듣고 같은 리듬으로 한 번 말한 뒤 완료하세요.
          </div>
        </div>
      `;

      document.getElementById('flowFooter').innerHTML = `
        <button class="btn btn-primary" onclick="App._shadowingNext()" style="font-size:15px">
          ${ctx.uiLabeledIcon('voice')} 따라 말했어요 →
        </button>
      `;

      // 자동 재생
      setTimeout(() => TTS.speak(jpText), 300);
    }

    ctx.getFlow()._shadowing = { items, idx: 0, stepIndex, renderItem };
    renderItem();
  }

  function _shadowingNext() {
    const sh = ctx.getFlow()._shadowing;
    if (!sh) return;
    sh.idx++;
    sh.renderItem();
  }

  // ── Vocab Learn ───────────────────────────────────────────
  function _renderVocabLearn(mod, step, stepIndex) {
    const items = ctx.getVocabItems(step);
    if (!items.length) { Store.completeStep(ctx.getFlow().moduleId, stepIndex); ctx.advanceStep(); return; }

    // Store ALL state on ctx.getFlow()._vocab so render() always reads fresh values
    ctx.getFlow()._vocab = { items, idx: 0, showMeaning: false, stepIndex, mod, step };

    _vocabRender();
  }

  function _vocabRender() {
    const st = ctx.getFlow()._vocab;
    if (!st) return;

    const { items, idx, showMeaning, stepIndex, mod, step } = st;

    if (idx >= items.length) {
      Store.completeStep(ctx.getFlow().moduleId, stepIndex);
      Store.addXP(30 + items.length * 2);
      ctx.getFlow().step = stepIndex + 1;
      ctx.runCurrentStep();
      return;
    }

    const item = items[idx];
    const showFuri = Store.getSetting('furigana');
    const jpHtml = showFuri ? formatJp(item) : escHtml(stripFuri(item.kanji || item.japanese || ''));
    // 글자수 기반 자동 축소용 (긴 단어 잘림 방지)
    const visualText = stripFuri(item.kanji || item.japanese || '');
    const charLen = Math.max(1, Array.from(visualText).length);
    const exampleText = item.example || '';
    const tipText = item.tip || '';
    const coachKeys = ['nanami', 'aoi', 'mayu', 'keita'];
    const coachKey = coachKeys[idx % coachKeys.length];
    st.coachKey = coachKey;

    ctx.updateFlowProgress(stepIndex, mod.steps.length, step.title);
    document.getElementById('flowBody').innerHTML = `
      <div class="vc-stack">
        <div style="font-size:12px;color:var(--text3);text-align:center;margin-bottom:10px">
          ${idx + 1} / ${items.length}
        </div>
        <div class="vc-flip-card ${showMeaning ? 'flipped' : ''}" id="vcCard"
             onclick="App._vocabSpeak()" style="--vc-len:${charLen}">
          <div class="vc-card-inner">
            <div class="vc-face">
              <div class="vc-type-label">어휘</div>
              <div class="vc-jp">${jpHtml}</div>
            </div>
            <div class="vc-back">
              <div class="vc-back-head">
                <div class="vc-back-jp">${jpHtml}</div>
                <div class="vc-back-meaning">${escHtml(item.korean || '')}</div>
                ${item.english ? `<div class="vc-back-english">${escHtml(item.english)}</div>` : ''}
              </div>
              ${(tipText || exampleText) ? `
              <div class="vc-tip-panel">
                <div class="vc-tip-label">TIP</div>
                <div class="vc-tip-content">
                  ${tipText ? `<div class="vc-explain-body">${ruby(tipText)}</div>` : ''}
                  ${exampleText ? `
                  <div class="vc-ex-block compact">
                    <div class="vc-ex-label">예시</div>
                    <div class="vc-ex-body">${ruby(exampleText)}</div>
                  </div>` : ''}
                </div>
              </div>` : ''}
            </div>
          </div>
        </div>
        <div class="vocab-nav">
          <button class="vocab-nav-btn" onclick="App._vocabPrev()">←</button>
          <div class="vocab-nav-dots">
            ${items.slice(0, 20).map((_,i) =>
              `<div class="vocab-nav-dot ${i===idx?'active':i<idx?'done':''}"></div>`).join('')}
          </div>
          <button class="vocab-nav-btn" onclick="App._vocabNext()">→</button>
        </div>
      </div>
    `;

    _vocabUpdateFooter();
    TTS.speak(item.japanese || '', { voice: coachKey });
  }

  function _vocabSpeak() {
    const st = ctx.getFlow()._vocab;
    if (!st || !st.items[st.idx]) return;
    TTS.speak(stripFuri(st.items[st.idx].japanese), { voice: st.coachKey });
  }

  function _vocabFlip() {
    if (!ctx.getFlow()._vocab) return;
    ctx.getFlow()._vocab.showMeaning = true;
    // 카드는 클래스만 토글 (재렌더 시 애니메이션이 끊김)
    const card = document.getElementById('vcCard');
    if (card) card.classList.add('flipped');
    // 푸터만 갱신 — self-eval 버튼으로 교체
    _vocabUpdateFooter();
  }

  function _vocabUpdateFooter() {
    const st = ctx.getFlow()._vocab;
    if (!st) return;
    const footer = document.getElementById('flowFooter');
    if (!footer) return;
    if (st.showMeaning) {
      footer.innerHTML = `
        <div class="vocab-footer-nav">
          <button class="btn btn-outline" onclick="App._vocabPrev()">← ${st.idx === 0 ? '소개' : '이전'}</button>
          <button class="btn btn-primary" onclick="App._vocabNext()">다음 →</button>
        </div>
      `;
    } else {
      footer.innerHTML = `
        <button class="btn btn-outline" onclick="App._vocabFlip()">의미 확인하기</button>
      `;
    }
  }

  function _vocabNext() {
    if (!ctx.getFlow()._vocab) return;
    const st = ctx.getFlow()._vocab;
    const item = st.items[st.idx];
    if (item?.id) Store.reviewVocabItem(item.id, st.showMeaning ? 'good' : 'again');
    st.showMeaning = false;
    if (st.idx < st.items.length - 1) {
      st.idx++;
      _vocabRender();
    } else {
      Store.completeStep(ctx.getFlow().moduleId, st.stepIndex);
      Store.addXP(30 + st.items.length * 2);
      ctx.getFlow().step = st.stepIndex + 1;
      ctx.runCurrentStep();
    }
  }

  function _vocabPrev() {
    if (!ctx.getFlow()._vocab) return;
    if (ctx.getFlow()._vocab.idx === 0) {
      ctx.returnToModuleIntro?.();
      return;
    }
    ctx.getFlow()._vocab.showMeaning = false;
    ctx.getFlow()._vocab.idx--;
    _vocabRender();
  }

  function _vocabEval(rating) {
    const st = ctx.getFlow()._vocab;
    if (!st) return;
    const item = st.items[st.idx];
    if (item?.id) {
      Store.reviewVocabItem(item.id, rating);
    }
    st.showMeaning = false;
    if (rating === 'again') {
      const currentItem = st.items.splice(st.idx, 1)[0];
      st.items.push(currentItem);
    } else {
      st.idx++;
    }
    if (st.idx >= st.items.length) {
      Store.completeStep(ctx.getFlow().moduleId, st.stepIndex);
      Store.addXP(30 + st.items.length * 2);
      ctx.getFlow().step = st.stepIndex + 1;
      ctx.runCurrentStep();
    } else {
      _vocabRender();
    }
  }

  // ── Vocab Quiz ────────────────────────────────────────────
  function _renderVocabQuiz(mod, step, stepIndex) {
    ctx.setFlowBodyMode('quiz-mode');
    const items = ctx.getVocabItems(step);
    if (!items.length) { ctx.advanceStep(); return; }

    const questions = shuffle(items)
      .slice(0, Math.min(5, items.length))
      .map((item, index) => ({ ...item, quizMode: VOCAB_QUIZ_MODES[index % VOCAB_QUIZ_MODES.length] }));

    // Build all-items pool for distractors
    const allItems = ctx.getAllVocabItems();

    // renderQ는 반드시 ctx.getFlow()._vocabQuiz에서 읽어야 다음 문제로 넘어감 (클로저 버그 방지)
    function renderQ() {
      const fq = ctx.getFlow()._vocabQuiz;
      if (!fq) return;
      const { qIdx, correct, wrong } = fq;

      if (qIdx >= fq.questions.length) {
        if (!fq.isReview && fq.missed.length > 0) {
          fq.isReview = true;
          fq.originalQuestions = fq.questions;
          fq.questions = shuffle([...fq.missed]);
          fq.qIdx = 0;
          _resultFlow.showRetryTransition(fq.missed.length, fq.renderQ);
          return;
        }
        _resultFlow.showQuizResult(correct, fq.totalCount, stepIndex, Math.round((correct / fq.totalCount) * 100));
        return;
      }
      const item = fq.questions[qIdx];
      const mode = item.quizMode || 'jpToKo';
      const correctText = mode === 'koToJp'
        ? stripFuri(item.japanese || item.kanji || '')
        : (item.korean || '');
      const distractors = getVocabDistractors(item, allItems, mode, 3);
      const choices = shuffle([
        { text: correctText, correct: true },
        ...distractors.map(d => ({
          text: mode === 'koToJp'
            ? stripFuri(d.japanese || d.kanji || '')
            : (d.korean || ''),
          correct: false
        }))
      ]);
      const jpSafe = (item.japanese || '').replace(/\\/g, '\\\\').replace(/'/g,"\\'");
      const questionType = mode === 'koToJp'
        ? '일본어 표현은?'
        : (mode === 'listen' ? '듣고 맞는 뜻을 고르세요' : '뜻은 무엇인가요?');
      const questionText = mode === 'koToJp'
        ? escHtml(item.korean || '')
        : (mode === 'listen'
          ? ctx.uiIconSvg('headphones', 'quiz-listening-icon')
          : formatJp(item));

      ctx.updateFlowProgress(stepIndex, mod.steps.length, step.title);
      document.getElementById('flowBody').innerHTML = `
        ${ctx.renderQuizHud(qIdx + 1, fq.questions.length, correct, wrong)}
        <div class="quiz-question">
          <div class="quiz-q-type">${questionType}</div>
          <div class="quiz-q-text ${mode === 'listen' ? 'quiz-q-listen' : ''}">${questionText}</div>
          <button class="quiz-audio-btn" onclick="TTS.speak('${jpSafe}')">${ctx.uiLabeledIcon('audio', 'quiz-audio-icon')} ${mode === 'listen' ? '다시 듣기' : '발음 듣기'}</button>
        </div>
        <div class="quiz-choices">
          ${choices.map((ch, i) => `
            <button class="quiz-choice" data-correct="${ch.correct}"
                    onclick="App._vocabQuizAnswer(this, ${ch.correct})">
              <span class="qc-label">${['A','B','C','D'][i]}</span>
              <span>${escHtml(ch.text || '')}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quizFeedback"></div>
      `;
      document.getElementById('flowFooter').innerHTML = `
        <button class="btn btn-primary hidden" id="btnNextQ" onclick="App._vocabQuizNext()">
          다음 →
        </button>
      `;
      if (mode === 'listen') setTimeout(() => TTS.speak(item.japanese || ''), 300);
    }

    ctx.getFlow()._vocabQuiz = {
      questions,
      qIdx: 0,
      correct: 0,
      wrong: 0,
      missed: [],
      isReview: false,
      totalCount: questions.length,
      attempts: {},
      stepIndex,
      renderQ
    };
    renderQ();
  }

  function _vocabQuizAnswer(btn, isCorrect) {
    const fq = ctx.getFlow()._vocabQuiz;
    if (!fq) return;
    const item = fq.questions[fq.qIdx] || {};
    const jp = item.japanese || item.kanji || '';
    const ko = item.korean || '';
    const mode = item.quizMode || 'jpToKo';
    const key = String(fq.qIdx);
    const attempt = fq.attempts[key] || 0;
    if (isCorrect) {
      fq.correct++;
    } else {
      btn.classList.add('wrong');
      btn.disabled = true;
      fq.attempts[key] = attempt + 1;
      if (item.id) Store.reviewVocabItem(item.id, 'again');
      TTS.speak(stripFuri(jp));
      ctx.playQuizEffect(false);
      const fb = document.getElementById('quizFeedback');
      if (fb && attempt === 0) {
        const hint = mode === 'koToJp'
          ? `힌트: 일본어는 <strong>${escHtml(stripFuri(jp).slice(0, 1))}</strong>로 시작해요.`
          : `힌트: 한국어 뜻은 <strong>${escHtml((ko || '').slice(0, 2))}</strong>로 시작해요.`;
        fb.className = 'quiz-feedback show wrong';
        fb.innerHTML = `${ctx.uiIconSvg('target', 'quiz-feedback-icon')} <span>아직 확정하지 않을게요. ${hint}</span>`;
      }
      if (attempt === 0) return;
      fq.wrong++;
      if (!fq.isReview) fq.missed.push(fq.questions[fq.qIdx]);
    }
    document.querySelectorAll('.quiz-choice').forEach(b => {
      b.classList.add('answered');
      b.onclick = null;
      b.disabled = true;
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });
    btn.classList.add(isCorrect ? 'correct' : 'wrong');
    if (item.id) {
      Store.reviewVocabItem(item.id, isCorrect ? 'good' : 'again');
    }
    TTS.speak(stripFuri(jp));
    ctx.playQuizEffect(isCorrect);

    const fb = document.getElementById('quizFeedback');
    if (fb) {
      fb.className = `quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
      fb.innerHTML = isCorrect
        ? `${ctx.uiIconSvg('check', 'quiz-feedback-icon')} <span>${quizPraise()} <strong>${ruby(jp)}</strong> = ${escHtml(ko)}</span>`
        : `${ctx.uiIconSvg('close', 'quiz-feedback-icon')} <span>이번 정답은 <strong>${ruby(jp)}</strong> = ${escHtml(ko)}예요.</span>`;
    }
    const btnNext = document.getElementById('btnNextQ');
    show(btnNext);
    if (isCorrect) {
      clearTimeout(_autoNextTimer);
      _autoNextTimer = setTimeout(() => {
        const btn = document.getElementById('btnNextQ');
        if (btn && !btn.classList.contains('hidden')) _vocabQuizNext();
      }, 250);
    } else {
      if (btnNext) btnNext.innerHTML = '다음 →';
    }
  }

  function _vocabQuizNext() {
    clearTimeout(_autoNextTimer);
    const btn = document.getElementById('btnNextQ');
    if (btn) btn.innerHTML = '다음 →';
    const fq = ctx.getFlow()._vocabQuiz;
    if (!fq) return;
    fq.qIdx++;
    fq.renderQ();
  }

  function getVocabDistractors(item, allItems, mode, count) {
    const correct = mode === 'koToJp'
      ? stripFuri(item.japanese || item.kanji || '')
      : (item.korean || '');
    const pool = allItems
      .filter(candidate => candidate.id !== item.id)
      .map(candidate => {
        const text = mode === 'koToJp'
          ? stripFuri(candidate.japanese || candidate.kanji || '')
          : (candidate.korean || '');
        const sameHead = text && correct && text[0] === correct[0];
        const lengthGap = Math.abs(Array.from(text).length - Array.from(correct).length);
        const sameBucket = candidate.category && candidate.category === item.category;
        return { candidate, score: (sameBucket ? 0 : 4) + (sameHead ? 0 : 2) + lengthGap };
      })
      .filter(entry => entry.candidate && (mode === 'koToJp'
        ? stripFuri(entry.candidate.japanese || entry.candidate.kanji || '')
        : entry.candidate.korean));
    const sorted = pool.sort((a, b) => a.score - b.score).map(entry => entry.candidate);
    return sample(sorted.slice(0, Math.max(count * 4, count)), count);
  }

  function quizPraise() {
    return sample(['좋아요.', '방금 감각 좋았어요.', '이건 바로 써먹을 수 있어요.', '정확해요.'], 1)[0] || '좋아요.';
  }

  function clearTimers() {
    clearTimeout(_autoNextTimer);
    _autoNextTimer = null;
  }

  return {
    renderKanaQuiz: _renderKanaQuiz,
    startKanaQuizFromPrimer: _startKanaQuizFromPrimer,
    kanaQuizAnswer: _kanaQuizAnswer,
    kanaQuizNext: _kanaQuizNext,
    renderKanaListening: _renderKanaListening,
    listeningQuizAnswer: _listeningQuizAnswer,
    listeningQuizNext: _listeningQuizNext,
    renderShadowing: _renderShadowing,
    shadowingNext: _shadowingNext,
    renderVocabLearn: _renderVocabLearn,
    vocabSpeak: _vocabSpeak,
    vocabFlip: _vocabFlip,
    vocabNext: _vocabNext,
    vocabPrev: _vocabPrev,
    vocabEval: _vocabEval,
    renderVocabQuiz: _renderVocabQuiz,
    vocabQuizAnswer: _vocabQuizAnswer,
    vocabQuizNext: _vocabQuizNext,
    startRetryPhase: _resultFlow.startRetryPhase,
    afterQuiz: _resultFlow.afterQuiz,
    clearTimers,
  };
};
