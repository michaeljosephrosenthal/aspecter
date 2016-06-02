import React from 'react'
import Quill from './Quill'

import { highlightBlock as highlight } from '../../node_modules/highlightjs/highlight.pack.js'
window.highlightBlock = highlight


require('../../node_modules/highlightjs/styles/default.css')
import '../../node_modules/quill/dist/quill.snow.css'

export default class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || ''
        }
    }
    render() {
        return (
            <Quill theme='snow' value={this.state.value} 
                config={{
                    modules: {
                        toolbar: '#toolbar',
                        syntax: {highlight, language: 'markdown'}
                    },
                    theme: 'snow'
                }}
            />
        );
    }
}
