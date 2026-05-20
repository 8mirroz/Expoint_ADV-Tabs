# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: calculator.spec.ts >> Calculator full readiness >> handoff panel rejects invalid files
- Location: tests/e2e/calculator.spec.ts:70:3

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Шаг 03: Монтаж и согласование' })

```

# Page snapshot

```yaml
- generic:
  - generic [active]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - navigation [ref=e6]:
            - button "previous" [disabled] [ref=e7]:
              - img "previous" [ref=e8]
            - generic [ref=e10]:
              - generic [ref=e11]: 1/
              - text: "1"
            - button "next" [disabled] [ref=e12]:
              - img "next" [ref=e13]
          - img
        - generic [ref=e15]:
          - generic [ref=e16]:
            - img [ref=e17]
            - generic "Latest available version is detected (16.2.6)." [ref=e19]: Next.js 16.2.6
            - generic [ref=e20]: Turbopack
          - img
      - dialog "Build Error" [ref=e22]:
        - generic [ref=e25]:
          - generic [ref=e26]:
            - generic [ref=e27]:
              - generic [ref=e29]: Build Error
              - generic [ref=e30]:
                - button "Copy Error Info" [ref=e31] [cursor=pointer]:
                  - img [ref=e32]
                - link "Go to related documentation" [ref=e34] [cursor=pointer]:
                  - /url: https://nextjs.org/docs/messages/module-not-found
                  - img [ref=e35]
                - button "Attach Node.js inspector" [ref=e37] [cursor=pointer]:
                  - img [ref=e38]
            - generic [ref=e47]: "Module not found: Can't resolve '&#x27;/img/patterns/grid.svg&'"
          - generic [ref=e49]:
            - generic [ref=e51]:
              - img [ref=e53]
              - generic [ref=e55]: ./src/app/globals.css (4963:23)
              - button "Open in editor" [ref=e56] [cursor=pointer]:
                - img [ref=e58]
            - generic [ref=e61]:
              - generic [ref=e62]: Module not found
              - generic [ref=e63]: ": Can't resolve"
              - text: "'&#x27;/img/patterns/grid.svg&'"
              - generic [ref=e64]: 4961 |
              - generic [ref=e65]: "}"
              - generic [ref=e66]: 4962 |
              - generic [ref=e67]: ".bg-\\[url\\(\\&\\#x27\\;\\/img\\/patterns\\/grid\\.svg\\&\\#x27\\;\\)\\] {"
              - text: ">"
              - generic [ref=e68]: 4963 |
              - generic [ref=e69]: "background-image: url(&#x27;"
              - text: /img/patterns
              - generic [ref=e70]: /grid.svg&#x27;);
              - generic [ref=e71]: "|"
              - text: ^
              - generic [ref=e72]: 4964 |
              - generic [ref=e73]: "}"
              - generic [ref=e74]: 4965 |
              - generic [ref=e75]: .bg-\[url\(\
              - generic [ref=e76]: "'\\/img\\/patterns\\/grid\\.svg\\'\\)\\] {"
              - generic [ref=e77]: 4966 |
              - generic [ref=e78]: "background-image: url('"
              - text: /img/patterns/grid.svg');
              - generic [ref=e79]:
                - text: "Import trace: Client Component Browser: ./src/app/globals.css [Client Component Browser] ./src/app/layout.tsx [Server Component]"
                - link "https://nextjs.org/docs/messages/module-not-found" [ref=e80] [cursor=pointer]:
                  - /url: https://nextjs.org/docs/messages/module-not-found
        - generic [ref=e81]: "1"
        - generic [ref=e82]: "2"
    - generic [ref=e87] [cursor=pointer]:
      - button "Open Next.js Dev Tools" [ref=e88]:
        - img [ref=e89]
      - button "Open issues overlay" [ref=e93]:
        - generic [ref=e94]:
          - generic [ref=e95]: "0"
          - generic [ref=e96]: "1"
        - generic [ref=e97]: Issue
  - alert [ref=e98]
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
  15 |     await page.getByRole('button', { name: 'Шаг 03: Монтаж и согласование' }).click();
  16 |     const uploadInput = page.locator('input[aria-label="Добавить файлы для handoff"]');
  17 |     await uploadInput.setInputFiles({
  18 |       name: 'facade.png',
  19 |       mimeType: 'image/png',
  20 |       buffer: Buffer.from('facade-image'),
  21 |     });
  22 | 
  23 |     const handoffPanel = page.getByTestId('handoff-panel');
  24 |     await expect(handoffPanel.getByText(/^facade\.png$/)).toBeVisible();
  25 |     await expect(handoffPanel.getByText(/загружено/i)).toBeVisible();
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
  45 |     await page.getByRole('button', { name: 'Шаг 03: Монтаж и согласование' }).click();
  46 |     await expect(page.getByTestId('handoff-panel').getByText(/^facade\.png$/)).toBeVisible();
  47 |     await expect(page.getByTestId('handoff-panel').getByText(/загружено/i)).toBeVisible();
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
  66 |     await embedded.getByRole('button', { name: 'Шаг 03: Монтаж и согласование' }).click();
  67 |     await expect(embedded.getByTestId('handoff-panel')).toBeVisible();
  68 |   });
  69 | 
  70 |   test('handoff panel rejects invalid files', async ({ page }) => {
  71 |     await page.goto('/calculator');
> 72 |     await page.getByRole('button', { name: 'Шаг 03: Монтаж и согласование' }).click();
     |                                                                               ^ Error: locator.click: Test timeout of 120000ms exceeded.
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