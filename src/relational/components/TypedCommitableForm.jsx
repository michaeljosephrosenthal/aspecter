import React from 'react'
import t from 'tcomb-form'
import equal from 'deep-equal'

const defaultOptions = {
    config: {
        horizontal: {
            md: [2, 10],
            sm: [2, 10]
        }
    }
}

export default class TypedCommitableForm extends React.Component {
    static propTypes = {
        baseType: React.PropTypes.func.isRequired,
        name: React.PropTypes.string,
        serialize: React.PropTypes.func.isRequired,
        commit: React.PropTypes.func.isRequired,
        options: React.PropTypes.object
    }

    state = { value: this.props.value, deleting: false }

    componentWillReceiveProps = ({value}) => {
        if(!equal(value, this.state.value))
            this.setState({value: value});
    }

    onSubmit = event => {
        let {value, hide, commit, serialize} = this.props
        event.preventDefault()
        const formValue = this.refs.form.getValue()
        if (formValue) {
            commit( serialize(Object.assign({}, value, formValue)) )
            hide()
        }
    }

    onChange = value => this.setState({value: value})

    render(){
        let isDeleting = bool => this.setState({deleting: bool})
        let { value, deleting } = this.state
        let { hide, remove, baseType, name, options={} } = this.props
        return (
            <form onSubmit={this.onSubmit} className="form-horizontal">
                <t.form.Form ref="form" type={baseType} options={Object.assign(defaultOptions, options)} value={value}
                    onChange={this.onChange}
                />
                { deleting && remove ? 
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">Are you sure you want to delete this {name}?</div>
                        <div className="btn-group btn-group-justified" >
                            <a onClick={_ => remove(value)} className="btn btn-danger"> Yes, Delete </a>
                            <a onClick={_ => isDeleting(false)} className="btn btn-default"> Cancel </a>
                        </div>
                    </div> :
                    <div className="form-group">
                        <div className="btn-group pull-right" >
                            <button type="submit" className="btn btn-primary">Save</button>
                            <a onClick={hide} className="btn btn-warning">cancel</a>
                            { remove && <a onClick={_ => isDeleting(true)} className="btn btn-danger">delete</a> }
                        </div>
                    </div> }
            </form>
        )
    }
}
