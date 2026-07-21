import { Page } from "@playwright/test";

export class CartLocators {

    constructor(private page: Page) {}

    cartHeading = () =>
        this.page.getByRole("heading", { name: "Shopping Cart" });

    thresholdValidation = () =>
        this.page.getByText("Add $40.01 more for free shipping!");

    freeShippingMessage = () =>
        this.page.getByText("You qualify for free shipping!");

    cartItem = () =>
        this.page.getByTestId("cart-item-name-prod-003");

    increaseQuantity = () =>
        this.page.getByTestId("cart-qty-increase-prod-003");

    decreaseQuantity = () =>
        this.page.getByTestId("cart-qty-decrease-prod-003");

    quantity = () =>
        this.page.getByTestId("cart-qty-value-prod-003");

    subtotal = () =>
        this.page.getByTestId("cart-subtotal");

    tax = () =>
        this.page.getByTestId("cart-tax");

    shipping = () =>
        this.page.getByTestId("cart-shipping");

    total = () =>
        this.page.getByTestId("cart-total");

    checkoutButton = () =>
        this.page.getByRole("button", { name: "Proceed to Checkout" });
}