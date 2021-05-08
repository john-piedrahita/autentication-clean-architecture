import {IDecrypt} from "@/domain/use-cases/helpers/decrypt";
import {ILoadAccountTokenService} from "@/domain/use-cases/load-account-token-service";
import {ILoadAccountTokenRepository} from "@/domain/models/gateways/load-account-token-repository";

export class LoadAccountTokenServiceImpl implements ILoadAccountTokenService {

    constructor(
        private readonly decrypt: IDecrypt,
        private readonly loadAccountTokenRepository: ILoadAccountTokenRepository
    ) {
    }

    async loadTokenService(token: string): Promise<ILoadAccountTokenService.Result> {
        let accessToken: string

        try {
            accessToken = await this.decrypt.decrypt(token)
        } catch (e) {
            return null
        }

        if (accessToken) {
            const account = await this.loadAccountTokenRepository.loadTokenRepository(accessToken['account'])
            if (account) return account
        }

        return null
    }

}
