import App, { Container } from 'next/app'
import React from 'react'
import { CurrentUserState } from '../lib/CurrentUserState'
import { RouteState } from '../lib/RouteState'
import applyMaterialUI from '../lib/applyMaterialUI'
import initializeState from '../lib/initializeState'
import DefaultLayout from '../components/DefaultLayout'
import { RootProps } from '../lib/RootProps'

declare global {
  interface Window {
    route: RouteState
    currentUser: CurrentUserState
  }
}

type MyAppProps = RootProps<object>

@applyMaterialUI
@initializeState
export default class MyApp extends App<MyAppProps> {
  render () {
    const {
      Component,
      pageProps,
      pageContext,
      query,
      route,
      currentUser
    } = this.props

    return (
      <Container>
        <DefaultLayout>
          <Component
            pageContext={pageContext}
            query={query}
            route={route}
            currentUser={currentUser}
            {...pageProps}/>
        </DefaultLayout>
      </Container>
    )
  }
}
