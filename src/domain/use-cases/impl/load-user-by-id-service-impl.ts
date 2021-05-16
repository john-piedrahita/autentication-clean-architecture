import {ILoadGenericByIdService} from "@/domain/use-cases/load-generic-by-id-service";
import {UserModel} from "@/domain/models/user-model";
import {ILoadGenericByIdRepository} from "@/domain/models/gateways/load-generic-by-id-repository";

export class LoadUserByIdServiceImpl implements ILoadGenericByIdService<UserModel>{
    constructor(
        private readonly loadUserByIdRepository: ILoadGenericByIdRepository<UserModel>
    ) {
    }

    async loadByIdService(id: string): Promise<UserModel> {
        const user = await this.loadUserByIdRepository.loadGenericByIdRepository(id)

        if (user) return user
        
        return null
    }
}
