export interface ILoadGenericByIdRepository<T> {
    loadGenericByIdRepository?: (id: string | number) => Promise<T | any>
}
