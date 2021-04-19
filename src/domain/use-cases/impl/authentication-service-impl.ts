import {IAuthenticationRepository} from "@/domain/models/gateways/authentication-repository";
import {IEncrypt} from "@/domain/use-cases/helpers/encrypt";
import {IHashCompare} from "@/domain/use-cases/helpers/hash-compare";
import {ILoadEntityByFieldRepository} from "@/domain/models/gateways/load-entity-by-field-repository";
import {IUpdateAccessTokenRepository} from "@/domain/models/gateways/update-access-token-repository";

export class AuthenticationServiceImpl implements IAuthenticationRepository {
    constructor(
        private readonly encrypt: IEncrypt,
        private readonly hashCompare: IHashCompare,
        private readonly loadUserByEmailRepository: ILoadEntityByFieldRepository,
        private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
    ) {
    }

    async auth(data: IAuthenticationRepository.Params): Promise<IAuthenticationRepository.Result> {
        let isValid: boolean
        const accountExist = await this.loadUserByEmailRepository.loadEntityByFieldRepository(data.email)
        try {
            isValid = await this.hashCompare.compare(data.password, accountExist['password'])
        } catch (e) {
            return null
        }

        if (isValid) {
            const accessToken = await this.encrypt.encrypt(accountExist['id'])
            await this.updateAccessTokenRepository.updateAccessToken(accountExist["id"], accessToken)
            return { accessToken, name: accountExist["name"]}
        }
        return null
    }
}