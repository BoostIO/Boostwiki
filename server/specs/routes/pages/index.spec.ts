import chai from 'chai'
import express from 'express'
import appRouter from '../../../appRouter'
import { createArticle, tearDown } from '../../helpers/dummy'
import range from 'lodash/range'

describe('/api/pages/index', () => {
  let agent
  beforeEach(async () => {
    const expressApp = express()
    expressApp.use(appRouter)
    agent = chai.request.agent(expressApp)
  })

  it('response latest 20 articles', async () => {
    await Promise.all(
      range(25).map(i => createArticle())
    )

    const res = await agent
      .get('/api/pages')

    expect(res.status).toBe(200)
    expect(res.body.articles.length).toBe(20)
  })

  afterEach(tearDown)
})
