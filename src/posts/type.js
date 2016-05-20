import t from 'tcomb'

export default t.struct({
    title: t.String,
    text: t.String,
    //default: t.String,
    //articles: t.dict(t.String, t.String),
    //snippets: t.dict(t.String, t.String)
})
