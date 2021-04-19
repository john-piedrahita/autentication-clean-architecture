import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {UserModel} from "@/domain/models/user-model";
import {ILoadAccountByEmailRepository} from "@/domain/models/gateways/load-account-by-email-repository";
import {ICheckUserByEmailRepository} from "@/domain/models/gateways/check-user-by-email-repository";

export interface IUserMongoInterfacesAdapter extends IAddEntityRepository<UserModel>,
    ILoadAccountByEmailRepository, ICheckUserByEmailRepository {
}