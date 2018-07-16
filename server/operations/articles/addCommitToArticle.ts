import Article from '../../models/Article'
import Commit from '../../models/Commit'

interface AddCommitToArticleParams {
  article: Article
  commit: Commit
}

export default async function addCommitToArticle (params: AddCommitToArticleParams): Promise<Article> {
  const { article, commit } = params

  article.headCommit = commit

  await article.save()

  return article
}
