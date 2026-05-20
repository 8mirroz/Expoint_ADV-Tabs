import { expect, test } from '@playwright/test';

test.describe('Initial render stability', () => {
  test('prices hero is visible immediately after domcontentloaded', async ({ page }) => {
    await page.goto('/prices', { waitUntil: 'domcontentloaded' });

    const heroHeading = page.locator('h1').first();
    expect(await heroHeading.isVisible()).toBe(true);
  });

  test('service hero is visible immediately after domcontentloaded', async ({ page }) => {
    await page.goto('/services/neon', { waitUntil: 'domcontentloaded' });

    const heroHeading = page.locator('h1').first();
    expect(await heroHeading.isVisible()).toBe(true);
  });
});
