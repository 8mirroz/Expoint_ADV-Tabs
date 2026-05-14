---
name: ui-premium
description: Create premium interfaces using the unified Antigravity design-system package.
---

# UI Premium Skill

## Scope
Use this skill when building high-quality UI with strict token consistency and predictable overrides.

## Core principles
1. Theme sync via CSS variables (`var(--tg-theme-...)` for Telegram, `--ag-*` for web).
2. Mobile-first layout and safe area support.
3. Meaningful motion only (150-300ms, respect `prefers-reduced-motion`).
4. Accessibility baseline: contrast >= 4.5:1 and visible focus states.

## Source priority for adaptive mode
1. Stitch (tokens)
2. 21st.dev (components)
3. MagicUI (motion blocks)
4. Pinterest (visual DNA)

## Quality gate
Ensure FPS is stable (> 60fps) for GSAP animations.
Check contrast ratios for "Quiet Luxury" palettes.
