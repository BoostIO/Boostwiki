import express from 'express'
import { NotFoundError } from '../lib/errors'
import pagesRouter from './pages'
import articlesRouter from './articles'

const router = express.Router()

router.use('/pages', pagesRouter)
router.use('/articles', articlesRouter)

router.use(function (req, res, next) {
  const err = new NotFoundError('The api doesn\'t exist.')

  next(err)
})

export default router
