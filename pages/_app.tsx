import App, { Container } from 'next/app'
import React from 'react'
import { CurrentUserSession } from '../lib/CurrentUserSession'
import { RouteState } from '../lib/RouteState'
import applyMaterialUI from '../lib/applyMaterialUI'
import initializeState from '../lib/initializeState'
import DefaultLayout from '../components/DefaultLayout'
import { PageContext } from '../lib/getPageContext'

declare global {
  interface Window {
    route: RouteState
    currentUserSession: CurrentUserSession
  }
}

interface MyAppProps {
  pageContext: PageContext
  route: RouteState
  currentUserSession: CurrentUserSession
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
        <DefaultLayout>
          <Component
            pageContext={pageContext}
            {...pageProps}/>
        </DefaultLayout>
      </Container>
    )
  }
}
