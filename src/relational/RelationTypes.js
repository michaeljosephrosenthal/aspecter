import t from 'tcomb'

const Integer = t.refinement(t.Number, (n) => n % 1 === 0, 'Integer');

function listContainsMatch(list, predicate){
  return list.filter(element => predicate(element)).length > 0
}

export function ChildRelationList(structLike, key){
    let MaterializedChild = t.struct.extend([structLike, { index: Integer }], 'MaterializedChild')
    let Child = t.union([MaterializedChild, Integer], 'Child')

    Child.dispatch = function dispatch(item){
        return Integer.is(item) ? Integer : MaterializedChild
    }

    Child.prototype.materialize = function({[key]: relation}){
        let index = Integer.is(this) ? this : this.index
        return MaterializedChild({index, ...relation[index]})
    }
    Child.prototype.serialize = function(){
        return Integer.is(this) ? this : Integer(this.index)
    }

    return t.list(Child, 'RelationList')
}

function materializeList(list, ...args){
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
