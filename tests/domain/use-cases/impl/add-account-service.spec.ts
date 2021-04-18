import {AddAccountServiceImpl} from "@/domain/use-cases/impl/add-account-service-impl";
import {HashSpy} from "../../mocks/mock-cryptography";
import {MockAddAccountRepositorySpy} from "../../mocks/mock-add-account-repository-spy";
import {MockCheckUserByEmailSpy} from "../../mocks/mock-check-user-by-email-spy";
import {mockUserModel} from "../../mocks/mock-user-model";
import {throwError} from "../../mocks/mock-error";

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
    it('should return false if check user by email repository exist', async function () {
        const { sut, checkEmailRepositorySpy } = makeSut()
        checkEmailRepositorySpy.result = true
        const userExist = await sut.addEntityService(mockUserModel())
        expect(userExist).toBeFalsy()
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