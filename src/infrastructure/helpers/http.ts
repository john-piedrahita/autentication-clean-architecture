import {ServerError} from "@/infrastructure/helpers/errors";
import {PAGE_NOT_FOUND} from "@/infrastructure/helpers/constant";

export type HttpResponse = {
    statusCode: number
    body: any
}

export type HttpRequest = {
    body?: any
    headers?: any
    params?: any
}

export const ok = (data: any) => statusCodeAction(200, "", data)
export const notFound = () => statusCodeAction(404)
export const unprocessableEntity = (error: any) => statusCodeAction(422, error)
export const serverError = (error: Error)  => statusCodeAction(500, error)


function statusCodeAction (status: number, error?: any, data?: any): HttpResponse {
    switch (status) {
        case 200:
            return { statusCode: 200, body: data }
        case 404:
            return { statusCode: 404, body: { "message" : PAGE_NOT_FOUND } }
        case 422:
            return { statusCode: 422, body: { "message" : error } }
        case 500:
            return { statusCode: 500, body: new ServerError(error.stack) }
    }
}