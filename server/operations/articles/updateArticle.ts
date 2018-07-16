import mongoose from 'mongoose'
import Article from '../../models/Article'
import createCommit from '../../operations/commit/createCommit'
import addCommitToArticle from '../../operations/articles/addCommitToArticle'

interface UpdateArticleParams {
  keyword: string
  content: string
  user: mongoose.Types.ObjectId
}

export default async function updateArticle (params: UpdateArticleParams): Promise<Article> {
  const { keyword, content, user } = params

  const baseArticle = await Article.findOne({
    keyword
  }).exec()

  const commit = await createCommit({
    content,
    user,
    article: baseArticle._id,
    parentCommit: baseArticle.headCommit as mongoose.Types.ObjectId
  })

  const article = await addCommitToArticle({
    article: baseArticle,
    commit
  })

  return article
}
