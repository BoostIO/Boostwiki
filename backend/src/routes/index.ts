import express from 'express'
import authRouter from './auth'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from '../lib/passport'
import createRedisStore from 'connect-redis'
import configuration from '../configuration'
import { NotFoundError } from '../lib/errors'
import errorHandler from '../middlewares/errorHandler'

const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: false
}))

const RedisStore = createRedisStore(session)
router.use(session({
  secret: configuration.session.secret,
  store: new RedisStore({
    host: configuration.session.redisHost,
    port: configuration.session.redisPort,
    ttl: 24 * 60 * 60,
    db: configuration.session.redisDB
  }),
  resave: false,
  saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())

router.use('/auth', authRouter)

router.use(function (req, res, next) {
  const err = new NotFoundError('The api doesn\'t exist.')

  next(err)
})

router.use(errorHandler())

export default router
