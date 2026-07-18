import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await p.click('button[aria-label="Open menu"]');
await p.waitForTimeout(500);
const box = await p.locator('#mobile-nav').boundingBox();
console.log('menu box:', JSON.stringify(box));
await p.screenshot({ path: '/tmp/shots/mobile-menu-open.png' });
// keyboard: escape closes and focus returns
await p.keyboard.press('Escape');
await p.waitForTimeout(300);
console.log('menu closed via Escape:', await p.locator('#mobile-nav').count() === 0);
// skip link visible on tab
await p.keyboard.press('Tab');
const focused = await p.evaluate(() => document.activeElement?.textContent);
console.log('first tab focus:', focused);
await b.close();
