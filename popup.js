const TOTAL_KANA = 214; // hiragana + katakana total with dakuten/handakuten/yoon

document.addEventListener('DOMContentLoaded', () => {
  loadStats();

  document.getElementById('open-app').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('app.html') });
    window.close();
  });

  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      chrome.tabs.create({ url: chrome.runtime.getURL(`app.html?view=${view}`) });
      window.close();
    });
  });
});

function loadStats() {
  chrome.storage.local.get(['kanaProgress'], (result) => {
    const data = result.kanaProgress || {};
    const level = data.currentLevel || 1;
    const xp = data.totalXP || 0;
    const streak = data.streak || 0;
    const progress = data.progress || {};

    const mastered = Object.values(progress).filter(p => p && p.correct >= 3 && (p.correct / (p.correct + (p.incorrect || 0))) >= 0.8).length;
    const totalSeen = Object.keys(progress).length;
    const pct = Math.round((mastered / TOTAL_KANA) * 100);

    document.getElementById('stat-level').textContent = level;
    document.getElementById('stat-xp').textContent = xp;
    document.getElementById('stat-streak').textContent = streak + '🔥';
    document.getElementById('stat-mastered').textContent = mastered;
    document.getElementById('progress-pct').textContent = pct + '%';
    document.getElementById('progress-fill').style.width = pct + '%';
  });
}
