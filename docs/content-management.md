# Content Management Notes

The app now separates UI flow from content lookup:

- `js/data/vocab-items-*.js`: raw vocabulary and phrase records.
- `js/data/vocab-categories.js`: category definitions and explicit item ordering.
- `js/data/vocab-dialogue.js` and `js/data/vocab-items-it-sim.js`: dialogue records.
- `js/v2/content-index.js`: lookup layer used by the app. Add category fallback rules or dialogue key mappings here, not in `app.js`.
- `js/v2/curriculum.js`: learning path composition. Reference category IDs and dialogue keys here.

For Android/iOS packaging later, keep content data and `content-index.js` platform-neutral. UI-specific behavior should stay in `js/v2/app.js`.
