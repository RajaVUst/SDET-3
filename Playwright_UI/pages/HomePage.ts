import { expect, Page } from "@playwright/test";
import { Config } from "../config/Config";
import { ShopLocators } from "../locators/ShopLocators";

export class HomePage {
 readonly locators: ShopLocators;
  constructor(private page: Page) {
          this.locators = new ShopLocators(page);
      }

  async navigate() {
    await this.page.goto(Config.baseUrl!);
  }
 async clickShopNow() {
    await  this.locators.ShopNow().click();
  }

  async verifyShopNowNavigation() {
    expect(this.page).toHaveURL("https://chess-agent-83252463.figma.site/?category=Electronics");
  }
  
  
}