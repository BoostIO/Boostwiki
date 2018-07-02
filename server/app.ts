import dotenv from 'dotenv'
import express from 'express'
import { useStaticRendering } from 'mobx-react'
import next from 'next'
import logger from 'morgan'
import rootRouter from './rootRouter'

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

    expressApp.all(/\/api|\/auth|\/ws|\/files/, (req, res, next) => {
      console.log(req.url, req.path, req.baseUrl)
      // req.url = req.baseUrl + req.url
      // req.path = req.baseUrl + req.path
      // req.baseUrl = '/'
      next()
    }, rootRouter)

    expressApp.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://127.0.0.1:${port}`)
    })
  })