import {IAuthenticationRepository} from "@/domain/models/gateways/authentication-repository";
import {IEncrypt} from "@/domain/use-cases/helpers/encrypt";
import {IHashCompare} from "@/domain/use-cases/helpers/hash-compare";
import {IUpdateAccessTokenRepository} from "@/domain/models/gateways/update-access-token-repository";
import {ILoadAccountByEmailRepository} from "@/domain/models/gateways/load-account-by-email-repository";

export class AuthenticationServiceImpl implements IAuthenticationRepository {
    constructor(
        private readonly encrypt: IEncrypt,
        private readonly hashCompare: IHashCompare,
        private readonly loadUserByEmailRepository: ILoadAccountByEmailRepository,
        private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
    ) {
    }

    async auth(data: IAuthenticationRepository.Params): Promise<IAuthenticationRepository.Result> {
        const account = await this.loadUserByEmailRepository.loadAccountByEmailRepository(data.email)
        if (account) {
           const isValid = await this.hashCompare.compare(data.password, account.password)
            if (isValid) {
                const accessToken = await this.encrypt.encrypt(account.id)
                await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
                return {
                    accessToken,
                    name: account.name
                }
            }
        }
        return null
    }
}