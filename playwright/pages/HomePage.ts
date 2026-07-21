import { expect, Page } from '@playwright/test';
import { Logger } from '../src/Logger';

export class HomePage {
  constructor(protected readonly page: Page, protected readonly logger: Logger) {}

  async open() {
    const baseUrl = process.env.BASE_URL || 'https://chess-agent-83252463.figma.site/';
    this.logger.info(`Opening home page at ${baseUrl}`);
    await this.page.goto(baseUrl);
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
}
