import dotenv from "dotenv";

dotenv.config();

export const Environment = {
    BASE_URL: process.env.BASE_URL!,

    CARD_HOLDER_NAME: process.env.CARD_HOLDER_NAME!,
    CARD_NUMBER: process.env.CARD_NUMBER!,
    CARD_EXPIRY: process.env.CARD_EXPIRY!,
    CARD_CVV: process.env.CARD_CVV!
};