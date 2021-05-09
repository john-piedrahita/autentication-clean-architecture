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

export class AddModuleController implements IController {

    constructor(
        private readonly addModuleService: IAddEntityService<ModulesPermissionsModel>
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {

        try {
            const {module, permission} = request.body

            let action: string = ""
            for (let item of permission) {
                action = item.action ? item.action : ""
                const { errors, isValid } = fieldsValidation({ action })
                if (!isValid) return unprocessableEntity(errors)
            }

            const {errors, isValid} = fieldsValidation({module, permission})
            if (!isValid) return unprocessableEntity(errors)

            const moduleResult = await this.addModuleService.addEntityService({...request.body})

            if (moduleResult === false) return badRequest("El Módulo al que va a asignar permisos ya existe en el sistema")

            return ok(moduleResult)

        } catch (e) {
            return serverError(e)
        }
    }
}
