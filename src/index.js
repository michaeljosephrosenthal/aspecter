import 'babel-polyfill'
import DomainDrivenFullstackApplication, * as bufflehead from 'polypack!bufflehead'

import articles from './articles'

const settings = bufflehead.settings({
    "db": {
        "name": "aspecter",
        "uri": "http://127.0.0.1:5984",
        "credentials": {
            "admin": {
                "name": "server",
                "password": "server"
            }
        }
    }
})

const app = new DomainDrivenFullstackApplication({
    title: 'Bufflehead • Aspecter',
    domains: { articles }
})

app.main()
