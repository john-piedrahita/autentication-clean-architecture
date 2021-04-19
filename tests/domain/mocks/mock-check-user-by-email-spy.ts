import {ICheckUserByEmailRepository} from "@/domain/models/gateways/check-user-by-email-repository";

export class MockCheckUserByEmailSpy implements ICheckUserByEmailRepository {
    email: string
    result = false

    async checkUserRepository(field: string): Promise<boolean> {
        this.email = field
        return this.result
    }
}