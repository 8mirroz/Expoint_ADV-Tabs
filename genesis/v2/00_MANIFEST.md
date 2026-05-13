# Genesis v2 - Version Manifest

**Date**: 2026-05-11
**Status**: Active
**Previous**: v1

## Version Goals
Upgrade Expoint ADV to a Tier-1 Enterprise level by resolving SEO constraints, enhancing the visual WOW-factor, and closing the conversion loop. This includes migrating to a Server-Side Rendering strategy (Next.js), integrating a 3D visualizer via react-three-fiber, implementing CRM webhooks, and establishing a real AI Proxy backend.

## Major Changes
- [Change 1] Migrate from Vite SPA to Next.js (App Router) for SEO and SSR.
- [Change 2] Replace 2D SVG preview with Three.js/react-three-fiber 3D visualizer.
- [Change 3] Implement backend API routes for CRM Webhooks and Analytics Events.
- [Change 4] Implement AI Proxy API with `@ai-sdk/google` for real context-aware chat.

## Doc Checklist
- [x] 00_MANIFEST.md (This file)
- [x] 01_PRD.md
- [x] 02_ARCHITECTURE_OVERVIEW.md
- [x] 03_ADR/
- [x] 04_SYSTEM_DESIGN/
- [x] 05_TASKS.md (Grounded in NotebookLM)
- [x] 06_CHANGELOG.md
