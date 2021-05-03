export interface IAddEntityRepository<T> {
    addEntityRepository: (data: T, collection?: string) => Promise<IAddEntityRepository.Result>
}

export namespace IAddEntityRepository {
    export type Result = boolean
}