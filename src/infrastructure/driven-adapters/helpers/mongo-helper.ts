import {Collection, MongoClient} from "mongodb";
import {INSERT_DOCUMENT_COLLECTION, LOAD_DOCUMENT_BY_FIELD} from "@/infrastructure/helpers/constant";

export const MongoHelper = {
    client: null as MongoClient,
    uri: null as string,

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

    async loadDocumentByField(value: string, param: string, collection: string): Promise<any> {
        await MongoHelper.mongoQueryCollection(
            LOAD_DOCUMENT_BY_FIELD, collection, param, value
        )
    },

    async insertDocumentCollection(data: any, collection: string): Promise<any> {
        await MongoHelper.mongoQueryCollection(
            INSERT_DOCUMENT_COLLECTION, collection, "", "", data
        )
    },

    map: (data: any): any => {
        const { _id, ...rest } = data
        return Object.assign({}, rest, { id: _id })
    },

    async mongoQueryCollection(
        type: string, collection: string, value?: string, param?: string, data?: any) {

        const collectionResult = await MongoHelper.getCollection(collection)

        switch (type) {
            case LOAD_DOCUMENT_BY_FIELD:
                let objectFilter = {}
                objectFilter[param] = value
                const document = await collectionResult.findOne(objectFilter)
                return document && MongoHelper.map(document)
            case INSERT_DOCUMENT_COLLECTION:
                const result = await collectionResult.insertOne(data)
                return result && MongoHelper.map(result)
        }
    }
}