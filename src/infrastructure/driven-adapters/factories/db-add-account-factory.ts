import {IAddEntityService} from "@/domain/use-cases/add-entity-service";
import {AddUserParams} from "@/domain/models/user-model";
import {AddAccountServiceImpl} from "@/domain/use-cases/impl/add-account-service-impl";
import {BcryptAdapter} from "@/infrastructure/driven-adapters/helpers/bcrypt-adapter";
import {UserMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-repository-adapter";

export const makeDbAddAccountFactory = (): IAddEntityService<AddUserParams> => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const userMongoRepositoryAdapter = new UserMongoRepositoryAdapter()

    return new AddAccountServiceImpl(
        bcryptAdapter,
        userMongoRepositoryAdapter,
        userMongoRepositoryAdapter,
    )
}
