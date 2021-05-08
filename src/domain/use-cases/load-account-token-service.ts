export interface ILoadAccountTokenService {
    loadTokenService: (token: string) => Promise<ILoadAccountTokenService.Result>
}

export namespace ILoadAccountTokenService {
    export type Result = {
        id: string
    }
}
