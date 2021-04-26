import bcrypt from 'bcrypt'
import {BcryptAdapter} from "@/infrastructure/driven-adapters/helpers/bcrypt-adapter";
import {throwError} from "@/tests/domain/mocks/mock-error";

jest.mock('bcrypt', () => ({
    async hash (): Promise<string> {
        return 'hash'
    },

    async compare(): Promise<string> {
        return "value"
    }
}))

const salt = 12;

const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt)
}

describe("Bcrypt Adapter", () => {
    it('should create has correctly',  async function () {
        const sut = makeSut()
        const hashSpy = jest.spyOn(bcrypt, "hash")
        await sut.hash('value')
        expect(hashSpy).toHaveBeenCalledWith("value", salt)
    });

    it('should throws if bcrypt throws', async function () {
        const sut = makeSut()
        jest.spyOn(bcrypt, "hash").mockImplementationOnce(throwError)
        const promise = sut.hash("value")
        await expect(promise).rejects.toThrow()
    });

    it('should call compare with correct values', async function () {
        const sut = makeSut()
        const compareSpy = jest.spyOn(bcrypt, "compare")
        await sut.compare("hash", "value")
        expect(compareSpy).toHaveBeenCalledWith("hash", "value")
    });
})