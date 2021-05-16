import {IAuthenticationRepository} from "@/domain/models/gateways/authentication-repository";
import {IEncrypt} from "@/domain/use-cases/helpers/encrypt";
import {IHashCompare} from "@/domain/use-cases/helpers/hash-compare";
import {IUpdateGenericRepository} from "@/domain/models/gateways/update-generic-repository";
import {ILoadGenericByFieldRepository} from "@/domain/models/gateways/load-generic-by-field-repository";
import {ACCESS_TOKEN, EMAIL_PARAM} from "@/domain/use-cases/helpers/constants";
import {UserModel} from "@/domain/models/user-model";


export class AuthenticationServiceImpl implements IAuthenticationRepository {
    constructor(
        private readonly encrypt: IEncrypt,
        private readonly hashCompare: IHashCompare,
        private readonly loadGenericByFieldRepository: ILoadGenericByFieldRepository<UserModel>,
        private readonly updateAccessTokenRepository: IUpdateGenericRepository<UserModel>
    ) {
    }

    async auth(data: IAuthenticationRepository.Params): Promise<IAuthenticationRepository.Result> {
        const account = await this.loadGenericByFieldRepository.loadGenericByFieldRepository(EMAIL_PARAM, data.email)
        if (account) {
           const isValid = await this.hashCompare.compare(data.password, account.password)
            if (isValid) {
                const accessToken = await this.encrypt.encrypt(account.id)
                await this.updateAccessTokenRepository.updateGenericRepository(account.id, accessToken, ACCESS_TOKEN)
                return {
                    accessToken,
                    name: account.fullName
                }
            }
        }
        return null
    }
}
