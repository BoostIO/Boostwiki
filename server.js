const dotenv = require('dotenv')
const dev = process.env.NODE_ENV !== 'production'

if (dev) {
  dotenv.config()
} else {
  dotenv.config({
    path: 'production.env'
  })
}

const express = require('express')
const next = require('next')
const path = require('path')

const nextApp = next({
  dev,
  dir: path.join(__dirname, 'frontend')
})
const handle = nextApp.getRequestHandler()
const logger = require('morgan')

const port = process.env.PORT

nextApp.prepare()
  .then(() => {
    const expressApp = express()
    let server = expressApp

    expressApp.use(logger(dev
      ? 'dev'
      : 'common'
    ))

    if (dev) {
      const proxy = require('http-proxy-middleware')
      expressApp.use('/api', proxy('http://127.0.0.1:3001'))
      expressApp.use('/auth', proxy('http://127.0.0.1:3001'))
      expressApp.use('/files', proxy('http://127.0.0.1:3001'))
    }


    expressApp.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://127.0.0.1:${port}`)
    })
  })
