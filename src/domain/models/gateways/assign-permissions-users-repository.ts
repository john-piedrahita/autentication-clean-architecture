export interface IAssignPermissionsUsersRepository {
    assignPermissionsRepository?: (userId: string, permissions: [] | string, ...args) => Promise<void>
}
