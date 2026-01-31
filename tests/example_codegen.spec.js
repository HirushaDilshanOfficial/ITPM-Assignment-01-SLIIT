import { test, expect } from '@playwright/test';

test('generated test', async ({ page }) => {
  
  
  await page.goto('https://www.swifttranslator.com/');
  
  
  await page.getByPlaceholder('Input Your Singlish Text Here.').click();
  
  
  await page.getByPlaceholder('Input Your Singlish Text Here.').fill('mama gedara yanawa');
  
  
  await page.locator('.bg-slate-50').click();
  
  
  await page.getByRole('button', { name: 'Clear' }).click();
});
