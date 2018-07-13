import Commit from '../../models/Commit'
import mongoose from 'mongoose'
import resolveCommit from '../../operations/commit/resolveCommit'

interface CreateCommitParams {
  content: string
  user: mongoose.Types.ObjectId
  article: mongoose.Types.ObjectId
  parentCommit?: mongoose.Types.ObjectId
}

export default async function createCommit (params: CreateCommitParams): Promise<Commit> {
  const { content, user, article, parentCommit } = params
  const _id = new mongoose.mongo.ObjectId()

  const commit = new Commit({
    _id,
    content,
    user,
    article
  })

  if (parentCommit != null) {
    commit.parent = await resolveCommit(parentCommit)
  }

  await commit.save()

  return commit
}
