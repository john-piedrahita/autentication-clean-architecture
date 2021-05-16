
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

            const { permissions, email, fullName } = request.body

            let action: string = ""

            for (const value of permissions) {
                const { errors, isValid } = fieldsValidation({ id: value.id, module: value.module })
                if (!isValid) return unprocessableEntity(errors)
                for (let item of value.permission) {
                    action = item.action ? item.action : ""
                    const { errors, isValid } = fieldsValidation({ action })
                    if (!isValid) return unprocessableEntity(errors)
                }
            }

            const { errors, isValid } = fieldsValidation({ permissions, email, fullName })

            if (!isValid) return unprocessableEntity(errors)

            const permissionsResult = await this.assignPermissionsService.assignPermissionService(userId,
                permissions, 'permissions')

            if (permissionsResult === null) return badRequest('El Usuario o los permisos no existen')

            if (permissionsResult === false) return badRequest('El usuario ya tiene asignado este permiso')

            return noContent()

        } catch (e) {
            return serverError(e)
        }
    }
}
