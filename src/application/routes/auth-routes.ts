import {Router} from "express";
import {adaptRoute} from "@/application/config/express-router-adapter";
import {makeBaseControllerFactory} from "@/infrastructure/entry-points/api/factories/base-controller-factory";
import {ADD_ACCOUNT, LOGIN, RESET_PASSWORD} from "@/infrastructure/helpers/constant";

export default (router: Router): void => {
    router.post('/account', adaptRoute(makeBaseControllerFactory(ADD_ACCOUNT)))
    router.post("/login", adaptRoute(makeBaseControllerFactory(LOGIN)))
    router.post("/reset-password", adaptRoute(makeBaseControllerFactory(RESET_PASSWORD)))
}