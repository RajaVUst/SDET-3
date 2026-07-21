import { Page } from '@playwright/test';
import { Logger } from '../src/Logger';

export class CheckoutPage {
  constructor(protected readonly page: Page, protected readonly logger: Logger) {}

  async fillGuestDetails(details: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  }) {
    await this.page.getByTestId('guest-name-input').fill(details.name);
    await this.page.getByTestId('guest-email-input').fill(details.email);
    await this.page.getByTestId('guest-phone-input').fill(details.phone);
    await this.page.getByTestId('shipping-street-input').fill(details.street);
    await this.page.getByTestId('shipping-city-input').fill(details.city);
    await this.page.getByTestId('shipping-state-select').selectOption(details.state);
    await this.page.getByTestId('shipping-zip-input').fill(details.zip);
    this.logger.info('Filled guest checkout details');
  }

  async continueToPayment() {
    await this.page.getByTestId('continue-to-payment-button').click();
    this.logger.info('Advanced to payment step');
  }
}
