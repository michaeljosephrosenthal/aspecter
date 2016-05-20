import { Domain } from 'polypack!bufflehead'
import { utils } from 'polypack!domain-driven-redux-react'
import generateComponent from './generateRoot'

export default function generateDomain(domains){
    return new Domain({
        name: 'root',
        route: {
            path: '/',
            component: generateComponent({paths: utils.filterDomainsForType(domains, 'route').map(utils.extractPath)})
        }
    })
}
