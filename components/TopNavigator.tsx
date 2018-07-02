import React from 'react'
import { inject, observer } from 'mobx-react'
import { CurrentUserState } from '../lib/CurrentUserState'
import { RouteState } from '../lib/RouteState'
import {
  AppBar,
  Typography,
  Avatar,
  Button,
  Toolbar
} from '@material-ui/core'
import {
  withStyles,
  WithStyles
} from '@material-ui/core/styles'

interface TopNavigatorProps {
  currentUser?: CurrentUserState
  route?: RouteState
}

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
}

type ClassNames = keyof typeof styles

@inject('route')
@inject('currentUser')
@observer
class TopNavigator extends React.Component<TopNavigatorProps & WithStyles<ClassNames>> {
  public render () {
    const {
      currentUser,
      route,
      classes
    } = this.props
    return (
      <div className={classes.root}>
        <AppBar color='primary' position='fixed'>
          <Toolbar>
            <Typography variant='title' color='inherit' className={classes.flex}>
              Boostwiki
            </Typography>
            {currentUser == null
              ? <Button href='/auth/github' color='inherit'>Sign in</Button>
              : <Avatar src={`https://avatars3.githubusercontent.com/u/${currentUser.githubId}?v=4&s=30`} />
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(TopNavigator)
