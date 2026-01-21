import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Main Pages Screenshots', () => {
  test('Homepage / Transactions page', async ({ page }) => {
    await page.goto('/transactions');

    // Wait for the page to load
    await expect(page.getByText('FATSTX')).toBeVisible();
    await expect(page.getByLabel(/wallet address/i)).toBeVisible();

    // Take screenshot
    await page.screenshot({
      path: 'e2e/screenshots/transactions-page.png',
      fullPage: true,
    });
  });

  test('Stacking V1 page', async ({ page }) => {
    await page.goto('/stacking');

    await expect(page.getByText('FATSTX')).toBeVisible();

    await page.screenshot({
      path: 'e2e/screenshots/stacking-v1-page.png',
      fullPage: true,
    });
  });

  test('Stacking V2 page', async ({ page }) => {
    await page.goto('/stackingnew');

    await expect(page.getByText('FATSTX')).toBeVisible();

    await page.screenshot({
      path: 'e2e/screenshots/stacking-v2-page.png',
      fullPage: true,
    });
  });

  test('Stacking V3 page', async ({ page }) => {
    await page.goto('/stackingv3');

    await expect(page.getByText('FATSTX', { exact: true })).toBeVisible();

    await page.screenshot({
      path: 'e2e/screenshots/stacking-v3-page.png',
      fullPage: true,
    });
  });

  test('FAQ page', async ({ page }) => {
    await page.goto('/faq');

    await expect(page.getByText('FAQs')).toBeVisible();

    await page.screenshot({
      path: 'e2e/screenshots/faq-page.png',
      fullPage: true,
    });
  });

  test('FAQ page with hash navigation', async ({ page }) => {
    // Navigate to FAQ with hash
    await page.goto('/faq#faqaccordion2');

    // Wait for page to load
    await expect(page.getByText('FAQs')).toBeVisible();

    // Verify the second FAQ is expanded by checking for its answer content
    await expect(
      page.getByText(/raw addresses, not .btc addresses/i)
    ).toBeVisible();

    // Take screenshot showing expanded FAQ
    await page.screenshot({
      path: 'e2e/screenshots/faq-page-hash.png',
      fullPage: true,
    });
  });

  test('FAQ link icons are present', async ({ page }) => {
    await page.goto('/faq');

    await expect(page.getByText('FAQs')).toBeVisible();

    // Verify link icons are present (check for at least one)
    const linkButtons = page.getByRole('button', { name: /copy link to/i });
    await expect(linkButtons.first()).toBeVisible();

    // Verify we have multiple link icons (one for each FAQ)
    const count = await linkButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('About page', async ({ page }) => {
    await page.goto('/about');

    await expect(page.getByRole('heading', { name: /about/i })).toBeVisible();

    await page.screenshot({
      path: 'e2e/screenshots/about-page.png',
      fullPage: true,
    });
  });
});

test.describe('Navigation', () => {
  test('can navigate between pages', async ({ page }) => {
    await page.goto('/transactions');

    // Navigate to Stacking V1
    await page.getByRole('link', { name: /stacking \(v1\)/i }).click();
    await expect(page).toHaveURL(/.*stacking/);

    // Navigate to FAQ
    await page.getByRole('link', { name: /faq/i }).click();
    await expect(page).toHaveURL(/.*faq/);

    // Navigate to About
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/.*about/);

    // Navigate back to Transactions
    await page.getByRole('link', { name: /transactions/i }).click();
    await expect(page).toHaveURL(/.*transactions/);
  });
});

test.describe('Transactions Page Functionality', () => {
  test('wallet input accepts text', async ({ page }) => {
    await page.goto('/transactions');

    const walletInput = page.getByLabel(/wallet address/i);
    await walletInput.fill('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');

    await expect(walletInput).toHaveValue('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');
  });

  test('year selector is present', async ({ page }) => {
    await page.goto('/transactions');

    await expect(page.locator('#Year')).toBeVisible();
  });

  test('currency selector is present', async ({ page }) => {
    await page.goto('/transactions');

    await expect(page.locator('#Currency')).toBeVisible();
  });

  test('fetch transactions for wallet with EUR currency and 2025 year', async ({ page }) => {
    // Increase timeout for this test as it fetches real data
    test.setTimeout(120000);

    await page.goto('/transactions');

    // Enter wallet address
    const walletInput = page.getByLabel(/wallet address/i);
    await walletInput.fill('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');

    // Select EUR currency - click to open dropdown, then select EUR
    await page.locator('#currency').click();
    await page.getByRole('option', { name: 'EUR' }).click();

    // Select 2025 year - click to open dropdown, then select 2025
    await page.locator('#year').click();
    await page.getByRole('option', { name: '2025' }).click();

    // Click GO button
    await page.getByRole('button', { name: /go/i }).click();

    // Wait for loading to complete - the spinner should disappear
    // and transaction data should appear in the table
    await expect(page.locator('.MuiBackdrop-root')).toBeHidden({ timeout: 90000 });

    // Wait for table rows to appear (transactions loaded)
    await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 30000 });

    // Take screenshot of the results
    await page.screenshot({
      path: 'e2e/screenshots/transactions-with-data.png',
      fullPage: true,
    });
  });

  test('export transactions to CSV', async ({ page }) => {
    // Increase timeout for this test as it fetches real data
    test.setTimeout(120000);

    await page.goto('/transactions');

    // Enter wallet address
    const walletInput = page.getByLabel(/wallet address/i);
    await walletInput.fill('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');

    // Select EUR currency
    await page.locator('#currency').click();
    await page.getByRole('option', { name: 'EUR' }).click();

    // Select 2025 year
    await page.locator('#year').click();
    await page.getByRole('option', { name: '2025' }).click();

    // Click GO button
    await page.getByRole('button', { name: /go/i }).click();

    // Wait for transactions to load
    await expect(page.locator('.MuiBackdrop-root')).toBeHidden({ timeout: 90000 });
    await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 30000 });

    // Set up download handler before clicking export
    const downloadPromise = page.waitForEvent('download');

    // Click Export button
    await page.getByRole('button', { name: /export/i }).click();

    // Wait for download to complete
    const download = await downloadPromise;

    // Save the file to a known location
    const downloadPath = path.join('e2e', 'downloads', 'transactions-export.csv');
    await download.saveAs(downloadPath);

    // Read and verify the CSV content
    const csvContent = fs.readFileSync(downloadPath, 'utf-8');

    // Verify CSV has expected headers
    const lines = csvContent.split('\n');
    const headers = lines[0];

    expect(headers).toContain('currency');
    expect(headers).toContain('xactnId');
    expect(headers).toContain('xactnType');
    expect(headers).toContain('xactnFee');
    expect(headers).toContain('burnDate');
    expect(headers).toContain('inSymbol');
    expect(headers).toContain('outSymbol');

    // Verify there is data (more than just headers)
    expect(lines.length).toBeGreaterThan(1);

    // Verify the data contains transaction information
    // Check for non-empty data rows
    const dataRows = lines.filter((line) => line.trim().length > 0);
    expect(dataRows.length).toBeGreaterThan(1);

    // Log some info about the export
    console.log(`CSV exported with ${dataRows.length - 1} transaction rows`);
    console.log(`Headers: ${headers}`);
  });
});
