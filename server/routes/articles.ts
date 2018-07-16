import Router from 'express-promise-router'
import mongoose from 'mongoose'
import createArticle from '../operations/articles/createArticle'
import createCommit from '../operations/commit/createCommit'
import addCommitToArticle from '../operations/articles/addCommitToArticle'
import Article from '../models/Article'
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

  const newArticle = await createArticle({
    keyword
  })

  const commit = await createCommit({
    content,
    user: user._id,
    article: newArticle._id
  })

  const article = await addCommitToArticle({
    article: newArticle,
    commit
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

  const baseArticle = await Article.findOne({
    keyword
  }).exec()

  const commit = await createCommit({
    content,
    user: user._id,
    article: baseArticle._id,
    parentCommit: baseArticle.headCommit as mongoose.Types.ObjectId
  })

  const article = await addCommitToArticle({
    article: baseArticle,
    commit
  })

  res.json({
    article
  })
})

export default router
