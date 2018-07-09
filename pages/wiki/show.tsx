import React from 'react'
import { RouteState } from '../../lib/RouteState'
import { CurrentUserState } from '../../lib/CurrentUserState'
import { PageContext } from '../../lib/getPageContext'
import { withPageBundle, BundleContainerProps } from '../../lib/withPageBundle'

interface ArticleShowQuery {
  keyword: string
}

interface ArticleShowProps {
  route: RouteState
  currentUser: CurrentUserState
  pageContext: PageContext
  query: ArticleShowQuery
}

// const ArticleShow: React.SFC <ArticleShowProps> = ({ query }) => (
//   <>
//     <h1>{query.keyword}</h1>
//   </>
// )

@withPageBundle
export default class ArticleShow extends React.Component <ArticleShowProps & BundleContainerProps> {
  render (): JSX.Element {
    const {
      query
    } = this.props

    return (
      <>
        <h1>{query.keyword}</h1>
      </>
    )
  }
}
