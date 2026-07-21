import { test, expect } from '../fixtures/fixtures';
import { PurchaseFlow } from '../flows/purchase.flow';

test('purchase flow uses env baseURL and card data', async ({ page, cardHolderName, cardNumber, expiry, cvv }) => {
  const flow = new PurchaseFlow(page);

  await page.goto('/');
  await flow.purchaseDemoProducts(cardHolderName, cardNumber, expiry, cvv);

  await expect(page.getByText('Order Confirmed!Thank you,')).toBeVisible();
  await expect(page.getByTestId('order-number')).toBeVisible();
  await expect(page.getByTestId('order-totals')).toBeVisible();
  await page.getByTestId('continue-shopping-after-order').click();
});
