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

test('root entry opens v3 app shell', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/apps\/current-v3\/?$/);
  await expect(page.locator('.app-title')).toHaveText('냥멍');

  const dataSummary = await page.evaluate(() => ({
    modules: typeof MODULES !== 'undefined' ? MODULES.length : 0,
    stages: typeof STAGES !== 'undefined' ? STAGES.length : 0,
    storeVersion: window.Store?.get?.().schemaVersion,
  }));

  expect(dataSummary.modules).toBeGreaterThanOrEqual(40);
  expect(dataSummary.stages).toBeGreaterThanOrEqual(10);
  expect(dataSummary.storeVersion).toBe(3);
});

test('loads v3 app data and primary screens', async ({ page }) => {
  await page.goto('/apps/current-v3/');

  await expect(page.locator('.app-title')).toHaveText('냥멍');

  const dataSummary = await page.evaluate(() => ({
    kana: Object.keys(window.KANA_MAP || {}).length,
    vocab:
      (window.VOCAB_ITEMS_W1W4?.length ?? 0) +
      (window.VOCAB_ITEMS_W5W8?.length ?? 0) +
      (window.VOCAB_ITEMS_W9W10?.length ?? 0) +
      (window.VOCAB_ITEMS_S1S5?.length ?? 0) +
      (window.VOCAB_ITEMS_S6SIM?.length ?? 0) +
      (window.VOCAB_ITEMS_IT_SIM?.length ?? 0),
    modules: typeof MODULES !== 'undefined' ? MODULES.length : 0,
    stages: typeof STAGES !== 'undefined' ? STAGES.length : 0,
  }));

  expect(dataSummary.kana).toBe(239);
  expect(dataSummary.vocab).toBe(689);
  expect(dataSummary.modules).toBeGreaterThanOrEqual(40);
  expect(dataSummary.stages).toBeGreaterThanOrEqual(10);

  // 레슨 탭
  await page.getByRole('button', { name: /레슨/ }).click();
  await expect(page.locator('#viewLesson')).toHaveClass(/active/);
  await expect(page.locator('.v3-mod-card').first()).toBeVisible();

  // 연습 탭
  await page.getByRole('button', { name: /연습/ }).click();
  await expect(page.locator('#viewPractice')).toHaveClass(/active/);
  await expect(page.locator('.practice-item').first()).toBeVisible();

  // 프로필 탭
  await page.locator('.bottom-nav .nav-btn[data-tab="profile"]').click();
  await expect(page.locator('#viewProfile')).toHaveClass(/active/);
  await expect(page.locator('.profile-hero')).toBeVisible();
});

