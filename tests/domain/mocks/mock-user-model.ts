import * as faker from "faker";
import {UserModel} from "@/domain/models/user-model";

export const mockUserModel = (): UserModel => ({
    id: faker.datatype.uuid(),
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.random.word(),
    avatar: faker.internet.avatar(),
    createdAt: faker.date.future()
})
