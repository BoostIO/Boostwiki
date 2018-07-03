import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocumnet extends Document {
  getInitialProps (ctx) {
    let pageContext
    const page = ctx.renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext
        return <Component {...props} />
      }

      return WrappedComponent
    })

    return {
      ...page,
      pageContext,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: (
        <React.Fragment>
          <style
            id='jss-server-side'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
          />
          {flush() || null}
        </React.Fragment>
      )
    }
  }

  render () {
    const { pageContext } = this.props
    console.log(pageContext)
    return (
      <html lang='en'>
        <Head>
          <title>Boostwiki</title>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content={
              'user-scalable=0, initial-scale=1, ' +
              'minimum-scale=1, width=device-width, height=device-height'
            }
          />
          <meta
           name='theme-color'
           content={pageContext.theme.palette.primary.main} />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
