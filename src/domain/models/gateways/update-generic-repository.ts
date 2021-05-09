export interface IUpdateGenericRepository<T> {
    updateGenericRepository?: (id: string | number, value: string | any, field?: string) => Promise<void>
}
