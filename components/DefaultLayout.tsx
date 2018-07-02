import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import getPageContext from '../lib/getPageContext'
import TopNavigator from './TopNavigator'

const DefaultLayout = ({
  children
}) => (
  <div>
    <MuiThemeProvider theme={getPageContext().theme}>
      <CssBaseline />
      <TopNavigator />
      <div>
        {children}
      </div>
    </MuiThemeProvider>
  </div>
)

export default DefaultLayout
