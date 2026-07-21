import { Environment } from "../config/Environment";

export const PaymentData = {
    customer: {
        cardHolderName: Environment.CARD_HOLDER_NAME,
        cardNumber: Environment.CARD_NUMBER,
        expiry: Environment.CARD_EXPIRY,
        cvv: Environment.CARD_CVV
    }
};