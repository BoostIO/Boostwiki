import express from 'express'
import rootRouter from '../rootRouter'

const app = express()

app.use(rootRouter)

app.listen(process.env.BACKEND_PORT)
