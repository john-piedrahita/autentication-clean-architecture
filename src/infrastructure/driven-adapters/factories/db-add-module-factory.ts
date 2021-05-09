import {IAddEntityService} from "@/domain/use-cases/add-entity-service";
import {ModulesPermissionsModel} from "@/domain/models/user-model";
import {AddModuleServiceImpl} from "@/domain/use-cases/impl/add-module-service-impl";
import {ModulesMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/modules-mongo-repository-adapter";

export const makeDbAddModuleFactory = (): IAddEntityService<ModulesPermissionsModel> => {
    const rolesMongoRepositoryAdapter = new ModulesMongoRepositoryAdapter()

    return new AddModuleServiceImpl(
        rolesMongoRepositoryAdapter,
        rolesMongoRepositoryAdapter
    )
}
