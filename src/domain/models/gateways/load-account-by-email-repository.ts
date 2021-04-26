export interface ILoadAccountByEmailRepository {
    loadAccountByEmailRepository: (field: string) => Promise<ILoadAccountByEmailRepository.Result>
}

export namespace ILoadAccountByEmailRepository {
    export type Result = {
        id: string,
        name: string,
        email?: string,
        password: string
    }
}