import React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Typography } from '@material-ui/core'
import { withPageBundle } from '../../lib/withPageBundle'
import { Session } from '../../lib/Session'
import { RouteState } from '../../lib/RouteState'
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles'
import ButtonLink from '../../components/ButtonLink'
import MarkdownPreview from '../../components/MarkdownPreview'
import { Article } from '../../lib/models'

interface ArticleShowProps {
  session: Session
  route: RouteState
  pageProps: {
    article: Article
  }
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
@inject('session')
@observer
class ArticleShow extends React.Component <ArticleShowProps & WithStyles<ClassNames>> {
  render (): JSX.Element {
    const {
      session,
      pageProps,
      route,
      classes
    } = this.props

    const keyword = route.query.get('keyword')
    const { article } = pageProps
    const { currentUser } = session

    return (
      <main className={classes.root}>
        <Typography variant='headline' className={classes.title}>{keyword}</Typography>

        {article == null
          ? <p>{`The content of "${keyword}" does not exist.`}</p>
          : <MarkdownPreview content={article.headCommit.content} />
        }

        {currentUser == null
           ? <Button href='/auth/github'>Sign In</Button>
           : (
            <ButtonLink
              href={`/articles/edit?keyword=${keyword}`}
              as={`/w/${keyword}/edit`}
              size='small'
              color='secondary'
            >
              Edit
            </ButtonLink>
           )
        }

      </main>
    )
  }
}

export default withStyles(styles)(withPageBundle(ArticleShow))
