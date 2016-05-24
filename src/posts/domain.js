import { RelationDomain, Typed } from '../relational'
import Type from './type'
import Post from './components'
import { Domain, persister } from 'polypack!bufflehead'


export default new RelationDomain({
    plural: 'posts',
    singular: 'post',
    type: {
        Type,
        serialize: {
            fields: ['title']
        }
    },
    components: {
        ItemView: Post,
    }
})
