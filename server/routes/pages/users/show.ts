import User from '../../../models/User'
import Commit from '../../../models/Commit'

export default async function (req, res, next) {
  const { uniqueName } = req.query
  const user = await User.findOne({ uniqueName }).exec()

  const articles =
    (await Commit
      .find({ user })
      .populate('article')
      .sort({ createdAt: -1 })
      .exec())
    .map(commit => commit.article)
    .filter((article, index, self) => (
      index === self.findIndex(a => (
        a._id === article._id
      ))
    ))

  res.json({
    user,
    articles
  })
}
