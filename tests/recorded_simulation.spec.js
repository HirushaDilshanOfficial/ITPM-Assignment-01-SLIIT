import { test, expect } from '@playwright/test';

test('recorded simulation', async ({ page }) => {
  
  await page.goto('https://www.swifttranslator.com/');

  
  await page.getByPlaceholder('Input Your Singlish Text Here.').click();

  
  await page.getByPlaceholder('Input Your Singlish Text Here.').fill('mama gedara yanawa');

  
  await page.locator('.whitespace-pre-wrap').first().click();

  
  await page.locator('button.btn').nth(1).click();
});
