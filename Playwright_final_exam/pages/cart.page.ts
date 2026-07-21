import { expect, Page } from '@playwright/test';
import { selectors } from '../locators/selectors';

export class CartPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.getByTestId(selectors.cartLink).click();
  }

  async increaseQuantity() {
    await this.page.getByTestId(selectors.cartQtyIncreaseProd001).click();
  }

  async decreaseQuantity() {
    await this.page.getByTestId(selectors.cartQtyDecreaseProd001).click();
  }

  async clickCheckout() {
    await this.page.getByTestId(selectors.checkoutButton).click();
  }

  async verifyCartTotals() {
    await expect(this.page.getByTestId(selectors.cartQtyIncreaseProd001)).toBeVisible();
    await expect(this.page.getByText('$89.99 each')).toBeVisible();
    await expect(this.page.getByText('Subtotal (4 items)$')).toBeVisible();
    await expect(this.page.getByText('Total$')).toBeVisible();
  }
}
