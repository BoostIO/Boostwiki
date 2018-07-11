interface Model {
  _id: string
}

export interface Article extends Model {
  keyword: string
  headCommit?: Commit
  createdAt: Date
  updatedAt: Date
}

export interface Commit extends Model {
  content: string
  createdAt: Date
  parent?: Commit
  user: User
  article: Article
}

export interface User extends Model {
  uniqueName: string
  displayName: string
  email?: string
  githubId: string
  createdAt: Date
  photo?: string
}
