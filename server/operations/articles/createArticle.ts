import mongoose from 'mongoose'
import Article from '../../models/Article'

interface CreateArticleParams {
  keyword: string
}

export default async function createArticle (params: CreateArticleParams): Promise<Article> {
  const { keyword } = params

  const _id = new mongoose.Types.ObjectId()

  const article = new Article({
    _id,
    keyword
  })

  await article.save()

  return article
}
