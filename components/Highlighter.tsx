import React from 'react'
import hljs from 'highlight.js'

interface HighlighterProps {
  content: string
  className?: string
}

export default class Highlighter extends React.Component<HighlighterProps> {
  static defaultProps: HighlighterProps = { content: '' }

  componentDidMount () {
    this.highlightCode()
  }

  componentDidUpdate () {
    this.highlightCode()
  }

  el: Element = null

  highlightCode = () => {
    const nodes = this.el.querySelectorAll('pre code')

    for (let i = 0; i < nodes.length; i++) {
      hljs.highlightBlock(nodes[i])
    }
  }

  setEl = (el: Element) => this.el = el

  render () {
    const { content, className } = this.props
    const props = {
      ref: this.setEl,
      className,
      dangerouslySetInnerHTML : {
        __html: content
      }
    }
    return (
      <div {...props} />
    )
  }
}
