# Changelog - Genesis v10

> This file records tweaks during this version iteration (handled by /change). New features/tasks require creating a new version (handled by /genesis).

## Format
- **[CHANGE]** Tweak existing task (via /change)
- **[FIX]** Fix issues
- **[REMOVE]** Remove content

---

## 2026-05-16 - Initialization
- [ADD] Created Genesis v10 version (copied from v8 architecture base)
- [ADD] PRD for Premium Internal Service Pages (Neon, Lightboxes, Wayfinding)
- [ADD] Architecture specs for SCN (Service Commerce Nodes) and pricing algorithms

## 2026-05-17 - HUD Bento Grid & 21st.dev Styling
- [CHANGE] Redesigned `/services` page layout from basic cards to a premium "HUD Bento Grid Workspace" inspired by 21st.dev.
- [ADD] Implemented `framer-motion` sliding active tabs (`layoutId="hudActiveTab"`) for seamless service navigation.
- [CHANGE] Replaced standard stat blocks with interactive HUD Bento cards featuring monotone codes (`SYS // AREA_01`), radial glows, and `group-hover` industrial grid overlays (`page.tsx`).
- [FIX] Enhanced `.rainbow-btn` CTA visibility and added interactive glowing effects.
- [ADD] Added semantic JSON-LD Schema.org markup (`ItemList`, `Service`) in Server Component for 100% SEO indexing while preserving interactive client-side experience.
- [REMOVE] Removed "Engineering Excellence" badge from Services page Hero section.
- [CHANGE] Translated Hero heading to Russian ("Наши Услуги").
- [CHANGE] Restructured, enlarged (`text-lg md:text-xl`), and maximized contrast (`text-neutral-100`) of the Hero description paragraph.
- [ADD] Generated and integrated a premium dark structural blueprint background image (`services-hero-bg.png`) with refined gradient overlays for the Hero section.
- [FIX] Redesigned global `.rainbow-btn` class to have a solid dark background (#09090b), limiting the multi-color gradient Strictly to the 1.5px border outline (contour), and integrated a custom multi-color hover glow bloom and active scale click effect.
- [CHANGE] Redesigned the "PricingExplainer" section component (used on `/prices` page) to match the premium "HUD Bento Grid Workspace" design language. Added black background, subtle technical grid and radial glow overlays, implemented the new contour-only glowing `.rainbow-btn` for the CTA button, and converted generic grey cards into glassmorphic HUD modules featuring pulsing green active dot indicators, technical monotone labels (`SYS // EST_01`), custom micro-icon containers, and sharp monospaced tech notes.
- [FIX] Resolved button hover/click feedback: completely removed multi-color rainbow elements on hover and click states from `.rainbow-btn`. Unified the design under Expoint's premium tech mint-to-cyan cyber spectrum (#00ffa3, #00e5ff, #005238), accelerated border sweep rotation from 4s to 2s on hover, shifted hover background to deep metallic cyber-green (#091a15), and set the active click background to slate-teal (#05261f).
- [CHANGE] Redesigned the global `FAQ` section component (`FAQ.tsx`) across all landing pages to match the premium "HUD Bento Grid Workspace" aesthetic introduced on the `/services` page. The new design features a deep black background, technical micro-grid overlays, monotone codes (`SYS // FAQ_01`), and glassmorphic `border-white/5` collapsible items with smooth hover glows and animated neon chevrons.
- [FIX] Fixed isolated TypeScript compilation errors in SCN (Service Commerce Nodes) models (`lightbox.v10.ts` and `kernel.ts`) to restore fully green Next.js static builds.
- [CHANGE] Redesigned the quick stats/trust metrics section on the services page: consolidated the values and units ("1 200 м²", "до 5 лет", "100% 902-ПП", "24/7 выезд") to have the identical font family (sans-serif), bold weight (font-black), and size (text-2xl md:text-3xl lg:text-4xl) side-by-side with wrapping protection, resolving styling inconsistency.
- [CHANGE] Added a menu-specific rainbow button variant `.rainbow-btn-menu` to restore the gorgeous, colorful classic spectrum border rotation (`#ff007f, #ff4500, #ffef00, #00dfd8, #0070f3, #7928ca, #ff007f`) specifically for the Header CTA button ("Заказать"). On hover, it cleanly fills with a bright mint green background (`#00ffa3`), shifts the text to dark grey (`#09090b`), fades out the outer rainbow ring, and generates a striking mint/cyan ambient glow. On active click, it transforms into deep cyberpunk cyan (`#00e5ff`).
- [REVERT] Completely restored the original `.rainbow-btn` styling across all components, featuring the classic multi-color rotating rainbow gradient ring, beautiful purple/blue hover aura glows, and snappy physical scale press feedback, removing the experimental mint-fill hover state and the temporary `.rainbow-btn-menu` class.
- [CHANGE] Enhanced the global `.rainbow-btn` CTA button: preserved the gorgeous rotating rainbow animation on idle (with 2px thick borders and multi-color gradient), but updated the hover state so that the background dynamically fills with solid bright mint (`#00ffa3`), the text turns black (`#09090b`), the outer rainbow ring smoothly fades out, and it casts a vibrant mint glow (`0 0 24px rgba(0,255,163,0.6)`). Active state compresses physically and morphs into electric cyan (`#00e5ff`) with black text.
