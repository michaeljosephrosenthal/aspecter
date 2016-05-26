import t from 'tcomb'
import React from 'react'

let Type = t.struct({
    title: t.String,
    markdown: t.String,
    //default: t.String,
    //articles: t.dict(t.String, t.String),
    //snippets: t.dict(t.String, t.String)
})

export default Type
