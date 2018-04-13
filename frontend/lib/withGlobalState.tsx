import React from 'react'
import { Provider } from 'mobx-react'
import GlobalState from './GlobalState'
import { createQueryMap, Query } from './query'
import isServer from './isServer'

function withGlobalState<P> (createState?: ({
  pathname,
  query,
  asPath
}) => GlobalState) {
  return (PageComponent: React.ComponentType<P>) => {
    return class WrappedComponent extends React.Component<{
      pathname: string,
      query: Query,
      asPath: string,
      global: GlobalState,
      pageProps: P
    }> {
      static async getPageProps (ctx): Promise<Partial<P>> {
        return typeof (PageComponent as any).getInitialProps === 'function'
          ? (PageComponent as any).getInitialProps(ctx)
          : {}
      }

      public static async getInitialProps (ctx): Promise<any> {
        const {
          pathname, query, asPath
        } = ctx
        return {
          pageProps: await this.getPageProps(ctx),
          pathname, query, asPath,
          global: new GlobalState()
        }
      }

      public componentWillMount () {
        const {
          pathname, query, asPath
        } = this.props
        let { global } = this.props

        if (!isServer()) {
          if ((window as any).globalState == null) {
            (window as any).globalState = new GlobalState(global)
          }
          global = (window as any).globalState
        }

        global.route.setRoute({
          pathname,
          query: createQueryMap(query),
          asPath
        })
      }

      public render () {
        const {
          global,
          pageProps
        } = this.props
        return <Provider global={isServer() ? global : (window as any).globalState}>
          <PageComponent {...pageProps}/>
        </Provider>
      }
    }
  }
}

export default withGlobalState
