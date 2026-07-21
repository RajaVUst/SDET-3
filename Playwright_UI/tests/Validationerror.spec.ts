import { PaymentPage } from './../pages/PaymentPage';
import { test ,expect} from "../fixtures/baseFixtures";
import { Evidence } from "../utils/evidence";

test("Payment failure Validation", async ({ paymentFlow, page }) => {
  await paymentFlow.HomePageNavigation();
  await paymentFlow.ShopNowNavigation();
  await paymentFlow.ProductNavigation();
  await paymentFlow.AddToCart();
  await paymentFlow.OpenCartItem();
  await paymentFlow.Checkout();
  await paymentFlow.EnterCustomerInformation();
  await paymentFlow.Payment();
//  await this.paymentPage.verifyShippingDetailsRetained();c
  await Evidence.captureScreenshot(page, "PaymentFailure");
});


