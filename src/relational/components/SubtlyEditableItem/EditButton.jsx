import React, { PropTypes, Component } from 'react'

export default class EditButton extends Component {
    static defaultProps = {
        editing: false,
        text: {editing: '', notEditing: ''}
    }

    static propTypes = {
        editing: PropTypes.bool.isRequired,
        text: PropTypes.object,
        onClick: PropTypes.func
    }

    render(){
        let { editing, text, editingText, ...actions } = this.props
        return (
            <button {...actions} className={`edit ${(editing ? 'editing' : '')}`} type="button">
                <i/>
                {editing ? text.editing : text.notEditing}
            </button>
        )
    }
}

