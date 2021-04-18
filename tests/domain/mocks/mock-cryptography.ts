import * as faker from "faker"
import {IHash} from "@/domain/use-cases/helpers/hash";

export class HashSpy implements IHash {
    digest = faker.datatype.uuid()
    plaintext: string

    async hash(text: string): Promise<string> {
        this.plaintext = text
        return this.digest
    }
}