import { chromium } from 'playwright';

async function diagnose() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/about-us/life-at-aeitch', { waitUntil: 'networkidle' });

  const offenders = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const results = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const rect = el.getBoundingClientRect();
      if (rect.right > docWidth + 1 || rect.left < -1) {
        results.push({
          tag: el.tagName,
          id: el.id,
          className: el.className ? el.className.toString().substring(0, 100) : '',
          rect: { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) },
          text: el.innerText ? el.innerText.substring(0, 40) : '',
        });
      }
    }
    return results.slice(0, 15);
  });

  console.log('Offenders at 390px AR:', JSON.stringify(offenders, null, 2));

  // Also check at 1024px
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.goto('http://localhost:3000/about-us/life-at-aeitch', { waitUntil: 'networkidle' });

  const offenders1024 = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const results = [];
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const rect = el.getBoundingClientRect();
      if (rect.right > docWidth + 1 || rect.left < -1) {
        results.push({
          tag: el.tagName,
          id: el.id,
          className: el.className ? el.className.toString().substring(0, 100) : '',
          rect: { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) },
          text: el.innerText ? el.innerText.substring(0, 40) : '',
        });
      }
    }
    return results.slice(0, 15);
  });

  console.log('Offenders at 1024px AR:', JSON.stringify(offenders1024, null, 2));

  await browser.close();
}

diagnose().catch(console.error);
