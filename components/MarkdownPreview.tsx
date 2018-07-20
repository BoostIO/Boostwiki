import React from 'react'
import marked from 'marked'
import classnames from 'classnames'
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
    const html = marked(content, { renderer })
    return (
      <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
    )
  }
}

export default withStyles(styles)(MarkdownPreview)
