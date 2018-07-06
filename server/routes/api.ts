import express from 'express'
import { NotFoundError } from '../lib/errors'

const router = express.Router()

router.use(function (req, res, next) {
  const err = new NotFoundError('The api doesn\'t exist.')

  next(err)
})

export default router
