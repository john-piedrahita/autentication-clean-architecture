import {IAssignPermissionsUsersService} from "@/domain/use-cases/assign-permissions-users-service";
import {ILoadGenericByIdRepository} from "@/domain/models/gateways/load-generic-by-id-repository";
import {IAssignPermissionsUsersRepository} from "@/domain/models/gateways/assign-permissions-users-repository";
import {ModulesPermissionsModel, UserModel} from "@/domain/models/user-model";
import {IDeletePermissionsModuleRepository} from "@/domain/models/gateways/delete-permissions-module-repository";

export class AssignPermissionsUsersServiceImpl implements IAssignPermissionsUsersService {
    constructor(
        private readonly deletePermissionModuleById: IDeletePermissionsModuleRepository,
        private readonly loadUserById: ILoadGenericByIdRepository<UserModel>,
        private readonly loadRoleById: ILoadGenericByIdRepository<ModulesPermissionsModel>,
        private readonly assignPermissionsUserRepository: IAssignPermissionsUsersRepository
    ) {
    }

    async assignPermissionService(userId: string, permissions: [] | string, args): Promise<void | boolean> {
        const moduleExit = await this.loadRoleById.loadGenericByIdRepository(permissions['id'])
        if (!moduleExit) return null

        const userExist = await this.loadUserById.loadGenericByIdRepository(userId);
        if (!userExist) return null;

        for (const permission of userExist.permissions) {
            if (permission.id === permissions['id']) {
                await this.deletePermissionModuleById.deletePermissionRepository(permission.moduleId, userExist.id)
            }
        }

        if (userExist && moduleExit) {
            await this.assignPermissionsUserRepository.assignPermissionsRepository(userId, permissions, args)
        }
    }

}
