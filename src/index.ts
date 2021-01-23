import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Server } from 'typescript-rest'
import morgan from 'morgan'
import * as swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'
import { httpErrorHandler } from './utils'

import './rooms-crawler'

const app: express.Application = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
Server.buildServices(app)

app.use(httpErrorHandler)

export const application = app