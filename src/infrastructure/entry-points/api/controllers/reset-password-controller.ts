import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {badRequest, HttpRequest, HttpResponse, noContent, serverError} from "@/infrastructure/helpers/http";
import {IResetPasswordService} from "@/domain/use-cases/reset-password-service";
import {MAIL_FROM, MAIL_SUBJECT} from "@/application/config/environment";

export class ResetPasswordController implements IController {

    constructor(
        private readonly resetPasswordService: IResetPasswordService
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const {email} = request.body
            const body = `Hi 
                    Please click on the following link to reset your password. \n\n 
                    If you did not request this, please ignore this email and your password will remain unchanged.\n`


            const resetPassword = await this.resetPasswordService.resetPasswordService(
                email, MAIL_FROM, MAIL_SUBJECT, body
            )

            if (resetPassword === null) return badRequest("El email no se encuetra registrado")

            return noContent()

        } catch (e) {
            console.log(e)
            return serverError(e)
        }
    }

}