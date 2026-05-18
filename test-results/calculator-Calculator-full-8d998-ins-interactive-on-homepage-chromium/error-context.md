# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: calculator.spec.ts >> Calculator full readiness >> embedded calculator remains interactive on homepage
- Location: tests/e2e/calculator.spec.ts:61:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-surface="section"]').first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('[data-surface="section"]').first()

```

```yaml
- banner:
  - link "Expoint AdvEngineering":
    - /url: /
  - navigation:
    - link "Услуги":
      - /url: /services
    - link "Цены":
      - /url: /prices
    - link "Кейсы":
      - /url: /cases
    - link "О нас":
      - /url: /about
    - link "Контакты":
      - /url: /contacts
  - button "Язык": RU
  - button "Корзина": "0"
  - button "Вход"
  - button "Заказать"
  - button "Корзина": "0"
  - button "Открыть меню"
- main:
  - region "Главный экран Expoint ADV":
    - text: Производство рекламных конструкций · Москва
    - heading "Вывески, которые работают на вас" [level=1]
    - paragraph: Проектируем и производим объёмные буквы, световые короба, неон и крышные конструкции. Под ключ — от согласования до монтажа.
    - text: Объёмные буквыСветовые коробаГибкий неонКрышные установкиМонтаж
    - link "Услуги и цены":
      - /url: /services
    - button "Скачать каталог"
    - text: 500+Проектов 12Лет опыта
    - button "Дополнительно"
    - textbox "Имя"
    - textbox "+7 (___) ___-__-__"
    - textbox "Email (опционально)"
    - checkbox "Согласие на обработку персональных данных и связь по проекту."
    - text: Согласие на обработку персональных данных и связь по проекту.
    - button "Оставить заявку"
    - paragraph: Гарантия 5 лет
    - paragraph: На все вывески
    - paragraph: Выезд 0 ₽
    - paragraph: Замер и смета
    - paragraph: 3D-дизайн 0 ₽
    - paragraph: Привязка к фасаду
  - paragraph: Наши партнеры
  - heading "Нам доверяют лидеры рынка" [level=2]
  - img "Siemens"
  - img "Bosch"
  - img "BMW"
  - img "Mercedes-Benz"
  - img "Audi"
  - img "Porsche"
  - img "Ferrari"
  - img "Tesla"
  - img "Samsung"
  - img "Nike"
  - img "Rolex"
  - img "LVMH"
  - img "Shell"
  - img "Siemens"
  - img "Bosch"
  - img "BMW"
  - img "Mercedes-Benz"
  - img "Audi"
  - img "Porsche"
  - img "Ferrari"
  - img "Tesla"
  - img "Samsung"
  - img "Nike"
  - img "Rolex"
  - img "LVMH"
  - img "Shell"
  - img "Siemens"
  - img "Bosch"
  - img "BMW"
  - img "Mercedes-Benz"
  - img "Audi"
  - img "Porsche"
  - img "Ferrari"
  - img "Tesla"
  - img "Samsung"
  - img "Nike"
  - img "Rolex"
  - img "LVMH"
  - img "Shell"
  - img "Siemens"
  - img "Bosch"
  - img "BMW"
  - img "Mercedes-Benz"
  - img "Audi"
  - img "Porsche"
  - img "Ferrari"
  - img "Tesla"
  - img "Samsung"
  - img "Nike"
  - img "Rolex"
  - img "LVMH"
  - img "Shell"
  - text: Производственные блоки
  - heading "Производство" [level=2]
  - paragraph: Проектируем и производим технологичные конструкции высокого качества
  - article:
    - link "Объемные буквы":
      - /url: /services/volumetric-letters
    - heading "Объемные буквы" [level=3]
    - text: Акрил 2-10 мм LED Samsung Алюминий Ресурс 50к ч. Тариф производства от85₽/см
  - article:
    - link "Световые короба":
      - /url: /services/lightboxes
    - heading "Световые короба" [level=3]
    - text: УФ-печать Лицевой акрил Сотовый карбонат Глубина 60-250 мм Тариф производства от4 500₽/м²
  - article:
    - link "Гибкий неон":
      - /url: /services/neon
    - heading "Гибкий неон" [level=3]
    - text: Силиконовый неон Акрил 5-8 мм Питание 12В Контроллер яркости Тариф производства от3 900₽/м.п.
  - article:
    - link "Монтаж и запуск":
      - /url: /services/metal-letters
    - heading "Монтаж и запуск" [level=3]
    - text: AISI 304 нержавейка Толщина 0.8-1.5 мм Зеркало / Шлиф Лазерная сварка Тариф производства от110₽/см
  - article:
    - link "Элементы навигации":
      - /url: /services/wayfinding
    - heading "Элементы навигации" [level=3]
    - text: Стальной каркас Облицовка АКП / Al Армобетонный базис Вес 150-1500 кг Тариф производства от180 000₽/изделие
  - article:
    - link "Крышные установки":
      - /url: /services/roof-installations
    - heading "Крышные установки" [level=3]
    - text: Буквы / Панно Горячекатаная сталь Расчет по СНиП Питание 380В / Авто Тариф производства от350 000₽/проект
  - img "Industrial Background"
  - text: ИНДИВИДУАЛЬНОЕ ПРОИЗВОДСТВО
  - heading "Нужен Индивидуальный Проект?" [level=3]
  - paragraph: Наши инженеры и дизайнеры разработают уникальное решение, которое выделит ваш бизнес и пройдет все согласования.
  - img "Blueprint Design"
  - paragraph: Signage DWG v1.0
  - text: 3D
  - paragraph: Фотореалистичный макет
  - paragraph: Показываем дневной и ночной сценарий до запуска в производство.
  - text: 24ч
  - paragraph: Первые эскизы
  - paragraph: Делаем стартовый пакет после замера и брифа без затяжки по срокам.
  - text: 902-ПП
  - paragraph: Городской контроль
  - paragraph: Проверяем размер, вылет и риски демонтажа ещё на стадии дизайна.
  - button "Связаться с нами"
  - paragraph: Бесплатный расчет за 24 часа
  - text: Individual Design Pack
  - paragraph: Premium Design Workflow
  - heading "Конструкторский дизайн-пакет" [level=4]
  - paragraph: Полный комплект проектной документации, визуализации и фасадной логики до запуска в производство.
  - paragraph: Срок старта
  - paragraph: 24ч
  - paragraph: Формат
  - text: CAD + 3D Лазерные обмеры и точная фотопривязка Инженерный пакет КМ/КМД для производства Свет, материалы и посадка под конкретный фасад
  - paragraph: Обсудить проект
  - link:
    - /url: https://t.me/expoint_adv
  - link:
    - /url: https://wa.me/74950000000
  - text: Бесплатный расчет за 24 часа Конфигурация в реальном времени
  - heading "Соберите свою Айдентику" [level=2]
  - paragraph: Проектируйте свою вывеску в реальном времени. Наш 3D-движок мгновенно рассчитывает стоимость с учетом материалов, сложности монтажа и требований 902-ПП.
  - text: Загрузка калькулятора...
  - paragraph: // DESIGN & VISUALIZATION
  - heading "Закажите дизайн-проект вывески." [level=2]
  - paragraph: Разработаем фотореалистичный 3D-макет, сделаем фотопривязку по 902-ПП и подготовим точные конструкторские файлы для ЧПУ до начала производства.
  - text: 01 3D
  - paragraph: 3D-ВИЗУАЛИЗАЦИЯ
  - paragraph: Покажем, как вывеска впишется в фасад при дневном и ночном освещении.
  - text: 02 24ч
  - paragraph: ЭКСКЛЮЗИВНЫЙ МАКЕТ
  - paragraph: Первые эскизы и конструктивные решения за 1 день с момента замера.
  - text: 03 902-ПП
  - paragraph: COMPLIANCE 902-ПП
  - paragraph: Проверяем размер, вылет, размещение и исключаем риски демонтажа.
  - text: 04 0₽
  - paragraph: ВЫЧЕТ ИЗ СМЕТЫ
  - paragraph: Стоимость проектирования полностью вычитается из стоимости вывески при заказе.
  - img "CAD Design Project Blueprint"
  - text: ИНДИВИДУАЛЬНЫЙ ЗАКАЗ Advanced Design System
  - heading "Конструкторский дизайн-пакет" [level=3]
  - paragraph: Полный комплект документации для изготовления вывески и прохождения всех этапов городского согласования в одном пакете.
  - paragraph: Фотопривязка
  - paragraph: Laser-fit
  - paragraph: Согласование
  - paragraph: 902-ПП
  - text: Лазерные обмеры и точная фотопривязка Визуализация дневного и ночного свечения Инженерный КМ/КМД пакет чертежей для ЧПУ Паспорт вывески и проверка на 902-ПП СВЯЗАТЬСЯ НАПРЯМУЮ // DIRECT LINE
  - link "+7 (495) 000-00-00":
    - /url: tel:+74950000000
  - text: "Или напишите в мессенджеры:"
  - link:
    - /url: https://t.me/expoint_adv
  - link:
    - /url: https://wa.me/74950000000
  - button "Заказать дизайн-проект"
  - text: Бесплатный расчет за 24 часа Протокол соответствия
  - heading "Согласование без компромиссов." [level=2]
  - paragraph: В Москве действуют жесткие регламенты 902-ПП. Мы проводим предварительный аудит вашего фасада, гарантируя соответствие архитектурному коду города до начала производства.
  - text: 902-ПП
  - paragraph: полное соответствие
  - heading "Архитектурная целостность" [level=3]
  - paragraph: Сохраняем эстетику здания, интегрируя рекламные конструкции как часть фасадного решения.
  - text: 500 000 ₽
  - paragraph: риск штрафа
  - heading "Снижение правовых рисков" [level=3]
  - paragraph: Исключаем штрафы до 500 000 ₽ через точное соблюдение архитектурных границ и дизайн-кода.
  - paragraph: Шаг 1 / 4
  - heading "Где планируется установка?" [level=3]
  - button "На фасаде 1-2 этажа"
  - button "Внутри торгового центра"
  - button "На крыше"
  - heading "ПРОЦЕСС" [level=2]
  - heading "От концепции до монтажа" [level=2]
  - paragraph: 5 этапов безупречного исполнения
  - text: "01"
  - heading "Заявка & Анализ" [level=3]
  - paragraph: Анализ фасада и брендбука. Определение рамок проекта.
  - text: "02"
  - heading "3D-Рендеринг" [level=3]
  - paragraph: Визуализация конструкций на объекте по нормам 902-ПП.
  - text: "03"
  - heading "Честная Смета" [level=3]
  - paragraph: Точный расчет материалов и работ без скрытых платежей.
  - text: "04"
  - heading "Производство" [level=3]
  - paragraph: Собственный цех с контролем качества электроники.
  - text: "05"
  - heading "Монтаж & Запуск" [level=3]
  - paragraph: Чистый монтаж, пусконаладка и гарантийные документы.
  - paragraph: Загрузка карты...
  - paragraph: Штаб-квартира
  - heading "Москва, Полимерная 8" [level=3]
  - text: Производственный хаб Инженерный центр
  - button "Открыть в Картах":
    - text: Открыть в Картах
    - img
