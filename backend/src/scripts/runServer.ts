import express = require('express')
import rootRouter = require('../rootRouter')

const app = express()

app.use(rootRouter)

app.listen(process.env.BACKEND_PORT)
