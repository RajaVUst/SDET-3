import { expect, Page } from "@playwright/test";
import { Config } from "../config/Config";
import { ShopLocators } from "../locators/ShopLocators";

export class AddcartPage {
  readonly locators: ShopLocators;
  constructor(private page: Page) {
    this.locators = new ShopLocators(page);
  }

  async AddCart() {
    await this.locators.AddToCartButton().click();
  }

  async BuyButton() {
    await this.locators.BuyNowButton().click();
  }
  async OpenCart() {
    await this.locators.HeaderCartIcon().click();
  }
  async verifyProductNavigation() {
    expect(this.page).toHaveURL("https://chess-agent-83252463.figma.site/cart");
  }
}
