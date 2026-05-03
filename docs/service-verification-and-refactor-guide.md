# Service Verification and Refactor Guide

## Current Verification

Run the full local gate before and after cleanup/refactor work:

```sh
npm run check
```

This runs:

- JavaScript syntax checks for the v2 runtime files.
- File size checks for the main v2 source files.
- Playwright smoke tests on desktop Chromium and mobile-size WebKit.

Build the distributable ZIP separately:

```sh
npm run zip
```

The ZIP is generated under `dist/`, which is intentionally ignored by git.

## Smoke Test Coverage

The current smoke test verifies:

- The v2 app boots without browser console errors.
- Home, lesson, practice, and module intro screens render.
- Core data counts are loaded: lecture data, kana map, and vocabulary items.
- Current v2 assets return `200`.
- Removed v1 paths return `404`.

Local TTS services are mocked in the smoke test. Manual TTS quality checks are still required when changing `js/v2/tts.js`.

## Next Refactor Order

1. Split `js/v2/app.js` by screen and flow responsibility.
   - Suggested targets: shell/navigation, home, lesson list, practice, quiz, lecture, roleplay, profile, stroke panel.
   - Keep `window.App` as the compatibility facade until all inline handlers are removed.

2. Split `css/v2.css` by surface.
   - Suggested targets: base/tokens, shell, cards, lesson, quiz, lecture, roleplay, profile, responsive.
   - Keep imports simple if the app remains script-tag based.

3. Decide the stroke asset policy.
   - Current stroke UI fetches KanjiVG SVGs from GitHub.
   - For mobile app packaging, prefer local bundled stroke assets or remove unused local stroke SVGs.

4. Compress lecture images.
   - `images/lecture-scenes` is the largest runtime asset area.
   - Convert or generate optimized WebP variants before app-store packaging.

5. Add focused interaction tests as features move.
   - Quiz answer flow.
   - Lecture play/pause/next/previous.
   - Roleplay popup close/resume behavior.
   - TTS button click behavior with mocked audio.
