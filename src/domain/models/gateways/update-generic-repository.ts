export interface IUpdateGenericRepository {
    updateGenericRepository: (id: string, value: string, field?: string) => Promise<void>
}