import Commit from '../../models/Commit'
import mongoose = require('mongoose')

interface CreateCommitParams {
  content: string
  user: mongoose.Types.ObjectId
  article: mongoose.Types.ObjectId
}

export default async function createCommit (params: CreateCommitParams): Promise<Commit> {
  const { content, user, article } = params
  const _id = new mongoose.mongo.ObjectId()

  const commit = new Commit({
    _id,
    content,
    user,
    article
  })

  await commit.save()

  return commit
}
