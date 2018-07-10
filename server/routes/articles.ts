import Router from 'express-promise-router'
import createArticle from '../operations/articles/createArticle'
import updateArticle from '../operations/articles/updateArticle'
import Article from '../models/Article'

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

router.put('/', async (req, res) => {
  const value = req.body
  const { content, keyword } = value
  const user = req.user

  const baseArticle = await Article.findOne({
    keyword
  }).exec()

  const article = await updateArticle({
    content,
    article: baseArticle,
    user: user._id
  })

  res.json({
    article
  })
})

export default router
