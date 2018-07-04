import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import isServer from '../lib/isServer'
import axios, { AxiosRequestConfig } from 'axios'
import { CurrentUserState } from '../lib/CurrentUserState'
import { createQueryMap } from '../lib/query'
import { RouteState } from '../lib/RouteState'
import JssProvider from 'react-jss/lib/JssProvider'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import withPageContextApp from '../lib/withPageContextApp'
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
export default class MyApp extends App<MyAppProps> {
  static async getPageProps (ctx, Component) {
    return typeof Component.getInitialProps === 'function'
      ? Component.getInitialProps(ctx)
      : {}
  }

  static async getInitialProps ({ Component, router, ctx }) {
    const {
      pathname, query, asPath
    } = ctx

    let currentUser
    let route
    const options: AxiosRequestConfig = {}
    if (isServer()) {
      options.headers = ctx.req.headers
      const { data } = (await axios.get('http://localhost:3000/auth', {
        headers: ctx.req.headers
      }))

      if (data.currentUser) {
        currentUser = new CurrentUserState(data.currentUser)
      }

      route = new RouteState({
        pathname,
        query: createQueryMap(query),
        asPath
      })
    } else {
      window.route.setRoute({
        pathname,
        query: createQueryMap(query),
        asPath
      })
    }

    return {
      pageProps: await this.getPageProps(ctx, Component),
      pathname, query, asPath,
      currentUser,
      route
    }
  }

  componentWillMount () {
    const {
      currentUser,
      route
    } = this.props

    if (!isServer()) {
      if (currentUser) {
        window.currentUser = new CurrentUserState(currentUser)
      }
      window.route = new RouteState(route)
    }
  }

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
