import React from 'react'

export default function shadowParent({child: Child, props: shadowProps}) {
    return props => (
        <Child {...props} {...shadowProps}/>
    )
}

