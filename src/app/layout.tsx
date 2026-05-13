import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { MotionProvider } from "@/components/motion/MotionProvider";
import SmoothScroll from "@/components/motion/SmoothScroll";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import GSAPProvider from "@/components/motion/GSAPProvider";
import { Outfit, Inter } from "next/font/google";
import ConsultationModal from "@/components/ui/ConsultationModal";
import { CookieBanner } from "@/components/compliance/CookieBanner";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: '#020617',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://expoint-adv.ru'),
  title: {
    template: '%s | Expoint ADV Engineering',
    default: 'Expoint ADV — Премиальное производство наружной рекламы',
  },
  description: "B2B производство вывесок, объемных букв и систем навигации. Промышленный подход к дизайну и качеству. Онлайн калькулятор Reklamastroy.",
  openGraph: {
    title: 'Expoint ADV | Наружная реклама',
    description: 'Производство премиальной наружной рекламы в Москве.',
    url: 'https://expoint-adv.ru',
    siteName: 'Expoint ADV',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Expoint ADV — Наружная реклама',
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
  return (
    <html lang="ru" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} font-inter`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <SmoothScroll>
              <GSAPProvider>
                <MotionProvider>
                  <PostHogProvider>
                    {children}
                    <ConsultationModal />
                    <CookieBanner />
                  </PostHogProvider>
                </MotionProvider>
              </GSAPProvider>
            </SmoothScroll>
          </LanguageProvider>
          <GoogleAnalytics gaId="G-XYZ1234567" />
        </ThemeProvider>
      </body>
    </html>
  );
}
