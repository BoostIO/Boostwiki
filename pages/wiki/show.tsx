import React from 'react'
import { RouteState } from '../../lib/RouteState'
import { CurrentUserState } from '../../lib/CurrentUserState'
import { PageContext } from 'lib/getPageContext'

interface ArticleShowQuery {
  keyword: string
}

interface ArticleShowProps {
  route: RouteState
  currentUser: CurrentUserState
  pageContext: PageContext
  query: ArticleShowQuery
}

const ArticleShow: React.SFC <ArticleShowProps> = ({ query }) => (
  <>
    <h1>{query.keyword}</h1>
  </>
)

export default ArticleShow
