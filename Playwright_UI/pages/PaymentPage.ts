import { expect, Page } from "@playwright/test";
import { Config } from "../config/Config";
import { ShopLocators } from "../locators/ShopLocators";
import { CustomerData } from "../data/Customer";

export class PaymentPage {
  readonly locators: ShopLocators;
  constructor(private page: Page) {
    this.locators = new ShopLocators(page);
  }

  async verifyPaymentPage() {
    await expect(this.page).toHaveURL(
      "https://chess-agent-83252463.figma.site/payment",
    );
  }
  async FailurePayment() {
    await this.locators.RadioFailure().click();
  }
  async Name() {
    await this.locators.Name().fill("Test");
  }
  async CardNumber() {
    await this.locators.CardNumber().fill("1234567890123456");
  }
  async ExpirationDate() {
    await this.locators.ExpirationDate().fill("12/26");
  }
  async CVV() {
    await this.locators.CVV().fill("123");
  }
  async ClickPayNow() {
    await this.locators.PlaceOrderButton().click();
  }
  async Decline() {
    const declineError = this.locators.declinePaymentButton();
    await expect(declineError).toBeVisible();
    await expect(
      this.page.getByText(
        /Payment failed due to insufficient funds\.?\s*Please try another card/i,
      ),
    ).toBeVisible();
     await expect(this.page).toHaveURL(/payment/);
      await expect( this.page.getByText(/Order Confirmed/i)).not.toBeVisible();
  }
  async verifyShippingDetailsRetained() {
  await expect(this.locators.FirstNameTextbox()).toHaveValue(CustomerData.firstName);
  await expect(this.locators.EmailTextbox()).toHaveValue(CustomerData.email);
  await expect(this.locators.PhoneNumberTextbox()).toHaveValue(CustomerData.phone);
  await expect(this.locators.AddressTextbox()).toHaveValue(CustomerData.address);
  await expect(this.locators.StreetAddressTextbox()).toHaveValue(CustomerData.street);
  await this.locators.SelectStateDropdown();
  await expect(this.locators.ZipCodeTextbox()).toHaveValue(CustomerData.zipCode);
}
}
