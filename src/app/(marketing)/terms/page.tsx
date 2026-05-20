import PageShell from "@/components/framework/PageShell";

export default function TermsPage() {
  return (
    <PageShell
      breadcrumbs={[
        { label: 'Условия сервиса', href: '/terms' }
      ]}
    >
      <main className="min-h-screen pt-12 pb-24 relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>

        <section className="section-container relative z-10">
          <div className="max-w-4xl mx-auto bento-card glass-panel p-8 md:p-16 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
            
            <p className="verge-kicker mb-6">SERVICE TERMS</p>
            <h1 className="geist-display-lg md:geist-display-xl mb-12 text-transparent bg-clip-text bg-gradient-to-br from-on-surface to-on-surface/70">
              Условия сервиса
            </h1>
            
            <div className="space-y-8 text-lg text-on-surface-variant leading-relaxed font-sans">
              <div className="space-y-4">
                <h2 className="geist-display-sm text-on-surface">1. Публичная оферта</h2>
                <p>
                  Информация на сайте не является публичной офертой. Стоимость и сроки уточняются после технического
                  брифа, замера и согласования спецификации.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="geist-display-sm text-on-surface">2. Порядок работ</h2>
                <p>
                  Производство запускается после согласования макета, технического задания и условий договора. Этапы
                  проекта, гарантийные обязательства и SLA фиксируются в коммерческом предложении и договоре.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="geist-display-sm text-on-surface">3. Контакты</h2>
                <p>
                  По вопросам условий работ обращайтесь по телефону{" "}
                  <a href="tel:+74950000000" className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium">
                    +7 (495) 000-00-00
                  </a>{" "}
                  или email{" "}
                  <a href="mailto:hello@bukva-svet.ru" className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium">
                    hello@bukva-svet.ru
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
