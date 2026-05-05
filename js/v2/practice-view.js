/* ============================================================
   PRACTICE VIEW — quick review and drills
   ============================================================ */

'use strict';

window.createPracticeView = (ctx) => {
  const {
    Store,
    getAllVocabItems,
    cssUrlValue,
    uiIconSvg,
  } = ctx;

  const PRACTICE_BG = {
    kana: 'images/lecture-scenes/kana-hiragana-study-desk.webp',
    vocab: 'images/lecture-scenes/wlevel3-calendar-time-study.png',
    kanaQuiz: 'images/lecture-scenes/kana-katakana-loanword-cafe.webp',
    vocabQuiz: 'images/lecture-scenes/slevel3-convenience-store-checkout.png',
    listening: 'images/lecture-scenes/slevel4-train-station-transfer.png',
    speaking: 'images/lecture-scenes/slevel2-self-introduction-office-lobby.png',
  };

  function render() {
    const prog = Store.get();
    const vocabUnlocked = prog.xp >= 400;
    const quizUnlocked = prog.xp >= 800;
    const allKanaChars = Object.keys(KANA_MAP || {});
    const allVocabIds = getAllVocabItems().map(item => item.id).filter(Boolean);
    const dueKanaCount = Store.countDueKana(allKanaChars);
    const dueVocabCount = Store.countDueVocab(allVocabIds);

    document.getElementById('practiceContent').innerHTML = `
      <div class="practice-section-title">빠른 복습</div>
      <div class="practice-grid">
        ${_renderCard({
          bg: PRACTICE_BG.kana,
          action: 'App.startKanaReview()',
          iconHtml: '<div class="pi-icon pi-icon-text">あア</div>',
          name: '가나 플래시카드',
          stage: dueKanaCount > 0 ? `오늘 복습 ${dueKanaCount}개` : '히라가나 · 가타가나 전체',
        })}
        ${_renderCard({
          bg: PRACTICE_BG.vocab,
          locked: !vocabUnlocked,
          action: 'App.startVocabReview()',
          iconKey: 'book',
          name: '어휘 복습',
          stage: dueVocabCount > 0 ? `오늘 복습 ${dueVocabCount}개` : '학습한 단어 전체',
        })}
        ${_renderCard({
          bg: PRACTICE_BG.kanaQuiz,
          locked: !quizUnlocked,
          action: "App.startRandomQuiz('kana')",
          iconKey: 'quiz',
          name: '가나 퀴즈',
          stage: '랜덤 20문제',
        })}
        ${_renderCard({
          bg: PRACTICE_BG.vocabQuiz,
          locked: !quizUnlocked,
          action: "App.startRandomQuiz('vocab')",
          iconKey: 'practice',
          name: '어휘 퀴즈',
          stage: '랜덤 20문제',
        })}
      </div>

      <div class="practice-section-title" style="margin-top:8px">청취 연습</div>
      <div class="practice-grid">
        ${_renderCard({
          bg: PRACTICE_BG.listening,
          locked: !quizUnlocked,
          action: 'App.startListeningQuiz()',
          iconKey: 'headphones',
          name: '듣기 퀴즈',
          stage: '음성 → 글자 맞추기',
        })}
        ${_renderCard({
          bg: PRACTICE_BG.speaking,
          locked: !quizUnlocked,
          action: 'App.startSpeakingPractice()',
          iconKey: 'mic',
          name: '따라 말하기',
          stage: '쉐도잉 연습',
        })}
      </div>
    `;
  }

  function _renderCard({ bg, locked = false, action, iconHtml, iconKey, name, stage }) {
    const icon = iconHtml || `<div class="pi-icon">${uiIconSvg(iconKey, 'pi-icon-svg')}</div>`;
    return `
      <div class="practice-item practice-visual-card ${locked ? 'locked' : ''}"
           style="--practice-bg:url('${cssUrlValue(bg)}')"
           onclick="${locked ? '' : action}">
        <div class="practice-card-bg" aria-hidden="true"></div>
        <div class="practice-card-content">
          ${icon}
          <div class="pi-name">${name}</div>
          <div class="pi-stage">${stage}</div>
        </div>
        ${locked ? `<div class="pi-lock">${uiIconSvg('lock', 'pi-lock-icon')}</div>` : ''}
      </div>
    `;
  }

  return { render };
};
