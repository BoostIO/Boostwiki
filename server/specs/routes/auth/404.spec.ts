import chai from 'chai'
import express from 'express'
import app from '../../../app'

describe('404', () => {
  it('return 404 and error message.', async () => {
    const expressApp = express()
    expressApp.use(app)

    const res = await chai.request(expressApp).get('/auth/hogehoge')

    expect(res.status).toBe(404)
    expect(res.body.message).toBe('The api doesn\'t exist.')
  })
})
