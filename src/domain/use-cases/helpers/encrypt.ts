export interface IEncrypt {
    encrypt: (plaintext: string | number) => Promise<IEncrypt.Result>
}

export namespace IEncrypt {
    export type Result = string
}