# V3 Roleplay Character Variants

Roleplay characters use a stable identity plus contextual body variants.
Speaker face and base body assets live outside this folder under
`images/v3/characters/speakers/<speaker>/`.

Recommended filename pattern:

```text
<speaker>-<season>.webp
<speaker>-<style>-default.webp
```

Examples:

```text
tourist/nanami-spring.webp
tourist/nanami-summer.webp
konbini_staff/mayu-default.webp
hotel_staff/keita-default.webp
```

All body cutouts should keep the same production box:

```text
canvas: 1024x1536
transparent background
feetY: 1480
eyeY: 430
scale: 1
```

Use seasonal outfits for `tourist`, fashion variants for `local`, and role
uniforms for staff roles such as `konbini_staff`, `hotel_staff`, `cafe_staff`,
`station_staff`, `pharmacist`, `doctor`, `police_staff`, and `taxi_driver`.
Every role folder should keep at least one image for each active speaker
(`nanami`, `aoi`, `mayu`, `keita`) so future roleplay assignments can vary by
speaker. Prefer adding true seasonal uniform variants over reusing tourist
clothes when the role has a recognizable uniform.

After adding real variant files, register them in
`apps/current-v3/js/roleplay-art.js` under `CHARACTER_VARIANTS`.

Current active folders:

```text
airport_staff/
bus_driver/
cabin_crew/
cafe_staff/
doctor/
duty_free_staff/
hotel_staff/
immigration_officer/
izakaya_staff/
konbini_staff/
local/
onsen_staff/
pharmacist/
police_staff/
rentacar_staff/
restaurant_staff/
shop_staff/
station_staff/
taxi_driver/
tourist/
```

Active speaker identities are `nanami`, `aoi`, `mayu`, and `keita`. Keep any
older speaker files in `images/v3/legacy/` unless they are being reworked into
one of these four identities.
