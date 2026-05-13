"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t, uiCopy } from "@/i18n/site";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { locale } = useLanguage();
  const activeTheme = resolvedTheme ?? theme ?? "dark";
  const isDark = activeTheme === "dark";
  const title = isDark ? t(locale, uiCopy.themeLight) : t(locale, uiCopy.themeDark);
  const ariaLabel = isDark ? t(locale, uiCopy.switchToLight) : t(locale, uiCopy.switchToDark);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 flex items-center justify-center border border-outline bg-surface text-on-surface hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors duration-300 group overflow-hidden"
      aria-label={ariaLabel}
      aria-pressed={isDark}
      title={title}
    >
      <Sun className="w-5 h-5 text-accent dark:hidden" />
      <Moon className="hidden w-5 h-5 text-accent dark:block" />

      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent/50" />
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-accent/50" />
    </button>
  );
}
