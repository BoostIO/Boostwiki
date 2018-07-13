import React from 'react'
import { inject , observer } from 'mobx-react'
import { CurrentUserSession } from './CurrentUserSession'
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
  currentUserSession: CurrentUserSession
}

export function withAuthentication <OriginalProps extends {}> (WrappedComponent: React.ComponentType<OriginalProps & ContainerProps>) {
  @inject('currentUserSession')
  @observer
  class AuthenticationComponent extends React.Component<OriginalProps & ContainerProps> {
    render (): JSX.Element {
      const { currentUser } = this.props.currentUserSession
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
