import mongoose from 'mongoose'
import Article from '../../models/Article'
import createCommit from '../commit/createCommit'

interface UpdateArticleParams {
  content: string
  article: Article
  user: mongoose.Types.ObjectId
}

export default async function updateArticle (params: UpdateArticleParams): Promise<Article> {
  const { content, article, user } = params

  const commit = await createCommit({
    content,
    user,
    article: article._id,
    parentCommit: article.headCommit as mongoose.Types.ObjectId
  })

  article.headCommit = commit

  await article.save()

  return article
}
