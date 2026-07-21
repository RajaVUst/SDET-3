import { Page, expect } from '@playwright/test';

export class ConfirmationPage {
  constructor(private page: Page) {}

  async verifyConfirmation() {
    await expect(this.page.getByTestId('confirmation-heading')).toBeVisible();
    await expect(this.page.getByTestId('order-number')).toBeVisible();
    await expect(this.page.getByText(/confirmed/i)).toBeVisible();
  }
}
