import faker from "faker";
import {AddUserParams} from "@/domain/models/user-model";
import {IAuthenticationRepository} from "@/domain/models/gateways/authentication-repository";

export const mockAddUserParams = (): AddUserParams => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.random.word(),
    avatar: faker.internet.avatar(),
    createdAt: faker.date.future()
})

export const mockAuthenticationParams = (): IAuthenticationRepository.Params => ({
    email: faker.internet.email(),
    password: faker.internet.password()
})
