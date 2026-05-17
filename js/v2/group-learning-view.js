/* ============================================================
   GROUP LEARNING VIEW - compact pattern study
   ============================================================ */

'use strict';

window.createGroupLearningView = (ctx) => {
  const {
    TTS,
    cssUrlValue,
    jsString,
    uiIconSvg,
  } = ctx;
  const gameUi = !!ctx.gameUi;

  const sets = window.GROUP_LEARNING_SETS || [];
  const visibleSets = () => gameUi ? sets : sets.slice(0, 5);
  let openSetId = null;

  function renderSection() {
    return `
      <section class="group-learning-band">
        <div class="group-learning-head">
          <div>
            <div class="group-kicker">묶음 학습</div>
            <div class="group-title">따로 외우면 헷갈리는 단어를 한 화면에서 정리</div>
          </div>
          <button class="group-play-all" onclick="App.playGroupLearning('${jsString(visibleSets()[0]?.id || '')}')">
            ${uiIconSvg('play', 'group-play-icon')} 추천 묶음 듣기
          </button>
        </div>
        <div class="group-set-grid">
          ${visibleSets().map(set => _renderSetCard(set)).join('')}
        </div>
      </section>
    `;
  }

  function _renderSetCard(set) {
    const preview = set.items.slice(0, 4).map(item => `
      <span class="group-preview-chip">${escHtml(item.kanji || item.jp)}</span>
    `).join('');
    return `
      <button class="group-set-card" onclick="App.openGroupLearning('${jsString(set.id)}')">
        <span class="group-set-content">
          <span class="group-set-top">
            <span class="group-set-icon">${escHtml(set.icon)}</span>
            <span class="group-set-count">${set.items.length}개</span>
          </span>
          <span class="group-set-title">${escHtml(set.title)}</span>
          <span class="group-set-sub">${escHtml(set.subtitle)}</span>
          <span class="group-preview-row">${preview}</span>
        </span>
      </button>
    `;
  }

  function open(setId) {
    openSetId = setId;
    renderOverlay();
  }

  function close() {
    openSetId = null;
    document.getElementById('groupLearningOverlay')?.remove();
    TTS.stop();
  }

  function renderOverlay() {
    const set = _findSet(openSetId);
    if (!set) return;
    document.getElementById('groupLearningOverlay')?.remove();
    document.body.insertAdjacentHTML('beforeend', _renderOverlayHtml(set));
  }

  function _renderOverlayHtml(set) {
    const rows = set.items.map((item, index) => `
      <button class="group-item" onclick="App.speakGroupItem('${jsString(set.id)}', ${index})">
        <span class="group-item-main">${escHtml(item.kanji || item.jp)}</span>
        <span class="group-item-reading">${escHtml(item.jp || '')}</span>
        <span class="group-item-ko">${escHtml(item.ko || '')}</span>
        ${item.note ? `<span class="group-item-note">${escHtml(item.note)}</span>` : ''}
      </button>
    `).join('');

    return `
      <div class="group-detail-overlay" id="groupLearningOverlay" role="dialog" aria-modal="true">
        <div class="group-detail-panel">
          <div class="group-detail-hero" style="--group-detail-bg:url('${cssUrlValue(set.image)}')">
            <div class="group-detail-bg" aria-hidden="true"></div>
            <div class="group-detail-copy">
              <div class="group-kicker">패턴 카드</div>
              <h2>${escHtml(set.title)}</h2>
              <p>${escHtml(set.desc)}</p>
              <div class="group-detail-pattern">${escHtml(set.pattern)}</div>
            </div>
            <button class="group-detail-close" onclick="App.closeGroupLearning()" aria-label="닫기">
              ${uiIconSvg('close', 'group-close-icon')}
            </button>
          </div>
          <div class="group-detail-actions">
            <button class="btn btn-primary group-action-btn" onclick="App.playGroupLearning('${jsString(set.id)}')">
              ${uiIconSvg('play', 'group-btn-icon')} 전체 듣기
            </button>
            <button class="btn btn-outline group-action-btn" onclick="App.closeGroupLearning()">닫기</button>
          </div>
          <div class="group-item-grid">
            ${rows}
          </div>
        </div>
      </div>
    `;
  }

  function speakItem(setId, index) {
    const item = _findSet(setId)?.items[index];
    if (!item) return;
    TTS.stop();
    TTS.speak(item.kanji || item.jp || '');
  }

  async function playSet(setId) {
    const set = _findSet(setId);
    if (!set?.items.length) return;
    TTS.stop();
    for (const item of set.items) {
      await TTS.speak(item.kanji || item.jp || '');
    }
  }

  function _findSet(setId) {
    return sets.find(set => set.id === setId);
  }

  return { renderSection, open, close, speakItem, playSet };
};
