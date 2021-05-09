import {Router} from "express";
import {adaptRoute} from "@/application/config/express-router-adapter";
import {makeBaseControllerFactory} from "@/infrastructure/entry-points/api/factories/base-controller-factory";
import {
    ADD_ACCOUNT, ADD_MODULE, ASSIGN_MODULES_USER, DELETE_MODULES, LOAD_ALL_MODULES,
    LOGIN, RESET_PASSWORD, UPDATE_PASSWORD
} from "@/infrastructure/helpers/constant";
import {auth} from "@/application/factories/auth-factory";
import {
    assignModulePermissions,
    createModulePermissions,
    readModulePermissions
} from "@/application/middlewares/modules/module-permission-role";

export default (router: Router): void => {
    router.post('/account', adaptRoute(makeBaseControllerFactory(ADD_ACCOUNT)))
    router.post("/login", adaptRoute(makeBaseControllerFactory(LOGIN)))
    router.post("/forgot-password", adaptRoute(makeBaseControllerFactory(RESET_PASSWORD)))
    router.put("/reset-password/:token", adaptRoute(makeBaseControllerFactory(UPDATE_PASSWORD)))

    /**
     * This route provides us with the functionality to read modules
     * @param auth Verify that the token is valid
     * @param readModulePermissions Validate that the user who ids going to perform this action has permission to read modules
     */
    router.get('/modules', auth, readModulePermissions,  adaptRoute(makeBaseControllerFactory(LOAD_ALL_MODULES)))

    /**
     * This route provides us with the functionality to create modules that will then be assigned to users.
     * @param auth Verify that the token is valid.
     * @param createRole Validate that the user who is going to perform this action has permission to create modules.
     */
    router.post("/modules", auth, adaptRoute(makeBaseControllerFactory(ADD_MODULE)))

    /**
     * This route provides us with the functionality to assign modules to users.
     * @param auth Verify that the token is valid.
     * @param assignRole Validate that the user who is going to perform this action has the permission to assign modules.
     */
    router.put("/assign-modules/:userId", auth, adaptRoute(makeBaseControllerFactory(ASSIGN_MODULES_USER)))

    /**
     * This route provides us with the functionality to remove modules.
     * @param auth Verify that the token is valid.
     * @param deleteModulePermissions Validate that the user who is going to perform this action has the permission to remove modules.
     */
    router.delete('/modules/:moduleId', auth, adaptRoute(makeBaseControllerFactory(DELETE_MODULES)))
}
