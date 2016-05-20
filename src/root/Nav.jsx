import React from 'react'

export default class Nav extends React.Component {
    render(){
        let { brand, paths, ...props } = this.props
        return (
            <nav {...props}>
                <div className="container">
                    <a className="brand" href="/"> { brand } </a>
                    <ul className="nav items">
                        {paths.map(path => (
                            <li key={path}><a href={path}>{path}</a></li>
                            ))}
                    </ul>
                </div>
            </nav>
        )
    }
}
