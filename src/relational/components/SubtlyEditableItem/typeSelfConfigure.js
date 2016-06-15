export default function configureFormFromType (
    { meta: { props = {} , editor = {}, kind, type } } = {}
){
    if(kind == 'list')
        Object.assign(editor, {'item': configureFormFromType(type)});

    const fields = Object.keys(props).reduce((config, key) => {
        config[key] = configureFormFromType(props[key])
        return config
    }, {}) || {}

    if(Object.keys(fields).length)
        editor.fields = fields

    return editor
}
