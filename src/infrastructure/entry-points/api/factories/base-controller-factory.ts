import {ADD_ACCOUNT} from "@/infrastructure/helpers/constant";
import {IController} from "@/infrastructure/entry-points/gateways/controller";
import {AddAccountController} from "@/infrastructure/entry-points/api/controllers/add-account-controller";
import {makeDbAddAccountFactory} from "@/infrastructure/driven-adapters/factories/db-add-account-factory";

export const makeBaseControllerFactory = (type: string): IController => {
    switch (type) {
        case ADD_ACCOUNT:
            return new AddAccountController(makeDbAddAccountFactory())
    }
}