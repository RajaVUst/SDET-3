const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://chess-agent-83252463.figma.site/');
  await page.getByTestId('add-to-cart-prod-001').click();
  await page.getByTestId('add-to-cart-prod-002').click();
  await page.getByTestId('add-to-cart-prod-003').click();
  await page.getByTestId('cart-link').click();
  await page.waitForTimeout(2000);
  console.log('cart-heading text:', await page.getByTestId('cart-heading').innerText());
  console.log('cart-total text:', await page.getByTestId('cart-total').innerText());
  console.log('qty button exists:', await page.getByTestId('cart-qty-increase-prod-001').count());
  console.log('remove button exists:', await page.getByTestId('cart-remove-prod-001').count());
  await browser.close();
})();
