import {AuthenticationServiceImpl} from "@/domain/use-cases/impl/authentication-service-impl";
import {EncryptSpy, HashCompareSpy} from "@/tests/domain/mocks/mock-cryptography";
import {
    MockLoadUserByEmailRepositorySpy,
    MockUpdateAccessTokenRepositorySpy
} from "@/tests/domain/mocks/mock-authentication-spy";
import {mockAuthenticationParams} from "@/tests/domain/mocks/mock-user-params";
import {throwError} from "@/tests/domain/mocks/mock-error";

type SutTypes = {
    sut: AuthenticationServiceImpl
    encryptSpy: EncryptSpy
    hashCompareSpy: HashCompareSpy
    loadUserByEmailRepositorySpy: MockLoadUserByEmailRepositorySpy
    updateAccessTokenRepositorySpy: MockUpdateAccessTokenRepositorySpy
}

function makeSut (): SutTypes {
    const encryptSpy = new EncryptSpy()
    const hashCompareSpy = new HashCompareSpy()
    const loadUserByEmailRepositorySpy = new MockLoadUserByEmailRepositorySpy()
    const updateAccessTokenRepositorySpy = new MockUpdateAccessTokenRepositorySpy()

    const sut = new AuthenticationServiceImpl(
        encryptSpy,
        hashCompareSpy,
        loadUserByEmailRepositorySpy,
        updateAccessTokenRepositorySpy
    )


    return {
        sut,
        encryptSpy,
        hashCompareSpy,
        loadUserByEmailRepositorySpy,
        updateAccessTokenRepositorySpy
    }
}

describe("Authentication use case", () => {
    it('should call load user by email repository with correct email', async function () {
        const { sut, loadUserByEmailRepositorySpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()
        await sut.auth(authenticationParams)
        expect(loadUserByEmailRepositorySpy.email).toBe(authenticationParams.email)
    });

    it('should throw if load user by email repository throws', async function () {
        const { sut, loadUserByEmailRepositorySpy} = makeSut()
        jest.spyOn(loadUserByEmailRepositorySpy, "loadAccountByEmailRepository").mockImplementationOnce(throwError)
        const promise = sut.auth(mockAuthenticationParams())
        await expect(promise).rejects.toThrow()
    });

    it('should return null if load user by email repository return null', async function () {
        const { sut, loadUserByEmailRepositorySpy } = makeSut()
        loadUserByEmailRepositorySpy.result = null
        const user = await sut.auth(mockAuthenticationParams())
        expect(user).toBeNull()
    });

    it('should return null if hash compare return false', async function () {
        const { sut, hashCompareSpy } = makeSut()
        hashCompareSpy.isValid = false
        const user = await sut.auth(mockAuthenticationParams())
        expect(user).toBeFalsy()
    });

    it('should call hash compare with correct values', async function () {
      const { sut, hashCompareSpy, loadUserByEmailRepositorySpy } = makeSut()
        const authenticationParams = mockAuthenticationParams()
        await sut.auth(authenticationParams)
        expect(hashCompareSpy.plaintext).toBe(authenticationParams.password)
        expect(hashCompareSpy.digest).toBe(loadUserByEmailRepositorySpy.result.password)
    });

    it.skip('should call Encrypt with correct ciphertext', async function () {
        const { sut, encryptSpy, loadUserByEmailRepositorySpy } = makeSut()
        await sut.auth(mockAuthenticationParams())
        expect(encryptSpy.plaintext).toBe(loadUserByEmailRepositorySpy.result.id)
    });

    it.skip('should return an data on success', async function () {
        const { sut, encryptSpy, loadUserByEmailRepositorySpy } = makeSut()
        const { accessToken, name } = await sut.auth(mockAuthenticationParams())
        expect(accessToken).toBe(encryptSpy.ciphertext)
        expect(name).toBe(loadUserByEmailRepositorySpy.result.name)
    });
})