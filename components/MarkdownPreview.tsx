import React from 'react'
import marked from 'marked'
import classnames from 'classnames'
import Highlighter from './Highlighter'
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
      <Highlighter content={html} className={className} />
    )
  }
}

export default withStyles(styles)(MarkdownPreview)
