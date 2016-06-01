import { Domain } from 'polypack!bufflehead'
const MarkdownEditor = ($ES.CONTEXT == 'BROWSER') ? require('./MarkdownEditor').default : () => (<div/>)

export default new Domain({
    name: 'editor',
    route: { component: MarkdownEditor }
})
