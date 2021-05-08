import {IMiddleware} from "@/infrastructure/entry-points/gateways/middleware";
import {Auth} from "@/application/middlewares/auth";
import {makeDbLoadAccountTokenFactory} from "@/infrastructure/driven-adapters/factories/db-load-account-token-factory";

export const makeAuthMiddlewareFactory = (): IMiddleware<any> => {
    return new Auth(makeDbLoadAccountTokenFactory())
}
