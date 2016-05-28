import t from 'tcomb'
import React from 'react'

let Snippet = t.struct({
    summary: t.String,
    markdown: t.String,
    tags: t.list(t.String),
}, 'Snippet')

let View = t.struct({
    key: t.String,
    tags: t.list(t.String),
    snippets: t.list(Snippet),
}, 'View')

/*function validSnippets({views, snippets}){
    Object.keys(views).map(k => views[k].snippets)
}, t.refinement(_=>true)*/

let Type = t.struct({
    title: t.String,
    hook: t.String,
    snippets: t.list(Snippet),
    views: t.list(View),
    tags: t.list(t.String),
    //meta: t.dict(t.String, t.String),
}, 'Post')

Type.defaults = (value, defaults = {
    title: '',
    hook: '',
    snippets: [],
    views: [
        View({
            key: 'default',
            snippets: [],
            tags: [],
        })
    ],
    tags: [],
}) => Object.assign(defaults, value)

export default Type
