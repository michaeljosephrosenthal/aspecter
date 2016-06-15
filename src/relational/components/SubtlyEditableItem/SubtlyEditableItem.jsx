import equal from 'deep-equal'
import React, { PropTypes } from 'react'
import TypedCommitableForm from './TypedCommitableForm'
import EditButton from './EditButton'
import EditableFieldGenerator from './EditableFieldGenerator'

import t from 'tcomb-form/lib'
import en from 'tcomb-form/lib/i18n/en'
import templates from './subtleTcombTemplates'
import configureFormFromType from './typeSelfConfigure'

t.form.Form.i18n = Object.assign({}, en, {
    optional: '' ,
    required: '' ,
    add: '',
    remove: '',
    up: '',
    down: '',
})
t.form.Form.templates = templates

if($ES.CONTEXT == 'BROWSER')
    require('./subtleFormTemplates.scss');


function toTcombFormTemplate(Template){
    if(Template.constructor){
        return locals => (<Template {...locals.inputs}/>)
    } else {
        return locals => Template(locals.inputs)
    }
}

function resolveStructProps({meta: {props, kind, type}}){
    return (kind == 'subtype') ? resolveStructProps(type) : props
}

function generateSubtleOptions(type){
    let props = resolveStructProps(type)
    return {
        fields: Object.keys(props)
            .reduce((fields, prop) => {
                fields[prop] = {
                    factory: EditableFieldGenerator,
                    ...configureFormFromType(props[prop])
                }
                return fields
            }, {})
    }
}

function optionsFromProps({type: {BaseType}, Template}){
    return {
        //template: toTcombFormTemplate(Template),
        auto: 'labels',
        ...generateSubtleOptions(BaseType)
    }
}

function typedValue({value, type: { BaseType } }){
    let typed = (BaseType.defaults) ?
        BaseType(BaseType.defaults(value)) :
        BaseType(value)
    if(typed.materialize)
        return typed.materialize()
    return typed
}
export default class ToggleableEditableSubtleForm extends React.Component {
    constructor(props) {
        super(props)
        let { location: { query: {editing = false} = {} } = {} } = this.props
        this.state = {
            editing,
            value: typedValue(this.props),
            options: optionsFromProps(this.props)
        }
    }

    typedValue(value){
        let { type } = this.props
        return typedValue({value, type})
    }

    setValue = (value) => {
        try {
            value = this.typedValue(value)
            if(!equal(value, this.state.value))
                this.setState({value});
        } catch (err){
            if (!err instanceof TypeError)
                throw err;
        }
    }

    static propTypes = {
        Template: React.PropTypes.func.isRequired,
        type: React.PropTypes.object,
        value: React.PropTypes.object
    }

    componentWillReceiveProps = ({value}) => this.setValue(value)

    save = _ => {
        let {
            value,
            type: {serialize, ...rest},
            actions: {insert, update} = {}
        } = this.props
        const formValue = this.refs.form.getValue()
        if (formValue){ 
            let serialized = serialize(Object.assign({}, value, formValue)) 
            if (serialized._rev){
                update(serialized);
            } else {
                insert(serialized);
            }
        }
        this.setState({editing: false})
    }

    editToggle = event => {
        event.preventDefault()
        this.state.editing ? this.save() : this.setState({editing: true})
    }

    render(){
        let {
            type: {
                name, Type, BaseType, serialize
            },
            Template,
            actions: {remove} = {}
        } = this.props
        let {editing, options, deleting, value } = this.state
        return (
            <div className={`${name.toLowerCase()} top-level item-view inline-editable ${deleting ? 'deleting' : ''} ${editing ? 'editing' : ''}`}>
                { deleting && remove ? (
                    <div className="deleting top actions">
                        <div className="alert deleting" role="alert">Are you sure you want to delete this {name}?</div>
                        <button onClick={_ => remove(value)} className="delete text"><i/> Yes, Delete </button>
                        <button onClick={_ => this.setState({deleting: false})} className="cancel text"><i/> Cancel </button>
                    </div>
                ) : (
                    <div className="top actions">
                        <EditButton onClick={this.editToggle} editing={editing != false}/>
                        { editing && <button onClick={_ => this.setState({editing: false})} className="cancel"><i/></button> }
                        { editing && remove && <button onClick={_ => this.setState({deleting: true})} className="delete"><i/></button> }
                    </div>
                ) }
                {
                    editing ? (
                        <t.form.Form ref="form"
                            onChange={this.setValue}
                            type={BaseType}
                            options={options}
                            value={value} />
                        ) :
                        <Template {...value}/>
                }
            </div>
        )
    }
}

