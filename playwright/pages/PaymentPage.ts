import { expect, Page } from '@playwright/test';
import { Logger } from '../src/Logger';

export class PaymentPage {
  constructor(protected readonly page: Page, protected readonly logger: Logger) {}

  async fillPaymentDetails(details: {
    name: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
  }) {
    await this.page.getByTestId('payment-card-name').fill(details.name);
    await this.page.getByTestId('payment-card-number').fill(details.cardNumber);
    await this.page.getByTestId('payment-expiry').fill(details.expiry);
    await this.page.getByTestId('payment-cvv').fill(details.cvv);
    this.logger.info('Filled payment details');
  }

  async placeOrder() {
    await this.page.getByTestId('place-order-button').click();
    this.logger.info('Placed order');
  }

  async expectPaymentError(message: string) {
    await expect(this.page.getByTestId('payment-general-error')).toContainText(message);
    this.logger.info(`Verified payment error: ${message}`);
  }
}
