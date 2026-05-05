const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.route('**/favicon.ico', async route => {
    await route.fulfill({ status: 204, body: '' });
  });
  await page.route('https://raw.githubusercontent.com/KanjiVG/kanjivg/**', async route => {
    await route.fulfill({
      status: 404,
      contentType: 'text/plain',
      body: 'stroke data unavailable in smoke tests',
    });
  });
  await page.route('http://localhost:50021/**', async route => {
    if (route.request().url().endsWith('/speakers')) {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
      return;
    }
    await route.fulfill({ status: 404, body: 'not available in smoke tests' });
  });
  await page.route('http://localhost:5050/**', async route => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"status":"ok"}' });
  });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));
  page.consoleErrors = consoleErrors;
});

test.afterEach(async ({ page }) => {
  expect(page.consoleErrors, 'browser console/page errors').toEqual([]);
});

test('loads v2 app data and primary screens', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.app-title')).toHaveText('일본어 마스터');
  await expect(page.locator('.welcome-card')).toBeVisible();
  await expect(page.getByRole('button', { name: /히라가나 시작하기/ })).toBeVisible();
  await expect(page.locator('.program-card')).toHaveCount(3);
  await page.locator('.program-card').first().click();
  await expect(page.locator('.program-panel')).toBeVisible();
  await expect(page.locator('.program-day')).toHaveCount(7);
  await page.locator('.program-close').click();
  await expect(page.locator('.program-panel')).toHaveCount(0);

  const dataSummary = await page.evaluate(() => ({
    lectures: Object.keys(window.LECTURE_DATA || {}).length,
    kana: Object.keys(window.KANA_MAP || {}).length,
    vocab:
      (window.VOCAB_ITEMS_W1W4?.length ?? 0) +
      (window.VOCAB_ITEMS_W5W8?.length ?? 0) +
      (window.VOCAB_ITEMS_W9W10?.length ?? 0) +
      (window.VOCAB_ITEMS_S1S5?.length ?? 0) +
      (window.VOCAB_ITEMS_S6SIM?.length ?? 0) +
      (window.VOCAB_ITEMS_IT_SIM?.length ?? 0),
  }));

  expect(dataSummary).toEqual({
    lectures: 23,
    kana: 239,
    vocab: 681,
  });

  await expect(page.locator('.stage-card')).toHaveCount(5);
  await expect(page.locator('.stage-card.has-image').first()).toBeVisible();

  await page.getByRole('button', { name: /레슨/ }).click();
  await expect(page.locator('#viewLesson')).toHaveClass(/active/);
  await expect(page.locator('.module-card').first()).toBeVisible();
  await expect(page.locator('.module-card')).toHaveCount(23);
  await expect(page.locator('.module-card.has-image').first()).toBeVisible();
  await expect(page.locator('.roleplay-card.has-image').first()).toBeVisible();

  await page.getByRole('button', { name: /연습/ }).click();
  await expect(page.locator('#viewPractice')).toHaveClass(/active/);
  await expect(page.locator('.practice-item').first()).toBeVisible();

  await page.getByRole('button', { name: /나/ }).click();
  await expect(page.locator('#viewProfile')).toHaveClass(/active/);
  await expect(page.locator('.profile-hero')).toBeVisible();
  await expect(page.locator('.profile-section').filter({ hasText: '음성(TTS) 설정' })).toBeVisible();

  await page.getByRole('button', { name: /홈/ }).click();
  await page.getByRole('button', { name: /히라가나 시작하기/ }).click();
  await expect(page.locator('#flowScreen')).toHaveClass(/open/);
  await expect(page.locator('.module-intro-title')).toBeVisible();
  const introItems = await page.locator('.module-intro-items').evaluate(el => ({
    clientWidth: el.clientWidth,
    scrollWidth: el.scrollWidth,
  }));
  expect(introItems.scrollWidth).toBeGreaterThan(introItems.clientWidth);
  await expect(page.getByRole('button', { name: /학습 시작/ })).toBeVisible();
  await page.evaluate(() => {
    window.TTS.speak = async () => {};
  });
  await page.getByRole('button', { name: /학습 시작/ }).click();
  await expect(page.locator('.kana-card')).toBeVisible();
  const kanaFit = await page.locator('#flowBody').evaluate(el => ({
    clientHeight: el.clientHeight,
    scrollHeight: el.scrollHeight,
  }));
  expect(kanaFit.scrollHeight).toBeLessThanOrEqual(kanaFit.clientHeight + 2);
});

