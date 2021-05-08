import {AddUserParams} from "@/domain/models/user-model";
import {IMongoInterfacesAdapter} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-interfaces-adapter";
import {MongoHelper} from "@/infrastructure/driven-adapters/adapters/mongo-adapter/mongo-helper";
import {USERS_COLLECTION} from "@/infrastructure/helpers/constant";
import {IAddEntityRepository} from "@/domain/models/gateways/add-entity-repository";
import {ILoadGenericByFieldRepository} from "@/domain/models/gateways/load-generic-by-field-repository";
import {EMAIL_PARAM} from "@/domain/use-cases/helpers/constants";
import {ILoadAccountTokenRepository} from "@/domain/models/gateways/load-account-token-repository";
import {ObjectId} from "mongodb";

export class UserMongoRepositoryAdapter implements IMongoInterfacesAdapter<AddUserParams> {

    /**
     * This function provides us with a generic method to search for an element by any field in a collection.
     * @param field
     * @param value
     * @return ILoadGenericByFieldRepository.Result
     */
    async loadGenericByFieldRepository(field: string | undefined, value: string): Promise<AddUserParams> {
        return await MongoHelper.loadDocumentByFieldCollection(field, value, USERS_COLLECTION)
    }

    /**
     * This function provides us with a link method to recover the password by sending an email.
     * @param email
     * @return void
     */
    async resetPasswordRepository(email: string): Promise<void> {
    }

    /**
     * This function provides us with a generic method to insert a document into a collection.
     * @param data
     * @param collection
     * @return IAddEntityRepository.Result
     */
    async addEntityRepository(data: AddUserParams, collection: string): Promise<IAddEntityRepository.Result> {
        return await MongoHelper.insertDocumentCollection(data, collection)
    }

    /**
     * This function provides us with a method to search for an item by email within a collection.
     * @param value
     * @return boolean
     */
    async checkUserRepository(value: string): Promise<boolean> {
        return await MongoHelper.loadDocumentByFieldCollection(EMAIL_PARAM, value, USERS_COLLECTION)
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

    /**
     * This function provides us with a generic query to update on sub document of a collection
     * @param userId
     * @param roles
     * @param args
     */
    async assignRolesRepository(userId: string, roles: [], args): Promise<void> {
        return await MongoHelper.insertSubDocumentCollection(userId, roles, args, USERS_COLLECTION)
    }

    /**
     * This function provides us with a generic method to search for an element by id in a collection.
     * @param id
     */
    async loadGenericByIdRepository(id: string | number): Promise<AddUserParams> {
        return await MongoHelper.loadDocumentByIdCollection(id, USERS_COLLECTION)
    }

    /**
     *
     * @param token
     */
    async loadTokenRepository(token: string): Promise<ILoadAccountTokenRepository.Result> {
        return await MongoHelper.loadDocumentByIdCollection(token, USERS_COLLECTION)
    }

    /**
     *
     * @param roleId
     * @param userId
     */
    async deleteRolesRepository(roleId: string | number, userId: string | number): Promise<void> {
        return await MongoHelper.deleteSubDocumentCollection(userId, roleId, 'roles', USERS_COLLECTION)
    }
}
