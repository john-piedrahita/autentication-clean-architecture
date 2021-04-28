import {UserModel} from "@/domain/models/user-model";
import {IUserMongoInterfacesAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/user-mongo-interfaces-adapter";
import {MongoHelper} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-helper";
import {USERS_COLLECTION} from "@/infrastructure/helpers/constant";
import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {ILoadGenericByFieldRepository} from "@/domain/models/gateways/load-generic-by-field-repository";
import {EMAIL_PARAM} from "@/domain/use-cases/helpers/constants";

export class UserMongoRepositoryAdapter implements IUserMongoInterfacesAdapter {

    /**
     * This function provides us with a generic method to search for an element by any field in a collection.
     * @param field
     * @param value
     * @return ILoadGenericByFieldRepository.Result
     */
    async loadGenericByFieldRepository (field: string, value: string): Promise<ILoadGenericByFieldRepository.Result> {
        return await MongoHelper.loadDocumentByFieldCollection(field, value, USERS_COLLECTION)
    }

    /**
     * This function provides us with a link method to recover the password by sending an email.
     * @param email
     * @return void
     */
    async resetPasswordRepository(email: string): Promise<void> {}

    /**
     * This function provides us with a generic method to insert a document into a collection.
     * @param data
     * @return IAddEntityRepository.Result
     */
    async addEntityRepository(data: UserModel): Promise<IAddEntityRepository.Result> {
        return await MongoHelper.insertDocumentCollection(data, USERS_COLLECTION)
    }

    /**
     * This function provides us with a method to search for an item by email within a collection.
     * @param field
     * @return boolean
     */
    async checkUserRepository(field: string): Promise<boolean> {
        return await MongoHelper.loadDocumentByFieldCollection(field, EMAIL_PARAM, USERS_COLLECTION)
    }

    /**
     * This function provides us with a generic query to update an element of a collection
     * @param id Id to search for the item
     * @param value Value of field
     * @param field Field to update
     * @return void
     */
    async updateGenericRepository(id: string, value: string, field: string): Promise<void> {
        return await MongoHelper.updateDocumentCollection(id, value, field, USERS_COLLECTION)
    }
}