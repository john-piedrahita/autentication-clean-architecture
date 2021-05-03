import {IMongoInterfacesAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-interfaces-adapter";
import {RolesUserModel} from "@/domain/models/user-model";
import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {MongoHelper} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-helper";
import {ROLES_COLLECTION} from "@/infrastructure/helpers/constant";

export class RolesMongoRepositoryAdapter implements IMongoInterfacesAdapter<RolesUserModel> {

    async addEntityRepository(data: RolesUserModel): Promise<IAddEntityRepository.Result> {
        return await MongoHelper.insertDocumentCollection(data, ROLES_COLLECTION)
    }

    async loadGenericByFieldRepository(field: string, value: string): Promise<RolesUserModel> {
        return await MongoHelper.loadDocumentByFieldCollection(field, value, ROLES_COLLECTION)
    }

    async loadGenericByIdRepository(id: string | number): Promise<RolesUserModel> {
        return await MongoHelper.loadDocumentByIdCollection(id, ROLES_COLLECTION)
    }

}
