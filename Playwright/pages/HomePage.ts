import { expect, Page } from '@playwright/test';

export type SelectedProduct = {
  id: string;
  name: string;
  imageAlt: string;
  price: number;
};

export class HomePage {
  constructor(private readonly page: Page) {}

  async open(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl);
  }



  async searchAndAddProduct(searchTerm: string): Promise<SelectedProduct> {
    await this.page.getByTestId('search-input').fill(searchTerm);
    await this.page.getByTestId('search-button').click();

    const product = this.page.locator('[data-testid^="product-card-"]').filter({ hasText: searchTerm }).first();
    await expect(product).toBeVisible();

    const id = (await product.getAttribute('data-testid'))!.replace('product-card-', '');
    const name = (await product.locator('[data-testid^="product-name-"]').textContent())!;
    const imageAlt = (await product.locator('img').getAttribute('alt'))!;
    const priceText = await product.locator('[data-testid^="product-price-"]').textContent();
    if (!priceText) throw new Error(`Price was not found for search term: ${searchTerm}.`);

    await product.locator('[data-testid^="add-to-cart-"]').click();
    return { id, name, imageAlt, price: Number(priceText.replace(/[^0-9.]/g, '')) };
  }
}
