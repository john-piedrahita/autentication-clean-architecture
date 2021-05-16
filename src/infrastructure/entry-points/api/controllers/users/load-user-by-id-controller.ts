import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {badRequest, HttpRequest, HttpResponse, ok, serverError} from "@/infrastructure/helpers/http";
import {ILoadGenericByIdService} from "@/domain/use-cases/load-generic-by-id-service";
import {UserModel} from "@/domain/models/user-model";

export class LoadUserByIdController implements IController {

    constructor(
        private readonly loadUserByIdService: ILoadGenericByIdService<UserModel>
    ) {
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {

       try {

           const {id} = request.params

           const user = await this.loadUserByIdService.loadByIdService(id)

           if (user === null) return badRequest("El usuario no existe")

           return ok(user)

       } catch (e) {
           return serverError(e)
       }
    }
}
