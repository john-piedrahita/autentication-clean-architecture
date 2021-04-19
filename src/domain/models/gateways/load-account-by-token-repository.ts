export interface ILoadAccountByTokenRepository {
    loadAccountByTokenRepository: (accessToken: string) => Promise<ILoadAccountByTokenRepository.Result>
}

export namespace ILoadAccountByTokenRepository {
    export type Result = {
        id: string
    }
}