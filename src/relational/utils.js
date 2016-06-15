import t from 'tcomb'
import slug from 'slug'

export function toTitle(str){
    return str
        .replace(/([a-z][A-Z])/g, g => g[0] + ' ' + g[1])
        .replace(/^([a-zA-Z])| ([a-zA-Z])/g, g => g.toUpperCase())
}

export function Persistable(BaseType, name){
    let Identified =  t.struct.extend([BaseType, t.struct({ _id: t.String })])
    let Persisted = t.struct.extend([Identified, t.struct({ _rev: t.String })])
    let Type = t.union([BaseType, Identified, Persisted], name)
    Type.dispatch = function dispatch(doc) {
        return doc._rev && doc._id ? Persisted :
            doc._id ? Identified :
            BaseType
    };
    return Type
}

export function serializer(Type, type, fields, sluggify){
    sluggify = sluggify || (doc => `${type.toLowerCase()}/${fields.map(f => slug(doc[f].toString().toLowerCase())).join('&')}`)
    return (doc) => {
        let typed = Type(Object.assign({}, doc, {_id: sluggify(doc)}))
        if(typed.serialize)
            return typed.serialize()
        return typed
    }
}

export function expandType({Type, name, serialize: { fields = ['id'], sluggify } = {}}){
    let persistable = Persistable(Type, name)
    return {
        name,
        BaseType: Type,
        Persistable: persistable,
        serialize: serializer(persistable, name, fields, sluggify)
    }
}
