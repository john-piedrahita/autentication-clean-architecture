import {HttpResponse} from "@/infrastructure/helpers/http";

export interface IMiddleware<T> {
    handle: (HttpRequest: T) => Promise<HttpResponse>
}
