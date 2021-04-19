export interface ILoadAccountByTokenService {
    loadAccountByTokenService: (accessToken: string) => Promise<ILoadAccountByTokenService.Result>
}

export namespace ILoadAccountByTokenService {
    export type Result = {
        id: string
    }
}