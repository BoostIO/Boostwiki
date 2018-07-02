import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import blue from '@material-ui/core/colors/blue'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: purple
  }
})

export default function createPageContext () {
  return {
    theme,
    generateClassName: createGenerateClassName()
  }
}
