import React, { PropTypes } from 'react'
import TypedCommitableForm from './TypedCommitableForm'
import EditButton from './EditButton'
import EditableFieldGenerator from './EditableFieldGenerator'

function toTcombFormTemplate(template){
    return locals => template(locals.inputs)
}

function generateSubtleOptions(type){
    return {
        fields: Object.keys(type.meta.props)
        .reduce((fields, prop) => {
            fields[prop] = EditableFieldGenerator;
            return fields
        }, {})
    }
}

function optionsFromProps({type, template}){
    return {
        template: toTcombFormTemplate(template),
        ...generateSubtleOptions(type)
    }
}

export default class ToggleableEditableSubtleForm extends React.Component {

    state = {
        editing: false,
        options: optionsFromProps(this.props)
    }

    static propTypes = {
        template: React.PropTypes.func.isRequired,
        type: React.PropTypes.object,
        value: React.PropTypes.object
    }

    render(){
        let {type: {name, Type, BaseType, serialize}, value, template} = this.props
        let {editing, options} = this.state
        return (
            <div className={`${name.toLowerCase()} item-view`}>
                <EditButton onClick={_=>this.setState({editing: !editing})} editing={editing != false}/>
                {
                    editing ? (
                        <t.Form ref="form"
                            type={BaseType}
                            options={options}
                            value={value} />
                        ) :
                        template(value)
                }
            </div>
        )
    }
}

