# App Source Layout

The product is now v3-only. The legacy v2 app has been removed.

- `apps/current-v3/`: v3 app shell, curriculum, lecture data, roleplay art, and v3-specific modules.
- `js/v2/`: shared learning engine (quiz flows, lecture flow, roleplay flow, TTS, utils, views) used by v3.
- `js/data/`: shared vocabulary data and lecture data loaded by v3.
- `css/`: shared surface styles imported by the v3 app stylesheet.
- `images/`: shared runtime images and generated character assets.

Root entry:

- `index.html` redirects to the v3 app at `apps/current-v3/`.
