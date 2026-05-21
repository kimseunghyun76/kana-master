const { test, expect } = require('@playwright/test');

// Mock external audio/stroke services so the flow runs offline, mirroring smoke.
test.beforeEach(async ({ page }) => {
  await page.route('**/favicon.ico', r => r.fulfill({ status: 204, body: '' }));
  await page.route('https://raw.githubusercontent.com/KanjiVG/kanjivg/**', r =>
    r.fulfill({ status: 404, contentType: 'text/plain', body: 'no stroke in tests' }));
  await page.route('http://localhost:50021/**', r => r.fulfill({ status: 404, body: 'no voicevox' }));
  await page.route('http://localhost:5050/**', r =>
    r.fulfill({ status: 200, contentType: 'application/json', body: '{"status":"ok"}' }));
});

test('every module card shows meaning + tip expanded (no gated reveal)', async ({ page }) => {
  test.setTimeout(180 * 1000);
  await page.goto('/apps/current-v3/');
  // Wait until the app + curriculum are ready.
  await page.waitForFunction(() =>
    typeof window.App?.openModuleStep === 'function' &&
    typeof MODULES !== 'undefined' && MODULES.length > 0, null, { timeout: 15000 });

  const result = await page.evaluate(async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const fails = [];
    let wordChecked = 0, sentChecked = 0, tipChecked = 0;

    async function reachCard() {
      for (let t = 0; t < 14; t++) {
        if (document.querySelector('.vc-flat, .sentence-learn')) return true;
        const intro = document.querySelector('#flowBody .step-intro');
        const btn = document.querySelector('#flowFooter .btn-primary')
          || document.querySelector('#flowBody .btn-primary')
          || document.querySelector('#flowBody button');
        if (intro && btn) btn.click();
        await sleep(120);
      }
      return !!document.querySelector('.vc-flat, .sentence-learn');
    }

    for (const m of MODULES) {
      const steps = m.steps || [];
      const i = steps.findIndex(s => s.type === 'vocab_learn');
      if (i < 0) continue;

      window.App.openModuleStep(m.id, i);
      await sleep(140);
      const ok = await reachCard();
      if (!ok) { fails.push(`${m.id}: vocab card did not render`); try { window.App.closeFlow(); } catch (_) {} await sleep(100); continue; }

      // No gated reveal buttons may remain anywhere in the flow.
      if (document.querySelector('.sentence-learn-reveal-btn')) fails.push(`${m.id}: '팁 보기' toggle present`);
      const btns = [...document.querySelectorAll('#flowFooter button, #flowBody button')];
      if (btns.some(b => /의미 확인하기/.test(b.textContent || ''))) fails.push(`${m.id}: '의미 확인하기' button present`);

      let items = [];
      try { items = window.ContentIndex.getVocabItems(steps[i]) || []; } catch (_) {}
      const shown = items[0] || {};

      const word = document.querySelector('.vc-flat');
      const sent = document.querySelector('.sentence-learn');
      if (word) {
        wordChecked++;
        const meaning = word.querySelector('.vc-flat-meaning');
        if (!meaning || !meaning.textContent.trim()) fails.push(`${m.id}: word card meaning empty`);
        if (shown.tip) {
          tipChecked++;
          const tp = word.querySelector('.vc-tip-panel');
          if (!tp || tp.offsetHeight <= 0) fails.push(`${m.id}: word tip hidden though item has a tip`);
        }
      } else if (sent) {
        sentChecked++;
        const ko = sent.querySelector('.sentence-learn-ko-fixed');
        if (!ko || !ko.textContent.trim()) fails.push(`${m.id}: sentence meaning empty`);
        if (shown.tip) {
          tipChecked++;
          const tp = sent.querySelector('.sentence-learn-tip');
          if (!tp || tp.offsetHeight <= 0) fails.push(`${m.id}: sentence tip hidden though item has a tip`);
        }
      }

      try { window.App.closeFlow(); } catch (_) {}
      await sleep(110);
    }
    return { fails, wordChecked, sentChecked, tipChecked };
  });

  console.log(`card audit — word:${result.wordChecked} sentence:${result.sentChecked} tip-verified:${result.tipChecked}`);
  expect(result.fails, result.fails.join('\n')).toEqual([]);
  expect(result.wordChecked + result.sentChecked).toBeGreaterThan(20);
  expect(result.tipChecked).toBeGreaterThan(5);
});

test('every lecture step resolves to slides with captions', async ({ page }) => {
  test.setTimeout(60 * 1000);
  await page.goto('/apps/current-v3/');
  await page.waitForFunction(() =>
    typeof MODULES !== "undefined" && window.LECTURE_DATA, null, { timeout: 15000 });

  const bad = await page.evaluate(() => {
    const out = [];
    for (const m of MODULES) {
      (m.steps || []).forEach((s, i) => {
        if (s.type !== 'lecture') return;
        const slides = window.LECTURE_DATA[s.lectureKey];
        if (!Array.isArray(slides) || !slides.length) out.push(`${m.id} step ${i + 1}: lectureKey '${s.lectureKey}' missing`);
        else if (slides.every(sl => !(sl.captionJp || sl.caption || sl.text || sl.body || sl.title)))
          out.push(`${m.id} step ${i + 1}: lecture has no captions`);
      });
    }
    return out;
  });
  expect(bad, bad.join('\n')).toEqual([]);
});
