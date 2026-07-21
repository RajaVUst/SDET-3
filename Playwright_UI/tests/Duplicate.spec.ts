import { CartPage } from "../pages/CartPage";
import { test } from "../fixtures/baseFixtures";

test("Duplicate product quantity validation", async ({ paymentFlow, page }) => {
  const cartPage = new CartPage(page);

  await paymentFlow.HomePageNavigation();
  await paymentFlow.ShopNowNavigation();
  await paymentFlow.LaptopNavigation();

  await paymentFlow.AddToCart();
  await paymentFlow.AddToCart();

  await paymentFlow.OpenCartItem();

  await cartPage.verifyCartPage();
  await cartPage.verifyCartIconCount(3);
  await cartPage.verifySubtotalItemCount(3);
});