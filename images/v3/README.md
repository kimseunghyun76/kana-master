# V3 Image Structure

Active images are organized for incremental generation:

```text
backgrounds/
  portrait/<scene>/        active vertical roleplay/module backgrounds
characters/
  speakers/<speaker>/body/  base speaker bodies
  speakers/<speaker>/face/  face portraits and mic variants
roleplay/
  outfits/<role>/           role and outfit body variants
legacy/
  <date>/                   retired or salvageable older assets
mascot/
  cat-shiba.*               recurring cat and shiba mascot assets
```

Current v3 backgrounds are portrait-first for phone and tablet use. Backgrounds
should include Japanese signage, natural passersby, and the cat or shiba only as
part of the scene: held by a person, sitting under a table, on a bench, in a
travel carrier, or walking through the street. Do not add pasted-on mascot
overlays.

New roleplay art should be added to the matching outfit folder and then
registered in `apps/current-v3/js/roleplay-art.js` so the renderer can pick it.

Active speakers are `nanami`, `aoi`, `mayu`, and `keita`. Older speakers and
landscape backgrounds are kept under `legacy/` unless they are needed again.
