import {IAddEntityService} from "@/domain/use-cases/add-entity-service";
import {UserModel} from "@/domain/models/user-model";
import {IHash} from "@/domain/use-cases/helpers/hash";
import {ILoadEntityByFieldRepository} from "@/domain/models/gateways/load-entity-by-field-repository";
import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";

export class AddAccountServiceImpl implements IAddEntityService<UserModel> {
    constructor(
        private readonly hash: IHash,
        private readonly addAccountRepository: IAddEntityRepository<UserModel>,
        private readonly loadUserByEmailRepository: ILoadEntityByFieldRepository
    ) {
    }

    async addEntityService(data: UserModel): Promise<UserModel | boolean> {

        const userExist = await this.loadUserByEmailRepository.loadEntityByFieldRepository(data.email)

        if (userExist) return false

        if (!userExist) {
            const hashPassword = await this.hash.hash(data.password)
            const account = await this.addAccountRepository.addEntityRepository(
                { ...data, password: hashPassword }
            )
            if (account) return account
        }

        return null
    }
}