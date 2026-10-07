const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  console.log('Page loaded. Initial scrollY:', await page.evaluate(() => window.scrollY));

  // Let's scroll down to #neural-mesh-experience
  const elem = await page.$('#neural-mesh-experience');
  if (elem) {
    const box = await elem.boundingBox();
    console.log('Found #neural-mesh-experience bounding box:', box);
  } else {
    console.log('#neural-mesh-experience NOT FOUND');
  }

  // Check if anything is auto-scrolling
  const y1 = await page.evaluate(() => window.scrollY);
  await page.waitForTimeout(2000);
  const y2 = await page.evaluate(() => window.scrollY);
  console.log(`scrollY after 2s without user input: y1=${y1}, y2=${y2}`);

  // Now let's scroll into the experience
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(1000);
  const y3 = await page.evaluate(() => window.scrollY);
  console.log(`scrollY after scrollTo(800): ${y3}`);

  await page.waitForTimeout(2000);
  const y4 = await page.evaluate(() => window.scrollY);
  console.log(`scrollY after waiting another 2s: ${y4}`);

  await browser.close();
})();
