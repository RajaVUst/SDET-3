import { test } from "../fixtures/baseFixtures";

test.describe("Free Shipping Threshold Validation", () => {

    test("Verify free shipping threshold", async ({ retailMartFlow }) => {

        await retailMartFlow.searchForProduct("quickcharge");

        await retailMartFlow.verifyFreeShippingThreshold();

    });

});