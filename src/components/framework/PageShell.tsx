import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ConsultationModal from '@/components/ui/ConsultationModal';
import { CookieBanner } from '@/components/compliance/CookieBanner';
import AssistantWidget from '@/components/ai/AssistantWidget';
import { BreadcrumbsBar } from './BreadcrumbsBar';
import type { PageShellProps } from './types';

/**
 * PageShell — Unified layout wrapper for all pages.
 * Provides consistent Header, Footer, Modals, and Breadcrumbs.
 * 
 * Server Component — delegates client interactivity to child components.
 */
import { MeshBackground } from '@/components/ui/MeshBackground';

export default function PageShell({
  children,
  headerVariant = 'default',
  breadcrumbs,
  showFooter = true,
  showAssistant = true,
  withMesh = false,
}: PageShellProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header variant={headerVariant} />
      {withMesh && <MeshBackground className="fixed inset-0" opacity={0.3} />}
      
      <div className="flex-grow flex flex-col relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <BreadcrumbsBar items={breadcrumbs} />
        )}
        <main className="flex-grow">{children}</main>
      </div>

      {showFooter && <Footer />}
      {showAssistant && <AssistantWidget />}
      <ConsultationModal />
      <CookieBanner />
    </div>
  );
}
