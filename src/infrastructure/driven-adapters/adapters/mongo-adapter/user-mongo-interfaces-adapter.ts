import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {UserModel} from "@/domain/models/user-model";
import {ILoadEntityByFieldRepository} from "@/domain/models/gateways/load-entity-by-field-repository";

export interface IUserMongoInterfacesAdapter extends IAddEntityRepository<UserModel>, ILoadEntityByFieldRepository{

}