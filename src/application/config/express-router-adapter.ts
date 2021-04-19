import {Request, Response} from 'express'
import {HttpRequest} from "@/infrastructure/helpers/http";
import {IController} from "@/infrastructure/entry-points/gateways/controller";

export const adaptRoute = (controller: IController) => {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body,
            params: req.params
        }

        const httpResponse = await controller.handle(httpRequest)

        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            res.status(httpResponse.statusCode).json(httpResponse.body)
        } else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message
            })
        }
    }
}