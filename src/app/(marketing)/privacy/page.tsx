import PageShell from "@/components/framework/PageShell";

export default function PrivacyPage() {
  return (
    <PageShell
      breadcrumbs={[
        { label: 'Политика конфиденциальности', href: '/privacy' }
      ]}
    >
      <main className="min-h-screen pt-12 pb-24 relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-background" />
          <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        </div>

        <section className="section-container relative z-10">
          <div className="max-w-4xl mx-auto bento-card glass-panel p-8 md:p-16 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
            
            <p className="verge-kicker mb-6">152-ФЗ</p>
            <h1 className="geist-display-lg md:geist-display-xl mb-12 text-transparent bg-clip-text bg-gradient-to-br from-on-surface to-on-surface/70">
              Политика конфиденциальности
            </h1>
            
            <div className="space-y-8 text-lg text-on-surface-variant leading-relaxed font-sans">
              <div className="space-y-4">
                <h2 className="geist-display-sm text-on-surface">1. Общие положения</h2>
                <p>
                  Мы обрабатываем только данные, необходимые для связи по заявке, подготовки расчета и исполнения
                  договора. Источники данных: формы на сайте, телефон, email и мессенджеры.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="geist-display-sm text-on-surface">2. Категории данных</h2>
                <p>
                  Категории данных: имя, телефон, email, контекст заявки и технические параметры проекта. Данные не
                  используются для принятия автоматизированных юридически значимых решений без участия сотрудника.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="geist-display-sm text-on-surface">3. Права субъекта данных</h2>
                <p>
                  Вы можете запросить уточнение, ограничение обработки или удаление персональных данных через email{" "}
                  <a href="mailto:hello@expoint.pro" className="text-primary hover:text-primary/80 hover:underline transition-colors">
                    hello@expoint.pro
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
