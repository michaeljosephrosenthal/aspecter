import React, { PropTypes, Component } from 'react'
import t from 'tcomb-form/lib'
import en from 'tcomb-form/lib/i18n/en'
import templates from './subtleTcombTemplates'
import EditButton from './EditButton'

t.form.Form.templates = templates

if($ES.CONTEXT == 'BROWSER')
    require('./subtleFormTemplates.scss');

function genericStaticView(value){
    if(Array.isArray(value)){
        if(value.length){
            return (
                <ul>
                    {value.map((v, key) => <li key={key}>{genericStaticView(v)}</li>)}
                </ul>
            )
        } else { return undefined }
    }
    if(typeof(value) == 'object'){
        return (
            <dl>
                {Object.keys(value).map(k => [
                    <dt>{k}</dt>,
                    <dd>{genericStaticView(value[k])}</dd>
                ])}
            </dl>
        ) 
    }
    return value
}

export default class EditableFieldGenerator {

  constructor(...args) {

    const props = args[0];
    const options = {
      ...props.options,
      factory: props.options.baseFactory || null // avoid circular reference
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

      editButton = _ => (
          <div className='actions'>
              <EditButton onClick={this.toggle.bind(this)}
                  editing={this.state.editing != false} />
          </div>
      )

      valueIsDisplayable = ({value}) => genericStaticView(value)

      defaultDisplayValue = ({locals, props}) => this.valueIsDisplayable(locals) || this.valueIsDisplayable(props)

      descriptor = ({attrs: {placeholder, name} = {}, path: [path = undefined]}) => ( placeholder || name || path)

      defaultPlaceholder = ({attrs: {placeholder, name} = {}, path: [path = undefined]}) => (
          placeholder || (name && name + '...') || (path && path + '...')
      )

      getTemplate(){
          let template = super.getTemplate()
          return locals => (
              <div className={`inline-editable ${this.state.editing ? 'editing' : ''} ${this.descriptor(locals)}`}>
                  {this.editButton(locals)}
                  <div style={{display: this.state.editing ? 'inherit' : 'none'}}> 
                      {template(locals)}
                  </div>
                  <div style={{display: this.state.editing ? 'none' : 'inherit' }}> 
                      {
                          (options && options.staticTemplate && options.staticTemplate(this.props.value)) ||
                          this.defaultDisplayValue({locals, props: this.props}) ||
                          this.defaultPlaceholder(locals)
                      }
                  </div>
              </div>
          )
      }
    }
    return new Inliner(...args);
  }
}

