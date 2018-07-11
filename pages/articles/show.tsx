import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import { Button } from '@material-ui/core'
import { RootProps } from '../../lib/RootProps'
import { withPageBundle, BundleContainerProps } from '../../lib/withPageBundle'

interface ArticleShowQuery {
  keyword: string
}

@inject('currentUser')
@observer
class ArticleShow extends React.Component <RootProps<ArticleShowQuery> & BundleContainerProps> {
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
            <Link
              href={`/articles/edit?keyword=${query.keyword}`}
              as={`/w/${query.keyword}/edit`}
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
