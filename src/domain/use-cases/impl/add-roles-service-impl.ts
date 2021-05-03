import {IAddEntityService} from "@/domain/use-cases/add-entity-service";
import {RolesUserModel} from "@/domain/models/user-model";
import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {ILoadGenericByFieldRepository} from "@/domain/models/gateways/load-generic-by-field-repository";
import {NAME_PARAM} from "@/domain/use-cases/helpers/constants";

export class AddRolesServiceImpl implements IAddEntityService<RolesUserModel> {
    constructor(
        private readonly addRolesRepository: IAddEntityRepository<RolesUserModel>,
        private readonly loadRoleByNameRepository: ILoadGenericByFieldRepository<any>
    ) {
    }

    async addEntityService(data: RolesUserModel): Promise<boolean | RolesUserModel> {

        const roleExist = await this.loadRoleByNameRepository.loadGenericByFieldRepository(NAME_PARAM, data.name)

        if (roleExist) {
            for (const role of roleExist.permissions) {
                for (const permission of data.permissions) {
                    if (permission.code === role.code ||
                        permission.permission === role.permission) {
                        return false
                    }
                }
            }
        }

        await this.addRolesRepository.addEntityRepository(data)
    }
}