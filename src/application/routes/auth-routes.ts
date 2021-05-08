import {Router} from "express";
import {adaptRoute} from "@/application/config/express-router-adapter";
import {makeBaseControllerFactory} from "@/infrastructure/entry-points/api/factories/base-controller-factory";
import { ADD_ACCOUNT, ADD_MODULE, ASSIGN_MODULES_USER,
    LOGIN, RESET_PASSWORD, UPDATE_PASSWORD
} from "@/infrastructure/helpers/constant";
import {auth} from "@/application/factories/auth-factory";
import {assignModulePermissions, createModulePermissions} from "@/application/middlewares/modules/module-permission-role";

export default (router: Router): void => {
    router.post('/account', adaptRoute(makeBaseControllerFactory(ADD_ACCOUNT)))
    router.post("/login", adaptRoute(makeBaseControllerFactory(LOGIN)))
    router.post("/forgot-password", adaptRoute(makeBaseControllerFactory(RESET_PASSWORD)))
    router.put("/reset-password/:token", adaptRoute(makeBaseControllerFactory(UPDATE_PASSWORD)))

    /**
     * This route provides us with the functionality to create roles that will then be assigned to users.
     * @param auth Verify that the token is valid.
     * @param createRole Validate that the user who is going to perform this action has permission to create roles.
     */
    router.post("/modules", auth, createModulePermissions, adaptRoute(makeBaseControllerFactory(ADD_MODULE)))

    /**
     * This route provides us with the functionality to assign roles to users.
     * @param auth Verify that the token is valid.
     * @param assignRole Validate that the user who is going to perform this action has the permission to assign roles.
     */
    router.put("/assign-modules/:userId", auth, assignModulePermissions, adaptRoute(makeBaseControllerFactory(ASSIGN_MODULES_USER)))
}
