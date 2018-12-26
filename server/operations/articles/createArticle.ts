import mongoose from 'mongoose'
import Article from '../../models/Article'
import createCommit from '../commit/createCommit'

interface CreateArticleParams {
  keyword: string
  content: string
  user: mongoose.Types.ObjectId
}

export default async function createArticle (params: CreateArticleParams): Promise<Article> {
  const { keyword, content, user } = params
  const _id = new mongoose.Types.ObjectId()

  const article = new Article({
    _id,
    keyword
  })

  const headCommit = await createCommit({
    content,
    user,
    article: article._id
  })

  article.headCommit = headCommit

  await article.save()

  return article
}
