import {IAddEntityService} from "@/domain/use-cases/add-entity-service";
import {AddUserParams} from "@/domain/models/user-model";
import {mockUserModel} from "@/tests/domain/mocks/mock-user-model";


export class MockUserSpy implements IAddEntityService<AddUserParams> {
    params: AddUserParams
    accountModel = mockUserModel()

    async addEntityService(data: AddUserParams): Promise<boolean | AddUserParams> {
        this.params = data
        return this.accountModel
    }
}