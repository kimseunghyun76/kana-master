/* ============================================================
   Roleplay Evaluator - JSON dictionary based answer checking
   ============================================================ */

'use strict';

window.RoleplayEvaluator = (() => {
  const DEFAULT_DICTIONARY = {
    version: 1,
    thresholds: { pass: 78, retry: 52 },
    phraseAliases: {},
    feedback: {
      empty: '일본어 답을 입력한 뒤 판정해 보세요.',
      pass: '핵심 표현이 맞았어요.',
      retry: '의미는 가까워요. 빠진 부분을 한 번 더 다듬어 보세요.',
      fail: '정답을 듣고 핵심 표현을 다시 말해 보세요.'
    }
  };

  let _dictionary = DEFAULT_DICTIONARY;
  let _loadPromise = null;

  async function loadDictionary(url = '/apps/current-v3/data/roleplay-evaluation.json') {
    if (_loadPromise) return _loadPromise;
    _loadPromise = fetch(url, { cache: 'no-cache' })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        _dictionary = mergeDictionary(DEFAULT_DICTIONARY, data || {});
        return _dictionary;
      })
      .catch(() => _dictionary);
    return _loadPromise;
  }

  function getDictionary() {
    return _dictionary;
  }

  function mergeDictionary(base, next) {
    return {
      ...base,
      ...next,
      thresholds: { ...base.thresholds, ...(next.thresholds || {}) },
      phraseAliases: { ...base.phraseAliases, ...(next.phraseAliases || {}) },
      feedback: { ...base.feedback, ...(next.feedback || {}) },
    };
  }

  function normalizeJapanese(value) {
    return stripFuriSafe(value)
      .normalize('NFKC')
      .toLowerCase()
      .replace(/[ァ-ン]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60))
      .replace(/[。、，,.!?！？「」『』（）()\[\]\s・ー~〜]/g, '')
      .replace(/は/g, 'わ')
      .replace(/へ/g, 'え')
      .replace(/を/g, 'お')
      .trim();
  }

  function normalizeRomaji(value) {
    return stripFuriSafe(value)
      .normalize('NFKC')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .trim();
  }

  function stripFuriSafe(value) {
    if (!value) return '';
    if (typeof stripFuri === 'function') return stripFuri(value);
    return String(value).replace(/[（(][ぁ-ヶー・]+[）)]/g, '');
  }

  function alternativesFor(line, dictionary = _dictionary) {
    const rawTarget = stripFuriSafe(line?.japanese || '');
    const rawRomaji = line?.romaji || '';
    const directKey = normalizeJapanese(rawTarget);
    const configured = dictionary.phraseAliases?.[directKey] || [];
    const all = [rawTarget, rawRomaji, ...configured].filter(Boolean);
    const seen = new Set();
    return all
      .map(text => ({
        raw: String(text),
        jp: normalizeJapanese(text),
        romaji: normalizeRomaji(text),
      }))
      .filter(alt => {
        const key = alt.jp || alt.romaji;
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function evaluateLine(line, input, options = {}) {
    const dictionary = options.dictionary || _dictionary;
    const thresholds = dictionary.thresholds || DEFAULT_DICTIONARY.thresholds;
    const feedback = dictionary.feedback || DEFAULT_DICTIONARY.feedback;
    const original = String(input || '').trim();
    if (!original) {
      return result('empty', 0, feedback.empty, null, []);
    }

    const inputJp = normalizeJapanese(original);
    const inputRomaji = normalizeRomaji(original);
    const alternatives = alternativesFor(line, dictionary);
    const scored = alternatives.map(alt => {
      const jpScore = scoreNormalized(inputJp, alt.jp);
      const romajiScore = scoreNormalized(inputRomaji, alt.romaji);
      const score = Math.max(jpScore, romajiScore);
      return { alt, score };
    }).sort((a, b) => b.score - a.score);
    const best = scored[0] || { alt: null, score: 0 };
    const missing = missingChunks(best.alt?.jp || '', inputJp);

    if (best.score >= thresholds.pass) {
      return result('pass', best.score, feedback.pass, best.alt?.raw || line?.japanese || '', missing);
    }
    if (best.score >= thresholds.retry) {
      const msg = missing.length
        ? `${feedback.retry} 빠진 부분: ${missing.join(', ')}`
        : feedback.retry;
      return result('retry', best.score, msg, best.alt?.raw || line?.japanese || '', missing);
    }
    return result('fail', best.score, feedback.fail, best.alt?.raw || line?.japanese || '', missing);
  }

  function scoreNormalized(input, target) {
    if (!input || !target) return 0;
    if (input === target) return 100;
    if (target.includes(input) && input.length >= Math.min(4, target.length)) return 82;
    if (input.includes(target)) return 92;

    const similarity = Math.round(levenshteinSimilarity(input, target) * 100);
    const coverage = keywordCoverage(input, target);
    return Math.round((similarity * 0.72) + (coverage * 0.28));
  }

  function keywordCoverage(input, target) {
    const chunks = importantChunks(target);
    if (!chunks.length) return 0;
    const hits = chunks.filter(chunk => input.includes(chunk)).length;
    return Math.round((hits / chunks.length) * 100);
  }

  function missingChunks(target, input) {
    return importantChunks(target)
      .filter(chunk => !input.includes(chunk))
      .slice(0, 3);
  }

  function importantChunks(target) {
    if (!target) return [];
    const chunks = target
      .replace(/(です|ます|ました|ません|ください|おねがいします|ありがとう|ございます)/g, '|$1|')
      .split('|')
      .flatMap(part => part.match(/[ぁ-ん一-龥0-9]{2,}/g) || [])
      .filter(part => !['です', 'ます'].includes(part));
    return [...new Set(chunks)].slice(0, 8);
  }

  function levenshteinSimilarity(a, b) {
    const maxLen = Math.max(a.length, b.length);
    if (!maxLen) return 1;
    return 1 - (levenshtein(a, b) / maxLen);
  }

  function levenshtein(a, b) {
    const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    const curr = Array.from({ length: b.length + 1 }, () => 0);
    for (let i = 1; i <= a.length; i++) {
      curr[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
      }
      for (let j = 0; j <= b.length; j++) prev[j] = curr[j];
    }
    return prev[b.length];
  }

  function result(status, score, message, bestMatch, missing) {
    return {
      status,
      passed: status === 'pass',
      score: Math.max(0, Math.min(100, Math.round(score || 0))),
      message,
      bestMatch,
      missing,
    };
  }

  return {
    loadDictionary,
    getDictionary,
    evaluateLine,
    normalizeJapanese,
    normalizeRomaji,
    alternativesFor,
  };
})();
