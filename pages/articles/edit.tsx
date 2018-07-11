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
import MySnackbar from '../../components/MySnackbar'
import Router from 'next/router'

interface ArticleEditQuery {
  keyword: string
}

interface ArticleEditState {
  content: string
  errorMessage: string
}

class ArticleEdit extends React.Component<RootProps<ArticleEditQuery> & BundleContainerProps, ArticleEditState> {
  constructor (props) {
    super(props)
    const { article } = props.pageProps

    this.state = {
      content: article == null
        ? ''
        : article.headCommit.content,
      errorMessage: ''
    }
  }

  setContent = (content) => this.setState({ content })
  setError = (errorMessage) => this.setState({ errorMessage })

  handleChangeEditor = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.setContent(e.currentTarget.value)

  handleSnackbarClose = () => this.setError('')

  handleClickSubmitButton = async () => {
    const { keyword } = this.props.query
    const { article } = this.props.pageProps
    const { content } = this.state

    try {
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
    } catch (error) {
      this.setError(error.message)
    }
  }

  render (): JSX.Element {
    const {
      query
    } = this.props
    const {
      content,
      errorMessage
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
        <MySnackbar
          onClose={this.handleSnackbarClose}
          open={errorMessage !== ''}
          message={errorMessage}
          variant='error'
        />
      </>
    )
  }
}

export default withPageBundle(withAuthentication(ArticleEdit))
