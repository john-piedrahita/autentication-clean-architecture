import {Express} from "express";
import cors from 'cors'
import {bodyParser} from "@/application/middlewares/body-parser";
import {contentType} from "@/application/middlewares/content-type";

export default (app: Express): void => {
    app.use(bodyParser)
    app.use(contentType)
    app.use(cors())
}
