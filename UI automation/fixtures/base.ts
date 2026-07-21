import { test as base } from '@playwright/test';
import { CheckoutFlow } from '../flows/CheckoutFlow';

export const test = base.extend<{ checkoutFlow: CheckoutFlow }>({
  checkoutFlow: async ({ page }, use) => {
    await use(new CheckoutFlow(page));
  },
});

export { expect } from '@playwright/test';
