import {DeleteModulesServiceImpl} from "@/domain/use-cases/impl/delete-modules-service-impl";
import {ModulesMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/modules-mongo-repository-adapter";
import {IDeleteModuleService} from "@/domain/use-cases/delete-module-service";

export const makeDbDeleteModuleFactory = (): IDeleteModuleService => {
    const moduleMongoRepositoryAdapter = new ModulesMongoRepositoryAdapter()

    return new DeleteModulesServiceImpl(
        moduleMongoRepositoryAdapter,
        moduleMongoRepositoryAdapter
    )
}
