import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage();
await p.goto('http://localhost:4173/assessment', { waitUntil: 'networkidle' });
const next = 'button:has-text("Continue")';

// Step 1
await p.getByLabel('First name').fill('Amina');
await p.getByLabel('Last name').fill('Banda');
await p.getByLabel('Business name', { exact: true }).fill('Banda Properties');
await p.getByLabel('Business type').fill('Property maintenance');
await p.getByLabel('Email', { exact: true }).fill('amina@example.com');
await p.getByLabel('Location').fill('Evanston, IL');
await p.click(next);
// Step 2
await p.getByLabel(/How do customers currently find/).fill('Referrals and Google');
await p.getByLabel(/How do inquiries reach/).fill('Phone and Instagram DMs');
await p.getByLabel('Who handles inquiries?').selectOption('Just me');
await p.getByLabel('Do you use a CRM?').selectOption('No');
await p.getByLabel('Do you use booking software?').selectOption('No');
await p.click(next);
// Step 3
await p.getByLabel(/biggest operational challenge/).fill('Too much admin after hours');
await p.getByLabel(/biggest customer-response challenge/).fill('Slow replies when on jobs');
await p.click(next);
// Step 4
await p.getByLabel('Respond faster').check();
await p.getByLabel('Organize leads').check();
await p.click(next);
// Step 5
await p.getByLabel('Business Response System').check();
await p.getByLabel('Budget range').selectOption('$4,500–$7,499');
await p.getByLabel('Desired timeline').selectOption('Within 1–2 months');
await p.getByLabel('Preferred contact method').selectOption('Email');
await p.click(next);
// Step 6 review
const body6 = await p.textContent('body');
console.log('review shows answers:', body6.includes('Banda Properties') && body6.includes('$4,500'));
await p.waitForTimeout(1700);
await p.getByRole('checkbox').check();
await p.click('button:has-text("Submit Assessment")');
await p.waitForTimeout(2500);
const done = await p.textContent('body');
console.log('assessment success:', done.includes('Thank you, Amina'));
console.log('booking option offered:', done.includes('Discovery Call'));
const lead = await p.evaluate(() => JSON.parse(localStorage.getItem('km.leads.v1')).find(l => l.email === 'amina@example.com'));
console.log('lead stored with utm/source fields:', !!lead && lead.formType === 'assessment' && lead.status === 'New' && Array.isArray(lead.desiredOutcomes));
const emails = await p.evaluate(() => JSON.parse(localStorage.getItem('km.emailLog.v1')).filter(e => e.leadId === (JSON.parse(localStorage.getItem('km.leads.v1')).find(l => l.email==='amina@example.com')||{}).id).map(e=>e.kind));
console.log('emails queued:', JSON.stringify(emails));
await b.close();
