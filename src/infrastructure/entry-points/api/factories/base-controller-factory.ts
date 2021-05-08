import {
    ADD_ACCOUNT,
    ADD_MODULE,
    ASSIGN_MODULES_USER,
    LOGIN,
    RESET_PASSWORD,
    UPDATE_PASSWORD
} from "@/infrastructure/helpers/constant";
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
import {AssignRolesUserController} from "@/infrastructure/entry-points/api/controllers/assign-roles-user-controller";
import {makeDbAssignRolesUserFactory} from "@/infrastructure/driven-adapters/factories/db-assign-roles-users-factory";

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
        case ADD_MODULE:
            return new AddRolesController(makeDbAddRolesFactory())
        case ASSIGN_MODULES_USER:
            return new AssignRolesUserController(makeDbAssignRolesUserFactory())
    }
}
