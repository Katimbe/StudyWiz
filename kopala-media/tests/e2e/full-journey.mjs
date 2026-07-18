import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext();
const p = await ctx.newPage();
const log = (m) => console.log('E2E:', m);

// Contact form: invalid then valid
await p.goto('http://localhost:4173/contact', { waitUntil: 'networkidle' });
await p.click('button:has-text("Send Message")');
await p.waitForTimeout(400);
log('validation errors shown: ' + await p.locator('.field-error').count());
await p.getByLabel('Full name').fill('Test Visitor');
await p.getByLabel('Business name').fill('Test Co');
await p.getByLabel('Email', { exact: true }).fill('visitor@example.com');
await p.getByLabel(/How can we help/).fill('We are losing leads because nobody answers inquiries quickly enough.');
await p.waitForTimeout(1700);
await p.getByRole('checkbox').check();
await p.click('button:has-text("Send Message")');
await p.waitForTimeout(2000);
log('contact success panel: ' + (await p.textContent('body')).includes('Thank you, Test'));

// Admin
await p.goto('http://localhost:4173/admin', { waitUntil: 'networkidle' });
await p.fill('#pass', 'kopala-admin');
await p.click('button:has-text("Open dashboard")');
await p.waitForTimeout(800);
log('admin shows lead: ' + (await p.textContent('body')).includes('Test Visitor'));
await p.click('button:has-text("Email log")');
await p.waitForTimeout(400);
log('email log entries: ' + ((await p.textContent('body')).match(/queued|sent/g) || []).length);
await p.click('button:has-text("Events")');
await p.waitForTimeout(400);
log('contact_form_submit recorded: ' + (await p.textContent('body')).includes('contact_form_submit'));

// Status change
await p.click('button:has-text("Leads")');
await p.click('text=Test Visitor');
await p.selectOption('#status', 'Qualified');
await p.waitForTimeout(500);
log('status changed to Qualified: ' + (await p.textContent('body')).includes('Status changed to Qualified'));

// Duplicate submission detection
await p.goto('http://localhost:4173/contact', { waitUntil: 'networkidle' });
await p.getByLabel('Full name').fill('Test Visitor');
await p.getByLabel('Email', { exact: true }).fill('visitor@example.com');
await p.getByLabel(/How can we help/).fill('We are losing leads because nobody answers inquiries quickly enough.');
await p.waitForTimeout(1700);
await p.getByRole('checkbox').check();
await p.click('button:has-text("Send Message")');
await p.waitForTimeout(2000);
log('duplicate handled politely: ' + (await p.textContent('body')).includes('already got your'));

// Assessment: validation, step-through, persistence
await p.goto('http://localhost:4173/assessment', { waitUntil: 'networkidle' });
await p.click('button:has-text("Continue")');
await p.waitForTimeout(400);
log('assessment blocks empty step 1: ' + (await p.locator('.field-error').count() > 0));
await p.getByLabel('First name').fill('Amina');
await p.getByLabel('Last name').fill('Banda');
await p.getByLabel('Business name', { exact: true }).fill('Banda Properties');
await p.getByLabel('Business type').fill('Property maintenance');
await p.getByLabel('Email', { exact: true }).fill('amina@example.com');
await p.getByLabel('Location').fill('Evanston, IL');
await p.click('button:has-text("Continue")');
await p.waitForTimeout(500);
log('advanced to step 2: ' + (await p.textContent('body')).includes('Current customer journey'));
// persistence: reload and check draft restored
await p.reload({ waitUntil: 'networkidle' });
log('draft persisted after reload: ' + ((await p.inputValue('input >> nth=1')) === 'Amina' || (await p.getByLabel('First name').inputValue()) === 'Amina'));

// Mobile
await p.setViewportSize({ width: 390, height: 844 });
await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await p.click('button[aria-label="Open menu"]');
await p.waitForTimeout(400);
log('mobile menu opens: ' + (await p.textContent('body')).includes('Take the Business Assessment'));
log('mobile horizontal overflow: ' + await p.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth));
await p.screenshot({ path: '/tmp/shots/mobile-home-menu.png' });
await p.keyboard.press('Escape');
await p.goto('http://localhost:4173/packages', { waitUntil: 'networkidle' });
await p.screenshot({ path: '/tmp/shots/mobile-packages.png', fullPage: false });

// Route smoke test (client nav from home)
for (const r of ['/about','/services','/packages','/industries','/work','/process','/book','/faq','/privacy','/terms','/sms-terms','/accessibility']) {
  await p.goto('http://localhost:4173/' , { waitUntil: 'networkidle' });
  await p.evaluate((path) => history.pushState({}, '', path), r);
  // navigate via link instead
  await p.goto('http://localhost:4173' + r, { waitUntil: 'networkidle' });
  const len = (await p.textContent('body'))?.trim().length ?? 0;
  log(`route ${r}: bodyLen=${len}`);
}
await b.close();
