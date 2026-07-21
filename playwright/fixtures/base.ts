import { test as base, expect } from '@playwright/test';
import { Logger } from '../src/Logger';

type CustomFixtures = {
  logger: Logger;
};

export const test = base.extend<CustomFixtures>({
  logger: async ({}, use) => {
    await use(new Logger('e2e'));
  },
});

export { expect };
