import React from 'react'
import { inject, observer } from 'mobx-react'
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
import { RouteState } from '../../lib/RouteState'

interface ArticleEditProps {
  route: RouteState
}

interface ArticleEditState {
  content: string
  errorMessage: string
}

@inject('route')
@observer
class ArticleEdit extends React.Component<ArticleEditProps & BundleContainerProps, ArticleEditState> {
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
    const keyword = this.props.route.query.get('keyword')
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
      content,
      errorMessage
    } = this.state
    const keyword = this.props.route.query.get('keyword')

    return (
      <>
        <h1>{keyword}</h1>
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
