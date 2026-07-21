import { Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

export class PurchaseFlow {
  private homePage: HomePage;
  private cartPage: CartPage;
  private checkoutPage: CheckoutPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
  }

  async purchaseDemoProducts(cardHolderName: string, cardNumber: string, expiry: string, cvv: string) {
    await this.homePage.loginAsDemoUser();
    await this.homePage.searchAndAdd('prosound', 'add-to-cart-prod-001');
    await this.homePage.searchAndAdd('thinslate', 'add-to-cart-prod-002');
    await this.homePage.searchAndAdd('quickcharge', 'add-to-cart-prod-003');
    await this.cartPage.open();
    await this.cartPage.increaseQuantity();
    await this.cartPage.verifyCartTotals();
    await this.cartPage.decreaseQuantity();
    await this.cartPage.clickCheckout();
    await this.checkoutPage.continueToPayment();
    await this.checkoutPage.fillPaymentDetails(cardHolderName, cardNumber, expiry, cvv);
    await this.checkoutPage.placeOrder();
  }
}
