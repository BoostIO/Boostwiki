import Article from '../../../models/Article'

export default async function (req, res, next) {
  const { keyword } = req.query
  const article = await Article.findOne({ keyword })
    .populate('headCommit').exec()

  if (article == null) {
    res.json({})
    return
  }
  res.json({
    article
  })
}
