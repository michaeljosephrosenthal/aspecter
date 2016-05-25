import equal from 'deep-equal'
import React, { PropTypes } from 'react'
import TypedCommitableForm from './TypedCommitableForm'
import EditButton from './EditButton'
import EditableFieldGenerator from './EditableFieldGenerator'

import t from 'tcomb-form/lib'
import en from 'tcomb-form/lib/i18n/en'
import templates from './subtleTcombTemplates'

t.form.Form.i18n = en
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

function generateSubtleOptions(type){
    return {
        fields: Object.keys(type.meta.props)
            .reduce((fields, prop) => {
                fields[prop] = {
                    factory: EditableFieldGenerator
                };
                return fields
            }, {})
    }
}

function optionsFromProps({type: {BaseType}, Template}){
    return {
        template: toTcombFormTemplate(Template),
        auto: 'none',
        ...generateSubtleOptions(BaseType)
    }
}

export default class ToggleableEditableSubtleForm extends React.Component {
    constructor(props) {
        super(props)
        let { location: { query: {editing = false} = {} } = {} } = props
        this.state = {
            editing,
            value: this.props.value,
            options: optionsFromProps(this.props)
        }
    }

    static propTypes = {
        Template: React.PropTypes.func.isRequired,
        type: React.PropTypes.object,
        value: React.PropTypes.object
    }

    componentWillReceiveProps = ({value}) => {
        if(!equal(value, this.state.value))
            this.setState({value});
    }

    save = _ => {
        let {value, type: {serialize, ...rest}, actions: {insert, update} = {}} = this.props
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

    onChange = value => this.setState({value})

    render(){
        let {type: {name, Type, BaseType, serialize}, Template, actions: {remove} = {}} = this.props
        let {editing, options, deleting, value } = this.state
        return (
            <div className={`${name.toLowerCase()} item-view inline-editable ${deleting ? 'deleting' : ''} ${editing ? 'editing' : ''}`}>
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
                            onChange={this.onChange}
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

