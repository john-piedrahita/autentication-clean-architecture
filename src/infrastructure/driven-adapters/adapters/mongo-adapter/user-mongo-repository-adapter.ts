import {UserModel} from "@/domain/models/user-model";
import {IUserMongoInterfacesAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-interfaces-adapter";
import {MongoHelper} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-helper";
import {EMAIL_PARAM, USERS_COLLECTION} from "@/infrastructure/helpers/constant";
import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";

export class UserMongoRepositoryAdapter implements IUserMongoInterfacesAdapter {

    async loadEntityByFieldRepository(field: string): Promise<boolean> {
        return await MongoHelper.loadDocumentByField(field, EMAIL_PARAM, USERS_COLLECTION)
    }

    async addEntityRepository(data: UserModel): Promise<IAddEntityRepository.Result> {
        return await MongoHelper.insertDocumentCollection(data, USERS_COLLECTION)
    }
}