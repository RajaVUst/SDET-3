import { Page, expect } from '@playwright/test';
import { testConfig } from '../config';

export class HomePage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto(testConfig.baseUrl);
    await expect(this.page.getByRole('heading', { name: 'Shop Everything at RetailMart' })).toBeVisible();
  }

  async addFirstProductToCart() {
    await this.page.getByTestId('add-to-cart-prod-001').click();
    await this.page.getByTestId('cart-link').click();
  }
}
