import { expect, Page } from '@playwright/test';

type PaymentDetails = { name: string; number: string; expiry: string; cvv: string };

export class PaymentPage {
  constructor(private readonly page: Page) {}

  async submitFailureScenario(details: PaymentDetails): Promise<void> {
    await this.page.getByTestId('payment-scenario-failure').check();
    await this.page.getByTestId('payment-card-name').fill(details.name);
    await this.page.getByTestId('payment-card-number').fill(details.number);
    await this.page.getByTestId('payment-expiry').fill(details.expiry);
    await this.page.getByTestId('payment-cvv').fill(details.cvv);
    await this.page.getByTestId('place-order-button').click();
  }

  async validateFailure(shippingAddress: Record<string, string>): Promise<void> {
    await expect(this.page.getByTestId('payment-general-error')).toContainText('Your card was declined. Please use a different card or contact your bank.');
    await expect(this.page).toHaveURL(/\/payment$/);
    await expect(this.page.getByTestId('order-confirmation-page')).toHaveCount(0);

    const retainedCheckout = await this.page.evaluate(() => sessionStorage.getItem('retailmart_checkout'));
    expect(retainedCheckout).not.toBeNull();
    for (const value of Object.values(shippingAddress)) {
      expect(retainedCheckout).toContain(value);
    }
  }
}
