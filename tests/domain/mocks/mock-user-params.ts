import faker from "faker";
import {AddUserParams} from "@/domain/models/user-model";

export const mockAddUserParams = (): AddUserParams => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.random.word(),
    avatar: faker.internet.avatar(),
    createdAt: faker.date.future()
})