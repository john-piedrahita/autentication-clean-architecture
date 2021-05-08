export interface IAssignRolesToUsersRepository {
    assignRolesRepository?: (userId: string, roles: [] | string, ...args) => Promise<void>
}
