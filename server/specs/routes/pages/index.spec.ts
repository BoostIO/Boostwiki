import chai from 'chai'
import express from 'express'
import appRouter from '../../../appRouter'
import { createArticle, tearDown } from '../../helpers/dummy'

describe('/api/pages/index', () => {
  let agent
  beforeEach(async () => {
    const expressApp = express()
    expressApp.use(appRouter)
    agent = chai.request.agent(expressApp)
  })

  it('response latest 20 articles', async () => {
    // Give
    await Promise.all(
      [...new Array(25)].map((v, i) => i).map(i => createArticle())
    )

    // When
    const res = await agent
      .get('/api/pages')

    // Then
    expect(res.status).toBe(200)
    expect(res.body.articles.length).toBe(20)
  })

  afterEach(tearDown)
})
