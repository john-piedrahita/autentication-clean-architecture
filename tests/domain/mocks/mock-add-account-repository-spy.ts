import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {UserModel} from "@/domain/models/user-model";

export class MockAddAccountRepositorySpy implements IAddEntityRepository<UserModel> {
    params: UserModel
    result = true

    async addEntityRepository(data: UserModel): Promise<IAddEntityRepository.Result> {
        this.params = data
        return this.result
    }
}