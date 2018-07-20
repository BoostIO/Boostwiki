import React from 'react'
import marked from 'marked'

interface MarkdownPreviewProps {
  content: string
  className?: string
}

export default class MarkdownPreview extends React.Component<MarkdownPreviewProps> {
  render () {
    const { content, className } = this.props
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => (
      `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${title}">${text}</a>`
    )
    const html = marked(content, { renderer })
    return (
      <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
    )
  }
}
