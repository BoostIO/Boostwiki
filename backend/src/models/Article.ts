import mongoose from 'mongoose'
import connection from '../lib/db/connection'

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  organization: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Organization'
  }
})

interface Article extends mongoose.Document {
  title: string
  content: string
  tags: string[]
  createdAt: Date
}
const Article = connection.model<Article>('Article', ArticleSchema)

export default Article
