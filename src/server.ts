import { application } from '.'
import { logger } from './utils'

const port = Number(process.env.PORT) || 3000
const server = application.listen(port, () => {
    logger.info(`Server listening on port ${port}`)
})

export = server