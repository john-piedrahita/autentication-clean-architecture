export interface ICheckUserByEmailRepository {
    checkUserRepository: (field: string) => Promise<boolean>
}