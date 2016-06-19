import React, { PropTypes, Component } from 'react'
import t from 'tcomb-form/lib'
import en from 'tcomb-form/lib/i18n/en'
import templates from './subtleTcombTemplates'
import EditButton from './EditButton'

t.form.Form.templates = templates

if($ES.CONTEXT == 'BROWSER')
    require('./subtleFormTemplates.scss');

function GenericList({value, options: {item: {staticTemplate: Template=GenericStaticView, ...itemOpts}={}}}){
    if(value.length){
        return (
            <ul>
                {value.map((v, key) => <li key={key}><Template value={v} options={itemOpts}/></li>)}
            </ul>
        )
    } else { return <span/> }
}

function GenericObj({value, options: {staticTemplate, fields={}, ...options} = {}}){
    return (
        <dl>
            {Object.keys(value).map(k => {
                let { staticTemplate: Template = GenericStaticView, ...options } = fields[k] || {}
                return [
                    <dt>{k}</dt>,
                    <dd><Template value={value[k]} options={options}/></dd>
                ]
            })}
        </dl>
    ) 
}

function genericLocalsPlaceholder({attrs: {placeholder, name} = {}, path: [path = undefined] = []}){
    return placeholder || (name && name + '...') || (path && path + '...')
}

function displayable(value){
    return value && (
        (Array.isArray(value) && value.length) || (
            !Array.isArray(value) && (
                (typeof(value) == 'object' && Object.keys(value).length) || (
                    typeof(value) != 'object' ))))
}

function GenericStaticView({value, options: {staticTemplate: Template, ...options}}){

    if(Template){
        return <Template value={value} options={options}/>
    }

    if(Array.isArray(value)){
        return <GenericList value={value} options={options}/>
    }

    if(value && typeof(value) == 'object'){
        return <GenericObj value={value} options={options}/>
    }

    return (<span>{value}</span>)
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

      genericDisplay = ({value}) => displayable(value) && (<GenericStaticView value={value} options={options}/>)

      staticDisplay = ({locals, props}) => this.genericDisplay(locals) || this.genericDisplay(props) || genericLocalsPlaceholder(locals)

      descriptor = ({attrs: {placeholder, name} = {}, path: [path = undefined]}) => ( placeholder || name || path)

      getTemplate(){
          let template = super.getTemplate()
          return locals => (
              <div className={`inline-editable ${this.state.editing ? 'editing' : ''} ${this.descriptor(locals)}`}>
                  {this.editButton(locals)}
                  <div style={{display: this.state.editing ? 'inherit' : 'none'}}> 
                      {template(locals)}
                  </div>
                  <div style={{display: this.state.editing ? 'none' : 'inherit' }}> 
                      { this.staticDisplay({locals, props: this.props}) }
                  </div>
              </div>
          )
      }
    }
    return new Inliner(...args);
  }
}

