import express = require('express')
import rootRouter = require('../rootRouter')
import configuration = require('../configuration')

const app = express()

app.use(rootRouter)

app.listen(configuration.port)
