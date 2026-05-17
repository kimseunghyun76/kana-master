/* ============================================================
   Lecture Flow - image-backed slide player and captions
   ============================================================ */

'use strict';

window.createLectureFlow = (ctx) => {
  const japaneseOnlyInstructor = !!ctx.japaneseOnlyInstructor;

  function _lectureState() {
    return ctx.getFlow()?._lecture || null;
  }

  function _lecturePauseButtonLabel(paused) {
    return `
      <span class="lec-tool-icon">${paused ? '▶' : '⏸'}</span>
      <span class="lec-tool-sub">제어</span>
    `;
  }

  // ── 칠판 폰트 토글 (손글씨 ↔ 일반) ────────────────────────
  function _lectureBoardFont() {
    return Store.getSetting('lectureBoardFont') === 'plain' ? 'plain' : 'chalk';
  }
  function _lectureFontToggleButton() {
    const isPlain = _lectureBoardFont() === 'plain';
    return `
      <button class="lec-display-toggle lec-tool-btn lec-font-toggle ${isPlain ? 'is-plain' : 'is-chalk'}"
              onclick="App._lecToggleBoardFont()"
              type="button"
              title="${isPlain ? '종이 → 칠판 모드' : '칠판 → 종이 모드'}">
        <span class="lec-tool-icon">${isPlain ? 'Aa' : '✎'}</span>
        <span class="lec-tool-sub">모드</span>
      </button>
    `;
  }
  function _lecToggleBoardFont() {
    const next = _lectureBoardFont() === 'plain' ? 'chalk' : 'plain';
    Store.setSetting('lectureBoardFont', next);
    const board = document.getElementById('lecBoard');
    if (board) board.classList.toggle('font-plain', next === 'plain');
    const body = document.getElementById('lecBoardSub');
    if (body) body.classList.toggle('font-plain', next === 'plain');
    document.querySelectorAll('.lec-font-toggle').forEach(btn => {
      const isP = next === 'plain';
      btn.classList.toggle('is-plain', isP);
      btn.classList.toggle('is-chalk', !isP);
      btn.setAttribute('title', isP ? '종이 → 칠판 모드' : '칠판 → 종이 모드');
      const iconEl = btn.querySelector('.lec-tool-icon');
      if (iconEl) iconEl.textContent = isP ? 'Aa' : '✎';
    });
    // 폰트 모드 변경 후 자동 fit 재계산
    _lecFitBoard();
  }

  // ── 자막 토글 — JP ↔ KO ───────────────────────────────────
  function _lectureCaptionShow() {
    const v = Store.getSetting('lectureCaptionShow');
    if (v === 'jp' || v === 'ko') return v;
    return 'ko';
  }
  function _lectureCaptionToggleButton() {
    const state = _lectureCaptionShow();
    const labels = { jp: '일', ko: '한' };
    return `
      <button class="lec-display-toggle lec-tool-btn lec-caption-toggle cap-${state}"
              onclick="App._lecToggleCaptionShow()"
              type="button"
              title="자막: ${state === 'jp' ? '일본어' : '한국어'}">
        <span class="lec-tool-icon">${labels[state]}</span>
        <span class="lec-tool-sub">자막</span>
      </button>
    `;
  }
  function _lecToggleCaptionShow() {
    const cur = _lectureCaptionShow();
    const next = cur === 'jp' ? 'ko' : 'jp';
    Store.setSetting('lectureCaptionShow', next);
    // 자막 언어가 바뀌면 단순 클래스 토글로 부족 — 슬라이드 재렌더 (현재 인덱스 유지)
    TTS.stopQueue();
    const lc = _lectureState();
    if (lc) {
      _lecStopTimer();
      _lectureRenderSlide();
    }
  }

  // ── 강의 강사 언어 (라디오: 항상 정확히 하나) ─────────────
  function _lectureInstructor() {
    if (japaneseOnlyInstructor) return 'jp';
    const v = Store.getSetting('lectureInstructor');
    return (v === 'jp' || v === 'ko') ? v : 'ko';
  }
  function _lectureInstructorToggleButton() {
    if (japaneseOnlyInstructor) return '';
    const cur = _lectureInstructor();
    const nextLabel = cur === 'jp' ? '한국어' : '일본어';
    return `
      <button class="lec-display-toggle lec-tool-btn lec-instructor-toggle"
              onclick="App._lecToggleInstructor()"
              type="button"
              title="강사: ${cur === 'jp' ? '일본어' : '한국어'} (클릭 → ${nextLabel})">
        <span class="lec-tool-icon">${cur === 'jp' ? 'JP' : 'KO'}</span>
        <span class="lec-tool-sub">강사</span>
      </button>
    `;
  }
  function _lecToggleInstructor() {
    if (japaneseOnlyInstructor) return;
    const next = _lectureInstructor() === 'ko' ? 'jp' : 'ko';
    _lecSetInstructor(next);
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
      const iconEl = wrap.querySelector('.lec-tool-icon');
      const nameEl = wrap.querySelector('.lec-tool-voice-name');
      const name = (meta.label || meta.key).split(' ')[0];
      if (iconEl && nameEl) {
        nameEl.textContent = name;
        // Update the leading symbol
        const sym = meta.gender === 'F' ? '♀ ' : '♂ ';
        iconEl.firstChild.textContent = sym;
      }
      const subEl = wrap.querySelector('.lec-tool-sub');
      if (subEl) subEl.textContent = meta.gender === 'F' ? '여 성우' : '남 성우';
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
      <button class="lec-display-toggle lec-tool-btn lec-voice-select-wrap lec-voice-${curGender}" id="lecVoiceWrap"
              onclick="App._lecCycleVoice()" type="button" title="강의 성우 변경 (${curGender === 'F' ? '여성' : '남성'} — ${escHtml(curName)})">
        <span class="lec-tool-icon">${curGender === 'F' ? '♀' : '♂'} <span class="lec-tool-voice-name">${escHtml(curName)}</span></span>
        <span class="lec-tool-sub">${curGender === 'F' ? '여 성우' : '남 성우'}</span>
      </button>
    `;
  }

  function _lectureVisualSource(mod, slide) {
    if (ctx.preferModuleVisuals) return ctx.getModuleVisual(mod).image;
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
    // v3는 일본어 강의 + 한국어 자막을 기본값으로 둔다.
    Store.setSetting('lectureCaptionShow', Store.getSetting('lectureCaptionShow') === 'jp' ? 'jp' : 'ko');
    // 강사 선택 화면 항상 표시 — 이전 선택은 "최근" 배지로 강조
    _renderInstructorPickInline(mod, slides[0]);
  }

  // 강사 + 성우 + 모드 통합 선택 화면 — 큰 카드 디자인
  function _renderInstructorPickInline(mod, firstSlide) {
    const visualSrc = _lectureVisualSource(mod, firstSlide);
    const prevLang = japaneseOnlyInstructor ? 'jp' : (Store.getSetting('lectureInstructor') === 'jp' || Store.getSetting('lectureInstructor') === 'ko')
      ? Store.getSetting('lectureInstructor') : 'ko';
    const prevFont = Store.getSetting('lectureBoardFont') === 'plain' ? 'plain' : 'chalk';
    const prevVoice = localStorage.getItem(_voiceKeyForLang(prevLang)) || '';
    const prevCaption = _lectureCaptionShow();
    window.__lecPickState = { lang: prevLang, font: prevFont, voice: prevVoice, caption: prevCaption };

    document.getElementById('flowBody').innerHTML = `
      <div class="lecture-slide lec-pick-slide">
        <div class="lec-reel lec-reel-pick" style="--lc:#6366f1">
          <div class="lec-reel-backdrop shot-1">
            ${visualSrc ? `<img class="lec-scene-img" src="${escHtml(visualSrc)}" alt="">` : ''}
            <div class="lec-reel-dim"></div>
          </div>
          <div class="lec-pick-top">
            <div class="lec-pick-title-row">
              <div>
                <div class="lec-pick-greeting">화자 선택</div>
                <div class="lec-pick-title">${escHtml(mod.name || '강의')}</div>
              </div>
              <span class="lec-pick-badge">JP</span>
            </div>
          </div>
          <div class="lec-pick-bottom">
            <div class="lec-pick-cards">
              ${japaneseOnlyInstructor ? '' : _lecPickCardHTML('ko', prevLang === 'ko')}
              ${_lecPickCardHTML('jp', prevLang === 'jp')}
            </div>
            <div class="lec-pick-options">
              <div class="lec-pick-option-group" id="lecPickFont">
                <span>판서</span>
                <button class="lec-pick-mode-btn ${prevFont === 'chalk' ? 'active' : ''}" data-val="chalk" type="button" onclick="App._lecPickSet('font','chalk')">칠판</button>
                <button class="lec-pick-mode-btn ${prevFont === 'plain' ? 'active' : ''}" data-val="plain" type="button" onclick="App._lecPickSet('font','plain')">노트</button>
              </div>
              <div class="lec-pick-option-group" id="lecPickCaption">
                <span>자막</span>
                <button class="lec-pick-mode-btn ${prevCaption === 'ko' ? 'active' : ''}" data-val="ko" type="button" onclick="App._lecPickSet('caption','ko')">한글</button>
                <button class="lec-pick-mode-btn ${prevCaption === 'jp' ? 'active' : ''}" data-val="jp" type="button" onclick="App._lecPickSet('caption','jp')">일본어</button>
              </div>
            </div>
            <button class="lec-pick-start" type="button" onclick="App._lecPickStart()">
              <span>시작하기</span>
              <span class="lec-pick-start-arrow">▶</span>
            </button>
          </div>
        </div>
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = '';
  }

  function _lecPickCardHTML(lang, active) {
    const voices = (typeof TTS.getAvailableVoices === 'function') ? TTS.getAvailableVoices(lang) : [];
    const selectedVoice = localStorage.getItem(_voiceKeyForLang(lang)) || voices[0]?.key || '';
    const langName = lang === 'ko' ? '한국어 화자' : '일본어 화자';
    const langDesc = lang === 'ko' ? '보조 화자' : '발음 중심';
    const accent = lang === 'ko' ? 'lec-pick-ko' : 'lec-pick-jp';
    return `
      <div class="lec-pick-card ${accent} ${active ? 'is-active' : ''}" data-lang="${lang}"
           onclick="App._lecPickSet('lang','${lang}')">
        <div class="lec-pick-card-head">
          <span class="lec-pick-card-code">${lang === 'ko' ? 'KO' : 'JP'}</span>
          <div class="lec-pick-card-titles">
            <span class="lec-pick-card-main">${langName}</span>
            <span class="lec-pick-card-sub">${langDesc}</span>
          </div>
        </div>
        <div class="lec-pick-card-voices">
          ${voices.slice(0, 4).map((voice, index) => {
            const voiceName = (voice.label || voice.key || `성우 ${index + 1}`).split(' ')[0];
            const voiceMeta = typeof VoiceCharacters !== 'undefined' ? VoiceCharacters.meta(voice.key) : {};
            const isActive = (selectedVoice && selectedVoice === voice.key) || (!selectedVoice && index === 0);
            const safeVoiceKey = String(voice.key || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
            return `
              <button class="lec-pick-voice-chip ${isActive ? 'active' : ''}" type="button"
                      onclick="event.stopPropagation();App._lecPickSet('voice','${safeVoiceKey}','${lang}', this)">
                <span class="lec-pick-voice-face" style="${typeof VoiceCharacters !== 'undefined' ? VoiceCharacters.avatarStyle(voice.key) : ''}"></span>
                <span class="lec-pick-voice-sym">${voice.gender === 'M' ? '♂' : '♀'}</span>
                <span class="lec-pick-voice-name">${escHtml(voiceName)}</span>
                <span class="lec-pick-voice-meta">${escHtml(voiceMeta.role || (voice.gender === 'M' ? '남성 강사' : '여성 강사'))}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function _lecPickSet(field, value, langScope, sourceEl) {
    if (!window.__lecPickState) return;
    if (field === 'lang') {
      if (japaneseOnlyInstructor && value !== 'jp') return;
      window.__lecPickState.lang = value;
      document.querySelectorAll('.lec-pick-card').forEach(c => {
        c.classList.toggle('is-active', c.dataset.lang === value);
      });
    } else if (field === 'voice') {
      const lang = langScope || window.__lecPickState.lang || 'jp';
      window.__lecPickState.lang = lang;
      window.__lecPickState.voice = value;
      localStorage.setItem(_voiceKeyForLang(lang), value);
      document.querySelectorAll('.lec-pick-card').forEach(c => {
        c.classList.toggle('is-active', c.dataset.lang === lang);
      });
      document.querySelectorAll('.lec-pick-voice-chip').forEach(b => b.classList.remove('active'));
      sourceEl?.classList?.add('active');
    } else if (field === 'font') {
      window.__lecPickState.font = value;
      document.querySelectorAll('#lecPickFont .lec-pick-mode-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.val === value);
      });
    } else if (field === 'caption') {
      window.__lecPickState.caption = value === 'jp' ? 'jp' : 'ko';
      document.querySelectorAll('#lecPickCaption .lec-pick-mode-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.val === window.__lecPickState.caption);
      });
    }
  }
  function _lecPickStart() {
    const s = window.__lecPickState;
    if (!s) return;
    Store.setSetting('lectureInstructor', s.lang);
    Store.setSetting('lectureBoardFont', s.font);
    Store.setSetting('lectureCaptionShow', s.caption === 'jp' ? 'jp' : 'ko');
    if (s.voice) localStorage.setItem(_voiceKeyForLang(s.lang), s.voice);
    window.__lecPickState = null;
    _lectureRenderSlide();
  }
  // 레거시 (옛 버튼 호환) — 이전 코드 경로 안전망
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
    const captionState = _lectureCaptionShow();   // 'off' | 'jp' | 'ko'
    const captionLang = captionState === 'off' ? null : captionState;
    const captionText = captionLang === 'ko' ? slide.captionKo
                       : captionLang === 'jp' ? slide.captionJp : '';
    const hasVisibleCaption = !!captionText;
    const captionsShown = captionState !== 'off';
    const instructorVoiceKey = _lectureGetVoice();
    const instructorMeta = typeof VoiceCharacters !== 'undefined' ? VoiceCharacters.meta(instructorVoiceKey) : {};
    const instructorAvatarStyle = typeof VoiceCharacters !== 'undefined' ? VoiceCharacters.avatarStyle(instructorVoiceKey) : '';
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
          <div class="lec-scene-topline lec-scene-topline-compact">
            <div class="lec-topline-meta">
              <span class="lec-live-dot"></span>
              <span>${escHtml(mod.name)}</span>
              <span class="lec-shot-count">${idx + 1}/${slides.length}</span>
            </div>
            ${slide.label ? `<span class="lec-topline-kicker">${escHtml(slide.label)}</span>` : ''}
          </div>

          <div class="lec-board-stack">
            <div class="lec-board ${_lectureBoardFont() === 'plain' ? 'font-plain' : ''}" id="lecBoard">
              ${slide.main ? `<div class="lec-board-title-chalk" id="lecBoardTitle">${escHtml(slide.main.replace(/[（\(]([ぁ-ヶー・]+)[）\)]/g, ''))}</div>` : ''}
              <div class="lec-board-body ${_lectureBoardFont() === 'plain' ? 'font-plain' : ''}" id="lecBoardSub"></div>
              ${slide.audio ? `<div class="lec-board-reading">${escHtml(slide.audio)}</div>` : ''}
            </div>
            ${hasVisibleCaption ? `
            <div class="lec-caption-box lec-caption-box-solo">
              <div class="lec-caption-speaker-face" style="${instructorAvatarStyle}" title="${escHtml(instructorMeta?.role || '화자')}"></div>
              <div class="lec-caption-copy">
                ${captionLang === 'jp'
                  ? `<div class="lec-cap-jp" id="lecCapJp">${ruby(slide.captionJp || '')}</div>`
                  : `<div class="lec-cap-ko" id="lecCapKo">${escHtml(slide.captionKo || '')}</div>`}
              </div>
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
        ${_lectureInstructorToggleButton()}
        ${_lectureVoiceSelect()}
        ${_lectureFontToggleButton()}
        ${_lectureCaptionToggleButton()}
        <button class="lec-display-toggle lec-tool-btn lec-pause-btn" id="btnLecPause"
                aria-label="일시정지"
                onclick="App._lecPauseToggle()">${_lecturePauseButtonLabel(false)}</button>
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
  // __text__ 마크업을 [{text, underline}] 세그먼트로 토큰화
  function _tokenizeUnderline(text) {
    const segs = [];
    let inU = false;
    let buf = '';
    for (let j = 0; j < text.length; j++) {
      if (text[j] === '_' && text[j+1] === '_') {
        if (buf) segs.push({ text: buf, underline: inU });
        buf = '';
        inU = !inU;
        j++; // skip second _
      } else {
        buf += text[j];
      }
    }
    if (buf) segs.push({ text: buf, underline: inU });
    return segs;
  }

  function _lecSubChalk(text) {
    const el = document.getElementById('lecBoardSub');
    if (!el || !text) return 0;
    // 후리가나 제거: 漢字(かな) → 漢字 (괄호 안이 히라가나일 때만)
    const plain = text.replace(/[（\(]([ぁ-ヶー・]+)[）\)]/g, '');
    const segments = _tokenizeUnderline(plain);
    const PER_CHAR = 45;
    let i = 0;
    const parts = [];
    for (const seg of segments) {
      for (const ch of [...seg.text]) {
        if (ch === '\n') { parts.push('<br>'); continue; }
        const cls = _chalkClass(ch);
        const uCls = seg.underline ? ' chk-underline' : '';
        const content = ch === ' ' ? '&nbsp;' : escHtml(ch);
        parts.push(`<span class="chalk-char${cls ? ' ' + cls : ''}${uCls}" style="animation-delay:${i * PER_CHAR}ms">${content}</span>`);
        i++;
      }
    }
    el.innerHTML = parts.join('');
    const totalDur = i * PER_CHAR + 200;
    // 첫 fit — 칠판 영역 내 자동 폰트 축소 (overflow 방지)
    requestAnimationFrame(_lecFitBoard);
    // 애니메이션 완료 후 — 후리가나 ruby + 밑줄 포함된 정착 버전으로 교체 + 재fit
    setTimeout(() => {
      const el2 = document.getElementById('lecBoardSub');
      if (el2) el2.innerHTML = _buildRichBoardText(text);
      requestAnimationFrame(_lecFitBoard);
    }, totalDur + 100);
    return totalDur;
  }

  // 칠판 본문 폰트를 영역에 맞게 자동 축소 (overflow 방지)
  function _lecFitBoard() {
    const body = document.getElementById('lecBoardSub');
    const board = document.getElementById('lecBoard');
    if (!body || !board) return;
    body.style.fontSize = '';  // 기본 크기 리셋
    const minPx = 11;
    const startPx = parseFloat(getComputedStyle(body).fontSize) || 20;
    let size = startPx;
    const availH = board.clientHeight - 24;  // padding 여유
    let guard = 60;
    while (size > minPx && body.scrollHeight > availH && guard-- > 0) {
      size -= 0.5;
      body.style.fontSize = size + 'px';
    }
  }

  // 정착 후 칠판 본문 — 후리가나 ruby + 글자별 색상 클래스 + __밑줄__ 보존
  function _buildRichBoardText(text) {
    let result = '';
    let i = 0;
    let inU = false;
    while (i < text.length) {
      // __밑줄__ 토글 토큰
      if (text[i] === '_' && text[i+1] === '_') {
        inU = !inU;
        i += 2;
        continue;
      }
      const uCls = inU ? ' chk-underline' : '';
      const rest = text.slice(i);
      // 漢字(かな) 패턴 → ruby
      const m = rest.match(/^([一-鿿々]+)[（\(]([ぁ-ヶー・]+)[）\)]/);
      if (m) {
        const [whole, kanji, furi] = m;
        result += `<ruby class="chk-ruby${uCls}">${escHtml(kanji)}<rt class="chk-furi">${escHtml(furi)}</rt></ruby>`;
        i += whole.length;
        continue;
      }
      const ch = text[i];
      if (ch === '\n') { result += '<br>'; i++; continue; }
      const cls = _chalkClass(ch);
      const content = ch === ' ' ? '&nbsp;' : escHtml(ch);
      result += `<span class="${cls}${uCls}">${content}</span>`;
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

  const _JP_TEXT_RE = /[\u3040-\u30ff\u3400-\u9fff々〆ヶー]+/g;
  function _captionLinesForTts(sentences, lang, lectureVoice) {
    if (lang === 'jp') {
      return sentences.map((text, elementIndex) => ({
        text: _koToKatakana(text).trim(),
        voice: lectureVoice,
        elementIndex,
      })).filter(line => line.text);
    }

    const jpVoice = TTS.getDefaultVoice ? TTS.getDefaultVoice() : 'nanami';
    return sentences.flatMap((sentence, elementIndex) => {
      const lines = [];
      let cursor = 0;
      const text = String(sentence || '');
      for (const match of text.matchAll(_JP_TEXT_RE)) {
        const jpStart = match.index || 0;
        const jpText = match[0].trim();
        const koText = text.slice(cursor, jpStart).trim();
        if (koText) lines.push({ text: koText, voice: lectureVoice, elementIndex });
        if (jpText) {
          lines.push({
            text: jpText,
            voice: jpVoice,
            elementIndex,
            gapBeforeMs: 1000,
            gapAfterMs: 1000,
          });
        }
        cursor = jpStart + match[0].length;
      }
      const rest = text.slice(cursor).trim();
      if (rest) lines.push({ text: rest, voice: lectureVoice, elementIndex });
      return lines.length ? lines : [{ text, voice: lectureVoice, elementIndex }];
    });
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

    // ④ 폴백: Web Speech 큐
    // 한국어 강의 안의 일본어 조각은 전후 1초 쉬고 일본어 화자로 읽는다.
    const lines = _captionLinesForTts(sentences, lang, lectureVoice);
    TTS.speakQueue(lines, {
      onLineStart: (i) => {
        const elementIndex = lines[i]?.elementIndex ?? i;
        document.querySelectorAll('.' + sentClass).forEach(el => el.classList.remove('reading'));
        document.getElementById(`${sentIdPrefix}${elementIndex}`)?.classList.add('reading');
        document.getElementById(`${sentIdPrefix}${elementIndex}`)?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
      },
      onLineEnd: (i) => {
        const elementIndex = lines[i]?.elementIndex ?? i;
        document.getElementById(`${sentIdPrefix}${elementIndex}`)?.classList.remove('reading');
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
    if (japaneseOnlyInstructor) return;
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
    toggleInstructor: _lecToggleInstructor,
    pickInstructor: _lecPickInstructor,
    pickSet: _lecPickSet,
    pickStart: _lecPickStart,
    toggleCaptionShow: _lecToggleCaptionShow,
    toggleBoardFont: _lecToggleBoardFont,
    setVoice: _lectureSetVoice,
    cycleVoice: _lectureCycleVoice,
    stopLecture,
  };
};
