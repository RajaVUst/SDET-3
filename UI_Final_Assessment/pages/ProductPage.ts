import { Page } from "@playwright/test";
import { ProductLocators } from "../locators/ProductLocators";

export class ProductPage {

    readonly locators: ProductLocators;

    constructor(private page: Page) {
        this.locators = new ProductLocators(page);
    }

    async addFirstProductToCart() {
        await this.locators.addToCartButton().first().click();
    }

    async openCart() {
        await this.locators.cartLink().click();
    }
}