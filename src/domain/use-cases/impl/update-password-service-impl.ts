import {IUpdatePasswordService} from "@/domain/use-cases/update-password-service";
import {ILoadGenericByFieldRepository} from "@/domain/models/gateways/load-generic-by-field-repository";
import {IHashCompare} from "@/domain/use-cases/helpers/hash-compare";
import {IUpdateGenericRepository} from "@/domain/models/gateways/update-generic-repository";
import {IHash} from "@/domain/use-cases/helpers/hash";
import {LINK_RESET_TOKEN, PASSWORD_PARAM} from "@/domain/use-cases/helpers/constants";

export class UpdatePasswordServiceImpl implements IUpdatePasswordService {

    constructor(
        private readonly hash: IHash,
        private readonly hashCompare: IHashCompare,
        private readonly updatePasswordRepository: IUpdateGenericRepository,
        private readonly loadGenericByFieldRepository: ILoadGenericByFieldRepository,
    ) {
    }

    async updatePasswordService(data: string, token: string): Promise<void> {
        const userExist = await this.loadGenericByFieldRepository.loadGenericByFieldRepository(LINK_RESET_TOKEN, token)

        if (!userExist) return null

        if (userExist) {
            // const isValid = await this.hashCompare.compare(token, userExist.linkReset)
            const isValid = token === userExist.linkReset
            console.log(isValid)
            if (isValid) {
                console.log(isValid)
                const hashPassword = await this.hash.hash(data)
                await this.updatePasswordRepository.updateGenericRepository(userExist.id, hashPassword, PASSWORD_PARAM)
            }
        }

    }

}