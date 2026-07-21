import { Page } from '@playwright/test';
import { selectors } from '../locators/selectors';

export class HomePage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto('/');
  }

  async loginAsDemoUser() {
    await this.page.getByTestId(selectors.navLoginLink).click();
    await this.page.getByTestId(selectors.demoLoginUser001).click();
    await this.page.getByTestId(selectors.loginSubmitButton).click();
  }

  async searchAndAdd(productName: string, productId: string) {
    await this.page.getByTestId(selectors.searchInput).click();
    await this.page.getByTestId(selectors.searchInput).fill(productName);
    await this.page.getByTestId(selectors.searchButton).click();
    await this.page.getByTestId(productId).click();
  }
}
