import {IAddEntityService} from "@/domain/use-cases/add-entity-service";
import {RolesUserModel} from "@/domain/models/user-model";
import {AddRolesServiceImpl} from "@/domain/use-cases/impl/add-roles-service-impl";
import {RolesMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/roles-mongo-repository-adapter";

export const makeDbAddRolesFactory = (): IAddEntityService<RolesUserModel> => {
    const rolesMongoRepositoryAdapter = new RolesMongoRepositoryAdapter()

    return new AddRolesServiceImpl(
        rolesMongoRepositoryAdapter,
        rolesMongoRepositoryAdapter
    )
}