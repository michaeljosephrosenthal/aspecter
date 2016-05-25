import React, { PropTypes, Component } from 'react'
import t from 'tcomb-form/lib'
import en from 'tcomb-form/lib/i18n/en'
import templates from './subtleTcombTemplates'
import EditButton from './EditButton'

t.form.Form.i18n = en
t.form.Form.templates = templates

if($ES.CONTEXT == 'BROWSER')
    require('./subtleFormTemplates.scss');

export default class EditableFieldGenerator {

  constructor(...args) {

    const props = args[0];
    const options = {
      ...props.options,
      factory: null // avoid circular reference
    };

    class Inliner extends t.form.getComponent(props.type, options) {
      constructor(props) {
        super(props)
        this.state.editing = false
      }

      toggle(evt) {
        evt.preventDefault();
        this.state.editing = !this.state.editing;
        this.forceUpdate(); // overrides the default shouldComponentUpdate
      }

      editButton = ({attrs: {placeholder, name}}) => (
          <div className='actions'>
              <EditButton onClick={this.toggle.bind(this)}
                  editing={this.state.editing != false} />
          </div>
      )

      defaultPlaceholder = ({attrs: {placeholder, name}}) => (placeholder || (name + '...'))

      getTemplate(){
          let template = super.getTemplate()
          return locals => (
              <div className={`inline-editable ${this.state.editing ? 'editing' : ''}`}>
                  {this.editButton(locals)}
                  { this.state.editing ?
                      template(locals) : (
                          (locals.value != undefined && locals.value) ||
                          this.props.value ||
                          this.defaultPlaceholder(locals)
                      )
                  }
              </div>
          )
      }
    }
    return new Inliner(...args);
  }
}

