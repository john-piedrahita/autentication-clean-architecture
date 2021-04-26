import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {UserModel} from "@/domain/models/user-model";
import {ILoadAccountByEmailRepository} from "@/domain/models/gateways/load-account-by-email-repository";
import {ICheckUserByEmailRepository} from "@/domain/models/gateways/check-user-by-email-repository";
import {IUpdateAccessTokenRepository} from "@/domain/models/gateways/update-access-token-repository";
import {ILoadAccountByTokenRepository} from "@/domain/models/gateways/load-account-by-token-repository";
import {IResetPasswordRepository} from "@/domain/models/gateways/reset-password-repository";

export interface IUserMongoInterfacesAdapter extends IAddEntityRepository<UserModel>,
    ILoadAccountByEmailRepository, ICheckUserByEmailRepository, IUpdateAccessTokenRepository,
    ILoadAccountByTokenRepository, IResetPasswordRepository {
}