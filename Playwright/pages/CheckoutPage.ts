import { expect, Page } from '@playwright/test';

type GuestCheckout = {
  name: string;
  phone: string;
  email: string;
  shippingAddress: { street: string; city: string; state: string; zip: string; country: string };
};

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async completeGuestCheckout(data: GuestCheckout): Promise<void> {
    await this.page.getByTestId('checkout-mode-guest').click();
    await this.page.getByTestId('guest-name-input').fill(data.name);
    await this.page.getByTestId('guest-email-input').fill(data.email);
    await this.page.getByPlaceholder('555-123-4567').fill(data.phone);
    await this.page.getByTestId('shipping-street-input').fill(data.shippingAddress.street);
    await this.page.getByTestId('shipping-city-input').fill(data.shippingAddress.city);
    await this.page.getByTestId('shipping-state-select').selectOption(data.shippingAddress.state);
    await this.page.getByTestId('shipping-zip-input').fill(data.shippingAddress.zip);
    await this.page.getByTestId('shipping-country-input').fill(data.shippingAddress.country);
    await this.page.getByTestId('continue-to-payment-button').click();
    await expect(this.page.getByTestId('payment-page')).toBeVisible();
  }
}
