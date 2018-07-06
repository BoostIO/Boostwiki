import App, { Container } from 'next/app'
import React from 'react'
import { CurrentUserState } from '../lib/CurrentUserState'
import { RouteState } from '../lib/RouteState'
import applyMaterialUI from '../lib/applyMaterialUI'
import initializeState from '../lib/initializeState'
import { PageContext } from '../lib/getPageContext'
import DefaultLayout from '../components/DefaultLayout'

declare global {
  interface Window {
    route: RouteState
    currentUser: CurrentUserState
  }
}

export interface MyAppProps {
  route: RouteState
  currentUser: CurrentUserState
  pageContext: PageContext
  query: Object
}

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
