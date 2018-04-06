import express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('root')
})

router.get('/api', (req, res) => {
  res.send('api')
})

router.get('/auth', (req, res) => {
  res.send('auth')
})

router.get('/ws', (req, res) => {
  res.send('ws')
})

export = router
