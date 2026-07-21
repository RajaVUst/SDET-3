import { Page } from "@playwright/test";
import { PaymentLocators } from "../locators/PaymentLocators";

export class PaymentPage {

    readonly locators: PaymentLocators;

    constructor(private page: Page) {
        this.locators = new PaymentLocators(page);
    }

    async clickPaymentSuccess() {
        await this.locators.paymentSuccessRadio().check();
    }

    async clickPaymentFailure() {
        await this.locators.paymentFailureRadio().check();
    }

    async enterPaymentDetails(
        cardHolderName: string,
        cardNumber: string,
        expiry: string,
        cvv: string
    ) {
        await this.locators.cardHolderNameTextbox().fill(cardHolderName);
        await this.locators.cardNumberTextbox().fill(cardNumber);
        await this.locators.expiryTextbox().fill(expiry);
        await this.locators.cvvTextbox().fill(cvv);
    }

    async placeOrder() {
        await this.locators.placeOrderButton().click();
    }
}