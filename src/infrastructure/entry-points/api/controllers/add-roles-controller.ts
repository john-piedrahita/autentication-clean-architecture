import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {
    badRequest,
    HttpRequest,
    HttpResponse,
    ok,
    serverError,
    unprocessableEntity
} from "@/infrastructure/helpers/http";
import {IAddEntityService} from "@/domain/use-cases/add-entity-service";
import {RolesUserModel} from "@/domain/models/user-model";
import {fieldsValidation} from "@/infrastructure/helpers/fields-validation";

export class AddRolesController implements IController {

    constructor(
        private readonly addRolesService: IAddEntityService<RolesUserModel>
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {

        try {
            const {name, permissions} = request.body

            let permission = ""
            let code = ""

            permissions.map(item => (permission = item.permission, code = item.code))

            const {errors, isValid} = fieldsValidation({name, permissions, permission, code})
            if (!isValid) return unprocessableEntity(errors)

            const rolesResult = await this.addRolesService.addEntityService({...request.body})

            if (rolesResult === false) return badRequest("El Rol que vas a ingresar ya existe en el sistema")

            return ok(rolesResult)

        } catch (e) {
            console.log(e)
            return serverError(e)
        }
    }
}
