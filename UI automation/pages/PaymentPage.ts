import { Page, expect } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  async fillPaymentDetails() {
    await expect(this.page.getByRole('heading', { name: 'Payment', exact: true })).toBeVisible();
    await this.page.getByTestId('payment-card-name').fill('lakhan r');
    await this.page.getByTestId('payment-card-number').fill('4716318449275015');
    await this.page.getByTestId('payment-expiry').fill('12/30');
    await this.page.getByTestId('payment-cvv').fill('233');
    await this.page.getByTestId('place-order-button').click();
  }
}
