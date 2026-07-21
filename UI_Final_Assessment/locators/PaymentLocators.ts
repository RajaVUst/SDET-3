import { Page } from "@playwright/test";

export class PaymentLocators {

    constructor(private page: Page) {}

    paymentHeading = () =>
        this.page.getByRole("heading",{name: "Payment"});

    paymentSuccessRadio = () =>
        this.page.getByRole('radio', { name: 'Payment Success' });

    paymentFailureRadio = () =>
        this.page.getByRole('radio', { name: 'Payment Failure' });

    cardHolderNameTextbox = () =>
        this.page.getByPlaceholder("Jane Smith");

    cardNumberTextbox = () =>
        this.page.getByPlaceholder("1234 5678 9012 3456");

    expiryTextbox = () =>
        this.page.getByPlaceholder("MM/YY");

    cvvTextbox = () =>
        this.page.getByTestId("payment-cvv");

    placeOrderButton = () =>
        this.page.getByRole("button", { name: "Place Order" });

    paymentErrorMessage = () =>
        this.page.getByTestId("payment-general-error");

}