import { test, expect, devices } from '@playwright/test';

// Use iPhone 12 viewport/profile for mobile screenshots
test.use({ ...devices['iPhone 12'] });

const TEST_WALLET = 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7';

test.describe('Mobile Screenshots (iPhone 12)', () => {
  test('mobile nav, support popover and pages', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/transactions');

    // Ensure hamburger is visible and open the menu
    const hamburger = page.locator('button[title="Open Navigation"]');
    await expect(hamburger).toBeVisible({ timeout: 8000 });
    await hamburger.click();

    // Wait for menu and capture screenshot
    await expect(page.getByRole('menu')).toBeVisible({ timeout: 5000 });
    await page.screenshot({ path: 'e2e/screenshots/mobile-menu-open.png', fullPage: true });

    // Open Support Us popover from the menu and capture it
    await page.getByRole('menuitem', { name: /support us/i }).click();
    await expect(page.locator('text=Buy us a Coffee!')).toBeVisible({ timeout: 10000 });
    await page.screenshot({ path: 'e2e/screenshots/mobile-support-popover.png' });

    // close popover
    // click outside the popover
    await page.click('body', { position: { x: 10, y: 10 } });
    await expect(page.locator('text=Buy us a Coffee!')).toBeHidden({ timeout: 5000 }); 

    // Navigate via menu: Stacking v1 and FAQ
    await hamburger.click();
    await page.getByRole('menuitem', { name: /stacking \(v1\)/i }).click();
    await expect(page).toHaveURL(/.*stacking/);
    await page.screenshot({ path: 'e2e/screenshots/mobile-stacking-v1.png', fullPage: true });

    await hamburger.click();
    await page.getByRole('menuitem', { name: /faq/i }).click();
    await expect(page).toHaveURL(/.*faq/);
    await page.screenshot({ path: 'e2e/screenshots/mobile-faq.png', fullPage: true });

    // Back to transactions, fetch data with known wallet
    await page.goto('/transactions');
    await page.getByLabel(/wallet address/i).fill(TEST_WALLET);

    // Select EUR and 2025 then click GO and wait for data
    await page.locator('#currency').click();
    await page.getByRole('option', { name: 'EUR' }).click();
    await page.locator('#year').click();
    await page.getByRole('option', { name: '2025' }).click();
    await page.getByRole('button', { name: /go/i }).click();
    await expect(page.locator('.MuiBackdrop-root')).toBeHidden({ timeout: 90000 });

    // Final mobile screenshot with results
    await page.screenshot({
      path: 'e2e/screenshots/mobile-transactions-with-data.png',
      fullPage: true,
    });
  });
});
