import Router from 'express-promise-router'
import createArticle from '../operations/articles/createArticle'

const router = Router()

router.post('/', async (req, res) => {
  const value = req.body
  const { keyword, content } = value
  const user = req.user

  const article = await createArticle({
    keyword,
    content,
    user: user._id
  })

  res.json({
    article
  })
})

export default router
