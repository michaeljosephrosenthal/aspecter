import React from 'react'

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
