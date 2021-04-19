import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {HttpRequest, HttpResponse, notFound, ok, serverError, unprocessableEntity} from "@/infrastructure/helpers/http";
import {IAddEntityService} from "@/domain/use-cases/add-entity-service";
import {AddUserParams} from "@/domain/models/user-model";
import {fieldsValidation} from "@/infrastructure/helpers/fields-validation";

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

            if (account === null) return notFound()

            return ok(account)

        } catch (e) {
            return serverError(e)
        }
    }
}