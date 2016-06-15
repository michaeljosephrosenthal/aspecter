import React from 'react'
import Quill from './Quill'

import hljs from '../../node_modules/highlightjs/highlight.pack.js'
import markdown from './markdownHljsDefinition'

hljs.registerLanguage('markdown', markdown)

import './markdownHighlight.scss'

const highlight = hljs.highlightBlock

export default class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || ''
        }
    }
    render() {
        let { config: {modules, ...config} = {}, theme = 'snow', ...props } = this.props
        modules = Object.assign({syntax: {highlight, language: 'markdown'}}, modules)
        return (
            <Quill theme={theme} value={this.state.value} 
                config={{
                    modules,
                    ...config
                }} {...props}
            />
        );
    }
}
