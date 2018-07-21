import React from 'react'
import CodeMirror from 'codemirror'

const options = {
  lineNumbers: true,
  mode: 'gfm',
  theme: 'github-light',
  lineWrapping: true
}

interface CodeEditorProps {
  value: string
  onChange: (e: { target: any }) => void
}

export default class CodeEditor extends React.Component<CodeEditorProps> {
  cm: CodeMirror.EditorFromTextArea = null
  textarea = null
  disableHandleChange: boolean = false

  get value () {
    return this.cm.getDoc().getValue()
  }

  componentDidMount () {
    this.cm = window.CodeMirror.fromTextArea(this.textarea, options)

    this.disableHandleChange = false
    this.cm.getDoc().setValue(this.props.value)
    this.cm.on('change', this.handleChange)
  }

  componentWillUnmount () {
    this.cm.off('change', this.handleChange)
    this.cm.toTextArea()
  }

  componentDidUpdate () {
    const doc = this.cm.getDoc()
    const currentValue = this.props.value
    const isValueChanged = currentValue !== doc.getValue()

    console.log(currentValue)

    if (isValueChanged && !this.disableHandleChange) {
      doc.setValue(currentValue)
    }
  }

  handleChange = (cm: CodeMirror.Editor, changeObj: CodeMirror.EditorChangeLinkedList) => {
    const { onChange } = this.props
    this.disableHandleChange = true

    onChange({ target: this })

    this.disableHandleChange = false
  }

  render () {
    return (
      <textarea
        ref={textarea => (this.textarea = textarea)}
      />
    )
  }
}
