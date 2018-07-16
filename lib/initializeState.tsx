import React from 'react'
import { Provider } from 'mobx-react'
import isServer from './isServer'
import axios, { AxiosRequestConfig } from 'axios'
import { Session } from './Session'
import { RouteState } from './RouteState'
import { createQueryMap } from './query'
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

      let session: Session
      let route
      const options: AxiosRequestConfig = {}
      if (isServer()) {
        options.headers = ctx.req.headers
        const { data } = (await axios.get('http://localhost:3000/auth', {
          headers: ctx.req.headers
        }))

        if (data.currentUser) {
          session = new Session(data.currentUser)
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
        session,
        route
      }
    }

    componentWillMount () {
      const {
        session,
        route
      } = this.props

      if (!isServer()) {
        if (session) {
          window.session = new Session(session.currentUser)
        }
        window.route = new RouteState(route)
      }
    }

    render () {
      const {
        session,
        route
      } = this.props

      return (
        <Provider
          session={isServer() ? session : window.session}
          route={isServer() ? route : window.route}
        >
          <App {...this.props} />
        </Provider>
      )
    }
  }
}
