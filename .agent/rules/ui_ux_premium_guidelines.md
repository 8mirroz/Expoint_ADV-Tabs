# Rule: UI/UX Design System — Priority Style

**Scope**: All UI components, sections, layouts, and visual changes.
**Priority**: HIGH — This rule overrides generic design preferences.

## Source of Truth

**All UI/UX decisions MUST follow the Expoint Design System:**

→ [`docs/design-system/DESIGN_SYSTEM.md`](../../docs/design-system/DESIGN_SYSTEM.md)

This document contains:
- Complete color token system (dark mode first, #00ffa3 accent)
- Typography scales and text patterns
- Spacing system (4px base)
- Border radius map
- Shadow/glow system
- Component specifications (buttons, cards, tags, inputs, etc.)
- Animation and motion presets
- Copywriting tone and text patterns
- New component checklist

## Non-Negotiable Rules

1. **Dark Mode First**: All marketing sections use `#050508`–`#090909` backgrounds
2. **Single Accent**: `#00ffa3` (Neon Green) is the ONLY primary accent color
3. **Pill Buttons**: ALL CTA buttons use `border-radius: 100px` (rounded-full)
4. **Technical Labels**: Kickers/eyebrows in mono font, UPPERCASE, wide tracking (0.15em–0.22em)
5. **Hover = Lift + Glow**: Every interactive element responds with `translateY(-1px to -2px)` + border/shadow accent tint
6. **Icon Containers**: 48px rounded-xl boxes with `border accent/20`, `bg accent/05`
7. **Grid Overlay**: Subtle engineering grid on dark sections (`rgba(255,255,255,0.025)`)
8. **Category Colors**: Each service direction has its own color — never mix or invent new ones

## Before Any UI Change

Run through the checklist in Section 17 of the Design System document:
- Dark background ✓
- Accent color #00ffa3 only ✓
- Pill buttons ✓
- Mono kickers ✓
- Hover interactions ✓
- Scroll reveal animations ✓
- Accessibility ✓

## Aesthetics Philosophy

**Style**: Dark Engineering Premium
- High information density
- Industrial precision
- Surgical use of neon green accent
- Technical mono-font labeling
- Ambient glow effects (orbs, top-accent lines)
- No decorative noise — every element is functional

## Interaction Model

- **Feedback**: Every click/hover has immediate visual response
- **Graceful Degradation**: `prefers-reduced-motion` reduces all animations to 1ms
- **Motion Library**: Framer Motion (motion/react) for interactions, GSAP for scroll-triggered reveals
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (premium) as default
