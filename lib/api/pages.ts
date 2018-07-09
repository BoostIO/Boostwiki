import api from './apiBase'
import querystring from 'querystring'
import { NextContext } from 'next'

export async function getPageBundle (ctx: NextContext) {
  const queryString = querystring.stringify(ctx.query)

  const res = await api.get(`/api/pages${ctx.pathname}?${queryString}`)

  return res.data
}
