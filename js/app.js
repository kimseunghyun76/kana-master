// ============================================================
//  KANA MASTER - Main App Logic
//  학습 / 퀴즈 / 필기 / 진도 전체 관리
// ============================================================

// ─── ES6 모듈 import ───
import { state, loadFromStorage, applyStoredData, saveToStorage } from './modules/state.js';
import { stripFurigana, cleanJaText, _makeEl, _escHtml, _injectRuby, showToast } from './modules/utils.js';
import { srsReview, gradeFromResult, isDue, sortBySRS, countDueToday, getSRSSummary } from './modules/srs.js';
import { getStrokeData, getStrokeCount } from './modules/stroke-data.js';
import { getJLPT, jlptBadgeHtml, getJLPTProgress, getItemJLPT } from './modules/jlpt.js';
import {
  registerCallbacks,
  checkVoicevox, voicevoxAvailable, voicevoxSpeakers, vvCharPortraits,
  updateVvPortraitUI, populateVoicevoxSelects, refreshSplashActors,
  buildSlotAvatarHtml, buildSlotItemHtml, updateActiveSpeakerBadge,
  allJaVoices, voicesCached, CHARACTER_VOICES, NATURAL_VOICES, MICROSOFT_VOICES,
  loadJapaneseVoices, populateVoiceSelects, restoreVoiceSelects,
  playTestVoice, getVoiceForPlayback, getVoiceDisplayName,
  _autoSelectBestVoices, _hasMicrosoftVoice,
  playAudio, playAudioSlot, playVoicevox, hasSpeakerConfigured,
  stopAllAudio, startReadAll,
  loadAmbientTracks, startAmbient, stopAmbient, syncSidebarVisibility,
  duckAmbient, unduckAmbient, enterDialogueMode, exitDialogueMode,
  stopAmbientLoud, stopQuizAmbientLoud,
  showVoiceBadge, hideVoiceBadgeNow, showAmbientBadge, hideAmbientBadge,
  showSpeakingIndicator, showSpeakingIndicatorWeb, hideSpeakingIndicator,
  speakCheer, _getQuizCheers, _pickCheer, _showCheerBanner,
  buildSplashSpeakerPicker,
  _ambAudio, _ambDucked, _ambTracks, _ambFadeTo, _ambTargetVol,
  _speakTimeoutJa, _ttsPaused, setTtsPaused,
} from './modules/tts.js';

// ─── 단어 데이터 ───
// app.html 에서 로드된 전역 변수들 결합
const VOCAB_ITEMS = [
  ...(typeof VOCAB_ITEMS_W1W4 !== 'undefined' ? VOCAB_ITEMS_W1W4 : []),
  ...(typeof VOCAB_ITEMS_W5W8 !== 'undefined' ? VOCAB_ITEMS_W5W8 : []),
  ...(typeof VOCAB_ITEMS_W9W10 !== 'undefined' ? VOCAB_ITEMS_W9W10 : []),
  ...(typeof VOCAB_ITEMS_S1S5 !== 'undefined' ? VOCAB_ITEMS_S1S5 : []),
  ...(typeof VOCAB_ITEMS_S6SIM !== 'undefined' ? VOCAB_ITEMS_S6SIM : []),
  ...(typeof VOCAB_ITEMS_DIALOGUE !== 'undefined' ? VOCAB_ITEMS_DIALOGUE : []),
  ...(typeof VOCAB_ITEMS_IT_SIM !== 'undefined' ? VOCAB_ITEMS_IT_SIM : [])
];

const VOCAB_MAP = {};
VOCAB_ITEMS.forEach(item => { VOCAB_MAP[item.id] = item; });

function getVocabCategoryItems(categoryId) {
  if (typeof VOCAB_CATEGORIES === 'undefined') return [];
  const cat = VOCAB_CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return [];
  return cat.items.map(id => VOCAB_MAP[id]).filter(Boolean);
}

function getVocabWrongOptions(correctId, categoryId, count = 3) {
  if (typeof VOCAB_CATEGORIES === 'undefined') return [];
  const sameCategory = VOCAB_CATEGORIES.find(c => c.id === categoryId);
  const samePhase = VOCAB_CATEGORIES.filter(c => {
    const cat = VOCAB_CATEGORIES.find(x => x.id === categoryId);
    return cat && c.phase === cat.phase && c.id !== categoryId;
  });
  let pool = [];
  if (sameCategory) {
    pool = sameCategory.items.filter(id => id !== correctId).map(id => VOCAB_MAP[id]).filter(Boolean);
  }
  if (pool.length < count) {
    samePhase.forEach(cat => {
      cat.items.forEach(id => {
        if (id !== correctId && !pool.find(p => p.id === id)) {
          pool.push(VOCAB_MAP[id]);
        }
      });
    });
  }
  if (pool.length < count) {
    VOCAB_ITEMS.forEach(item => {
      if (item.id !== correctId && !pool.find(p => p.id === item.id)) {
        pool.push(item);
      }
    });
  }
  return pool.sort(() => Math.random() - 0.5).slice(0, count);
}

const App = (() => {
  // 강의 화자: 슬롯1/슬롯2 번갈아 사용 (남녀 교대)
  let _lectureSpeakerSlot = 1;

  // 강의 전용 화자 슬롯 (슬롯1↔슬롯2 교대)
  function _speakLecCaption(text, onEnd) {
    if (!text || _lecAudioMuted) { if (onEnd) setTimeout(onEnd, 500); return; }
    const clean = text.replace(/（[^）]*）|\([^)]*\)/g, '').replace(/[（）()]/g, '').trim();
    if (!clean) { if (onEnd) setTimeout(onEnd, 500); return; }
    window.speechSynthesis && window.speechSynthesis.cancel();
    const slot = _lectureSpeakerSlot;
    _lectureSpeakerSlot = _lectureSpeakerSlot === 1 ? 2 : 1;
    // ★ 내비 버튼은 TTS 중에도 항상 활성화
    playAudioSlot(clean, slot).then(() => {
      if (onEnd) onEnd();
    }).catch(() => {
      if (onEnd) onEnd();
    });
  }

  // 강의 내비 버튼 활성/비활성 헬퍼
  function _setLecNavEnabled(enabled) {
    const ids = ['lec-prev-btn', 'lec-next-btn', 'lec-play-btn', 'lec-audio-btn', 'lec-next-guide-btn'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.disabled = !enabled;
        el.style.opacity = enabled ? '' : '0.35';
        el.style.pointerEvents = enabled ? '' : 'none';
      }
    });
  }

  // ─── 초기화 ───
  function init() {
    // tts.js 외부 콜백 주입 (순환 의존성 없이 UI 헬퍼 연결)
    registerCallbacks({
      syncHdrIconButtons,
      updateHqAmbientLabel,
      uiTier: _uiTier,
    });
    loadAmbientTracks();   // sounds/index.json 비동기 로드 (앱 시작 시 1회)
    syncSidebarVisibility(); // 초기 로드 시 하단 바 숨김 (TTS·배경음 모두 꺼진 상태)
    loadFromStorage(() => {
      applyVisibilityPrefs();   // ← 저장된 표시 설정 즉시 적용
      hideAmbientBadge(); // 배경음 버튼 항상 표시 (idle 상태)
      updateHeader();
      _initGamification();
      renderLevels();
      setupNavigation();
      setupSettings();
      setupHqButtons();
      checkContinue();
      handleURLParam();
      setupKeyboardNav();
      renderBookmarkSection();
      setupBookmarkButtons();
      // 헤더 화자 슬롯 초기 렌더 (모바일·데스크탑 모두)
      const _showBadgeOnInit = () => updateActiveSpeakerBadge();
      if (window.speechSynthesis) {
        if (window.speechSynthesis.getVoices().length > 0) {
          setTimeout(_showBadgeOnInit, 300);
        } else {
          window.speechSynthesis.onvoiceschanged = () => { setTimeout(_showBadgeOnInit, 100); };
          setTimeout(_showBadgeOnInit, 800);
        }
      } else {
        setTimeout(_showBadgeOnInit, 300);
      }
      // 온보딩 (첫 방문 시)
      _showOnboardingIfNew();
      // ── TTS 엔진 시작 시 자동 연결 ──
      // VOICEVOX: 저장된 설정이 있거나 엔진 미설정(최초 실행) 시 항상 우선 시도
      const _noEngineSet = !state.prefs.useVoicevox && !state.prefs.useEdgeTTS;
      if (state.prefs.useVoicevox || _noEngineSet) {
        checkVoicevox().then(ok => {
          if (ok) {
            // 연결 성공 → VOICEVOX를 기본 엔진으로 활성화
            state.prefs.useVoicevox = true;
            saveToStorage();
            populateVoicevoxSelects();
            updateActiveSpeakerBadge();
            const vvChip = document.getElementById('voicevox-status');
            if (vvChip) {
              vvChip.className = 'tts-status-chip tts-status-success';
              vvChip.textContent = `✅ ${voicevoxSpeakers.length}개 화자 연결됨`;
            }
          } else {
            // 연결 실패 — 저장값만 초기화 (Web TTS로 유지, UI 설정 패널에서 재시도 가능)
            if (state.prefs.useVoicevox) {
              state.prefs.useVoicevox = false;
              saveToStorage();
            }
            const vvChip = document.getElementById('voicevox-status');
            if (vvChip && vvChip.textContent === '연결 시도 중...') {
              vvChip.className = 'tts-status-chip tts-status-fail';
              vvChip.textContent = '❌ 연결 실패';
            }
          }
        });
      }
      // Edge TTS가 켜진 채 저장된 경우 앱 시작 시 자동 연결
      if (state.prefs.useEdgeTTS && typeof EdgeTTSModule !== 'undefined') {
        EdgeTTSModule.configure({
          url:    state.prefs.edgeTTSUrl,
          voice1: state.prefs.edgeTTSVoice1,
          voice2: state.prefs.edgeTTSVoice2,
        });
        EdgeTTSModule.checkServer().then(ok => {
          if (!ok) { state.prefs.useEdgeTTS = false; saveToStorage(); }
        });
      }
    });
  }

  function handleURLParam() {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    const sub  = params.get('sub');
    if (!view) return;
    // kana 뷰에서 sub(flash/browse) 처리
    if (view === 'kana' && sub) {
      showView('kana');
      setTimeout(() => startLearn(state.currentLevel, sub), 200);
    } else {
      showView(view);
    }
  }

  // ─── 헤더 ───
  function updateHeader() {
    // settings 모달 스탯 업데이트
    const sl = document.getElementById('settings-level');
    const sx = document.getElementById('settings-xp');
    const ss = document.getElementById('settings-streak');
    if (sl) sl.textContent = 'Lv.' + state.currentLevel;
    if (sx) sx.textContent = state.totalXP + ' XP';
    if (ss) ss.textContent = state.streak + '🔥';
  }

  function updateHqSpeakerLabel() {
    const lbl = document.getElementById('hq-speaker-label');
    if (!lbl) return;
    const prefs = state.prefs;
    let name = '없음';
    if (prefs.useVoicevox && prefs.voicevoxSpeaker1 !== undefined) {
      const sel = document.getElementById('pref-voicevox-speaker1');
      if (sel && sel.selectedOptions[0]) {
        const t = sel.selectedOptions[0].text;
        name = t.length > 7 ? t.slice(0, 7) + '…' : t;
      } else { name = 'VV'; }
    } else if (prefs.voiceFemale && prefs.voiceFemale !== 'none') {
      const sel = document.getElementById('pref-voice-female');
      if (sel && sel.selectedOptions[0]) {
        const t = sel.selectedOptions[0].text;
        name = t.length > 7 ? t.slice(0, 7) + '…' : t;
      } else { name = '설정됨'; }
    }
    lbl.textContent = name;
  }

  function updateHqAmbientLabel() {
    const btn = document.getElementById('hq-ambient-btn');
    const lbl = document.getElementById('hq-ambient-label');
    if (!lbl || !btn) return;
    const ambBadge = document.getElementById('ambient-music-badge');
    const isPlaying = ambBadge && ambBadge.style.display !== 'none' && !ambBadge.classList.contains('stopping');
    lbl.textContent = isPlaying ? 'ON' : 'OFF';
    btn.classList.toggle('hq-on', isPlaying);
  }

  function setupHqButtons() {
    // 헤더 화자 버튼: 설정 모달 → 음성 섹션
    const speakerBtn = document.getElementById('hdr-speaker-btn');
    if (speakerBtn) {
      speakerBtn.addEventListener('click', () => {
        document.getElementById('settings-modal').style.display = 'flex';
        setTimeout(() => {
          const voiceSection = document.getElementById('webtts-settings') || document.getElementById('voicevox-speaker-rows');
          if (voiceSection) voiceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      });
    }
    // 헤더 배경음 버튼: 재생 중이면 정지, 아니면 시작 or 설정
    const ambientBtn = document.getElementById('hdr-ambient-btn');
    if (ambientBtn) {
      ambientBtn.addEventListener('click', () => {
        const ambBadge = document.getElementById('ambient-music-badge');
        const isPlaying = ambBadge && ambBadge.style.display !== 'none' && !ambBadge.classList.contains('stopping');
        if (isPlaying) {
          stopAmbient(0.8);
        } else if (state.prefs.ambientDialogue && state.prefs.ambientDialogue !== 'none') {
          startAmbient('on', 'dialogue');
        } else {
          document.getElementById('settings-modal').style.display = 'flex';
          setTimeout(() => {
            const sec = document.querySelector('[data-section="ambient"]') ||
                        document.querySelector('.setting-section-title:last-of-type');
            if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      });
    }
  }

  // 배지 표시 상태에 따라 헤더 아이콘 버튼 토글 (버튼은 항상 표시)
  function syncHdrIconButtons() {
    // 버튼은 항상 보임 — 배지와 함께 공존
  }

  // ─── 네비게이션 ───
  function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        showView(view);
      });
    });
    // 하단 4-탭 바인딩
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.dataset.view;
        showView(view);
      });
    });
  }

  function showView(viewName) {
    // 화면 전환 시 TTS 즉시 취소
    window.speechSynthesis && window.speechSynthesis.cancel();
    if (state.currentVvAudio) { try { state.currentVvAudio.pause(); state.currentVvAudio.src = ''; } catch(e){} state.currentVvAudio = null; }
    // 전체화면 모드 해제
    document.body.classList.remove('fc-fullscreen');
    // 뷰 전환 시 배경음·오디오·타이머 정지 (정지 배지 표시 않고 숨김)
    stopAmbient(1.2, false);
    // 완료 프롬프트 정리
    ['learn-complete-prompt','vocab-complete-prompt'].forEach(id => {
      const el = document.getElementById(id); if (el) el.remove();
    });
    stopAllAudio();
    clearVocabAutoAdvance();
    clearFcAutoAdvance();
    state.fcReadSession = (state.fcReadSession || 0) + 1;
    state.vocabReadSession = (state.vocabReadSession || 0) + 1;
    if (ss.timer) { clearTimeout(ss.timer); ss.timer = null; ss.paused = true;
      const _ssp = document.getElementById('slideshow-panel'); if (_ssp) _ssp.style.display = 'none';
      const _bg = document.getElementById('browse-grid'); if (_bg) _bg.style.display = '';
    }
    // vocab slideshow도 중단
    const _vssp = document.getElementById('vbc-slideshow-panel'); if (_vssp && _vssp.style.display !== 'none') {
      _vssp.style.display = 'none';
      const _vbg = document.getElementById('vocab-browse-grid'); if (_vbg) _vbg.style.display = '';
    }
    if (state.quizCountdownTimer) { clearInterval(state.quizCountdownTimer); state.quizCountdownTimer = null; }
    if (_qiSpeechTimer) { clearInterval(_qiSpeechTimer); _qiSpeechTimer = null; }
    if (typeof _qiCountdownTimer !== 'undefined' && _qiCountdownTimer) { clearInterval(_qiCountdownTimer); _qiCountdownTimer = null; }
    if (typeof _vqSpeechTimer !== 'undefined' && _vqSpeechTimer) { clearInterval(_vqSpeechTimer); _vqSpeechTimer = null; }
    if (typeof _vqCountdownTimer !== 'undefined' && _vqCountdownTimer) { clearInterval(_vqCountdownTimer); _vqCountdownTimer = null; }

    // lecture 뷰는 nav 하이라이트 없이 독립 전환
    if (viewName === 'lecture') {
      document.querySelectorAll('.view').forEach(v => { v.classList.remove('active'); v.style.display = ''; });
      const lv = document.getElementById('view-lecture');
      if (lv) { lv.classList.add('active'); lv.style.display = 'flex'; }
      document.body.classList.add('lecture-active');
      state.currentView = 'lecture';
      return;
    }
    document.body.classList.remove('lecture-active');
    // vocab/convo/roleplay 는 모두 view-vocab 을 공유하되 섹션만 다름
    const vocabSectionMap = { vocab: 'word', convo: 'sentence', roleplay: 'sim' };
    const isVocabSection = viewName in vocabSectionMap;
    const actualViewName = isVocabSection ? 'vocab' : viewName;   // DOM view id
    const navViewName    = viewName;                               // nav 하이라이트용

    state.currentView = navViewName;

    // nav 활성화 (vocab·convo·roleplay 는 각자 하이라이트)
    document.querySelectorAll('.nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.view === navViewName);
    });

    // 하단 4-탭 active 처리
    const tabMap = { home: 'home', kana: 'home', vocab: 'home', convo: 'home', roleplay: 'home',
                     practice: 'practice', quiz: 'practice', write: 'practice',
                     yomu: 'yomu', mypage: 'mypage', progress: 'mypage', lecture: 'home' };
    const activeTab = tabMap[navViewName] || 'home';
    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.view === activeTab);
    });

    // view 전환 — lecture inline style도 반드시 초기화
    document.querySelectorAll('.view').forEach(v => { v.classList.remove('active'); v.style.display = ''; });

    // 뷰 전환 시 가나 플래시카드 관련 요소 강제 초기화 (다른 마스터 뷰에 잔존 방지)
    ['flashcard-area', 'browse-area', 'learn-header', 'kana-select-panel'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    // 가나 플래시카드 앞면 카드도 초기화
    const fcCard = document.querySelector('#flashcard-area .flashcard');
    if (fcCard) { fcCard.classList.remove('flipped'); }

    const target = document.getElementById('view-' + actualViewName);
    if (target) target.classList.add('active');

    // 뷰별 초기화
    if (actualViewName === 'home')     renderLevels();
    if (actualViewName === 'kana')     { setupKanaSelectView(); renderDailyKatakana(); }
    if (actualViewName === 'quiz')     setupQuizView();
    if (actualViewName === 'write')    setupWriteView();
    if (actualViewName === 'progress') renderProgress();
    if (actualViewName === 'yomu')     setupYomuView();
    if (actualViewName === 'practice') _initPracticeHub();
    if (actualViewName === 'mypage')   _renderMypage();
    if (isVocabSection) {
      state.vocabSection = vocabSectionMap[viewName];
      setupVocabView();
      if (viewName === 'vocab')    renderDailyVocabItem();
      if (viewName === 'convo')    renderDailyConvo();
      if (viewName === 'roleplay') renderDailySimItem();
    }
  }

  // ─── 홈 ───
  function renderLevels() {
    renderRecentSection();
    renderHomeSections();
    renderBookmarkSection();
  }

  // ── 히어로: 오늘의 한자 + 예시 문장 통합 카드 ──
  let _heroKanjiOffset = 0;
  let _kanaHeroOffset = 0;
  let _vocabHeroOffset = 0;
  let _convoHeroOffset = 0;
  let _simHeroOffset = 0;

  function initHeroRolling() {
    // 슬라이더 제거 — 통합 카드 초기화
    setupHeroKanji(0);

    // 다른 한자 버튼
    const kanjiRefresh = document.getElementById('hero-kanji-refresh-btn');
    if (kanjiRefresh && !kanjiRefresh._heroBound) {
      kanjiRefresh._heroBound = true;
      kanjiRefresh.addEventListener('click', (e) => {
        e.stopPropagation();
        kanjiRefresh.classList.add('spinning');
        setTimeout(() => kanjiRefresh.classList.remove('spinning'), 500);
        _heroKanjiOffset++;
        setupHeroKanji(_heroKanjiOffset);
      });
    }
  }

  function setupHeroKanji(offset) {
    if (typeof VOCAB_ITEMS === 'undefined') return;

    // ── 후보: kanji 필드에 한자가 있는 단어 (〜 패턴·화자 제외)
    const kanjiRe = /[\u4e00-\u9fff]/;
    const kanjiItems = VOCAB_ITEMS.filter(item => {
      if (!item.kanji || !item.korean || item.speaker) return false;
      const s = stripFurigana(item.kanji).replace(/[〜～\s]/g, '');
      if (!kanjiRe.test(s)) return false;
      if (/〜/.test(item.kanji) || (item.japanese || '').startsWith('〜')) return false;
      const kanjiOnly = s.replace(/[^\u4e00-\u9fff]/g, '');
      return kanjiOnly.length >= 1 && kanjiOnly.length <= 4;
    });
    if (!kanjiItems.length) return;

    const baseIdx = Math.floor(Date.now() / 86400000);
    const item = kanjiItems[(baseIdx + (offset || 0)) % kanjiItems.length];

    // ── 핵심 정보
    const rawKanji  = stripFurigana(item.kanji || '');
    const kanjiOnly = rawKanji.replace(/[^\u4e00-\u9fff]/g, '');  // 순수 한자 문자만
    const reading   = (item.japanese || '').replace(/〜/g, '').trim();
    const meaning   = (item.korean || '').trim();
    const english   = (item.english || '').trim();

    // ── DOM 기본 정보 업데이트
    // ★ hero 버튼에는 순수 한자만 표시 (후리가나/가나 없이)
    const charEl    = document.getElementById('hero-kanji-char');
    const furiEl    = document.getElementById('hero-kanji-furigana');
    const meaningEl = document.getElementById('hero-kanji-meaning');
    const englishEl = document.getElementById('hero-kanji-english');
    if (charEl) {
      charEl.textContent = kanjiOnly;   // ← 순수 한자만
      charEl.onclick = () => playAudio(reading || kanjiOnly);
    }
    if (furiEl)    furiEl.textContent = reading;
    if (meaningEl) meaningEl.textContent = meaning;
    if (englishEl) englishEl.textContent = english;

    // ── 개별 한자 분해 (1자 이상이면 모두 표시)
    const decompSec   = document.getElementById('hero-decomp-section');
    const decompChips = document.getElementById('hero-decomp-chips');
    const hasDecomp   = typeof KANJI_INFO !== 'undefined' && kanjiOnly.length >= 1;

    if (decompSec) decompSec.style.display = hasDecomp ? '' : 'none';

    if (hasDecomp && decompChips) {
      decompChips.innerHTML = '';
      for (const ch of kanjiOnly) {
        const info = KANJI_INFO[ch];
        const chip = document.createElement('div');
        chip.className = 'hero-decomp-chip';
        // 후리가나: reading 에서 이 글자 위치의 읽기를 추출 (없으면 KANJI_INFO에서 가져옴)
        const chReading = info ? info.r : '—';
        const chMeaning = info ? info.m : '';
        const chEnglish = info ? (info.e || '') : '';
        chip.innerHTML = `
          <div class="hdc-char">${ch}</div>
          <div class="hdc-reading">${chReading}</div>
          <div class="hdc-meaning">${chMeaning}${chEnglish ? `<span class="hdc-en"> ${chEnglish}</span>` : ''}</div>`;
        chip.addEventListener('click', () => playAudio(ch));
        decompChips.appendChild(chip);
      }
    }

    // ── 예시 문장 찾기: KANJI_EXAMPLES → VOCAB_EXAMPLES_DB → VOCAB_ITEMS → tip
    const sentEl  = document.getElementById('hero-sentence');
    const transEl = document.getElementById('hero-translation');
    let exJp = '', exKo = '';

    // 1순위: KANJI_EXAMPLES (신뢰할 수 있는 큐레이션 데이터)
    if (typeof KANJI_EXAMPLES !== 'undefined' && KANJI_EXAMPLES[item.id]) {
      const ex = KANJI_EXAMPLES[item.id][0];
      exJp = ex.jp || '';
      exKo = ex.ko || '';
    }

    // 2순위: VOCAB_EXAMPLES_DB (sentences 배열)
    if (!exJp && typeof VOCAB_EXAMPLES_DB !== 'undefined' && VOCAB_EXAMPLES_DB[item.id]) {
      const db = VOCAB_EXAMPLES_DB[item.id];
      const sent = db.sentences && db.sentences[0];
      if (sent) { exJp = sent.japanese || ''; exKo = sent.meaning || ''; }
      if (!exJp) {
        const comp = db.compounds && db.compounds[0];
        if (comp) { exJp = comp.japanese || ''; exKo = comp.meaning || ''; }
      }
    }

    // 3순위: VOCAB_ITEMS 중 kanjiOnly가 포함된 더 긴 문장
    if (!exJp && kanjiOnly) {
      const matches = VOCAB_ITEMS.filter(v => {
        if (v.id === item.id || v.speaker || !v.korean) return false;
        if ((v.japanese || '').includes('〜') || (v.kanji || '').includes('〜')) return false;
        const vk = stripFurigana(v.kanji || '');
        const vj = v.japanese || '';
        return vk.includes(kanjiOnly) || vj.includes(kanjiOnly);
      }).sort((a, b) => {
        const la = (a.japanese || '').length;
        const lb = (b.japanese || '').length;
        return lb - la;
      });
      const best = matches.find(v =>
        (stripFurigana(v.kanji || '') || v.japanese || '').length > kanjiOnly.length
      );
      if (best) {
        exJp = stripFurigana(best.kanji || '') || (best.japanese || '');
        exKo = best.korean || '';
      }
    }

    // 4순위: item 자체의 example 필드
    if (!exJp && item.example && !/〜/.test(item.example)) {
      exJp = item.example;
    }

    // 5순위: tip (일본어 포함 시)
    if (!exJp && item.tip && /[\u3040-\u9fff]/.test(item.tip)) {
      exJp = item.tip;
    }

    // ── 예시 렌더 — kanjiOnly를 강조 표시
    if (sentEl) {
      if (exJp) {
        const cleanJp = cleanJaText(exJp);
        const esc = kanjiOnly.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const hl  = esc
          ? cleanJp.replace(new RegExp(esc, 'g'), `<span class="hero-ex-kanji-hl">${kanjiOnly}</span>`)
          : cleanJp;
        sentEl.innerHTML = hl;
        sentEl.onclick   = () => playAudio(cleanJp);
        sentEl.style.cursor = 'pointer';
      } else {
        // 최후 수단: 단어 자체를 예시로 사용
        const fallback = `${rawKanji}（${reading}）— ${meaning}`;
        sentEl.textContent = fallback;
        sentEl.onclick = () => playAudio(reading);
        sentEl.style.cursor = 'pointer';
      }
    }
    if (transEl) transEl.textContent = exKo;
  }

  // ─── 전체 가나 레벨 그리드 렌더 (かな뷰 선택 패널용) ───
  function buildLevelCard(level) {
    const isUnlocked = state.unlockedLevels.includes(level.id);
    const isCurrent  = level.id === state.currentLevel;
    const prog       = getLevelProgress(level);
    const isCompleted = prog >= 100;
    const isSpecial  = level.id === 12;

    const card = document.createElement('div');
    card.className = 'level-card' +
      (isCompleted ? ' completed' : '') +
      (isCurrent && !isCompleted ? ' active-level' : '') +
      (!isUnlocked ? ' locked' : '') +
      (isSpecial ? ' level-special' : '');

    let badgeClass = 'locked-badge', badgeText = '🔒 잠김';
    if (isUnlocked) {
      if (isSpecial)    { badgeClass = 'special-badge'; badgeText = '⭐ 최종 복습'; }
      else if (isCompleted) { badgeClass = 'done';    badgeText = '✓ 완료'; }
      else if (isCurrent)   { badgeClass = 'current'; badgeText = '▶ 진행 중'; }
      else { badgeClass = ''; badgeText = ''; }
    }
    const xpNeeded = isUnlocked ? '' : `<div style="font-size:11px;color:#718096;margin-top:4px">🔓 ${level.unlockXP} XP 필요</div>`;

    card.innerHTML = `
      ${badgeText ? `<div class="lc-badge ${badgeClass}">${badgeText}</div>` : ''}
      <div class="lc-name">${level.name}</div>
      <div class="lc-title">${level.title}</div>
      <div class="lc-sub">${level.subtitle}</div>
      ${xpNeeded}
      <div class="lc-prog-bar"><div class="lc-prog-fill" style="width:${prog}%"></div></div>
      <div class="lc-prog-text">${isSpecial ? '전체 가나 랜덤 복습' : `${prog}% 완료 · ${level.chars.length}자`}</div>
      ${isUnlocked ? `
        <div class="lc-actions">
          <button class="lc-btn lc-btn-learn">${_uiText('학습','学習')}</button>
          <button class="lc-btn lc-btn-browse">${_uiText('일람','一覧')}</button>
          <button class="lc-btn lc-btn-quiz">${_uiText('퀴즈','クイズ')}</button>
        </div>` : ''}
    `;
    if (isUnlocked) {
      card.querySelector('.lc-btn-learn').addEventListener('click', (e) => { e.stopPropagation(); startLearn(level.id, 'flash'); });
      card.querySelector('.lc-btn-browse').addEventListener('click', (e) => { e.stopPropagation(); startLearn(level.id, 'browse'); });
      card.querySelector('.lc-btn-quiz').addEventListener('click', (e) => { e.stopPropagation(); startQuizForLevel(level.id); });
    } else {
      card.addEventListener('click', () => showToast(`${level.unlockXP} XP가 필요합니다! 현재 ${state.totalXP} XP`));
    }
    return card;
  }

  function renderFullLevelGrid(gridEl) {
    if (!gridEl || gridEl.children.length > 0) return;
    const groupLabels = {
      1: { icon: 'ひ', label: 'ひらがな', sub: '히라가나' },
      4: { icon: 'カ', label: 'カタカナ',  sub: '가타카나' },
      7: { icon: '📚', label: '종합 · 특수', sub: '통합 복습 & 심화' },
    };
    LEVELS.forEach(level => {
      if (groupLabels[level.id]) {
        const g = groupLabels[level.id];
        const sep = document.createElement('div');
        sep.className = 'levels-group-sep';
        sep.innerHTML = `<span class="lgs-icon">${g.icon}</span><span class="lgs-label">${g.label}</span><span class="lgs-sub">${g.sub}</span>`;
        gridEl.appendChild(sep);
      }
      gridEl.appendChild(buildLevelCard(level));
    });
  }

  // ─── 홈 최근 활동 섹션 ───
  function renderRecentSection() {
    const section = document.getElementById('home-recent');
    const list    = document.getElementById('home-recent-list');
    if (!section || !list) return;
    const recent = state.recentActivity.slice(0, 4);
    if (recent.length === 0) { section.style.display = 'none'; return; }
    section.style.display = 'block';
    list.innerHTML = '';

    recent.forEach(act => {
      if (act.type === 'kana') {
        const level = LEVELS.find(l => l.id === act.id);
        if (!level) return;
        list.appendChild(buildHomeCard({
          badge: '✍️ 가나', badgeType: 'kana',
          name: level.name, sub: level.title,
          prog: getLevelProgress(level), progText: `${level.chars.length}자`,
          btns: [
            { label: _uiText('학습','学習'), fn: () => startLearn(level.id, 'flash') },
            { label: _uiText('퀴즈','クイズ'), fn: () => startQuizForLevel(level.id) },
          ]
        }));
      } else {
        const cat = typeof VOCAB_CATEGORIES !== 'undefined' && VOCAB_CATEGORIES.find(c => c.id === act.id);
        if (!cat) return;
        const viewName = cat.type === 'sim' ? 'roleplay' : cat.type === 'sentence' ? 'convo' : 'vocab';
        const trackLabel = cat.type === 'sim' ? '🎯 롤플레이' : cat.type === 'sentence' ? '💬 회화' : '📝 어휘';
        list.appendChild(buildHomeCard({
          badge: trackLabel, badgeType: cat.type,
          name: `${cat.icon || ''} ${cat.name}`, sub: cat.subtitle || '',
          prog: getVocabCategoryProgress(cat.id), progText: `${cat.items.length}개`,
          btns: cat.dialogue
            ? [{ label: _uiText('대화','会話'), fn: () => { showView(viewName); setTimeout(() => startVocabCategory(cat.id, 'dialogue'), 100); } }]
            : [
                { label: _uiText('학습','学習'), fn: () => { showView(viewName); setTimeout(() => startVocabCategory(cat.id, 'flash'), 100); } },
                { label: _uiText('퀴즈','クイズ'), fn: () => { showView(viewName); setTimeout(() => startVocabCategory(cat.id, 'quiz'), 100); } },
              ]
        }));
      }
    });
  }

  // ─── 홈 섹션별 가로스크롤 카드 (그룹 카드 방식) ───
  function renderHomeSections() {
    // "전체 강의 보기" 버튼 → 해당 뷰로 이동
    document.querySelectorAll('.home-section-lec-btn[data-view]').forEach(btn => {
      if (!btn._bound) {
        btn._bound = true;
        btn.addEventListener('click', () => showView(btn.dataset.view));
      }
    });
    // 홈 재방문 시 항상 재렌더
    ['home-kana-list','home-vocab-list','home-convo-list','home-sim-list'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = '';
    });
    _renderHomeKanaList();
    _renderHomeVocabList('home-vocab-list', 'word');
    _renderHomeVocabList('home-convo-list', 'sentence');
    _renderHomeVocabList('home-sim-list', 'sim');
    initHeroRolling();
    // 마우스 드래그 가로 스크롤 (PC — document 레벨로 부드럽게)
    (function initHomeDragScroll() {
      let dragEl = null, startX = 0, startScrollLeft = 0;
      document.querySelectorAll('.home-cat-list').forEach(el => {
        if (el._dragBound) return;
        el._dragBound = true;
        el.addEventListener('mousedown', e => {
          if (e.button !== 0) return;   // 좌클릭만
          dragEl = el;
          startX = e.clientX;
          startScrollLeft = el.scrollLeft;
          el.classList.add('dragging');
          e.preventDefault();           // 텍스트 선택 방지
        });
      });
      // document 레벨: 마우스를 빠르게 움직여도 끊기지 않음
      document.addEventListener('mousemove', e => {
        if (!dragEl) return;
        e.preventDefault();
        dragEl.scrollLeft = startScrollLeft - (e.clientX - startX);
      }, { passive: false });
      document.addEventListener('mouseup', () => {
        if (dragEl) { dragEl.classList.remove('dragging'); dragEl = null; }
      });
    })();
  }

  function _renderHomeKanaList() {
    const el = document.getElementById('home-kana-list');
    if (!el || typeof LEVELS === 'undefined') return;
    el.innerHTML = '';
    // 레벨 그룹 카드 (히라가나 / 가타카나)
    const groups = [
      { icon:'あ', name:'히라가나', sub:'あ행~ん · 기본+탁음+요음', ids:[1,2,3], view:'kana' },
      { icon:'ア', name:'가타카나', sub:'ア행~ン · 기본+탁음+요음', ids:[4,5,6], view:'kana' },
      { icon:'📚', name:'종합 · 특수', sub:'통합 복습 · 외래어 · 특수박자', ids:[7,8,9,10,11,12], view:'kana' },
    ];
    groups.forEach(g => {
      const levels = g.ids.map(id => LEVELS.find(l => l.id === id)).filter(Boolean);
      const allChars = levels.flatMap(l => (l.chars||[]).filter(c=>!c.includes('_')));
      const mastered = allChars.filter(c => isCharMastered(c)).length;
      const prog = allChars.length ? Math.round(mastered/allChars.length*100) : 0;
      const firstUnlocked = levels.find(l => state.unlockedLevels.includes(l.id)) || levels[0];

      const card = document.createElement('div');
      card.className = 'home-kana-cat-card' + (g.icon === 'ア' ? ' katakana-card' : '');
      card.innerHTML = `
        <div class="hkcc-header">
          <div class="hkcc-icon-wrap">${g.icon}</div>
          <div class="hkcc-title-col">
            <div class="hkcc-name">${g.name}</div>
            <div class="hkcc-sub">${g.sub}</div>
          </div>
          <div class="hkcc-prog-badge">${prog}%</div>
        </div>
        <div class="hkcc-prog-bar"><div class="hkcc-prog-fill" style="width:${prog}%"></div></div>
        <div class="hkcc-prog-text">${allChars.length}자 · ${prog}%</div>
        <div class="hkcc-actions">
          <div class="hkcc-btn-row">
            <button class="hkcc-btn hkcc-btn-flash">${_uiText('학습','学習')}</button>
            <button class="hkcc-btn hkcc-btn-browse">${_uiText('일람','一覧')}</button>
            <button class="hkcc-btn hkcc-btn-quiz">${_uiText('퀴즈','クイズ')}</button>
          </div>
        </div>`;
      card.querySelector('.hkcc-btn-flash').addEventListener('click', e => {
        e.stopPropagation(); startLearn(firstUnlocked.id, 'flash');
      });
      card.querySelector('.hkcc-btn-browse').addEventListener('click', e => {
        e.stopPropagation(); startLearn(firstUnlocked.id, 'browse');
      });
      card.querySelector('.hkcc-btn-quiz').addEventListener('click', e => {
        e.stopPropagation(); startQuizForLevel(firstUnlocked.id);
      });
      card.addEventListener('click', () => showView('kana'));
      el.appendChild(card);
    });
  }

  function _renderHomeVocabList(elId, type) {
    const el = document.getElementById(elId);
    if (!el || typeof VOCAB_CATEGORIES === 'undefined') return;
    el.innerHTML = '';
    const cats = VOCAB_CATEGORIES.filter(c => c.type === type);
    cats.forEach(cat => {
      const card = buildVocabCatCard(cat);
      card.style.height = '100%';
      card.style.boxSizing = 'border-box';
      el.appendChild(card);
    });
  }

  // ─── 오늘의 한자 렌더링 ───
  function renderDailyKanji() {
    const wrap = document.getElementById('home-kanji-card');
    if (!wrap) return;
    wrap.innerHTML = '';
    if (typeof VOCAB_ITEMS === 'undefined') return;
    // 한자가 포함된 어휘 아이템 필터 (japanese에 한자 포함)
    const kanjiItems = VOCAB_ITEMS.filter(item =>
      item.japanese && /[\u4e00-\u9fff]/.test(item.japanese) && item.korean && item.type !== 'sim'
    );
    if (!kanjiItems.length) return;
    // 날짜 기반으로 오늘의 한자 선택
    const dayIdx = Math.floor(Date.now() / 86400000) % kanjiItems.length;
    const item = kanjiItems[dayIdx];
    const jp = item.japanese || '';
    const ko = item.korean || '';
    const eng = item.english || '';
    // 예시 문장 찾기
    const exSentences = (typeof VOCAB_ITEMS !== 'undefined')
      ? VOCAB_ITEMS.filter(v => v.type === 'sentence' && v.japanese && v.japanese.includes(jp.replace(/[（）()]/g, '').split('')[0]))
          .slice(0, 1)
      : [];

    const card = document.createElement('div');
    card.className = 'home-kanji-card';
    card.innerHTML = `
      <div class="hkc-char">${jp.replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '')}</div>
      <div class="hkc-info">
        <div class="hkc-reading">${jp}</div>
        <div class="hkc-meaning">${ko}</div>
        ${eng ? `<div class="hkc-english">${eng}</div>` : ''}
        ${exSentences.length ? `<div class="hkc-example">${exSentences[0].japanese}<br><span style="color:#718096">${exSentences[0].korean||''}</span></div>` : ''}
      </div>
      <button class="hkc-audio-btn" title="발음 듣기">🔊</button>
    `;
    card.querySelector('.hkc-audio-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      playAudio(jp.replace(/[（）()]/g, ''));
    });
    card.querySelector('.hkc-char').addEventListener('click', (e) => {
      e.stopPropagation();
      playAudio(jp.replace(/[（）()]/g, ''));
    });
    card.addEventListener('click', () => {
      // 어휘 마스터(단어)로 이동
      state.vocabSection = 'word';
      showView('vocab');
    });
    wrap.appendChild(card);
  }

  // ─── 오늘의 가타카나 ───
  function renderDailyKatakana(offset) {
    const wrap = document.getElementById('kana-daily-katakana');
    if (!wrap) return;
    wrap.innerHTML = '';
    if (typeof KANA_MAP === 'undefined') return;
    // 모든 가나 (조사 _p 제외)
    const allChars = Object.entries(KANA_MAP)
      .filter(([k, v]) => v.romaji && !k.includes('_p'))
      .map(([k, v]) => ({ kana: k, ...v }));
    if (!allChars.length) return;

    // 랜덤 시드로 5개 선택 (같은 offset이면 같은 결과)
    const seed = Math.floor(Date.now() / 86400000) + ((offset || 0) * 97);
    const picked = [];
    const used = new Set();
    for (let i = 0; i < 5; i++) {
      let idx = Math.abs((seed * 31 + i * 73) % allChars.length);
      while (used.has(idx)) idx = (idx + 1) % allChars.length;
      used.add(idx);
      picked.push(allChars[idx]);
    }
    const focus = picked[0]; // 팁 표시 기준 (첫 번째)

    const card = document.createElement('div');
    card.className = 'section-hero section-hero-kana';
    card.innerHTML = `
      <div class="sh-header-bar">
        <span class="sh-header-title">✍️ ${_uiText('가나 마스터', 'かなマスター')}</span>
        <button class="sh-header-refresh" id="kana-hero-refresh-btn" title="랜덤 새로 보기">🔄</button>
      </div>
      <div class="section-hero-inner dkk-inner">
        <div class="dkk-chars-row">
          ${picked.map((c, i) =>
            `<div class="dkk-char-item${i === 0 ? ' dkk-active' : ''}" data-idx="${i}">
              <div class="dkk-char">${c.kana}</div>
              <div class="dkk-romaji">${c.romaji}</div>
              <div class="dkk-ko">${c.korean}</div>
            </div>`
          ).join('')}
        </div>
      </div>`;

    // 각 가나 클릭 → 오디오
    card.querySelectorAll('.dkk-char-item').forEach((el, i) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        playAudio(picked[i].kana);
        card.querySelectorAll('.dkk-char-item').forEach(x => x.classList.remove('dkk-active'));
        el.classList.add('dkk-active');
      });
    });

    const refreshBtn = card.querySelector('#kana-hero-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        refreshBtn.classList.add('spinning');
        setTimeout(() => refreshBtn.classList.remove('spinning'), 500);
        _kanaHeroOffset = Math.floor(Math.random() * 9973); // 완전 랜덤
        renderDailyKatakana(_kanaHeroOffset);
      });
    }
    wrap.style.display = ''; // 배너 복원 (숨겨져 있었을 경우 대비)
    wrap.appendChild(card);
  }

  // ─── 오늘의 어휘 ───
  // ─── 오늘의 롤플레이 ───
  function renderDailySimItem(offset) {
    const wrap = document.getElementById('sim-daily-item');
    if (!wrap) return;
    wrap.style.display = ''; // startVocabCategory가 숨긴 경우 복원
    wrap.innerHTML = '';
    if (typeof VOCAB_CATEGORIES === 'undefined') return;
    const simCats = VOCAB_CATEGORIES.filter(c => c.type === 'sim');
    if (!simCats.length) return;
    const seed = Math.floor(Date.now() / 86400000) + ((offset || 0) * 97);
    const cat = simCats[Math.abs(seed * 23 % simCats.length)];
    const items = typeof VOCAB_ITEMS !== 'undefined'
      ? VOCAB_ITEMS.filter(v => cat.items && cat.items.includes(v.id)).slice(0, 1)
      : [];
    const item = items[0];
    if (!item) return;

    const card = document.createElement('div');
    card.className = 'section-hero section-hero-sim';
    card.innerHTML = `
      <div class="sh-header-bar">
        <span class="sh-header-title">🎯 ${_uiText('실전 롤플레이', '実戦ロールプレイ')}</span>
        <button class="sh-header-refresh" id="sim-hero-refresh-btn" title="랜덤 새로 보기">🔄</button>
      </div>
      <div class="section-hero-inner">
        <div class="sh-icon">${cat.icon || '🎭'}</div>
        <div class="sh-info">
          <div class="sh-cat-name">${cat.name}</div>
          <div class="sh-char-sm">${cleanJaText((item.japanese||'').replace(/（[^）]*）/g,''))}</div>
          <div class="sh-meaning">${item.korean || ''}</div>
          ${item.tip ? `<div class="sh-tip-text">💡 ${item.tip}</div>` : ''}
        </div>
      </div>`;
    card.addEventListener('click', (e) => {
      if (e.target.closest('.sh-footer-bar')) return;
      startVocabCategory(cat.id, 'dialogue');
    });
    const refreshBtn = card.querySelector('#sim-hero-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        refreshBtn.classList.add('spinning');
        setTimeout(() => refreshBtn.classList.remove('spinning'), 500);
        _simHeroOffset = Math.floor(Math.random() * 9973);
        renderDailySimItem(_simHeroOffset);
      });
    }
    wrap.appendChild(card);
  }

  function renderDailyVocabItem(offset) {
    const wrap = document.getElementById('vocab-daily-item');
    if (!wrap) return;
    wrap.style.display = ''; // startVocabCategory가 숨긴 경우 복원
    wrap.innerHTML = '';
    if (typeof VOCAB_ITEMS === 'undefined') return;
    const wordItems = VOCAB_ITEMS.filter(v =>
      v.japanese && v.korean && !v.speaker &&
      !(v.japanese||'').startsWith('〜') && !(v.kanji||'').startsWith('〜')
    );
    if (!wordItems.length) return;
    const seed = Math.floor(Date.now() / 86400000) + ((offset || 0) * 97);
    const item = wordItems[Math.abs((seed * 31) % wordItems.length)];
    const displayJp = item.kanji || item.japanese || '';
    const reading = item.kanji ? item.japanese : '';

    const card = document.createElement('div');
    card.className = 'section-hero section-hero-vocab';
    card.innerHTML = `
      <div class="sh-header-bar">
        <span class="sh-header-title">📝 ${_uiText('어휘 마스터', '語彙マスター')}</span>
        <button class="sh-header-refresh" id="vocab-hero-refresh-btn" title="랜덤 새로 보기">🔄</button>
      </div>
      <div class="section-hero-inner section-hero-inner-v">
        <div class="sh-char">${cleanJaText(stripFurigana(displayJp))}</div>
        <div class="sh-info">
          ${reading ? `<div class="sh-reading-text">${reading}</div>` : ''}
          <div class="sh-translations">
            <span class="sh-ko-text">${item.korean || ''}</span>
            ${item.english ? `<span class="sh-en-text">${item.english}</span>` : ''}
          </div>
          ${item.tip ? `<div class="sh-tip-text">💡 ${item.tip}</div>` : ''}
          ${item.example && !/〜/.test(item.example) ? `<div class="sh-example">예) ${cleanJaText(item.example)}</div>` : ''}
        </div>
      </div>`;
    card.addEventListener('click', (e) => {
      if (e.target.closest('.sh-footer-bar')) return;
      const text = reading || displayJp;
      playAudio(text.replace(/[（）()]/g, ''));
    });
    const refreshBtn = card.querySelector('#vocab-hero-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        refreshBtn.classList.add('spinning');
        setTimeout(() => refreshBtn.classList.remove('spinning'), 500);
        _vocabHeroOffset = Math.floor(Math.random() * 9973);
        renderDailyVocabItem(_vocabHeroOffset);
      });
    }
    wrap.appendChild(card);
  }

  // ─── 오늘의 회화 (채팅 형태) ───
  let _dailyConvoIdx = 0;
  let _dailyConvoTimer = null;
  let _dailyConvoStarted = false;

  function renderDailyConvo(offset) {
    const wrap = document.getElementById('convo-daily-convo');
    if (!wrap) return;
    wrap.style.display = ''; // startVocabCategory가 숨긴 경우 복원
    wrap.innerHTML = '';
    if (typeof QA_PAIRS === 'undefined' || !QA_PAIRS.length) return;
    const seed = Math.floor(Date.now() / 86400000) + ((offset || 0) * 97);
    _dailyConvoIdx = Math.abs((seed * 17) % QA_PAIRS.length);
    _dailyConvoStarted = false;

    const qa = QA_PAIRS[_dailyConvoIdx];
    const card = document.createElement('div');
    card.className = 'section-hero section-hero-convo';
    card.innerHTML = `
      <div class="sh-header-bar">
        <span class="sh-header-title">💬 ${_uiText('회화 마스터', '会話マスター')}</span>
        <button class="dcc-hero-btn sh-header-btn" id="dcc-btn-start">▶ ${_uiText('대화', '対話')}</button>
        <button class="sh-header-refresh" id="convo-hero-refresh-btn" title="랜덤 새로 보기">🔄</button>
      </div>
      <div class="section-hero-inner section-hero-inner-convo">
        <div class="dcc-messages" id="dcc-messages"></div>
      </div>`;
    wrap.appendChild(card);
    _renderDailyConvoReady();  // 텍스트 미리보기만 렌더 (TTS 없이)
    // ★ 자동 재생 제거 — 사용자가 ▶ 대화 버튼을 클릭해야만 시작

    const refreshBtn = card.querySelector('#convo-hero-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        refreshBtn.classList.add('spinning');
        setTimeout(() => refreshBtn.classList.remove('spinning'), 500);
        _convoHeroOffset = Math.floor(Math.random() * 9973);
        renderDailyConvo(_convoHeroOffset);
      });
    }
    const startBtn = card.querySelector('#dcc-btn-start');
    if (startBtn) startBtn.addEventListener('click', () => {
      _showDailyConvo(_dailyConvoIdx);
    });
  }

  function _renderDailyConvoReady() {
    const msgs = document.getElementById('dcc-messages');
    if (!msgs) return;
    msgs.innerHTML = '';
    const pair = QA_PAIRS[_dailyConvoIdx % QA_PAIRS.length];
    // 블러 없이 Q&A 전체 표시 (번역 말풍선 내부)
    const qRow = document.createElement('div');
    qRow.className = 'qa-bubble-row row-q';
    qRow.innerHTML = `
      <div class="qa-avatar qa-avatar-q"><div class="qa-face">👨</div></div>
      <div class="qa-bubble qa-bubble-q-style">
        ${cleanJaText(pair.q)}
        ${pair.qKo ? `<div class="qa-bubble-ko-inner">${pair.qKo}</div>` : ''}
      </div>`;
    qRow.querySelector('.qa-bubble').addEventListener('click', () => playAudioSlot(pair.q.replace(/[（）()〜]/g, ''), 1));
    msgs.appendChild(qRow);
    const aRow = document.createElement('div');
    aRow.className = 'qa-bubble-row row-a';
    aRow.innerHTML = `
      <div class="qa-avatar qa-avatar-a"><div class="qa-face">👩</div></div>
      <div class="qa-bubble qa-bubble-a-style">
        ${cleanJaText(pair.a)}
        ${pair.aKo ? `<div class="qa-bubble-ko-inner">${pair.aKo}</div>` : ''}
      </div>`;
    aRow.querySelector('.qa-bubble').addEventListener('click', () => playAudioSlot(pair.a.replace(/[（）()〜]/g, ''), 2));
    msgs.appendChild(aRow);
  }

  function _showDailyConvo(idx) {
    const msgs = document.getElementById('dcc-messages');
    if (!msgs) return;
    if (_dailyConvoTimer) clearTimeout(_dailyConvoTimer);
    msgs.innerHTML = '';
    const pair = QA_PAIRS[idx % QA_PAIRS.length];

    // Q 타이핑
    const t1 = document.createElement('div');
    t1.className = 'qa-bubble-row row-q';
    t1.innerHTML = `<div class="qa-avatar qa-avatar-q qa-speaking"><div class="qa-face">👨</div></div><div class="qa-typing-bubble"><div class="qa-typing-dot"></div><div class="qa-typing-dot"></div><div class="qa-typing-dot"></div></div>`;
    msgs.appendChild(t1);

    _dailyConvoTimer = setTimeout(() => {
      if (t1.parentNode === msgs) msgs.removeChild(t1);
      const qRow = document.createElement('div');
      qRow.className = 'qa-bubble-row row-q';
      qRow.innerHTML = `
        <div class="qa-avatar qa-avatar-q"><div class="qa-face">👨</div></div>
        <div class="qa-bubble qa-bubble-q-style">
          ${cleanJaText(pair.q)}
          ${pair.qKo ? `<div class="qa-bubble-ko-inner">${pair.qKo}</div>` : ''}
        </div>`;
      msgs.appendChild(qRow);
      // Q 버블 클릭 → TTS
      qRow.querySelector('.qa-bubble').addEventListener('click', () => playAudioSlot(pair.q.replace(/[（）()〜]/g, ''), 1));
      // Q TTS 자동 재생 (화자 슬롯 1)
      playAudioSlot(pair.q.replace(/[（）()〜]/g, ''), 1).then(() => {
        _dailyConvoTimer = setTimeout(() => {
          const t2 = document.createElement('div');
          t2.className = 'qa-bubble-row row-a';
          t2.innerHTML = `<div class="qa-avatar qa-avatar-a qa-speaking"><div class="qa-face">👩</div></div><div class="qa-typing-bubble"><div class="qa-typing-dot"></div><div class="qa-typing-dot"></div><div class="qa-typing-dot"></div></div>`;
          msgs.appendChild(t2);

          _dailyConvoTimer = setTimeout(() => {
            if (t2.parentNode === msgs) msgs.removeChild(t2);
            const aRow = document.createElement('div');
            aRow.className = 'qa-bubble-row row-a';
            aRow.innerHTML = `
              <div class="qa-avatar qa-avatar-a"><div class="qa-face">👩</div></div>
              <div class="qa-bubble qa-bubble-a-style">
                ${cleanJaText(pair.a)}
                ${pair.aKo ? `<div class="qa-bubble-ko-inner">${pair.aKo}</div>` : ''}
              </div>`;
            msgs.appendChild(aRow);
            // A 버블 클릭 → TTS
            aRow.querySelector('.qa-bubble').addEventListener('click', () => playAudioSlot(pair.a.replace(/[（）()〜]/g, ''), 2));
            // A TTS 자동 재생 (화자 슬롯 2)
            playAudioSlot(pair.a.replace(/[（）()〜]/g, ''), 2);
            const sb = document.getElementById('dcc-btn-start');
            if (sb) sb.textContent = _uiText('🔁 다시 듣기', '🔁 もう一度');
          }, 1500);
        }, 1200);
      });
    }, 1000);
  }

  // ─── 오늘의 Q&A — 카카오톡 스타일 채팅 ───
  const QA_PAIRS = [
    // ── 공항·출입국 ──
    { q:'パスポートを見せてください。', a:'はい、どうぞ。', qKo:'여권을 보여주세요.', aKo:'네, 여기요.' },
    { q:'入国の目的は何ですか？', a:'観光です。', qKo:'입국 목적은 무엇입니까?', aKo:'관광입니다.' },
    { q:'どのくらい滞在しますか？', a:'一週間です。', qKo:'얼마나 머무를 예정입니까?', aKo:'1주일입니다.' },
    { q:'荷物はいくつありますか？', a:'スーツケースが一つです。', qKo:'짐은 몇 개입니까?', aKo:'캐리어가 한 개입니다.' },
    { q:'預け荷物はありますか？', a:'はい、一つ預けたいです。', qKo:'위탁 수하물 있으신가요?', aKo:'네, 한 개 맡기고 싶습니다.' },
    // ── 교통 ──
    { q:'〜まで行ってください。', a:'かしこまりました。', qKo:'〜까지 가 주세요.', aKo:'알겠습니다.' },
    { q:'料金はいくらですか？', a:'1,500円です。', qKo:'요금은 얼마예요?', aKo:'1,500엔입니다.' },
    { q:'この電車は〜に止まりますか？', a:'はい、止まります。', qKo:'이 전철은 〜에 서나요?', aKo:'네, 섭니다.' },
    { q:'乗り換えはどこですか？', a:'次の駅で乗り換えてください。', qKo:'환승은 어디서 하나요?', aKo:'다음 역에서 환승하세요.' },
    { q:'終電は何時ですか？', a:'終電は11時です。', qKo:'막차는 몇 시예요?', aKo:'막차는 11시입니다.' },
    { q:'〜駅まで何分かかりますか？', a:'約15分です。', qKo:'〜역까지 몇 분 걸려요?', aKo:'약 15분입니다.' },
    { q:'Suicaで乗れますか？', a:'はい、使えます。', qKo:'스이카로 탈 수 있나요?', aKo:'네, 사용 가능합니다.' },
    // ── 숙박 ──
    { q:'チェックインをお願いします。', a:'パスポートをお見せください。', qKo:'체크인 부탁드립니다.', aKo:'여권을 보여주세요.' },
    { q:'部屋のWi-Fiのパスワードを教えてください。', a:'こちらがパスワードです。', qKo:'방 와이파이 비밀번호 알려주세요.', aKo:'여기 비밀번호입니다.' },
    { q:'チェックアウトは何時ですか？', a:'11時までにお願いします。', qKo:'체크아웃은 몇 시예요?', aKo:'11시까지 부탁드립니다.' },
    { q:'タオルを追加でもらえますか？', a:'すぐにお持ちします。', qKo:'수건을 추가로 받을 수 있나요?', aKo:'바로 가져다 드릴게요.' },
    { q:'近くにコンビニはありますか？', a:'駅の前にあります。', qKo:'근처에 편의점 있나요?', aKo:'역 앞에 있어요.' },
    // ── 식당·카페 ──
    { q:'何名様ですか？', a:'二人です。', qKo:'몇 분이세요?', aKo:'두 명이에요.' },
    { q:'ご注文はお決まりですか？', a:'これをください。', qKo:'주문은 결정하셨나요?', aKo:'이것으로 주세요.' },
    { q:'何がおすすめですか？', a:'ラーメンが人気です。', qKo:'뭐가 추천인가요?', aKo:'라멘이 인기예요.' },
    { q:'お会計をお願いします。', a:'1,200円になります。', qKo:'계산 부탁드려요.', aKo:'1,200엔입니다.' },
    { q:'カードで払えますか？', a:'はい、使えます。', qKo:'카드로 낼 수 있나요?', aKo:'네, 사용 가능합니다.' },
    { q:'お水をください。', a:'はい、少々お待ちください。', qKo:'물 주세요.', aKo:'네, 잠시만 기다려 주세요.' },
    // ── 쇼핑 ──
    { q:'これはいくらですか？', a:'2,500円です。', qKo:'이거 얼마예요?', aKo:'2,500엔입니다.' },
    { q:'試着できますか？', a:'どうぞ、こちらへ。', qKo:'입어봐도 되나요?', aKo:'네, 이쪽으로 오세요.' },
    { q:'Mサイズはありますか？', a:'少々お待ちください。', qKo:'M사이즈 있나요?', aKo:'잠시만 기다려 주세요.' },
    { q:'袋をもらえますか？', a:'有料になりますが、よろしいですか？', qKo:'봉투 받을 수 있나요?', aKo:'유료인데 괜찮으세요?' },
    { q:'免税できますか？', a:'パスポートをご提示ください。', qKo:'면세 받을 수 있나요?', aKo:'여권을 제시해 주세요.' },
    // ── 관광·길 안내 ──
    { q:'すみません、〜はどこですか？', a:'あちらです。', qKo:'저기요, 〜은 어디예요?', aKo:'저쪽이에요.' },
    { q:'写真を撮ってもいいですか？', a:'もちろんです！', qKo:'사진 찍어도 되나요?', aKo:'물론이죠!' },
    { q:'観光スポットを教えてください。', a:'〜がおすすめです。', qKo:'관광지 알려주세요.', aKo:'〜을 추천해요.' },
    { q:'ここから歩いて何分ですか？', a:'約10分です。', qKo:'여기서 걸어서 몇 분이에요?', aKo:'약 10분이에요.' },
    // ── 긴급·기타 ──
    { q:'もう一度言ってください。', a:'ゆっくり話します。', qKo:'다시 한 번 말해 주세요.', aKo:'천천히 말할게요.' },
    { q:'日本語が少ししか話せません。', a:'大丈夫ですよ！', qKo:'일본어를 조금밖에 못 해요.', aKo:'괜찮아요!' },
    { q:'トイレはどこですか？', a:'あちらにございます。', qKo:'화장실이 어디예요?', aKo:'저쪽에 있습니다.' },
  ];

  let _qaCurrentIdx = 0;
  let _qaNextTimer = null;
  let _qaConversationStarted = false;

  function renderDailyQA() {
    const wrap = document.getElementById('qa-chat-wrap');
    if (!wrap) return;
    const dayBase = Math.floor(Date.now() / 86400000);
    _qaCurrentIdx = dayBase % QA_PAIRS.length;
    _qaConversationStarted = false;
    _renderQADots();
    _renderQAReady();
    _bindQAButtons();
  }

  function _bindQAButtons() {
    const startBtn = document.getElementById('qa-btn-start');
    const nextBtn  = document.getElementById('qa-btn-next');
    if (startBtn && !startBtn._bound) {
      startBtn._bound = true;
      startBtn.addEventListener('click', () => {
        if (_qaNextTimer) clearTimeout(_qaNextTimer);
        _showQAConversation(_qaCurrentIdx);
      });
    }
    if (nextBtn && !nextBtn._bound) {
      nextBtn._bound = true;
      nextBtn.addEventListener('click', () => {
        if (_qaNextTimer) clearTimeout(_qaNextTimer);
        // 랜덤으로 다음 인덱스 선택 (현재와 다른 것)
        let next;
        do { next = Math.floor(Math.random() * QA_PAIRS.length); }
        while (next === _qaCurrentIdx && QA_PAIRS.length > 1);
        _qaCurrentIdx = next;
        _qaConversationStarted = false;
        _renderQAReady();
        _renderQADots();
      });
    }
    // 드래그/스와이프로 다음 Q&A
    const chatWrap = document.getElementById('qa-chat-wrap');
    if (chatWrap && !chatWrap._dragbound) {
      chatWrap._dragbound = true;
      let startX = 0;
      chatWrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
      chatWrap.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 44) {
          if (_qaNextTimer) clearTimeout(_qaNextTimer);
          _qaCurrentIdx = (dx < 0)
            ? (_qaCurrentIdx + 1) % QA_PAIRS.length
            : (_qaCurrentIdx - 1 + QA_PAIRS.length) % QA_PAIRS.length;
          _qaConversationStarted = false;
          _renderQAReady();
          _renderQADots();
        }
      });
    }
  }

  // 대화 시작 전 — Q 미리보기 + 버튼 상태
  function _renderQAReady() {
    const msgs = document.getElementById('qa-chat-messages');
    if (!msgs) return;
    msgs.innerHTML = '';
    const pair = QA_PAIRS[_qaCurrentIdx % QA_PAIRS.length];
    // Q 미리보기 (흐릿하게)
    const preview = document.createElement('div');
    preview.className = 'qa-preview-row qa-bubble-row row-q';
    preview.innerHTML = `
      <div class="qa-avatar qa-avatar-q"><div class="qa-face">👨</div></div>
      <div class="qa-bubble qa-bubble-q-style qa-bubble-blur">
        ${pair.q}
        ${pair.qKo ? `<div class="qa-bubble-ko-inner qa-blur-text">${pair.qKo}</div>` : ''}
      </div>`;
    msgs.appendChild(preview);
    // 시작 버튼 강조
    const startBtn = document.getElementById('qa-btn-start');
    if (startBtn) startBtn.textContent = '💬 대화하기';
  }

  function _renderQADots() {
    const dotsEl = document.getElementById('qa-chat-dots');
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    const visibleCount = Math.min(QA_PAIRS.length, 8);
    for (let i = 0; i < visibleCount; i++) {
      const d = document.createElement('span');
      d.className = 'qa-chat-dot' + (i === (_qaCurrentIdx % visibleCount) ? ' active' : '');
      d.addEventListener('click', () => {
        if (_qaNextTimer) clearTimeout(_qaNextTimer);
        _qaCurrentIdx = i;
        _qaConversationStarted = false;
        _renderQAReady();
        _renderQADots();
      });
      dotsEl.appendChild(d);
    }
  }

  function _showQAConversation(idx) {
    const msgs = document.getElementById('qa-chat-messages');
    if (!msgs) return;
    if (_qaNextTimer) clearTimeout(_qaNextTimer);
    msgs.innerHTML = '';
    _qaConversationStarted = true;

    const pair = QA_PAIRS[idx % QA_PAIRS.length];

    // Step 1: Q 타이핑
    const typingRow = document.createElement('div');
    typingRow.className = 'qa-bubble-row row-q';
    typingRow.innerHTML = `
      <div class="qa-avatar qa-avatar-q"><div class="qa-face">👨</div></div>
      <div class="qa-typing-bubble">
        <div class="qa-typing-dot"></div><div class="qa-typing-dot"></div><div class="qa-typing-dot"></div>
      </div>`;
    msgs.appendChild(typingRow);

    // Step 2: Q 버블
    _qaNextTimer = setTimeout(() => {
      msgs.removeChild(typingRow);
      const qRow = document.createElement('div');
      qRow.className = 'qa-bubble-row row-q';
      qRow.innerHTML = `
        <div class="qa-avatar qa-avatar-q"><div class="qa-face">👨</div></div>
        <div class="qa-bubble qa-bubble-q-style">
          ${pair.q}
          ${pair.qKo ? `<div class="qa-bubble-ko-inner">${pair.qKo}</div>` : ''}
        </div>`;
      msgs.appendChild(qRow);
      qRow.addEventListener('click', () => playAudio(pair.q.replace(/[（）()〜]/g, '')));

      // Step 3: A 타이핑
      _qaNextTimer = setTimeout(() => {
        const typingRow2 = document.createElement('div');
        typingRow2.className = 'qa-bubble-row row-a';
        typingRow2.innerHTML = `
          <div class="qa-avatar qa-avatar-a"><div class="qa-face">👩</div></div>
          <div class="qa-typing-bubble">
            <div class="qa-typing-dot"></div><div class="qa-typing-dot"></div><div class="qa-typing-dot"></div>
          </div>`;
        msgs.appendChild(typingRow2);
        msgs.scrollTop = msgs.scrollHeight;

        // Step 4: A 버블
        _qaNextTimer = setTimeout(() => {
          msgs.removeChild(typingRow2);
          const aRow = document.createElement('div');
          aRow.className = 'qa-bubble-row row-a';
          aRow.innerHTML = `
            <div class="qa-avatar qa-avatar-a"><div class="qa-face">👩</div></div>
            <div class="qa-bubble qa-bubble-a-style">
              ${pair.a}
              ${pair.aKo ? `<div class="qa-bubble-ko-inner">${pair.aKo}</div>` : ''}
            </div>`;
          msgs.appendChild(aRow);
          aRow.addEventListener('click', () => playAudio(pair.a.replace(/[（）()〜]/g, '')));
          msgs.scrollTop = msgs.scrollHeight;
          // 시작 버튼을 "다시 보기"로
          const startBtn = document.getElementById('qa-btn-start');
          if (startBtn) startBtn.textContent = '🔁 다시 보기';
        }, 1800);
      }, 1500);
    }, 1200);
  }

  function _renderKanaHomeSection() {
    const kanaEl = document.getElementById('home-kana-cards');
    if (!kanaEl || kanaEl.children.length > 0 || typeof LEVELS === 'undefined') return;
    // 히라가나 / 가타카나 두 그룹
    const kanaGroups = [
      { icon: 'あ', name: '히라가나', ids: [1, 2, 3, 4, 5], type: 'kana' },
      { icon: 'ア', name: '가타카나', ids: [6, 7, 8, 9, 10, 11], type: 'kana' },
    ];
    // 미완료된 첫 번째 그룹 추천
    let recGroup = kanaGroups[0];
    for (const g of kanaGroups) {
      const lvs = g.ids.map(id => LEVELS.find(l => l.id === id)).filter(Boolean);
      const allChars = lvs.flatMap(l => (l.chars || []).filter(c => !c.includes('_')));
      const mastered = allChars.filter(c => isCharMastered(c)).length;
      if (mastered < allChars.length) { recGroup = g; break; }
    }
    const g = recGroup;
    const levels = g.ids.map(id => LEVELS.find(l => l.id === id)).filter(Boolean);
    const firstUnlocked = levels.find(l => state.unlockedLevels.includes(l.id)) || levels[0];
    const isAnyUnlocked = levels.some(l => state.unlockedLevels.includes(l.id));
    const allChars = levels.flatMap(l => (l.chars || []).filter(c => !c.includes('_')));
    const totalChars = allChars.length;
    const masteredChars = allChars.filter(c => isCharMastered(c)).length;
    const totalProg = totalChars > 0 ? Math.round((masteredChars / totalChars) * 100) : 0;
    kanaEl.appendChild(buildBannerCard({
      icon: g.icon,
      name: g.name,
      items: levels.map(l => l.title),
      totalProg,
      totalItems: `${totalChars}자`,
      badgeType: 'kana',
      type: 'kana',
      recommend: true,
      lectureFn: null,
      startFn: () => startLearn(firstUnlocked.id, 'flash'),
      browseFn: () => startLearn(firstUnlocked.id, 'browse'),
      quizFn: () => startQuizForLevel(firstUnlocked.id),
      locked: !isAnyUnlocked,
      lockedMsg: `🔒 ${levels[0] ? levels[0].unlockXP : 0} XP 필요`,
    }));
  }

  function _renderVocabHomeSection(elId, type, viewName, levelKey, levelPrefix, groupLabels) {
    const el = document.getElementById(elId);
    if (!el || el.children.length > 0) return;
    if (typeof VOCAB_CATEGORIES === 'undefined') return;
    const cats = VOCAB_CATEGORIES.filter(c => c.type === type);
    const levels = [...new Set(cats.map(c => c[levelKey]))].sort((a, b) => a - b);
    if (!levels.length) return;
    // 진행 중인(미완료) 첫 레벨 추천
    let recLv = levels[0];
    for (const lv of levels) {
      const lvCats = cats.filter(c => c[levelKey] === lv);
      const progSum = lvCats.reduce((sum, c) => sum + getVocabCategoryProgress(c.id), 0);
      if (Math.round(progSum / lvCats.length) < 100) { recLv = lv; break; }
    }
    const lv = recLv;
    const lvCats = cats.filter(c => c[levelKey] === lv);
    const groupName = groupLabels ? (groupLabels[lv] || `Sim ${lv}`) : `${levelPrefix}${lv}`;
    const totalItems = lvCats.reduce((sum, c) => sum + c.items.length, 0);
    const progSum = lvCats.reduce((sum, c) => sum + getVocabCategoryProgress(c.id), 0);
    const totalProg = Math.round(progSum / lvCats.length);
    const firstCat = lvCats[0];
    const isDialogue = firstCat && firstCat.dialogue;
    const hasLecture = (type === 'word' || type === 'sentence');
    const navSection = type === 'sentence' ? 'sentence' : type;
    const setSection = () => { state.vocabSection = navSection; };
    const startFn = isDialogue
      ? () => { setSection(); showView(viewName); setTimeout(() => startVocabCategory(firstCat.id, 'dialogue'), 100); }
      : () => { setSection(); showView(viewName); setTimeout(() => startVocabCategory(firstCat.id, 'flash'), 100); };
    el.appendChild(buildBannerCard({
      icon: firstCat ? (firstCat.icon || (type === 'sim' ? '🎭' : type === 'sentence' ? '💬' : '📝')) : '📝',
      name: groupName,
      items: lvCats.map(c => c.name),
      totalProg,
      totalItems: `${totalItems}개`,
      badgeType: type,
      type,
      recommend: true,
      lectureFn: hasLecture && firstCat ? () => { setSection(); showView(viewName); setTimeout(() => startLecture(firstCat.id), 150); } : null,
      startFn,
      browseFn: firstCat ? () => { setSection(); showView(viewName); setTimeout(() => startVocabCategory(firstCat.id, 'browse'), 100); } : startFn,
      quizFn: firstCat ? () => { setSection(); showView(viewName); setTimeout(() => startVocabCategory(firstCat.id, 'quiz'), 100); } : startFn,
    }));
  }

  // ─── 홈 배너 카드 빌더 ───
  function buildBannerCard({ icon, name, items, totalProg, totalItems, badgeType, type, recommend, lectureFn, startFn, browseFn, quizFn, locked, lockedMsg }) {
    const promoMap = {
      kana: '히라가나·가타카나 플래시카드로 완전 정복하세요! ✨',
      word: '핵심 단어를 마스터하면 대화가 열립니다! 📚',
      sentence: '자연스러운 회화 패턴을 익혀봅시다! 💬',
      sim: '실전 상황에서 바로 써먹는 일본어! 🎯',
    };
    const card = document.createElement('div');
    card.className = `hcb hcb-${badgeType}-accent${recommend ? ' hcb-recommend' : ''}${locked ? ' hcb-locked' : ''}`;
    card.innerHTML = `
      ${recommend ? '<div class="hcb-rec-badge">✨ 오늘의 추천</div>' : ''}
      <div class="hcb-header">
        <div class="hcb-icon-wrap hcb-${badgeType}">${icon}</div>
        <div class="hcb-title-col">
          <div class="hcb-name">${name}</div>
          <div class="hcb-promo">${promoMap[type] || ''} · ${totalItems}</div>
        </div>
        <div class="hcb-prog-badge">${totalProg}%</div>
      </div>
      <div class="hcb-tags">${items.slice(0, 5).map(i => `<span class="hcb-tag">${i}</span>`).join('')}</div>
      <div class="hcb-prog-bar-wrap">
        <div class="hcb-prog-bar"><div class="hcb-prog-fill" style="width:${totalProg}%"></div></div>
        <span class="hcb-prog-txt">${totalItems}</span>
      </div>
      ${locked ? `<div class="hc-locked-msg">${lockedMsg || '잠김'}</div>` : `
      <div class="hcb-btns">
        ${lectureFn ? `<button class="hcb-btn hcb-btn-lec">${_uiText('강의','講義')}</button>` : ''}
        <button class="hcb-btn hcb-btn-study">${_uiText('학습','学習')}</button>
        <button class="hcb-btn hcb-btn-browse">${_uiText('일람','一覧')}</button>
        <button class="hcb-btn hcb-btn-quiz">${_uiText('퀴즈','クイズ')}</button>
      </div>`}
    `;
    if (!locked) {
      if (lectureFn) card.querySelector('.hcb-btn-lec').addEventListener('click', e => { e.stopPropagation(); lectureFn(); });
      card.querySelector('.hcb-btn-study').addEventListener('click', e => { e.stopPropagation(); startFn(); });
      card.querySelector('.hcb-btn-browse').addEventListener('click', e => { e.stopPropagation(); browseFn(); });
      card.querySelector('.hcb-btn-quiz').addEventListener('click', e => { e.stopPropagation(); quizFn(); });
    } else {
      card.addEventListener('click', () => showToast(lockedMsg || '잠긴 컨텐츠입니다.'));
    }
    return card;
  }

  // ─── 홈 그룹 카드 빌더 (레거시, 사용 안함) ───
  function buildGroupCard({ icon, name, items, totalProg, totalItems, badgeType, recommend, startFn, viewFn, locked, lockedMsg }) {
    return buildBannerCard({ icon, name, items, totalProg, totalItems, badgeType, type: badgeType, recommend, startFn, browseFn: viewFn, quizFn: viewFn, locked, lockedMsg });
  }

  // ─── 홈 공통 카드 빌더 ───
  function buildHomeCard({ badge, badgeType, name, sub, prog, progText, btns = [], locked, lockedMsg }) {
    const card = document.createElement('div');
    card.className = 'hc' + (locked ? ' hc-locked' : '');
    card.innerHTML = `
      <div class="hc-badge hc-${badgeType}">${badge}</div>
      <div class="hc-name">${name}</div>
      <div class="hc-sub">${sub}</div>
      <div class="hc-prog-wrap">
        <div class="hc-prog-bar"><div class="hc-prog-fill" style="width:${prog}%"></div></div>
        <span class="hc-prog-text">${prog}% · ${progText}</span>
      </div>
      ${locked ? `<div class="hc-locked-msg">${lockedMsg}</div>` : `
      <div class="hc-actions">${btns.map((b, i) => `<button class="hc-btn hc-btn-${i}">${b.label}</button>`).join('')}</div>`}
    `;
    if (!locked) {
      btns.forEach((b, i) => {
        card.querySelector(`.hc-btn-${i}`).addEventListener('click', (e) => { e.stopPropagation(); b.fn(); });
      });
    } else {
      card.addEventListener('click', () => showToast(lockedMsg));
    }
    return card;
  }

  function getLevelProgress(level) {
    if (!level.chars || !level.chars.length) return 0;
    const mastered = level.chars.filter(k => isCharMastered(k)).length;
    return Math.round((mastered / level.chars.length) * 100);
  }

  function isCharMastered(kana) {
    // 플래시카드 뒷면을 한 번이라도 본 글자 = 마스터 (퀴즈 무관)
    const p = state.progress[kana];
    return !!(p && p.flipped >= 1);
  }

  function checkContinue() { /* 홈 리뉴얼로 renderRecentSection이 대체 */ }

  function startReview() {
    // 약점 글자만 퀴즈
    const weak = Object.entries(state.progress)
      .filter(([k, v]) => v && v.incorrect > v.correct)
      .map(([k]) => k);
    if (weak.length === 0) {
      showToast('복습할 틀린 문제가 없어요! 퀴즈를 먼저 풀어보세요.');
      return;
    }
    // 약점 퀴즈 시작
    showView('quiz');
    setTimeout(() => {
      state.quizType = 'kanaToReading';
      state.quizLang = state.prefs.lang || 'korean';
      startQuizWithChars(weak, 'kanaToReading', state.prefs.lang || 'korean');
    }, 100);
  }

  function startVocabReview() {
    // 틀린 단어·문장 복습 → Word Explorer로 전환
    const weakItems = VOCAB_ITEMS.filter(item => {
      const p = state.vocabProgress[item.id];
      return p && p.incorrect > p.correct;
    });
    if (weakItems.length === 0) {
      showToast('복습할 틀린 단어가 없어요! 퀴즈를 먼저 풀어보세요.');
      return;
    }
    const sectionViewMap = { word: 'vocab', sentence: 'convo', sim: 'roleplay' };
    const view = sectionViewMap[state.vocabSection] || 'vocab';
    showView(view);
    _startWordExplorerDirect(weakItems, '🔄 복습', '틀린 단어 ' + weakItems.length + '개');
  }

  // Word Explorer를 catId 없이 직접 아이템 배열로 실행
  function _startWordExplorerDirect(items, title, subtitle) {
    if (!items || items.length === 0) return;
    state.vocabItems = items;
    state.vocabIndex = 0;
    state.vocabMode = 'explore';
    state.vocabCurrentCategoryId = null;

    document.getElementById('vocab-setup').style.display = 'none';
    document.getElementById('vocab-flash-panel').style.display = 'none';
    const stPanel = document.getElementById('scene-trainer-panel');
    if (stPanel) stPanel.style.display = 'none';
    const wePanel = document.getElementById('word-explorer-panel');
    if (!wePanel) return;
    wePanel.style.display = 'block';

    document.getElementById('we-cat-name').textContent = title || '탐구';
    document.getElementById('we-cat-subtitle').textContent = subtitle || '';

    const backBtn = document.getElementById('we-back-btn');
    if (backBtn) backBtn.onclick = vocabBackToSetup;

    const prevBtn = document.getElementById('we-prev-btn');
    const nextBtn = document.getElementById('we-next-btn');
    if (prevBtn) prevBtn.onclick = () => {
      if (state.vocabIndex > 0) { state.vocabIndex--; _weShowCard(state.vocabIndex); }
    };
    if (nextBtn) nextBtn.onclick = () => {
      if (state.vocabIndex < items.length - 1) { state.vocabIndex++; _weShowCard(state.vocabIndex); }
    };

    const audioBtn = document.getElementById('we-audio-btn');
    if (audioBtn) audioBtn.onclick = () => {
      const item = items[state.vocabIndex];
      if (item) playAudio(item.japanese);
    };

    // 탭 이벤트 재설정
    const tabs = document.querySelectorAll('#we-games-tabs .we-tab');
    tabs.forEach(tab => {
      const newTab = tab.cloneNode(true);
      tab.parentNode.replaceChild(newTab, tab);
    });
    document.querySelectorAll('#we-games-tabs .we-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#we-games-tabs .we-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        ['fillin','choice','order'].forEach(g => {
          const gp = document.getElementById('we-game-' + g);
          if (gp) gp.style.display = g === tab.dataset.game ? 'block' : 'none';
        });
        _weSetupGame(tab.dataset.game, items);
      });
    });

    _weShowCard(0);
    _weSetupGame('fillin', items);
  }

  // ─── 최근 활동 추적 ───
  function trackActivity(type, id) {
    state.recentActivity = state.recentActivity.filter(a => !(a.type === type && a.id === id));
    state.recentActivity.unshift({ type, id, ts: Date.now() });
    if (state.recentActivity.length > 6) state.recentActivity.length = 6;
    saveToStorage();
  }

  // ─── 레벨별 가나 문자 배열 반환 ───
  function _getLevelChars(levelId) {
    const level = LEVELS.find(l => l.id === levelId);
    if (!level || !level.chars) return [];
    return level.chars
      .filter(k => KANA_MAP[k])
      .map(k => ({ kana: k, ...KANA_MAP[k] }));
  }

  // ─── 학습 모드 ───
  function startLearn(levelId, mode) {
    trackActivity('kana', levelId);
    state.learnLevelId = levelId;
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return;

    // Level 12: 전체 복습 — 모든 가나 랜덤 순서
    if (levelId === 12) {
      state.learnChars = Object.keys(KANA_MAP)
        .map(k => ({ kana: k, ...KANA_MAP[k] }))
        .sort(() => Math.random() - 0.5);
    } else {
      state.learnChars = _getLevelChars(levelId);
    }
    state.learnIndex = 0;

    // view-kana 로 이동 후 레벨 선택 패널 숨김 (showView가 setupKanaSelectView를 호출해 패널을 다시 표시하므로 반드시 showView 이후에 숨겨야 함)
    showView('kana');
    document.getElementById('kana-select-panel') && (document.getElementById('kana-select-panel').style.display = 'none');
    // 학습 헤더 표시 (메인 선택 화면에서는 숨김)
    const lhdr = document.getElementById('learn-header');
    if (lhdr) lhdr.style.display = '';
    // 데일리 배너 숨기기
    const dailyKana = document.getElementById('kana-daily-katakana');
    if (dailyKana) dailyKana.style.display = 'none';
    document.getElementById('learn-level-name').textContent = level.name;
    document.getElementById('learn-level-title').textContent = level.title;

    // 모드에 따라 직접 이동 (mode-selector 제거)
    document.getElementById('flashcard-area').style.display = 'none';
    document.getElementById('browse-area').style.display = 'none';

    // fc-back-btn 바인딩
    const fcBackBtn = document.getElementById('fc-back-btn');
    if (fcBackBtn && !fcBackBtn._bound) {
      fcBackBtn._bound = true;
      fcBackBtn.addEventListener('click', () => {
        document.getElementById('flashcard-area').style.display = 'none';
        document.getElementById('browse-area').style.display = 'none';
        document.getElementById('kana-select-panel') && (document.getElementById('kana-select-panel').style.display = '');
        // 전체화면 모드 해제
        document.body.classList.remove('fc-fullscreen');
        // 학습 헤더 숨기기 (메인 선택 화면으로 복귀)
        const lhdr2 = document.getElementById('learn-header');
        if (lhdr2) lhdr2.style.display = 'none';
        // 데일리 배너 복원
        const dailyKana = document.getElementById('kana-daily-katakana');
        if (dailyKana) dailyKana.style.display = '';
      });
    }

    const targetMode = mode || 'flash';
    if (targetMode === 'browse') {
      state.learnMode = 'browse';
      document.body.classList.remove('fc-fullscreen');
      document.getElementById('browse-area').style.display = 'block';
      renderBrowse();
    } else {
      state.learnMode = 'flash';
      state.learnFlipped = false;
      document.getElementById('flashcard-area').style.display = 'block';
      // 전체화면 모드 활성화
      document.body.classList.add('fc-fullscreen');
      // fc-hint 힌트 텍스트 업데이트
      const hintEl = document.getElementById('fc-hint');
      if (hintEl) hintEl.textContent = '탭하여 발음 확인 →';
      renderNavStrip('fc-nav-strip', state.learnChars, state.learnIndex, (idx) => {
        state.learnIndex = idx;
        showFlashcard();
      });
      showFlashcard();
      setupFlashcardControls();
    }
  }

  function showFlashcard() {
    const chars = state.learnChars;
    if (!chars.length) return;
    const idx = state.learnIndex;
    const total = chars.length;
    const char = chars[idx];

    document.getElementById('learn-card-num').textContent = `${idx + 1} / ${total}`;
    document.getElementById('fc-progress-fill').style.width = `${(idx / total) * 100}%`;

    document.getElementById('fc-kana').textContent = char.kana;
    document.getElementById('fc-kana-back').textContent = char.kana;
    document.getElementById('fc-korean').textContent = char.korean;
    document.getElementById('fc-english').textContent = char.english;

    // ── 섹션2: 팁 ──
    const tipEl = document.getElementById('fc-tip');
    if (tipEl) {
      if (char.tip) {
        tipEl.textContent = '💡 ' + char.tip;
        tipEl.style.display = 'block';
      } else {
        tipEl.style.display = 'none';
      }
    }

    // ── 섹션3: 관련 단어 ──
    const exDiv = document.getElementById('fc-examples');
    const exWrap = document.getElementById('fc-examples-wrap');
    exDiv.innerHTML = '';
    const exReadQueue = [];
    if (char.examples && char.examples.length) {
      if (exWrap) exWrap.style.display = '';
      const shuffledEx = [...char.examples].sort(() => Math.random() - 0.5).slice(0, 3);
      shuffledEx.forEach(ex => {
        const el = document.createElement('div');
        el.className = 'fc-ex-item';
        el.innerHTML = `<span class="fc-ex-word">${stripFurigana(ex.word)}</span><span class="fc-ex-meaning">${ex.meaning}</span>`;
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          state.fcReadSession = (state.fcReadSession || 0) + 1;
          stopFcExRead();
          playAudio(ex.word);
        });
        exDiv.appendChild(el);
        exReadQueue.push({ el, text: ex.word });
      });
    } else {
      if (exWrap) exWrap.style.display = 'none';
    }

    // 가나 마스터: 예시 문장 제공 안 함
    const sentWrap = document.getElementById('fc-sentences-wrap');
    const sentDiv = document.getElementById('fc-sentences');
    if (sentDiv) sentDiv.innerHTML = '';
    if (sentWrap) sentWrap.style.display = 'none';
    state.fcExReadQueue = exReadQueue;

    // nav strip 북마크 상태 업데이트
    const isBookmarked = state.bookmarks.some(b => b.type === 'kana' && b.kana === char.kana);
    const nsBtn = document.querySelector(`#fc-nav-strip .fc-ns-btn[data-kana="${char.kana}"]`);
    if (nsBtn) nsBtn.classList.toggle('ns-bookmarked', isBookmarked);

    // 카드 뒤집기 설정에 따라 초기 상태 결정
    const flipEnabled = state.prefs.flipCard === true;
    state.learnFlipped = !flipEnabled; // 기본: 비활성화 → 즉시 뒤집힌(뒷면) 상태
    state.fcReadSession = (state.fcReadSession || 0) + 1;
    stopFcExRead();
    const inner = document.getElementById('fc-inner');
    inner.classList.toggle('flipped', !flipEnabled);

    // 가나 자동 읽기 (항상)
    setTimeout(() => playAudio(char.kana), 300);

    // 네비 스트립 활성 업데이트
    updateNavStripActive('fc-nav-strip', idx);

    // 진도 기록
    markCharSeen(char.kana);
  }

  function flipCard() {
    if (state.learnFlipped) return; // 이미 뒤집힘 — 다시 앞면으로 돌아가지 않음
    state.learnFlipped = true;
    document.getElementById('fc-inner').classList.add('flipped');

    // 전체화면 모드: 뒤집으면 자가평가 버튼이 보이도록 뒷면 스크롤 초기화
    if (document.body.classList.contains('fc-fullscreen')) {
      const back = document.querySelector('.flashcard-back');
      if (back) back.scrollTop = 0;
    }

    // 뒷면을 봤으므로 "마스터" 기록 + 네비 스트립 즉시 갱신
    const char = state.learnChars[state.learnIndex];
    markCharFlipped(char.kana);
    updateNavStripActive('fc-nav-strip', state.learnIndex);

    // 순차 읽기 세션 번호 증가 (이전 세션 무효화)
    state.fcReadSession = (state.fcReadSession || 0) + 1;
    const session = state.fcReadSession;

    // 가나 발음 완전히 끝난 후 → 예시 순차 읽기 (또는 자동 넘김)
    // 뒤집을 때 듀얼 스피커 번갈아 재생
    (async () => {
      if (hasSpeakerConfigured(2)) {
        const slot = state.learnSpeakerTurn || 1;
        state.learnSpeakerTurn = slot === 1 ? 2 : 1;
        await playAudioSlot(char.kana, slot);
      } else {
        await playAudio(char.kana);
      }
      if (session !== state.fcReadSession) return;
      if (state.prefs.showWordEx || state.prefs.showSentEx) {
        await new Promise(r => setTimeout(r, 400));
        if (session === state.fcReadSession) startFcExRead(session);
      } else if (state.prefs.autoAdvance) {
        // 예시 없어도 자동 넘김
        startFcAutoAdvance(session);
      }
    })();
  }

  // 플래시카드 예시 순차 읽기 (session 번호로 중복 방지)
  async function startFcExRead(session) {
    stopFcExRead();
    const queue = (state.fcExReadQueue || []).filter(item => {
      const isInEx  = item.el.closest('#fc-examples');
      const isInSnt = item.el.closest('#fc-sentences');
      if (isInEx  && !state.prefs.showWordEx) return false;
      if (isInSnt && !state.prefs.showSentEx) return false;
      return true;
    });
    if (!queue.length) return;

    for (let i = 0; i < queue.length; i++) {
      // 세션이 바뀌었으면 (카드 넘김/뒤집힘) 중단
      if (session !== state.fcReadSession) return;

      // 이전 하이라이트 제거 후 현재 항목 강조
      queue.forEach(q => q.el.classList.remove('fc-reading'));
      const item = queue[i];
      item.el.classList.add('fc-reading');
      item.el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // 발음 완전히 끝날 때까지 대기
      try { await playAudio(item.text); } catch (e) { /* TTS 실패 시 다음 항목으로 */ }

      if (session !== state.fcReadSession) return;

      // 항목 간 짧은 간격
      await new Promise(r => setTimeout(r, 400));
    }
    // 읽기 완료 → 하이라이트 제거
    queue.forEach(q => q.el.classList.remove('fc-reading'));

    if (session !== state.fcReadSession) return;

    // 자동 넘기기 설정 시 카운트다운 후 다음 카드
    if (state.prefs.autoAdvance && session === state.fcReadSession) {
      startFcAutoAdvance(session);
    }
  }

  let _fcAutoTimer = null;
  let _fcAutoCountTimer = null;

  function startFcAutoAdvance(session) {
    clearFcAutoAdvance();
    const delay = (parseInt(state.prefs.autoAdvanceDelay) || 3);
    const bar = document.getElementById('fc-auto-bar');
    const countEl = document.getElementById('fc-auto-countdown');
    if (bar) bar.style.display = 'flex';
    let remaining = delay;
    if (countEl) countEl.textContent = remaining + 's';
    _fcAutoCountTimer = setInterval(() => {
      if (session !== state.fcReadSession) { clearFcAutoAdvance(); return; }
      remaining--;
      if (countEl) countEl.textContent = remaining + 's';
    }, 1000);
    _fcAutoTimer = setTimeout(() => {
      clearFcAutoAdvance();
      if (session !== state.fcReadSession) return;
      // 다음 카드로 이동
      const chars = state.learnChars;
      if (state.learnIndex < chars.length - 1) {
        state.learnIndex++;
        showFlashcard();
        // 자동 뒤집기 (약간 딜레이 후)
        setTimeout(() => {
          if (state.prefs.autoAdvance) flipCard();
        }, 600);
      }
    }, delay * 1000);
  }

  function clearFcAutoAdvance() {
    clearTimeout(_fcAutoTimer);
    clearInterval(_fcAutoCountTimer);
    _fcAutoTimer = null; _fcAutoCountTimer = null;
    const bar = document.getElementById('fc-auto-bar');
    if (bar) bar.style.display = 'none';
  }

  function stopFcExRead() {
    document.querySelectorAll('.fc-reading').forEach(el => el.classList.remove('fc-reading'));
    clearFcAutoAdvance();
  }

  // ─── 드래그/스와이프 공통 핸들러 ───
  function attachSwipe(el, onPrev, onNext, onTap) {
    let startX = 0, startY = 0, moved = false, dragging = false;
    let lastTouchTime = 0;
    const THRESHOLD = 50;

    const getX = e => e.touches ? e.touches[0].clientX : e.clientX;
    const getY = e => e.touches ? e.touches[0].clientY : e.clientY;

    const onStart = (e) => {
      // 터치 직후 브라우저가 생성하는 합성 마우스 이벤트 무시 (모바일 이중 실행 방지)
      if (e.type === 'touchstart') { lastTouchTime = Date.now(); }
      else if (Date.now() - lastTouchTime < 600) return;
      startX = getX(e); startY = getY(e);
      moved = false; dragging = true;
      el.style.transition = 'none';
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = getX(e) - startX;
      const dy = getY(e) - startY;
      // 수직 드래그가 수평보다 크면 스크롤 막기
      if (Math.abs(dy) > Math.abs(dx)) {
        if (e.cancelable) e.preventDefault();
        el.style.transform = `translateY(${dy * 0.4}px)`;
        moved = true;
      } else if (Math.abs(dx) > Math.abs(dy)) {
        // 수평 드래그도 허용 (좌: 다음, 우: 이전)
        if (e.cancelable) e.preventDefault();
        el.style.transform = `translateX(${dx * 0.4}px) rotate(${dx * 0.02}deg)`;
        moved = true;
        // 드래그 방향에 따른 시각적 피드백 클래스 추가
        const parent = el.closest('.flashcard-container');
        if (parent) {
          parent.classList.toggle('dragging-right', dx > 20);
          parent.classList.toggle('dragging-left', dx < -20);
        }
      }
    };
    const onEnd = (e) => {
      if (!dragging) return;
      dragging = false;
      const parent = el.closest('.flashcard-container');
      if (parent) parent.classList.remove('dragging-left', 'dragging-right');
      const ex = e.changedTouches ? e.changedTouches[0] : e;
      const dx = ex.clientX - startX;
      const dy = ex.clientY - startY;
      el.style.transition = 'transform 0.22s cubic-bezier(.4,0,.2,1)';
      if (!moved || (Math.abs(dx) < THRESHOLD && Math.abs(dy) < THRESHOLD)) {
        el.style.transform = '';
        if (!moved) onTap && onTap();
      } else if (Math.abs(dy) >= Math.abs(dx)) {
        // 수직 드래그
        if (dy < 0) {
          // 위로 → 다음 카드 (현재 카드 위로 날아감, 다음 카드 아래서 올라옴)
          el.style.transform = 'translateY(-110%)';
          setTimeout(() => {
            el.style.transition = 'none';
            el.style.transform = 'translateY(110%)'; // 새 카드는 아래에서 시작
            onNext();
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                el.style.transition = 'transform 0.22s cubic-bezier(.4,0,.2,1)';
                el.style.transform = '';
              });
            });
          }, 200);
        } else {
          // 아래로 → 이전 카드 (현재 카드 아래로 날아감, 이전 카드 위서 내려옴)
          el.style.transform = 'translateY(110%)';
          setTimeout(() => {
            el.style.transition = 'none';
            el.style.transform = 'translateY(-110%)'; // 새 카드는 위에서 시작
            onPrev();
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                el.style.transition = 'transform 0.22s cubic-bezier(.4,0,.2,1)';
                el.style.transform = '';
              });
            });
          }, 200);
        }
      } else {
        // 수평 드래그 (기존 좌우)
        if (dx < 0) {
          el.style.transform = 'translateX(-120%) rotate(-8deg)';
          setTimeout(() => { el.style.transition = 'none'; el.style.transform = ''; onNext(); }, 220);
        } else {
          el.style.transform = 'translateX(120%) rotate(8deg)';
          setTimeout(() => { el.style.transition = 'none'; el.style.transform = ''; onPrev(); }, 220);
        }
      }
    };

    el.addEventListener('mousedown',  onStart);
    el.addEventListener('mousemove',  onMove);
    el.addEventListener('mouseup',    onEnd);
    el.addEventListener('mouseleave', (e) => { if (dragging) onEnd(e); });
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove',  onMove,  { passive: false });
    el.addEventListener('touchend',   onEnd);
  }

  function setupFlashcardControls() {
    const card = document.getElementById('flashcard');
    if (!card._swipeBound) {
      card._swipeBound = true;
      attachSwipe(
        card,
        () => { clearFcAutoAdvance(); if (state.learnIndex > 0) { state.learnIndex--; showFlashcard(); } },
        () => {
          clearFcAutoAdvance();
          const char = state.learnChars[state.learnIndex];
          recordResult(char.kana, true);
          // Mark as completed in nav strip
          const nsBtn = document.querySelector(`#fc-nav-strip .fc-ns-btn[data-kana="${char.kana}"]`);
          if (nsBtn) nsBtn.classList.add('ns-completed');
          if (state.learnIndex < state.learnChars.length - 1) {
            state.learnIndex++; showFlashcard();
          } else {
            showLearnCompletePrompt(state.learnLevelId);
          }
        },
        () => { clearFcAutoAdvance(); flipCard(); }
      );
    }
    const cancelBtn = document.getElementById('fc-auto-cancel');
    if (cancelBtn) cancelBtn.onclick = () => {
      clearFcAutoAdvance();
      state.fcReadSession = (state.fcReadSession || 0) + 1;
    };

    // ── 자가평가 버튼 (전체화면 모드) ──
    function _fcAssessNext(rating) {
      clearFcAutoAdvance();
      state.fcReadSession = (state.fcReadSession || 0) + 1;
      const char = state.learnChars[state.learnIndex];
      if (!char) return;
      _onFlashcardRate(rating);
      // rating: 'hard' | 'ok' | 'good'
      if (rating === 'good') {
        recordResult(char.kana, true);
        const nsBtn = document.querySelector(`#fc-nav-strip .fc-ns-btn[data-kana="${char.kana}"]`);
        if (nsBtn) nsBtn.classList.add('ns-completed');
      } else if (rating === 'hard') {
        recordResult(char.kana, false);
      } else {
        markCharSeen(char.kana);
      }
      if (state.learnIndex < state.learnChars.length - 1) {
        state.learnIndex++;
        showFlashcard();
      } else {
        showLearnCompletePrompt(state.learnLevelId);
      }
    }
    const hardBtn = document.getElementById('fca-hard');
    const okBtn   = document.getElementById('fca-ok');
    const goodBtn = document.getElementById('fca-good');
    if (hardBtn && !hardBtn._bound) { hardBtn._bound = true; hardBtn.addEventListener('click', (e) => { e.stopPropagation(); _fcAssessNext('hard'); }); }
    if (okBtn   && !okBtn._bound)   { okBtn._bound   = true; okBtn.addEventListener  ('click', (e) => { e.stopPropagation(); _fcAssessNext('ok');   }); }
    if (goodBtn && !goodBtn._bound) { goodBtn._bound = true; goodBtn.addEventListener('click', (e) => { e.stopPropagation(); _fcAssessNext('good'); }); }
  }

  // ─── 네비게이션 스트립 (가나·어휘 모두 가로 드래그 방식) ───
  function renderNavStrip(stripId, chars, activeIdx, clickCb) {
    const strip = document.getElementById(stripId);
    if (!strip) return;
    strip.innerHTML = '';

    // vocab 여부: kana 없이 id/japanese 만 있는 경우
    const isVocab = chars.length > 0 && !chars[0].kana && chars[0].japanese;

    if (isVocab) {
      // 가로 드래그 스크롤 방식으로 변경 (페이징 제거)
      strip.className = 'fc-nav-strip vocab-nav-inline';
      // 메타 저장 (updateNavStripActive 에서 사용)
      state.vocabNavMeta = { chars, clickCb };
      chars.forEach((item, i) => {
        const isActive = i === activeIdx;
        const isBookmarked = state.bookmarks.some(b =>
          (b.type === 'vocab' && b.vocabId === item.id)
        );
        const jp = item.japanese || '?';
        // 카드 한 장이 화면 너비를 벗어날 만큼 길 때만 말줄임 (28자 기준)
        const jpShort = jp.length > 28 ? jp.slice(0, 28) + '…' : jp;
        const tile = document.createElement('button');
        tile.className = 'fc-ns-btn vnp-inline-tile' +
          (isActive ? ' ns-active' : '') +
          (isBookmarked ? ' vnp-bookmarked' : '');
        tile.dataset.vocabIdx = i;
        tile.title = `${jp} — ${item.korean || ''}`;
        tile.innerHTML =
          `<span class="vnp-num">${i + 1}</span>` +
          `<span class="vnp-jp-inline">${jpShort}</span>`;
        tile.addEventListener('click', (e) => { e.stopPropagation(); clickCb(i); });
        tile.addEventListener('dblclick', (e) => {
          e.stopPropagation();
          const isB = state.bookmarks.some(b => b.type === 'vocab' && b.vocabId === item.id);
          if (isB) { removeBookmark('vocab', item.id); tile.classList.remove('vnp-bookmarked'); showToast('📌 나중에 목록에서 제거했습니다.'); }
          else { addVocabBookmark(item); tile.classList.add('vnp-bookmarked'); }
        });
        strip.appendChild(tile);
      });
      // 활성 타일로 스크롤
      const activeBtn = strip.querySelector('.ns-active');
      if (activeBtn) requestAnimationFrame(() => activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }));
      return;
    }

    // ── 가나용 가로 스트립 ──
    chars.forEach((char, i) => {
      const btn = document.createElement('button');
      const displayText = char.kana || '?';
      btn.className = 'fc-ns-btn';
      btn.dataset.kana = char.kana || '';   // 나중에 마스터 갱신용
      btn.textContent = displayText.length > 4 ? displayText.slice(0, 4) + '…' : displayText;
      btn.title = `${displayText} — ${char.korean || ''}`;
      if (i === activeIdx) btn.classList.add('ns-active');
      if (isCharMastered(char.kana)) btn.classList.add('ns-mastered');
      if (state.bookmarks.some(b => b.type === 'kana' && b.kana === char.kana)) btn.classList.add('ns-bookmarked');
      btn.addEventListener('click', () => clickCb(i));
      btn.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const char = chars[i];
        const isBookmarked = state.bookmarks.some(b => b.type === 'kana' && b.kana === char.kana);
        if (isBookmarked) {
          removeBookmark('kana', char.kana);
          btn.classList.remove('ns-bookmarked');
          showToast('📌 나중에 목록에서 제거했습니다.');
        } else {
          addKanaBookmark(char);
          btn.classList.add('ns-bookmarked');
        }
      });
      strip.appendChild(btn);
    });
    const activeBtn = strip.querySelector('.ns-active');
    if (activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  // vocab 전용 페이지형 네비 패널 렌더링
  function _renderVocabNavPanel(strip, activeIdx) {
    const meta = state.vocabNavMeta;
    if (!meta) return;
    const { chars, clickCb, perPage, isSentence } = meta;
    const page = state.vocabNavPage || 0;
    const totalPages = Math.ceil(chars.length / perPage);
    const start = page * perPage;
    const pageItems = chars.slice(start, start + perPage);

    strip.className = 'fc-nav-strip vocab-nav-panel' + (isSentence ? ' vnp-sentence' : '');

    // 헤더 (화살표 + 페이지 정보)
    const header = document.createElement('div');
    header.className = 'vnp-header';
    const prevBtn = document.createElement('button');
    prevBtn.className = 'vnp-arrow';
    prevBtn.textContent = '◀ 이전';
    prevBtn.disabled = (page === 0);
    const nextBtn = document.createElement('button');
    nextBtn.className = 'vnp-arrow';
    nextBtn.textContent = '다음 ▶';
    nextBtn.disabled = (page >= totalPages - 1);
    const pageInfo = document.createElement('span');
    pageInfo.className = 'vnp-page-info';
    pageInfo.textContent = `${start + 1}–${Math.min(start + perPage, chars.length)} / 전체 ${chars.length}개`;
    header.appendChild(prevBtn);
    header.appendChild(pageInfo);
    header.appendChild(nextBtn);

    // 타일 그리드
    const grid = document.createElement('div');
    grid.className = 'vnp-grid';
    pageItems.forEach((item, i) => {
      const globalIdx = start + i;
      const isActive = globalIdx === activeIdx;
      const isBookmarked = state.bookmarks.some(b =>
        (b.type === 'vocab' && b.vocabId === item.id) ||
        (b.type === 'kana' && b.kana === item.kana)
      );
      const jp = item.japanese || item.kana || '?';
      const kr = item.korean || '';

      const tile = document.createElement('div');
      tile.className = 'vnp-tile' +
        (isActive ? ' vnp-active' : '') +
        (isBookmarked ? ' vnp-bookmarked' : '');

      tile.innerHTML =
        `<span class="vnp-num">${globalIdx + 1}</span>` +
        `<span class="vnp-jp">${item.kanji ? formatKanjiWithHint(item.kanji, jp) : jp}</span>` +
        `<span class="vnp-kr">${kr}</span>`;

      tile.addEventListener('click', (e) => { e.stopPropagation(); clickCb(globalIdx); });
      tile.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const isBookmarked = state.bookmarks.some(b => b.type === 'vocab' && b.vocabId === item.id);
        if (isBookmarked) {
          removeBookmark('vocab', item.id);
          tile.classList.remove('vnp-bookmarked');
          showToast('📌 나중에 목록에서 제거했습니다.');
        } else {
          addVocabBookmark(item);
          tile.classList.add('vnp-bookmarked');
        }
      });
      grid.appendChild(tile);
    });

    strip.innerHTML = '';
    strip.appendChild(header);
    strip.appendChild(grid);

    // 이벤트: 페이지 전환
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.vocabNavPage > 0) {
        state.vocabNavPage--;
        _renderVocabNavPanel(strip, activeIdx);
      }
    });
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.vocabNavPage < totalPages - 1) {
        state.vocabNavPage++;
        _renderVocabNavPanel(strip, activeIdx);
      }
    });
  }

  function updateNavStripActive(stripId, activeIdx) {
    const strip = document.getElementById(stripId);
    if (!strip) return;
    const btns = strip.querySelectorAll('.fc-ns-btn');
    btns.forEach((btn, i) => {
      btn.classList.toggle('ns-active', i === activeIdx);
      // 가나: 마스터 상태 즉시 반영
      if (btn.dataset.kana) {
        btn.classList.toggle('ns-mastered', isCharMastered(btn.dataset.kana));
      }
    });
    const activeBtn = strip.querySelector('.ns-active');
    if (activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  // ─── 키보드 네비게이션 ───
  function setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // 입력 필드에서는 무시
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      // 가나 플래시카드 (startLearn은 showView('kana')를 호출하므로 currentView는 'kana')
      if (state.currentView === 'kana' && state.learnMode === 'flash') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (state.learnIndex > 0) { state.learnIndex--; showFlashcard(); }
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          const _c = state.learnChars[state.learnIndex];
          recordResult(_c.kana, true);
          if (state.learnIndex < state.learnChars.length - 1) { state.learnIndex++; showFlashcard(); }
          else { showLearnCompletePrompt(state.learnLevelId); }
        } else if (e.key === ' ') {
          e.preventDefault();
          flipCard();
        }
        return;
      }

      // 단어 플래시카드 (vocab/convo/roleplay 공통)
      if (['vocab', 'convo', 'roleplay'].includes(state.currentView) && state.vocabMode === 'flash') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          clearVocabAutoAdvance();
          if (state.vocabIndex > 0) { state.vocabIndex--; showVocabFlashcard(); }
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          clearVocabAutoAdvance();
          const _vi = state.vocabItems[state.vocabIndex];
          recordVocabResult(_vi.id, true);
          if (state.vocabIndex < state.vocabItems.length - 1) { state.vocabIndex++; showVocabFlashcard(); }
          else { showVocabCompletePrompt(); }
        } else if (e.key === ' ') {
          e.preventDefault();
          clearVocabAutoAdvance();
          vocabFlipCard();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          // 뒤집어서 뜻 보기 + 발음 재생
          if (!state.vocabFlipped) vocabFlipCard();
          const item = state.vocabItems[state.vocabIndex];
          if (item) playAudio(item.japanese);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          // 앞면으로 복귀 (다시 외우기)
          if (state.vocabFlipped) vocabFlipCard();
        }
      }
    });
  }

  // ─── 북마크 시스템 ───
  function addKanaBookmark(char) {
    const already = state.bookmarks.some(b => b.type === 'kana' && b.kana === char.kana);
    if (already) {
      showToast('이미 북마크에 있습니다 📌');
      return;
    }
    state.bookmarks.push({
      type: 'kana',
      kana: char.kana,
      romaji: char.romaji,
      korean: char.korean,
      english: char.english,
      examples: char.examples || [],
      levelId: state.learnLevelId
    });
    saveToStorage();
    renderBookmarkSection();
    showToast('📌 나중에 볼 목록에 추가!');
  }

  function addVocabBookmark(item) {
    const already = state.bookmarks.some(b => b.type === 'vocab' && b.vocabId === item.id);
    if (already) {
      showToast('이미 북마크에 있습니다 📌');
      return;
    }
    state.bookmarks.push({
      type: 'vocab',
      vocabId: item.id,
      japanese: item.japanese,
      kanji: item.kanji || '',
      romaji: item.romaji,
      korean: item.korean,
      catId: state.vocabCurrentCategoryId
    });
    saveToStorage();
    renderBookmarkSection();
    showToast('📌 나중에 볼 목록에 추가!');
  }

  function removeBookmark(type, key) {
    state.bookmarks = state.bookmarks.filter(b => {
      if (type === 'kana') return !(b.type === 'kana' && b.kana === key);
      if (type === 'vocab') return !(b.type === 'vocab' && b.vocabId === key);
      return true;
    });
    saveToStorage();
    renderBookmarkSection();
  }

  function renderBookmarkSection() {
    const section = document.getElementById('bookmark-section');
    const list = document.getElementById('bookmark-list');
    if (!section || !list) return;

    if (state.bookmarks.length === 0) {
      section.style.display = 'none';
      return;
    }
    section.style.display = 'block';
    list.innerHTML = '';
    state.bookmarks.forEach(bm => {
      const item = document.createElement('div');
      item.className = 'bookmark-item';
      if (bm.type === 'kana') {
        item.innerHTML = `
          <span class="bm-kana">${bm.kana}</span>
          <span class="bm-korean">${bm.korean}</span>
          <button class="bm-remove" title="삭제">✕</button>`;
        item.addEventListener('click', () => playAudio(bm.kana));
        item.querySelector('.bm-remove').addEventListener('click', (e) => {
          e.stopPropagation(); removeBookmark('kana', bm.kana);
        });
      } else if (bm.type === 'vocab') {
        // 카테고리 타입으로 단어/문장 구분
        const cat = typeof VOCAB_CATEGORIES !== 'undefined'
          ? VOCAB_CATEGORIES.find(c => c.id === bm.catId) : null;
        const typeLabel = cat && cat.type === 'sentence' ? '문장'
          : cat && cat.type === 'sim' ? '실전' : '단어';
        const displayJp = bm.kanji ? formatKanjiWithHint(bm.kanji, bm.japanese) : bm.japanese;
        item.innerHTML = `
          <span class="bm-kana" style="font-size:13px">${displayJp}</span>
          <span class="bm-type">${typeLabel}</span>
          <span class="bm-korean">${bm.korean}</span>
          <button class="bm-remove" title="삭제">✕</button>`;
        item.addEventListener('click', () => playAudio(bm.japanese));
        item.querySelector('.bm-remove').addEventListener('click', (e) => {
          e.stopPropagation(); removeBookmark('vocab', bm.vocabId);
        });
      }
      list.appendChild(item);
    });
  }

  function setupBookmarkButtons() {
    const reviewBtn = document.getElementById('review-bookmark-btn');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => {
        const kanaItems  = state.bookmarks.filter(b => b.type === 'kana');
        const vocabItems = state.bookmarks.filter(b => b.type === 'vocab');

        if (kanaItems.length === 0 && vocabItems.length === 0) {
          showToast('북마크된 항목이 없습니다.');
          return;
        }

        // ── vocab 북마크가 있으면 vocab 플래시카드로 복습 ──
        if (vocabItems.length > 0) {
          state.vocabItems = vocabItems.map(b => ({
            id: b.vocabId, japanese: b.japanese, korean: b.korean,
            kanji: b.kanji || null, catId: b.catId || null, tip: null, example: null
          }));
          state.vocabCurrentCategoryId = null;
          state.vocabSection = 'word';
          showView('vocab');
          const bmItems = vocabItems.map(b => ({
            id: b.vocabId, japanese: b.japanese, korean: b.korean,
            kanji: b.kanji || null, tip: null, example: null
          }));
          const subLabel = '단어/문장 ' + vocabItems.length + '개' +
            (kanaItems.length > 0 ? ' · 가나 ' + kanaItems.length + '개는 학습탭에서 복습' : '');
          _startWordExplorerDirect(bmItems, '📌 북마크 복습', subLabel);
          return;
        }

        // ── kana만 있으면 기존 가나 복습 ──
        state.learnLevelId = null;
        state.learnChars = kanaItems.map(b => ({
          kana: b.kana, romaji: b.romaji, korean: b.korean,
          english: b.english, examples: b.examples || [], type: 'kana'
        }));
        state.learnIndex = 0;
        state.learnFlipped = false;
        state.learnMode = 'flash';
        showView('learn');
        document.getElementById('learn-level-name').textContent = '📌 북마크 복습';
        document.getElementById('learn-level-title').textContent = `${state.learnChars.length}개 항목`;
        document.getElementById('flashcard-area').style.display = 'block';
        document.getElementById('browse-area').style.display = 'none';
        renderNavStrip('fc-nav-strip', state.learnChars, 0, (idx) => {
          state.learnIndex = idx; showFlashcard();
        });
        showFlashcard();
        setupFlashcardControls();
      });
    }
    const clearBtn = document.getElementById('clear-bookmark-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (!confirm('북마크를 모두 삭제하시겠습니까?')) return;
        state.bookmarks = [];
        saveToStorage();
        renderBookmarkSection();
        showToast('🗑 북마크가 삭제되었습니다.');
      });
    }
  }

  // ─── 슬라이드쇼 상태 ───
  const ss = {
    chars: [], index: 0, paused: false,
    timer: null, phase: 'reading', // 'reading' | 'revealed'
    readAllTimer: null
  };

  function renderBrowse() {
    setupBrowseControls();
    renderBrowseGrid(state.learnChars);
  }

  function setupBrowseControls() {
    const orderBtn    = document.getElementById('bc-order-btn');
    const randomBtn   = document.getElementById('bc-random-btn');
    const readAllBtn  = document.getElementById('bc-readall-btn');
    const slideshowBtn= document.getElementById('bc-slideshow-btn');

    // 순서/랜덤 토글
    orderBtn.onclick = () => {
      state.browseRandom = false;
      orderBtn.classList.add('bc-active');
      randomBtn.classList.remove('bc-active');
      renderBrowseGrid(state.learnChars);
    };
    randomBtn.onclick = () => {
      state.browseRandom = true;
      randomBtn.classList.add('bc-active');
      orderBtn.classList.remove('bc-active');
      const shuffled = [...state.learnChars].sort(() => Math.random() - 0.5);
      renderBrowseGrid(shuffled);
    };

    // 전체 듣기 (재생 중이면 중지)
    readAllBtn.onclick = () => {
      if (state.isReadingAll) {
        stopAllAudio();
      } else {
        const chars = state.browseRandom
          ? [...state.learnChars].sort(() => Math.random() - 0.5)
          : state.learnChars;
        startReadAll(chars);
      }
    };

    // 슬라이드쇼
    slideshowBtn.onclick = () => {
      const chars = state.browseRandom
        ? [...state.learnChars].sort(() => Math.random() - 0.5)
        : state.learnChars;
      startSlideshow(chars);
    };

  }

  function renderBrowseGrid(chars) {
    // 슬라이드쇼 종료 시 그리드로 복귀
    document.getElementById('slideshow-panel').style.display = 'none';
    document.getElementById('browse-grid').style.display = '';

    const grid = document.getElementById('browse-grid');
    grid.innerHTML = '';
    chars.forEach((char) => {
      const mastered = isCharMastered(char.kana);
      const seen     = !!(state.progress[char.kana] && state.progress[char.kana].seen);
      const example  = char.examples && char.examples.length > 0 ? char.examples[0] : null;
      const statusIcon = mastered ? '✅' : seen ? '🔵' : '⬜';

      const el = document.createElement('div');
      el.className = 'browse-item' + (mastered ? ' bi-mastered' : seen ? ' bi-seen' : '');
      el.innerHTML =
        `<div class="bi-kana">${char.kana}</div>` +
        `<div class="bi-info">` +
          `<span class="bi-romaji">${char.english || ''}</span>` +
          `<span class="bi-korean">${char.korean || ''}</span>` +
          (example ? `<span class="bi-example">${stripFurigana(example.word)} · ${example.meaning}</span>` : '') +
        `</div>` +
        `<span class="bi-status" title="${mastered ? '마스터' : seen ? '학습중' : '미학습'}">${statusIcon}</span>` +
        `<button class="bi-play-btn" title="발음 듣기">🔊</button>`;

      el.querySelector('.bi-play-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        playAudio(char.kana);
      });
      el.addEventListener('click', () => { playAudio(char.kana); markCharSeen(char.kana); });
      grid.appendChild(el);
    });
  }

  // ─── 슬라이드쇼 ───
  function startSlideshow(chars) {
    ss.chars = chars;
    ss.index = 0;
    ss.paused = false;
    ss.phase = 'reading';
    clearTimeout(ss.timer);

    document.getElementById('browse-grid').style.display = 'none';
    document.getElementById('slideshow-panel').style.display = 'block';
    document.getElementById('ss-reveal').style.opacity = '0';

    document.getElementById('ss-play-pause-btn').onclick = toggleSlideshowPause;
    document.getElementById('ss-stop-btn').onclick = stopSlideshow;
    document.getElementById('ss-prev-btn').onclick = () => {
      clearTimeout(ss.timer);
      ss.index = Math.max(0, ss.index - 1);
      showSlideshowCard();
    };
    document.getElementById('ss-next-btn').onclick = () => {
      clearTimeout(ss.timer);
      ss.index = Math.min(ss.chars.length - 1, ss.index + 1);
      showSlideshowCard();
    };

    showSlideshowCard();
  }

  function showSlideshowCard() {
    clearTimeout(ss.timer);
    const char = ss.chars[ss.index];
    if (!char) { stopSlideshow(); showToast('슬라이드쇼 완료! 🎉'); return; }

    const interval = parseInt(document.getElementById('bc-interval-select').value) || 3;
    const total = ss.chars.length;
    document.getElementById('ss-count-text').textContent = `${ss.index + 1} / ${total}`;
    const ssKanaEl = document.getElementById('ss-kana');
    ssKanaEl.textContent = char.kana;
    // 텍스트 길이에 따라 폰트 크기 자동 조정
    requestAnimationFrame(() => {
      const len = (char.kana || '').length;
      let fs;
      if      (len <= 1)  fs = 'clamp(100px, 22vw, 180px)';
      else if (len <= 3)  fs = 'clamp(72px,  16vw, 140px)';
      else if (len <= 6)  fs = 'clamp(48px,  10vw, 100px)';
      else if (len <= 10) fs = 'clamp(32px,  7vw,   72px)';
      else                fs = 'clamp(22px,  5vw,   52px)';
      ssKanaEl.style.fontSize = fs;
      ssKanaEl.style.whiteSpace = len > 6 ? 'normal' : 'nowrap';
    });
    document.getElementById('ss-korean').textContent = char.korean;
    document.getElementById('ss-english').textContent = char.english;
    document.getElementById('ss-hint-text').textContent = '읽어보세요 ↑';
    document.getElementById('ss-reveal').style.opacity = '0';
    document.getElementById('ss-play-pause-btn').textContent = '⏸ 일시정지';
    ss.paused = false;
    ss.phase = 'reading';

    // 카운트다운 바 애니메이션
    const fill = document.getElementById('ss-countdown-fill');
    fill.style.transition = 'none';
    fill.style.width = '100%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fill.style.transition = `width ${interval}s linear`;
      fill.style.width = '0%';
    }));

    if (!ss.paused) {
      ss.timer = setTimeout(() => {
        // 발음 재생 + 읽기 표시
        ss.phase = 'revealed';
        document.getElementById('ss-hint-text').textContent = '';
        document.getElementById('ss-reveal').style.opacity = '1';
        playAudio(char.kana);
        markCharSeen(char.kana);
        // 1.5초 후 다음 카드
        ss.timer = setTimeout(() => {
          if (!ss.paused) {
            ss.index++;
            showSlideshowCard();
          }
        }, 1500);
      }, interval * 1000);
    }
  }

  function toggleSlideshowPause() {
    ss.paused = !ss.paused;
    const btn = document.getElementById('ss-play-pause-btn');
    if (ss.paused) {
      clearTimeout(ss.timer);
      btn.textContent = '▶ 재생';
      // 카운트다운 바 정지
      const fill = document.getElementById('ss-countdown-fill');
      const computed = getComputedStyle(fill).width;
      fill.style.transition = 'none';
      fill.style.width = computed;
    } else {
      btn.textContent = '⏸ 일시정지';
      // 일시정지된 위치에서 재개 (카드 처음부터)
      showSlideshowCard();
    }
  }

  function stopSlideshow() {
    clearTimeout(ss.timer);
    ss.paused = true;
    document.getElementById('slideshow-panel').style.display = 'none';
    document.getElementById('browse-grid').style.display = '';
  }

  // ─── 퀴즈 ───
  function openSettingsToQuizTab() {
    const modal = document.getElementById('settings-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    loadPrefsUI();
    document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.stab-content').forEach(c => c.classList.remove('active'));
    const qt = document.querySelector('.stab[data-tab="quiz"]');
    const qc = document.getElementById('stab-quiz');
    if (qt) qt.classList.add('active');
    if (qc) qc.classList.add('active');
  }

  function setupQuizView() {
    const retryBtn = document.getElementById('qr-retry');
    if (retryBtn) retryBtn.onclick = showQuizIntro;
    document.getElementById('quiz-header').style.display = 'none';
    document.getElementById('quiz-game').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';
    _setupQuizHub();
    showQuizHub();
  }

  // 퀴즈 인트로 화면 표시
  const _QI_SPEECHES_KO = [
    '자, 같이 해보자!',
    '오늘도 연습하자!',
    '시작해볼까! 재밌을 거야!',
    '자신감을 가져! 할 수 있어!',
    '잘 할 수 있어! 해보자!',
    '포기하지 마! 한 걸음씩!',
  ];
  const _QI_SPEECHES_JP = [
    'よし！一緒に頑張ろう！',
    '今日も練習しましょう！',
    '始めましょう！楽しいよ！',
    '自信を持って！できるよ！',
    '上手になれるよ！やろう！',
    '諦めないで！一歩一歩！',
  ];
  function _getQiSpeeches() { return _uiTier() === 'beginner' ? _QI_SPEECHES_KO : _QI_SPEECHES_JP; }
  let _qiSpeechTimer = null;
  let _qiCountdownTimer = null;

  function _doQiStart() {
    if (_qiCountdownTimer) { clearInterval(_qiCountdownTimer); _qiCountdownTimer = null; }
    const overlay = document.getElementById('qi-countdown-overlay');
    if (overlay) overlay.style.display = 'none';
    const cdEl = document.getElementById('qi-cdnum');
    if (cdEl) cdEl.style.display = 'none';
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-header').style.display = 'flex';
    startQuiz();
  }

  function _startQiCountdown() {
    if (_qiCountdownTimer) { clearInterval(_qiCountdownTimer); _qiCountdownTimer = null; }
    const overlay = document.getElementById('qi-countdown-overlay');
    const numEl = document.getElementById('qi-cd-big');
    if (!overlay || !numEl) { _doQiStart(); return; }
    let n = 5;
    numEl.textContent = n;
    numEl.className = 'qi-cd-num';
    overlay.style.display = 'flex';
    _qiCountdownTimer = setInterval(() => {
      n--;
      if (n <= 0) {
        clearInterval(_qiCountdownTimer);
        _qiCountdownTimer = null;
        numEl.textContent = 'GO!';
        numEl.className = 'qi-cd-num qi-cd-go';
        setTimeout(() => {
          overlay.style.display = 'none';
          numEl.className = 'qi-cd-num';
          _doQiStart();
        }, 700);
      } else {
        numEl.textContent = n;
        numEl.className = 'qi-cd-num';
        // force re-trigger animation
        void numEl.offsetWidth;
      }
    }, 1000);
  }

  function _setupQiExtras(ambBtnId, ambLabelId, voiceBtnId, settingsBtnId, refreshChipsFn) {
    // 배경음 토글
    const ambBtn = document.getElementById(ambBtnId);
    const ambLbl = document.getElementById(ambLabelId);
    function _syncAmbBtn() {
      const on = state.prefs.ambientQuiz && state.prefs.ambientQuiz !== 'none';
      if (ambLbl) ambLbl.textContent = on ? '켜짐' : '꺼짐';
      if (ambBtn) { if (on) ambBtn.classList.add('qi-amb-on'); else ambBtn.classList.remove('qi-amb-on'); }
    }
    _syncAmbBtn();
    if (ambBtn) ambBtn.onclick = () => {
      const on = state.prefs.ambientQuiz && state.prefs.ambientQuiz !== 'none';
      if (on) {
        state.prefs.ambientQuiz = 'none'; saveToStorage();
        stopAmbient(0.5);
      } else {
        state.prefs.ambientQuiz = 'on'; saveToStorage();
        startAmbient('on', 'quiz');
      }
      _syncAmbBtn();
    };

    // 화자 버튼 → 설정 모달 음성 섹션
    const voiceBtn = document.getElementById(voiceBtnId);
    if (voiceBtn) voiceBtn.onclick = () => {
      const modal = document.getElementById('settings-modal');
      if (!modal) return;
      modal.style.display = 'flex';
      loadPrefsUI();
      setTimeout(() => {
        const sec = document.getElementById('webtts-settings') || document.getElementById('voicevox-speaker-rows');
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    };

    // 퀴즈 설정 버튼
    const setBtn = document.getElementById(settingsBtnId);
    if (setBtn) setBtn.onclick = () => {
      openSettingsToQuizTab();
      if (refreshChipsFn) {
        const obs = new MutationObserver(() => {
          const modal = document.getElementById('settings-modal');
          if (modal && modal.style.display === 'none') { refreshChipsFn(); obs.disconnect(); }
        });
        const modal = document.getElementById('settings-modal');
        if (modal) obs.observe(modal, { attributes: true, attributeFilter: ['style'] });
      }
    };
  }

  function showQuizIntro() {
    document.getElementById('quiz-intro').style.display = 'flex';
    document.getElementById('quiz-header').style.display = 'none';
    document.getElementById('quiz-game').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';
    // ensure hub + feed panels are hidden
    const hub = document.getElementById('quiz-hub');
    if (hub) hub.style.display = 'none';
    ['fq-start','fq-player','fq-result'].forEach(id => { const e = document.getElementById(id); if (e) e.style.display = 'none'; });

    // 설정 칩 빌드
    _buildQiSettings();

    // 자동넘기기 토글 동기화
    const aaCb = document.getElementById('qi-autonext-cb');
    if (aaCb) {
      aaCb.checked = state.prefs.quizAutoAdvance !== false;
      aaCb.onchange = () => { state.prefs.quizAutoAdvance = aaCb.checked; saveToStorage(); };
    }

    // 퀵 컨트롤 (배경음 / 화자 / 설정)
    _setupQiExtras('qi-amb-btn', 'qi-amb-label', 'qi-voice-btn', null, null);
    _updateQiVoiceDisplay();

    // 시작 버튼
    const startBtn = document.getElementById('qi-start-btn');
    if (startBtn) startBtn.onclick = () => {
      speakCheer('start');
      setTimeout(_startQiCountdown, 600);
    };

    // 카운트다운 리셋 (이전 것 취소)
    if (_qiCountdownTimer) { clearInterval(_qiCountdownTimer); _qiCountdownTimer = null; }
    const cdEl = document.getElementById('qi-cdnum');
    if (cdEl) cdEl.style.display = 'none';

    // 떠다니는 가나 글자 생성
    _spawnQiKanaFloats();

    // 마스코트 대사 순환
    if (_qiSpeechTimer) clearInterval(_qiSpeechTimer);
    let _speechIdx = 0;
    const speechEl = document.getElementById('qi-speech-text');
    if (speechEl) {
      const _qiArr = _getQiSpeeches();
      speechEl.textContent = _qiArr[_speechIdx];
      _qiSpeechTimer = setInterval(() => {
        _speechIdx = (_speechIdx + 1) % _qiArr.length;
        if (speechEl) speechEl.textContent = _qiArr[_speechIdx];
      }, 3500);
    }

    // 인트로 배경음 시작 (크게)
    startAmbient(state.prefs.ambientQuiz || 'none', 'quiz');
  }

  function _updateQiVoiceDisplay() {
    const btn = document.getElementById('qi-voice-btn');
    if (!btn) return;
    let name = '화자';
    try {
      if (state.prefs.useVoicevox && voicevoxSpeakers && voicevoxSpeakers.length) {
        const sid = state.prefs.voicevoxSpeaker1;
        const spk = voicevoxSpeakers.flatMap(c => c.styles || []).find(s => String(s.id) === String(sid));
        if (spk) name = spk._koName || spk.name;
      } else if (allJaVoices && allJaVoices.length) {
        const fIdx = state.prefs.voiceFemale;
        const v = (fIdx !== undefined && fIdx !== 'none') ? allJaVoices[parseInt(fIdx)] : allJaVoices[0];
        if (v) name = v.name.replace(/Microsoft\s+|Google\s+/, '').split(' ')[0];
      }
    } catch(e) {}
    const labelEl = btn.querySelector('.qi-icon-label');
    if (labelEl) labelEl.textContent = name;
    else btn.title = name;
  }

  function _buildQiSettings() {
    const el = document.getElementById('qi-settings-summary');
    if (!el) return;

    const typeOptions   = [['kanaToReading','가나→읽기'],['readingToKana','읽기→가나'],['listen','듣기']];
    const countOptions  = [['10','10문제'],['20','20문제'],['all','전체']];
    const timerOptions  = [['0','제한없음'],['3','3초'],['5','5초'],['7','7초'],['10','10초']];
    const levelOptions  = [['current','현재레벨'],['all','전체']];
    // Add unlocked specific levels
    if (typeof LEVELS !== 'undefined') {
      LEVELS.forEach(lv => {
        if (state.unlockedLevels && state.unlockedLevels.includes(lv.id)) {
          levelOptions.push([String(lv.id), lv.name]);
        }
      });
    }

    function makeGroup(icon, label, optArr, prefKey) {
      const cur = state.prefs[prefKey] !== undefined ? String(state.prefs[prefKey]) : optArr[0][0];
      const chips = optArr.map(([val, lbl]) => {
        const active = cur === val ? 'active' : '';
        return `<button class="qi-inline-chip ${active}" data-key="${prefKey}" data-val="${val}">${lbl}</button>`;
      }).join('');
      return `<div class="qi-settings-row"><span class="qi-settings-icon">${icon}</span><span class="qi-settings-label">${label}</span><div class="qi-inline-chips">${chips}</div></div>`;
    }

    el.innerHTML =
      makeGroup('📝','유형', typeOptions, 'quizType') +
      makeGroup('🔢','문항', countOptions, 'quizCount') +
      makeGroup('⏱','타이머', timerOptions, 'quizCountdown') +
      makeGroup('🎯','레벨', levelOptions, 'quizLevel');

    el.querySelectorAll('.qi-inline-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        const val = btn.dataset.val;
        // exclusive selection within same key
        el.querySelectorAll(`.qi-inline-chip[data-key="${key}"]`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (key === 'quizCountdown') {
          state.prefs[key] = parseInt(val);
        } else {
          state.prefs[key] = val;
        }
        saveToStorage();
      });
    });
  }

  // ─── 퀴즈 허브 ───
  function showQuizHub() {
    // Hide all quiz sub-panels
    ['quiz-intro','quiz-header','quiz-game','quiz-result','fq-start','fq-player','fq-result'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    const hub = document.getElementById('quiz-hub');
    if (hub) hub.style.display = 'flex';
  }

  function _setupQuizHub() {
    const kanaBtn = document.getElementById('qh-kana-btn');
    if (kanaBtn) kanaBtn.onclick = () => {
      document.getElementById('quiz-hub').style.display = 'none';
      showQuizIntro();
    };
    const feedBtn = document.getElementById('qh-feed-btn');
    if (feedBtn) feedBtn.onclick = () => {
      document.getElementById('quiz-hub').style.display = 'none';
      showFqStart();
    };
  }

  // ─── 피드 퀴즈 ───
  let _fqSettings = { masters: ['vocab','sentence','sim'], vocabLevels: [], sentLevels: [], qcount: 10, timer: 0 };
  let _fqQuestions = [];
  let _fqIndex = 0;
  let _fqCorrect = 0;
  let _fqWrong = 0;
  let _fqStreak = 0;
  let _fqMaxStreak = 0;
  let _fqXP = 0;
  let _fqWrongItems = [];
  let _fqTimerInterval = null;
  let _fqRetryWrongItems = null;

  function showFqStart() {
    ['quiz-intro','quiz-header','quiz-game','quiz-result','fq-player','fq-result','quiz-hub'].forEach(id => {
      const e = document.getElementById(id); if (e) e.style.display = 'none';
    });
    const panel = document.getElementById('fq-start');
    if (panel) panel.style.display = 'flex';

    // Back button
    const backBtn = document.getElementById('fqs-back-btn');
    if (backBtn) backBtn.onclick = () => {
      panel.style.display = 'none';
      showQuizHub();
    };

    // Build level chips
    _fqBuildLevelChips();

    // Multi-select masters
    document.querySelectorAll('#fqs-masters .fqs-chip').forEach(btn => {
      btn.onclick = () => {
        btn.classList.toggle('active');
        _fqBuildLevelChips();
      };
    });

    // Exclusive chips for qcount and timer
    document.querySelectorAll('#fqs-qcount .fqs-chip, #fqs-timer .fqs-chip').forEach(btn => {
      btn.onclick = () => {
        const group = btn.closest('.fqs-exclusive');
        if (group) group.querySelectorAll('.fqs-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      };
    });

    // Launch button
    const launchBtn = document.getElementById('fq-launch-btn');
    if (launchBtn) launchBtn.onclick = () => _fqReadSettingsAndStart();
  }

  function _fqBuildLevelChips() {
    // Check which masters are active
    const activeMasters = Array.from(document.querySelectorAll('#fqs-masters .fqs-chip.active')).map(b => b.dataset.val);
    const vocabWrap = document.getElementById('fqs-vocab-levels-wrap');
    const sentWrap = document.getElementById('fqs-sent-levels-wrap');
    const showVocab = activeMasters.includes('vocab');
    const showSent  = activeMasters.includes('sentence') || activeMasters.includes('sim');
    if (vocabWrap) vocabWrap.style.display = showVocab ? '' : 'none';
    if (sentWrap) sentWrap.style.display = showSent ? '' : 'none';

    if (typeof VOCAB_CATEGORIES === 'undefined') return;

    // Build vocab level chips (W1~W8)
    const vocabLevelsEl = document.getElementById('fqs-vocab-levels');
    if (vocabLevelsEl && !vocabLevelsEl.dataset.built) {
      const vocabLevels = [...new Set(VOCAB_CATEGORIES.filter(c => c.type === 'word').map(c => c.level).filter(Boolean))].sort((a,b) => a-b);
      vocabLevelsEl.innerHTML = '';
      vocabLevels.forEach(lv => {
        const btn = document.createElement('button');
        btn.className = 'fqs-chip active';
        btn.dataset.val = lv;
        btn.textContent = 'W' + lv;
        btn.onclick = () => btn.classList.toggle('active');
        vocabLevelsEl.appendChild(btn);
      });
      vocabLevelsEl.dataset.built = '1';
    }

    // Build sentence/sim level chips
    const sentLevelsEl = document.getElementById('fqs-sent-levels');
    if (sentLevelsEl && !sentLevelsEl.dataset.built) {
      const sentLevels = [...new Set(VOCAB_CATEGORIES.filter(c => c.type === 'sentence' || c.type === 'sim').map(c => c.level).filter(Boolean))].sort((a,b) => a-b);
      sentLevelsEl.innerHTML = '';
      sentLevels.forEach(lv => {
        const btn = document.createElement('button');
        btn.className = 'fqs-chip active';
        btn.dataset.val = lv;
        btn.textContent = 'S' + lv;
        btn.onclick = () => btn.classList.toggle('active');
        sentLevelsEl.appendChild(btn);
      });
      sentLevelsEl.dataset.built = '1';
    }
  }

  function _fqReadSettingsAndStart(overrideItems) {
    // Read master selection
    const masters = Array.from(document.querySelectorAll('#fqs-masters .fqs-chip.active')).map(b => b.dataset.val);
    // Read level chips
    const vocabLevels = Array.from(document.querySelectorAll('#fqs-vocab-levels .fqs-chip.active')).map(b => parseInt(b.dataset.val));
    const sentLevels  = Array.from(document.querySelectorAll('#fqs-sent-levels .fqs-chip.active')).map(b => parseInt(b.dataset.val));
    // Read qcount
    const qcountBtn = document.querySelector('#fqs-qcount .fqs-chip.active');
    const qcount = qcountBtn ? parseInt(qcountBtn.dataset.val) : 10;
    // Read timer
    const timerBtn = document.querySelector('#fqs-timer .fqs-chip.active');
    const timer = timerBtn ? parseInt(timerBtn.dataset.val) : 0;

    _fqSettings = { masters, vocabLevels, sentLevels, qcount, timer };

    if (overrideItems) {
      _fqStartPlayer(_fqBuildQuestionsFromItems(overrideItems));
    } else {
      const questions = _fqGenerateQuestions(masters, vocabLevels, sentLevels, qcount);
      if (!questions.length) { showToast('문제를 생성할 수 없어요. 설정을 확인해 주세요.'); return; }
      _fqStartPlayer(questions);
    }
  }

  function _fqGenerateQuestions(masters, vocabLevels, sentLevels, qcount) {
    if (typeof VOCAB_CATEGORIES === 'undefined') return [];
    let pool = [];

    // Collect items from selected masters + levels
    VOCAB_CATEGORIES.forEach(cat => {
      const typeMatch = masters.includes(cat.type) || (cat.type === 'word' && masters.includes('vocab'));
      if (!typeMatch) return;
      const isVocab = cat.type === 'word';
      const isSent  = cat.type === 'sentence' || cat.type === 'sim';
      const levelOk = (isVocab && (vocabLevels.length === 0 || vocabLevels.includes(cat.level))) ||
                      (isSent  && (sentLevels.length === 0  || sentLevels.includes(cat.level)));
      if (!levelOk) return;
      const items = getVocabCategoryItems(cat.id);
      items.forEach(item => {
        if (!item) return;
        pool.push({ item, catType: cat.type, catId: cat.id });
      });
    });

    if (!pool.length) return [];

    // Shuffle pool
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Limit to qcount
    pool = pool.slice(0, qcount);

    return _fqBuildQuestionsFromItems(pool);
  }

  function _fqBuildQuestionsFromItems(poolItems) {
    return poolItems.map(({ item, catType, catId }) => {
      const rand = Math.random();
      let qType;
      if (catType === 'word') {
        qType = rand < 0.5 ? 'jp_to_kr' : 'kr_to_jp';
      } else {
        qType = rand < 0.5 ? 'sentence_kr' : 'sentence_jp';
      }

      // Build wrong options
      const allItems = (typeof VOCAB_CATEGORIES !== 'undefined')
        ? VOCAB_CATEGORIES.filter(c => c.type === catType).flatMap(c => getVocabCategoryItems(c.id)).filter(Boolean)
        : [];
      const wrongPool = allItems.filter(i => i.id !== item.id);
      const shuffled = wrongPool.sort(() => Math.random() - 0.5).slice(0, 3);

      let question, questionSub, answer, answerLabel, choices;

      if (qType === 'jp_to_kr') {
        question = item.japanese || item.id;
        questionSub = item.kanji || '';
        answer = item.korean || '';
        answerLabel = answer;
        choices = [answer, ...shuffled.map(w => w.korean || '')].sort(() => Math.random() - 0.5);
      } else if (qType === 'kr_to_jp') {
        question = item.korean || item.id;
        questionSub = '';
        answer = item.japanese || item.id;
        answerLabel = answer;
        choices = [answer, ...shuffled.map(w => w.japanese || w.id)].sort(() => Math.random() - 0.5);
      } else if (qType === 'sentence_kr') {
        question = item.japanese || item.id;
        questionSub = item.kanji || '';
        answer = item.korean || '';
        answerLabel = answer;
        choices = [answer, ...shuffled.map(w => w.korean || '')].sort(() => Math.random() - 0.5);
      } else {
        question = item.korean || item.id;
        questionSub = '';
        answer = item.japanese || item.id;
        answerLabel = answer;
        choices = [answer, ...shuffled.map(w => w.japanese || w.id)].sort(() => Math.random() - 0.5);
      }

      // Fill to exactly 4 choices, remove duplicates
      const seen = new Set();
      const finalChoices = [];
      choices.forEach(c => { if (c && !seen.has(c)) { seen.add(c); finalChoices.push(c); } });
      while (finalChoices.length < 4) finalChoices.push('?');

      const badgeMap = { word: '어휘', sentence: '회화', sim: '롤플레이' };

      return { item, catType, catId, qType, question, questionSub, answer: answerLabel, choices: finalChoices.slice(0,4), badge: badgeMap[catType] || '어휘' };
    });
  }

  function _fqStartPlayer(questions) {
    _fqQuestions = questions;
    _fqIndex = 0;
    _fqCorrect = 0;
    _fqWrong = 0;
    _fqStreak = 0;
    _fqMaxStreak = 0;
    _fqXP = 0;
    _fqWrongItems = [];

    ['fq-start','quiz-hub'].forEach(id => { const e = document.getElementById(id); if (e) e.style.display = 'none'; });
    const player = document.getElementById('fq-player');
    if (player) player.style.display = 'flex';

    document.getElementById('fqp-qtotal').textContent = questions.length;
    _fqShowQuestion();
  }

  function _fqShowQuestion() {
    if (_fqTimerInterval) { clearInterval(_fqTimerInterval); _fqTimerInterval = null; }
    const q = _fqQuestions[_fqIndex];
    if (!q) { _fqShowResult(); return; }

    // HUD
    document.getElementById('fqp-streak').textContent = _fqStreak;
    document.getElementById('fqp-qnum').textContent = _fqIndex + 1;
    document.getElementById('fqp-xp').textContent = _fqXP;

    // Feedback hide
    const fb = document.getElementById('fqp-feedback');
    if (fb) fb.style.display = 'none';

    // Card
    document.getElementById('fqp-card-badge').textContent = q.badge;
    document.getElementById('fqp-question').textContent = q.question;
    const qSub = document.getElementById('fqp-question-sub');
    if (qSub) {
      qSub.textContent = q.questionSub || '';
      qSub.style.display = q.questionSub ? '' : 'none';
    }

    // Choices
    const choicesEl = document.getElementById('fqp-choices');
    choicesEl.innerHTML = '';
    q.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'fqp-choice-btn';
      btn.textContent = choice;
      btn.onclick = () => _fqSelectAnswer(choice, q);
      choicesEl.appendChild(btn);
    });

    // Timer
    const timerSec = _fqSettings.timer;
    const timerWrap = document.getElementById('fqp-timer-bar-wrap');
    const timerFill = document.getElementById('fqp-timer-fill');
    if (timerSec > 0) {
      if (timerWrap) timerWrap.style.display = '';
      if (timerFill) {
        timerFill.style.transition = 'none';
        timerFill.style.width = '100%';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          timerFill.style.transition = `width ${timerSec}s linear`;
          timerFill.style.width = '0%';
        }));
      }
      _fqTimerInterval = setTimeout(() => {
        _fqSelectAnswer(null, q);
      }, timerSec * 1000);
    } else {
      if (timerWrap) timerWrap.style.display = 'none';
    }
  }

  function _fqSelectAnswer(chosen, q) {
    if (_fqTimerInterval) { clearInterval(_fqTimerInterval); _fqTimerInterval = null; }

    const isCorrect = chosen === q.answer;

    // Color choices
    const choiceBtns = document.querySelectorAll('#fqp-choices .fqp-choice-btn');
    choiceBtns.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === q.answer) btn.classList.add('correct');
      else if (btn.textContent === chosen && !isCorrect) btn.classList.add('wrong');
    });

    // Stats
    if (isCorrect) {
      _fqCorrect++;
      _fqStreak++;
      if (_fqStreak > _fqMaxStreak) _fqMaxStreak = _fqStreak;
      _fqXP += 5 + (_fqStreak >= 3 ? 2 : 0);
      if (typeof _awardXP === 'function') _awardXP(5, 'fq_correct');
    } else {
      _fqWrong++;
      _fqStreak = 0;
      _fqWrongItems.push({ item: q.item, catType: q.catType, catId: q.catId });
    }

    // Feedback panel
    const fb = document.getElementById('fqp-feedback');
    const fbIcon = document.getElementById('fqp-fb-icon');
    const fbCorrect = document.getElementById('fqp-fb-correct');
    if (fb) {
      if (fbIcon) fbIcon.textContent = isCorrect ? '⭕' : '❌';
      const correctKr = q.item.korean || '';
      if (fbCorrect) fbCorrect.textContent = isCorrect ? '정답!' : `정답: ${q.answer}${correctKr && q.answer !== correctKr ? '  (' + correctKr + ')' : ''}`;
      fb.style.display = 'flex';
      fb.style.flexDirection = 'column';
      fb.style.alignItems = 'center';
    }

    // Update HUD
    document.getElementById('fqp-streak').textContent = _fqStreak;
    document.getElementById('fqp-xp').textContent = _fqXP;

    // Auto-advance
    setTimeout(() => {
      if (fb) fb.style.display = 'none';
      _fqIndex++;
      _fqShowQuestion();
    }, 1500);
  }

  function _fqShowResult() {
    ['fq-player'].forEach(id => { const e = document.getElementById(id); if (e) e.style.display = 'none'; });
    const result = document.getElementById('fq-result');
    if (result) result.style.display = 'flex';

    const total = _fqQuestions.length;
    const pct = total > 0 ? Math.round((_fqCorrect / total) * 100) : 0;

    // Grade
    let grade = 'F', title = '다시 도전!';
    if (pct >= 95) { grade = 'S'; title = '완벽해요! 🌟'; }
    else if (pct >= 80) { grade = 'A'; title = '훌륭해요! 🎉'; }
    else if (pct >= 65) { grade = 'B'; title = '잘했어요! 👍'; }
    else if (pct >= 50) { grade = 'C'; title = '계속 노력해요! 💪'; }
    else { grade = 'D'; title = '다시 도전해봐요! 🔄'; }

    document.getElementById('fqr-grade').textContent = grade;
    document.getElementById('fqr-title').textContent = title;
    document.getElementById('fqr-pct').textContent = pct + '%';
    document.getElementById('fqr-score').textContent = `${_fqCorrect}/${total}`;
    document.getElementById('fqr-correct').textContent = _fqCorrect;
    document.getElementById('fqr-wrong').textContent = _fqWrong;
    document.getElementById('fqr-streak').textContent = _fqMaxStreak;

    // Stars
    const stars = pct >= 80 ? '★★★' : pct >= 50 ? '★★☆' : '★☆☆';
    document.getElementById('fqr-stars').textContent = stars;

    // Ring animation
    const ringFill = document.getElementById('fqr-ring-fill');
    if (ringFill) {
      const dash = 326.7;
      const offset = dash - (dash * pct / 100);
      ringFill.style.strokeDashoffset = dash;
      setTimeout(() => { ringFill.style.strokeDashoffset = offset; }, 100);
    }

    // Wrong items list
    const wrongSec = document.getElementById('fqr-wrong-list');
    if (wrongSec) {
      if (_fqWrongItems.length > 0) {
        let html = '<div class="fqr-wrong-title">❌ 틀린 문제</div>';
        _fqWrongItems.forEach(({ item }) => {
          const jp = item.japanese || item.id || '';
          const kr = item.korean || '';
          html += `<div class="fqr-wrong-item"><span class="fqr-wrong-jp">${jp}</span><span class="fqr-wrong-kr">${kr}</span></div>`;
        });
        wrongSec.innerHTML = html;
        wrongSec.style.display = '';
      } else {
        wrongSec.style.display = 'none';
      }
    }

    // Retry wrong items button
    const retryWrongBtn = document.getElementById('fqr-retry-wrong');
    if (retryWrongBtn) {
      if (_fqWrongItems.length > 0) {
        retryWrongBtn.style.display = '';
        _fqRetryWrongItems = [..._fqWrongItems];
        retryWrongBtn.onclick = () => {
          const items = _fqRetryWrongItems;
          result.style.display = 'none';
          _fqStartPlayer(_fqBuildQuestionsFromItems(items));
        };
      } else {
        retryWrongBtn.style.display = 'none';
      }
    }

    // Retry from start button
    const retryBtn = document.getElementById('fqr-retry');
    if (retryBtn) retryBtn.onclick = () => {
      result.style.display = 'none';
      showFqStart();
    };

    // Hub button
    const hubBtn = document.getElementById('fqr-hub-btn');
    if (hubBtn) hubBtn.onclick = () => {
      result.style.display = 'none';
      showQuizHub();
    };
  }

  function _spawnQiKanaFloats() {
    const bg = document.getElementById('qi-bg-anim');
    if (!bg) return;
    bg.querySelectorAll('.qi-kana-float').forEach(e => e.remove());
    const kanas = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん'.split('');
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('div');
      el.className = 'qi-kana-float';
      el.textContent = kanas[Math.floor(Math.random() * kanas.length)];
      el.style.left  = Math.random() * 100 + '%';
      el.style.fontSize = (18 + Math.random() * 20) + 'px';
      el.style.animationDuration = (12 + Math.random() * 16) + 's';
      el.style.animationDelay   = (-Math.random() * 20) + 's';
      bg.appendChild(el);
    }
  }

  function populateQuizLevelSelect() {
    const sel = document.getElementById('quiz-level-select');
    if (!sel) return;
    const saved = state.prefs.quizLevel || sel.value || 'current';
    sel.innerHTML = '';
    const allOpt = document.createElement('option');
    allOpt.value = 'all'; allOpt.textContent = '전체 (해금된 레벨)';
    sel.appendChild(allOpt);
    const curOpt = document.createElement('option');
    curOpt.value = 'current'; curOpt.textContent = '현재 레벨만';
    sel.appendChild(curOpt);
    LEVELS.forEach(level => {
      if (state.unlockedLevels.includes(level.id)) {
        const opt = document.createElement('option');
        opt.value = level.id;
        opt.textContent = `${level.name}: ${level.title}`;
        sel.appendChild(opt);
      }
    });
    // 저장된 값 복원
    sel.value = saved;
    if (!sel.value) sel.value = 'current';
    // 변경 시 즉시 prefs 반영
    sel.onchange = () => { state.prefs.quizLevel = sel.value; saveToStorage(); };
  }

  function startQuizForLevel(levelId) {
    // 해당 레벨로 prefs 업데이트 후 퀴즈 시작
    if (levelId) {
      state.prefs.quizLevel = String(levelId);
      // settings modal 내 select도 동기화
      const sel = document.getElementById('quiz-level-select');
      if (sel) {
        if (!sel.querySelector(`option[value="${levelId}"]`)) {
          const level = LEVELS.find(l => l.id === parseInt(levelId));
          if (level) {
            const opt = document.createElement('option');
            opt.value = level.id;
            opt.textContent = `${level.name}: ${level.title}`;
            sel.appendChild(opt);
          }
        }
        sel.value = levelId;
      }
    }
    showView('quiz');
    setTimeout(() => showQuizIntro(), 150);
  }

  function startQuiz() {
    const levelSel = state.prefs.quizLevel || 'current';
    const qtype    = state.prefs.quizType  || 'kanaToReading';
    const qcount   = state.prefs.quizCount || '10';
    const qlang    = state.prefs.quizLang  || 'korean';

    state.quizType = qtype;
    state.quizLang = qlang;

    // 글자 목록 결정
    let chars = [];
    if (levelSel === 'all') {
      state.unlockedLevels.forEach(id => {
        const level = LEVELS.find(l => l.id === id);
        if (level) chars.push(...level.chars);
      });
    } else if (levelSel === 'current') {
      const level = LEVELS.find(l => l.id === state.currentLevel);
      if (level) chars = [...level.chars];
    } else {
      const levelId = parseInt(levelSel);
      const level = LEVELS.find(l => l.id === levelId);
      if (level) {
        if (levelId === 12) {
          chars = Object.keys(KANA_MAP); // 전체 복습: 모든 가나
        } else {
          chars = [...level.chars];
        }
      }
    }

    // 유효한 글자만
    chars = chars.filter(k => KANA_MAP[k]);

    startQuizWithChars(chars, qtype, qlang, qcount);
  }

  function startQuizWithChars(chars, qtype, qlang, countSel) {
    if (chars.length === 0) {
      // 글자가 없으면 해금된 전체 레벨 또는 전체 KANA_MAP으로 폴백
      const unlocked = [];
      (state.unlockedLevels || [1]).forEach(id => {
        const lv = LEVELS.find(l => l.id === id);
        if (lv) unlocked.push(...lv.chars);
      });
      chars = (unlocked.length > 0 ? unlocked : Object.keys(KANA_MAP)).filter(k => KANA_MAP[k]);
      if (chars.length === 0) { showToast('퀴즈할 글자가 없습니다.'); return; }
    }

    // 셔플
    const shuffled = [...chars].sort(() => Math.random() - 0.5);
    const count = countSel === 'all' || !countSel ? shuffled.length : Math.min(parseInt(countSel) || 10, shuffled.length);

    state.quizQuestions = shuffled.slice(0, count).map(k => buildQuestion(k, qtype, qlang));
    state.quizCurrentIdx = 0;
    state.quizCorrect = 0;
    state.quizWrong = 0;
    state.quizWrongList = [];
    state.quizAnswered = false;
    state.quizStreak = 0;
    state.quizMaxStreak = 0;
    state.quizCheerCount = 0; // 응원 발화 빈도 제어
    if (state.quizCountdownTimer) { clearInterval(state.quizCountdownTimer); state.quizCountdownTimer = null; }
    if (state.quizAmbFadeTimer) { clearTimeout(state.quizAmbFadeTimer); state.quizAmbFadeTimer = null; }

    // 인트로에서 이미 시작한 배경음을 5초 후 잔잔하게 줄이기
    // (배경음이 없는 경우 no-op)
    state.quizAmbFadeTimer = setTimeout(() => {
      if (_ambAudio) _ambFadeTo(_ambAudio, _ambTargetVol() * 0.35, 2500);
    }, 5000);

    document.getElementById('quiz-game').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';

    document.getElementById('qsm-correct').textContent = '✓ 0';
    document.getElementById('qsm-wrong').textContent = '✗ 0';

    // 퀴즈 중 자동넘기기 토글 동기화
    const aaCb2 = document.getElementById('qsm-aa-cb');
    if (aaCb2) {
      aaCb2.checked = state.prefs.quizAutoAdvance !== false;
      aaCb2.onchange = () => { state.prefs.quizAutoAdvance = aaCb2.checked; saveToStorage(); };
    }

    showQuizQuestion();
  }

  function buildQuestion(kana, qtype, qlang) {
    const info = KANA_MAP[kana];
    if (!info) return null;

    // 실제 표시 가나 (는_p → は 같은 특수 키 대응)
    const displayKana = info.kana || kana;

    // 오답 3개 생성 (같은 타입에서)
    const sameType = Object.entries(KANA_MAP)
      .filter(([k, v]) => k !== kana && v.type === info.type)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(([k, v]) => ({ kana: v.kana || k, ...v }));

    // 정답 포함 4개 셔플
    const correct = { kana: displayKana, ...info };
    const choices = [correct, ...sameType].sort(() => Math.random() - 0.5);

    return { kana, displayKana, info, qtype, qlang, choices, correctKana: displayKana };
  }

  function showQuizQuestion() {
    const q = state.quizQuestions[state.quizCurrentIdx];
    if (!q) return;
    const total = state.quizQuestions.length;
    const idx = state.quizCurrentIdx;

    document.getElementById('qpr-text').textContent = `${idx + 1} / ${total}`;
    document.getElementById('qpr-bar-fill').style.width = `${(idx / total) * 100}%`;

    state.quizAnswered = false;

    // 진행 중인 카운트다운 타이머 클리어
    if (state.quizCountdownTimer) {
      clearInterval(state.quizCountdownTimer);
      state.quizCountdownTimer = null;
    }

    // 질문 박스
    const qbox = document.getElementById('quiz-question-box');
    qbox.innerHTML = '';

    let qInner = '';
    if (q.qtype === 'kanaToReading') {
      qInner = `
        <div style="width:100%">
          <div class="qb-kana">${q.displayKana || q.kana}</div>
          <div class="qb-label">이 글자의 발음은?</div>
          <button class="audio-btn" style="margin-top:10px" onclick="App.playAudio('${q.displayKana || q.kana}')">🔊 발음 듣기</button>
        </div>`;
    } else if (q.qtype === 'readingToKana') {
      const readingText = getReadingText(q.info);
      qInner = `
        <div style="width:100%">
          <div class="qb-reading">${readingText}</div>
          <div class="qb-label">이 발음에 해당하는 글자는?</div>
        </div>`;
    } else if (q.qtype === 'listen') {
      qInner = `
        <div style="text-align:center; width:100%">
          <div class="qb-listen-once">🔊</div>
          <div class="qb-label" style="margin-top:10px">들은 발음에 해당하는 글자는?</div>
          <div class="qb-label" style="font-size:11px;margin-top:4px;opacity:0.6">발음은 한 번만 재생됩니다</div>
        </div>`;
      setTimeout(() => playAudio(q.displayKana || q.kana), 400);
    }
    qbox.innerHTML = qInner;

    // ── 힌트: 예시 단어를 문제 하단에 표시 (listen 모드는 제외) ──
    const hints = (q.info.examples || []).slice(0, 3);
    if (hints.length && q.qtype !== 'listen') {
      const hintDiv = document.createElement('div');
      hintDiv.className = 'quiz-question-hint';
      hintDiv.innerHTML = `<span class="quiz-hint-label">💡 힌트 — 예시 단어</span>` +
        hints.map(e =>
          `<span class="quiz-hint-ex" onclick="App.playAudio('${e.word}')">` +
          `<strong>${e.word}</strong> ${e.meaning}` +
          `</span>`
        ).join('');
      qbox.appendChild(hintDiv);
    }

    // 선택지
    const choicesDiv = document.getElementById('quiz-choices');
    choicesDiv.innerHTML = '';

    q.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.dataset.kana = choice.kana;

      if (q.qtype === 'kanaToReading') {
        const reading = getReadingText(choice);
        btn.innerHTML = `<span class="choice-reading">${reading}</span>`;
      } else {
        btn.innerHTML = `<span class="choice-kana">${choice.kana}</span>`;
      }

      btn.addEventListener('click', () => handleQuizAnswer(choice.kana, q));
      choicesDiv.appendChild(btn);
    });

    // 피드백 숨김
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('qf-countdown').style.display = 'none';
    document.getElementById('qf-countdown-label').style.display = 'none';

    // ── 문제 제한 시간 카운트다운 ──
    const quizSec = state.prefs.quizCountdown !== undefined ? state.prefs.quizCountdown : 5;
    const timerRow  = document.getElementById('quiz-timer-row');
    const timerFill = document.getElementById('quiz-timer-fill');
    const timerText = document.getElementById('quiz-timer-text');

    if (q.qtype === 'listen' && quizSec > 0 && timerRow) {
      // 듣기 모드: 타이머 UI는 숨겼다가 2.5초 후 표시 (TTS 완료 후)
      timerRow.style.display = 'none';
      setTimeout(() => {
        if (state.quizAnswered) return; // 이미 답했으면 skip
        timerRow.style.display = 'flex';
        timerText.textContent = quizSec;
        timerFill.style.transition = 'none';
        timerFill.style.width = '100%';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          timerFill.style.transition = `width ${quizSec}s linear`;
          timerFill.style.width = '0%';
        }));
        let timeLeft = quizSec;
        state.quizCountdownTimer = setInterval(() => {
          timeLeft--;
          if (timerText) timerText.textContent = Math.max(0, timeLeft);
          if (timeLeft <= 0) {
            clearInterval(state.quizCountdownTimer);
            state.quizCountdownTimer = null;
            if (!state.quizAnswered) handleQuizAnswer('__timeout__', q);
          }
        }, 1000);
      }, 2500);
    } else if (q.qtype !== 'listen' && quizSec > 0 && timerRow) {
      timerRow.style.display = 'flex';
      timerText.textContent = quizSec;
      timerFill.style.transition = 'none';
      timerFill.style.width = '100%';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        timerFill.style.transition = `width ${quizSec}s linear`;
        timerFill.style.width = '0%';
      }));
      let timeLeft = quizSec;
      state.quizCountdownTimer = setInterval(() => {
        timeLeft--;
        if (timerText) timerText.textContent = Math.max(0, timeLeft);
        if (timeLeft <= 0) {
          clearInterval(state.quizCountdownTimer);
          state.quizCountdownTimer = null;
          if (!state.quizAnswered) {
            handleQuizAnswer('__timeout__', q);
          }
        }
      }, 1000);
    } else if (timerRow) {
      timerRow.style.display = 'none';
    }
  }

  function getReadingText(info) {
    if (!info) return '';
    return info.korean || '';
  }

  function handleQuizAnswer(chosenKana, q) {
    if (state.quizAnswered) return;
    state.quizAnswered = true;

    // 제한시간 타이머 중지
    if (state.quizCountdownTimer) {
      clearInterval(state.quizCountdownTimer);
      state.quizCountdownTimer = null;
    }
    const timerRow = document.getElementById('quiz-timer-row');
    if (timerRow) timerRow.style.display = 'none';

    const isTimeout = chosenKana === '__timeout__';
    const isCorrect = !isTimeout && chosenKana === q.correctKana;

    // 버튼 시각화
    document.querySelectorAll('.choice-btn').forEach(btn => {
      btn.classList.add('disabled');
      if (btn.dataset.kana === q.correctKana) btn.classList.add('correct');
      if (!isTimeout && btn.dataset.kana === chosenKana && !isCorrect) btn.classList.add('wrong');
    });

    // 결과 기록
    recordResult(q.kana, isCorrect);

    if (isCorrect) _onQuizCorrect(); else _onQuizWrong();
    let cheerType = 'correct';
    if (isCorrect) {
      state.quizCorrect++;
      document.getElementById('qsm-correct').textContent = '✓ ' + state.quizCorrect;
      state.quizStreak = (state.quizStreak || 0) + 1;
      if (state.quizStreak > (state.quizMaxStreak || 0)) state.quizMaxStreak = state.quizStreak;
      const streak = state.quizStreak;
      cheerType = streak >= 8 ? 'streak8' : streak >= 5 ? 'streak5' : streak >= 3 ? 'streak3' : 'correct';
    } else {
      state.quizWrong++;
      state.quizWrongList.push(q.kana);
      document.getElementById('qsm-wrong').textContent = '✗ ' + state.quizWrong;
      state.quizStreak = 0;
    }

    // 시간초과 시 일본어로 말하기
    if (isTimeout) {
      _speakTimeoutJa();
    }

    // 피드백 표시
    const fb = document.getElementById('quiz-feedback');
    fb.style.display = 'block';
    const qfResult = document.getElementById('qf-result');
    const qfCorrect = document.getElementById('qf-correct');
    const qfExamples = document.getElementById('qf-examples');
    const qfCountdown = document.getElementById('qf-countdown');
    const qfCountdownLabel = document.getElementById('qf-countdown-label');
    const nextBtn = document.getElementById('qf-next-btn');

    qfExamples.innerHTML = '';
    qfExamples.style.display = 'none';

    const autoAdv = state.prefs.quizAutoAdvance !== false;

    // 응원 발화 빈도 결정: 스트릭 이벤트는 항상, 일반 정답은 3번에 1번
    state.quizCheerCount = (state.quizCheerCount || 0) + 1;
    const isMilestoneCheer = (cheerType !== 'correct'); // streak3/5/8
    const shouldVoiceCheer = isMilestoneCheer || (state.quizCheerCount % 3 === 0);

    // 관련 예시 단어 (정답 시 읽어줄 단어들)
    const examples = (q.info && Array.isArray(q.info.examples)) ? q.info.examples.slice(0, 2) : [];

    state.quizSeqId = (state.quizSeqId || 0) + 1;
    const seqId = state.quizSeqId;
    qfCountdown.style.display = 'none';
    qfCountdownLabel.style.display = 'none';

    const _cancelSeq = () => {
      state.quizSeqId = (state.quizSeqId || 0) + 1;
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (state.quizCountdownTimer) { clearInterval(state.quizCountdownTimer); state.quizCountdownTimer = null; }
    };

    if (isCorrect) {
      qfResult.textContent = '✓ 정답!';
      qfResult.className = 'qf-result correct';
      qfCorrect.textContent = '';
      playCorrectSound();

      // 예시 단어 카드 표시
      if (examples.length) {
        qfExamples.style.display = 'block';
        qfExamples.innerHTML = `<div class="qf-ex-label">📖 관련 단어</div>` +
          examples.map((ex, i) =>
            `<div class="qf-ex-card" id="qfex-${i}">` +
            `<span class="qf-ex-word">${ex.w || ''}</span>` +
            `<span class="qf-ex-reading">${ex.r || ''}</span>` +
            `<span class="qf-ex-ko">${ex.ko || ''}</span>` +
            `</div>`).join('');
      }

      nextBtn.textContent = '건너뛰기 →';
      nextBtn.onclick = () => { _cancelSeq(); nextQuizQuestion(); };

      ;(async () => {
        await new Promise(r => setTimeout(r, 300));
        if (state.quizSeqId !== seqId) return;
        // 응원 발화/배너
        if (shouldVoiceCheer) {
          await speakCheer(cheerType);
        } else {
          const ct = _pickCheer(cheerType);
          if (ct) _showCheerBanner(ct, '');
          await new Promise(r => setTimeout(r, 400));
        }
        if (state.quizSeqId !== seqId) return;
        // 예시 단어 하나씩 강조 + TTS
        for (let i = 0; i < examples.length; i++) {
          if (state.quizSeqId !== seqId) return;
          qfExamples.querySelectorAll('.qf-ex-card').forEach((c, j) => c.classList.toggle('qf-ex-active', j === i));
          const word = examples[i].w || '';
          if (word) await playAudioSlot(word, 1);
          await new Promise(r => setTimeout(r, 700));
        }
        if (state.quizSeqId !== seqId) return;
        if (autoAdv) nextQuizQuestion();
        else {
          nextBtn.textContent = '다음 문제 →';
          nextBtn.onclick = () => { _cancelSeq(); nextQuizQuestion(); };
        }
      })();

    } else {
      // 오답 / 시간 초과
      qfResult.textContent = isTimeout ? '⏰ 시간 초과!' : '✗ 틀렸어요';
      qfResult.className = 'qf-result wrong';
      qfCorrect.textContent = `정답: ${q.kana} = ${getReadingText(q.info)}`;

      ;(async () => {
        if (!isTimeout) {
          playWrongSound();
          await speakCheer('wrong');
        }
        if (state.quizSeqId !== seqId) return;
        // 정답 글자 읽어주기
        await playAudioSlot(q.displayKana || q.kana || '', 1);
      })();

      if (autoAdv) {
        let count = 10;
        qfCountdown.textContent = count;
        qfCountdown.style.display = 'block';
        qfCountdownLabel.textContent = '초 후 자동으로 다음 문제';
        qfCountdownLabel.style.display = 'block';
        nextBtn.textContent = '지금 다음 문제 →';
        state.quizCountdownTimer = setInterval(() => {
          count--;
          if (count <= 0) {
            clearInterval(state.quizCountdownTimer); state.quizCountdownTimer = null;
            nextQuizQuestion();
          } else { qfCountdown.textContent = count; }
        }, 1000);
        nextBtn.onclick = () => { _cancelSeq(); nextQuizQuestion(); };
      } else {
        nextBtn.textContent = '다음 문제 →';
        nextBtn.onclick = () => { _cancelSeq(); nextQuizQuestion(); };
      }
    }
  }

  function nextQuizQuestion() {
    state.quizCurrentIdx++;
    if (state.quizCurrentIdx >= state.quizQuestions.length) {
      showQuizResult();
    } else {
      showQuizQuestion();
    }
  }

  function showQuizResult() {
    if (state.quizAmbFadeTimer) { clearTimeout(state.quizAmbFadeTimer); state.quizAmbFadeTimer = null; }
    const correct   = state.quizCorrect;
    const total     = state.quizQuestions.length;
    const wrong     = total - correct;
    const pct       = total > 0 ? Math.round((correct / total) * 100) : 0;
    const maxStreak = state.quizMaxStreak || 0;
    const xpGained  = calculateXP(correct, total);

    // 등급
    let grade = 'D', gradeColor = '#ef4444';
    if (pct >= 100) { grade = 'S'; gradeColor = '#f59e0b'; }
    else if (pct >= 90) { grade = 'A'; gradeColor = '#10b981'; }
    else if (pct >= 70) { grade = 'B'; gradeColor = '#3b82f6'; }
    else if (pct >= 50) { grade = 'C'; gradeColor = '#8b5cf6'; }

    // 별점
    const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : pct > 0 ? 1 : 0;

    // 타이틀
    let title = '다시 도전해요! 💪';
    if (pct >= 100) title = '완벽해요! 🎉';
    else if (pct >= 90) title = '거의 완벽! 🌟';
    else if (pct >= 70) title = '잘했어요! 👍';
    else if (pct >= 50) title = '좋아요! 😊';

    const resultCheer = pct >= 100 ? 'perfect' : pct >= 70 ? 'good' : pct >= 50 ? 'pass' : 'poor';

    // 기존 XP 대신 게이미피케이션 시스템 사용
    _onQuizComplete(correct, total);
    updateStreak();
    checkLevelUnlock();
    saveToStorage();
    updateHeader();

    document.getElementById('quiz-game').style.display   = 'none';
    document.getElementById('quiz-header').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';

    // 등급 배지
    const gradeEl = document.getElementById('qr-grade-badge');
    if (gradeEl) { gradeEl.textContent = grade; gradeEl.style.background = gradeColor; gradeEl.style.boxShadow = `0 6px 24px ${gradeColor}88`; }

    // 타이틀
    document.getElementById('qr-title').textContent = title;

    // 별점 애니메이션
    const starsEl = document.getElementById('qr-stars');
    if (starsEl) {
      starsEl.querySelectorAll('.qr-star').forEach((star, i) => {
        star.classList.remove('filled', 'pop');
        if (i < stars) {
          setTimeout(() => { star.classList.add('filled', 'pop'); }, 500 + i * 220);
        }
      });
    }

    // 원형 진행바
    const ringFill = document.getElementById('qr-ring-fill');
    if (ringFill) {
      const circ = 2 * Math.PI * 52;
      const colorMap = { S: '#f59e0b', A: '#10b981', B: '#3b82f6', C: '#8b5cf6', D: '#ef4444' };
      ringFill.style.stroke = colorMap[grade] || '#10b981';
      ringFill.style.strokeDasharray  = circ;
      ringFill.style.strokeDashoffset = circ;
      setTimeout(() => {
        ringFill.style.transition = 'stroke-dashoffset 1.2s ease-out';
        ringFill.style.strokeDashoffset = circ * (1 - pct / 100);
      }, 150);
    }

    // 퍼센트 카운터 애니메이션
    const pctEl = document.getElementById('qr-pct');
    if (pctEl) {
      let disp = 0;
      const iv = setInterval(() => {
        disp = Math.min(disp + Math.ceil(pct / 40), pct);
        pctEl.textContent = disp + '%';
        if (disp >= pct) clearInterval(iv);
      }, 30);
    }
    document.getElementById('qr-score').textContent = `${correct} / ${total}`;

    // 통계
    document.getElementById('qr-stat-correct').textContent = correct;
    document.getElementById('qr-stat-wrong').textContent   = wrong;
    document.getElementById('qr-stat-maxstreak').textContent = maxStreak;

    // XP 바 애니메이션
    document.getElementById('qr-xp').textContent = '+' + xpGained + ' XP';
    const xpBar = document.getElementById('qr-xp-bar-fill');
    if (xpBar) {
      xpBar.style.width = '0%';
      setTimeout(() => { xpBar.style.width = Math.min(100, (xpGained / 200) * 100) + '%'; }, 700);
    }

    // 틀린 글자
    const wrongDiv = document.getElementById('qr-wrong-list');
    if (state.quizWrongList.length > 0) {
      const chars = [...new Set(state.quizWrongList)];
      wrongDiv.innerHTML = `
        <div class="qr-wrong-hdr">복습이 필요해요 (${chars.length}개)</div>
        <div class="qr-wrong-chars">
          ${chars.map(k => {
            const info = KANA_MAP[k];
            return `<div class="qr-wrong-char" onclick="App.playAudio('${k}')">
              <div class="qr-wc-kana">${k}</div>
              <div class="qr-wc-reading">${info ? info.korean : ''}</div>
            </div>`;
          }).join('')}
        </div>`;
      wrongDiv.style.display = 'block';
    } else {
      wrongDiv.innerHTML = '';
      wrongDiv.style.display = 'none';
    }

    // 결과 confetti (고득점)
    if (pct >= 70) _triggerQrConfetti(pct);

    setTimeout(() => {
      speakCheer(resultCheer);
      // 성우 응원 완료 후 배경음 키우기 (~3초)
      setTimeout(() => {
        if (_ambAudio) _ambFadeTo(_ambAudio, _ambTargetVol(), 1500);
      }, 3000);
    }, 800);
  }

  function _triggerQrConfetti(pct) {
    const el = document.getElementById('qr-confetti');
    if (!el) return;
    el.innerHTML = '';
    const colors = ['#f59e0b','#10b981','#3b82f6','#e63946','#8b5cf6','#fbbf24','#34d399'];
    const count  = pct >= 90 ? 60 : 35;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'qr-confetti-piece';
      p.style.left = Math.random() * 100 + '%';
      p.style.top  = '-10px';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.width  = (6 + Math.random() * 8) + 'px';
      p.style.height = (6 + Math.random() * 8) + 'px';
      p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      p.style.animationDuration  = (2.5 + Math.random() * 2) + 's';
      p.style.animationDelay     = (Math.random() * 1.2) + 's';
      el.appendChild(p);
    }
  }

  function calculateXP(correct, total) {
    const pct = correct / total;
    let base = correct * 10;
    if (pct >= 1.0) base += 50;
    else if (pct >= 0.9) base += 30;
    else if (pct >= 0.7) base += 15;
    return base;
  }

  // ─── 필기 ───
  function setupWriteView() {
    const typeSelect = document.getElementById('write-type-select');
    state.writeType = typeSelect.value;
    loadWriteChars();

    typeSelect.onchange = () => {
      state.writeType = typeSelect.value;
      state.writeIndex = 0;
      loadWriteChars();
    };

    setupCanvas();
    setupWriteControls();
  }

  function loadWriteChars() {
    const type = state.writeType;
    // 가타가나 탁음+반탁음을 같이 표시
    let realType = type;
    if (type === 'katakana_dakuten') {
      state.writeChars = Object.entries(KANA_MAP)
        .filter(([k,v]) => v.type === 'katakana_dakuten' || v.type === 'katakana_handakuten')
        .map(([k,v]) => ({ kana: k, ...v }));
    } else {
      state.writeChars = Object.entries(KANA_MAP)
        .filter(([k,v]) => v.type === realType)
        .map(([k,v]) => ({ kana: k, ...v }));
    }

    renderWriteList();
    if (state.writeChars.length > 0) {
      state.writeIndex = Math.min(state.writeIndex, state.writeChars.length - 1);
      updateWriteChar();
    }
  }

  function renderWriteList() {
    const list = document.getElementById('write-char-list');
    list.innerHTML = '';
    state.writeChars.forEach((char, i) => {
      const el = document.createElement('div');
      el.className = 'write-char-item' + (i === state.writeIndex ? ' active' : '');
      el.innerHTML = `
        <span class="wci-list-kana">${char.kana}</span>
        <span class="wci-list-info">
          <span class="wci-list-kor">${char.korean}</span>
        </span>`;
      el.addEventListener('click', () => {
        state.writeIndex = i;
        document.querySelectorAll('.write-char-item').forEach((el, j) => {
          el.classList.toggle('active', j === i);
        });
        updateWriteChar();
        clearCanvas();
      });
      list.appendChild(el);
    });
  }

  function updateWriteChar() {
    const char = state.writeChars[state.writeIndex];
    if (!char) return;

    document.getElementById('wci-kana').textContent = char.kana;
    document.getElementById('wci-korean').textContent = char.korean;

    // 시험 모드: 글자 숨기기
    const kanaEl = document.getElementById('wci-kana');
    if (state.writeExamMode) {
      kanaEl.style.visibility = 'hidden';
      document.getElementById('exam-check-btn').style.display = 'inline-block';
      document.getElementById('exam-result').style.display = 'none';
      // 오버레이 강제 숨기기
      state.overlayOn = false;
      document.getElementById('overlay-btn').classList.remove('on');
      document.getElementById('overlay-btn').textContent = '👁 글자 표시';
      updateCanvasOverlay('');
    } else {
      kanaEl.style.visibility = 'visible';
      updateCanvasOverlay(char.kana);
    }
    // 획순 SVG 패널 항상 갱신
    _updateStrokePanel(char.kana);
  }

  // ─── 획순 SVG 애니메이션 ───

  let _strokeAnimTimer = null;

  /** 획순 패널 갱신 — 글자 변경 시 호출 */
  function _updateStrokePanel(kana) {
    const panel = document.getElementById('stroke-anim-panel');
    const countEl = document.getElementById('stroke-anim-count');
    const playBtn = document.getElementById('stroke-anim-play');
    const fallback = document.getElementById('stroke-anim-fallback');
    const hintEl = document.getElementById('stroke-hint');
    if (!panel) return;

    // 이전 애니메이션 중지
    if (_strokeAnimTimer) { clearTimeout(_strokeAnimTimer); _strokeAnimTimer = null; }

    const data = getStrokeData(kana);
    if (data) {
      fallback.style.display = 'none';
      countEl.textContent = data.strokes.length + '획';
      playBtn.disabled = false;
      playBtn.textContent = '▶ 재생';
      _renderStrokesFull(kana); // 전체 획 흐리게 미리보기
    } else {
      // SVG 데이터 없음 → 텍스트 힌트 폴백
      fallback.style.display = 'block';
      if (hintEl) hintEl.textContent = getStrokeHint(kana);
      countEl.textContent = '';
      playBtn.disabled = true;
      playBtn.textContent = '▶ 재생';
      _clearStrokeSvg();
    }

    // 재생 버튼 바인딩 (중복 방지)
    if (!playBtn._saBound) {
      playBtn._saBound = true;
      playBtn.addEventListener('click', () => {
        const cur = state.writeChars[state.writeIndex];
        if (cur) _playStrokeAnim(cur.kana);
      });
    }
  }

  /** SVG 내용 초기화 */
  function _clearStrokeSvg() {
    const sg = document.getElementById('stroke-anim-strokes');
    const lg = document.getElementById('stroke-anim-labels');
    if (sg) sg.innerHTML = '';
    if (lg) lg.innerHTML = '';
  }

  /** 전체 획 흐리게 정적 미리보기 */
  function _renderStrokesFull(kana) {
    const data = getStrokeData(kana);
    if (!data) return;
    _clearStrokeSvg();
    const sg = document.getElementById('stroke-anim-strokes');
    const lg = document.getElementById('stroke-anim-labels');
    if (!sg || !lg) return;

    const svgNS = 'http://www.w3.org/2000/svg';
    data.strokes.forEach((d, i) => {
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', _scaleStrokePath(d));
      path.setAttribute('class', 'stroke-done');
      sg.appendChild(path);

      // 시작점 라벨
      const start = _getPathStart(d);
      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', start.x);
      text.setAttribute('y', start.y - 3);
      text.setAttribute('class', 'stroke-num');
      text.textContent = i + 1;
      lg.appendChild(text);
    });
  }

  /**
   * 획순 순차 애니메이션 재생
   * 각 획을 0.6s 간격으로 순서대로 그림
   */
  function _playStrokeAnim(kana) {
    const data = getStrokeData(kana);
    if (!data) return;
    if (_strokeAnimTimer) { clearTimeout(_strokeAnimTimer); _strokeAnimTimer = null; }

    const playBtn = document.getElementById('stroke-anim-play');
    if (playBtn) { playBtn.disabled = true; playBtn.textContent = '재생 중…'; }

    const svgNS = 'http://www.w3.org/2000/svg';
    _clearStrokeSvg();
    const sg = document.getElementById('stroke-anim-strokes');
    const lg = document.getElementById('stroke-anim-labels');
    if (!sg || !lg) return;

    // 완료된 획들을 미리 흐리게 그려두기
    const donePaths = data.strokes.map((d, i) => {
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', _scaleStrokePath(d));
      path.setAttribute('class', 'stroke-done');
      path.style.opacity = '0';
      sg.appendChild(path);
      return path;
    });

    let idx = 0;
    function animateNext() {
      if (idx >= data.strokes.length) {
        // 완료: 모든 획 표시, 버튼 복원
        donePaths.forEach(p => { p.style.opacity = '1'; });
        if (playBtn) { playBtn.disabled = false; playBtn.textContent = '▶ 다시보기'; }
        return;
      }

      // 이전 획들 흐리게 표시
      for (let j = 0; j < idx; j++) donePaths[j].style.opacity = '1';

      // 현재 획 애니메이션
      const activePath = document.createElementNS(svgNS, 'path');
      activePath.setAttribute('d', _scaleStrokePath(data.strokes[idx]));
      activePath.setAttribute('class', 'stroke-active');
      sg.appendChild(activePath);

      // 시작점 빨간 점
      const start = _getPathStart(data.strokes[idx]);
      const dot = document.createElementNS(svgNS, 'circle');
      dot.setAttribute('cx', start.x);
      dot.setAttribute('cy', start.y);
      dot.setAttribute('r', '3.5');
      dot.setAttribute('class', 'stroke-dot');
      lg.appendChild(dot);

      // 획 번호
      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', start.x + 5);
      text.setAttribute('y', start.y - 4);
      text.setAttribute('class', 'stroke-num');
      text.textContent = idx + 1;
      lg.appendChild(text);

      idx++;
      _strokeAnimTimer = setTimeout(() => {
        // active → done으로 교체
        activePath.remove();
        dot.remove();
        text.remove();
        animateNext();
      }, 750);
    }

    animateNext();
  }

  /**
   * 경로 d 문자열의 시작 좌표 추출 (M x,y 또는 M x y)
   */
  function _getPathStart(d) {
    const m = d.match(/M\s*([\d.]+)[, ]([\d.]+)/);
    if (!m) return { x: 10, y: 10 };
    // 109 좌표계에서 그대로 사용 (viewBox="0 0 109 109")
    return { x: parseFloat(m[1]), y: parseFloat(m[2]) };
  }

  /**
   * stroke-data의 좌표는 이미 0-109 범위이므로 그대로 반환
   * (향후 다른 좌표계 데이터 지원 시 여기서 스케일 변환)
   */
  function _scaleStrokePath(d) {
    return d;
  }

  function getStrokeHint(kana) {
    const hints = {
      'あ': '가로획 → 세로획 → 삐침',
      'い': '왼쪽 짧은 획 → 오른쪽 긴 획',
      'う': '가로획 → 둥근 획',
      'か': '가로획 → 세로획 → 삐침',
      'き': '두 가로획 → 세로획 → 오른쪽 획',
      'く': '삐침 하나',
      'さ': '가로획 → 아래 두 획',
      'し': '아래로 내려가다 오른쪽으로 말기',
      'す': '위 가로획 → 아래 원형 획',
      'た': '가로획 → 세로획 → 오른쪽 2획',
      'な': '두 가로획 → 세로획 → 둥근 획',
      'に': '두 세로획 → 연결획',
      'は': '세 획으로 구성',
      'ま': '두 가로획 → 아래 원형 획',
      'や': '세 획으로 구성',
      'ら': '短い横画 → 둥근 획',
      'ア': '가로획 → 아래 두 획',
      'カ': '가로획 → 세로획 → 오른쪽 삐침',
    };
    return hints[kana] || '위→아래, 왼쪽→오른쪽 순서로 쓰세요';
  }

  function setupCanvas() {
    const canvas = document.getElementById('write-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#2d3748';

    drawGrid(ctx, canvas.width, canvas.height);

    // 마우스 이벤트
    canvas.addEventListener('mousedown', (e) => {
      state.isDrawing = true;
      const pos = getCanvasPos(canvas, e);
      state.lastX = pos.x;
      state.lastY = pos.y;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    });
    canvas.addEventListener('mousemove', (e) => {
      if (!state.isDrawing) return;
      const pos = getCanvasPos(canvas, e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      state.lastX = pos.x;
      state.lastY = pos.y;
    });
    canvas.addEventListener('mouseup', () => { state.isDrawing = false; });
    canvas.addEventListener('mouseleave', () => { state.isDrawing = false; });

    // 터치 이벤트
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      state.isDrawing = true;
      const pos = getCanvasPos(canvas, e.touches[0]);
      state.lastX = pos.x;
      state.lastY = pos.y;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    }, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!state.isDrawing) return;
      const pos = getCanvasPos(canvas, e.touches[0]);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      state.lastX = pos.x;
      state.lastY = pos.y;
    }, { passive: false });
    canvas.addEventListener('touchend', () => { state.isDrawing = false; });
  }

  function drawGrid(ctx, w, h) {
    ctx.save();
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    // 가로 중앙선
    ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
    // 세로 중앙선
    ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.stroke();
    ctx.restore();
  }

  function updateCanvasOverlay(kana) {
    const wrapper = document.querySelector('.canvas-wrapper');
    let overlay = wrapper.querySelector('.canvas-overlay-char');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'canvas-overlay-char';
      wrapper.appendChild(overlay);
    }
    overlay.textContent = kana;
    overlay.style.opacity = state.overlayOn ? '1' : '0';
    // 요음(きゃ 등 2자 복합) 글자는 폰트 크기 축소
    if (kana && kana.length > 1) {
      overlay.classList.add('compound');
    } else {
      overlay.classList.remove('compound');
    }
  }

  function getCanvasPos(canvas, e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function clearCanvas() {
    const canvas = document.getElementById('write-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height);
  }

  // ─── 필기 시험 타이머 ───
  const WRITE_EXAM_SECS = 30; // 글자당 제한 시간
  function startWriteExamTimer() {
    clearInterval(state.writeExamTimerInterval);
    let remaining = WRITE_EXAM_SECS;
    const barEl  = document.getElementById('exam-timer-bar');
    const fillEl = document.getElementById('exam-timer-fill');
    const textEl = document.getElementById('exam-timer-text');
    if (!barEl) return;
    barEl.style.display = 'flex';
    fillEl.style.width  = '100%';
    fillEl.style.background = 'var(--green, #38a169)';
    textEl.textContent = remaining;

    state.writeExamTimerInterval = setInterval(() => {
      remaining--;
      const pct = Math.max(0, (remaining / WRITE_EXAM_SECS) * 100);
      fillEl.style.width = pct + '%';
      textEl.textContent = remaining;
      // 색 변화: 50% 노랑, 25% 빨강
      if (pct <= 25) fillEl.style.background = 'var(--red, #e53e3e)';
      else if (pct <= 50) fillEl.style.background = '#d69e2e';
      else fillEl.style.background = 'var(--green, #38a169)';

      if (remaining <= 0) {
        clearInterval(state.writeExamTimerInterval);
        // 시간 초과 → 자동 정답 확인
        showToast('⏰ 시간 초과!');
        writeExamCheck();
      }
    }, 1000);
  }

  function stopWriteExamTimer() {
    clearInterval(state.writeExamTimerInterval);
    const barEl = document.getElementById('exam-timer-bar');
    if (barEl) barEl.style.display = 'none';
  }

  function toggleWriteExam() {
    state.writeExamMode = !state.writeExamMode;
    state.writeExamScore = { ok: 0, fail: 0 };
    const btn = document.getElementById('exam-mode-btn');
    btn.classList.toggle('on', state.writeExamMode);
    btn.textContent = state.writeExamMode ? '🎯 시험 중' : '🎯 시험 모드';

    if (state.writeExamMode) {
      // 시험 시작: 글자 숨기고 정답확인 버튼 표시
      document.getElementById('wci-kana').style.visibility = 'hidden';
      document.getElementById('exam-check-btn').style.display = 'inline-block';
      document.getElementById('exam-result').style.display = 'none';
      // 오버레이 끄기
      state.overlayOn = false;
      document.getElementById('overlay-btn').classList.remove('on');
      document.getElementById('overlay-btn').textContent = '👁 글자 표시';
      updateCanvasOverlay('');
      // 타이머 시작
      startWriteExamTimer();
    } else {
      // 시험 종료: 원상복귀
      stopWriteExamTimer();
      document.getElementById('wci-kana').style.visibility = 'visible';
      document.getElementById('exam-check-btn').style.display = 'none';
      document.getElementById('exam-result').style.display = 'none';
      const char = state.writeChars[state.writeIndex];
      if (char) updateCanvasOverlay(char.kana);
    }
    clearCanvas();
  }

  function writeExamCheck() {
    const char = state.writeChars[state.writeIndex];
    if (!char) return;
    stopWriteExamTimer(); // 정답 확인 시 타이머 정지
    // 정답(글자) 드러내기
    document.getElementById('wci-kana').style.visibility = 'visible';
    // 오버레이 가이드 표시
    state.overlayOn = true;
    document.getElementById('overlay-btn').classList.add('on');
    document.getElementById('overlay-btn').textContent = '👁 글자 숨기기';
    updateCanvasOverlay(char.kana);
    // 정답 확인 버튼 숨기고 평가 버튼 표시
    document.getElementById('exam-check-btn').style.display = 'none';
    const total = state.writeExamScore.ok + state.writeExamScore.fail;
    const remaining = state.writeChars.length - total;
    document.getElementById('exam-score-text').textContent =
      `${state.writeExamScore.ok}✅  ${state.writeExamScore.fail}❌  남은 글자: ${remaining}`;
    document.getElementById('exam-result').style.display = 'flex';
  }

  function writeExamResult(ok) {
    if (ok) state.writeExamScore.ok++;
    else state.writeExamScore.fail++;
    _onWritePractice();

    if (state.writeIndex < state.writeChars.length - 1) {
      state.writeIndex++;
      document.querySelectorAll('.write-char-item').forEach((el, j) => {
        el.classList.toggle('active', j === state.writeIndex);
      });
      updateWriteChar();
      clearCanvas();
      // 다음 글자 타이머 재시작
      document.getElementById('wci-kana').style.visibility = 'hidden';
      document.getElementById('exam-check-btn').style.display = 'inline-block';
      document.getElementById('exam-result').style.display = 'none';
      startWriteExamTimer();
    } else {
      const total = state.writeExamScore.ok + state.writeExamScore.fail;
      const pct = total > 0 ? Math.round(state.writeExamScore.ok / total * 100) : 0;
      showToast(`시험 완료! 정답 ${state.writeExamScore.ok}/${total} (${pct}%) 🎉`);
      toggleWriteExam();
    }
  }

  function startAllBrowse() {
    const allChars = [];
    LEVELS.forEach(level => {
      if (state.unlockedLevels.includes(level.id)) {
        _getLevelChars(level.id).forEach(ch => {
          if (!allChars.find(c => c.kana === ch.kana)) allChars.push(ch);
        });
      }
    });
    if (allChars.length === 0) {
      showToast('먼저 레벨을 해금하세요!');
      return;
    }
    state.learnChars = allChars;
    state.learnLevelId = 0;
    state.browseRandom = false;

    showView('learn');
    document.getElementById('learn-level-name').textContent = '전체 일람';
    document.getElementById('learn-level-title').textContent = `해금된 글자 ${allChars.length}자`;
    document.getElementById('learn-card-num').textContent = '';

    const modeSel = document.getElementById('learn-mode-selector');
    if (modeSel) modeSel.style.display = 'none';
    document.getElementById('flashcard-area').style.display = 'none';
    document.getElementById('browse-area').style.display = 'block';
    state.learnMode = 'browse';
    renderBrowse();
  }

  function setupWriteControls() {
    document.getElementById('overlay-btn').onclick = () => {
      state.overlayOn = !state.overlayOn;
      const btn = document.getElementById('overlay-btn');
      btn.classList.toggle('on', state.overlayOn);
      btn.textContent = state.overlayOn ? '👁 글자 숨기기' : '👁 글자 표시';
      const char = state.writeChars[state.writeIndex];
      if (char) updateCanvasOverlay(char.kana);
    };
    document.getElementById('clear-btn').onclick = clearCanvas;
    document.getElementById('write-prev').onclick = () => {
      if (state.writeIndex > 0) {
        state.writeIndex--;
        document.querySelectorAll('.write-char-item').forEach((el, j) => {
          el.classList.toggle('active', j === state.writeIndex);
        });
        updateWriteChar();
        clearCanvas();
      }
    };
    document.getElementById('write-next').onclick = () => {
      if (state.writeIndex < state.writeChars.length - 1) {
        state.writeIndex++;
        document.querySelectorAll('.write-char-item').forEach((el, j) => {
          el.classList.toggle('active', j === state.writeIndex);
        });
        updateWriteChar();
        clearCanvas();
      }
    };
    document.getElementById('wci-audio-btn').onclick = () => {
      const char = state.writeChars[state.writeIndex];
      if (char) playAudio(char.kana);
    };
    document.getElementById('exam-mode-btn').onclick = toggleWriteExam;
    document.getElementById('exam-check-btn').onclick = writeExamCheck;
  }

  // ─── 진도 ───
  function renderProgress() {
    // ── 탭 전환 로직 (최초 1회 바인딩) ──
    const progTabBar = document.querySelector('.prog-tabs');
    if (progTabBar && !progTabBar._tabsBound) {
      progTabBar._tabsBound = true;
      progTabBar.querySelectorAll('.prog-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          progTabBar.querySelectorAll('.prog-tab').forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.prog-tab-content').forEach(c => { c.style.display = 'none'; });
          tab.classList.add('active');
          const target = document.getElementById('prog-tab-' + tab.dataset.tab);
          if (target) target.style.display = 'block';
        });
      });
    }
    // 초기 탭 콘텐츠 표시 (첫 진입 시 활성 탭의 콘텐츠가 안 보이는 문제 수정)
    const activeProgTab = document.querySelector('.prog-tab.active');
    if (activeProgTab) {
      document.querySelectorAll('.prog-tab-content').forEach(c => { c.style.display = 'none'; });
      const activeContent = document.getElementById('prog-tab-' + activeProgTab.dataset.tab);
      if (activeContent) activeContent.style.display = 'block';
    }

    // 개요
    const allChars = Object.keys(KANA_MAP);
    const seen = allChars.filter(k => state.progress[k] && state.progress[k].seen > 0);
    const mastered = allChars.filter(k => isCharMastered(k));
    const totalCorrect = Object.values(state.progress).reduce((s, v) => s + (v.correct || 0), 0);
    const totalAttempt = Object.values(state.progress).reduce((s, v) => s + (v.correct || 0) + (v.incorrect || 0), 0);
    const accuracy = totalAttempt > 0 ? Math.round((totalCorrect / totalAttempt) * 100) : 0;

    document.getElementById('po-total').textContent = seen.length;
    document.getElementById('po-mastered').textContent = mastered.length;
    document.getElementById('po-accuracy').textContent = accuracy + '%';
    document.getElementById('po-xp').textContent = state.totalXP;

    // 레벨별
    const levelsDiv = document.getElementById('progress-levels');
    levelsDiv.innerHTML = '<h3 style="margin-bottom:12px">📋 레벨별 진도</h3>';
    LEVELS.forEach(level => {
      const isUnlocked = state.unlockedLevels.includes(level.id);
      const prog = getLevelProgress(level);

      const el = document.createElement('div');
      el.className = 'pl-level';
      el.innerHTML = `
        <div class="pll-header">
          <div>
            <div class="pll-title">${level.name}: ${level.title}</div>
            <div class="pll-sub">${level.subtitle}</div>
          </div>
          <div class="pll-pct">${isUnlocked ? prog + '%' : '🔒'}</div>
        </div>
        ${isUnlocked ? `
          <div class="pll-bar-bg"><div class="pll-bar-fill" style="width:${prog}%"></div></div>
          <div class="pll-chars">
            ${level.chars.map(k => {
              const p = state.progress[k];
              let cls = 'unseen';
              if (p && p.seen > 0) cls = isCharMastered(k) ? 'mastered' : 'learning';
              const info = KANA_MAP[k];
              return `<div class="pll-char ${cls}" title="${k}: ${info ? info.korean : ''}">${k}</div>`;
            }).join('')}
          </div>` : '<div style="color:#718096;font-size:12px">아직 잠금 상태입니다</div>'
        }`;
      levelsDiv.appendChild(el);
    });

    // ── 취약 가나 분석 대시보드 ──
    _renderWeakDashboard();

    // 초기화 버튼
    document.getElementById('reset-btn').onclick = () => {
      if (confirm('모든 진도를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        state.progress = {};
        state.totalXP = 0;
        state.streak = 0;
        state.unlockedLevels = [1];
        state.currentLevel = 1;
        state.vocabProgress = {};
        saveToStorage();
        updateHeader();
        renderProgress();
        showToast('진도가 초기화되었습니다.');
      }
    };

    // 단어 진도 표시
    renderVocabProgress();
  }

  // ─── 취약 가나 분석 대시보드 ───

  function _renderWeakDashboard() {
    const allKeys = Object.keys(KANA_MAP);
    const prog = state.progress;

    // ── 정확도 히트맵 ──
    const heatmap = document.getElementById('weak-heatmap');
    if (heatmap) {
      heatmap.innerHTML = allKeys.map(k => {
        const p = prog[k];
        const total = p ? (p.correct || 0) + (p.incorrect || 0) : 0;
        const acc = total > 0 ? Math.round((p.correct || 0) / total * 100) : -1;
        let cls, title;
        if (acc < 0)       { cls = 'whm-unseen';  title = `${k}: 미학습`; }
        else if (acc < 50) { cls = 'whm-low';     title = `${k}: ${acc}% (위험)`; }
        else if (acc < 80) { cls = 'whm-mid';     title = `${k}: ${acc}% (학습 중)`; }
        else if (acc < 95) { cls = 'whm-high';    title = `${k}: ${acc}% (양호)`; }
        else               { cls = 'whm-perfect'; title = `${k}: ${acc}% (완벽)`; }
        return `<div class="whm-cell ${cls}" title="${title}" onclick="App.playAudio('${k}')">${k}</div>`;
      }).join('');
    }

    // ── SRS 현황 요약 ──
    const srsSummary = getSRSSummary(allKeys, prog);
    const srsEl = document.getElementById('weak-srs-summary');
    if (srsEl) {
      srsEl.innerHTML = `
        <div class="wss-card wss-due">
          <div class="wss-num">${srsSummary.due}</div>
          <div class="wss-label">오늘 복습</div>
        </div>
        <div class="wss-card wss-new">
          <div class="wss-num">${srsSummary.newCards}</div>
          <div class="wss-label">신규</div>
        </div>
        <div class="wss-card wss-learn">
          <div class="wss-num">${srsSummary.learning}</div>
          <div class="wss-label">학습 중</div>
        </div>
        <div class="wss-card wss-master">
          <div class="wss-num">${srsSummary.mastered}</div>
          <div class="wss-label">마스터</div>
        </div>`;
    }

    // ── 약점 카드 (오답률 상위 20) ──
    const weakChars = allKeys
      .filter(k => prog[k] && (prog[k].incorrect || 0) > 0)
      .map(k => {
        const p = prog[k];
        const total = (p.correct || 0) + (p.incorrect || 0);
        const acc = total > 0 ? Math.round(p.correct / total * 100) : 0;
        return { k, p, acc, total };
      })
      .sort((a, b) => a.acc - b.acc)  // 정확도 낮은 순
      .slice(0, 20);

    const weakGrid = document.getElementById('weak-chars-grid');
    if (weakGrid) {
      if (weakChars.length === 0) {
        weakGrid.innerHTML = '<p class="no-weak">약점 글자가 없어요! 퀴즈를 더 풀어보세요.</p>';
      } else {
        weakGrid.innerHTML = weakChars.map(({ k, p, acc }) => {
          const info = KANA_MAP[k];
          const due = isDue(p) ? ' 🔔' : '';
          return `<div class="weak-char-card" onclick="App.playAudio('${k}')" title="${k}: ${acc}% 정확도">
            <span class="wcc-kana">${k}</span>
            <span class="wcc-romaji">${info ? info.romaji || '' : ''}${due}</span>
            <span class="wcc-acc">${acc}% (${p.incorrect}틀)</span>
          </div>`;
        }).join('');
      }
    }

    // ── 약점만 퀴즈 버튼 ──
    const quizBtn = document.getElementById('weak-dash-quiz-btn');
    if (quizBtn && !quizBtn._bound) {
      quizBtn._bound = true;
      quizBtn.addEventListener('click', () => {
        const weak = allKeys.filter(k => {
          const p = prog[k];
          if (!p) return false;
          const total = (p.correct || 0) + (p.incorrect || 0);
          return total > 0 && Math.round(p.correct / total * 100) < 80;
        });
        if (weak.length === 0) {
          showToast('약점 글자가 없습니다! 퀴즈를 더 풀어보세요.');
          return;
        }
        const chars = weak.map(k => ({ kana: k, ...KANA_MAP[k] }));
        startQuizWithChars(chars, 'kanaToReading', state.prefs.lang || 'korean');
      });
    }
  }

  // ─── 설정 ───
  function setupSettings() {
    const btn = document.getElementById('settings-btn');
    const modal = document.getElementById('settings-modal');
    const closeBtn = document.getElementById('settings-close');

    // 탭 전환
    document.querySelectorAll('.stab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.stab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const target = document.getElementById('stab-' + tab.dataset.tab);
        if (target) target.classList.add('active');
      });
    });

    btn.onclick = () => {
      modal.style.display = 'flex';
      loadPrefsUI();
    };
    closeBtn.onclick = () => { modal.style.display = 'none'; savePrefs(); };
    modal.addEventListener('click', (e) => {
      if (e.target === modal) { modal.style.display = 'none'; savePrefs(); }
    });
  }

  function applyVisibilityPrefs() {
    document.body.classList.toggle('hide-word-ex', !state.prefs.showWordEx);
    document.body.classList.toggle('hide-sent-ex', !state.prefs.showSentEx);
  }

  function loadPrefsUI() {
    // autoplay/autonext는 항상 true로 고정 (설정 UI에서 제거)
    state.prefs.autoplay = true;
    state.prefs.autonext = true;

    // 퀴즈 설정 로드
    populateQuizLevelSelect();
    const qtypeEl = document.querySelector(`input[name="qtype"][value="${state.prefs.quizType || 'kanaToReading'}"]`);
    if (qtypeEl) qtypeEl.checked = true;
    const qcountEl = document.querySelector(`input[name="qcount"][value="${state.prefs.quizCount || '10'}"]`);
    if (qcountEl) qcountEl.checked = true;
    const qlangEl = document.querySelector(`input[name="qlang"][value="${state.prefs.quizLang || 'korean'}"]`);
    if (qlangEl) qlangEl.checked = true;
    const qlvSel = document.getElementById('quiz-level-select');
    if (qlvSel && state.prefs.quizLevel) qlvSel.value = state.prefs.quizLevel;

    // radio 변경 시 즉시 prefs 저장
    document.querySelectorAll('input[name="qtype"]').forEach(r => {
      r.onchange = () => { state.prefs.quizType = r.value; saveToStorage(); };
    });
    document.querySelectorAll('input[name="qcount"]').forEach(r => {
      r.onchange = () => { state.prefs.quizCount = r.value; saveToStorage(); };
    });
    document.querySelectorAll('input[name="qlang"]').forEach(r => {
      r.onchange = () => { state.prefs.quizLang = r.value; saveToStorage(); };
    });

    // 퀴즈 응원
    const cheerEl = document.getElementById('pref-quiz-cheer');
    if (cheerEl) {
      cheerEl.checked = state.prefs.quizCheer !== false;
      cheerEl.onchange = () => { state.prefs.quizCheer = cheerEl.checked; saveToStorage(); };
    }

    // 롤플레이 이름 설정
    const fnEl = document.getElementById('pref-female-name');
    const mnEl = document.getElementById('pref-male-name');
    if (fnEl) fnEl.value = state.prefs.femaleName || 'ジュヨン';
    if (mnEl) mnEl.value = state.prefs.maleName   || 'スンヒョン';

    // 퀴즈 제한 시간
    const qcdEl = document.getElementById('pref-quiz-countdown');
    if (qcdEl) qcdEl.value = String(state.prefs.quizCountdown !== undefined ? state.prefs.quizCountdown : 5);

    // 배경음 설정 — 토글 + 볼륨 슬라이더
    const ambDlgEl  = document.getElementById('pref-ambient-dialogue');
    const ambQzEl   = document.getElementById('pref-ambient-quiz');
    const ambVolEl  = document.getElementById('pref-ambient-volume');
    const ambVolLbl = document.getElementById('pref-ambient-volume-label');

    // 초기값 반영
    if (ambDlgEl) ambDlgEl.checked = (state.prefs.ambientDialogue === 'on');
    if (ambQzEl)  ambQzEl.checked  = (state.prefs.ambientQuiz === 'on');
    const initVol = Math.round((state.prefs.ambientVolume ?? 0.18) * 100);
    if (ambVolEl)  ambVolEl.value  = Math.min(40, initVol);
    if (ambVolLbl) ambVolLbl.textContent = Math.min(40, initVol) + '%';

    // 대화 배경음 토글
    if (ambDlgEl) {
      ambDlgEl.onchange = () => {
        state.prefs.ambientDialogue = ambDlgEl.checked ? 'on' : 'none';
        saveToStorage();
        stopAmbient(0.3);
      };
    }
    // 퀴즈 배경음 토글
    if (ambQzEl) {
      ambQzEl.onchange = () => {
        state.prefs.ambientQuiz = ambQzEl.checked ? 'on' : 'none';
        saveToStorage();
        stopAmbient(0.3);
      };
    }
    // 볼륨 슬라이더
    if (ambVolEl) {
      ambVolEl.oninput = () => {
        const v = parseInt(ambVolEl.value) / 100;
        state.prefs.ambientVolume = v;
        if (ambVolLbl) ambVolLbl.textContent = ambVolEl.value + '%';
        // 현재 재생 중이면 즉시 반영
        if (_ambAudio && !_ambDucked) _ambAudio.volume = v;
        saveToStorage();
      };
    }

    // 표시 설정 토글
    const swEl = document.getElementById('pref-show-word-ex');
    const ssEl = document.getElementById('pref-show-sent-ex');
    if (swEl) swEl.checked = state.prefs.showWordEx !== undefined ? state.prefs.showWordEx : true;
    if (ssEl) ssEl.checked = state.prefs.showSentEx !== undefined ? state.prefs.showSentEx : true;
    // 자동 읽고 넘기기 복원
    const aaEl2 = document.getElementById('pref-auto-advance');
    const aadEl2 = document.getElementById('pref-auto-advance-delay');
    const aadRow2 = document.getElementById('pref-auto-advance-delay-row');
    if (aaEl2) { aaEl2.checked = !!state.prefs.autoAdvance; }
    if (aadEl2) { aadEl2.value = state.prefs.autoAdvanceDelay || 3; }
    if (aadRow2) aadRow2.style.display = !!state.prefs.autoAdvance ? 'flex' : 'none';
    if (aaEl2) aaEl2.addEventListener('change', () => {
      if (aadRow2) aadRow2.style.display = aaEl2.checked ? 'flex' : 'none';
    }, { once: false });

    // 음성 목록이 로드된 후 select 값 설정
    if (voicesCached) populateVoiceSelects();
    restoreVoiceSelects();

    // ══════════════════════════════════════════════════════
    //  TTS 엔진 통합 설정 — Edge TTS > VOICEVOX > Web TTS
    // ══════════════════════════════════════════════════════

    const ttsGroup    = document.getElementById('tts-engine-group');
    const edgeCard    = document.getElementById('tts-card-edge');
    const vvCard      = document.getElementById('tts-card-voicevox');
    const webCard     = document.getElementById('tts-card-web');
    const edgeRadio   = document.getElementById('pref-use-edgetts');    // radio
    const vvRadio     = document.getElementById('pref-use-voicevox');   // radio
    const webRadio    = document.getElementById('pref-use-webtts');
    const edgeStatus  = document.getElementById('edgetts-status');
    const vvStatus    = document.getElementById('voicevox-status');
    const edgeRows    = document.getElementById('edgetts-server-rows');
    const vvRows      = document.getElementById('voicevox-speaker-rows');

    // 현재 활성 엔진 판별 → 라디오 초기값 설정
    // 저장된 엔진이 없으면 VOICEVOX 우선 표시 (연결 결과에 따라 실제 활성화)
    function _getInitialEngine() {
      if (state.prefs.useEdgeTTS)  return 'edge';
      if (state.prefs.useVoicevox) return 'voicevox';
      if (voicevoxAvailable)       return 'voicevox';  // 시작 시 자동 연결 성공
      return 'web';
    }

    // 연결 중 그룹 전체 잠금 / 해제
    function _lockTTSGroup(lock) {
      if (!ttsGroup) return;
      ttsGroup.querySelectorAll('.tts-option-card').forEach(c => {
        c.classList.toggle('tts-connecting', lock);
      });
      // 잠금 시 라디오도 비활성
      [edgeRadio, vvRadio, webRadio].forEach(r => { if (r) r.disabled = lock; });
    }

    // 카드 외관 갱신 (active / error)
    function _updateCardStyle(engine, success) {
      const map = { edge: edgeCard, voicevox: vvCard, web: webCard };
      Object.entries(map).forEach(([e, card]) => {
        if (!card) return;
        card.classList.remove('tts-active', 'tts-error');
        if (e === engine) card.classList.add(success ? 'tts-active' : 'tts-error');
      });
    }

    // 화자 패널 가시성 — 활성 엔진에 맞는 것만 표시
    function _updateSpeakerPanels(engine) {
      // Edge TTS 화자 행
      if (edgeRows)   edgeRows.style.display   = (engine === 'edge') ? '' : 'none';
      // VOICEVOX 화자 목록은 연결 성공 시에만 표시
      if (vvRows)     vvRows.style.display     = (engine === 'voicevox' && voicevoxAvailable) ? '' : 'none';
      // Web TTS 화자: VOICEVOX 또는 Edge 선택 시 숨김 (Web TTS가 활성일 때만 표시)
      const webSettingsEl = document.getElementById('webtts-settings');
      if (webSettingsEl) webSettingsEl.style.display = (engine === 'web') ? '' : 'none';
    }

    // VOICEVOX 재시도 영역 표시/숨김 (showFallback=true 시 "다음 옵션으로?" 섹션도 표시)
    function _showVvRetry(show, msg, showFallback) {
      const area       = document.getElementById('vv-retry-area');
      const msgEl      = document.getElementById('vv-retry-msg');
      const reasonEl   = document.getElementById('vv-error-reason');
      const fallbackEl = document.getElementById('vv-fallback-prompt');
      if (!area) return;
      if (show) {
        if (msgEl && msg) msgEl.textContent = msg;
        // 오류 원인 표시
        if (reasonEl) {
          if (_lastVvError) {
            reasonEl.textContent = '📋 원인: ' + _lastVvError;
            reasonEl.style.display = 'block';
          } else {
            reasonEl.style.display = 'none';
          }
        }
        // 폴백 버튼 표시 여부
        if (fallbackEl) fallbackEl.style.display = showFallback ? 'block' : 'none';
        area.style.display = 'block';
      } else {
        area.style.display = 'none';
      }
    }

    // Edge TTS 활성화 시도
    async function _tryActivateEdge() {
      if (typeof EdgeTTSModule === 'undefined') return false;
      if (edgeStatus) { edgeStatus.className = 'tts-status-chip tts-status-connecting'; edgeStatus.textContent = '점검 중...'; }
      EdgeTTSModule.configure({
        url:    state.prefs.edgeTTSUrl,
        voice1: state.prefs.edgeTTSVoice1,
        voice2: state.prefs.edgeTTSVoice2,
      });
      const ok = await EdgeTTSModule.checkServer();
      if (edgeStatus) {
        edgeStatus.className = ok ? 'tts-status-chip tts-status-success' : 'tts-status-chip tts-status-fail';
        edgeStatus.textContent = ok ? '✅ 연결됨' : '❌ 서버 없음';
      }
      return ok;
    }

    // VOICEVOX 활성화 시도 — 성공 시 화자 목록 즉시 갱신
    // retryCount: 내부 재시도 누적 횟수 (2회 이상 실패 시 폴백 제안)
    let _vvRetryCount = 0;
    async function _tryActivateVoicevox() {
      _showVvRetry(false);
      if (vvStatus) { vvStatus.className = 'tts-status-chip tts-status-connecting'; vvStatus.textContent = '연결 시도 중...'; }
      const ok = await checkVoicevox();
      if (ok) {
        _vvRetryCount = 0;
        populateVoicevoxSelects();
        if (vvRows) vvRows.style.display = '';
        if (vvStatus) {
          vvStatus.className = 'tts-status-chip tts-status-success';
          vvStatus.textContent = `✅ ${voicevoxSpeakers.length}개 화자 연결됨`;
        }
        _showVvRetry(false);
      } else {
        _vvRetryCount++;
        if (vvStatus) {
          vvStatus.className = 'tts-status-chip tts-status-fail';
          vvStatus.textContent = _vvRetryCount >= 2 ? `❌ ${_vvRetryCount}회 실패` : '❌ 연결 실패';
        }
        if (vvRows) vvRows.style.display = 'none';
        // 2회 이상 실패 시 폴백 버튼 표시
        const showFallback = _vvRetryCount >= 2;
        _showVvRetry(true, '⚠️ VOICEVOX 서버(localhost:50021)에 연결할 수 없습니다.', showFallback);
      }
      return ok;
    }

    // 엔진 선택 처리
    // ※ VOICEVOX를 직접 선택한 경우 실패해도 자동 강등하지 않음 (재시도 버튼 안내)
    // ※ Edge TTS에서 cascading으로 VOICEVOX 시도 후 실패 시에만 Web TTS로 자동 강등
    async function _onEngineSelect(requested) {
      _lockTTSGroup(true);

      let active = requested;
      let ok = true;

      if (requested === 'edge') {
        ok = await _tryActivateEdge();
        if (!ok) {
          showToast('Edge TTS 서버를 찾을 수 없습니다.\npython edge_tts_server.py 를 먼저 실행하세요.\n⬇ VOICEVOX로 전환 시도 중...', 3500);
          active = 'voicevox';
          ok = await _tryActivateVoicevox();
          if (!ok) {
            showToast('VOICEVOX도 없습니다. Web TTS로 전환합니다.', 2500);
            active = 'web';
          }
        }
      } else if (requested === 'voicevox') {
        ok = await _tryActivateVoicevox();
        if (!ok) {
          // 직접 선택한 경우 — 라디오를 VOICEVOX에 유지하고 재시도 안내만 표시
          // (Web TTS로 자동 강등 없음)
          state.prefs.useEdgeTTS  = false;
          state.prefs.useVoicevox = false;  // 연결 실패 상태이므로 저장은 false
          saveToStorage();
          if (vvRadio) vvRadio.checked = true;   // 라디오는 VOICEVOX에 유지
          _updateCardStyle('voicevox', false);    // 에러 스타일
          _lockTTSGroup(false);
          return;
        }
      }

      // 연결 성공 또는 Web TTS (항상 사용 가능)
      state.prefs.useEdgeTTS   = (active === 'edge');
      state.prefs.useVoicevox  = (active === 'voicevox');
      saveToStorage();

      const finalRadio = active === 'edge' ? edgeRadio : active === 'voicevox' ? vvRadio : webRadio;
      if (finalRadio) finalRadio.checked = true;
      _updateCardStyle(active, true);
      _updateSpeakerPanels(active);

      // 비활성 엔진 상태 텍스트 초기화
      if (active !== 'voicevox' && vvStatus) { vvStatus.className = 'tts-status-chip'; vvStatus.textContent = '비활성'; }
      if (active !== 'edge' && edgeStatus)   { edgeStatus.className = 'tts-status-chip'; edgeStatus.textContent = '비활성'; }
      if (active !== 'voicevox') _showVvRetry(false);

      _lockTTSGroup(false);
    }

    // 라디오 초기값 설정
    const initEngine = _getInitialEngine();
    const initRadio  = initEngine === 'edge' ? edgeRadio : initEngine === 'voicevox' ? vvRadio : webRadio;
    if (initRadio) initRadio.checked = true;
    _updateCardStyle(initEngine, true);
    _updateSpeakerPanels(initEngine);

    // 시작 시 상태 텍스트 표시 (네트워크 요청 없이 캐시 상태만)
    if (initEngine === 'edge' && edgeStatus) {
      const edgeAvail = typeof EdgeTTSModule !== 'undefined' && EdgeTTSModule.isAvailable();
      edgeStatus.className = `tts-status-chip ${edgeAvail ? 'tts-status-success' : 'tts-status-fail'}`;
      edgeStatus.textContent = edgeAvail ? '✅ 연결됨' : '❌ 서버 없음';
    }
    if (vvStatus) {
      if (voicevoxAvailable) {
        // 이미 연결됨
        vvStatus.className = 'tts-status-chip tts-status-success';
        vvStatus.textContent = `✅ ${voicevoxSpeakers.length}개 화자 연결됨`;
        _showVvRetry(false);
      } else if (state.prefs.useVoicevox) {
        // 저장됐으나 현재 미연결 (연결 실패)
        vvStatus.className = 'tts-status-chip tts-status-fail';
        vvStatus.textContent = '❌ 연결 끊김';
        _showVvRetry(true, '⚠️ 이전에 사용하던 VOICEVOX 서버가 응답하지 않습니다.');
      } else {
        // 미설정 또는 아직 연결 시도 중 (앱 시작 직후 설정 패널 열린 경우)
        vvStatus.className = 'tts-status-chip tts-status-connecting';
        vvStatus.textContent = '연결 시도 중...';
      }
    }

    // VOICEVOX 연결됐으나 화자 목록 미로드 시 자동 채우기
    if (voicevoxAvailable && voicevoxSpeakers.length === 0) {
      _tryActivateVoicevox();
    }
    // 미연결 + 미설정 → 설정 패널이 열릴 때도 자동 시도
    if (!voicevoxAvailable && !state.prefs.useEdgeTTS) {
      _tryActivateVoicevox();
    }

    // 재시도 버튼 바인딩
    const vvRetryBtn = document.getElementById('vv-retry-btn');
    if (vvRetryBtn && !vvRetryBtn._bound) {
      vvRetryBtn._bound = true;
      vvRetryBtn.addEventListener('click', () => _onEngineSelect('voicevox'));
    }

    // 폴백 버튼 바인딩 (2회 실패 후 "다음 옵션으로?" 버튼)
    const vvFbEdgeBtn = document.getElementById('vv-fallback-edge-btn');
    if (vvFbEdgeBtn && !vvFbEdgeBtn._bound) {
      vvFbEdgeBtn._bound = true;
      vvFbEdgeBtn.addEventListener('click', () => {
        _vvRetryCount = 0;
        _onEngineSelect('edge');
      });
    }
    const vvFbWebBtn = document.getElementById('vv-fallback-web-btn');
    if (vvFbWebBtn && !vvFbWebBtn._bound) {
      vvFbWebBtn._bound = true;
      vvFbWebBtn.addEventListener('click', () => {
        _vvRetryCount = 0;
        _onEngineSelect('web');
      });
    }

    // 라디오 변경 이벤트
    [edgeRadio, vvRadio, webRadio].forEach(r => {
      if (!r) return;
      r.addEventListener('change', () => {
        if (r.checked) _onEngineSelect(r.value);
      });
    });

    // ── VOICEVOX 화자 변경 ──
    const vvS1 = document.getElementById('pref-voicevox-speaker1');
    const vvS2 = document.getElementById('pref-voicevox-speaker2');
    const testVvBtn = document.getElementById('test-voicevox-btn');
    if (vvS1) vvS1.onchange = () => {
      state.prefs.voicevoxSpeaker1 = parseInt(vvS1.value);
      state.voiceCallCount = 0; saveToStorage();
      playVoicevox('こんにちは', parseInt(vvS1.value));
      refreshSplashActors(); updateActiveSpeakerBadge();
    };
    if (vvS2) vvS2.onchange = () => {
      const id = vvS2.value === 'none' ? 'none' : parseInt(vvS2.value);
      state.prefs.voicevoxSpeaker2 = id;
      state.voiceCallCount = 0; saveToStorage();
      if (id !== 'none') playVoicevox('こんにちは', id);
      refreshSplashActors(); updateActiveSpeakerBadge();
    };
    if (testVvBtn) testVvBtn.onclick = () => { playVoicevox('こんにちは', state.prefs.voicevoxSpeaker1); };

    // ── Edge TTS 화자 변경 ──
    const edgeV1 = document.getElementById('pref-edgetts-voice1');
    const edgeV2 = document.getElementById('pref-edgetts-voice2');
    const testEdgeBtn = document.getElementById('test-edgetts-btn');
    if (edgeV1) {
      edgeV1.value = state.prefs.edgeTTSVoice1 || 'ja-JP-NanamiNeural';
      edgeV1.onchange = () => { state.prefs.edgeTTSVoice1 = edgeV1.value; if (typeof EdgeTTSModule !== 'undefined') EdgeTTSModule.configure({ voice1: edgeV1.value }); saveToStorage(); };
    }
    if (edgeV2) {
      edgeV2.value = state.prefs.edgeTTSVoice2 || 'none';
      edgeV2.onchange = () => { state.prefs.edgeTTSVoice2 = edgeV2.value; if (typeof EdgeTTSModule !== 'undefined') EdgeTTSModule.configure({ voice2: edgeV2.value }); saveToStorage(); };
    }
    if (testEdgeBtn) {
      testEdgeBtn.onclick = async () => {
        if (typeof EdgeTTSModule === 'undefined' || !EdgeTTSModule.isAvailable()) {
          showToast('Edge TTS 서버에 연결되어 있지 않습니다.'); return;
        }
        await EdgeTTSModule.speak('こんにちは！私はNanamiです。よろしくお願いします！', 1, 1.0);
      };
    }

    // ── Web TTS 화자 변경 ──
    const femaleSelect = document.getElementById('pref-voice-female');
    const maleSelect   = document.getElementById('pref-voice-male');
    if (femaleSelect) femaleSelect.onchange = () => {
      state.prefs.voiceFemale = femaleSelect.value;
      state.voiceCallCount = 0; saveToStorage();
      if (femaleSelect.value !== 'none') playTestVoice(femaleSelect.value);
      refreshSplashActors(); updateActiveSpeakerBadge();
    };
    if (maleSelect) maleSelect.onchange = () => {
      state.prefs.voiceMale = maleSelect.value;
      state.voiceCallCount = 0; saveToStorage();
      if (maleSelect.value !== 'none') playTestVoice(maleSelect.value);
      refreshSplashActors(); updateActiveSpeakerBadge();
    };

    // 최적 음성 자동 설정 버튼
    function _onAutoVoiceClick() {
      if (!voicesCached) { showToast('음성을 로드 중입니다. 잠시 후 다시 시도해주세요.'); return; }
      const ok = _autoSelectBestVoices();
      if (!ok) showToast('이 브라우저에서 일본어 음성을 찾을 수 없습니다.\nMicrosoft Edge 브라우저를 사용하면 Nanami/Keita 고품질 음성을 쓸 수 있습니다.', 4000);
    }
    ['auto-select-voice-btn', 'auto-select-voice-btn-fallback'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', _onAutoVoiceClick);
    });

    // autoplay/autonext 즉시 반영
    document.getElementById('pref-autoplay').onchange = (e) => { state.prefs.autoplay = e.target.checked; saveToStorage(); };
    document.getElementById('pref-autonext').onchange = (e) => { state.prefs.autonext = e.target.checked; saveToStorage(); };

    // 퀴즈 제한 시간 즉시 저장
    if (qcdEl) qcdEl.onchange = () => { state.prefs.quizCountdown = parseInt(qcdEl.value) || 0; saveToStorage(); };

    // 표시 설정 변경 시 실시간 반영
    ['pref-show-word-ex','pref-show-sent-ex'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.onchange = () => {
        state.prefs.showWordEx = document.getElementById('pref-show-word-ex').checked;
        state.prefs.showSentEx = document.getElementById('pref-show-sent-ex').checked;
        applyVisibilityPrefs(); saveToStorage();
      };
    });

    // 플래시카드 뒤집기 설정 — UI 제거됨, 기본값 유지 (즉시 뒷면 표시)
  }

  function savePrefs() {
    const langEl = document.getElementById('pref-lang');
    if (langEl) state.prefs.lang = langEl.value;
    state.prefs.voiceFemale     = document.getElementById('pref-voice-female')?.value ?? state.prefs.voiceFemale;
    state.prefs.voiceMale       = document.getElementById('pref-voice-male')?.value   ?? state.prefs.voiceMale;
    const fnEl = document.getElementById('pref-female-name');
    const mnEl = document.getElementById('pref-male-name');
    if (fnEl && fnEl.value.trim()) state.prefs.femaleName = fnEl.value.trim();
    if (mnEl && mnEl.value.trim()) state.prefs.maleName   = mnEl.value.trim();
    state.prefs.autoplay        = true;  // 항상 활성화
    state.prefs.autonext        = true;  // 항상 활성화
    const swExEl = document.getElementById('pref-show-word-ex');
    const ssExEl = document.getElementById('pref-show-sent-ex');
    if (swExEl) state.prefs.showWordEx = swExEl.checked;
    if (ssExEl) state.prefs.showSentEx = ssExEl.checked;
    const qcdEl = document.getElementById('pref-quiz-countdown');
    if (qcdEl) state.prefs.quizCountdown = parseInt(qcdEl.value) || 0;
    // 퀴즈 설정 저장
    const qtypeChecked = document.querySelector('input[name="qtype"]:checked');
    if (qtypeChecked) state.prefs.quizType = qtypeChecked.value;
    const qcountChecked = document.querySelector('input[name="qcount"]:checked');
    if (qcountChecked) state.prefs.quizCount = qcountChecked.value;
    const qlangChecked = document.querySelector('input[name="qlang"]:checked');
    if (qlangChecked) state.prefs.quizLang = qlangChecked.value;
    const qlvSel = document.getElementById('quiz-level-select');
    if (qlvSel) state.prefs.quizLevel = qlvSel.value;
    const cheerEl = document.getElementById('pref-quiz-cheer');
    if (cheerEl) state.prefs.quizCheer = cheerEl.checked;
    // TTS 엔진: 라디오 값에서 읽기
    const ttsEngineChecked = document.querySelector('input[name="tts-engine-radio"]:checked');
    if (ttsEngineChecked) {
      state.prefs.useEdgeTTS  = (ttsEngineChecked.value === 'edge');
      state.prefs.useVoicevox = (ttsEngineChecked.value === 'voicevox');
    }
    const vvS1 = document.getElementById('pref-voicevox-speaker1');
    if (vvS1) state.prefs.voicevoxSpeaker1 = parseInt(vvS1.value) || 1;
    const vvS2 = document.getElementById('pref-voicevox-speaker2');
    if (vvS2) state.prefs.voicevoxSpeaker2 = vvS2.value === 'none' ? 'none' : parseInt(vvS2.value);
    // 배경음 설정 저장
    const ambDlg = document.getElementById('pref-ambient-dialogue');
    const ambQz  = document.getElementById('pref-ambient-quiz');
    const ambVol = document.getElementById('pref-ambient-volume');
    if (ambDlg) state.prefs.ambientDialogue = ambDlg.checked ? 'on' : 'none';
    if (ambQz)  state.prefs.ambientQuiz     = ambQz.checked  ? 'on' : 'none';
    if (ambVol) state.prefs.ambientVolume   = parseInt(ambVol.value) / 100;
    // 자동 읽고 넘기기
    const aaEl = document.getElementById('pref-auto-advance');
    const aadEl = document.getElementById('pref-auto-advance-delay');
    const aadRow = document.getElementById('pref-auto-advance-delay-row');
    if (aaEl) state.prefs.autoAdvance = aaEl.checked;
    if (aadEl) state.prefs.autoAdvanceDelay = parseInt(aadEl.value) || 3;
    if (aadRow) aadRow.style.display = (aaEl && aaEl.checked) ? 'flex' : 'none';
    state.voiceCallCount = 0;
    applyVisibilityPrefs();
    saveToStorage();
    updateHqSpeakerLabel();
    updateHqAmbientLabel();
    // 이름 변경 즉시 배지에 반영
    updateActiveSpeakerBadge();
  }

  // ─── XP / 레벨 업 ───
  function updateStreak() {
    const today = new Date().toDateString();
    if (state.lastStudied) {
      const last = new Date(state.lastStudied).toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (last === yesterday) state.streak++;
      else if (last !== today) state.streak = 1;
    } else {
      state.streak = 1;
    }
    state.lastStudied = new Date().toISOString();
  }

  function checkLevelUnlock() {
    LEVELS.forEach(level => {
      if (!state.unlockedLevels.includes(level.id) && state.totalXP >= level.unlockXP) {
        state.unlockedLevels.push(level.id);
        state.currentLevel = level.id;
        setTimeout(() => showToast(`🎉 Level ${level.id} 해금! ${level.title}`), 500);
      }
    });
  }

  // ════════════════════════════════════════════════════════════
  // ─── 読む (읽기) — 간판 읽기 + 일기 읽기 ───
  // ════════════════════════════════════════════════════════════

  // 読む 뷰 상태
  const yomu = {
    mode: 'home',          // 'home' | 'sign' | 'diary'
    // 간판
    signCat: 'all',
    signIndex: 0,
    signFiltered: [],
    signQuizMode: false,
    signRevealed: false,
    // 일기
    diaryAuthor: 'all',
    diaryIndex: 0,
    diaryFiltered: [],
    diaryShowRuby: false,
    diaryShowTrans: false,
    diaryVocabOpen: false,
  };

  function setupYomuView() {
    const home = document.getElementById('yomu-home');
    const signPanel = document.getElementById('yomu-sign-panel');
    const diaryPanel = document.getElementById('yomu-diary-panel');
    if (!home) return;

    // 현재 모드에 따라 패널 표시
    _yomuShowPanel(yomu.mode);

    // 홈 버튼
    const btnSign = document.getElementById('yomu-btn-sign');
    const btnDiary = document.getElementById('yomu-btn-diary');
    if (btnSign && !btnSign._yb) {
      btnSign._yb = true;
      btnSign.addEventListener('click', () => { yomu.mode = 'sign'; _yomuShowPanel('sign'); _initSignPanel(); });
    }
    if (btnDiary && !btnDiary._yb) {
      btnDiary._yb = true;
      btnDiary.addEventListener('click', () => { yomu.mode = 'diary'; _yomuShowPanel('diary'); _initDiaryPanel(); });
    }

    // 뒤로가기 버튼
    const signBack = document.getElementById('sign-back-btn');
    const diaryBack = document.getElementById('diary-back-btn');
    if (signBack && !signBack._yb) {
      signBack._yb = true;
      signBack.addEventListener('click', () => { yomu.mode = 'home'; _yomuShowPanel('home'); });
    }
    if (diaryBack && !diaryBack._yb) {
      diaryBack._yb = true;
      diaryBack.addEventListener('click', () => {
        window.speechSynthesis && window.speechSynthesis.cancel();
        yomu.mode = 'home'; _yomuShowPanel('home');
      });
    }

    // 간판이나 일기가 열려있으면 즉시 초기화
    if (yomu.mode === 'sign') _initSignPanel();
    if (yomu.mode === 'diary') _initDiaryPanel();

    // 간판 클릭 위임 (1번 이슈 해결: 개별 라인 클릭 시 블러 해제)
    if (signPanel && !signPanel._clickBound) {
      signPanel._clickBound = true;
      signPanel.addEventListener('click', (e) => {
        const line = e.target.closest('.sign-line');
        if (line && !line.classList.contains('muted')) {
          line.classList.toggle('revealed');
        }
      });
    }
  }

  function _yomuShowPanel(mode) {
    const panels = { home: 'yomu-home', sign: 'yomu-sign-panel', diary: 'yomu-diary-panel' };
    Object.entries(panels).forEach(([k, id]) => {
      const el = document.getElementById(id);
      if (el) el.style.display = (k === mode) ? '' : 'none';
    });
  }

  // ─── 간판 읽기 ─────────────────────────────────────────

  function _initSignPanel() {
    const signs = (typeof SIGN_ITEMS !== 'undefined') ? SIGN_ITEMS : _getFallbackSigns();
    const cats  = (typeof SIGN_CATEGORIES !== 'undefined') ? SIGN_CATEGORIES : _getFallbackSignCats();

    // 카테고리 탭 렌더
    const tabsEl = document.getElementById('sign-cat-tabs');
    if (tabsEl && !tabsEl._inited) {
      tabsEl._inited = true;
      tabsEl.innerHTML = '';
      const allBtn = _makeEl('button', 'sign-cat-tab active', '전체');
      allBtn.dataset.cat = 'all';
      allBtn.addEventListener('click', () => _signSelectCat('all', tabsEl, signs));
      tabsEl.appendChild(allBtn);
      cats.forEach(c => {
        const btn = _makeEl('button', 'sign-cat-tab', `${c.icon} ${c.name}`);
        btn.dataset.cat = c.id;
        btn.addEventListener('click', () => _signSelectCat(c.id, tabsEl, signs));
        tabsEl.appendChild(btn);
      });
    }

    // 컨트롤 버튼 바인딩
    const btnReveal = document.getElementById('sign-btn-reveal');
    const btnQuiz   = document.getElementById('sign-btn-quiz');
    const btnNext   = document.getElementById('sign-btn-next');
    if (btnReveal && !btnReveal._yb) {
      btnReveal._yb = true;
      btnReveal.addEventListener('click', _signReveal);
    }
    if (btnQuiz && !btnQuiz._yb) {
      btnQuiz._yb = true;
      btnQuiz.addEventListener('click', _signStartQuiz);
    }
    if (btnNext && !btnNext._yb) {
      btnNext._yb = true;
      btnNext.addEventListener('click', _signNext);
    }

    _signSelectCat(yomu.signCat, tabsEl, signs);
  }

  function _signSelectCat(cat, tabsEl, signs) {
    yomu.signCat = cat;
    yomu.signIndex = 0;
    yomu.signFiltered = (cat === 'all') ? signs : signs.filter(s => s.category === cat);
    // 탭 활성
    if (tabsEl) tabsEl.querySelectorAll('.sign-cat-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === cat);
    });
    _renderSign();
  }

  function _renderSign() {
    const items = yomu.signFiltered;
    if (!items || items.length === 0) return;
    const item = items[yomu.signIndex];
    yomu.signRevealed = false;
    yomu.signQuizMode = false;

    // 진행 레이블
    const progLabel = document.getElementById('sign-progress-label');
    if (progLabel) progLabel.textContent = `${yomu.signIndex + 1} / ${items.length}`;

    // 장면 레이블
    const sceneEl = document.getElementById('sign-scene-label');
    if (sceneEl) sceneEl.textContent = item.scene || '';

    // 간판 렌더링
    const renderEl = document.getElementById('sign-render');
    if (renderEl) {
      renderEl.className = 'sign-render ' + (item.sign_style || 'station_blue');
      renderEl.innerHTML = _buildSignHTML(item);
    }

    // 정보·퀴즈 패널 숨기기
    _signHidePanels();

    // 뜻보기 버튼 리셋
    const btnReveal = document.getElementById('sign-btn-reveal');
    if (btnReveal) { btnReveal.textContent = '👁 뜻 보기'; btnReveal.disabled = false; }
    const btnQuiz = document.getElementById('sign-btn-quiz');
    if (btnQuiz) btnQuiz.textContent = '❓ 퀴즈';
  }

  function _buildSignHTML(item) {
    let html = '';
    if (item.sign_style === 'notice_white' && item.header) {
      html += `<div class="sign-head">${item.header}</div>`;
    }
    html += '<div class="sign-body">';
    (item.lines || []).forEach((line, i) => {
      const sizeClass = line.size || 'md';
      const mutedClass = line.muted ? ' muted' : '';
      if (i > 0 && line.divider) html += '<hr class="sign-divider">';

      // ★ 클릭 시: 블러 해제 + TTS 읽기
      const onClickAttr = line.muted ? '' : `onclick="this.classList.add('revealed'); App.playAudio('${(line.text||'').replace(/'/g,'\\\'')}')"`;
      const titleAttr = line.muted ? '' : 'title="클릭해서 읽기 + 발음 듣기"';

      html += `<div class="sign-line ${sizeClass}${mutedClass}" ${onClickAttr} ${titleAttr}>`;
      if (line.ruby && yomu.signRevealed) {
        html += _injectRuby(line.text, line.ruby);
      } else {
        html += _escHtml(line.text);
      }
      html += '</div>';
    });
    html += '</div>';
    return html;
  }

  function _signReveal() {
    yomu.signRevealed = true;
    yomu.signQuizMode = false;
    _onSignRead();
    const items = yomu.signFiltered;
    const item = items[yomu.signIndex];

    // ★ TTS: 간판의 모든 라인을 순서대로 읽기
    const readableText = (item.lines || [])
      .filter(l => !l.muted && l.text)
      .map(l => l.text)
      .join('。');
    if (readableText) playAudio(readableText);

    // 간판에 루비 추가 및 블러 제거
    const renderEl = document.getElementById('sign-render');
    if (renderEl) {
      renderEl.classList.remove('blurred');
      renderEl.innerHTML = _buildSignHTML(item);
    }

    // 정보 패널 표시
    const infoPanel = document.getElementById('sign-info-panel');
    const quizPanel = document.getElementById('sign-quiz-panel');
    if (quizPanel) quizPanel.style.display = 'none';
    if (infoPanel) {
      infoPanel.style.display = '';
      // 번역
      const transEl = document.getElementById('sign-translation');
      if (transEl) transEl.textContent = '🇰🇷 ' + (item.translation || '');
      // 어휘
      const vocabEl = document.getElementById('sign-vocab-list');
      if (vocabEl) {
        vocabEl.innerHTML = (item.vocab || []).map(v =>
          `<div class="sign-vocab-item" onclick="App.playAudio('${(v.word||'').replace(/'/g,'\\\'')}')" title="클릭하여 발음 듣기" style="cursor:pointer">
            <span class="sv-word"><ruby>${_escHtml(v.word)}<rt>${_escHtml(v.reading)}</rt></ruby></span>
            <span class="sv-meaning"> — ${_escHtml(v.meaning)}</span>
            <span class="sv-speaker">🔊</span>
          </div>`
        ).join('');
      }
      // 팁
      const tipEl = document.getElementById('sign-tip-box');
      if (tipEl) tipEl.textContent = item.tip || '';
    }
    const btnReveal = document.getElementById('sign-btn-reveal');
    if (btnReveal) { btnReveal.textContent = '✅ 뜻 확인'; btnReveal.disabled = true; }
  }

  function _signStartQuiz() {
    const items = yomu.signFiltered;
    const item = items[yomu.signIndex];
    if (!item || !item.quiz) return;

    yomu.signQuizMode = true;
    // 간판 블러 처리
    const renderEl = document.getElementById('sign-render');
    if (renderEl) renderEl.classList.add('blurred');

    const infoPanel = document.getElementById('sign-info-panel');
    if (infoPanel) infoPanel.style.display = 'none';

    const quizPanel = document.getElementById('sign-quiz-panel');
    const quizQ = document.getElementById('sign-quiz-question');
    const quizC = document.getElementById('sign-quiz-choices');
    const quizR = document.getElementById('sign-quiz-result');
    if (!quizPanel) return;

    quizPanel.style.display = '';
    if (quizR) quizR.style.display = 'none';
    if (quizQ) quizQ.textContent = item.quiz.question;
    if (quizC) {
      quizC.innerHTML = '';
      item.quiz.choices.forEach((ch, i) => {
        const btn = _makeEl('button', 'sign-quiz-choice', ch);
        btn.addEventListener('click', () => {
          // 모든 선택지 비활성
          quizC.querySelectorAll('.sign-quiz-choice').forEach(b => b.style.pointerEvents = 'none');
          const isCorrect = i === item.quiz.answer;
          btn.classList.add(isCorrect ? 'correct' : 'wrong');
          if (!isCorrect) {
            quizC.querySelectorAll('.sign-quiz-choice')[item.quiz.answer].classList.add('correct');
          }
          // 결과 표시
          if (quizR) {
            quizR.style.display = '';
            quizR.className = 'sign-quiz-result ' + (isCorrect ? 'correct' : 'wrong');
            quizR.innerHTML = isCorrect ? '🎉 <b>정답!</b> 완벽하게 읽으셨네요!' : '❌ <b>틀렸어요.</b> 간판의 글자를 탭해서 확인해보세요!';
            
            // 정답일 때만 전체 블러 해제, 틀렸을 때는 사용자가 직접 탭해서 확인하게 유도
            if (isCorrect && renderEl) {
                renderEl.classList.remove('blurred');
                // 모든 라인에 revealed 추가
                renderEl.querySelectorAll('.sign-line').forEach(l => l.classList.add('revealed'));
            }
          }
        });
        quizC.appendChild(btn);
      });
    }
    const btnQuiz = document.getElementById('sign-btn-quiz');
    if (btnQuiz) btnQuiz.textContent = '퀴즈 중…';
  }

  function _signNext() {
    const items = yomu.signFiltered;
    if (!items.length) return;
    yomu.signIndex = (yomu.signIndex + 1) % items.length;
    const renderEl = document.getElementById('sign-render');
    if (renderEl) renderEl.classList.remove('blurred');
    _renderSign();
  }

  function _signHidePanels() {
    ['sign-info-panel','sign-quiz-panel'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    const renderEl = document.getElementById('sign-render');
    if (renderEl) renderEl.classList.remove('blurred');
  }

  // ─── 일기 읽기 ─────────────────────────────────────────

  function _initDiaryPanel() {
    const entries = (typeof DIARY_ENTRIES !== 'undefined') ? DIARY_ENTRIES : _getFallbackDiaries();
    const authors = (typeof DIARY_AUTHORS !== 'undefined') ? DIARY_AUTHORS : _getFallbackDiaryAuthors();

    // 저자 탭 렌더
    const tabsEl = document.getElementById('diary-author-tabs');
    if (tabsEl && !tabsEl._inited) {
      tabsEl._inited = true;
      tabsEl.innerHTML = '';
      const allBtn = _makeEl('button', 'diary-author-tab active', '📚 전체');
      allBtn.dataset.author = 'all';
      allBtn.addEventListener('click', () => _diarySelectAuthor('all', tabsEl, entries));
      tabsEl.appendChild(allBtn);
      authors.forEach(a => {
        const btn = _makeEl('button', 'diary-author-tab', `${a.avatar} ${a.name}`);
        btn.dataset.author = a.id;
        btn.addEventListener('click', () => _diarySelectAuthor(a.id, tabsEl, entries));
        tabsEl.appendChild(btn);
      });
    }

    // 컨트롤 버튼 바인딩
    const btnRuby  = document.getElementById('diary-btn-ruby');
    const btnTrans = document.getElementById('diary-btn-trans');
    const btnVocab = document.getElementById('diary-btn-vocab');
    const btnTts   = document.getElementById('diary-btn-tts');
    const btnPrev  = document.getElementById('diary-btn-prev');
    const btnNext  = document.getElementById('diary-btn-next');
    const vocabClose = document.getElementById('diary-vocab-close');

    if (btnRuby && !btnRuby._yb) {
      btnRuby._yb = true;
      btnRuby.addEventListener('click', () => {
        yomu.diaryShowRuby = !yomu.diaryShowRuby;
        btnRuby.classList.toggle('active', yomu.diaryShowRuby);
        _diaryUpdateRuby();
      });
    }
    if (btnTrans && !btnTrans._yb) {
      btnTrans._yb = true;
      btnTrans.addEventListener('click', () => {
        yomu.diaryShowTrans = !yomu.diaryShowTrans;
        btnTrans.classList.toggle('active', yomu.diaryShowTrans);
        _diaryUpdateTrans();
      });
    }
    if (btnVocab && !btnVocab._yb) {
      btnVocab._yb = true;
      btnVocab.addEventListener('click', () => _diaryToggleVocab());
    }
    if (btnTts && !btnTts._yb) {
      btnTts._yb = true;
      btnTts.addEventListener('click', () => _diaryReadAloud());
    }
    if (btnPrev && !btnPrev._yb) {
      btnPrev._yb = true;
      btnPrev.addEventListener('click', () => {
        if (yomu.diaryIndex > 0) { yomu.diaryIndex--; _renderDiary(); }
      });
    }
    if (btnNext && !btnNext._yb) {
      btnNext._yb = true;
      btnNext.addEventListener('click', () => {
        if (yomu.diaryIndex < yomu.diaryFiltered.length - 1) { yomu.diaryIndex++; _renderDiary(); _onDiaryRead(); }
      });
    }
    if (vocabClose && !vocabClose._yb) {
      vocabClose._yb = true;
      vocabClose.addEventListener('click', () => {
        yomu.diaryVocabOpen = false;
        const vp = document.getElementById('diary-vocab-panel');
        if (vp) vp.style.display = 'none';
      });
    }

    _diarySelectAuthor(yomu.diaryAuthor, tabsEl, entries);
  }

  function _diarySelectAuthor(author, tabsEl, entries) {
    yomu.diaryAuthor = author;
    yomu.diaryIndex = 0;
    yomu.diaryFiltered = (author === 'all') ? entries : entries.filter(e => e.author_id === author);
    if (tabsEl) tabsEl.querySelectorAll('.diary-author-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.author === author);
    });
    _renderDiary();
  }

  function _renderDiary() {
    const items = yomu.diaryFiltered;
    if (!items || items.length === 0) {
      const card = document.getElementById('diary-card');
      if (card) card.innerHTML = '<div style="padding:40px;text-align:center;color:#999">일기 데이터를 불러오는 중...</div>';
      return;
    }
    const entry = items[yomu.diaryIndex];
    const authors = (typeof DIARY_AUTHORS !== 'undefined') ? DIARY_AUTHORS : _getFallbackDiaryAuthors();
    const author = authors.find(a => a.id === entry.author_id) || {};

    // 진행 레이블
    const progLabel = document.getElementById('diary-progress-label');
    if (progLabel) progLabel.textContent = `${yomu.diaryIndex + 1} / ${items.length}`;

    // 저자 정보
    const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || ''; };
    setTxt('diary-avatar', author.avatar || '📝');
    setTxt('diary-author-name', author.name || '');
    setTxt('diary-author-meta', `${author.age || ''}歳 · ${author.occupation || ''} · ${author.location || ''}`);
    setTxt('diary-date', entry.date_text || '');
    setTxt('diary-mood', entry.mood ? entry.mood.emoji : '');
    setTxt('diary-title', entry.title || '');

    // 태그
    const tagsEl = document.getElementById('diary-tags');
    if (tagsEl) {
      tagsEl.innerHTML = (entry.tags || []).map(t => `<span class="diary-tag">${_escHtml(t)}</span>`).join('');
    }

    // 본문
    const contentEl = document.getElementById('diary-content');
    if (contentEl) {
      contentEl.innerHTML = (entry.content || []).map((para, pi) => {
        const textHtml = _buildDiaryParaHtml(para);
        const gramNote = para.grammar_note ? `<div class="diary-grammar-note">📌 ${_escHtml(para.grammar_note)}</div>` : '';
        const trans = para.translation ? `<div class="diary-para-trans${yomu.diaryShowTrans ? ' visible' : ''}" data-pi="${pi}">${_escHtml(para.translation)}</div>` : '';
        return `<div class="diary-para" data-pi="${pi}">${textHtml}${gramNote}</div>${trans}`;
      }).join('');
      // 루비 상태 반영
      _diaryUpdateRuby();
    }

    // 리액션
    const reactEl = document.getElementById('diary-reactions');
    if (reactEl) {
      reactEl.innerHTML = (entry.reactions || []).map(r =>
        `<button class="diary-reaction">${r.emoji} <span class="dr-count">${r.count}</span></button>`
      ).join('');
      reactEl.querySelectorAll('.diary-reaction').forEach(btn => {
        btn.addEventListener('click', function() {
          const cnt = this.querySelector('.dr-count');
          if (cnt) cnt.textContent = parseInt(cnt.textContent) + 1;
          this.classList.toggle('reacted');
        });
      });
    }

    // 댓글
    const commentsEl = document.getElementById('diary-comments');
    if (commentsEl && entry.comments && entry.comments.length) {
      commentsEl.style.display = '';
      commentsEl.innerHTML = '<div class="diary-comment-title">💬 댓글</div>' +
        entry.comments.map(c => `
          <div class="diary-comment">
            <span class="diary-comment-user">${_escHtml(c.user)}</span>
            <div class="diary-comment-body">
              <div class="diary-comment-text">${_escHtml(c.text)}</div>
              ${c.translation ? `<div class="diary-comment-trans${yomu.diaryShowTrans ? ' visible' : ''}">${_escHtml(c.translation)}</div>` : ''}
            </div>
          </div>`).join('');
    } else if (commentsEl) {
      commentsEl.style.display = 'none';
    }

    // 내비 버튼 상태
    const btnPrev = document.getElementById('diary-btn-prev');
    const btnNext = document.getElementById('diary-btn-next');
    if (btnPrev) btnPrev.disabled = yomu.diaryIndex === 0;
    if (btnNext) btnNext.disabled = yomu.diaryIndex === items.length - 1;

    // 점 내비
    const dotsEl = document.getElementById('diary-dots');
    if (dotsEl) {
      const total = Math.min(items.length, 12);
      dotsEl.innerHTML = Array.from({length: total}, (_, i) =>
        `<div class="diary-dot${i === yomu.diaryIndex ? ' active' : ''}" data-i="${i}"></div>`
      ).join('');
      dotsEl.querySelectorAll('.diary-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          yomu.diaryIndex = parseInt(dot.dataset.i);
          _renderDiary();
        });
      });
    }

    // 단어 패널 닫기
    const vp = document.getElementById('diary-vocab-panel');
    if (vp) { vp.style.display = 'none'; yomu.diaryVocabOpen = false; }
  }

  function _buildDiaryParaHtml(para) {
    if (!para.furigana || Object.keys(para.furigana).length === 0) {
      return _escHtml(para.text);
    }
    // 후리가나 삽입
    let text = para.text;
    // 키워드/후리가나 처리
    const sortedKeys = Object.keys(para.furigana).sort((a, b) => b.length - a.length);
    // 세그먼트 분리
    let result = '';
    let i = 0;
    while (i < text.length) {
      let matched = false;
      for (const key of sortedKeys) {
        if (text.startsWith(key, i)) {
          const reading = para.furigana[key];
          const hiddenClass = yomu.diaryShowRuby ? '' : ' class="hidden"';
          result += `<ruby${hiddenClass ? '' : ''}>${_escHtml(key)}<rt${hiddenClass ? ' style="display:none"' : ''}>${_escHtml(reading)}</rt></ruby>`;
          i += key.length;
          matched = true;
          break;
        }
      }
      if (!matched) {
        result += _escHtml(text[i]);
        i++;
      }
    }
    return result;
  }

  function _diaryUpdateRuby() {
    document.querySelectorAll('#diary-content ruby rt').forEach(rt => {
      rt.style.display = yomu.diaryShowRuby ? '' : 'none';
    });
  }

  function _diaryUpdateTrans() {
    document.querySelectorAll('.diary-para-trans, .diary-comment-trans').forEach(el => {
      el.classList.toggle('visible', yomu.diaryShowTrans);
    });
  }

  function _diaryToggleVocab() {
    const items = yomu.diaryFiltered;
    if (!items || !items.length) return;
    const entry = items[yomu.diaryIndex];
    yomu.diaryVocabOpen = !yomu.diaryVocabOpen;

    const vp = document.getElementById('diary-vocab-panel');
    if (!vp) return;

    if (!yomu.diaryVocabOpen) {
      vp.style.display = 'none';
      return;
    }
    // 단어 수집
    const allVocab = [];
    (entry.content || []).forEach(para => {
      (para.key_vocab || []).forEach(kv => {
        // kv 형식: "word(reading)" 또는 {word, reading, meaning}
        if (typeof kv === 'string') {
          const m = kv.match(/^(.+?)\((.+?)\)$/);
          if (m) allVocab.push({ word: m[1], reading: m[2], meaning: '' });
          else allVocab.push({ word: kv, reading: '', meaning: '' });
        } else {
          allVocab.push(kv);
        }
      });
    });
    // 후리가나에서도 수집
    (entry.content || []).forEach(para => {
      Object.entries(para.furigana || {}).forEach(([word, reading]) => {
        if (!allVocab.find(v => v.word === word)) allVocab.push({ word, reading, meaning: '' });
      });
    });

    const itemsEl = document.getElementById('diary-vocab-items');
    if (itemsEl) {
      itemsEl.innerHTML = allVocab.length === 0
        ? '<div style="color:#999;text-align:center;padding:20px">단어 데이터가 없어요</div>'
        : allVocab.map(v => `
          <div class="diary-vocab-entry">
            <div>
              <div class="dve-word">${_escHtml(v.word)}</div>
              <div class="dve-reading">${_escHtml(v.reading)}</div>
            </div>
            <div class="dve-meaning">${_escHtml(v.meaning || '(사전 참고)')}</div>
          </div>`).join('');
    }
    vp.style.display = '';
  }

  function _diaryReadAloud() {
    const items = yomu.diaryFiltered;
    if (!items || !items.length) return;
    const entry = items[yomu.diaryIndex];
    const text = (entry.content || []).map(p => p.text).join('。');
    const btnTts = document.getElementById('diary-btn-tts');
    if (!text) return;

    // 이미 읽고 있으면 중지 토글
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      if (btnTts) { btnTts.classList.remove('active'); btnTts.textContent = '🔊 읽기'; }
      return;
    }
    if (state.currentVvAudio && !state.currentVvAudio.paused) {
      state.currentVvAudio.pause(); state.currentVvAudio = null;
      if (btnTts) { btnTts.classList.remove('active'); btnTts.textContent = '🔊 읽기'; }
      return;
    }

    if (btnTts) { btnTts.classList.add('active'); btnTts.textContent = '⏹ 중지'; }

    // ★ playAudio 사용 — VOICEVOX 설정되어 있으면 VOICEVOX로, 아니면 Web TTS
    playAudio(text);

    // 완료 후 버튼 복원 (Web TTS 경우)
    if (window.speechSynthesis) {
      const _check = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(_check);
          if (btnTts) { btnTts.classList.remove('active'); btnTts.textContent = '🔊 읽기'; }
        }
      }, 500);
    }
  }

  // ─── 폴백 데이터 (데이터 파일 없을 때) ─────────────────

  function _getFallbackSignCats() {
    return [
      { id:'station', name:'역·전철', icon:'🚉' },
      { id:'restaurant', name:'식당·카페', icon:'🍜' },
      { id:'shopping', name:'쇼핑', icon:'🛍️' },
      { id:'warning', name:'주의·경고', icon:'⚠️' },
      { id:'tourist', name:'관광', icon:'🗺️' },
      { id:'public', name:'공공시설', icon:'🏥' },
    ];
  }

  function _getFallbackSigns() {
    return [
      {
        id:'sign_demo1', category:'station', difficulty:'N5',
        scene:'新宿駅 南改札', sign_style:'station_blue',
        lines:[
          { text:'← 南口', ruby:'みなみぐち', size:'xl' },
          { text:'→ 北口', ruby:'きたぐち', size:'xl' },
          { text:'South Exit / North Exit', size:'sm', muted:true },
        ],
        translation:'← 남쪽 출구 / → 북쪽 출구',
        vocab:[
          { word:'南口', reading:'みなみぐち', meaning:'남쪽 출구' },
          { word:'北口', reading:'きたぐち', meaning:'북쪽 출구' },
        ],
        tip:'口(くち/ぐち)는 출구·입구. 방위(東西南北)만 알면 역 사인이 쉽게 읽힌다!',
        quiz:{ question:'이 표지판의 내용은?', choices:['남쪽 출구 ← / 북쪽 출구 →','북쪽 출구 ← / 남쪽 출구 →','남쪽 입구 ← / 북쪽 입구 →','동쪽 출구 ← / 서쪽 출구 →'], answer:0 }
      },
      {
        id:'sign_demo2', category:'restaurant', difficulty:'N5',
        scene:'渋谷 라멘집', sign_style:'restaurant_red',
        lines:[
          { text:'営業中', ruby:'えいぎょうちゅう', size:'xl' },
          { text:'11:00 〜 23:00', size:'md' },
        ],
        translation:'영업 중 / 11시 ~ 23시',
        vocab:[
          { word:'営業中', reading:'えいぎょうちゅう', meaning:'영업 중' },
        ],
        tip:'準備中(じゅんびちゅう)는 "준비 중"이에요. 영업 중인지 확인할 때 꼭 쓰이는 표현!',
        quiz:{ question:'이 가게의 영업 상태는?', choices:['영업 중','준비 중','휴일','폐업'], answer:0 }
      },
      {
        id:'sign_demo3', category:'warning', difficulty:'N5',
        scene:'공원 / 건물', sign_style:'warning_yellow',
        lines:[
          { text:'⚠️ 立入禁止', ruby:'たちいりきんし', size:'xl' },
          { text:'No Entry', size:'sm', muted:true },
        ],
        translation:'⚠️ 출입 금지',
        vocab:[
          { word:'立入禁止', reading:'たちいりきんし', meaning:'출입 금지' },
          { word:'禁止', reading:'きんし', meaning:'금지' },
        ],
        tip:'禁止(きんし)= 금지. 〜禁止 패턴을 알면 다양한 경고 표지를 읽을 수 있어요!',
        quiz:{ question:'이 표지판의 의미는?', choices:['출입 금지','주차 금지','촬영 금지','흡연 금지'], answer:0 }
      },
    ];
  }

  function _getFallbackDiaryAuthors() {
    return [
      { id:'sakura', name:'さくら', age:24, occupation:'OL（会社員）', location:'東京', avatar:'🌸', bio:'도쿄 직장인. 맛집과 연애를 좋아함.' },
      { id:'yuika', name:'ゆいか', age:20, occupation:'大学生', location:'東京', avatar:'🎀', bio:'도쿄 대학생. 아이돌과 카페 투어!' },
    ];
  }

  function _getFallbackDiaries() {
    return [
      {
        id:'diary_demo1', author_id:'sakura',
        date_text:'3月25日（火）', title:'最悪な月曜日だった…', title_ko:'최악의 월요일이었어…',
        mood:{ emoji:'😤', label:'むかむか', level:-2 },
        difficulty:'N4', tags:['仕事','電車','遅刻'],
        content:[
          {
            id:'p1',
            text:'今日は朝から電車が遅延して、会社に遅刻してしまった。',
            furigana:{ '遅延':'ちえん', '会社':'かいしゃ', '遅刻':'ちこく' },
            translation:'오늘은 아침부터 전철이 지연돼서 회사에 지각해버렸어.',
            grammar_note:'〜てしまった: 의도치 않게 ~해버렸다 (후회의 뉘앙스)',
            key_vocab:['遅延(ちえん)','遅刻(ちこく)']
          },
          {
            id:'p2',
            text:'上司にめちゃくちゃ怒られた。もう最悪すぎる…',
            furigana:{ '上司':'じょうし', '怒':'おこ' },
            translation:'상사에게 엄청 혼났어. 진짜 최악이야…',
            grammar_note:'〜られた: 수동형 (~되다, ~당하다)',
            key_vocab:['上司(じょうし)']
          },
          {
            id:'p3',
            text:'でも、ランチに行った新しいカフェがすごく美味しかった。少し元気が出た！',
            furigana:{ '新':'あたら', '美味':'おい', '元気':'げんき' },
            translation:'하지만 점심에 간 새 카페가 엄청 맛있었어. 조금 기운이 났어!',
            grammar_note:'でも: 그래도, 하지만 (역접)',
            key_vocab:['元気(げんき)']
          },
        ],
        reactions:[{ emoji:'😭', count:234 },{ emoji:'💪', count:89 },{ emoji:'🤣', count:156 }],
        comments:[
          { user:'はなこ', text:'わかるー！電車あるあるだよね笑', translation:'공감돼~! 전철 공감이야기지 ㅋㅋ' },
          { user:'たかし', text:'元気出して！', translation:'힘내!' },
        ]
      },
      {
        id:'diary_demo2', author_id:'yuika',
        date_text:'4月1日（火）', title:'推しのライブ最高すぎた！！！', title_ko:'최애 라이브 너무 최고였어!!!',
        mood:{ emoji:'🤩', label:'テンション爆上がり', level:3 },
        difficulty:'N5', tags:['ライブ','推し','幸せ'],
        content:[
          {
            id:'p1',
            text:'今日、ずっと行きたかったライブにやっと行けた！',
            furigana:{ '今日':'きょう' },
            translation:'오늘 계속 가고 싶었던 라이브에 드디어 갔어!',
            grammar_note:'やっと: 드디어, 겨우 (긴 시간 끝에)',
            key_vocab:['やっと']
          },
          {
            id:'p2',
            text:'推しがめちゃかわで、ぴえんだった。最高すぎてエモい…',
            furigana:{},
            translation:'최애가 엄청 귀여워서 눈물 날 것 같았어. 너무 최고라 감성터짐…',
            grammar_note:'推し(おし): 최애 (가장 좋아하는 아이돌/캐릭터)',
            key_vocab:['推し(おし)','ぴえん','エモい']
          },
        ],
        reactions:[{ emoji:'🤩', count:489 },{ emoji:'🎵', count:312 },{ emoji:'💜', count:267 }],
        comments:[
          { user:'りか', text:'いいな！あたしも行きたかった！', translation:'좋겠다! 나도 가고 싶었어!' },
        ]
      },
    ];
  }

  // ─── 진도 기록 ───
  function markCharSeen(kana) {
    if (!state.progress[kana]) state.progress[kana] = { seen: 0, correct: 0, incorrect: 0 };
    state.progress[kana].seen = (state.progress[kana].seen || 0) + 1;
    saveToStorage();
  }

  // 플래시카드 뒷면 열람 = "마스터" 기록 + SRS grade 4 (정답)
  function markCharFlipped(kana) {
    if (!state.progress[kana]) state.progress[kana] = { seen: 0, correct: 0, incorrect: 0 };
    state.progress[kana].flipped = (state.progress[kana].flipped || 0) + 1;
    state.progress[kana] = srsReview(state.progress[kana], 4);
    state.lastStudied = new Date().toISOString();
    saveToStorage();
  }

  // 플래시카드 자가평가: 어려웠음 (grade 3)
  function markCharHard(kana) {
    if (!state.progress[kana]) state.progress[kana] = { seen: 0, correct: 0, incorrect: 0 };
    state.progress[kana] = srsReview(state.progress[kana], 3);
    state.lastStudied = new Date().toISOString();
    saveToStorage();
  }

  // 플래시카드 자가평가: 잊었음/오답 (grade 1)
  function markCharForgot(kana) {
    if (!state.progress[kana]) state.progress[kana] = { seen: 0, correct: 0, incorrect: 0 };
    state.progress[kana].incorrect = (state.progress[kana].incorrect || 0) + 1;
    state.progress[kana] = srsReview(state.progress[kana], 1);
    state.lastStudied = new Date().toISOString();
    saveToStorage();
  }

  function recordResult(kana, isCorrect) {
    if (!state.progress[kana]) state.progress[kana] = { seen: 0, correct: 0, incorrect: 0 };
    if (isCorrect) {
      state.progress[kana].correct = (state.progress[kana].correct || 0) + 1;
    } else {
      state.progress[kana].incorrect = (state.progress[kana].incorrect || 0) + 1;
    }
    state.progress[kana].seen = (state.progress[kana].seen || 0) + 1;
    // SRS 스케줄 업데이트
    state.progress[kana] = srsReview(state.progress[kana], gradeFromResult(isCorrect));
    state.lastStudied = new Date().toISOString();
    saveToStorage();
  }

  // ─── 효과음 (간단한 Web Audio) ───
  function playCorrectSound() {
    try {
      const ac = new AudioContext();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain); gain.connect(ac.destination);
      osc.frequency.setValueAtTime(523, ac.currentTime);
      osc.frequency.setValueAtTime(659, ac.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3);
      osc.start(); osc.stop(ac.currentTime + 0.3);
    } catch (e) {}
  }

  function playWrongSound() {
    try {
      const ac = new AudioContext();
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain); gain.connect(ac.destination);
      osc.frequency.setValueAtTime(300, ac.currentTime);
      osc.frequency.setValueAtTime(200, ac.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3);
      osc.start(); osc.stop(ac.currentTime + 0.3);
    } catch (e) {}
  }

  // ─── 단어 학습 (4·5단계) ───

  // ─── かなマスター: 레벨 선택 패널 ───
  function setupKanaSelectView() {
    const panel = document.getElementById('kana-select-panel');
    if (!panel) return;
    const fa = document.getElementById('flashcard-area');
    const ba = document.getElementById('browse-area');
    if (fa) fa.style.display = 'none';
    if (ba) ba.style.display = 'none';
    // 학습 헤더 숨기기 (선택 화면에서는 불필요)
    const lhdr3 = document.getElementById('learn-header');
    if (lhdr3) lhdr3.style.display = 'none';
    panel.style.display = 'block';
    // 풀카드 그리드 렌더 (이미 렌더됐으면 스킵)
    const grid = document.getElementById('kana-select-grid');
    if (grid) renderFullLevelGrid(grid);
  }

  function setupVocabView() {
    const section = state.vocabSection || 'word';

    // 모드 리셋 (nav 탭으로 이동 시에도 상태 정리)
    state.vocabMode = null;
    state.vocabReadSession = (state.vocabReadSession || 0) + 1; // 진행 중인 ex-read 루프 중단

    // 패널 상태 초기화
    document.getElementById('vocab-setup').style.display = 'block';
    document.getElementById('vocab-flash-panel').style.display = 'none';
    const browseArea = document.getElementById('vocab-browse-area');
    if (browseArea) browseArea.style.display = 'none';
    const dialogueArea = document.getElementById('vocab-dialogue-area');
    if (dialogueArea) dialogueArea.style.display = 'none';
    const wePanel = document.getElementById('word-explorer-panel');
    if (wePanel) wePanel.style.display = 'none';
    const stPanel = document.getElementById('scene-trainer-panel');
    if (stPanel) stPanel.style.display = 'none';
    const vfb = document.getElementById('vocab-flash-back');
    if (vfb) vfb.onclick = vocabBackToSetup;

    // 진도 변경 반영을 위해 카테고리 목록 항상 리셋 (빠른 재렌더)
    ['vocab-word-levels-main', 'vocab-sentence-levels-main', 'vocab-sim-levels-main'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = '';
    });

    // 헤더 제목 + 섹션 표시 전환
    const titleMap = { word: '어휘 마스터', sentence: '회화 마스터', sim: '실전 롤플레이' };
    const titleEl = document.getElementById('vocab-section-title');
    if (titleEl) titleEl.textContent = titleMap[section] || '어휘 마스터';

    ['word', 'sentence', 'sim'].forEach(sec => {
      const el = document.getElementById(`vocab-${sec === 'sentence' ? 'sent' : sec}-section`);
      if (el) el.style.display = sec === section ? 'block' : 'none';
    });

    // 섹션별 daily 미니 카드 표시/숨김
    const vocabDaily = document.getElementById('vocab-daily-item');
    const convoDaily = document.getElementById('convo-daily-convo');
    if (vocabDaily) vocabDaily.style.display = section === 'word' ? '' : 'none';
    if (convoDaily) convoDaily.style.display = section === 'sentence' ? '' : 'none';

    // 해당 섹션 카테고리 렌더
    renderVocabSection(section);
  }

  function renderVocabSection(section) {
    const WORD_LABELS  = {1:'인사·응답', 2:'숫자·날짜', 3:'날짜·시각', 4:'대명사', 5:'기본 동사', 6:'형용사', 7:'장소·음식', 8:'신체·건강', 9:'IT·테크 용어', 10:'비즈니스 일본어'};
    const SENT_LABELS  = {1:'인사·기초', 2:'자기소개', 3:'쇼핑·식당', 4:'교통·이동', 5:'여행·호텔', 6:'일상·긴급'};
    const SIM_LABELS   = {1:'교통편', 2:'식사편', 3:'숙박편', 4:'쇼핑편', 5:'관광·문화', 6:'부부 여행편', 7:'🏢 IT 직장편'};

    if (section === 'word') {
      const wrap = document.getElementById('vocab-word-levels-main');
      if (!wrap || typeof VOCAB_CATEGORIES === 'undefined') return;
      wrap.innerHTML = '';
      const cats = VOCAB_CATEGORIES.filter(c => c.type === 'word');
      const levels = [...new Set(cats.map(c => c.wlevel))].sort((a,b)=>a-b);
      levels.forEach(lv => {
        const lvCats = cats.filter(c => c.wlevel === lv);
        const hdr = document.createElement('div');
        hdr.className = 'vocab-level-header';
        hdr.innerHTML = `<span class="vlh-num">W${lv}</span><span class="vlh-label">${WORD_LABELS[lv]||''}</span>`;
        wrap.appendChild(hdr);
        const grid = document.createElement('div');
        grid.className = 'vocab-cat-grid';
        lvCats.forEach(cat => grid.appendChild(buildVocabCatCard(cat)));
        wrap.appendChild(grid);
      });

    } else if (section === 'sentence') {
      const wrap = document.getElementById('vocab-sentence-levels-main');
      if (!wrap || typeof VOCAB_CATEGORIES === 'undefined') return;
      wrap.innerHTML = '';
      const cats = VOCAB_CATEGORIES.filter(c => c.type === 'sentence');
      const levels = [...new Set(cats.map(c => c.slevel).filter(Boolean))].sort((a,b)=>a-b);
      levels.forEach(lv => {
        const lvCats = cats.filter(c => c.slevel === lv);
        const hdr = document.createElement('div');
        hdr.className = 'vocab-level-header';
        hdr.innerHTML = `<span class="vlh-num">S${lv}</span><span class="vlh-label">${SENT_LABELS[lv]||''}</span>`;
        wrap.appendChild(hdr);
        const grid = document.createElement('div');
        grid.className = 'vocab-cat-grid';
        lvCats.forEach(cat => grid.appendChild(buildVocabCatCard(cat)));
        wrap.appendChild(grid);
      });

    } else if (section === 'sim') {
      const wrap = document.getElementById('vocab-sim-levels-main');
      if (!wrap || typeof VOCAB_CATEGORIES === 'undefined') return;
      wrap.innerHTML = '';
      const cats = VOCAB_CATEGORIES.filter(c => c.type === 'sim');
      const simLevels = [...new Set(cats.map(c => c.simlevel).filter(Boolean))].sort((a,b)=>a-b);
      simLevels.forEach(lv => {
        const lvCats = cats.filter(c => c.simlevel === lv);
        const hdr = document.createElement('div');
        hdr.className = 'vocab-level-header';
        hdr.innerHTML = `<span class="vlh-num">Sim${lv}</span><span class="vlh-label">${SIM_LABELS[lv]||''}</span>`;
        wrap.appendChild(hdr);
        const grid = document.createElement('div');
        grid.className = 'vocab-cat-grid';
        lvCats.forEach(cat => grid.appendChild(buildVocabCatCard(cat)));
        wrap.appendChild(grid);
      });
    }
  }

  function buildHScrollLevelGroup(levelNum, label, cats) {
    const group = document.createElement('div');
    group.className = 'vocab-level-hgroup';
    const title = document.createElement('div');
    title.className = 'vocab-level-hgroup-title';
    title.textContent = label;
    group.appendChild(title);
    const scroll = document.createElement('div');
    scroll.className = 'vocab-level-hscroll';
    cats.forEach(cat => scroll.appendChild(buildVocabHCard(cat)));
    group.appendChild(scroll);
    return group;
  }

  function buildVocabHCard(cat) {
    const prog = getVocabCategoryProgress(cat.id);
    const card = document.createElement('div');
    card.className = 'vocab-hcard';
    const hasLec = (cat.type === 'word' || cat.type === 'sentence' || cat.type === 'sim');
    const isDialogue = !!cat.dialogue;
    card.innerHTML = `
      <div class="vocab-hcard-icon">${cat.icon || ''}</div>
      <div class="vocab-hcard-name">${stripFurigana(cat.name)}</div>
      <div class="vocab-hcard-sub">${stripFurigana(cat.subtitle || '')}</div>
      <div class="vocab-hcard-prog"><div class="vocab-hcard-prog-fill" style="width:${prog}%"></div></div>
      <div class="vocab-hcard-btns">
        ${hasLec ? `<button class="vocab-hcard-btn btn-lec" data-cid="${cat.id}">🎬 강의</button>` : ''}
        ${isDialogue
          ? `<button class="vocab-hcard-btn btn-start" data-cid="${cat.id}">🎭 대화</button>`
          : `<button class="vocab-hcard-btn btn-start" data-cid="${cat.id}">📚 시작</button>`}
        ${!isDialogue ? `<button class="vocab-hcard-btn btn-quiz" data-cid="${cat.id}">✏️ 퀴즈</button>` : ''}
      </div>`;
    if (hasLec) {
      card.querySelector('.btn-lec').addEventListener('click', e => {
        e.stopPropagation();
        startLecture(cat.id);
      });
    }
    const startBtn = card.querySelector('.btn-start');
    if (startBtn) {
      startBtn.addEventListener('click', e => {
        e.stopPropagation();
        const v = cat.type === 'sim' ? 'roleplay' : (cat.type === 'sentence' ? 'convo' : 'vocab');
        showView(v);
        setTimeout(() => startVocabCategory(cat.id, isDialogue ? 'dialogue' : 'flash'), 100);
      });
    }
    const quizBtn = card.querySelector('.btn-quiz');
    if (quizBtn) {
      quizBtn.addEventListener('click', e => {
        e.stopPropagation();
        const v = cat.type === 'sim' ? 'roleplay' : (cat.type === 'sentence' ? 'convo' : 'vocab');
        showView(v);
        setTimeout(() => startVocabCategory(cat.id, 'quiz'), 100);
      });
    }
    return card;
  }

  // 구 phase 기반 렌더 (하위 호환용 — vocab-cat-grid-N 컨테이너가 있으면 채움)
  function renderVocabCategories() {
    [3, 4, 5, 6, 7, 8, 9, 10].forEach(phase => {
      const grid = document.getElementById(`vocab-cat-grid-${phase}`);
      if (!grid) return;
      grid.innerHTML = '';
      VOCAB_CATEGORIES.filter(c => c.phase === phase).forEach(cat => {
        grid.appendChild(buildVocabCatCard(cat));
      });
    });
  }

  // 단어 카드 HTML 생성 (공통)
  function buildVocabCatCard(cat) {
    const prog = getVocabCategoryProgress(cat.id);
    const card = document.createElement('div');
    card.className = 'vocab-cat-card type-' + (cat.type || 'word') + (cat.type === 'sim' ? ' sim-card' : '');

    // 롤플레이(dialogue:true) 카테고리는 별도 버튼
    if (cat.dialogue) {
      card.innerHTML = `
        <div class="vcc-icon">${cat.icon}</div>
        <div class="vcc-name">${stripFurigana(cat.name)}</div>
        <div class="vcc-sub">${stripFurigana(cat.subtitle || '')}</div>
        <div class="vcc-desc">${stripFurigana(cat.desc || '')}</div>
        <div class="vcc-prog-bar"><div class="vcc-prog-fill" style="width:${prog}%"></div></div>
        <div class="vcc-prog-text">${cat.items.length}개 대사</div>
        <div class="vcc-actions">
          <div class="vcc-btn-row">
            <button class="vcc-btn vcc-btn-lecture" data-cid="${cat.id}">${_uiText('강의','講義')}</button>
            <button class="vcc-btn vcc-btn-dialogue" data-cid="${cat.id}">${_uiText('대화','会話')}</button>
          </div>
          <div class="vcc-btn-row">
            <button class="vcc-btn vcc-btn-browse" data-cid="${cat.id}">${_uiText('일람','一覧')}</button>
          </div>
        </div>`;
      card.querySelector('.vcc-btn-lecture').addEventListener('click', (e) => {
        e.stopPropagation();
        startLecture(cat.id);
      });
      card.querySelector('.vcc-btn-dialogue').addEventListener('click', (e) => {
        e.stopPropagation();
        const v = cat.type === 'sim' ? 'roleplay' : (cat.type === 'sentence' ? 'convo' : 'vocab');
        showView(v);
        setTimeout(() => startVocabCategory(cat.id, 'dialogue'), 100);
      });
      card.querySelector('.vcc-btn-browse').addEventListener('click', (e) => {
        e.stopPropagation();
        const v = cat.type === 'sim' ? 'roleplay' : (cat.type === 'sentence' ? 'convo' : 'vocab');
        showView(v);
        setTimeout(() => startVocabCategory(cat.id, 'browse'), 100);
      });
    } else {
      const hasLec = true; // 모든 카테고리에 강의 버튼
      const exploreLabel = cat.type === 'sentence' ? _uiText('연습','練習') : _uiText('탐구','探索');
      card.innerHTML = `
        <div class="vcc-icon">${cat.icon}</div>
        <div class="vcc-name">${stripFurigana(cat.name)}</div>
        <div class="vcc-sub">${stripFurigana(cat.subtitle || '')}</div>
        <div class="vcc-prog-bar"><div class="vcc-prog-fill" style="width:${prog}%"></div></div>
        <div class="vcc-prog-text">${prog}% · ${cat.items.length}개</div>
        <div class="vcc-actions">
          <div class="vcc-btn-row">
            ${hasLec ? `<button class="vcc-btn vcc-btn-lecture" data-cid="${cat.id}">${_uiText('강의','講義')}</button>` : ''}
            <button class="vcc-btn vcc-btn-explore" data-cid="${cat.id}">${exploreLabel}</button>
          </div>
          <div class="vcc-btn-row">
            <button class="vcc-btn vcc-btn-browse" data-cid="${cat.id}">${_uiText('일람','一覧')}</button>
          </div>
        </div>`;
      if (hasLec) {
        card.querySelector('.vcc-btn-lecture').addEventListener('click', e => {
          e.stopPropagation();
          const v = cat.type === 'sentence' ? 'convo' : 'vocab';
          showView(v);
          setTimeout(() => startLecture(cat.id), 100);
        });
      }
      card.querySelector('.vcc-btn-explore').addEventListener('click', (e) => {
        e.stopPropagation();
        const v = cat.type === 'sim' ? 'roleplay' : (cat.type === 'sentence' ? 'convo' : 'vocab');
        showView(v);
        if (cat.type === 'sentence') {
          setTimeout(() => startSceneTrainer(cat.id), 100);
        } else {
          setTimeout(() => startWordExplorer(cat.id), 100);
        }
      });
      card.querySelector('.vcc-btn-browse').addEventListener('click', (e) => {
        e.stopPropagation();
        const v = cat.type === 'sim' ? 'roleplay' : (cat.type === 'sentence' ? 'convo' : 'vocab');
        showView(v);
        setTimeout(() => startVocabCategory(cat.id, 'browse'), 100);
      });
    }
    // 카드 자체 클릭: 버튼이 아니면 이름 읽기만 (네비게이션 없음)
    card.addEventListener('click', (e) => {
      if (e.target.closest('.vcc-btn')) return;
      playAudio(cat.name);
    });
    return card;
  }

  // 레벨 행 생성 (레벨 번호 배지 + 카드 그리드)
  // trackLabel: 'W'/'S' 등 단일 문자 prefix, 또는 '교통편' 같은 완성형 라벨
  function buildLevelRow(levelNum, trackLabel, cats) {
    const row = document.createElement('div');
    row.className = 'vocab-level-row';
    // 완성형 라벨(한국어 등)이면 번호를 붙이지 않음
    const isFull = /[^\x00-\x7F]/.test(trackLabel); // 비ASCII 포함 여부
    const badge = isFull ? trackLabel : `${trackLabel}${levelNum}`;
    const gridId = `vlg-${trackLabel.replace(/\s/g,'')}-${levelNum}`;
    row.innerHTML = `
      <div class="vocab-level-heading">
        <span class="vocab-level-badge">${badge}</span>
        <span class="vocab-level-title">${cats.map(c => stripFurigana(c.name)).join(' · ')}</span>
      </div>
      <div class="vocab-cat-grid" id="${gridId}"></div>`;
    const grid = row.querySelector('.vocab-cat-grid');
    cats.forEach(cat => grid.appendChild(buildVocabCatCard(cat)));
    return row;
  }

  function renderHomeVocabCards() {
    // ── 단어 학습 (W1~W8) ──
    const _wLabels = {1:'인사·응답',2:'숫자·날짜',3:'날짜·시각',4:'대명사·지시어',5:'기본 동사',6:'형용사',7:'장소·음식',8:'신체·건강'};
    const wordContainer = document.getElementById('vocab-word-levels');
    if (wordContainer) {
      wordContainer.innerHTML = '';
      const wordCats = VOCAB_CATEGORIES.filter(c => c.type === 'word');
      const wLevels = [...new Set(wordCats.map(c => c.wlevel))].sort((a,b)=>a-b);
      wLevels.forEach(lv => {
        const cats = wordCats.filter(c => c.wlevel === lv);
        wordContainer.appendChild(buildLevelRow(lv, _wLabels[lv] || `W${lv}`, cats));
      });
    }

    // ── 문장 학습 (S1~S6) ──
    const _sLabels = {1:'인사·기초 회화',2:'자기소개·질문',3:'쇼핑·식당',4:'교통·이동',5:'여행·호텔',6:'일상·긴급'};
    const sentContainer = document.getElementById('vocab-sentence-levels');
    if (sentContainer) {
      sentContainer.innerHTML = '';
      const sentCats = VOCAB_CATEGORIES.filter(c => c.type === 'sentence' || (c.slevel && c.type !== 'sim'));
      const sLevels = [...new Set(sentCats.map(c => c.slevel).filter(Boolean))].sort((a,b)=>a-b);
      sLevels.forEach(lv => {
        const cats = sentCats.filter(c => c.slevel === lv);
        sentContainer.appendChild(buildLevelRow(lv, _sLabels[lv] || `S${lv}`, cats));
      });
    }

    // ── 실전 연습 (교통·식사·숙박·쇼핑·관광 5그룹) ──
    const simContainer = document.getElementById('vocab-sim-levels');
    if (simContainer) {
      simContainer.innerHTML = '';
      const simGroupLabels = {
        1: '교통편', 2: '식사편', 3: '숙박편', 4: '쇼핑편', 5: '관광·문화', 6: '부부 여행편'
      };
      const simCats = VOCAB_CATEGORIES.filter(c => c.type === 'sim');
      const simLevels = [...new Set(simCats.map(c => c.simlevel))].sort((a,b)=>a-b);
      simLevels.forEach(lv => {
        const cats = simCats.filter(c => c.simlevel === lv);
        const label = simGroupLabels[lv] || `Sim ${lv}`;
        simContainer.appendChild(buildLevelRow(lv, label, cats));
      });
    }
  }

  // ─── 오늘의 문장 ───
  const DAILY_SENTENCES = [
    { jp: '今日もいい天気ですね。',       kr: '오늘도 날씨가 좋네요.' },
    { jp: 'ありがとうございます。',        kr: '감사합니다.' },
    { jp: 'すみません、駅はどこですか？', kr: '저기요, 역이 어디인가요?' },
    { jp: 'これをひとつください。',        kr: '이것 하나 주세요.' },
    { jp: 'お会計をお願いします。',        kr: '계산해 주세요.' },
    { jp: '日本語を勉強しています。',      kr: '일본어를 공부하고 있어요.' },
    { jp: 'もう一度言ってください。',      kr: '다시 한 번 말해 주세요.' },
    { jp: '写真を撮ってもいいですか？',    kr: '사진 찍어도 되나요?' },
    { jp: 'おいしいですね！',              kr: '맛있네요!' },
    { jp: 'このあたりに観光地はありますか？', kr: '이 근처에 관광지가 있나요?' },
    { jp: 'トイレはどこですか？',          kr: '화장실이 어디예요?' },
    { jp: '少し待ってください。',          kr: '잠깐 기다려 주세요.' },
    { jp: 'いくらですか？',               kr: '얼마예요?' },
    { jp: 'カードで払えますか？',          kr: '카드로 결제할 수 있나요?' },
    { jp: '迷子になってしまいました。',    kr: '길을 잃어버렸어요.' },
    { jp: '〜まで行ってください。',        kr: '〜까지 가 주세요.' },
    { jp: '日本は初めてですか？',          kr: '일본은 처음이에요?' },
    { jp: 'よい旅を！',                   kr: '좋은 여행 되세요!' },
    { jp: '荷物を預かってもらえますか？',  kr: '짐을 맡아주실 수 있나요?' },
    { jp: 'チェックインをお願いします。',  kr: '체크인 부탁드립니다.' },
    { jp: '何がおすすめですか？',          kr: '뭐가 추천인가요?' },
    { jp: '英語は話せますか？',            kr: '영어를 할 수 있나요?' },
    { jp: '領収書をください。',            kr: '영수증 주세요.' },
    { jp: '電車は何時に来ますか？',        kr: '전철은 몇 시에 오나요?' },
    { jp: '近くにコンビニはありますか？',  kr: '근처에 편의점이 있나요?' },
    { jp: '予約をしたいです。',            kr: '예약을 하고 싶어요.' },
    { jp: '温めてください。',              kr: '데워 주세요.' },
    { jp: 'お土産を探しています。',        kr: '기념품을 찾고 있어요.' },
    { jp: 'バスは何番ですか？',            kr: '버스가 몇 번이에요?' },
    { jp: 'もっとゆっくり話してください。', kr: '좀 더 천천히 말해 주세요.' },
  ];

  let _lastSentenceIdx = -1;
  function renderDailySentence() {
    const el   = document.getElementById('hero-sentence');
    const krEl = document.getElementById('hero-translation');
    if (!el || !krEl) return;
    // 이전과 다른 랜덤 인덱스 선택
    let idx;
    do { idx = Math.floor(Math.random() * DAILY_SENTENCES.length); }
    while (idx === _lastSentenceIdx && DAILY_SENTENCES.length > 1);
    _lastSentenceIdx = idx;
    const s = DAILY_SENTENCES[idx];
    el.textContent = s.jp;
    el.onclick = () => playAudio(s.jp);
    krEl.textContent = s.kr;

    // 새로고침 버튼 연결 (초기 1회만)
    const refreshBtn = document.getElementById('hero-refresh-btn');
    if (refreshBtn && !refreshBtn._bound) {
      refreshBtn._bound = true;
      refreshBtn.onclick = (e) => {
        e.stopPropagation();
        refreshBtn.classList.add('spinning');
        setTimeout(() => refreshBtn.classList.remove('spinning'), 500);
        renderDailySentence();
      };
    }
  }

  function startVocabCategory(catId, mode) {
    trackActivity('vocab', catId);
    const cat = VOCAB_CATEGORIES.find(c => c.id === catId);
    if (!cat) return;
    state.vocabCurrentCategoryId = catId;
    // 데일리 배너 숨기기
    ['vocab-daily-item', 'convo-daily-convo', 'sim-daily-item'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    state.vocabItems = getVocabCategoryItems(catId);
    state.vocabIndex = 0;
    state.vocabFlipped = false;
    state.vocabMode = null;
    // 카테고리 타입에 맞는 섹션 상태 저장 (뒤로가기 복귀용) + nav 하이라이트 동기화
    const typeNavMap = { word: 'vocab', sentence: 'convo', sim: 'roleplay' };
    if (cat.type === 'word')          state.vocabSection = 'word';
    else if (cat.type === 'sentence') state.vocabSection = 'sentence';
    else if (cat.type === 'sim')      state.vocabSection = 'sim';
    const navTarget = typeNavMap[cat.type] || 'vocab';
    state.currentView = navTarget;
    document.querySelectorAll('.nav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.view === navTarget);
    });

    document.getElementById('vocab-cat-name').textContent = `${cat.icon} ${cat.name}`;
    const jlptLv = getJLPT(catId);
    document.getElementById('vocab-cat-subtitle').innerHTML =
      (jlptLv ? jlptBadgeHtml(jlptLv) + ' ' : '') + _escHtml(cat.subtitle || '');

    document.getElementById('vocab-setup').style.display = 'none';
    document.getElementById('vocab-quiz-area').style.display = 'none';
    const browseArea = document.getElementById('vocab-browse-area');
    if (browseArea) browseArea.style.display = 'none';
    const dialogueArea = document.getElementById('vocab-dialogue-area');
    if (dialogueArea) dialogueArea.style.display = 'none';
    const wePanel = document.getElementById('word-explorer-panel');
    if (wePanel) wePanel.style.display = 'none';
    const stPanel = document.getElementById('scene-trainer-panel');
    if (stPanel) stPanel.style.display = 'none';

    const targetMode = mode || (cat.dialogue ? 'dialogue' : (cat.type === 'sentence' ? 'scene' : 'explore'));

    if (targetMode === 'dialogue') {
      state.vocabMode = 'dialogue';
      document.getElementById('vocab-flash-panel').style.display = 'block';
      const learnHdr = document.querySelector('#vocab-flash-panel .learn-header');
      if (learnHdr) learnHdr.style.display = 'none';
      if (dialogueArea) dialogueArea.style.display = 'block';
      renderSimDialogue(cat);
    } else if (targetMode === 'quiz') {
      state.vocabMode = 'quiz';
      document.getElementById('vocab-flash-panel').style.display = 'block';
      const learnHdr = document.querySelector('#vocab-flash-panel .learn-header');
      if (learnHdr) learnHdr.style.display = '';
      document.getElementById('vocab-cat-name').textContent = `${cat.icon} ${cat.name}`;
      document.getElementById('vocab-cat-subtitle').textContent = cat.subtitle || '';
      document.getElementById('vocab-quiz-area').style.display = 'block';
      showVocabQuizIntro();
    } else if (targetMode === 'browse') {
      state.vocabMode = 'browse';
      document.getElementById('vocab-flash-panel').style.display = 'block';
      const learnHdr = document.querySelector('#vocab-flash-panel .learn-header');
      if (learnHdr) learnHdr.style.display = '';
      document.getElementById('vocab-cat-name').textContent = `${cat.icon} ${cat.name}`;
      document.getElementById('vocab-cat-subtitle').textContent = cat.subtitle || '';
      if (browseArea) browseArea.style.display = 'block';
      renderVocabBrowse();
    } else if (targetMode === 'scene') {
      // 회화 마스터 → Scene Trainer
      startSceneTrainer(catId);
    } else {
      // 어휘 마스터 (word 타입) → Word Explorer
      startWordExplorer(catId);
    }
  }

  // ─── 롤플레이 인트로 화면 (음악 10초 + 장소 설명) ───
  async function playDialogueIntro(cat, items, container, duration = 10000) {
    return new Promise(resolve => {
      if (state.audioStopped) { resolve(); return; }

      // 첫 번째 N 아이템에서 장소·장면 설명 추출
      const nItem     = items.find(it => it.speaker === 'N');
      const sceneText = nItem ? nItem.korean : (cat.desc || '');
      const subText   = cat.subtitle || '';

      const intro = document.createElement('div');
      intro.className = 'dlg-intro';
      intro.innerHTML = `
        <div class="dlg-intro-bg"></div>
        <div class="dlg-intro-inner">
          <div class="dlg-intro-icon">${cat.icon || '🎭'}</div>
          <div class="dlg-intro-scene">${sceneText}</div>
          <div class="dlg-intro-title">${cat.name}</div>
          ${subText ? `<div class="dlg-intro-sub">${subText}</div>` : ''}
          <div class="dlg-intro-bar-wrap">
            <div class="dlg-intro-bar"><div class="dlg-intro-progress"></div></div>
          </div>
          <div class="dlg-intro-skip">▶ 클릭하면 바로 시작</div>
        </div>`;
      container.appendChild(intro);

      // 진행바 애니 (duration에 맞춰)
      const progressEl = intro.querySelector('.dlg-intro-progress');
      setTimeout(() => {
        progressEl.style.transition = `width ${duration / 1000}s linear`;
        progressEl.style.width = '100%';
      }, 80);

      const doResolve = () => {
        if (intro._resolved) return;
        intro._resolved = true;
        // 인트로 out 애니메이션 후 완전 제거
        intro.classList.add('dlg-intro-out');
        setTimeout(() => { intro.remove(); }, 600);
        resolve();
      };

      // duration 후 자동 진행
      const tid = setTimeout(doResolve, duration);

      // 클릭하면 즉시 진행
      intro.addEventListener('click', () => { clearTimeout(tid); doResolve(); });
    });
  }

  // ─── 롤플레이 대화 렌더링 ───
  function renderSimDialogue(cat) {
    const dialogueArea = document.getElementById('vocab-dialogue-area');
    const container    = document.getElementById('sim-dialogue-bubbles');
    const playBtn      = document.getElementById('dlg-play-btn');
    if (!container || !dialogueArea) return;

    // 변형이 있으면 랜덤으로 기본 선택, 없으면 기본 items 사용
    const NUM_ICONS = ['①','②','③','④','⑤'];
    let selectedIdx  = cat.variants && cat.variants.length
                       ? Math.floor(Math.random() * cat.variants.length) : -1;
    let items = selectedIdx >= 0
      ? cat.variants[selectedIdx].items.map(id => VOCAB_MAP[id]).filter(Boolean)
      : cat.items.map(id => VOCAB_MAP[id]).filter(Boolean);
    const variant = selectedIdx >= 0
      ? { scene: cat.variants[selectedIdx].scene, idx: selectedIdx + 1, total: cat.variants.length }
      : null;
    const hasSlot1 = hasSpeakerConfigured(1);
    const hasSlot2 = hasSpeakerConfigured(2);
    const slot1Info = buildSlotAvatarHtml(1);
    const slot2Info = buildSlotAvatarHtml(2);

    // ── 스플래시 화면 구성 ──
    container.innerHTML = '';
    if (playBtn) playBtn.style.display = 'none';

    const splash = document.createElement('div');
    splash.className = 'dlg-splash';
    splash.id = 'dlg-splash';

    // 카테고리 제목 + 총 대사 수
    splash.innerHTML = `
      <div class="dlg-splash-title">${cat.icon || '🎭'} ${cat.name}
        <span class="dlg-splash-count">총 ${items.length}개 대사</span>
      </div>
      <div class="dlg-splash-desc">${cat.desc || cat.subtitle || ''}</div>
      <div class="dlg-splash-actors">
        <div class="dlg-actor dlg-actor-A">
          <div class="dlg-actor-avatar">${slot1Info ? slot1Info.avatarHtml : '<div class="vvb-avatar-emoji">👨</div>'}</div>
          <div class="dlg-actor-role">👨 남자</div>
          <div class="dlg-actor-name">${state.prefs.maleName || 'スンヒョン'}</div>
          <div class="dlg-actor-voice">${slot1Info ? slot1Info.name : '기본 TTS'}</div>
        </div>
        <div class="dlg-actor-vs">↔</div>
        <div class="dlg-actor dlg-actor-B">
          <div class="dlg-actor-avatar">${slot2Info ? slot2Info.avatarHtml : '<div class="vvb-avatar-emoji">👩</div>'}</div>
          <div class="dlg-actor-role">👩 여자</div>
          <div class="dlg-actor-name">${state.prefs.femaleName || 'ジュヨン'}</div>
          <div class="dlg-actor-voice">${slot2Info ? slot2Info.name : (hasSlot1 ? '(A와 동일)' : '기본 TTS')}</div>
        </div>
      </div>`;

    // 배경음 토글 버튼 (MP3 파일 있을 때만 표시)
    if (_ambTracks.length) {
      const ambientBar = document.createElement('div');
      ambientBar.className = 'dlg-ambient-bar';
      const _isOn = state.prefs.ambientDialogue === 'on';
      ambientBar.innerHTML = `<span class="dlg-ambient-label">🎵 배경음</span>
        <button class="dlg-amb-chip${_isOn ? ' active' : ''}" id="dlg-amb-toggle">
          ${_isOn ? '🔊 켜짐' : '🔇 꺼짐'}
        </button>`;
      ambientBar.querySelector('#dlg-amb-toggle').onclick = (e) => {
        const btn = e.currentTarget;
        const nowOn = !btn.classList.contains('active');
        btn.classList.toggle('active', nowOn);
        btn.textContent = nowOn ? '🔊 켜짐' : '🔇 꺼짐';
        state.prefs.ambientDialogue = nowOn ? 'on' : 'none';
        saveToStorage();
      };
      splash.appendChild(ambientBar);
    }

    // ── 시나리오 선택 칩 (변형이 2개 이상인 경우) ──
    if (cat.variants && cat.variants.length > 1) {
      const selectorDiv = document.createElement('div');
      selectorDiv.className = 'dlg-variant-selector';
      const label = document.createElement('div');
      label.className = 'dlg-vs-label';
      label.textContent = '🎲 시나리오 선택';
      selectorDiv.appendChild(label);
      const chipsRow = document.createElement('div');
      chipsRow.className = 'dlg-vs-chips';
      cat.variants.forEach((v, i) => {
        const chip = document.createElement('button');
        chip.className = 'dlg-vs-chip' + (i === selectedIdx ? ' active' : '');
        chip.textContent = `${NUM_ICONS[i] || (i+1)} ${v.scene}`;
        chip.onclick = () => {
          chipsRow.querySelectorAll('.dlg-vs-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          selectedIdx = i;
          items = cat.variants[i].items.map(id => VOCAB_MAP[id]).filter(Boolean);
        };
        chipsRow.appendChild(chip);
      });
      selectorDiv.appendChild(chipsRow);
      splash.appendChild(selectorDiv);
    }

    // 음성 미설정 경고
    if (!hasSlot1) {
      const warn = document.createElement('div');
      warn.className = 'dlg-splash-warn';
      warn.innerHTML = `⚠️ 음성이 설정되지 않았습니다.<br>설정에서 음성을 선택하면 각 화자에게 다른 목소리가 할당됩니다.
        <br><button class="dlg-settings-btn" id="dlg-open-settings">⚙️ 설정 열기</button>`;
      splash.appendChild(warn);
    } else if (!hasSlot2) {
      const note = document.createElement('div');
      note.className = 'dlg-splash-note';
      note.textContent = '💡 두 번째 음성이 없으면 A/B 모두 같은 목소리로 재생됩니다.';
      splash.appendChild(note);
    }

    // ── 스크립트 미리보기 (접기/펼치기) ──
    const preview = document.createElement('details');
    preview.className = 'dlg-preview';
    const previewSummary = document.createElement('summary');
    previewSummary.className = 'dlg-preview-toggle';
    previewSummary.textContent = `📜 스크립트 미리보기`;
    preview.appendChild(previewSummary);
    const previewList = document.createElement('div');
    previewList.className = 'dlg-preview-list';
    const MAX_PREVIEW = 40;
    items.slice(0, MAX_PREVIEW).forEach(item => {
      if (!item) return;
      const row = document.createElement('div');
      row.className = `dlg-preview-row dlg-preview-${item.speaker || 'N'}`;
      const spkrIcon = item.speaker === 'N' ? '🎬' : item.speaker === 'C' ? '🧑' : item.speaker === 'B' ? '💭' : '💬';
      const jpText = resolveNames(item.japanese || item.jp || '');
      const krText = resolveNames(item.korean  || item.kr  || '');
      row.innerHTML = `<span class="dlg-preview-spkr">${spkrIcon}</span><span class="dlg-preview-jp">${jpText}</span>`;
      if (krText) {
        const kr = document.createElement('div');
        kr.className = 'dlg-preview-kr';
        kr.textContent = krText;
        row.appendChild(kr);
      }
      previewList.appendChild(row);
    });
    if (items.length > MAX_PREVIEW) {
      const more = document.createElement('div');
      more.className = 'dlg-preview-more';
      more.textContent = `… +${items.length - MAX_PREVIEW}개`;
      previewList.appendChild(more);
    }
    preview.appendChild(previewList);
    splash.appendChild(preview);

    // ── 버튼 행: 목록 + 시작 ──
    const btnRow = document.createElement('div');
    btnRow.className = 'dlg-splash-btn-row';
    const listBtn = document.createElement('button');
    listBtn.className = 'dlg-list-btn';
    listBtn.textContent = '☰ 목록';
    listBtn.addEventListener('click', () => {
      showView('roleplay');
    });
    const startBtn = document.createElement('button');
    startBtn.className = 'dlg-start-btn';
    startBtn.textContent = '▶ 시작';
    btnRow.appendChild(listBtn);
    btnRow.appendChild(startBtn);
    splash.appendChild(btnRow);

    container.appendChild(splash);

    const backBtn = null; // 스플래시 내 별도 뒤로 버튼 제거 — dlg-controls 내 #dlg-back-btn 사용

    // ── 화자 선택 드롭다운 (스플래시 화면 내 인라인 변경) ──
    function refreshActorDisplay(slotNum) {
      const sel = slotNum === 1 ? '.dlg-actor-A' : '.dlg-actor-B';
      const actorEl = splash.querySelector(sel);
      if (!actorEl) return;
      const newInfo = buildSlotAvatarHtml(slotNum);
      const avatarEl = actorEl.querySelector('.dlg-actor-avatar');
      const nameEl   = actorEl.querySelector('.dlg-actor-name');
      if (avatarEl) avatarEl.innerHTML = newInfo
        ? newInfo.avatarHtml
        : (slotNum === 1 ? '<div class="vvb-avatar-emoji">🔊</div>' : '<div class="vvb-avatar-emoji">🎙️</div>');
      if (nameEl) nameEl.textContent = newInfo ? newInfo.name : (slotNum === 1 ? '기본 TTS' : '(미설정)');
      updateActiveSpeakerBadge();
    }

    function buildSplashSpeakerPicker(slotNum) {
      const sel = slotNum === 1 ? '.dlg-actor-A' : '.dlg-actor-B';
      const actorEl = splash.querySelector(sel);
      if (!actorEl) return;
      const useVV = state.prefs.useVoicevox && voicevoxAvailable;
      const picker = document.createElement('select');
      picker.className = 'dlg-speaker-pick';

      if (useVV && voicevoxSpeakers.length) {
        const curId = slotNum === 1 ? state.prefs.voicevoxSpeaker1 : state.prefs.voicevoxSpeaker2;
        if (slotNum === 2) {
          const nOpt = document.createElement('option');
          nOpt.value = 'none'; nOpt.textContent = '— 사용 안함 —';
          if (curId === 'none') nOpt.selected = true;
          picker.appendChild(nOpt);
        }
        voicevoxSpeakers.forEach(sp => {
          const opt = document.createElement('option');
          opt.value = sp.id; opt.textContent = sp.name;
          if (String(sp.id) === String(curId)) opt.selected = true;
          picker.appendChild(opt);
        });
        picker.onchange = () => {
          const val = picker.value === 'none' ? 'none' : parseInt(picker.value);
          if (slotNum === 1) state.prefs.voicevoxSpeaker1 = val;
          else               state.prefs.voicevoxSpeaker2 = val;
          saveToStorage();
          refreshActorDisplay(slotNum);
        };
      } else if (allJaVoices.length) {
        const curV = slotNum === 1 ? state.prefs.voiceFemale : state.prefs.voiceMale;
        const nOpt = document.createElement('option');
        nOpt.value = 'none'; nOpt.textContent = '— 사용 안함 —';
        if (!curV || curV === 'none') nOpt.selected = true;
        picker.appendChild(nOpt);
        allJaVoices.forEach((v, i) => {
          const opt = document.createElement('option');
          opt.value = String(i); opt.textContent = getVoiceDisplayName(v);
          if (String(i) === String(curV)) opt.selected = true;
          picker.appendChild(opt);
        });
        picker.onchange = () => {
          if (slotNum === 1) state.prefs.voiceFemale = picker.value;
          else               state.prefs.voiceMale   = picker.value;
          saveToStorage();
          refreshActorDisplay(slotNum);
        };
      } else {
        return; // 선택할 화자 없음
      }
      actorEl.appendChild(picker);
    }
    buildSplashSpeakerPicker(1);
    buildSplashSpeakerPicker(2);

    // 설정 열기 버튼
    const settingsBtn = splash.querySelector('#dlg-open-settings');
    if (settingsBtn) {
      settingsBtn.onclick = () => {
        document.getElementById('settings-modal').style.display = 'flex';
      };
    }

    // 스플래시 중 대화 컨트롤 버튼 숨김 (스플래시 내 목록 버튼 사용)
    const ctrlListBtnInit = document.getElementById('dlg-back-btn');
    const nextBtn = document.getElementById('dlg-next-btn');
    if (ctrlListBtnInit) ctrlListBtnInit.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';

    // 시작 버튼 → 인트로 10초 → 인트로 컴팩트 헤더로 전환 → 대화 시작
    startBtn.onclick = async () => {
      splash.remove();
      container.innerHTML = '';
      state.audioStopped = false;

      // 목록 버튼: 롤플레이 목록으로 이동
      const ctrlListBtn = document.getElementById('dlg-back-btn');
      if (ctrlListBtn) {
        ctrlListBtn.style.display = '';
        ctrlListBtn.textContent = '☰ 목록';
        ctrlListBtn.onclick = () => {
          state.audioStopped = true;
          stopAmbient(1.5, false);
          if (nextBtn) { clearInterval(nextBtn._timer); nextBtn.style.display = 'none'; }
          ctrlListBtn.style.display = 'none';
          showView('roleplay');
        };
      }
      if (playBtn) playBtn.style.display = '';
      if (nextBtn) nextBtn.style.display = 'none';

      // 1) 배경음 시작
      startAmbient(state.prefs.ambientDialogue || 'none');

      // 2) 인트로 화면 (최대 10초, 클릭 시 스킵) → 끝나면 컴팩트 헤더로 잔류
      await playDialogueIntro(cat, items, container);
      if (state.audioStopped) return;

      // 3) 배경음 40%로 축소 + 인트로 헤더 아래 바로 대화 시작 (컨테이너 유지)
      enterDialogueMode();
      playDialogueSequence(items, container, cat);
    };
  }

  // ─── 대화 순차 애니메이션 재생 ───
  async function playDialogueSequence(items, container, cat) {
    if (!container) container = document.getElementById('sim-dialogue-bubbles');
    state.audioStopped = false;

    // 재생 버튼 → 중지 버튼으로 전환
    const playBtn = document.getElementById('dlg-play-btn');
    if (playBtn) {
      playBtn.textContent = '⏹ 중지';
      playBtn.onclick = () => {
        state.audioStopped = true;
        setTtsPaused(false);   // 일시정지 중이어도 완전 중지
        window.speechSynthesis?.cancel();
        if (state.currentVvAudio) { state.currentVvAudio.pause(); state.currentVvAudio = null; }
        const hint = document.querySelector('#vv-active-badge .vvb-hint');
        if (hint) hint.textContent = '⏸ 클릭하여 일시정지';
        if (playBtn) {
          playBtn.textContent = '▶ 다시 재생';
          playBtn.onclick = () => {
            const nb2 = document.getElementById('dlg-next-btn');
            if (nb2 && nb2._timer) { clearInterval(nb2._timer); nb2._timer = null; }
            if (nb2) nb2.style.display = 'none';
            container.innerHTML = '';
            state.audioStopped = false;
            startAmbient(state.prefs.ambientDialogue || 'none');
            setTimeout(() => enterDialogueMode(), 400);
            playDialogueSequence(items, container, cat);
          };
        }
        // 중지 후 다른 롤플레이 이동 버튼 (자동 이동 없음)
        const nextBtnStop = document.getElementById('dlg-next-btn');
        if (nextBtnStop && typeof VOCAB_CATEGORIES !== 'undefined') {
          const simCats2 = VOCAB_CATEGORIES.filter(c => c.type === 'sim' && c.dialogue && c.id !== (cat && cat.id));
          if (simCats2.length > 0) {
            const randCat2 = simCats2[Math.floor(Math.random() * simCats2.length)];
            nextBtnStop.textContent = `다른 롤플레이 이동 ▶`;
            nextBtnStop.style.display = '';
            nextBtnStop.onclick = () => {
              if (nextBtnStop._timer) { clearInterval(nextBtnStop._timer); nextBtnStop._timer = null; }
              nextBtnStop.style.display = 'none';
              App.startVocabCategory(randCat2.id, 'dialogue');
            };
          }
        }
      };
    }

    for (const item of items) {
      if (state.audioStopped) break;
      if (!item) continue;

      // ── 일시정지 대기 (재개될 때까지 100ms 폴링) ──
      while (_ttsPaused && !state.audioStopped) {
        await new Promise(r => setTimeout(r, 100));
      }
      if (state.audioStopped) break;

      const speaker = item.speaker || 'A';

      // 장면 설명 (N) — 즉시 표시, 짧은 대기
      if (speaker === 'N') {
        const el = document.createElement('div');
        el.className = 'dlg-scene dlg-appear-n';
        el.textContent = resolveNames(item.korean) || '';
        container.appendChild(el);
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await new Promise(r => setTimeout(r, 900));
        continue;
      }

      // A / B / C 말풍선 생성 (초기엔 숨김)
      const wrapper = document.createElement('div');
      wrapper.className = `dlg-row dlg-row-${speaker}`;
      wrapper.style.opacity = '0';

      const badge = document.createElement('div');
      badge.className = `dlg-badge dlg-badge-${speaker}`;

      // 배지에 아바타 이미지 포함 (C는 아바타 없이 텍스트만)
      const dlgSlot = speaker === 'A' ? 1 : speaker === 'B' ? 2 : 3;
      const avatarInfo = dlgSlot < 3 ? buildSlotAvatarHtml(dlgSlot) : null;
      // A=남자(maleName), B=여자(femaleName), C=직원
      const speakerLabel = speaker === 'A'
        ? (state.prefs.maleName   || 'スンヒョン')
        : speaker === 'B'
        ? (state.prefs.femaleName || 'ジュヨン')
        : '직원';
      if (avatarInfo) {
        badge.innerHTML = `${avatarInfo.avatarHtml}<span class="dlg-badge-name">${speakerLabel}</span>`;
      } else {
        badge.innerHTML = `<span class="dlg-badge-name">${speaker === 'A' ? '나 (A)' : speaker === 'B' ? '상대방 (B)' : '🧑 주변인'}</span>`;
      }

      const bubble = document.createElement('div');
      bubble.className = `dlg-bubble dlg-bubble-${speaker}`;

      const jpResolved = resolveNames(item.japanese);
      const krResolved = resolveNames(item.korean);
      if (jpResolved) {
        const slot = dlgSlot;
        const jpRow = document.createElement('div');
        jpRow.className = 'dlg-jp-row';
        const jpEl = document.createElement('div');
        jpEl.className = 'dlg-jp';
        jpEl.textContent = jpResolved;
        const replayBtn = document.createElement('button');
        replayBtn.className = 'dlg-replay-btn';
        replayBtn.innerHTML = '🔊';
        replayBtn.title = '다시 듣기';
        // TTS는 원본 japanese 텍스트 사용 (이름은 TTS에서 그대로 읽힘)
        replayBtn.addEventListener('click', (e) => { e.stopPropagation(); playAudioSlot(jpResolved, slot); });
        jpRow.appendChild(jpEl);
        jpRow.appendChild(replayBtn);
        bubble.appendChild(jpRow);
      }
      // english 번역 우선, 없으면 romaji 표시
      const subText = item.english || item.romaji;
      if (subText) {
        const roEl = document.createElement('div');
        roEl.className = item.english ? 'dlg-english' : 'dlg-romaji';
        roEl.textContent = resolveNames(subText);
        bubble.appendChild(roEl);
      }
      if (krResolved) {
        const krEl = document.createElement('div');
        krEl.className = 'dlg-kr';
        krEl.textContent = krResolved;
        bubble.appendChild(krEl);
      }
      if (item.tip) {
        const tipEl = document.createElement('div');
        tipEl.className = 'dlg-tip';
        tipEl.textContent = '💡 ' + resolveNames(item.tip);
        bubble.appendChild(tipEl);
      }

      wrapper.appendChild(badge);
      wrapper.appendChild(bubble);
      container.appendChild(wrapper);

      // 등장 애니메이션
      requestAnimationFrame(() => {
        wrapper.style.opacity = '';
        wrapper.classList.add(`dlg-appear-${speaker.toLowerCase()}`);
        // 새 말풍선이 보이도록 부드럽게 스크롤 (center: 다음 공간을 미리 보이게)
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });

      // 발화 중 하이라이트
      bubble.classList.add('dlg-speaking');
      if (item.japanese && !state.audioStopped) {
        await playAudioSlot(resolveNames(item.japanese), dlgSlot);
      }
      bubble.classList.remove('dlg-speaking');
      bubble.classList.add('dlg-done');

      // 말풍선 간 간격
      await new Promise(r => setTimeout(r, 400));
    }

    // 재생 완료 → 다시 재생 버튼 전환 + 다른 롤플레이 이동 5초 카운트다운
    if (!state.audioStopped && playBtn) {
      playBtn.textContent = '🔄 다시 재생';
      playBtn.onclick = () => {
        // 카운트다운 타이머 정리
        const nb = document.getElementById('dlg-next-btn');
        if (nb && nb._timer) { clearInterval(nb._timer); nb._timer = null; }
        if (nb) nb.style.display = 'none';
        container.innerHTML = '';
        state.audioStopped = false;
        startAmbient(state.prefs.ambientDialogue || 'none');
        setTimeout(() => enterDialogueMode(), 400);
        playDialogueSequence(items, container, cat);
      };

      // ── 다른 롤플레이 이동 버튼 (자동 이동 없음) ──
      const nextBtn = document.getElementById('dlg-next-btn');
      if (nextBtn) {
        const simCats = (typeof VOCAB_CATEGORIES !== 'undefined')
          ? VOCAB_CATEGORIES.filter(c => c.type === 'sim' && c.dialogue && c.id !== cat.id)
          : [];
        if (simCats.length > 0) {
          const randCat = simCats[Math.floor(Math.random() * simCats.length)];
          nextBtn.textContent = `다른 롤플레이 이동 ▶`;
          nextBtn.style.display = '';
          nextBtn.onclick = () => {
            if (nextBtn._timer) { clearInterval(nextBtn._timer); nextBtn._timer = null; }
            nextBtn.style.display = 'none';
            if (playBtn) playBtn.style.display = 'none';
            App.startVocabCategory(randCat.id, 'dialogue');
          };
        }
      }

      // 대화 완료 후 — 시나리오 선택 패널 표시
      if (cat && cat.variants && cat.variants.length > 1) {
        const endPanel = document.createElement('div');
        endPanel.className = 'dlg-end-panel';
        endPanel.innerHTML = '<div class="dlg-end-title">📋 다른 시나리오 재생</div>';
        const NUM_ICONS = ['①','②','③','④','⑤'];
        cat.variants.forEach((v, i) => {
          const btn = document.createElement('button');
          btn.className = 'dlg-vs-chip';
          btn.textContent = `${NUM_ICONS[i] || (i+1)} ${v.scene}`;
          btn.onclick = () => {
            container.innerHTML = '';
            state.audioStopped = false;
            const newItems = v.items.map(id => VOCAB_MAP[id]).filter(Boolean);
            startAmbient(state.prefs.ambientDialogue || 'none');
            // 5초 인트로 화면 후 대화 시작
            const variantCat = Object.assign({}, cat, { name: v.scene || cat.name });
            playDialogueIntro(variantCat, newItems, container, 5000).then(() => {
              if (state.audioStopped) return;
              enterDialogueMode();
              playDialogueSequence(newItems, container, cat);
            });
          };
          endPanel.appendChild(btn);
        });
        container.appendChild(endPanel);
        endPanel.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }

      // 대화 완료 후 3초 → 배경음 볼륨업 + 페이드아웃
      setTimeout(() => exitDialogueMode(), 3000);
    }
  }

  function renderVocabBrowseGrid(items) {
    const browseGrid = document.getElementById('vocab-browse-grid');
    if (!browseGrid) return;
    browseGrid.innerHTML = '';
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'vb-item';
      el.innerHTML = `
        <div class="vb-jp">${item.kanji ? formatKanjiWithHint(item.kanji, item.japanese) : _escHtml(item.japanese || '')}</div>
        <div class="vb-korean">${item.korean || ''}</div>`;
      el.addEventListener('click', () => {
        playAudio(item.japanese || item);
        markVocabSeen(item.id);
      });
      browseGrid.appendChild(el);
    });
  }

  function renderVocabBrowse() {
    state.vocabBrowseRandom = false;
    renderVocabBrowseGrid(state.vocabItems);

    // 정렬 버튼 (초기 상태 리셋)
    const orderBtn = document.getElementById('vbc-order-btn');
    const randomBtn = document.getElementById('vbc-random-btn');
    if (orderBtn) orderBtn.classList.add('bc-active');
    if (randomBtn) randomBtn.classList.remove('bc-active');
    if (orderBtn) orderBtn.onclick = () => {
      state.vocabBrowseRandom = false;
      orderBtn.classList.add('bc-active');
      if (randomBtn) randomBtn.classList.remove('bc-active');
      renderVocabBrowseGrid(state.vocabItems);
    };
    if (randomBtn) randomBtn.onclick = () => {
      state.vocabBrowseRandom = true;
      randomBtn.classList.add('bc-active');
      if (orderBtn) orderBtn.classList.remove('bc-active');
      renderVocabBrowseGrid([...state.vocabItems].sort(() => Math.random() - 0.5));
    };

    // 전체 듣기 버튼
    const readallBtn = document.getElementById('vbc-readall-btn');
    if (readallBtn) readallBtn.onclick = () => {
      if (state.isReadingAll) {
        stopAllAudio();
      } else {
        const items = state.vocabBrowseRandom
          ? [...state.vocabItems].sort(() => Math.random() - 0.5)
          : state.vocabItems;
        startVocabReadAll(items);
      }
    };

    // 플래시카드/퀴즈 버튼
    // 슬라이드쇼 버튼
    const slideshowBtn = document.getElementById('vbc-slideshow-btn');
    if (slideshowBtn) slideshowBtn.onclick = () => {
      const items = state.vocabBrowseRandom
        ? [...state.vocabItems].sort(() => Math.random() - 0.5)
        : state.vocabItems;
      startVocabSlideshow(items);
    };
  }

  function startVocabSlideshow(items) {
    if (!items || !items.length) return;
    stopAllAudio();
    const panel = document.getElementById('vbc-slideshow-panel');
    const grid  = document.getElementById('vocab-browse-grid');
    if (!panel) return;
    panel.style.display = 'block';
    if (grid) grid.style.display = 'none';

    let idx = 0;
    let paused = false;
    let stopped = false;
    let timer = null;
    const intervalSel = document.getElementById('vbc-interval-select');
    const getMs = () => ((intervalSel ? parseInt(intervalSel.value) : 3) * 1000);

    const countEl  = document.getElementById('vbc-ss-count');
    const mainEl   = document.getElementById('vbc-ss-main');
    const hintEl   = document.getElementById('vbc-ss-hint');
    const revealEl = document.getElementById('vbc-ss-reveal');
    const korEl    = document.getElementById('vbc-ss-korean');
    const fillEl   = document.getElementById('vbc-ss-countdown-fill');
    const playBtn  = document.getElementById('vbc-ss-play');
    const stopBtn  = document.getElementById('vbc-ss-stop');
    const prevBtn  = document.getElementById('vbc-ss-prev');
    const nextBtn  = document.getElementById('vbc-ss-next');

    function _fitSsFont(el) {
      if (!el) return;
      // ruby 태그를 제외한 순수 텍스트 길이로 계산
      const text = el.textContent || '';
      const len = text.replace(/\s/g,'').length;
      let fs;
      if      (len <= 1)  fs = 100;
      else if (len <= 3)  fs = 80;
      else if (len <= 6)  fs = 60;
      else if (len <= 10) fs = 44;
      else if (len <= 16) fs = 34;
      else                fs = 26;
      // 부모 너비 기준으로 실제 맞춤
      const parent = el.parentElement;
      if (parent) {
        const maxW = parent.offsetWidth - 24;
        el.style.fontSize = fs + 'px';
        el.style.whiteSpace = 'nowrap';
        let tries = 0;
        while (el.scrollWidth > maxW && fs > 14 && tries < 30) {
          fs -= 2; el.style.fontSize = fs + 'px'; tries++;
        }
      } else {
        el.style.fontSize = fs + 'px';
      }
      el.style.whiteSpace = len > 8 ? 'normal' : 'nowrap';
    }

    function showSlide() {
      if (stopped) return;
      const item = items[idx];
      if (!item) return;
      if (countEl)  countEl.textContent = `${idx + 1} / ${items.length}`;
      // 한자+후리가나 형태로 표시
      let display, displayHtml;
      if (item.kanji) {
        const cleanKanji = stripFurigana(item.kanji);
        const reading = item.japanese || '';
        // 漢字(ふりがな) 형태면 ruby로 표시
        const rubyMatch = item.kanji.match(/^([^\（\(]+)[（\(]([^）\)]+)[）\)]/);
        if (rubyMatch) {
          displayHtml = `<ruby>${_escHtml(rubyMatch[1])}<rt>${_escHtml(rubyMatch[2])}</rt></ruby>`;
          display = cleanKanji;
        } else {
          // 한자만 있고 reading이 별도이면 ruby
          displayHtml = `<ruby>${_escHtml(cleanKanji)}<rt>${_escHtml(reading)}</rt></ruby>`;
          display = cleanKanji;
        }
      } else {
        display = item.japanese || '';
        displayHtml = _escHtml(display);
      }
      if (mainEl) {
        mainEl.innerHTML = displayHtml;
        requestAnimationFrame(() => _fitSsFont(mainEl));
      }
      if (hintEl)   hintEl.textContent = '읽어보세요 ↑';
      if (revealEl) { revealEl.style.opacity = '0'; revealEl.style.transition = 'none'; }
      if (korEl)    korEl.textContent = item.korean || '';
      playAudio(item.japanese || '');
      if (fillEl) {
        fillEl.style.transition = 'none';
        fillEl.style.width = '100%';
        requestAnimationFrame(() => {
          fillEl.style.transition = `width ${getMs()}ms linear`;
          fillEl.style.width = '0%';
        });
      }
      setTimeout(() => {
        if (hintEl)   hintEl.textContent = '';
        if (revealEl) { revealEl.style.transition = 'opacity 0.3s'; revealEl.style.opacity = '1'; }
      }, getMs() / 2);
    }

    function scheduleNext() {
      clearTimeout(timer);
      if (paused || stopped) return;
      timer = setTimeout(() => {
        if (stopped) return;
        idx = (idx + 1) % items.length;
        showSlide();
        scheduleNext();
      }, getMs());
    }

    function stop() {
      stopped = true;
      paused = true;
      clearTimeout(timer);
      // TTS 취소
      try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch(e) {}
      if (state.currentVvAudio) {
        try { state.currentVvAudio.pause(); state.currentVvAudio.src = ''; } catch(e) {}
        state.currentVvAudio = null;
      }
      panel.style.display = 'none';
      if (grid) { grid.style.display = 'grid'; }
    }

    if (playBtn) playBtn.onclick = () => {
      paused = !paused;
      playBtn.textContent = paused ? '▶ 재개' : '⏸ 일시정지';
      if (!paused) { showSlide(); scheduleNext(); } else clearTimeout(timer);
    };
    if (stopBtn) stopBtn.onclick = stop;
    if (prevBtn) prevBtn.onclick = () => {
      clearTimeout(timer); idx = (idx - 1 + items.length) % items.length;
      showSlide(); if (!paused) scheduleNext();
    };
    if (nextBtn) nextBtn.onclick = () => {
      clearTimeout(timer); idx = (idx + 1) % items.length;
      showSlide(); if (!paused) scheduleNext();
    };

    showSlide();
    scheduleNext();
  }

  function startVocabReadAll(items) {
    stopAllAudio();
    state.isReadingAll = true;
    const btn = document.getElementById('vbc-readall-btn');
    if (btn) { btn.textContent = '⏹ 중지'; btn.classList.add('bc-active'); }
    const fab = document.getElementById('stop-audio-fab');
    if (fab) fab.style.display = 'flex';

    const hasDual = hasSpeakerConfigured(2);
    let i = 0;
    function next() {
      if (!state.isReadingAll || i >= items.length) {
        if (i >= items.length) showToast(hasDual ? '번갈아 듣기 완료! ✓' : '전체 듣기 완료! ✓');
        stopAllAudio();
        return;
      }
      const slot = hasDual ? (i % 2 === 0 ? 1 : 2) : 1;
      playAudioSlot(items[i].japanese || items[i], slot).then(() => {
        i++;
        if (state.isReadingAll) state.readAllTimer = setTimeout(next, 400);
      });
    }
    next();
  }

  function getVocabCategoryProgress(catId) {
    const cat = VOCAB_CATEGORIES.find(c => c.id === catId);
    if (!cat || !cat.items.length) return 0;
    const mastered = cat.items.filter(id => isVocabItemMastered(id)).length;
    return Math.round((mastered / cat.items.length) * 100);
  }

  function isVocabItemMastered(id) {
    const p = state.vocabProgress[id];
    if (!p || p.correct < 3) return false;
    const total = (p.correct || 0) + (p.incorrect || 0);
    return total > 0 && (p.correct / total) >= 0.75;
  }

  // ─── 단어 플래시카드 ───

  // 텍스트가 한 줄에 맞도록 폰트 크기 자동 조정 (절대 두 줄로 나오지 않음)
  function fitVocabText(el, defaultSize) {
    // 측정 중 CSS transition 비활성화
    el.style.transition = 'none';
    // 항상 한 줄 유지
    el.style.whiteSpace = 'nowrap';
    el.style.wordBreak = 'normal';
    el.style.overflowX = 'hidden';
    el.style.lineHeight = '1';
    el.style.textAlign = 'center';
    el.style.padding = '0 28px';

    const container = document.getElementById('vocab-flashcard');
    const maxW = (container ? container.offsetWidth : 620) - 80;

    // 이진 탐색으로 최대 폰트 크기 결정 (최소 12px, 최대 defaultSize)
    let lo = 12, hi = defaultSize, best = lo;
    el.style.fontSize = hi + 'px';
    if (el.scrollWidth <= maxW) {
      best = hi;
    } else {
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        el.style.fontSize = mid + 'px';
        if (el.scrollWidth <= maxW) {
          best = mid;
          lo = mid + 1;
        } else {
          hi = mid - 1;
        }
      }
      el.style.fontSize = best + 'px';
    }
    // 측정 완료 후 transition 복원
    requestAnimationFrame(() => { el.style.transition = ''; });
  }

  // 문장 내 사용된 단어 추출 (VOCAB_ITEMS 역탐색)
  function extractUsedWords(sentence) {
    if (!sentence || typeof VOCAB_ITEMS === 'undefined') return [];
    const results = [];
    const seen = new Set();
    VOCAB_ITEMS.forEach(item => {
      const jp = item.japanese.replace(/[〜～]/g, '');
      if (jp.length >= 2 && sentence.includes(jp) && !seen.has(item.id)) {
        seen.add(item.id);
        results.push(item);
      }
    });
    return results.slice(0, 6); // 최대 6개
  }

  // 같은 카테고리의 다른 항목 2개 가져오기 (유사 예문)
  function getSimilarItems(currentItem, count = 2) {
    return state.vocabItems
      .filter(it => it.id !== currentItem.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }

  // ─── 한자 + 읽기: 괄호 포맷 ───
  // kanji="喫煙所", japanese="きつえんじょ"  → "喫煙所(きつえんじょ)"
  // kanji="喫煙所はどこ", japanese="きつえんじょはどこ" → "喫煙所(きつえんじょ)はどこ"
  function formatWithFurigana(kanji, japanese) {
    if (!kanji || kanji === japanese) return _escHtml(kanji || japanese || '');
    const isKanjiChar = c => /[\u4e00-\u9faf\u3400-\u4dbf]/.test(c);
    const kanjiCount = [...kanji].filter(isKanjiChar).length;
    if (kanjiCount === 0) return _escHtml(kanji);
    // 이미 （よみ） 포맷이면 ruby로 변환
    const preMatch = kanji.match(/^([^\（\(]+)[（\(]([^）\)]+)[）\)]/);
    if (preMatch) {
      return `<ruby>${_escHtml(preMatch[1])}<rt>${_escHtml(preMatch[2])}</rt></ruby>`;
    }
    // 순수 한자 문자열
    if (/^[\u4e00-\u9faf\u3400-\u4dbf]+$/.test(kanji)) {
      return `<ruby>${_escHtml(kanji)}<rt>${_escHtml(japanese)}</rt></ruby>`;
    }
    // 한자 + 후속 가나(okurigana) 분리
    const mixedMatch = kanji.match(/^([\u4e00-\u9faf\u3400-\u4dbf]+)([\u3040-\u30ff\uff65-\uff9f].*)$/);
    if (mixedMatch) {
      const kj = mixedMatch[1];
      const oku = mixedMatch[2] || '';
      if (oku && japanese.endsWith(oku)) {
        const kjReading = japanese.slice(0, japanese.length - oku.length);
        return `<ruby>${_escHtml(kj)}<rt>${_escHtml(kjReading)}</rt></ruby>${_escHtml(oku)}`;
      }
      return `<ruby>${_escHtml(kj)}<rt>${_escHtml(japanese)}</rt></ruby>${_escHtml(oku)}`;
    }
    return `<ruby>${_escHtml(kanji)}<rt>${_escHtml(japanese)}</rt></ruby>`;
  }

  // 한자 + 히라가나를 ruby HTML로 반환 (플래시카드 외 영역용)
  function formatKanjiWithHint(kanji, japanese) {
    if (!kanji || kanji === japanese) return _escHtml(kanji || japanese || '');
    // 이미 （よみ） 포맷이면 ruby로 변환
    const preMatch = kanji.match(/^([^\（\(]+)[（\(]([^）\)]+)[）\)]/);
    if (preMatch) {
      return `<ruby>${_escHtml(preMatch[1])}<rt>${_escHtml(preMatch[2])}</rt></ruby>`;
    }
    return `<ruby>${_escHtml(kanji)}<rt>${_escHtml(japanese)}</rt></ruby>`;
  }

  // 현재 카테고리가 문장형인지 확인
  function isCurrentVocabSentenceType() {
    const cat = VOCAB_CATEGORIES.find(c => c.id === state.vocabCurrentCategoryId);
    return cat && (cat.type === 'sentence' || cat.type === 'sim');
  }

  function showVocabFlashcard() {
    const items = state.vocabItems;
    if (!items.length) return;
    const idx = state.vocabIndex;
    const total = items.length;
    const item = items[idx];
    const isSentence = isCurrentVocabSentenceType() || item.japanese.length > 10;

    document.getElementById('vocab-card-num').textContent = `${idx + 1} / ${total}`;
    document.getElementById('vfc-progress-fill').style.width = `${(idx / total) * 100}%`;

    // 문장형 ↔ 단어형 CSS 전환
    const card = document.getElementById('vocab-flashcard');
    if (card) card.classList.toggle('vfc-sentence-mode', isSentence);

    // ── 앞면 ──
    const jpEl = document.getElementById('vfc-japanese');
    if (isSentence) {
      // 문장: 한자(읽기) 괄호 포맷
      jpEl.innerHTML = item.kanji
        ? formatWithFurigana(item.kanji, item.japanese)
        : item.japanese;
      jpEl.dataset.audio = item.japanese;
      fitVocabText(jpEl, 120);
    } else {
      // 단어: 앞면에 한자(읽기) 괄호 포맷
      jpEl.innerHTML = item.kanji
        ? formatWithFurigana(item.kanji, item.japanese)
        : item.japanese;
      jpEl.dataset.audio = item.japanese;
      fitVocabText(jpEl, 180);
    }

    // 단어형 별도 후리가나 줄 — 인라인 표기로 대체되므로 숨김
    const kanjiEl = document.getElementById('vfc-kanji');
    kanjiEl.textContent = ''; kanjiEl.style.display = 'none';

    // ── 뒷면 ──
    const jpBackEl = document.getElementById('vfc-japanese-back');
    jpBackEl.innerHTML = item.kanji
      ? formatWithFurigana(item.kanji, item.japanese)
      : item.japanese;
    jpBackEl.dataset.audio = item.japanese;
    fitVocabText(jpBackEl, isSentence ? 100 : 160);

    const kanjiBEl = document.getElementById('vfc-kanji-back');
    kanjiBEl.textContent = ''; kanjiBEl.style.display = 'none';
    document.getElementById('vfc-korean').textContent = item.korean;

    const tipEl = document.getElementById('vfc-tip');
    if (item.tip) { tipEl.textContent = '💡 ' + item.tip; tipEl.style.display = 'block'; }
    else tipEl.style.display = 'none';

    const exEl = document.getElementById('vfc-example');
    if (item.example) { exEl.textContent = '📝 ' + item.example; exEl.style.display = 'block'; }
    else exEl.style.display = 'none';

    // ── 관련 단어 / 예시 문장 (vocab-examples-data.js) ──
    const exData = typeof VOCAB_EXAMPLES_DB !== 'undefined' ? VOCAB_EXAMPLES_DB[item.id] : null;
    const compoundsEl = document.getElementById('vfc-compounds');
    const compoundsWrap = document.getElementById('vfc-compounds-wrap');
    const sentencesEl = document.getElementById('vfc-sentences');
    const sentencesWrap = document.getElementById('vfc-sentences-wrap');

    if (compoundsEl) {
      let compoundsRendered = false;
      if (!isSentence && exData?.compounds?.length) {
        compoundsEl.style.display = '';
        const shuffled = exData.compounds.slice().sort(() => Math.random() - 0.5).slice(0, 3);
        compoundsEl.innerHTML = '<div class="vfc-ex-title">관련 단어</div>' +
          '<div class="vfc-ex-row">' +
          shuffled.map(c =>
            `<div class="vfc-ex-item"><span class="vfc-ex-jp vfc-audio-word" onclick="event.stopPropagation();App.playWord(this.textContent)" title="🔊">${c.japanese}</span><span class="vfc-ex-kr">${c.meaning}</span></div>`
          ).join('') +
          '</div>';
        compoundsRendered = true;
      }
      // VOCAB_EXAMPLES_DB 없을 때: 한자가 있으면 VOCAB_ITEMS에서 같은 한자를 포함한 다른 항목을 찾아 표시
      if (!compoundsRendered && !isSentence && item.kanji) {
        const mainK = stripFurigana(item.kanji);
        const kanjiChars = [...mainK].filter(c => /[\u4e00-\u9fff]/.test(c));
        if (kanjiChars.length) {
          const related = VOCAB_ITEMS.filter(v =>
            v.id !== item.id && v.korean && !v.speaker &&
            !(v.japanese || '').includes('〜') &&
            kanjiChars.some(ch => stripFurigana(v.kanji || '').includes(ch))
          ).slice(0, 4);
          if (related.length) {
            compoundsEl.style.display = '';
            compoundsEl.innerHTML = '<div class="vfc-ex-title">이 한자가 쓰인 단어</div>' +
              '<div class="vfc-ex-row">' +
              related.map(v =>
                `<div class="vfc-ex-item">` +
                `<span class="vfc-ex-jp vfc-audio-word" onclick="event.stopPropagation();App.playWord('${v.japanese}')" title="🔊">${stripFurigana(v.kanji || '')||v.japanese}</span>` +
                `<span class="vfc-ex-kr">${v.korean}</span>` +
                `</div>`
              ).join('') +
              '</div>';
          } else { compoundsEl.style.display = 'none'; compoundsEl.innerHTML = ''; }
        } else { compoundsEl.style.display = 'none'; compoundsEl.innerHTML = ''; }
      } else if (!compoundsRendered) {
        compoundsEl.style.display = 'none'; compoundsEl.innerHTML = '';
      }
      // wrap 가시성 동기화
      if (compoundsWrap) compoundsWrap.style.display = compoundsEl.style.display;
    }

    if (sentencesEl) {
      if (isSentence) {
        // 문장형: 유사 표현 + 예시 문장 (사용된 단어 섹션 제거)
        const similar = getSimilarItems(item, 2);
        let html = '';
        if (similar.length) {
          html += `<div class="vfc-similar">
            <div class="vfc-similar-title">유사 표현</div>
            ${similar.map(s =>
              `<div class="vfc-similar-item" onclick="App.playWord('${s.japanese}')">
                <span class="vfc-similar-jp" data-audio="${s.japanese}">${s.kanji ? formatWithFurigana(s.kanji, s.japanese) : s.japanese}</span>
                <span class="vfc-similar-kr">${s.korean}</span>
              </div>`
            ).join('')}
          </div>`;
        }
        if (exData?.sentences?.length) {
          html += '<div class="vfc-similar"><div class="vfc-similar-title">예시 문장</div>' +
            exData.sentences.slice(0,2).map(s =>
              `<div class="vfc-similar-item vfc-sent" onclick="App.playWord('${s.japanese}')">
                <span class="vfc-similar-jp" data-audio="${s.japanese}">${s.kanji ? formatWithFurigana(s.kanji, s.japanese) : s.japanese}</span>
                <span class="vfc-similar-kr">${s.meaning}</span>
              </div>`
            ).join('') + '</div>';
        }
        sentencesEl.style.display = html ? '' : 'none';
        sentencesEl.innerHTML = html;
      } else if (exData?.sentences?.length) {
        sentencesEl.style.display = '';
        sentencesEl.innerHTML = '<div class="vfc-ex-title">예시 문장</div>' +
          exData.sentences.map(s =>
            `<div class="vfc-ex-item vfc-sent"><span class="vfc-sent-jp vfc-audio-word" onclick="event.stopPropagation();App.playWord(this.textContent)" title="🔊">${s.japanese}</span><span class="vfc-ex-kr">${s.meaning}</span></div>`
          ).join('');
      } else { sentencesEl.style.display = 'none'; sentencesEl.innerHTML = ''; }
      // wrap 가시성 동기화
      if (sentencesWrap) sentencesWrap.style.display = sentencesEl.style.display;
    }

    // 카드 리셋 + 읽기 세션 무효화 (flipCard 설정에 따라 초기 면 결정)
    const flipEnabled = state.prefs.flipCard === true;
    state.vocabFlipped = !flipEnabled;
    state.vocabReadSession = (state.vocabReadSession || 0) + 1;
    stopVocabExRead();
    document.getElementById('vfc-inner').classList.toggle('flipped', !flipEnabled);

    // 앞/뒷면 모두: 일본어 텍스트 자동 읽기
    setTimeout(() => playAudio(item.japanese || ''), 300);

    updateNavStripActive('vfc-nav-strip', idx);

    markVocabSeen(item.id);
  }

  // vocab 예시 순차 읽기 (세션 기반)
  async function startVocabExRead(session) {
    stopVocabExRead();
    // 읽기 대상: showWordEx → 관련 단어(.vfc-ex-jp), showSentEx → 예시 문장/유사 표현(.vfc-sent-jp, .vfc-similar-jp)
    const back = document.querySelector('#vfc-inner .flashcard-back');
    if (!back) return;

    const allTargets = [...back.querySelectorAll('.vfc-sent-jp, .vfc-ex-jp, .vfc-similar-jp')]
      .map(el => ({ el, text: el.dataset.audio || el.textContent.trim() }))
      .filter(t => t.text);

    const targets = allTargets.filter(({ el }) => {
      const inCompounds = !!el.closest('#vfc-compounds');
      const inSentences = !!el.closest('#vfc-sentences');
      if (inCompounds && !state.prefs.showWordEx) return false;
      if (inSentences && !state.prefs.showSentEx) return false;
      return true;
    });

    for (const t of targets) {
      if (session !== state.vocabReadSession) return;
      back.querySelectorAll('.vfc-reading').forEach(e => e.classList.remove('vfc-reading'));
      t.el.closest('.vfc-ex-item, .vfc-similar-item, .vfc-sent')?.classList.add('vfc-reading');
      t.el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      try { await playAudio(t.text); } catch (e) { /* TTS 실패 시 다음 항목으로 */ }
      if (session !== state.vocabReadSession) return;
      await new Promise(r => setTimeout(r, 350));
    }
    if (back) back.querySelectorAll('.vfc-reading').forEach(e => e.classList.remove('vfc-reading'));

    if (session !== state.vocabReadSession) return;

    // 자동 넘기기 설정 시 카운트다운 후 다음 카드
    if (state.prefs.autoAdvance && session === state.vocabReadSession) {
      startVocabAutoAdvance(session);
    }
  }

  let _vfcAutoTimer = null;
  let _vfcAutoCountTimer = null;

  function startVocabAutoAdvance(session) {
    clearVocabAutoAdvance();
    const delay = (parseInt(state.prefs.autoAdvanceDelay) || 3);
    const bar = document.getElementById('vfc-auto-bar');
    const countEl = document.getElementById('vfc-auto-countdown');
    if (bar) bar.style.display = 'flex';
    let remaining = delay;
    if (countEl) countEl.textContent = remaining + 's';
    _vfcAutoCountTimer = setInterval(() => {
      if (session !== state.vocabReadSession) { clearVocabAutoAdvance(); return; }
      remaining--;
      if (countEl) countEl.textContent = remaining + 's';
    }, 1000);
    _vfcAutoTimer = setTimeout(() => {
      clearVocabAutoAdvance();
      if (session !== state.vocabReadSession) return;
      const items = state.vocabItems;
      if (state.vocabIndex < items.length - 1) {
        state.vocabIndex++;
        showVocabFlashcard();
        setTimeout(() => {
          if (state.prefs.autoAdvance) vocabFlipCard();
        }, 600);
      }
    }, delay * 1000);
  }

  function clearVocabAutoAdvance() {
    clearTimeout(_vfcAutoTimer);
    clearInterval(_vfcAutoCountTimer);
    _vfcAutoTimer = null; _vfcAutoCountTimer = null;
    const bar = document.getElementById('vfc-auto-bar');
    if (bar) bar.style.display = 'none';
  }

  function stopVocabExRead() {
    document.querySelectorAll('.vfc-reading').forEach(e => e.classList.remove('vfc-reading'));
    clearVocabAutoAdvance();
  }

  function vocabFlipCard() {
    if (state.vocabFlipped) return; // 이미 뒤집힘 — 다시 앞면으로 돌아가지 않음
    state.vocabFlipped = true;
    _onVocabLearn();
    document.getElementById('vfc-inner').classList.add('flipped');

    // 읽기 세션 증가 → 카드 넘기면 이전 읽기 중단
    state.vocabReadSession = (state.vocabReadSession || 0) + 1;
    const session = state.vocabReadSession;
    const item = state.vocabItems[state.vocabIndex];

    // 뒷면을 봤으므로 nav strip 즉시 갱신
    updateNavStripActive('vfc-nav-strip', state.vocabIndex);

    // 메인 단어/문장 → 완료 후 예시 순차 읽기 (또는 자동 넘김)
    // 뒤집을 때 듀얼 스피커 번갈아 재생
    (async () => {
      if (hasSpeakerConfigured(2)) {
        const slot = state.vocabSpeakerTurn || 1;
        state.vocabSpeakerTurn = slot === 1 ? 2 : 1;
        await playAudioSlot(item.japanese, slot);
      } else {
        await playAudio(item.japanese);
      }
      if (session !== state.vocabReadSession) return;
      await new Promise(r => setTimeout(r, 350));
      if (session !== state.vocabReadSession) return;
      if (state.prefs.showWordEx || state.prefs.showSentEx) {
        startVocabExRead(session);
      } else if (state.prefs.autoAdvance) {
        startVocabAutoAdvance(session);
      }
    })();
  }

  function setupVocabFlashcardControls() {
    const vcard = document.getElementById('vocab-flashcard');
    if (!vcard._swipeBound) {
      vcard._swipeBound = true;
      attachSwipe(
        vcard,
        () => { clearVocabAutoAdvance(); if (state.vocabIndex > 0) { state.vocabIndex--; showVocabFlashcard(); } },
        () => {
          clearVocabAutoAdvance();
          const item = state.vocabItems[state.vocabIndex];
          recordVocabResult(item.id, true);
          updateVocabSRS(item.id, 'ok', state.vocabProgress);
          if (state.vocabIndex < state.vocabItems.length - 1) {
            state.vocabIndex++; showVocabFlashcard();
          } else {
            showVocabCompletePrompt();
          }
        },
        () => { clearVocabAutoAdvance(); vocabFlipCard(); }
      );
    }
    const vCancelBtn = document.getElementById('vfc-auto-cancel');
    if (vCancelBtn) vCancelBtn.onclick = () => {
      clearVocabAutoAdvance();
      state.vocabReadSession = (state.vocabReadSession || 0) + 1;
    };

    // ── 어휘 자가평가 버튼 (SRS) ──
    function _vfcAssessNext(rating) {
      clearVocabAutoAdvance();
      state.vocabReadSession = (state.vocabReadSession || 0) + 1;
      const item = state.vocabItems[state.vocabIndex];
      if (!item) return;
      // SRS 업데이트
      updateVocabSRS(item.id, rating, state.vocabProgress);
      // 진도 기록
      if (rating === 'good')  recordVocabResult(item.id, true);
      else if (rating === 'hard') recordVocabResult(item.id, false);
      else markVocabSeen(item.id);
      // XP + 미션
      const xpMap = { good: 5, ok: 3, hard: 1 };
      _awardXP(xpMap[rating] || 2, null);
      _advanceMission('flashcard_flip', 1);
      // 다음 카드
      if (state.vocabIndex < state.vocabItems.length - 1) {
        state.vocabIndex++; showVocabFlashcard();
      } else {
        showVocabCompletePrompt();
      }
    }
    const vHardBtn = document.getElementById('vfca-hard');
    const vOkBtn   = document.getElementById('vfca-ok');
    const vGoodBtn = document.getElementById('vfca-good');
    if (vHardBtn && !vHardBtn._bound) { vHardBtn._bound = true; vHardBtn.addEventListener('click', e => { e.stopPropagation(); _vfcAssessNext('hard'); }); }
    if (vOkBtn   && !vOkBtn._bound)   { vOkBtn._bound   = true; vOkBtn.addEventListener  ('click', e => { e.stopPropagation(); _vfcAssessNext('ok');   }); }
    if (vGoodBtn && !vGoodBtn._bound) { vGoodBtn._bound = true; vGoodBtn.addEventListener('click', e => { e.stopPropagation(); _vfcAssessNext('good'); }); }
  }

  // ─── 단어 퀴즈 ───

  const _VQ_SPEECHES_KO = [
    '자, 단어를 외워보자!',
    '힘내! 할 수 있어!',
    '같이 연습하자!',
    '포기하지 마!',
    '잘 할 수 있어!',
  ];
  const _VQ_SPEECHES_JP = [
    'さあ、単語を覚えよう！',
    '頑張れ！できるよ！',
    '一緒に練習しよう！',
    '諦めないで！',
    '上手になれるよ！',
  ];
  function _getVqSpeeches() { return _uiTier() === 'beginner' ? _VQ_SPEECHES_KO : _VQ_SPEECHES_JP; }
  let _vqSpeechTimer = null;
  let _vqCountdownTimer = null;

  function _doVqStart() {
    if (_vqCountdownTimer) { clearInterval(_vqCountdownTimer); _vqCountdownTimer = null; }
    const cdEl = document.getElementById('vq-cdnum');
    if (cdEl) cdEl.style.display = 'none';
    document.getElementById('vq-intro').style.display = 'none';
    document.getElementById('vq-game').style.display = 'block';
    startVocabQuiz();
  }

  function _startVqCountdown() {
    if (_vqCountdownTimer) { clearInterval(_vqCountdownTimer); _vqCountdownTimer = null; }
    let n = 5;
    const cdEl = document.getElementById('vq-cdnum');
    if (cdEl) { cdEl.textContent = n; cdEl.style.display = 'inline-flex'; }
    _vqCountdownTimer = setInterval(() => {
      n--;
      if (cdEl) cdEl.textContent = n > 0 ? n : '!';
      if (n <= 0) {
        clearInterval(_vqCountdownTimer);
        _vqCountdownTimer = null;
        _doVqStart();
      }
    }, 1000);
  }

  function _buildVqSettings(cat) {
    const summEl = document.getElementById('vq-settings-summary');
    if (!summEl) return;
    const count = state.vocabItems ? state.vocabItems.length : 0;
    const section = state.vocabSection || 'word';
    const sectionLabel = section === 'sentence' ? '문장 퀴즈' : section === 'sim' ? '롤플레이 퀴즈' : '단어 퀴즈';
    const autoAdv = state.prefs.quizAutoAdvance !== false;
    summEl.innerHTML = `
      ${cat ? `<div class="qi-chip"><span class="qi-chip-icon">${cat.icon || '📚'}</span>${cat.name}</div>` : ''}
      <div class="qi-chip"><span class="qi-chip-icon">🔢</span>${count}문제</div>
      <div class="qi-chip"><span class="qi-chip-icon">⭐</span>${sectionLabel}</div>
      <div class="qi-chip"><span class="qi-chip-icon">⚡</span>${autoAdv ? '자동넘기기' : '수동넘기기'}</div>
    `;
  }

  function showVocabQuizIntro() {
    const cat = (window.VOCAB_CATEGORIES || []).find(c => c.id === state.vocabCurrentCategoryId);
    // 인트로 표시
    document.getElementById('vq-intro').style.display = 'flex';
    document.getElementById('vq-game').style.display = 'none';
    document.getElementById('vocab-quiz-result').style.display = 'none';
    document.getElementById('vocab-quiz-feedback').style.display = 'none';

    // 설정 칩
    _buildVqSettings(cat);

    // 자동넘기기 토글
    const aaCb = document.getElementById('vq-autonext-cb');
    if (aaCb) {
      aaCb.checked = state.prefs.quizAutoAdvance !== false;
      aaCb.onchange = () => {
        state.prefs.quizAutoAdvance = aaCb.checked;
        saveToStorage();
        _buildVqSettings(cat);
      };
    }

    // 퀵 컨트롤 (배경음 / 화자 / 설정)
    _setupQiExtras('vq-amb-btn', 'vq-amb-label', 'vq-voice-btn', 'vq-settings-btn', () => _buildVqSettings(cat));

    // 시작 버튼
    const startBtn = document.getElementById('vq-start-btn');
    if (startBtn) startBtn.onclick = _doVqStart;

    // 뒤로 가기 버튼
    const backBtn = document.getElementById('vq-back-btn');
    if (backBtn) backBtn.onclick = () => vocabBackToSetup();

    // 카운트다운 리셋
    if (_vqCountdownTimer) { clearInterval(_vqCountdownTimer); _vqCountdownTimer = null; }
    const cdEl = document.getElementById('vq-cdnum');
    if (cdEl) cdEl.style.display = 'none';

    // 떠다니는 가나 글자
    const bg2 = document.getElementById('vq-bg-anim');
    if (bg2) {
      bg2.querySelectorAll('.qi-kana-float').forEach(e => e.remove());
      const kanas = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよ'.split('');
      for (let i = 0; i < 14; i++) {
        const el = document.createElement('div');
        el.className = 'qi-kana-float';
        el.textContent = kanas[Math.floor(Math.random() * kanas.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (18 + Math.random() * 18) + 'px';
        el.style.animationDuration = (12 + Math.random() * 14) + 's';
        el.style.animationDelay = (-Math.random() * 18) + 's';
        bg2.appendChild(el);
      }
    }

    // 마스코트 대사 순환
    if (_vqSpeechTimer) clearInterval(_vqSpeechTimer);
    let _sidx = 0;
    const sp = document.getElementById('vq-speech-text');
    if (sp) {
      const _vqArr = _getVqSpeeches();
      sp.textContent = _vqArr[_sidx];
      _vqSpeechTimer = setInterval(() => {
        _sidx = (_sidx + 1) % _vqArr.length;
        if (sp) sp.textContent = _vqArr[_sidx];
      }, 3500);
    }

    // 배경음 (크게)
    startAmbient(state.prefs.ambientQuiz || 'none', 'quiz');

    // 성우 인사 → 인사 후 5초 카운트다운 자동 시작
    setTimeout(() => {
      speakCheer('start');
      setTimeout(_startVqCountdown, 600);
    }, 900);
  }

  function startVocabQuiz() {
    if (state.vqAmbFadeTimer) { clearTimeout(state.vqAmbFadeTimer); state.vqAmbFadeTimer = null; }
    const items = [...state.vocabItems].sort(() => Math.random() - 0.5);
    state.vocabQuizQuestions = items.map(item => buildVocabQuestion(item));
    state.vocabQuizCurrentIdx = 0;
    state.vocabQuizCorrect = 0;
    state.vocabQuizStreak = 0;
    state.vocabQuizMaxStreak = 0;
    state.vocabQuizAnswered = false;
    state.vocabQuizCheerCount = 0;

    document.getElementById('vq-correct-count').textContent = '✓ 0';
    document.getElementById('vq-wrong-count').textContent = '✗ 0';
    document.getElementById('vocab-quiz-result').style.display = 'none';
    document.getElementById('vocab-quiz-feedback').style.display = 'none';

    document.getElementById('vqr-retry').onclick = () => {
      document.getElementById('vq-intro').style.display = 'none';
      document.getElementById('vocab-quiz-result').style.display = 'none';
      document.getElementById('vq-game').style.display = 'block';
      startVocabQuiz();
    };

    // 진행 중 자동넘기기 토글 동기화
    const aaCb2 = document.getElementById('vqsm-aa-cb');
    if (aaCb2) {
      aaCb2.checked = state.prefs.quizAutoAdvance !== false;
      aaCb2.onchange = () => { state.prefs.quizAutoAdvance = aaCb2.checked; saveToStorage(); };
    }

    // 5초 후 배경음 잔잔하게 줄이기
    state.vqAmbFadeTimer = setTimeout(() => {
      if (_ambAudio) _ambFadeTo(_ambAudio, _ambTargetVol() * 0.35, 2500);
    }, 5000);

    showVocabQuizQuestion();
  }

  function buildVocabQuestion(item) {
    const catId = state.vocabCurrentCategoryId;
    const wrongs = getVocabWrongOptions(item.id, catId, 3);
    const choices = [item, ...wrongs].sort(() => Math.random() - 0.5);
    return { item, choices, correctId: item.id };
  }

  function showVocabQuizQuestion() {
    const q = state.vocabQuizQuestions[state.vocabQuizCurrentIdx];
    if (!q) return;
    const total = state.vocabQuizQuestions.length;
    const idx = state.vocabQuizCurrentIdx;

    document.getElementById('vq-progress-text').textContent = `${idx + 1} / ${total}`;
    document.getElementById('vq-progress-fill').style.width = `${(idx / total) * 100}%`;
    state.vocabQuizAnswered = false;

    // 문제: 한국어 뜻 표시
    const qbox = document.getElementById('vocab-question-box');
    qbox.innerHTML = `
      <div class="qb-vocab-prompt">
        <div class="qb-vocab-korean">${q.item.korean}</div>
        <div class="qb-label">이 뜻에 해당하는 일본어는?</div>
      </div>`;

    // 선택지: 일본어(히라가나) 표시
    const choicesDiv = document.getElementById('vocab-quiz-choices');
    choicesDiv.innerHTML = '';
    q.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn vocab-choice-btn';
      btn.dataset.vid = choice.id;
      btn.innerHTML = `
        <span class="vc-japanese">${choice.japanese}</span>
        ${choice.kanji ? `<span class="vc-kanji">${stripFurigana(choice.kanji)}</span>` : ''}`;
      btn.addEventListener('click', () => handleVocabQuizAnswer(choice.id));
      choicesDiv.appendChild(btn);
    });

    document.getElementById('vocab-quiz-feedback').style.display = 'none';
  }

  function handleVocabQuizAnswer(chosenId) {
    if (state.vocabQuizAnswered) return;
    state.vocabQuizAnswered = true;

    const q = state.vocabQuizQuestions[state.vocabQuizCurrentIdx];
    const isCorrect = chosenId === q.correctId;

    // 버튼 시각화
    document.querySelectorAll('.vocab-choice-btn').forEach(btn => {
      btn.classList.add('disabled');
      if (btn.dataset.vid === q.correctId) btn.classList.add('correct');
      if (btn.dataset.vid === chosenId && !isCorrect) btn.classList.add('wrong');
    });

    // 결과 기록
    recordVocabResult(q.item.id, isCorrect);

    // 피드백 UI
    const fb = document.getElementById('vocab-quiz-feedback');
    fb.style.display = 'block';
    const resultEl = document.getElementById('vq-result-text');
    const ansEl = document.getElementById('vq-correct-ans');
    const tipEl = document.getElementById('vq-tip-text');
    const exEl = document.getElementById('vq-example-text');
    const nextBtn = document.getElementById('vq-next-btn');

    if (isCorrect) {
      state.vocabQuizCorrect++;
      document.getElementById('vq-correct-count').textContent = '✓ ' + state.vocabQuizCorrect;
      state.vocabQuizStreak = (state.vocabQuizStreak || 0) + 1;
      if (state.vocabQuizStreak > (state.vocabQuizMaxStreak || 0)) state.vocabQuizMaxStreak = state.vocabQuizStreak;
      const streak = state.vocabQuizStreak;
      const cheerType = streak >= 8 ? 'streak8' : streak >= 5 ? 'streak5' : streak >= 3 ? 'streak3' : 'correct';
      playCorrectSound();

      state.vocabQuizCheerCount = (state.vocabQuizCheerCount || 0) + 1;
      const isMilestone = cheerType !== 'correct';
      const shouldVoice = isMilestone || (state.vocabQuizCheerCount % 3 === 0);

      resultEl.textContent = '✓ 정답!';
      resultEl.className = 'qf-result correct';
      ansEl.textContent = '';

      const autoAdv = state.prefs.quizAutoAdvance !== false;
      state.vocabQuizSeqId = (state.vocabQuizSeqId || 0) + 1;
      const seqId = state.vocabQuizSeqId;

      if (autoAdv) {
        nextBtn.textContent = '건너뛰기 →';
        ;(async () => {
          await new Promise(r => setTimeout(r, 300));
          if (state.vocabQuizSeqId !== seqId) return;
          if (shouldVoice) {
            await speakCheer(cheerType);
          } else {
            const text = _pickCheer(cheerType);
            if (text) _showCheerBanner(text, '');
            await new Promise(r => setTimeout(r, 400));
          }
          if (state.vocabQuizSeqId !== seqId) return;
          nextVocabQuestion();
        })();
        nextBtn.onclick = () => {
          state.vocabQuizSeqId = (state.vocabQuizSeqId || 0) + 1;
          if (window.speechSynthesis) window.speechSynthesis.cancel();
          nextVocabQuestion();
        };
      } else {
        if (shouldVoice) setTimeout(() => speakCheer(cheerType), 200);
        else { const text = _pickCheer(cheerType); if (text) _showCheerBanner(text, ''); }
        nextBtn.textContent = '다음 문제 →';
        nextBtn.onclick = () => { state.vocabQuizSeqId = (state.vocabQuizSeqId || 0) + 1; if (window.speechSynthesis) window.speechSynthesis.cancel(); nextVocabQuestion(); };
      }

    } else {
      const wrongCount = state.vocabQuizCurrentIdx + 1 - state.vocabQuizCorrect;
      document.getElementById('vq-wrong-count').textContent = '✗ ' + wrongCount;
      state.vocabQuizStreak = 0;
      setTimeout(() => speakCheer('wrong'), 150);
      playWrongSound();

      resultEl.textContent = '✗ 틀렸어요';
      resultEl.className = 'qf-result wrong';
      ansEl.innerHTML = `정답: ${q.item.kanji ? formatKanjiWithHint(q.item.kanji, q.item.japanese) : q.item.japanese} = ${q.item.korean}`;

      nextBtn.textContent = '다음 문제 →';
      nextBtn.onclick = nextVocabQuestion;
    }

    if (q.item.tip) { tipEl.textContent = '💡 ' + q.item.tip; tipEl.style.display = 'block'; }
    else tipEl.style.display = 'none';

    if (q.item.example) { exEl.textContent = '📝 ' + q.item.example; exEl.style.display = 'block'; }
    else exEl.style.display = 'none';
  }

  function nextVocabQuestion() {
    state.vocabQuizCurrentIdx++;
    if (state.vocabQuizCurrentIdx >= state.vocabQuizQuestions.length) {
      showVocabQuizResult();
    } else {
      showVocabQuizQuestion();
    }
  }

  function showVocabQuizResult() {
    if (state.vqAmbFadeTimer) { clearTimeout(state.vqAmbFadeTimer); state.vqAmbFadeTimer = null; }
    if (_vqSpeechTimer) { clearInterval(_vqSpeechTimer); _vqSpeechTimer = null; }
    stopQuizAmbientLoud();

    const correct    = state.vocabQuizCorrect;
    const total      = state.vocabQuizQuestions.length;
    const wrong      = total - correct;
    const pct        = total > 0 ? Math.round((correct / total) * 100) : 0;
    const maxStreak  = state.vocabQuizMaxStreak || 0;
    const xpGained   = Math.round(correct * 8 + (pct >= 100 ? 40 : pct >= 90 ? 20 : pct >= 70 ? 10 : 0));

    let grade = 'D', gradeColor = '#ef4444';
    if (pct >= 100) { grade = 'S'; gradeColor = '#f59e0b'; }
    else if (pct >= 90) { grade = 'A'; gradeColor = '#10b981'; }
    else if (pct >= 70) { grade = 'B'; gradeColor = '#3b82f6'; }
    else if (pct >= 50) { grade = 'C'; gradeColor = '#8b5cf6'; }

    const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : pct > 0 ? 1 : 0;
    let title = '다시 도전해요! 💪';
    if (pct >= 100) title = '완벽해요! 🎉';
    else if (pct >= 90) title = '거의 완벽! 🌟';
    else if (pct >= 70) title = '잘했어요! 👍';
    else if (pct >= 50) title = '좋아요! 😊';

    const resultCheer = pct >= 100 ? 'perfect' : pct >= 70 ? 'good' : pct >= 50 ? 'pass' : 'poor';

    document.getElementById('vocab-quiz-feedback').style.display = 'none';
    document.getElementById('vq-game').style.display = 'none';
    document.getElementById('vocab-quiz-result').style.display = 'block';

    const gradeEl = document.getElementById('vqr-grade-badge');
    if (gradeEl) { gradeEl.textContent = grade; gradeEl.style.background = gradeColor; gradeEl.style.boxShadow = `0 6px 24px ${gradeColor}88`; }
    document.getElementById('vqr-title').textContent = title;

    // 별점
    const starsEl = document.getElementById('vqr-stars');
    if (starsEl) {
      starsEl.querySelectorAll('.qr-star').forEach((star, i) => {
        star.classList.remove('filled', 'pop');
        if (i < stars) setTimeout(() => { star.classList.add('filled', 'pop'); }, 500 + i * 220);
      });
    }

    // 원형 링
    const ringFill = document.getElementById('vqr-ring-fill');
    if (ringFill) {
      const colorMap = { S: '#f59e0b', A: '#10b981', B: '#3b82f6', C: '#8b5cf6', D: '#ef4444' };
      const circ = 2 * Math.PI * 52;
      ringFill.style.stroke = colorMap[grade] || '#10b981';
      ringFill.style.strokeDasharray  = circ;
      ringFill.style.strokeDashoffset = circ;
      setTimeout(() => {
        ringFill.style.transition = 'stroke-dashoffset 1.2s ease-out';
        ringFill.style.strokeDashoffset = circ * (1 - pct / 100);
      }, 150);
    }

    // 퍼센트 카운터
    const pctEl = document.getElementById('vqr-pct');
    if (pctEl) {
      let disp = 0;
      const iv = setInterval(() => {
        disp = Math.min(disp + Math.ceil(pct / 40), pct);
        pctEl.textContent = disp + '%';
        if (disp >= pct) clearInterval(iv);
      }, 30);
    }
    document.getElementById('vqr-score').textContent = `${correct} / ${total}`;

    document.getElementById('vqr-stat-correct').textContent  = correct;
    document.getElementById('vqr-stat-wrong').textContent    = wrong;
    document.getElementById('vqr-stat-maxstreak').textContent = maxStreak;

    document.getElementById('vqr-xp').textContent = '+' + xpGained + ' XP';
    const xpBar = document.getElementById('vqr-xp-bar-fill');
    if (xpBar) { xpBar.style.width = '0%'; setTimeout(() => { xpBar.style.width = Math.min(100, (xpGained / 150) * 100) + '%'; }, 700); }

    if (pct >= 70) _triggerQrConfetti2(pct);

    setTimeout(() => speakCheer(resultCheer), 800);
    saveToStorage();
  }

  function _triggerQrConfetti2(pct) {
    const el = document.getElementById('vqr-confetti');
    if (!el) return;
    el.innerHTML = '';
    const colors = ['#f59e0b','#10b981','#3b82f6','#e63946','#8b5cf6','#fbbf24'];
    const count = pct >= 90 ? 55 : 30;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'qr-confetti-piece';
      p.style.left = Math.random() * 100 + '%';
      p.style.top  = '-10px';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.width = (6 + Math.random() * 8) + 'px';
      p.style.height = (6 + Math.random() * 8) + 'px';
      p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      p.style.animationDuration = (2.5 + Math.random() * 2) + 's';
      p.style.animationDelay    = (Math.random() * 1.2) + 's';
      el.appendChild(p);
    }
  }

  // ─── 단어 진도 기록 ───

  function markVocabSeen(id) {
    if (!state.vocabProgress[id]) state.vocabProgress[id] = { seen: 0, correct: 0, incorrect: 0 };
    state.vocabProgress[id].seen = (state.vocabProgress[id].seen || 0) + 1;
    saveToStorage();
  }

  function recordVocabResult(id, ok) {
    if (!state.vocabProgress[id]) state.vocabProgress[id] = { seen: 0, correct: 0, incorrect: 0 };
    if (ok) state.vocabProgress[id].correct = (state.vocabProgress[id].correct || 0) + 1;
    else state.vocabProgress[id].incorrect = (state.vocabProgress[id].incorrect || 0) + 1;
    state.vocabProgress[id].seen = (state.vocabProgress[id].seen || 0) + 1;
    // SRS 스케줄 업데이트
    state.vocabProgress[id] = srsReview(state.vocabProgress[id], gradeFromResult(ok));
    saveToStorage();
  }

  // 어휘 SRS 업데이트 (rating: 'good'|'ok'|'hard')
  function updateVocabSRS(id, rating, progress) {
    const gradeMap = { good: 4, ok: 3, hard: 1 };
    const grade = gradeMap[rating] ?? 3;
    if (!progress[id]) progress[id] = { seen: 0, correct: 0, incorrect: 0 };
    progress[id] = srsReview(progress[id], grade);
    saveToStorage();
  }

  /** 오늘 복습해야 할 가나 항목 반환 (progress 기반) */
  function getSRSReviewItems(progress) {
    const allKeys = Object.keys(progress);
    return allKeys
      .filter(k => isDue(progress[k]) && progress[k].flipped >= 1)
      .map(k => ({ kana: k, p: progress[k] }));
  }

  /** 오늘 복습해야 할 어휘 항목 반환 (vocabProgress 기반) */
  function getVocabSRSReviewItems(vocabProgress) {
    const allKeys = Object.keys(vocabProgress);
    return allKeys
      .filter(k => isDue(vocabProgress[k]) && (vocabProgress[k].seen >= 1))
      .map(k => ({ id: k, p: vocabProgress[k] }));
  }

  function renderVocabProgress() {
    const container = document.getElementById('vocab-progress-list');
    if (!container) return;
    container.innerHTML = '';

    // ── JLPT 레벨별 현황 ──
    const jlptData = getJLPTProgress(VOCAB_CATEGORIES, state.vocabProgress);
    const jlptHtml = ['N5', 'N4', 'N3'].map(lv => {
      const d = jlptData[lv];
      if (!d || d.total === 0) return '';
      const pct = d.total > 0 ? Math.round(d.learned / d.total * 100) : 0;
      return `<div class="jlpt-prog-row">
        ${jlptBadgeHtml(lv)}
        <div class="jlpt-prog-info">
          <div class="jlpt-prog-bar-bg"><div class="jlpt-prog-bar-fill" style="width:${pct}%"></div></div>
          <span class="jlpt-prog-stat">${d.learned}/${d.total} 학습 · 마스터 ${d.mastered}</span>
        </div>
        <span class="jlpt-prog-pct">${pct}%</span>
      </div>`;
    }).join('');
    if (jlptHtml) {
      const jlptSection = document.createElement('div');
      jlptSection.className = 'jlpt-prog-section';
      jlptSection.innerHTML = '<div class="jlpt-prog-title">🎌 JLPT 레벨별 학습 현황</div>' + jlptHtml;
      container.appendChild(jlptSection);
    }

    // 타입별 그룹핑
    const groups = { word: [], sentence: [], sim: [] };
    VOCAB_CATEGORIES.forEach(cat => {
      const g = cat.type || 'word';
      if (groups[g]) groups[g].push(cat);
      else groups.word.push(cat);
    });

    const groupInfo = [
      { key: 'word',     label: '📚 어휘 마스터' },
      { key: 'sentence', label: '💬 회화 마스터' },
      { key: 'sim',      label: '🎭 실전 롤플레이' },
    ];

    groupInfo.forEach(({ key, label }) => {
      const cats = groups[key];
      if (!cats || !cats.length) return;
      const sec = document.createElement('div');
      sec.className = 'vp-section';
      sec.innerHTML = `<h4 class="vp-section-title">${label}</h4>`;
      cats.forEach(cat => {
        const prog = getVocabCategoryProgress(cat.id);
        const seenCount = cat.items.filter(id => state.vocabProgress[id] && state.vocabProgress[id].seen > 0).length;
        const el = document.createElement('div');
        el.className = 'pl-level';
        el.innerHTML = `
          <div class="pll-header">
            <div>
              <div class="pll-title">${cat.icon} ${cat.name}</div>
              <div class="pll-sub">${cat.subtitle || ''} · ${cat.items.length}개</div>
            </div>
            <div class="pll-pct">${prog}%</div>
          </div>
          <div class="pll-bar-bg"><div class="pll-bar-fill" style="width:${prog}%"></div></div>
          <div style="font-size:11px;color:#718096;margin-top:4px">${seenCount} / ${cat.items.length}개 학습</div>`;
        sec.appendChild(el);
      });
      container.appendChild(sec);
    });
  }

  function vocabBackToSetup() {
    state.vocabMode = null;
    document.body.classList.remove('fc-fullscreen');
    stopAllAudio();
    clearVocabAutoAdvance();
    state.vocabReadSession = (state.vocabReadSession || 0) + 1;
    if (_vqSpeechTimer) { clearInterval(_vqSpeechTimer); _vqSpeechTimer = null; }
    if (_vqCountdownTimer) { clearInterval(_vqCountdownTimer); _vqCountdownTimer = null; }
    if (state.vqAmbFadeTimer) { clearTimeout(state.vqAmbFadeTimer); state.vqAmbFadeTimer = null; }
    stopAmbient(1.5, false);
    // 모든 패널 숨기기
    document.getElementById('vocab-setup').style.display = 'block';
    document.getElementById('vocab-flash-panel').style.display = 'none';
    const browseArea = document.getElementById('vocab-browse-area');
    if (browseArea) {
      browseArea.style.display = 'none';
      const ssPanel = document.getElementById('vbc-slideshow-panel');
      if (ssPanel) ssPanel.style.display = 'none';
      const grid = document.getElementById('vocab-browse-grid');
      if (grid) grid.style.display = 'grid';
    }
    const dialogueArea = document.getElementById('vocab-dialogue-area');
    if (dialogueArea) dialogueArea.style.display = 'none';
    const wePanel = document.getElementById('word-explorer-panel');
    if (wePanel) wePanel.style.display = 'none';
    const stPanel = document.getElementById('scene-trainer-panel');
    if (stPanel) stPanel.style.display = 'none';
    // 데일리 배너 복원
    ['vocab-daily-item', 'convo-daily-convo', 'sim-daily-item'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = '';
    });
    // 진도 변경 반영을 위해 카테고리 목록 리셋 (재렌더 트리거)
    ['vocab-word-levels-main', 'vocab-sentence-levels-main', 'vocab-sim-levels-main'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = '';
    });
    // 현재 섹션에 맞는 마스터 뷰로 복귀
    const sectionViewMap = { word: 'vocab', sentence: 'convo', sim: 'roleplay' };
    const returnView = sectionViewMap[state.vocabSection] || 'vocab';
    showView(returnView);
  }

  // ─────────────────────────────────────────────────────────────
  //  WORD EXPLORER — 어휘 마스터 탐구 학습
  // ─────────────────────────────────────────────────────────────
  function startWordExplorer(catId) {
    trackActivity('vocab', catId);
    const cat = VOCAB_CATEGORIES.find(c => c.id === catId);
    if (!cat) return;
    state.vocabCurrentCategoryId = catId;
    state.vocabSection = 'word';
    state.vocabIndex = 0;

    // 패널 전환
    document.getElementById('vocab-setup').style.display = 'none';
    document.getElementById('vocab-flash-panel').style.display = 'none';
    const wePanel = document.getElementById('word-explorer-panel');
    if (!wePanel) return;
    wePanel.style.display = 'block';
    const stPanel = document.getElementById('scene-trainer-panel');
    if (stPanel) stPanel.style.display = 'none';

    // 헤더
    document.getElementById('we-cat-name').textContent = `${cat.icon} ${cat.name}`;
    document.getElementById('we-cat-subtitle').textContent = cat.subtitle || '';

    // 뒤로가기
    const backBtn = document.getElementById('we-back-btn');
    if (backBtn) backBtn.onclick = vocabBackToSetup;

    // 아이템 로드
    const items = getVocabCategoryItems(catId);
    state.vocabItems = items;
    if (!items.length) return;

    // 이전/다음 버튼
    const prevBtn = document.getElementById('we-prev-btn');
    const nextBtn = document.getElementById('we-next-btn');
    if (prevBtn) prevBtn.onclick = () => {
      if (state.vocabIndex > 0) { state.vocabIndex--; _weShowCard(state.vocabIndex); }
    };
    if (nextBtn) nextBtn.onclick = () => {
      if (state.vocabIndex < items.length - 1) { state.vocabIndex++; _weShowCard(state.vocabIndex); }
    };

    // 오디오 버튼
    const audioBtn = document.getElementById('we-audio-btn');
    if (audioBtn) audioBtn.onclick = () => {
      const item = items[state.vocabIndex];
      if (item) playAudio(item.japanese);
    };

    // 탭 설정 (중복 이벤트 방지)
    const tabs = document.querySelectorAll('#we-games-tabs .we-tab');
    tabs.forEach(tab => {
      const newTab = tab.cloneNode(true);
      tab.parentNode.replaceChild(newTab, tab);
    });
    document.querySelectorAll('#we-games-tabs .we-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('#we-games-tabs .we-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        ['fillin','choice','order'].forEach(g => {
          const gp = document.getElementById('we-game-' + g);
          if (gp) gp.style.display = g === tab.dataset.game ? 'block' : 'none';
        });
        _weSetupGame(tab.dataset.game, items);
      });
    });

    // 첫 카드 + 첫 게임
    _weShowCard(0);
    _weSetupGame('fillin', items);
  }

  function _weShowCard(idx) {
    const items = state.vocabItems;
    if (!items || !items.length) return;
    const item = items[idx];
    if (!item) return;
    const total = items.length;

    document.getElementById('we-card-num').textContent = (idx + 1) + ' / ' + total;
    const bar = document.getElementById('we-progress-bar');
    if (bar) bar.style.width = (((idx + 1) / total) * 100) + '%';

    document.getElementById('we-word-jp').textContent = item.japanese || '';
    const kanjiEl = document.getElementById('we-word-kanji');
    if (kanjiEl) {
      kanjiEl.textContent = item.kanji ? '(' + item.kanji + ')' : '';
      kanjiEl.style.display = item.kanji ? 'block' : 'none';
    }
    document.getElementById('we-word-kr').textContent = item.korean || '';
    const enEl = document.getElementById('we-word-en');
    if (enEl) { enEl.textContent = item.english || ''; enEl.style.display = item.english ? 'block' : 'none'; }

    const tipBox = document.getElementById('we-tip-box');
    const tipText = document.getElementById('we-tip-text');
    if (tipBox && tipText) {
      if (item.tip) { tipText.textContent = item.tip; tipBox.style.display = 'flex'; }
      else tipBox.style.display = 'none';
    }
    const exBox = document.getElementById('we-example-box');
    const exText = document.getElementById('we-example-text');
    if (exBox && exText) {
      if (item.example) { exText.textContent = item.example; exBox.style.display = 'flex'; }
      else exBox.style.display = 'none';
    }

    // 네비 스트립
    renderNavStrip('we-nav-strip', items, idx, (i) => {
      state.vocabIndex = i; _weShowCard(i);
    });

    // 버튼 상태
    const prevBtn = document.getElementById('we-prev-btn');
    const nextBtn = document.getElementById('we-next-btn');
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx === total - 1;

    // 오디오 버튼 핸들러 갱신
    const audioBtn = document.getElementById('we-audio-btn');
    if (audioBtn) audioBtn.onclick = () => playAudio(item.japanese);

    // 현재 게임 갱신
    const activeTab = document.querySelector('#we-games-tabs .we-tab.active');
    if (activeTab) _weSetupGame(activeTab.dataset.game, items);

    _onVocabLearn();
  }

  function _weSetupGame(gameType, items) {
    if (!items || items.length < 2) return;
    const cur = items[state.vocabIndex];
    if (!cur) return;
    const others = items.filter(it => it.id !== cur.id).sort(() => Math.random() - 0.5).slice(0, 3);

    if (gameType === 'fillin') {
      const promptEl = document.getElementById('wg-fillin-prompt');
      const sentEl   = document.getElementById('wg-fillin-sentence');
      const optsEl   = document.getElementById('wg-fillin-options');
      const fbEl     = document.getElementById('wg-fillin-feedback');
      const nxtBtn   = document.getElementById('wg-fillin-next');
      if (!optsEl) return;
      if (promptEl) promptEl.textContent = '한국어 뜻을 보고 일본어를 고르세요';
      if (sentEl) sentEl.textContent = cur.korean;
      if (fbEl) fbEl.style.display = 'none';
      if (nxtBtn) nxtBtn.style.display = 'none';

      const choices = [cur, ...others].sort(() => Math.random() - 0.5);
      optsEl.innerHTML = '';
      choices.forEach(ch => {
        const btn = document.createElement('button');
        btn.className = 'wg-opt-btn';
        btn.textContent = ch.japanese;
        btn.onclick = () => {
          optsEl.querySelectorAll('.wg-opt-btn').forEach(b => { b.disabled = true; });
          const ok = ch.id === cur.id;
          btn.classList.add(ok ? 'wg-correct' : 'wg-wrong');
          if (!ok) {
            optsEl.querySelectorAll('.wg-opt-btn').forEach(b => {
              if (b.textContent === cur.japanese) b.classList.add('wg-correct');
            });
          }
          if (fbEl) {
            fbEl.textContent = ok ? '✅ 정답! ' + cur.japanese + ' = ' + cur.korean : '❌ 오답. 정답: ' + cur.japanese;
            fbEl.className = 'wg-feedback ' + (ok ? 'wg-fb-ok' : 'wg-fb-ng');
            fbEl.style.display = 'block';
          }
          if (nxtBtn) nxtBtn.style.display = 'block';
          if (ok) playAudio(cur.japanese);
          _awardXP(ok ? 5 : 1, 'word_explorer');
        };
        optsEl.appendChild(btn);
      });
      if (nxtBtn) nxtBtn.onclick = () => {
        const ni = state.vocabIndex < items.length - 1 ? state.vocabIndex + 1 : 0;
        state.vocabIndex = ni; _weShowCard(ni);
      };

    } else if (gameType === 'choice') {
      const wordEl = document.getElementById('wg-choice-word');
      const optsEl = document.getElementById('wg-choice-options');
      const fbEl   = document.getElementById('wg-choice-feedback');
      const nxtBtn = document.getElementById('wg-choice-next');
      if (!optsEl) return;
      if (wordEl) wordEl.textContent = cur.japanese;
      if (fbEl) fbEl.style.display = 'none';
      if (nxtBtn) nxtBtn.style.display = 'none';

      const choices = [cur, ...others].sort(() => Math.random() - 0.5);
      optsEl.innerHTML = '';
      choices.forEach(ch => {
        const btn = document.createElement('button');
        btn.className = 'wg-opt-btn';
        btn.textContent = ch.korean;
        btn.onclick = () => {
          optsEl.querySelectorAll('.wg-opt-btn').forEach(b => { b.disabled = true; });
          const ok = ch.id === cur.id;
          btn.classList.add(ok ? 'wg-correct' : 'wg-wrong');
          if (!ok) optsEl.querySelectorAll('.wg-opt-btn').forEach(b => { if (b.textContent === cur.korean) b.classList.add('wg-correct'); });
          if (fbEl) {
            fbEl.textContent = ok ? '✅ 정답! ' + cur.japanese + ' = ' + cur.korean : '❌ 오답. 정답: ' + cur.korean;
            fbEl.className = 'wg-feedback ' + (ok ? 'wg-fb-ok' : 'wg-fb-ng');
            fbEl.style.display = 'block';
          }
          if (nxtBtn) nxtBtn.style.display = 'block';
          if (ok) playAudio(cur.japanese);
          _awardXP(ok ? 5 : 1, 'word_explorer');
        };
        optsEl.appendChild(btn);
      });
      if (nxtBtn) nxtBtn.onclick = () => {
        const ni = state.vocabIndex < items.length - 1 ? state.vocabIndex + 1 : 0;
        state.vocabIndex = ni; _weShowCard(ni);
      };

    } else if (gameType === 'order') {
      const hintEl   = document.getElementById('wg-order-hint');
      const dropEl   = document.getElementById('wg-order-drop');
      const bankEl   = document.getElementById('wg-order-bank');
      const fbEl     = document.getElementById('wg-order-feedback');
      const nxtBtn   = document.getElementById('wg-order-next');
      const checkBtn = document.getElementById('wg-order-check');
      const clearBtn = document.getElementById('wg-order-clear');
      if (!dropEl || !bankEl) return;

      const source = cur.example || cur.japanese;
      let parts;
      if (source.includes(' ')) {
        parts = source.split(/\s+/).filter(Boolean);
      } else {
        // 2글자씩 묶어서 타일 생성
        const chars = [...source];
        parts = [];
        for (let i = 0; i < chars.length; i += 2) {
          parts.push(chars.slice(i, Math.min(i + 2, chars.length)).join(''));
        }
      }
      if (parts.length < 2) parts = [...source];

      const correctOrder = [...parts];
      let shuffled = [...parts].sort(() => Math.random() - 0.5);
      let att = 0;
      while (shuffled.join('') === correctOrder.join('') && att < 8) { shuffled.sort(() => Math.random() - 0.5); att++; }

      if (hintEl) hintEl.textContent = '힌트: ' + cur.korean;
      if (fbEl) fbEl.style.display = 'none';
      if (nxtBtn) nxtBtn.style.display = 'none';
      if (checkBtn) checkBtn.disabled = false;

      const placed = [];
      dropEl.innerHTML = '<div class="wg-drop-placeholder">여기에 클릭해서 단어를 놓으세요</div>';
      bankEl.innerHTML = '';

      function wgUpdateDrop() {
        const ph = dropEl.querySelector('.wg-drop-placeholder');
        if (ph) ph.style.display = placed.length ? 'none' : 'block';
      }

      function wgMakeBankTile(word) {
        const tile = document.createElement('button');
        tile.className = 'wg-word-tile';
        tile.textContent = word;
        tile.onclick = () => {
          placed.push(word);
          tile.remove();
          const dt = document.createElement('span');
          dt.className = 'wg-dropped-tile';
          dt.textContent = word;
          dt.onclick = () => {
            placed.splice(placed.lastIndexOf(word), 1);
            dt.remove();
            wgUpdateDrop();
            bankEl.appendChild(wgMakeBankTile(word));
          };
          dropEl.appendChild(dt);
          wgUpdateDrop();
        };
        return tile;
      }

      shuffled.forEach(w => bankEl.appendChild(wgMakeBankTile(w)));

      if (checkBtn) checkBtn.onclick = () => {
        const ok = placed.join('') === correctOrder.join('');
        if (fbEl) {
          fbEl.textContent = ok ? '✅ 정답! "' + source + '"' : '❌ 오답. 정답: "' + correctOrder.join(' ') + '"';
          fbEl.className = 'wg-feedback ' + (ok ? 'wg-fb-ok' : 'wg-fb-ng');
          fbEl.style.display = 'block';
        }
        if (nxtBtn) nxtBtn.style.display = 'block';
        checkBtn.disabled = true;
        if (ok) playAudio(source);
        _awardXP(ok ? 8 : 2, 'word_explorer_order');
      };

      if (clearBtn) clearBtn.onclick = () => {
        placed.length = 0;
        dropEl.innerHTML = '<div class="wg-drop-placeholder">여기에 클릭해서 단어를 놓으세요</div>';
        bankEl.innerHTML = '';
        if (fbEl) fbEl.style.display = 'none';
        if (nxtBtn) nxtBtn.style.display = 'none';
        if (checkBtn) checkBtn.disabled = false;
        shuffled.forEach(w => bankEl.appendChild(wgMakeBankTile(w)));
      };

      if (nxtBtn) nxtBtn.onclick = () => {
        const ni = state.vocabIndex < items.length - 1 ? state.vocabIndex + 1 : 0;
        state.vocabIndex = ni; _weShowCard(ni);
      };
    }
  }

  // ─────────────────────────────────────────────────────────────
  //  SCENE TRAINER — 회화 마스터 상황 연습
  // ─────────────────────────────────────────────────────────────
  let _stItems = [];
  let _stIndex = 0;
  let _stCorrect = 0;
  let _stWrong = 0;
  let _stCatId = null;

  function startSceneTrainer(catId) {
    trackActivity('vocab', catId);
    const cat = VOCAB_CATEGORIES.find(c => c.id === catId);
    if (!cat) return;
    _stCatId = catId;
    state.vocabCurrentCategoryId = catId;
    state.vocabSection = 'sentence';
    _stIndex = 0; _stCorrect = 0; _stWrong = 0;

    // 패널 전환
    document.getElementById('vocab-setup').style.display = 'none';
    document.getElementById('vocab-flash-panel').style.display = 'none';
    const wePanel = document.getElementById('word-explorer-panel');
    if (wePanel) wePanel.style.display = 'none';
    const panel = document.getElementById('scene-trainer-panel');
    if (!panel) return;
    panel.style.display = 'block';

    // 헤더
    document.getElementById('st-cat-name').textContent = cat.icon + ' ' + cat.name;

    // 뒤로가기
    const backBtn = document.getElementById('st-back-btn');
    if (backBtn) backBtn.onclick = vocabBackToSetup;

    // 아이템 (japanese 있는 것만)
    _stItems = getVocabCategoryItems(catId).filter(it => it.japanese);
    if (!_stItems.length) { vocabBackToSetup(); return; }

    // 완료/피드백 패널 초기화
    ['st-complete-panel','st-feedback-panel'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    ['st-sentence-display','st-practice-area','st-practice-label'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = '';
    });

    // 상황 카드
    document.getElementById('st-context-icon').textContent = cat.icon || '📖';
    document.getElementById('st-context-scene').textContent = cat.name;
    document.getElementById('st-context-desc').textContent = cat.desc || cat.subtitle || '';
    const ctxAudio = document.getElementById('st-context-audio');
    if (ctxAudio) {
      ctxAudio.style.display = 'block';
      ctxAudio.onclick = () => { const d = document.getElementById('st-context-desc'); if (d) playAudio(d.textContent); };
    }

    // 다음 버튼
    const nextBtn = document.getElementById('st-next-step-btn');
    if (nextBtn) nextBtn.onclick = _stNextStep;

    // 재시작/목록 버튼
    const replayBtn = document.getElementById('st-replay-btn');
    if (replayBtn) replayBtn.onclick = () => startSceneTrainer(catId);
    const backBtn2 = document.getElementById('st-complete-back-btn');
    if (backBtn2) backBtn2.onclick = vocabBackToSetup;

    _stShowStep(0);
  }

  function _stShowStep(idx) {
    if (idx >= _stItems.length) { _stShowComplete(); return; }
    _stIndex = idx;
    const item = _stItems[idx];
    const total = _stItems.length;

    document.getElementById('st-step-num').textContent = (idx + 1) + ' / ' + total;
    const bar = document.getElementById('st-progress-bar');
    if (bar) bar.style.width = (((idx + 1) / total) * 100) + '%';

    document.getElementById('st-sentence-jp').textContent = item.japanese || '';
    const kanjiEl = document.getElementById('st-sentence-kanji');
    if (kanjiEl) {
      kanjiEl.textContent = item.kanji ? '(' + item.kanji + ')' : '';
      kanjiEl.style.display = item.kanji ? 'block' : 'none';
    }
    document.getElementById('st-sentence-kr').textContent = item.korean || '';

    const audioBtn = document.getElementById('st-sentence-audio');
    if (audioBtn) audioBtn.onclick = () => playAudio(item.japanese);

    document.getElementById('st-feedback-panel').style.display = 'none';

    // 3개 이상이면 랜덤으로 모드 선택
    const useOrder = _stItems.length >= 4 && Math.random() < 0.5;
    if (useOrder) {
      _stSetupOrderMode(item);
    } else {
      _stSetupChoiceMode(item);
    }
  }

  function _stSetupChoiceMode(item) {
    document.getElementById('st-mode-choices').style.display = 'block';
    document.getElementById('st-mode-order').style.display = 'none';
    document.getElementById('st-practice-label').textContent = '💬 올바른 일본어 표현을 고르세요';

    const grid = document.getElementById('st-choices-grid');
    if (!grid) return;
    const others = _stItems.filter(it => it.id !== item.id).sort(() => Math.random() - 0.5).slice(0, 3);
    const choices = [item, ...others].sort(() => Math.random() - 0.5);

    grid.innerHTML = '';
    choices.forEach(ch => {
      const btn = document.createElement('button');
      btn.className = 'st-choice-btn';
      btn.innerHTML = '<span class="st-choice-jp">' + ch.japanese + '</span><span class="st-choice-kr">' + ch.korean + '</span>';
      btn.onclick = () => {
        grid.querySelectorAll('.st-choice-btn').forEach(b => { b.disabled = true; });
        const ok = ch.id === item.id;
        btn.classList.add(ok ? 'st-choice-correct' : 'st-choice-wrong');
        if (!ok) {
          grid.querySelectorAll('.st-choice-btn').forEach(b => {
            if (b.querySelector('.st-choice-jp').textContent === item.japanese) b.classList.add('st-choice-correct');
          });
        }
        _stShowFeedback(ok, item);
      };
      grid.appendChild(btn);
    });
  }

  function _stSetupOrderMode(item) {
    document.getElementById('st-mode-choices').style.display = 'none';
    document.getElementById('st-mode-order').style.display = 'block';
    document.getElementById('st-practice-label').textContent = '✏️ 단어를 올바른 순서로 배열하세요';

    const hintEl   = document.getElementById('st-order-hint');
    const dropEl   = document.getElementById('st-order-drop');
    const bankEl   = document.getElementById('st-order-bank');
    const checkBtn = document.getElementById('st-order-check');
    const clearBtn = document.getElementById('st-order-clear');
    if (!dropEl || !bankEl) return;

    const source = item.japanese;
    let parts;
    if (source.includes(' ')) {
      parts = source.split(/\s+/).filter(Boolean);
    } else {
      const chars = [...source];
      parts = [];
      for (let i = 0; i < chars.length; i += 2) {
        parts.push(chars.slice(i, Math.min(i + 2, chars.length)).join(''));
      }
    }
    if (parts.length < 2) parts = [...source];

    const correctOrder = [...parts];
    let shuffled = [...parts].sort(() => Math.random() - 0.5);
    let att = 0;
    while (shuffled.join('') === correctOrder.join('') && att < 10) { shuffled.sort(() => Math.random() - 0.5); att++; }

    if (hintEl) hintEl.textContent = item.korean;
    dropEl.innerHTML = '<div class="st-drop-placeholder">단어를 순서대로 놓으세요</div>';
    bankEl.innerHTML = '';
    if (checkBtn) checkBtn.disabled = false;

    const stPlaced = [];

    function stUpdateDrop() {
      const ph = dropEl.querySelector('.st-drop-placeholder');
      if (ph) ph.style.display = stPlaced.length ? 'none' : 'block';
    }

    function stMakeBankTile(word) {
      const tile = document.createElement('button');
      tile.className = 'st-word-tile';
      tile.textContent = word;
      tile.onclick = () => {
        stPlaced.push(word);
        tile.remove();
        const dt = document.createElement('span');
        dt.className = 'st-dropped-tile';
        dt.textContent = word;
        dt.onclick = () => {
          stPlaced.splice(stPlaced.lastIndexOf(word), 1);
          dt.remove();
          stUpdateDrop();
          bankEl.appendChild(stMakeBankTile(word));
        };
        dropEl.appendChild(dt);
        stUpdateDrop();
      };
      return tile;
    }

    shuffled.forEach(w => bankEl.appendChild(stMakeBankTile(w)));

    if (checkBtn) checkBtn.onclick = () => {
      const ok = stPlaced.join('') === correctOrder.join('');
      _stShowFeedback(ok, item);
      checkBtn.disabled = true;
    };

    if (clearBtn) clearBtn.onclick = () => {
      stPlaced.length = 0;
      dropEl.innerHTML = '<div class="st-drop-placeholder">단어를 순서대로 놓으세요</div>';
      bankEl.innerHTML = '';
      if (checkBtn) checkBtn.disabled = false;
      shuffled.forEach(w => bankEl.appendChild(stMakeBankTile(w)));
    };
  }

  function _stShowFeedback(correct, item) {
    if (correct) _stCorrect++; else _stWrong++;
    const panel  = document.getElementById('st-feedback-panel');
    const resEl  = document.getElementById('st-feedback-result');
    const corrEl = document.getElementById('st-feedback-correct');
    const tipEl  = document.getElementById('st-feedback-tip');
    if (!panel) return;

    resEl.textContent = correct ? '✅ 정답!' : '❌ 오답';
    resEl.className = 'st-feedback-result ' + (correct ? 'st-fb-ok' : 'st-fb-ng');
    corrEl.textContent = item.japanese + ' — ' + item.korean;

    if (item.tip) { tipEl.textContent = '💡 ' + item.tip; tipEl.style.display = 'block'; }
    else tipEl.style.display = 'none';

    panel.style.display = 'block';
    if (correct) playAudio(item.japanese);
    _awardXP(correct ? 10 : 3, 'scene_trainer');

    // SRS 진도 저장
    updateVocabSRS(item.id, correct ? 'ok' : 'hard', state.vocabProgress);
  }

  function _stNextStep() {
    document.getElementById('st-feedback-panel').style.display = 'none';
    const grid = document.getElementById('st-choices-grid');
    if (grid) grid.querySelectorAll('.st-choice-btn').forEach(b => { b.disabled = false; });
    const checkBtn = document.getElementById('st-order-check');
    if (checkBtn) checkBtn.disabled = false;
    _stShowStep(_stIndex + 1);
  }

  function _stShowComplete() {
    ['st-mode-choices','st-mode-order','st-feedback-panel'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    ['st-sentence-display','st-practice-area','st-practice-label'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    const ctxAudio = document.getElementById('st-context-audio');
    if (ctxAudio) ctxAudio.style.display = 'none';

    const completePanel = document.getElementById('st-complete-panel');
    if (!completePanel) return;
    completePanel.style.display = 'flex';

    const total = _stCorrect + _stWrong;
    const pct = total > 0 ? Math.round((_stCorrect / total) * 100) : 0;
    const statsEl = document.getElementById('st-complete-stats');
    if (statsEl) {
      statsEl.innerHTML =
        '<div class="st-stat"><span class="st-stat-num st-ok">' + _stCorrect + '</span><span class="st-stat-lbl">정답</span></div>' +
        '<div class="st-stat"><span class="st-stat-num st-ng">' + _stWrong + '</span><span class="st-stat-lbl">오답</span></div>' +
        '<div class="st-stat"><span class="st-stat-num">' + pct + '%</span><span class="st-stat-lbl">정확도</span></div>';
    }
  }

  // ─── 관리자 패널 ───
  (function setupAdminPanel() {
    let clickCount = 0;
    let clickTimer = null;

    // 로고를 5번 빠르게 클릭하면 관리자 패널 열림
    const logo = document.querySelector('.header-logo');
    if (logo) {
      logo.style.cursor = 'pointer';
      logo.addEventListener('click', () => {
        clickCount++;
        logo.classList.remove('admin-hint');
        void logo.offsetWidth; // reflow
        logo.classList.add('admin-hint');
        clearTimeout(clickTimer);
        if (clickCount >= 5) {
          clickCount = 0;
          openAdminPanel();
        } else {
          clickTimer = setTimeout(() => { clickCount = 0; }, 2000);
        }
      });
    }

    function openAdminPanel() {
      const overlay = document.getElementById('admin-overlay');
      if (!overlay) return;
      refreshAdminStatus();
      populateAdminLevelSelect();
      populateAdminVocabSelects();
      overlay.classList.add('open');
    }

    function closeAdminPanel() {
      document.getElementById('admin-overlay').classList.remove('open');
    }

    function refreshAdminStatus() {
      document.getElementById('adm-cur-xp').textContent = state.totalXP.toLocaleString();
      document.getElementById('adm-unlocked').textContent = state.unlockedLevels.length;
      const completed = LEVELS.filter(l => l.chars.length > 0 && getLevelProgress(l) >= 100).length;
      document.getElementById('adm-completed').textContent = completed;
    }

    function populateAdminLevelSelect() {
      const sel = document.getElementById('adm-level-select');
      sel.innerHTML = '<option value="">── 레벨 선택 ──</option>';
      LEVELS.filter(l => l.chars.length > 0).forEach(l => {
        const opt = document.createElement('option');
        opt.value = l.id;
        opt.textContent = `Level ${l.id}: ${l.title} (${l.chars.length}자)`;
        sel.appendChild(opt);
      });
    }

    function populateAdminVocabSelects() {
      if (typeof VOCAB_CATEGORIES === 'undefined') return;

      // 語彙マスター (word)
      const vocabSel = document.getElementById('adm-vocab-select');
      if (vocabSel) {
        vocabSel.innerHTML = '<option value="">── 카테고리 선택 ──</option>';
        const wGroups = {};
        VOCAB_CATEGORIES.filter(c => c.type === 'word').forEach(c => {
          const lv = c.wlevel || 1;
          if (!wGroups[lv]) wGroups[lv] = [];
          wGroups[lv].push(c);
        });
        Object.keys(wGroups).sort((a, b) => a - b).forEach(lv => {
          const grp = document.createElement('optgroup');
          grp.label = `Level ${lv}`;
          wGroups[lv].forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = `${c.name} (${(c.items || []).length}단어)`;
            grp.appendChild(opt);
          });
          vocabSel.appendChild(grp);
        });
      }

      // 会話マスター (sentence)
      const convSel = document.getElementById('adm-conv-select');
      if (convSel) {
        convSel.innerHTML = '<option value="">── 카테고리 선택 ──</option>';
        const sGroups = {};
        VOCAB_CATEGORIES.filter(c => c.type === 'sentence').forEach(c => {
          const lv = c.slevel || 1;
          if (!sGroups[lv]) sGroups[lv] = [];
          sGroups[lv].push(c);
        });
        Object.keys(sGroups).sort((a, b) => a - b).forEach(lv => {
          const grp = document.createElement('optgroup');
          grp.label = `Level ${lv}`;
          sGroups[lv].forEach(c => {
            const opt = document.createElement('option');
            opt.value = c.id;
            opt.textContent = `${c.name} (${(c.items || []).length}문장)`;
            grp.appendChild(opt);
          });
          convSel.appendChild(grp);
        });
      }
    }

    function completeVocabCategoryItems(catId) {
      if (!catId || typeof VOCAB_CATEGORIES === 'undefined') return 0;
      const cat = VOCAB_CATEGORIES.find(c => c.id === catId);
      if (!cat) return 0;
      (cat.items || []).forEach(id => {
        if (!state.vocabProgress[id]) state.vocabProgress[id] = { seen: 0, correct: 0, incorrect: 0 };
        state.vocabProgress[id].correct = 5;
        state.vocabProgress[id].seen = Math.max(state.vocabProgress[id].seen || 0, 5);
      });
      return (cat.items || []).length;
    }

    function applyAndRefresh() {
      checkLevelUnlock();
      saveToStorage();
      updateHeader();
      refreshAdminStatus();
      renderLevels();
    }

    // 닫기
    document.getElementById('admin-close-btn').addEventListener('click', closeAdminPanel);
    document.getElementById('admin-overlay').addEventListener('click', (e) => {
      if (e.target.id === 'admin-overlay') closeAdminPanel();
    });

    // XP 직접 설정
    document.getElementById('adm-xp-set').addEventListener('click', () => {
      const val = parseInt(document.getElementById('adm-xp-input').value);
      if (isNaN(val) || val < 0) { showToast('올바른 XP 값을 입력하세요.'); return; }
      state.totalXP = val;
      applyAndRefresh();
      showToast(`✅ XP를 ${val.toLocaleString()}으로 설정했습니다.`);
    });

    // XP 추가
    document.getElementById('adm-xp-add').addEventListener('click', () => {
      const val = parseInt(document.getElementById('adm-xp-input').value);
      if (isNaN(val) || val <= 0) { showToast('추가할 XP 값을 입력하세요.'); return; }
      state.totalXP += val;
      applyAndRefresh();
      showToast(`✅ ${val.toLocaleString()} XP 추가 → 총 ${state.totalXP.toLocaleString()} XP`);
    });

    // 빠른 XP 버튼
    document.querySelectorAll('.adm-quick').forEach(btn => {
      btn.addEventListener('click', () => {
        const xp = parseInt(btn.dataset.xp);
        if (btn.classList.contains('adm-quick-max')) {
          state.totalXP = xp;
          showToast(`🚀 XP MAX (${xp.toLocaleString()}) 설정!`);
        } else {
          state.totalXP += xp;
          showToast(`⚡ +${xp.toLocaleString()} XP → 총 ${state.totalXP.toLocaleString()} XP`);
        }
        applyAndRefresh();
      });
    });

    // 모든 레벨 해금
    document.getElementById('adm-unlock-all').addEventListener('click', () => {
      state.unlockedLevels = LEVELS.map(l => l.id);
      state.currentLevel = LEVELS[LEVELS.length - 1].id;
      applyAndRefresh();
      showToast('🔓 모든 레벨이 해금되었습니다!');
    });

    // 선택 레벨 완료처리
    document.getElementById('adm-level-complete').addEventListener('click', () => {
      const levelId = parseInt(document.getElementById('adm-level-select').value);
      if (!levelId) { showToast('레벨을 선택하세요.'); return; }
      const level = LEVELS.find(l => l.id === levelId);
      if (!level) return;
      level.chars.forEach(k => {
        if (!state.progress[k]) state.progress[k] = { seen: 0, correct: 0, incorrect: 0 };
        state.progress[k].correct = 5;
        state.progress[k].incorrect = 0;
        state.progress[k].seen = (state.progress[k].seen || 0) + 5;
      });
      applyAndRefresh();
      showToast(`✅ Level ${levelId} (${level.chars.length}자) 완료처리 완료!`);
    });

    // 전체 레벨 완료처리
    document.getElementById('adm-complete-all').addEventListener('click', () => {
      LEVELS.filter(l => l.chars.length > 0).forEach(level => {
        level.chars.forEach(k => {
          if (!state.progress[k]) state.progress[k] = { seen: 0, correct: 0, incorrect: 0 };
          state.progress[k].correct = 5;
          state.progress[k].incorrect = 0;
          state.progress[k].seen = (state.progress[k].seen || 0) + 5;
        });
      });
      applyAndRefresh();
      showToast('✅ 모든 레벨 완료처리 완료!');
    });

    // 語彙マスター 전체 완료처리
    document.getElementById('adm-vocab-complete-all').addEventListener('click', () => {
      if (typeof VOCAB_CATEGORIES === 'undefined') return;
      if (!confirm('어휘 마스터 전체 카테고리를 완료처리할까요?')) return;
      let total = 0;
      VOCAB_CATEGORIES.filter(c => c.type === 'word').forEach(c => { total += completeVocabCategoryItems(c.id); });
      saveToStorage();
      showToast(`✅ 어휘 마스터 ${total}단어 완료처리!`);
    });

    // 語彙マスター 선택 완료처리
    document.getElementById('adm-vocab-complete').addEventListener('click', () => {
      const catId = document.getElementById('adm-vocab-select').value;
      if (!catId) { showToast('카테고리를 선택하세요.'); return; }
      const n = completeVocabCategoryItems(catId);
      saveToStorage();
      showToast(`✅ ${n}단어 완료처리!`);
    });

    // 会話マスター 전체 완료처리
    document.getElementById('adm-conv-complete-all').addEventListener('click', () => {
      if (typeof VOCAB_CATEGORIES === 'undefined') return;
      if (!confirm('회화 마스터 전체 카테고리를 완료처리할까요?')) return;
      let total = 0;
      VOCAB_CATEGORIES.filter(c => c.type === 'sentence').forEach(c => { total += completeVocabCategoryItems(c.id); });
      saveToStorage();
      showToast(`✅ 회화 마스터 ${total}문장 완료처리!`);
    });

    // 会話マスター 선택 완료처리
    document.getElementById('adm-conv-complete').addEventListener('click', () => {
      const catId = document.getElementById('adm-conv-select').value;
      if (!catId) { showToast('카테고리를 선택하세요.'); return; }
      const n = completeVocabCategoryItems(catId);
      saveToStorage();
      showToast(`✅ ${n}문장 완료처리!`);
    });

    // 진도만 초기화
    document.getElementById('adm-reset-progress').addEventListener('click', () => {
      if (!confirm('진도(정답/오답 기록)를 초기화할까요?\nXP와 해금 상태는 유지됩니다.')) return;
      state.progress = {};
      state.vocabProgress = {};
      applyAndRefresh();
      showToast('🗑️ 진도가 초기화되었습니다.');
    });

    // 전체 초기화
    document.getElementById('adm-reset-all').addEventListener('click', () => {
      if (!confirm('⚠️ 모든 진도·XP·해금 상태를 초기화합니다.\n정말 초기화하시겠습니까?')) return;
      state.progress = {};
      state.vocabProgress = {};
      state.totalXP = 0;
      state.streak = 0;
      state.lastStudied = null;
      state.unlockedLevels = [1];
      state.currentLevel = 1;
      state.bookmarks = [];
      state.recentActivity = [];
      renderBookmarkSection();
      applyAndRefresh();
      closeAdminPanel();
      showToast('🗑️ 전체 초기화 완료.');
    });
  })();

  // ─── 롤플레이 이름 치환 ───
  // 스크립트 내 {F}/{M} 플레이스홀더를 설정된 이름으로 교체
  function resolveNames(text) {
    if (!text) return text;
    const f = state.prefs.femaleName || 'ジュヨン';
    const m = state.prefs.maleName   || 'スンヒョン';
    return text.replace(/\{F\}/g, f).replace(/\{M\}/g, m);
  }

  // ─── 학습 완료 후 퀴즈 전환 확인 ───
  function showLearnCompletePrompt(levelId) {
    // 기존 프롬프트 제거
    const existing = document.getElementById('learn-complete-prompt');
    if (existing) existing.remove();

    const prompt = document.createElement('div');
    prompt.id = 'learn-complete-prompt';
    prompt.className = 'lc-prompt-overlay';
    prompt.innerHTML = `
      <div class="lc-prompt-box">
        <div class="lc-prompt-icon">🎉</div>
        <div class="lc-prompt-title">학습 완료!</div>
        <div class="lc-prompt-desc">퀴즈로 실력을 확인할까요?</div>
        <div class="lc-prompt-btns">
          <button class="lc-prompt-btn lc-prompt-yes">✏️ 퀴즈 시작</button>
          <button class="lc-prompt-btn lc-prompt-no">나중에</button>
        </div>
      </div>
    `;
    document.body.appendChild(prompt);

    prompt.querySelector('.lc-prompt-yes').addEventListener('click', () => {
      prompt.remove();
      if (levelId) startQuizForLevel(levelId);
    });
    prompt.querySelector('.lc-prompt-no').addEventListener('click', () => {
      prompt.remove();
    });
    // 배경 클릭으로도 닫기
    prompt.addEventListener('click', (e) => {
      if (e.target === prompt) prompt.remove();
    });
  }

  // ─── vocab 플래시카드 완료 확인 팝업 ───
  function showVocabCompletePrompt() {
    const existing = document.getElementById('vocab-complete-prompt');
    if (existing) existing.remove();

    // dialogue 카테고리는 퀴즈 없음 → 그냥 완료 토스트만
    if (state.vocabMode !== 'flash') return;

    const prompt = document.createElement('div');
    prompt.id = 'vocab-complete-prompt';
    prompt.className = 'lc-prompt-overlay';
    prompt.innerHTML = `
      <div class="lc-prompt-box">
        <div class="lc-prompt-icon">🎉</div>
        <div class="lc-prompt-title">학습 완료!</div>
        <div class="lc-prompt-desc">퀴즈로 실력을 확인할까요?</div>
        <div class="lc-prompt-btns">
          <button class="lc-prompt-btn lc-prompt-yes">✏️ 퀴즈 시작</button>
          <button class="lc-prompt-btn lc-prompt-no">나중에</button>
        </div>
      </div>
    `;
    document.body.appendChild(prompt);

    prompt.querySelector('.lc-prompt-yes').addEventListener('click', () => {
      prompt.remove();
      if (state.vocabCurrentCategoryId) {
        startVocabCategory(state.vocabCurrentCategoryId, 'quiz');
      }
    });
    prompt.querySelector('.lc-prompt-no').addEventListener('click', () => { prompt.remove(); });
    prompt.addEventListener('click', (e) => { if (e.target === prompt) prompt.remove(); });
  }



  // 순차 읽기를 중단하고 해당 텍스트만 발음 (뒤집힌 카드 단어 클릭용)
  function playWord(text) {
    state.fcReadSession = (state.fcReadSession || 0) + 1;
    state.vocabReadSession = (state.vocabReadSession || 0) + 1;
    stopFcExRead();
    stopVocabExRead();
    playAudio(text);
  }

  // ═══════════════════════════════════════════════════
  //   강의 (Lecture) 기능 — YouTube 스타일 칠판 강의
  // ═══════════════════════════════════════════════════

  let _lectureSlides = [];
  let _lectureSlideIdx = 0;
  let _lecturePlaying = true;
  let _lectureTimer = null;
  let _lectureTimerFill = null;
  let _lectureFillInterval = null;
  let _lectureCatId = null;
  let _lecAudioMuted = false;   // 🔇 뮤트 토글 상태

  let _lecturePrevView = 'home';

  function startLecture(catId) {
    // 이미 강의 중이면 prevView 를 덮어쓰지 않음 (다음 강의 이어듣기 시 나가기 동작 보장)
    if (state.currentView !== 'lecture') {
      _lecturePrevView = state.currentView || 'home';
    }
    // ★ 이전 세션 타이머/TTS 완전 정리 (첫 슬라이드 스킵 방지)
    if (_lectureTimer) { clearTimeout(_lectureTimer); _lectureTimer = null; }
    if (_lectureFillInterval) { clearInterval(_lectureFillInterval); _lectureFillInterval = null; }
    window.speechSynthesis && window.speechSynthesis.cancel();
    if (state.currentVvAudio) { try { state.currentVvAudio.pause(); state.currentVvAudio.src = ''; } catch(e){} state.currentVvAudio = null; }

    _lectureCatId = catId;
    _lectureSpeakerSlot = 1; // 새 강의 시작 시 슬롯 초기화
    _lecAudioMuted = false;  // 뮤트 해제
    const ab = document.getElementById('lec-audio-btn'); if (ab) ab.textContent = '🔊';
    const cat = VOCAB_CATEGORIES.find(c => c.id === catId);
    if (!cat) { showToast('강의 데이터를 찾을 수 없습니다.'); return; }
    _lectureSlides = generateLectureSlides(cat);
    _lectureSlideIdx = 0;
    _lecturePlaying = true;

    // 독립 뷰로 전환 (showView 내부에서 stopAmbient 호출됨)
    showView('lecture');

    // 강의 뷰의 실제 top 위치를 측정해 정확한 높이 설정 (헤더+네비 높이 합산 오차 방지)
    requestAnimationFrame(() => {
      const lv = document.getElementById('view-lecture');
      if (!lv) return;
      const top = Math.round(lv.getBoundingClientRect().top);
      if (top > 0) {
        lv.style.height = `calc(100dvh - ${top}px)`;
        lv.style.maxHeight = `calc(100dvh - ${top}px)`;
      }
    });

    const nameEl = document.getElementById('lecture-cat-name');
    if (nameEl) nameEl.textContent = `${cat.icon || ''} ${cat.name}`;

    // 기본 자막 KO만 활성화
    const caption = document.getElementById('lecture-caption');
    if (caption) { caption.dataset.subJp = 'off'; caption.dataset.subKo = 'on'; }
    document.querySelectorAll('.lec-sub-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.sub === 'ko');
    });

    // 강의 배경음: 잔잔하게 시작 (일반 설정 볼륨의 60%)
    setTimeout(() => {
      if (_ambTracks.length) {
        startAmbient('on', 'dialogue');
        setTimeout(() => {
          if (_ambAudio) _ambFadeTo(_ambAudio, _ambTargetVol() * 0.6, 1500);
        }, 2200);
      }
    }, 400);

    // play 버튼 초기 상태
    const pb = document.getElementById('lec-play-btn');
    if (pb) pb.textContent = '⏸ 자동';
    // 타이머바 초기화
    const fill = document.getElementById('lecture-timer-fill');
    if (fill) { fill.style.transition='none'; fill.style.width='0%'; }

    // 이벤트 바인딩 (1회)
    _bindLectureControls();
    const compPanel = document.getElementById('lec-completion');
    if (compPanel) compPanel.style.display = 'none';
    _showLectureSlide(0);
  }

  function _generateSimLectureSlides(cat) {
    const slides = [];
    const catName = cat.name || '롤플레이';
    const catIcon = cat.icon || '🎭';
    const catDesc = cat.desc || '';
    const allItems = typeof VOCAB_ITEMS !== 'undefined'
      ? VOCAB_ITEMS.filter(v => cat.items && cat.items.includes(v.id))
      : [];

    // 카테고리별 문화/상황 노트 매핑
    const _SIM_CULTURE = {
      '레스토랑': { main: '일본 식당 에티켓', sub: '주문부터 계산까지', reading: 'いただきます・ごちそうさま', captionJp: '日本のレストランでは「いただきます」と「ごちそうさまでした」が必須マナー！店員を呼ぶ時は「すみません」と声をかけましょう。大声で呼ぶのは失礼です。お水は無料で出てきますよ！', captionKo: '일본 식당에서 "いただきます"와 "ごちそうさまでした"는 필수 예절! 점원 부를 때는 "すみません"으로 조용히 불러요. 물은 무료로 나와요!' },
      '쇼핑': { main: '일본 쇼핑 문화', sub: 'いらっしゃいませ의 세계', reading: 'いらっしゃいませ', captionJp: '日本の店員は必ず「いらっしゃいませ」と声をかけます。返事をする必要はありません！値切り交渉は基本的にNGです。消費税(10%)が別途かかることを覚えておいてください。', captionKo: '일본 점원은 반드시 "いらっしゃいませ"라고 인사해요. 답하지 않아도 돼요! 가격 흥정은 기본적으로 안 됩니다. 소비세(10%)가 별도 부과됩니다.' },
      '호텔': { main: '일본 숙박 문화', sub: '체크인부터 체크아웃까지', reading: 'チェックイン・チェックアウト', captionJp: '日本のホテルはサービスが世界一！チェックインは通常15:00から、チェックアウトは11:00まで。ルームキーは外出の際もフロントに預けないでOK。大浴場がある場合は利用時間を確認してね！', captionKo: '일본 호텔은 세계 최고 수준의 서비스! 체크인은 보통 15시부터, 체크아웃은 11시까지. 대욕장이 있으면 이용 시간을 꼭 확인하세요!' },
      '병원': { main: '일본 의료 시스템', sub: '진찰부터 처방까지', reading: '保険証(ほけんしょう)', captionJp: '日本の病院では「保険証」が必要です！外国人は「在留カード」でOK。初めて行く病院では「初診(しょしん)」の手続きが必要。薬は院内処方か調剤薬局でもらいます。', captionKo: '일본 병원에서는 "보험증(保険証)"이 필요해요! 외국인은 재류카드로 OK. 처음 가는 병원은 "초진" 절차가 필요합니다. 약은 병원 내 또는 조제약국에서 받아요.' },
      '학교': { main: '일본 학교 문화', sub: '선생님과의 대화', reading: '先生(せんせい)', captionJp: '日本の学校では先生への敬語が大切！「はい」「わかりました」は基本。授業中に発言する時は手を挙げて「先生、質問があります」と言おう。廊下でも先生に会ったら軽くお辞儀をするのがマナーです。', captionKo: '일본 학교에서는 선생님께 경어 사용이 중요! "はい", "わかりました"는 기본. 수업 중 발언할 때는 손을 들고 "선생님, 질문이 있습니다"라고 말해요.' },
      // IT 직장편
      '조회': { main: '일본 IT 직장 문화 — ほうれんそう', sub: '報告·連絡·相談が命', reading: 'ほうれんそう', captionJp: '日本のIT企業では「ほうれんそう(報告·連絡·相談)」が最重要文化！問題があればすぐに報告、変更があればすぐに連絡、迷ったらすぐに相談。「わからない」は恥ずかしくない。「報告しない」が最大のNG！', captionKo: '일본 IT 회사에서 "ほうれんそう(보고·연락·상담)"이 핵심 문화! 문제가 생기면 바로 보고, 변경이 생기면 바로 연락, 모르면 바로 상담. "모른다"는 부끄러운 게 아니에요. "보고 안 한다"가 최대 금기!' },
      '스탠드업': { main: '일본 IT 직장 문화 — ほうれんそう', sub: '報告·連絡·相談が命', reading: 'ほうれんそう', captionJp: '日本のIT企業では「ほうれんそう(報告·連絡·相談)」が最重要文化！問題があればすぐに報告、変更があればすぐに連絡、迷ったらすぐに相談。「わからない」は恥ずかしくない。「報告しない」が最大のNG！', captionKo: '일본 IT 회사에서 "ほうれんそう(보고·연락·상담)"이 핵심 문화! 문제가 생기면 바로 보고, 변경이 생기면 바로 연락, 모르면 바로 상담. "모른다"는 부끄러운 게 아니에요. "보고 안 한다"가 최대 금기!' },
      '코드': { main: '코드 리뷰 문화', sub: '謙虚に·丁寧に·建設的に', reading: 'コードレビュー', captionJp: '日本のコードレビューは「批判せず提案する」が基本スタイル！「〜はどうでしょうか？」「〜の方が良いかもしれません」など柔らかい表現を使います。LGTMは「Looks Good To Me」の略。良いコードには「良い！」ではなく「ありがとうございます」と言うのも日本流。', captionKo: '일본 코드 리뷰는 "비판하지 않고 제안한다"가 기본! "〜는 어떨까요?", "〜가 더 좋을 수도 있습니다" 등 부드러운 표현을 씁니다. LGTM = Looks Good To Me. 좋은 코드에도 "감사합니다"라고 하는 것이 일본 스타일.' },
      '킥오프': { main: 'アジャイル개발 문화', sub: 'スプリントの流れを理解しよう', reading: 'スプリント・ふりかえり', captionJp: '日本のITスタートアップはアジャイル開発が主流！スプリントプランニング→デイリースタンドアップ→スプリントレビュー→ふりかえりのサイクル。「ふりかえり」ではKPT（Keep·Problem·Try）で改善点を話し合います。', captionKo: '일본 IT 스타트업은 애자일 개발이 주류! 스프린트 플래닝 → 데일리 스탠드업 → 스프린트 리뷰 → 회고의 사이클. 회고에서는 KPT(Keep·Problem·Try)로 개선점을 이야기합니다.' },
      '1on1': { main: '일본 직장 1on1 문화', sub: '上司との信頼関係を築く', reading: 'ワンオンワン', captionJp: '日本のIT企業では月1回の1on1が一般的！上司が部下の状況を確認する場。「正直に話す」が成長への近道。弱点を伝えたら、上司はサポートする義務があります。遠慮せず「相談があります」と言って大丈夫！', captionKo: '일본 IT 회사에서는 월 1회 1on1이 일반적! 상사가 부하의 상황을 확인하는 자리. "솔직하게 말하는 것"이 성장의 지름길. 약점을 전달하면 상사는 지원할 의무가 있어요. 망설이지 말고 "상담이 있어요"라고 말해도 괜찮아요!' },
      '사양': { main: '사양 확인의 중요성', sub: '曖昧をなくすのがエンジニアの仕事', reading: '仕様確認(しようかくにん)', captionJp: '「仕様が曖昧(あいまい)なまま実装(じっそう)する」のは最大のリスク！「念(ねん)のため確認(かくにん)ですが…」「〜という意味(いみ)でしょうか？」で曖昧さを排除しよう。질문은 恥(はじ)ずかしくない！むしろ「確認できる人」が信頼されます。', captionKo: '"사양이 애매한 채로 구현한다"는 최대의 리스크! "혹시 몰라 확인인데요…", "〜라는 의미일까요?"로 애매함을 제거하세요. 질문은 부끄럽지 않아요! 오히려 "확인할 수 있는 사람"이 신뢰받습니다.' },
      '입사': { main: '일본 직장 예절', sub: '初日から印象アップのコツ', reading: 'ほうれんそう・お辞儀(おじぎ)', captionJp: '日本企業の初日は「笑顔(えがお)・挨拶(あいさつ)・メモ」が基本！名前は「〜と申(もう)します」で丁寧に。先輩には積極的に質問してOK。昼食は同僚と一緒に行くのがベター。「お疲れ様です」は退社時だけでなく、廊下でも使えます。', captionKo: '일본 회사 첫날은 "웃는 얼굴·인사·메모"가 기본! 이름은 "〜と申します"로 정중하게. 선배에게 적극적으로 질문해도 OK. 점심은 동료와 함께 가는 편이 좋아요. "お疲れ様です"는 퇴근 시뿐 아니라 복도에서도 사용 가능!' },
    };

    // 카테고리명에서 문화 노트 찾기
    let cultureNote = null;
    for (const [key, val] of Object.entries(_SIM_CULTURE)) {
      if (catName.includes(key) || catDesc.includes(key)) { cultureNote = val; break; }
    }

    // ─ 1. 오프닝: 상황 소개 ─
    const keyPhrases = allItems.slice(0,4).map(i => {
      const jp = (i.japanese || '').replace(/（[^）]*）/g,'').replace(/[〜～]/g,'');
      return jp;
    }).filter(Boolean).join(' / ');

    slides.push({
      type: 'hook', label: '상황 소개',
      main: `${catIcon} ${catName}`,
      sub: catDesc || '이 상황에서 꼭 필요한 표현들',
      reading: '',
      captionJp: `今日(きょう)は「${catName}」の場面(ばめん)を徹底(てってい)解説(かいせつ)します！実際(じっさい)の会話(かいわ)では${allItems.length}つの重要(じゅうよう)表現(ひょうげん)を使(つか)います。${catDesc ? catDesc + ' ' : ''}キーフレーズ：${keyPhrases}。しっかり身(み)につけましょう！`,
      captionKo: `「${catName}」 상황을 완전 분석합니다! ${catDesc || ''} 총 ${allItems.length}개 핵심 표현을 배워요. 키 표현: ${keyPhrases}. 완벽하게 익혀봐요!`,
      subtitleList: allItems.slice(0,5).map(i => `• ${(i.japanese||'').replace(/（[^）]*）/g,'')}`).join('\n'),
    });

    // ─ 2. 문화 노트 (카테고리별 맞춤) ─
    if (cultureNote) {
      slides.push({ type: 'culture', label: '문화 노트', ...cultureNote });
    } else {
      slides.push({
        type: 'culture', label: '문화 노트',
        main: `${catIcon} 일본 문화 포인트`,
        sub: `${catName}에서 알아야 할 것`,
        reading: '',
        captionJp: `「${catName}」の場面(ばめん)では、丁寧(ていねい)な言葉(ことば)遣(づか)いが重要(じゅうよう)です！「〜てください」より「〜ていただけますか」の方(ほう)がより丁寧(ていねい)。また、相手(あいて)の目(め)を見(み)て話(はな)すのがマナーです。`,
        captionKo: `「${catName}」 상황에서 정중한 말투가 중요해요! "〜てください"보다 "〜ていただけますか"가 더 정중한 표현이에요. 상대방 눈을 보며 이야기하는 것이 매너입니다.`
      });
    }

    // ─ 3. 핵심 표현 그룹핑 ─
    // 인사/시작 표현 (1~3번째)
    const openPhrases = allItems.slice(0, Math.min(3, allItems.length));
    // 핵심 요청/질문 표현 (4~6번째)
    const mainPhrases = allItems.slice(3, Math.min(6, allItems.length));
    // 마무리 표현 (나머지)
    const closePhrases = allItems.slice(6);

    // 그룹 1: 대화 시작 표현
    if (openPhrases.length) {
      const groupJp = openPhrases.map(i => {
        const jp = (i.japanese||'').replace(/（[^）]*）/g,'');
        return `「${jp}」(${i.korean||''})`;
      }).join('、');
      slides.push({
        type: 'group', label: '표현 그룹 ①',
        main: openPhrases.map(i => (i.japanese||'').replace(/（[^）]*）/g,'')).join(' / '),
        sub: openPhrases.map(i => i.korean||'').join(' · '),
        reading: '',
        captionJp: `まず、会話(かいわ)を始(はじ)める表現(ひょうげん)から！${groupJp}。これらは${catName}の場面(ばめん)で最初(さいしょ)に使(つか)う重要(じゅうよう)フレーズです。自然(しぜん)に言(い)えるまで練習(れんしゅう)しましょう！`,
        captionKo: `먼저 대화를 시작하는 표현부터! ${groupJp}. 이것들은 ${catName} 상황에서 처음 사용하는 핵심 표현들이에요. 자연스럽게 말할 수 있을 때까지 연습해봐요!`
      });
    }

    // 개별 표현 상세 분석 (최대 5개)
    allItems.slice(0, 5).forEach((item, i) => {
      const jp = item.japanese || '';
      const jpClean = jp.replace(/（[^）]*）|[\（）\(\)]/g, '').replace(/[〜～]/g,'');
      const readingMatch = jp.match(/[（(]([ぁ-んァ-ン・ー]+)[）)]/g);
      const reading = readingMatch ? readingMatch.map(m => m.replace(/[（）()]/g, '')).join(' ') : '';

      // 정중체/일반체 변환 정보
      const formalMap = { 'ください': 'いただけますか', 'てください': 'ていただけますか', 'ます': 'ます (ていねい)' };
      let formalNote = '';
      for (const [k,v] of Object.entries(formalMap)) {
        if (jpClean.includes(k)) { formalNote = ` ★더 공손한 표현: ${jpClean.replace(k, v)}`; break; }
      }

      // 예시 문장이 있으면 사용
      const exSentence = item.sentences && item.sentences[0];
      slides.push({
        type: 'practice', label: `표현 ${i+1}`,
        audio: jpClean || null,
        main: jpClean || jp,
        sub: item.korean || '',
        reading: reading,
        english: item.english || '',
        tip: item.tip || formalNote || '',
        captionJp: `${i+1}番目(ばんめ)のフレーズ「${jpClean}」！意味(いみ)は「${item.korean||''}」。${item.english ? `英語(えいご)では「${item.english}」。` : ''}${formalNote ? 'さらに丁寧(ていねい)に言(い)うと「' + jpClean.replace('ください','いただけますか') + '」になります。' : ''}ゆっくり発音(はつおん)してみてください！`,
        captionKo: `${i+1}번째 표현 「${jpClean}」! 뜻: 「${item.korean||''}」. ${formalNote || ''} 실제 대화에서 바로 쓸 수 있는 표현이에요!`,
        example: exSentence ? { jp: exSentence.japanese || '', ko: exSentence.meaning || '' } : null
      });
    });

    // ─ 4. 유사 표현 비교 슬라이드 ─
    if (allItems.length >= 3) {
      const pair = allItems.slice(0,2);
      const jp1 = (pair[0].japanese||'').replace(/（[^）]*）/g,'');
      const jp2 = (pair[1].japanese||'').replace(/（[^）]*）/g,'');
      slides.push({
        type: 'compare', label: '비교 분석',
        main: `${jp1} vs ${jp2}`,
        sub: `${pair[0].korean||''} vs ${pair[1].korean||''}`,
        reading: '',
        captionJp: `「${jp1}」と「${jp2}」の違(ちが)いを見(み)てみましょう！「${jp1}」は${pair[0].korean||''}という意味(いみ)で、より${jp1.endsWith('か') ? 'ていねい' : 'カジュアル'}な場面(ばめん)で使(つか)います。「${jp2}」は${pair[1].korean||''}という意味(いみ)です。場面(ばめん)によって使(つか)い分(わ)けましょう！`,
        captionKo: `「${jp1}」와「${jp2}」의 차이를 알아봐요! 「${jp1}」는 ${pair[0].korean||''}, 「${jp2}」는 ${pair[1].korean||''} 이에요. 상황에 따라 구분해서 사용합니다!`
      });
    }

    // ─ 5. 마무리 ─
    const allKo = allItems.slice(0,5).map(i => i.korean||'').join(', ');
    slides.push({
      type: 'summary', label: '정리',
      main: `✅ ${catName} 완료!`,
      sub: `총 ${allItems.length}개 표현 습득`,
      reading: '',
      captionJp: `お疲(つか)れさまでした！「${catName}」の${allItems.length}つの重要(じゅうよう)表現(ひょうげん)を学(まな)びました！覚(おぼ)えた表現(ひょうげん)：${allItems.slice(0,4).map(i=>`「${(i.japanese||'').replace(/（[^）]*）/g,'').replace(/[〜～]/g,'')}」`).join('、')}。次(つぎ)は実際(じっさい)のロールプレイに挑戦(ちょうせん)しましょう！頑張(がんば)ってね！`,
      captionKo: `수고하셨습니다! 「${catName}」의 ${allItems.length}개 핵심 표현을 배웠어요! 배운 것: ${allKo}. 이제 실전 롤플레이에 도전해봐요! 응원합니다!`
    });

    return slides;
  }

  function generateLectureSlides(cat) {
    // sim 타입: 대화 분석 강의 자동 생성
    if (cat.type === 'sim') {
      return _generateSimLectureSlides(cat);
    }
    // 1. LECTURE_DATA에 미리 작성된 스크립트가 있으면 사용 (풍부한 콘텐츠)
    const dataKey = cat.wlevel ? `wlevel_${cat.wlevel}` : cat.slevel ? `slevel_${cat.slevel}` : null;
    const prewritten = (typeof LECTURE_DATA !== 'undefined' && dataKey) ? LECTURE_DATA[dataKey] : null;

    // 카테고리의 실제 vocab items
    const items = typeof VOCAB_ITEMS !== 'undefined'
      ? VOCAB_ITEMS.filter(v => cat.items.includes(v.id)).slice(0, 7)
      : [];

    const slides = [];

    // ─ 오프닝 슬라이드 (미리 작성된 것 or 자동 생성) ─
    if (prewritten && prewritten.length > 0) {
      // 미리 작성된 훅 슬라이드 추가
      const hookSlides = prewritten.filter(s => s.type === 'hook' || s.type === 'story' || s.type === 'culture');
      hookSlides.forEach(s => slides.push({ ...s }));
    } else {
      // 자동 생성 인트로
      const keyItemsList = items.slice(0, 5).map(i => i.japanese || '').filter(Boolean).join(' · ');
      slides.push({
        type: 'title', label: '인트로', duration: 4000, audio: null,
        main: `${cat.icon || '📚'} ${cat.name}`,
        sub: cat.subtitle || '',
        reading: cat.desc || '',
        meaning: `이 단원에서 배울 것: ${keyItemsList}`,
        subtitleList: cat.subtitle ? `📋 ${cat.subtitle}` : '',
        captionJp: `みなさん、こんにちは！今日は「${cat.name}」を楽(たの)しく勉強(べんきょう)しましょう！この単元(たんげん)には${items.length}つの重要(じゅうよう)な表現(ひょうげん)があります。準備(じゅんび)はいいですか？`,
        captionKo: `여러분 안녕하세요! 오늘은 「${cat.name}」를 재미있게 공부해봐요! ${cat.desc ? cat.desc + ' ' : ''}이 단원에는 ${items.length}개의 중요 표현이 있어요. 준비됐나요?`
      });
    }

    // ─ 단어 슬라이드: 미리 작성된 메모 + 자동 생성 혼합 ─
    const WORD_NOTES = {
      // 인사
      'ありがとう':   { note: '「有難い(ありがたい)」= 있기 어렵다! 이런 친절은 세상에 드물다는 뜻. ありがとうございます(정중) ↔ ありがとう(친구)', formalAlt: 'ありがとうございます', emoji: '💝' },
      'すみません':   { note: '「済みません」= 아직 해결이 안됐어요. 사과(미안)+감사+실례 3가지로 사용! すみません(일상) ↔ 申し訳ございません(격식)', formalAlt: '申し訳ございません', emoji: '🙇' },
      'おはよう':     { note: '「お早い(おはやい)」→ おはようさん → おはよう로 줄었어요! 친구: おはよう / 선생님·직장: おはようございます', formalAlt: 'おはようございます', emoji: '☀️' },
      'こんにちは':   { note: '「今日はご機嫌いかがですか」의 극약 생략! 낮(10~17시) 인사. こんにちは(일반) ↔ こんにちは(없음, 이미 중립적)', formalAlt: 'こんにちは', emoji: '🌸' },
      'こんばんは':   { note: '「今晩はご機嫌いかがですか」의 생략! 저녁(17시~) 인사. 밤이 되면 おやすみなさい', formalAlt: 'おやすみなさい', emoji: '🌙' },
      'よろしく':     { note: '영어로 번역 불가! "잘 부탁해요+기대해요+앞으로도 잘" 모두 포함. よろしく(친구) ↔ よろしくお願いします(공식)', formalAlt: 'よろしくお願いいたします', emoji: '🤝' },
      // 숫자
      'いち':         { note: '一(いち) — 한자 一의 획 1개! 전화번호에서 주의: いち와 しち(7)는 발음이 비슷해서 혼동 주의!', formalAlt: '', emoji: '①' },
      'に':           { note: '二(に) — 두 줄! 날짜에서도 사용: 2月2日 = にがつふつか', formalAlt: '', emoji: '✌️' },
      'し':           { note: '四(し) = 死(し)와 발음 같아 불길! 그래서 よん이라고도 해요. 병원에서는 반드시 よん을 씀!', formalAlt: 'よん (병원·공식)', emoji: '😱' },
      'しち':         { note: '七(しち) = 얼핏 いち(1)와 혼동될 수 있어요. 전화에서는 なな(なな)라고 또렷이 말해요!', formalAlt: 'なな (전화·방송)', emoji: '7️⃣' },
      // 동사
      '食べる':       { note: '2그룹 동사(いちだん)! 食べます(정중) / 食べない(부정) / 食べて(て형). "食"=먹다, 자주 쓰이는 일상 동사', formalAlt: '食べます・召し上がります(존경)', emoji: '🍽️' },
      '飲む':         { note: '1그룹 동사(ごだん)! 飲みます / 飲まない / 飲んで(て형 = ん+で 특이!). 음료·약 모두 사용', formalAlt: '飲みます・お飲みになります(존경)', emoji: '🥤' },
      '行く':         { note: '1그룹이지만 て형이 行って(不規則)! 行きます / 行かない / 行って. 가장 자주 나오는 동사 중 하나!', formalAlt: '行きます・いらっしゃいます(존경)', emoji: '✈️' },
      '来る':         { note: '3그룹 불규칙! 来ます(きます) / 来ない(こない) / 来て(きて). 읽는 방법이 바뀌어요!', formalAlt: '来ます・いらっしゃいます(존경)', emoji: '🏃' },
      'する':         { note: '3그룹 최강! 名詞+する로 뭐든 동사가 됩니다. 勉強する・料理する・クリックする…', formalAlt: 'します・なさいます(존경)', emoji: '💪' },
      'ある':         { note: '무생물의 존재: 물건·장소에 사용! ある(있다) ↔ ない(없다). 사람·동물은 いる를 씁니다!', formalAlt: 'あります・ございます(격식)', emoji: '📦' },
      'いる':         { note: '생물(사람·동물)의 존재에 사용! いる ↔ いない. "犬がいる"(개가 있다), "本がある"(책이 있다)', formalAlt: 'います・いらっしゃいます(존경)', emoji: '🐕' },
      // 형용사
      'いい':         { note: '특수 활용! いい(기본) / よくない(부정) / よかった(과거). 부정·과거형에서 よ로 바뀜!', formalAlt: 'よろしい(정중)', emoji: '👍' },
      // 물건
      '水':           { note: '水(みず) = 차가운 물. お水(おみず)라고 높임말로 자주 씀. 뜨거운 물은 お湯(おゆ)!', formalAlt: 'お水をください', emoji: '💧' },
      // IT 용어
      'バグ':         { note: 'Bug(벌레)에서 유래! 1940년대 초기 컴퓨터에 진짜 나방이 끼어 오작동한 게 시초. 「バグる」= 버그가 발생하다 (동사로도 사용!)', formalAlt: '不具合(ふぐあい)(격식)', emoji: '🐛' },
      'デプロイ':     { note: 'Deploy = 배치·배포. 코드를 서버에 올리는 것. 「本番(ほんばん)デプロイ」= 운영에 배포. 절대 금요일에는 하지 않는 문화도!', formalAlt: 'リリース・公開(こうかい)(격식)', emoji: '🚀' },
      'レビュー':     { note: 'Code Review! 「LGTM」= Looks Good To Me. PR에서 승인 시 사용. 「指摘(してき)」= 지적·코멘트. 일본은 겸손하게 "提案(ていあん)として" 라고 붙이는 경우 多', formalAlt: 'コードレビュー', emoji: '👀' },
      'スプリント':   { note: 'アジャイル(Agile) 개발의 핵심! 통상 2주간. 「スプリントプランニング」→「デイリースタンドアップ」→「スプリントレビュー」→「ふりかえり」순서로 반복', formalAlt: 'イテレーション(iteration)', emoji: '🏃' },
      // 비즈니스 표현
      'お疲れ様':     { note: '直訳: "당신의 피로함이 귀합니다". 아침·낮·저녁·메일·Slack 어디서나 사용 가능한 만능 표현! 後輩→先輩는 「お疲れ様です」, 先輩→後輩는 「お疲れ」도 OK', formalAlt: 'お疲れ様でございます(최격식)', emoji: '🙏' },
      '承知':         { note: '「承知しました」가 가장 프로다운 표현! 상사에게는 「了解(りょうかい)」보다 「承知」를 쓰세요. 「かしこまりました」는 고객 서비스 수준의 최고 격식체', formalAlt: 'かしこまりました', emoji: '✅' },
      'ほうれんそう': { note: '「報告(ほうこく)」+「連絡(れんらく)」+「相談(そうだん)」의 머리글자! 일본 직장 문화의 핵심. 이걸 잘 하면 신뢰를 얻고, 못 하면 가장 먼저 지적받는 항목', formalAlt: '報連相', emoji: '🥬' },
    };

    items.forEach((item, i) => {
      const jp = item.japanese || '';
      // 읽기 추출
      const readings = [];
      const rx = /[（(]([ぁ-ん・ー]+)[）)]/g;
      let m;
      while ((m = rx.exec(jp)) !== null) readings.push(m[1]);
      const reading = readings.join('・');

      // 단어에 맞는 노트 찾기
      const cleanWord = jp.replace(/[（(][^）)]*[）)]/g, '').replace(/[〜～]/g, '');
      const wordNote = WORD_NOTES[cleanWord] || WORD_NOTES[jp] || null;

      const captionKo = wordNote
        ? `${i + 1}번째! 「${jp}」는 「${item.korean}」. ${wordNote.note}`
        : `${i + 1}번째! 「${jp}」= 「${item.korean}」. ${item.english ? `(${item.english})` : ''} 꼭 외워두세요!`;

      const captionJp = wordNote
        ? `${i + 1}番目(ばんめ)は「${jp}」— 「${item.korean}」！${item.english ? `英語では「${item.english}」。` : ''}${wordNote.formalAlt ? `丁寧(ていねい)な表現(ひょうげん)は「${wordNote.formalAlt}」。` : ''}ゆっくり発音(はつおん)して、意味(いみ)も一緒(いっしょ)に覚(おぼ)えましょう！`
        : `${i + 1}番目(ばんめ)は「${jp}」— 「${item.korean}」！${item.english ? `英語では「${item.english}」。` : ''}${item.tip ? item.tip + ' ' : ''}しっかり覚(おぼ)えましょう！`;

      slides.push({
        type: 'word', label: cat.type === 'sentence' ? '문장' : '단어',
        duration: wordNote ? 6000 : 5000,
        audio: jp,
        main: jp, sub: item.korean, reading,
        captionJp, captionKo,
        example: item.sentences && item.sentences.length
          ? { jp: item.sentences[0].japanese || item.sentences[0].jp || '', ko: item.sentences[0].meaning || item.sentences[0].ko || '' }
          : null,
      });

      // 3~4번째 단어마다 미리 작성된 문화/팁 슬라이드 삽입
      if (prewritten && i === 2) {
        const midSlides = prewritten.filter(s => s.type === 'mnemonic' || s.type === 'funfact');
        midSlides.slice(0, 1).forEach(s => slides.push({ ...s }));
      }
    });

    // ─ 미리 작성된 추가 슬라이드 (문화노트, 퀴즈모멘트 등) ─
    if (prewritten) {
      const extraSlides = prewritten.filter(s => s.type === 'practice' || s.type === 'funfact' || s.type === 'culture');
      extraSlides.slice(0, 2).forEach(s => {
        // 이미 중간에 넣은 것 제외
        if (!slides.some(existing => existing.captionJp === s.captionJp)) {
          slides.push({ ...s });
        }
      });
    }

    // ─ 마무리 슬라이드 ─
    const prewrittenSummary = prewritten ? prewritten.find(s => s.type === 'summary') : null;
    if (prewrittenSummary) {
      slides.push({ ...prewrittenSummary });
    } else {
      const keyWords = items.slice(0, 5).map(i => i.japanese).join('、');
      slides.push({
        type: 'summary', label: '정리', duration: 5000, audio: null,
        main: '✅ 수고하셨어요!',
        sub: keyWords,
        reading: '',
        captionJp: `今日は${items.length}つの重要(じゅうよう)表現(ひょうげん)を学(まな)びました！よくできました！次(つぎ)は「学習(がくしゅう)」「一覧(いちらん)」「クイズ」で復習(ふくしゅう)してみてください！`,
        captionKo: `오늘 ${items.length}개의 중요 표현을 배웠어요! 잘 하셨어요! 다음엔 "자율학습", "일람", "퀴즈"로 복습해 보세요!`,
        example: null,
      });
    }

    return slides;
  }

  function _showLectureSlide(idx) {
    if (!_lectureSlides.length) return;
    idx = Math.max(0, Math.min(idx, _lectureSlides.length - 1));
    _lectureSlideIdx = idx;
    const slide = _lectureSlides[idx];

    // 슬라이드 정보
    const infoEl = document.getElementById('lecture-slide-info');
    if (infoEl) infoEl.textContent = `${idx + 1} / ${_lectureSlides.length}`;

    // 진행 바 (전체)
    const progFill = document.getElementById('lec-progress-fill');
    if (progFill) progFill.style.width = `${((idx + 1) / _lectureSlides.length) * 100}%`;

    // 스토리형 진행 바 (상단 개별 바)
    const storyBars = document.getElementById('lecture-progress-story');
    if (storyBars) {
      if (storyBars.children.length !== _lectureSlides.length) {
        storyBars.innerHTML = Array.from({length: _lectureSlides.length})
          .map((_, i) => `<div class="lp-bar"><div class="lp-fill"></div></div>`).join('');
      }
      Array.from(storyBars.children).forEach((bar, i) => {
        bar.className = 'lp-bar';
        if (i < idx) bar.classList.add('active');
        if (i === idx) bar.classList.add('current');
      });
    }

    // 칠판 슬라이드 애니메이션 리트리거
    const lbContent = document.querySelector('.lb-content');
    if (lbContent) { lbContent.style.animation='none'; lbContent.offsetHeight; lbContent.style.animation=''; }
    // 칠판 내용
    const typeEl = document.getElementById('lb-type-label');
    const mainEl = document.getElementById('lb-main-char');
    const readEl = document.getElementById('lb-sub-reading');
    const meaningEl = document.getElementById('lb-meaning');
    const exBox = document.getElementById('lb-example-box');
    const exJpEl = document.getElementById('lb-ex-jp');
    const exKoEl = document.getElementById('lb-ex-ko');
    if (typeEl) {
      typeEl.textContent = slide.label || '';
      typeEl.className = `lb-type-label type-${slide.type || 'word'}`;
    }
    if (mainEl) mainEl.innerHTML = slide.main ? _injectRuby(slide.main) : '';
    if (readEl) readEl.textContent = slide.reading || '';
    if (meaningEl) meaningEl.textContent = slide.meaning || '';
    if (exBox) {
      if (slide.example && (slide.example.jp || slide.example.ko)) {
        exBox.style.display = 'block';
        if (exJpEl) exJpEl.innerHTML = _injectRuby(slide.example.jp || '');
        if (exKoEl) exKoEl.textContent = slide.example.ko || '';
      } else {
        exBox.style.display = 'none';
      }
    }

    // 캡션
    const capJp = document.getElementById('lecture-caption-jp');
    const capKo = document.getElementById('lecture-caption-ko');
    if (capJp) capJp.textContent = cleanJaText(stripFurigana(slide.captionJp || ''));
    if (capKo) capKo.textContent = slide.captionKo || '';

    // lb-english, lb-tip
    const engEl = document.getElementById('lb-english');
    const tipEl = document.getElementById('lb-tip');
    if (engEl) engEl.textContent = slide.english ? `[${slide.english}]` : '';
    if (tipEl) tipEl.textContent = slide.tip || '';
    // 인트로 슬라이드에서 학습할 항목 목록 표시
    let subtitleEl = document.getElementById('lb-subtitle-list');
    if (!subtitleEl) {
      subtitleEl = document.createElement('div');
      subtitleEl.id = 'lb-subtitle-list';
      subtitleEl.className = 'lb-subtitle-list';
      const lb = document.querySelector('.lb-content');
      if (lb) lb.appendChild(subtitleEl);
    }
    subtitleEl.textContent = slide.subtitleList || '';
    subtitleEl.style.display = slide.subtitleList ? '' : 'none';
    // 칠판 내용 교체 시 애니메이션 재트리거
    [mainEl, readEl, meaningEl].forEach(el => {
      if (!el) return;
      el.style.animation = 'none';
      el.offsetHeight; // reflow
      el.style.animation = '';
    });
    // 다음장 버튼 숨김
    const ngBtn = document.getElementById('lec-next-guide-btn');
    if (ngBtn) ngBtn.style.display = 'none';
    // 재생 버튼 상태
    const playBtn2 = document.getElementById('lec-play-btn');
    if (playBtn2 && _lecturePlaying) playBtn2.textContent = '⏸ 자동';
    // captionJp TTS 읽기 → 끝나면 자동 다음 장 (영상처럼 연속 재생)
    // ★ 첫 번째 슬라이드(인트로)는 자동으로 넘어가지 않음 — TTS는 읽되 수동 진행
    const _doCaption = () => _speakLecCaption(slide.captionJp || slide.captionKo || '', () => {
      if (!_lecturePlaying || idx === 0) {
        // 일시정지 상태 또는 첫 슬라이드 → 버튼 표시
        if (ngBtn) { ngBtn.style.display = ''; ngBtn.textContent = _lectureSlideIdx >= _lectureSlides.length - 1 ? '강의 완료 ✅' : '▶ 다음 장으로'; }
        return;
      }
      if (_lectureSlideIdx < _lectureSlides.length - 1) {
        // TTS 완료 후 1.5초 대기 → 자동 다음 장
        const nextDelay = 1500;
        _startLectureTimerBar(nextDelay);
        _scheduleLectureNext(nextDelay);
      } else {
        // 마지막 슬라이드 → 완료 패널 표시
        _lecturePlaying = false;
        if (playBtn2) playBtn2.textContent = '▶ 자동';
        _showLectureCompletion();
      }
    });
    // 첫 슬라이드는 TTS 준비를 위해 500ms 대기 후 실행
    if (idx === 0) setTimeout(_doCaption, 500);
    else _doCaption();
  }

  function _showLectureCompletion() {
    const panel = document.getElementById('lec-completion');
    if (!panel) return;
    // 다음 강의 찾기 (같은 타입, 다음 wlevel/slevel/simlevel)
    const cat = typeof VOCAB_CATEGORIES !== 'undefined' ? VOCAB_CATEGORIES.find(c => c.id === _lectureCatId) : null;
    const catType = cat ? cat.type : 'word';
    let nextCat = null;
    if (cat && typeof VOCAB_CATEGORIES !== 'undefined') {
      const sameLevelCats = VOCAB_CATEGORIES.filter(c => c.type === catType);
      const curIdx = sameLevelCats.findIndex(c => c.id === cat.id);
      if (curIdx >= 0 && curIdx + 1 < sameLevelCats.length) {
        nextCat = sameLevelCats[curIdx + 1];
      }
    }
    const subEl = document.getElementById('lec-comp-sub');
    if (subEl) subEl.textContent = cat ? `「${cat.name}」 ${cat.items ? cat.items.length : ''}개 표현 완료! 다음엔 학습·퀴즈로 복습해봐요.` : '수고하셨습니다!';
    // 다음 강의 버튼
    const nextBtn = document.getElementById('lec-comp-next');
    if (nextBtn) {
      if (nextCat) {
        nextBtn.textContent = `📖 다음 강의: ${nextCat.icon || ''} ${nextCat.name}`;
        nextBtn.style.display = '';
        nextBtn.onclick = () => { panel.style.display = 'none'; startLecture(nextCat.id); };
      } else {
        nextBtn.style.display = 'none';
      }
    }
    // 실전 대화 버튼
    const dlgBtn = document.getElementById('lec-comp-dialogue');
    if (dlgBtn) {
      const hasDlg = cat && cat.dialogue;
      dlgBtn.style.display = hasDlg ? '' : 'none';
      if (hasDlg) {
        dlgBtn.onclick = () => {
          panel.style.display = 'none';
          _lecturePlaying = false;
          stopAmbient(1.5, false);
          const v = cat.type === 'sim' ? 'roleplay' : cat.type === 'sentence' ? 'convo' : 'vocab';
          showView(v);
          setTimeout(() => startVocabCategory(cat.id, 'dialogue'), 100);
        };
      }
    }
    // 홈으로 버튼
    const backBtn2 = document.getElementById('lec-comp-back');
    if (backBtn2) {
      backBtn2.onclick = () => {
        panel.style.display = 'none';
        _lecturePlaying = false;
        stopAmbient(1.5, false);
        showView(_lecturePrevView || 'home');
      };
    }
    panel.style.display = 'flex';
  }

  function _startLectureTimerBar(duration) {
    const fill = document.getElementById('lecture-timer-fill');
    if (!fill) return;
    if (_lectureFillInterval) clearInterval(_lectureFillInterval);
    fill.style.transition = 'none';
    fill.style.width = '0%';
    let elapsed = 0;
    const step = 100;
    _lectureFillInterval = setInterval(() => {
      elapsed += step;
      fill.style.width = `${Math.min((elapsed / duration) * 100, 100)}%`;
      if (elapsed >= duration) clearInterval(_lectureFillInterval);
    }, step);
  }

  function _scheduleLectureNext(delay) {
    if (_lectureTimer) clearTimeout(_lectureTimer);
    _lectureTimer = setTimeout(() => {
      if (!_lecturePlaying) return;
      if (_lectureSlideIdx < _lectureSlides.length - 1) {
        _showLectureSlide(_lectureSlideIdx + 1);
      }
      // 마지막 슬라이드는 _showLectureSlide 내 TTS 콜백에서 처리
    }, delay);
  }

  function _bindLectureControls() {
    const backBtn = document.getElementById('lecture-back-btn');
    const prevBtn = document.getElementById('lec-prev-btn');
    const playBtn = document.getElementById('lec-play-btn');
    const nextBtn = document.getElementById('lec-next-btn');
    const audioBtn = document.getElementById('lec-audio-btn');

    if (backBtn && !backBtn._lecBound) {
      backBtn._lecBound = true;
      backBtn.addEventListener('click', () => {
        if (_lectureTimer) clearTimeout(_lectureTimer);
        if (_lectureFillInterval) clearInterval(_lectureFillInterval);
        window.speechSynthesis && window.speechSynthesis.cancel();
        _lecturePlaying = false;
        stopAmbient(1.5, false); // 강의 배경음 페이드아웃
        showView(_lecturePrevView || 'home');
      });
    }
    // 자막 토글 (JP/KO 독립 토글)
    const subBtns = document.querySelectorAll('.lec-sub-btn');
    const _syncSubCaption = () => {
      const caption = document.getElementById('lecture-caption');
      if (!caption) return;
      const jpActive = !!document.querySelector('.lec-sub-btn[data-sub="jp"].active');
      const koActive = !!document.querySelector('.lec-sub-btn[data-sub="ko"].active');
      caption.dataset.subJp = jpActive ? 'on' : 'off';
      caption.dataset.subKo = koActive ? 'on' : 'off';
    };
    subBtns.forEach(btn => {
      if (!btn._subbound) {
        btn._subbound = true;
        btn.addEventListener('click', () => {
          btn.classList.toggle('active');
          _syncSubCaption();
        });
      }
    });
    if (prevBtn && !prevBtn._lecBound) {
      prevBtn._lecBound = true;
      prevBtn.addEventListener('click', () => {
        if (_lectureTimer) clearTimeout(_lectureTimer);
        if (_lectureFillInterval) clearInterval(_lectureFillInterval);
        window.speechSynthesis && window.speechSynthesis.cancel();
        if (state.currentVvAudio) { state.currentVvAudio.pause && state.currentVvAudio.pause(); state.currentVvAudio = null; }
        const ng=document.getElementById('lec-next-guide-btn'); if(ng) ng.style.display='none';
        // ★ _lecturePlaying 상태 유지 (자동/수동 모드 보존)
        const pb=document.getElementById('lec-play-btn');
        if (pb) pb.textContent = _lecturePlaying ? '⏸ 자동' : '▶ 재생';
        _showLectureSlide(_lectureSlideIdx - 1);
      });
    }
    if (nextBtn && !nextBtn._lecBound) {
      nextBtn._lecBound = true;
      nextBtn.addEventListener('click', () => {
        if (_lectureTimer) clearTimeout(_lectureTimer);
        if (_lectureFillInterval) clearInterval(_lectureFillInterval);
        window.speechSynthesis && window.speechSynthesis.cancel();
        if (state.currentVvAudio) { state.currentVvAudio.pause && state.currentVvAudio.pause(); state.currentVvAudio = null; }
        const ng=document.getElementById('lec-next-guide-btn'); if(ng) ng.style.display='none';
        // ★ _lecturePlaying 상태 유지 (자동/수동 모드 보존)
        const pb=document.getElementById('lec-play-btn');
        if (pb) pb.textContent = _lecturePlaying ? '⏸ 자동' : '▶ 재생';
        _showLectureSlide(_lectureSlideIdx + 1);
      });
    }
    if (playBtn && !playBtn._lecBound) {
      playBtn._lecBound = true;
      playBtn.addEventListener('click', () => {
        if (_lecturePlaying) {
          // 일시정지: TTS 취소 + 타이머 정지
          if (_lectureTimer) clearTimeout(_lectureTimer);
          if (_lectureFillInterval) clearInterval(_lectureFillInterval);
          window.speechSynthesis && window.speechSynthesis.cancel();
          state.currentVvAudio && state.currentVvAudio.pause && state.currentVvAudio.pause();
          _lecturePlaying = false;
          playBtn.textContent = '▶ 재생';
          // 일시정지 중 다음장 버튼 표시
          const ng = document.getElementById('lec-next-guide-btn');
          if (ng) { ng.style.display = ''; ng.textContent = _lectureSlideIdx >= _lectureSlides.length - 1 ? '강의 완료 ✅' : '▶ 다음 장으로'; }
          // 타이머바 멈춤
          const fill = document.getElementById('lecture-timer-fill');
          if (fill) { fill.style.transition = 'none'; fill.style.width = '0%'; }
        } else {
          // 재생 재개: 현재 슬라이드부터 다시
          _lecturePlaying = true;
          playBtn.textContent = '⏸ 자동';
          const ng = document.getElementById('lec-next-guide-btn');
          if (ng) ng.style.display = 'none';
          _showLectureSlide(_lectureSlideIdx);
        }
      });
    }
    const ngBtn2 = document.getElementById('lec-next-guide-btn');
    if (ngBtn2) {
      ngBtn2.onclick = () => {
        if (_lectureTimer) clearTimeout(_lectureTimer);
        window.speechSynthesis && window.speechSynthesis.cancel();
        ngBtn2.style.display = 'none';
        if (_lectureSlideIdx < _lectureSlides.length - 1) {
          // ★ _lecturePlaying 상태 유지 — 자동/수동 모드 보존
          const pb = document.getElementById('lec-play-btn');
          if (pb) pb.textContent = _lecturePlaying ? '⏸ 자동' : '▶ 재생';
          _showLectureSlide(_lectureSlideIdx + 1);
        } else {
          _lecturePlaying = false;
          showView(_lecturePrevView || 'home');
        }
      };
    }
    if (audioBtn && !audioBtn._lecBound) {
      audioBtn._lecBound = true;
      // 🔊/🔇 뮤트 토글
      audioBtn.addEventListener('click', () => {
        _lecAudioMuted = !_lecAudioMuted;
        audioBtn.textContent = _lecAudioMuted ? '🔇' : '🔊';
        audioBtn.title = _lecAudioMuted ? '음소거 중 — 다시 눌러 해제' : '음소거';
        if (_lecAudioMuted) {
          window.speechSynthesis && window.speechSynthesis.cancel();
          if (state.currentVvAudio) { state.currentVvAudio.pause && state.currentVvAudio.pause(); state.currentVvAudio = null; }
        } else {
          // 뮤트 해제 → 현재 슬라이드 다시 읽기
          const slide = _lectureSlides[_lectureSlideIdx];
          if (slide) _speakLecCaption(slide.captionJp || slide.captionKo || '', null);
        }
      });
    }
  }

  // 강의 카드 버튼도 vocab cat 카드에 추가
  function addLectureButtonToVocabCard(card, catId, catType) {
    if (catType !== 'word' && catType !== 'sentence') return;
    const actions = card.querySelector('.vcc-actions');
    if (!actions) return;
    const btn = document.createElement('button');
    btn.className = 'vcc-btn vcc-btn-lecture';
    btn.dataset.cid = catId;
    btn.textContent = '🎬 강의';
    btn.style.cssText = 'background:linear-gradient(135deg,#7c3aed,#6d28d9);color:white;';
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const cat = VOCAB_CATEGORIES.find(c => c.id === catId);
      if (cat) {
        const v = cat.type === 'sentence' ? 'convo' : 'vocab';
        showView(v);
        setTimeout(() => startLecture(catId), 100);
      }
    });
    actions.insertBefore(btn, actions.firstChild);
  }

  // ════════════════════════════════════════════════════════
  //  온보딩
  // ════════════════════════════════════════════════════════
  function _showOnboardingIfNew() {
    // XP가 0이고 진행 상황이 없으면 첫 방문
    if ((state.totalXP || 0) > 0 || Object.keys(state.progress || {}).length > 0) return;
    const overlay = document.getElementById('onboarding-overlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    const btn = document.getElementById('onboarding-start-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s';
        setTimeout(() => overlay.remove(), 350);
      });
    }
  }

  // ════════════════════════════════════════════════════════
  //  GAMIFICATION INTEGRATION - 계급·아이템·배지·미션·스트릭
  // ════════════════════════════════════════════════════════

  function _todayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  /** 게이미피케이션 초기화 — 스트릭/미션 계산, 헤더 갱신 */
  function _initGamification() {
    // 스트릭 계산
    state.streak = calculateStreak(state.lastStudied, state.streak);
    // 오늘 미션 확인/생성
    const today = _todayStr();
    if (!state.dailyMissions || state.dailyMissions.date !== today) {
      state.dailyMissions = { date: today, missions: generateDailyMissions(today) };
      state.dailyMissionProgress = {};
      saveToStorage();
    }
    _updateHeaderGamification();
  }

  /** 헤더 계급·스트릭 갱신 */
  function _updateHeaderGamification() {
    const rank = getRank(state.totalXP || 0);
    const el = (id) => document.getElementById(id);
    if (el('hdr-rank-icon'))  el('hdr-rank-icon').textContent = rank.icon;
    if (el('hdr-rank-name'))  el('hdr-rank-name').textContent = _uiRankName(rank);
    if (el('hdr-streak-num')) el('hdr-streak-num').textContent = state.streak || 0;
    // UI 레벨 적응형 라벨 갱신
    _updateUILabels();
  }

  // ═══════════════════════════════════════════════════════
  //  레벨 적응형 UI 텍스트 시스템
  //  초급(XP<600): 한국어 UI
  //  중급(XP 600~1999): 한국어 + 일본어 병기
  //  상급(XP 2000+): 일본어 (학습 목적)
  // ═══════════════════════════════════════════════════════

  function _uiTier() {
    const xp = state.totalXP || 0;
    if (xp < 600) return 'beginner';
    if (xp < 2000) return 'intermediate';
    return 'advanced';
  }

  /** 한국어 / 일본어 병기 / 일본어 — 레벨에 맞는 텍스트 반환 */
  function _uiText(ko, jp) {
    const tier = _uiTier();
    if (tier === 'beginner') return ko;
    if (tier === 'intermediate') return `${ko}(${jp})`;
    return jp;
  }

  /** 계급명: 초급 한국어, 중급 병기, 상급 일본어 */
  function _uiRankName(rank) {
    const tier = _uiTier();
    if (tier === 'beginner') return rank.nameKo;
    if (tier === 'intermediate') return `${rank.nameKo}(${rank.name})`;
    return rank.name;
  }

  /** 아이템명: 초급 한국어, 중급 병기, 상급 일본어 */
  function _uiItemName(item) {
    const tier = _uiTier();
    if (tier === 'beginner') return item.nameKo;
    if (tier === 'intermediate') return `${item.nameKo}(${item.name})`;
    return item.name;
  }

  /** 배지명: 초급 한국어 name, 중급 병기, 상급 일본어 nameJp */
  function _uiBadgeName(badge) {
    const tier = _uiTier();
    if (tier === 'beginner') return badge.name;
    if (tier === 'intermediate') return `${badge.name}(${badge.nameJp})`;
    return badge.nameJp;
  }

  // 탭/제목 라벨 정의 (ko, jp)
  const _UI_LABELS = {
    // 하단 탭
    home:     ['학습', '学ぶ'],
    practice: ['연습', '練習'],
    yomu:     ['읽기', '読む'],
    mypage:   ['마이', 'マイ'],
    // 제목
    mainTitle:    ['데니스의 일본어 마스터', 'デニスの日本語マスター'],
    practiceMode: ['✏️ 연습 모드', '✏️ 練習モード'],
    // 진도 탭
    progKana:  ['가나', 'かな'],
    progVocab: ['어휘', '語彙'],
    progStats: ['통계', '統計'],
    // 섹션 히어로 헤더
    kanaMaster:  ['가나 마스터', 'かなマスター'],
    vocabMaster: ['어휘 마스터', '語彙マスター'],
    convoMaster: ['회화 마스터', '会話マスター'],
    simRoleplay: ['실전 롤플레이', '実戦ロールプレイ'],
    // 퀴즈 타이틀
    kanaQuiz: ['가나 퀴즈', 'かな クイズ'],
    vocabQuiz: ['단어 퀴즈', '単語 クイズ'],
    // 기타 버튼
    repeatBtn: ['🔁 다시 듣기', '🔁 もう一度'],
    dialogue: ['대화', '対話'],
  };

  /** 모든 UI 라벨을 현재 레벨에 맞게 갱신 */
  function _updateUILabels() {
    const tier = _uiTier();

    // ── 하단 탭 ──
    document.querySelectorAll('.nav-tab-label[data-tab-key]').forEach(el => {
      const key = el.dataset.tabKey;
      const pair = _UI_LABELS[key];
      if (pair) el.textContent = _uiText(pair[0], pair[1]);
    });

    // ── 메인 타이틀 ──
    const mainTitle = document.getElementById('app-main-title');
    if (mainTitle) {
      const p = _UI_LABELS.mainTitle;
      mainTitle.textContent = tier === 'beginner' ? p[0] : tier === 'intermediate' ? p[0] : p[1];
      const sub = document.getElementById('app-main-subtitle');
      if (sub) sub.textContent = tier === 'advanced' ? p[0] : "Denis's Japanese Master";
    }

    // ── 연습 모드 제목 ──
    const pmTitle = document.getElementById('practice-mode-title');
    if (pmTitle) pmTitle.textContent = _uiText('✏️ 연습 모드', '✏️ 練習モード');

    // ── 진도 탭 ──
    document.querySelectorAll('.prog-tab[data-prog-key]').forEach(el => {
      const map = { kana: 'progKana', vocab: 'progVocab', stats: 'progStats' };
      const pair = _UI_LABELS[map[el.dataset.progKey]];
      if (pair) el.textContent = _uiText(pair[0], pair[1]);
    });

    // ── 읽기 뷰 제목 ──
    const yomuTitle = document.getElementById('yomu-hero-title');
    if (yomuTitle) yomuTitle.textContent = _uiText('읽기 연습', '読む — 읽기 연습');

    // ── 퀴즈 타이틀 ──
    const qiMain = document.getElementById('qi-title-main');
    const qiSub = document.getElementById('qi-title-sub');
    if (qiMain) {
      const p = _UI_LABELS.kanaQuiz;
      if (tier === 'beginner') { qiMain.textContent = p[0]; if (qiSub) qiSub.textContent = ''; }
      else if (tier === 'intermediate') { qiMain.textContent = p[1]; if (qiSub) qiSub.textContent = p[0]; }
      else { qiMain.textContent = p[1]; if (qiSub) qiSub.textContent = ''; }
    }
    const vqMain = document.getElementById('vq-title-main');
    const vqSub = document.getElementById('vq-title-sub');
    if (vqMain) {
      const p = _UI_LABELS.vocabQuiz;
      if (tier === 'beginner') { vqMain.textContent = p[0]; if (vqSub) vqSub.textContent = ''; }
      else if (tier === 'intermediate') { vqMain.textContent = p[1]; if (vqSub) vqSub.textContent = p[0]; }
      else { vqMain.textContent = p[1]; if (vqSub) vqSub.textContent = ''; }
    }
  }

  /** XP 부여 — 계급업 체크, 아이템 드롭 체크, 미션 진행, 배지 체크 */
  function _awardXP(amount, action) {
    if (!amount || amount <= 0) return;
    const prevXP = state.totalXP || 0;
    state.totalXP = prevXP + amount;

    // 계급업 체크
    {
      const prevRank = getRank(prevXP);
      const newRank  = getRank(state.totalXP);
      if (newRank.id > prevRank.id) {
        _showRankUpModal(newRank);
        _tryDropItem('rank_up');
      }
    }

    // 스트릭 갱신
    const today = _todayStr();
    if (state.lastStudied !== today) {
      if (state.lastStudied) {
        const last = new Date(state.lastStudied);
        const now = new Date(today);
        last.setHours(0,0,0,0); now.setHours(0,0,0,0);
        const diff = Math.floor((now - last) / 86400000);
        if (diff === 1) state.streak = (state.streak || 0) + 1;
        else if (diff > 1) state.streak = 1;
      } else {
        state.streak = 1;
      }
      state.lastStudied = today;
    }

    // 미션 진행: any_xp
    _advanceMission('any_xp', amount);

    // 아이템 드롭 시도
    if (action) _tryDropItem(action);

    // 배지 체크
    _checkAllBadges();

    _updateHeaderGamification();
    saveToStorage();
  }

  /** 미션 진행 */
  function _advanceMission(type, delta) {
    if (!state.dailyMissions || !state.dailyMissions.missions) return;
    let changed = false;
    state.dailyMissions.missions.forEach(m => {
      if (m.completed) return;
      if (m.type === type) {
        m.current = (m.current || 0) + (delta || 1);
        changed = true;
        if (m.current >= m.target) {
          m.completed = true;
          _awardXP(m.reward, 'daily_mission');
          _showBadgeToast('📋', '미션 완료!', m.text + ' (+' + m.reward + 'XP)');
        }
      }
    });
    if (changed) {
      saveToStorage();
      _renderMissions('daily-missions-list');
      _renderMissions('mypage-missions-list');
    }
  }

  /** 아이템 드롭 시도 */
  function _tryDropItem(action) {
    if (!shouldDropItem(action)) return;
    const item = rollRandomItem();
    if (!state.collectedItems) state.collectedItems = [];
    const isNew = !state.collectedItems.includes(item.id);
    if (isNew) state.collectedItems.push(item.id);
    _showItemDropModal(item, isNew);
  }

  /** 아이템 드롭 모달 표시 */
  function _showItemDropModal(item, isNew) {
    const rc = typeof RARITY_CONFIG !== 'undefined' ? RARITY_CONFIG[item.rarity] : null;
    const rarityLabel = rc ? rc.label : item.rarity;
    const rarityColor = rc ? rc.color : '#999';
    const overlay = document.createElement('div');
    overlay.className = 'item-drop-overlay';
    overlay.innerHTML = `
      <div class="item-drop-card rarity-${item.rarity}">
        <div class="item-drop-icon">${item.icon}</div>
        <div class="item-drop-label" style="color:${rarityColor}">${isNew ? '✨ NEW! ' : ''}${rarityLabel}</div>
        <div class="item-drop-name">${_uiItemName(item)}</div>
        <div style="font-size:12px;color:var(--gray);margin-bottom:2px">${_uiTier() !== 'beginner' ? item.nameKo : item.name}</div>
        <div class="item-drop-desc">${item.desc}</div>
        <button class="item-drop-btn">받기</button>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('.item-drop-btn').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  }

  /** 랭크업 모달 */
  function _showRankUpModal(rank) {
    const overlay = document.createElement('div');
    overlay.className = 'rankup-overlay';
    overlay.innerHTML = `
      <div class="rankup-card">
        <div class="rankup-label">RANK UP!</div>
        <div class="rankup-icon">${rank.icon}</div>
        <div class="rankup-name">${_uiRankName(rank)}</div>
        <div class="rankup-nameKo">${_uiTier() !== 'beginner' ? rank.nameKo : ''}</div>
        <button class="rankup-btn">확인</button>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('.rankup-btn').addEventListener('click', () => overlay.remove());
    setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 6000);
  }

  /** 배지 토스트 */
  function _showBadgeToast(icon, title, desc) {
    const toast = document.createElement('div');
    toast.className = 'badge-toast';
    toast.innerHTML = `
      <span class="badge-toast-icon">${icon}</span>
      <div class="badge-toast-info">
        <div class="badge-toast-title">${title}</div>
        <div class="badge-toast-desc">${desc}</div>
      </div>`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.4s'; }, 2800);
    setTimeout(() => toast.remove(), 3300);
  }

  /** 배지 전체 검사 */
  function _checkAllBadges() {
    if (!state.earnedBadges) state.earnedBadges = [];
    const s = state;
    const kanaCount = Object.keys(s.progress || {}).length;
    const vocabCount = Object.keys(s.vocabProgress || {}).length;
    const checks = {
      b_first_step:    kanaCount >= 1,
      b_hira_10:       kanaCount >= 10,
      b_hira_46:       kanaCount >= 46,
      b_kata_46:       kanaCount >= 92,
      b_kana_all:      kanaCount >= 200,
      b_quiz_first:    (s.totalQuizzes || 0) >= 1,
      b_quiz_perfect:  !!s.hadPerfectQuiz,
      b_quiz_50:       (s.totalQuizzes || 0) >= 50,
      b_quiz_streak5:  (s.quizStreak || 0) >= 5,
      b_streak_3:      (s.streak || 0) >= 3,
      b_streak_7:      (s.streak || 0) >= 7,
      b_streak_30:     (s.streak || 0) >= 30,
      b_streak_100:    (s.streak || 0) >= 100,
      b_collect_5:     (s.collectedItems || []).length >= 5,
      b_collect_15:    (s.collectedItems || []).length >= 15,
      b_collect_all:   (s.collectedItems || []).length >= RARE_ITEMS.length,
      b_collect_mythic: (s.collectedItems || []).some(id => RARE_ITEMS.find(i => i.id === id && i.rarity === 'mythic')),
      b_rank_silver:   getRankLevel(s.totalXP || 0) >= 4,
      b_rank_gold:     getRankLevel(s.totalXP || 0) >= 6,
      b_rank_master:   getRankLevel(s.totalXP || 0) >= 12,
      b_vocab_50:      vocabCount >= 50,
      b_vocab_200:     vocabCount >= 200,
      b_read_sign:     (s.signsRead || 0) >= 10,
      b_read_diary:    (s.diariesRead || 0) >= 5,
    };
    for (const [id, earned] of Object.entries(checks)) {
      if (earned && !s.earnedBadges.includes(id)) {
        s.earnedBadges.push(id);
        const badge = BADGES.find(b => b.id === id);
        if (badge) _showBadgeToast(badge.icon, _uiBadgeName(badge), badge.desc);
      }
    }
  }

  /** 마이페이지 렌더 */
  function _renderMypage() {
    const xp = state.totalXP || 0;
    const rank = getRank(xp);
    const next = getNextRank(xp);
    const progress = getRankProgress(xp);
    const el = (id) => document.getElementById(id);

    // 계급 카드
    if (el('my-rank-icon'))   el('my-rank-icon').textContent = rank.icon;
    if (el('my-rank-name'))   el('my-rank-name').textContent = _uiRankName(rank);
    if (el('my-rank-tier'))   el('my-rank-tier').textContent = (rank.tier || 'bronze').toUpperCase();
    if (el('my-rank-xp'))    el('my-rank-xp').textContent = xp + ' / ' + (next ? next.minXP : rank.minXP) + ' XP';
    if (el('my-rank-fill'))  el('my-rank-fill').style.width = Math.round(progress * 100) + '%';
    if (el('my-rank-current-label')) el('my-rank-current-label').textContent = _uiRankName(rank);
    if (el('my-rank-next-label'))    el('my-rank-next-label').textContent = next ? ('\u2192 ' + _uiRankName(next)) : 'MAX';

    // 스트릭
    if (el('my-streak-days')) el('my-streak-days').textContent = state.streak || 0;

    // 통계
    if (el('my-total-xp'))    el('my-total-xp').textContent = xp;
    if (el('my-kana-count'))  el('my-kana-count').textContent = Object.keys(state.progress || {}).length;
    if (el('my-vocab-count')) el('my-vocab-count').textContent = Object.keys(state.vocabProgress || {}).length;

    // 미션
    _renderMissions('mypage-missions-list');

    // 아이템 그리드
    _renderItems();

    // 배지 선반
    _renderBadges();

    // 버튼 바인딩
    const progBtn = el('mypage-progress-btn');
    if (progBtn && !progBtn._bound) { progBtn._bound = true; progBtn.addEventListener('click', () => showView('progress')); }
    const setBtn = el('mypage-settings-btn');
    if (setBtn && !setBtn._bound) { setBtn._bound = true; setBtn.addEventListener('click', () => { const s = document.getElementById('settings-overlay'); if (s) s.style.display = 'flex'; }); }
  }

  /** 미션 렌더 */
  function _renderMissions(containerId) {
    const container = document.getElementById(containerId);
    if (!container || !state.dailyMissions) return;
    const missions = state.dailyMissions.missions || [];
    container.innerHTML = missions.map(m => {
      const pct = Math.min(100, Math.round(((m.current || 0) / m.target) * 100));
      return `<div class="mission-card${m.completed ? ' completed' : ''}">
        <span class="mission-icon">${m.icon}</span>
        <div class="mission-info">
          <div class="mission-text">${m.text}</div>
          <div class="mission-progress">${m.current || 0} / ${m.target}</div>
          <div class="mission-progress-bar"><div class="mission-progress-fill" style="width:${pct}%"></div></div>
        </div>
        <span class="mission-reward">+${m.reward}XP</span>
        <span class="mission-check">${m.completed ? '✅' : '⬜'}</span>
      </div>`;
    }).join('');
  }

  /** 아이템 컬렉션 렌더 */
  function _renderItems() {
    const grid = document.getElementById('my-item-grid');
    if (!grid) return;
    const collected = state.collectedItems || [];
    const countEl = document.getElementById('my-item-count');
    if (countEl) countEl.textContent = `(${collected.length}/${RARE_ITEMS.length})`;
    grid.innerHTML = RARE_ITEMS.map(item => {
      const has = collected.includes(item.id);
      return `<div class="item-cell ${has ? 'collected rarity-' + item.rarity : 'locked'}" title="${has ? _uiItemName(item) + ' - ' + item.desc : '???'}">
        <span class="item-icon">${item.icon}</span>
        <span class="item-name">${has ? _uiItemName(item) : '???'}</span>
      </div>`;
    }).join('');
  }

  /** 배지 선반 렌더 */
  function _renderBadges() {
    const shelf = document.getElementById('my-badge-shelf');
    if (!shelf) return;
    const earned = state.earnedBadges || [];
    const countEl = document.getElementById('my-badge-count');
    if (countEl) countEl.textContent = `(${earned.length}/${BADGES.length})`;
    shelf.innerHTML = BADGES.map(b => {
      const has = earned.includes(b.id);
      return `<div class="badge-cell ${has ? 'earned' : 'locked'}" title="${has ? b.desc : '???'}">
        <span class="badge-icon">${has ? b.icon : '🔒'}</span>
        <span class="badge-label">${has ? _uiBadgeName(b) : '???'}</span>
      </div>`;
    }).join('');
  }

  // 연습 허브 카운트 갱신 — practice 뷰 진입 시마다 호출 가능하도록 외부 노출
  let _refreshSrsCount = null;

  /** 연습 허브 초기화 */
  function _initPracticeHub() {
    // SRS 복습 카드
    _refreshSrsCount = () => {
      const kanaItems  = getSRSReviewItems(state.progress || {});
      const vocabItems = getVocabSRSReviewItems(state.vocabProgress || {});
      const total = kanaItems.length + vocabItems.length;
      const countEl = document.getElementById('srs-count-display');
      if (countEl) countEl.textContent = total > 0 ? total + '장' : '없음';
      const card = document.getElementById('srs-review-card');
      if (card) {
        card.style.opacity = total > 0 ? '1' : '0.6';
        const subEl = card.querySelector('.srs-sub-text');
        if (subEl) {
          if (total > 0) {
            const parts = [];
            if (kanaItems.length)  parts.push(`가나 ${kanaItems.length}장`);
            if (vocabItems.length) parts.push(`어휘 ${vocabItems.length}장`);
            subEl.textContent = parts.join(' · ') + ' · SM-2 간격반복';
          } else {
            subEl.textContent = '오늘 복습 항목 없음';
          }
        }
      }
    };
    _refreshSrsCount();
    // 북마크 카운트
    const bmBadge = document.getElementById('bookmark-count-badge');
    if (bmBadge) {
      const cnt = (state.bookmarks || []).length;
      bmBadge.textContent = cnt;
      bmBadge.style.display = cnt > 0 ? '' : 'none';
    }
    // 카드 클릭 바인딩
    const bind = (id, fn) => {
      const el = document.getElementById(id);
      if (el && !el._bound) { el._bound = true; el.addEventListener('click', fn); }
    };
    bind('phc-kana-quiz', () => showView('kana'));
    bind('phc-vocab-quiz', () => showView('vocab'));
    bind('phc-write', () => showView('write'));
    bind('phc-bookmark', () => { showView('home'); setTimeout(() => { const s = document.getElementById('bookmark-section'); if (s) s.scrollIntoView({behavior:'smooth'}); }, 200); });
    bind('srs-review-card', () => _startSRSReview());
    // 미션 렌더
    _renderMissions('daily-missions-list');
  }

  /** SRS 복습 시작 — 가나 + 어휘 복습 모두 처리 */
  function _startSRSReview() {
    const kanaItems  = getSRSReviewItems(state.progress || {});
    const vocabItems = getVocabSRSReviewItems(state.vocabProgress || {});

    const totalCount = kanaItems.length + vocabItems.length;
    if (totalCount === 0) {
      showToast('오늘 복습할 항목이 없습니다! 플래시카드를 먼저 학습해보세요. 🌱');
      return;
    }

    // ── 가나 복습 우선, 어휘 복습은 가나가 없을 때 또는 동시에 있을 때 어휘 먼저 ──
    if (vocabItems.length > 0) {
      // 어휘 복습: vocab 플래시카드로
      const vocabItemObjs = vocabItems
        .map(i => typeof VOCAB_MAP !== 'undefined' ? VOCAB_MAP[i.id] : null)
        .filter(Boolean);

      if (vocabItemObjs.length === 0 && kanaItems.length === 0) {
        showToast('복습 데이터를 찾을 수 없습니다.'); return;
      }

      if (vocabItemObjs.length > 0) {
        state.vocabItems   = vocabItemObjs;
        state.vocabIndex   = 0;
        state.vocabFlipped = false;
        state.vocabMode    = 'flash';
        state.vocabCurrentCategoryId = null;
        state.vocabSection = 'word';   // 기본 섹션으로 귀속

        showView('vocab');
        state.vocabCurrentCategoryId = null;
        state.vocabSection = 'word';
        const srsSubtitle = vocabItemObjs.length + '개 단어 · SM-2 간격반복' +
          (kanaItems.length > 0 ? ' (가나 ' + kanaItems.length + '자는 다음에)' : '');
        setTimeout(() => { _startWordExplorerDirect(vocabItemObjs, '🔄 SRS 어휘 복습', srsSubtitle); }, 150);
        return;
      }
    }

    // ── 가나 복습 ──
    const kanas = kanaItems.map(i => i.kana).filter(k => KANA_MAP[k]);
    if (kanas.length === 0) { showToast('복습할 항목을 찾을 수 없습니다.'); return; }

    showView('kana');
    setTimeout(() => {
      state.learnMode    = 'flash';
      state.learnLevelId = 0;
      state.learnChars   = kanas.map(k => ({ kana: k, ...KANA_MAP[k] }));
      state.learnIndex   = 0;
      state.learnFlipped = false;

      const levelSelectArea = document.getElementById('level-select-area');
      const learnArea       = document.getElementById('learn-area');
      if (levelSelectArea) levelSelectArea.style.display = 'none';
      if (learnArea)       learnArea.style.display = 'block';

      const titleEl = document.querySelector('#learn-area .learn-header-title') ||
                      document.getElementById('learn-mode-title');
      if (titleEl) titleEl.textContent = `🔄 SRS 가나 복습 · ${kanas.length}자`;

      showFlashcard();
    }, 150);
  }

  // ─── 기존 학습 흐름에 XP 훅 삽입 ───
  // (이 함수들은 기존 코드의 적절한 위치에서 호출됨)

  /** 플래시카드 자가평가 시 호출 */
  function _onFlashcardRate(rating) {
    const xpMap = { good: 5, ok: 3, hard: 1 };
    _awardXP(xpMap[rating] || 2, null);
    _advanceMission('flashcard_flip', 1);
    _advanceMission('kana_learn', 1);
    // SRS 업데이트
    const char = state.learnChars[state.learnIndex];
    if (char && char.kana) {
      updateSRS(char.kana, rating, state.progress);
    }
  }

  /** 퀴즈 문제 정답 시 호출 */
  function _onQuizCorrect() {
    _awardXP(5, null);
    _advanceMission('quiz_correct', 1);
    state.quizStreak = (state.quizStreak || 0) + 1;
  }

  /** 퀴즈 오답 시 */
  function _onQuizWrong() {
    state.quizStreak = 0;
  }

  /** 퀴즈 완료 시 호출 */
  function _onQuizComplete(score, total) {
    state.totalQuizzes = (state.totalQuizzes || 0) + 1;
    _advanceMission('quiz_play', 1);
    if (score === total) {
      state.hadPerfectQuiz = true;
      _awardXP(20, 'quiz_perfect');
    } else {
      _awardXP(10, 'quiz_complete');
    }
  }

  /** 어휘 학습 시 호출 */
  function _onVocabLearn() {
    _awardXP(3, null);
    _advanceMission('vocab_learn', 1);
  }

  /** 필기 연습 시 호출 */
  function _onWritePractice() {
    _awardXP(3, null);
    _advanceMission('write_practice', 1);
  }

  /** 간판 읽기 시 호출 */
  function _onSignRead() {
    state.signsRead = (state.signsRead || 0) + 1;
    _awardXP(5, 'sign_read');
    _advanceMission('sign_read', 1);
  }

  /** 일기 읽기 시 호출 */
  function _onDiaryRead() {
    state.diariesRead = (state.diariesRead || 0) + 1;
    _awardXP(8, 'diary_read');
    _advanceMission('diary_read', 1);
  }

  // ─── 공개 API ───
  return {
    init,
    showView,
    flipCard,
    playAudio,
    playWord,
    startReview,
    startVocabReview,
    startLearn,
    startQuizForLevel,
    startAllBrowse,
    toggleWriteExam,
    writeExamCheck,
    writeExamResult,
    vocabFlipCard,
    vocabBackToSetup,
    startVocabCategory,
    startWordExplorer,
    startSceneTrainer,
    _startWordExplorerDirect,
    showQuizHub,
    showFqStart,
    removeBookmark,
    stopAllAudio,
    playTestVoice,
    // 게이미피케이션 훅
    _onFlashcardRate,
    _onQuizCorrect,
    _onQuizWrong,
    _onQuizComplete,
    _onVocabLearn,
    _onWritePractice,
    _onSignRead,
    _onDiaryRead
  };
})();

// ES6 모듈 환경에서도 HTML onclick="App.xxx()" 접근 가능하도록 전역 노출
window.App = App;

// 음성 목록 로드 (비동기)
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

document.addEventListener('DOMContentLoaded', () => App.init());
