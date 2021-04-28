import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {UserModel} from "@/domain/models/user-model";
import {ILoadGenericByFieldRepository} from "@/domain/models/gateways/load-generic-by-field-repository";
import {ICheckUserByEmailRepository} from "@/domain/models/gateways/check-user-by-email-repository";
import {IUpdateGenericRepository} from "@/domain/models/gateways/update-generic-repository";
import {IResetPasswordRepository} from "@/domain/models/gateways/reset-password-repository";

export interface IUserMongoInterfacesAdapter extends IAddEntityRepository<UserModel>,
    ILoadGenericByFieldRepository, ICheckUserByEmailRepository, IUpdateGenericRepository,
    IResetPasswordRepository {
}