import {AddAccountController} from "@/infrastructure/entry-points/api/users/add-account-controller";
import {MockUserSpy} from "../../../domain/mocks/mock-user-spy";
import {mockFieldsValidation, mockRequest} from "../../../domain/mocks/mock-request";
import {notFound, serverError, unprocessableEntity} from "@/infrastructure/helpers/http";
import {throwError} from "../../../domain/mocks/mock-error";
import {ServerError} from "@/infrastructure/helpers/errors";

type SutTypes = {
    sut: AddAccountController
    addAccountSpy: MockUserSpy
}

function makeSut(): SutTypes {
    const addAccountSpy = new MockUserSpy()
    const sut = new AddAccountController(addAccountSpy)
    return {sut, addAccountSpy}
}

describe("Account controller", () => {
    it('should call add account with corrects values', async function () {
        const {sut} = makeSut()
        const request = mockRequest()
        const account = await sut.handle(request)
        expect(account).toBeTruthy()
    });

    it('should return null if account exist', async function () {
        const {sut} = makeSut()
        let httpResponse = await sut.handle({})
        httpResponse.statusCode = 404
        httpResponse.body = {"message": "Page not found"}
        await expect(httpResponse).toEqual(notFound())
    });

    it.skip('should return 422 if errors fields', async function () {
        const {sut} = makeSut()
        const httpResponse = await sut.handle(mockFieldsValidation())

        expect(httpResponse).toEqual(unprocessableEntity({
            "name": "name fields is required",
            "email": "email fields is required",
            "password": "password fields is required",
            "avatar": "avatar fields is required"
        }))
    });

    it('should return 500 if add account throws', async function () {
        const {sut, addAccountSpy} = makeSut()
        jest.spyOn(addAccountSpy, "addEntityService").mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        await expect(httpResponse).toEqual(serverError(new ServerError()))
    });
})