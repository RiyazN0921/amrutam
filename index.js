require('dotenv').config()

const express = require('express')

const bodyParser = require('body-parser')

const { dbConnection } = require('./src/config/db.config')

const { logMiddleware } = require('./src/middleware/logger.middleware')

const logger = require('./src/winston/logger')

const cors = require('cors')

const chalk = require('chalk')

const { errorHandler } = require('./src/middleware/error.middleware')

const app = express()

app.use(bodyParser.json())

app.use(logMiddleware)

app.use(cors())

app.use('/api', require('./src/routes/index.routes'))

app.use(errorHandler)

logger.info(
  `${chalk.bold.blueBright(
    'Express application running in',
  )} ${chalk.black.bold.bgCyan(process.env.NODE_ENV)} environment`,
)

app.listen(process.env.PORT, async () => {
  await dbConnection()
  logger.info(
    `${chalk.bold.blueBright(
      'Server started at port',
    )}: ${chalk.bold.blueBright(
      process.env.PORT,
    )}, in ${chalk.black.bgGreenBright(` ${process.env.NODE_ENV} `)} mode`,
  )
})
