import dotenv = require('dotenv')
const dev = process.env.NODE_ENV !== 'production'
const isTest = process.env.NODE_ENV === 'test'

if (dev) {
  if (isTest) {
    dotenv.config({
      path: 'test.env'
    })
  } else {
    dotenv.config()
  }
} else {
  dotenv.config({
    path: 'production.env'
  })
}

export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
  session: {
    secret: process.env.SESSION_SECRET || 'elided',
    redisPort: parseInt(process.env.SESSION_REDIS_PORT, 10) || 6379,
    redisHost: process.env.SESSION_REDIS_HOST || 'localhost',
    redisDB: parseInt(process.env.SESSION_REDIS_DB, 10) || 0
  },
  dbURL: process.env.DB_URL || 'mongodb://localhost',
  github: {
    clientID: process.env.GITHUB_CLIENT_ID || 'elided',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'elided'
  }
}
