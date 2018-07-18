import express from 'express'
import configuration from './configuration'
import rootRouter from './rootRouter'
import apiRouter from './routes/api'
import authRouter from './routes/auth'
import testRouter from './routes/test'
import errorHandler from './middlewares/errorHandler'

const router = express.Router()

router.use(rootRouter)
router.use('/api', apiRouter)
router.use('/auth', authRouter)

if (configuration.nodeEnv === 'test') {
  router.use('/test', testRouter)
}

router.use(errorHandler())

export default router
