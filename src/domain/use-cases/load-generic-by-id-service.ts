export interface ILoadGenericByIdService<T> {
    loadByIdService: (id: string) => Promise<T>
}
