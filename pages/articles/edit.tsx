import React from 'react'
import { RootProps } from '../../lib/RootProps'
import {
  withPageBundle,
  BundleContainerProps
} from '../../lib/withPageBundle'
import {
  Button
} from '@material-ui/core'

interface ArticleEditQuery {
  keyword: string
}

interface ArticleEditState {
  content: string
}

class ArticleEdit extends React.Component<RootProps<ArticleEditQuery> & BundleContainerProps, ArticleEditState> {
  constructor (props) {
    super(props)

    this.state = {
      content: ''
    }
  }

  setContent = (content) => this.setState({ content })

  handleEditorOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setContent(e.currentTarget.value)
  }

  handleOnClickSubmitButton () {
    const {
      content
    } = this.state

    console.log(content)
  }

  render (): JSX.Element {
    const {
      query
    } = this.props
    const {
      content
    } = this.state

    console.log(this.props)

    return (
      <>
        <h1>{query.keyword}</h1>
        <textarea
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            this.handleEditorOnChange(e)
          }} />
        <Button onClick={this.handleOnClickSubmitButton.bind(this)}>
          Push
        </Button>
      </>
    )
  }
}

export default withPageBundle(ArticleEdit)
