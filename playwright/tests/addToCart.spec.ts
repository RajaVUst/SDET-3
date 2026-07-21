import { test } from '../fixtures';
import { AddToCartPage } from '../pages/AddToCartPage';

test('Add Multiple products and cart Validation', async ({ page, logger }) => {
  const addToCartPage = new AddToCartPage(page, logger);

  await addToCartPage.open();
  await addToCartPage.addProduct('add-to-cart-prod-001');
  await addToCartPage.addProduct('add-to-cart-prod-002');
  await addToCartPage.addProduct('add-to-cart-prod-003');
  await addToCartPage.openCart();

  await addToCartPage.expectCartHeading(3);
  await addToCartPage.increaseQuantity('prod-001');
  await addToCartPage.expectCartHeading(4);
  await addToCartPage.expectCartTotal('$1155.48');

  await addToCartPage.removeProduct('cart-remove-prod-001');
  await addToCartPage.expectCartHeading(2);
  await addToCartPage.expectCartTotal('$960.20');

  await addToCartPage.refreshPage();
  await addToCartPage.openCart();
  await addToCartPage.expectCartHeading(2);
  await addToCartPage.expectCartTotal('$960.20');
});