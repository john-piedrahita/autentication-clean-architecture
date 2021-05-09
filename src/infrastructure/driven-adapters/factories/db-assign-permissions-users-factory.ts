import {IAssignPermissionsUsersService} from "@/domain/use-cases/assign-permissions-users-service";
import {AssignPermissionsUsersServiceImpl} from "@/domain/use-cases/impl/assign-permissions-users-service-impl";
import {UserMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-repository-adapter";
import {ModulesMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/modules-mongo-repository-adapter";

export const makeDbAssignPermissionsUserFactory = (): IAssignPermissionsUsersService => {
    const userMongoRepositoryAdapter = new UserMongoRepositoryAdapter()
    const roleMongoRepositoryAdapter = new ModulesMongoRepositoryAdapter()

    return new AssignPermissionsUsersServiceImpl(
        userMongoRepositoryAdapter,
        userMongoRepositoryAdapter,
        roleMongoRepositoryAdapter,
        userMongoRepositoryAdapter,
    )
}
