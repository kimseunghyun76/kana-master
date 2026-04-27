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
    if (!_data.modules[moduleId]) {
      _data.modules[moduleId] = { stepsCompleted: 0, stepResults: [], roleplayDone: false };
    }
    const mp = _data.modules[moduleId];
    if (stepIndex >= mp.stepsCompleted) {
      mp.stepsCompleted = stepIndex + 1;
    }
    mp.stepResults[stepIndex] = { score: quizScore ?? 100, ts: Date.now() };
    _recordStudy();
    _notify('module', moduleId);
    save();
  }

  function completeRoleplay(moduleId) {
    if (!_data.modules[moduleId]) {
      _data.modules[moduleId] = { stepsCompleted: 0, stepResults: [], roleplayDone: false };
    }
    _data.modules[moduleId].roleplayDone = true;
    _recordStudy();
    _notify('roleplay', moduleId);
    save();
  }

  function completeKanaLevel(levelId, score) {
    _data.kanaProgress[levelId] = { learned: true, quizScore: score ?? 100, ts: Date.now() };
    _recordStudy();
    save();
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
           completeStep, completeRoleplay, completeKanaLevel,
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
