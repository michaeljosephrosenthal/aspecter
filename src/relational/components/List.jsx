import React from 'react'
import { toTitle } from '../utils'

export default class List extends React.Component {

    static propTypes = {
        ItemView: React.PropTypes.func.isRequired,
        type: React.PropTypes.object.isRequired,
        plural: React.PropTypes.string,
        listControls: React.PropTypes.array,
        items: React.PropTypes.array
    }

    render(){
        let { listControls=[], items=[], ItemView, plural, ...controlProps } = this.props
        return (
            <div className={plural.toLowerCase()}>
                <div className="col-xs-12">
                    <h1 className="col-xs-6">{toTitle(plural)}</h1>
                    <div>
                        {listControls.map(Control => (<Control {...controlProps}/>))}
                    </div>
                </div>
                <div className="col-xs-12">
                    {items.map(i => (
                        <div key={i._id} className="col-xs-12">
                            <ItemView {...i}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
