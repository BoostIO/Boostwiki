import React from 'react'
import { inject, observer } from 'mobx-react'
import {
  withPageBundle,
  BundleContainerProps
} from '../../lib/withPageBundle'
import { Button, Typography } from '@material-ui/core'
import {
  createArticle,
  updateArticle
} from '../../lib/api/articles'
import { withAuthentication } from '../../lib/withAuthentication'
import MySnackbar from '../../components/MySnackbar'
import Router from 'next/router'
import { RouteState } from '../../lib/RouteState'
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'

interface ArticleEditProps {
  route: RouteState
}

interface ArticleEditState {
  content: string
  errorMessage: string
}

const styles = ({ palette }: Theme) => createStyles({
  root: {
    maxWidth: 1350,
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingRight: 30,
    paddingLeft: 30
  },
  title: {
    borderTop: `1px solid ${palette.primary.dark}`,
    paddingTop: 15,
    marginTop: 60
  }
})

type ClassNames = typeof styles

@inject('route')
@observer
class ArticleEdit extends React.Component<ArticleEditProps & BundleContainerProps & WithStyles<ClassNames>, ArticleEditState> {
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
    const {
      classes,
      route
    } = this.props
    const keyword = route.query.get('keyword')

    return (
      <main className={classes.root}>
        <Typography
          variant='headline'
          className={classes.title}>
          {keyword}
        </Typography>
        <textarea
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            this.handleChangeEditor(e)
          }} />
        <Button
          size='small'
          color='secondary'
          onClick={this.handleClickSubmitButton.bind(this)}>
          Push
        </Button>
        <MySnackbar
          onClose={this.handleSnackbarClose}
          open={errorMessage !== ''}
          message={errorMessage}
          variant='error'
        />
      </main>
    )
  }
}

export default withStyles(styles)(withPageBundle(withAuthentication(ArticleEdit)))
