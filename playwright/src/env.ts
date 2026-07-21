import * as fs from 'fs';
import * as path from 'path';

const envPath = path.resolve(process.cwd(), '.env');

function loadEnvFile() {
  if (!fs.existsSync(envPath)) {
    return;
  }

  for (const rawLine of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const separatorIndex = line.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

export const env = {
  baseUrl: process.env.BASE_URL || 'https://chess-agent-83252463.figma.site/',
  products: (process.env.PRODUCTS || 'add-to-cart-prod-001,add-to-cart-prod-002,add-to-cart-prod-003,add-to-cart-prod-005,add-to-cart-prod-006').split(',').map((item) => item.trim()).filter(Boolean),
  cartItemToRemoveAfterAdd: process.env.CART_ITEM_TO_REMOVE_AFTER_ADD || 'cart-remove-prod-001',
  cartItemToRemoveBeforeCheckout: process.env.CART_ITEM_TO_REMOVE_BEFORE_CHECKOUT || 'cart-remove-prod-002',
  expectedCartCountAfterAdd: Number(process.env.EXPECTED_CART_COUNT_AFTER_ADD || '5'),
  expectedCartCountAfterRemoval: Number(process.env.EXPECTED_CART_COUNT_AFTER_REMOVAL || '4'),
  guestName: process.env.GUEST_NAME || 'Jane',
  guestEmail: process.env.GUEST_EMAIL || 'jane@example.com',
  guestPhone: process.env.GUEST_PHONE || '9008145322',
  shippingStreet: process.env.SHIPPING_STREET || '123 Main Street',
  shippingCity: process.env.SHIPPING_CITY || 'Spring Feild',
  shippingState: process.env.SHIPPING_STATE || 'KS',
  shippingZip: process.env.SHIPPING_ZIP || '62701',
  cardName: process.env.CARD_NAME || 'Jane',
  cardNumber: process.env.CARD_NUMBER || '4111 1111 1111 1111',
  cardExpiry: process.env.CARD_EXPIRY || '12/281',
  cardCvv: process.env.CARD_CVV || '234',
  paymentErrorMessage: process.env.PAYMENT_ERROR_MESSAGE || 'Payment processing error. Please check your card details and try again.',
};
