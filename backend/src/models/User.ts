import mongoose from 'mongoose'
import connection from '../lib/db/connection'

const UserSchema = new mongoose.Schema({
  uniqueName: {
    type: String,
    required: true,
    unique: true,
    set: (value: string) => value.toLocaleLowerCase()
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  githubId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  photo: {
    type: String
  }
})

interface User extends mongoose.Document {
  uniqueName: string
  displayName: string
  email: string
  githubId: string
  photo: string
}

const User = connection.model<User>('User', UserSchema)

export default User
