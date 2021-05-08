import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {
    badRequest,
    HttpRequest,
    HttpResponse, noContent,
    ok,
    serverError,
    unprocessableEntity
} from "@/infrastructure/helpers/http";
import {IAddEntityService} from "@/domain/use-cases/add-entity-service";
import {ModulesPermissionsModel} from "@/domain/models/user-model";
import {fieldsValidation} from "@/infrastructure/helpers/fields-validation";

export class AddRolesController implements IController {

    constructor(
        private readonly addRolesService: IAddEntityService<ModulesPermissionsModel>
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {

        try {
            const {module, permissions} = request.body

            let action = ""

            permissions.map(item => action = item.action)

            const {errors, isValid} = fieldsValidation({module, permissions, action})
            if (!isValid) return unprocessableEntity(errors)

            const rolesResult = await this.addRolesService.addEntityService({...request.body})

            if (rolesResult === false) return badRequest("El Módulo al que va a asignar permisos ya existe en el sistema")

            return ok(rolesResult)

        } catch (e) {
            console.log(e)
            return serverError(e)
        }
    }
}
