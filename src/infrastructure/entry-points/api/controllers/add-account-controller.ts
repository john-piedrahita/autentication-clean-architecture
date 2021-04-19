import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {
    badRequest,
    HttpRequest, HttpResponse, ok, serverError, unprocessableEntity
} from "@/infrastructure/helpers/http";
import {IAddEntityService} from "@/domain/use-cases/add-entity-service";
import {AddUserParams} from "@/domain/models/user-model";
import {fieldsValidation} from "@/infrastructure/helpers/fields-validation";
import {EMAIL_IN_USE} from "@/infrastructure/helpers/constant";

export class AddAccountController  implements IController {
    constructor(
        private readonly addAccountService: IAddEntityService<AddUserParams>
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {

            const { errors, isValid } = fieldsValidation(request.body)

            if (!isValid) return unprocessableEntity(errors)

            const account = await this.addAccountService.addEntityService({...request.body})

            if (!account) return badRequest(EMAIL_IN_USE)

            return ok(account)

        } catch (e) {
            return serverError(e)
        }
    }
}