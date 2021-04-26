import {ADD_ACCOUNT, LOGIN, RESET_PASSWORD} from "@/infrastructure/helpers/constant";
import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {AddAccountController} from "@/infrastructure/entry-points/api/controllers/add-account-controller";
import {makeDbAddAccountFactory} from "@/infrastructure/driven-adapters/factories/db-add-account-factory";
import {LoginController} from "@/infrastructure/entry-points/api/controllers/login-controller";
import {makeAuthenticationFactory} from "@/infrastructure/driven-adapters/factories/db-authentication-factory";
import {ResetPasswordController} from "@/infrastructure/entry-points/api/controllers/reset-password-controller";
import {makeDbResetPassword} from "@/infrastructure/driven-adapters/factories/db-reset-password-factory";

export const makeBaseControllerFactory = (type: string): IController => {
    switch (type) {
        case ADD_ACCOUNT:
            return new AddAccountController(makeDbAddAccountFactory())
        case LOGIN:
            return new LoginController(makeAuthenticationFactory())
        case RESET_PASSWORD:
            return new ResetPasswordController(makeDbResetPassword())
    }
}