import { PaymentPage } from './../pages/PaymentPage';
import { test ,expect} from "../fixtures/baseFixtures";
import { Evidence } from '../utils/Evidence';


test("Payment failure Validation", async ({ paymentFlow, page }) => {
  const paymentPage = new PaymentPage(page);
  await paymentFlow.HomePageNavigation();
  await paymentFlow.ShopNowNavigation();
  await paymentFlow.ProductNavigation();
  await paymentFlow.AddToCart();
  await paymentFlow.OpenCartItem();
  await paymentFlow.Checkout();
  await paymentFlow.EnterCustomerInformation();
  await paymentFlow.Payment();
  // await paymentPage.verifyShippingDetailsRetained();values are not retaining after payment failure
  await Evidence.captureScreenshot(page, "PaymentFailure");
});


