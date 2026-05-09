/* ============================================================
   UTILS — Shared utility functions
   ============================================================ */

'use strict';

const KANA_SMALL = /[ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ]/;
const KANA_SMALL_G = /[ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ]/g;

// ── HTML Escape ────────────────────────────────────────────
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Ruby/Furigana injection ────────────────────────────────
// Parses 漢字（よみ）patterns or accepts explicit kanji+reading
function ruby(text, reading) {
  if (!text) return '';
  
  // Get setting from store (default true if store not available yet)
  const showFuri = typeof window.Store !== 'undefined'
                   ? window.Store.getSetting('furigana') !== false
                   : true;

  if (reading) {
    if (!showFuri) return escHtml(text);
    return `<ruby>${escHtml(text)}<rt>${escHtml(reading)}</rt></ruby>`;
  }

  // If furigana is disabled, strip existing (readings) or ruby tags
  if (!showFuri) {
    return escHtml(stripFuri(text));
  }

  // Auto-parse 漢字（よみ）or 漢字(よみ). Keep ruby anchored to the kanji
  // chunk only, otherwise furigana drifts toward the center of a full word.
  const parsed = String(text).replace(
    /([\u3400-\u4dbf\u4e00-\u9faf々〆ヶ]+)[（\(]([ぁ-ヶー・]+)[）\)]/g,
    (_, base, rt) => `<ruby>${escHtml(base)}<rt>${escHtml(rt)}</rt></ruby>`
  );
  
  let final = parsed;
  if (parsed === text) {
    final = escHtml(text);
  }
  
  // Wrap small kana for styling
  return final.replace(KANA_SMALL_G, m => `<span class="small-kana">${m}</span>`);
}

function isSmallKana(c) {
  return KANA_SMALL.test(c);
}

// ── Strip furigana parentheticals ─────────────────────────
// 漢字(よみ) → 漢字  (후리가나 OFF 모드용)
function stripFuri(text) {
  if (!text) return '';
  // 1. Ruby tag removal
  let s = String(text)
    .replace(/<rt>[^<]*<\/rt>/gi, '')
    .replace(/<[^>]*>/g, '');
  // 2. Parenthesis removal
  return s.replace(/[（(][ぁ-ヶー・]+[）)]/g, '');
}

// ── Format vocab item Japanese with furigana ──────────────
function formatJp(item) {
  if (!item) return '';
  const jp = item.japanese || '';
  const kj = item.kanji || '';
  // japanese 필드에도 申(もう) 같은 패턴이 있을 수 있으므로 ruby() 사용
  if (!kj || kj === jp) return ruby(jp);
  // Full kanji
  if (/^[\u4e00-\u9faf\u3400-\u4dbf]+$/.test(kj)) {
    return `<ruby>${escHtml(kj)}<rt>${escHtml(jp)}</rt></ruby>`;
  }
  // Kanji+okurigana e.g. 食べる / たべる
  const m = kj.match(/^([\u4e00-\u9faf\u3400-\u4dbf]+)([\u3040-\u30ff].*)$/);
  if (m) {
    const [, base, oku] = m;
    if (jp.endsWith(oku)) {
      const rd = jp.slice(0, jp.length - oku.length);
      return `<ruby>${escHtml(base)}<rt>${escHtml(rd)}</rt></ruby>${escHtml(oku)}`;
    }
    return `<ruby>${escHtml(kj)}<rt>${escHtml(jp)}</rt></ruby>`;
  }
  // Pre-annotated 漢字（よみ）
  return ruby(kj);
}

// ── Shuffle array ──────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Random sample from array ───────────────────────────────
function sample(arr, n) {
  return shuffle(arr).slice(0, n);
}

// ── Clamp ─────────────────────────────────────────────────
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

// ── Format date ───────────────────────────────────────────
function todayStr() { return new Date().toISOString().slice(0, 10); }

// ── DOM helpers ───────────────────────────────────────────
function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

function show(el) { el?.classList.remove('hidden'); }
function hide(el) { el?.classList.add('hidden'); }

function setHTML(sel, html, ctx = document) {
  const el = $(sel, ctx);
  if (el) el.innerHTML = html;
}
function setText(sel, text, ctx = document) {
  const el = $(sel, ctx);
  if (el) el.textContent = text;
}

// ── Toast notification ────────────────────────────────────
let _toastTimer = null;
function showToast(msg, duration = 2200) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
}

// ── Confetti burst ────────────────────────────────────────
function confetti(count = 40) {
  const colors = ['#6366f1','#8b5cf6','#10b981','#f59e0b','#ef4444','#3b82f6','#ec4899'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `
      left: ${Math.random() * 100}vw;
      background: ${colors[i % colors.length]};
      animation-duration: ${.8 + Math.random() * 1.4}s;
      animation-delay: ${Math.random() * .6}s;
      width: ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      border-radius: ${Math.random() > .5 ? '50%' : '2px'};
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

// ── Score ring SVG ────────────────────────────────────────
function updateScoreRing(el, pct) {
  if (!el) return;
  const deg = (pct / 100) * 360;
  el.style.background = `conic-gradient(var(--accent) ${deg}deg, var(--bg3) ${deg}deg)`;
}

// ── Animate number ────────────────────────────────────────
function animateNumber(el, from, to, duration = 800) {
  if (!el) return;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(from + (to - from) * ease);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
