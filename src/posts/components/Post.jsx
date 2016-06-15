import React from 'react'
import marked from 'marked'
import { Snippets } from './Snippets'

if($ES.CONTEXT == 'BROWSER')
    require('./post.scss');

export class ItemView extends React.Component {
    render(){
        let {title, hook, snippets, views, markdown=''} = this.props
        return (
            <div className="post">
                <h4>{title}</h4>
                <div className='hook'>{hook}</div>
                <Snippets {...{snippets}}/>
                <div className="content">
                    <Markdown text={markdown} />
                </div>
            </div>
        )
    }
}

export class SetView extends React.Component {
    render(){
        let { title, hook, views } = this.props
        return (
            <div className="post">
                <h4>{title}</h4>
                <div className='hook'>{hook}</div>
            </div>
        )
    }
}
