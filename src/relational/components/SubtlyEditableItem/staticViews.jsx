import React from 'react'

export function GenericList({value, options: {item: {staticTemplate: Template=GenericStaticView, ...itemOpts}={}}}){
    if(value.length){
        return (
            <ul>
                {value.map((v, key) => <li key={key}><Template value={v} options={itemOpts}/></li>)}
            </ul>
        )
    } else { return <span/> }
}

export function GenericObj({value, options: {staticTemplate, fields={}, ...options} = {}}){
    return (
        <dl>
            {Object.keys(value).map(k => {
                let { staticTemplate: Template = GenericStaticView, ...options } = fields[k] || {}
                return [
                    <dt>{k}</dt>,
                    <dd><Template value={value[k]} options={options}/></dd>
                ]
            })}
        </dl>
    ) 
}

export function genericLocalsPlaceholder({attrs: {placeholder, name} = {}, path: [path = undefined] = []}){
    return placeholder || (name && name + '...') || (path && path + '...')
}

export default function GenericStaticView({value, options: {staticTemplate: Template, ...options}}){

    if(Template){
        return <Template value={value} options={options}/>
    }

    if(Array.isArray(value)){
        return <GenericList value={value} options={options}/>
    }

    if(value && typeof(value) == 'object'){
        return <GenericObj value={value} options={options}/>
    }

    return (<span>{value}</span>)
}
