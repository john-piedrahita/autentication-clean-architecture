import {Collection, MongoClient, ObjectId} from "mongodb";
import {
    INSERT_DOCUMENT_COLLECTION, LOAD_DOCUMENT_BY_FIELD_COLLECTION, UPDATE_DOCUMENT_COLLECTION,
} from "@/infrastructure/helpers/constant";

export const MongoHelper = {
    client: null as MongoClient,
    uri: null as string,
    objectFilter: {},

    async connect(uri: string): Promise<void> {
       this.uri = uri
       this.client = await MongoClient.connect(uri, {
           useNewUrlParser: true,
           useUnifiedTopology: true
       })
    },

    async disconnect(): Promise<void> {
        await this.client.close()
        this.client = null
    },

    async getCollection(name: string): Promise<Collection> {
        if (!this.client?.isConnected()) {
            await this.connect(this.uri)
        }
        return this.client.db().collection(name)
    },

    async loadDocumentByFieldCollection(field: string, value: string, collection: string): Promise<any> {
        return await MongoHelper.mongoQueryCollection(LOAD_DOCUMENT_BY_FIELD_COLLECTION, collection, "", value, field)
    },

    async loadDocumentByIdCollection(value: string | number, collection: string):Promise<any> {
        return await MongoHelper.mongoQueryCollection(
            'LOAD_DOCUMENT_BY_ID', collection, '', value, '', ''
        )
    },

    async insertDocumentCollection(data: any, collection: string): Promise<any> {
        return await MongoHelper.mongoQueryCollection(
            INSERT_DOCUMENT_COLLECTION, collection, "", "", "", data
        )
    },

    async updateDocumentCollection(id: string, value: string, field: string, collection: string): Promise<void> {
        return await MongoHelper.mongoQueryCollection(UPDATE_DOCUMENT_COLLECTION, collection, id, value, field)
    },

    map: (data: any): any => {
        const { _id, ...rest } = data
        return Object.assign({}, rest, { id: _id })
    },

    /**
     * This function provides us with the generic methods to make the queries in a collection.
     * @param type Type of query to perform
     * @param collection Collection in which the query will be carried out
     * @param param Id to search for an item
     * @param value Field value
     * @param field Field name
     * @param data Corresponds to an object
     * @param id
     */
    async mongoQueryCollection(
        type: string,
        collection: string,
        param?: string,
        value?: string | number,
        field?: string,
        data?: any) {

        const collectionResult = await MongoHelper.getCollection(collection)

        switch (type) {
            case LOAD_DOCUMENT_BY_FIELD_COLLECTION:
               return await this.load(field, value, collectionResult)
            case 'LOAD_DOCUMENT_BY_ID':
                return await this.loadById(value, collectionResult)
            case INSERT_DOCUMENT_COLLECTION:
                return await this.insert(data, collectionResult)
            case UPDATE_DOCUMENT_COLLECTION:
                return await this.update(param, value, field, collectionResult)
        }
    },

    /**
     * This function provides us with the generic method to search for an element in a collection by any parameter.
     * @param field
     * @param value
     * @param collectionResult
     */
    async load(field, value, collectionResult) {
        this.objectFilter[field] = value
        const document = await collectionResult.findOne(this.objectFilter)
        return document && MongoHelper.map(document)
    },

    /**
     * This function provides us with the methid to search for an element in collection by id.
     * @param value
     * @param collectionResult
     */
    async loadById(value: string | number, collectionResult) {
        this.objectFilter['_id'] = new ObjectId(value)
        const document = await collectionResult.findOne(this.objectFilter)
        return document && MongoHelper.map(document)
    },

    /**
     * This function provides us with a generic method to insert a document into a collection.
     * @param data
     * @param collectionResult
     */
    async insert(data, collectionResult) {
        const result = await collectionResult.insertOne(data)
        return result.ops[0] !== null
    },

    /**
     * This function provides us with the generic update of a document for any field of the collection.
     * @param param
     * @param value
     * @param field
     * @param collectionResult
     * @param subDocument
     */
    async update(param, value, field, collectionResult, subDocument?: string) {
        let objectFilter = {}; objectFilter[field] = value
        let objectQuery = {}; objectQuery['$set'] = objectFilter

        let objectSubDocument = {}; objectSubDocument[subDocument] = value;
        let objectQuerySubDocument = {}; objectQuerySubDocument['$push'] = objectSubDocument

        return await collectionResult.updateOne({_id: param}, objectQuery ? objectQuery : objectQuerySubDocument)
    }
}
