import { expect, Page } from "@playwright/test";
import { Config } from "../config/Config";
import { ShopLocators } from "../locators/ShopLocators";
import { CustomerData } from "../data/Customer";

export class CheckOut {
 readonly locators: ShopLocators;
  constructor(private page: Page) {
          this.locators = new ShopLocators(page);
      }
 
 async Checkout() {
    await  this.locators.ProceedToCheckoutButton().click();
  }

 async firstNameTextbox() {
    await  this.locators.FirstNameTextbox().fill(CustomerData.firstName);
  }

  async lastNameTextbox() {
    await  this.locators.EmailTextbox().fill(CustomerData.email);
  }

  async PhoneNumberTextbox() {
    await  this.locators.PhoneNumberTextbox().fill(CustomerData.phone);
  }
  async AddressTextbox() {
    await  this.locators.AddressTextbox().fill(CustomerData.address);
  }
  async StreetTextbox() {
    await  this.locators.StreetAddressTextbox().fill(CustomerData.street);
  }
  async StateTextbox() {
    await  this.locators.SelectStateDropdown();
  }
  async zipCodeTextbox() {
    await  this.locators.ZipCodeTextbox().fill(CustomerData.zipCode);
  }


  async continueButton() {
    await  this.locators.ContinueToPaymentButton().click();
  }
  

}