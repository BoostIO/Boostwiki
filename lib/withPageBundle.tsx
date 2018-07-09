import React from 'react'
import { getPageBundle } from './api/pages'
import { NextContext } from 'next'

interface PageBundleError {
  status?: string
  message: string
}

type PageProps = object

export interface BundleContainerProps {
  pageProps?: object
  error?: PageBundleError
}

export const withPageBundle = <OriginalProps extends {}> (WrappedComponent: React.ComponentType<OriginalProps & BundleContainerProps>) => {
  return class BundledComponent extends React.Component<OriginalProps & BundleContainerProps & PageProps> {
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
        pageProps
      } = this.props

      return (
        <WrappedComponent {...pageProps} />
      )
    }
  }
}
