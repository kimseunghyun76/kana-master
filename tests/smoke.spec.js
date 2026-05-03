const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
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
    vocab: 678,
  });

  await expect(page.locator('.stage-card')).toHaveCount(5);

  await page.getByRole('button', { name: /레슨/ }).click();
  await expect(page.locator('#viewLesson')).toHaveClass(/active/);
  await expect(page.locator('.module-card').first()).toBeVisible();
  await expect(page.locator('.module-card')).toHaveCount(23);

  await page.getByRole('button', { name: /연습/ }).click();
  await expect(page.locator('#viewPractice')).toHaveClass(/active/);
  await expect(page.locator('.practice-item').first()).toBeVisible();

  await page.getByRole('button', { name: /홈/ }).click();
  await page.getByRole('button', { name: /히라가나 시작하기/ }).click();
  await expect(page.locator('#flowScreen')).toHaveClass(/open/);
  await expect(page.locator('.module-intro-title')).toBeVisible();
  await expect(page.getByRole('button', { name: /학습 시작/ })).toBeVisible();
});

test('serves current assets and rejects removed v1 paths', async ({ request }) => {
  for (const path of [
    '/index.html',
    '/css/v2.css',
    '/js/v2/app.js',
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
