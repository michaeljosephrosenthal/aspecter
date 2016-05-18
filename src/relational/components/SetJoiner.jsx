import React from 'react'
import Select from 'react-select'
import { intersection } from 'ramda'

if ($ES.CONTEXT == 'BROWSER') require('./setjoiner.scss')

function toTitle(str){
    return str
        .replace(/([a-z][A-Z])/g, g => g[0] + ' ' + g[1])
        .replace(/^([a-zA-Z])| ([a-zA-Z])/g, g => g.toUpperCase())
}

function findChildren({attribute, childSet: {attribute: childAttr, items}}){
    return items.map(
        item => ({
            score: intersection(attribute || [], item[childAttr] || []) || [],
            item
        })
    ).filter(ch => ch.score.length)
}


export default class SetJoiner extends React.Component {

    static propTypes = { sets: React.PropTypes.object }

    state = { parent: this.props.parent }

    selectParent = ({value: parent}) => this.setState({parent})

    buildParentChildrenFinder = _ => {
        let { sets } = this.props
        let parentAttr = sets[this.state.parent].attribute
        let childSets = Object.keys(sets)
            .filter(k => k != this.state.parent)
            .map(k => sets[k])
        return parent => {
            let wrapper = {parent: parent}
            childSets.forEach(childSet => {
                let children = findChildren({attribute: parent[parentAttr], childSet})
                if (children.length)
                    wrapper[childSet.plural] =  children;
            })
            return wrapper
        }
    }

    buildStructuredJoin = _ => {
        let { sets } = this.props
        let { parent } = this.state
        return sets[parent].items.map(this.buildParentChildrenFinder())
    }

    render(){
        let { sets, title, parent: _, ...rest } = this.props
        let ParentItemView = sets[this.state.parent || this.props.parent].ItemView
        return (
            <div {...rest}>
                <div className="col-xs-12">
                    <h1 className="col-xs-8">{title}</h1>
                    <div className="col-xs-4 input-group">
                        <span className="input-group-addon">Parent</span>
                        <Select name="parent"
                            value={this.state.parent}
                            options={Object.keys(sets).map(o => ({value: o, label: o}))}
                            onChange={this.selectParent}/>
                    </div>
                </div>
                <ul className="col-xs-12 set-join">
                    <div className="col-xs-12">
                        {this.buildStructuredJoin().map(({parent, ...children}) => (
                            <div key={parent._id} className="parent">
                                <ParentItemView {...parent}/>
                                {Object.keys(children).map(setKey => (
                                    <div key={setKey} className="children">
                                        {children[setKey].length && (<h4 className="child-header">Matched {toTitle(setKey)}</h4>)}
                                        {children[setKey].map(({score, item}) => {
                                            let ChildItemView = sets[setKey].ItemView
                                            return (
                                                <div key={item._id} className={`child score-${score}`}>
                                                    <ChildItemView {...item}/>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </ul>
            </div>
        )
    }
}
