import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import isServer from '../lib/isServer'
import axios from 'axios'
import { CurrentUserState } from '../lib/CurrentUserState'
import { createQueryMap, Query } from '../lib/query'
import { RouteState } from '../lib/RouteState';

export default class MyApp extends App {
  static async getPageProps (ctx, Component) {
    return typeof Component.getInitialProps === 'function'
      ? Component.getInitialProps(ctx)
      : {}
  }

  static async getInitialProps ({ Component, router, ctx }) {
    const {
      pathname, query, asPath
    } = ctx

    let currentUser, route
    const options = {}
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
    const { Component, pageProps, currentUser, route } = this.props

    return <Container>
      <Provider
        currentUser={isServer() ? currentUser : window.currentUser}
        route={isServer() ? route : window.route}
      >
        <Component {...pageProps}/>
      </Provider>
    </Container>
  }
}
