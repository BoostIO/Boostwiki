import chai from 'chai'
import express from 'express'
import appRouter from '../../../../appRouter'
import { createArticle, tearDown } from '../../../helpers/dummy'

describe('/api/pages/articles/show', () => {
  let agent
  beforeEach(async () => {
    const expressApp = express()
    expressApp.use(appRouter)
    agent = chai.request.agent(expressApp)
  })

  it('response an article', async () => {
    await createArticle({
      keyword: 'test_keyword',
      content: 'test content'
    })

    const res = await agent
      .get('/api/pages/articles/show')
      .query({
        keyword: 'test_keyword'
      })

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({
      article: {
        keyword: 'test_keyword',
        headCommit: {
          content: 'test content'
        }
      }
    })
  })

  afterEach(tearDown)
})
