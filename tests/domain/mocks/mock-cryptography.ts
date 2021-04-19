import * as faker from "faker"
import {IHash} from "@/domain/use-cases/helpers/hash";
import {IEncrypt} from "@/domain/use-cases/helpers/encrypt";
import {IHashCompare} from "@/domain/use-cases/helpers/hash-compare";
import {IDecrypt} from "@/domain/use-cases/helpers/decrypt";

export class HashSpy implements IHash {
    digest = faker.datatype.uuid()
    plaintext: string

    async hash(text: string): Promise<string> {
        this.plaintext = text
        return this.digest
    }
}

export class HashCompareSpy implements IHashCompare {
    plaintext: string
    digest: string
    isValid: boolean

    async compare(text: string, digest: string): Promise<IHashCompare.Result> {
        this.plaintext = text
        this.digest = digest
        return this.isValid
    }
}

export class EncryptSpy implements IEncrypt {
    ciphertext = faker.datatype.uuid()
    plaintext: string

    async encrypt(plaintext: string): Promise<IEncrypt.Result> {
        this.plaintext = "da8a838c-75a5-4eaf-8585-3dc3daa5ba12"
        console.log('mock', this.plaintext)
        return this.ciphertext
    }
}

export class DecryptSpy implements IDecrypt {
    plaintext = faker.internet.password()
    ciphertext: string

    async decrypt(ciphertext: string): Promise<IDecrypt.Result> {
        this.ciphertext = ciphertext
        return this.plaintext
    }
}