/* ============================================================
   Lecture Flow - image-backed slide player and captions
   ============================================================ */

'use strict';

window.createLectureFlow = (ctx) => {
  function _lectureState() {
    return ctx.getFlow()?._lecture || null;
  }

  function _lecturePauseButtonLabel(paused) {
    return `${ctx.uiLabeledIcon(paused ? 'play' : 'pause')} <span class="lecture-pause-text">${paused ? '재생' : '일시정지'}</span>`;
  }

  function _lectureCaptionEnabled(lang) {
    return !!Store.getSetting(lang === 'jp' ? 'lectureCaptionJp' : 'lectureCaptionKo');
  }

  function _lectureCaptionToggleButton(lang) {
    const enabled = _lectureCaptionEnabled(lang);
    const label = lang === 'jp' ? 'JP' : 'KO';
    return `
      <button class="lec-display-toggle ${enabled ? 'active' : ''}"
              onclick="App._lecToggleCaption('${lang}')"
              type="button"
              aria-pressed="${enabled ? 'true' : 'false'}">
        <span class="lec-display-toggle-label">${label}</span>
        <span class="lec-display-toggle-state">${enabled ? 'ON' : 'OFF'}</span>
      </button>
    `;
  }

  // ── 강의 화자 토글 (여/남) ───────────────────────────────
  function _lectureGetVoice() {
    return localStorage.getItem('lecture_voice') || TTS.getDefaultVoice();
  }
  function _lectureVoiceList() {
    const voices = (typeof TTS.getAvailableVoices === 'function') ? TTS.getAvailableVoices() : [];
    return [...voices].sort((a, b) => (a.gender === 'F' ? -1 : 1) - (b.gender === 'F' ? -1 : 1));
  }
  function _lectureSetVoice(key) {
    localStorage.setItem('lecture_voice', key);
    TTS.stopQueue();
    // 현재 슬라이드 다시 읽기 + 자동 진행 콜백 유지
    const lc = _lectureState();
    if (lc && !lc.paused) {
      const slide = lc.slides[lc.idx];
      const idx = lc.idx;
      // 진행 중이던 타이머 정지 (재읽기 후 onDone에서 새로 스케줄)
      if (lc.timerId) { clearTimeout(lc.timerId); lc.timerId = null; }
      const bar = document.getElementById('lecTimerBar');
      if (bar) bar.style.animationPlayState = 'paused';
      if (slide?.captionJp) {
        _lecReadCaptionJp(slide.captionJp, slide.captionKo, idx, () => _lecAfterCaptionRead(idx));
      } else {
        _lecStartTimer();
      }
    }
    // 셀렉트 wrap의 성별 색상/마커 갱신
    const voices = _lectureVoiceList();
    const meta = voices.find(v => v.key === key);
    const wrap = document.getElementById('lecVoiceWrap');
    if (wrap && meta) {
      wrap.classList.toggle('lec-voice-F', meta.gender === 'F');
      wrap.classList.toggle('lec-voice-M', meta.gender === 'M');
      const marker = wrap.querySelector('.lec-voice-marker');
      if (marker) marker.textContent = meta.gender === 'F' ? '여' : '남';
      const name = wrap.querySelector('.lec-voice-name');
      if (name) name.textContent = (meta.label || meta.key).split(' ')[0];
    }
  }
  function _lectureCycleVoice() {
    const voices = _lectureVoiceList();
    if (!voices.length) return;
    const cur = _lectureGetVoice();
    const idx = voices.findIndex(v => v.key === cur);
    const next = voices[(idx + 1 + voices.length) % voices.length];
    _lectureSetVoice(next.key);
  }
  function _lectureVoiceSelect() {
    const cur = _lectureGetVoice();
    const voices = _lectureVoiceList();
    if (!voices.length) return '';
    const curMeta = voices.find(v => v.key === cur) || voices[0];
    const curGender = curMeta?.gender || 'F';
    const curName = (curMeta?.label || curMeta?.key || '화자').split(' ')[0];
    return `
      <button class="lec-voice-select-wrap lec-voice-${curGender}" id="lecVoiceWrap"
              onclick="App._lecCycleVoice()" type="button" title="강의 화자 변경">
        <span class="lec-voice-marker">${curGender === 'F' ? '여' : '남'}</span>
        <span class="lec-voice-label">화자</span>
        <span class="lec-voice-name">${escHtml(curName)}</span>
      </button>
    `;
  }

  function _lectureVisualSource(mod, slide) {
    if (slide?.image) return slide.image;
    return ctx.getModuleVisual(mod).image;
  }

  // ── Lecture Player ────────────────────────────────────────
  const _LEC_TYPE = {
    hook:     { icon: 'target', color: '#6366f1' },
    culture:  { icon: 'grid', color: '#10b981' },
    story:    { icon: 'book', color: '#8b5cf6' },
    mnemonic: { icon: 'sparkle', color: '#f59e0b' },
    funfact:  { icon: 'target', color: '#3b82f6' },
    practice: { icon: 'voice', color: '#ef4444' },
    summary:  { icon: 'check', color: '#10b981' },
    grammar:  { icon: 'tools', color: '#f43f5e' },
    table:    { icon: 'grid', color: '#0ea5e9' },
    dialog:   { icon: 'roleplay', color: '#14b8a6' },
    kanji:    { icon: 'module-kana', color: '#f97316' },
    vocabulary:{ icon: 'book', color: '#22c55e' },
  };

  function _renderLecture(mod, step, stepIndex) {
    const slides = (typeof LECTURE_DATA !== 'undefined') && LECTURE_DATA[step.lectureKey];
    if (!slides?.length) { ctx.advanceStep(); return; }
    const flow = ctx.getFlow();
    if (!flow) return;
    flow._lecture = { slides, idx: 0, paused: false, stepIndex, mod, step, timerId: null };
    _lectureRenderSlide();
  }

  function _lectureRenderSlide() {
    const lc = _lectureState();
    if (!lc) return;
    const { slides, idx, stepIndex, mod, step } = lc;
    const slide = slides[idx];
    const ts = _LEC_TYPE[slide.type] || _LEC_TYPE.hook;
    const isLast = idx === slides.length - 1;
    const visualSrc = _lectureVisualSource(mod, slide);
    const shotClass = `shot-${(idx % 4) + 1}`;
    const nextSlide = slides[idx + 1];
    const prevSlide = slides[idx - 1];
    const showJpCaption = _lectureCaptionEnabled('jp');
    const showKoCaption = _lectureCaptionEnabled('ko');
    const hasAnyCaption = !!(slide.captionJp || slide.captionKo);
    const hasVisibleCaption = (slide.captionJp && showJpCaption) || (slide.captionKo && showKoCaption);
    const slideSegments = slides.map((_, slideIndex) => `
      <div class="lec-segment ${slideIndex < idx ? 'done' : ''} ${slideIndex === idx ? 'active' : ''}">
        <div class="lec-segment-fill"></div>
      </div>
    `).join('');

    ctx.updateFlowProgress(stepIndex, mod.steps.length, step.title);
    const overallPct = Math.round((idx / slides.length) * 100);
    document.getElementById('flowProgressFill').style.width = overallPct + '%';

    document.getElementById('flowBody').innerHTML = `
      <div class="lecture-slide lecture-slide-enter" id="lectureSlide">
        <div class="lec-segments">${slideSegments}</div>

        <div class="lec-reel ${hasVisibleCaption ? 'has-caption' : 'no-caption'}" style="--lc:${ts.color}">
          <div class="lec-reel-backdrop ${shotClass}">
            ${visualSrc ? `<img class="lec-scene-img" src="${escHtml(visualSrc)}" alt="">` : ''}
            <div class="lec-reel-pattern">${ctx.uiIconSvg(ts.icon, 'lec-reel-icon')}</div>
            <div class="lec-reel-sheen"></div>
          </div>

          <div class="lec-scene-topline">
            <span class="lec-live-dot"></span>
            <span>${escHtml(mod.name)}</span>
            <span class="lec-shot-count">${idx + 1}/${slides.length}</span>
          </div>

          <div class="lec-board" id="lecBoard">
            <div class="lec-board-kicker">${escHtml(slide.label || 'Lecture')}</div>
            <div class="lec-board-text" id="lecBoardText"></div>
            ${slide.sub ? `<div class="lec-board-sub">${escHtml(slide.sub)}</div>` : ''}
            ${slide.audio ? `<div class="lec-board-reading">${escHtml(slide.audio)}</div>` : ''}
          </div>

          ${hasAnyCaption ? `
          <div class="lec-caption-box ${hasVisibleCaption ? '' : 'hidden'}">
            ${slide.captionJp ? `<div class="lec-cap-jp ${showJpCaption ? '' : 'hidden'}" id="lecCapJp">${ruby(slide.captionJp)}</div>` : ''}
            ${slide.captionKo ? `<div class="lec-cap-ko ${showKoCaption ? '' : 'hidden'}" id="lecCapKo">${escHtml(slide.captionKo)}</div>` : ''}
          </div>` : ''}
        </div>

        <!-- 타이머 바 -->
        <div class="lec-timer-track lec-timer-track-wide">
          <div class="lec-timer-bar" id="lecTimerBar"
               style="animation-duration:2000ms;animation-play-state:paused"></div>
        </div>
      </div>
    `;

    const prevLabel = idx === 0 ? '소개' : (prevSlide?.main ? stripFuri(prevSlide.main) : '이전');
    const nextLabel = isLast ? '완료' : stripFuri(nextSlide?.main || '다음');
    document.getElementById('flowFooter').innerHTML = `
      <div class="lec-footer-tools lec-footer-tools-unified">
        ${_lectureCaptionToggleButton('jp')}
        ${_lectureCaptionToggleButton('ko')}
        <button class="lec-display-toggle lec-display-action" id="btnLecPause"
                aria-label="일시정지"
                onclick="App._lecPauseToggle()">${_lecturePauseButtonLabel(false)}</button>
        ${_lectureVoiceSelect()}
        ${isLast ? `<button class="lec-display-toggle lec-display-replay" onclick="App._lecRestart()" title="처음부터 다시 보기">${ctx.uiLabeledIcon('replay')} 다시 보기</button>` : ''}
      </div>
      <div class="lec-controls lec-controls-compact">
        <button class="btn btn-outline lec-nav-button" id="btnLecPrev"
                onclick="App._lecPrev()">
          <span class="lec-nav-arrow">←</span>
          <span class="lec-nav-label">${escHtml(prevLabel)}</span>
        </button>
        <button class="btn btn-primary lec-nav-button lec-nav-button-next" id="btnLecNext"
                onclick="App._lecNext()">
          <span class="lec-nav-label">${escHtml(nextLabel)}</span>
          <span class="lec-nav-arrow">→</span>
        </button>
      </div>
    `;

    // 1. 칠판 한 글자씩 필기 애니메이션
    const animDur = _lecChalkboardAnim(slide.main);

    // 2. 칠판 애니메이션 완료 후 → captionJp 다화자 읽기
    setTimeout(() => {
      const current = _lectureState();
      if (!current || current.idx !== idx) return;
      if (slide.captionJp) {
        _lecReadCaptionJp(slide.captionJp, slide.captionKo, idx, () => _lecAfterCaptionRead(idx));
      } else {
        // captionJp 없으면 기존 타이머로 자동 진행
        _lecStartTimer();
      }
    }, animDur + 300);
  }

  // 캡션 TTS가 끝났을 때 자동 진행을 스케줄
  function _lecAfterCaptionRead(idx) {
    const lc = _lectureState();
    if (!lc || lc.paused || lc.idx !== idx) return;
    const bar = document.getElementById('lecTimerBar');
    if (bar) bar.style.animationPlayState = 'running';
    if (lc.timerId) clearTimeout(lc.timerId);
    lc.timerId = setTimeout(() => {
      const active = _lectureState();
      if (active && !active.paused && active.idx === idx) _lecNext();
    }, 2000);
  }

  // ── 칠판 한 글자씩 필기 애니메이션 ─────────────────────────
  function _lecChalkboardAnim(text) {
    const el = document.getElementById('lecBoardText');
    if (!el || !text) return 0;
    const plain = text.replace(/<[^>]*>/g, ''); // ruby 태그 제거 → 순수 텍스트
    const chars = [...plain]; // 유니코드 안전 분리 (이모지 포함)
    const PER_CHAR = 65; // ms per character
    el.innerHTML = chars.map((ch, i) =>
      `<span class="chalk-char" style="animation-delay:${i * PER_CHAR}ms">${escHtml(ch)}</span>`
    ).join('');
    const totalDur = chars.length * PER_CHAR + 200;
    // 애니메이션 완료 후 ruby 버전으로 교체
    setTimeout(() => {
      const el2 = document.getElementById('lecBoardText');
      if (el2) el2.innerHTML = ruby(text);
    }, totalDur + 100);
    return totalDur;
  }

  // ── 한국어 → 가타카나 근사 변환 (TTS용) ────────────────────
  // captionJp 안에 섞인 한글을 일본 TTS가 읽을 수 있도록 변환
  const _KO_KATA_MAP = {
    '안녕하세요': 'アンニョンハセヨ', '안녕': 'アンニョン',
    '감사합니다': 'カムサハムニダ', '고마워요': 'コマウォヨ',
    '죄송합니다': 'チェソンハムニダ', '미안해요': 'ミアネヨ',
    '괜찮아요': 'クェンチャナヨ', '괜찮아': 'クェンチャナ',
    '잠깐만요': 'チャムッカンマンニョ', '네': 'ネ', '아니요': 'アニヨ',
    '이': 'イ', '가': 'カ', '한국': 'ハングク', '한국어': 'ハングゴ',
    '일본어': 'イルボノ', '일본': 'イルボン',
  };
  function _koToKatakana(text) {
    let r = text;
    // 단어 단위 변환 (긴 것부터)
    for (const [ko, kata] of Object.entries(_KO_KATA_MAP)) {
      r = r.replaceAll(ko, kata);
    }
    // 나머지 한글 문자 제거 (TTS가 읽지 못함)
    r = r.replace(/[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]+/g, '');
    return r;
  }

  // ── captionJp 다화자 순차 읽기 ──────────────────────────────
  // captionKo를 함께 받아 한국어 번역도 병렬 하이라이트
  function _lecReadCaptionJp(captionJp, captionKo, slideIdx, onDone) {
    if (!captionJp) { if (onDone) onDone(); return; }

    // ① 표시용 문장 분리 (후리가나 제거 후 분리)
    const rawText = stripFuri(captionJp);
    const jpSentences = rawText
      .match(/[^。！？…]+[。！？…]*/g)?.map(s => s.trim()).filter(Boolean);
    if (!jpSentences?.length) { if (onDone) onDone(); return; }

    // ② 한국어 문장 분리
    const koSentences = captionKo
      ? (captionKo.match(/[^.!?…！？]+[.!?…！？]*/g) || [captionKo])
          .map(s => s.trim()).filter(Boolean)
      : [];

    // ③ JP 문장 spans 재구성
    const capJpEl = document.getElementById('lecCapJp');
    if (capJpEl) {
      capJpEl.innerHTML = jpSentences.map((s, i) =>
        `<span class="lec-sentence" id="lecSent${i}">${ruby(s)}</span>`
      ).join('');
    }
    // ④ KO 문장 spans 재구성
    const capKoEl = document.querySelector('.lec-cap-ko');
    if (capKoEl && koSentences.length) {
      capKoEl.innerHTML = koSentences.map((s, i) =>
        `<span class="lec-sentence-ko" id="lecSentKo${i}">${escHtml(s)}</span>`
      ).join('');
    }

    const jpLen = jpSentences.length;
    const koLen = koSentences.length;
    const lectureVoice = _lectureGetVoice();

    // ⑤ 사전 생성 강의 mp3가 있으면 단일 파일 재생 (가갭리스, 자연스러움)
    const lc = _lectureState();
    const lectureKey = lc?.step?.lectureKey;
    if (lectureKey && TTS.hasLectureAudio(lectureKey, slideIdx)) {
      TTS.playLectureAudio(lectureKey, slideIdx, lectureVoice, {
        onProgress: (ratio) => {
          // 시간 비례로 JP/KO 문장 하이라이트 진행
          const ji = Math.min(Math.floor(ratio * jpLen), jpLen - 1);
          document.querySelectorAll('.lec-sentence').forEach((el, idx) => {
            el.classList.toggle('reading', idx === ji);
          });
          if (koLen) {
            const ki = Math.min(Math.floor(ratio * koLen), koLen - 1);
            document.querySelectorAll('.lec-sentence-ko').forEach((el, idx) => {
              el.classList.toggle('reading', idx === ki);
            });
          }
          document.getElementById(`lecSent${ji}`)?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
        },
        onDone: () => {
          document.querySelectorAll('.lec-sentence,.lec-sentence-ko').forEach(el => el.classList.remove('reading'));
          if (onDone) onDone();
        },
      });
      return;
    }

    // ⑥ 폴백: 문장별 TTS 큐 (Web Speech 사용 시)
    const ttsSentences = jpSentences.map(s => _koToKatakana(s).trim());
    const lines = ttsSentences.map((text) => ({ text, voice: lectureVoice }));
    TTS.speakQueue(lines, {
      onLineStart: (i) => {
        document.querySelectorAll('.lec-sentence').forEach(el => el.classList.remove('reading'));
        document.getElementById(`lecSent${i}`)?.classList.add('reading');
        document.getElementById(`lecSent${i}`)?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
        if (koLen > 0) {
          document.querySelectorAll('.lec-sentence-ko').forEach(el => el.classList.remove('reading'));
          const ki = Math.min(Math.floor(i * koLen / jpLen), koLen - 1);
          document.getElementById(`lecSentKo${ki}`)?.classList.add('reading');
        }
      },
      onLineEnd: (i) => {
        document.getElementById(`lecSent${i}`)?.classList.remove('reading');
        if (koLen > 0) {
          const ki = Math.min(Math.floor(i * koLen / jpLen), koLen - 1);
          document.getElementById(`lecSentKo${ki}`)?.classList.remove('reading');
        }
      },
      onDone,
    });
  }

  function _lecStartTimer() {
    const lc = _lectureState();
    if (!lc || lc.paused) return;
    // 기존 타이머 제거
    if (lc.timerId) clearTimeout(lc.timerId);
    
    // 텍스트 길이에 기반한 동적 시간 계산 (음성이 없는 경우를 대비)
    const slide = lc.slides[lc.idx];
    const textLen = (slide.main || '').length + (slide.sub || '').length + (slide.captionJp || '').length;
    const dur = slide.duration || Math.max(5000, textLen * 100);
    
    // CSS 타이머 바 애니메이션 시간 동기화
    const bar = document.getElementById('lecTimerBar');
    if (bar) bar.style.animationDuration = `${dur}ms`;
    lc.timerId = setTimeout(() => {
      const current = _lectureState();
      if (!current || current.paused) return;
      _lecNext();
    }, dur);
  }

  function _lecStopTimer() {
    const lc = _lectureState();
    if (!lc) return;
    if (lc.timerId) { clearTimeout(lc.timerId); lc.timerId = null; }
    // 타이머 바 정지
    const bar = document.getElementById('lecTimerBar');
    if (bar) bar.style.animationPlayState = 'paused';
  }

  function _lecNext() {
    const lc = _lectureState();
    if (!lc) return;
    _lecStopTimer();
    TTS.stopQueue();
    if (lc.idx >= lc.slides.length - 1) {
      // 강의 완료
      const flow = ctx.getFlow();
      if (!flow) return;
      Store.completeStep(flow.moduleId, lc.stepIndex);
      Store.addXP(50);
      flow.step = lc.stepIndex + 1;
      flow._lecture = null;
      ctx.runCurrentStep();
    } else {
      lc.idx++;
      lc.paused = false;
      _lectureRenderSlide();
    }
  }

  function _lecRestart() {
    const lc = _lectureState();
    if (!lc) return;
    _lecStopTimer();
    TTS.stopQueue();
    lc.idx = 0;
    lc.paused = false;
    _lectureRenderSlide();
  }

  function _lecPrev() {
    const lc = _lectureState();
    if (!lc) return;
    if (lc.idx === 0) {
      _lecStopTimer();
      TTS.stopQueue();
      ctx.returnToModuleIntro?.();
      return;
    }
    _lecStopTimer();
    TTS.stopQueue();
    lc.idx--;
    lc.paused = false;
    _lectureRenderSlide();
  }

  function _lecPauseToggle() {
    const lc = _lectureState();
    if (!lc) return;
    lc.paused = !lc.paused;
    const btn = document.getElementById('btnLecPause');
    if (lc.paused) {
      _lecStopTimer();
      TTS.stopQueue();
      if (btn) btn.innerHTML = _lecturePauseButtonLabel(true);
      if (btn) btn.setAttribute('aria-label', '재생');
    } else {
      if (btn) btn.innerHTML = _lecturePauseButtonLabel(false);
      if (btn) btn.setAttribute('aria-label', '일시정지');
      const slide = lc.slides[lc.idx];
      if (slide.captionJp) {
        // 일시정지 후 재개 → captionJp 처음부터 다시 읽기
        const idx = lc.idx;
        _lecReadCaptionJp(slide.captionJp, slide.captionKo, idx, () => _lecAfterCaptionRead(idx));
      } else {
        const bar = document.getElementById('lecTimerBar');
        if (bar) bar.style.animationPlayState = 'running';
        _lecStartTimer();
      }
    }
  }

  function _lecCapTab(lang) {
    const ko = document.getElementById('lecCapKo');
    const jp = document.getElementById('lecCapJp');
    const tKo = document.getElementById('capTabKo');
    const tJp = document.getElementById('capTabJp');
    if (lang === 'ko') {
      ko?.classList.remove('hidden'); jp?.classList.add('hidden');
      tKo?.classList.add('active'); tJp?.classList.remove('active');
    } else {
      jp?.classList.remove('hidden'); ko?.classList.add('hidden');
      tJp?.classList.add('active'); tKo?.classList.remove('active');
    }
  }

  function _lecToggleCaption(lang) {
    const key = lang === 'jp' ? 'lectureCaptionJp' : 'lectureCaptionKo';
    const next = !Store.getSetting(key);
    Store.setSetting(key, next);
    const box = document.querySelector(lang === 'jp' ? '.lec-cap-jp' : '.lec-cap-ko');
    if (box) box.classList.toggle('hidden', !next);
    document.querySelectorAll('.lec-display-toggle').forEach(btn => {
      const isLangBtn = btn.getAttribute('onclick')?.includes(`'${lang}'`);
      if (!isLangBtn) return;
      btn.classList.toggle('active', next);
      btn.setAttribute('aria-pressed', next ? 'true' : 'false');
      const stateEl = btn.querySelector('.lec-display-toggle-state');
      if (stateEl) stateEl.textContent = next ? 'ON' : 'OFF';
    });
    const hasVisibleCaption = !!document.querySelector('.lec-cap-jp:not(.hidden), .lec-cap-ko:not(.hidden)');
    const capBox = document.querySelector('.lec-caption-box');
    if (capBox) capBox.classList.toggle('hidden', !hasVisibleCaption);
    const reel = document.querySelector('.lec-reel');
    if (reel) {
      reel.classList.toggle('has-caption', hasVisibleCaption);
      reel.classList.toggle('no-caption', !hasVisibleCaption);
    }
  }

  function stopLecture() {
    _lecStopTimer();
    TTS.stopQueue();
    const flow = ctx.getFlow();
    if (flow) flow._lecture = null;
  }

  return {
    renderLecture: _renderLecture,
    next: _lecNext,
    prev: _lecPrev,
    restart: _lecRestart,
    pauseToggle: _lecPauseToggle,
    toggleCaption: _lecToggleCaption,
    capTab: _lecCapTab,
    setVoice: _lectureSetVoice,
    cycleVoice: _lectureCycleVoice,
    stopLecture,
  };
};
