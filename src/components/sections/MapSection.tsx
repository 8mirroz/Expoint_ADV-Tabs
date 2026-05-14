"use client";

export default function MapSection() {
  return (
    <section className="w-full h-[60vh] min-h-[400px] relative overflow-hidden bg-background border-y border-outline/10">
      <iframe
        title="Яндекс Карта: Москва, Полимерная, 8"
        src="https://yandex.ru/map-widget/v1/?mode=search&text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9F%D0%BE%D0%BB%D0%B8%D0%BC%D0%B5%D1%80%D0%BD%D0%B0%D1%8F%2C%208&z=15"
        className="w-full h-full grayscale invert-[0.1] opacity-80 hover:opacity-100 transition-opacity duration-700"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute top-12 left-12 z-10 pointer-events-none">
        <div className="bg-background/80 backdrop-blur-md border border-outline/20 p-6 rounded-sm">
          <p className="verge-mono-label text-accent mb-2">Location_HQ</p>
          <h3 className="text-2xl font-headline uppercase leading-none">Москва, Полимерная 8</h3>
          <p className="verge-mono-label text-on-surface-variant mt-4">Industrial Zone "West"</p>
        </div>
      </div>
    </section>
  );
}
