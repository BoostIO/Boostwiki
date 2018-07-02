import React from 'react'
import { inject, observer } from 'mobx-react'
import { CurrentUserState } from '../lib/CurrentUserState'
import { RouteState } from '../lib/RouteState'
import {
  AppBar,
  Typography
} from '@material-ui/core'

interface TopNavigatorProps {
  currentUser?: CurrentUserState
  route?: RouteState
}

@inject('route')
@inject('currentUser')
@observer
class TopNavigator extends React.Component<TopNavigatorProps> {
  public render () {
    const {
      currentUser,
      route
    } = this.props
    return (
      <div>
        <AppBar color='primary' position='fixed'>
          <Typography variant='title' color='inherit'>
            Boostwiki
          </Typography>
          {currentUser == null
            ? <a href='/auth/github'>Sign in</a>
            : <img src={`https://avatars3.githubusercontent.com/u/${currentUser.githubId}?v=4&s=30`} />
          }
        </AppBar>
      </div>
    )
  }
}

export default TopNavigator
