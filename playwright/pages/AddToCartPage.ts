import { expect, Page } from '@playwright/test';
import { Logger } from '../src/Logger';
import { env } from '../src/env';

export class AddToCartPage {
  constructor(protected readonly page: Page, protected readonly logger: Logger) {}

  async open() {
    this.logger.info(`Opening add-to-cart page at ${env.baseUrl}`);
    await this.page.goto(env.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addProduct(productId: string) {
    const locator = this.page.getByTestId(productId);
    await expect(locator).toBeVisible();
    await locator.click();
    this.logger.info(`Added product ${productId}`);
  }

  async openCart() {
    await this.page.getByTestId('cart-link').click();
    this.logger.info('Opened cart');
  }

  async expectCartHeading(count: number) {
    await expect(this.page.getByTestId('cart-heading').locator('span')).toContainText(`(${count} items)`);
    this.logger.info(`Verified cart heading with ${count} items`);
  }

  async expectCartTotal(total: string) {
    await expect(this.page.getByTestId('cart-total')).toContainText(total);
    this.logger.info(`Verified cart total ${total}`);
  }

  async increaseQuantity(productId: string) {
    await this.page.getByTestId(`cart-qty-increase-${productId}`).click();
    this.logger.info(`Increased quantity for ${productId}`);
  }

  async removeProduct(productId: string) {
    await this.page.getByTestId(productId).click();
    this.logger.info(`Removed product ${productId}`);
  }

  async refreshPage() {
    await this.page.reload();
    await this.page.waitForLoadState('domcontentloaded');
    this.logger.info('Refreshed the page');
  }
}
