import api from './apiBase'

interface CreateArticleParams {
  keyword: string
  content: string
}

export async function createArticle (params: CreateArticleParams) {
  const res = await api.post('/api/articles', params)

  return res.data
}
