import { expect, Page } from '@playwright/test';
import { SelectedProduct } from './HomePage';

export class CartPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.getByTestId('cart-link').click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByTestId('checkout-button').click();
  }

  async validateProducts(products: SelectedProduct[]): Promise<void> {
    await expect(this.page.getByTestId('cart-heading')).toContainText('Shopping Cart');
    await expect(this.page.getByTestId('cart-count')).toHaveText(String(products.length));

    for (const product of products) {
      const cartItem = this.page.getByTestId(`cart-item-${product.id}`);
      await expect(cartItem).toBeVisible();
      await expect(cartItem.getByTestId(`cart-item-name-${product.id}`)).toHaveText(product.name);
      await expect(cartItem.locator('img')).toHaveAttribute('alt', product.imageAlt);
      await expect(cartItem.getByTestId(`cart-item-price-${product.id}`)).toHaveText(`$${product.price.toFixed(2)}`);
      await expect(this.page.getByTestId(`cart-qty-value-${product.id}`)).toHaveText('1');
    }

    const expectedSubtotal = products.reduce((sum, product) => sum + product.price, 0);
    const subtotal = this.currencyValue(await this.page.getByTestId('cart-subtotal').textContent());
    expect(subtotal).toBeCloseTo(expectedSubtotal, 2);
  }

  private currencyValue(value: string | null): number {
    if (!value) throw new Error('Expected a cart currency value but received none.');
    return Number(value.replace(/[^0-9.]/g, ''));
  }
}
