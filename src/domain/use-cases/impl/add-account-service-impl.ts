import {IAddEntityService} from "@/domain/use-cases/add-entity-service";
import {AddUserParams} from "@/domain/models/user-model";
import {IHash} from "@/domain/use-cases/helpers/hash";
import {ILoadEntityByFieldRepository} from "@/domain/models/gateways/load-entity-by-field-repository";
import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";

export class AddAccountServiceImpl implements IAddEntityService<AddUserParams> {
    constructor(
        private readonly hash: IHash,
        private readonly addAccountRepository: IAddEntityRepository<boolean | AddUserParams>,
        private readonly loadUserByEmailRepository: ILoadEntityByFieldRepository
    ) {
    }

    async addEntityService(data: AddUserParams): Promise<boolean | AddUserParams> {
        const userExist = await this.loadUserByEmailRepository.loadEntityByFieldRepository(data.email)

        let isValid = false

        if (!userExist) {
            const hashPassword = await this.hash.hash(data.password)
            isValid = await this.addAccountRepository.addEntityRepository(
                { ...data, password: hashPassword }
            )
        }
        return isValid
    }
}