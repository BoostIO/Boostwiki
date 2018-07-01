import express from 'express'

interface HTTPError extends Error {
  code?: number
  status?: number
  isJoi?: boolean
}

export default function createErrorHandler (): express.ErrorRequestHandler {
  return function errorHandler (error: HTTPError, req: express.Request, res: express.Response, next: express.NextFunction) {

    const status = error.status
      ? error.status
      : (error.name === 'ValidationError' || error.isJoi)
      ? 422
      : 500

    if (error.status === 500) {
      console.error(error, error.code, error.name)
    }

    res.status(status)
    res.json({
      message: error.message
    })
  }
}
