import React from 'react'
import { toTitle } from '../utils'

function AddButton({singular}){
    return ( <a className='add-new' href={`/${singular}/new?editing=true`}> Add </a>)
}

export default class List extends React.Component {

    static propTypes = {
        ItemView: React.PropTypes.func.isRequired,
        type: React.PropTypes.object.isRequired,
        plural: React.PropTypes.string,
        singular: React.PropTypes.string,
        listControls: React.PropTypes.array
    }

    render(){
        let { listControls=[AddButton], ItemView, plural, singular, children, actions, singularProps, ...controlProps } = this.props
        let { singularId } = this.props.params
        let items = this.props[plural]
        return children ?
            React.cloneElement(children, singularProps({items, actions, singularId})) : (
            <div className={`${plural.toLowerCase()} relational list`}>
                <div className="header">
                    <h1 className="title">{toTitle(plural)}</h1>
                    <div className="controls">
                        {listControls.map(Control => (<Control key={Control.name} actions={actions} singular={singular} {...controlProps}/>))}
                    </div>
                </div>
                <div className="items">
                    {items.map(i => (
                        <a key={i._id} className={`${singular.toLowerCase()} item`} href={`/${i._id}`}>
                            <ItemView {...i}/>
                        </a>
                    ))}
                </div>
            </div>
        )
    }
}
