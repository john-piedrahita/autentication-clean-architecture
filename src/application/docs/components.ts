import { bearerAuthSchema } from './schemas/'
import {
    badRequest, unprocessableEntity, serverError, unauthorized, forbidden
} from './components/'

export default {
    securitySchemes: {
        bearerAuth: bearerAuthSchema
    },
    badRequest, unprocessableEntity, serverError, unauthorized, forbidden
}
