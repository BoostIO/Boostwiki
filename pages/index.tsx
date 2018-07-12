import React from 'react'
import { withPageBundle } from '../lib/withPageBundle'
import { Article } from '../lib/models'
import ArticleCard from '../components/ArticleCard'
import { withStyles, WithStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const styles = {
  root: {
    maxWidth: 880,
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingTop: 16
  }
}

type ClassNames = keyof typeof styles

interface TopPageProps {
  pageProps: {
    articles: Article[]
  }
}

const TopComponent: React.SFC<TopPageProps & WithStyles<ClassNames>> = ({ pageProps, classes }) => {
  const { articles } = pageProps
  return (
    <Grid container className={classes.root} spacing={16} justify='space-between'>
      {articles.length > 0
        ? articles.map(article => (
          <Grid item key={article._id}>
            <ArticleCard
              article={article}
            />
          </Grid>
        ))
        : <p>There is no article.</p>}
    </Grid>
  )
}

export default withStyles(styles)(withPageBundle(TopComponent))
