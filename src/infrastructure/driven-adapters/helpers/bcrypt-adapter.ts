import bcrypt from 'bcrypt'
import {IHash} from "@/domain/use-cases/helpers/hash";

export class BcryptAdapter implements IHash {
    constructor(
        private readonly salt: number
    ) {
    }

    async hash(text: string): Promise<string> {
        return await bcrypt.hash(text, this.salt)
    }
}