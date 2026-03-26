// @ts-nocheck
import { test, expect } from '@playwright/test';

test.describe('Public SSoT Routes & AEO QA', () => {

  test('Homepage renders successfully and uses H1', async ({ page }) => {
    // Requires local server running on port 3000
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Answers NDJSON AEO Feed is well-formed', async ({ request }) => {
    const response = await request.get('/api/ai/answers.ndjson');
    expect(response.ok()).toBeTruthy();
    
    // Content-Type should precisely match ndjson specs
    expect(response.headers()['content-type']).toContain('application/x-ndjson');
    
    // Ensure stream chunk parsing logic works
    const text = await response.text();
    const lines = text.trim().split('\n');
    expect(lines.length).toBeGreaterThan(0);
    
    const firstObj = JSON.parse(lines[0]);
    expect(firstObj).toHaveProperty('id');
    expect(firstObj).toHaveProperty('text');
  });

  test('Global Sitemap Generation Structure', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();
    
    const xml = await response.text();
    // Validate strict XML node presence required by search engines
    expect(xml).toContain('<urlset');
    expect(xml).toContain('<loc>');
    expect(xml).toContain('<lastmod>');
  });

});
