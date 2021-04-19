import {AddAccountServiceImpl} from "@/domain/use-cases/impl/add-account-service-impl";
import {HashSpy} from "@/tests/domain/mocks/mock-cryptography";
import {MockCheckUserByEmailSpy} from "@/tests/domain/mocks/mock-check-user-by-email-spy";
import {MockAddAccountRepositorySpy} from "@/tests/domain/mocks/mock-add-account-repository-spy";
import {mockUserModel} from "@/tests/domain/mocks/mock-user-model";
import {throwError} from "@/tests/domain/mocks/mock-error";


type SutTypes = {
    sut: AddAccountServiceImpl
    hashSpy: HashSpy
    checkEmailRepositorySpy: MockCheckUserByEmailSpy
    addAccountRepositorySpy: MockAddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
    const hashSpy = new HashSpy()
    const checkEmailRepositorySpy = new MockCheckUserByEmailSpy()
    const addAccountRepositorySpy = new MockAddAccountRepositorySpy()
    const sut = new AddAccountServiceImpl(
        hashSpy,
        addAccountRepositorySpy,
        checkEmailRepositorySpy
    )

    return {
        sut,
        hashSpy,
        checkEmailRepositorySpy,
        addAccountRepositorySpy
    }
}

describe("Add account use case", () => {
    it('should return true if check user by email repository exist', async function () {
        const { sut, checkEmailRepositorySpy } = makeSut()
        checkEmailRepositorySpy.result = true
        const userExist = await sut.addEntityService(mockUserModel())
        expect(userExist).toBe(false)
    });

    it('should call add account repository with correct values', async function () {
        const { sut, hashSpy, addAccountRepositorySpy } = makeSut()
        const addUserParams = mockUserModel()
        await sut.addEntityService(addUserParams)
        expect(addAccountRepositorySpy.params).toEqual({
            id: addUserParams.id,
            name: addUserParams.name,
            email: addUserParams.email,
            avatar: addUserParams.avatar,
            password: hashSpy.digest,
            createdAt: addUserParams.createdAt
        })
    });

    it('should call load account by email repository with correct email', async function () {
        const { sut, checkEmailRepositorySpy } = makeSut()
        const addAccountParams = mockUserModel()
        await sut.addEntityService(addAccountParams)
        expect(checkEmailRepositorySpy.email).toBe(addAccountParams.email)
    });

    it('should throw if add account repository throws', async function () {
        const { sut, addAccountRepositorySpy } = makeSut()
        jest.spyOn(addAccountRepositorySpy, 'addEntityRepository')
            .mockImplementationOnce(throwError)
        const promise = sut.addEntityService(mockUserModel())
        await expect(promise).rejects.toThrow()
    });
})