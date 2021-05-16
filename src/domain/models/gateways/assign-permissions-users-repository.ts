export interface IAssignPermissionsUsersRepository {
    assignPermissionsRepository?: (userId: string, permissions: any, ...args) => Promise<void>
}
