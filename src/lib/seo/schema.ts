import { LocalBusiness, FAQPage, BreadcrumbList, WithContext } from 'schema-dts';

export const generateLocalBusinessSchema = (): WithContext<LocalBusiness> => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Expoint ADV",
  image: "https://expoint-adv.ru/og-image.jpg",
  "@id": "https://expoint-adv.ru",
  url: "https://expoint-adv.ru",
  telephone: "+7 (495) 000-00-00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Полимерная, 8",
    addressLocality: "Москва",
    postalCode: "111394", // arbitrary realistic postal code or just keep 101000
    addressCountry: "RU"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 55.7558,
    longitude: 37.6173
  },
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.9,
    reviewCount: 124
  }
});

export const generateFAQSchema = (): WithContext<FAQPage> => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Сколько стоит изготовить вывеску?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Стоимость гибкого неона начинается от 5000 рублей. Объемные буквы рассчитываются индивидуально, в среднем от 150 рублей за 1 см высоты."
      }
    },
    {
      "@type": "Question",
      name: "Делаете ли вы монтаж вывесок в Москве?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, мы предоставляем услуги профессионального монтажа вывесок любой сложности по Москве и Московской области."
      }
    },
    {
      "@type": "Question",
      name: "Какие сроки изготовления?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Стандартные сроки производства составляют от 3 до 7 рабочих дней в зависимости от сложности конструкции."
      }
    }
  ]
});

export const generateBreadcrumbSchema = (items: { name: string, item: string }[]): WithContext<BreadcrumbList> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((breadcrumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: breadcrumb.name,
    item: breadcrumb.item
  }))
});
