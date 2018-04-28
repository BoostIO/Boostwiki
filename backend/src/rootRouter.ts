import express = require('express')
import apiRouter from './routes'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('root')
})

router.use('/api', apiRouter)

router.get('/ws', (req, res) => {
  res.send('ws')
})

export default router
