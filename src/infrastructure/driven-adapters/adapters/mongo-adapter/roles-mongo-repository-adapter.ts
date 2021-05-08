import {IMongoInterfacesAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-interfaces-adapter";
import {ModulesPermissionsModel} from "@/domain/models/user-model";
import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {MongoHelper} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-helper";
import {MODULES_COLLECTION} from "@/infrastructure/helpers/constant";

export class RolesMongoRepositoryAdapter implements IMongoInterfacesAdapter<ModulesPermissionsModel> {

    async addEntityRepository(data: ModulesPermissionsModel): Promise<IAddEntityRepository.Result> {
        return await MongoHelper.insertDocumentCollection(data, MODULES_COLLECTION)
    }

    async loadGenericByFieldRepository(field: string, value: string): Promise<ModulesPermissionsModel> {
        return await MongoHelper.loadDocumentByFieldCollection(field, value, MODULES_COLLECTION)
    }

    async loadGenericByIdRepository(id: string | number): Promise<ModulesPermissionsModel> {
        return await MongoHelper.loadDocumentByIdCollection(id, MODULES_COLLECTION)
    }

}
