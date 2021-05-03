import {Router} from "express";
import {adaptRoute} from "@/application/config/express-router-adapter";
import {makeBaseControllerFactory} from "@/infrastructure/entry-points/api/factories/base-controller-factory";
import {ADD_ACCOUNT, ADD_ROLES, LOGIN, RESET_PASSWORD, UPDATE_PASSWORD} from "@/infrastructure/helpers/constant";

export default (router: Router): void => {
    router.post('/account', adaptRoute(makeBaseControllerFactory(ADD_ACCOUNT)))
    router.post("/login", adaptRoute(makeBaseControllerFactory(LOGIN)))
    router.post("/forgot-password", adaptRoute(makeBaseControllerFactory(RESET_PASSWORD)))
    router.put("/reset-password/:token", adaptRoute(makeBaseControllerFactory(UPDATE_PASSWORD)))

    router.post("/roles", adaptRoute(makeBaseControllerFactory(ADD_ROLES)))
}