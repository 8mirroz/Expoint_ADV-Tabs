import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ConsultationModal from '@/components/ui/ConsultationModal';
import { CookieBanner } from '@/components/compliance/CookieBanner';
import { BreadcrumbsBar } from './BreadcrumbsBar';
import type { PageShellProps } from './types';

/**
 * PageShell — Unified layout wrapper for all pages.
 * Provides consistent Header, Footer, Modals, and Breadcrumbs.
 * 
 * Server Component — delegates client interactivity to child components.
 */
export default function PageShell({
  children,
  headerVariant = 'default',
  breadcrumbs,
  showFooter = true,
  showAssistant = true,
}: PageShellProps) {
  return (
    <>
      <Header variant={headerVariant} />
      {breadcrumbs && breadcrumbs.length > 0 && (
        <BreadcrumbsBar items={breadcrumbs} />
      )}
      <main>{children}</main>
      {showFooter && <Footer />}
      <ConsultationModal />
      <CookieBanner />
    </>
  );
}
