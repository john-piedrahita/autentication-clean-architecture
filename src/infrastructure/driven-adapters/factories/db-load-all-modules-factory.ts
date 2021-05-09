import {ILoadAllModulesService} from "@/domain/use-cases/load-all-modules-service";
import {LoadAllModulesServiceImpl} from "@/domain/use-cases/impl/load-all-modules-service-impl";
import {ModulesMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/modules-mongo-repository-adapter";

export const makeDbLoadAllModulesFactory = (): ILoadAllModulesService => {
    const modulesMongoRepositoryAdapter = new ModulesMongoRepositoryAdapter()
    return new LoadAllModulesServiceImpl(modulesMongoRepositoryAdapter)
}
