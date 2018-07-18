import chai from 'chai'
import express from 'express'
import appRouter from '../../appRouter'
import User from '../../models/User'
import { createUser, createArticle, tearDown } from '../helpers/dummy'

describe('/api/articles', () => {
  let user: User
  let agent
  beforeEach(async () => {
    user = await createUser()

    const expressApp = express()
    expressApp.use(appRouter)
    agent = chai.request.agent(expressApp)
  })

  it('response new article.', async () => {
    await agent.get(`/test/signin/${user._id}`)

    const res = await agent
      .post('/api/articles')
      .send({
        keyword: 'test_keyword',
        content: 'test content'
      })

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({
      article: {
        keyword: 'test_keyword',
        headCommit: {
          content: 'test content',
          user: user._id.toString()
        }
      }
    })
  })

  it('response updated article', async () => {
    await agent.get(`/test/signin/${user._id}`)

    await createArticle({ keyword: 'test_keyword' })

    const res = await agent
      .put('/api/articles')
      .send({
        keyword: 'test_keyword',
        content: 'update content'
      })

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({
      article: {
        keyword: 'test_keyword',
        headCommit: {
          content: 'update content'
        }
      }
    })
  })

  afterEach(tearDown)
})
