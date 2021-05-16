import * as faker from "faker";
import {IUpdateGenericRepository} from "@/domain/models/gateways/update-generic-repository";
import {IAuthenticationRepository} from "@/domain/models/gateways/authentication-repository";
import {
    ILoadGenericByFieldRepository
} from "@/domain/models/gateways/load-generic-by-field-repository";
import {UserModel} from "@/domain/models/user-model";


export class MockLoadUserByEmailRepositorySpy implements ILoadGenericByFieldRepository<UserModel> {
    email: string
    result = {
        id: faker.datatype.uuid(),
        fullName: faker.name.findName(),
        password: faker.internet.password()
    }

    async loadGenericByFieldRepository(field: string, value: string): Promise<UserModel> {
        this.email = value
        return this.result
    }
}

export class MockUpdateAccessTokenRepositorySpy implements IUpdateGenericRepository<UserModel> {
    id: string | number
    token: string

    async updateGenericRepository(id: string | number, value: string, field: string | undefined): Promise<void> {
        this.id = id
        this.token = value
    }


}

export class MockAuthenticationSpy implements IAuthenticationRepository {
    params: IAuthenticationRepository.Params
    result = {
      accessToken: faker.datatype.uuid(),
      name: faker.name.findName()
    }

    async auth(data: IAuthenticationRepository.Params): Promise<IAuthenticationRepository.Result> {
        this.params = data
        return this.result
    }
}
