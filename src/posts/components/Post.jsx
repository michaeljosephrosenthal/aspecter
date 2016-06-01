import React from 'react'
import marked from 'marked'

if($ES.CONTEXT == 'BROWSER')
    require('./post.scss');

function Markdown({text}){
    return typeof(text) == 'string' ?
        <div className="markdown" dangerouslySetInnerHTML={{__html: marked(text)}} /> :
        text 
}

export class Snippets extends React.Component {
    render(){
        let { snippets } = this.props
        return <div className="snippets">
            {React.isValidElement(snippets) ? snippets :
                snippets.map(({summary, markdown, tags}, index) => (
                    <div key={index}>
                        <div className='summary'>{summary}</div>
                        <Markdown text={markdown} />
                    </div>
                ))
            }
        </div>
    }
}

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
