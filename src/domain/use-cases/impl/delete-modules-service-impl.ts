import {ModulesPermissionsModel} from "@/domain/models/user-model";
import {ILoadGenericByIdRepository} from "@/domain/models/gateways/load-generic-by-id-repository";
import {IDeleteModuleService} from "@/domain/use-cases/delete-module-service";
import {IDeleteModuleRepository} from "@/domain/models/gateways/delete-module-repository";

export class DeleteModulesServiceImpl implements IDeleteModuleService {

    constructor(
        private readonly loadModuleByIdRepository: ILoadGenericByIdRepository<ModulesPermissionsModel>,
        private readonly deleteModuleRepository: IDeleteModuleRepository
    ) {
    }

    async deleteModuleService(id: string): Promise<void> {
        const moduleExist = await this.loadModuleByIdRepository.loadGenericByIdRepository(id)

        if (!moduleExist) return null
        await this.deleteModuleRepository.deleteModuleRepository(id)
    }

}
