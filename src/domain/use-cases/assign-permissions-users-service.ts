export interface IAssignPermissionsUsersService {
    assignPermissionService: (userId: string, permissions: any, ...args) => Promise<void | boolean>
}
