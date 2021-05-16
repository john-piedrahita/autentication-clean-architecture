import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {
    badRequest,
    HttpRequest,
    HttpResponse,
    noContent,
    serverError,
    unprocessableEntity
} from "@/infrastructure/helpers/http";
import {IUpdatePasswordService} from "@/domain/use-cases/update-password-service";
import {fieldsValidation} from "@/infrastructure/helpers/fields-validation";

export class UpdatePasswordController implements IController {

    constructor(
        private readonly updatePasswordService: IUpdatePasswordService
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {

            const { token } = request.params
            const { password } = request.body

            const {errors, isValid} = fieldsValidation({password})

            if (!isValid) return unprocessableEntity(errors)

            const updatePassword = await this.updatePasswordService.updatePasswordService(password, token)

            if (updatePassword === null) return badRequest("El token ya expiró")

            return noContent()

        } catch (e) {
            return serverError(e)
        }
    }
}
