import {ModulesPermissionsModel} from "@/domain/models/user-model";

export interface ILoadAllModulesService {
    loadAllService: () => Promise<ModulesPermissionsModel>
}
