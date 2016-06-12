import { Domain } from 'polypack!bufflehead'

export const MarkdownEditor = ($ES.CONTEXT == 'BROWSER') ? require('./MarkdownEditor').default : () => (<div/>)

export Type from './type.jsx'

export default new Domain({
    name: 'editor',
    route: { component: MarkdownEditor }
})
