// ─── 유틸리티 ───

export function stripFurigana(str) {
  return (str || '').replace(/（[^）]*）|\([^)]*\)/g, '').trim();
}

// 일본어 문장에서 불필요한 공백 제거
export function cleanJaText(text) {
  if (!text) return text;
  return text.replace(/([\u3000-\u9fff\uff00-\uffef])\s+([\u3000-\u9fff\uff00-\uffef（）「」『』【】、。！？・])/g, '$1$2')
             .replace(/([\u3000-\u9fff\uff00-\uffef（）「」『』【】、。！？・])\s+([a-zA-Z0-9])/g, '$1$2')
             .replace(/([a-zA-Z0-9])\s+([\u3000-\u9fff\uff00-\uffef（）「」『』【】、。！？・])/g, '$1$2');
}

export function _makeEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

export function _escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function _injectRuby(text, ruby) {
  // ruby가 string이면 전체 텍스트에 루비 적용
  if (typeof ruby === 'string') {
    return `<ruby>${_escHtml(text)}<rt>${_escHtml(ruby)}</rt></ruby>`;
  }
  return _escHtml(text);
}

// ─── 토스트 알림 ───
export function showToast(msg, duration = 2500) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}
