import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function verify() {
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  const screenshotsDir = path.resolve('public/screenshots/life');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const viewports = [
    { name: 'mobile-390', width: 390, height: 844 },
    { name: 'tablet-1024', width: 1024, height: 768 },
    { name: 'desktop-1440', width: 1440, height: 900 },
  ];

  console.log('--- TESTING HORIZONTAL OVERFLOW GATE ---');

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });

    // Test Arabic (RTL)
    await page.goto('http://localhost:3000/about-us/life-at-aeitch', { waitUntil: 'networkidle' });
    const overflowAr = await page.evaluate(() => {
      return document.documentElement.scrollWidth - document.documentElement.clientWidth;
    });

    console.log(`[AR RTL] Viewport ${vp.name} (${vp.width}px): Overflow = ${overflowAr}px`);

    // Test English (LTR)
    await page.goto('http://localhost:3000/about-us/life-at-aeitch?lang=en', { waitUntil: 'networkidle' });
    const overflowEn = await page.evaluate(() => {
      return document.documentElement.scrollWidth - document.documentElement.clientWidth;
    });

    console.log(`[EN LTR] Viewport ${vp.name} (${vp.width}px): Overflow = ${overflowEn}px`);
  }

  // Capture representative screenshots at desktop and mobile
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/about-us/life-at-aeitch', { waitUntil: 'networkidle' });

  // 1. Hero
  await page.screenshot({ path: path.join(screenshotsDir, '01-hero-desktop.png') });

  // 2. Values section
  const valuesEl = await page.$('#values');
  if (valuesEl) {
    await valuesEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await valuesEl.screenshot({ path: path.join(screenshotsDir, '02-values-desktop.png') });
  }

  // 3. Team Wall section
  const teamEl = await page.$('#team');
  if (teamEl) {
    await teamEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await teamEl.screenshot({ path: path.join(screenshotsDir, '03-team-desktop.png') });
  }

  // 4. Celebrations section
  const celebEl = await page.$('#celebrations');
  if (celebEl) {
    await celebEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await celebEl.screenshot({ path: path.join(screenshotsDir, '05-celebrations-desktop.png') });
  }

  // 5. Day timeline
  const dayEl = await page.$('#day');
  if (dayEl) {
    await dayEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await dayEl.screenshot({ path: path.join(screenshotsDir, '06-day-desktop.png') });
  }

  // 6. Numbers & Quotes & CTA
  const numbersEl = await page.$('#numbers');
  if (numbersEl) {
    await numbersEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await numbersEl.screenshot({ path: path.join(screenshotsDir, '07-numbers-desktop.png') });
  }

  // Capture Mobile Screen
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/about-us/life-at-aeitch', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(screenshotsDir, 'mobile-full-view.png') });

  console.log('--- ALL SCREENSHOTS CAPTURED TO public/screenshots/life ---');

  await browser.close();
}

verify().catch((err) => {
  console.error('Verification error:', err);
  process.exit(1);
});
