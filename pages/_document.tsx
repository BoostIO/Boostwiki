import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

export default class MyDocumnet extends Document {
  static getInitialProps (ctx) {
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
      styles: (
        <React.Fragment>
          <style
            id='jss-server-side'
            dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
          />
          {flush() || null}
        </React.Fragment>
      )
    }
  }

  render () {
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
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500'
          />
          <link
            href='https://fonts.googleapis.com/css?family=Roboto+Mono'
            rel='stylesheet'
          />
          <link
            rel='stylesheet'
            href='//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css'
          />
          <link
            rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.39.2/codemirror.min.css'
          />
          <link
            href='https://unpkg.com/codemirror-github-light@0.4.2/lib/codemirror-github-light-theme.css'
            rel='stylesheet'
          />
        </Head>
        <body style={{
          backgroundColor: '#fff'
        }}>
          <Main />
          <script src='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.39.2/codemirror.min.js' />
          <script src='https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.39.2/mode/markdown/markdown.min.js' />
          <NextScript />
        </body>
      </html>
    )
  }
}
