import { Page } from "@playwright/test";

export class homePageLocators {

    constructor(private page: Page) {}

    searchTextbox = () =>
        this.page.getByTestId("search-input");

    searchButton = () =>
        this.page.getByRole("button",{name:"Search"});

    homePageTitle = () =>
        this.page.getByRole("heading",{name: "Shop Everything at RetailMart"});

    categoryText = () =>
        this.page.getByRole("heading",{name:"Category"});
}