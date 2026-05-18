# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: calculator.spec.ts >> Calculator full readiness >> calculator page supports geometry changes, upload, save, and resume
- Location: tests/e2e/calculator.spec.ts:4:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-surface="page"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('[data-surface="page"]')

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
- navigation "Breadcrumb":
  - list:
    - listitem:
      - link "Главная":
        - /url: /
    - listitem:
      - text: /
      - link "Главная":
        - /url: /
    - listitem: /Калькулятор
  - link "+7 (495) 000-00-00":
    - /url: tel:+74950000000
  - link "Telegram":
    - /url: https://t.me/expoint_adv
  - link "WhatsApp":
    - /url: https://wa.me/74950000000
  - link "Email":
    - /url: mailto:info@expoint-adv.ru
- main:
  - paragraph: B2B quote configurator / snapshot 2026-05-18
  - heading "Соберите вывеску как инженерный setup" [level=1]
  - paragraph: Конфигуратор считает предварительную смету по типу конструкции, материалам, подсветке, монтажному доступу и проверке по 902-ПП. Результат можно сохранить в quote cart и вернуться к редактированию setup.
  - paragraph: Что получит клиент
  - text: "3 варианта сметы: Start / Business / Premium. Прозрачный breakdown: производство, монтаж, срочность, 902-ПП. Возможность изменить setup из корзины перед заявкой. Загрузка конфигуратора..."
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
- button
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | 
  3  | test.describe('Calculator full readiness', () => {
  4  |   test('calculator page supports geometry changes, upload, save, and resume', async ({ page }) => {
  5  |     await page.goto('/calculator');
  6  | 
> 7  |     await expect(page.locator('[data-surface="page"]')).toBeVisible();
     |                                                         ^ Error: expect(locator).toBeVisible() failed
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
  65 |     await expect(embedded).toBeVisible();
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