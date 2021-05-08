export interface IDeleteRolesRepository {
    deleteRolesRepository?: (roleId: string | number, userId: string | number) => Promise<void>
}
