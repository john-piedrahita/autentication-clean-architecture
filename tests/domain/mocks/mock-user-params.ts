import faker from "faker";
import {AddUserParams} from "@/domain/models/user-model";
import {IAuthenticationRepository} from "@/domain/models/gateways/authentication-repository";

export const mockAddUserParams = (): AddUserParams => ({
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.random.word(),
    linkReset: faker.random.word(),
    avatar: faker.internet.avatar(),
    role: faker.random.word(),
    permissions: [
        {
            id: faker.datatype.uuid(),
            name: faker.random.word(),
            module: faker.random.word(),
            moduleId: faker.datatype.uuid(),
            permission: [
                {
                    action: faker.datatype.uuid()
                }
            ]
        }
    ],
    createdAt: faker.date.future()
})

export const mockAuthenticationParams = (): IAuthenticationRepository.Params => ({
    email: faker.internet.email(),
    password: faker.internet.password()
})
