export interface IAssignRolesToUsersService {
    assignRolesService: (userId: string, roles: [] | string, ...args) => Promise<void | boolean>
}
