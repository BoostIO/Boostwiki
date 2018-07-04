import React from 'react'
import MyApp from '../pages/_app'
import getPageContext from '../lib/getPageContext'

export default function withPageContextApp (App: typeof MyApp): typeof App {
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
      return <App {...this.props} pageContext={this.pageContext} />
    }
  }
}
