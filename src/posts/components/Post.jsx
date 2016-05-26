import React from 'react'
import marked from 'marked'

if($ES.CONTEXT == 'BROWSER')
    require('./post.scss');

export class ItemView extends React.Component {
    render(){
        let {title, markdown=''} = this.props
        return (
            <div className="post">
                <h4>{title}</h4>
                <div className="content">
                    {typeof(markdown) == 'string' ?
                        <div className="markdown" dangerouslySetInnerHTML={{__html: marked(markdown)}} />
                        : markdown }
                </div>
            </div>
        )
    }
}

export class SetView extends React.Component {
    render(){
        let {title, markdown=''} = this.props
        return (
            <div className="post">
                <h4>{title}</h4>
            </div>
        )
    }
}
