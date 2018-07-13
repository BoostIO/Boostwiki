import React from 'react'
import { inject , observer } from 'mobx-react'
import { CurrentUserState } from '../lib/CurrentUserState'
import { Button } from '@material-ui/core'

function UnauthorizedPage () {
  return (
    <>
      <p>You must sign in to edit an article.</p>
      <Button href='/auth/github'>Sign In</Button>
    </>
  )
}

interface ContainerProps {
  currentUser: CurrentUserState
}

export function withAuthentication <OriginalProps extends {}> (WrappedComponent: React.ComponentType<OriginalProps & ContainerProps>) {
  @inject('currentUser')
  @observer
  class AuthenticationComponent extends React.Component<OriginalProps & ContainerProps> {
    render (): JSX.Element {
      const { currentUser } = this.props
      return (
        <>
          {currentUser == null
            ? <UnauthorizedPage />
            : <WrappedComponent {...this.props} />}
        </>
      )
    }
  }
  return AuthenticationComponent
}
