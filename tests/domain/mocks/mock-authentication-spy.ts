import * as faker from "faker";
import {IUpdateAccessTokenRepository} from "@/domain/models/gateways/update-generic-repository";
import {IAuthenticationRepository} from "@/domain/models/gateways/authentication-repository";
import {ILoadAccountByEmailRepository} from "@/domain/models/gateways/load-generic-by-field-repository";


export class MockLoadUserByEmailRepositorySpy implements ILoadAccountByEmailRepository {
    email: string
    result = {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        password: faker.internet.password()
    }

    async loadAccountByEmailRepository(field: string): Promise<ILoadAccountByEmailRepository.Result> {
        this.email = field
        return this.result
    }
}

export class MockUpdateAccessTokenRepositorySpy implements IUpdateAccessTokenRepository {
    id: string
    token: string

    async updateAccessToken(id: string, token: string): Promise<void> {
        this.id = id
        this.token = token
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