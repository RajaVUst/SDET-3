import { Page } from "@playwright/test";
import { logger } from "../logger/logger";
import { HomePage } from "../pages/HomePage";
import { CategoryPage } from "../pages/CategoryPage";
import { AddcartPage } from "../pages/AddcartPage";
import { CheckOut } from "../pages/CheckOut";
import { PaymentPage } from "../pages/PaymentPage";

export class PaymentFlow {
  readonly homePage: HomePage;
  readonly categoryPage: CategoryPage;
  readonly addCartPage: AddcartPage;
  readonly checkOutPage: CheckOut;
  readonly paymentPage: PaymentPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.categoryPage = new CategoryPage(page);
    this.addCartPage = new AddcartPage(page);
    this.checkOutPage = new CheckOut(page);
    this.paymentPage = new PaymentPage(page);
  }

  async HomePageNavigation() {
    logger.info("Navigating to Home page");
    await this.homePage.navigate();
    logger.info("Home page navigation successful");
  }

  async ShopNowNavigation() {
    logger.info("Clicking Shop Now button");
    await this.homePage.clickShopNow();
    await this.homePage.verifyShopNowNavigation();
    logger.info("Shop Now button clicked successfully");
  }

  async ProductNavigation() {
    logger.info("Clicking on Electronics category");
    await this.categoryPage.ProductLink();
    await this.categoryPage.verifyProductNavigation();
    logger.info("Electronics category clicked successfully");
  }

  async LaptopNavigation() {
    logger.info("Clicking on Laptop product");
    await this.categoryPage.LaptopLink();
    await this.categoryPage.verifyLaptopNavigation();
    logger.info("Laptop product clicked successfully");
  }

  async AddToCart() {
    logger.info("Adding product to cart");
    await this.addCartPage.AddCart();
    logger.info("Product added to cart successfully");
  }

  async OpenCartItem() {
    logger.info("Opening cart");
    await this.addCartPage.BuyButton();
    await this.addCartPage.verifyProductNavigation();
    logger.info("Cart opened successfully");
  }

  async Checkout() {
    logger.info("Proceeding to checkout");
    await this.checkOutPage.Checkout();
    logger.info("Checkout initiated successfully");
  }

  async EnterCustomerInformation() {
    logger.info("Entering customer information");
    await this.checkOutPage.firstNameTextbox();
    await this.checkOutPage.lastNameTextbox();
    await this.checkOutPage.PhoneNumberTextbox();
    await this.checkOutPage.AddressTextbox();
    await this.checkOutPage.StreetTextbox();
    await this.checkOutPage.StateTextbox();
    await this.checkOutPage.zipCodeTextbox();
    await this.checkOutPage.continueButton();
    logger.info("Customer information entered successfully");
  }

  async Payment() {
    logger.info("Proceeding to payment");
    await this.paymentPage.verifyPaymentPage();
    await this.paymentPage.FailurePayment();
    await this.paymentPage.Name();
    await this.paymentPage.CardNumber();
    await this.paymentPage.ExpirationDate();
    await this.paymentPage.CVV();
    await this.paymentPage.ClickPayNow();
    await this.paymentPage.Decline();
    logger.info("Payment process completed successfully");
  }
}
