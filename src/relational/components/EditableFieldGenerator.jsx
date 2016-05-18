import React, { PropTypes, Component } from 'react'
import t from 'tcomb-form'
import EditButton from './EditButton'

export default class EditableFieldGenerator {

  constructor(...args) {

    const props = args[0];
    const options = {
      ...props.options,
      factory: null // avoid circular reference
    };

    class Inliner extends t.form.getComponent(props.type, options) {

      state = { editing: false }

      toggle(evt) {
        evt.preventDefault();
        this.state.editing = !this.state.editing;
        this.forceUpdate(); // overrides the default shouldComponentUpdate
      }

      getTemplate() {
        let editing = this.state.editing
        return (locals) => {
          return (
            <div>
              <EditButton onClick={this.toggle.bind(this)} editing={editing} />
              <div className="corner-border top left"/>
              <a href="#" style={{ color: locals.hasError ? '#a94442' : 'normal' }} onClick={this.toggle.bind(this)}>
                  { editing ? template(locals) : locals.value || '...' }
              </a>
            </div>
          );
        };
      }
    }
    return new Inliner(...args);
  }
}

