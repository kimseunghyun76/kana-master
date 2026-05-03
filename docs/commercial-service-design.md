# Commercial Service Core Design

This document defines the next architecture target for turning the current v2 app into a paid learning service.

## Product Position

The app should be sold as a guided Japanese learning track for Korean speakers, not as a generic flashcard app.

Core promise:

- Start from kana with low friction.
- Move into real travel and daily situations quickly.
- Use lecture images, dialogue, TTS, roleplay, and spaced review to make the app feel like a compact interactive course.
- Add IT/business Japanese as the paid differentiator.

## Paid Content Model

Recommended entitlement split:

- Free:
  - Kana stage.
  - First greeting module.
  - Limited practice review.
  - One sample roleplay.
- Plus:
  - Survival Japanese stages.
  - All lecture slides and visual module intros.
  - Full quiz and SRS review.
  - Roleplay detail popups and replay.
- Pro:
  - IT/business modules.
  - Keigo and advanced tracks.
  - Personalized weak-point review.
  - Cloud sync across devices.

The app should not hide basic study mechanics behind paywalls. The paid value should be richer situations, higher-level tracks, better review, and sync.

## Account And Sync Design

The current `Store` shape is already close to a syncable progress document. Keep the client model, but wrap it in a sync layer.

Recommended server-side entities:

- `users`
  - `id`
  - `email`
  - `provider`
  - `created_at`
  - `last_seen_at`
- `entitlements`
  - `user_id`
  - `plan`
  - `source`: `web`, `ios`, `android`, `manual`
  - `status`: `active`, `grace`, `expired`, `refunded`
  - `expires_at`
  - `store_transaction_id`
- `progress_snapshots`
  - `user_id`
  - `schema_version`
  - `client_updated_at`
  - `server_updated_at`
  - `payload`
- `study_events`
  - `user_id`
  - `event_type`
  - `module_id`
  - `step_index`
  - `score`
  - `created_at`

Client sync rules:

- Keep local-first behavior so the app works offline.
- Save every progress mutation locally immediately.
- Queue study events while offline.
- On login, merge by field-level timestamp where possible.
- If merge is ambiguous, prefer the larger progress value for completed steps, best score, XP, and SRS repetition count.

Store migration target:

- Add `schemaVersion`.
- Add `updatedAt` to module progress, step results, kana progress, vocab progress, and settings.
- Add `deviceId` for debugging sync conflicts.
- Add `pendingEvents` for offline event upload.

## Payment Design

Web:

- Use a hosted checkout provider first.
- Keep payment implementation outside the static app shell.
- Return entitlement status through a small API endpoint.

iOS/Android:

- Use native in-app purchase.
- Server validates receipts and updates `entitlements`.
- Client only trusts signed entitlement responses from the backend.

Entitlement API:

```txt
GET /me/entitlement
POST /sync/progress
POST /events/study
POST /iap/verify
```

The frontend should expose one function eventually:

```js
Entitlements.canAccess(moduleId, featureKey)
```

Do not scatter plan checks across UI handlers.

## Content Management Design

Current JS data files are acceptable for MVP iteration, but paid operation needs a cleaner authoring pipeline.

Target content source format:

- `content/modules/*.json`
- `content/vocab/*.json`
- `content/dialogues/*.json`
- `content/lectures/*.json`
- `content/assets.json`

Generated runtime files:

- `js/data/*.js`
- `js/v2/curriculum.js`
- `js/v2/module-visuals.js`

The source content should become the editable truth. Runtime JS should be generated output.

Quality gates:

- Duplicate IDs are errors.
- Missing referenced category/dialogue/lecture keys are errors.
- Missing image assets are errors.
- Categories with fewer than five resolved items are warnings.
- Modules with fewer than four steps are warnings.
- Duplicate phrases are warnings unless explicitly allowed.

Use:

```sh
npm run audit:content
```

Current audit result on 2026-05-04:

- Errors: 0.
- Warnings: 36 duplicate/thin/small-category issues.

These should be cleaned before charging users.

## Learning Experience Roadmap

Paid service readiness should improve in this order:

1. Content audit cleanup.
2. Level test and placement.
3. Personalized daily plan.
4. Weak-point review dashboard.
5. Streak recovery and weekly goals.
6. Achievement badges tied to real skill milestones.
7. Voice quality stabilization.
8. Cloud sync and paid entitlement.

Avoid adding more decorative UI until the retention loop is measurable.

## Launch Readiness Gates

Beta paid MVP:

- No content audit errors.
- Full smoke tests pass.
- At least one manual mobile TTS pass.
- Progress export/import available.
- Clear refund/contact/privacy pages.

Production paid service:

- Account login.
- Cloud sync.
- Entitlement checks.
- Crash/error monitoring.
- Analytics for activation, lesson completion, roleplay usage, and day-7 retention.
- Content source pipeline.
- App-store IAP validation for native apps.

## Next Implementation Slice

The next practical slice should be:

1. Fix duplicate dialogue IDs found by `npm run audit:content`.
2. Add `schemaVersion`, `updatedAt`, and export/import to `Store`.
3. Add an entitlement facade with all modules currently open.
4. Mark modules with `accessTier: free | plus | pro` in curriculum.
5. Add tests for free/pro access behavior without adding payment yet.
