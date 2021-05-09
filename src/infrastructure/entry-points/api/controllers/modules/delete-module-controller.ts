import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {HttpRequest, HttpResponse, noContent, serverError} from "@/infrastructure/helpers/http";
import {IDeleteModuleService} from "@/domain/use-cases/delete-module-service";

export class DeleteModuleController implements IController {
    constructor(
        private readonly deleteModuleService: IDeleteModuleService
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {

        try {
            const {moduleId} = request.params

            await this.deleteModuleService.deleteModuleService(moduleId)

            return noContent()

        } catch (e) {
            return serverError(e)
        }
    }

}
