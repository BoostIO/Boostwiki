import Router from 'express-promise-router'
import createArticle from '../operations/articles/createArticle'
import updateArticle from '../operations/articles/updateArticle'
import Article from '../models/Article'
import requireAuth from '../middlewares/requireAuth'
import Joi from 'joi'

const router = Router()

const articleSchemea = Joi.object().keys({
  keyword: Joi.string(),
  content: Joi.string()
})

interface ArticleSchema {
  keyword: string
  content: string
}

router.post('/', requireAuth(), async (req, res) => {
  const { error, value } = Joi.validate<ArticleSchema>(req.body, articleSchemea)
  if (error) throw error

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

router.put('/', requireAuth(), async (req, res) => {
  const { error, value } = Joi.validate<ArticleSchema>(req.body, articleSchemea)
  if (error) throw error

  const { keyword, content } = value
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
