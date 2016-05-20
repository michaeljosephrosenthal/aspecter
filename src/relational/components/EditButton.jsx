import React, { PropTypes, Component } from 'react'

export default React.createClass({
    getDefaultProps(){ return {
        editing: false,
        editingIcon: 'save',
        icon: 'pencil',
    } },
    propTypes : {
        editing: PropTypes.bool.isRequired,
        onClick: PropTypes.func
    },
    render(){
        let { editing, editingIcon, icon, ...actions } = this.props
        return (
            <button {...actions}
                className="circular ui icon button top left corner edit"                  type="button">
              <i className={"icon " + (editing ? editingIcon : icon)}></i>
              edit
            </button>
        )
    }
})
