import {ADD_ACCOUNT, ADD_ROLES, LOGIN, RESET_PASSWORD, UPDATE_PASSWORD} from "@/infrastructure/helpers/constant";
import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {AddAccountController} from "@/infrastructure/entry-points/api/controllers/add-account-controller";
import {makeDbAddAccountFactory} from "@/infrastructure/driven-adapters/factories/db-add-account-factory";
import {LoginController} from "@/infrastructure/entry-points/api/controllers/login-controller";
import {makeAuthenticationFactory} from "@/infrastructure/driven-adapters/factories/db-authentication-factory";
import {ResetPasswordController} from "@/infrastructure/entry-points/api/controllers/reset-password-controller";
import {makeDbResetPassword} from "@/infrastructure/driven-adapters/factories/db-reset-password-factory";
import {UpdatePasswordController} from "@/infrastructure/entry-points/api/controllers/update-password-controller";
import {makeDbUpdatePassword} from "@/infrastructure/driven-adapters/factories/db-update-password-factory";
import {AddRolesController} from "@/infrastructure/entry-points/api/controllers/add-roles-controller";
import {makeDbAddRolesFactory} from "@/infrastructure/driven-adapters/factories/db-add-roles-factory";

export const makeBaseControllerFactory = (type: string): IController => {
    switch (type) {
        case ADD_ACCOUNT:
            return new AddAccountController(makeDbAddAccountFactory())
        case LOGIN:
            return new LoginController(makeAuthenticationFactory())
        case RESET_PASSWORD:
            return new ResetPasswordController(makeDbResetPassword())
        case UPDATE_PASSWORD:
            return new UpdatePasswordController(makeDbUpdatePassword())
        case ADD_ROLES:
            return new AddRolesController(makeDbAddRolesFactory())
    }
}