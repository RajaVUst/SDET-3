import { expect, Page } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { PaymentPage } from "../pages/PaymentPage";
import { OrderPage } from "../pages/OrderPage";
import { CheckoutData } from "../data/CheckoutData";
import { PaymentData } from "../data/PaymentData";
import { logger } from "../logger/Logger";

export class RetailMartFlow {

    readonly homePage: HomePage;
    readonly productPage: ProductPage;
    readonly cartPage: CartPage;
    readonly checkoutPage: CheckoutPage;
    readonly paymentPage: PaymentPage;
    readonly orderPage: OrderPage;

    constructor(page: Page) {
        this.homePage = new HomePage(page);
        this.productPage = new ProductPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.paymentPage = new PaymentPage(page);
        this.orderPage = new OrderPage(page);
    }

    async searchForProduct(productName: string) {

        logger.info("Searching for a Product");

        await this.homePage.navigateToWebsite();

        await expect(this.homePage.locators.homePageTitle()).toBeVisible();

        await expect(this.homePage.locators.categoryText()).toBeVisible();

        await this.homePage.search(productName);

        logger.info("Got the list of Products matches the search");
    }

    async reachCheckoutPage() {

        logger.info("Navigating to Checkout page");

        await this.productPage.addFirstProductToCart();

        await expect(this.productPage.locators.cartBadge()).toBeVisible();

        await this.productPage.openCart();

        await expect(this.cartPage.locators.cartHeading()).toBeVisible();

        await expect(this.cartPage.locators.thresholdValidation()).toBeVisible();

        await expect(this.cartPage.locators.cartItem()).toBeVisible();

        await this.cartPage.clickCheckout();

        logger.info("Reached Checkout Information page");
    }

    async verifyFreeShippingThreshold() {

        logger.info("Verifying free shipping threshold");

        await this.productPage.addFirstProductToCart();

        await this.productPage.openCart();

        await expect(this.cartPage.locators.thresholdValidation()).toBeVisible();

        await expect(this.cartPage.locators.shipping()).toHaveText("$5.99");

        while ((await this.cartPage.getShipping()) !== "FREE") {
            await this.cartPage.increaseQuantity();
        }

        await expect(this.cartPage.locators.freeShippingMessage()).toBeVisible();

        await expect(this.cartPage.locators.shipping()).toHaveText("FREE");

        logger.info("Free shipping validated successfully");
    }

    async enterValidCustomerInformation() {

        logger.info("Entering customer information");

        await this.checkoutPage.enterContactAndAddressInformation(
            CheckoutData.customer.fullName,
            CheckoutData.customer.email,
            CheckoutData.customer.phone,
            CheckoutData.customer.street,
            CheckoutData.customer.city,
            CheckoutData.customer.zip
        );

        await this.checkoutPage.clickContinueToPayment();

        logger.info("Customer information entered successfully");
    }

    async enterCardDetails() {

        logger.info("Entering customer information");

        await this.paymentPage.enterPaymentDetails(
            PaymentData.customer.cardHolderName,
            PaymentData.customer.cardNumber,
            PaymentData.customer.expiry,
            PaymentData.customer.cvv
        );

        await this.paymentPage.placeOrder();

        await expect(this.paymentPage.locators.paymentErrorMessage()).toHaveText("Payment processing error. Please check your card details and try again.");

    }

    async enterCardDetailsForSuccess(cardNumber: string) {

        logger.info("Entering customer information");

        await this.paymentPage.enterPaymentDetails(
            PaymentData.customer.cardHolderName,
            cardNumber,
            PaymentData.customer.expiry,
            PaymentData.customer.cvv
        );

        await this.paymentPage.placeOrder();

    }

    async verifyOrderCompleted() {

        logger.info("Verifying order confirmation");

        await expect(
            this.orderPage.locators.orderConfirmation()
        ).toHaveText("Order Confirmed!");

        await expect(
            this.orderPage.locators.orderItem()
        ).toBeVisible();

        logger.info("Order confirmation verified");
    }


}