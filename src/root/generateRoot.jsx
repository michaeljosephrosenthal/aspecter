import React from 'react'
import Nav from './Nav'

if($ES.CONTEXT == 'BROWSER')
    require('./root.scss');

export default function generateRoot({paths}){
    return class Root extends React.Component {
        render(){
            return (
                <div>
                    <Nav paths={paths}/>
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            )
        }
    }
}
