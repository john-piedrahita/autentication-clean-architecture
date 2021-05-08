import {ILoadAccountTokenService} from "@/domain/use-cases/load-account-token-service";
import {LoadAccountTokenServiceImpl} from "@/domain/use-cases/impl/load-account-token-service-impl";
import {JwtAdapter} from "@/infrastructure/driven-adapters/helpers/jwt-adapter";
import {UserMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-repository-adapter";
import {SESSION_SECRET} from "@/application/config/environment";

export const makeDbLoadAccountTokenFactory = (): ILoadAccountTokenService => {
    const jwtAdapter = new JwtAdapter(SESSION_SECRET)
    const userMongoRepositoryAdapter = new UserMongoRepositoryAdapter()

    return new LoadAccountTokenServiceImpl(
        jwtAdapter,
        userMongoRepositoryAdapter
    )
}
