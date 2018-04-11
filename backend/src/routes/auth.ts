import { ErrorRequestHandler } from 'express'
import Router from 'express-promise-router'
import passport from '../lib/passport'
import configuration from '../configuration'
import querystring from 'querystring'

const router = Router()

router.get('/', async (req, res) => {
  if (req.user == null) {
    res.json({})
    return
  }

  res.json({
    user: req.user
  })
})

router.delete('/', (req, res, next) => {
  req.session.destroy((err) => {
    if (err == null) {
      res.status(204).send()
    } else {
      next(err)
    }
  })
})

router.get('/github',
  // Set redirectTo to session if given
  (req, res, next) => {
    if (req.query.redirectTo) {
      req.session.redirectTo = req.query.redirectTo
      req.session.save(next)
    } else {
      next()
    }
  },
  passport.authenticate('github')
)

// Authenticate
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  // Redirect to session.redirectTo and flush it
  (req, res, next) => {
    const redirectTo = typeof req.session.redirectTo === 'string'
    ? req.session.redirectTo
    : configuration.webURL
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
  res.redirect(`${configuration.webURL}/?${query}`)
}) as ErrorRequestHandler)

export default router
