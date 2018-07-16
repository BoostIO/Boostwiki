import Router from 'express-promise-router'
import pushNewArticle from '../operations/articles/pushNewArticle'
import updateArticle from '../operations/articles/updateArticle'
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

router.post('/', async (req, res) => {
  const { error, value } = Joi.validate<ArticleSchema>(req.body, articleSchemea)
  if (error) throw error

  const { keyword, content } = value
  const user = req.user

  const article = await pushNewArticle({
    keyword,
    content,
    user: user._id
  })

  res.json({
    article
  })
})

router.put('/', async (req, res) => {
  const { error, value } = Joi.validate<ArticleSchema>(req.body, articleSchemea)
  if (error) throw error

  const { keyword, content } = value
  const user = req.user

  const article = updateArticle({
    keyword,
    content,
    user: user._id
  })

  res.json({
    article
  })
})

export default router
