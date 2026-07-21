import { Logger } from '../src/Logger';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';

export class ShoppingFlow {
  constructor(
    private readonly deps: {
      homePage: HomePage;
      cartPage: CartPage;
      checkoutPage: CheckoutPage;
      paymentPage: PaymentPage;
      logger: Logger;
    }
  ) {}

  async addMultipleProducts() {
    const { homePage } = this.deps;
    await homePage.open();
    await homePage.addProduct('add-to-cart-prod-001');
    await homePage.addProduct('add-to-cart-prod-002');
    await homePage.addProduct('add-to-cart-prod-003');
    await homePage.addProduct('add-to-cart-prod-005');
    await homePage.addProduct('add-to-cart-prod-006');
  }

  async addProductsForPayment() {
    const { homePage } = this.deps;
    await homePage.open();
    await homePage.addProduct('add-to-cart-prod-002');
    await homePage.addProduct('add-to-cart-prod-001');
    await homePage.addProduct('add-to-cart-prod-003');
    await homePage.addProduct('add-to-cart-prod-005');
    await homePage.addProduct('add-to-cart-prod-006');
  }

  async removeOneItemAndVerifyCount(count: number) {
    const { cartPage } = this.deps;
    await cartPage.removeProduct('cart-remove-prod-001');
    await cartPage.expectItemCount(count);
  }

  async completePaymentFailureScenario() {
    const { homePage, cartPage, checkoutPage, paymentPage } = this.deps;
    await homePage.open();
    await homePage.addProduct('add-to-cart-prod-002');
    await homePage.addProduct('add-to-cart-prod-001');
    await homePage.addProduct('add-to-cart-prod-003');
    await homePage.addProduct('add-to-cart-prod-005');
    await homePage.addProduct('add-to-cart-prod-006');
    await homePage.openCart();
    await cartPage.removeProduct('cart-remove-prod-002');
    await cartPage.checkout();
    await checkoutPage.fillGuestDetails({
      name: 'Jane',
      email: 'jane@example.com',
      phone: '9008145322',
      street: '123 Main Street',
      city: 'Spring Feild',
      state: 'KS',
      zip: '62701',
    });
    await checkoutPage.continueToPayment();
    await paymentPage.fillPaymentDetails({
      name: 'Jane',
      cardNumber: '4111 1111 1111 1111',
      expiry: '12/281',
      cvv: '234',
    });
    await paymentPage.placeOrder();
    await paymentPage.expectPaymentError('Payment processing error. Please check your card details and try again.');
  }
}
