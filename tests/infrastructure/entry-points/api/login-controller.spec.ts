import {LoginController} from "@/infrastructure/entry-points/api/controllers/login-controller";
import {serverError, unauthorized, unprocessableEntity} from "@/infrastructure/helpers/http";
import {MockAuthenticationSpy} from "@/tests/domain/mocks/mock-authentication-spy";
import {throwError} from "@/tests/domain/mocks/mock-error";
import {
    mockFieldsValidationAuthentication, mockRequest, mockRequestAuthentication
} from "@/tests/domain/mocks/mock-request";

type SutTypes = {
    sut: LoginController
    authenticationSpy: MockAuthenticationSpy
}

const makeSut = (): SutTypes => {
    const authenticationSpy = new MockAuthenticationSpy()
    const sut = new LoginController(authenticationSpy)
    return {
        sut,
        authenticationSpy
    }
}

describe('Login controller', () => {
    it('should call authentication with correct values', async  function () {
        const {sut, authenticationSpy} = makeSut()
        const request = mockRequestAuthentication()
        await sut.handle(request)
        expect(authenticationSpy.params).toEqual({
            email: request.body.email,
            password: request.body.password
        })
    });

    it('should return 401 if invalid credentials are provided', async  function () {
        const {sut, authenticationSpy} = makeSut()
        authenticationSpy.result = null
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(unauthorized())
    });

    it('should return 500 if authentication throws', async  function () {
        const {sut, authenticationSpy} = makeSut()
        jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(serverError(new Error()))
    });

    it('should return 422 if fields this errors', async function () {
        const {sut} = makeSut()
        const httpResponse = await sut.handle(mockFieldsValidationAuthentication())
        expect(httpResponse).toEqual(unprocessableEntity({
            "email": "email field is required",
            "password": "password field is required"
        }))
    });
})

