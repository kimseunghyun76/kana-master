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

  // ── 칠판 폰트 토글 (손글씨 ↔ 일반) ────────────────────────
  function _lectureBoardFont() {
    return Store.getSetting('lectureBoardFont') === 'plain' ? 'plain' : 'chalk';
  }
  function _lectureFontToggleButton() {
    const isPlain = _lectureBoardFont() === 'plain';
    return `
      <button class="lec-display-toggle lec-font-toggle ${isPlain ? 'active' : ''}"
              onclick="App._lecToggleBoardFont()"
              type="button"
              title="칠판 폰트 ${isPlain ? '손글씨로' : '일반으로'} 전환">
        <span class="lec-display-toggle-label">${isPlain ? '가' : '✎'}</span>
        <span class="lec-display-toggle-state">${isPlain ? '일반' : '손글씨'}</span>
      </button>
    `;
  }
  function _lecToggleBoardFont() {
    const next = _lectureBoardFont() === 'plain' ? 'chalk' : 'plain';
    Store.setSetting('lectureBoardFont', next);
    const body = document.getElementById('lecBoardSub');
    if (body) body.classList.toggle('font-plain', next === 'plain');
    document.querySelectorAll('.lec-font-toggle').forEach(btn => {
      const isP = next === 'plain';
      btn.classList.toggle('active', isP);
      btn.setAttribute('title', '칠판 폰트 ' + (isP ? '손글씨로' : '일반으로') + ' 전환');
      const labelEl = btn.querySelector('.lec-display-toggle-label');
      if (labelEl) labelEl.textContent = isP ? '가' : '✎';
      const stateEl = btn.querySelector('.lec-display-toggle-state');
      if (stateEl) stateEl.textContent = isP ? '일반' : '손글씨';
    });
  }

  // ── 자막 보이기/숨기기 토글 (기본 숨김) ──────────────────
  function _lectureCaptionShow() {
    return !!Store.getSetting('lectureCaptionShow');
  }
  function _lectureCaptionToggleButton() {
    const on = _lectureCaptionShow();
    return `
      <button class="lec-display-toggle lec-caption-toggle ${on ? 'active' : ''}"
              onclick="App._lecToggleCaptionShow()"
              type="button"
              aria-pressed="${on ? 'true' : 'false'}"
              title="자막 ${on ? '숨기기' : '보이기'}">
        <span class="lec-display-toggle-label">자막</span>
        <span class="lec-display-toggle-state">${on ? 'ON' : 'OFF'}</span>
      </button>
    `;
  }
  function _lecToggleCaptionShow() {
    const next = !_lectureCaptionShow();
    Store.setSetting('lectureCaptionShow', next);
    const reel = document.querySelector('.lec-reel');
    if (reel) {
      reel.classList.toggle('captions-hidden', !next);
      reel.classList.toggle('has-caption', next);
      reel.classList.toggle('no-caption', !next);
    }
    document.querySelector('.lec-caption-box-solo')?.classList.toggle('hidden', !next);
    document.querySelectorAll('.lec-caption-toggle').forEach(btn => {
      btn.classList.toggle('active', next);
      btn.setAttribute('aria-pressed', next ? 'true' : 'false');
      btn.setAttribute('title', '자막 ' + (next ? '숨기기' : '보이기'));
      const stateEl = btn.querySelector('.lec-display-toggle-state');
      if (stateEl) stateEl.textContent = next ? 'ON' : 'OFF';
    });
  }

  // ── 강의 강사 언어 (라디오: 항상 정확히 하나) ─────────────
  function _lectureInstructor() {
    const v = Store.getSetting('lectureInstructor');
    return (v === 'jp' || v === 'ko') ? v : 'ko';
  }
  function _lectureInstructorToggleButton(lang) {
    const cur = _lectureInstructor();
    const active = cur === lang;
    const flag = lang === 'jp' ? 'JP' : 'KO';
    const fullLabel = lang === 'jp' ? '일본어 강사' : '한국어 강사';
    return `
      <button class="lec-display-toggle lec-instructor-toggle ${active ? 'active' : ''}"
              onclick="App._lecSetInstructor('${lang}')"
              type="button"
              role="radio"
              aria-checked="${active ? 'true' : 'false'}"
              title="${fullLabel}">
        <span class="lec-display-toggle-label">${flag}</span>
      </button>
    `;
  }

  // ── 강의 화자 토글 (선택된 강사 언어 내에서) ──────────────
  function _voiceKeyForLang(lang) {
    return lang === 'ko' ? 'lecture_voice_ko' : 'lecture_voice_jp';
  }
  function _lectureGetVoice() {
    const lang = _lectureInstructor();
    const stored = localStorage.getItem(_voiceKeyForLang(lang));
    const list = _lectureVoiceList();
    if (stored && list.some(v => v.key === stored)) return stored;
    return list[0]?.key || TTS.getDefaultVoice();
  }
  function _lectureVoiceList() {
    const lang = _lectureInstructor();
    const voices = (typeof TTS.getAvailableVoices === 'function') ? TTS.getAvailableVoices(lang) : [];
    return [...voices].sort((a, b) => (a.gender === 'F' ? -1 : 1) - (b.gender === 'F' ? -1 : 1));
  }
  function _lectureSetVoice(key) {
    const lang = _lectureInstructor();
    localStorage.setItem(_voiceKeyForLang(lang), key);
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
      if (_hasActiveCaption(slide)) {
        _lecReadCaption(slide, idx, () => _lecAfterCaptionRead(idx));
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
    // 강사 언어가 아직 선택된 적 없으면 in-lecture 선택 화면
    const setting = Store.getSetting('lectureInstructor');
    if (setting !== 'jp' && setting !== 'ko') {
      _renderInstructorPickInline(mod, slides[0]);
      return;
    }
    _lectureRenderSlide();
  }

  // 강사 언어 선택 화면 — 강의 화면 안에서 (이미지 배경 보이게)
  function _renderInstructorPickInline(mod, firstSlide) {
    const visualSrc = _lectureVisualSource(mod, firstSlide);
    document.getElementById('flowBody').innerHTML = `
      <div class="lecture-slide lec-pick-slide">
        <div class="lec-reel lec-reel-pick" style="--lc:#6366f1">
          <div class="lec-reel-backdrop shot-1">
            ${visualSrc ? `<img class="lec-scene-img" src="${escHtml(visualSrc)}" alt="">` : ''}
            <div class="lec-reel-dim"></div>
          </div>
          <div class="lec-pick-top">
            <div class="lec-pick-greeting">잘 오셨어요! 👋</div>
            <div class="lec-pick-title">${escHtml(mod.name || '강의')}</div>
            <div class="lec-pick-sub">어떤 언어로 듣고 싶으세요?</div>
          </div>
          <div class="lec-pick-bottom">
            <button class="lec-pick-btn lec-pick-ko" type="button" onclick="App._lecPickInstructor('ko')">
              <span class="lec-pick-flag">🇰🇷</span>
              <div class="lec-pick-btn-text">
                <span class="lec-pick-btn-main">한국어 강사</span>
                <span class="lec-pick-btn-sub">처음 배우는 분께 추천</span>
              </div>
            </button>
            <button class="lec-pick-btn lec-pick-jp" type="button" onclick="App._lecPickInstructor('jp')">
              <span class="lec-pick-flag">🇯🇵</span>
              <div class="lec-pick-btn-text">
                <span class="lec-pick-btn-main">일본어 강사</span>
                <span class="lec-pick-btn-sub">귀를 일본어에 익히고 싶다면</span>
              </div>
            </button>
            <div class="lec-pick-hint">하단 버튼으로 언제든 바꿀 수 있어요</div>
          </div>
        </div>
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = '';
  }
  function _lecPickInstructor(lang) {
    if (lang !== 'jp' && lang !== 'ko') return;
    Store.setSetting('lectureInstructor', lang);
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
    const instructor = _lectureInstructor();
    const activeCaption = instructor === 'ko' ? slide.captionKo : slide.captionJp;
    const hasAnyCaption = !!activeCaption;
    const captionsShown = _lectureCaptionShow();
    const hasVisibleCaption = hasAnyCaption && captionsShown;
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

        <div class="lec-reel ${hasVisibleCaption ? 'has-caption' : 'no-caption'}${captionsShown ? '' : ' captions-hidden'}" style="--lc:${ts.color}">
          <div class="lec-reel-backdrop ${shotClass}">
            ${visualSrc ? `<img class="lec-scene-img" src="${escHtml(visualSrc)}" alt="">` : ''}
            <div class="lec-reel-pattern">${ctx.uiIconSvg(ts.icon, 'lec-reel-icon')}</div>
            <div class="lec-reel-sheen"></div>
          </div>

          <div class="lec-scene-topline">
            <div class="lec-topline-meta">
              <span class="lec-live-dot"></span>
              <span>${escHtml(mod.name)}</span>
              <span class="lec-shot-count">${idx + 1}/${slides.length}</span>
            </div>
            <div class="lec-topline-title">
              ${slide.label ? `<span class="lec-topline-kicker">${escHtml(slide.label)}</span>` : ''}
              ${slide.main ? `<span class="lec-topline-main">${escHtml(slide.main.replace(/[（\(]([ぁ-ヶー・]+)[）\)]/g, ''))}</span>` : ''}
            </div>
          </div>

          <div class="lec-board-stack">
            <div class="lec-board ${_lectureBoardFont() === 'plain' ? 'font-plain' : ''}" id="lecBoard">
              <div class="lec-board-body ${_lectureBoardFont() === 'plain' ? 'font-plain' : ''}" id="lecBoardSub"></div>
              ${slide.audio ? `<div class="lec-board-reading">${escHtml(slide.audio)}</div>` : ''}
            </div>
            ${hasAnyCaption ? `
            <div class="lec-caption-box lec-caption-box-solo${captionsShown ? '' : ' hidden'}">
              ${instructor === 'jp'
                ? `<div class="lec-cap-jp" id="lecCapJp">${ruby(slide.captionJp || '')}</div>`
                : `<div class="lec-cap-ko" id="lecCapKo">${escHtml(slide.captionKo || '')}</div>`}
            </div>` : ''}
          </div>
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
        ${_lectureInstructorToggleButton('ko')}
        ${_lectureInstructorToggleButton('jp')}
        ${_lectureFontToggleButton()}
        ${_lectureCaptionToggleButton()}
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

    // 1. 칠판 sub 한 글자씩 필기 애니메이션
    const animDur = _lecSubChalk(slide.sub);

    // 2. 칠판 시작 후 짧은 텀 두고 → 캡션 읽기 (병렬 — 학습자는 보면서 들음)
    setTimeout(() => {
      const current = _lectureState();
      if (!current || current.idx !== idx) return;
      if (_hasActiveCaption(slide)) {
        _lecReadCaption(slide, idx, () => _lecAfterCaptionRead(idx));
      } else {
        _lecStartTimer();
      }
    }, Math.min(animDur, 400));
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

  // ── 칠판 sub 한 글자씩 필기 애니메이션 ─────────────────────
  // - 후리가나 「漢字(かな)」 패턴은 칠판에서 제거 (스크립트에만 유지)
  // - 글자 유형별로 분필 색 다르게 (한자=노랑, 가타카나=하늘, 마커=코랄...)
  // - 애니 완료 후에도 span 유지 (ruby 교체 없음)
  function _chalkClass(ch) {
    if (/[一-鿿]/.test(ch)) return 'chk-kanji';     // 한자
    if (/[぀-ゟ]/.test(ch)) return 'chk-hiragana';  // 히라가나
    if (/[゠-ヿ]/.test(ch)) return 'chk-katakana';  // 가타카나
    if (/[가-힣]/.test(ch))             return 'chk-korean';     // 한글
    if (/[①-⑳]/.test(ch))               return 'chk-num';        // 동그라미 숫자
    if (/[→↓↑←★✓✗⚠▸▪⇒⟶]/.test(ch)) return 'chk-mark';       // 마커
    if (/[「」『』]/.test(ch))           return 'chk-punct';      // 일본식 따옴표
    return ''; // 기본
  }
  function _lecSubChalk(text) {
    const el = document.getElementById('lecBoardSub');
    if (!el || !text) return 0;
    // 후리가나 제거: 漢字(かな) → 漢字 (괄호 안이 히라가나일 때만)
    const plain = text.replace(/[（\(]([ぁ-ヶー・]+)[）\)]/g, '');
    const chars = [...plain];
    const PER_CHAR = 45;
    let i = 0;
    el.innerHTML = chars.map((ch) => {
      if (ch === '\n') return '<br>';
      const cls = _chalkClass(ch);
      const content = ch === ' ' ? '&nbsp;' : escHtml(ch);
      const span = `<span class="chalk-char${cls ? ' ' + cls : ''}" style="animation-delay:${i * PER_CHAR}ms">${content}</span>`;
      i++;
      return span;
    }).join('');
    const totalDur = i * PER_CHAR + 200;
    // 애니메이션 완료 후 — 후리가나 ruby 포함된 정착 버전으로 교체
    setTimeout(() => {
      const el2 = document.getElementById('lecBoardSub');
      if (el2) el2.innerHTML = _buildRichBoardText(text);
    }, totalDur + 100);
    return totalDur;
  }

  // 정착 후 칠판 본문 — 후리가나 ruby + 글자별 색상 클래스 보존
  function _buildRichBoardText(text) {
    let result = '';
    let i = 0;
    while (i < text.length) {
      const rest = text.slice(i);
      // 漢字(かな) 패턴 → ruby
      const m = rest.match(/^([一-鿿々]+)[（\(]([ぁ-ヶー・]+)[）\)]/);
      if (m) {
        const [whole, kanji, furi] = m;
        result += `<ruby class="chk-ruby">${escHtml(kanji)}<rt class="chk-furi">${escHtml(furi)}</rt></ruby>`;
        i += whole.length;
        continue;
      }
      const ch = text[i];
      if (ch === '\n') { result += '<br>'; i++; continue; }
      const cls = _chalkClass(ch);
      const content = ch === ' ' ? '&nbsp;' : escHtml(ch);
      result += `<span${cls ? ' class="' + cls + '"' : ''}>${content}</span>`;
      i++;
    }
    return result;
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

  function _hasActiveCaption(slide) {
    const lang = _lectureInstructor();
    return !!(lang === 'ko' ? slide?.captionKo : slide?.captionJp);
  }

  // ── 선택된 강사 언어 캡션 순차 읽기 ─────────────────────────
  function _lecReadCaption(slide, slideIdx, onDone) {
    const lang = _lectureInstructor();
    const caption = lang === 'ko' ? slide?.captionKo : slide?.captionJp;
    if (!caption) { if (onDone) onDone(); return; }

    // ① 문장 분리 (언어별 구두점)
    const rawText = lang === 'jp' ? stripFuri(caption) : caption;
    const splitRe = lang === 'jp' ? /[^。！？…]+[。！？…]*/g : /[^.!?…！？]+[.!?…！？]*/g;
    const sentences = rawText.match(splitRe)?.map(s => s.trim()).filter(Boolean) || [rawText];
    if (!sentences.length) { if (onDone) onDone(); return; }

    // ② 캡션 spans 재구성
    const capId = lang === 'jp' ? 'lecCapJp' : 'lecCapKo';
    const capEl = document.getElementById(capId);
    const sentClass = lang === 'jp' ? 'lec-sentence' : 'lec-sentence-ko';
    const sentIdPrefix = lang === 'jp' ? 'lecSent' : 'lecSentKo';
    const render = lang === 'jp' ? ruby : escHtml;
    if (capEl) {
      capEl.innerHTML = sentences.map((s, i) =>
        `<span class="${sentClass}" id="${sentIdPrefix}${i}">${render(s)}</span>`
      ).join('');
    }

    const total = sentences.length;
    const lectureVoice = _lectureGetVoice();
    const lc = _lectureState();
    const lectureKey = lc?.step?.lectureKey;

    // ③ 사전 생성 강의 mp3가 있으면 단일 파일 재생
    if (lectureKey && TTS.hasLectureAudio(lectureKey, slideIdx, lang)) {
      TTS.playLectureAudio(lectureKey, slideIdx, lectureVoice, {
        onProgress: (ratio) => {
          const i = Math.min(Math.floor(ratio * total), total - 1);
          document.querySelectorAll('.' + sentClass).forEach((el, idx2) => {
            el.classList.toggle('reading', idx2 === i);
          });
          document.getElementById(`${sentIdPrefix}${i}`)?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
        },
        onDone: () => {
          document.querySelectorAll('.' + sentClass).forEach(el => el.classList.remove('reading'));
          if (onDone) onDone();
        },
      }, lang);
      return;
    }

    // ④ 폴백: Web Speech 문장별 큐 (jp는 가타카나 변환, ko는 그대로)
    const lines = sentences.map((text) => ({
      text: lang === 'jp' ? _koToKatakana(text).trim() : text,
      voice: lectureVoice,
    }));
    TTS.speakQueue(lines, {
      onLineStart: (i) => {
        document.querySelectorAll('.' + sentClass).forEach(el => el.classList.remove('reading'));
        document.getElementById(`${sentIdPrefix}${i}`)?.classList.add('reading');
        document.getElementById(`${sentIdPrefix}${i}`)?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
      },
      onLineEnd: (i) => {
        document.getElementById(`${sentIdPrefix}${i}`)?.classList.remove('reading');
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
      if (_hasActiveCaption(slide)) {
        const idx = lc.idx;
        _lecReadCaption(slide, idx, () => _lecAfterCaptionRead(idx));
      } else {
        const bar = document.getElementById('lecTimerBar');
        if (bar) bar.style.animationPlayState = 'running';
        _lecStartTimer();
      }
    }
  }

  function _lecSetInstructor(lang) {
    if (lang !== 'jp' && lang !== 'ko') return;
    if (_lectureInstructor() === lang) return;
    Store.setSetting('lectureInstructor', lang);
    TTS.stopQueue();
    // 현재 슬라이드 다시 렌더 (캡션 언어/화자 셀렉트가 한꺼번에 갱신)
    const lc = _lectureState();
    if (lc) {
      _lecStopTimer();
      _lectureRenderSlide();
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
    setInstructor: _lecSetInstructor,
    pickInstructor: _lecPickInstructor,
    toggleCaptionShow: _lecToggleCaptionShow,
    toggleBoardFont: _lecToggleBoardFont,
    setVoice: _lectureSetVoice,
    cycleVoice: _lectureCycleVoice,
    stopLecture,
  };
};
