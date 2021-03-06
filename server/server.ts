import dotenv from 'dotenv'
import express from 'express'
import { useStaticRendering } from 'mobx-react'
import next from 'next'
import logger from 'morgan'
import appRouter from './appRouter'

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

    expressApp.use(appRouter)

    expressApp.get('/w/:keyword', (req, res) => {
      nextApp.render(req, res, '/articles/show', Object.assign(req.params, req.query))
    })

    expressApp.get('/w/:keyword/edit', (req, res) => {
      nextApp.render(req, res, '/articles/edit', Object.assign(req.params, req.query))
    })

    expressApp.get('/users/:uniqueName', (req, res) => {
      nextApp.render(req, res, '/users/show', Object.assign(req.params, req.query))
    })

    expressApp.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://127.0.0.1:${port}`)
    })
  })
  .catch(error => {
    console.error(error)
  })
