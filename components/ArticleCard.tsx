import React from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core'
import {
  withStyles,
  WithStyles
} from '@material-ui/core/styles'
import { Article } from '../lib/models'
import ButtonLink from './ButtonLink'

interface ArticleCardProps {
  article: Article
}

const styles = {
  title: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 600
  }
}

type ClassNames = keyof typeof styles

const ArticleCard: React.SFC<ArticleCardProps & WithStyles<ClassNames>> = ({ article, classes }) => (
  <Card>
    <CardContent>
      <Typography className={classes.title}>
        {article.keyword}
      </Typography>
      <Typography noWrap color='textSecondary'>
        {article.headCommit.content}
      </Typography>
    </CardContent>
    <CardActions>
      <ButtonLink
        href={`/articles/show?keyword=${article.keyword}`}
        as={`/w/${article.keyword}`}
        size='small'
        color='secondary'
      >
        Read
      </ButtonLink>
    </CardActions>
  </Card>
)

export default withStyles(styles)(ArticleCard)
