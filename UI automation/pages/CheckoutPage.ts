import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillGuestDetails() {
    await expect(this.page.getByRole('heading', { name: 'Checkout', exact: true })).toBeVisible();
    await this.page.getByTestId('guest-name-input').fill('lakhan rathore');
    await this.page.getByTestId('guest-email-input').fill('l@r.com');
    await this.page.getByTestId('guest-phone-input').fill('1234567890');
    await this.page.getByTestId('shipping-street-input').fill('123 eeeeeeeeeeeee');
    await this.page.getByTestId('shipping-city-input').fill('wwwwwww');
    await this.page.getByTestId('shipping-state-select').selectOption('CT');
    await this.page.getByTestId('shipping-zip-input').fill('12323');
    await this.page.getByTestId('continue-to-payment-button').click();
  }
}
