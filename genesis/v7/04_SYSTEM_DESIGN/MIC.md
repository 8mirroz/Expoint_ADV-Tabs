# System Design: Motion & Interaction Core (MIC)

## 1. System Overview
MIC (Motion & Interaction Core) is the central orchestration layer for all animations, transitions, and scroll effects in the Expoint V6 architecture. It is designed to deliver a premium, cinematic user experience ("Luxury Industrial") while maintaining high performance (60fps) and SEO integrity.

## 2. Architecture & Components
MIC utilizes a hybrid animation strategy, separating heavy scroll-based animations from lightweight component micro-interactions.

### 2.1 Core Modules
1.  **Smooth Scroll Controller**
    *   **Lenis**: Provides hardware-accelerated smooth scrolling. It normalizes scroll behavior across devices and acts as the timing source for scroll-linked animations.

2.  **Scroll-Driven Animation Engine**
    *   **GSAP & ScrollTrigger**: Handles complex, multi-stage timelines (e.g., hero section unpack, sticky sections, horizontal scroll sections).
    *   Optimized to run only when elements are in the viewport.

3.  **Micro-Interaction Framework**
    *   **Framer Motion**: Manages declarative state-based animations (hover states, modal entry/exit, layout shifts within Bento widgets).

4.  **Performance Manager**
    *   **Prefers-Reduced-Motion**: Automatic detection and graceful degradation of animations for accessibility.
    *   **GPU Acceleration**: Strict usage of `transform` and `opacity` for animations to avoid layout thrashing.
    *   **Dynamic Imports**: Heavy animation components are lazy-loaded where applicable.

## 3. Data Flow
1.  Lenis initializes on page load and takes control of the scroll bar.
2.  Lenis pipes scroll progress data into GSAP's `ticker` for synchronized animation timing.
3.  GSAP ScrollTriggers are registered on specific DOM nodes.
4.  User interacts (clicks/hovers) -> Framer Motion handles the immediate layout/state changes.

## 4. Interfaces & Abstractions

### Context Providers
*   `SmoothScrollProvider`: Initializes Lenis and provides the Lenis instance via Context for manual scroll control (e.g., "Scroll to top").
*   `GSAPProvider`: Context for managing global timelines and cleaning up instances on unmount.

### Reusable Wrappers
*   `<FadeIn>`: Simple wrapper using Framer Motion for entry animations.
*   `<Parallax>`: Utility component utilizing GSAP for subtle parallax effects.

## 5. Technology Stack
*   **GSAP (GreenSock)** + `ScrollTrigger`
*   **Framer Motion**
*   **Lenis** (Studio Freight)

## 6. Trade-offs & Decisions
*   **GSAP + Framer Motion Hybrid**: GSAP is unparalleled for scroll timelines, while Framer Motion is vastly superior for React state-driven layout changes. Combining them adds bundle size but yields the best possible UX.
*   **Strict CSS Transform Rule**: To guarantee 60fps, no animations are allowed to target `width`, `height`, `top`, or `left`. All movements must use `translate`, `scale`, and `opacity`.
