import {ILoadGenericByIdService} from "@/domain/use-cases/load-generic-by-id-service";
import {UserModel} from "@/domain/models/user-model";
import {LoadUserByIdServiceImpl} from "@/domain/use-cases/impl/load-user-by-id-service-impl";
import {UserMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-repository-adapter";

export const makeDbLoadUserByIdFactory = (): ILoadGenericByIdService<UserModel> => {
    const userMongoRepositoryAdapter = new UserMongoRepositoryAdapter()
    return new LoadUserByIdServiceImpl(userMongoRepositoryAdapter)
}
