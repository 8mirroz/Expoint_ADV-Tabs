import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-32 pb-24">
        <section className="section-container">
          <div className="max-w-4xl rounded-2xl border border-outline bg-surface-elevated p-8 md:p-12 shadow-premium">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">152-ФЗ</p>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-on-surface mb-8">
              Политика конфиденциальности
            </h1>
            <div className="space-y-6 text-on-surface-variant leading-relaxed">
              <p>
                Мы обрабатываем только данные, необходимые для связи по заявке, подготовки расчета и исполнения
                договора. Источники данных: формы на сайте, телефон, email и мессенджеры.
              </p>
              <p>
                Категории данных: имя, телефон, email, контекст заявки и технические параметры проекта. Данные не
                используются для принятия автоматизированных юридически значимых решений без участия сотрудника.
              </p>
              <p>
                Вы можете запросить уточнение, ограничение обработки или удаление персональных данных через email{" "}
                <a href="mailto:hello@expoint.pro" className="text-accent hover:underline">
                  hello@expoint.pro
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
