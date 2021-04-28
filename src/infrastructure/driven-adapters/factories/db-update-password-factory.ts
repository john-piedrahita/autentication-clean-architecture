import {IUpdatePasswordService} from "@/domain/use-cases/update-password-service";
import {UpdatePasswordServiceImpl} from "@/domain/use-cases/impl/update-password-service-impl";
import {BcryptAdapter} from "@/infrastructure/driven-adapters/helpers/bcrypt-adapter";
import {UserMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-repository-adapter";

export const makeDbUpdatePassword = (): IUpdatePasswordService => {

    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const userMongoRepositoryAdapter = new UserMongoRepositoryAdapter()

    return new UpdatePasswordServiceImpl(
        bcryptAdapter,
        bcryptAdapter,
        userMongoRepositoryAdapter,
        userMongoRepositoryAdapter
    )
}