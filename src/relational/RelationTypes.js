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
            Object.keys(item).length == 1 ? Reference :
                MaterializedChild
        return type
    }

    Child.prototype.materialize = function({[key]: relation}){
        let index = Integer.is(this) ? this : this.index
        return MaterializedChild({index, ...relation[index]})
    }
    Child.prototype.serialize = function(){
        return Integer.is(this) ? this : Integer(this.index)
    }

    let listName = `${structLike.displayName}RelationTargetList`
    let TargetList = t.refinement(t.list(Child, listName), _=>true, listName)

    TargetList.meta.editor = {
        template: buildRelationalTargetList(Child, key)
    }

    return TargetList
}

function materializeList(list, ...args){
    debugger;
    return list.map(item => item.materialize(...args))
}

function serializeList(list, ...args){
    return list.map(item => item.serialize(...args))
}

export function RelationContainer(structLike, key){
    structLike.prototype.materialize = function({[key]: relation}){
        return structLike.update(this, {[key]: {
            $set: materializeList(this[key], {[key]: relation})
        }})
    }
    structLike.prototype.serialize = function(){
        return structLike.update(this, {[key]: {
            $set: serializeList(this[key])
        }})
    }
    return structLike
}

export function ParentRelation(structLike, internalRelations={}){
    structLike.prototype.materialize = function(){
        let self = this
        Object.keys(internalRelations).forEach(destination => {
            let source = {[internalRelations[destination]]: this[internalRelations[destination]]}
            self = structLike.update(this, {
                [destination]: {$set: materializeList(this[destination], source)}
            })
        })
        return self
    }
    structLike.prototype.serialize = function(){
        let self = this
        Object.keys(internalRelations).forEach(destination => {
            self = structLike.update(this, {
                [destination]: {$set: serializeList(this[destination])}
            })
        })
        return self
    }
    return structLike
}
