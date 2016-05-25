import React from 'react'

if($ES.CONTEXT == 'BROWSER')
    require('./post.scss');

export default class Post extends React.Component {
    render(){
        let {title, text} = this.props
        return (
            <div className="post">
                <h4>{title}</h4>
                <div className="description">
                    {text}
                </div>
            </div>
        )
    }
}
