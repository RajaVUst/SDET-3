import dotenv from 'dotenv';

dotenv.config();

type PaymentCard = { name: string; number: string; expiry: string; cvv: string };

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const env = {
  baseUrl(): string {
    return required('RETAILMART_BASE_URL');
  },

  paymentCard(): PaymentCard {
    return {
      name: required('RETAILMART_PAYMENT_CARDHOLDER'),
      number: required('RETAILMART_PAYMENT_CARD_NUMBER'),
      expiry: required('RETAILMART_PAYMENT_CARD_EXPIRY'),
      cvv: required('RETAILMART_PAYMENT_CARD_CVV'),
    };
  },


  required,
};
