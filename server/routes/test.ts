import Router from 'express-promise-router'
import User from '../models/User'

const router = Router()

router.get('/signin/:userId', async (req, res) => {
  const { userId } = req.params
  const user = await User.findById(userId)
  req.login(user, () => {
    res.json({
      user
    })
  })
})

export default router
