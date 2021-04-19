export interface IAddEntityRepository<T> {
    addEntityRepository: (data: T) => Promise<IAddEntityRepository.Result>
}

export namespace IAddEntityRepository {
    export type Result = boolean
}