import { expect, test } from '../fixtures/retailmart.fixture';
import { cartScenario, guestCheckoutData } from '../test-data/retailmart.data';
import { env } from '../utils/Env';
import { Logger } from '../utils/logger';

test.describe('RetailMart cart and payment journeys', () => {
  test('Scenario 1: adds multiple products and validates the cart', async ({ retailMart }) => {
    const { homePage, cartPage } = retailMart;
    Logger.info('Starting Scenario 1: adds multiple products and validates the cart');
    
    Logger.info(`Opening home page with URL: ${env.baseUrl()}`);
    await homePage.open(env.baseUrl());
    
    const selectedProducts = [];
    for (const searchTerm of cartScenario.searchTerms) {
      Logger.info(`Searching and adding product: ${searchTerm}`);
      selectedProducts.push(await homePage.searchAndAddProduct(searchTerm));
    }
    Logger.info(`Successfully added ${selectedProducts.length} products to cart`);

    Logger.info('Opening cart page');
    await cartPage.open();
    
    Logger.info('Validating products in cart');
    await cartPage.validateProducts(selectedProducts);
    Logger.info('Scenario 1 completed successfully');
  });

  test('Scenario 2: validates payment failure', async ({ retailMart }) => {
    const { homePage, cartPage, checkoutPage, paymentPage } = retailMart;
    Logger.info('Starting Scenario 2: validates payment failure');
    
    Logger.info(`Opening home page with URL: ${env.baseUrl()}`);
    await homePage.open(env.baseUrl());
    
    Logger.info('Searching and adding Laptop product');
    await homePage.searchAndAddProduct('Laptop');
    
    Logger.info('Opening cart page');
    await cartPage.open();
    
    Logger.info('Proceeding to checkout');
    await cartPage.proceedToCheckout();
    
    Logger.info('Completing guest checkout');
    await checkoutPage.completeGuestCheckout(guestCheckoutData);
    
    Logger.info('Submitting payment failure scenario');
    await paymentPage.submitFailureScenario(env.paymentCard());
    
    Logger.info('Validating payment failure');
    await paymentPage.validateFailure(guestCheckoutData.shippingAddress);
    Logger.info('Scenario 2 completed successfully');
  });
});
