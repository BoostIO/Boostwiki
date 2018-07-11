import React from 'react'
import { withPageBundle } from '../lib/withPageBundle'
import { Article } from '../lib/models'
import ArticleCard from '../components/ArticleCard'

interface TopPageProps {
  pageProps: {
    articles: Article[]
  }
}

const TopComponent: React.SFC<TopPageProps> = ({ pageProps }) => {
  const { articles } = pageProps
  return (
    <>
      {articles.length > 0
        ? articles.map(article => (
          <ArticleCard
            key={article._id}
            article={article}
          />
        ))
        : <p>There is no article.</p>}
    </>
  )
}

export default withPageBundle(TopComponent)
