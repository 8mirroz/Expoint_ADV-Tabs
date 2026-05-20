"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  siteKey?: string;
}

declare global {
  interface Window {
    onloadTurnstileCallback: () => void;
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";

export function normalizeTurnstileSiteKey(siteKey?: string) {
  const trimmed = siteKey?.trim() ?? "";
  if (/^[A-Za-z0-9_-]{20,}$/.test(trimmed)) {
    return { siteKey: trimmed, isFallback: false };
  }

  if (process.env.NODE_ENV !== "production") {
    return { siteKey: TURNSTILE_TEST_SITE_KEY, isFallback: true };
  }

  return { siteKey: null, isFallback: false };
}

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  onVerify,
  siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [renderError, setRenderError] = useState(false);
  const resolvedSiteKey = useMemo(() => normalizeTurnstileSiteKey(siteKey), [siteKey]);
  const isUnavailable = renderError || !resolvedSiteKey.siteKey;
  const isFallback = resolvedSiteKey.isFallback && !renderError;

  useEffect(() => {
    if (!resolvedSiteKey.siteKey) {
      return;
    }

    const scriptId = "cloudflare-turnstile-script";

    let cancelled = false;
    let script: HTMLScriptElement | null = null;

    const renderWidget = () => {
      if (cancelled || !window.turnstile || !containerRef.current || widgetIdRef.current) {
        return;
      }

      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: resolvedSiteKey.siteKey,
          callback: onVerify,
          theme: "dark",
        });
      } catch (error) {
        console.error("[TurnstileWidget] Failed to render widget:", error);
        setRenderError(true);
      }
    };

    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    const handleLoad = () => renderWidget();
    const handleError = () => {
      if (!cancelled) {
        setRenderError(true);
      }
    };

    if (!existingScript) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", handleLoad, { once: true });
      script.addEventListener("error", handleError, { once: true });
      document.body.appendChild(script);
    } else {
      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener("error", handleError, { once: true });
    }

    if (window.turnstile) {
      renderWidget();
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", handleLoad);
      script?.removeEventListener("error", handleError);
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (error) {
          console.error("[TurnstileWidget] Failed to clean up widget:", error);
        }
        widgetIdRef.current = null;
      }
    };
  }, [onVerify, resolvedSiteKey]);

  if (isUnavailable) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-red-500/20 bg-red-500/[0.02] p-4 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-red-400/70">
          Безопасность
        </span>
        <p className="text-xs text-white/40 mt-1.5 leading-normal">
          Проверка безопасности временно недоступна. Отправка формы заблокирована.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#090b14]/50 p-4 transition-all duration-300 hover:border-white/15">
      {/* Background ambient light */}
      <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,245,160,0.06)_0%,transparent_70%)] pointer-events-none z-0" />
      
      <div className="relative z-10 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
            Защита от спама
          </span>
          {isFallback && (
            <span className="inline-flex items-center rounded-full border border-[#00ffa3]/20 bg-[#00ffa3]/5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#00ffa3] shadow-[0_0_10px_rgba(0,255,163,0.1)]">
              Тест
            </span>
          )}
        </div>
        
        <div className="flex justify-center min-h-[65px] pt-1">
          <div ref={containerRef} className="turnstile-container w-full max-w-[300px] flex justify-center [&_iframe]:!mx-auto" />
        </div>
      </div>
    </div>
  );
};
