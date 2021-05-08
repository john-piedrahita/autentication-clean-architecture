import {IAssignRolesToUsersService} from "@/domain/use-cases/assign-roles-to-users-service";
import {ILoadGenericByIdRepository} from "@/domain/models/gateways/load-generic-by-id-repository";
import {IAssignRolesToUsersRepository} from "@/domain/models/gateways/assign-roles-to-users-repository";
import {ModulesPermissionsModel, UserModel} from "@/domain/models/user-model";
import {IDeleteRolesRepository} from "@/domain/models/gateways/delete-roles-repository";

export class AssignRolesToUsersServiceImpl implements IAssignRolesToUsersService {
    constructor(
        private readonly deleteRoleById: IDeleteRolesRepository,
        private readonly loadUserById: ILoadGenericByIdRepository<UserModel>,
        private readonly loadRoleById: ILoadGenericByIdRepository<ModulesPermissionsModel>,
        private readonly assignRolesToUserRepository: IAssignRolesToUsersRepository
    ) {
    }

    async assignRolesService(userId: string, roles: [] | string, args): Promise<void | boolean> {
        const roleExit = await this.loadRoleById.loadGenericByIdRepository(roles['id'])
        if (!roleExit) return null

        const userExist = await this.loadUserById.loadGenericByIdRepository(userId);
        if (!userExist) return null;

        for (const rol of userExist.permissions) {
            if (rol.id === roles['id']) {
                await this.deleteRoleById.deleteRolesRepository(rol.moduleId, userExist.id)
            }
        }

        if (userExist && roleExit) {
           await this.assignRolesToUserRepository.assignRolesRepository(userId, roles, args)
        }
    }
}
