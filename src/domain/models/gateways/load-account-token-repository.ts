export interface ILoadAccountTokenRepository {
    loadTokenRepository?: (token: string) => Promise<ILoadAccountTokenRepository.Result>
}

export namespace ILoadAccountTokenRepository {
    export type Result = {
        id: string
    }
}
