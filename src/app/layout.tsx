import type { Metadata, Viewport } from "next";
import Script from 'next/script';
import SmoothScroll from "@/components/motion/SmoothScroll";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import GSAPProvider from "@/components/motion/GSAPProvider";
import { Inter } from "next/font/google";
import ConsultationModal from "@/components/ui/ConsultationModal";
import { CookieBanner } from "@/components/compliance/CookieBanner";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bukva-svet.ru'),
  title: {
    template: '%s | БУКВА СВЕТ Инжиниринг',
    default: 'БУКВА СВЕТ — Премиальное производство наружной рекламы',
  },
  description: "B2B производство вывесок, объемных букв и систем навигации. Промышленный подход к дизайну и качеству. Онлайн калькулятор Reklamastroy.",
  openGraph: {
    title: 'БУКВА СВЕТ | Наружная реклама',
    description: 'Производство премиальной наружной рекламы in Москве.',
    url: 'https://bukva-svet.ru',
    siteName: 'БУКВА СВЕТ',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'БУКВА СВЕТ — Наружная реклама',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ru" className="scroll-smooth dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-background text-on-surface`} suppressHydrationWarning>
        {gaId && (
          <>
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <LanguageProvider>
            <SmoothScroll>
              <GSAPProvider>
                <PostHogProvider>
                  {children}
                </PostHogProvider>
              </GSAPProvider>
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
