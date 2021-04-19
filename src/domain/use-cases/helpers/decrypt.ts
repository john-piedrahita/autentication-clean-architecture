export interface IDecrypt {
    decrypt: (ciphertext: string) => Promise<IDecrypt.Result>
}

export namespace IDecrypt {
    export type Result = string
}