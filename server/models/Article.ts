import mongoose from 'mongoose'
import connection from '../lib/db/connection'
import Commit from './Commit'

const ArticleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  headCommit: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Commit',
    required: true
  }
})

interface Article extends mongoose.Document {
  keyword: string
  createdAt: Date
  updatedAt: Date
  headCommit: mongoose.Types.ObjectId | Commit
}
const Article = connection.model<Article>('Article', ArticleSchema)

export default Article
