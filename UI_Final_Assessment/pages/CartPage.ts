import { Page } from "@playwright/test";
import { CartLocators } from "../locators/CartLocators";

export class CartPage {

    readonly locators: CartLocators;

    constructor(private page: Page) {
        this.locators = new CartLocators(page);
    }

    async clickCheckout() {
        await this.locators.checkoutButton().click();
    }

    async increaseQuantity() {
        await this.locators.increaseQuantity().click();
    }

    async getSubtotal() {
        return (await this.locators.subtotal().textContent())?.trim();
    }

    async getTax() {
        return (await this.locators.tax().textContent())?.trim();
    }

    async getShipping() {
        return (await this.locators.shipping().textContent())?.trim();
    }

    async getTotal() {
        return (await this.locators.total().textContent())?.trim();
    }
}