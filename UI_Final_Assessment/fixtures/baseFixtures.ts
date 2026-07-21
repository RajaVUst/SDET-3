import { test as base, expect } from "@playwright/test";
import { RetailMartFlow } from "../flows/RetailMartFlow";

type MyFixtures = {
    retailMartFlow: RetailMartFlow;
};

export const test = base.extend<MyFixtures>({
    retailMartFlow: async ({ page }, use) => {
        const retailMartFlow = new RetailMartFlow(page);
        await use(retailMartFlow);
    }
});

export { expect };