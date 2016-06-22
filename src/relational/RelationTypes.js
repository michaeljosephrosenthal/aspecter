import t from 'tcomb'
import buildRelationalSourceList from './components/RelationalSourceList'
import buildRelationalTargetList from './components/RelationalTargetList'

const Integer = t.refinement(t.Number, (n) => n % 1 === 0, 'Integer');
const Reference = t.struct({ index: Integer }, 'Reference')

function listContainsMatch(list, predicate){
  return list.filter(element => predicate(element)).length > 0
}

export function SourceList(structLike, key){
    let SourceList = t.list(structLike, `${structLike.displayName}RelationSourceList`)
    SourceList.meta.editor = { staticTemplate : buildRelationalSourceList(key) }
    return SourceList
}

export function ChildRelationList(structLike, key){
    let MaterializedChild = t.struct.extend([structLike, {index: Integer}], `Materialized${structLike.displayName}`)
    let Child = t.union([MaterializedChild, Reference, Integer], `${structLike.displayName}ReferenceUnion`)

    Child.dispatch = function dispatch(item){
        let type = Integer.is(item) ? Integer :
            MaterializedChild.is(item) ? MaterializedChild :
            Reference
        return type
    }

    Child.materialize = function({reference, [key]: relation}){
        let index = Integer.is(reference) ? reference : reference.index
        return MaterializedChild({index, ...relation[index]})
    }

    Child.serialize = function({reference}){
        return Integer.is(reference) ? reference : Integer(reference.index)
    }

    let TargetList = t.list(Child, `${structLike.displayName}RelationTargetList`)

    TargetList.materialize = function({reference: list, ...args}){
        return list.map(reference => Child.materialize({reference, ...args}))
    }

    TargetList.serialize = function({reference: list}){
        return list.map(reference => Child.serialize({reference}))
    }

    TargetList.meta.editor = {
        template: buildRelationalTargetList(key)
    }

    return TargetList
}

export function RelationContainer(structLike, key){
    let containedRelationType = structLike.meta.props[key]
    structLike.materialize = function({reference: container, [key]: relation}){
        return structLike.update(container, {[key]: {
            $set: containedRelationType.materialize({reference: container[key], [key]: relation})
        }})
    }
    structLike.serialize = function({reference: container}){
        return structLike.update(container, {[key]: {
            $set: containedRelationType.serialize({reference: container[key], [key]: relation})
        }})
    }
    return structLike
}

export function RelationContainerList(structLike, key){
    let Child = RelationContainer(structLike, key)

    let TargetList = t.list(Child, `${structLike.displayName}RelationContainerList`)

    TargetList.materialize = function({reference: list, ...args}){
        return list.map(reference => Child.materialize({reference, ...args}))
    }

    TargetList.serialize = function({reference: list}){
        return list.map(reference => Child.serialize({reference}))
    }

    return TargetList
}


export function ParentRelation(structLike, internalRelations={}){
    structLike.prototype.materialize = function(){
        let self = this
        Object.keys(internalRelations).forEach(destination => {
            let source = {[internalRelations[destination]]: this[internalRelations[destination]]}
            let destType = structLike.meta.props[destination]
            self = structLike.update(this, {
                [destination]: {$set: destType.materialize({reference: this[destination], ...source})}
            })
        })
        return self
    }
    structLike.prototype.serialize = function(){
        let self = this
        Object.keys(internalRelations).forEach(destination => {
            let destType = structLike.meta.props[destination]
            self = structLike.update(this, {
                [destination]: {$set: destType.serialize({reference: this[destination]})}
            })
        })
        return self
    }
    return structLike
}
