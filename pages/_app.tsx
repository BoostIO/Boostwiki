import App, { Container } from 'next/app'
import React from 'react'
import { CurrentUserState } from '../lib/CurrentUserState'
import { RouteState } from '../lib/RouteState'
import applyMaterialUI from '../lib/applyMaterialUI'
import initializeState from '../lib/initializeState'
import { PageContext } from '../lib/getPageContext'

declare global {
  interface Window {
    route: RouteState
    currentUser: CurrentUserState
  }
}

export interface MyAppProps {
  route: RouteState
  currentUser: CurrentUserState,
  pageContext: PageContext
}

@applyMaterialUI
@initializeState
export default class MyApp extends App<MyAppProps> {
  render () {
    const {
      Component,
      pageProps,
      pageContext
    } = this.props

    return (
      <Container>
        <Component pageContext={pageContext} {...pageProps}/>
      </Container>
    )
  }
}
