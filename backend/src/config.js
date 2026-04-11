import { config } from "dotenv";

config({
    path: ".env",
});

const PORT = process.env.PORT;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const DB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

export {
    PORT,
    CORS_ORIGIN,
    DB_URI,
    DB_NAME,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    GMAIL_USER,
    GMAIL_APP_PASSWORD,
};
