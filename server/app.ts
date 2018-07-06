import dotenv from 'dotenv'
import express from 'express'
import { useStaticRendering } from 'mobx-react'
import next from 'next'
import logger from 'morgan'
import rootRouter from './rootRouter'
import apiRouter from './routes/api'
import authRouter from './routes/auth'
import { NotFoundError } from './lib/errors'
import errorHandler from './middlewares/errorHandler'

const dev = process.env.NODE_ENV !== 'production'

if (dev) {
  dotenv.config()
} else {
  dotenv.config({
    path: 'production.env'
  })
}

useStaticRendering(true)

const nextApp = next({
  dev
})
const handle = nextApp.getRequestHandler()

const port = process.env.PORT || 3000

nextApp.prepare()
  .then(() => {
    const expressApp = express()
    let server = expressApp

    expressApp.use(logger(dev
      ? 'dev'
      : 'common'
    ))

    expressApp.use(rootRouter)
    expressApp.use('/api', apiRouter)
    expressApp.use('/auth', authRouter)

    expressApp.get('*', (req, res) => {
      return handle(req, res)
    })

    expressApp.use(function (req, res, next) {
      const err = new NotFoundError('The api doesn\'t exist.')

      next(err)
    })

    expressApp.use(errorHandler())

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://127.0.0.1:${port}`)
    })
  })
