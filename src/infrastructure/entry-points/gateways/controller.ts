import {HttpRequest, HttpResponse} from "@/infrastructure/helpers/http";

export interface IController {
    handle: (request: HttpRequest) => Promise<HttpResponse>
}