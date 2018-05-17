import React from 'react'
import { inject, observer } from 'mobx-react'
import { CurrentUserState } from '../lib/CurrentUserState'
import { RouteState } from '../lib/RouteState'

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
      <nav>
        <h1>Boostwiki</h1>
        {currentUser == null
          ? <a href='/auth/github'>Sign in</a>
          : <img src={`https://avatars3.githubusercontent.com/u/${currentUser.githubId}?v=4&s=30`} />
        }
      </nav>
    )
  }
}

export default TopNavigator
