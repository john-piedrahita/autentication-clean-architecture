import {IAddEntityService} from "@/domain/use-cases/add-entity-service";
import {AddUserParams} from "@/domain/models/user-model";
import {IHash} from "@/domain/use-cases/helpers/hash";
import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {ICheckUserByEmailRepository} from "@/domain/models/gateways/check-user-by-email-repository";
import {ILoadGenericByIdRepository} from "@/domain/models/gateways/load-generic-by-id-repository";

export class AddAccountServiceImpl implements IAddEntityService<AddUserParams> {
    constructor(
        private readonly hash: IHash,
        private readonly addAccountRepository: IAddEntityRepository<boolean | AddUserParams>,
        private readonly checkUserByEmailRepository: ICheckUserByEmailRepository,
        private readonly loadRoleByIdRepository: ILoadGenericByIdRepository<any>
    ) {
    }

    async addEntityService(data: AddUserParams, collection: string): Promise<boolean | AddUserParams> {
        let isValid = false

        const userExist = await this.checkUserByEmailRepository.checkUserRepository(data.email)
        const roleExist = await this.loadRoleByIdRepository.loadGenericByIdRepository(data.roles[0].id)

        if (!userExist) {
            const hashPassword = await this.hash.hash(data.password)
            isValid = await this.addAccountRepository.addEntityRepository({ ...data,
                    password: hashPassword,
                    roles: [
                        {
                            id: roleExist.id,
                            name: roleExist.name,
                            permissions: [
                                {
                                    permission: roleExist.permissions[0].permission,
                                    code: roleExist.permissions[0].code
                                }
                            ]
                        }
                    ]
                }, collection
            )
        }
        return isValid
    }
}
