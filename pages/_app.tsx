import App, { Container } from 'next/app'
import React from 'react'
import { Session } from '../lib/Session'
import { RouteState } from '../lib/RouteState'
import applyMaterialUI from '../lib/applyMaterialUI'
import initializeState from '../lib/initializeState'
import DefaultLayout from '../components/DefaultLayout'
import { PageContext } from '../lib/getPageContext'

declare global {
  interface Window {
    route: RouteState
    session: Session
  }
}

interface MyAppProps {
  pageContext: PageContext
  route: RouteState
  session: Session
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
