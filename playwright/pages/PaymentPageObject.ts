import { expect, Page } from '@playwright/test';
import { Logger } from '../src/Logger';
import { env } from '../src/env';

export class PaymentPageObject {
  constructor(protected readonly page: Page, protected readonly logger: Logger) {}

  async open() {
    this.logger.info(`Opening payment page at ${env.baseUrl}`);
    await this.page.goto(env.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addProduct(productId: string) {
    const locator = this.page.getByTestId(productId);
    await expect(locator).toBeVisible();
    await locator.click();
    this.logger.info(`Added product ${productId}`);
  }

  async addProducts(productIds: string[] = env.products) {
    for (const productId of productIds) {
      await this.addProduct(productId);
    }
  }

  async openCart() {
    await this.page.getByTestId('cart-link').click();
    this.logger.info('Opened cart');
  }

  async removeProduct(productId: string = env.cartItemToRemoveBeforeCheckout) {
    await this.page.getByTestId(productId).click();
    this.logger.info(`Removed product ${productId}`);
  }

  async checkout() {
    await this.page.getByTestId('checkout-button').click();
    this.logger.info('Started checkout');
  }

  async fillGuestDetails() {
    await this.page.getByTestId('guest-name-input').fill(env.guestName);
    await this.page.getByTestId('guest-email-input').fill(env.guestEmail);
    await this.page.getByTestId('guest-phone-input').fill(env.guestPhone);
    await this.page.getByTestId('shipping-street-input').fill(env.shippingStreet);
    await this.page.getByTestId('shipping-city-input').fill(env.shippingCity);
    await this.page.getByTestId('shipping-state-select').selectOption(env.shippingState);
    await this.page.getByTestId('shipping-zip-input').fill(env.shippingZip);
    this.logger.info('Filled guest details');
  }

  async continueToPayment() {
    await this.page.getByTestId('continue-to-payment-button').click();
    this.logger.info('Continued to payment');
  }

  async fillCardDetails() {
    await this.page.getByTestId('payment-card-name').fill(env.cardName);
    await this.page.getByTestId('payment-card-number').fill(env.cardNumber);
    await this.page.getByTestId('payment-expiry').fill(env.cardExpiry);
    await this.page.getByTestId('payment-cvv').fill(env.cardCvv);
    this.logger.info('Filled card details');
  }

  async placeOrder() {
    await this.page.getByTestId('place-order-button').click();
    this.logger.info('Placed order');
  }

  async expectPaymentError(message: string = env.paymentErrorMessage) {
    await expect(this.page.getByTestId('payment-general-error')).toContainText(message);
    this.logger.info(`Verified error: ${message}`);
  }
}
