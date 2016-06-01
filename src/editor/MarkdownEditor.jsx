import React from 'react'
//import ReactQuill from 'react-quill'
//
import Quill from './Quill'
import hljs from '../../node_modules/highlightjs/highlight.pack.js'
require('../../node_modules/highlightjs/styles/default.css')

import '../../node_modules/quill/dist/quill.snow.css'

window.hljs = hljs
const { highlightBlock: highlight } = hljs

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
                        syntax: {highlight}
                    },
                    theme: 'snow'
                }}
            />
        );
    }
}
