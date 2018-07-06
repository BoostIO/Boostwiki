import express from 'express'
import rootRouter from './rootRouter'
import apiRouter from './routes/api'
import authRouter from './routes/auth'
import errorHandler from './middlewares/errorHandler'

const router = express.Router()

router.use(rootRouter)
router.use('/api', apiRouter)
router.use('/auth', authRouter)

router.use(errorHandler())

export default router
