const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://21st.dev/magic-chat?mcp_section=true', { waitUntil: 'networkidle' });
  
  // Try to find code elements or installation instructions
  const content = await page.evaluate(() => {
    return document.body.innerText;
  });
  console.log(content);
  await browser.close();
})();
