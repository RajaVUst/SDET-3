import { test } from '../fixtures/base';

test('retailmart checkout flow', async ({ checkoutFlow }) => {
  await checkoutFlow.completeCheckout();
});
