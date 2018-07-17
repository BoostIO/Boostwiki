import React from 'react'
import { User, Article } from '../../lib/models'
import { withPageBundle } from '../../lib/withPageBundle'
import {
  Avatar,
  Typography
} from '@material-ui/core'
import Link from 'next/link'
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'

interface UsersShowProps {
  pageProps: {
    user: User,
    articles: Article[]
  }
}

const styles = ({ palette }: Theme) => createStyles({
  root: {
    width: 1350,
    margin: '0 auto',
    padding: '0 30px'
  },
  anchor: {
    color: palette.secondary.main
  },
  avatar: {
    width: 100,
    height: 100,
    marginRight: 30
  },
  userInfo: {
    display: 'flex',
    padding: '20px 0'
  }
})

type ClassNames = typeof styles

class UsersShow extends React.Component<UsersShowProps & WithStyles<ClassNames>> {
  render () {
    const { pageProps, classes } = this.props
    const { user, articles } = pageProps
    return (
      <div className={classes.root}>
        <div className={classes.userInfo}>
          <Avatar src={user.photo} className={classes.avatar}/>
          <div>
            <Typography variant='display1'>{user.displayName}</Typography>
            <Typography variant='headline'>{user.uniqueName}</Typography>
          </div>
        </div>
        { articles.length > 0
          ? <>
              <Typography variant='title'>commited articles</Typography>
              {articles.map(article => (
                <Typography key={article._id} variant='subheading'>
                  <Link href={`/articles/show?keyword=${article.keyword}`} as={`/w/${article.keyword}`}>
                    <a className={classes.anchor}>
                      {article.keyword}
                    </a>
                  </Link>
                </Typography>
              ))}
          </>
          : <Typography variant='subheading'>There is no article.</Typography>}
      </div>
    )
  }
}

export default withStyles(styles)(withPageBundle(UsersShow))
