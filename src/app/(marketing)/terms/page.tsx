import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-32 pb-24">
        <section className="section-container">
          <div className="max-w-4xl rounded-2xl border border-outline bg-surface-elevated p-8 md:p-12 shadow-premium">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">SERVICE TERMS</p>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-on-surface mb-8">
              Условия сервиса
            </h1>
            <div className="space-y-6 text-on-surface-variant leading-relaxed">
              <p>
                Информация на сайте не является публичной офертой. Стоимость и сроки уточняются после технического
                брифа, замера и согласования спецификации.
              </p>
              <p>
                Производство запускается после согласования макета, технического задания и условий договора. Этапы
                проекта, гарантийные обязательства и SLA фиксируются в коммерческом предложении и договоре.
              </p>
              <p>
                По вопросам условий работ обращайтесь по телефону{" "}
                <a href="tel:+74950000000" className="text-accent hover:underline">
                  +7 (495) 000-00-00
                </a>{" "}
                или email{" "}
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
