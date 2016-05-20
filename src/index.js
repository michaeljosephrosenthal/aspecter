import 'babel-polyfill'
import DomainDrivenFullstackApplication, * as bufflehead from 'polypack!bufflehead'

import posts from './posts'
import generateRoot from './root'
const root = generateRoot({posts})

import { Route } from 'react-router'
import React from 'react'

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
    domains: { root, posts, settings }
})

app.main()
