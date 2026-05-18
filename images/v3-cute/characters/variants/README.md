# V3 Cute Character Variants

Roleplay characters use a stable identity plus contextual body variants.

Recommended filename pattern:

```text
<identity>-<role>-<season>.webp
```

Examples:

```text
nanami-tourist-spring.webp
nanami-tourist-summer.webp
mayu-konbini_staff-default.webp
takumi-hotel_staff-default.webp
```

All body cutouts should keep the same production box:

```text
canvas: 1024x1536
transparent background
feetY: 1480
eyeY: 430
scale: 1
```

Use seasonal outfits for `tourist` and role uniforms for staff roles such as
`konbini_staff`, `hotel_staff`, `cafe_staff`, `station_staff`, `pharmacist`,
`clinic_staff`, `taxi_driver`, and `rental_staff`.

After adding real variant files, register them in
`apps/current-v3/js/roleplay-art.js` under `CHARACTER_VARIANTS`.

Current first batch:

```text
nanami-tourist-spring.webp
nanami-tourist-summer.webp
nanami-tourist-autumn.webp
nanami-tourist-winter.webp
mayu-konbini_staff-default.webp
mayu-cafe_staff-default.webp
mayu-pharmacist-default.webp
takumi-hotel_staff-default.webp
takumi-station_staff-default.webp
keita-taxi_driver-default.webp
```
