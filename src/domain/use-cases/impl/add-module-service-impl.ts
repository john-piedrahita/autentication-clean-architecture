import {IAddEntityService} from "@/domain/use-cases/add-entity-service";
import {ModulesPermissionsModel} from "@/domain/models/user-model";
import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {ILoadGenericByFieldRepository} from "@/domain/models/gateways/load-generic-by-field-repository";
import {MODULE_PARAM} from "@/domain/use-cases/helpers/constants";

export class AddModuleServiceImpl implements IAddEntityService<ModulesPermissionsModel> {
    constructor(
        private readonly addRolesRepository: IAddEntityRepository<ModulesPermissionsModel>,
        private readonly loadRoleByNameRepository: ILoadGenericByFieldRepository<any>
    ) {
    }

    async addEntityService(data: ModulesPermissionsModel): Promise<boolean | ModulesPermissionsModel> {
        const roleExist = await this.loadRoleByNameRepository.loadGenericByFieldRepository(MODULE_PARAM, data.module)

        if (roleExist?.module === data.module) return false

        return await this.addRolesRepository.addEntityRepository(data)
    }
}
