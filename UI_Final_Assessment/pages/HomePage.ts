import { Page } from "@playwright/test";
import { homePageLocators } from "../locators/HomeLocators";

export class HomePage {

    readonly locators: homePageLocators;

    constructor(private page: Page) {
        this.locators = new homePageLocators(page);
    }

    async navigateToWebsite() {
        await this.page.goto("/");
    }

    async search(productName: string) {

        await this.locators.searchTextbox().fill(productName);

        await this.locators.searchButton().click();
    }
}