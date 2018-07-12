import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import { Button } from '@material-ui/core'
import { withPageBundle, BundleContainerProps } from '../../lib/withPageBundle'
import { CurrentUserState } from 'lib/CurrentUserState'
import { RouteState } from 'lib/RouteState'

interface ArticleShowProps {
  currentUser: CurrentUserState
  route: RouteState
}

@inject('route')
@inject('currentUser')
@observer
class ArticleShow extends React.Component <ArticleShowProps & BundleContainerProps> {
  render (): JSX.Element {
    const {
      currentUser,
      pageProps,
      route
    } = this.props

    const keyword = route.query.get('keyword')
    const { article } = pageProps

    return (
      <>
        <h1>{keyword}</h1>

        {article == null
          ? <p>{`The content of "${keyword}" does not exist.`}</p>
          : <p>{article.headCommit.content}</p>}

        {currentUser == null
           ? <Button href='/auth/github'>Sign In</Button>
           : (
            <Link
              href={`/articles/edit?keyword=${keyword}`}
              as={`/w/${keyword}/edit`}
              passHref>
              <Button>Edit</Button>
            </Link>
           )
        }

      </>
    )
  }
}

export default withPageBundle(ArticleShow)
