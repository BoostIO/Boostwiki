import User from '../../../models/User'
import Commit from '../../../models/Commit'

export default async function (req, res, next) {
  const { uniqueName } = req.query
  const user = await User.findOne({ uniqueName }).exec()

  const commits = await Commit
    .find({ user })
    .populate('article')
    .sort({ createdAt: -1 })
    .exec()

  res.json({
    user,
    commits
  })
}
