export interface IAddEntityRepository<T> {
    addEntityRepository: (data: T) => Promise<T>
}