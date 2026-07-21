import { Page } from "@playwright/test";
import { CheckoutLocators } from "../locators/CheckoutLocators";

export class CheckoutPage {

    readonly locators: CheckoutLocators;

    constructor(private page: Page) {
        this.locators = new CheckoutLocators(page);
    }

    async enterContactAndAddressInformation(
        fullName: string,
        email: string,
        phone: string,
        street: string,
        city: string,
        zip: string,
    ) {
        await this.locators.fullNameTextbox().fill(fullName);
        await this.locators.emailTextbox().fill(email);
        await this.locators.phoneNumberTextbox().fill(phone);
        await this.locators.streetAddressTextbox().fill(street);
        await this.locators.cityTextbox().fill(city);
        await this.locators.stateDropDown().selectOption('IN');
        await this.locators.zipCodeTextbox().fill(zip);
    }

    async clickContinueToPayment() {
        await this.locators.continueToPaymentButton().click();
    }
}