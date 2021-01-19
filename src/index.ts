import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Server } from 'typescript-rest'
import morgan from 'morgan'
import { logger } from './utils'

import './rooms-crawler'

const app: express.Application = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined'))

Server.buildServices(app)

const port = Number(process.env.PORT) || 3000
app.listen(port, () => {
    logger.info(`Server listening on port ${port}`)
})