import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {HttpRequest, HttpResponse, ok, serverError} from "@/infrastructure/helpers/http";
import {ILoadAllModulesService} from "@/domain/use-cases/load-all-modules-service";

export class LoadAllModulesController implements IController {

    constructor(
        private readonly loadAllModulesService: ILoadAllModulesService
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
       try {

           const modules = await this.loadAllModulesService.loadAllService()

           return ok(modules)
       } catch (e) {
           console.log(e)
           return serverError(e)
       }
    }

}