- contentinfo:
  - text: EX Expoint ADV
  - paragraph: Промышленное производство визуальных коммуникаций. Проектируем будущее вашего бренда в городском ландшафте.
  - link "Mail":
    - /url: mailto:hello@expoint.pro
  - link "Telegram":
    - /url: https://t.me/expoint_adv
  - link "VK":
    - /url: https://vk.com/
    - img
  - link "Zen":
    - /url: https://dzen.ru/
    - img
  - heading "Изделия" [level=4]
  - list:
    - listitem:
      - link "Объемные буквы":
        - /url: /services/volumetric-letters
    - listitem:
      - link "Неон":
        - /url: /services/neon
    - listitem:
      - link "Лайтбоксы":
        - /url: /services/lightboxes
    - listitem:
      - link "Индивидуальные решения":
        - /url: /services
  - heading "Система" [level=4]
  - list:
    - listitem:
      - link "Портфолио":
        - /url: /#cases
    - listitem:
      - link "Процесс":
        - /url: /#process
    - listitem:
      - link "902-ПП":
        - /url: /compliance
    - listitem:
      - link "Конфигуратор":
        - /url: /calculator
  - heading "Штаб-квартира • Производство" [level=4]
  - heading "Москва, Полимерная 8" [level=3]
  - link "+7 (495) 000-00-00":
    - /url: tel:+74950000000
  - link "hello@expoint.pro":
    - /url: mailto:hello@expoint.pro
  - paragraph: © 2026 EXPOINT ADV LABS — ALL RIGHTS RESERVED
  - text: v.2.4.0_CORP_STRICT
  - link "Политика конфиденциальности":
    - /url: /privacy
  - link "Условия сервиса":
    - /url: /terms
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | 
  3  | test.describe('Calculator full readiness', () => {
  4  |   test('calculator page supports geometry changes, upload, save, and resume', async ({ page }) => {
  5  |     await page.goto('/calculator');
  6  | 
  7  |     await expect(page.locator('[data-surface="page"]')).toBeVisible();
  8  |     const total = page.getByTestId('calculator-total');
  9  |     const totalBefore = await total.textContent();
  10 | 
  11 |     await page.getByRole('button', { name: /Габариты и визуал/i }).click();
  12 |     await page.getByLabel('Высота, мм').fill('900');
  13 |     await expect(total).not.toHaveText(totalBefore ?? '');
  14 | 
  15 |     await page.getByRole('button', { name: /Монтаж и согласование/i }).click();
  16 |     const uploadInput = page.locator('input[aria-label="Добавить файлы для handoff"]');
  17 |     await uploadInput.setInputFiles({
  18 |       name: 'facade.png',
  19 |       mimeType: 'image/png',
  20 |       buffer: Buffer.from('facade-image'),
  21 |     });
  22 | 
  23 |     const handoffPanel = page.getByTestId('handoff-panel');
  24 |     await expect(handoffPanel.getByText('facade.png')).toBeVisible();
  25 |     await expect(handoffPanel.getByText('Загружено')).toBeVisible();
  26 | 
  27 |     await page.getByRole('button', { name: 'Далее' }).click();
  28 |     await expect(page.getByRole('button', { name: /Business/i })).toBeVisible();
  29 |     await page.getByRole('button', { name: /Premium/i }).click();
  30 |     await page.getByRole('button', { name: /Добавить setup в корзину/i }).click();
  31 | 
  32 |     await expect(page.getByText('Корзина')).toBeVisible();
  33 | 
  34 |     const cartItemId = await page.evaluate(() => {
  35 |       const raw = window.localStorage.getItem('expoint_sales_engine_v1');
  36 |       if (!raw) return null;
  37 |       const parsed = JSON.parse(raw) as { state?: { draft?: { cartItemId?: string | null } } };
  38 |       return parsed.state?.draft?.cartItemId ?? null;
  39 |     });
  40 | 
  41 |     expect(cartItemId).toBeTruthy();
  42 | 
  43 |     await page.goto(`/calculator?cartItem=${cartItemId}`);
  44 |     await expect(page.getByRole('button', { name: /Коммерческая смета/i })).toHaveAttribute('aria-current', 'step');
  45 |     await page.getByRole('button', { name: /Монтаж и согласование/i }).click();
  46 |     await expect(page.getByTestId('handoff-panel').getByText('facade.png')).toBeVisible();
  47 |     await expect(page.getByTestId('handoff-panel').getByText('Загружено')).toBeVisible();
  48 |   });
  49 | 
  50 |   test('calculator page handles query type and stale cart', async ({ page }) => {
  51 |     await page.goto('/calculator?type=flex-neon');
  52 |     await expect(page.locator('[data-step="product"]')).toBeVisible();
  53 |     await expect(page.getByRole('button', { name: /Гибкий неон/i }).first()).toBeVisible();
  54 | 
  55 |     await page.goto('/calculator?cartItem=stale-case&type=flex-neon');
  56 |     await expect(page.getByTestId('stale-recovery-banner')).toBeVisible();
  57 |     await page.getByRole('button', { name: 'Проверить параметры' }).click();
  58 |     await expect(page.locator('[data-step="product"]')).toBeVisible();
  59 |   });
  60 | 
  61 |   test('embedded calculator remains interactive on homepage', async ({ page }) => {
  62 |     await page.goto('/');
  63 | 
  64 |     const embedded = page.locator('[data-surface="section"]').first();
> 65 |     await expect(embedded).toBeVisible();
     |                            ^ Error: expect(locator).toBeVisible() failed
  66 |     await embedded.getByRole('button', { name: /Монтаж и согласование/i }).click();
  67 |     await expect(embedded.getByTestId('handoff-panel')).toBeVisible();
  68 |   });
  69 | 
  70 |   test('handoff panel rejects invalid files', async ({ page }) => {
  71 |     await page.goto('/calculator');
  72 |     await page.getByRole('button', { name: /Монтаж и согласование/i }).click();
  73 | 
  74 |     const uploadInput = page.locator('input[aria-label="Добавить файлы для handoff"]');
  75 |     await uploadInput.setInputFiles({
  76 |       name: 'notes.txt',
  77 |       mimeType: 'text/plain',
  78 |       buffer: Buffer.from('invalid'),
  79 |     });
  80 | 
  81 |     await expect(page.getByTestId('handoff-panel').getByRole('alert')).toContainText('Недопустимый формат файла');
  82 |   });
  83 | });
  84 | 
```