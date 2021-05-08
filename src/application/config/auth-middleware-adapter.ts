import {IMiddleware} from "@/infrastructure/entry-points/gateways/middleware";
import {NextFunction, Request, Response} from "express";

export const authMiddlewareAdapter = (middleware: IMiddleware<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.headers.authorization) {
                return res.json({message: "No token provided"})
            }

            let accessToken: string = req.headers.authorization.split(" ")[1]

            const request = {
                accessToken: accessToken,
                ...(req.headers || {})
            }

            const httpResponse = await middleware.handle(request)

            if (httpResponse.statusCode === 200) {
                Object.assign(req, httpResponse.body)
                next()
            } else {
                res.status(httpResponse.statusCode).json({error: httpResponse.body.message})
            }
        } catch (e) {
            return res.status(401).json({message: 'Unauthorized'})
        }
    }
}
