import fs from "fs";
import dotenv from "dotenv";
import {Collection} from "mongodb";
import {MongoHelper} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-helper";
import {UserMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-repository-adapter";
import {mockAddUserParams} from "@/tests/domain/mocks/mock-user-params";
import faker from "faker";
import {mockUserModel} from "@/tests/domain/mocks/mock-user-model";
import useFakeTimers = jest.useFakeTimers;

if (fs.existsSync(".env")) dotenv.config({path: ".env"});

const makeStub = (): UserMongoRepositoryAdapter => {
    return new UserMongoRepositoryAdapter()
}

let accountCollection: Collection

describe("User mongo repository adapter", () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_DEVELOPMENT)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        accountCollection = await MongoHelper.getCollection("users")
        await accountCollection.deleteMany({})
    })

    it('should return an account success', async function () {
        const sut = makeStub()
        const addAccountParams = mockUserModel()
        const isValid = await sut.addEntityRepository(addAccountParams)
        expect(isValid).toBeTruthy()
    })

    it('should return an user when email exist', async function () {
        const sut = makeStub()
        const addUserParams = mockAddUserParams()
        await accountCollection.insertOne(addUserParams)
        const user = await sut.checkUserRepository(addUserParams.email)
        expect(user).toBeTruthy()
    });

    it('should return false if check by email exist', async function () {
        const sut = makeStub()
        const user = await sut.checkUserRepository(faker.internet.email())
        expect(user).toBeFalsy()
    });

    it('should update the account accessToken on success', async function () {
        const sut = makeStub()
        const result = await accountCollection.insertOne(mockAddUserParams())
        const fakeAccount = result.ops[0]
        expect(fakeAccount.accessToken).toBeFalsy()
        const accessToken = faker.datatype.uuid()
        await sut.updateGenericRepository(fakeAccount._id, accessToken, "accessToken")
        const account = await accountCollection.findOne({_id: fakeAccount._id})
        expect(account).toBeTruthy()
        expect(account.accessToken).toBe(accessToken)
    });

    it('should return an account on load by email', async function () {
        const sut = makeStub()
        const result = await accountCollection.insertOne(mockAddUserParams())
        const { email } = result.ops[0]
        const account = await sut.checkUserRepository(email)
        expect(account).toBeTruthy()
    });
})