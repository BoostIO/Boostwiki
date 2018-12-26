import connection from '../../lib/db/connection'
import mongoose from 'mongoose'
import User from '../../models/User'
import Article from '../../models/Article'
import createArticleOperation from '../../operations/articles/createArticle'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type Overriedes<T extends mongoose.Document> = Partial<Omit<T, keyof mongoose.Document>>

let userCount = 0
export async function createUser (overrides: Overriedes<User> = {}): Promise<User> {
  userCount++
  const uniqueName = `dummy${userCount}`
  const user = new User({
    uniqueName: uniqueName,
    displayName: uniqueName,
    email: `${uniqueName}@dummy.com`,
    githubId: uniqueName,
    photo: `http://${uniqueName}.com/profile.png`,
    ...overrides
  })

  return user.save()
}

interface ContentType {
  content?: string
}

let articleCount = 0
export async function createArticle (overrides: Overriedes<Article> & ContentType = {}, user?: User) {
  articleCount++
  if (user == null) {
    user = await createUser()
  }

  return createArticleOperation({
    keyword: overrides.keyword || `dummy keyword ${articleCount}`,
    content: overrides.content || `dummy content ${articleCount}`,
    user: user._id
  })
}

export async function tearDown () {
  await new Promise((resolve, reject) => {
    connection.dropDatabase(error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
