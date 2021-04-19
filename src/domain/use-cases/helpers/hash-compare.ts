export interface IHashCompare {
    compare: (text: string, digest: string) => Promise<IHashCompare.Result>
}

export namespace IHashCompare {
    export type Result = boolean
}