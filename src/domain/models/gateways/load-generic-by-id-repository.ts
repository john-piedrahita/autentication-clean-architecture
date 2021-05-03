import {RolesUserModel} from "@/domain/models/user-model";

export interface ILoadGenericByIdRepository<T> {
    loadGenericByIdRepository?: (id: string | number) => Promise<RolesUserModel>
}
