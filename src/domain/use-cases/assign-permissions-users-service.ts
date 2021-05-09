export interface IAssignPermissionsUsersService {
    assignPermissionService: (userId: string, permissions: [] | string, ...args) => Promise<void | boolean>
}
