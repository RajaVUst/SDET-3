import { test } from "../fixtures/baseFixtures";

test.describe("Payment Processing Error Validation", () => {

    test("Verify payment failure and successful retry", async ({ retailMartFlow }) => {

        await retailMartFlow.searchForProduct("quickcharge");

        await retailMartFlow.reachCheckoutPage();

        await retailMartFlow.enterValidCustomerInformation();

        await retailMartFlow.enterCardDetails();

        await retailMartFlow.enterCardDetailsForSuccess("1234567890123456");

        await retailMartFlow.verifyOrderCompleted();

    });

});