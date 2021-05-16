import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {badRequest, HttpRequest, HttpResponse, noContent, serverError, unprocessableEntity} from "@/infrastructure/helpers/http";
import {IResetPasswordService} from "@/domain/use-cases/reset-password-service";
import {MAIL_FROM, MAIL_SUBJECT} from "@/application/config/environment";
import {fieldsValidation} from '@/infrastructure/helpers/fields-validation'

export class ResetPasswordController implements IController {

    constructor(
        private readonly resetPasswordService: IResetPasswordService
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const {email} = request.body

            const {errors, isValid} = fieldsValidation({email})

            if (!isValid) return unprocessableEntity(errors)

            const resetPassword = await this.resetPasswordService.resetPasswordService(
                email, MAIL_FROM, MAIL_SUBJECT
            )

            if (resetPassword === null) return badRequest("El email no se encuetra registrado")

            return noContent()

        } catch (e) {
            console.log(e)
            return serverError(e)
        }
    }

}
