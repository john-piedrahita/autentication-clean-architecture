import jwt from "jsonwebtoken"
import {JwtAdapter} from "@/infrastructure/driven-adapters/helpers/jwt-adapter";

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string> {
        return "token"
    },

    async verify(): Promise<string> {
        return "value"
    }
}))

const makeSut = (): JwtAdapter => {
    return new JwtAdapter("secret")
}

describe("Jwt adapter", () => {
    it('should call sign with correct values', async function () {
        const sut = makeSut();
        const signSpy = jest.spyOn(jwt, "sign")
        await sut.encrypt('id')
        expect(signSpy).toHaveBeenCalledWith({account: 'id'}, 'secret', {"expiresIn": "1d"})
    });

    it('should return a token on sign success', async function () {
        const sut = makeSut()
        const accessToken = await sut.encrypt("id")
        expect(accessToken).toBe("token")
    });

    it('should call verify with correct values', async function () {
        const sut = makeSut()
        const verifySpy = jest.spyOn(jwt, "verify")
        await sut.decrypt("token")
        expect(verifySpy).toHaveBeenCalledWith("token", "secret")
    });

    it('should return a value on verify success', async function () {
        const sut = makeSut()
        const value = await sut.decrypt("token")
        expect(value).toBe("value")
    });
})