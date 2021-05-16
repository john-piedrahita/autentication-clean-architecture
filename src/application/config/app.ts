import express from 'express'
import setupSwagger from '@/application/config/swagger'
import setupRoutes from '@/application/config/routes'
import setupMiddlewares from '@/application/config/middlewares'

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)

export default app
