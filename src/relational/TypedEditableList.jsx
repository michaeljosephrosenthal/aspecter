import React from 'react'
import EditableItem from './EditableItem'

function toTitle(str){
    return str
        .replace(/([a-z][A-Z])/g, g => g[0] + ' ' + g[1])
        .replace(/^([a-zA-Z])| ([a-zA-Z])/g, g => g.toUpperCase())
}

export default class TypedEditableList extends React.Component {

    state = { adding: false }

    insert = (...args) => {
        this.setState({adding: false});
        return this.props.actions.insert(...args)
    }

    static propTypes = {
        ItemView: React.PropTypes.func.isRequired,
        Form: React.PropTypes.func.isRequired,
        type: React.PropTypes.object,
        actions: React.PropTypes.object.isRequired,
        listControls: React.PropTypes.array,
        items: React.PropTypes.array
    }

    render(){
        let { listControls=[], type, items, ...itemProps} = this.props
        return (
            <div className={type.plural.toLowerCase()}>
                <div className="col-xs-12">
                    <h1 className="col-xs-6">{toTitle(type.plural)}</h1>
                    {this.state.adding ?
                        <div className="col-xs-12 profile">
                            <itemProps.Form commit={this.insert} hide={_=>this.setState({adding: false})}
                                value={{id: items.reduce((max,p) => (p.id > max ? p.id : max), 0)+1}} />
                        </div> :
                        <div>
                            {listControls.map(Control => (<Control type={type} actions={itemProps.actions}/>))}
                            <button className="add-btn btn btn-primary" onClick={_ => this.setState({adding: true})}>Add new {toTitle(type.name)}</button>
                        </div>
                    }
                </div>
                <div className="col-xs-12">
                    {items.map(i => (
                        <div key={i._id} className="col-xs-12">
                            <EditableItem type={type} {...itemProps} value={i}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
