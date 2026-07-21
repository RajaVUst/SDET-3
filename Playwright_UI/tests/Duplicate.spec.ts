import { CartPage } from "../pages/CartPage";
import { test ,expect} from "../fixtures/baseFixtures";
test("Duplicate product quantity validation", async ({ paymentFlow, page }) => {
  const cartPage = new CartPage(page);

  await paymentFlow.HomePageNavigation();
  await paymentFlow.ShopNowNavigation();
  await paymentFlow.LaptopNavigation();

  await paymentFlow.AddToCart();
  await paymentFlow.AddToCart();

  await paymentFlow.OpenCartItem();
  const cartBadge = page.locator('.cart-count');

const initialCount = Number(await cartBadge.textContent());

await page.locator('button:has-text("+")').click();

await expect(cartBadge).toHaveText(String(initialCount + 1));
  await cartPage.verifyCartPage();
  await cartPage.verifySubtotalItemCount(2);
  await cartPage.verifyCartIconCount(2);
});