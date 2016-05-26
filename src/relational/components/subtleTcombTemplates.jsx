import React from 'react'
import templates from 'tcomb-form-templates-bootstrap';
import Textarea from 'react-textarea-autosize'

const textbox = templates.textbox.clone({
    renderTextarea: ({attrs: {className='', placeholder, ...attrs}}) => (
        <Textarea className={`subtle ${className}`}
            placeholder={placeholder || ((attrs.name || '')  + '...') }
            {...attrs} />
    ),

    renderTextbox(locals) {
        if (locals.type === 'static') {
            return textbox.renderStatic(locals)
        }
        let ret = textbox.renderTextarea(locals)

        if(locals.type == 'input')
            textbox.renderInput(locals);

        if (locals.config.addonBefore || locals.config.addonAfter || locals.config.buttonBefore || locals.config.buttonAfter) {
            ret = textbox.renderInputGroup(ret, locals)
        }
        return ret
    }
})

export default Object.assign({}, templates, {textbox})

