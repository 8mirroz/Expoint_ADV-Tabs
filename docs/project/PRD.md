# Expoint ADV - Premium Digital Platform PRD

## Executive Summary
Expoint ADV is undergoing a transformation from a standard demo site to a premium, commercially strong, and scalable B2B sales-engine and AI-ready digital platform for outdoor advertising, flexible neon, and complex environmental design.

## Target Audience
- Corporate clients (B2B)
- Retail chains and franchises
- Architecture and design bureaus

## Core Objectives
1. **Premium Aesthetic:** Elevate the UI/UX using the "EnterpriseCore" design system (Material Design 3 adapted for enterprise SaaS) to reflect high-end manufacturing capabilities.
2. **Modular Architecture:** Build a robust, scalable component library allowing rapid assembly of landing pages and product funnels.
3. **Conversion Engine:** Integrate deterministic pricing calculators and high-conversion lead forms.
4. **AI Integration:** Embed NotebookLM capabilities (Knowledge Base ID: 4fd5af82-f621-427b-b371-128da2ed85a6) directly into the UX via an AI Consultant widget, leveraging 19 research documents for accurate, context-aware user assistance.

## Technical Architecture
- **Frontend:** Vite, React 19, TailwindCSS v4, TypeScript
- **Design System:** EnterpriseCore (Custom Tailwind theme with semantic color tokens, Inter font, 4/16/24px border radii, glassmorphism panels).
- **AI Integration:** Client-side proxy stub for NotebookLM, designed to be swapped with a real API or MCP tool connection.
- **State Management:** Local deterministic state for calculators and UI components.

## Success Metrics
- 100% adherence to WCAG contrast standards within the new color palette.
- 0 hydration mismatches and 0 build-time linting errors.
- Seamless responsive behavior across mobile, tablet, and desktop views.
