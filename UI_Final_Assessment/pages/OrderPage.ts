import { Page } from "@playwright/test";
import { OrderLocators } from "../locators/OrderLocators";

export class OrderPage {

    readonly locators: OrderLocators;

    constructor(private page: Page) {
        this.locators = new OrderLocators(page);
    }
}