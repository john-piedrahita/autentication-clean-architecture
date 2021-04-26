import bcrypt from 'bcrypt'
import {IHash} from "@/domain/use-cases/helpers/hash";
import {IHashCompare} from "@/domain/use-cases/helpers/hash-compare";

export class BcryptAdapter implements IHash, IHashCompare {
    constructor(
        private readonly salt: number
    ) {
    }

    async hash(text: string): Promise<string> {
        const ciphertext = await bcrypt.hash(text, this.salt)
        return ciphertext
    }

    async compare(text: string, digest: string): Promise<IHashCompare.Result> {
        const plaintext = await bcrypt.compare(text, digest)
        return plaintext
    }
}