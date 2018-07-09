import Router from 'express-promise-router'
import ArticleShowHandler from './articles/show'
import ArticleEditHandler from './articles/edit'

const router = Router()

router.get('/articles/show', ArticleShowHandler)
router.get('/articles/edit', ArticleEditHandler)

export default router
