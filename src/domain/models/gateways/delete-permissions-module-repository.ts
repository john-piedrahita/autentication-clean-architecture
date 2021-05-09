export interface IDeletePermissionsModuleRepository {
    deletePermissionRepository?: (moduleId: string, userId: string) => Promise<void>
}
