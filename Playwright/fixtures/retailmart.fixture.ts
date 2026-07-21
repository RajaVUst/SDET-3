import { test as base } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { PaymentPage } from '../pages/PaymentPage';

type RetailMartPages = {
  homePage: HomePage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
};

export const test = base.extend<{ retailMart: RetailMartPages }>({
  retailMart: async ({ page }, use) => {
    await use({
      homePage: new HomePage(page),
      cartPage: new CartPage(page),
      checkoutPage: new CheckoutPage(page),
      paymentPage: new PaymentPage(page),
    });
  },
});

export { expect } from '@playwright/test';
