import React from 'react'
import { withPageBundle } from '../lib/withPageBundle'
import { Article } from '../lib/models'
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import Link from 'next/link'

const styles = ({ palette }: Theme) => createStyles({
  root: {
    maxWidth: 1350,
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: 16
  },
  anchor: {
    color: palette.secondary.main
  }
})

type ClassNames = typeof styles

interface TopPageProps {
  pageProps: {
    articles: Article[]
  }
}

const TopComponent: React.SFC<TopPageProps & WithStyles<ClassNames>> = ({ pageProps, classes }) => {
  const { articles } = pageProps
  return (
    <div className={classes.root}>
      {articles.length > 0
        ? <>
          <Typography variant='title'>Latest articles</Typography>
          {articles.map(article => (
            <Typography variant='subheading' key={article._id}>
              <Link href={`/articles/show?keyword=${article.keyword}`} as={`/w/${article.keyword}`}>
                <a className={classes.anchor}>
                  {article.keyword}
                </a>
              </Link>
            </Typography>
          ))}
          </>
        : <p>There is no article.</p>}
    </div>
  )
}

export default withStyles(styles)(withPageBundle(TopComponent))
