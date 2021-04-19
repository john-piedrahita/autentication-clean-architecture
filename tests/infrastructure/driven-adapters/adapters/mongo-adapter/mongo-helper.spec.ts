import fs from "fs";
import dotenv from "dotenv";
import {MongoHelper} from "@/infrastructure/driven-adapters/helpers/mongo-helper";

if (fs.existsSync(".env")) dotenv.config({ path: ".env" });

describe("Mongo helper", () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_DEVELOPMENT)
    })

    afterAll( async () => {
        await MongoHelper.disconnect()
    })

    it('should reconnect if mongo is down', async function () {
        let userCollection = await MongoHelper.getCollection("users")
        expect(userCollection).toBeTruthy()
        await MongoHelper.disconnect()
        userCollection = await MongoHelper.getCollection("users")
        expect(userCollection).toBeTruthy()
    });
})