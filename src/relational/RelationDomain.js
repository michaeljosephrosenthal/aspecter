import { Domain, persister } from 'polypack!bufflehead'

import { expandType, toTitle } from './utils'
import relationRoute from './relationRoute'
import { List, SubtlyEditableItem } from './components'


export default class RelationDomain extends Domain {
    constructor({
        type, singular, plural,
        dataFlows = persister.defaultDataFlows,
        components: {
            ItemView,
            ItemWrapper = SubtlyEditableItem,
            SetView, 
            SetWrapper  = List
        }
    }){
        SetView = SetView || ItemView
        type = expandType(Object.assign({ name: toTitle(singular) }, type))
        let route = relationRoute({
            type, singular, plural, 
            ItemView, SetView,
            ItemWrapper, SetWrapper
        })
        super({
            name: plural,
            dbPrefix: singular,
            type,
            dataFlows,
            route
        })
    }

}
