const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto('https://www.facebook.com/', {waitUntil: 'networkidle0'});

  const email = await page.evaluateHandle(() => document.querySelector('#login_form').querySelector('#email'))

  const password = await page.evaluateHandle(() => document.querySelector('#login_form').querySelector('#pass'))

  await page.evaluate((email) => {
    email.value = 'moin.mahmud@yahoo.com'
  }, email)

  await page.evaluate((password) => {
    password.value = 'Mahmud2322'
  }, password)

  
  
  const loginButton = await page.evaluateHandle(() => document.querySelector('#login_form').querySelector('#loginbutton'))

  await page.evaluate(loginButton => loginButton.click(), loginButton)

  await page.waitFor(10000)

  const events = await page.evaluateHandle(() => document.querySelector('a[title="Events"]'))

  await page.evaluate(events => events.click(), events)

  await page.waitFor(10000)

  const birthdays = await page.evaluateHandle(() => document.querySelector('div[data-key="birthdays"]'))

  await page.evaluate(birthdays => birthdays.click(), birthdays)

  
  const textareas = await page.evaluateHandle(() => document.querySelectorAll('textarea'))
  await page.waitFor(10000)

  await page.close();

  await browser.close();
}
 
run();
