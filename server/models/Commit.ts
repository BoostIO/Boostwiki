import mongoose from 'mongoose'
import connection from '../lib/db/connection'
import Article from './Article'
import User from './User'

const CommitSchema: mongoose.Schema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Comment'
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  article: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Article',
    required: true
  }
})

interface Commit extends mongoose.Document {
  content: string
  createdAt: Date
  parent: Commit
  user: User
  article: Article
}

const Commit = connection.model<Commit>('Commit', CommitSchema)

export default Commit
