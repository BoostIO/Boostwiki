import chai from 'chai'
import express from 'express'
import appRouter from '../../../appRouter'
import User from '../../../models/User'
import { createUser, tearDown } from '../../helpers/dummy'

describe('POST /api/articles', () => {
  let user: User
  let agent
  beforeEach(async () => {
    user = await createUser()

    const expressApp = express()
    expressApp.use(appRouter)
    agent = chai.request.agent(expressApp)
  })

  it('response new article.', async () => {
    // Give
    await agent.get(`/test/signin/${user._id}`)

    // When
    const res = await agent
      .post('/api/articles')
      .send({
        keyword: 'test_keyword',
        content: 'test content'
      })

    // Then
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

  afterEach(tearDown)
})
