import {IAddEntityService} from "@/domain/use-cases/add-entity-service";
import {AddUserParams} from "@/domain/models/user-model";
import {IHash} from "@/domain/use-cases/helpers/hash";
import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {ICheckUserByEmailRepository} from "@/domain/models/gateways/check-user-by-email-repository";

export class AddAccountServiceImpl implements IAddEntityService<AddUserParams> {
    constructor(
        private readonly hash: IHash,
        private readonly addAccountRepository: IAddEntityRepository<boolean | AddUserParams>,
        private readonly checkUserByEmailRepository: ICheckUserByEmailRepository,
    ) {
    }

    async addEntityService(data: AddUserParams, collection: string): Promise<boolean | AddUserParams> {
        let isValid = false

        const userExist = await this.checkUserByEmailRepository.checkUserRepository(data.email)

        if (!userExist) {
            const hashPassword = await this.hash.hash(data.password)
            isValid = await this.addAccountRepository.addEntityRepository({ ...data, password: hashPassword, permissions: [] }, collection)
        }
        return isValid
    }
}
