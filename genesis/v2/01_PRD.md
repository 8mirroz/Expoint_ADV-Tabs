# Product Requirements Document (PRD)
**Project:** Expoint ADV - Premium AI-Ready B2B Sales Engine
**Version:** 2.0.0
**Status:** ACTIVE

## 1. Executive Summary
The goal is to upgrade the Expoint ADV platform to a Tier-1 Enterprise level by resolving SEO constraints, enhancing the visual WOW-factor, and closing the conversion loop. The platform will migrate to a **Server-Side Rendering (SSR) architecture via Next.js 15+** for maximum search engine visibility and AEO (AI Engine Optimization). It will also feature a **high-fidelity "Automotive-style" 3D configurator** for signage, automated CRM integration, and a functional AI Assistant grounded in manufacturing expertise.

## 2. Objectives
- **SEO & Discoverability (AEO/GEO):** Achieve maximum organic and AI-driven reach by moving to Next.js App Router for SSR and structured knowledge grounding.
- **Automotive-style Configuration:** Implement a premium step-by-step customization journey (similar to luxury car configurators) that builds value and emotional connection.
- **Conversion Closing:** Prevent lead drop-off by automatically pushing detailed technical specs (Build Sheets) and user details to CRM/Telegram via backend webhooks.
- **Premium Industrial Identity:** Establish a definitive "High-End Manufacturing" aesthetic using a **Deep Slate Dark Mode** with **Neon Orange** accents and sharp industrial grid layouts.
- **Intelligent Sales Agent:** Activate the AI Consultant grounded in the NotebookLM knowledge base, providing authoritative answers on manufacturing standards and pricing.

## 3. Target Audience & Segments
- **B2B Decision Makers:** Business owners, marketing directors, and facility managers looking for reliable, high-quality signage.
- **Key Segments:** HoReCa, Retail, Clinics & Beauty Salons, Franchises, Corporate Offices.

## 4. Key Features & Requirements

### 4.1. Core Architecture [REQ-001]
- **Next.js Migration:** The application must be migrated to Next.js (App Router) to ensure Server-Side Rendering (SSR) for key landing pages and service pages.
- **SEO Optimization:** Implementation of dynamic metadata, canonical tags, and structured data (JSON-LD) for products and services.

### 4.2. 3D Conversion Engine [REQ-002]
- **Three.js Visualizer:** Integration of `react-three-fiber` to render an interactive 3D model of channel letters.
- **Real-Time Customization:** The 3D model must react to the Zustand state (text changes, glow color, size, and material selection).

### 4.3. Data Pipeline & CRM [REQ-003]
- **Backend API Routes:** Next.js Route Handlers for securely processing form submissions.
- **Webhook Integration:** Automated forwarding of lead data (including estimated price and configured sign details) to a configured CRM or notification system.
- **Analytics Events:** Integration with Yandex.Metrika or Google Analytics to track conversion goals (e.g., "Price Calculated", "Lead Submitted").

### 4.4. AI Assistant Proxy [REQ-004]
- **Vercel AI SDK:** Implement a real streaming chat interface using `@ai-sdk/google` (Gemini) or a similar LLM provider.
- **Context Injection:** The system prompt must dynamically include the user's current configuration state to ensure relevant, conversion-focused dialogue.

## 5. Non-Functional Requirements
- **Performance:** 3D rendering must be optimized to ensure 60fps on modern mobile devices. Fallback to 2D for low-end devices if necessary.
- **Security:** API keys for the LLM and CRM webhooks must be secured server-side and never exposed to the client.

## 6. Future Phases
- Client Cabinet for secure document exchange and order tracking.
- E-commerce functionality for standard product packs.
