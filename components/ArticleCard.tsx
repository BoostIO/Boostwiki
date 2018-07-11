import React from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button
} from '@material-ui/core'
import {
  withStyles,
  WithStyles
} from '@material-ui/core/styles'
import Link from 'next/link'
import { Article } from '../lib/models'

interface ArticleCardProps {
  article: Article
}

const styles = {
  card: {
    width: 275
  },
  title: {
    marginBottom: 16,
    fontSize: 16,
    fontWeight: 600
  }
}

type ClassNames = keyof typeof styles

const ArticleCard: React.SFC<ArticleCardProps & WithStyles<ClassNames>> = ({ article, classes }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title}>
        {article.keyword}
      </Typography>
      <Typography noWrap>
        {article.headCommit.content}
      </Typography>
    </CardContent>
    <CardActions>
      <Link
        href={`/articles/show?keyword=${article.keyword}`}
        as={`/w/${article.keyword}`}
        passHref
      >
        <Button size='small' color='secondary'>Read</Button>
      </Link>
    </CardActions>
  </Card>
)

export default withStyles(styles)(ArticleCard)
