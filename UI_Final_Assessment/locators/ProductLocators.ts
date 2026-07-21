import { Page } from "@playwright/test";

export class ProductLocators {

    constructor(private page: Page) {}

    searchResult = () =>
        this.page.getByRole("heading",{name: "1 result for 'quickcharge'"});

    productPrice = () =>
        this.page.getByTestId("product-price-prod-003");

    addToCartButton = () =>
        this.page.getByRole("button", { name: "Add to Cart" });

    cartLink = () =>
        this.page.getByTestId("cart-link");

    cartBadge = () =>
        this.page.getByTestId("cart-count");
}