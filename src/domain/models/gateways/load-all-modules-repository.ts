import {ModulesPermissionsModel} from "@/domain/models/user-model";

export interface ILoadAllModulesRepository {
    loadAllRepository?: () => Promise<ModulesPermissionsModel>
}
