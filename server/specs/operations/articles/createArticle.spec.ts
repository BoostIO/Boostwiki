import createArticle from '../../../operations/articles/createArticle'
import { createUser, tearDown } from '../../helpers/dummy'
import User from '../../../models/User'
import Commit from '../../../models/Commit'
import Article from '../../../models/Article'

describe('createArticle', () => {
  let user: User
  beforeEach(async () => {
    user = await createUser()
  })

  it('return new article', async () => {
    const article = await createArticle({
      keyword: 'test_keyword',
      content: 'test content',
      user: user._id
    })

    expect(article.keyword).toBe('test_keyword')
    expect((article.headCommit as Commit).content).toBe('test content')
    expect((article.headCommit as Commit).user._id).toEqual(user._id)
  })

  it('save new article', async () => {
    const article = await createArticle({
      keyword: 'test_keyword',
      content: 'test content',
      user: user._id
    })

    const searchedArticle = await Article.findById(article._id).populate('headCommit')

    expect(searchedArticle._id).toEqual(article._id)
    expect(searchedArticle.keyword).toBe(article.keyword)
    expect((searchedArticle.headCommit as Commit).content).toBe((article.headCommit as Commit).content)
    expect((searchedArticle.headCommit as Commit).user._id).toEqual((article.headCommit as Commit).user._id)
  })

  afterEach(tearDown)
})
