import { v4 as uuidv4 } from 'uuid'
import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {badRequest, HttpRequest, HttpResponse, noContent, serverError, unprocessableEntity} from "@/infrastructure/helpers/http";
import {IAssignRolesToUsersService} from "@/domain/use-cases/assign-roles-to-users-service";
import {fieldsValidation} from "@/infrastructure/helpers/fields-validation";

export class AssignRolesUserController implements IController {

    constructor(
        private readonly assignRolesService: IAssignRolesToUsersService
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {


        try {

            const {userId} = request.params

            const { roles } = request.body

            const { id, module, permissions } = roles

            let action: string = ""
            for (let item of permissions) {
                action = item.action ? item.action : ""
                const { errors, isValid } = fieldsValidation({ action })
                if (!isValid) return unprocessableEntity(errors)
            }

            const { errors, isValid } = fieldsValidation({ id, module, permissions })

            if (!isValid) return unprocessableEntity(errors)

            const rol = await this.assignRolesService.assignRolesService(userId,
                { moduleId: uuidv4(), ...roles }, 'roles')

            if (rol === null) return badRequest('El Usuario o el Rol no existen')

            if (rol === false) return badRequest('El usuario ya tiene asignado este permiso')

            return noContent()

        } catch (e) {
            return serverError(e)
        }
    }
}