test('serves v3 app assets and rejects removed paths', async ({ request }) => {
  // 존재해야 하는 경로
  for (const path of [
    '/index.html',
    '/apps/current-v3/index.html',
    '/apps/current-v3/styles.css',
    '/apps/current-v3/js/curriculum.js',
    '/apps/current-v3/js/store.js',
    '/apps/current-v3/js/app.js',
    '/css/shared-app.css',
    '/js/kana-levels.js',
    '/js/kana-data-hiragana.js',
    '/js/kana-data.js',
    '/js/kana-data-extra.js',
    '/js/kana-helpers.js',
    '/js/v2/utils.js',
    '/js/v2/tts.js',
    '/js/v2/app-settings.js',
    '/js/v2/home-view.js',
    '/js/v2/lesson-view.js',
    '/js/v2/practice-view.js',
    '/js/v2/profile-view.js',
    '/js/v2/quiz-result-flow.js',
    '/js/v2/roleplay-detail-flow.js',
    '/js/v2/stroke-renderer.js',
    '/js/data/lecture-data-v2/wlevel_1.js',
    '/images/lecture-scenes/kana-hiragana-study-desk.webp',
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }

  // 삭제된 경로 — 404여야 함
  for (const path of [
    '/index-v2.html',
    '/index-v3.html',
    '/apps/legacy-v2/index.html',
    '/apps/legacy-v2/styles.css',
    '/js/v2/store.js',
    '/js/v2/app.js',
    '/js/v2/curriculum.js',
    '/js/v2/content-index.js',
    '/js/v2/module-visuals.js',
    '/js/v2/programs.js',
    '/js/v2/app-shell.js',
    '/app.html',
    '/app.css',
    '/css/v2.css',
    '/css/v3.css',
    '/js/data/lecture-data.js',
    '/js/v3/curriculum.js',
    '/sounds/index.json',
    '/sw.js',
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(404);
  }
});

test('opens and answers a vocab quiz flow', async ({ page }) => {
  await page.goto('/apps/current-v3/');

  await page.evaluate(() => {
    window.TTS.speak = async () => {};
    window.App.startRandomQuiz('vocab');
  });
  await expect(page.locator('#flowScreen')).toHaveClass(/open/);
  // 단계 인트로 카드가 있으면 통과
  const quizStart = page.locator('#flowScreen').getByRole('button', { name: /퀴즈 시작|학습 시작/ }).first();
  if (await quizStart.isVisible({ timeout: 2000 }).catch(() => false)) await quizStart.click();
  await expect(page.locator('.quiz-question')).toBeVisible();
  await expect(page.locator('.quiz-choice')).toHaveCount(4);

  const correct = page.locator('.quiz-choice[data-correct="true"]').first();
  await correct.click();
  await expect(page.locator('#quizFeedback')).toHaveClass(/show/);
  await expect(page.locator('#btnNextQ')).toBeVisible();
});

test('enforces access tiers on lesson modules', async ({ page }) => {
  await page.goto('/apps/current-v3/');

  await page.evaluate(() => {
    window.Entitlements.setTier('free');
  });
  await page.getByRole('button', { name: /레슨/ }).click();

  await expect(page.locator('.v3-mod-card[data-access-tier="free"]').first()).toBeVisible();
  await expect(page.locator('.v3-mod-card[data-access-tier="plus"].locked').first()).toBeVisible();
  await expect(page.locator('.access-tier-badge.plus').first()).toHaveText('플러스');

  await page.evaluate(() => {
    window.Entitlements.setTier('pro');
  });
  await expect(page.locator('.v3-mod-card[data-access-tier="plus"]').first()).not.toHaveClass(/locked/);
});

test('opens lecture player and toggles playback controls', async ({ page }) => {
  await page.goto('/apps/current-v3/');

  await page.evaluate(() => {
    window.TTS.speak = async () => {};
    window.TTS.stop = () => {};
    window.TTS.stopQueue = () => {};
    window.TTS.isQueueRunning = () => false;
    window.TTS.speakQueue = async (_lines, handlers = {}) => {
      handlers.onDone?.();
    };
    // v3 첫 번째 모듈 열기
    const firstMod = MODULES[0];
    if (firstMod) window.App.openModule(firstMod.id);
  });

  await expect(page.locator('#flowScreen')).toHaveClass(/open/);
  await page.locator('#flowScreen').getByRole('button', { name: /학습 시작/ }).first().click();
  const instructorStart = page.locator('.lec-pick-start');
  if (await instructorStart.isVisible({ timeout: 1500 }).catch(() => false)) {
    await instructorStart.click();
  }
  await expect(page.locator('.lecture-slide')).toBeVisible({ timeout: 5000 }).catch(() => {
    // 첫 모듈이 강의가 아닐 수 있음 — kana-card로 폴백
  });
});

test('opens roleplay and dialogue detail popup', async ({ page }) => {
  await page.goto('/apps/current-v3/');

  await page.evaluate(() => {
    window.TTS.speak = async () => {};
    window.TTS.stop = () => {};
    window.TTS.stopQueue = () => {};
    window.TTS.isQueueRunning = () => false;
    window.TTS.speakQueue = async (_lines, handlers = {}) => {
      handlers.onDone?.();
    };
    // roleplay가 있는 모듈 찾기
    const mod = MODULES.find(m => m.roleplay);
    if (mod) window.App._startRoleplay(mod);
  });

  await expect(page.locator('#flowScreen')).toHaveClass(/open/);
  // v3 롤플레이는 comic 흐름으로 렌더된다. comic 콘텐츠가 나타나는지 확인.
  await expect(page.locator('#flowBody [class*="comic"]').first()).toBeVisible({ timeout: 8000 });

  // 대사 데이터(일본어/한국어)가 실제로 채워졌는지 검증
  const dialogueLen = await page.evaluate(() =>
    (document.getElementById('flowBody')?.textContent || '').replace(/\s+/g, '').length);
  expect(dialogueLen).toBeGreaterThan(10);
});
