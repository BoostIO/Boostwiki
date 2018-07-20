import express from 'express'
import UnauthorizedError from '../lib/errors/UnauthorizedError'

export default function requireAuth (req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.user == null) {
    next(new UnauthorizedError())
  } else {
    next()
  }
}
