import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

export class CheckoutFlow {
  private homePage: HomePage;
  private cartPage: CartPage;
  private checkoutPage: CheckoutPage;
  private paymentPage: PaymentPage;
  private confirmationPage: ConfirmationPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.paymentPage = new PaymentPage(page);
    this.confirmationPage = new ConfirmationPage(page);
  }

  async completeCheckout() {
    await this.homePage.open();
    await this.homePage.addFirstProductToCart();
    await this.cartPage.verifyCartAndCheckout();
    await this.checkoutPage.fillGuestDetails();
    await this.paymentPage.fillPaymentDetails();
    await this.confirmationPage.verifyConfirmation();
  }
}
