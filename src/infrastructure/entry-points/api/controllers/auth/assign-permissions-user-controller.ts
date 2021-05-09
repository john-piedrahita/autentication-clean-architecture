import { v4 as uuidv4 } from 'uuid'
import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {badRequest, HttpRequest, HttpResponse, noContent, serverError, unprocessableEntity} from "@/infrastructure/helpers/http";
import {IAssignPermissionsUsersService} from "@/domain/use-cases/assign-permissions-users-service";
import {fieldsValidation} from "@/infrastructure/helpers/fields-validation";

export class AssignPermissionsUserController implements IController {

    constructor(
        private readonly assignPermissionsService: IAssignPermissionsUsersService
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {


        try {

            const {userId} = request.params

            const { permissions } = request.body

            const { id, module, permission } = permissions

            let action: string = ""
            for (let item of permission) {
                action = item.action ? item.action : ""
                const { errors, isValid } = fieldsValidation({ action })
                if (!isValid) return unprocessableEntity(errors)
            }

            const { errors, isValid } = fieldsValidation({ id, module, permissions })

            if (!isValid) return unprocessableEntity(errors)

            const permissionsResult = await this.assignPermissionsService.assignPermissionService(userId,
                { moduleId: uuidv4(), ...permissions }, 'permissions')

            if (permissionsResult === null) return badRequest('El Usuario o los permisos no existen')

            if (permissionsResult === false) return badRequest('El usuario ya tiene asignado este permiso')

            return noContent()

        } catch (e) {
            console.log(e)
            return serverError(e)
        }
    }
}
