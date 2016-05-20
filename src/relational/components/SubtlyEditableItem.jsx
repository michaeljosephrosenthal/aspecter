import t from 'tcomb-form'
import React, { PropTypes } from 'react'
import TypedCommitableForm from './TypedCommitableForm'
import EditButton from './EditButton'
import EditableFieldGenerator from './EditableFieldGenerator'

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
        ...generateSubtleOptions(BaseType)
    }
}

export default class ToggleableEditableSubtleForm extends React.Component {
    constructor(props) {
        super(props)
        let { location: { query: {editing = false} = {} } = {} } = props
        this.state = {
            editing,
            options: optionsFromProps(this.props)
        }
    }

    static propTypes = {
        Template: React.PropTypes.func.isRequired,
        type: React.PropTypes.object,
        value: React.PropTypes.object
    }

    render(){
        let {type: {name, Type, BaseType, serialize}, value, Template} = this.props
        let {editing, options } = this.state
        return (
            <div className={`${name.toLowerCase()} item-view`}>
                <EditButton onClick={_=>this.setState({editing: !editing})} editing={editing != false}/>
                {
                    editing ? (
                        <t.form.Form ref="form"
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

