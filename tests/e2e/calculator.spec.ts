import { expect, test } from '@playwright/test';

test.describe('Calculator full readiness', () => {
  test('calculator page supports geometry changes, upload, save, and resume', async ({ page }) => {
    await page.goto('/calculator');

    await expect(page.locator('[data-surface="page"]')).toBeVisible();
    const total = page.getByTestId('calculator-total');
    const totalBefore = await total.textContent();

    await page.getByRole('button', { name: /Габариты и визуал/i }).click();
    await page.getByLabel('Высота, мм').fill('900');
    await expect(total).not.toHaveText(totalBefore ?? '');

    await page.getByRole('button', { name: /Монтаж и согласование/i }).click();
    const uploadInput = page.locator('input[aria-label="Добавить файлы для handoff"]');
    await uploadInput.setInputFiles({
      name: 'facade.png',
      mimeType: 'image/png',
      buffer: Buffer.from('facade-image'),
    });

    const handoffPanel = page.getByTestId('handoff-panel');
    await expect(handoffPanel.getByText('facade.png')).toBeVisible();
    await expect(handoffPanel.getByText('Загружено')).toBeVisible();

    await page.getByRole('button', { name: 'Далее' }).click();
    await expect(page.getByRole('button', { name: /Business/i })).toBeVisible();
    await page.getByRole('button', { name: /Premium/i }).click();
    await page.getByRole('button', { name: /Добавить setup в корзину/i }).click();

    await expect(page.getByText('Корзина')).toBeVisible();

    const cartItemId = await page.evaluate(() => {
      const raw = window.localStorage.getItem('expoint_sales_engine_v1');
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { state?: { draft?: { cartItemId?: string | null } } };
      return parsed.state?.draft?.cartItemId ?? null;
    });

    expect(cartItemId).toBeTruthy();

    await page.goto(`/calculator?cartItem=${cartItemId}`);
    await expect(page.getByRole('button', { name: /Коммерческая смета/i })).toHaveAttribute('aria-current', 'step');
    await page.getByRole('button', { name: /Монтаж и согласование/i }).click();
    await expect(page.getByTestId('handoff-panel').getByText('facade.png')).toBeVisible();
    await expect(page.getByTestId('handoff-panel').getByText('Загружено')).toBeVisible();
  });

  test('calculator page handles query type and stale cart', async ({ page }) => {
    await page.goto('/calculator?type=flex-neon');
    await expect(page.locator('[data-step="product"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /Гибкий неон/i }).first()).toBeVisible();

    await page.goto('/calculator?cartItem=stale-case&type=flex-neon');
    await expect(page.getByTestId('stale-recovery-banner')).toBeVisible();
    await page.getByRole('button', { name: 'Проверить параметры' }).click();
    await expect(page.locator('[data-step="product"]')).toBeVisible();
  });

  test('embedded calculator remains interactive on homepage', async ({ page }) => {
    await page.goto('/');

    const embedded = page.locator('[data-surface="section"]').first();
    await expect(embedded).toBeVisible();
    await embedded.getByRole('button', { name: /Монтаж и согласование/i }).click();
    await expect(embedded.getByTestId('handoff-panel')).toBeVisible();
  });

  test('handoff panel rejects invalid files', async ({ page }) => {
    await page.goto('/calculator');
    await page.getByRole('button', { name: /Монтаж и согласование/i }).click();

    const uploadInput = page.locator('input[aria-label="Добавить файлы для handoff"]');
    await uploadInput.setInputFiles({
      name: 'notes.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('invalid'),
    });

    await expect(page.getByTestId('handoff-panel').getByRole('alert')).toContainText('Недопустимый формат файла');
  });
});
