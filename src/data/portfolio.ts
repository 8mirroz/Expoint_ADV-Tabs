export type PortfolioItem = {
  id: string;
  title: string;
  category: "horeca" | "retail" | "corporate" | "beauty" | string;
  task: string;
  solution: string;
  budget: string;
  term: string;
  imageBg: string;
  videoUrl?: string;
  imageUrl?: string;
  tags?: string[];
  specs?: {
    material: string;
    lighting: string;
    dimensions: string;
    compliance: string;
  };
};

export const portfolio: PortfolioItem[] = [
  {
    id: "stitch-neon",
    category: "retail",
    title: "Stitch - Neon Branding",
    task: "Комплексное оформление витрины гибким неоном для премиального бренда одежды.",
    solution: "Производство и монтаж сложного неонового паттерна по макетам заказчика.",
    budget: "120 000 ₽",
    term: "10 дней",
    imageBg: "bg-primary-900",
    videoUrl: "/videos/signage/3d-letters-preview.mp4",
    tags: ["Гибкий неон", "Витрина", "Монтаж"],
    specs: {
      material: "Гибкий неон 6мм (S-type)",
      lighting: "LED IP67 High-Density",
      dimensions: "2400 x 1200 мм",
      compliance: "902-ПП (Интерьер)"
    }
  },
  {
    id: "coffee-house",
    category: "horeca",
    title: "Кофейня 'Зерно'",
    task: "Привлечь поток в кофейню с низкой видимостью, согласовать с ТЦ.",
    solution: "Объемные буквы с контражурной подсветкой, разработка дизайн-проекта для УК.",
    budget: "54 000 ₽",
    term: "8 дней",
    imageBg: "bg-primary-800",
    tags: ["Объемные буквы", "Контражур", "Подложка"],
    specs: {
      material: "Акрил 3мм + ПВХ 8мм",
      lighting: "Контражурный LED (Warm White)",
      dimensions: "1800 x 450 мм",
      compliance: "Согласовано (ТЦ)"
    }
  },
  {
    id: "smile-clinic",
    category: "Медицина",
    title: "Стоматология 'Смайл'",
    task: "Заменить устаревшую вывеску на фасаде жилого дома без жалоб жильцов.",
    solution: "Светодиодные пиксели с комфортной яркостью в ночное время, монтаж на подконструкции без повреждения фасада.",
    budget: "115 000 ₽",
    term: "14 дней",
    imageBg: "bg-neutral-800",
    tags: ["Пиксели", "Фасад"],
    specs: {
      material: "Алюминиевый композит",
      lighting: "Pixel LED Smart-Controller",
      dimensions: "3200 x 600 мм",
      compliance: "902-ПП (Фасад)"
    }
  }
];
