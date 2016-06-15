import React from 'react'
import Quill from 'quill'
import Toolbar from './Toolbar'

export default class QuillComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value || ''
        }
    }

    createEditor($el, config) {
        var editor = new Quill($el, config);
        return editor;
    }

    destroyEditor(editor) {
        editor.destroy();
    }

    setEditorReadOnly(editor, value) {
        value? editor.editor.disable()
            : editor.editor.enable();
    }

    setEditorContents(editor, value) {
        var sel = editor.getSelection();
        editor.pasteHTML(value || '');
        if (sel) this.setEditorSelection(editor, sel);
    }

    setEditorSelection(editor, range) {
        if (range) {
            // Validate bounds before applying.
            var length = editor.getLength();
            range.start = Math.max(0, Math.min(range.start, length-1));
            range.end = Math.max(range.start, Math.min(range.end, length-1));
        }
        editor.setSelection(range);
    }


    onEditorChange = (value, delta, source, editor) => {
        if (value !== this.state.value) {
            this.setState({ value });
            if (this.props.onChange) {
                this.props.onChange({target: {value}});
            }
        }
    }

    onEditorChangeSelection = (range, source, editor) => {
		var { selection = {} } = this.state
        range = range || {}
		if (range.start !== selection.start || range.end !== selection.end) {
			this.setState({ selection: range });
			if (this.props.onChangeSelection) {
				this.props.onChangeSelection(range, source, editor);
			}
		}
	}

    componentDidMount = () => {
        var editor = this.createEditor(
            this.refs.editor,
            this.props.config
        )
        editor.on('text-change', (delta, source) => {
            this.onEditorChange( editor.getText(), delta, source, editor)
        })
        editor.on('selection-change', (range, source) => {
            this.onEditorChangeSelection( range, source, editor )
        })
        this.setState({ editor })
        editor.formatLine(0, 10, 'code-block', 'markdown')
    }

    shouldComponentUpdate() { return false; }

    render(){
        return (
            <div className="quill-wrapper">
                { this.props.config.modules.toolbar && (<Toolbar/>) }
                <div ref="editor"/>
            </div>
        )
    }
}
