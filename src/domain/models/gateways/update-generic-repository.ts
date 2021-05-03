export interface IUpdateGenericRepository<T> {
    updateGenericRepository?: (id: string | number, value: string, field?: string) => Promise<void>
}