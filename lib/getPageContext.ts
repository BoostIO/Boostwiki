import { SheetsRegistry, GenerateClassName } from 'jss'
import { createMuiTheme, createGenerateClassName, Theme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import grey from '@material-ui/core/colors/grey'

export interface PageContext {
  theme: Theme
  sheetsManager: Map<any, any>
  sheetsRegistry: SheetsRegistry
  generateClassName: GenerateClassName<any>
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: grey[50],
      main: grey[100],
      dark: grey[200]
    },
    secondary: {
      light: red[300],
      main: red[500],
      dark: red[700]
    }
  }
})

export default function getPageContext (): PageContext {
  return {
    theme,
    sheetsManager: new Map(),
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName()
  }
}
