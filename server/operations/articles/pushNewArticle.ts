import Article from '../../models/Article'
import mongoose from 'mongoose'
import createArticle from '../../operations/articles/createArticle'
import createCommit from '../../operations/commit/createCommit'
import addCommitToArticle from '../../operations/articles/addCommitToArticle'

interface PushNewArticleParams {
  keyword: string
  content: string
  user: mongoose.Types.ObjectId
}

export default async function pushNewArticle (params: PushNewArticleParams): Promise<Article> {
  const { keyword, content, user } = params

  const baseArticle = await createArticle({
    keyword
  })

  const commit = await createCommit({
    content,
    user,
    article: baseArticle._id
  })

  const article = await addCommitToArticle({
    article: baseArticle,
    commit
  })

  return article
}
