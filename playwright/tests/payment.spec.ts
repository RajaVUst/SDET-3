import { test } from '../fixtures';
import { PaymentPageObject } from '../pages/PaymentPageObject';

test('Payment processing error validation', async ({ page, logger }) => {
  const paymentPage = new PaymentPageObject(page, logger);

  await paymentPage.open();
  await paymentPage.addProduct('add-to-cart-prod-001');
  await paymentPage.addProduct('add-to-cart-prod-002');
  await paymentPage.addProduct('add-to-cart-prod-003');
  await paymentPage.openCart();
  await paymentPage.removeProduct('cart-remove-prod-001');
  await paymentPage.checkout();
  await paymentPage.fillGuestDetails();
  await paymentPage.continueToPayment();
  await paymentPage.fillCardDetails();
  await paymentPage.placeOrder();
  await paymentPage.expectPaymentError();
});