import dotenv from "dotenv"
import fs from "fs"

if (fs.existsSync(".env")) {
    dotenv.config({ path: ".env" })
} else {
    dotenv.config({ path: ".env.example" })
}

export const ENVIRONMENT = process.env.NODE_ENV;
const PROD = ENVIRONMENT === "production"

export const SESSION_SECRET = process.env.JWT_SECRET
export const PORT = process.env.PORT
export const MONGODB_URI = PROD
    ? process.env.MONGO_PRODUCTION
    : process.env.MONGO_DEVELOPMENT

if (!SESSION_SECRET) process.exit(1)

if (!MONGODB_URI) {
    if (PROD) {
        console.log("No mongo connection string. Set MONGODB_URI environment variable.");
    } else {
        console.log("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    }
    process.exit(1);
}

export const MAIL_HOST = process.env.MAIL_HOST
export const MAIL_PORT = process.env.MAIL_PORT
export const MAIL_USERNAME = process.env.MAIL_USERNAME
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD

export const MAIL_FROM = process.env.MAIL_FROM
export const MAIL_SUBJECT = process.env.MAIL_SUBJECT

