import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {UserModel} from "@/domain/models/user-model";
import {mockUserModel} from "./mock-user-model";

export class MockAddAccountRepositorySpy implements IAddEntityRepository<UserModel> {
    params: UserModel
    userModel = mockUserModel()

    async addEntityRepository(data: UserModel): Promise<UserModel> {
        this.params = data
        return this.userModel
    }
}