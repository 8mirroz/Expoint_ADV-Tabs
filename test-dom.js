const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/prices', { waitUntil: 'networkidle0' });
  const html = await page.evaluate(() => {
    const main = document.querySelector('main');
    return main ? main.innerHTML : 'no main';
  });
  console.log(html.substring(0, 2000));
  await browser.close();
})();
