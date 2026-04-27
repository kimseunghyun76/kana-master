---
description: Premium Modern Design Guidelines for Kana Master
---

# Premium Design System Guidelines

This document outlines the design principles to be strictly followed for the `kana-master` project based on professional benchmarks (like Linear, Vercel, Apple) from the `awesome-design-md` repository.

## 1. Visual Theme & Atmosphere
- **Premium Dark-Mode First**: Backgrounds should be deep night/cinematic (`#08090a`, `#0f1011`, `#191a1b`).
- **Professional Assets over Emojis**: Emojis (🎯, 📚, ✍️) must NOT be used. Use professional SVG icons (like Lucide Icons or Heroicons).
- **Glassmorphism**: Use translucent surfaces with `backdrop-filter: blur(10px)` instead of solid flat colors on top of the cinematic backgrounds.
- **Elevation through Borders & Light**: Do not use heavy drop shadows on dark mode. Use subtle white borders (`border: 1px solid rgba(255, 255, 255, 0.08)`) and slightly elevated surface opacities.

## 2. Color Palette
- **Backgrounds**: Deep premium dark. Never pure black, use `#010102`, `#0a0a0c`, `#131418`.
- **Text**: `rgba(255, 255, 255, 0.95)` for primary text, `rgba(255, 255, 255, 0.65)` for secondary.
- **Accents**: Use elegant, single-tone neon or pastel accents (e.g., Violet `#7170ff`, Crimson `#e63946`) rather than rainbow gradients.

## 3. Typography
- **Font**: Use `Inter`, `SF Pro Display`, or similar modern sans-serif.
- **Letter Spacing**: Tighter letter spacing on headings (`-0.03em`), relaxed on body.
- **Hierarchy**: Distinct contrast between title font sizes and muted, smaller uppercase labels (e.g., `font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em`).

## 4. Components
- **Buttons**: Semi-transparent backgrounds (`rgba(255,255,255,0.05)`) with subtle borders, or solid accent color for Primary CTA.
- **Cards**: `rgba(255,255,255,0.03)` with `1px solid rgba(255,255,255,0.08)` and `backdrop-filter: blur(12px)`.

When asked to build or refine a UI, consult these principles to ensure the app maintains its high-fidelity, RPG-like, professional cinematic quality.
