import dotenv from "dotenv"
import fs from "fs"

if (fs.existsSync(".env")) {
    console.log("entro al enviroment")
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

