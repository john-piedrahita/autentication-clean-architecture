import {IAuthenticationRepository} from "@/domain/models/gateways/authentication-repository";
import {AuthenticationServiceImpl} from "@/domain/use-cases/impl/authentication-service-impl";
import {BcryptAdapter} from "@/infrastructure/driven-adapters/helpers/bcrypt-adapter";
import {JwtAdapter} from "@/infrastructure/driven-adapters/helpers/jwt-adapter";
import {SESSION_SECRET} from "@/application/config/environment";
import {UserMongoRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-repository-adapter";

export const makeAuthenticationFactory = (): IAuthenticationRepository => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(SESSION_SECRET)
    const userMongoRepositoryAdapter = new UserMongoRepositoryAdapter()

    return new AuthenticationServiceImpl(
        jwtAdapter,
        bcryptAdapter,
        userMongoRepositoryAdapter,
        userMongoRepositoryAdapter
    )
}