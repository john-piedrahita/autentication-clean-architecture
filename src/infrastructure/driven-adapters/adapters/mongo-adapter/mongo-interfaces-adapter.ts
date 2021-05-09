import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {ILoadGenericByFieldRepository} from "@/domain/models/gateways/load-generic-by-field-repository";
import {ICheckUserByEmailRepository} from "@/domain/models/gateways/check-user-by-email-repository";
import {IUpdateGenericRepository} from "@/domain/models/gateways/update-generic-repository";
import {IResetPasswordRepository} from "@/domain/models/gateways/reset-password-repository";
import {ILoadGenericByIdRepository} from "@/domain/models/gateways/load-generic-by-id-repository";
import {IAssignPermissionsUsersRepository} from "@/domain/models/gateways/assign-permissions-users-repository";
import {ILoadAccountTokenRepository} from "@/domain/models/gateways/load-account-token-repository";
import {ILoadAllModulesRepository} from "@/domain/models/gateways/load-all-modules-repository";
import {IDeleteModuleRepository} from "@/domain/models/gateways/delete-module-repository";
import {IDeletePermissionsModuleRepository} from "@/domain/models/gateways/delete-permissions-module-repository";

export interface IMongoInterfacesAdapter<T> extends IAddEntityRepository<T>,
    ILoadGenericByFieldRepository<T>, ICheckUserByEmailRepository, IUpdateGenericRepository<T>,
    IResetPasswordRepository, ILoadGenericByIdRepository<T>, IAssignPermissionsUsersRepository,
    ILoadAccountTokenRepository, ILoadAllModulesRepository, IUpdateGenericRepository<T>,
    IDeleteModuleRepository, IDeletePermissionsModuleRepository {
}
