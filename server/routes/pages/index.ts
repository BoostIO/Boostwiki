import Router from 'express-promise-router'
import ArticleShowHandler from './articles/show'

const router = Router()

router.get('/articles/show', ArticleShowHandler)

export default router
