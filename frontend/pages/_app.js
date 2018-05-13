import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'mobx-react'
import isServer from '../lib/isServer'
import axios from 'axios'
import GlobalState from '../lib/GlobalState'
import { createQueryMap, Query } from '../lib/query'

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

    let currentUser
    const options = {}
    if (isServer()) {
      options.headers = ctx.req.headers
      const { data } = (await axios.get('http://localhost:3000/auth', {
        headers: ctx.req.headers
      }))

      currentUser = data.currentUser
    }

    return {
      pageProps: await this.getPageProps(ctx, Component),
      pathname, query, asPath,
      global: new GlobalState({
        route: {},
        currentUser
      })
    }
  }

  componentWillMount () {
    const {
      pathname, query, asPath
    } = this.props
    let { global } = this.props

    if (!isServer()) {
      if ((window).globalState == null) {
        (window).globalState = new GlobalState(global)
      }
      global = (window).globalState
    }

    global.route.setRoute({
      pathname,
      query: createQueryMap(query),
      asPath
    })
  }

  render () {
    const { Component, pageProps, global } = this.props

    return <Container>
      <Provider global={isServer() ? global : (window).globalState}>
        <Component {...pageProps}/>
      </Provider>
    </Container>
  }
}
