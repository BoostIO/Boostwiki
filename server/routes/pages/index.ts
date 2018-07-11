import Router from 'express-promise-router'
import Article from '../../models/Article'
import ArticleShowHandler from './articles/show'
import ArticleEditHandler from './articles/edit'

const router = Router()

router.get('/articles/show', ArticleShowHandler)
router.get('/articles/edit', ArticleEditHandler)

router.get('/', async (req, res) => {
  const articles = await Article
    .find({})
    .limit(20)
    .sort({ createdAt: -1 })
    .exec()

  res.json({
    articles
  })
})

export default router
