/* ============================================================
   Quiz Result and Retry Screens
   ============================================================ */

'use strict';

function createQuizResultFlow(ctx) {
  function showRetryTransition(count, onStart) {
    document.getElementById('flowBody').innerHTML = `
      <div class="completion-screen">
        <div class="completion-emoji">${ctx.uiIconSvg('progress', 'completion-main-icon')}</div>
        <div class="completion-title">오답 다시 풀기</div>
        <div class="completion-sub">
          잠깐만요! 방금 틀렸던 <strong>${count}문제</strong>를<br>
          제대로 익혔는지 다시 한번 확인해볼까요?
          <div style="font-size:11px;color:var(--text3);margin-top:12px;opacity:0.8">
            * 진도는 통과할 때만 반영되고, 점수는 첫 시도 기준으로 계산됩니다.
          </div>
        </div>
      </div>
    `;
    document.getElementById('flowFooter').innerHTML = `
      <button class="btn btn-primary" onclick="App._startRetryPhase()">시작하기 →</button>
    `;
    ctx.getFlow()._onRetryStart = onStart;
  }

  function startRetryPhase() {
    if (ctx.getFlow()._onRetryStart) ctx.getFlow()._onRetryStart();
  }

  function showQuizResult(correct, total, stepIndex, score) {
    const pct = score;
    const passRate = parseInt(Store.getSetting('quizPassRate')) || 60;
    const passed = pct >= passRate;

    const tiers = [
      {
        min: 90,
        icon: 'sparkle',
        title: '정말 인상적인 결과예요',
        jp: '最高(さいこう)です。この調子(ちょうし)でどんどん伸(の)びていけます！',
        ko: '최고예요. 이 흐름이면 다음 단계도 아주 좋게 이어질 거예요.',
        msg: '이번 점수는 단순히 많이 맞춘 결과가 아니라, 보고 바로 떠올리는 힘이 분명히 자라고 있다는 증거예요. 지금처럼 차분하게 쌓아 가면 읽기와 말하기 모두 훨씬 더 자연스럽게 붙기 시작할 거예요.'
      },
      {
        min: 70,
        icon: 'check',
        title: '실력이 분명히 올라오고 있어요',
        jp: '立派(りっぱ)です。もう一歩(いっぽ)でぐっと自然(しぜん)になります！',
        ko: '아주 좋아요. 이제 조금만 더 다듬으면 훨씬 자연스러워질 거예요.',
        msg: '핵심은 이미 잘 잡혀 있고, 헷갈린 부분도 다시 보면 금방 메울 수 있는 상태예요. 오늘 맞힌 문제들로 자신감을 얻고, 틀린 몇 가지만 다시 정리하면 다음 도전에서는 훨씬 단단하게 통과할 수 있어요.'
      },
      {
        min: 50,
        icon: 'progress',
        title: '좋은 흐름으로 가고 있어요',
        jp: 'いいですね。今(いま)は土台(どだい)をしっかり作(つく)っているところです。',
        ko: '좋아요. 지금은 기초를 제대로 다지는 아주 중요한 구간이에요.',
        msg: '점수 하나로 실력을 판단할 필요는 없어요. 지금 단계에서는 서두르기보다 자주 헷갈리는 부분을 익숙하게 만드는 것이 더 중요합니다. 한 번 더 천천히 보면 머리에 훨씬 오래 남을 거예요.'
      },
      {
        min: 0,
        icon: 'target',
        title: '지금부터가 진짜 실력이 붙는 구간이에요',
        jp: '頑張(がんば)りましょう。今日(きょう)の復習(ふくしゅう)が明日(あした)の自信(じしん)になります。',
        ko: '괜찮아요. 오늘의 복습이 내일의 자신감으로 이어질 거예요.',
        msg: '틀린 문제는 부족함의 증거가 아니라, 다음에 훨씬 쉽게 떠올리게 될 힌트예요. 너무 조급해하지 말고 이번에 헷갈린 부분만 한 번 더 보면, 바로 다음 도전에서 체감이 달라질 거예요.'
      }
    ];
    const res = tiers.find(t => pct >= t.min);

    const xpEarned = Math.round((pct / 100) * 100 + 20);
    const awardedXP = passed ? xpEarned : 0;
    const passBadge = passed
      ? `<div class="v2-pass-badge v2-pass-ok">${ctx.uiIconSvg('check', 'pass-badge-icon')} 통과! (기준 ${passRate}%)</div>`
      : `<div class="v2-pass-badge v2-pass-ng">${ctx.uiIconSvg('close', 'pass-badge-icon')} 재도전 필요 (기준 ${passRate}%, 현재 ${pct}%)<br><span style="font-size:12px;opacity:.8">통과 전에는 다음 단계로 넘어가지 않습니다.</span></div>`;

    Store.recordStepAttempt(ctx.getFlow().moduleId, stepIndex, score, passed);
    if (passed) {
      Store.completeStep(ctx.getFlow().moduleId, stepIndex, score);
      Store.addXP(awardedXP);
    }

    if (passed && pct >= 50) {
      const excellent = pct >= 90;
      ctx.playQuizFanfare?.(excellent ? 'excellent' : 'pass');
      confetti(excellent ? 16 : 8);
      setTimeout(() => TTS.speak(stripFuri(res.jp)), 600);
    }

    document.getElementById('flowBody').innerHTML = `
      <div class="score-screen fanfare-burst ${passed ? 'score-screen-passed' : ''}">
        ${passed ? '<div class="score-fanfare-ring score-fanfare-ring-a"></div><div class="score-fanfare-ring score-fanfare-ring-b"></div>' : ''}
        <div class="score-emoji">${ctx.uiIconSvg(res.icon, 'score-tier-icon')}</div>
        <div class="score-title">${res.title}</div>
        <div class="score-exclamation">${ruby(res.jp)}</div>
        <div class="score-msg">${res.msg}</div>
        <div class="score-ring" id="scoreRing">
          <div class="score-pct">${pct}%</div>
        </div>
        <div class="score-subtitle" style="margin-top:20px">${correct} / ${total} 정답</div>
        ${passBadge}
        <div class="xp-earned">${passed ? `+<span class="xp-num">${awardedXP}</span> XP 획득!` : '이번에는 XP 획득 없이 재도전합니다.'}</div>
      </div>
    `;
    updateScoreRing(document.getElementById('scoreRing'), pct);

    document.getElementById('flowFooter').innerHTML = `
      <button class="btn btn-primary" onclick="App._afterQuiz(${passed})">
        ${passed ? '다음 단계 →' : '다시 도전'}
      </button>
    `;
  }

  function afterQuiz(passed) {
    if (passed) {
      ctx.getFlow().step++;
      ctx.runCurrentStep();
    } else {
      ctx.runCurrentStep();
    }
  }

  return {
    showRetryTransition,
    startRetryPhase,
    showQuizResult,
    afterQuiz,
  };
}
