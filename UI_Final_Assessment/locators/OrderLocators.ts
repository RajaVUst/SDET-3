import { Page } from "@playwright/test";

export class OrderLocators {

    constructor(private page: Page) {}

    orderConfirmation = () =>
        this.page.getByRole("heading",{name:"Order Confirmed!"});

    orderItem = () =>
        this.page.getByText("QuickCharge 65W USB-C Hub");
}