test('serves current assets and rejects removed v1 paths', async ({ request }) => {
  for (const path of [
    '/index.html',
    '/css/v2.css',
    '/js/kana-levels.js',
    '/js/kana-data-hiragana.js',
    '/js/kana-data.js',
    '/js/kana-data-extra.js',
    '/js/kana-helpers.js',
    '/js/v2/app-settings.js',
    '/js/v2/app.js',
    '/js/v2/home-view.js',
    '/js/v2/lesson-view.js',
    '/js/v2/practice-view.js',
    '/js/v2/profile-view.js',
    '/js/v2/programs.js',
    '/js/v2/stroke-renderer.js',
    '/js/data/lecture-data-v2/wlevel_1.js',
    '/images/lecture-scenes/wlevel2-elevator-number-culture.png',
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }

  for (const path of [
    '/app.html',
    '/app.css',
    '/js/data/lecture-data.js',
    '/sounds/index.json',
    '/sw.js',
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
});

test('opens and answers a vocab quiz flow', async ({ page }) => {
  await page.goto('/');

  await page.evaluate(() => {
    window.TTS.speak = async () => {};
    window.App.startRandomQuiz('vocab');
  });
  await expect(page.locator('#flowScreen')).toHaveClass(/open/);
  await expect(page.locator('.quiz-question')).toBeVisible();
  await expect(page.locator('.quiz-choice')).toHaveCount(4);

  const correct = page.locator('.quiz-choice[data-correct="true"]').first();
  await correct.click();
  await expect(page.locator('#quizFeedback')).toHaveClass(/show/);
  await expect(page.locator('#btnNextQ')).toBeVisible();
});

test('enforces access tiers on lesson modules', async ({ page }) => {
  await page.goto('/');

  await page.evaluate(() => {
    window.Entitlements.setTier('free');
  });
  await page.getByRole('button', { name: /레슨/ }).click();

  await expect(page.locator('.module-card[data-access-tier="free"]').first()).toBeVisible();
  await expect(page.locator('.module-card[data-access-tier="plus"].locked').first()).toBeVisible();
  await expect(page.locator('.module-card[data-access-tier="pro"].locked').first()).toBeVisible();
  await expect(page.locator('.access-tier-badge.plus').first()).toHaveText('PLUS');
  await expect(page.locator('.access-tier-badge.pro').first()).toHaveText('PRO');

  await page.evaluate(() => {
    window.App.openModule('survival_greet');
  });
  await expect(page.locator('#flowScreen')).not.toHaveClass(/open/);
  await expect(page.locator('#toast')).toHaveText('PLUS 콘텐츠입니다');

  await page.evaluate(() => {
    window.Entitlements.setTier('pro');
  });
  await expect(page.locator('.module-card[data-access-tier="plus"]').first()).toBeVisible();
  await expect(page.locator('.module-card[data-access-tier="plus"]').first()).not.toHaveClass(/locked/);
});

test('opens lecture player and toggles playback controls', async ({ page }) => {
  await page.goto('/');

  await page.evaluate(() => {
    window.TTS.speak = async () => {};
    window.TTS.stop = () => {};
    window.TTS.stopQueue = () => {};
    window.TTS.isQueueRunning = () => false;
    window.TTS.speakQueue = async (_lines, handlers = {}) => {
      handlers.onDone?.();
    };
    window.App.openModule('first_phrases');
  });

  await expect(page.locator('#flowScreen')).toHaveClass(/open/);
  await page.getByRole('button', { name: /학습 시작/ }).click();
  await expect(page.locator('.lecture-slide')).toBeVisible();
  await expect(page.locator('.lec-reel')).toBeVisible();
  await expect(page.locator('.lec-display-toggle').filter({ hasText: 'JP' })).toBeVisible();

  await page.locator('#btnLecPause').click();
  await expect(page.locator('#btnLecPause')).toHaveText(/재생/);
});

test('opens roleplay and dialogue detail popup', async ({ page }) => {
  await page.goto('/');

  await page.evaluate(() => {
    window.TTS.speak = async () => {};
    window.TTS.stop = () => {};
    window.TTS.stopQueue = () => {};
    window.TTS.isQueueRunning = () => false;
    window.TTS.speakQueue = async (_lines, handlers = {}) => {
      handlers.onDone?.();
    };
    window.App._startRoleplay(window.App._getMod('survival_greet'));
  });

  await expect(page.locator('#flowScreen')).toHaveClass(/open/);
  await expect(page.locator('.roleplay-hero')).toBeVisible();
  await expect(page.locator('.dialogue-bubble').first()).toBeVisible();

  await page.locator('.dialogue-bubble').first().click();
  await expect(page.locator('#detailOverlay')).toBeVisible();
  await expect(page.locator('.detail-popup')).toBeVisible();

  await page.getByRole('button', { name: /확인했어요/ }).click();
  await expect(page.locator('#detailOverlay')).toHaveCount(0);
});
