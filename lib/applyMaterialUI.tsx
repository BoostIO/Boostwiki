import React from 'react'
import MyApp from '../pages/_app'
import getPageContext from './getPageContext'
import { CssBaseline } from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core/styles'
import JssProvider from 'react-jss/lib/JssProvider'

export default function applyMaterialUI (App: typeof MyApp): typeof App {
  return class extends App {
    constructor (props) {
      super(props)
      this.pageContext = getPageContext()
    }

    pageContext = null

    componentDidMount () {
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
    }

    render () {
      return (
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}>
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <CssBaseline />
            <App {...this.props} pageContext={this.pageContext} />
          </MuiThemeProvider>
        </JssProvider>
      )
    }
  }
}
