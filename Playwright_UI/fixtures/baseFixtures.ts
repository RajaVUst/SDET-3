import { test as base } from "@playwright/test";
import { Evidence } from "../utils/Evidence";
import { PaymentFlow } from "../flows/PaymentFlow";

type Fixtures = {
  paymentFlow:PaymentFlow;
};

export const test = base.extend<Fixtures>({
  paymentFlow: async ({ page }, use) => {
    await use(new PaymentFlow(page));
  },
});
test.afterEach(async ({ page }, testInfo) => {

  if (testInfo.status !== testInfo.expectedStatus) {

    await Evidence.captureScreenshot(
      page,
      testInfo.title,
      "failure"
    );

  }

});

export { expect } from "@playwright/test";