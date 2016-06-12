/*
Language: Markdown
Requires: xml.js
Author: John Crepezzi <john.crepezzi@gmail.com>
Website: http://seejohncode.com/
Category: common
*/

function contains({list, item}){
    return list.filter(i => i == item).length
}

export default function nestedBlock(block, surroundingClasses=[], blocks){
    surroundingClasses.push(block.className)
    block.contains = blocks
        .filter(({className}) => !contains({list: surroundingClasses, item: className}))
        .map(b => nestedBlock(b, surroundingClasses, blocks))
    return Object.assign({endsWithParent: true}, block)
}

function nestableHighlights(blocks){
    return blocks.map(block => nestedBlock(block, [], blocks))
}

const nestables = nestableHighlights([
    // code snippets
    {
        className: 'code',
        variants: [
            { begin: '^```\w*\s*$', end: '^```\s*$' },
            { begin: '`.+`' },
            {
                begin: '^( {4}|\t)',
                end: '$',
                relevance: 0
            }
        ]
    },
    // strong segments
    {
        className: 'strong',
        begin: '[*_]{2}.+?[*_]{2}'
        /*variants: [
            quoted('__'),
            quoted('\\*\\*'),
        ]*/
    },
    // emphasis segments
    {
        className: 'emphasis',
        variants: [
            { begin: '\\*.+?\\*' },
            { begin: '_.+?_' , relevance: 0 }
        ]
    },
])

function header(number){
    return {
        className: `header h${number}`,
        contains: nestables,
        variants: [
            { begin: `^${Array(number+1).join("#")}(?!#)`, end: '$' },
            { begin: '^.+?\\n[=-]{2,}$' }
        ]
    }
}

export default function(hljs) {
    return {
        aliases: ['md', 'mkdown', 'mkd'],
        contains: [
            // highlight headers
            ...([1,2,3,4,5,6].map(header)),
            // inline html
            {
                begin: '<', end: '>',
                subLanguage: 'xml',
                relevance: 0
            },
            // lists (indicators only)
            {
                className: 'bullet',
                contains: nestables,
                begin: '^([*+-]|(\\d+\\.))\\s+'
            },
            // blockquotes
            {
                className: 'blockquote',
                begin: '^>\\s+', end: '$'
            },
            // horizontal rules
            {
                className: 'horizontal_rule',
                begin: '^[-\\*]{3,}', end: '$'
            },
            // using links - title and link
            {
                begin: '\\[.+?\\][\\(\\[].*?[\\)\\]]',
                returnBegin: true,
                contains: [
                    {
                    className: 'link_label',
                    begin: '\\[', end: '\\]',
                    excludeBegin: true,
                    returnEnd: true,
                    relevance: 0
                },
                {
                    className: 'link_url',
                    begin: '\\]\\(', end: '\\)',
                    excludeBegin: true, excludeEnd: true
                },
                {
                    className: 'link_reference',
                    begin: '\\]\\[', end: '\\]',
                    excludeBegin: true, excludeEnd: true
                }
                ],
                relevance: 10
            },
            {
                begin: '^\\[\.+\\]:',
                returnBegin: true,
                contains: [
                    {
                    className: 'link_reference',
                    begin: '\\[', end: '\\]:',
                    excludeBegin: true, excludeEnd: true,
                    starts: {
                        className: 'link_url',
                        end: '$'
                    }
                }
                ]
            },
            ...nestables
        ]
    };
}
