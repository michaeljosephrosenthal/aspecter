import 'babel-polyfill'
import DomainDrivenFullstackApplication, * as bufflehead from 'polypack!bufflehead'

import postsOriginal from './posts'
let posts = postsOriginal

import editorOriginal from './editor'
let editor = editorOriginal

import generateRoot from './root'
const root = generateRoot({posts, editor})

import { Route } from 'react-router'
import React from 'react'

const settings = bufflehead.settings({
    "title": 'Bufflehead • Blaggard',
    "server": {
        "host": "localhost",
        "port": "3000",
    },
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

let app = new DomainDrivenFullstackApplication({
    domains: { root, posts, editor, settings }
})

app.main()

if (module.hot) {
    console.log("[HMR] Waiting for server-side updates");

    module.hot.accept("./posts", () => {
        console.log("reimporting posts and rerunning main");
        posts = require("./posts").default;
        app = new DomainDrivenFullstackApplication({
            domains: { root, posts, editor, settings }
        })
        app.main()
    });

    module.hot.accept("./editor", () => {
        console.log("reimporting editor and rerunning main");
        posts = require("./editor").default;
        app = new DomainDrivenFullstackApplication({
            domains: { root, posts, editor, settings }
        })
        app.main()
    });

    module.hot.addStatusHandler((status) => {
        if (status === "abort") {
            setTimeout(() => process.exit(0), 0);
        }
    });
}

