import { RequestHandler, ErrorRequestHandler } from 'express'
import Router from 'express-promise-router'
import passport from '../lib/passport'
import configuration from '../configuration'
import querystring from 'querystring'
import { NotFoundError } from '../lib/errors'

const router = Router()

router.get('/', async (req, res) => {
  if (req.user == null) {
    res.json({})
    return
  }

  res.json({
    currentUser: req.user
  })
})

const signOutHandler: RequestHandler = (req, res, next) => {
  req.session.destroy((err) => {
    if (err == null) {
      res.status(204).send()
    } else {
      next(err)
    }
  })
}

router.delete('/', signOutHandler)
router.get('/signout', signOutHandler)

router.get('/github',
  function storeRedirectionTargetToSession (req, res, next) {
    if (req.query.redirectTo) {
      req.session.redirectTo = req.query.redirectTo
      req.session.save(next)
    } else {
      next()
    }
  },
  passport.authenticate('github')
)

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function redirectAndCleanUpSession (req, res, next) {
    const redirectTo = typeof req.session.redirectTo === 'string'
    ? req.session.redirectTo
    : configuration.baseURL
    req.session.redirectTo = null
    req.session.save(() => {
      res.redirect(redirectTo)
    })
  }
)

router.use('/github/callback', ((error, req, res, next) => {
  console.error(error)
  const query = querystring.stringify({
    authError: 'Something went wrong. Please retry login.'
  })
  res.redirect(`${configuration.baseURL}/?${query}`)
}) as ErrorRequestHandler)

router.use(function (req, res, next) {
  const err = new NotFoundError('The api doesn\'t exist.')

  next(err)
})

export default router
