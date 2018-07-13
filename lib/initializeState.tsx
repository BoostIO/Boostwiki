import React from 'react'
import { Provider } from 'mobx-react'
import isServer from '../lib/isServer'
import axios, { AxiosRequestConfig } from 'axios'
import { CurrentUserState } from '../lib/CurrentUserState'
import { RouteState } from '../lib/RouteState'
import { createQueryMap } from '../lib/query'
import MyApp from '../pages/_app'

export default function initializeState (App: typeof MyApp): typeof App {
  return class extends App {
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
        route = window.route
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
        currentUser,
        route
      } = this.props

      return (
        <Provider
          currentUser={isServer() ? currentUser : window.currentUser}
          route={isServer() ? route : window.route}
        >
          <App {...this.props} />
        </Provider>
      )
    }
  }
}
