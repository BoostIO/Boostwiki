import React from 'react'
import marked from 'marked'
import classnames from 'classnames'
import hljs from 'highlight.js'
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from '@material-ui/core/styles'

interface MarkdownPreviewProps {
  content: string
  className?: string
}

const styles = ({ palette }: Theme) => createStyles({
  anchor: {
    color: palette.secondary.main
  },
  code: {
    fontFamily: '"Roboto Mono", monospace'
  }
})

type ClassNames = typeof styles

class MarkdownPreview extends React.Component<MarkdownPreviewProps & WithStyles<ClassNames>> {
  static defaultProps: MarkdownPreviewProps = { content: '' }

  componentDidMount () {
    this.highlightCode()
  }

  componentDidUpdate () {
    this.highlightCode()
  }

  element = null

  highlightCode = () => {
    const nodes = this.element.querySelectorAll('pre code')

    for (let i = 0; i < nodes.length; i++) {
      hljs.highlightBlock(nodes[i])
    }
  }

  setElement = (element: Element) => this.element = element

  render () {
    const { content, className, classes } = this.props

    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => (
      `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}" class="${classnames(classes.anchor)}">${text}</a>`
    )
    renderer.code = (code, lang) => (
      `<pre><code class="${classnames(classes.code)}">${code}</code></pre>`
    )
    const html = marked(content, { renderer })

    return (
      <div
        ref={this.setElement}
        className={className}
        dangerouslySetInnerHTML={{
          __html: html
        }}
      />
    )
  }
}

export default withStyles(styles)(MarkdownPreview)
