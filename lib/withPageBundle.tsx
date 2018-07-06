import React from 'react'
import { getPageBundle } from './api/pages'
import { NextContext } from 'next'

interface PageBundleError {
  status?: string
  message: string
}

interface BundleContainerProps {
  pageProps: Object
  error: PageBundleError
}

export function withPageBundle (Component: typeof React.Component): typeof React.Component {
  return class extends React.Component<BundleContainerProps> {
    static async getInitialProps (ctx: NextContext) {
      try {
        const pageProps = await getPageBundle(ctx)
        return {
          pageProps
        }
      } catch (error) {
        return error.response != null
          ? { error: {
            status: error.response.status,
            message: error.response.data.message
          } }
          : { error: {
            message: error.message
          } }
      }
    }

    render () {
      const {
        pageProps,
        error
      } = this.props

      if (error != null) {
        return <div>Error!! {error.status} {error.message}</div>
      }

      return <Component {...pageProps} />
    }
  }
}
