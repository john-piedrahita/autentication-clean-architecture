export interface IEncrypt {
    encrypt: (plaintext: string) => Promise<IEncrypt.Result>
}

export namespace IEncrypt {
    export type Result = string
}