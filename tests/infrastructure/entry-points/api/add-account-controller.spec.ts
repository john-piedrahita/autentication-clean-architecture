import {AddAccountController} from "@/infrastructure/entry-points/api/controllers/auth/add-account-controller";
import {MockUserSpy} from "@/tests/domain/mocks/mock-user-spy";
import {mockFieldsValidation, mockRequest} from "@/tests/domain/mocks/mock-request";
import {badRequest, serverError, unauthorized, unprocessableEntity} from "@/infrastructure/helpers/http";
import {throwError} from "@/tests/domain/mocks/mock-error";
import {ServerError} from "@/infrastructure/helpers/errors";
import {MockCheckUserByEmailSpy} from "@/tests/domain/mocks/mock-check-user-by-email-spy";
import {EMAIL_IN_USE} from "@/infrastructure/helpers/constant";

type SutTypes = {
    sut: AddAccountController
    addAccountSpy: MockUserSpy
    checkUserByEmailSpy: MockCheckUserByEmailSpy
}

function makeSut(): SutTypes {
    const addAccountSpy = new MockUserSpy()
    const checkUserByEmailSpy = new MockCheckUserByEmailSpy()
    const sut = new AddAccountController(addAccountSpy)
    return {
        sut, addAccountSpy, checkUserByEmailSpy
    }
}

describe("Account controller", () => {
    it('should call add account with corrects values', async function () {
        const {sut} = makeSut()
        const request = mockRequest()
        const account = await sut.handle(request)
        expect(account).toBeTruthy()
    });

    it('should return 422 if errors fields', async function () {
        const {sut} = makeSut()
        const httpResponse = await sut.handle(mockFieldsValidation())
        httpResponse.statusCode = 422
        expect(httpResponse).toEqual(unprocessableEntity({
            "name": "name field is required",
            "email": "email field is required",
            "password": "password field is required",
            "avatar": "avatar field is required"
        }))
    });

    it('should return 400 if the account exist by email', async  function () {
        const {sut, checkUserByEmailSpy} = makeSut()
        checkUserByEmailSpy.result = false
        const httpResponse = await sut.handle(mockRequest())
        httpResponse.statusCode = 400
        httpResponse.body = {"message": "El email ya se encuentra registrado"}
        expect(httpResponse).toEqual(badRequest(EMAIL_IN_USE))
    });

    it('should return 500 if add account throws', async function () {
        const {sut, addAccountSpy} = makeSut()
        jest.spyOn(addAccountSpy, "addEntityService").mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        await expect(httpResponse).toEqual(serverError(new ServerError()))
    });
})
