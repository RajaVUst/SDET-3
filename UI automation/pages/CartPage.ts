import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async verifyCartAndCheckout() {
    await expect(this.page.getByTestId('cart-heading')).toBeVisible();

    const subtotalValue = parseFloat((await this.page.getByTestId('cart-subtotal').textContent())?.replace('$', '') || '0');
    const taxValue = parseFloat((await this.page.getByTestId('cart-tax').textContent())?.replace('$', '') || '0');
    const totalValue = parseFloat((await this.page.getByTestId('cart-total').textContent())?.replace('$', '') || '0');

    const expectedTax = Number((subtotalValue * 0.085).toFixed(2));
    const expectedTotal = Number((subtotalValue + expectedTax).toFixed(2));

    expect(taxValue).toBeCloseTo(expectedTax, 2);
    expect(totalValue).toBeCloseTo(expectedTotal, 2);

    await this.page.getByTestId('checkout-button').click();
  }
}
