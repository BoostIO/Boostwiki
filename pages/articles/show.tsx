import React from 'react'
import Link from 'next/link'
import { Button } from '@material-ui/core'
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

@withPageBundle
export default class ArticleShow extends React.Component <ArticleShowProps & BundleContainerProps> {
  render (): JSX.Element {
    const {
      query,
      currentUser,
      pageProps
    } = this.props

    const { article } = pageProps

    return (
      <>
        <h1>{query.keyword}</h1>

        {article == null
          ? <p>{`The content of "${query.keyword}" does not exist.`}</p>
          : <p>{article.headCommit.content}</p>}

        {currentUser == null
           ? <Button href='/auth/github'>Sign In</Button>
           : (
            <Link href={`/articles/edit?keyword=${query.keyword}`} passHref>
              <Button>Edit</Button>
            </Link>
           )
        }

      </>
    )
  }
}
