import { expect, Page } from "@playwright/test";
import { ShopLocators } from "../locators/ShopLocators";

export class CategoryPage {
  readonly locators: ShopLocators;
  constructor(private page: Page) {
    this.locators = new ShopLocators(page);
  }

  async ProductLink() {
    await this.locators.ElectronicsCategory().click();
  }

  async LaptopLink() {
    await this.locators.LaptopCategory().click();
  }

  async verifyProductNavigation() {
    expect(this.page).toHaveURL(
      "https://chess-agent-83252463.figma.site/product/prod-001",
    );
  }

  async verifyLaptopNavigation() {
    expect(this.page).toHaveURL(
      "https://chess-agent-83252463.figma.site/product/prod-002",
    );
  }
}
