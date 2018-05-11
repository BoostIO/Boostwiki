import React from 'react'
import { inject, observer } from 'mobx-react'
import GlobalState from '../lib/GlobalState'

interface TopNavigatorProps {
  global?: GlobalState
}

const TopNavigator = ({
  global
}: TopNavigatorProps) => {
  return <nav>
    <pre><code>{JSON.stringify(global, null, 2)}</code></pre>
    <h1>Boostwiki</h1>
    <a href='/auth/github'>Sign in</a>
    <button onClick={global.plusOne}>++</button>
  </nav>
}

export default inject('global')(observer(TopNavigator))
