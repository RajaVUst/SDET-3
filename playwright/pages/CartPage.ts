import { expect, Page } from '@playwright/test';
import { Logger } from '../src/Logger';

export class CartPage {
  constructor(protected readonly page: Page, protected readonly logger: Logger) {}

  async expectItemCount(count: number) {
    const locator = this.page.getByTestId('cart-heading').getByText(`(${count} items)`);
    await expect(locator).toBeVisible();
    this.logger.info(`Verified cart count ${count}`);
  }

  async removeProduct(productId: string) {
    await this.page.getByTestId(productId).click();
    this.logger.info(`Removed product ${productId}`);
  }

  async checkout() {
    await this.page.getByTestId('checkout-button').click();
    this.logger.info('Started checkout');
  }
}
