import React from 'react'
import { getPageBundle } from './api/pages'
import { NextContext } from 'next'

interface PageBundleError {
  status?: string
  message: string
}

export interface BundleContainerProps {
  pageProps?: object
  error?: PageBundleError
}

export function withPageBundle <OriginalProps extends {}> (WrappedComponent: React.ComponentType<OriginalProps & BundleContainerProps>) {
  return class BundledComponent extends React.Component<OriginalProps & BundleContainerProps> {
    static async getInitialProps (ctx: NextContext): Promise<BundleContainerProps> {
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

    render (): JSX.Element {
      const {
        error
      } = this.props

      if (error) {
        return <div>Error!! {error.status} {error.message}</div>
      }

      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
}
