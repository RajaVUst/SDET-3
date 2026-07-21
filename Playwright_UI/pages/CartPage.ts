import { expect, Page } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  async verifyCartPage() {
    await expect(this.page).toHaveURL(
      "https://chess-agent-83252463.figma.site/cart",
    );
  }

  cartIconCount() {
    return this.page.getByTestId("cart-count");
  }

  subtotalItems() {
    return this.page.getByText(/Subtotal \(\d+ items\)/);
  }

  async verifyCartIconCount(expectedCount: number) {
    await expect(this.cartIconCount()).toHaveText(String(expectedCount));
  }

  async verifySubtotalItemCount(expectedCount: number) {
    await expect(this.subtotalItems()).toHaveText(
      `Subtotal (${expectedCount} items)`,
    );
  }
}
