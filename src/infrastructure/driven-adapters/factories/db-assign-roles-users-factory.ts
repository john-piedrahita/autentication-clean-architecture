import {IAssignRolesToUsersService} from "@/domain/use-cases/assign-roles-to-users-service";
import {AssignRolesToUsersServiceImpl} from "@/domain/use-cases/impl/assign-roles-to-users-service-impl";
import {UserMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-repository-adapter";
import {RolesMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/roles-mongo-repository-adapter";

export const makeDbAssignRolesUserFactory = (): IAssignRolesToUsersService => {
    const userMongoRepositoryAdapter = new UserMongoRepositoryAdapter()
    const roleMongoRepositoryAdapter = new RolesMongoRepositoryAdapter()

    return new AssignRolesToUsersServiceImpl(
        userMongoRepositoryAdapter,
        userMongoRepositoryAdapter,
        roleMongoRepositoryAdapter,
        userMongoRepositoryAdapter,
    )
}
