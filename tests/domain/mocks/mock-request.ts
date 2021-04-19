import {HttpRequest} from "@/infrastructure/helpers/http";
import faker from "faker";

export const mockRequest = (): HttpRequest => {
    const password = faker.internet.password()
    return {
        body: {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: password,
            avatar: faker.internet.avatar(),
            createdAt: Date.now()
        }
    }
}

export const mockFieldsValidation = (): HttpRequest => {
    return {
        body: {
            name: "",
            email: "",
            password: "",
            avatar: ""
        },
    }
}
