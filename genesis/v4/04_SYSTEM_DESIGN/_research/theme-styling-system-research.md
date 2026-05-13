# Theme & Styling System Research

## 1. Goal
Identify best practices for implementing a Theme & Styling system in a Next.js (App Router) application using Tailwind CSS. Key focus areas include light/dark mode support, typography readability, contrast compliance (WCAG), and premium iconography.

## 2. Findings

### 2.1. Light/Dark Mode Toggle
*   **Next-Themes:** The `next-themes` library remains the industry standard for Next.js applications to avoid the "Flash of Unstyled Content" (FOUC) when switching themes. It seamlessly integrates with Tailwind CSS.
*   **Tailwind CSS Configuration:** Tailwind's `darkMode: 'class'` strategy is essential. This allows `next-themes` to toggle a `.dark` class on the `<html>` or `<body>` element.
*   **CSS Variables:** Defining colors using CSS variables (custom properties) in the `:root` and `.dark` blocks in the global CSS file is best practice. This allows for semantic color names (e.g., `var(--background)`, `var(--primary)`) that Tailwind can use.

### 2.2. Typography and Readability
*   **Fonts:** Next.js `next/font` automatically optimizes fonts and removes external network requests. Modern sans-serif fonts like Inter, Roboto, or Geist are recommended for clean UI.
*   **Readability:**
    *   Line height should typically be around `1.5` for body text.
    *   Measure (line length) should be kept around 60-75 characters for optimal readability.
    *   Hierarchy should be clearly established using distinct font weights, sizes, and colors (e.g., primary text vs. muted/secondary text).

### 2.3. Contrast and Accessibility (WCAG)
*   **WCAG Guidelines:** Text contrast should meet at least AA standards (4.5:1 for normal text, 3:1 for large text).
*   **Color Palettes:**
    *   Avoid pure black (`#000000`) and pure white (`#ffffff`) for backgrounds/text as they can cause eye strain. Off-whites (e.g., `#f8fafc`) and off-blacks (e.g., `#0f172a`) are preferred.
    *   Ensure semantic colors (success, error, warning) are accessible against both light and dark backgrounds.

### 2.4. Iconography
*   **Libraries:** Lucide React or Radix Icons provide high-quality, consistent, and customizable SVG icons.
*   **Usage:** Icons should scale predictably (usually using `em` units or Tailwind's sizing utilities like `w-5 h-5`).
*   **Accessibility:** Icons carrying meaning must have `aria-label` or visually hidden text for screen readers. Decorative icons should have `aria-hidden="true"`.

## 3. Conclusions
We will use `next-themes` with Tailwind CSS (using CSS variables for semantic colors). Typography will be handled via `next/font`, and Lucide React will be used for premium iconography.

## 4. References
*   Next.js Documentation
*   Tailwind CSS Documentation
*   next-themes repository
*   Lucide React documentation
