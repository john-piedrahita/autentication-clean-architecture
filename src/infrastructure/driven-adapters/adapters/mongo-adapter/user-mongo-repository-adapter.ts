import {IUserMongoInterfacesAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-interfaces-adapter";
import {AddUserParams, UserModel} from "@/domain/models/user-model";
import {MongoHelper} from "@/infrastructure/driven-adapters/helpers/mongo-helper";
import {EMAIL_PARAM, USERS_COLLECTION} from "@/infrastructure/helpers/constant";

export class UserMongoRepositoryAdapter implements IUserMongoInterfacesAdapter {
    async addEntityRepository(data: AddUserParams): Promise<UserModel> {
        return await MongoHelper.insertDocumentCollection(data, USERS_COLLECTION)
    }

    async loadEntityByFieldRepository(field: string): Promise<boolean> {
        return await MongoHelper.loadDocumentByField(field, EMAIL_PARAM, USERS_COLLECTION)
    }
}