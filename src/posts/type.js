import t from 'tcomb'
if($ES.CONTEXT == 'BROWSER')
    window.t = t;
import React from 'react'

import { Type as Markdown } from '../editor'
import { types as relational } from '../relational'
import { Snippet as SnippetView } from './components'

let Snippet = t.struct({
    summary: t.String,
    markdown: Markdown,
    tags: t.list(t.String),
}, 'Snippet')

Snippet.meta.editor = {
    staticTemplate: ({value}) => <SnippetView {...value}/>
}

let ViewStruct = t.struct({
    key: t.String,
    tags: t.list(t.String),
    snippets: relational.ChildRelationList(Snippet, 'snippets'),
}, 'View')

let View = relational.RelationContainer(ViewStruct, 'snippets')

function listContainsMatch(list, predicate){
  return list.filter(element => predicate(element)).length > 0
}

let PostStruct = t.struct({
    title: t.String,
    hook: t.String,
    snippets: t.list(Snippet),
    views: t.list(View),
    tags: t.list(t.String),
}, 'Post')


let Post = relational.ParentRelation(PostStruct, {views: 'snippets'})

let Type = t.refinement(Post, ({snippets, views}) => {
    return !listContainsMatch(
        views, ({snippets: snipRefList}) => listContainsMatch(
            snipRefList, (ref) => (ref > snippets.length -1)
        )
    )
}, 'Post')

Type.defaults = (value, defaults = {
    title: '',
    hook: '',
    snippets: [],
    views: [{
        key: 'default',
        snippets: [],
        tags: [],
    }],
    tags: [],
}) => Object.assign(defaults, value)

export default Type
