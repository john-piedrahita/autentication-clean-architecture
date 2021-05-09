import {ILoadAllModulesService} from "@/domain/use-cases/load-all-modules-service";
import {
    ILoadAllModulesRepository
} from "@/domain/models/gateways/load-all-modules-repository";
import {ModulesPermissionsModel} from "@/domain/models/user-model";

export class LoadAllModulesServiceImpl implements ILoadAllModulesService {
    constructor(
        private readonly loadAllModulesRepository: ILoadAllModulesRepository
    ) {
    }

    async loadAllService(): Promise<ModulesPermissionsModel> {
        return await this.loadAllModulesRepository.loadAllRepository()
    }

}
