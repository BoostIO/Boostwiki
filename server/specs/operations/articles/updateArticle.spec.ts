import User from '../../../models/User'
import { createUser, createArticle, tearDown } from '../../helpers/dummy'
import updateArticle from '../../../operations/articles/updateArticle'
import Commit from '../../../models/Commit'
import Article from '../../../models/Article'

describe('updateArticle', () => {
  let user: User
  beforeEach(async () => {
    user = await createUser()
  })

  it('return updated article', async () => {
    // Give
    const article = await createArticle({
      keyword: 'test_keyword',
      content: 'test content'
    })

    // When
    const updatedArticle = await updateArticle({
      article,
      content: 'update content',
      user: user._id
    })

    // Then
    expect(updatedArticle._id).toEqual(article._id)
    expect(updatedArticle.keyword).toBe('test_keyword')
    expect((updatedArticle.headCommit as Commit).content).toBe('update content')
  })

  it('save updated article', async () => {
    // Give
    const article = await createArticle({
      content: 'test content'
    })

    // When
    const updatedArticle = await updateArticle({
      article,
      content: 'update content',
      user: user._id
    })

    // Then
    const searchedArticle = await Article.findById(updatedArticle._id).populate('headCommit')

    expect(searchedArticle._id).toEqual(updatedArticle._id)
    expect(searchedArticle.keyword).toBe(updatedArticle.keyword)
    expect((searchedArticle.headCommit as Commit).content).toBe((updatedArticle.headCommit as Commit).content)
    expect((searchedArticle.headCommit as Commit).user._id).toEqual((updatedArticle.headCommit as Commit).user._id)
  })

  afterEach(tearDown)
})
