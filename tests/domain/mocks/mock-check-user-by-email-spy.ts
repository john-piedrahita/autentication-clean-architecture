import {ILoadEntityByFieldRepository} from "@/domain/models/gateways/load-entity-by-field-repository";

export class MockCheckUserByEmailSpy implements ILoadEntityByFieldRepository {
    email: string
    result = false

    async loadEntityByFieldRepository(field: string): Promise<boolean> {
        this.email = field
        return this.result
    }
}