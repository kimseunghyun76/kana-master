/* ============================================================
   STORE — Progress & State Management
   chrome.storage.local 저장 + in-memory reactive store
   ============================================================ */

'use strict';

const STORAGE_KEY = 'jp_master_v2';

// ── Default progress structure ─────────────────────────────
function defaultProgress() {
  return {
    xp: 0,
    todayXP: 0,
    lastXPUpdateDate: null,
    streak: 0,
    lastStudyDate: null,
    totalDays: 0,
    studyDays: [],            // array of 'YYYY-MM-DD'
    modules: {},              // { [moduleId]: ModuleProgress }
    // ModuleProgress: { stepsCompleted:0, stepResults:[], roleplayDone:false }
    kanaProgress: {},         // { [levelId]: { learned:bool, quizScore:0 } }
    kanaItemProgress: {},     // { [kana]: SRSProgress }
    vocabProgress: {},        // { [vocabId]: SRSProgress }
    settings: {
      ttsLang: 'ja-JP',
      ttsRate: 1.0,
      furigana: true,
      darkMode: true,
      notifyStreak: true
    }
  };
}

// ── Store singleton ────────────────────────────────────────
window.Store = (() => {
  let _data = defaultProgress();
  let _listeners = [];

  // Load from chrome.storage or localStorage fallback
  async function load() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        return new Promise(resolve => {
          chrome.storage.local.get(STORAGE_KEY, result => {
            if (result[STORAGE_KEY]) {
              _data = deepMerge(defaultProgress(), result[STORAGE_KEY]);
            }
            _updateStreak();
            resolve(_data);
          });
        });
      } else {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) _data = deepMerge(defaultProgress(), JSON.parse(raw));
        _updateStreak();
        return _data;
      }
    } catch(e) {
      console.warn('Store.load error:', e);
      return _data;
    }
  }

  async function save() {
    try {
      const serialized = JSON.parse(JSON.stringify(_data));
      if (typeof chrome !== 'undefined' && chrome.storage) {
        chrome.storage.local.set({ [STORAGE_KEY]: serialized });
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
      }
    } catch(e) {
      console.warn('Store.save error:', e);
    }
  }

  function _updateStreak() {
    const today = _todayStr();
    const last = _data.lastStudyDate;
    if (!last) return;
    const diff = _daysDiff(last, today);
    if (diff > 1) {
      _data.streak = 0; // streak broken
    }
  }

  function get() { return _data; }

  function getXP()     { return _data.xp; }
  function getStreak() { return _data.streak; }

  function _ensureModule(moduleId) {
    if (!_data.modules[moduleId]) {
      _data.modules[moduleId] = { stepsCompleted: 0, stepResults: [], roleplayDone: false };
    }
    return _data.modules[moduleId];
  }

  function addXP(amount) {
    const today = _todayStr();
    if (_data.lastXPUpdateDate !== today) {
      _data.todayXP = 0;
      _data.lastXPUpdateDate = today;
    }
    _data.todayXP += amount;
    _data.xp += amount;
    _recordStudy();
    _notify('xp', _data.xp);
    save();
  }

  function _recordStudy() {
    const today = _todayStr();
    if (_data.lastStudyDate === today) return;
    const last = _data.lastStudyDate;
    const diff = last ? _daysDiff(last, today) : 999;
    if (diff === 1) {
      _data.streak++;
    } else if (diff > 1) {
      _data.streak = 1;
    } else {
      _data.streak = Math.max(_data.streak, 1);
    }
    _data.lastStudyDate = today;
    _data.totalDays++;
    if (!_data.studyDays.includes(today)) {
      _data.studyDays.push(today);
      if (_data.studyDays.length > 365) _data.studyDays.shift();
    }
  }

  // Mark a step complete in a module
  function completeStep(moduleId, stepIndex, quizScore) {
    const mp = _ensureModule(moduleId);
    if (stepIndex >= mp.stepsCompleted) {
      mp.stepsCompleted = stepIndex + 1;
    }
    const prev = mp.stepResults[stepIndex] || {};
    const score = quizScore ?? prev.lastScore ?? prev.score ?? 100;
    mp.stepResults[stepIndex] = {
      ...prev,
      completed: true,
      passed: true,
      passedEver: true,
      score,
      lastScore: score,
      bestScore: Math.max(prev.bestScore ?? 0, score),
      completedAt: Date.now(),
      ts: Date.now()
    };
    _recordStudy();
    _notify('module', moduleId);
    save();
  }

  function recordStepAttempt(moduleId, stepIndex, quizScore, passed) {
    const mp = _ensureModule(moduleId);
    const prev = mp.stepResults[stepIndex] || {};
    const score = quizScore ?? 0;
    mp.stepResults[stepIndex] = {
      ...prev,
      score: prev.completed ? (prev.score ?? score) : score,
      lastScore: score,
      bestScore: Math.max(prev.bestScore ?? 0, score),
      attempts: (prev.attempts ?? 0) + 1,
      passed: !!passed,
      passedEver: (prev.passedEver ?? false) || !!passed,
      lastAttemptAt: Date.now(),
      ts: Date.now()
    };
    _recordStudy();
    _notify('module', moduleId);
    save();
  }

  function completeRoleplay(moduleId) {
    _ensureModule(moduleId).roleplayDone = true;
    _recordStudy();
    _notify('roleplay', moduleId);
    save();
  }

  function completeKanaLevel(levelId, score) {
    _data.kanaProgress[levelId] = { learned: true, quizScore: score ?? 100, ts: Date.now() };
    _recordStudy();
    save();
  }

  function _today() {
    return new Date().toISOString().slice(0, 10);
  }

  function _addDays(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  function _applySrs(progress, grade) {
    let ef = progress.srsEasiness ?? 2.5;
    let repetitions = progress.srsRepetitions ?? 0;
    let interval = progress.srsInterval ?? 0;
    const today = _today();

    progress.srsLastReview = today;
    progress.seen = (progress.seen ?? 0) + 1;

    if (grade >= 3) {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else interval = Math.round(interval * ef);
      repetitions += 1;
    } else {
      repetitions = 0;
      interval = 1;
    }

    ef = ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    ef = Math.max(1.3, Math.min(5.0, ef));

    progress.srsEasiness = Math.round(ef * 100) / 100;
    progress.srsInterval = interval;
    progress.srsRepetitions = repetitions;
    progress.srsDueDate = _addDays(today, interval);
    progress.lastGrade = grade;
    return progress;
  }

  function _gradeFromRating(rating) {
    if (rating === 'easy') return 5;
    if (rating === 'good') return 4;
    if (rating === 'hard') return 3;
    return 1;
  }

  function _isDue(progress) {
    if (!progress || !progress.srsDueDate) return false;
    return progress.srsDueDate <= _today();
  }

  function _reviewQueue(ids, progressMap) {
    const due = [];
    const fresh = [];
    const future = [];
    ids.forEach(id => {
      const p = progressMap[id];
      if (p && _isDue(p)) {
        due.push(id);
      } else if (!p || !p.srsDueDate) {
        fresh.push(id);
      } else {
        future.push(id);
      }
    });
    future.sort((a, b) => {
      const pa = progressMap[a]?.srsDueDate || '9999-12-31';
      const pb = progressMap[b]?.srsDueDate || '9999-12-31';
      return pa.localeCompare(pb);
    });
    return [...due, ...fresh, ...future];
  }

  function reviewVocabItem(id, rating) {
    if (!id) return;
    const progress = _data.vocabProgress[id] || {};
    _data.vocabProgress[id] = _applySrs(progress, _gradeFromRating(rating));
    save();
  }

  function reviewKanaItem(char, rating) {
    if (!char) return;
    const progress = _data.kanaItemProgress[char] || {};
    _data.kanaItemProgress[char] = _applySrs(progress, _gradeFromRating(rating));
    save();
  }

  function countDueVocab(ids) {
    return ids.filter(id => _isDue(_data.vocabProgress[id])).length;
  }

  function countDueKana(chars) {
    return chars.filter(char => _isDue(_data.kanaItemProgress[char])).length;
  }

  function getVocabReviewQueue(ids) {
    return _reviewQueue(ids, _data.vocabProgress);
  }

  function getKanaReviewQueue(chars) {
    return _reviewQueue(chars, _data.kanaItemProgress);
  }

  function getSetting(key) { return _data.settings[key]; }
  function setSetting(key, val) {
    _data.settings[key] = val;
    save();
    _notify('setting', { key, val });
  }

  function subscribe(fn) {
    _listeners.push(fn);
    return () => { _listeners = _listeners.filter(l => l !== fn); };
  }
  function _notify(type, payload) {
    _listeners.forEach(fn => fn(type, payload));
  }

  return { load, save, get, getXP, getStreak, addXP,
           completeStep, recordStepAttempt, completeRoleplay, completeKanaLevel,
           reviewVocabItem, reviewKanaItem, countDueVocab, countDueKana,
           getVocabReviewQueue, getKanaReviewQueue,
           getSetting, setSetting, subscribe };
})();

// ── Helpers ────────────────────────────────────────────────
function _todayStr() {
  return new Date().toISOString().slice(0, 10);
}
function _daysDiff(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}
function deepMerge(target, source) {
  const out = Object.assign({}, target);
  for (const k in source) {
    if (source[k] && typeof source[k] === 'object' && !Array.isArray(source[k])) {
      out[k] = deepMerge(target[k] || {}, source[k]);
    } else {
      out[k] = source[k];
    }
  }
  return out;
}
