import React from 'react'
import { RootProps } from '../../lib/RootProps'
import { withPageBundle, BundleContainerProps } from '../../lib/withPageBundle'

interface ArticleEditQuery {
  keyword: string
}

@withPageBundle
export default class ArticleEdit extends React.Component<RootProps<ArticleEditQuery> & BundleContainerProps> {
  render (): JSX.Element {
    const {
      query,
      pageProps
    } = this.props

    const { article } = pageProps

    return (
      <>
        <h1>{query.keyword}</h1>
      </>
    )
  }
}
