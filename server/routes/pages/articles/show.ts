import Article from '../../../models/Article'
import Commit from '../../../models/Commit'

export default async function (req, res, next) {
  const { keyword } = req.query
  const article = await Article.findOne({ keyword })
    .populate('headCommit').exec()

  if (article == null) {
    res.json({})
    return
  }

  const {
    content,
    createdAt,
    user
  } = article.headCommit as Commit

  res.json({
    content,
    createdAt,
    user
  })
}
