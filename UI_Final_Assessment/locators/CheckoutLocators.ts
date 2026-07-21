import { Page } from "@playwright/test";

export class CheckoutLocators {

    constructor(private page: Page) {}

    fullNameTextbox = () =>
        this.page.getByPlaceholder("Jane Smith");

    emailTextbox = () =>
        this.page.getByPlaceholder("jane@example.com");

    phoneNumberTextbox = () =>
        this.page.getByPlaceholder("555-123-4567");

    streetAddressTextbox = () =>
        this.page.getByPlaceholder("123 Main Street");

    cityTextbox = () =>
        this.page.getByPlaceholder("Springfield");

    stateDropDown = () =>
        this.page.getByTestId("shipping-state-select");

    zipCodeTextbox = () =>
        this.page.getByPlaceholder("62701");

    continueToPaymentButton = () =>
        this.page.getByRole("button",{name: "Continue to Payment →"});
}