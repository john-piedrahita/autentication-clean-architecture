export interface ICheckUserByEmailRepository {
    checkUserRepository?: (email: string) => Promise<boolean>
}