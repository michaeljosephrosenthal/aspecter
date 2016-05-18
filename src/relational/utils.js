import t from 'tcomb'
import slug from 'slug'

export function toTitle(str){
    return str
        .replace(/([a-z][A-Z])/g, g => g[0] + ' ' + g[1])
        .replace(/^([a-zA-Z])| ([a-zA-Z])/g, g => g.toUpperCase())
}

export function Persistable(BaseType, name){
    let Identified = BaseType.extend([t.struct({ _id: t.String })])
    let Persisted = Identified.extend([t.struct({ _rev: t.String })])
    let Type = t.union([BaseType, Identified, Persisted], name)
    Type.dispatch = function dispatch(doc) {
        return doc._rev && doc._id ? Persisted :
            doc._id ? Identified :
            BaseType
    };
    return Type
}

export function serializer(Type, type, fields, sluggify){
    sluggify = sluggify || (doc => fields.map(f => slug(doc[f].toString().toLowerCase())).join('&'))
    return (doc) => Type(Object.assign({}, doc, {_id: `${type}/${sluggify(doc)}`}))
}

export function expandType({Type, name, serialize: { fields = ['id'], sluggify } = {}}){
    return {
        name,
        BaseType: Type,
        Type: Persistable(Type, name),
        serialize: serializer(Type, name, fields, sluggify)
    }
}
