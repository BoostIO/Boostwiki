import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import isServer from '../lib/isServer'
import { CurrentUserState } from '../lib/CurrentUserState'
import { RouteState } from '../lib/RouteState'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import withPageContextApp from '../lib/withPageContextApp'
import withFetchingApp from '../lib/withFetchingApp'
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

@withPageContextApp
@withFetchingApp
export default class MyApp extends App<MyAppProps> {
  render () {
    const {
      Component,
      pageProps,
      currentUser,
      route,
      pageContext
    } = this.props

    return <Container>
      <JssProvider
        registry={pageContext.sheetsRegistry}
        generateClassName={pageContext.generateClassName}>
        <MuiThemeProvider
          theme={pageContext.theme}
          sheetsManager={pageContext.sheetsManager}
        >
          <CssBaseline />
          <Provider
            currentUser={isServer() ? currentUser : window.currentUser}
            route={isServer() ? route : window.route}
          >
            <Component pageContext={pageContext} {...pageProps}/>
          </Provider>
        </MuiThemeProvider>
      </JssProvider>
    </Container>
  }
}
