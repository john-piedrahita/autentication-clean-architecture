import {
    ADD_ACCOUNT,
    ADD_MODULE,
    ASSIGN_MODULES_USER, DELETE_MODULES, DETAIL_USER, LOAD_ALL_MODULES,
    LOGIN,
    RESET_PASSWORD,
    UPDATE_PASSWORD
} from "@/infrastructure/helpers/constant";
import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {AddAccountController} from "@/infrastructure/entry-points/api/controllers/auth/add-account-controller";
import {makeDbAddAccountFactory} from "@/infrastructure/driven-adapters/factories/db-add-account-factory";
import {LoginController} from "@/infrastructure/entry-points/api/controllers/auth/login-controller";
import {makeAuthenticationFactory} from "@/infrastructure/driven-adapters/factories/db-authentication-factory";
import {ResetPasswordController} from "@/infrastructure/entry-points/api/controllers/auth/reset-password-controller";
import {makeDbResetPassword} from "@/infrastructure/driven-adapters/factories/db-reset-password-factory";
import {UpdatePasswordController} from "@/infrastructure/entry-points/api/controllers/auth/update-password-controller";
import {makeDbUpdatePassword} from "@/infrastructure/driven-adapters/factories/db-update-password-factory";
import {AddModuleController} from "@/infrastructure/entry-points/api/controllers/modules/add-module-controller";
import {makeDbAddModuleFactory} from "@/infrastructure/driven-adapters/factories/db-add-module-factory";
import {AssignPermissionsUserController} from "@/infrastructure/entry-points/api/controllers/auth/assign-permissions-user-controller";
import {makeDbAssignPermissionsUserFactory} from "@/infrastructure/driven-adapters/factories/db-assign-permissions-users-factory";
import {LoadAllModulesController} from "@/infrastructure/entry-points/api/controllers/modules/load-all-modules-controller";
import {makeDbLoadAllModulesFactory} from "@/infrastructure/driven-adapters/factories/db-load-all-modules-factory";
import {DeleteModuleController} from "@/infrastructure/entry-points/api/controllers/modules/delete-module-controller";
import {makeDbDeleteModuleFactory} from "@/infrastructure/driven-adapters/factories/db-update-module-factory";
import {LoadUserByIdController} from "@/infrastructure/entry-points/api/controllers/users/load-user-by-id-controller";
import {makeDbLoadUserByIdFactory} from "@/infrastructure/driven-adapters/factories/db-load-user-by-id-factory";

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
            return new AddModuleController(makeDbAddModuleFactory())
        case ASSIGN_MODULES_USER:
            return new AssignPermissionsUserController(makeDbAssignPermissionsUserFactory())
        case LOAD_ALL_MODULES:
            return new LoadAllModulesController(makeDbLoadAllModulesFactory())
        case DELETE_MODULES:
            return new DeleteModuleController(makeDbDeleteModuleFactory())
        case DETAIL_USER:
            return new LoadUserByIdController(makeDbLoadUserByIdFactory())
    }
}
