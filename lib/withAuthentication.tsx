import React from 'react'
import { inject , observer } from 'mobx-react'
import { Session } from './Session'
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
  session: Session
}

export function withAuthentication <OriginalProps extends {}> (WrappedComponent: React.ComponentType<OriginalProps & ContainerProps>) {
  @inject('session')
  @observer
  class AuthenticationComponent extends React.Component<OriginalProps & ContainerProps> {
    render (): JSX.Element {
      const { currentUser } = this.props.session
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
