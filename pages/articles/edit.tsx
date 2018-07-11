import React from 'react'
import { RootProps } from '../../lib/RootProps'
import {
  withPageBundle,
  BundleContainerProps
} from '../../lib/withPageBundle'
import { Button } from '@material-ui/core'
import {
  createArticle,
  updateArticle
} from '../../lib/api/articles'
import { withAuthentication } from '../../lib/withAuthentication'
import Router from 'next/router'

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

  handleChangeEditor = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.setContent(e.currentTarget.value)

  handleClickSubmitButton = async () => {
    const { keyword } = this.props.query
    const { article } = this.props.pageProps
    const { content } = this.state

    if (article == null) {
      await createArticle({
        keyword,
        content
      })
    } else {
      await updateArticle({
        keyword,
        content
      })
    }

    Router.push(`/articles/show?keyword=${keyword}`, `/w/${keyword}`)
    return
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
            this.handleChangeEditor(e)
          }} />
        <Button onClick={this.handleClickSubmitButton.bind(this)}>
          Push
        </Button>
      </>
    )
  }
}

export default withPageBundle(withAuthentication(ArticleEdit))
