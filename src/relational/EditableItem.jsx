import React from 'react'

export default class Profile extends React.Component {
    static propTypes = {
        Form: React.PropTypes.func.isRequired,
        ItemView: React.PropTypes.func.isRequired,
        type: React.PropTypes.object,
        actions: React.PropTypes.object.isRequired,
        value: React.PropTypes.object
    }
    state = { editing: false }
    editFormWrapper = jsx => {
        let {actions: {update, remove}, type, value, Form} = this.props
        return this.state.editing ?
            <div className={`col-xs-12 ${type.name.toLowerCase()}`}>
                <Form commit={update} remove={remove} hide={_=>this.setState({editing: false})} value={value} />
            </div> : jsx
    }
    render = _ => {
        let {Form, ItemView, type, value} = this.props
        return this.editFormWrapper(
            <div className={type.name.toLowerCase()}>
                <a className="add-btn" onClick={_ => this.setState({editing: true})}>edit</a>
                <ItemView {...value}/>
            </div>
        )
    }
}

