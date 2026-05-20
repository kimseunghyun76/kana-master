# V3 Image Structure

Active images are organized for incremental generation:

```text
backgrounds/
  landscape/wide-life/<scene>/  active horizontal roleplay backgrounds
  portrait/wide-life/<scene>/   active vertical roleplay backgrounds
characters/
  speakers/<speaker>/body/  base speaker bodies
  speakers/<speaker>/face/  face portraits and mic variants
roleplay/
  roles/<role>/             role and outfit body variants
mascot/
  cat-shiba.*               recurring cat and shiba mascot assets
```

Backgrounds should include Japanese signage, natural passersby, and the cat or
shiba only as part of the scene: held by a person, sitting under a table, on a
bench, or walking through the street. Do not add pasted-on mascot overlays.

New roleplay art should be added to the matching role folder and then
registered in `apps/current-v3/js/roleplay-art.js` so the renderer can pick it.
