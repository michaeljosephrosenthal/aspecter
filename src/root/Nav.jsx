import React from 'react'
import { Link } from 'react-router'

function toTitle(str){
    return str
        .replace(/([a-z][A-Z])/g, g => g[0] + ' ' + g[1])
        .replace(/^\//, g => '')
        .replace(/^([a-zA-Z])| ([a-zA-Z])/g, g => g.toUpperCase())
}

export default class Nav extends React.Component {
    render(){
        let { brand, paths, ...props } = this.props
        return (
            <nav {...props}>
                <div className="container">
                    <Link className="brand" to="/"> { brand } </Link>
                    <ul className="nav items">
                        {paths.map(path => (
                            <li key={path}><Link to={path}>{toTitle(path)}</Link></li>
                            ))}
                    </ul>
                </div>
            </nav>
        )
    }
}
