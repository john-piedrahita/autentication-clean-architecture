import {IMiddleware} from "@/infrastructure/entry-points/gateways/middleware";
import {HttpResponse, ok, serverError} from "@/infrastructure/helpers/http";
import {ILoadAccountTokenService} from "@/domain/use-cases/load-account-token-service";

export class Auth implements IMiddleware<any> {
    constructor(
        private readonly loadAccountByTokenService: ILoadAccountTokenService
    ) {
    }
    async handle(HttpRequest: any): Promise<HttpResponse> {
        try {
            const { accessToken } = HttpRequest

            if (accessToken) {
                const account = await this.loadAccountByTokenService.loadTokenService(accessToken)
                if (account) {
                    return ok(account)
                }
            }

        } catch (e) {
            return serverError(e)
        }
    }
}
