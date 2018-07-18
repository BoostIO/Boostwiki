import express from 'express'
import UnauthorizedError from '../lib/errors/UnauthorizedError'

export default function createRequireAuthHandler (): express.RequestHandler {
  return function requireAuth (req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.user == null) {
      next(new UnauthorizedError())
    } else {
      next()
    }
  }
}
