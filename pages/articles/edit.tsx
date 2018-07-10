import React from 'react'
import { RootProps } from '../../lib/RootProps'
import {
  withPageBundle,
  BundleContainerProps
} from '../../lib/withPageBundle'
import { Button } from '@material-ui/core'
import { createArticle } from '../../lib/api/articles'

interface ArticleEditQuery {
  keyword: string
}

interface ArticleEditState {
  content: string
}

class ArticleEdit extends React.Component<RootProps<ArticleEditQuery> & BundleContainerProps, ArticleEditState> {
  constructor (props) {
    super(props)
    const { article } = props.pageProps

    this.state = {
      content: article == null
        ? ''
        : article.headCommit.content
    }
  }

  setContent = (content) => this.setState({ content })

  handleEditorOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.setContent(e.currentTarget.value)

  handleOnClickSubmitButton = async () => {
    const { query, pageProps } = this.props
    const { article } = pageProps
    const { content } = this.state

    if (article == null) {
      await createArticle({
        keyword: query.keyword,
        content
      })
    } else {
      console.log(article)
    }
  }

  render (): JSX.Element {
    const {
      query
    } = this.props
    const {
      content
    } = this.state

    return (
      <>
        <h1>{query.keyword}</h1>
        <textarea
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            this.handleEditorOnChange(e)
          }} />
        <Button onClick={this.handleOnClickSubmitButton.bind(this)}>
          Push
        </Button>
      </>
    )
  }
}

export default withPageBundle(ArticleEdit)
