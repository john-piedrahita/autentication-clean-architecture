export interface ILoadEntityByFieldRepository {
    loadEntityByFieldRepository: (field: string) => Promise<boolean>
}