const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const outDir = path.join(__dirname, 'mobile-test');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Scroll through page to trigger ScrollTrigger animations
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), Math.floor((scrollHeight / steps) * i));
      await page.waitForTimeout(200);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    // Trigger ScrollTrigger refresh if available
    await page.evaluate(() => {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    });
    await page.waitForTimeout(500);

    // Full page screenshot
    await page.screenshot({ path: path.join(outDir, 'mobile-fullpage.png'), fullPage: true });
    console.log('Saved mobile-fullpage.png');

    // Viewport-only screenshots of key sections
    const sections = [
      { name: 'hero', scrollY: 0 },
      { name: 'welcome', scrollY: 900 },
      { name: 'tonics', scrollY: 1700 },
      { name: 'ingredients', scrollY: 2600 },
      { name: 'craft', scrollY: 3800 },
      { name: 'marquee', scrollY: 4800 },
      { name: 'footer', scrollY: 5600 },
    ];

    for (const sec of sections) {
      await page.evaluate((y) => window.scrollTo(0, y), sec.scrollY);
      await page.waitForTimeout(600);
      await page.screenshot({ path: path.join(outDir, `mobile-${sec.name}.png`) });
      console.log(`Saved mobile-${sec.name}.png`);
    }

    // Also test desktop for comparison
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, 'desktop-hero.png'), clip: { x: 0, y: 0, width: 1280, height: 900 } });
    console.log('Saved desktop-hero.png');

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
})();
