import React from 'react'
export default _ => (
    <div id="toolbar" className="toolbar">
        <span className="ql-formats">
            <select defaultValue="0" className="ql-header">
                <option value="1">Heading</option>
                <option value="2">Subheading</option>
                <option value="0">Normal</option>
            </select>
            <select defaultValue="0" className="ql-font">
                <option value="0">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
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
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
            <select defaultValue="" className="ql-align">
                <option value=""></option>
                <option value="center"></option>
                <option value="right"></option>
                <option value="justify"></option>
            </select>
        </span>
        <span className="ql-formats">
            <button className="ql-link"></button>
            <button className="ql-image"></button>
            <button className="ql-code-block" value="markdown"></button>
            {/*<select defaultValue="" className="ql-code-block">
                <option value=""></option>
                <option value="javascript">js</option>
                <option value="markdown">md</option>
                </select>*/}
        </span>
        <span className="ql-formats">
            <button className="ql-clean"></button>
        </span>
    </div>
)
