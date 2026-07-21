import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

function getEnvValue(key: string, fallback = ''): string {
  const raw = process.env[key] ?? fallback;
  return raw.replace(/^"(.*)"$/, '$1');
}

type DemoFixtures = {
  demoUserName: string;
  demoUserEmail: string;
  cardHolderName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

export const test = base.extend<DemoFixtures>({
  demoUserName: [getEnvValue('DEMO_USER_NAME'), { option: true }],
  demoUserEmail: [getEnvValue('DEMO_USER_EMAIL'), { option: true }],
  cardHolderName: [getEnvValue('CARDHOLDER_NAME'), { option: true }],
  cardNumber: [getEnvValue('CARD_NUMBER'), { option: true }],
  expiry: [getEnvValue('EXPIRY'), { option: true }],
  cvv: [getEnvValue('CVV'), { option: true }],
});

export { expect };
