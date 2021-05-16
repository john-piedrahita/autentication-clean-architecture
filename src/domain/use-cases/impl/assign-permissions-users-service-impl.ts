import {IAssignPermissionsUsersService} from "@/domain/use-cases/assign-permissions-users-service";
import {ILoadGenericByIdRepository} from "@/domain/models/gateways/load-generic-by-id-repository";
import {IAssignPermissionsUsersRepository} from "@/domain/models/gateways/assign-permissions-users-repository";
import {ModulesPermissionsModel, UserModel} from "@/domain/models/user-model";
import {IDeletePermissionsModuleRepository} from "@/domain/models/gateways/delete-permissions-module-repository";

export class AssignPermissionsUsersServiceImpl implements IAssignPermissionsUsersService {
    constructor(
        private readonly deletePermissionModuleById: IDeletePermissionsModuleRepository,
        private readonly loadUserById: ILoadGenericByIdRepository<UserModel>,
        private readonly loadRoleById: ILoadGenericByIdRepository<any>,
        private readonly assignPermissionsUserRepository: IAssignPermissionsUsersRepository
    ) {
    }

    async assignPermissionService(userId: string, permissions: any, args): Promise<void | boolean> {
        let moduleExist
        const permissionsId: string[] = [];

        /**
         * Data que llega desde el controlador
         */
        for (const permission of permissions) {
            const arrayModules = []
            permissionsId.push(permission['id'])
            moduleExist = await this.loadRoleById.loadGenericByIdRepository(permission['id'])
            arrayModules.push(moduleExist)
            if (!arrayModules) return null
        }

        const userExist = await this.loadUserById.loadGenericByIdRepository(userId);
        if (!userExist) return null;

        /**
         * Permisos que tiene el usuario,
         */
        for (const permission of userExist.permissions) {
            for (const valueId of permissionsId) {
                if (permission.id === valueId) {
                    await this.deletePermissionModuleById.deletePermissionRepository(permission.moduleId, userExist.id)
                }
            }
        }

        if (userExist && moduleExist) {
            await this.assignPermissionsUserRepository.assignPermissionsRepository(userId, permissions, args)
        }
    }

}
