# System Design: Theme & Styling System

## 1. Overview
This document outlines the architecture and implementation details for the Theme & Styling system in the Genesis v4 project. The system aims to provide a robust, accessible, and premium UI experience, featuring light/dark mode support, refined typography, and high-quality iconography.

## 2. Requirements
*   **Light/Dark Mode:** Seamless switching between light and dark themes without "Flash of Unstyled Content" (FOUC).
*   **Typography:** highly readable, modern font stack with clear hierarchy and optimal contrast.
*   **Color System:** Semantic color variables that adapt to the active theme.
*   **Icons:** Consistent, premium SVG iconography.
*   **Performance:** Minimal runtime overhead, leveraging CSS variables and Next.js optimizations.
*   **Tailwind Integration:** Deep integration with Tailwind CSS for rapid UI development.

## 3. Architecture

### 3.1. Theme Provider
*   **Component:** `ThemeProvider` (wrapper around `next-themes`'s `ThemeProvider`).
*   **Location:** In `app/layout.tsx` (or a dedicated providers file).
*   **Configuration:**
    *   `attribute="class"`: Toggles the `.dark` class on the `<html>` element.
    *   `defaultTheme="system"`: Respects the user's OS preference by default.
    *   `enableSystem={true}`: Allows falling back to system preference.

### 3.2. Color System (Tailwind + CSS Variables)
*   **Implementation:** Define semantic colors as CSS variables in `globals.css` within `:root` (light mode) and `.dark` blocks.
*   **Example (`globals.css`):**
    ```css
    @layer base {
      :root {
        --background: 0 0% 100%;
        --foreground: 222.2 84% 4.9%;
        --primary: 222.2 47.4% 11.2%;
        --primary-foreground: 210 40% 98%;
        /* ... other colors ... */
      }
      .dark {
        --background: 222.2 84% 4.9%;
        --foreground: 210 40% 98%;
        --primary: 210 40% 98%;
        --primary-foreground: 222.2 47.4% 11.2%;
        /* ... other colors ... */
      }
    }
    ```
*   **Tailwind Config:** Map these variables in `tailwind.config.ts`.
    ```typescript
    theme: {
      extend: {
        colors: {
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          primary: {
            DEFAULT: 'hsl(var(--primary))',
            foreground: 'hsl(var(--primary-foreground))',
          },
        }
      }
    }
    ```

### 3.3. Typography
*   **Font Loader:** Use `next/font/google` to load primary fonts (e.g., Inter, Geist, or equivalent modern sans-serif).
*   **Global Application:** Apply the font variable to the `<body>` tag.
*   **Styling Rules:**
    *   Use Tailwind's `text-sm`, `text-base`, `text-lg`, etc., for consistent sizing.
    *   Ensure line height (`leading-relaxed`, `leading-snug`) is optimized for readability.
    *   Maintain high contrast (`text-foreground`, `text-muted-foreground`).

### 3.4. Iconography
*   **Library:** Lucide React (`lucide-react`).
*   **Implementation:** Use as standard React components with Tailwind utility classes for sizing and color (`w-5 h-5 text-muted-foreground`).

### 3.5. Theme Toggle Component
*   **Component:** `ThemeToggle`
*   **Functionality:** A button/dropdown that allows the user to explicitly select "Light", "Dark", or "System".
*   **Hook:** Uses `useTheme` from `next-themes` to read and update the current theme state.

## 4. Implementation Steps

1.  **Install Dependencies:** `npm install next-themes lucide-react`
2.  **Configure CSS:** Update `globals.css` with `:root` and `.dark` CSS variables.
3.  **Configure Tailwind:** Update `tailwind.config.ts` to use the CSS variables for colors.
4.  **Create ThemeProvider:** Implement the `ThemeProvider` and wrap the application in `layout.tsx`.
5.  **Create ThemeToggle:** Build the UI component to switch themes.
6.  **Update Existing UI:** Refactor existing components to use the new semantic color classes (e.g., `bg-background text-foreground`).

## 5. Security & Compliance
*   Theme preferences are typically stored in `localStorage` by `next-themes`. This is considered a strictly necessary functional cookie/storage mechanism and generally does not require explicit user consent under GDPR/152-FZ, provided it is only used for theme preferences.

## 6. Diagram
(Not strictly necessary for this specific feature, as it's primarily configuration and a simple context provider, but could be added if complex theme inheritance is introduced later).
