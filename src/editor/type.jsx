import t from 'tcomb'
import React from 'react'
import templates from 'tcomb-form-templates-bootstrap';
import Textarea from 'react-textarea-autosize'

const MarkdownEditor = ($ES.CONTEXT == 'BROWSER') ?
    require('./MarkdownEditor').default : () => (<div/>)

const template = templates.textbox.clone({
    renderTextarea: ({attrs: {className='', placeholder, ...attrs}}) => (
        <MarkdownEditor className={`subtle ${className}`}
            placeholder={placeholder || ((attrs.name || '')  + '...') }
            {...attrs} />
    ),

    renderTextbox(locals) {
        if (locals.type === 'static') {
            return template.renderStatic(locals)
        }
        let ret = template.renderTextarea(locals)

        if (locals.config.addonBefore || locals.config.addonAfter || locals.config.buttonBefore || locals.config.buttonAfter) {
            ret = template.renderInputGroup(ret, locals)
        }
        return ret
    }
})

const Markdown = t.refinement(t.String, s => true, 'Markdown');

Markdown.meta.editor = { template }

export default Markdown
