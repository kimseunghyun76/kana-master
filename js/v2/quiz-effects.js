/* ============================================================
   QUIZ EFFECTS — HUD, SFX, and answer feedback effects
   ============================================================ */

'use strict';

window.QuizEffects = (() => {
  let _sfxCtx = null;

  async function _getSfxContext() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!_sfxCtx || _sfxCtx.state === 'closed') {
      _sfxCtx = new AudioCtx();
    }
    if (_sfxCtx.state === 'suspended') {
      try { await _sfxCtx.resume(); } catch {}
    }
    return _sfxCtx;
  }

  function renderHud(current, total, correct, wrong) {
    const pct = total > 0 ? Math.round((current / total) * 100) : 0;
    return `
      <div class="quiz-hud">
        <div class="quiz-hud-label">진행</div>
        <div class="quiz-hud-value">${current}<span>/${total}</span></div>
        <div class="quiz-hud-bar">
          <div class="quiz-hud-bar-fill" style="width:${pct}%"></div>
        </div>
        <div class="quiz-hud-stats">
          <div class="quiz-hud-chip quiz-hud-chip-ok">
            ${UIIcons.svg('check', 'quiz-hud-icon')}
            <span>${correct}</span>
          </div>
          <div class="quiz-hud-chip quiz-hud-chip-ng">
            ${UIIcons.svg('close', 'quiz-hud-icon')}
            <span>${wrong}</span>
          </div>
        </div>
      </div>
    `;
  }

  async function playAnswer(isCorrect) {
    try {
      const ctx = await _getSfxContext();
      if (!ctx) return;
      const now = ctx.currentTime + 0.01;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.linearRampToValueAtTime(isCorrect ? 0.62 : 0.5, now + 0.01);
      master.gain.exponentialRampToValueAtTime(0.0001, now + (isCorrect ? 0.58 : 0.46));
      master.connect(ctx.destination);

      const playVoice = (type, startFreq, endFreq, startAt, duration, gainAmount) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        osc.type = type;
        osc.frequency.setValueAtTime(startFreq, startAt);
        if (endFreq !== startFreq) {
          osc.frequency.exponentialRampToValueAtTime(endFreq, startAt + duration);
        }
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(isCorrect ? 5600 : 2100, startAt);
        filter.Q.value = isCorrect ? 0.7 : 1.2;
        gain.gain.setValueAtTime(0.0001, startAt);
        gain.gain.linearRampToValueAtTime(gainAmount, startAt + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(master);
        osc.start(startAt);
        osc.stop(startAt + duration + 0.02);
      };

      if (isCorrect) {
        playVoice('square', 659, 1318, now, 0.12, 0.16);
        playVoice('triangle', 988, 1976, now + 0.055, 0.14, 0.18);
        playVoice('sine', 1568, 2637, now + 0.13, 0.17, 0.13);
        playVoice('triangle', 2093, 3136, now + 0.21, 0.12, 0.08);
      } else {
        playVoice('sawtooth', 196, 110, now, 0.2, 0.2);
        playVoice('square', 146, 92, now + 0.07, 0.22, 0.13);
      }
    } catch(e) { /* AudioContext unsupported */ }

    const body = document.getElementById('flowBody');
    if (!body) return;

    if (isCorrect) {
      const correctBtn = document.querySelector('.quiz-choice.correct');
      if (correctBtn) _spawnSparks(correctBtn, 'correct');
      body.classList.remove('quiz-correct-sheen');
      void body.offsetWidth;
      body.classList.add('quiz-correct-sheen');
      setTimeout(() => body.classList.remove('quiz-correct-sheen'), 760);
    } else {
      body.classList.remove('quiz-wrong-shake');
      void body.offsetWidth;
      body.classList.add('quiz-wrong-shake');
      _spawnSparks(body, 'wrong');
      setTimeout(() => body.classList.remove('quiz-wrong-shake'), 600);
    }
  }

  async function playFanfare(level = 'pass') {
    try {
      const ctx = await _getSfxContext();
      if (!ctx) return;
      const now = ctx.currentTime + 0.02;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.linearRampToValueAtTime(level === 'excellent' ? 0.5 : 0.42, now + 0.03);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);
      master.connect(ctx.destination);

      const notes = level === 'excellent'
        ? [523.25, 659.25, 783.99, 1046.5, 1318.51]
        : [440, 554.37, 659.25, 880];

      notes.forEach((freq, i) => {
        const start = now + i * 0.11;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        osc.type = i % 2 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, start);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(6200, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.linearRampToValueAtTime(0.16 - i * 0.014, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.34);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(master);
        osc.start(start);
        osc.stop(start + 0.38);
      });

      const bass = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bass.type = 'triangle';
      bass.frequency.setValueAtTime(level === 'excellent' ? 130.81 : 110, now);
      bass.frequency.exponentialRampToValueAtTime(level === 'excellent' ? 196 : 164.81, now + 0.56);
      bassGain.gain.setValueAtTime(0.0001, now);
      bassGain.gain.linearRampToValueAtTime(0.1, now + 0.04);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
      bass.connect(bassGain);
      bassGain.connect(master);
      bass.start(now);
      bass.stop(now + 0.78);
    } catch(e) { /* AudioContext unsupported */ }
  }

  function _spawnSparks(el, mode = 'correct') {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = mode === 'correct'
      ? ['#f8fafc', '#dbeafe', '#bfdbfe', '#c4b5fd', '#86efac', '#fde68a']
      : ['#fecaca', '#fca5a5', '#f87171', '#fdba74', '#fed7aa'];

    const halo = document.createElement('div');
    halo.style.cssText = `
      position: fixed; z-index: 9998; pointer-events: none;
      width: 18px; height: 18px; border-radius: 999px;
      left:${cx}px; top:${cy}px; transform: translate(-50%, -50%);
      background: radial-gradient(circle, rgba(255,255,255,.95) 0%, rgba(129,140,248,.35) 42%, rgba(129,140,248,0) 72%);
      animation: quizLuxuryHalo .72s cubic-bezier(.2,.8,.2,1) forwards;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(halo);
    setTimeout(() => halo.remove(), 800);

    const count = mode === 'correct' ? 22 : 16;
    for (let i = 0; i < count; i++) {
      const sp = document.createElement('div');
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
      const dist  = (mode === 'correct' ? 34 : 22) + Math.random() * (mode === 'correct' ? 58 : 36);
      sp.style.cssText = `
        position:fixed; z-index:9999; pointer-events:none;
        width:${7 + Math.random() * 10}px; height:${4 + Math.random() * 5}px;
        border-radius:999px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        box-shadow:0 0 16px rgba(255,255,255,.28);
        left:${cx}px; top:${cy}px; transform:translate(-50%, -50%);
        --tx:${Math.cos(angle) * dist}px; --ty:${Math.sin(angle) * dist}px;
        animation: v2SparkFly 0.68s cubic-bezier(.18,.8,.25,1) forwards;
        animation-delay:${Math.random() * 0.05}s;
        opacity:.95;
      `;
      document.body.appendChild(sp);
      setTimeout(() => sp.remove(), 760);
    }
  }

  return { renderHud, playAnswer, playFanfare };
})();
