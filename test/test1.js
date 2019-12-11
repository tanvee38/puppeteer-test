const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto('https://www.kijiji.ca/', {waitUntil: 'networkidle0'});

  const searchInput = await page.evaluateHandle(() => document.querySelector('input[name="keywords"]'))

  await page.evaluate((searchInput) => {
    searchInput.value = 'Toyota Camry'
  }, searchInput)

  const location = await page.evaluateHandle(() => document.querySelector('#SearchLocationPicker'))

  await page.evaluate((location) => {
    location.value = 'Edmonton'
  }, location)
  
  const goButton = await page.evaluateHandle(() => document.querySelector('button[name="SearchSubmit"]'))

  await page.evaluate(goButton => goButton.click(), goButton)

  await page.waitFor(10000)

  await page.close();

  await browser.close();
}
 
run();
