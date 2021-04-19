import {UserModel} from "@/domain/models/user-model";
import {IUserMongoInterfacesAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-interfaces-adapter";
import {MongoHelper} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-helper";
import {EMAIL_PARAM, USERS_COLLECTION} from "@/infrastructure/helpers/constant";
import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {ILoadAccountByEmailRepository} from "@/domain/models/gateways/load-account-by-email-repository";
import {ILoadAccountByTokenRepository} from "@/domain/models/gateways/load-account-by-token-repository";

export class UserMongoRepositoryAdapter implements IUserMongoInterfacesAdapter {

    async addEntityRepository(data: UserModel): Promise<IAddEntityRepository.Result> {
        return await MongoHelper.insertDocumentCollection(data, USERS_COLLECTION)
    }

    async checkUserRepository(field: string): Promise<boolean> {
        return await MongoHelper.loadDocumentByField(field, EMAIL_PARAM, USERS_COLLECTION)
    }

    async loadAccountByEmailRepository(field: string): Promise<ILoadAccountByEmailRepository.Result> {
        return await MongoHelper.loadDocumentByField(field, EMAIL_PARAM, USERS_COLLECTION)
    }

    async loadAccountByTokenRepository(accessToken: string): Promise<ILoadAccountByTokenRepository.Result> {
        return await MongoHelper.loadDocumentByField(accessToken, "accessToken", USERS_COLLECTION)
    }

    async updateAccessToken(id: string, token: string): Promise<void> {
        const accountCollection = await MongoHelper.getCollection('users')
        await accountCollection.updateOne({
            _id: id
        }, {
            $set: {
                accessToken: token
            }
        })

    }
}