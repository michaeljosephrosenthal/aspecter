import React from 'react'
export default _ => (
    <div id="toolbar" className="toolbar">
        <span className="ql-formats">
            <select className="ql-header">
                <option defaultValue="1">Heading</option>
                <option defaultValue="2">Subheading</option>
                <option selected={true}>Normal</option>
            </select>
            <select className="ql-font">
                <option selected={true}>Sans Serif</option>
                <option defaultValue="serif">Serif</option>
                <option defaultValue="monospace">Monospace</option>
            </select>
        </span>
        <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
        </span>
        <span className="ql-formats">
            <select className="ql-color"></select>
            <select className="ql-background"></select>
        </span>
        <span className="ql-formats">
            <button className="ql-list" defaultValue="ordered"></button>
            <button className="ql-list" defaultValue="bullet"></button>
            <select className="ql-align">
                <option selected={true}></option>
                <option defaultValue="center"></option>
                <option defaultValue="right"></option>
                <option defaultValue="justify"></option>
            </select>
        </span>
        <span className="ql-formats">
            <button className="ql-link"></button>
            <button className="ql-image"></button>
            <button className="ql-code-block"></button>
        </span>
        <span className="ql-formats">
            <button className="ql-clean"></button>
        </span>
    </div>
)
