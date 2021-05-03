export interface IAddEntityService<T> {
    addEntityService: (data: T, collection?: string) => Promise<T | boolean>
}