import t from 'tcomb-form'
import equal from 'deep-equal'
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
        console.log(props)
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

    save = event => {
        let {value, type: {serialize, ...rest}, actions: {insert} = {}} = this.props
        event.preventDefault()
        const formValue = this.refs.form.getValue()
        if (formValue) {
            insert( serialize(Object.assign({}, value, formValue)) )
            this.setState({editing: false})
        }
    }

    onChange = value => this.setState({value})

    render(){
        let {type: {name, Type, BaseType, serialize}, Template, actions: {remove} = {}} = this.props
        let {editing, options, deleting, value } = this.state
        return (
            <div className={`${name.toLowerCase()} item-view`}>
                <EditButton onClick={_=>this.setState({editing: !editing})} editing={editing != false}/>
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
                <div className="actions">
                    { deleting && remove ? (
                        <div className="deleting group">
                            <div className="alert deleting" role="alert">Are you sure you want to delete this {name}?</div>
                            <a onClick={_ => remove(value)} className="delete"> Yes, Delete </a>
                            <a onClick={_ => isDeleting(false)} className="cancel"> Cancel </a>
                        </div>
                    ) : (
                        <div className="default group">
                            <button className="save" onClick={this.save} >Save</button>
                            <a onClick={_ => this.setState({editing: false})} className="cancel">Cancel</a>
                            { remove && <a onClick={_ => isDeleting(true)} className="delete">delete</a> }
                        </div> 
                    )}
                </div>
            </div>
        )
    }
}

