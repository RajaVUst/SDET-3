import { Page } from '@playwright/test';
import { selectors } from '../locators/selectors';

export class CheckoutPage {
  constructor(private page: Page) {}

  async continueToPayment() {
    await this.page.getByTestId(selectors.continueToPaymentButton).click();
  }

  async fillPaymentDetails(name: string, number: string, expiry: string, cvv: string) {
    await this.page.getByTestId(selectors.paymentCardName).click();
    await this.page.getByTestId(selectors.paymentCardName).fill(name);
    await this.page.getByTestId(selectors.paymentCardNumber).click();
    await this.page.getByTestId(selectors.paymentCardNumber).fill(number);
    await this.page.getByTestId(selectors.paymentExpiry).click();
    await this.page.getByTestId(selectors.paymentExpiry).fill(expiry);
    await this.page.getByTestId(selectors.paymentCvv).click();
    await this.page.getByTestId(selectors.paymentCvv).fill(cvv);
  }

  async placeOrder() {
    await this.page.getByTestId(selectors.placeOrderButton).click();
  }
}
