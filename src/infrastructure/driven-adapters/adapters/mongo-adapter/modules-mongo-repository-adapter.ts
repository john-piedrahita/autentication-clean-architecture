import {IMongoInterfacesAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-interfaces-adapter";
import {ModulesPermissionsModel} from "@/domain/models/user-model";
import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {MongoHelper} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-helper";
import {MODULES_COLLECTION} from "@/infrastructure/helpers/constant";

export class ModulesMongoRepositoryAdapter implements IMongoInterfacesAdapter<ModulesPermissionsModel> {

    async addEntityRepository(data: ModulesPermissionsModel): Promise<IAddEntityRepository.Result> {
        return await MongoHelper.insertDocumentCollection(data, MODULES_COLLECTION)
    }

    async loadGenericByFieldRepository(field: string, value: string): Promise<ModulesPermissionsModel> {
        return await MongoHelper.loadDocumentByFieldCollection(field, value, MODULES_COLLECTION)
    }

    async loadGenericByIdRepository(id: string | number): Promise<ModulesPermissionsModel> {
        return await MongoHelper.loadDocumentByIdCollection(id, MODULES_COLLECTION)
    }

    async loadAllRepository(): Promise<ModulesPermissionsModel> {
        return await MongoHelper.getAllDocumentsCollection(MODULES_COLLECTION)
    }

    async updateGenericRepository(id: string, value: string | any, field: string | undefined): Promise<void> {
        return await MongoHelper.updateDocumentCollection(id, value,field, MODULES_COLLECTION)
    }

    async deleteModuleRepository(id: string): Promise<void> {
        return await MongoHelper.deleteDocumentCollection(id, MODULES_COLLECTION)
    }

}
