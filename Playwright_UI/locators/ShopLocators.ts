import { Page, expect } from "@playwright/test";

export class ShopLocators {
  constructor(private page: Page) {}

  ShopNow = () => this.page.getByRole("link", { name: "Shop Now" });

  ElectronicsCategory = () =>
    this.page.getByAltText("ProSound Wireless Headphones");
  LaptopCategory = () => this.page.getByAltText("ThinSlate 15 Laptop");

  AddToCartButton = () =>
    this.page.getByTestId("add-to-cart-detail");


  HeaderCartIcon = () =>
    this.page.locator(".font-semibold text-sm").getByText("Cart");

  BuyNowButton = () => this.page.locator("[data-testid='buy-now-button']");
  ProceedToCheckoutButton = () =>
    this.page.getByRole("button", { name: "Proceed to Checkout" });
  FirstNameTextbox = () =>
    this.page.getByRole("textbox", { name: "Jane Smith" });
  EmailTextbox = () => this.page.getByPlaceholder("jane@example.com");
  PhoneNumberTextbox = () =>
    this.page.getByRole("textbox", { name: "555-123-4567" });
  AddressTextbox = () =>
    this.page.getByRole("textbox", { name: "123 Main Street" });
  StreetAddressTextbox = () =>
    this.page.getByRole("textbox", { name: "Springfield" });
  SelectStateDropdown = () =>
    this.page
      .locator("[data-testid='shipping-state-select']")
      .selectOption({ value: "AL" });

  ZipCodeTextbox = () => this.page.getByRole("textbox", { name: "62701" });
  ContinueToPaymentButton = () =>
    this.page.getByRole("button", { name: "Continue to Payment →" });

  RadioFailure = () =>
    this.page.getByRole("radio", { name: "✗ Payment Failure" });

  Name = () => this.page.getByRole("textbox", { name: "Jane Smith" });

  CardNumber = () => this.page.getByTestId("payment-card-number");

  ExpirationDate = () => this.page.getByRole("textbox", { name: "MM/YY" });

  CVV = () => this.page.getByTestId("payment-cvv");

  PlaceOrderButton = () =>
    this.page.locator("[data-testid='place-order-button']");
  declinePaymentButton = () =>
    this.page.locator("[data-testid='payment-general-error']");
}
