import { SheetsRegistry, GenerateClassName } from 'jss'
import { createMuiTheme, createGenerateClassName, Theme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import blue from '@material-ui/core/colors/blue'

export interface PageContext {
  theme: Theme
  sheetsManager: Map<any, any>
  sheetsRegistry: SheetsRegistry
  generateClassName: GenerateClassName<any>
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700]
    },
    secondary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700]
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
