import express from 'express'
import setupRoutes from '@/application/config/routes'
import setupMiddlewares from '@/application/config/middlewares'

const app = express()
setupMiddlewares(app)
setupRoutes(app)

export default app