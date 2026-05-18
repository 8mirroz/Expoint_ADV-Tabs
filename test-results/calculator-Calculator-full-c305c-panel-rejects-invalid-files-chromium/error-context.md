# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: calculator.spec.ts >> Calculator full readiness >> handoff panel rejects invalid files
- Location: tests/e2e/calculator.spec.ts:70:3

# Error details

```
Error: Channel closed
```

```
Error: locator.click: Test ended.
Call log:
  - waiting for getByRole('button', { name: /Монтаж и согласование/i })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Expoint AdvEngineering" [ref=e6] [cursor=pointer]:
        - /url: /
        - generic [ref=e7]:
          - generic [ref=e8]: Expoint Adv
          - text: Engineering
      - navigation [ref=e10]:
        - link "Услуги" [ref=e11] [cursor=pointer]:
          - /url: /services
        - link "Цены" [ref=e12] [cursor=pointer]:
          - /url: /prices
        - link "Кейсы" [ref=e13] [cursor=pointer]:
          - /url: /cases
        - link "О нас" [ref=e14] [cursor=pointer]:
          - /url: /about
        - link "Контакты" [ref=e15] [cursor=pointer]:
          - /url: /contacts
      - generic [ref=e17]:
        - button "Язык" [ref=e19]:
          - generic [ref=e20]:
            - img [ref=e21]
            - text: RU
          - img [ref=e24]
        - button "Корзина" [ref=e26]:
          - img [ref=e27]
          - text: "0"
        - button "Вход" [ref=e31]
        - button "Заказать" [ref=e32]:
          - generic [ref=e33]:
            - text: Заказать
            - img [ref=e34]
      - generic [ref=e36]:
        - button "Корзина" [ref=e37]:
          - img [ref=e38]
          - text: "0"
        - button "Открыть меню" [ref=e42]:
          - img [ref=e44]
  - generic [ref=e46]:
    - navigation "Breadcrumb" [ref=e48]:
      - list [ref=e49]:
        - listitem [ref=e50]:
          - link "Главная" [ref=e51] [cursor=pointer]:
            - /url: /
            - img [ref=e52]
            - text: Главная
        - listitem [ref=e55]:
          - text: /
          - link "Главная" [ref=e56] [cursor=pointer]:
            - /url: /
        - listitem [ref=e57]: /Калькулятор
      - generic [ref=e58]:
        - link "+7 (495) 000-00-00" [ref=e59] [cursor=pointer]:
          - /url: tel:+74950000000
        - generic [ref=e60]:
          - link "Telegram" [ref=e61] [cursor=pointer]:
            - /url: https://t.me/expoint_adv
            - img [ref=e62]
          - link "WhatsApp" [ref=e65] [cursor=pointer]:
            - /url: https://wa.me/74950000000
            - img [ref=e66]
          - link "Email" [ref=e68] [cursor=pointer]:
            - /url: mailto:info@expoint-adv.ru
            - img [ref=e69]
    - main [ref=e72]:
      - generic [ref=e75]:
        - generic [ref=e76]:
          - generic [ref=e77]:
            - paragraph [ref=e79]: B2B quote configurator / snapshot 2026-05-18
            - heading "Соберите вывеску как инженерный setup" [level=1] [ref=e80]
            - paragraph [ref=e81]: Конфигуратор считает предварительную смету по типу конструкции, материалам, подсветке, монтажному доступу и проверке по 902-ПП. Результат можно сохранить в quote cart и вернуться к редактированию setup.
          - generic [ref=e82]:
            - paragraph [ref=e83]: Что получит клиент
            - generic [ref=e84]:
              - generic [ref=e85]: "3 варианта сметы: Start / Business / Premium."
              - generic [ref=e86]: "Прозрачный breakdown: производство, монтаж, срочность, 902-ПП."
              - generic [ref=e87]: Возможность изменить setup из корзины перед заявкой.
        - generic [ref=e88]: Загрузка конфигуратора...
  - contentinfo [ref=e89]:
    - generic [ref=e90]:
      - generic [ref=e91]:
        - generic [ref=e92]:
          - generic [ref=e93]:
            - generic [ref=e94]: EX
            - generic [ref=e95]: Expoint ADV
          - paragraph [ref=e96]: Промышленное производство визуальных коммуникаций. Проектируем будущее вашего бренда в городском ландшафте.
          - generic [ref=e97]:
            - link "Mail" [ref=e98] [cursor=pointer]:
              - /url: mailto:hello@expoint.pro
              - img [ref=e99]
            - link "Telegram" [ref=e102] [cursor=pointer]:
              - /url: https://t.me/expoint_adv
              - img [ref=e103]
            - link "VK" [ref=e106] [cursor=pointer]:
              - /url: https://vk.com/
              - img [ref=e107]
            - link "Zen" [ref=e109] [cursor=pointer]:
              - /url: https://dzen.ru/
              - img [ref=e110]
        - generic [ref=e112]:
          - heading "Изделия" [level=4] [ref=e113]
          - list [ref=e114]:
            - listitem [ref=e115]:
              - link "Объемные буквы" [ref=e116] [cursor=pointer]:
                - /url: /services/volumetric-letters
                - text: Объемные буквы
                - img [ref=e117]
            - listitem [ref=e120]:
              - link "Неон" [ref=e121] [cursor=pointer]:
                - /url: /services/neon
                - text: Неон
                - img [ref=e122]
            - listitem [ref=e125]:
              - link "Лайтбоксы" [ref=e126] [cursor=pointer]:
                - /url: /services/lightboxes
                - text: Лайтбоксы
                - img [ref=e127]
            - listitem [ref=e130]:
              - link "Индивидуальные решения" [ref=e131] [cursor=pointer]:
                - /url: /services
                - text: Индивидуальные решения
                - img [ref=e132]
        - generic [ref=e135]:
          - heading "Система" [level=4] [ref=e136]
          - list [ref=e137]:
            - listitem [ref=e138]:
              - link "Портфолио" [ref=e139] [cursor=pointer]:
                - /url: /#cases
                - text: Портфолио
                - img [ref=e140]
            - listitem [ref=e143]:
              - link "Процесс" [ref=e144] [cursor=pointer]:
                - /url: /#process
                - text: Процесс
                - img [ref=e145]
            - listitem [ref=e148]:
              - link "902-ПП" [ref=e149] [cursor=pointer]:
                - /url: /compliance
                - text: 902-ПП
                - img [ref=e150]
            - listitem [ref=e153]:
              - link "Конфигуратор" [ref=e154] [cursor=pointer]:
                - /url: /calculator
                - text: Конфигуратор
                - img [ref=e155]
        - generic [ref=e158]:
          - heading "Штаб-квартира • Производство" [level=4] [ref=e159]
          - generic [ref=e160]:
            - generic [ref=e161]:
              - img [ref=e162]
              - heading "Москва, Полимерная 8" [level=3] [ref=e166]:
                - text: Москва,
                - text: Полимерная 8
            - generic [ref=e167]:
              - link "+7 (495) 000-00-00" [ref=e168] [cursor=pointer]:
                - /url: tel:+74950000000
              - link "hello@expoint.pro" [ref=e169] [cursor=pointer]:
                - /url: mailto:hello@expoint.pro
      - generic [ref=e170]:
        - generic [ref=e171]:
          - paragraph [ref=e172]: © 2026 EXPOINT ADV LABS — ALL RIGHTS RESERVED
          - generic [ref=e173]: v.2.4.0_CORP_STRICT
        - generic [ref=e174]:
          - link "Политика конфиденциальности" [ref=e175] [cursor=pointer]:
            - /url: /privacy
          - link "Условия сервиса" [ref=e176] [cursor=pointer]:
            - /url: /terms
  - button [ref=e178]:
    - generic [ref=e179]:
      - img [ref=e181]
      - img [ref=e183]
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
  65 |     await expect(embedded).toBeVisible();
  66 |     await embedded.getByRole('button', { name: /Монтаж и согласование/i }).click();
  67 |     await expect(embedded.getByTestId('handoff-panel')).toBeVisible();
  68 |   });
  69 | 
  70 |   test('handoff panel rejects invalid files', async ({ page }) => {
  71 |     await page.goto('/calculator');
> 72 |     await page.getByRole('button', { name: /Монтаж и согласование/i }).click();
     |                                                                        ^ Error: locator.click: Test ended.
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