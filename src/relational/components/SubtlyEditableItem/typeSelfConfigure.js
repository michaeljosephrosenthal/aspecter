export default function recursivelyConfigureFieldsFromTypes (
    { meta: { props = {} , editor = {}, kind, type } } = {}
){
    if(kind == 'list')
        Object.assign(editor, {'item': configureChild(type)});

    const fields = Object.keys(props).reduce((config, key) => {
        config[key] = configureChild(props[key])
        return config
    }, {}) || {}

    if(Object.keys(fields).length)
        editor.fields = fields

    return editor
}
