import React from 'react'
import { toTitle } from '../utils'
import { Link } from 'react-router'

if($ES.CONTEXT == 'BROWSER')
    require('./list.scss');

function AddButton({singular}){
    return ( <Link className='add-new' to={`/${singular}/new?editing=true`}> Add </Link>)
}

export default class List extends React.Component {

    static propTypes = {
        ItemView: React.PropTypes.func.isRequired,
        type: React.PropTypes.object.isRequired,
        plural: React.PropTypes.string,
        singular: React.PropTypes.string,
        listControls: React.PropTypes.array,
        singularPropSelector: React.PropTypes.func,
    }

    render(){
        let { listControls=[AddButton], ItemView, plural, singular, children, actions, singularPropSelector, ...controlProps } = this.props
        let { singularId } = this.props.params
        let items = this.props[plural]
        return children ?
            React.cloneElement(children, singularPropSelector({items, actions, singularId})) : (
            <div className={`${plural.toLowerCase()} relational list`}>
                <div className="header">
                    <h1 className="title">{toTitle(plural)}</h1>
                    <div className="controls">
                        {listControls.map(Control => (<Control key={Control.name} actions={actions} singular={singular} {...controlProps}/>))}
                    </div>
                </div>
                <div className="items">
                    {items.map(i => (
                        <Link key={i._id} className={`${singular.toLowerCase()} item`} to={`/${i._id}`}>
                            <ItemView {...i}/>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
}
