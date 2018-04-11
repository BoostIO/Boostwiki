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
  port: process.env.PORT || 3001,
  baseURL: process.env.BASE_URL || 'http://localhost:3001',
  webURL: process.env.WEB_URL || 'http://localhost:3000',
  session: {
    secret: process.env.SESSION_SECRET || 'elided',
    redisPort: parseInt(process.env.SESSION_REDIS_PORT, 10) || 6379,
    redisHost: process.env.SESSION_REDIS_HOST || 'localhost',
    redisDB: parseInt(process.env.SESSION_REDIS_DB, 10) || 0
  },
  ws: {
    redisPort: parseInt(process.env.WS_REDIS_PORT, 10) || 6379,
    redisHost: process.env.WS_REDIS_HOST || 'localhost'
  },
  dbURL: process.env.DB_URL || 'mongodb://localhost',
  cache: {
    redisPort: parseInt(process.env.CACHE_REDIS_PORT, 10) || 6379,
    redisHost: process.env.CACHE_REDIS_HOST || 'localhost',
    redisDB: parseInt(process.env.CACHE_REDIS_DB, 10) || 1
  },
  github: {
    clientID: process.env.GITHUB_CLIENT_ID || 'elided',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'elided'
  },
  s3: {
    bucket: process.env.S3_BUCKET || 'elided',
    region: process.env.S3_REGION || 'elided',
    accessKey: process.env.S3_ACCESS_KEY || 'elided',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'elided'
  },
  adminPassword: process.env.ADMIN_PASSWORD || 'elided'
}
