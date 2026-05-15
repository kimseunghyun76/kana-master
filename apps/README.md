# App Source Layout

The product now keeps version entry points apart so the current build and the preserved legacy build do not get mixed during curriculum work.

- `apps/current-v3/`: current app shell, v3 curriculum, v3 lecture data, v3 roleplay art overrides, and v3-specific docs.
- `apps/legacy-v2/`: preserved v2 entry point and stylesheet wrapper.
- `js/v2/`: shared v2 learning engine still used by both apps until a later runtime split.
- `js/data/`: shared vocabulary and legacy lecture data loaded by both apps.
- `css/`: shared surface styles imported by each app stylesheet.
- `images/`: shared runtime images and generated character assets.

Root wrappers:

- `index.html` redirects to the current v3 app.
- `index-v3.html` is a compatibility redirect to the current v3 app.
- `index-v2.html` redirects to the preserved legacy v2 app.
