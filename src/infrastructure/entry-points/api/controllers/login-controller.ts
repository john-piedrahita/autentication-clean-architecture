import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {
    HttpRequest, HttpResponse, notFound, ok, serverError, unauthorized,
    unprocessableEntity
} from "@/infrastructure/helpers/http";
import {fieldsValidation} from "@/infrastructure/helpers/fields-validation";
import {IAuthenticationRepository} from "@/domain/models/gateways/authentication-repository";

export class LoginController implements IController {
    constructor(
        private readonly authentication: IAuthenticationRepository
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {

        try {
            const { errors, isValid } = fieldsValidation(request.body)

            if (!isValid) return unprocessableEntity(errors)

            const { email, password } = request.body

            const authenticationModel = await this.authentication.auth({ email, password })

            if (authenticationModel === null) return unauthorized()

            return ok(authenticationModel)

        } catch (e) {
            return serverError(e)
        }
    }

}