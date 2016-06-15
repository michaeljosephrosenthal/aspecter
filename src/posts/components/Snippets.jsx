import React from 'react'
import marked from 'marked'

function Markdown({text}){
    return typeof(text) == 'string' ?
        <div className="markdown" dangerouslySetInnerHTML={{__html: marked(text)}} /> :
        text 
}

export class Snippet extends React.Component {
    render(){
        let {summary, markdown} = this.props
        return (
            <div className='snippet'>
                <div className='summary'>{summary}</div>
                <Markdown text={markdown} />
            </div>
        )
    }
}

export class Snippets extends React.Component {
    render(){
        let { snippets } = this.props
        return <div className="snippets">
            {React.isValidElement(snippets) ? snippets :
                snippets.map((snippet, index) => (
                    <div key={index}>
                        <Snippet {...snippet}/>
                    </div>
                ))
            }
        </div>
    }
}

export class Snippets extends React.Component {
    render(){
        let { snippets } = this.props
        return <div className="snippets">
            {React.isValidElement(snippets) ? snippets :
                snippets.map((snippet, index) => (
                    <div key={index}>
                        <Snippet {...snippet}/>
                    </div>
                ))
            }
        </div>
    }
}
