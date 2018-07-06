import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from './lib/passport'
import createRedisStore from 'connect-redis'
import configuration from './configuration'

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

export default router
