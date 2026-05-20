import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import ConsultationModal from '@/components/ui/ConsultationModal';
import CartDrawer from '@/components/cart/CartDrawer';
import { CookieBanner } from '@/components/compliance/CookieBanner';
// import AssistantWidget from '@/components/ai/AssistantWidget';
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
  showAssistant = false,
  withMesh = false,
}: PageShellProps) {
  // If breadcrumbs are provided, force 'default' header variant to avoid overlap bugs
  const resolvedHeaderVariant = (breadcrumbs && breadcrumbs.length > 0) ? 'default' : headerVariant;

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header variant={resolvedHeaderVariant} />
      {withMesh && <MeshBackground className="fixed inset-0" opacity={0.3} />}
      
      <div className="flex-grow flex flex-col relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <BreadcrumbsBar items={breadcrumbs} />
        )}
        <main className="flex-grow">{children}</main>
      </div>

      {showFooter && <Footer />}
      {/* showAssistant && <AssistantWidget /> */}
      <ConsultationModal />
      <CartDrawer />
      <CookieBanner />
    </div>
  );
}
