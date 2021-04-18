export interface IAddEntityService<T> {
    addEntityService: (data: T) => Promise<T | boolean>
}