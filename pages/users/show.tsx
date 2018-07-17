import React from 'react'
import { User, Article } from '../../lib/models'
import { withPageBundle } from '../../lib/withPageBundle'
import { Avatar } from '@material-ui/core'

interface UsersShowProps {
  pageProps: {
    user: User,
    articles: Article[]
  }
}

class UsersShow extends React.Component<UsersShowProps> {
  render () {
    const { pageProps } = this.props
    const { user, articles } = pageProps
    return (
      <>
       <h1>{user.displayName}</h1>
       <h2>{user.uniqueName}</h2>
       <Avatar src={user.photo} />
       { articles.length > 0
        ? articles.map(article => (
          <p>{article.keyword}</p>
        ))
        : <p>There is no article.</p>}
      </>
    )
  }
}

export default withPageBundle(UsersShow)
